// Charlotte Latin School — the six College Support cards.
//
// Every figure is transcribed from the school's OWN published materials —
// chiefly the 2026–27 Upper School Profile PDF, the College Counseling page, and
// named news coverage — with earlier profile editions (2017–18, 2019–20,
// 2020–21, 2025–26) used only where explicitly labelled as historical. See
// source-material/college-support/charlotte-latin/Charlotte Latin - College
// Support - School Profile 2026-2027.md for the current hard data, and
// Charlotte Latin - College Support - Redesign Research 2026.md for the history.
//
// For years Latin was the outlier in this set for what it WITHHELD: from the
// 2019–20 edition through 2025–26 its profile printed no SAT or ACT scores, no
// AP results, no grading scale and no class-rank policy. The 2026–27 edition
// ended that. It prints 2026 AP results by subject, SAT and ACT class means,
// junior and sophomore grade distributions, the full grading scale and a
// "does not report class rank" statement. It still prints no percentiles, no
// GPA distribution and no rank table, so the Whole Class card shows means only
// (`noPercentiles`) and renders no quintiles.
//
// One research finding is still load-bearing and surfaced on the cards: the
// Learning Resources programme is real (founded 1985) but effectively
// unpublished. Its program pages were removed (the last Wayback copy is
// 2025-05), and the live Student Support & Wellness tile holds only a
// one-paragraph goal statement. That gap between capability and disclosure is
// itself the finding, so it renders rather than being quietly omitted.

import type { CollegeSupportProgram } from '../collegeSupport.ts'

/* The 2023–2026 acceptance window: two published lists merged, one row per
   institution. The 2025–26 Upper School Profile printed a "College Admission
   Summary 2023–25" (300 institutions); the 2026–27 profile prints "2024–26"
   (292). Together they hold 337 institutions. Where the two lists spell one
   institution differently, the row carries the official name.

   `enrolling` (bold) follows the NEWER list only — an asterisk on the 2024–26
   summary, which marks a college where AT LEAST ONE student matriculated during
   that period. It is not a count. The 2023–25 asterisks are deliberately not
   carried, so bold shows the latest class data the school publishes (user
   decision, 2026-11-03). Rank labels and buckets are scored against the 2027
   U.S. News tables. */
