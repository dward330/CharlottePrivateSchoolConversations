// Davidson Day School — the six College Support cards.
//
// Every figure is transcribed from the school's OWN published materials — chiefly
// the 2025–26 School Profile PDF — or from named third-party coverage. See
// source-material/college-support/davidson-day/Davidson Day - College Support -
// Redesign Research 2026.md for the hard data, source URLs, and gap notes.
//
// Davidson Day is the smallest school in the set (total 541, Upper School 198,
// Class of 2026 = 47) and publishes materially less than the larger independents.
// Two things follow, and both are honest findings rather than research failures:
//
//  1. The school states outright that it "will not be providing the testing
//     profiles for the Class of 2026" because of test-optional policies, and it
//     publishes no AP performance data and no National Merit record. So the
//     Whole Class Analytics card carries no score tables and the Transcript card
//     carries no AP-score stats and no merit ledger — those blocks are simply
//     absent rather than filled with third-party or estimated numbers.
//  2. Self-reported score ranges DO exist on aggregator sites. They are
//     deliberately excluded: they are user-submitted, not school-reported, and
//     at this class size the samples are tiny.
//
// NAME-COLLISION WARNING: Davidson Day School (Davidson, NC) is NOT Davidson
// Academy (Reno, NV), which publishes large National Merit cohorts. Searches for
// "Davidson" + "National Merit" return the Nevada school almost exclusively.
// Never attribute those figures here.

import type { CollegeSupportProgram } from '../collegeSupport.ts'

/* The 2021–25 acceptance list, verbatim from the School Profile: 255
   institutions that accepted at least one Davidson Day student across five
   graduating classes. Rank labels and bucket tags are scored against the 2026
   U.S. News tables; an institution outside those tables carries no tag, which
   is why many rows are untagged. Nothing here is marked `enrolling` — the
   school bolds nothing and does not publish which colleges students attended. */
