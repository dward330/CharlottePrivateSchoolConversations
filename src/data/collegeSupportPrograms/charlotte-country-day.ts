// Charlotte Country Day School — the six College Support cards.
//
// Every figure is transcribed from the school's OWN published materials —
// chiefly the 2025–26 and 2024–25 School Profile PDFs, the College Acceptances
// PDFs, the College Counseling pages, and dated news posts. See
// source-material/college-support/charlotte-country-day/CCD - College Support -
// Redesign Research 2026.md for the hard data, source URLs, and gap notes.
//
// Two things make CCD's data distinctive, and both are reflected below:
//
//  1. It is the only school in this set running a full IB Diploma Programme
//     alongside its AP catalog — a second legible path to maximum rigor.
//  2. Its 2025–26 profile DROPPED the SAT/ACT middle-50% ranges its 2024–25
//     edition published, replacing them with median SAT/ACT per GPA quintile.
//     So the score tables below carry the Class of 2024 figures (the most recent
//     the school has ever published) and say so, while the quintile table
//     carries the newer, richer Class of 2025 cut.
//
// The `enrolling` markers were recovered by the researcher from the acceptance
// PDF's embedded font runs, since the bold that marks matriculation is lost in
// plain-text extraction. That method returned 69 names against the school's own
// stated count of 70 — a ~97%-complete recovery, noted on the card rather than
// silently rounded.

import type { CollegeSupportProgram } from '../collegeSupport.ts'

/* The Classes of 2023–2026 acceptance list, as of 5/28/2026: 320 institutions.
   `enrolling` follows the PDF's own key — bold marks a school enrolling one or
   more members of the Class of 2026. Rank labels and buckets are scored against
   the 2026 U.S. News tables. */