const colleges = [
  { name: 'Agnes Scott College', cats: ['lac75'] },
  { name: 'Allegheny College', cats: [] },
  { name: 'American University', cats: [], enrolling: true },
  { name: 'Amherst College', cats: ['lac75'] },
  { name: 'Anderson University (South Carolina)', cats: [] },
  { name: 'Appalachian State University', cats: [], enrolling: true },
  { name: 'Arizona State University', cats: ['p4'] },
  { name: 'Auburn University', cats: ['p4'], enrolling: true },
  { name: 'Averett University', cats: [] },
  { name: 'Bard College', cats: ['lac75'] },
  { name: 'Barnard College', cats: ['lac75'] },
  { name: 'Baylor University', cats: ['p4'] },
  { name: 'Belhaven University', cats: [] },
  { name: 'Belmont Abbey College', cats: [] },
  { name: 'Belmont University', cats: [], enrolling: true },
  { name: 'Beloit College', cats: [] },
  { name: 'Bennington College', cats: [] },
  { name: 'Bentley University', cats: [] },
  { name: 'Berry College', cats: [] },
  { name: 'Boston College', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Boston University', cats: ['nu75'], enrolling: true },
  { name: 'Bowling Green State University', cats: [] },
  { name: 'Brandeis University', cats: ['nu75'], enrolling: true },
  { name: 'Brevard College', cats: [] },
  { name: 'Bridgewater College', cats: [] },
  { name: 'Brown University', cats: ['ivy', 'ivyplus', 'nu75'], enrolling: true },
  { name: 'Brunel University London', cats: [] },
  { name: 'Bryn Mawr College', cats: ['lac75'] },
  { name: 'Bucknell University', cats: ['lac75'], enrolling: true },
  { name: 'Butler University', cats: [] },
  { name: 'California Polytechnic State University (San Luis Obispo)', cats: [] },
  { name: 'Calvin University', cats: [], enrolling: true },
  { name: 'Campbell University', cats: [] },
  { name: 'Carleton College', cats: ['lac75'] },
  { name: 'Carnegie Mellon University', cats: ['nu75'] },
  { name: 'Carson-Newman University', cats: [] },
  { name: 'Case Western Reserve University', cats: ['nu75'], enrolling: true },
  { name: 'Catawba College', cats: [], enrolling: true },
  { name: 'Centre College', cats: ['lac75'] },
  { name: 'Champlain College', cats: [] },
  { name: 'City St George’s, University of London', cats: [] },
  { name: 'Clark University', cats: [] },
  { name: 'Clemson University', cats: ['p4'], enrolling: true },
  { name: 'Coastal Carolina University', cats: [] },
  { name: 'Colby College', cats: ['lac75'] },
  { name: 'Colgate University', cats: ['lac75'], enrolling: true },
  { name: 'College of Charleston', cats: [], enrolling: true },
  { name: 'College of the Atlantic', cats: [] },
  { name: 'Colorado College', cats: ['lac75'] },
  { name: 'Colorado School of Mines', cats: [], enrolling: true },
  { name: 'Colorado State University', cats: [] },
  { name: 'Connecticut College', cats: ['lac75'] },
  { name: 'Cornell University', cats: ['ivy', 'ivyplus', 'nu75'], enrolling: true },
  { name: 'Covenant College', cats: [] },
  { name: 'Creighton University', cats: [] },
  { name: 'Crown College', cats: [] },
  { name: 'Dartmouth College', cats: ['ivy', 'ivyplus', 'nu75'], enrolling: true },
  { name: 'Davidson College', cats: ['lac75'], enrolling: true },
  { name: 'Denison University', cats: ['lac75'], enrolling: true },
  { name: 'DePaul University', cats: [] },
  { name: 'DePauw University', cats: ['lac75'], enrolling: true },
  { name: 'Dickinson College', cats: ['lac75'] },
  { name: 'Drake University', cats: [] },
  { name: 'Drew University', cats: [] },
  { name: 'Drexel University', cats: [] },
  { name: 'Duke Kunshan University', cats: [] },
  { name: 'Duke University', cats: ['ivyplus', 'nu75', 'p4'], enrolling: true },
  { name: 'East Carolina University', cats: [], enrolling: true },
  { name: 'East Tennessee State University', cats: [] },
  { name: 'Eckerd College', cats: [] },
  { name: 'Elon University', cats: [], enrolling: true },
  { name: 'Embry-Riddle Aeronautical University', cats: [] },
  { name: 'Embry-Riddle Aeronautical University (Prescott)', cats: [] },
  { name: 'Emerson College', cats: [] },
  { name: 'Emory & Henry University', cats: [] },
  { name: 'Emory University', cats: ['nu75'], enrolling: true },
  { name: 'Endicott College', cats: [] },
  { name: 'Fairfield University', cats: [] },
  { name: 'Fairmont State University', cats: [], enrolling: true },
  { name: 'Flagler College', cats: [] },
  { name: 'Florida Agricultural and Mechanical University', cats: ['hbcu'] },
  { name: 'Florida Atlantic University', cats: [] },
  { name: 'Florida International University', cats: [] },
  { name: 'Florida State University', cats: ['nu75', 'p4'] },
  { name: 'Fordham University', cats: [], enrolling: true },
  { name: 'Franklin & Marshall College', cats: ['lac75'] },
  { name: 'Furman University', cats: ['lac75'], enrolling: true },
  { name: 'George Mason University', cats: [], enrolling: true },
  { name: 'George Washington University', cats: ['nu75'], enrolling: true },
  { name: 'Georgetown University', cats: ['ivyplus', 'nu75'], enrolling: true },
  { name: 'Georgia Tech', cats: ['nu75', 'p4'] },
  { name: 'Gettysburg College', cats: ['lac75'] },
  { name: 'Gonzaga University', cats: [] },
  { name: 'Goucher College', cats: [] },
  { name: 'Grove City College', cats: [], enrolling: true },
  { name: 'Guilford College', cats: [] },
  { name: 'Hamilton College', cats: ['lac75'], enrolling: true },
  { name: 'Hampden-Sydney College', cats: [], enrolling: true },
  { name: 'Hampshire College', cats: [] },
  { name: 'Hampton University', cats: ['hbcu'], enrolling: true },
  { name: 'Harvard University', cats: ['ivy', 'ivyplus', 'nu75'], enrolling: true },
  { name: 'Hawai’i Pacific University', cats: [] },
  { name: 'High Point University', cats: [], enrolling: true },
  { name: 'Hofstra University', cats: [] },
  { name: 'Holy Cross College', cats: [] },
  { name: 'Howard University', cats: ['nu75', 'hbcu'] },
  { name: 'Imperial College London', cats: [] },
  { name: 'Indiana University (Bloomington)', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Iowa State University', cats: ['p4'] },
  { name: 'Ithaca College', cats: [] },
  { name: 'James Madison University', cats: [], enrolling: true },
  { name: 'Johnson & Wales University (Charlotte)', cats: [], enrolling: true },
  { name: 'Kean University', cats: [] },
  { name: 'Kent State University', cats: [] },
  { name: 'Kenyon College', cats: ['lac75'], enrolling: true },
  { name: 'Kettering University', cats: [] },
  { name: 'King’s College London', cats: [] },
  { name: 'Lafayette College', cats: ['lac75'] },
  { name: 'Lawrence University', cats: ['lac75'], enrolling: true },
  { name: 'Lehigh University', cats: ['nu75'], enrolling: true },
  { name: 'Leiden University', cats: [] },
  { name: 'Lenoir-Rhyne University', cats: [] },
  { name: 'Lewis & Clark College', cats: [] },
  { name: 'Liberty University', cats: [] },
  { name: 'Lipscomb University', cats: [] },
  { name: 'Louisiana State University', cats: ['p4'] },
  { name: 'Loyola Marymount University', cats: [] },
  { name: 'Loyola University Chicago', cats: [] },
  { name: 'Loyola University Maryland', cats: [], enrolling: true },
  { name: 'Lynn University', cats: [] },
  { name: 'Macalester College', cats: ['lac75'], enrolling: true },
  { name: 'Marquette University', cats: [] },
  { name: 'Marymount Manhattan College', cats: [], enrolling: true },
  { name: 'Massachusetts College of Pharmacy and Health Sciences', cats: [] },
  { name: 'Massachusetts Institute of Technology', cats: ['ivyplus', 'nu75'], enrolling: true },
  { name: 'McDaniel College', cats: [] },
  { name: 'McGill University', cats: [], enrolling: true },
  { name: 'Mercer University', cats: [] },
  { name: 'Meredith College', cats: [], enrolling: true },
  { name: 'Methodist University', cats: [] },
  { name: 'Miami University', cats: [], enrolling: true },
  { name: 'Michigan State University', cats: ['nu75', 'p4'] },
  { name: 'Middlebury College', cats: ['lac75'], enrolling: true },
  { name: 'Millikin University', cats: [] },
  { name: 'Mississippi State University', cats: ['p4'] },
  { name: 'Missouri University of Science and Technology', cats: [] },
  { name: 'Morehouse College', cats: ['hbcu'] },
  { name: 'Morgan State University', cats: ['hbcu'] },
  { name: 'Mount Holyoke College', cats: ['lac75'] },
  { name: 'New York University', cats: ['nu75'], enrolling: true },
  { name: 'North Carolina A&T State University', cats: ['hbcu'] },
  { name: 'North Carolina Central University', cats: ['hbcu'] },
  { name: 'North Carolina State University', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'North Carolina Wesleyan University', cats: [] },
  { name: 'Northeastern University', cats: ['nu75'], enrolling: true },
  { name: 'Northwestern University', cats: ['ivyplus', 'nu75', 'p4'], enrolling: true },
  { name: 'Nova Southeastern University', cats: [] },
  { name: 'Oberlin College', cats: ['lac75'] },
  { name: 'Occidental College', cats: ['lac75'] },
  { name: 'Oklahoma City University', cats: [] },
  { name: 'Oklahoma State University', cats: ['p4'] },
  { name: 'Oxford College of Emory University', cats: [], enrolling: true },
  { name: 'Pace University (New York City)', cats: [], enrolling: true },
  { name: 'Palm Beach Atlantic University', cats: [] },
  { name: 'Parsons Paris at The New School', cats: [] },
  { name: 'Penn State University', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Pepperdine University', cats: [] },
  { name: 'Presbyterian College', cats: [] },
  { name: 'Princeton University', cats: ['ivy', 'ivyplus', 'nu75'] },
  { name: 'Providence College', cats: [] },
  { name: 'Purdue University', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Queen Mary University of London', cats: [], enrolling: true },
  { name: 'Queens University of Charlotte', cats: [], enrolling: true },
  { name: 'Quinnipiac University', cats: [] },
  { name: 'Randolph-Macon College', cats: [] },
  { name: 'Rensselaer Polytechnic Institute', cats: ['nu75'] },
  { name: 'Rhodes College', cats: ['lac75'], enrolling: true },
  { name: 'Rice University', cats: ['nu75'], enrolling: true },
  { name: 'Ringling College of Art and Design', cats: [] },
  { name: 'Roanoke College', cats: [], enrolling: true },
  { name: 'Rochester Institute of Technology', cats: [], enrolling: true },
  { name: 'Rollins College', cats: [], enrolling: true },
  { name: 'Rose-Hulman Institute of Technology', cats: [] },
  { name: 'Rowan University', cats: [] },
  { name: 'Rutgers University (Camden)', cats: [], enrolling: true },
  { name: 'Rutgers University (New Brunswick)', cats: ['nu75', 'p4'] },
  { name: 'Rutgers University (Newark)', cats: ['nu75'] },
  { name: 'Saint Joseph’s University', cats: [] },
  { name: 'Saint Leo University', cats: [] },
  { name: 'Saint Louis University', cats: [] },
  { name: 'Salve Regina University', cats: [] },
  { name: 'Samford University', cats: [] },
  { name: 'Santa Clara University', cats: ['nu75'] },
  { name: 'Sarah Lawrence College', cats: [] },
  { name: 'Savannah College of Art and Design', cats: [] },
  { name: 'School of the Art Institute of Chicago', cats: [] },
  { name: 'School of the Museum of Fine Arts', cats: [] },
  { name: 'Seattle University', cats: [] },
  { name: 'Seton Hall University', cats: [] },
  { name: 'Sewanee: The University of the South', cats: ['lac75'], enrolling: true },
  { name: 'Skidmore College', cats: ['lac75'] },
  { name: 'Smith College', cats: ['lac75'] },
  { name: 'Southern Methodist University', cats: ['p4'] },
  { name: 'Spelman College', cats: ['lac75', 'hbcu'] },
  { name: 'St. Bonaventure University', cats: [], enrolling: true },
  { name: 'St. Lawrence University', cats: ['lac75'] },
  { name: 'St. Olaf College', cats: ['lac75'] },
  { name: 'Stanford University', cats: ['ivyplus', 'nu75', 'p4'] },
  { name: 'Stevens Institute of Technology', cats: ['nu75'], enrolling: true },
  { name: 'Stony Brook University', cats: ['nu75'] },
  { name: 'Suffolk University', cats: [] },
  { name: 'SUNY College of Environmental Science and Forestry', cats: [] },
  { name: 'SUNY New Paltz', cats: [] },
  { name: 'Swarthmore College', cats: ['lac75'], enrolling: true },
  { name: 'Sweet Briar College', cats: [] },
  { name: 'Syracuse University', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Taylor University', cats: [] },
  { name: 'Temple University', cats: [], enrolling: true },
  { name: 'Texas A&M University', cats: ['nu75', 'p4'] },
  { name: 'Texas Christian University', cats: ['p4'], enrolling: true },
  { name: 'Texas State University', cats: [] },
  { name: 'Texas Tech University', cats: ['p4'] },
  { name: 'The American University of Paris', cats: [] },
  { name: 'The American University of Rome', cats: [] },
  { name: 'The Citadel', cats: [] },
  { name: 'The College of Wooster', cats: [], enrolling: true },
  { name: 'The Ohio State University', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'The University of Alabama', cats: ['p4'], enrolling: true },
  { name: 'The University of Queensland', cats: [], enrolling: true },
  { name: 'The University of Tampa', cats: [], enrolling: true },
  { name: 'The University of Tennessee, Knoxville', cats: ['p4'], enrolling: true },
  { name: 'Thomas Jefferson University', cats: [] },
  { name: 'Trevecca Nazarene University', cats: [] },
  { name: 'Trinity College', cats: ['lac75'], enrolling: true },
  { name: 'Truman State University', cats: [] },
  { name: 'Tufts University', cats: ['nu75'], enrolling: true },
  { name: 'Tulane University', cats: ['nu75'], enrolling: true },
  { name: 'Union College', cats: ['lac75'] },
  { name: 'United States Air Force Academy', cats: ['lac75'], enrolling: true },
  { name: 'United States Naval Academy', cats: ['lac75'], enrolling: true },
  { name: 'University College London', cats: [] },
  { name: 'University of Alabama at Birmingham', cats: [] },
  { name: 'University of Amsterdam', cats: [], enrolling: true },
  { name: 'University of Arizona', cats: ['p4'] },
  { name: 'University of Arkansas', cats: ['p4'], enrolling: true },
  { name: 'University of British Columbia', cats: [] },
  { name: 'University of California (Berkeley)', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of California (Davis)', cats: ['nu75'] },
  { name: 'University of California (Irvine)', cats: ['nu75'] },
  { name: 'University of California (Los Angeles)', cats: ['nu75', 'p4'] },
  { name: 'University of California (Riverside)', cats: [] },
  { name: 'University of California (San Diego)', cats: ['nu75'], enrolling: true },
  { name: 'University of California (Santa Barbara)', cats: ['nu75'] },
  { name: 'University of California (Santa Cruz)', cats: [] },
  { name: 'University of Chicago', cats: ['ivyplus', 'nu75'] },
  { name: 'University of Cincinnati', cats: ['p4'] },
  { name: 'University of Colorado Boulder', cats: ['p4'], enrolling: true },
  { name: 'University of Connecticut', cats: ['nu75'], enrolling: true },
  { name: 'University of Dallas', cats: [] },
  { name: 'University of Dayton', cats: [] },
  { name: 'University of Delaware', cats: [], enrolling: true },
  { name: 'University of Denver', cats: [], enrolling: true },
  { name: 'University of Florida', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of Georgia', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of Hartford', cats: [] },
  { name: 'University of Illinois Chicago', cats: [] },
  { name: 'University of Illinois Urbana-Champaign', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of Iowa', cats: ['p4'] },
  { name: 'University of Kansas', cats: ['p4'], enrolling: true },
  { name: 'University of Kentucky', cats: ['p4'], enrolling: true },
  { name: 'University of Louisville', cats: ['p4'] },
  { name: 'University of Lynchburg', cats: [] },
  { name: 'University of Maine', cats: [] },
  { name: 'University of Maryland', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of Massachusetts (Amherst)', cats: ['nu75'] },
  { name: 'University of Miami', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of Michigan', cats: ['nu75', 'p4'] },
  { name: 'University of Mississippi', cats: ['p4'], enrolling: true },
  { name: 'University of Missouri', cats: ['p4'] },
  { name: 'University of Missouri (Kansas City)', cats: [] },
  { name: 'University of Montana', cats: [], enrolling: true },
  { name: 'University of New England', cats: [] },
  { name: 'University of New Hampshire', cats: [], enrolling: true },
  { name: 'University of North Carolina at Asheville', cats: [], enrolling: true },
  { name: 'University of North Carolina at Chapel Hill', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of North Carolina at Charlotte', cats: [], enrolling: true },
  { name: 'University of North Carolina at Greensboro', cats: [], enrolling: true },
  { name: 'University of North Carolina at Wilmington', cats: [], enrolling: true },
  { name: 'University of North Carolina School of the Arts', cats: [], enrolling: true },
  { name: 'University of Notre Dame', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of Oklahoma', cats: ['p4'] },
  { name: 'University of Oregon', cats: ['p4'] },
  { name: 'University of Pennsylvania', cats: ['ivy', 'ivyplus', 'nu75'], enrolling: true },
  { name: 'University of Pittsburgh', cats: ['nu75', 'p4'] },
  { name: 'University of Pittsburgh (Bradford)', cats: [] },
  { name: 'University of Rhode Island', cats: [] },
  { name: 'University of Richmond', cats: ['lac75'], enrolling: true },
  { name: 'University of Rochester', cats: ['nu75'], enrolling: true },
  { name: 'University of San Diego', cats: [] },
  { name: 'University of South Alabama', cats: [] },
  { name: 'University of South Carolina', cats: ['p4'], enrolling: true },
  { name: 'University of Southern California', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of Southern Maine', cats: [] },
  { name: 'University of St Andrews', cats: [], enrolling: true },
  { name: 'University of Tennessee at Chattanooga', cats: [] },
  { name: 'University of Texas', cats: ['nu75'], enrolling: true },
  { name: 'University of Toronto', cats: [], enrolling: true },
  { name: 'University of Utah', cats: ['p4'] },
  { name: 'University of Vermont', cats: [], enrolling: true },
  { name: 'University of Virginia', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of Washington', cats: ['nu75', 'p4'] },
  { name: 'University of Wisconsin', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Valparaiso University', cats: [] },
  { name: 'Vanderbilt University', cats: ['nu75', 'p4'] },
  { name: 'Vassar College', cats: ['lac75'] },
  { name: 'Villanova University', cats: ['nu75'], enrolling: true },
  { name: 'Virginia Commonwealth University', cats: [] },
  { name: 'Virginia State University', cats: ['hbcu'] },
  { name: 'Virginia Tech', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Wake Forest University', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Washington and Lee University', cats: ['lac75'], enrolling: true },
  { name: 'Washington University in St. Louis', cats: ['ivyplus', 'nu75'], enrolling: true },
  { name: 'Wellesley College', cats: ['lac75'] },
  { name: 'Wentworth Institute of Technology', cats: [] },
  { name: 'Wesleyan University', cats: ['lac75'] },
  { name: 'West Virginia University', cats: ['p4'] },
  { name: 'Western Carolina University', cats: [] },
  { name: 'Wheaton College - IL', cats: ['lac75'] },
  { name: 'William & Mary', cats: ['nu75'], enrolling: true },
  { name: 'William Peace University', cats: [], enrolling: true },
  { name: 'Williams College', cats: ['lac75'], enrolling: true },
  { name: 'Wingate University', cats: [], enrolling: true },
  { name: 'Winston-Salem State University', cats: ['hbcu'] },
  { name: 'Wofford College', cats: ['lac75'], enrolling: true },
  { name: 'Worcester Polytechnic Institute', cats: ['nu75'] },
  { name: 'Xavier University', cats: [] },
  { name: 'Yale University', cats: ['ivy', 'ivyplus', 'nu75'], enrolling: true },
]

// The current edition. Every present-tense claim cites this one.
const PROFILE_2627 =
  'https://resources.finalsite.net/images/v1793645005/charlottelatin/izzo9suck4uojytpwadd/2026_27UpperSchoolProfileforCC1.pdf'
// The previous edition, still live at its own URL: the source for the 2023–25
// half of the acceptance list and for what the profile used to omit.
const PROFILE_2526 =
  'https://resources.finalsite.net/images/v1760637579/charlottelatin/qzxflgjmybf7ydg71xab/USProfile-2.pdf'
const COUNSELING = 'https://www.charlottelatin.org/academics/college-counseling'
const PROFILE_1718 =
  'https://www.charlottelatin.org/uploaded/COMPOSER/AcademicsTab/USprofile1718.pdf'

export const charlotteLatin: CollegeSupportProgram = {
  /* The area's SECOND card, after Where Graduates Go. Unlike every other card here, these figures are
     GOVERNMENT-published — the UNC System's Insight dashboard, pulled via the
     nc-admissions-data skill — rather than the school’s own marketing number.
     Full per-term counts, the exact filter values and the provenance header are in
     source-material/college-support/charlotte-latin/
     Charlotte Latin School - College Support - UNC System Admissions.md.

     Every rate ships with its denominator: these are small cells, and a bare
     percentage off a single-digit base is not publishable. The five-year figure is
     POOLED — sum(admitted)/sum(applied) over the five most recent terms — never the
     mean of the five annual rates. */
  ncAdmissions: {
    headline:
      'Across the six top-ranked NC public universities, Charlotte Latin School’s applicants were admitted at a pooled 45.5% over the last five entering classes — 334 acceptances from 734 applications.',
    subhead:
      'UNC-Chapel Hill is the hard one: 33.3% in Fall 2025 — 23 of 69 — against far higher rates at the less-selective universities. These are UNC-system figures published by the state, not the school’s own.',
    stats: [
      { value: '734', label: 'applications to the six universities, Fall 2021–2025' },
      { value: '45.5%', label: 'pooled admit rate — 334 of 734 across those five classes' },
      { value: '33.3%', label: 'at UNC-Chapel Hill — 23 of 69, the toughest of the six for this school' },
      { value: 'UNC-Chapel Hill', label: 'drew the most applications in Fall 2025 (69)' },
    ],
    latestTerm: '2025',
    universities: [
      {
        key: 'unc-chapel-hill',
        name: 'UNC-Chapel Hill',
        rank: 1,
        note: 'Flagship · Chapel Hill · the most selective of the six',
        applied: '69',
        accepted: '23',
        rate: '33.3%',
        ratePct: 0.333,
        fiveYearRate: '38.3%',
        fiveYearApplied: '300',
        fiveYearAccepted: '115',
      },
      {
        key: 'nc-state-university',
        name: 'NC State University',
        rank: 2,
        note: 'Flagship STEM · Raleigh',
        applied: '67',
        accepted: '23',
        rate: '34.3%',
        ratePct: 0.343,
        fiveYearRate: '33.1%',
        fiveYearApplied: '251',
        fiveYearAccepted: '83',
      },
      {
        key: 'unc-charlotte',
        name: 'UNC Charlotte',
        rank: 3,
        note: 'Hometown campus',
        applied: '14',
        accepted: '11',
        rate: '78.6%',
        ratePct: 0.786,
        fiveYearRate: '83.0%',
        fiveYearApplied: '53',
        fiveYearAccepted: '44',
      },
      {
        key: 'east-carolina-university',
        name: 'East Carolina University',
        rank: 4,
        note: 'Greenville · eastern NC · largest admit rates of the six',
        applied: '10',
        accepted: '10',
        rate: '100.0%',
        ratePct: 1,
        fiveYearRate: '90.7%',
        fiveYearApplied: '43',
        fiveYearAccepted: '39',
      },
      {
        key: 'unc-wilmington',
        name: 'UNC Wilmington',
        rank: 5,
        note: 'Coastal · mid-selectivity',
        applied: '25',
        accepted: '13',
        rate: '52.0%',
        ratePct: 0.52,
        fiveYearRate: '51.5%',
        fiveYearApplied: '68',
        fiveYearAccepted: '35',
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
        fiveYearRate: '94.7%',
        fiveYearApplied: '19',
        fiveYearAccepted: '18',
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
      'Students in AP classes must sit the exam — and in 2026, 92% of the 833 exams Latin students took scored 3 or higher, with a mean score of 4.10.',
    subhead:
      'The profile also carries an unusually candid warning about its own maths placement, and a spring-2026 decision to weight Advanced maths and science courses +0.5, applied retroactively from the Class of 2027.',
    stats: [
      { value: '24', label: 'AP subjects offered — exams required of AP students' },
      { value: '92%', label: 'of 833 AP exams scored 3+ (2026, 308 students)' },
      { value: '357', label: 'AP Scholar awards across the Classes of 2024–26' },
      { value: '12 / 18', label: 'National Merit Semifinalists / Commended, Class of 2026' },
    ],
    merit: [
      { year: '2026', detail: '**12** Semifinalists · **18** Commended — all named in the school’s own announcement' },
      { year: '2024', detail: '**6** Finalists · **16** Commended · 1 National Merit Scholar (Evan Li ’24)' },
      { year: '2024–26', detail: '**27** Semifinalists · **50** Commended across the three classes (2026–27 profile aggregate)' },
      { year: '2023–25', detail: '**20** Semifinalists · **46** Commended across the three classes (2025–26 profile aggregate)' },
      { year: '2018–20', detail: '25 Semifinalists · 34 Commended · 7 National Hispanic Scholars' },
      { year: '2015–17', detail: '34 Semifinalists · 33 Commended · 2 National Achievement Semifinalists' },
    ],
    meritNote:
      'The Class of 2026 alone produced 12 Semifinalists — more than half the 20 recorded across the three preceding classes combined. Both figures are school-published and the surge is real per the sources, but the school does not explain it. Note too that both recent profile editions report Semifinalists and Commended only: neither reports Finalists, so Finalist counts for 2023, 2025 and 2026 are unpublished.',
    depth: [
      {
        label: 'Mathematics',
        text: 'The ceiling is **AP Calculus BC** — there is no multivariable calculus and no linear algebra. Honors Data Analytics, Honors Intro to Probability & Statistics and Honors Graphs, Governance & Games: Applied Mathematics run alongside rather than beyond it. A genuine ceiling worth noting.',
      },
      {
        label: 'Computer science',
        text: '**Honors Java Data Structures** sits beyond AP CS A, and **AP Cybersecurity** and **AP Networking Fundamentals** are now listed as two separate APs — both very new College Board offerings and a real differentiator.',
      },
      {
        label: 'Engineering',
        text: 'Honors courses in Civil Engineering and Engineering in Motion run as non-AP advanced options, alongside Intro Bioengineering and Intro Electrical Engineering — an unusual range at high-school level.',
      },
      {
        label: 'World language',
        text: '**Honors Greek I–IV** (available only as a second world language), plus both AP Spanish Language and AP Spanish Literature, and Honors sequences in Latin, French and Spanish.',
      },
      {
        label: 'Interdisciplinary',
        text: '**Honors American Studies-History**, a double-period seminar co-created by the History and English departments and taught, per an earlier profile, “at an equivalent level of rigor and depth to Advanced Placement curricula”.',
      },
    ],
    trust: [
      {
        label: 'Weighted — and stated again',
        text: 'A weighted 4-point scale (A+ 4.33, A 4.00 for 93–97, down to F 0.00) giving **one additional quality point** for Honors and AP and **one-half point for each Advanced course** except Advanced Functions with Trigonometry. The scale was absent from every edition after 2017–18 and **returned in 2026–27**.',
      },
      {
        label: 'No rank — stated again',
        text: 'Verbatim: “Charlotte Latin School **does not report class rank**.” The sentence appeared in 2017–18, disappeared, and is back in 2026–27. No quintile or decile table has ever been published.',
      },
      {
        label: 'Candid about maths placement',
        text: 'The one real interpretive aid the profile offers, verbatim: “As our Honors math curriculum is unusually rigorous and fast-paced, **many fine math students are placed in standard and advanced courses**.” An unusually honest warning against misreading a transcript.',
      },
    ],
    flags: [
      {
        kind: 'verify',
        text: 'The jump from 48 AP Scholars with Distinction (2018–20) to 192 (2024–26) is very large. Part is real growth, but the magnitude suggests the counting basis may differ between editions — the school does not define it. Do not present the two as directly comparable.',
      },
      {
        kind: 'verify',
        text: 'The 2025–26 edition carried an unremoved internal editorial note; the 2026–27 edition has removed it, and adds AP results, test means, grade distributions and the grading scale — a substantial reversal of the school’s earlier non-disclosure.',
      },
    ],
    sources: [
      { label: 'charlottelatin.org — 2026–27 Upper School Profile (AP results, exam policy, AP Scholars, marking system, maths note)', url: PROFILE_2627 },
      { label: 'Upper School Profile 2017–18 (the last edition to print the marking system before 2026–27)', url: PROFILE_1718 },
      { label: 'News — National Merit Semifinalists and Commended Students', url: 'https://www.charlottelatin.org/about/school-news/news-details/~board/news/post/upper-school-salutes-national-merit-semifinalists-and-commended-students' },
      { label: 'Upper School Course Offerings (Honors Data Analytics, Honors American Studies)', url: 'https://www.charlottelatin.org/academics/upper-school/course-offerings' },
    ],
  },

  counseling: {
    headline:
      'Four full-time counselors inside a nine-person office — and, unusually, three dedicated essay specialists, a role most peer offices do not staff at all.',
    subhead:
      'Counselors are assigned in freshman year, and the office commits in writing to proofreading each essay and application before submission — a promise most schools decline to make.',
    stats: [
      { value: '~1:38', label: 'counselors to seniors (derived — no ratio is published)' },
      { value: '9', label: 'office staff — 4 counselors, 3 essay specialists, registrar, admin' },
      { value: '9+ yrs', label: 'documented director tenure (Jody Jennings)' },
      { value: 'SCOIR', label: 'platform, alongside the school’s own MyLatin portal' },
    ],
    roster: [
      {
        role: 'Director',
        name: 'Jody Jennings',
        detail: 'Listed as Director in the 2017–18, 2019–20, 2020–21, 2025–26 and 2026–27 profiles — 9+ years documented.',
        email: 'jody.jennings@charlottelatin.org',
      },
      {
        role: 'Assoc. Director',
        name: 'Lucy Smith',
        detail: 'In the office since at least 2017–18.',
        email: 'lucy.smith@charlottelatin.org',
      },
      {
        role: 'Assoc. Director',
        name: 'Haley Cripps',
        detail: 'In the office since at least 2017–18.',
        email: 'haley.cripps@charlottelatin.org',
      },
      {
        role: 'Assoc. Director',
        name: 'Alex Segura',
        detail: 'Newer — appears in the 2025–26 and 2026–27 profiles but not in the archived editions.',
        email: 'alex.segura@charlottelatin.org',
      },
      {
        role: 'Essay specialists',
        name: 'Powell · Minchin · Foster ’99',
        detail: 'Three dedicated specialists, one an alumna. Plus registrar Sonja Turpin.',
      },
    ],
    timelineTitle: 'The four-year timeline — when individualized support begins',
    timeline: [
      {
        grade: '9',
        intensity: 'Light touch',
        items: ['A series of seminars on making the most of Upper School', '**SCOIR registration**', 'FAQ meeting for parents'],
        note: 'A counselor is assigned in freshman year',
      },
      {
        grade: '10',
        intensity: 'Ramps up',
        items: ['Seminars on self-discovery and how interests translate into college choices', '**Case Studies Mock College Admission Exercise**, followed by a College Fair', 'Individual meetings on course selection'],
      },
      {
        grade: '11',
        intensity: 'In earnest',
        items: ['**Optional summer essay workshops**', '**College admissions event with a Dean’s Panel**', '**Joint meeting** of counselor, parent and student on the post-secondary journey'],
        note: 'Seminars on visits, interviews and the activity résumé; SAT/ACT timeline',
      },
      {
        grade: '12',
        intensity: 'Intensive',
        items: ['**College Application Bootcamp**', 'Essay review and feedback', '**Proofreading of each essay and application before submission**'],
        note: 'Grade 12 Parent College Night; a Transition to College programme',
      },
    ],
    mechanicsTitle: 'The mechanics the office owns',
    mechanics: [
      'Applications',
      'Essays',
      'Standardized testing',
      'Interviews',
      'Financial aid',
      'Collegiate athletics & arts',
    ],
    mechanicsNote:
      'Note two absences from that list. **Teacher recommendations** are not described as an office-owned process anywhere — there is no published account of how recs are solicited, assigned or capped. Neither is a **scholarship search** named as a service, and no scholarship platform is described.',
    reach: [
      '**~100** college representatives a year — published in the 2017–18 profile only',
      'Recurring programmes on **Financial Aid**, **Collegiate Athletics** and **Arts in College**',
      'SCOIR and MyLatin · office open year-round for appointments and drop-ins',
    ],
    flags: [
      {
        kind: 'verify',
        text: 'Both ratios are derived (589 Upper Schoolers ÷ 4, and 151 seniors ÷ 4); the school publishes neither. Because counselors are assigned in freshman year, the ~1:147 all-grades figure is arguably the more honest load measure and ~1:38 describes senior-year intensity. No biographies, prior employers, degrees or credentials are published for any staff member — names and titles only.',
      },
      {
        kind: 'gap',
        text: 'No count of campus visits made by counselors is published — only the qualitative claim that they “stay current by attending conferences, visiting colleges, and speaking extensively with college representatives”.',
      },
    ],
    sources: [
      { label: 'charlottelatin.org — College Counseling (roster, full 9→12 timeline, SCOIR)', url: COUNSELING },
      { label: '2026–27 Upper School Profile (enrollment, senior class size, staff masthead)', url: PROFILE_2627 },
      { label: 'Upper School Profile 2017–18 (~100 rep visits, counselor assigned freshman year, reviews every application)', url: PROFILE_1718 },
    ],
  },

  outcomes: {
    headline:
      'Four graduating classes produced acceptances at 337 institutions; 132 carry the newest list’s matriculation asterisk — at least one Latin student enrolled there in 2024–26.',
    subhead:
      'The striking number is breadth: 61 of the 68 Power Four universities appear, the absences being Minnesota, Nebraska, BYU, UCF, Houston, Kansas State and UT Austin (the lists write only “University of Texas”), and seven of the eight Ivies — Columbia is the only one missing.',
    stats: [
      { value: '337', label: 'institutions on the 2023–26 acceptance lists' },
      { value: '132', label: 'carry the 2024–26 matriculation asterisk' },
      { value: '7 of 8', label: 'Ivy League — absent Columbia' },
      { value: '61 of 68', label: 'Power Four universities represented' },
    ],
    buckets: [
      { tier: 'Ivy League', count: '7 / 8', note: '— six with a 2024–26 enrollee (all but Princeton); absent Columbia' },
      { tier: '“Ivy Plus”', count: '14 / 17', note: '— absent Columbia, Johns Hopkins and Caltech' },
      { tier: 'Top-75 National Universities', count: '73 / 75' },
      { tier: 'Top-75 Liberal Arts', count: '48 / 75' },
      { tier: 'Power Four', count: '61 / 68', note: '— 18 ACC · 15 SEC · 16 Big Ten · 12 Big 12' },
      { tier: 'HBCUs', count: '10 / 107', note: '— Historically Black Colleges & Universities' },
    ],
    collegesTitle: 'Every acceptance, 2023–2026',
    colleges,
    collegesTotal: '337 institutions · bold = at least one student enrolled, 2024–26',
    scholarships: [
      '$13M+ merit offers · Class of 2023',
      '231 merit scholarships at 85 colleges (2023)',
      '48 students awarded $100,000+ each (2023)',
      'Johnson Scholarship, Washington & Lee (2026)',
      'National ROTC Scholarship worth $154,000+ (2024)',
      'U.S. Air Force Academy appointment (2025)',
    ],
    scholarshipsNote:
      'The merit-dollar total stopped being published after the Class of 2023 — the 2024, 2025 and 2026 write-ups carry no figure, and whether the school stopped collecting or stopped publishing it is unclear. Morehead-Cain attaches to the Class of 2022, outside this list’s window. QuestBridge, Robertson, Jefferson, Belk, Stamps and Coca-Cola were not found for any recent class; Robertson, Jefferson and Belk are attested only in a 2017–18 historical paragraph and should not be read as current pipelines. The 2026–27 profile carries no merit figures either.',
    flags: [],
    sources: [
      { label: 'charlottelatin.org — 2026–27 Upper School Profile (College Admission Summary 2024–26)', url: PROFILE_2627 },
      { label: '2025–26 Upper School Profile (College Admission Summary 2023–25)', url: PROFILE_2526 },
      { label: 'College Counseling — Acceptances (Classes of 2023–25)', url: 'https://www.charlottelatin.org/academics/college-counseling/acceptances' },
      { label: 'U.S. News 2027 rankings (tier scoring)', url: 'https://www.usnews.com/best-colleges/rankings/national-universities' },
    ],
  },

  edge: {
    headline:
      'Latin’s differentiators are narrow, deep and genuinely elite in two places — a top-20 national debate programme and an MIT-lineage Fab Lab — and the school leaves the assembly of a spike almost entirely to the student.',
    subhead:
      'There is no required capstone or senior project that manufactures one, which makes the two flagship programmes carry more weight than they would elsewhere.',
    levers: [
      {
        title: 'Lever 1 — Build the spike',
        glyph: '◆',
        items: [
          '**Speech & Debate — the strongest documented spike.** An NSDA **Debate School of Excellence Award**, one of the top 20 programmes in the country; NSDA **charter status**; **200 Club** membership in 2025. Director Bilal Butt has earned a second Diamond award with 30,000+ NSDA points over ten years. At 2025 Nationals, 7 debaters competed and 6 earned recognition against 6,700+ students — including a **5th place in Public Forum**.',
          '**It is curricular, not merely a club.** The courses carry a competition mandate: the intro course requires participation in two tournaments a year, and the advanced course requires six.',
          '**Innovation & Design / Fab Lab** — an official Fab Lab school in the lineage of **MIT’s Center for Bits and Atoms**, and an active Fab Academy node since 2016. Engineering has been taught here since 1989; the lab runs 3D printing, CNC milling, circuit production, laser and precision milling. Upper School courses are taught “like a professional software engineering firm”, with students presenting to external panels of industry experts.',
          '**Malone Scholars School** — North Carolina’s only one, endowed by the Malone Family Foundation, which selects 50 independent schools nationally partly for their “excellent accommodations for gifted and talented students”.',
          '**Internships do exist**, contrary to a common assumption: a **Biomedical Internship Program** placing seniors with Atrium Health is course-embedded in Advanced Topics in Engineering, alongside a Student Internship Program elective.',
        ],
        note:
          'There is still no required internship, capstone, senior project, independent study or school-wide research requirement — graduation requirements are purely credit-based, and there is no global-studies certificate or diploma. Athletic recruiting and arts-in-college support are informational programmes only: no named recruiting coordinator, highlight-film service, conservatory-prep track or portfolio review is published.',
      },
      {
        title: 'Lever 2 — The school’s leverage',
        glyph: '▲',
        items: [
          '**The School Profile argues with numbers again.** It is the one document every admissions office reads, and the 2026–27 edition restores the grading scale, the weighting statement and the class-rank policy, and adds AP results and SAT and ACT means after years without them. It still omits a CEEB code, a four-year matriculation percentage and National Merit Finalists.',
          '**The integrity block was deleted wholesale.** All three archived editions carried, verbatim: “Reflecting our emphasis on ‘HONOR ABOVE ALL,’ our policy is to report any **probations, suspensions, and expulsions through time of graduation** to any colleges that request this information. CLS complies with the **NACAC Statement of Principles of Good Practice**.” None of that survives, and the 2026–27 edition does not restore it.',
          '**Named-scholarship history was deleted too.** The 2017–18 edition told readers the school’s students had won Morehead-Cain, Robertson, B.N. Duke, Jefferson, Belk, Bryan, Chancellor’s, Danforth and Johnson scholarships, and gave application and matriculation breadth. Not one of those sentences survives, and the 2026–27 edition does not restore them.',
          '**What remains is genuine and external** — the NSDA recognition, the Fab Academy node, and the Malone Family Foundation selection are all third-party validations that do not depend on the profile.',
        ],
        note:
          'The net effect is a profile that now argues with numbers again, but still omits the integrity statement and the scholarship history earlier editions carried.',
      },
    ],
    flags: [
      {
        kind: 'verify',
        text: 'An unsourced reference to a 2018 national debate champion surfaced during research but could not be corroborated against speechanddebate.org, so it is deliberately excluded here rather than repeated.',
      },
    ],
    sources: [
      { label: 'charlottelatin.org — Speech & Debate', url: 'https://www.charlottelatin.org/leading-programs/student-leadership-development/speech-and-debate' },
      { label: 'Innovation & Design / Fab Lab', url: 'https://www.charlottelatin.org/leading-programs/innovation-design' },
      { label: '2026–27 Upper School Profile (Malone Scholars, Fab Academy, NSDA 200 Club, what the profile restores and omits)', url: PROFILE_2627 },
      { label: '2025–26 Upper School Profile (the editorial note, removed in 2026–27)', url: PROFILE_2526 },
      { label: 'Upper School Profile 2017–18 (the deleted integrity and scholarship blocks)', url: PROFILE_1718 },
    ],
  },

  wholeClass: {
    headline:
      'As of 2026–27, Latin publishes its class-level numbers — 2026 AP results, SAT and ACT means, and junior and sophomore grade distributions — but still no percentiles, GPA distribution or rank.',
    subhead:
      'The figures are means, not distributions. A reader can now place a test score against the class average, but not against the spread — there is no middle-50% band and no share of the class above any line.',
    // The 2026–27 profile prints class MEANS only, so the table is
    // noPercentiles: a mean is never filed under a percentile column. No GPA
    // distribution is published, so quintiles stays empty.
    scoreTables: [
      {
        title: 'SAT & ACT class means',
        hint: '— as of 8/6/26 · testers shown per row',
        noPercentiles: true,
        rows: [
          { label: 'Class of 2026', values: ['SAT 1308.5 (N=123)', 'ACT 27.2 (N=58)'] },
          { label: 'Class of 2027', values: ['SAT 1303.0 (N=117)', 'ACT 28.8 (N=79)'] },
        ],
        note: 'Means only — the profile prints no percentiles or middle-50% band. The Class of 2027 is still testing, so its figures are partial. The Class of 2026’s size is not printed, so no testing rate can be computed.',
      },
    ],
    quintiles: [],
    support: [
      {
        label: 'Learning Resources, founded 1985',
        text: 'A real programme with a long history — a K–12 Director plus LR teachers in each division, admission based on a psychoeducational evaluation demonstrating learning differences that impact achievement.',
      },
      {
        label: 'The Upper School model is coaching, not remediation',
        text: 'Verbatim: in the Upper School the programme “becomes more of a **consultative and coaching model**”, working on executive functioning — organisation, time management, study strategies. Lower School LR is explicitly remedial; the Upper School is not. Decisive for a family whose 9–12 student needs direct intervention.',
      },
      {
        label: 'Accommodations and cost',
        text: 'Middle and Upper School students who qualify have a **504 Educational Plan**, with testing current within three years; typical accommodations include extended time and testing in a separate setting. Critically, **charges for sessions are not included in tuition and are billed per session each month**.',
      },
      {
        label: 'Do not confuse ATSS with Learning Resources',
        text: 'The Office of Academic Transition and Student Success is a **transition and belonging office** for students new to independent schools, particularly from underrepresented backgrounds. Its page never mentions learning differences, 504 plans or accommodations. A student with dyslexia who is neither new to Latin nor from an underrepresented background falls outside its stated population entirely.',
      },
    ],
    middle: [
      {
        label: 'Grades are now published',
        text: 'In the Class of 2027’s junior year, 524 of 833 course grades (63%) were in the A range, and 457 of 806 (57%) in sophomore year — as counted from the profile’s own tables, which omit grades below C−. Beyond grades, the 337-institution list is genuinely broad, spanning Harvard, MIT and Stanford through Belhaven, Brevard, Catawba, Carson-Newman, Lenoir-Rhyne, Methodist, Saint Leo, Trevecca Nazarene, Wingate and Johnson & Wales, many carrying matriculation asterisks.',
      },
      {
        label: 'The regional band is real',
        text: 'Nine UNC-system campuses carry a 2024–26 matriculation asterisk — Chapel Hill, NC State, Charlotte, Greensboro, Wilmington, Asheville, the School of the Arts, East Carolina and Appalachian State — so Latin visibly places students across the band rather than only at the top.',
      },
      {
        label: 'Non-traditional destinations',
        text: 'Service academies (the Naval Academy and The Citadel, plus a 2025 Air Force Academy appointment), conservatory and arts institutions, and international universities including St Andrews, UCL, King’s, Imperial, Leiden, Amsterdam, Queensland, Toronto, McGill and UBC all appear on the lists.',
      },
    ],
    flags: [
      {
        kind: 'gap',
        text: 'Means only — no percentiles, middle-50% bands, GPA distribution or rank table, and no testing rate.',
      },
      {
        kind: 'verify',
        text: 'The testing data was absent from every edition between 2019–20 and 2025–26 and returned in 2026–27.',
      },
    ],
    sources: [
      { label: 'charlottelatin.org — 2026–27 Upper School Profile (test means, AP results, grade distributions)', url: PROFILE_2627 },
      { label: 'Upper School Profile 2017–18 (the last SAT, ACT and AP results before 2026–27)', url: PROFILE_1718 },
      { label: 'Student Support & Wellness (the Learning Resources tile)', url: 'https://www.charlottelatin.org/leading-programs/student-support-and-wellness' },
    ],
  },

  verdict: {
    headline:
      'Genuinely elite in two narrow places — debate and design engineering — with a stable, unusually well-staffed counseling office — and, from 2026–27, a profile that publishes its numbers again.',
    subhead:
      'The open questions are now about spread and outcomes rather than basic disclosure: the averages are printed, but not the range around them or where each class enrolled.',
    points: [
      {
        label: 'Two externally validated flagship programmes',
        text: 'an NSDA top-20 debate programme with charter and 200 Club status and a 5th-place national finish, and an MIT-lineage Fab Lab running an active Fab Academy node since 2016. Neither validation depends on the school’s own marketing.',
      },
      {
        label: 'An unusually well-staffed counseling office',
        text: 'nine people for 151 seniors, including **three dedicated essay specialists** — a role most peer offices simply do not have — with counselors assigned in freshman year.',
      },
      {
        label: 'A written commitment peers avoid',
        text: 'the office states it proofreads each essay and application before submission. Most schools describe workshops and meetings but stop short of promising a review.',
      },
      {
        label: 'Low turnover at the top',
        text: 'three of the four counselors, including the director, are documented in the same office as far back as the 2017–18 profile.',
      },
      {
        label: 'Placement breadth across the whole class',
        text: '337 institutions across four classes with 61 of the 68 Power Four universities represented, and matriculation asterisks spread from the Ivies down through the regional band.',
      },
      {
        label: 'The exam requirement is real',
        text: 'students in AP classes must sit the exam, and seven APs are deliberately open-enrollment rather than faculty-gated — so access is broader than the placement gate alone suggests.',
      },
    ],
    checklist: [
      'Your profile now prints SAT and ACT means. What are the middle-50% ranges, and what share of the class submitted scores?',
      'Advanced math and science courses now carry +0.5, applied retroactively from the Class of 2027. How do colleges see that change on a transcript, and are earlier classes’ GPAs restated?',
      'Is there a GPA distribution — quintiles or deciles — that you share with colleges even though it is not in the published profile?',
      'Who is the current Director of Learning Resources, how many LR staff work with Upper School students, and what does a session cost, since it is billed outside tuition?',
      'Your Acceptances page still shows the Classes of 2023–25. Where did the Class of 2026 enroll, college by college?',
      'Columbia is the only Ivy absent from both recent acceptance lists. Is that accurate, and how do you read it?',
      'You stopped publishing merit-scholarship totals after the Class of 2023. What did the last three classes receive?',
    ],
    flags: [],
    sources: [
      { label: 'charlottelatin.org — College Counseling', url: COUNSELING },
      { label: '2026–27 Upper School Profile', url: PROFILE_2627 },
      { label: 'Verdict synthesised by the researcher from the sources cited on the cards above', },
    ],
  },
}
