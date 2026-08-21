// Charlotte Latin School — the six College Support cards.
//
// Every figure is transcribed from the school's OWN published materials —
// chiefly the 2025–26 Upper School Profile PDF, the College Counseling page, and
// named news coverage — with archived profile editions (2017–18, 2019–20,
// 2020–21) used only where explicitly labelled as historical. See
// source-material/college-support/charlotte-latin/Charlotte Latin - College
// Support - Redesign Research 2026.md for the hard data and source URLs.
//
// Latin is the outlier in this set for WHAT IT WITHHOLDS. The current profile
// publishes no SAT scores, no ACT scores, no AP score distribution, no GPA
// distribution, and no rank/quintile/decile table — and it no longer even states
// the class-rank POLICY or the grading scale that earlier editions carried. The
// Whole Class Analytics card is therefore built around that documented absence
// rather than padded: it renders no score tables and no quintiles, and its
// substance is the learning-difference material and the breadth of the
// acceptance list, which is the only distributional proxy the school offers.
//
// Two research findings are load-bearing here and are surfaced on the cards:
//
//  1. The testing data disappeared between the 2017–18 and 2019–20 editions —
//     a long-standing posture, NOT a recent test-optional-era change.
//  2. The Learning Resources programme is real (founded 1985) but effectively
//     unpublished: every descriptive page 404s and the live tile is an href="#"
//     anchor with no body copy. That gap between capability and disclosure is
//     itself the finding, so it renders rather than being quietly omitted.

import type { CollegeSupportProgram } from '../collegeSupport.ts'

/* The "College Admission Summary 2023–25" from the 2025–26 profile: 300
   institutions across three graduating classes. `enrolling` follows the
   profile's own key — an asterisk marks a college where AT LEAST ONE student
   matriculated during the period. It is not a count, and it does not mean a
   student enrolled from every class. Rank labels and buckets are scored against
   the 2026 U.S. News tables. */
