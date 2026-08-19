// Cannon School — the six College Support cards.
//
// Every figure is transcribed from the school's OWN published materials —
// chiefly the 2025–26 and 2024–25 School Profile PDFs, the College Counseling
// pages, and named news coverage. See source-material/college-support/cannon/
// Cannon School - College Support - Redesign Research 2026.md for the hard data,
// source URLs, and gap notes.
//
// Cannon publishes noticeably less college-outcome data than the larger
// Charlotte independents: there is no National Merit ledger, no AP Scholar
// count, no scholarship-dollar headline, no counselor tenure detail, and no
// rep-visit count. Those are recorded as gaps rather than estimated, and the
// merit ledger block is simply absent from the transcript card.
//
// Two structural notes that shape what renders below:
//
//  1. The 2025–26 profile DROPPED the acceptance list entirely, so the newest
//     available list is a three-year rollup ending with the Class of 2024 —
//     one full cycle stale. That is flagged on the card.
//  2. Cannon's bold "enrolled" markers did not survive PDF text extraction, so
//     `enrolling` here is driven by something better: the school's separately
//     published Class of 2023 MATRICULATION list, which is actual enrollment
//     rather than acceptance. The card says exactly that.

import type { CollegeSupportProgram } from '../collegeSupport.ts'

/* The 2022–2024 acceptance list (283 institutions), with the Class of 2023
   matriculation list folded in and used to mark `enrolling`. Rank labels and
   buckets are scored against the 2026 U.S. News tables. */
