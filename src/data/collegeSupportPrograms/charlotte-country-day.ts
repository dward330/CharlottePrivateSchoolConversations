// Charlotte Country Day School — the six College Support cards.
//
// Every figure is transcribed from the school's OWN published materials —
// chiefly the 2026–27 School Profile PDF and the final 2023–2026 College
// Acceptances PDF, plus the earlier profile editions, the College Counseling
// pages, and dated news posts. See
// source-material/college-support/charlotte-country-day/CCD - College Support -
// School Profile 2026-2027.md (the 2026–27 edition and the final list) and
// CCD - College Support - Redesign Research 2026.md (the earlier editions) for
// the hard data, source URLs, and gap notes.
//
// Two things make CCD's data distinctive, and both are reflected below:
//
//  1. It is the only school in this set running a full IB Diploma Programme
//     alongside its AP catalog — a second legible path to maximum rigor.
//  2. Its profile changes shape between editions. The 2024–25 edition printed
//     whole-class SAT/ACT middle-50% ranges; the 2025–26 edition replaced them
//     with a median SAT and ACT per GPA quintile; the 2026–27 edition returns to
//     GPA medians alone and prints a whole-class middle 50% beneath them, without
//     naming the class or the number of testers. The score tables carry that
//     newest range; the notes keep the Class of 2024 section scores.
//
// The `enrolling` markers are read from the acceptance PDF's font runs (the bold
// face is ITCFranklinGothicStd-DmCd), since the bold that marks matriculation is
// lost in plain-text extraction. Both the May and the final 2023–2026 editions
// carry 69 bold names; the school's own "70 institutions" figure is one more,
// recorded as a dev-only verify flag on the outcomes card.

import type { CollegeSupportProgram } from '../collegeSupport.ts'

/* The Classes of 2023–2026 acceptance list, FINAL edition (CCDSCollegeMatriculation2026,
   uploaded with the 2026–27 profile): 361 institutions printed, merged into the May
   edition (ACCEPTANCES_MAY, as of 5/28/2026, 320 rows) under the merge rule — 43 rows
   added, none removed — so 363 rows. Marymount Manhattan and Virginia Wesleyan stay
   although the final edition does not reprint them, and the shipped spelling is kept
   for the rows the final edition prints differently.
   `enrolling` follows the final edition's own key — bold marks a school enrolling one
   or more members of the Class of 2026 — read from the PDF's font runs: 69 names. The
   earlier Yale marker was a transcription slip the May edition's font data never
   supported. Rank labels and buckets are scored against the 2027 U.S. News tables.
   ACCEPTANCES_MAY =
   https://resources.finalsite.net/images/v1779992327/charlottecds/qit66txtuedke1lr4hcx/CollegeAcceptances2023-2026.pdf */