const colleges = [
  { name: 'Allegheny College', cats: ['lac75'] },
  { name: 'American University', cats: [], enrolling: true },
  { name: 'Amherst College', cats: ['lac75'] },
  { name: 'Appalachian State University', cats: [], enrolling: true },
  { name: 'Arizona State University', cats: ['p4'] },
  { name: 'Auburn University', cats: ['p4'], enrolling: true },
  { name: 'Averett University', cats: [] },
  { name: 'Bard College', cats: [] },
  { name: 'Baylor University', cats: ['p4'], enrolling: true },
  { name: 'Belhaven University', cats: [] },
  { name: 'Belmont Abbey College', cats: [] },
  { name: 'Belmont University', cats: [], enrolling: true },
  { name: 'Beloit College', cats: [] },
  { name: 'Bennington College', cats: [] },
  { name: 'Bentley University', cats: [] },
  { name: 'Berry College', cats: [] },
  { name: 'Boston College', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Boston University', cats: ['nu75'], enrolling: true },
  { name: 'Bowling Green State University', cats: [], enrolling: true },
  { name: 'Brandeis University', cats: [] },
  { name: 'Brevard College', cats: [] },
  { name: 'Bridgewater College', cats: [] },
  { name: 'Brown University', cats: ['ivy', 'ivyplus', 'nu75'], enrolling: true },
  { name: 'Bryn Mawr College', cats: ['lac75'] },
  { name: 'Bucknell University', cats: ['lac75'], enrolling: true },
  { name: 'Butler University', cats: [] },
  { name: 'California Polytechnic State University (San Luis Obispo)', cats: [], enrolling: true },
  { name: 'Calvin University', cats: [], enrolling: true },
  { name: 'Campbell University', cats: [] },
  { name: 'Carleton College', cats: ['lac75'] },
  { name: 'Carnegie Mellon University', cats: ['nu75'] },
  { name: 'Carson-Newman University', cats: [] },
  { name: 'Case Western Reserve University', cats: ['nu75'] },
  { name: 'Catawba College', cats: [], enrolling: true },
  { name: 'Centre College', cats: ['lac75'] },
  { name: 'Champlain College', cats: [] },
  { name: 'Clark University', cats: [] },
  { name: 'Clemson University', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Coastal Carolina University', cats: [] },
  { name: 'Colgate University', cats: ['lac75'], enrolling: true },
  { name: 'College of Charleston', cats: [], enrolling: true },
  { name: 'College of the Atlantic', cats: [] },
  { name: 'Colorado College', cats: ['lac75'], enrolling: true },
  { name: 'Colorado School of Mines', cats: [], enrolling: true },
  { name: 'Colorado State University', cats: [] },
  { name: 'Cornell University', cats: ['ivy', 'ivyplus', 'nu75'], enrolling: true },
  { name: 'Creighton University', cats: [] },
  { name: 'Crown College', cats: [] },
  { name: 'The College of Wooster', cats: [], enrolling: true },
  { name: 'Dartmouth College', cats: ['ivy', 'ivyplus', 'nu75'], enrolling: true },
  { name: 'Davidson College', cats: ['lac75'], enrolling: true },
  { name: 'Denison University', cats: ['lac75'], enrolling: true },
  { name: 'DePaul University', cats: [] },
  { name: 'DePauw University', cats: ['lac75'], enrolling: true },
  { name: 'Dickinson College', cats: ['lac75'], enrolling: true },
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
  { name: 'Emerson College', cats: [] },
  { name: 'Emory & Henry University', cats: [] },
  { name: 'Emory University', cats: ['nu75'], enrolling: true },
  { name: 'Endicott College', cats: [] },
  { name: 'Fairmont State University', cats: [], enrolling: true },
  { name: 'Flagler College', cats: [] },
  { name: 'Florida Agricultural and Mechanical University', cats: [] },
  { name: 'Florida Atlantic University', cats: [] },
  { name: 'Florida International University', cats: [], enrolling: true },
  { name: 'Florida State University', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Fordham University', cats: [], enrolling: true },
  { name: 'Franklin & Marshall College', cats: ['lac75'] },
  { name: 'Furman University', cats: ['lac75'], enrolling: true },
  { name: 'George Mason University', cats: [], enrolling: true },
  { name: 'George Washington University', cats: [] },
  { name: 'Georgetown University', cats: ['ivyplus', 'nu75'], enrolling: true },
  { name: 'Georgia Tech', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Gettysburg College', cats: ['lac75'] },
  { name: 'Goucher College', cats: [] },
  { name: 'Guilford College', cats: [] },
  { name: 'Hamilton College', cats: ['lac75'] },
  { name: 'Hampden-Sydney College', cats: [], enrolling: true },
  { name: 'Hampshire College', cats: [] },
  { name: 'Hampton University', cats: ['hbcu'] },
  { name: 'Harvard University', cats: ['ivy', 'ivyplus', 'nu75'], enrolling: true },
  { name: 'Hawai’i Pacific University', cats: [] },
  { name: 'High Point University', cats: [], enrolling: true },
  { name: 'Hofstra University', cats: [] },
  { name: 'Holy Cross College', cats: [] },
  { name: 'Howard University', cats: ['hbcu'] },
  { name: 'Imperial College London', cats: [] },
  { name: 'Indiana University', cats: [], enrolling: true },
  { name: 'Iowa State University', cats: ['p4'] },
  { name: 'Ithaca College', cats: [] },
  { name: 'James Madison University', cats: [], enrolling: true },
  { name: 'Johnson & Wales University (Charlotte)', cats: [], enrolling: true },
  { name: 'Kean University', cats: [] },
  { name: 'Kent State University', cats: [] },
  { name: 'Kenyon College', cats: ['lac75'], enrolling: true },
  { name: 'King’s College London', cats: [] },
  { name: 'Lafayette College', cats: ['lac75'] },
  { name: 'Lehigh University', cats: ['nu75'], enrolling: true },
  { name: 'Leiden University', cats: [] },
  { name: 'Lenoir-Rhyne University', cats: [] },
  { name: 'Lewis & Clark College', cats: [] },
  { name: 'Liberty University', cats: [] },
  { name: 'Lipscomb University', cats: [] },
  { name: 'Louisiana State University', cats: ['p4'] },
  { name: 'Loyola Marymount University', cats: [] },
  { name: 'Loyola University Chicago', cats: [] },
  { name: 'Loyola University Maryland', cats: [] },
  { name: 'Lynn University', cats: [] },
  { name: 'Macalester College', cats: ['lac75'], enrolling: true },
  { name: 'Marquette University', cats: [] },
  { name: 'Marymount Manhattan College', cats: [], enrolling: true },
  { name: 'Massachusetts Institute of Technology', cats: ['ivyplus', 'nu75'], enrolling: true },
  { name: 'McDaniel College', cats: [] },
  { name: 'McGill University', cats: [], enrolling: true },
  { name: 'Mercer University', cats: [] },
  { name: 'Methodist University', cats: [] },
  { name: 'Miami University', cats: [], enrolling: true },
  { name: 'Michigan State University', cats: ['nu75', 'p4'] },
  { name: 'Middlebury College', cats: ['lac75'] },
  { name: 'Millikin University', cats: [] },
  { name: 'Mississippi State University', cats: ['p4'] },
  { name: 'Missouri University of Science and Technology', cats: [] },
  { name: 'Morehouse College', cats: ['hbcu'] },
  { name: 'Morgan State University', cats: ['hbcu'] },
  { name: 'Mount Holyoke College', cats: ['lac75'] },
  { name: 'New York University', cats: ['nu75'], enrolling: true },
  { name: 'North Carolina A & T State University', cats: [], enrolling: true },
  { name: 'North Carolina Central University', cats: ['hbcu'] },
  { name: 'North Carolina State University', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'North Carolina Wesleyan University', cats: [] },
  { name: 'Northeastern University', cats: ['nu75'], enrolling: true },
  { name: 'Northwestern University', cats: ['ivyplus', 'nu75', 'p4'], enrolling: true },
  { name: 'Nova Southeastern University', cats: [] },
  { name: 'Oberlin College', cats: ['lac75'] },
  { name: 'Occidental College', cats: ['lac75'], enrolling: true },
  { name: 'Oklahoma City University', cats: [] },
  { name: 'Oklahoma State University', cats: ['p4'] },
  { name: 'Oxford College of Emory University', cats: [], enrolling: true },
  { name: 'The Ohio State University', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Pace University', cats: [], enrolling: true },
  { name: 'Parsons Paris at The New School', cats: [] },
  { name: 'Penn State University', cats: [] },
  { name: 'Pepperdine University', cats: [] },
  { name: 'Presbyterian College', cats: [] },
  { name: 'Providence College', cats: [] },
  { name: 'Purdue University', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Queens University', cats: [], enrolling: true },
  { name: 'Quinnipiac University', cats: [] },
  { name: 'Randolph-Macon College', cats: [] },
  { name: 'Rensselaer Polytechnic Institute', cats: [] },
  { name: 'Rice University', cats: ['nu75'], enrolling: true },
  { name: 'Ringling College of Art and Design', cats: [], enrolling: true },
  { name: 'Roanoke College', cats: [], enrolling: true },
  { name: 'Rochester Institute of Technology', cats: [], enrolling: true },
  { name: 'Rollins College', cats: [], enrolling: true },
  { name: 'Rowan University', cats: [] },
  { name: 'Rutgers University (Camden)', cats: [], enrolling: true },
  { name: 'Rutgers University (New Brunswick)', cats: [], enrolling: true },
  { name: 'Saint Joseph’s University', cats: [] },
  { name: 'Saint Leo University', cats: [] },
  { name: 'Saint Louis University', cats: [] },
  { name: 'Salve Regina University', cats: [] },
  { name: 'Samford University', cats: [], enrolling: true },
  { name: 'Sarah Lawrence College', cats: [] },
  { name: 'Savannah College of Art and Design', cats: [] },
  { name: 'School of the Art Institute of Chicago', cats: [] },
  { name: 'School of the Museum of Fine Arts', cats: [] },
  { name: 'Seattle University', cats: [] },
  { name: 'Seton Hall University', cats: [] },
  { name: 'Sewanee: The University of the South', cats: ['lac75'], enrolling: true },
  { name: 'Skidmore College', cats: ['lac75'], enrolling: true },
  { name: 'Smith College', cats: ['lac75'] },
  { name: 'Southern Methodist University', cats: ['p4'], enrolling: true },
  { name: 'Spelman College', cats: ['lac75', 'hbcu'] },
  { name: 'St. Bonaventure University', cats: [], enrolling: true },
  { name: 'St. Lawrence University', cats: [] },
  { name: 'St. Olaf College', cats: ['lac75'] },
  { name: 'Stanford University', cats: ['ivyplus', 'nu75', 'p4'] },
  { name: 'Stevens Institute of Technology', cats: [] },
  { name: 'Stony Brook University', cats: [] },
  { name: 'Suffolk University', cats: [] },
  { name: 'SUNY at New Paltz', cats: [] },
  { name: 'SUNY College of Environmental Science and Forestry', cats: [] },
  { name: 'Swarthmore College', cats: ['lac75'], enrolling: true },
  { name: 'Syracuse University', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Temple University', cats: [], enrolling: true },
  { name: 'Texas A&M University', cats: ['nu75', 'p4'] },
  { name: 'Texas Christian University', cats: ['p4'], enrolling: true },
  { name: 'Texas State University', cats: [] },
  { name: 'Texas Tech University', cats: ['p4'] },
  { name: 'Thomas Jefferson University', cats: [] },
  { name: 'Trevecca Nazarene University', cats: [] },
  { name: 'Trinity College', cats: ['lac75'], enrolling: true },
  { name: 'Truman State University', cats: [] },
  { name: 'Tufts University', cats: ['nu75'], enrolling: true },
  { name: 'Tulane University', cats: ['nu75'], enrolling: true },
  { name: 'The University of Alabama', cats: ['p4'], enrolling: true },
  { name: 'The University of Queensland', cats: [], enrolling: true },
  { name: 'The University of Tampa', cats: [], enrolling: true },
  { name: 'The University of Tennessee', cats: [], enrolling: true },
  { name: 'The University of Tennessee (Chattanooga)', cats: [] },
  { name: 'The University of Texas', cats: [], enrolling: true },
  { name: 'Union College', cats: ['lac75'] },
  { name: 'United States Air Force Academy', cats: ['lac75'], enrolling: true },
  { name: 'United States Naval Academy', cats: ['lac75'], enrolling: true },
  { name: 'University College London', cats: [] },
  { name: 'University of Alabama at Birmingham', cats: [] },
  { name: 'University of Amsterdam', cats: [], enrolling: true },
  { name: 'University of Arizona', cats: ['nu75', 'p4'] },
  { name: 'University of Arkansas', cats: ['p4'], enrolling: true },
  { name: 'University of California (Berkeley)', cats: [], enrolling: true },
  { name: 'University of California (Davis)', cats: [] },
  { name: 'University of California (Irvine)', cats: [] },
  { name: 'University of California (Los Angeles)', cats: [] },
  { name: 'University of California (Riverside)', cats: [] },
  { name: 'University of California (San Diego)', cats: [], enrolling: true },
  { name: 'University of California (Santa Barbara)', cats: [] },
  { name: 'University of California (Santa Cruz)', cats: [] },
  { name: 'University of Chicago', cats: ['ivyplus', 'nu75'] },
  { name: 'University of Cincinnati', cats: ['p4'] },
  { name: 'University of Colorado Boulder', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of Connecticut', cats: ['nu75'] },
  { name: 'University of Dayton', cats: [] },
  { name: 'University of Delaware', cats: ['nu75'], enrolling: true },
  { name: 'University of Denver', cats: [], enrolling: true },
  { name: 'University of Florida', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of Georgia', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of Hartford', cats: [] },
  { name: 'University of Illinois at Chicago', cats: [] },
  { name: 'University of Illinois at Urbana-Champaign', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of Iowa', cats: ['p4'] },
  { name: 'University of Kansas', cats: ['p4'], enrolling: true },
  { name: 'University of Kentucky', cats: ['p4'], enrolling: true },
  { name: 'University of Louisville', cats: ['p4'] },
  { name: 'University of Lynchburg', cats: [] },
  { name: 'University of Maine', cats: [] },
  { name: 'University of Maryland', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of Massachusetts (Amherst)', cats: [] },
  { name: 'University of Miami', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of Michigan', cats: ['nu75', 'p4'] },
  { name: 'University of Mississippi', cats: ['p4'], enrolling: true },
  { name: 'University of Missouri', cats: ['p4'] },
  { name: 'University of Missouri (Kansas City)', cats: [] },
  { name: 'University of New England', cats: [] },
  { name: 'University of New Hampshire', cats: [], enrolling: true },
  { name: 'University of North Carolina - Asheville', cats: [], enrolling: true },
  { name: 'University of North Carolina - Chapel Hill', cats: [], enrolling: true },
  { name: 'University of North Carolina - Charlotte', cats: [], enrolling: true },
  { name: 'University of North Carolina - Greensboro', cats: [], enrolling: true },
  { name: 'University of North Carolina - Wilmington', cats: [], enrolling: true },
  { name: 'University of North Carolina School of the Arts', cats: [], enrolling: true },
  { name: 'University of Notre Dame', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of Oklahoma', cats: ['p4'] },
  { name: 'University of Oregon', cats: ['p4'] },
  { name: 'University of Pittsburgh', cats: ['nu75', 'p4'], enrolling: true },
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
  { name: 'University of Toronto', cats: [], enrolling: true },
  { name: 'University of Utah', cats: ['p4'] },
  { name: 'University of Vermont', cats: [], enrolling: true },
  { name: 'University of Virginia', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of Washington', cats: ['nu75', 'p4'] },
  { name: 'University of Wisconsin', cats: [], enrolling: true },
  { name: 'Valparaiso University', cats: [] },
  { name: 'Vanderbilt University', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Vassar College', cats: ['lac75'], enrolling: true },
  { name: 'Villanova University', cats: ['nu75'] },
  { name: 'Virginia Commonwealth University', cats: [] },
  { name: 'Virginia Tech', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Wake Forest University', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Washington and Lee University', cats: ['lac75'], enrolling: true },
  { name: 'Washington University in St. Louis', cats: ['ivyplus', 'nu75'], enrolling: true },
  { name: 'Wellesley College', cats: ['lac75'] },
  { name: 'Wentworth Institute of Technology', cats: [] },
  { name: 'Wesleyan University', cats: ['lac75'] },
  { name: 'West Virginia University', cats: ['p4'] },
  { name: 'Western Carolina University', cats: [] },
  { name: 'Wheaton College - IL', cats: [] },
  { name: 'William & Mary', cats: ['nu75'], enrolling: true },
  { name: 'Williams College', cats: ['lac75'], enrolling: true },
  { name: 'Wingate University', cats: [], enrolling: true },
  { name: 'Wofford College', cats: ['lac75'], enrolling: true },
  { name: 'Yale University', cats: ['ivy', 'ivyplus', 'nu75'], enrolling: true },
]

const PROFILE =
  'https://resources.finalsite.net/images/v1760637579/charlottelatin/qzxflgjmybf7ydg71xab/USProfile-2.pdf'
const COUNSELING = 'https://www.charlottelatin.org/academics/college-counseling'
const PROFILE_1718 =
  'https://www.charlottelatin.org/uploaded/COMPOSER/AcademicsTab/USprofile1718.pdf'

export const charlotteLatin: CollegeSupportProgram = {
  /* The area's FIRST card. Unlike every other card here, these figures are
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
      'NC State University is the hard one: 33.1% pooled there — 83 of 251 — against far higher rates at the less-selective campuses. These are UNC-system figures published by the state, not the school’s own.',
    stats: [
      { value: '734', label: 'applications to the six campuses, Fall 2021–2025' },
      { value: '45.5%', label: 'pooled admit rate — 334 of 734 across those five classes' },
      { value: '33.1%', label: 'at NC State University — 83 of 251, the toughest of the six for this school' },
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
        note: 'Flagship STEM · Raleigh · the most selective of the six',
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
        note: 'Greenville · eastern NC',
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
        note: 'Piedmont Triad · largest admit rates of the six',
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
      'Students in AP classes are required to sit the exam — but unlike its peers, Latin publishes no AP score distribution at all, so the results of that policy are invisible.',
    subhead:
      'What the profile does give a reader is an unusually candid warning about its own maths placement, and a 23-subject AP catalogue that now includes the very new AP Cybersecurity.',
    stats: [
      { value: '23', label: 'AP subjects offered — exams required of AP students' },
      { value: 'Not published', label: 'AP exams sat, % scoring 3+, and score distribution' },
      { value: '418', label: 'AP Scholar awards across the Classes of 2023–25' },
      { value: '12 / 18', label: 'National Merit Semifinalists / Commended, Class of 2026' },
    ],
    merit: [
      { year: '2026', detail: '**12** Semifinalists · **18** Commended — all named in the school’s own announcement' },
      { year: '2024', detail: '**6** Finalists · **16** Commended · 1 National Merit Scholar (Evan Li ’24)' },
      { year: '2023–25', detail: '**20** Semifinalists · **46** Commended across the three classes (profile aggregate)' },
      { year: '2018–20', detail: '25 Semifinalists · 34 Commended · 7 National Hispanic Scholars' },
      { year: '2015–17', detail: '34 Semifinalists · 33 Commended · 2 National Achievement Semifinalists' },
    ],
    meritNote:
      'The Class of 2026 alone produced 12 Semifinalists — more than half the 20 recorded across the three preceding classes combined. Both figures are school-published and the surge is real per the sources, but the school does not explain it. Note too that the current profile reports Semifinalists and Commended only: it no longer reports Finalists, so Finalist counts for 2023, 2025 and 2026 are unpublished.',
    depth: [
      {
        label: 'Mathematics',
        text: 'The ceiling is **AP Calculus BC** — there is no multivariable calculus and no linear algebra. Honors Data Analytics and Honors Probability & Statistics run alongside rather than beyond it. A genuine ceiling worth noting.',
      },
      {
        label: 'Computer science',
        text: '**Honors Java Data Structures** sits beyond AP CS A, and **AP Cybersecurity 1: Networking Fundamentals** is a very new College Board offering and a real differentiator.',
      },
      {
        label: 'Engineering',
        text: 'Honors Bioengineering and Honors Electrical Engineering run as non-AP advanced courses — an unusual pairing at high-school level.',
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
        label: 'Weighted — but no longer stated',
        text: 'A weighted 4-point scale giving **one additional quality point** for AP and Honors, with a full letter/quality-point table. Both appeared in the 2017–18 profile; **neither survives into the 2025–26 edition**.',
      },
      {
        label: 'No rank — also no longer stated',
        text: '“Charlotte Latin School does not report class rank” appeared in 2017–18 and is gone today, and no quintile or decile table has ever been published. A reader of the current profile cannot tell whether Latin ranks.',
      },
      {
        label: 'Candid about maths placement',
        text: 'The one real interpretive aid the profile offers, verbatim: “As our Honors math curriculum is unusually rigorous and fast-paced, **many fine math students are placed in ‘standard’ courses**.” An unusually honest warning against misreading a transcript.',
      },
    ],
    flags: [
      {
        kind: 'discrepancy',
        text: 'The grading scale, the weighting statement and the no-rank policy all appeared in the 2017–18 profile and are absent from the 2025–26 edition. Both states are documented; treat the weighting and no-rank policy as unconfirmed for the current year, since only the older edition attests them.',
      },
      {
        kind: 'verify',
        text: 'The jump from 48 AP Scholars with Distinction (2018–20) to 193 (2023–25) is very large. Part is real growth, but the magnitude suggests the counting basis may differ between editions — the school does not define it. Do not present the two as directly comparable.',
      },
      {
        kind: 'gap',
        text: 'The published 2025–26 profile contains an unedited internal editorial comment left in the live document — “We’ll need to somehow check to make sure all these students are still here, yes?” — verbatim in the file served from the school’s own resource manager. It is a proofreading lapse in the one document every admissions office reads.',
      },
    ],
    sources: [
      { label: 'charlottelatin.org — 2025–26 Upper School Profile (AP roster, exam policy, AP Scholars, maths note)', url: PROFILE },
      { label: 'Upper School Profile 2017–18 (marking system, quality points, no-rank statement)', url: PROFILE_1718 },
      { label: 'News — National Merit Semifinalists and Commended Students', url: 'https://www.charlottelatin.org/about/school-news/news-details/~board/news/post/upper-school-salutes-national-merit-semifinalists-and-commended-students' },
    ],
  },

  counseling: {
    headline:
      'Four full-time counselors inside a nine-person office — and, unusually, three dedicated essay specialists, a role most peer offices do not staff at all.',
    subhead:
      'Counselors are assigned in freshman year, and the office commits in writing to proofreading each essay and application before submission — a promise most schools decline to make.',
    stats: [
      { value: '~1:36', label: 'counselors to seniors (derived — no ratio is published)' },
      { value: '9', label: 'office staff — 4 counselors, 3 essay specialists, registrar, admin' },
      { value: '9+ yrs', label: 'documented director tenure (Jody Jennings)' },
      { value: 'SCOIR', label: 'platform, alongside the school’s own MyLatin portal' },
    ],
    roster: [
      {
        role: 'Director',
        name: 'Jody Jennings',
        detail: 'Listed as Director in the 2017–18, 2019–20, 2020–21 and 2025–26 profiles — 9+ years documented.',
      },
      {
        role: 'Assoc. Director',
        name: 'Lucy Smith',
        detail: 'In the office since at least 2017–18.',
      },
      {
        role: 'Assoc. Director',
        name: 'Haley Cripps',
        detail: 'In the office since at least 2017–18.',
      },
      {
        role: 'Assoc. Director',
        name: 'Alex Segura',
        detail: 'Newer — appears in 2025–26 but not in the archived editions.',
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
        text: 'Both ratios are derived (586 Upper Schoolers ÷ 4, and 145 seniors ÷ 4); the school publishes neither. Because counselors are assigned in freshman year, the ~1:147 all-grades figure is arguably the more honest load measure and ~1:36 describes senior-year intensity. No biographies, prior employers, degrees or credentials are published for any staff member — names and titles only.',
      },
      {
        kind: 'discrepancy',
        text: 'The “nearly 100 college representatives each year” figure comes from the 2017–18 profile only. The current profile and web page mention rep visits but give no number, so treat ~100 as dated. The CEEB/ACT code 340663 and the dedicated rep-visit callout have likewise vanished from the current edition.',
      },
      {
        kind: 'gap',
        text: 'No count of campus visits made by counselors is published — only the qualitative claim that they “stay current by attending conferences, visiting colleges, and speaking extensively with college representatives”.',
      },
    ],
    sources: [
      { label: 'charlottelatin.org — College Counseling (roster, full 9→12 timeline, SCOIR)', url: COUNSELING },
      { label: '2025–26 Upper School Profile (enrollment, senior class size, staff masthead)', url: PROFILE },
      { label: 'Upper School Profile 2017–18 (~100 rep visits, counselor assigned freshman year, reviews every application)', url: PROFILE_1718 },
    ],
  },

  outcomes: {
    headline:
      'Three graduating classes produced acceptances at 300 institutions, 131 of them marked as places where at least one Latin student actually enrolled.',
    subhead:
      'The striking number is breadth: 62 of the 68 Power Four universities appear on the list, the absences being Minnesota, Nebraska, BYU, UCF, Houston and Kansas State.',
    stats: [
      { value: '300', label: 'institutions on the 2023–25 acceptance list' },
      { value: '131', label: 'carry a matriculation asterisk — 169 do not' },
      { value: '5 of 8', label: 'Ivy League — absent Columbia, Princeton and Penn' },
      { value: '62 of 68', label: 'Power Four universities represented' },
    ],
    buckets: [
      { tier: 'Ivy League', count: '5 / 8', note: '— all five matriculated; absent Columbia, Princeton, Penn' },
      { tier: '“Ivy Plus”', count: '12 / 17', note: '— absent Johns Hopkins and Caltech' },
      { tier: 'Top-75 National Universities', count: '53 / 75' },
      { tier: 'Top-75 Liberal Arts', count: '40 / 75' },
      { tier: 'Power Four', count: '53 / 68', note: '— 62 of 68 by the researcher’s exact count' },
      { tier: 'HBCUs', count: '6 / 107', note: '— Historically Black Colleges & Universities' },
    ],
    bucketsNote:
      'Counts here are computed from the same 300-institution list you can filter at right, scored against the 2026 U.S. News tables. The Ivy and Power Four figures are exact — those memberships are fixed. The Top-75 counts are approximate to within a few places, because U.S. News publishes heavy ties around the 70–75 boundary. The three Ivy absences were confirmed by direct string search of the profile PDF; a summary of the school’s own web Acceptances page asserted Princeton was present, and the PDF governs.',
    collegesTitle: 'Every acceptance, 2023–2025',
    colleges,
    collegesTotal: '300 institutions · bold = at least one student matriculated',
    scholarships: [
      '$13M+ merit offers · Class of 2023',
      '231 merit scholarships at 85 colleges (2023)',
      '48 students awarded $100,000+ each (2023)',
      'Johnson Scholarship, Washington & Lee (2026)',
      'National ROTC Scholarship worth $154,000+ (2024)',
      'U.S. Air Force Academy appointment (2025)',
    ],
    scholarshipsNote:
      'The merit-dollar total stopped being published after the Class of 2023 — the 2024, 2025 and 2026 write-ups carry no figure, and whether the school stopped collecting or stopped publishing it is unclear. Morehead-Cain attaches to the Class of 2022, outside this list’s window. QuestBridge, Robertson, Jefferson, Belk, Stamps and Coca-Cola were not found for any recent class; Robertson, Jefferson and Belk are attested only in a 2017–18 historical paragraph and should not be read as current pipelines.',
    caveat:
      'this is a three-year aggregate acceptance list, not a matriculation list. The asterisk means at least one student enrolled at that college at some point across the Classes of 2023–25 — it is not a count, and it does not mean a student enrolled from every class. 169 of the 300 institutions carry no asterisk at all. The window starts at 2023, matching the floor the other schools here share; the school publishes no Class of 2026 acceptance list yet, so the window does not extend that far forward. Note also that the “100% to four-year colleges” claim carried by all three archived profile editions has been REMOVED from the current one, with no explanation, so it should not be carried forward to the present class.',
    flags: [],
    sources: [
      { label: 'charlottelatin.org — 2025–26 Upper School Profile (College Admission Summary 2023–25)', url: PROFILE },
      { label: 'College Counseling — Acceptances', url: 'https://www.charlottelatin.org/academics/college-counseling/acceptances' },
      { label: 'U.S. News 2026 rankings (tier scoring)', url: 'https://www.usnews.com/best-colleges/rankings' },
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
          '**The School Profile works against itself.** It is the one document every admissions office reads, and Latin’s current edition omits the grading scale, the weighting statement, the class-rank policy, the CEEB code, the four-year matriculation percentage and all testing data — while carrying an unremoved internal editorial note in the live PDF.',
          '**The integrity block was deleted wholesale.** All three archived editions carried, verbatim: “Reflecting our emphasis on ‘HONOR ABOVE ALL,’ our policy is to report any **probations, suspensions, and expulsions through time of graduation** to any colleges that request this information. CLS complies with the **NACAC Statement of Principles of Good Practice**.” None of that survives into the current profile.',
          '**Named-scholarship history was deleted too.** The 2017–18 edition told readers the school’s students had won Morehead-Cain, Robertson, B.N. Duke, Jefferson, Belk, Bryan, Chancellor’s, Danforth and Johnson scholarships, and gave application and matriculation breadth. Not one of those sentences survives.',
          '**What remains is genuine and external** — the NSDA recognition, the Fab Academy node, and the Malone Family Foundation selection are all third-party validations that do not depend on the profile.',
        ],
        note:
          'The net effect is a school whose real institutional strengths are verifiable elsewhere but are no longer argued for in the document colleges actually read.',
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
      { label: '2025–26 Upper School Profile (Malone Scholars, profile defects)', url: PROFILE },
      { label: 'Upper School Profile 2017–18 (the deleted integrity and scholarship blocks)', url: PROFILE_1718 },
    ],
  },

  wholeClass: {
    headline:
      'Latin publishes almost no class-level analytics — no SAT, no ACT, no AP score distribution, no GPA distribution, and no rank, quintile or decile table.',
    subhead:
      'The absence is the finding, and it cuts both ways: it protects students in the middle of the class from unflattering comparison, and it removes every quantitative lever a strong student might otherwise use to stand out.',
    // No score tables and no quintiles: the school publishes neither, and the
    // last testing data it did publish attaches to the Class of 2018.
    scoreTables: [],
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
    supportNote:
      'The published-invisibility problem, verified directly: every descriptive Learning Resources page on the live site now 404s, and the “Learning Resources” tile on the Student Support and Wellness page is an href="#" anchor with no body copy. The 1985 founding, the coaching model, the 504 process and the per-session billing survive only in archived captures — so a prospective family researching learning support today finds a tile that links nowhere. Upper School LR staffing levels and the number of students served are unpublished, and whether Margaret Sigmon is still Director could not be confirmed.',
    middle: [
      {
        label: 'Breadth is the only available proxy',
        text: 'Because no GPA or test distribution exists, the 300-institution list is the sole evidence — and it is genuinely broad, spanning Harvard, MIT and Stanford through Belhaven, Brevard, Catawba, Carson-Newman, Lenoir-Rhyne, Methodist, Saint Leo, Trevecca Nazarene, Wingate and Johnson & Wales, many carrying matriculation asterisks.',
      },
      {
        label: 'The regional band is real',
        text: 'Every UNC-system campus on the list carries a matriculation asterisk, so Latin visibly places students across the whole band rather than only at the top.',
      },
      {
        label: 'Non-traditional destinations',
        text: 'Service academies including a 2025 Air Force Academy appointment, conservatory and arts institutions, and international universities all appear on the list.',
      },
    ],
    flags: [
      {
        kind: 'gap',
        text: 'No SAT, ACT, AP-distribution, GPA-distribution or rank table is published. Latin asks colleges to trust its transcript while supplying no distributional context to calibrate it — its own candid maths-placement note is one of the very few interpretive aids a reader is given.',
      },
      {
        kind: 'verify',
        text: 'The testing data disappeared in two stages, not one: SAT and ACT results were already absent from the 2019–20 and 2020–21 editions, so the loss happened between 2017–18 and 2019–20. This is a long-standing posture, NOT a recent test-optional-era change, and should not be described as a new development.',
      },
    ],
    sources: [
      { label: 'charlottelatin.org — 2025–26 Upper School Profile (the absence of testing and GPA data)', url: PROFILE },
      { label: 'Upper School Profile 2017–18 (the last published SAT, ACT and AP results)', url: PROFILE_1718 },
      { label: 'Student Support & Wellness (the Learning Resources tile)', url: 'https://www.charlottelatin.org/leading-programs/student-support-and-wellness' },
    ],
  },

  verdict: {
    headline:
      'Genuinely elite in two narrow places — debate and design engineering — with a stable, unusually well-staffed counseling office, wrapped in the least transparent profile in this set.',
    subhead:
      'Almost every open question here is answerable in one conversation, because the information exists; the school simply no longer publishes it.',
    points: [
      {
        label: 'Two externally validated flagship programmes',
        text: 'an NSDA top-20 debate programme with charter and 200 Club status and a 5th-place national finish, and an MIT-lineage Fab Lab running an active Fab Academy node since 2016. Neither validation depends on the school’s own marketing.',
      },
      {
        label: 'An unusually well-staffed counseling office',
        text: 'nine people for 145 seniors, including **three dedicated essay specialists** — a role most peer offices simply do not have — with counselors assigned in freshman year.',
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
        text: '300 institutions across three classes with 62 of the 68 Power Four universities represented, and matriculation asterisks spread from the Ivies down through the regional band.',
      },
      {
        label: 'The exam requirement is real',
        text: 'students in AP classes must sit the exam, and four APs are deliberately open-enrollment rather than faculty-gated — so access is broader than the placement gate alone suggests.',
      },
    ],
    checklist: [
      'Your profile publishes no SAT, ACT or AP score data. What were the last class’s middle-50% SAT and ACT ranges, how many students tested, and what share of AP exams scored 3 or higher?',
      'The current profile no longer states your grading scale, your weighting, or whether you report class rank. Do AP and Honors still carry one additional quality point, and do you rank?',
      'Is there a GPA distribution — quintiles or deciles — that you share with colleges even though it is not in the published profile?',
      'Who is the current Director of Learning Resources, how many LR staff work with Upper School students, and what does a session cost, since it is billed outside tuition?',
      'Every Learning Resources page on your website 404s and the tile links nowhere. Where should a family with a diagnosed learning difference actually go for information?',
      'Your published profile contains an unremoved internal editorial note. Who reviews that document before it goes to colleges, and when is it next refreshed?',
      'Columbia, Princeton and Penn do not appear anywhere on the 2023–25 acceptance list. Is that accurate, and how do you read it?',
      'You stopped publishing merit-scholarship totals after the Class of 2023. What did the last three classes receive?',
    ],
    flags: [],
    sources: [
      { label: 'charlottelatin.org — College Counseling', url: COUNSELING },
      { label: '2025–26 Upper School Profile', url: PROFILE },
      { label: 'Verdict synthesised by the researcher from the sources cited on the cards above', },
    ],
  },
}