const colleges = [
  { name: 'Agnes Scott College', cats: ['lac75'] },
  { name: 'American University', cats: [], enrolling: true },
  { name: 'Appalachian State University', cats: [], enrolling: true },
  { name: 'Arizona State University (Tempe)', cats: [] },
  { name: 'Auburn University', cats: ['p4'] },
  { name: 'Austin Peay State University', cats: [] },
  { name: 'Babson College', cats: [] },
  { name: 'Barton College', cats: [] },
  { name: 'Baylor University', cats: ['p4'] },
  { name: 'Belmont Abbey College', cats: [], enrolling: true },
  { name: 'Belmont University', cats: [] },
  { name: 'Bentley University', cats: [] },
  { name: 'Boise State University', cats: [] },
  { name: 'Boston College', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Boston University', cats: ['nu75'] },
  { name: 'Bowdoin College', cats: ['lac75'] },
  { name: 'Brevard College', cats: [] },
  { name: 'Brown University', cats: ['ivy', 'ivyplus', 'nu75'] },
  { name: 'Bryn Mawr College', cats: ['lac75'] },
  { name: 'Bucknell University', cats: ['lac75'] },
  { name: 'Butler University', cats: [] },
  { name: 'California Polytechnic State University (San Luis Obispo)', cats: [] },
  { name: 'California State University (Bakersfield)', cats: [] },
  { name: 'Campbell University', cats: [] },
  { name: 'Cape Fear Community College', cats: [] },
  { name: 'Carnegie Mellon University', cats: ['nu75'] },
  { name: 'Case Western Reserve University', cats: ['nu75'] },
  { name: 'Catawba College', cats: [] },
  { name: 'Catholic University of America', cats: [] },
  { name: 'Central Piedmont Community College', cats: [] },
  { name: 'Chapman University', cats: [] },
  { name: 'Citadel Military College of South Carolina', cats: [] },
  { name: 'Clemson University', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Coker University', cats: [], enrolling: true },
  { name: 'Colgate University', cats: ['lac75'] },
  { name: 'College of Charleston', cats: [], enrolling: true },
  { name: 'Colorado School of Mines', cats: [], enrolling: true },
  { name: 'Colorado State University (Fort Collins)', cats: [] },
  { name: 'Columbia College', cats: [] },
  { name: 'Concord University', cats: [] },
  { name: 'Cornell University', cats: ['ivy', 'ivyplus', 'nu75'] },
  { name: 'Davidson College', cats: ['lac75'] },
  { name: 'Denison University', cats: ['lac75'] },
  { name: 'DePauw University', cats: ['lac75'] },
  { name: 'Drew University', cats: [] },
  { name: 'Drexel University', cats: [] },
  { name: 'Duke University', cats: ['ivyplus', 'nu75', 'p4'], enrolling: true },
  { name: 'East Carolina University', cats: [], enrolling: true },
  { name: 'East Tennessee State University', cats: [] },
  { name: 'Eastern Michigan University', cats: [] },
  { name: 'Eckerd College', cats: [] },
  { name: 'Elon University', cats: [], enrolling: true },
  { name: 'Emerson College', cats: [] },
  { name: 'Emory & Henry College', cats: [] },
  { name: 'Emory University', cats: ['nu75'] },
  { name: 'Fashion Institute of Design & Merchandising', cats: [] },
  { name: 'Fashion Institute of Technology', cats: [] },
  { name: 'Flagler College', cats: [] },
  { name: 'Florida Atlantic University', cats: [] },
  { name: 'Florida Gulf Coast University', cats: [] },
  { name: 'Florida International University', cats: [] },
  { name: 'Florida State University', cats: ['nu75', 'p4'] },
  { name: 'Fordham University', cats: [] },
  { name: 'Franklin & Marshall College', cats: ['lac75'], enrolling: true },
  { name: 'Furman University', cats: ['lac75'] },
  { name: 'Gardner-Webb University', cats: [] },
  { name: 'George Mason University', cats: [] },
  { name: 'George Washington University', cats: [] },
  { name: 'Georgetown University', cats: ['ivyplus', 'nu75'] },
  { name: 'Georgia Institute of Technology', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Georgia Southern University', cats: [] },
  { name: 'Gettysburg College', cats: ['lac75'] },
  { name: 'Gonzaga University', cats: [] },
  { name: 'Goucher College', cats: [] },
  { name: 'Grace College', cats: [] },
  { name: 'Grand Canyon University', cats: [] },
  { name: 'Guilford College', cats: [] },
  { name: 'Hamilton College', cats: ['lac75'] },
  { name: 'Hampden-Sydney College', cats: [] },
  { name: 'Harvey Mudd College', cats: ['lac75'] },
  { name: 'High Point University', cats: [], enrolling: true },
  { name: 'Hofstra University', cats: [] },
  { name: 'Hollins University', cats: [] },
  { name: 'Howard University', cats: ['hbcu'] },
  { name: 'Indiana University (Bloomington)', cats: [] },
  { name: 'James Madison University', cats: [] },
  { name: 'Johns Hopkins University', cats: ['ivyplus', 'nu75'] },
  { name: 'Johnson & Wales University (Providence)', cats: [] },
  { name: 'Juniata College', cats: [] },
  { name: 'Kansas State University', cats: ['p4'] },
  { name: 'Kenyon College', cats: ['lac75'] },
  { name: 'Lafayette College', cats: ['lac75'] },
  { name: 'Lehigh University', cats: ['nu75'] },
  { name: 'Lenoir-Rhyne University', cats: [] },
  { name: 'Liberty University', cats: [] },
  { name: 'Limestone University', cats: [] },
  { name: 'Longwood University', cats: [] },
  { name: 'Louisiana State University', cats: ['p4'], enrolling: true },
  { name: 'Loyola Marymount University', cats: [] },
  { name: 'Lynn University', cats: [] },
  { name: 'Macalester College', cats: ['lac75'] },
  { name: 'Marist College', cats: [] },
  { name: 'Mars Hill University', cats: [] },
  { name: 'Massachusetts Institute of Technology', cats: ['ivyplus', 'nu75'] },
  { name: 'McGill University', cats: [] },
  { name: 'Merrimack College', cats: [] },
  { name: 'Methodist University', cats: [] },
  { name: 'Miami University (Oxford)', cats: [], enrolling: true },
  { name: 'Michigan State University', cats: ['nu75', 'p4'] },
  { name: 'Michigan Technological University', cats: [] },
  { name: 'Middle Tennessee State University', cats: [], enrolling: true },
  { name: 'Middlebury College', cats: ['lac75'], enrolling: true },
  { name: 'Milligan University', cats: [], enrolling: true },
  { name: 'Mississippi State University', cats: ['p4'] },
  { name: 'Monmouth University', cats: [] },
  { name: 'Montana State University', cats: [] },
  { name: 'Muhlenberg College', cats: [] },
  { name: 'New Jersey Institute of Technology', cats: [] },
  { name: 'New York University', cats: ['nu75'] },
  { name: 'North Carolina A&T State University', cats: ['hbcu'] },
  { name: 'North Carolina Central University', cats: ['hbcu'] },
  { name: 'North Carolina State University', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'North Greenville University', cats: [] },
  { name: 'Northeastern University', cats: ['nu75'] },
  { name: 'Nova Southeastern University', cats: [] },
  { name: 'Oberlin College', cats: ['lac75'] },
  { name: 'Old Dominion University', cats: [] },
  { name: 'Oxford College of Emory University', cats: [] },
  { name: 'Palm Beach Atlantic University', cats: [] },
  { name: 'Parsons School of Design at The New School', cats: [] },
  { name: 'Penn State University (University Park)', cats: [], enrolling: true },
  { name: 'Penn State University (World Campus)', cats: [] },
  { name: 'Pepperdine University', cats: [] },
  { name: 'Point Loma Nazarene University', cats: [] },
  { name: 'Point Park University', cats: [] },
  { name: 'Portland State University', cats: [] },
  { name: 'Pratt Institute', cats: [] },
  { name: 'Presbyterian College', cats: [] },
  { name: 'Providence College', cats: [] },
  { name: 'Purdue University', cats: ['nu75', 'p4'] },
  { name: 'Queens University of Charlotte', cats: [] },
  { name: 'Quinnipiac University', cats: [] },
  { name: 'Radford University', cats: [] },
  { name: 'Rensselaer Polytechnic Institute', cats: [] },
  { name: 'Rice University', cats: ['nu75'] },
  { name: 'Ringling College of Art and Design', cats: [] },
  { name: 'Roanoke College', cats: [] },
  { name: 'Rochester Institute of Technology', cats: [] },
  { name: 'Rollins College', cats: [] },
  { name: 'Rose-Hulman Institute of Technology', cats: [] },
  { name: 'Rowan-Cabarrus Community College', cats: [], enrolling: true },
  { name: 'Rutgers University (New Brunswick)', cats: [] },
  { name: 'Saint Louis University', cats: [] },
  { name: 'Saint Mary\'s College of California', cats: [] },
  { name: 'Salisbury University', cats: [] },
  { name: 'Samford University', cats: [] },
  { name: 'San Diego State University', cats: [] },
  { name: 'Santa Clara University', cats: [] },
  { name: 'Savannah College of Art and Design', cats: [], enrolling: true },
  { name: 'School of the Art Institute of Chicago', cats: [] },
  { name: 'Seton Hall University', cats: [] },
  { name: 'Sewanee: The University of the South', cats: ['lac75'], enrolling: true },
  { name: 'Southern Methodist University', cats: ['p4'], enrolling: true },
  { name: 'Spelman College', cats: ['lac75', 'hbcu'] },
  { name: 'St. Bonaventure University', cats: [] },
  { name: 'St. John\'s University', cats: [] },
  { name: 'Stanford University', cats: ['ivyplus', 'nu75', 'p4'], enrolling: true },
  { name: 'Stetson University', cats: [] },
  { name: 'Stevens Institute of Technology', cats: [] },
  { name: 'Stony Brook University', cats: [] },
  { name: 'SUNY University at Buffalo', cats: [] },
  { name: 'Syracuse University', cats: ['nu75', 'p4'] },
  { name: 'Temple University', cats: [] },
  { name: 'Tennessee Technological University', cats: [] },
  { name: 'Texas A&M University', cats: ['nu75', 'p4'] },
  { name: 'Texas Christian University', cats: ['p4'], enrolling: true },
  { name: 'The New School', cats: [], enrolling: true },
  { name: 'The Ohio State University', cats: ['nu75', 'p4'] },
  { name: 'The University of Alabama', cats: ['p4'] },
  { name: 'The University of Edinburgh', cats: [] },
  { name: 'The University of Montana', cats: [] },
  { name: 'The University of Tampa', cats: [], enrolling: true },
  { name: 'The University of Tennessee (Knoxville)', cats: [], enrolling: true },
  { name: 'The University of Virginia\'s College at Wise', cats: [] },
  { name: 'Tufts University', cats: ['nu75'] },
  { name: 'Tulane University of Louisiana', cats: [], enrolling: true },
  { name: 'Union College', cats: ['lac75'] },
  { name: 'United States Air Force Academy', cats: ['lac75'], enrolling: true },
  { name: 'University College Dublin', cats: [] },
  { name: 'University of Aberdeen', cats: [], enrolling: true },
  { name: 'University of Alabama', cats: ['p4'] },
  { name: 'University of Alabama at Birmingham', cats: [] },
  { name: 'University of Alabama in Huntsville', cats: [] },
  { name: 'University of Arizona', cats: ['nu75', 'p4'] },
  { name: 'University of Arkansas', cats: ['p4'] },
  { name: 'University of California (Berkeley)', cats: [] },
  { name: 'University of California (Davis)', cats: [] },
  { name: 'University of California (Irvine)', cats: [] },
  { name: 'University of California (Los Angeles)', cats: [], enrolling: true },
  { name: 'University of California (San Diego)', cats: [] },
  { name: 'University of California (Santa Barbara)', cats: [] },
  { name: 'University of Central Florida', cats: ['p4'] },
  { name: 'University of Charleston', cats: [] },
  { name: 'University of Chicago', cats: ['ivyplus', 'nu75'] },
  { name: 'University of Colorado (Colorado Springs)', cats: [] },
  { name: 'University of Colorado Boulder', cats: ['nu75', 'p4'] },
  { name: 'University of Connecticut', cats: ['nu75'] },
  { name: 'University of Dayton', cats: [] },
  { name: 'University of Delaware', cats: ['nu75'] },
  { name: 'University of Denver', cats: [] },
  { name: 'University of Florida', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of Georgia', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of Hawaii at Manoa', cats: [] },
  { name: 'University of Illinois at Chicago', cats: [] },
  { name: 'University of Illinois at Urbana-Champaign', cats: ['nu75', 'p4'] },
  { name: 'University of Kentucky', cats: ['p4'] },
  { name: 'University of Louisville', cats: ['p4'] },
  { name: 'University of Lynchburg', cats: [] },
  { name: 'University of Mary Washington', cats: [] },
  { name: 'University of Maryland (College Park)', cats: [] },
  { name: 'University of Massachusetts (Amherst)', cats: [] },
  { name: 'University of Miami', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of Michigan', cats: ['nu75', 'p4'] },
  { name: 'University of Minnesota (Twin Cities)', cats: [] },
  { name: 'University of Mississippi', cats: ['p4'] },
  { name: 'University of Nebraska (Lincoln)', cats: [] },
  { name: 'University of New Hampshire (Main Campus)', cats: [] },
  { name: 'University of North Carolina at Asheville', cats: [], enrolling: true },
  { name: 'University of North Carolina at Chapel Hill', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of North Carolina at Charlotte', cats: [], enrolling: true },
  { name: 'University of North Carolina at Greensboro', cats: [], enrolling: true },
  { name: 'University of North Carolina School of the Arts', cats: [] },
  { name: 'University of North Carolina at Wilmington', cats: [] },
  { name: 'University of North Georgia', cats: [] },
  { name: 'University of North Texas', cats: [] },
  { name: 'University of Oklahoma', cats: ['p4'] },
  { name: 'University of Oregon', cats: ['p4'] },
  { name: 'University of Pennsylvania', cats: ['ivy', 'ivyplus', 'nu75'], enrolling: true },
  { name: 'University of Pittsburgh (Pittsburgh)', cats: [] },
  { name: 'University of Puget Sound', cats: [] },
  { name: 'University of Rhode Island', cats: [] },
  { name: 'University of Richmond', cats: ['lac75'] },
  { name: 'University of Rochester', cats: ['nu75'] },
  { name: 'University of San Francisco', cats: [] },
  { name: 'University of South Carolina', cats: ['p4'], enrolling: true },
  { name: 'University of South Carolina (Aiken)', cats: [] },
  { name: 'University of South Florida (Main Campus)', cats: [] },
  { name: 'University of Southern California', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of St Andrews', cats: [] },
  { name: 'University of Tampa', cats: [] },
  { name: 'University of Toronto', cats: [] },
  { name: 'University of Utah', cats: ['p4'] },
  { name: 'University of Vermont', cats: [], enrolling: true },
  { name: 'University of Virginia (Main Campus)', cats: [], enrolling: true },
  { name: 'University of Washington (Seattle Campus)', cats: [], enrolling: true },
  { name: 'University of Wisconsin (Madison)', cats: [], enrolling: true },
  { name: 'Vanderbilt University', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Vassar College', cats: ['lac75'], enrolling: true },
  { name: 'Villanova University', cats: ['nu75'], enrolling: true },
  { name: 'Virginia Commonwealth University', cats: [], enrolling: true },
  { name: 'Virginia Military Institute', cats: [] },
  { name: 'Virginia Polytechnic Institute and State University', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Virginia Wesleyan University', cats: [] },
  { name: 'Wake Forest University', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Washington & Jefferson College', cats: [] },
  { name: 'Washington and Lee University', cats: ['lac75'] },
  { name: 'Washington University in St. Louis', cats: ['ivyplus', 'nu75'] },
  { name: 'Wentworth Institute of Technology', cats: [] },
  { name: 'Wesleyan University', cats: ['lac75'] },
  { name: 'West Virginia University', cats: ['p4'] },
  { name: 'Western Carolina University', cats: [] },
  { name: 'Wheaton College - IL', cats: [] },
  { name: 'Wheaton College - MA', cats: [] },
  { name: 'William & Mary', cats: ['nu75'] },
  { name: 'Wingate University', cats: [] },
  { name: 'Winston-Salem State University', cats: ['hbcu'] },
  { name: 'Winthrop University', cats: [] },
  { name: 'Wofford College', cats: ['lac75'], enrolling: true },
  { name: 'Worcester Polytechnic Institute', cats: [] },
  { name: 'Xavier University', cats: [] },
  { name: 'Arizona State University (Main Campus)', cats: [], enrolling: true },
  { name: 'The College of William and Mary', cats: [], enrolling: true },
  { name: 'University of North Carolina Wilmington', cats: [], enrolling: true },
]

const PROFILE_2526 =
  'https://resources.finalsite.net/images/v1757349467/cannonschoolorg/i5lqf0krxcb4uejss6ul/Cannon_2526_Profile.pdf'
const PROFILE_2425 =
  'https://resources.finalsite.net/images/v1727105974/cannonschoolorg/q6vdhpxfxelejegmx4n8/2024-2025_StudentProfile_87212e_webemail.pdf'
const COUNSELING = 'https://www.cannonschool.org/academics/college-counseling'

export const cannon: CollegeSupportProgram = {
  /* The area's FIRST card. Unlike every other card here, these figures are
     GOVERNMENT-published — the UNC System's Insight dashboard, pulled via the
     nc-admissions-data skill — rather than the school’s own marketing number.
     Full per-term counts, the exact filter values and the provenance header are in
     source-material/college-support/cannon/
     Cannon School - College Support - UNC System Admissions.md.

     Every rate ships with its denominator: these are small cells, and a bare
     percentage off a single-digit base is not publishable. The five-year figure is
     POOLED — sum(admitted)/sum(applied) over the five most recent terms — never the
     mean of the five annual rates. */
  ncAdmissions: {
    headline:
      'Across the six top-ranked NC public universities, Cannon School’s applicants were admitted at a pooled 60.8% over the last five entering classes — 479 acceptances from 788 applications.',
    subhead:
      'UNC-Chapel Hill is the hard one: 37.4% pooled there, against far higher rates at the less-selective campuses. These are UNC-system figures published by the state, not the school’s own.',
    stats: [
      { value: '788', label: 'applications to the six campuses, Fall 2021–2025' },
      { value: '60.8%', label: 'pooled admit rate — 479 of 788 across those five classes' },
      { value: '37.4%', label: 'at UNC-Chapel Hill — 102 of 273, the most selective of the six' },
      { value: 'UNC-Chapel Hill', label: 'drew the most applications in Fall 2025 (63)' },
    ],
    universities: [
      {
        key: 'unc-chapel-hill',
        name: 'UNC-Chapel Hill',
        rank: 1,
        note: 'Flagship · the most selective of the six',
        applied: '63',
        accepted: '20',
        rate: '31.7%',
        ratePct: 0.317,
        fiveYearRate: '37.4%',
        fiveYearApplied: '273',
        fiveYearAccepted: '102',
      },
      {
        key: 'nc-state-university',
        name: 'NC State University',
        rank: 2,
        note: 'Flagship STEM · Raleigh',
        applied: '52',
        accepted: '34',
        rate: '65.4%',
        ratePct: 0.654,
        fiveYearRate: '58.1%',
        fiveYearApplied: '236',
        fiveYearAccepted: '137',
      },
      {
        key: 'unc-charlotte',
        name: 'UNC Charlotte',
        rank: 3,
        note: 'Hometown campus',
        applied: '25',
        accepted: '25',
        rate: '100.0%',
        ratePct: 1,
        fiveYearRate: '96.0%',
        fiveYearApplied: '99',
        fiveYearAccepted: '95',
      },
      {
        key: 'east-carolina-university',
        name: 'East Carolina University',
        rank: 4,
        note: 'Greenville · largest admit rates of the six',
        applied: '12',
        accepted: '12',
        rate: '100.0%',
        ratePct: 1,
        fiveYearRate: '96.8%',
        fiveYearApplied: '62',
        fiveYearAccepted: '60',
      },
      {
        key: 'unc-wilmington',
        name: 'UNC Wilmington',
        rank: 5,
        note: 'Coastal · mid-selectivity',
        applied: '17',
        accepted: '12',
        rate: '70.6%',
        ratePct: 0.706,
        fiveYearRate: '64.9%',
        fiveYearApplied: '94',
        fiveYearAccepted: '61',
      },
      {
        key: 'unc-greensboro',
        name: 'UNC Greensboro',
        rank: 6,
        note: 'Piedmont Triad',
        applied: '8',
        accepted: '8',
        rate: '100.0%',
        ratePct: 1,
        fiveYearRate: '100.0%',
        fiveYearApplied: '24',
        fiveYearAccepted: '24',
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
      'Cannon publishes something almost no peer does — an explicit maximum AP/AT load by grade, capping a four-year transcript at eleven advanced courses and barring freshmen entirely.',
    subhead:
      'That ceiling is the key to reading a Cannon transcript: “most rigorous” here has a hard, published limit, and the 92% scoring 3+ comes from students who chose to sit an optional exam.',
    stats: [
      { value: '21', label: 'advanced courses — 13 AP plus 8 school-designed Advanced Topics' },
      { value: '92%', label: 'of AP exams scored 3+ (425 exams, 197 students, Class of 2025)' },
      { value: '0 / 1 / 4 / 6', label: 'published max AP/AT courses in grades 9 / 10 / 11 / 12' },
      { value: 'No rank', label: '“Cannon School does not rank students”' },
    ],
    // No merit ledger: no National Merit counts are published in any year.
    merit: [],
    depth: [
      {
        label: 'Mathematics',
        text: 'The ceiling is **AP Calculus BC / AP Statistics** — there is no published post-BC course, no multivariable calculus and no linear algebra. An “AT: Calculus with Applications” listed in 2024–25 has disappeared from the 2025–26 table.',
      },
      {
        label: 'Computer science',
        text: '**AP Computer Science only**, with no post-AP course and no data structures — thin relative to the rest of the advanced catalogue.',
      },
      {
        label: 'Advanced Topics',
        text: 'Eight **school-designed AT courses** sit alongside the APs and carry the same 1.0 quality point, several with no corresponding College Board exam at all — for example AT: Design Thinking for Entrepreneurship.',
      },
      {
        label: 'Beyond campus',
        text: 'No Global Online Academy membership and no dual-enrolment partnership is published — this was checked specifically.',
      },
    ],
    trust: [
      {
        label: 'Weighted narrowly, and deliberately',
        text: 'AT and AP courses carry **1.0 quality point; Honors and Honors Accelerated are not weighted at all**. Both weighted and unweighted GPAs are calculated from Cannon coursework only.',
      },
      {
        label: 'No rank, and a modest ceiling',
        text: 'No rank, no decile or quintile table — but the narrow weighting plus the eleven-course cap means the weighted top decile tops out around **4.28**. Cannon does not produce inflated 4.9 GPAs, which needs context for readers used to heavier schemes.',
      },
      {
        label: 'A per-discipline rigour key',
        text: 'Bold entries in the profile’s course table mark the “most demanding coursework in that discipline per appropriate grade level”, so a reader can see the ceiling subject by subject rather than guessing.',
      },
    ],
    flags: [
      {
        kind: 'verify',
        text: 'AP exams are OPTIONAL — “students in AT/AP classes have the option of sitting for the appropriate AP exam”. The 92.39% scoring 3+ therefore rests on a self-selected pool and is not directly comparable with schools that mandate the exam. The 197-student denominator is also undefined: it most likely means all Upper School exam takers rather than members of the 111-person graduating class.',
      },
      {
        kind: 'gap',
        text: 'No National Merit ledger of any kind is published — no Semifinalist, Finalist or Commended counts in any year, on either profile or in news posts. Repeated searches surfaced only a 2011 item naming a single Scholar. AP Scholar counts and the share scoring 4–5 are likewise unpublished; Cannon reports only the 3+ threshold.',
      },
      {
        kind: 'discrepancy',
        text: 'The full grading scale appeared in the 2024–25 profile and was dropped from the 2025–26 edition — a disclosure regression, since a reader of the current profile cannot map a letter grade to a quality point.',
      },
    ],
    sources: [
      { label: 'cannonschool.org — 2025–26 School Profile (advanced-course counts, AP stats, load ceiling, no-rank policy)', url: PROFILE_2526 },
      { label: '2024–25 School Profile (the grading scale the newer edition dropped)', url: PROFILE_2425 },
    ],
  },

  counseling: {
    headline:
      'Cannon promises something structural that most schools do not: a student keeps the same college counselor for all four years, rather than being handed off in junior year.',
    subhead:
      'Five staff, zero turnover across two published profiles, and a co-director model — plus the regional case-studies programme it physically hosts.',
    stats: [
      { value: '28:1', label: 'the school’s published ratio — reachable only counting seniors' },
      { value: '5', label: 'staff — two co-directors, two associates, one coordinator' },
      { value: '4 years', label: 'the same counselor for a student’s whole Upper School career' },
      { value: 'SCOIR', label: 'platform, alongside an annually refreshed School Profile' },
    ],
    roster: [
      { role: 'Co-Director', name: 'Courtney Brayboy', detail: 'Cannon runs an unusual shared top role rather than a single director.' },
      { role: 'Co-Director', name: 'Heidi Waibel', detail: 'The roster is identical across the 2024–25 and 2025–26 profiles.' },
      { role: 'Assoc. Director', name: 'Adrian LeFevre' },
      { role: 'Assoc. Director', name: 'Connie Stavrakas' },
      { role: 'Coordinator', name: 'Clay Morrell', detail: 'Zero turnover across at least two years is itself a stability signal.' },
    ],
    timelineTitle: 'The published programme — parent-facing, by grade',
    timeline: [
      {
        grade: '9–10',
        intensity: 'Foundational',
        items: ['**ACT/PSAT Interpretations** for freshman and sophomore parents'],
        note: 'Counseling begins in ninth grade as a stated four-year programme',
      },
      {
        grade: '11',
        intensity: 'In earnest',
        items: ['**College Admission Case Studies Event**', '**College Admission Deans Panel**'],
        note: 'Both aimed at junior parents',
      },
      {
        grade: '12',
        intensity: 'Intensive',
        items: ['**College Kick-Off**', '**Transitioning your child beyond Cannon**'],
      },
    ],
    mechanicsTitle: 'The mechanics the office owns',
    mechanics: [
      'Applications',
      'The admission process',
      'Financial aid process',
      'Transcript requests',
      'Testing interpretation',
    ],
    mechanicsNote:
      'That is the published scope. Note what is absent from it: essay coaching or brainstorming workshops, a teacher-recommendation coordination process, interview preparation, and any scholarship-search service are none of them explicitly claimed — consistent with the absence of a scholarship-dollar headline.',
    reach: [
      '**Hosts** the Lake Norman Area College Admissions Case Studies Program and College Fair, co-hosted with Davidson Day — Cannon is the venue',
      'Second annual edition held **26 April 2026**, confirmed independently from a college’s own registration portal',
      'SCOIR · an annually refreshed School Profile · CEEB 340879',
    ],
    flags: [
      {
        kind: 'verify',
        text: 'The marketed “28:1 ratio” only works as seniors per counselor (111 ÷ 4). Measured across the 423-student Upper School it is nearer 106:1, and the school never states the denominator — so 28:1 should not be read as a whole-Upper-School caseload.',
      },
      {
        kind: 'gap',
        text: 'No counselor tenure, prior background, degrees or biographies are published — names and titles only, so director tenure is unknown. Neither rep-visit counts nor counselor campus-visit counts are published in any form. Note that Davidson Day’s published “80+ reps a year” belongs to Davidson Day, not Cannon.',
      },
      {
        kind: 'gap',
        text: 'The student-facing curriculum is unpublished: seminar cadence, one-on-one meeting counts, essay workshops and junior conference timing appear nowhere. Cannon publishes what it invites parents to, not what it does with students. A four-year self-exploration strand described in the 2024–25 profile was cut from the 2025–26 edition without explanation.',
      },
    ],
    sources: [
      { label: 'cannonschool.org — College Counseling', url: COUNSELING },
      { label: '2025–26 School Profile (staffing, enrollment)', url: PROFILE_2526 },
      { label: 'Davidson Day — the co-hosted Lake Norman case-studies programme at Cannon', url: 'https://www.davidsonday.org/academics/college-counseling' },
    ],
  },

  outcomes: {
    headline:
      'Cannon publishes what most schools here do not — an actual matriculation list. 58 institutions enrolled a Class of 2023 graduate, including Stanford, Duke, Penn, UCLA and the Air Force Academy.',
    subhead:
      'That list is far stronger evidence than the acceptance rollup beside it, which aggregates three graduating classes and has not been refreshed since the Class of 2024.',
    stats: [
      { value: '98%', label: 'of the Class of 2025 to four-year colleges · 2% to two-year' },
      { value: '58', label: 'institutions where a Class of 2023 student actually enrolled' },
      { value: '111', label: 'graduating seniors — the second largest class in school history' },
      { value: '3 of 8', label: 'Ivy League on the 2022–24 acceptance list' },
    ],
    buckets: [
      { tier: 'Ivy League', count: '3 / 8', note: '— Brown, Cornell, Penn; absent Harvard, Yale, Princeton, Dartmouth, Columbia' },
      { tier: '“Ivy Plus”', count: '10 / 17' },
      { tier: 'Top-75 National Universities', count: '46 / 75' },
      { tier: 'Top-75 Liberal Arts', count: '27 / 75' },
      { tier: 'Power Four', count: '43 / 68' },
      { tier: 'HBCUs', count: '5 / 107', note: '— Historically Black Colleges & Universities' },
    ],
    bucketsNote:
      'Counts are computed from the same list you can filter at right, scored against the 2026 U.S. News tables — derived analysis, not school-reported. The Ivy count is reported strictly: the list contains “Columbia College”, which almost certainly means Columbia College in South Carolina, Chicago or Missouri rather than Columbia University, since the latter would be printed as “Columbia University”. Read loosely it would be 4 of 8; both readings are stated rather than one being picked.',
    collegesTitle: 'Every acceptance, 2022–2024',
    colleges,
    collegesTotal: '283 institutions · bold = a Class of 2023 student enrolled',
    scholarships: [
      'No merit-scholarship total published',
      'Morehead-Cain: a 2015 recipient, nothing current',
      'U.S. Air Force Academy enrollment (Class of 2023)',
      'Cum Laude Society chapter since 2005',
    ],
    scholarshipsNote:
      'This is Cannon’s single largest outcome-data gap. No merit-scholarship dollar figure appears on either profile or in any news post, and no current Morehead-Cain, Park, QuestBridge or ROTC outcome is published. Cannon does publish $3,000,000 in tuition assistance to 24% of its students — but that is the school’s own inbound financial aid, not college merit money, and the two must not be conflated.',
    caveat:
      'the headline list is explicitly “College Acceptances” across three graduating classes (2022, 2023, 2024) — roughly 330 students, each generating multiple acceptances. An institution appearing there does not mean a Cannon student attended, or that an acceptance happened in any particular year. Prefer the Class of 2023 matriculation list, which is real enrollment. Note also that the 2025–26 profile dropped the acceptance list entirely, so the newest available data is already one full cycle stale. This window begins in 2022, a year earlier than the 2023 floor the other schools here share: Cannon publishes only this single pre-aggregated block with no per-class breakdown, so the 2022 acceptances cannot be split off without discarding the list, and the school has published nothing newer to replace it.',
    flags: [
      {
        kind: 'verify',
        text: 'The profile’s bold “enrolled” markers for the Class of 2024 did not survive PDF text extraction, so the enrolling markers here come from the separately published Class of 2023 matriculation list instead. They are real enrollments, but for a different class than the acceptance list’s bold key describes.',
      },
    ],
    sources: [
      { label: 'cannonschool.org — 2024–25 School Profile (the 2022–24 acceptance list)', url: PROFILE_2425 },
      { label: '2025–26 School Profile (Class of 2025 outcomes)', url: PROFILE_2526 },
      { label: 'College Counseling resources (Class of 2023 matriculation list)', url: 'https://www.cannonschool.org/college-counseling-resources-clone' },
      { label: 'U.S. News 2026 rankings (tier scoring)', url: 'https://www.usnews.com/best-colleges/rankings/national-universities' },
    ],
  },

  edge: {
    headline:
      'Cannon’s differentiator is a set of course-embedded research experiences that end in a public defence — including one judged by an external committee of science professionals and business leaders.',
    subhead:
      'The spike here is built inside the curriculum rather than bolted on: take the course, and the defensible artefact is a requirement rather than an option.',
    levers: [
      {
        title: 'Lever 1 — Build the spike',
        glyph: '◆',
        items: [
          '**BIOREX** — the Biological Research Experience, embedded in Honors Biology. Students form a hypothesis, test it, analyse it statistically and present to a committee of **faculty, science professionals and local business leaders**. External judging is what separates this from a class project.',
          '**Symposium and Portfolio Defense** — an original historical argument defended in the spring of junior year (AT: U.S. History), and a multi-draft digital portfolio presented in AT: American Language and Composition.',
          '**Independent Study** — petition-based, and unusually the student **co-develops the course content and the assessment rubric**, then produces an end-of-year artefact.',
          '**Senior Capstone** — a philanthropic service project with a culminating public presentation to faculty, staff, peers and community. It is the one near-universal senior experience, though service itself is explicitly not a graduation requirement.',
          '**Global Education Certificate** — fully specified: World History I–II plus three levels of a world language, a senior **Glocal Perspectives** course with a capstone essay and presentation, and at least two of three global experiences. Awarded at Senior Night.',
        ],
        note:
          'Entrepreneurship and Engineering exist as course tracks with real depth — Honors Design Thinking & Entrepreneurship Lab, Creative Design and Engineering I–III, The Mill makerspace — but there is no published distinction or credential for either, so they should be read as tracks rather than certificates. No required internship or externship programme is published.',
      },
      {
        title: 'Lever 2 — The school’s leverage',
        glyph: '▲',
        items: [
          '**The profile publishes its own ceiling** — the maximum AP/AT load by grade, with a footnote that maths placement governs whether a student can reach it. Disclosing the cap protects students from being read against an unlimited-load norm they were never allowed to attempt.',
          '**Integrity signalling** — the office “reports out-of-school suspensions and expulsions through time of graduation to any colleges and universities that request this information”: a disclose-on-request posture consistent with current NACAC norms.',
          '**Institutional memberships** — NACAC, SACAC and **ACCIS**, alongside a **Cum Laude Society** chapter awarded in 2005 and membership of the **Independent Curriculum Group**, which is what makes the school-designed AT tier and the optional-exam stance coherent rather than idiosyncratic.',
          '**Hosting regional admissions traffic** — Cannon is the venue for the Lake Norman case-studies programme and fair, pulling visiting admissions officers onto its own campus at regional scale rather than only sending students out.',
        ],
      },
    ],
    flags: [],
    sources: [
      { label: 'cannonschool.org — 2025–26 School Profile (signature experiences, memberships, discipline reporting)', url: PROFILE_2526 },
      { label: 'Academics — Upper School curriculum', url: 'https://www.cannonschool.org/academics' },
      { label: 'College Counseling', url: COUNSELING },
    ],
  },

  wholeClass: {
    headline:
      'Cannon publishes a top-10% band and a middle-50% band for both tests and both GPAs — a genuinely useful shape, reported in a format that is not percentiles.',
    subhead:
      'The most informative figure is the unweighted middle 50% of 3.57–3.94: the median Cannon student sits in the high-B-plus to A-minus range before any weighting.',
    scoreTables: [
      {
        title: 'SAT score percentiles',
        hint: '— Class of 2025 · number of testers not published',
        rows: [{ label: 'SAT total', values: ['—', '1220', '—', '1380', '1470', '—'] }],
        note:
          'Cannon publishes a middle-50% band and a top-10% band only. The middle-50% endpoints conventionally ARE the 25th and 75th percentiles, so those columns are real; the top-10% figure is shown in the 90th column as the floor of that band (1470–1590). No mean, median, section subscores, or tester counts are published for either test.',
      },
      {
        title: 'ACT score percentiles',
        hint: '— Class of 2025 · number of testers not published',
        rows: [{ label: 'ACT composite', values: ['—', '25', '—', '31', '33', '—'] }],
        note:
          'Same reporting format: the 90th column shows the floor of the published top-10% band (33–36). Without a tester count there is no way to tell what share of 111 seniors sat either exam, which materially limits how far these bands can be read.',
      },
    ],
    gpaTitle: 'GPA distribution',
    gpaHint: '— Class of 2025, cumulative through grade 11 · transfers excluded',
    quintiles: [
      { label: 'Weighted · top 10%', gpa: '4.22–4.28', detail: 'a modest ceiling, by design' },
      { label: 'Weighted · mid 50%', gpa: '3.67–4.11', detail: 'the middle of the class' },
      { label: 'Unweighted · top 10%', gpa: '3.96–4.00', detail: 'effectively straight A’s' },
      { label: 'Unweighted · mid 50%', gpa: '3.57–3.94', detail: 'high B+ to A− before weighting' },
    ],
    gpaNote:
      'These are bands, not a quintile table — no full quintile or decile breakdown, median GPA, or per-band student count is published. The modest weighted ceiling follows directly from the 1.0-quality-point cap and the eleven-course AP/AT maximum, which is a transparency point in Cannon’s favour but needs context for readers used to heavier weighting schemes.',
    support: [
      {
        label: 'Three named Upper School specialists',
        text: '**Michelle Donah**, **Tere Hurtado** and **Jennifer Ridenhour** — substantial staffing for 423 Upper School students, and among the best-documented learning support in this set.',
      },
      {
        label: 'The student owns the plan',
        text: 'Students **actively participate in creating their own personalized learning plans** with specific accommodations, supported by a formally constituted team: the student, parents, teachers, the Assistant Head for Academics, the Student Dean, the Upper School Counselor and the advisor.',
      },
      {
        label: 'Where it reaches the application',
        text: 'For **juniors and seniors** the programme provides guidance on **requesting College Board and ACT testing accommodations** — the specific service that converts learning support into college-application support.',
      },
      {
        label: 'The surrounding structure',
        text: 'The **Academic Resource Center** for maths, writing, science and world languages; 1:1 **academic coaching** on executive function; and a faculty-facilitated, peer-led **Academic Lab**.',
      },
    ],
    supportNote:
      'Not published: how many students are on formal learning plans, whether accommodations carry a fee, and specialist credentials.',
    middle: [
      {
        label: 'The list is printed honestly',
        text: 'The acceptance list runs from MIT, Stanford and Bowdoin down through Rowan-Cabarrus, Cape Fear and Central Piedmont community colleges, Brevard, Barton, Catawba, Mars Hill, Wingate, Limestone, Methodist, Gardner-Webb, Guilford, Lenoir-Rhyne and Coker. A school optimising for prestige would omit these; Cannon prints them, and discloses its 2% two-year figure rather than burying it.',
      },
      {
        label: 'A design-weighted arts pathway',
        text: 'Pratt, Parsons, SAIC, SCAD, Ringling, FIT, FIDM, UNCSA and Emerson — deep and visual/design-weighted rather than music-conservatory-weighted, despite strong ensemble offerings.',
      },
      {
        label: 'Other non-traditional destinations',
        text: 'International universities (St Andrews, Edinburgh, Aberdeen — a confirmed 2023 enrollment, University College Dublin, McGill, Toronto); service academies and the military (Air Force Academy, The Citadel, VMI); technical institutes (Rose-Hulman, WPI, Stevens, Colorado School of Mines, RPI); HBCUs (Howard, Spelman, NC A&T, NC Central, Winston-Salem State).',
      },
    ],
    flags: [
      {
        kind: 'discrepancy',
        text: 'The 2024–25 profile published NO test scores at all, stating that because of test-optional review “test scores for the Class of 2025 are not reported”. The 2025–26 profile then published a full Class of 2025 testing distribution. Same class, opposite decisions, one year apart, unexplained — the later figures are shown here.',
      },
      {
        kind: 'verify',
        text: 'All four GPA bands are identical to the hundredth across the Class of 2024 and Class of 2025 tables. An exact four-band match across two different cohorts is statistically unlikely, so this may be carried-forward data rather than a genuinely stable distribution.',
      },
      {
        kind: 'gap',
        text: 'No gap-year statistic, policy or counselling service is described anywhere — and since 98% four-year plus 2% two-year accounts for the whole class, the published outcomes leave no room for a gap-year cohort at all.',
      },
    ],
    sources: [
      { label: 'cannonschool.org — 2025–26 School Profile (testing distribution, GPA bands)', url: PROFILE_2526 },
      { label: '2024–25 School Profile (the year test scores were withheld)', url: PROFILE_2425 },
      { label: 'Academic support and learning specialists', url: 'https://www.cannonschool.org/academics' },
    ],
  },

  verdict: {
    headline:
      'A stable, structurally honest programme — four-year counselor continuity, a published load ceiling, real research defences, and a genuine matriculation list — wrapped in thinner outcome disclosure than its larger peers.',
    subhead:
      'Most of what is missing here is publication rather than practice, which makes almost every gap a question a tour can answer.',
    points: [
      {
        label: 'Four-year counselor continuity, stated in writing',
        text: 'students keep the same college counselor for their whole Upper School career rather than being handed off in junior year — and the five-person roster shows zero turnover across two published profiles.',
      },
      {
        label: 'The rigour ceiling is disclosed, not implied',
        text: 'a published maximum of 0/1/4/6 AP or AT courses by grade caps a transcript at eleven, so colleges read “most rigorous” against a limit the school itself states.',
      },
      {
        label: 'Research experiences with real external judging',
        text: 'BIOREX is presented to a committee including science professionals and local business leaders, Symposium demands an original historical argument, and Independent Study has the student writing the rubric.',
      },
      {
        label: 'It publishes an actual matriculation list',
        text: '58 institutions where a Class of 2023 graduate genuinely enrolled — Stanford, Duke, Penn, UCLA, USC, Vanderbilt, Middlebury, Vassar, Georgia Tech, UNC, UVA, William & Mary and the Air Force Academy. That is stronger evidence than any acceptance rollup.',
      },
      {
        label: 'Learning support is named and reaches the application',
        text: 'three named Upper School learning specialists, student-authored personalised learning plans, and explicit guidance for juniors and seniors on requesting College Board and ACT accommodations.',
      },
      {
        label: 'Grades are not inflated',
        text: 'Honors courses carry no weight at all and only AT/AP add a point, so the weighted top decile tops out near 4.28 rather than in the high 4s.',
      },
    ],
    checklist: [
      'The 2025–26 profile dropped the acceptance list entirely, so the newest is a 2022–24 rollup. Where did the Classes of 2025 and 2026 actually enroll?',
      'Your 28:1 ratio only works counting seniors — what is the actual caseload per counselor across all four Upper School grades?',
      'Has Cannon had any National Merit Semifinalists, Finalists or Commended Students in recent years? Nothing is published in any year.',
      'AP exams are optional here. What share of students in AP and AT courses actually sit the exam, and what share scored 4 or 5 rather than just 3+?',
      'What were the total merit-scholarship offers for the last graduating class? No dollar figure is published anywhere.',
      'Your 2024–25 profile declined to report Class of 2025 test scores on test-optional principle, then the 2025–26 profile published them for that same class. What changed?',
      'The GPA bands are identical to the hundredth across two different classes — is that a genuinely stable distribution, or carried-forward data?',
      'What does the student-facing counseling curriculum look like grade by grade — how many one-on-one meetings, and when do essays start?',
    ],
    flags: [],
    sources: [
      { label: 'cannonschool.org — College Counseling', url: COUNSELING },
      { label: '2025–26 School Profile', url: PROFILE_2526 },
      { label: 'Verdict synthesised by the researcher from the sources cited on the cards above', },
    ],
  },
}