const colleges = [
  { name: 'AMDA College of the Performing Arts (Los Angeles)', cats: [] },
  { name: 'Agnes Scott College', cats: ['lac75'] },
  { name: 'Alabama A&M University', cats: ['hbcu'] },
  { name: 'Allegheny College', cats: ['lac75'] },
  { name: 'American University', cats: [] },
  { name: 'Appalachian State University', cats: [] },
  { name: 'Auburn University', cats: ['p4'] },
  { name: 'Bard College', cats: [] },
  { name: 'Barry University', cats: [] },
  { name: 'Baylor University', cats: ['p4'] },
  { name: 'Belmont Abbey College', cats: [] },
  { name: 'Belmont University', cats: [] },
  { name: 'Benedictine University', cats: [] },
  { name: 'Bentley University', cats: [] },
  { name: 'Berry College', cats: [] },
  { name: 'Boston College', cats: ['nu75', 'p4'] },
  { name: 'Boston University', cats: ['nu75'] },
  { name: 'Brandeis University', cats: [] },
  { name: 'Brevard College', cats: [] },
  { name: 'Bridgewater College', cats: [] },
  { name: 'Brown University', cats: ['ivy', 'ivyplus', 'nu75'] },
  { name: 'Butler University', cats: [] },
  { name: 'California State University Long Beach', cats: [] },
  { name: 'Carnegie Mellon University', cats: ['nu75'] },
  { name: 'Case Western Reserve University', cats: ['nu75'] },
  { name: 'Catawba College', cats: [] },
  { name: 'Centre College', cats: ['lac75'] },
  { name: 'Christopher Newport University', cats: [] },
  { name: 'Clark University', cats: [] },
  { name: 'Clemson University', cats: ['nu75', 'p4'] },
  { name: 'Coastal Carolina University', cats: [] },
  { name: 'Colby College', cats: ['lac75'] },
  { name: 'Colgate University', cats: ['lac75'] },
  { name: 'College of Charleston', cats: [] },
  { name: 'Colorado College', cats: ['lac75'] },
  { name: 'Colorado School of Mines', cats: [] },
  { name: 'Colorado State University', cats: [] },
  { name: 'Columbia College Chicago (NOT Columbia University)', cats: [] },
  { name: 'Connecticut College', cats: ['lac75'] },
  { name: 'Cornell University', cats: ['ivy', 'ivyplus', 'nu75'] },
  { name: 'Dartmouth College', cats: ['ivy', 'ivyplus', 'nu75'] },
  { name: 'Davidson College', cats: ['lac75'] },
  { name: 'DePaul University', cats: [] },
  { name: 'Denison University', cats: ['lac75'] },
  { name: 'Drexel University', cats: [] },
  { name: 'Duke University', cats: ['ivyplus', 'nu75', 'p4'] },
  { name: 'East Carolina University', cats: [] },
  { name: 'East Tennessee State University', cats: [] },
  { name: 'East Texas A&M University', cats: [] },
  { name: 'Eastern Mennonite University', cats: [] },
  { name: 'Eckerd College', cats: [] },
  { name: 'Elon University', cats: [] },
  { name: 'Embry-Riddle Aeronautical University, Daytona Beach', cats: [] },
  { name: 'Emerson College', cats: [] },
  { name: 'Emmanuel College', cats: [] },
  { name: 'Erskine College', cats: [] },
  { name: 'Fairfield University', cats: [] },
  { name: 'Fisk University', cats: ['hbcu'] },
  { name: 'Flagler College', cats: [] },
  { name: 'Florida Atlantic University', cats: [] },
  { name: 'Florida Southern College', cats: [] },
  { name: 'Florida State University', cats: ['nu75', 'p4'] },
  { name: 'Fordham University', cats: [] },
  { name: 'Fort Lewis College', cats: [] },
  { name: 'Furman University', cats: ['lac75'] },
  { name: 'Gardner-Webb University', cats: [] },
  { name: 'George Mason University', cats: [] },
  { name: 'George Washington University', cats: [] },
  { name: 'Georgetown University', cats: ['ivyplus', 'nu75'] },
  { name: 'Georgia Institute of Technology', cats: ['nu75', 'p4'] },
  { name: 'Georgia Southern University', cats: [] },
  { name: 'Georgia State University', cats: [] },
  { name: 'Gettysburg College', cats: ['lac75'] },
  { name: 'Gonzaga University', cats: [] },
  { name: 'Greenville University', cats: [] },
  { name: 'Guilford College', cats: [] },
  { name: 'Hamline University', cats: [] },
  { name: 'Hampden-Sydney College', cats: [] },
  { name: 'High Point University', cats: [] },
  { name: 'Hofstra University', cats: [] },
  { name: 'Hollins University', cats: [] },
  { name: 'Indiana University Bloomington', cats: ['nu75', 'p4'] },
  { name: 'Iowa State University', cats: ['p4'] },
  { name: 'Ithaca College', cats: [] },
  { name: 'Jacksonville University', cats: [] },
  { name: 'James Madison University', cats: [] },
  { name: 'John Cabot University (Italy)', cats: [] },
  { name: 'Johnson & Wales University Charlotte', cats: [] },
  { name: 'Juniata College', cats: [] },
  { name: 'Kenyon College', cats: ['lac75'] },
  { name: 'Lenoir-Rhyne University', cats: [] },
  { name: 'Liberty University', cats: [] },
  { name: 'Lincoln Memorial University', cats: [] },
  { name: 'Louisiana State University', cats: ['p4'] },
  { name: 'Loyola Marymount University', cats: [] },
  { name: 'Loyola University Chicago', cats: [] },
  { name: 'Lynn University', cats: [] },
  { name: 'Manhattan School of Music', cats: [] },
  { name: 'Marist University', cats: [] },
  { name: 'Marquette University', cats: [] },
  { name: 'Mars Hill University', cats: [] },
  { name: 'Marymount Manhattan College', cats: [] },
  { name: 'Mercer University', cats: [] },
  { name: 'Merrimack College', cats: [] },
  { name: 'Methodist University', cats: [] },
  { name: 'Miami University (Ohio)', cats: [] },
  { name: 'Michigan State University', cats: ['nu75', 'p4'] },
  { name: 'Middlebury College', cats: ['lac75'] },
  { name: 'Montana State University', cats: [] },
  { name: 'Mount Holyoke College', cats: ['lac75'] },
  { name: 'Muhlenberg College', cats: [] },
  { name: 'Nazareth University', cats: [] },
  { name: 'New Jersey Institute of Technology', cats: [] },
  { name: 'North Carolina State University', cats: ['nu75', 'p4'] },
  { name: 'Northeastern University', cats: ['nu75'] },
  { name: 'Northwestern University', cats: ['ivyplus', 'nu75', 'p4'] },
  { name: 'Notre Dame College (Ohio — NOT Univ. of Notre Dame)', cats: [] },
  { name: 'Nova Southeastern University', cats: [] },
  { name: 'Oberlin College', cats: ['lac75'] },
  { name: 'Ohio University', cats: [] },
  { name: 'Oklahoma City University', cats: [] },
  { name: 'Old Dominion University', cats: [] },
  { name: 'Oxford College of Emory University', cats: [] },
  { name: 'Pace University', cats: [] },
  { name: 'Penn State Berks', cats: [] },
  { name: 'Penn State University', cats: [] },
  { name: 'Pepperdine University', cats: [] },
  { name: 'Point Loma Nazarene University', cats: [] },
  { name: 'Point Park University', cats: [] },
  { name: 'Pratt Institute (art & design)', cats: [] },
  { name: 'Presbyterian College', cats: [] },
  { name: 'Providence College', cats: [] },
  { name: 'Purdue University', cats: ['nu75', 'p4'] },
  { name: 'Queens University of Charlotte', cats: [] },
  { name: 'Quinnipiac University', cats: [] },
  { name: 'Radford University', cats: [] },
  { name: 'Randolph College', cats: [] },
  { name: 'Randolph-Macon College', cats: [] },
  { name: 'Rensselaer Polytechnic Institute', cats: [] },
  { name: 'Rhodes College', cats: ['lac75'] },
  { name: 'Richmond American University London (UK)', cats: [] },
  { name: 'Roanoke College', cats: [] },
  { name: 'Rochester Institute of Technology', cats: [] },
  { name: 'Rollins College', cats: [] },
  { name: 'Rutgers University', cats: ['nu75', 'p4'] },
  { name: 'Salve Regina University', cats: [] },
  { name: 'Samford University', cats: [] },
  { name: 'Savannah College of Art and Design (SCAD — art & design)', cats: [] },
  { name: 'Seton Hill University', cats: [] },
  { name: 'Sewanee: The University of the South', cats: ['lac75'] },
  { name: 'Siena University', cats: [] },
  { name: 'Smith College', cats: ['lac75'] },
  { name: 'Southern Methodist University', cats: ['p4'] },
  { name: 'Southwest Minnesota State University', cats: [] },
  { name: 'Spalding University', cats: [] },
  { name: 'St. Lawrence University', cats: [] },
  { name: 'Stetson University', cats: [] },
  { name: 'Stevenson University', cats: [] },
  { name: 'Suffolk University', cats: [] },
  { name: 'Susquehanna University', cats: [] },
  { name: 'Swarthmore College', cats: ['lac75'] },
  { name: 'Sweet Briar College', cats: [] },
  { name: 'Syracuse University', cats: ['nu75', 'p4'] },
  { name: 'Temple University', cats: [] },
  { name: 'Texas A&M University', cats: ['nu75', 'p4'] },
  { name: 'The College of Wooster', cats: [] },
  { name: 'The Ohio State University', cats: ['nu75', 'p4'] },
  { name: 'The University of Alabama', cats: ['p4'] },
  { name: 'The University of Edinburgh (UK)', cats: [] },
  { name: 'The University of Manchester (UK)', cats: [] },
  { name: 'The University of Montana', cats: [] },
  { name: 'The University of Tampa', cats: [] },
  { name: 'The University of Tennessee, Chattanooga', cats: [] },
  { name: 'The University of Tennessee, Knoxville', cats: [] },
  { name: 'Tulane University of Louisiana', cats: [] },
  { name: 'Tusculum University', cats: [] },
  { name: 'United States Air Force Academy', cats: ['lac75'] },
  { name: 'United States Military Academy at West Point', cats: ['lac75'] },
  { name: 'University College London (UK)', cats: [] },
  { name: 'University of Alabama at Birmingham', cats: [] },
  { name: 'University of Arizona', cats: ['nu75', 'p4'] },
  { name: 'University of California, Davis', cats: [] },
  { name: 'University of California, Merced', cats: [] },
  { name: 'University of California, Santa Cruz', cats: [] },
  { name: 'University of Charleston', cats: [] },
  { name: 'University of Chicago', cats: ['ivyplus', 'nu75'] },
  { name: 'University of Colorado Boulder', cats: ['nu75', 'p4'] },
  { name: 'University of Colorado Denver', cats: [] },
  { name: 'University of Connecticut', cats: ['nu75'] },
  { name: 'University of Copenhagen (Denmark)', cats: [] },
  { name: 'University of Dayton', cats: [] },
  { name: 'University of Denver', cats: [] },
  { name: 'University of Florida', cats: ['nu75', 'p4'] },
  { name: 'University of Georgia', cats: ['nu75', 'p4'] },
  { name: 'University of Iowa', cats: ['p4'] },
  { name: 'University of Kentucky', cats: ['p4'] },
  { name: 'University of Lynchburg', cats: [] },
  { name: 'University of Mary Washington', cats: [] },
  { name: 'University of Maryland', cats: ['nu75', 'p4'] },
  { name: 'University of Massachusetts Amherst', cats: ['nu75'] },
  { name: 'University of Miami', cats: ['nu75', 'p4'] },
  { name: 'University of Michigan', cats: ['nu75', 'p4'] },
  { name: 'University of Minnesota Twin Cities', cats: [] },
  { name: 'University of Mississippi', cats: ['p4'] },
  { name: 'University of Missouri', cats: ['p4'] },
  { name: 'University of Nevada, Las Vegas', cats: [] },
  { name: 'University of North Carolina School of the Arts', cats: [] },
  { name: 'University of North Carolina Wilmington', cats: [] },
  { name: 'University of North Carolina at Asheville', cats: [] },
  { name: 'University of North Carolina at Chapel Hill', cats: ['nu75', 'p4'] },
  { name: 'University of North Carolina at Charlotte', cats: [] },
  { name: 'University of North Carolina at Greensboro', cats: [] },
  { name: 'University of North Carolina at Pembroke', cats: [] },
  { name: 'University of North Dakota', cats: [] },
  { name: 'University of North Florida', cats: [] },
  { name: 'University of Pittsburgh', cats: ['nu75', 'p4'] },
  { name: 'University of Richmond', cats: ['lac75'] },
  { name: 'University of Rochester', cats: ['nu75'] },
  { name: 'University of San Francisco', cats: [] },
  { name: 'University of South Carolina Beaufort', cats: [] },
  { name: 'University of South Carolina', cats: ['p4'] },
  { name: 'University of South Florida', cats: [] },
  { name: 'University of Toronto (Canada)', cats: [] },
  { name: 'University of Utah', cats: ['p4'] },
  { name: 'University of Vermont', cats: [] },
  { name: 'University of Virginia', cats: ['nu75', 'p4'] },
  { name: 'University of Washington', cats: ['nu75', 'p4'] },
  { name: 'University of Wisconsin-Madison', cats: ['nu75', 'p4'] },
  { name: 'University of Wyoming', cats: [] },
  { name: 'Vanderbilt University', cats: ['nu75', 'p4'] },
  { name: 'Vassar College', cats: ['lac75'] },
  { name: 'Villanova University', cats: ['nu75'] },
  { name: 'Virginia Commonwealth University', cats: [] },
  { name: 'Virginia Polytechnic Institute and State University', cats: ['nu75', 'p4'] },
  { name: 'Virginia Wesleyan University', cats: [] },
  { name: 'Wake Forest University', cats: ['nu75', 'p4'] },
  { name: 'Warren Wilson College', cats: [] },
  { name: 'Wartburg College', cats: [] },
  { name: 'Washington State University', cats: [] },
  { name: 'Washington University in St. Louis', cats: ['ivyplus', 'nu75'] },
  { name: 'Washington and Lee University', cats: ['lac75'] },
  { name: 'Wentworth Institute of Technology', cats: [] },
  { name: 'West Virginia University', cats: ['p4'] },
  { name: 'Western Carolina University', cats: [] },
  { name: 'Western New England University', cats: [] },
  { name: 'Westmont College', cats: [] },
  { name: 'Wheaton College (MA)', cats: [] },
  { name: 'Widener University', cats: [] },
  { name: 'William & Mary', cats: ['nu75'] },
  { name: 'Williams College', cats: ['lac75'] },
  { name: 'Wingate University', cats: [] },
  { name: 'Winston-Salem State University', cats: ['hbcu'] },
  { name: 'Wofford College', cats: ['lac75'] },
  { name: 'Woodbury University', cats: [] },
  { name: 'Xavier University', cats: [] },
]