const colleges = [
  { name: 'Agnes Scott College', rankLabel: 'Liberal Rank #62', cats: ['lac75'], enrolling: true },
  { name: 'Albany State University', cats: [] },
  { name: 'Allegheny College', rankLabel: 'Liberal Rank #72', cats: ['lac75'] },
  { name: 'American University', cats: [] },
  { name: 'Amherst College', rankLabel: 'Liberal Rank #2', cats: ['lac75'] },
  { name: 'Anderson University', cats: [] },
  { name: 'Appalachian State University', cats: [], enrolling: true },
  { name: 'Arizona State University', cats: ['p4'] },
  { name: 'Art Center College of Design', cats: [] },
  { name: 'Auburn University', rankLabel: 'National Rank #105', cats: ['p4'], enrolling: true },
  { name: 'Ball State University', cats: [] },
  { name: 'Bard College', cats: [] },
  { name: 'Barnard College', rankLabel: 'Liberal Rank #22', cats: ['lac75'] },
  { name: 'Bates College', rankLabel: 'Liberal Rank #21', cats: ['lac75'], enrolling: true },
  { name: 'Baylor University', rankLabel: 'National Rank #93', cats: ['p4'] },
  { name: 'Belmont Abbey College', cats: [] },
  { name: 'Belmont University', cats: [] },
  { name: 'Berklee College of Music', cats: [], enrolling: true },
  { name: 'Berry College', cats: [] },
  { name: 'Birmingham-Southern College', cats: [] },
  { name: 'Boston College', rankLabel: 'National Rank #37', cats: ['nu75', 'p4'] },
  { name: 'Boston University', rankLabel: 'National Rank #41', cats: ['nu75'], enrolling: true },
  { name: 'Brandeis University', cats: [] },
  { name: 'Brenau University', cats: [] },
  { name: 'Bridgewater College', cats: [] },
  { name: 'Brigham Young University', cats: ['p4'] },
  { name: 'Brown University', rankLabel: 'National Rank #13', cats: ['ivy', 'ivyplus', 'nu75'] },
  { name: 'Bryn Mawr College', rankLabel: 'Liberal Rank #29', cats: ['lac75'] },
  { name: 'Bucknell University', rankLabel: 'Liberal Rank #33', cats: ['lac75'], enrolling: true },
  { name: 'Butler University', cats: [] },
  { name: 'Campbell University', cats: [] },
  { name: 'Cape Fear Community College', cats: [] },
  { name: 'Carnegie Mellon University', rankLabel: 'National Rank #21', cats: ['nu75'], enrolling: true },
  { name: 'Case Western Reserve University', rankLabel: 'National Rank #51', cats: ['nu75'] },
  { name: 'Catawba College', cats: [] },
  { name: 'Central Michigan University', cats: [] },
  { name: 'Central Piedmont Community College', cats: [] },
  { name: 'Christopher Newport University', cats: [] },
  { name: 'Clark Atlanta University', cats: [], enrolling: true },
  { name: 'Clarkson University', cats: [] },
  { name: 'Clemson University', rankLabel: 'National Rank #57', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Coastal Carolina University', cats: [] },
  { name: 'Colby College', rankLabel: 'Liberal Rank #18', cats: ['lac75'] },
  { name: 'Colgate University', rankLabel: 'Liberal Rank #17', cats: ['lac75'] },
  { name: 'College of Charleston', cats: [], enrolling: true },
  { name: 'College of the Holy Cross', rankLabel: 'Liberal Rank #33', cats: ['lac75'] },
  { name: 'Colorado College', rankLabel: 'Liberal Rank #32', cats: ['lac75'] },
  { name: 'Colorado State University', cats: [] },
  { name: 'Columbia College Chicago', cats: [] },
  { name: 'Columbia University', rankLabel: 'National Rank #13', cats: ['ivy', 'ivyplus', 'nu75'] },
  { name: 'Columbus State University', cats: [] },
  { name: 'Connecticut College', rankLabel: 'Liberal Rank #51', cats: ['lac75'] },
  { name: 'Cornell University', rankLabel: 'National Rank #12', cats: ['ivy', 'ivyplus', 'nu75'] },
  { name: 'Dartmouth College', rankLabel: 'National Rank #13', cats: ['ivy', 'ivyplus', 'nu75'] },
  { name: 'Davidson College', rankLabel: 'Liberal Rank #13', cats: ['lac75'] },
  { name: 'Delaware State University', cats: [] },
  { name: 'Denison University', rankLabel: 'Liberal Rank #44', cats: ['lac75'] },
  { name: 'DePaul University', cats: [] },
  { name: 'DePauw University', rankLabel: 'Liberal Rank #47', cats: ['lac75'] },
  { name: 'Dickinson College', rankLabel: 'Liberal Rank #42', cats: ['lac75'] },
  { name: 'Drew University', cats: [] },
  { name: 'Drexel University', cats: [] },
  { name: 'Duke Kunshan University', cats: [] },
  { name: 'Duke University', rankLabel: 'National Rank #7', cats: ['ivyplus', 'nu75', 'p4'], enrolling: true },
  { name: 'Duquesne University', cats: [] },
  { name: 'Durham University', cats: [] },
  { name: 'Earlham College', cats: [] },
  { name: 'East Carolina University', cats: [], enrolling: true },
  { name: 'East Tennessee State University', cats: [] },
  { name: 'Elizabeth City State University', cats: [] },
  { name: 'Elon University', cats: [], enrolling: true },
  { name: 'Embry-Riddle Aeronautical University', cats: [], enrolling: true },
  { name: 'Emerson College', cats: [] },
  { name: 'Emory University', rankLabel: 'National Rank #24', cats: ['nu75'], enrolling: true },
  { name: 'Endicott College', cats: [] },
  { name: 'Fairfield University', cats: [] },
  { name: 'Fayetteville State University', cats: [] },
  { name: 'Fisher College', cats: [] },
  { name: 'Florida A&M University', cats: [] },
  { name: 'Florida Atlantic University', cats: [] },
  { name: 'Florida Gulf Coast University', cats: [] },
  { name: 'Florida Institute of Technology', cats: [], enrolling: true },
  { name: 'Florida International University', cats: [] },
  { name: 'Florida State University', rankLabel: 'National Rank #51', cats: ['nu75', 'p4'] },
  { name: 'Fordham University', cats: [] },
  { name: 'Furman University', rankLabel: 'Liberal Rank #41', cats: ['lac75'], enrolling: true },
  { name: 'George Mason University', cats: [] },
  { name: 'George Washington University', cats: [] },
  { name: 'Georgetown University', rankLabel: 'National Rank #24', cats: ['ivyplus', 'nu75'] },
  { name: 'Georgia Southern University', cats: [] },
  { name: 'Georgia State University', cats: [] },
  { name: 'Georgia Tech', rankLabel: 'National Rank #33', cats: ['nu75', 'p4'] },
  { name: 'Gettysburg College', rankLabel: 'Liberal Rank #53', cats: ['lac75'], enrolling: true },
  { name: 'Greensboro College', cats: [] },
  { name: 'Guilford College', cats: [] },
  { name: 'Hamilton College', rankLabel: 'Liberal Rank #15', cats: ['lac75'] },
  { name: 'Hampden-Sydney College', cats: [] },
  { name: 'Hampton University', cats: [], enrolling: true },
  { name: 'Haverford College', rankLabel: 'Liberal Rank #18', cats: ['lac75'] },
  { name: 'Hawai\'i Pacific University', cats: [] },
  { name: 'High Point University', cats: [], enrolling: true },
  { name: 'Hobart and William Smith Colleges', cats: [] },
  { name: 'Howard University', cats: [], enrolling: true },
  { name: 'Indiana University', cats: [], enrolling: true },
  { name: 'Ithaca College', cats: [] },
  { name: 'Jacksonville University', cats: [] },
  { name: 'James Madison University', cats: [], enrolling: true },
  { name: 'Johnson & Wales University', cats: [] },
  { name: 'Kansas State University', cats: ['p4'] },
  { name: 'Kenyon College', rankLabel: 'Liberal Rank #28', cats: ['lac75'] },
  { name: 'King\'s College London', cats: [] },
  { name: 'Lafayette College', rankLabel: 'Liberal Rank #35', cats: ['lac75'], enrolling: true },
  { name: 'Lees-McRae College', cats: [] },
  { name: 'Lehigh University', rankLabel: 'National Rank #51', cats: ['nu75'] },
  { name: 'Lenoir-Rhyne University', cats: [] },
  { name: 'Liberty University', cats: [], enrolling: true },
  { name: 'Long Island University', cats: [] },
  { name: 'Louisiana State University', cats: ['p4'] },
  { name: 'Loyola Marymount University', cats: [] },
  { name: 'Loyola University Chicago', cats: [] },
  { name: 'Loyola University Maryland', cats: [] },
  { name: 'Loyola University New Orleans', cats: [] },
  { name: 'Manhattan School of Music', cats: [] },
  { name: 'Marist University', cats: [] },
  { name: 'Marquette University', cats: [] },
  { name: 'Marshall University', cats: [] },
  { name: 'Maryland Institute College of Art', cats: [] },
  { name: 'Marymount Manhattan College', cats: [] },
  { name: 'Marymount University', cats: [] },
  { name: 'Massachusetts College of Art and Design', cats: [] },
  { name: 'Massachusetts Institute of Technology', rankLabel: 'National Rank #2', cats: ['ivyplus', 'nu75'] },
  { name: 'Mercer University', cats: [] },
  { name: 'Meredith College', cats: [] },
  { name: 'Metropolitan State University of Denver', cats: [] },
  { name: 'Miami University', cats: [] },
  { name: 'Michigan State University', rankLabel: 'National Rank #63', cats: ['nu75', 'p4'] },
  { name: 'Middle Tennessee State University', cats: [] },
  { name: 'Middlebury College', rankLabel: 'Liberal Rank #11', cats: ['lac75'], enrolling: true },
  { name: 'Mississippi State University', cats: ['p4'] },
  { name: 'Molloy University', cats: [] },
  { name: 'Montana State University', cats: [] },
  { name: 'Montclair State University', cats: [] },
  { name: 'Morehouse College', cats: [] },
  { name: 'Morgan State University', cats: [] },
  { name: 'Mount Holyoke College', rankLabel: 'Liberal Rank #30', cats: ['lac75'] },
  { name: 'New York University', rankLabel: 'National Rank #30', cats: ['nu75'] },
  { name: 'North Carolina A&T State University', cats: [], enrolling: true },
  { name: 'North Carolina Central University', cats: [] },
  { name: 'North Carolina State University', rankLabel: 'National Rank #59', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Northeastern University', rankLabel: 'National Rank #47', cats: ['nu75'], enrolling: true },
  { name: 'Nova Southeastern University', cats: [] },
  { name: 'Oberlin College', rankLabel: 'Liberal Rank #30', cats: ['lac75'] },
  { name: 'Occidental College', rankLabel: 'Liberal Rank #48', cats: ['lac75'] },
  { name: 'Oglethorpe University', cats: [] },
  { name: 'Ohio University', cats: [] },
  { name: 'Oklahoma City University', cats: [] },
  { name: 'Oklahoma State University', cats: ['p4'] },
  { name: 'Olin College of Engineering', cats: [] },
  { name: 'Otis College of Art and Design', cats: [] },
  { name: 'Otterbein University', cats: [] },
  { name: 'Pace University', cats: [] },
  { name: 'Palm Beach Atlantic University', cats: [] },
  { name: 'Parsons Paris at The New School', cats: [] },
  { name: 'Parsons School of Design at The New School', cats: [] },
  { name: 'Penn State University', cats: [] },
  { name: 'Pepperdine University', cats: [] },
  { name: 'Point Park University', cats: [] },
  { name: 'Pratt Institute', cats: [] },
  { name: 'Presbyterian College', cats: [] },
  { name: 'Princeton University', rankLabel: 'National Rank #1', cats: ['ivy', 'ivyplus', 'nu75'] },
  { name: 'Providence College', cats: [] },
  { name: 'Purdue University', rankLabel: 'National Rank #43', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Queens University of Charlotte', cats: [], enrolling: true },
  { name: 'Radford University', cats: [] },
  { name: 'Randolph-Macon College', cats: [], enrolling: true },
  { name: 'Rensselaer Polytechnic Institute', cats: [] },
  { name: 'Rhode Island School of Design', cats: [] },
  { name: 'Rhodes College', rankLabel: 'Liberal Rank #51', cats: ['lac75'], enrolling: true },
  { name: 'Rice University', rankLabel: 'National Rank #18', cats: ['nu75'] },
  { name: 'Richmond American University London', cats: [] },
  { name: 'Roanoke College', cats: [] },
  { name: 'Rochester Institute of Technology', cats: [], enrolling: true },
  { name: 'Rollins College', cats: [] },
  { name: 'Roosevelt University', cats: [] },
  { name: 'Rutgers University', rankLabel: 'National Rank #63', cats: ['nu75', 'p4'] },
  { name: 'Saint Joseph\'s University', cats: [] },
  { name: 'Samford University', cats: [] },
  { name: 'San Diego State University', cats: [] },
  { name: 'Santa Clara University', cats: [] },
  { name: 'Sarah Lawrence College', cats: [] },
  { name: 'Savannah College of Art and Design', cats: [] },
  { name: 'School of the Art Institute of Chicago', cats: [] },
  { name: 'Seton Hall University', cats: [] },
  { name: 'Skidmore College', rankLabel: 'Liberal Rank #38', cats: ['lac75'] },
  { name: 'Smith College', rankLabel: 'Liberal Rank #13', cats: ['lac75'] },
  { name: 'South Carolina State University', cats: [] },
  { name: 'Southern Methodist University', cats: ['p4'], enrolling: true },
  { name: 'Southwest Minnesota State University', cats: [], enrolling: true },
  { name: 'Spelman College', rankLabel: 'Liberal Rank #39', cats: ['lac75'] },
  { name: 'St. Lawrence University', cats: [] },
  { name: 'St. Olaf College', rankLabel: 'Liberal Rank #57', cats: ['lac75'] },
  { name: 'Stanford University', rankLabel: 'National Rank #4', cats: ['ivyplus', 'nu75', 'p4'], enrolling: true },
  { name: 'Stevens Institute of Technology', cats: [] },
  { name: 'Suffolk University', cats: [] },
  { name: 'Syracuse University', rankLabel: 'National Rank #75', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Temple University', cats: [] },
  { name: 'Tennessee State University', cats: [] },
  { name: 'Texas A&M University', rankLabel: 'National Rank #47', cats: ['nu75', 'p4'] },
  { name: 'Texas Christian University', rankLabel: 'National Rank #105', cats: ['p4'], enrolling: true },
  { name: 'Texas State University', cats: [] },
  { name: 'The Boston Conservatory at Berklee', cats: [] },
  { name: 'The Ohio State University', rankLabel: 'National Rank #43', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'The University of Edinburgh', cats: [] },
  { name: 'Tufts University', rankLabel: 'National Rank #37', cats: ['nu75'] },
  { name: 'Tulane University', rankLabel: 'National Rank #69', cats: ['nu75'], enrolling: true },
  { name: 'Union College', rankLabel: 'Liberal Rank #38', cats: ['lac75'] },
  { name: 'United States Air Force Academy', rankLabel: 'Liberal Rank #5', cats: ['lac75'] },
  { name: 'United States Military Academy', rankLabel: 'Liberal Rank #13', cats: ['lac75'] },
  { name: 'United States Naval Academy', rankLabel: 'Liberal Rank #3', cats: ['lac75'], enrolling: true },
  { name: 'University College Dublin', cats: [] },
  { name: 'University of Alabama', rankLabel: 'National Rank #105', cats: ['p4'], enrolling: true },
  { name: 'University of Alabama (Birmingham)', cats: [] },
  { name: 'University of Arizona', rankLabel: 'National Rank #75', cats: ['nu75', 'p4'] },
  { name: 'University of Arkansas', rankLabel: 'National Rank #147', cats: ['p4'] },
  { name: 'University of Bath', cats: [] },
  { name: 'University of Bristol', cats: [] },
  { name: 'University of California (Berkeley)', cats: [] },
  { name: 'University of California (Davis)', cats: [] },
  { name: 'University of California (Irvine)', cats: [] },
  { name: 'University of California (Los Angeles)', cats: [], enrolling: true },
  { name: 'University of California (San Diego)', cats: [] },
  { name: 'University of California (Santa Barbara)', cats: [] },
  { name: 'University of Central Florida', cats: ['p4'] },
  { name: 'University of Chicago', rankLabel: 'National Rank #6', cats: ['ivyplus', 'nu75'] },
  { name: 'University of Colorado (Boulder)', cats: [], enrolling: true },
  { name: 'University of Connecticut', rankLabel: 'National Rank #75', cats: ['nu75'] },
  { name: 'University of Delaware', rankLabel: 'National Rank #75', cats: ['nu75'] },
  { name: 'University of Denver', cats: [] },
  { name: 'University of Florida', rankLabel: 'National Rank #28', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of Georgia', rankLabel: 'National Rank #46', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of Hartford', cats: [] },
  { name: 'University of Illinois (Urbana-Champaign)', cats: [] },
  { name: 'University of Iowa', rankLabel: 'National Rank #92', cats: ['p4'] },
  { name: 'University of Kansas', rankLabel: 'National Rank #124', cats: ['p4'] },
  { name: 'University of Kentucky', rankLabel: 'National Rank #124', cats: ['p4'], enrolling: true },
  { name: 'University of Louisville', rankLabel: 'National Rank #147', cats: ['p4'] },
  { name: 'University of Lynchburg', cats: [] },
  { name: 'University of Mary Washington', cats: [] },
  { name: 'University of Maryland', rankLabel: 'National Rank #46', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of Maryland Eastern Shore', cats: [] },
  { name: 'University of Massachusetts (Amherst)', cats: [] },
  { name: 'University of Massachusetts (Boston)', cats: [] },
  { name: 'University of Memphis', cats: [] },
  { name: 'University of Miami', rankLabel: 'National Rank #59', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of Michigan', rankLabel: 'National Rank #21', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of Minnesota', rankLabel: 'National Rank #69', cats: ['nu75', 'p4'] },
  { name: 'University of Mississippi', rankLabel: 'National Rank #147', cats: ['p4'], enrolling: true },
  { name: 'University of Missouri', cats: ['p4'] },
  { name: 'University of Nevada (Las Vegas)', cats: [] },
  { name: 'University of North Carolina (Asheville)', cats: [] },
  { name: 'University of North Carolina (Chapel Hill)', cats: [], enrolling: true },
  { name: 'University of North Carolina (Charlotte)', cats: [], enrolling: true },
  { name: 'University of North Carolina (Greensboro)', cats: [] },
  { name: 'University of North Carolina (Pembroke)', cats: [] },
  { name: 'University of North Carolina (Wilmington)', cats: [] },
  { name: 'University of North Carolina School of the Arts', cats: [] },
  { name: 'University of Notre Dame', rankLabel: 'National Rank #18', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of Oklahoma', rankLabel: 'National Rank #124', cats: ['p4'] },
  { name: 'University of Oregon', cats: ['p4'] },
  { name: 'University of Pennsylvania', rankLabel: 'National Rank #7', cats: ['ivy', 'ivyplus', 'nu75'] },
  { name: 'University of Pittsburgh', rankLabel: 'National Rank #67', cats: ['nu75', 'p4'] },
  { name: 'University of Pittsburgh (Johnstown)', cats: [] },
  { name: 'University of Rhode Island', cats: [] },
  { name: 'University of Richmond', rankLabel: 'Liberal Rank #18', cats: ['lac75'], enrolling: true },
  { name: 'University of Rochester', rankLabel: 'National Rank #51', cats: ['nu75'] },
  { name: 'University of San Diego', cats: [] },
  { name: 'University of San Francisco', cats: [] },
  { name: 'University of South Carolina', rankLabel: 'National Rank #121', cats: ['p4'], enrolling: true },
  { name: 'University of South Florida', cats: [] },
  { name: 'University of Southern California', rankLabel: 'National Rank #27', cats: ['nu75', 'p4'] },
  { name: 'University of St Andrews', cats: [] },
  { name: 'University of Tampa', cats: [], enrolling: true },
  { name: 'University of Tennessee', rankLabel: 'National Rank #57', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of Texas', cats: [] },
  { name: 'University of the South (Sewanee)', cats: [], enrolling: true },
  { name: 'University of Toronto', cats: [], enrolling: true },
  { name: 'University of Utah', cats: ['p4'] },
  { name: 'University of Vermont', cats: [] },
  { name: 'University of Virginia', rankLabel: 'National Rank #24', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of Washington', rankLabel: 'National Rank #63', cats: ['nu75', 'p4'] },
  { name: 'University of Wisconsin', cats: [] },
  { name: 'University of Wyoming', cats: [] },
  { name: 'Vanderbilt University', rankLabel: 'National Rank #15', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Villanova University', rankLabel: 'National Rank #57', cats: ['nu75'] },
  { name: 'Virginia Commonwealth University', cats: [] },
  { name: 'Virginia State University', cats: [] },
  { name: 'Virginia Tech', rankLabel: 'National Rank #47', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Virginia Wesleyan University', cats: [] },
  { name: 'Wagner College', cats: [] },
  { name: 'Wake Forest University', rankLabel: 'National Rank #47', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Washington and Lee University', rankLabel: 'Liberal Rank #11', cats: ['lac75'], enrolling: true },
  { name: 'Washington University in St. Louis', rankLabel: 'National Rank #21', cats: ['ivyplus', 'nu75'] },
  { name: 'Webster University', cats: [] },
  { name: 'Wellesley College', rankLabel: 'Liberal Rank #7', cats: ['lac75'] },
  { name: 'Wesleyan University', rankLabel: 'Liberal Rank #25', cats: ['lac75'] },
  { name: 'West Virginia University', cats: ['p4'] },
  { name: 'West Virginia Wesleyan College', cats: [] },
  { name: 'Western Carolina University', cats: [] },
  { name: 'William & Mary', rankLabel: 'National Rank #51', cats: ['nu75'] },
  { name: 'Williams College', rankLabel: 'Liberal Rank #1', cats: ['lac75'] },
  { name: 'Wingate University', cats: [] },
  { name: 'Winston-Salem State University', cats: [] },
  { name: 'Winthrop University', cats: [] },
  { name: 'Wofford College', rankLabel: 'Liberal Rank #57', cats: ['lac75'], enrolling: true },
  { name: 'Worcester Polytechnic Institute', cats: [] },
  { name: 'Xavier University', cats: [] },
  { name: 'Xavier University of Louisiana', cats: [] },
  { name: 'Yale University', rankLabel: 'National Rank #4', cats: ['ivy', 'ivyplus', 'nu75'], enrolling: true },
  { name: 'York College of Pennsylvania', cats: [] },
  { name: 'Zaytuna College', cats: [] },
]

const PROFILE_2526 =
  'https://resources.finalsite.net/images/v1759320688/charlottecds/dn5vss9ud5xxwzyt70ah/CCDSSchoolProfile2025-2026-FINAL.pdf'
const PROFILE_2425 =
  'https://resources.finalsite.net/images/v1726775598/charlottecds/enzt08thdabvh3uxiz0i/2024-2025CCDSSchoolProfile.pdf'
const ACCEPTANCES =
  'https://resources.finalsite.net/images/v1779992327/charlottecds/qit66txtuedke1lr4hcx/CollegeAcceptances2023-2026.pdf'
const COUNSELING = 'https://www.charlottecountryday.org/cd-education/college-counseling'
const CLASS_2026 =
  'https://www.charlottecountryday.org/news-events/news-details-page/~board/school-news/post/class-of-2026-college-admissions-outcomes'
const ERP = 'https://www.charlottecountryday.org/cd-education/educational-resource-program'

export const charlotteCountryDay: CollegeSupportProgram = {
  transcript: {
    headline:
      '530 AP exams in 2025 at 93% scoring 3+ and 74% at 4 or 5 — and the school publishes those results discipline by discipline, weak spots included.',
    subhead:
      'Country Day was the first school in North Carolina to offer the IB Diploma, so a student has two legible routes to maximum rigour rather than one, and the profile names the ceiling course in every discipline.',
    stats: [
      { value: '530', label: 'AP exams sat in 2025 (238 students)' },
      { value: '93%', label: 'scored 3+ · 74% earned 4s or 5s' },
      { value: '25 AP + IB', label: 'AP courses plus a full IB Diploma Programme' },
      { value: 'Quintiles', label: 'no rank reported — a GPA quintile table stands in' },
    ],
    merit: [
      { year: '2026', detail: '**6** Semifinalists · **5** Finalists · **13** Commended · 1 NMSC Special Scholarship (C.D. Spangler Foundation)' },
      { year: '2025', detail: '**2** Semifinalists · **2** Finalists · **5** Commended — a conspicuous trough between two normal years', unconfirmed: true },
      { year: '2024', detail: '**7** Semifinalists · **7** Finalists · **2** Commended · 1 Scholar, 1 College-Sponsored Scholar' },
      { year: '2022', detail: '**11** Semifinalists · **13** Commended' },
      { year: '2021', detail: '**9** Semifinalists · **8** Commended — 17 in the 97th percentile or above' },
      { year: '2018', detail: '**7** Semifinalists · **8** Commended' },
    ],
    meritNote:
      'The Class of 2025 line is the school’s own published figure but sits three times below the classes on either side of it, so it is flagged rather than smoothed. Note also that Semifinalist announcements land in the autumn of senior year, which is why a September 2025 post describes the Class of 2026. College Board National Recognition Program counts are not published in any year.',
    depth: [
      {
        label: 'Mathematics',
        text: '**Calculus III** (dual-listed with IB Analysis HL) tops the sequence, and there is a rare post-AP statistics path — **Advanced AP Statistics with R and R Studio**.',
      },
      {
        label: 'Sciences',
        text: '**Organic Chemistry** and **Physical Computational Biochemistry** run as post-AP semester electives, the former explicitly for students who have finished AP or IB Chemistry.',
      },
      {
        label: 'Computer science',
        text: 'The ceiling is AP Computer Science A — **no post-AP CS course is listed**, a genuine gap against the maths and science depth beside it.',
      },
      {
        label: 'World language',
        text: 'The ceiling is AP or IB HL across Chinese, French, Spanish and Latin. No post-AP language seminar is listed, and German has dropped out of the roster since 2015–16.',
      },
      {
        label: 'Beyond campus',
        text: '**School Year Abroad** (France, Spain, Italy), **Maine Coast Semester at Chewonki**, and **ALZAR** (Patagonia and Idaho) all carry credit back to the transcript. There is no Global Online Academy membership.',
      },
    ],
    trust: [
      {
        label: 'Weighted on a flat bump',
        text: '**+0.5 for Honors, +1.0 for AP/IB** on a 4.0 base — stable across every profile edition reviewed. There is no separate quality-point table.',
      },
      {
        label: 'No rank → a quintile table',
        text: 'Country Day has published a quintile table continuously since at least 2015–16, and the 2025–26 edition adds **median SAT and median ACT for each fifth** — more context than most no-rank schools give.',
      },
      {
        label: '“Most rigorous” shown, not defined',
        text: 'No numeric rubric, but a **“Most Rigorous Courses by Discipline”** table naming the ceiling course in each subject, plus AP-load buckets (0–2 / 3–5 / 6+) that let a reader locate a candidate against classmates.',
      },
    ],
    flags: [
      {
        kind: 'discrepancy',
        text: 'The two most recent profiles publish different grading scales: 2025–26 gives full plus/minus bands including an A+ at 98–100, while 2024–25 gives only whole-letter ranges. Whether the scale changed or the earlier edition merely summarised is unclear, and the presence of an A+ band decides whether an unweighted GPA can exceed 4.0.',
      },
      {
        kind: 'discrepancy',
        text: 'The five-year IB Diploma pass rate is 88% in the 2025–26 profile and 91% in the 2024–25 profile — both stated as “over the last five years”. Both figures are shown.',
      },
      {
        kind: 'gap',
        text: 'No mandatory-AP-exam policy is published, so the 93% rests on an unstated denominator. The curriculum page says the exam “is the driver for the curriculum”, which implies a strong expectation but is not a stated requirement. AP Scholar counts have not been published since 2021.',
      },
    ],
    sources: [
      { label: 'charlottecountryday.org — 2025–26 School Profile (AP results by discipline, quintile table, weighting)', url: PROFILE_2526 },
      { label: '2024–25 School Profile (prior-year AP results, grading scale)', url: PROFILE_2425 },
      { label: 'International Baccalaureate at Country Day', url: 'https://www.charlottecountryday.org/cd-education/upper-school/international-baccalaureate' },
    ],
  },

  counseling: {
    headline:
      'Five full-time counselors for 548 Upper Schoolers — roughly 28 seniors each — with more than 100 years of combined admissions experience between them.',
    subhead:
      'A director change lands in July 2026, but it sits on top of a decade of institutional memory: two of the five have been in this office since at least 2015–16.',
    stats: [
      { value: '~1:28', label: 'counselors to seniors (derived — the school publishes no ratio)' },
      { value: '5', label: 'full-time college counselors, plus a registrar' },
      { value: '150+', label: 'college admissions officers hosted each year' },
      { value: 'Scoir', label: 'platform for students and for rep-visit scheduling' },
    ],
    roster: [
      {
        role: 'Director',
        name: 'Allison Slater Tate',
        detail: 'Appointed after a national search, effective 1 July 2026. A nationally published writer and speaker on admissions.',
      },
      {
        role: 'Sr. Assoc. Director',
        name: 'Catherine Odum',
        detail: 'In the office since at least 2015–16 — Associate Director, then Director, now Senior Associate.',
      },
      {
        role: 'Assoc. Director',
        name: 'Jonathan Woog',
        detail: '10+ years here, rising from Assistant to Associate Director.',
      },
      {
        role: 'Assoc. Director',
        name: 'Meredith High',
        detail: 'Listed across both recent profile editions.',
      },
      {
        role: 'Assoc. Director',
        name: 'Brooke Tevlin',
        detail: 'Joined between the 2024–25 and 2025–26 profiles. Plus registrar Donna Witman.',
      },
    ],
    timelineTitle: 'The four-year timeline — when individualized support begins',
    timeline: [
      {
        grade: '9',
        intensity: 'Settle in',
        items: ['**Freshman Seminar** — an introduction to the process', 'PSAT in March, school-administered', 'Introduced to their counselor and to Scoir (spring)'],
        note: 'Focus: foundational habits and teacher relationships',
      },
      {
        grade: '10',
        intensity: 'Think strategically',
        items: ['**PreACT** in October', '**Charlotte Area Case Studies** in April — a mock admissions committee run across Charlotte schools', 'Counselor meetings begin (winter)'],
        note: 'Unusually early for a case-studies exercise',
      },
      {
        grade: '11',
        intensity: 'In earnest',
        items: ['**PSAT/NMSQT** in October', '**College Night for Juniors** in November', 'One-on-one meetings from the start of second semester'],
        note: 'Teacher recommendations requested by the end of junior year',
      },
      {
        grade: '12',
        intensity: 'Intensive',
        items: ['**College Application and Essay Workshop** in August, before senior year starts', 'Rep visits throughout the autumn', 'Financial-aid forms, SRAR/STARS, interview prep, waitlist navigation'],
      },
    ],
    mechanicsTitle: 'The mechanics the office owns',
    mechanics: [
      'Applications',
      'Essays',
      'Standardized testing',
      'Teacher recs',
      'Financial aid',
      'Scholarship evaluation',
    ],
    mechanicsNote:
      'The Class of 2026 submitted **1,107 applications to 203 institutions** — about eight per student. Transcripts and the school report are owned by a dedicated registrar, and testing accommodations are handled by the Educational Resource Program rather than the college office.',
    reach: [
      '**150+** admissions officers a year, in 60-minute sessions across five fixed daily slots',
      'A defined visit window — **24 Aug to 20 Nov 2026** — scheduled through Scoir Visits',
      'ACCIS · NACAC · SACAC memberships · an annually published School Profile (CEEB 340666, IB 0667)',
    ],
    flags: [
      {
        kind: 'discrepancy',
        text: 'Two official sources name different directors, and both were correct when written: the 2025–26 School Profile lists Catherine Odum, while the current web pages list Allison Slater Tate. A February 2026 news post resolves it — Tate was appointed effective 1 July 2026, and Odum moved to Senior Associate Director. The profile is now stale on this point.',
      },
      {
        kind: 'verify',
        text: 'Both ratios are derived (548 ÷ 5 and 141 ÷ 5); the school publishes no ratio. The real caseload is probably juniors plus seniors, nearer 1:56. No counselor bios, tenures, degrees or prior employers are published — the team page gives names, titles and contact details only.',
      },
      {
        kind: 'gap',
        text: 'No count of campus visits made by counseling staff is published anywhere, and no named scholarship-search tool or database is described.',
      },
    ],
    sources: [
      { label: 'charlottecountryday.org — College Counseling', url: COUNSELING },
      { label: 'Meet Our Team', url: 'https://www.charlottecountryday.org/cd-education/college-counseling/meet-our-team' },
      { label: 'For College Representatives (visit window, Scoir Visits)', url: 'https://www.charlottecountryday.org/cd-education/college-counseling/for-college-representatives' },
      { label: 'News — Allison Slater Tate appointed Director', url: 'https://www.charlottecountryday.org/news-events/news-details-page/~board/school-news/post/allison-slater-tate-appointed-director-of-college-counseling' },
    ],
  },

  outcomes: {
    headline:
      'The Class of 2026 — 141 seniors — enrolled at 70 institutions across 23 states, DC and Canada, with 32 students to UNC–Chapel Hill alone.',
    subhead:
      'The published list is a four-year cumulative acceptance list of ~320 institutions; only the bolded names represent somewhere a Class of 2026 student actually enrolled.',
    stats: [
      { value: '70', label: 'institutions actually enrolling a Class of 2026 student' },
      { value: '170', label: 'unique institutions admitting them · 1,107 applications sent' },
      { value: '32', label: 'students to UNC–Chapel Hill — 23% of the class' },
      { value: '$14.7M', label: 'scholarship offers, Class of 2026 ($13M for 2025)' },
    ],
    buckets: [
      { tier: 'Ivy League', count: '7 / 8', note: '— absent Harvard, across seven published classes' },
      { tier: '“Ivy Plus”', count: '13 / 17', note: '— Stanford and Duke enrolling' },
      { tier: 'Top-75 National Universities', count: '55' },
      { tier: 'Top-75 Liberal Arts', count: '41', note: '— includes all three federal service academies' },
      { tier: 'Power Four', count: '53' },
    ],
    bucketsNote:
      'Counts are computed from the same 320-institution list you can filter at right, scored against the 2026 U.S. News tables — derived analysis, not school-reported. Note that none of the seven Ivies is bolded for the Class of 2026: no member of that class enrolled at an Ivy, though the Class of 2025 enrolled at Brown, Cornell, Dartmouth, Princeton and Yale. That is a real year-over-year swing rather than a data artefact.',
    collegesTitle: 'Every acceptance, 2023–2026',
    colleges,
    collegesTotal: '320 institutions · bold = enrolling a Class of 2026 student',
    scholarships: [
      '$14.7M scholarship offers · Class of 2026',
      '1 Morehead-Cain Scholar (34 all-time)',
      'U.S. Naval Academy appointment',
      'February One Scholarship (NC A&T)',
      'Recent: Jefferson, Jack Kent Cooke, QuestBridge, Ron Brown, Coca-Cola',
    ],
    scholarshipsNote:
      'Treat the “34 Morehead-Cain recipients” figure carefully: the College Counseling landing page shows it beside Class of 2026 statistics, but the Class of 2026 produced exactly one Morehead-Cain Scholar. The 34 is a cumulative, all-time count whose window the school never states. Robertson Scholars and NC State Park Scholars appear only in the 2015–16 profile and should not be presented as current pipelines.',
    caveat:
      'this is a four-year cumulative acceptance list, not a matriculation list. Roughly 320 institutions appear because about 564 students across four classes each applied to around eight colleges. Only the bolded names — 69 recovered here against the school’s stated 70 — represent institutions actually enrolling a member of the Class of 2026, and 141 students spread across just 70 destinations. The school does not publish a precise percentage enrolling at four-year colleges; the “100%” it cites is an admission rate.',
    flags: [
      {
        kind: 'verify',
        text: 'The enrolling markers were recovered from the acceptance PDF’s embedded font runs, because bold is lost in plain-text extraction. That returned 69 names against the school’s own count of 70 — treat 70 as authoritative and this list as about 97% complete.',
      },
    ],
    sources: [
      { label: 'charlottecountryday.org — College Acceptances 2023–2026 (PDF)', url: ACCEPTANCES },
      { label: 'News — Class of 2026 college admissions outcomes', url: CLASS_2026 },
      { label: '2025–26 School Profile (Class of 2025 outcomes, regional split)', url: PROFILE_2526 },
      { label: 'U.S. News 2026 rankings (tier scoring)', url: 'https://www.usnews.com/best-colleges/rankings/national-universities' },
    ],
  },

  edge: {
    headline:
      'The IB Diploma is the structural differentiator — a second route to maximum rigour — and the Senior Externship turns 175+ local employers into a network only this school has.',
    subhead:
      'What Country Day does not have is a required capstone or research thesis; its spike-building is programme breadth rather than a single mandated credential.',
    levers: [
      {
        title: 'Lever 1 — Build the spike',
        glyph: '◆',
        items: [
          '**IB Diploma Programme** — Country Day was the **first school in North Carolina** to offer it. About 20 students a year take the full diploma from junior year, at an 88% five-year pass rate. For a student whose strengths are not AP-shaped, it is a second legible path to maximum rigour, and it carries an Extended Essay by construction.',
          '**Senior Externship** — a January job-shadowing immersion launched in 2017, partnered with **175+ local employers across 20+ industries**. In a recent year **136 seniors** placed with 68 Charlotte-area employers, hosts drawn largely from current and past parents and alumni.',
          '**Science Outreach Program** — rising juniors and seniors work with science professors at local institutions on primary research over the summer, then present at the annual Science Symposium.',
          '**Weddington Farm** — a **330-acre living classroom** with produce, livestock, beekeeping, mushroom farming and a ten-mile trail system, feeding sustainable-agriculture, ecology and entrepreneurship programming. A genuinely uncommon asset for an urban independent school.',
          '**Special Olympics Mecklenburg County Spring Games** — the Upper School has taken a two-day break from classes every April **since 1984** to host. A 40-year institutional commitment reads very differently to an admissions office than a service club.',
        ],
        note:
          'There is no required internship, capstone or independent research thesis. The Senior Externship is a single day and is never stated to be mandatory, though 136 of ~141 seniors taking part implies it is near-universal in practice.',
      },
      {
        title: 'Lever 2 — The school’s leverage',
        glyph: '▲',
        items: [
          '**The School Profile as an instrument** — and the 2025–26 edition is materially stronger than its predecessor. It ties GPA quintiles to median SAT *and* median ACT, names the ceiling course in every discipline, publishes AP-load buckets, states the weighting formula, and discloses AP results by discipline including the weak spots (Fine Arts at 81%/36%). That candour is itself a credibility signal.',
          '**Integrity signalling** — an annually pledged Honor Code with a student-run Honor Council, plus ACCIS, NACAC and SACAC membership. Faculty credibility markers matter here too: the Upper School includes **AP exam readers**, National Board graders and Klingenstein Fellows, with 82% holding advanced degrees.',
          '**A dominant UNC–Chapel Hill pipeline** — 32 Class of 2026 students enrolled there, 23% of the class, alongside 34 cumulative Morehead-Cain recipients. Add a standing Jefferson Scholar link to UVA and a decade of service-academy appointments.',
          '**A substantial HBCU pipeline** — North Carolina A&T, Howard, Hampton and Clark Atlanta all enrolling for the Class of 2026, with a February One Scholarship and a Ron Brown Scholar among recent awards.',
        ],
        note:
          'The school does not publish its disciplinary-disclosure policy — whether and how Honor Council findings or suspensions reach the secondary school report. Given published NACAC membership, that omission is a sharp tour question.',
      },
    ],
    flags: [
      {
        kind: 'discrepancy',
        text: 'Arts events per year are “50+” in the 2025–26 profile but “70” in the 2024–25 edition — the figure went down. Both are shown.',
      },
    ],
    sources: [
      { label: 'charlottecountryday.org — Senior Externship', url: 'https://www.charlottecountryday.org/cd-experience/beyond-the-classroom/externship' },
      { label: '2025–26 School Profile (IB, memberships, faculty markers)', url: PROFILE_2526 },
      { label: 'Collegiate athletics', url: 'https://www.charlottecountryday.org/cd-experience/athletics/collegiate-athletics' },
      { label: 'International Studies', url: 'https://www.charlottecountryday.org/cd-education/international-studies' },
    ],
  },

  wholeClass: {
    headline:
      'The quintile table is the honest answer for the middle of the class — the fourth fifth sits at a 3.513 GPA with a 1220 SAT, the fifth at 2.991 and 1110.',
    subhead:
      'Country Day publishes what most schools hide, and its acceptance list matches that spread: Princeton and MIT at one end, Cape Fear and Central Piedmont community colleges at the other.',
    scoreTables: [
      {
        title: 'SAT score percentiles',
        hint: '— Class of 2024 · the most recent SAT figures the school has published',
        rows: [
          { label: 'SAT total', values: ['—', '1155', '—', '1385', '—', '—'] },
          { label: 'SAT EBRW', values: ['—', '585', '—', '700', '—', '—'] },
          { label: 'SAT Math', values: ['—', '590', '—', '690', '—', '—'] },
        ],
        note:
          'The middle-50% endpoints ARE the 25th and 75th percentiles, so those columns are real; the 10th, 50th and 90th are shown as “—” because the school has never published them, and neither has it ever published a mean or the number of testers.',
      },
      {
        title: 'ACT score percentiles',
        hint: '— Class of 2024 · the most recent ACT figures the school has published',
        rows: [
          { label: 'ACT composite', values: ['—', '24', '—', '31', '—', '—'] },
          { label: 'ACT English', values: ['—', '23', '—', '32', '—', '—'] },
          { label: 'ACT Math', values: ['—', '22', '—', '29', '—', '—'] },
        ],
        note:
          'For long-run context, the Class of 2015 composite middle 50% was 26–31 against 24–31 here: the floor fell two points while the ceiling held. Plausibly a test-optional composition effect, but the school offers no explanation.',
      },
    ],
    gpaTitle: 'GPA percentiles',
    gpaHint: '— the no-rank mechanism · Class of 2025 median weighted GPA, with median SAT and ACT',
    quintiles: [
      { label: 'First fifth', gpa: '4.472', detail: '1470 SAT · 33 ACT' },
      { label: 'Second', gpa: '4.140', detail: '1360 SAT · 32 ACT' },
      { label: 'Third', gpa: '3.877', detail: '1290 SAT · 30 ACT' },
      { label: 'Fourth', gpa: '3.513', detail: '1220 SAT · 27 ACT' },
      { label: 'Fifth', gpa: '2.991', detail: '1110 SAT · 24 ACT' },
    ],
    gpaNote:
      'All five quintiles are the school’s own published figures — nothing is interpolated — and tying each fifth to a median SAT and ACT was new in the 2025–26 profile. Grades reflect work done at Country Day only, as of the end of junior year. Over ten years the distribution has stretched at both ends: the top-quintile mean rose from 4.198 to 4.540 while the bottom-quintile floor fell from 2.546 to 2.076.',
    support: [
      {
        label: 'The Educational Resource Program',
        text: 'A named JK–12 structure covering tutoring, accommodations, assessments and evaluation referrals, delivered as hourly sessions before, during or after the school day.',
      },
      {
        label: 'The Upper School model',
        text: '**Academic coaches** support content areas and executive function, while **learning specialists** work one-on-one so students “recognize and utilize their strengths” and become independent learners and self-advocates.',
      },
      {
        label: 'Where it reaches the application',
        text: 'Uniquely among the schools here, the ERP explicitly **“assists in requesting accommodations with the College Board, ACT, and IB”** — the hand-off into admissions testing is stated rather than left implicit.',
      },
    ],
    supportNote:
      'No learning specialist or academic coach is named anywhere, and no staff count or credentials are published — so the caseload behind that model is unknown.',
    middle: [
      {
        label: 'The list matches the distribution',
        text: 'The enrolling names are not a top-25 highlight reel — Appalachian State, East Carolina, UNC–Charlotte, High Point, Queens, Liberty, Tampa, Mississippi, Kentucky and Southwest Minnesota State all appear. **55% of the Class of 2026 enrolled at public universities** and 32% stayed in North Carolina.',
      },
      {
        label: 'Community colleges published',
        text: 'Cape Fear and Central Piedmont both appear on the acceptance list. Many peer schools quietly omit their community-college acceptances; publishing them is a meaningful transparency signal.',
      },
      {
        label: 'Non-traditional destinations',
        text: 'About fourteen dedicated arts and music institutions (Berklee enrolling, plus Manhattan School of Music, RISD, Pratt, SAIC, Parsons in New York and Paris, UNCSA); all three federal service academies with a Naval Academy appointment; and around eleven international universities including Toronto, St Andrews, Edinburgh and Durham.',
      },
    ],
    flags: [
      {
        kind: 'gap',
        text: 'The 2025–26 profile DROPPED the SAT and ACT middle-50% ranges that the 2024–25 edition published, replacing them with per-quintile medians. The number of testers has never been published in any year — a table showing medians without a sample size shows a shape without an N.',
      },
      {
        kind: 'discrepancy',
        text: 'The two profiles give the Class of 2025 different senior counts (138 versus 141) and report different statistics for the same class — means and ranges in one edition, medians in the other — so the top-quintile 4.540 mean and 4.472 median are both correct and not comparable.',
      },
      {
        kind: 'gap',
        text: 'No gap-year counselling, placement count or deferral policy is published, and neither is any direct-to-work or enlistment outcome.',
      },
    ],
    sources: [
      { label: 'charlottecountryday.org — 2025–26 School Profile (quintile table with median SAT/ACT)', url: PROFILE_2526 },
      { label: '2024–25 School Profile (the last published SAT/ACT ranges)', url: PROFILE_2425 },
      { label: 'Educational Resource Program', url: ERP },
    ],
  },

  verdict: {
    headline:
      'A deep, stable office and an unusually candid profile — Country Day hands admissions readers more usable context than almost any peer, then declines to publish its own test scores.',
    subhead:
      'The strengths are structural and durable; the gaps are disclosure choices, which is exactly what a tour can put pressure on.',
    points: [
      {
        label: 'The profile gives readers more context than peers',
        text: 'a quintile table tying GPA bands to median SAT *and* median ACT, from 4.472/1470/33 down to 2.991/1110/24. No rank is ever assigned, yet a reader can place any candidate precisely — and the per-quintile test medians were a new investment in 2025–26.',
      },
      {
        label: 'AP performance is high, improving and candidly disclosed',
        text: '530 exams at 93% scoring 3+ and 74% at 4–5, up from 89%/70% a year earlier — published discipline by discipline, including Fine Arts at 81%/36% rather than hiding it.',
      },
      {
        label: 'The IB Diploma is a real structural differentiator',
        text: 'first in North Carolina to offer it, ~20 full-diploma candidates a year from junior year, 88% five-year pass rate — a second legible path to maximum rigour for students who are not AP-shaped.',
      },
      {
        label: 'The office is deep and stable through a director change',
        text: 'five counselors, 100+ years of combined experience, 150+ reps a year through a structured Scoir Visits programme — and two counselors with a decade-plus in the office, so the July 2026 leadership change sits on institutional memory rather than a vacuum.',
      },
      {
        label: 'The timeline starts genuinely early',
        text: 'Freshman Seminar and Scoir in 9th grade, PreACT and the Charlotte Area Case Studies mock committee in 10th, one-on-one meetings from junior second semester, and an essay workshop in August before senior year.',
      },
      {
        label: 'The outcomes are honest across the whole distribution',
        text: '70 destinations for 141 seniors, 55% public and 45% private, community colleges published alongside Princeton and MIT, 32 students to UNC–Chapel Hill, and a substantial HBCU pipeline with four institutions enrolling.',
      },
    ],
    checklist: [
      'Your 2024–25 profile published SAT and ACT middle-50% ranges and the 2025–26 edition dropped them. Why — and what were the Class of 2025 and 2026 ranges, and how many students tested?',
      'The Class of 2025 had 2 National Merit Semifinalists where the classes either side had 7 and 6. What happened that year?',
      'No Class of 2026 student enrolled at an Ivy, and Harvard is absent across seven published classes. How do you read that, and what does Ivy matriculation look like year over year?',
      'What exactly does the “34 Morehead-Cain recipients” figure cover — how many years? The Class of 2026 post names exactly one.',
      'How many learning specialists and academic coaches work with Upper School students, what are their credentials, and what is the caseload?',
      'How do you report Honor Council findings and disciplinary actions on the secondary school report?',
      'How many colleges do your counselors visit each year, is the Senior Externship required, and what gap-year, post-AP computer science, or capstone-research options exist?',
    ],
    flags: [],
    sources: [
      { label: 'charlottecountryday.org — College Counseling', url: COUNSELING },
      { label: '2025–26 School Profile', url: PROFILE_2526 },
      { label: 'Verdict synthesised by the researcher from the sources cited on the cards above', },
    ],
  },
}