const colleges = [
  { name: 'Agnes Scott College', cats: ['lac75'], enrolling: true },
  { name: 'Albany State University', cats: ['hbcu'] },
  { name: 'Allegheny College', cats: [] },
  { name: 'American University', cats: [] },
  { name: 'Amherst College', cats: ['lac75'] },
  { name: 'Anderson University', cats: [] },
  { name: 'Appalachian State University', cats: [], enrolling: true },
  { name: 'Arizona State University', cats: ['p4'] },
  { name: 'Art Center College of Design', cats: [] },
  { name: 'Auburn University', cats: ['p4'], enrolling: true },
  { name: 'Babson College', cats: [] },
  { name: 'Ball State University', cats: [] },
  { name: 'Bard College', cats: ['lac75'] },
  { name: 'Barnard College', cats: ['lac75'] },
  { name: 'Bates College', cats: ['lac75'], enrolling: true },
  { name: 'Batten University', cats: [] },
  { name: 'Baylor University', cats: ['p4'] },
  { name: 'Belmont Abbey College', cats: [] },
  { name: 'Belmont University', cats: [] },
  { name: 'Bentley University', cats: [] },
  { name: 'Berklee College of Music', cats: [], enrolling: true },
  { name: 'Berry College', cats: [] },
  { name: 'Birmingham-Southern College', cats: [] },
  { name: 'Boston College', cats: ['nu75', 'p4'] },
  { name: 'Boston University', cats: ['nu75'], enrolling: true },
  { name: 'Bowdoin College', cats: ['lac75'] },
  { name: 'Brandeis University', cats: ['nu75'] },
  { name: 'Brenau University', cats: [] },
  { name: 'Bridgewater College', cats: [] },
  { name: 'Brigham Young University', cats: ['p4'] },
  { name: 'Brown University', cats: ['ivy', 'ivyplus', 'nu75'] },
  { name: 'Bryn Mawr College', cats: ['lac75'] },
  { name: 'Bucknell University', cats: ['lac75'], enrolling: true },
  { name: 'Butler University', cats: [] },
  { name: 'Cal Poly', cats: [] },
  { name: 'California Institute of Technology', cats: ['ivyplus', 'nu75'] },
  { name: 'California Institute of the Arts', cats: [] },
  { name: 'Campbell University', cats: [] },
  { name: 'Cape Fear Community College', cats: [] },
  { name: 'Carnegie Mellon University', cats: ['nu75'], enrolling: true },
  { name: 'Case Western Reserve University', cats: ['nu75'] },
  { name: 'Catawba College', cats: [] },
  { name: 'Central Michigan University', cats: [] },
  { name: 'Central Piedmont Community College', cats: [], enrolling: true },
  { name: 'Christopher Newport University', cats: [] },
  { name: 'Claflin University', cats: ['hbcu'] },
  { name: 'Claremont McKenna College', cats: ['lac75'] },
  { name: 'Clark Atlanta University', cats: ['hbcu'], enrolling: true },
  { name: 'Clarkson University', cats: [] },
  { name: 'Clemson University', cats: ['p4'], enrolling: true },
  { name: 'Coastal Carolina University', cats: [] },
  { name: 'Colby College', cats: ['lac75'] },
  { name: 'Colgate University', cats: ['lac75'] },
  { name: 'College of Charleston', cats: [], enrolling: true },
  { name: 'College of the Holy Cross', cats: ['lac75'] },
  { name: 'Colorado College', cats: ['lac75'] },
  { name: 'Colorado State University', cats: [] },
  { name: 'Columbia College Chicago', cats: [] },
  { name: 'Columbia University', cats: ['ivy', 'ivyplus', 'nu75'] },
  { name: 'Columbus State University', cats: [] },
  { name: 'Connecticut College', cats: ['lac75'] },
  { name: 'Cornell University', cats: ['ivy', 'ivyplus', 'nu75'] },
  { name: 'Dartmouth College', cats: ['ivy', 'ivyplus', 'nu75'] },
  { name: 'Davidson College', cats: ['lac75'] },
  { name: 'Delaware State University', cats: ['hbcu'] },
  { name: 'Denison University', cats: ['lac75'] },
  { name: 'DePaul University', cats: [] },
  { name: 'DePauw University', cats: ['lac75'] },
  { name: 'Dickinson College', cats: ['lac75'] },
  { name: 'Drew University', cats: [] },
  { name: 'Drexel University', cats: [] },
  { name: 'Duke Kunshan University', cats: [] },
  { name: 'Duke University', cats: ['ivyplus', 'nu75', 'p4'], enrolling: true },
  { name: 'Duquesne University', cats: [] },
  { name: 'Durham University', cats: [] },
  { name: 'Earlham College', cats: [] },
  { name: 'East Carolina University', cats: [], enrolling: true },
  { name: 'East Tennessee State University', cats: [] },
  { name: 'Elizabeth City State University', cats: ['hbcu'] },
  { name: 'Elon University', cats: [], enrolling: true },
  { name: 'Embry-Riddle Aeronautical University', cats: [], enrolling: true },
  { name: 'Emerson College', cats: [] },
  { name: 'Emory University', cats: ['nu75'], enrolling: true },
  { name: 'Endicott College', cats: [] },
  { name: 'Fairfield University', cats: [] },
  { name: 'Fayetteville State University', cats: ['hbcu'] },
  { name: 'Fisher College', cats: [] },
  { name: 'Florida A&M University', cats: ['hbcu'] },
  { name: 'Florida Atlantic University', cats: [] },
  { name: 'Florida Gulf Coast University', cats: [] },
  { name: 'Florida Institute of Technology', cats: [], enrolling: true },
  { name: 'Florida International University', cats: [] },
  { name: 'Florida State University', cats: ['nu75', 'p4'] },
  { name: 'Fordham University', cats: [] },
  { name: 'Furman University', cats: ['lac75'], enrolling: true },
  { name: 'George Mason University', cats: [] },
  { name: 'George Washington University', cats: ['nu75'] },
  { name: 'Georgetown University', cats: ['ivyplus', 'nu75'] },
  { name: 'Georgia Southern University', cats: [] },
  { name: 'Georgia State University', cats: [] },
  { name: 'Georgia Tech', cats: ['nu75', 'p4'] },
  { name: 'Gettysburg College', cats: ['lac75'], enrolling: true },
  { name: 'Goucher College', cats: [] },
  { name: 'Greensboro College', cats: [] },
  { name: 'Guilford College', cats: [] },
  { name: 'Hamilton College', cats: ['lac75'] },
  { name: 'Hampden-Sydney College', cats: [] },
  { name: 'Hampton University', cats: ['hbcu'], enrolling: true },
  { name: 'Harvard University', cats: ['ivy', 'ivyplus', 'nu75'] },
  { name: 'Harvey Mudd College', cats: ['lac75'] },
  { name: 'Haverford College', cats: ['lac75'] },
  { name: 'Hawai\'i Pacific University', cats: [] },
  { name: 'High Point University', cats: [], enrolling: true },
  { name: 'Hobart and William Smith Colleges', cats: ['lac75'] },
  { name: 'Holy Cross College', cats: [] },
  { name: 'Howard University', cats: ['hbcu', 'nu75'], enrolling: true },
  { name: 'Imperial College London', cats: [] },
  { name: 'Indiana University', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Ithaca College', cats: [] },
  { name: 'Jacksonville University', cats: [] },
  { name: 'James Madison University', cats: [], enrolling: true },
  { name: 'Johns Hopkins University', cats: ['ivyplus', 'nu75'] },
  { name: 'Johnson & Wales University', cats: [] },
  { name: 'Kansas State University', cats: ['p4'] },
  { name: 'Kennesaw State University', cats: [] },
  { name: 'Kenyon College', cats: ['lac75'] },
  { name: 'King\'s College London', cats: [] },
  { name: 'Lafayette College', cats: ['lac75'] },
  { name: 'Lees-McRae College', cats: [] },
  { name: 'Lehigh University', cats: ['nu75'] },
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
  { name: 'Massachusetts Institute of Technology', cats: ['ivyplus', 'nu75'] },
  { name: 'McGill University', cats: [] },
  { name: 'Mercer University', cats: [] },
  { name: 'Meredith College', cats: [] },
  { name: 'Metropolitan State University of Denver', cats: [] },
  { name: 'Miami University', cats: [] },
  { name: 'Michigan State University', cats: ['nu75', 'p4'] },
  { name: 'Middle Tennessee State University', cats: [] },
  { name: 'Middlebury College', cats: ['lac75'], enrolling: true },
  { name: 'Mississippi State University', cats: ['p4'] },
  { name: 'Molloy University', cats: [] },
  { name: 'Montana State University', cats: [] },
  { name: 'Montclair State University', cats: [] },
  { name: 'Morehouse College', cats: ['hbcu'] },
  { name: 'Morgan State University', cats: ['hbcu'] },
  { name: 'Mount Holyoke College', cats: ['lac75'] },
  { name: 'Nazareth University', cats: [] },
  { name: 'New York University', cats: ['nu75'] },
  { name: 'North Carolina A&T State University', cats: ['hbcu'], enrolling: true },
  { name: 'North Carolina Central University', cats: ['hbcu'] },
  { name: 'North Carolina State University', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Northeastern University', cats: ['nu75'], enrolling: true },
  { name: 'Northeastern University (New York City)', cats: [] },
  { name: 'Northwestern University', cats: ['ivyplus', 'nu75', 'p4'] },
  { name: 'Nova Southeastern University', cats: [] },
  { name: 'Oberlin College', cats: ['lac75'] },
  { name: 'Oberlin Conservatory of Music', cats: [] },
  { name: 'Occidental College', cats: ['lac75'] },
  { name: 'Oglethorpe University', cats: [] },
  { name: 'Ohio Northern University', cats: [] },
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
  { name: 'Penn State University', cats: ['nu75', 'p4'] },
  { name: 'Pepperdine University', cats: [] },
  { name: 'Point Park University', cats: [] },
  { name: 'Pomona College', cats: ['lac75'] },
  { name: 'Pratt Institute', cats: [] },
  { name: 'Presbyterian College', cats: [] },
  { name: 'Princeton University', cats: ['ivy', 'ivyplus', 'nu75'] },
  { name: 'Providence College', cats: [] },
  { name: 'Purdue University', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Queens University of Charlotte', cats: [], enrolling: true },
  { name: 'Radford University', cats: [] },
  { name: 'Randolph-Macon College', cats: [], enrolling: true },
  { name: 'Rensselaer Polytechnic Institute', cats: ['nu75'] },
  { name: 'Rhode Island School of Design', cats: [] },
  { name: 'Rhodes College', cats: ['lac75'], enrolling: true },
  { name: 'Rice University', cats: ['nu75'] },
  { name: 'Richmond American University London', cats: [] },
  { name: 'Rider University', cats: [] },
  { name: 'Ringling College of Art and Design', cats: [] },
  { name: 'Roanoke College', cats: [] },
  { name: 'Rochester Institute of Technology', cats: [], enrolling: true },
  { name: 'Rollins College', cats: [] },
  { name: 'Roosevelt University', cats: [] },
  { name: 'Rutgers University', cats: ['nu75', 'p4'] },
  { name: 'Rutgers University (Camden)', cats: [] },
  { name: 'Rutgers University (Newark)', cats: ['nu75'] },
  { name: 'Saint Joseph\'s University', cats: [] },
  { name: 'Samford University', cats: [] },
  { name: 'San Diego State University', cats: [] },
  { name: 'Santa Clara University', cats: ['nu75'] },
  { name: 'Sarah Lawrence College', cats: [] },
  { name: 'Savannah College of Art and Design', cats: [] },
  { name: 'School of the Art Institute of Chicago', cats: [] },
  { name: 'Seton Hall University', cats: [] },
  { name: 'Shenandoah University', cats: [] },
  { name: 'Skidmore College', cats: ['lac75'] },
  { name: 'Smith College', cats: ['lac75'] },
  { name: 'South Carolina State University', cats: ['hbcu'] },
  { name: 'Southern Methodist University', cats: ['p4'], enrolling: true },
  { name: 'Southwest Minnesota State University', cats: [], enrolling: true },
  { name: 'Spelman College', cats: ['lac75', 'hbcu'] },
  { name: 'St. Lawrence University', cats: ['lac75'] },
  { name: 'St. Olaf College', cats: ['lac75'] },
  { name: 'Stanford University', cats: ['ivyplus', 'nu75', 'p4'], enrolling: true },
  { name: 'Stevens Institute of Technology', cats: ['nu75'] },
  { name: 'Suffolk University', cats: [] },
  { name: 'Swarthmore College', cats: ['lac75'] },
  { name: 'Syracuse University', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Temple University', cats: [] },
  { name: 'Tennessee State University', cats: ['hbcu'] },
  { name: 'Texas A&M University', cats: ['nu75', 'p4'] },
  { name: 'Texas Christian University', cats: ['p4'], enrolling: true },
  { name: 'Texas State University', cats: [] },
  { name: 'The Boston Conservatory at Berklee', cats: [] },
  { name: 'The Cooper Union for the Advancement of Science and Art', cats: [] },
  { name: 'The Ohio State University', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'The University of Edinburgh', cats: [] },
  { name: 'The University of Manchester', cats: [] },
  { name: 'Trinity College Dublin', cats: [] },
  { name: 'Tufts University', cats: ['nu75'] },
  { name: 'Tulane University', cats: ['nu75'], enrolling: true },
  { name: 'Union College', cats: ['lac75'] },
  { name: 'United States Air Force Academy', cats: ['lac75'] },
  { name: 'United States Military Academy', cats: ['lac75'] },
  { name: 'United States Naval Academy', cats: ['lac75'], enrolling: true },
  { name: 'University College Dublin', cats: [] },
  { name: 'University College London', cats: [] },
  { name: 'University of Alabama', cats: ['p4'], enrolling: true },
  { name: 'University of Alabama (Birmingham)', cats: [] },
  { name: 'University of Arizona', cats: ['p4'] },
  { name: 'University of Arkansas', cats: ['p4'] },
  { name: 'University of Bath', cats: [] },
  { name: 'University of Birmingham', cats: [] },
  { name: 'University of Bristol', cats: [] },
  { name: 'University of California (Berkeley)', cats: ['nu75', 'p4'] },
  { name: 'University of California (Davis)', cats: ['nu75'] },
  { name: 'University of California (Irvine)', cats: ['nu75'] },
  { name: 'University of California (Los Angeles)', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of California (San Diego)', cats: ['nu75'] },
  { name: 'University of California (Santa Barbara)', cats: ['nu75'] },
  { name: 'University of Cambridge', cats: [] },
  { name: 'University of Central Florida', cats: ['p4'] },
  { name: 'University of Chicago', cats: ['ivyplus', 'nu75'] },
  { name: 'University of Cincinnati', cats: ['p4'] },
  { name: 'University of Colorado (Boulder)', cats: ['p4'], enrolling: true },
  { name: 'University of Connecticut', cats: ['nu75'] },
  { name: 'University of Delaware', cats: [] },
  { name: 'University of Denver', cats: [] },
  { name: 'University of Florida', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of Georgia', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of Hartford', cats: [] },
  { name: 'University of Illinois (Urbana-Champaign)', cats: ['nu75', 'p4'] },
  { name: 'University of Iowa', cats: ['p4'] },
  { name: 'University of Kansas', cats: ['p4'] },
  { name: 'University of Kentucky', cats: ['p4'], enrolling: true },
  { name: 'University of Leeds', cats: [] },
  { name: 'University of Liverpool', cats: [] },
  { name: 'University of Louisville', cats: ['p4'] },
  { name: 'University of Lynchburg', cats: [] },
  { name: 'University of Mary Washington', cats: [] },
  { name: 'University of Maryland', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of Maryland Eastern Shore', cats: [] },
  { name: 'University of Massachusetts (Amherst)', cats: ['nu75'] },
  { name: 'University of Massachusetts (Boston)', cats: [] },
  { name: 'University of Memphis', cats: [] },
  { name: 'University of Miami', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of Michigan', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of Minnesota', cats: ['nu75', 'p4'] },
  { name: 'University of Mississippi', cats: ['p4'], enrolling: true },
  { name: 'University of Missouri', cats: ['p4'] },
  { name: 'University of Nevada (Las Vegas)', cats: [] },
  { name: 'University of North Carolina (Asheville)', cats: [] },
  { name: 'University of North Carolina (Chapel Hill)', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of North Carolina (Charlotte)', cats: [], enrolling: true },
  { name: 'University of North Carolina (Greensboro)', cats: [] },
  { name: 'University of North Carolina (Pembroke)', cats: [] },
  { name: 'University of North Carolina (Wilmington)', cats: [] },
  { name: 'University of North Carolina School of the Arts', cats: [] },
  { name: 'University of North Dakota', cats: [] },
  { name: 'University of North Georgia', cats: [] },
  { name: 'University of Notre Dame', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of Oklahoma', cats: ['p4'] },
  { name: 'University of Oregon', cats: ['p4'] },
  { name: 'University of Oxford', cats: [] },
  { name: 'University of Pennsylvania', cats: ['ivy', 'ivyplus', 'nu75'] },
  { name: 'University of Pittsburgh', cats: ['nu75', 'p4'] },
  { name: 'University of Pittsburgh (Johnstown)', cats: [] },
  { name: 'University of Rhode Island', cats: [] },
  { name: 'University of Richmond', cats: ['lac75'], enrolling: true },
  { name: 'University of Rochester', cats: ['nu75'] },
  { name: 'University of San Diego', cats: [] },
  { name: 'University of San Francisco', cats: [] },
  { name: 'University of South Carolina', cats: ['p4'], enrolling: true },
  { name: 'University of South Florida', cats: [] },
  { name: 'University of Southern California', cats: ['nu75', 'p4'] },
  { name: 'University of St Andrews', cats: [] },
  { name: 'University of Stirling', cats: [] },
  { name: 'University of Tampa', cats: [], enrolling: true },
  { name: 'University of Tennessee', cats: ['p4'], enrolling: true },
  { name: 'University of Texas', cats: ['nu75'] },
  { name: 'University of the South (Sewanee)', cats: ['lac75'], enrolling: true },
  { name: 'University of Toronto', cats: [], enrolling: true },
  { name: 'University of Utah', cats: ['p4'] },
  { name: 'University of Vermont', cats: [] },
  { name: 'University of Virginia', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of Washington', cats: ['nu75', 'p4'] },
  { name: 'University of Wisconsin', cats: ['nu75', 'p4'] },
  { name: 'University of Wyoming', cats: [] },
  { name: 'Vanderbilt University', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Vassar College', cats: ['lac75'] },
  { name: 'Villanova University', cats: ['nu75'] },
  { name: 'Virginia Commonwealth University', cats: [] },
  { name: 'Virginia State University', cats: ['hbcu'] },
  { name: 'Virginia Tech', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Virginia Wesleyan University', cats: [] },
  { name: 'Wagner College', cats: [] },
  { name: 'Wake Forest University', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Washington and Lee University', cats: ['lac75'], enrolling: true },
  { name: 'Washington University in St. Louis', cats: ['ivyplus', 'nu75'] },
  { name: 'Webster University', cats: [] },
  { name: 'Wellesley College', cats: ['lac75'] },
  { name: 'Wesleyan University', cats: ['lac75'], enrolling: true },
  { name: 'West Virginia University', cats: ['p4'] },
  { name: 'West Virginia Wesleyan College', cats: [] },
  { name: 'Western Carolina University', cats: [] },
  { name: 'William & Mary', cats: ['nu75'] },
  { name: 'Williams College', cats: ['lac75'] },
  { name: 'Wingate University', cats: [] },
  { name: 'Winston-Salem State University', cats: ['hbcu'] },
  { name: 'Winthrop University', cats: [] },
  { name: 'Wofford College', cats: ['lac75'], enrolling: true },
  { name: 'Worcester Polytechnic Institute', cats: ['nu75'] },
  { name: 'Xavier University', cats: [] },
  { name: 'Xavier University of Louisiana', cats: ['hbcu'] },
  { name: 'Yale University', cats: ['ivy', 'ivyplus', 'nu75'] },
  { name: 'York College of Pennsylvania', cats: [] },
  { name: 'Zaytuna College', cats: [] },
]

const PROFILE_2526 =
  'https://resources.finalsite.net/images/v1759320688/charlottecds/dn5vss9ud5xxwzyt70ah/CCDSSchoolProfile2025-2026-FINAL.pdf'
const PROFILE_2425 =
  'https://resources.finalsite.net/images/v1726775598/charlottecds/enzt08thdabvh3uxiz0i/2024-2025CCDSSchoolProfile.pdf'
const PROFILE_2627 =
  'https://resources.finalsite.net/images/v1790254021/charlottecds/qo26oegmsg1nwpis3l9b/CCDSCollegeProfile2026-FNA.pdf'
const ACCEPTANCES_FINAL =
  'https://resources.finalsite.net/images/v1790254071/charlottecds/c7flxnbdkjh5gueobvj5/CCDSCollegeMatriculation2026-FNA.pdf'
const COUNSELING = 'https://www.charlottecountryday.org/cd-education/college-counseling'
const CLASS_2026 =
  'https://www.charlottecountryday.org/news-events/news-details-page/~board/school-news/post/class-of-2026-college-admissions-outcomes'
const ERP = 'https://www.charlottecountryday.org/cd-education/educational-resource-program'

export const charlotteCountryDay: CollegeSupportProgram = {
  /* The area's SECOND card, after Where Graduates Go. Unlike every other card here, these figures are
     GOVERNMENT-published — the UNC System's Insight dashboard, pulled via the
     nc-admissions-data skill — rather than the school’s own marketing number.
     Full per-term counts, the exact filter values and the provenance header are in
     source-material/college-support/charlotte-country-day/
     Charlotte Country Day School - College Support - UNC System Admissions.md.

     Every rate ships with its denominator: these are small cells, and a bare
     percentage off a single-digit base is not publishable. The five-year figure is
     POOLED — sum(admitted)/sum(applied) over the five most recent terms — never the
     mean of the five annual rates. */
  ncAdmissions: {
    headline:
      'Across the six top-ranked NC public universities, Charlotte Country Day School’s applicants were admitted at a pooled 46.7% over the last five entering classes — 328 acceptances from 702 applications.',
    subhead:
      'NC State University is the hard one: 22.9% in Fall 2025 — 11 of 48 — against far higher rates at the less-selective universities. These are UNC-system figures published by the state, not the school’s own.',
    stats: [
      { value: '702', label: 'applications to the six universities, Fall 2021–2025' },
      { value: '46.7%', label: 'pooled admit rate — 328 of 702 across those five classes' },
      { value: '22.9%', label: 'at NC State University — 11 of 48, the toughest of the six for this school' },
      { value: 'UNC-Chapel Hill', label: 'drew the most applications in Fall 2025 (69)' },
    ],
    latestTerm: '2025',
    universities: [
      {
        key: 'unc-chapel-hill',
        name: 'UNC-Chapel Hill',
        rank: 1,
        note: 'Flagship · Chapel Hill',
        applied: '69',
        accepted: '20',
        rate: '29.0%',
        ratePct: 0.29,
        fiveYearRate: '37.7%',
        fiveYearApplied: '316',
        fiveYearAccepted: '119',
      },
      {
        key: 'nc-state-university',
        name: 'NC State University',
        rank: 2,
        note: 'Flagship STEM · Raleigh · the most selective of the six',
        applied: '48',
        accepted: '11',
        rate: '22.9%',
        ratePct: 0.229,
        fiveYearRate: '29.9%',
        fiveYearApplied: '194',
        fiveYearAccepted: '58',
      },
      {
        key: 'unc-charlotte',
        name: 'UNC Charlotte',
        rank: 3,
        note: 'Hometown campus',
        applied: '16',
        accepted: '14',
        rate: '87.5%',
        ratePct: 0.875,
        fiveYearRate: '81.8%',
        fiveYearApplied: '66',
        fiveYearAccepted: '54',
      },
      {
        key: 'east-carolina-university',
        name: 'East Carolina University',
        rank: 4,
        note: 'Greenville · eastern NC · largest admit rates of the six',
        applied: '11',
        accepted: '11',
        rate: '100.0%',
        ratePct: 1,
        fiveYearRate: '94.1%',
        fiveYearApplied: '34',
        fiveYearAccepted: '32',
      },
      {
        key: 'unc-wilmington',
        name: 'UNC Wilmington',
        rank: 5,
        note: 'Coastal · mid-selectivity',
        applied: '17',
        accepted: '10',
        rate: '58.8%',
        ratePct: 0.588,
        fiveYearRate: '59.3%',
        fiveYearApplied: '59',
        fiveYearAccepted: '35',
      },
      {
        key: 'unc-greensboro',
        name: 'UNC Greensboro',
        rank: 6,
        note: 'Piedmont Triad',
        applied: '12',
        accepted: '11',
        rate: '91.7%',
        ratePct: 0.917,
        fiveYearRate: '90.9%',
        fiveYearApplied: '33',
        fiveYearAccepted: '30',
      },
    ],
    methodNote:
      'Read each row as a joint figure. It is the rate at which that university admitted this school’s applicants. It is not the university’s overall admit rate, and it does not measure how selective the school itself is. Applied/Accepted are the Fall 2025 entering class. The 5-yr column pools Fall 2021–2025 as sum(accepted)/sum(applied), so a year with many applicants counts more than a year with few. The counts sit beside every rate because several cells are in single digits.',
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
      '589 AP exams in 2026 at 96% scoring 3+ and 87% at 4 or 5 — an average score of 4.2 — and the school publishes those results discipline by discipline.',
    subhead:
      'Country Day was the first school in North Carolina to offer the IB Diploma. So a student has two clear routes to the hardest course load, not one. The profile also names the top course in every subject.',
    stats: [
      { value: '589', label: 'AP exams sat in May 2026 (230 students)' },
      { value: '96%', label: 'scored 3+ · 87% earned 4s or 5s · 4.2 average' },
      { value: '26 AP + IB', label: 'AP courses (28 Honors) plus a full IB Diploma Programme, 2026–27' },
      { value: 'Quintiles', label: 'no rank reported — a GPA quintile table stands in' },
    ],
    merit: [
      { year: '2027', detail: '**4** Semifinalists — Finalists and Commended not yet announced' },
      { year: '2026', detail: '**6** Semifinalists · **5** Finalists · **13** Commended · 1 NMSC Special Scholarship (C.D. Spangler Foundation)' },
      { year: '2025', detail: '**2** Semifinalists · **2** Finalists · **5** Commended — a conspicuous trough between two normal years', unconfirmed: true },
      { year: '2024', detail: '**7** Semifinalists · **7** Finalists · **2** Commended · 1 Scholar, 1 College-Sponsored Scholar' },
      { year: '2022', detail: '**11** Semifinalists · **13** Commended' },
      { year: '2021', detail: '**9** Semifinalists · **8** Commended — 17 in the 97th percentile or above' },
      { year: '2018', detail: '**7** Semifinalists · **8** Commended' },
    ],
    meritNote:
      'The Class of 2025 line is the school’s own published figure but sits three times below the classes on either side of it, so it is flagged rather than smoothed. Note also that Semifinalists are named each autumn of senior year, which is why the 2026–27 profile already carries the Class of 2027. College Board National Recognition Program counts are not published in any year.',
    depth: [
      {
        label: 'Mathematics',
        text: '**Calculus III** (dual-listed with IB Analysis HL) tops the sequence, and there is a rare post-AP statistics path — **Advanced AP Statistics with R and R Studio**.',
      },
      {
        label: 'Sciences',
        text: '**Organic Chemistry** and **Physical Computational Biochemistry** are one-semester electives taken after AP. Organic Chemistry is stated to be for students who have finished AP or IB Chemistry. **AP Physics 1** replaced Honors Physics in 2026–27. It is now the course students must take before AP Physics C.',
      },
      {
        label: 'Computer science',
        text: 'The top course is AP Computer Science A. **AP Computer Science Principles** joins in 2026–27 as a starting course in 10th grade. There is still **no post-AP CS course**. That is a real gap next to the depth in math and science.',
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
        text: '**+0.5 for Honors, +1.0 for AP/IB** on a 4.0 base. Every profile edition reviewed uses this same scale. The 2026–27 edition also gives the +1.0 to the post-AP Organic Chemistry and Calculus III. There is no separate quality-point table.',
      },
      {
        label: 'No rank → a quintile table',
        text: 'Country Day has published a quintile table (a split of the class into fifths) every year since at least 2015–16. The 2025–26 edition tied each fifth to a median SAT and ACT score. The 2026–27 edition goes back to **GPA medians alone**. Beside them it prints a **whole-class SAT/ACT middle 50%**.',
      },
      {
        label: '“Most rigorous” shown, not defined',
        text: 'There is no number-based rubric. Instead, a **“Notably Rigorous Courses by Discipline”** table names the top course in each subject. The profile also sorts seniors into AP-load groups: 0–2 / 3–5 / 6–8 / 9+ (Class of 2027: 22 / 22 / 39 / 14 of the 97 non-IB seniors with seven-plus semesters). These let a reader place a student among classmates.',
      },
      {
        label: 'Standard means college-prep',
        text: 'Every course that is not Honors, AP or IB is labeled **“Regular/Standard”** on transcripts and STARS forms. The profile says every course is college-prep in difficulty. AP is closed to 9th graders. 10th graders generally take only AP Human Geography and AP Computer Science Principles.',
      },
    ],
    flags: [
      {
        kind: 'gap',
        text: 'No mandatory-AP-exam policy is published, so the 96% rests on an unstated denominator. The curriculum page says the exam “is the driver for the curriculum”, which implies a strong expectation but is not a stated requirement. AP Scholar counts have not been published since 2021.',
      },
      {
        kind: 'verify',
        text: 'The 26 AP is the profile’s own count: its rigorous-courses table prints 25 AP titles, with AP US and Comparative Government on one line. The Course Offerings catalogue (2025–26, the latest posted) holds 23; no 2026–27 catalogue was posted as of 2026-11-07.',
      },
    ],
    sources: [
      { label: 'charlottecountryday.org — 2026–27 School Profile (AP results by discipline, quintile table, weighting, course-load rules)', url: PROFILE_2627 },
      { label: '2024–25 School Profile (prior grading scale)', url: PROFILE_2425 },
      { label: 'International Baccalaureate at Country Day', url: 'https://www.charlottecountryday.org/cd-education/upper-school/international-baccalaureate' },
    ],
  },

  counseling: {
    headline:
      'Five full-time counselors for 536 Upper Schoolers — roughly 27 seniors each — with more than 100 years of combined admissions experience between them.',
    subhead:
      'The office changed directors in July 2026, and the 2026–27 profile is the first edition to show the new office. But the office still holds a decade of experience. Two of the five have worked there since at least 2015–16.',
    stats: [
      { value: '~1:27', label: 'counselors to seniors (derived — 137 ÷ 5; the school publishes no ratio)' },
      { value: '5', label: 'full-time college counselors, plus a registrar' },
      { value: '150+', label: 'college admissions officers hosted each year' },
      { value: 'Scoir', label: 'platform for students and for rep-visit scheduling' },
    ],
    roster: [
      {
        role: 'Director',
        name: 'Allison Slater Tate',
        detail: 'Director since July 2026, after a national search. A nationally published writer and speaker on admissions.',
        email: 'allison.tate@charlottecountryday.org',
      },
      {
        role: 'Sr. Assoc. Director',
        name: 'Catherine Odum',
        detail: 'In the office since at least 2015–16 — Associate Director, then Director, now Senior Associate.',
        email: 'catherine.odum@charlottecountryday.org',
      },
      {
        role: 'Assoc. Director',
        name: 'Jonathan Woog',
        detail: '10+ years here, rising from Assistant to Associate Director.',
        email: 'jonathan.woog@charlottecountryday.org',
      },
      {
        role: 'Assoc. Director',
        name: 'Meredith High',
        detail: 'Listed across both recent profile editions.',
        email: 'meredith.high@charlottecountryday.org',
      },
      {
        role: 'Assoc. Director',
        name: 'Brooke Tevlin',
        detail: 'Joined between the 2024–25 and 2025–26 profiles. Plus registrar Kim Dickson (Donna Witman in 2025–26).',
        email: 'brooke.tevlin@charlottecountryday.org',
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
      'The Class of 2026 sent **1,107 applications to 203 institutions**, about eight per student. A dedicated registrar handles transcripts and the school report. Testing accommodations are handled by the Educational Resource Program, not the college office.',
    reach: [
      '**150+** admissions officers a year, in 60-minute sessions across five fixed daily slots',
      'A defined visit window — **24 Aug to 20 Nov 2026** — scheduled through Scoir Visits',
      'ACCIS · NACAC · SACAC memberships · an annually published School Profile (CEEB 340666, IB 0667)',
    ],
    flags: [
      {
        kind: 'verify',
        text: 'Both ratios are derived (536 ÷ 5 and 137 ÷ 5, from the 2026–27 profile); the school publishes no ratio. The real caseload is probably juniors plus seniors, nearer 1:54. The counseling page’s intro says “four full-time college counselors”, while that page and the profile both list five. No counselor bios, tenures, degrees or prior employers are published — the team page gives names, titles and contact details only.',
      },
      {
        kind: 'gap',
        text: 'No count of campus visits made by counseling staff is published anywhere, and no named scholarship-search tool or database is described.',
      },
    ],
    sources: [
      { label: 'charlottecountryday.org — College Counseling', url: COUNSELING },
      { label: '2026–27 School Profile (office roster, enrollment)', url: PROFILE_2627 },
      { label: 'Meet Our Team', url: 'https://www.charlottecountryday.org/cd-education/college-counseling/meet-our-team' },
      { label: 'For College Representatives (visit window, Scoir Visits)', url: 'https://www.charlottecountryday.org/cd-education/college-counseling/for-college-representatives' },
      { label: 'News — Allison Slater Tate appointed Director', url: 'https://www.charlottecountryday.org/news-events/news-details-page/~board/school-news/post/allison-slater-tate-appointed-director-of-college-counseling' },
    ],
  },

  outcomes: {
    headline:
      'The Class of 2026 — 141 seniors — enrolled at 70 institutions across 24 states, DC and Canada, with 32 students to UNC–Chapel Hill alone.',
    subhead:
      'The published list covers four years of acceptances at 363 colleges. Harvard, Caltech, Johns Hopkins and Northwestern were among those added in the final edition. Only the names in bold are places where a Class of 2026 student actually enrolled.',
    stats: [
      { value: '70', label: 'institutions actually enrolling a Class of 2026 student' },
      { value: '170', label: 'unique institutions admitting them · 1,107 applications sent' },
      { value: '32', label: 'students to UNC–Chapel Hill — 23% of the class' },
      { value: '$14.7M', label: 'scholarship offers, Class of 2026 ($13M for 2025)' },
    ],
    buckets: [
      { tier: 'Ivy League', count: '8 / 8', note: '— Harvard appears for the first time on the final 2023–2026 list; none enrolling for the Class of 2026' },
      { tier: '“Ivy Plus”', count: '17 / 17', note: '— all 17; Stanford and Duke enrolling' },
      { tier: 'Top-75 National Universities', count: '75 / 75' },
      { tier: 'Top-75 Liberal Arts', count: '50 / 75', note: '— includes all three federal service academies' },
      { tier: 'Power Four', count: '63 / 68' },
      { tier: 'HBCUs', count: '19 / 107', note: '— Historically Black Colleges & Universities' },
    ],
    collegesTitle: 'Every acceptance, 2023–2026',
    colleges,
    collegesTotal: '363 institutions · bold = enrolling a Class of 2026 student',
    scholarships: [
      '$14.7M scholarship offers · Class of 2026',
      '1 Morehead-Cain Scholar (34 all-time)',
      'U.S. Naval Academy appointment',
      'February One Scholarship (NC A&T)',
      'Recent: Jefferson, Jack Kent Cooke, QuestBridge, Ron Brown, Coca-Cola',
    ],
    scholarshipsNote:
      'Treat the “34 Morehead-Cain recipients” figure with care. The College Counseling main page shows it next to Class of 2026 numbers. But the Class of 2026 had exactly one Morehead-Cain Scholar. The 34 is an all-time total, and the school never says what years it covers. Robertson Scholars and NC State Park Scholars appear only in the 2015–16 profile. They should not be shown as awards students win today.',
    flags: [
      {
        kind: 'verify',
        text: 'Bold read from the font runs of both 2023–2026 editions: the May edition (5/28/2026) and the final edition each carry 69 bold names. Lafayette lost bold in the final edition; Central Piedmont and Wesleyan gained it; Northeastern is bold in both. The earlier Yale marker was a transcription slip — Yale is bold in neither edition. The school’s “70 institutions” enrolling figure is one more than either edition’s 69 bold names.',
      },
      {
        kind: 'verify',
        text: 'States: the 2026–27 profile says the Class of 2026 is in 24 states, DC and Canada; the Class of 2026 page (May 2026) says 23. The profile is the later document and is used.',
      },
    ],
    sources: [
      { label: 'charlottecountryday.org — College Acceptances 2023–2026, final edition (PDF)', url: ACCEPTANCES_FINAL },
      { label: '2026–27 School Profile (Class of 2026 outcomes)', url: PROFILE_2627 },
      { label: 'News — Class of 2026 college admissions outcomes', url: CLASS_2026 },
      { label: '2025–26 School Profile (Class of 2025 outcomes, regional split)', url: PROFILE_2526 },
      { label: 'U.S. News 2027 rankings (tier scoring)', url: 'https://www.usnews.com/best-colleges/rankings/national-universities' },
    ],
  },

  edge: {
    headline:
      'The IB Diploma is what sets the school apart: a second route to the hardest course load. And the Senior Externship turns 175+ local employers into a network only this school has.',
    subhead:
      'What Country Day does not have is a required capstone or research thesis; its spike-building is program breadth rather than a single mandated credential.',
    levers: [
      {
        title: 'Lever 1 — Build the spike',
        glyph: '◆',
        items: [
          '**IB Diploma Programme** — Country Day was the **first school in North Carolina** to offer it. **26 seniors in the Class of 2027** take the full diploma from junior year. Its five-year pass rate is 88%. For a student whose strengths do not fit the AP model, it is a second clear path to the hardest course load. It also has an Extended Essay built in.',
          '**Senior Externship** — a January job-shadowing program that started in 2017. It works with **175+ local employers across 20+ industries**. In a recent year **136 seniors** were placed with 68 Charlotte-area employers. Most hosts were current and past parents and alumni.',
          '**Science Outreach Program** — rising juniors and seniors work with science professors at local institutions on primary research over the summer, then present at the annual Science Symposium.',
          '**Weddington Farm** — a **330-acre living classroom** with crops, farm animals, beekeeping, mushroom farming and a ten-mile trail system. It is used for lessons in green farming, ecology and starting a business. Few city private schools have anything like it.',
          '**Special Olympics Mecklenburg County Spring Games** — the Upper School has paused classes for two days every April **since 1984** to host them. To an admissions office, a 40-year commitment by the whole school reads very differently than a service club.',
        ],
        note:
          'There is no required internship, capstone or independent research thesis. The Senior Externship is a single day, and the school never says it is required. Still, 136 of ~141 seniors took part, which suggests nearly every senior does it in practice.',
      },
      {
        title: 'Lever 2 — What the school brings',
        glyph: '▲',
        items: [
          '**The School Profile as an instrument** — the 2026–27 edition names the top course in every subject. It states the weighting formula. It shows AP results by subject, including the low end (Fine Arts at 91%/61%). Its AP-load groups grew to four. It dropped the 2025–26 edition’s test medians for each fifth, but it brought back a whole-class SAT/ACT middle 50%. That openness itself builds trust.',
          '**Integrity signaling** — an Honor Code students pledge every year, a student-run Honor Council, and membership in ACCIS, NACAC and SACAC. Signs of strong teachers matter here too. The Upper School’s **83 teaching and administrative staff** include **AP exam readers**, National Board graders and Klingenstein Fellows. 82% hold advanced degrees, and 100% take part in teacher training each year.',
          '**A dominant UNC–Chapel Hill pipeline** — 32 Class of 2026 students enrolled there, 23% of the class. The school also counts 34 Morehead-Cain recipients all-time. Add a lasting Jefferson Scholar link to UVA and a decade of service-academy appointments.',
          '**A substantial HBCU pipeline** — North Carolina A&T, Howard, Hampton and Clark Atlanta all enrolled Class of 2026 students. The list holds 19 HBCUs (historically Black colleges and universities), with Claflin new. Recent awards include a February One Scholarship and a Ron Brown Scholar.',
        ],
        note:
          'The school does not publish its policy on reporting discipline. That policy would say whether, and how, Honor Council findings or suspensions reach the secondary school report (the form the school sends to colleges). The school lists NACAC membership, so this gap is a sharp question to ask on a tour.',
      },
    ],
    flags: [],
    sources: [
      { label: 'charlottecountryday.org — Senior Externship', url: 'https://www.charlottecountryday.org/cd-experience/beyond-the-classroom/externship' },
      { label: '2026–27 School Profile (IB, faculty markers, AP results by discipline)', url: PROFILE_2627 },
      { label: '2025–26 School Profile (memberships)', url: PROFILE_2526 },
      { label: 'Collegiate athletics', url: 'https://www.charlottecountryday.org/cd-experience/athletics/collegiate-athletics' },
      { label: 'International Studies', url: 'https://www.charlottecountryday.org/cd-education/international-studies' },
    ],
  },

  wholeClass: {
    headline:
      'The quintile table gives the honest answer for the middle of the class. The fourth fifth has a 3.655 median GPA, and the bottom fifth 3.012. The whole-class middle 50% is a 1170–1400 SAT.',
    subhead:
      'Country Day publishes what most schools hide. Its acceptance list shows the same spread: Harvard, Princeton and MIT at one end, and Cape Fear and Central Piedmont community colleges at the other.',
    scoreTables: [
      {
        title: 'SAT score percentiles',
        hint: '— Class of 2027 · middle 50% printed in the 2026–27 profile beside the Class of 2027 GPA table',
        rows: [
          { label: 'SAT total', values: ['—', '1170', '—', '1400', '—', '—'] },
        ],
        note:
          'The middle-50% endpoints are the 25th and 75th percentiles; the 10th, 50th and 90th are shown as “—” because the school has never published them, nor a mean. Section scores were last published for the Class of 2024 (EBRW 585–700, Math 590–690); the number of testers never. The 2025–26 edition had dropped the whole-class range for per-fifth medians; the 2026–27 edition restores it without naming the class.',
      },
      {
        title: 'ACT score percentiles',
        hint: '— Class of 2027 · middle 50% printed in the 2026–27 profile beside the Class of 2027 GPA table',
        rows: [
          { label: 'ACT composite', values: ['—', '26', '—', '31', '—', '—'] },
        ],
        note:
          'English 23–32 and Math 22–29 were last published for the Class of 2024, whose composite was 24–31; the Class of 2015’s was 26–31, so the floor is back where it was a decade ago.',
      },
    ],
    gpaTitle: 'GPA percentiles',
    gpaHint: '— the no-rank mechanism · Class of 2027 median weighted GPA (120 of 137 seniors with seven-plus semesters at the school)',
    quintiles: [
      { label: 'First fifth', gpa: '4.516' },
      { label: 'Second', gpa: '4.259' },
      { label: 'Third', gpa: '3.961' },
      { label: 'Fourth', gpa: '3.655' },
      { label: 'Fifth', gpa: '3.012' },
    ],
    gpaNote:
      'All five quintiles are the school’s own published figures — nothing is interpolated. Grades reflect work done at Country Day only, as of the end of junior year, for students with at least seven semesters at the school. The 2025–26 edition tied each fifth to a median SAT and ACT for the Class of 2025 (4.472/1470/33 down to 2.991/1110/24); the 2026–27 edition drops that pairing. Over ten years the distribution has stretched at both ends: the top-quintile mean rose from 4.198 to 4.540 while the bottom-quintile floor fell from 2.546 to 2.076.',
    support: [
      {
        label: 'The Educational Resource Program',
        text: 'A named JK–12 structure covering tutoring, accommodations, assessments and evaluation referrals, delivered as hourly sessions before, during or after the school day.',
      },
      {
        label: 'The Upper School model',
        text: '**Academic coaches** help with subjects and with planning, organizing and focus skills. **Learning specialists** work one-on-one so students “recognize and utilize their strengths”. The goal is for students to learn on their own and speak up for themselves.',
      },
      {
        label: 'Where it reaches the application',
        text: 'Unusually, the ERP explicitly **“assists in requesting accommodations with the College Board, ACT, and IB”** — the hand-off into admissions testing is stated rather than left implicit.',
      },
    ],
    middle: [
      {
        label: 'The list matches the distribution',
        text: 'The colleges where students enrolled are not just a top-25 highlight reel. Appalachian State, East Carolina, UNC–Charlotte, High Point, Queens, Liberty, Tampa, Mississippi, Kentucky and Southwest Minnesota State all appear. **55% of the Class of 2026 enrolled at public universities**, and 32% stayed in North Carolina.',
      },
      {
        label: 'Community colleges published',
        text: 'Cape Fear and Central Piedmont both appear on the acceptance list. Many peer schools quietly omit their community-college acceptances; publishing them is a meaningful transparency signal.',
      },
      {
        label: 'Non-traditional destinations',
        text: 'There are about eighteen arts and music schools, and Berklee is one where a student enrolled. The list also has CalArts, Cooper Union, Ringling, Oberlin Conservatory, Manhattan School of Music, RISD, Pratt and SAIC. It has Parsons in New York and Paris, and UNCSA. All three federal service academies appear, with a Naval Academy appointment. There are also around twenty-one international universities. They include Oxford, Cambridge, Imperial, UCL, McGill, Trinity College Dublin, Toronto, St Andrews, Edinburgh and Durham.',
      },
    ],
    flags: [
      {
        kind: 'gap',
        text: 'The 2026–27 profile brings back a whole-class SAT and ACT middle 50%. But it does not say which class it covers or how many students took the tests. It also drops the 2025–26 edition’s medians for each fifth. The number of test-takers has never been published in any year. A range without a count shows a shape, but not how many students stand behind it.',
      },
      {
        kind: 'gap',
        text: 'No gap-year counseling, placement count or deferral policy is published, and neither is any direct-to-work or enlistment outcome.',
      },
    ],
    sources: [
      { label: 'charlottecountryday.org — 2026–27 School Profile (Class of 2027 quintile table, SAT/ACT middle 50%)', url: PROFILE_2627 },
      { label: '2025–26 School Profile (Class of 2025 per-quintile SAT/ACT medians)', url: PROFILE_2526 },
      { label: '2024–25 School Profile (Class of 2024 section scores)', url: PROFILE_2425 },
      { label: 'Educational Resource Program', url: ERP },
    ],
  },

  verdict: {
    headline:
      'A deep, stable office and an unusually open profile. Country Day gives admissions readers more useful context than almost any peer school. The 2026–27 edition also brings back the whole-class SAT and ACT ranges it had dropped.',
    subhead:
      'The strengths are structural and durable; the gaps are disclosure choices, which is exactly what a tour can put pressure on.',
    points: [
      {
        label: 'The profile gives readers more context than peers',
        text: 'a quintile table of Class of 2027 median GPAs from 4.516 down to 3.012, with a 1170–1400 SAT and 26–31 ACT middle 50% printed beside it. No rank is ever assigned, yet a reader can place any candidate precisely — though the 2025–26 edition’s per-fifth test medians are gone.',
      },
      {
        label: 'AP performance is high, improving and candidly disclosed',
        text: '589 exams at 96% scoring 3+ and 87% at 4–5, up from 530 at 93%/74% a year earlier — published discipline by discipline, Fine Arts at 91%/61% rather than hidden.',
      },
      {
        label: 'The IB Diploma is a real structural differentiator',
        text: 'first in North Carolina to offer it, 26 full-diploma seniors in the Class of 2027, 88% five-year pass rate. It is a second clear path to the hardest course load for students whose strengths do not fit the AP model.',
      },
      {
        label: 'The office is deep and stable through a director change',
        text: 'five counselors, 100+ years of combined experience, and 150+ college reps a year through a structured Scoir Visits program. The July 2026 change has happened. Allison Slater Tate leads, and Catherine Odum, in the office for a decade-plus, is Senior Associate. So the new leaders build on long experience, not a blank slate.',
      },
      {
        label: 'The timeline starts genuinely early',
        text: 'Freshman Seminar and Scoir in 9th grade. PreACT and the Charlotte Area Case Studies mock committee in 10th. One-on-one meetings from the second semester of junior year. An essay workshop in August before senior year.',
      },
      {
        label: 'The outcomes are honest across the whole distribution',
        text: '70 destinations for 141 seniors across 24 states, DC and Canada, 55% public and 45% private. Community colleges are listed alongside Princeton and MIT. 32 students enrolled at UNC–Chapel Hill. And a substantial HBCU pipeline, with students enrolling at four of them.',
      },
    ],
    checklist: [
      'Your 2026–27 profile prints a 1170–1400 SAT and 26–31 ACT middle 50% beside the Class of 2027 GPA table. Which class and how many test-takers does that cover? And why were the medians for each fifth dropped?',
      'The Class of 2025 had 2 National Merit Semifinalists where the classes either side had 7 and 6. What happened that year?',
      'Harvard appears on the 2023–2026 list for the first time in the final edition, and still no Class of 2026 student enrolled at an Ivy. How do you read that, and what does Ivy enrollment look like year over year?',
      'What exactly does the “34 Morehead-Cain recipients” figure cover — how many years? The Class of 2026 post names exactly one.',
      'How many learning specialists and academic coaches work with Upper School students, what are their credentials, and what is the caseload?',
      'How do you report Honor Council findings and disciplinary actions on the secondary school report?',
      'How many colleges do your counselors visit each year, is the Senior Externship required, and what gap-year, post-AP computer science, or capstone-research options exist?',
    ],
    flags: [],
    sources: [
      { label: 'charlottecountryday.org — College Counseling', url: COUNSELING },
      { label: '2026–27 School Profile', url: PROFILE_2627 },
      { label: 'Verdict synthesised by the researcher from the sources cited on the cards above', },
    ],
  },
}