const PROFILE =
  'https://resources.finalsite.net/images/v1764962120/davidsondayorg/nlxzlvymosnampuadraw/2526CollegeProfile.pdf'
const COUNSELING = 'https://www.davidsonday.org/academics/college-counseling'

export const davidsonDay: CollegeSupportProgram = {
  /* The area's FIRST card. Unlike every other card here, these figures are
     GOVERNMENT-published — the UNC System's Insight dashboard, pulled via the
     nc-admissions-data skill — rather than the school’s own marketing number.
     Full per-term counts, the exact filter values and the provenance header are in
     source-material/college-support/davidson-day/
     Davidson Day School - College Support - UNC System Admissions.md.

     Every rate ships with its denominator: these are small cells, and a bare
     percentage off a single-digit base is not publishable. The five-year figure is
     POOLED — sum(admitted)/sum(applied) over the five most recent terms — never the
     mean of the five annual rates. */
  ncAdmissions: {
    headline:
      'Across the six top-ranked NC public universities, Davidson Day School’s applicants were admitted at a pooled 59.4% over the last five entering classes — 177 acceptances from 298 applications.',
    subhead:
      'UNC-Chapel Hill is the hard one: 44.4% pooled there, against far higher rates at the less-selective campuses. These are UNC-system figures published by the state, not the school’s own.',
    stats: [
      { value: '298', label: 'applications to the six campuses, Fall 2021–2025' },
      { value: '59.4%', label: 'pooled admit rate — 177 of 298 across those five classes' },
      { value: '44.4%', label: 'at UNC-Chapel Hill — 40 of 90, the most selective of the six' },
      { value: 'UNC-Chapel Hill', label: 'drew the most applications in Fall 2025 (25)' },
    ],
    latestTerm: '2025',
    universities: [
      {
        key: 'unc-chapel-hill',
        name: 'UNC-Chapel Hill',
        rank: 1,
        note: 'Flagship · the most selective of the six',
        applied: '25',
        accepted: '10',
        rate: '40.0%',
        ratePct: 0.4,
        fiveYearRate: '44.4%',
        fiveYearApplied: '90',
        fiveYearAccepted: '40',
      },
      {
        key: 'nc-state-university',
        name: 'NC State University',
        rank: 2,
        note: 'Flagship STEM · Raleigh',
        applied: '21',
        accepted: '9',
        rate: '42.9%',
        ratePct: 0.429,
        fiveYearRate: '42.4%',
        fiveYearApplied: '92',
        fiveYearAccepted: '39',
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
        fiveYearRate: '86.1%',
        fiveYearApplied: '36',
        fiveYearAccepted: '31',
      },
      {
        key: 'east-carolina-university',
        name: 'East Carolina University',
        rank: 4,
        note: 'Greenville · largest admit rates of the six',
        applied: '6',
        accepted: '6',
        rate: '100.0%',
        ratePct: 1,
        fiveYearRate: '100.0%',
        fiveYearApplied: '28',
        fiveYearAccepted: '28',
      },
      {
        key: 'unc-wilmington',
        name: 'UNC Wilmington',
        rank: 5,
        note: 'Coastal · mid-selectivity',
        applied: '9',
        accepted: '7',
        rate: '77.8%',
        ratePct: 0.778,
        fiveYearRate: '69.0%',
        fiveYearApplied: '42',
        fiveYearAccepted: '29',
      },
      {
        key: 'unc-greensboro',
        name: 'UNC Greensboro',
        rank: 6,
        note: 'Piedmont Triad',
        applied: '3',
        accepted: '3',
        rate: '100.0%',
        ratePct: 1,
        fiveYearRate: '100.0%',
        fiveYearApplied: '10',
        fiveYearAccepted: '10',
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
      'Davidson Day publishes its grading machinery in full — the scale, the weighting, and an unusually explicit list of what is excluded from the GPA — but no AP exam results and no National Merit record at all.',
    subhead:
      'The School Profile does the work test scores would otherwise do: full quality-point table, +0.5 Honors / +1.0 AP, a stated no-rank policy, and a three-point GPA distribution that discloses a 2.49 floor.',
    stats: [
      { value: '21', label: 'AP courses offered in 2025–26 (derived count — the school publishes no total)' },
      { value: 'Not published', label: 'AP exams sat, % scoring 3+, and exam policy' },
      { value: 'No rank', label: '“Davidson Day does not rank its students”' },
      { value: '4.60 / 3.96 / 2.49', label: 'Class of 2026 GPA — highest, median, lowest' },
    ],
    // No merit ledger: the school publishes no National Merit record of any
    // kind, so the block is omitted rather than shown empty.
    merit: [],
    depth: [
      {
        label: 'Mathematics',
        text: 'Calculus III (Post AP) — the only named post-AP course, and explicitly weighted +1.0 like an AP.',
      },
      {
        label: 'Computer science',
        text: 'Tops out at AP Computer Science A; there is no post-AP CS course. A new Intro to AI is listed but flagged as not offered in 2025–26.',
      },
      {
        label: 'World language',
        text: 'AP Spanish Language and AP French Language run; AP Spanish Literature is listed but not offered this year. Honors sequences reach Spanish V and French V.',
      },
      {
        label: 'Beyond campus',
        text: 'Independent Studies and any course taken online are excluded from the GPA. No dual-enrollment partnership is published — notable given Davidson College sits one mile away. The real off-campus depth is AFAR international field research.',
      },
    ],
    trust: [
      {
        label: 'Weighted, with a published table',
        text: 'A 93–100, A− 3.67, down to D− 0.67, all printed. Honors carry +0.5, AP +1.0, and Calculus III +1.0 — the post-AP course is explicitly given AP weight.',
      },
      {
        label: 'No rank → three summary points',
        text: 'The Profile gives the Class of 2026 highest (4.60), median (3.96) and lowest (2.49) GPA, transfers excluded. There is no quintile or decile table, so the shape of the distribution stays hidden.',
      },
      {
        label: 'Unusually explicit exclusions',
        text: 'Transfer courses, Upper School courses taken in Middle School, Independent Studies and any online course are all excluded; the GPA reflects only work done at Davidson Day.',
      },
    ],
    flags: [
      {
        kind: 'verify',
        text: 'The 21-AP figure is a derived count of distinct College Board courses in the Profile’s table, excluding four marked “not offered in 25-26” and excluding Calculus III. The school prints no AP total, and PrivateSchoolReview reports a non-reconciling “23 AP/advanced courses”.',
      },
      {
        kind: 'gap',
        text: 'No AP exam results of any kind are published — not the number of exams sat, the number of students, the share scoring 3+, nor whether students in an AP course are required to sit the exam. Offerings tell you what a student may take; they say nothing about outcomes.',
      },
      {
        kind: 'gap',
        text: 'No National Merit or College Board recognition record could be located in the school’s materials, its news feed, or National Merit Scholarship Corporation listings. Unpublished is not the same as zero — at a class size of ~47 a nil or low-single-digit count would be unremarkable.',
      },
      {
        kind: 'gap',
        text: '“Most rigorous course load” is never defined: no stated AP maximum, no published access gate, and no description of how the school answers the Common App’s curriculum-rigor question.',
      },
    ],
    sources: [
      { label: 'davidsonday.org — School Profile 2025–26 (grading scale, weighting, GPA distribution, course catalog)', url: PROFILE },
      { label: 'Upper School — course model', url: 'https://www.davidsonday.org/academics/upper-school' },
    ],
  },

  counseling: {
    headline:
      'Two counselors for 198 Upper Schoolers — roughly 1:99, and about 1:24 across the 47 seniors — with the office’s stated start point in 9th grade rather than junior year.',
    subhead:
      'The small caseload is the credible part. What is missing is any written commitment about what the office actually guarantees: no published review-before-submission promise, no ED/EA stance, no recommendation protocol.',
    stats: [
      { value: '~1:99', label: 'counselors to Upper School students (derived — no ratio is published)' },
      { value: '2', label: 'college counselors, plus a registrar' },
      { value: '9th grade', label: 'when the office says counseling begins' },
      { value: 'Scoir', label: 'platform for applications and rep-visit scheduling' },
    ],
    roster: [
      {
        role: 'Director',
        name: 'Tia Hill',
        detail: 'Prior roles at Furman University per LinkedIn; M.Ed. Counselor Education, Clemson. Tenure at Davidson Day is not published.',
      },
      {
        role: 'Assoc. Director',
        name: 'Caitlin Barndt',
        detail: 'Previously listed as College Counseling and Admission Associate. Named contact for scheduling college rep visits.',
      },
      {
        role: 'Registrar',
        name: 'Vanessa Noe',
        detail: 'Owns the transcript function.',
      },
    ],
    timelineTitle: 'The published event slate — the office runs a predictable annual calendar',
    timeline: [
      {
        grade: 'Fall',
        intensity: 'Senior-weighted',
        items: ['Senior Night', 'Junior Planning Night', 'College 101', 'Senior Application Boot Camp'],
        note: 'College rep visits run Monday–Friday throughout the fall.',
      },
      {
        grade: 'Spring',
        intensity: 'Underclass + families',
        items: [
          'Financial Aid Night',
          'Athletic Recruitment Workshop',
          'Case Studies Program & College Fair, co-hosted with Cannon School',
          'Freshman & Sophomore Planning Night',
        ],
        note: 'The fair drew nearly 70 colleges; families sit as a mock admissions committee.',
      },
    ],
    mechanicsTitle: 'What the office says it covers',
    mechanics: [
      'Balanced college list',
      'Standardized test planning',
      'Application essays',
      'Financial aid process',
      'Career planning',
      'Final enrollment decision',
    ],
    mechanicsNote:
      'Applications and materials are submitted through Scoir. Note what is absent from that list: teacher recommendations appear only as a Scoir submission step, with no published policy on how many, how teachers are approached, or how the office supports them.',
    reach: [
      '**80+** college reps hosted per year — high per-student exposure for a 198-student Upper School',
      '**~70** colleges at the co-hosted Lake Norman case-studies fair',
      'Scoir · a current, publicly linked 4-page School Profile · NCAA eligibility resources',
    ],
    flags: [
      {
        kind: 'verify',
        text: 'Both ratios are derived (198 ÷ 2 and 47 ÷ 2). The school never states a counselor-to-student ratio, and publishes no caseload assignment method or the point at which a student is assigned a counselor.',
      },
      {
        kind: 'discrepancy',
        text: 'Rep visits appear as a marketing benchmark of “more than 80” per year, while a documented recent count is ~71 (nearly 80% out-of-state). Both figures are shown; the lower one could not be re-verified live.',
      },
      {
        kind: 'gap',
        text: 'No grade-by-grade curriculum map is published. The live page carries no 9/10/11/12 breakdown — only “begins in 9th grade” plus the fall/spring event list, whose names map to grades only loosely.',
      },
      {
        kind: 'gap',
        text: 'The office publishes no commitment that every application is read before submission, no Early Decision / Early Action doctrine, and no counselor campus-visit count. A two-person office can plausibly review everything — but it never says so in writing.',
      },
    ],
    sources: [
      { label: 'davidsonday.org — College Counseling', url: COUNSELING },
      { label: 'School Profile 2025–26 (staff, enrollment, memberships)', url: PROFILE },
      { label: 'Staff details partly from aggregated professional profiles — self-reported, flagged', },
    ],
  },

  outcomes: {
    headline:
      'The Class of 2025 — 53 graduates — drew 258 acceptances, enrolled 100% at four-year institutions, and was offered more than $7.4M in merit aid.',
    subhead:
      'The big list below is a five-year cumulative acceptance list (2021–2025), not a matriculation list: 255 institutions, each of which admitted at least one Davidson Day student across five graduating classes.',
    stats: [
      { value: '100%', label: 'of the Class of 2025 matriculated to a four-year institution' },
      { value: '258', label: 'acceptances for 53 graduates · 35 different colleges selected' },
      { value: '3 of 8', label: 'Ivy League on the five-year list — absent Columbia, Harvard, Penn, Princeton, Yale' },
      { value: '$7.4M+', label: 'merit aid offered (not accepted) — Class of 2025' },
    ],
    buckets: [
      { tier: 'Ivy League', count: '3 / 8', note: '— Brown, Cornell, Dartmouth' },
      { tier: '“Ivy Plus”', count: '8 / 17', note: '— absent MIT, Stanford, Johns Hopkins, Caltech' },
      { tier: 'Top-75 National Universities', count: '44 / 75' },
      { tier: 'Top-75 Liberal Arts', count: '26 / 75', note: '— includes 2 service academies' },
      { tier: 'Power Four', count: '42 / 68' },
      { tier: 'HBCUs', count: '3 / 107', note: '— Historically Black Colleges & Universities' },
    ],
    bucketsNote:
      'Counts are computed from the same 255-institution list you can filter at right, scored against the 2026 U.S. News tables — they are derived, not school-published. Two service academies rank as Liberal Arts Colleges in that system (Air Force #5, West Point #13), so the LAC figure should not be read as 26 civilian colleges.',
    collegesTitle: 'Every acceptance, 2021–2025',
    colleges,
    collegesTotal: '255 institutions across five graduating classes',
    scholarships: [
      '$7.4M+ merit offered · Class of 2025',
      '11 NCAA student-athletes',
      '28 National Honor Society members',
      'USAFA swimming signing (Matthew Doty)',
    ],
    scholarshipsNote:
      'The $7.4M is the school’s own wording — “offered”, not accepted, so it includes awards from colleges no student attended. The number of students receiving merit, the median award, and the accepted total are all unpublished, as are Morehead-Cain, Robertson, QuestBridge and ROTC outcomes.',
    caveat:
      'this is a five-year cumulative acceptance list, not a matriculation list. A college earns a place by admitting one student at any point across five classes, so the list measures breadth, not placement. Nothing on it is bolded or otherwise marked to show enrollment — the school reports that the Class of 2025 “selected 35 different colleges” but never names them. This window begins in 2021, two years before the 2023 floor the other schools here share: the 2025–26 profile still prints this single 2021–2025 block with no per-class breakdown, so the pre-2023 classes cannot be split off without discarding the list, and no narrower or newer named list is published.',
    flags: [
      {
        kind: 'gap',
        text: 'Which colleges students actually enrolled at is not published, and neither is any repeat-pipeline or per-college yield data. You cannot infer a pipeline to any single college from this list.',
      },
    ],
    sources: [
      { label: 'davidsonday.org — School Profile 2025–26 (full 2021–25 acceptance list, Class of 2025 outcomes)', url: PROFILE },
      { label: 'College Counseling — Class of 2025 outcomes', url: COUNSELING },
      { label: 'U.S. News — National Universities rankings (tier scoring)', url: 'https://www.usnews.com/best-colleges/rankings/national-universities' },
      { label: 'U.S. News — National Liberal Arts Colleges rankings', url: 'https://www.usnews.com/best-colleges/rankings/national-liberal-arts-colleges' },
    ],
  },

  edge: {
    headline:
      'For a 198-student Upper School, the spike-building machinery is disproportionate: real permitted archaeology abroad, and a Global Studies Diploma that sends a second transcript and profile to colleges.',
    subhead:
      'What the school cannot offer is institutional name recognition — so the leverage it does control is the Profile itself, rep-visit volume, and counselor access.',
    levers: [
      {
        title: 'Lever 1 — Build the spike',
        glyph: '◆',
        items: [
          '**AFAR international field research** — authentic archaeological excavation in Belize (since 2009), Spain (2014), Greece (2017) and Portugal (2018). The Belize dig runs with the BVAR project under permit from the Belize Institute of Archaeology at Cahal Pech; the program’s history appears in peer-reviewed literature (*Heritage*, 2020). Students publish and present at international conferences.',
          '**Global Studies Diploma** — Honors Anthropology core, four approved AP courses, a language requirement, a minimum two weeks of international field research, and a capstone paper. Critically, it *produces a separate transcript and profile sent to colleges* — an extra document in the file, not a line on the transcript.',
          '**STEMM and Business & Civic Engagement Diplomas** — each requires at least 100 hours of approved internship or practicum, quarterly Ethics Labs, an 11th-grade Research Methods Honors course, a 12th-grade Capstone Research Honors mentorship, and a public presentation at the Scholars Research Conference.',
          '**Recruiting and arts tracks** — an annual Athletic Recruitment Workshop and National Signing Day events (one recent day saw seven NLI signings); AP Studio Art plus portfolio outcomes at SCAD, Pratt, Manhattan School of Music, UNCSA and AMDA.',
        ],
        note:
          'Required internship/capstone applies only to Diploma Distinction candidates — there is no school-wide required internship or senior project. Participation counts for AFAR ("hundreds", "150+", "200+") are all program-wide across many schools; how many Davidson Day students specifically have taken part is not published.',
      },
      {
        title: 'Lever 2 — The school’s leverage',
        glyph: '▲',
        items: [
          '**The School Profile as an instrument** — the strongest lever here, and well executed. Four pages, current, publicly linked: full grading scale and weighting, GPA exclusions, the Class of 2026 GPA range, the complete course catalog with unoffered courses clearly flagged, graduation requirements, the Honor Code, and the five-year acceptance list. For a reader who has never been to Davidson, NC, it frames a student without leaning on test scores or rank — precisely the job it has to do.',
          '**Integrity signalling** — the Honor Code is published verbatim, and the school holds the standard ethical-practice memberships: NACAC, SACAC and ACCIS, alongside NAIS, SAIS, NCAIS, NCISAA and College Board.',
          '**Regional co-hosting** — each spring Davidson Day co-hosts the Lake Norman Area College Admissions Case Studies Program and College Fair with Cannon School, putting families inside a mock admissions committee reading real (fictionalised) files.',
          '**Proximity, not partnership** — Davidson College is one mile away and appears on the acceptance list, but no dual-enrollment, course-access or preferred-admission arrangement is published. The proximity is a fact, not a documented pipeline.',
        ],
        note:
          'The disciplinary-reporting half of integrity signalling is undisclosed: whether suspensions or honor-code violations are reported on the secondary school report, and how a student may explain an incident, is not published.',
      },
    ],
    flags: [],
    sources: [
      { label: 'davidsonday.org — Global Studies Diploma', url: 'https://www.davidsonday.org/academics/diploma-distinctions/global-studies' },
      { label: 'School Profile 2025–26 (AFAR, Honor Code, memberships)', url: PROFILE },
      { label: 'AFAR — program history', url: 'https://www.goafar.org/history' },
      { label: 'Heritage (2020) — peer-reviewed BVAR public-engagement history', url: 'https://www.mdpi.com/2571-9408/3/3/40' },
    ],
  },

  wholeClass: {
    headline:
      'Davidson Day withholds all SAT and ACT data by choice — “due to the popularity of test-optional policies, we will not be providing the testing profiles for the Class of 2026”.',
    subhead:
      'What remains is a three-point GPA disclosure, a genuinely staffed Learning Enrichment Center, and an acceptance list broad enough to show the middle of the class is served.',
    // No score tables at all: the school publishes neither SAT nor ACT figures,
    // and aggregator numbers are user-submitted, so the block is omitted.
    scoreTables: [],
    gpaTitle: 'GPA distribution',
    gpaHint: '— the no-rank mechanism · Class of 2026, transfers excluded',
    quintiles: [
      { label: 'Highest', gpa: '4.60', detail: 'on a scale where APs add a full point' },
      { label: 'Median', gpa: '3.96', detail: 'the midpoint — no mean is published' },
      { label: 'Lowest', gpa: '2.49', detail: 'the school discloses its floor' },
    ],
    gpaNote:
      'Three summary points is the entire disclosure — there is no quintile or decile table, so an admissions reader learns the range and the midpoint but nothing about the shape: how tightly the class clusters, how many sit above 4.0, or where the 25th percentile falls. Publishing a 2.49 low alongside a 4.60 high is nonetheless a transparency choice many peer schools avoid.',
    support: [
      {
        label: 'The Learning Enrichment Center',
        text: 'A genuinely staffed support structure rather than an accommodations desk: one-on-one tutoring during or outside the school day, academic coaching and executive-function support, social-skills groups, speech-language therapy and occupational therapy.',
      },
      {
        label: 'Continuity',
        text: 'Coverage runs from age two through grade twelve, so support does not stop at the Upper School door. Tutors work in partnership with families and classroom teachers to clarify learning weaknesses and strengthen executive functioning.',
      },
      {
        label: 'Where it stops',
        text: 'How the LEC documents approved accommodations so they carry over to College Board / ACT testing and to college disability services is described nowhere. The support is well documented; its hand-off into the application process is not.',
      },
    ],
    supportNote:
      'No LEC staff are named — no roster, titles, credentials or headcount — and whether services carry a fee beyond tuition is not stated.',
    middle: [
      {
        label: 'The list is the evidence',
        text: 'The 2021–25 list spans Brown, Dartmouth, Cornell and Chicago down through broad-access institutions — Belmont Abbey, Brevard, Catawba, Mars Hill, Methodist, Wingate, Gardner-Webb, Lenoir-Rhyne, UNC Pembroke, Winston-Salem State. A school placing only its top quartile would not produce that range.',
      },
      {
        label: 'No rank, by design',
        text: 'In a 47-person class, an ordinal position is far more damaging than informative. The no-rank policy is a structural choice that protects the middle, and the spring Case Studies Program teaches families to read admissions as institutional need rather than applicant ranking.',
      },
      {
        label: 'Non-traditional destinations',
        text: 'Service academies (Air Force, West Point); conservatories and arts institutes (Manhattan School of Music, UNCSA, Pratt, SCAD, AMDA); seven international universities across five countries (UCL, Edinburgh, Manchester, Toronto, Copenhagen, John Cabot, Richmond American London); and specialised technical schools (Embry-Riddle, Colorado School of Mines, RPI, RIT).',
      },
    ],
    flags: [
      {
        kind: 'gap',
        text: 'All SAT and ACT data is withheld — percentiles, means, and even the number of testers. The count of testers is as revealing as the scores, since it shows whether the class is testing at all; neither is available. This is a disclosure decision tied to test-optional admissions, not a signal about how students score.',
      },
      {
        kind: 'gap',
        text: 'No gap-year policy or counselling is published, and no quintile table, decile table or mean GPA.',
      },
    ],
    sources: [
      { label: 'davidsonday.org — School Profile 2025–26 (testing statement, GPA distribution)', url: PROFILE },
      { label: 'Learning Enrichment Center', url: 'https://www.davidsonday.org/academics/learning-enrichment-center' },
      { label: 'Aggregator score ranges consulted and deliberately NOT used — user-submitted, not school-reported', },
    ],
  },

  verdict: {
    headline:
      'A small, program-rich school whose strengths are process, access and spike-building — and whose weakness is disclosure.',
    subhead:
      'Every verdict point below is about what the school does. A family that evaluates schools on published outcome metrics will find less here than anywhere else in this set, which puts the burden of verification on the tour.',
    points: [
      {
        label: 'The spike machinery is real and credited',
        text: 'AFAR is not a service trip: excavation under permit at Cahal Pech with the BVAR project, four countries with documented start years, students publishing and presenting at conferences, and a program history in peer-reviewed literature.',
      },
      {
        label: 'The Global Studies Diploma sends a second transcript',
        text: 'Structurally different from an honours cord — the Profile states an additional transcript and profile go to colleges, backed by language study, two weeks of international field research and a capstone paper.',
      },
      {
        label: 'The caseload is genuinely small, and starts in 9th grade',
        text: 'Two counselors for 198 Upper Schoolers (~1:99, ~1:24 at senior level) makes the “individualized” language credible rather than promotional.',
      },
      {
        label: 'The Profile does the work test scores would',
        text: 'Full grading scale, explicit weighting and exclusions, GPA range and median, the complete catalog with unoffered courses flagged, and a five-year acceptance list — with a disclosed 2.49 GPA floor.',
      },
      {
        label: 'Rep-visit volume is high per student',
        text: '80+ reps a year at a 198-student Upper School, visits running all fall, plus a spring case-studies program and fair co-hosted with Cannon School that drew nearly 70 colleges.',
      },
    ],
    checklist: [
      'You don’t publish AP exam results — what share of AP exams scored 3 or higher last year, what share were 4s and 5s, and are students in an AP course required to sit the exam?',
      'The Profile says you won’t provide testing profiles. What were the actual middle-50% SAT and ACT ranges for the last class, and how many students tested?',
      'Has Davidson Day had any National Merit Semifinalists, Finalists or Commended Students in the last five years? (Be explicit you mean the NC school — the name collides with Davidson Academy in Nevada.)',
      'You publish a highest, median and lowest GPA but no quintiles. How many of the seniors are above a 4.0, and where does the 25th percentile fall?',
      'Which 35 colleges did the Class of 2025 actually enroll at, and which colleges take a Davidson Day student most years?',
      'Does someone read every application before it’s submitted? What’s your stance on binding Early Decision, and how do you handle teacher recommendations?',
      'Davidson College is one mile away — is there any dual-enrollment, course-access or partnership arrangement with them, or with UNC Charlotte?',
      'If my child has accommodations through the Learning Enrichment Center, who gets those approved for College Board and ACT testing, and documented for college disability services?',
    ],
    flags: [],
    sources: [
      { label: 'davidsonday.org — College Counseling', url: COUNSELING },
      { label: 'School Profile 2025–26', url: PROFILE },
      { label: 'Verdict synthesised by the researcher from the sources cited on the cards above', },
    ],
  },
}
