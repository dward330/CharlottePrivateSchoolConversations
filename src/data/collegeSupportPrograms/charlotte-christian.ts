// Charlotte Christian School — the six College Support cards.
//
// Every figure is transcribed from the school's OWN published materials —
// chiefly the 2026–27 Academic & Student Profile (served at the old
// `2024_USprofile_admiss.pdf` URL, which the school overwrote in place), with
// the 2024–25 and 2021–22 editions, the College & Career Planning brochure,
// the College Planning Checklist and Celebrating Seniors 2025 for dated facts.
// See source-material/college-support/charlotte-christian/Charlotte Christian -
// College Support - School Profile 2026-2027.md for the current hard data, and
// … - Redesign Research 2026.md for the earlier editions and gap notes.
//
// Two things shape what renders here:
//
//  1. AP exams are mandatory, and the profile publishes the exam count, the
//     student count and the AP Scholar count beside the 3+ rate, so its 94%
//     rests on a non-self-selected pool. It also publishes a full five-quintile
//     GPA table and, new in 2026–27, a GPA middle 50%.
//  2. Its learning-difference support is the weakest-documented area of the
//     entire research set: no named specialist, no named programme, and no
//     published accommodations policy. That is rendered as a gap rather than
//     filled in with the general school-counseling function, which is a
//     different thing and is described as such.

import type { CollegeSupportProgram } from '../collegeSupport.ts'

/* Two published acceptance lists, merged: the Classes of 2024–2026 list from
   the 2026–27 profile (213 printed rows, 211 institutions) and the Classes of
   2023–2025 list from the College & Career Planning brochure (186
   institutions). 148 institutions are on both, 63 only on the profile's list
   and 38 only on the brochure's, so 249 in all. Where both lists name a
   college, the profile's spelling is kept (`University of Michigan`, not the
   brochure's `University of Michigan-Ann Arbor`). `enrolling` marks a college
   where a Class of 2026 graduate enrolled (the profile's asterisk, 50) or a
   Class of 2025 graduate enrolled (the brochure's bold, 48): 77 distinct.
   Names are transcribed as printed. Two printed duplicates in the profile are
   collapsed: `Emory University` (twice, neither asterisked) and `University of
   South Carolina` (twice, one asterisked — kept once, enrolling). The
   brochure's three named UC campuses stay beside the profile's unnamed
   `University of California`, which may duplicate one of them. Rank labels
   and buckets are scored against the 2027 U.S. News tables. */
const colleges = [
  { name: 'Abilene Christian University', cats: [], enrolling: true },
  { name: 'Alabama A&M University', cats: ['hbcu'], enrolling: true },
  { name: 'American University', cats: [] },
  { name: 'Anderson University', cats: [] },
  { name: 'Appalachian State University', cats: [], enrolling: true },
  { name: 'Arizona State University', cats: ['p4'], enrolling: true },
  { name: 'Auburn University', cats: ['p4'], enrolling: true },
  { name: 'Averett University', cats: [] },
  { name: 'Ball State University', cats: [] },
  { name: 'Barton College', cats: [], enrolling: true },
  { name: 'Baylor University', cats: ['p4'], enrolling: true },
  { name: 'Belhaven University', cats: [] },
  { name: 'Belmont Abbey College', cats: [], enrolling: true },
  { name: 'Belmont University', cats: [], enrolling: true },
  { name: 'Berry College', cats: [], enrolling: true },
  { name: 'Biola University', cats: [] },
  { name: 'Boise State University', cats: [] },
  { name: 'Boston College', cats: ['nu75', 'p4'] },
  { name: 'Boston University', cats: ['nu75'] },
  { name: 'Bowling Green State University', cats: [] },
  { name: 'Brevard College', cats: [] },
  { name: 'Bridgewater College', cats: [] },
  { name: 'Butler University', cats: [] },
  { name: 'California Lutheran University', cats: [] },
  { name: 'Campbell University', cats: [] },
  { name: 'Catawba College', cats: [] },
  { name: 'Cedarville University', cats: [], enrolling: true },
  { name: 'Central Piedmont Community College', cats: [], enrolling: true },
  { name: 'Centre College', cats: ['lac75'] },
  { name: 'Chapman University', cats: [] },
  { name: 'Charleston Southern University', cats: [], enrolling: true },
  { name: 'Christopher Newport University', cats: [], enrolling: true },
  { name: 'Clarke University', cats: [] },
  { name: 'Clemson University', cats: ['p4'], enrolling: true },
  { name: 'Coastal Carolina University', cats: [], enrolling: true },
  { name: 'Colby College', cats: ['lac75'] },
  { name: 'Colgate University', cats: ['lac75'], enrolling: true },
  { name: 'College of Charleston', cats: [], enrolling: true },
  { name: 'College of the Ozarks', cats: [] },
  { name: 'Colorado State University', cats: [] },
  { name: 'Columbia College Chicago', cats: [] },
  { name: 'Columbia University', cats: ['ivy', 'ivyplus', 'nu75'], enrolling: true },
  { name: 'Connecticut College', cats: ['lac75'] },
  { name: 'Cornell University', cats: ['ivy', 'ivyplus', 'nu75'] },
  { name: 'Dark Horse Institute', cats: [] },
  { name: 'Dartmouth College', cats: ['ivy', 'ivyplus', 'nu75'], enrolling: true },
  { name: 'Davidson College', cats: ['lac75'], enrolling: true },
  { name: 'Denison University', cats: ['lac75'] },
  { name: 'DePaul University', cats: [] },
  { name: 'Dickinson College', cats: ['lac75'] },
  { name: 'Drexel University', cats: [] },
  { name: 'Duke Kunshan University', cats: [] },
  { name: 'Duke University', cats: ['ivyplus', 'nu75', 'p4'] },
  { name: 'Duquesne University', cats: [], enrolling: true },
  { name: 'East Carolina University', cats: [], enrolling: true },
  { name: 'Eastern Illinois University', cats: [], enrolling: true },
  { name: 'Elon University', cats: [], enrolling: true },
  { name: 'Embry-Riddle Aeronautical University', cats: [] },
  { name: 'Emerson College', cats: [], enrolling: true },
  { name: 'Emory & Henry College', cats: [] },
  { name: 'Emory University', cats: ['nu75'] },
  { name: 'Fairfield University', cats: [], enrolling: true },
  { name: 'Florida Agricultural & Mechanical University', cats: ['hbcu'] },
  { name: 'Florida Atlantic University', cats: [] },
  { name: 'Florida Gulf Coast University', cats: [] },
  { name: 'Florida Institute of Technology', cats: [] },
  { name: 'Florida International University', cats: [] },
  { name: 'Florida Southern College', cats: [] },
  { name: 'Florida State University', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Fordham University', cats: [], enrolling: true },
  { name: 'Furman University', cats: ['lac75'], enrolling: true },
  { name: 'Gardner-Webb University', cats: [], enrolling: true },
  { name: 'George Washington University', cats: ['nu75'] },
  { name: 'Georgetown University', cats: ['ivyplus', 'nu75'] },
  { name: 'Georgia Southern University', cats: [], enrolling: true },
  { name: 'Gettysburg College', cats: ['lac75'] },
  { name: 'Gordon College', cats: [], enrolling: true },
  { name: 'Grove City College', cats: [], enrolling: true },
  { name: 'Guilford College', cats: [] },
  { name: 'Hampden-Sydney College', cats: [], enrolling: true },
  { name: 'Hampton University', cats: ['hbcu'] },
  { name: 'Harding University', cats: [] },
  { name: 'Harvard University', cats: ['ivy', 'ivyplus', 'nu75'] },
  { name: 'High Point University', cats: [], enrolling: true },
  { name: 'Hillsdale College', cats: ['lac75'] },
  { name: 'Hiram College', cats: [] },
  { name: 'Hollins University', cats: [] },
  { name: 'Howard University', cats: ['nu75', 'hbcu'] },
  { name: 'Indiana University', cats: ['nu75', 'p4'] },
  { name: 'James Madison University', cats: [], enrolling: true },
  { name: 'Johnson C. Smith University', cats: ['hbcu'], enrolling: true },
  { name: 'Keene State College', cats: [] },
  { name: 'Kennesaw State University', cats: [] },
  { name: 'Kent State University', cats: [] },
  { name: 'Kenyon College', cats: ['lac75'] },
  { name: 'Lee University', cats: [] },
  { name: 'Lenoir-Rhyne University', cats: [] },
  { name: 'LeTourneau University', cats: [] },
  { name: 'Liberty University', cats: [], enrolling: true },
  { name: 'Limestone University', cats: [] },
  { name: 'Lipscomb University', cats: [], enrolling: true },
  { name: 'Longwood University', cats: [] },
  { name: 'Louisiana State University', cats: ['p4'] },
  { name: 'Loyola Marymount University', cats: [] },
  { name: 'Loyola University New Orleans', cats: [] },
  { name: 'Lynn University', cats: [] },
  { name: 'Marshall University', cats: [], enrolling: true },
  { name: 'Marymount Manhattan College', cats: [] },
  { name: 'Marymount University', cats: [] },
  { name: 'Mercer University', cats: [] },
  { name: 'Merrimack College', cats: [] },
  { name: 'Messiah University', cats: [] },
  { name: 'Methodist University', cats: [] },
  { name: 'Miami University', cats: [] },
  { name: 'Michigan State University', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Montreat College', cats: [] },
  { name: 'Morehouse College', cats: ['hbcu'] },
  { name: 'New College of Florida', cats: [] },
  { name: 'New York Institute of Technology', cats: [] },
  { name: 'New York University', cats: ['nu75'], enrolling: true },
  { name: 'North Carolina A&T State University', cats: ['hbcu'], enrolling: true },
  { name: 'North Carolina Central University', cats: ['hbcu'] },
  { name: 'North Carolina State University', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'North Greenville University', cats: [] },
  { name: 'Northeastern University', cats: ['nu75'], enrolling: true },
  { name: 'Northern Arizona University', cats: [] },
  { name: 'Northwestern University', cats: ['ivyplus', 'nu75', 'p4'] },
  { name: 'Nova Southeastern University', cats: [] },
  { name: 'Ohio University', cats: [] },
  { name: 'Oklahoma State University', cats: ['p4'] },
  { name: 'Old Dominion University', cats: [] },
  { name: 'Pace University', cats: [] },
  { name: 'Palm Beach Atlantic University', cats: [] },
  { name: 'Palm Beach State College', cats: [] },
  { name: 'Penn State University', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Pepperdine University', cats: [] },
  { name: 'Presbyterian College', cats: [] },
  { name: 'Purdue University', cats: ['nu75', 'p4'] },
  { name: 'Queens University of Charlotte', cats: [], enrolling: true },
  { name: 'Randolph-Macon College', cats: [] },
  { name: 'Rensselaer Polytechnic Institute', cats: ['nu75'] },
  { name: 'Rhodes College', cats: ['lac75'] },
  { name: 'Ringling College of Art & Design', cats: [] },
  { name: 'Roanoke College', cats: [] },
  { name: 'Robert Morris University', cats: [] },
  { name: 'Rochester Institute of Technology', cats: [], enrolling: true },
  { name: 'Rollins College', cats: [] },
  { name: 'Rutgers University', cats: ['nu75', 'p4'] },
  { name: 'Samford University', cats: [], enrolling: true },
  { name: 'San Diego State University', cats: [] },
  { name: 'Savannah College of Art and Design', cats: [] },
  { name: 'Seton Hall University', cats: [] },
  { name: 'Shenandoah University', cats: [] },
  { name: 'Southern Methodist University', cats: ['p4'], enrolling: true },
  { name: 'Spartanburg Methodist College', cats: [] },
  { name: 'Spelman College', cats: ['lac75', 'hbcu'] },
  { name: 'St. John Fisher University', cats: [] },
  { name: 'St. John’s University', cats: [] },
  { name: 'Stetson University', cats: [] },
  { name: 'Stevens Institute of Technology', cats: ['nu75'] },
  { name: 'Suffolk University', cats: [] },
  { name: 'Syracuse University', cats: ['nu75', 'p4'] },
  { name: 'Taylor University', cats: [] },
  { name: 'Temple University', cats: [] },
  { name: 'Texas A&M University', cats: ['nu75', 'p4'] },
  { name: 'Texas Christian University', cats: ['p4'], enrolling: true },
  { name: 'Texas Tech University', cats: ['p4'] },
  { name: 'The Ohio State University', cats: ['nu75', 'p4'] },
  { name: 'The University of Alabama-Birmingham', cats: [] },
  { name: 'The University of Edinburgh', cats: [] },
  { name: 'Trinity University', cats: ['lac75'] },
  { name: 'Tulane University', cats: ['nu75'] },
  { name: 'United States Air Force Academy', cats: ['lac75'], enrolling: true },
  { name: 'United States Military Academy', cats: ['lac75'], enrolling: true },
  { name: 'Universal Technical Institute', cats: [] },
  { name: 'University of Alabama', cats: ['p4'], enrolling: true },
  { name: 'University of Arizona', cats: ['p4'] },
  { name: 'University of Arkansas', cats: ['p4'] },
  { name: 'University of California', cats: [] },
  { name: 'University of California-Irvine', cats: ['nu75'] },
  { name: 'University of California-San Diego', cats: ['nu75'] },
  { name: 'University of California-Santa Cruz', cats: [] },
  { name: 'University of Central Florida', cats: ['p4'] },
  { name: 'University of Cincinnati', cats: ['p4'] },
  { name: 'University of Colorado', cats: ['p4'] },
  { name: 'University of Connecticut', cats: ['nu75'] },
  { name: 'University of Delaware', cats: [] },
  { name: 'University of Florida', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of Georgia', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of Glasgow', cats: [] },
  { name: 'University of Hawaii', cats: [] },
  { name: 'University of Houston', cats: ['p4'] },
  { name: 'University of Illinois at Urbana-Champaign', cats: ['nu75', 'p4'] },
  { name: 'University of Iowa', cats: ['p4'] },
  { name: 'University of Kentucky', cats: ['p4'], enrolling: true },
  { name: 'University of Maine', cats: [] },
  { name: 'University of Mary Washington', cats: [] },
  { name: 'University of Maryland', cats: ['nu75', 'p4'] },
  { name: 'University of Massachusetts-Boston', cats: [] },
  { name: 'University of Miami', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of Michigan', cats: ['nu75', 'p4'] },
  { name: 'University of Minnesota', cats: ['nu75', 'p4'] },
  { name: 'University of Mississippi', cats: ['p4'], enrolling: true },
  { name: 'University of Missouri', cats: ['p4'] },
  { name: 'University of Montana', cats: [] },
  { name: 'University of Nebraska', cats: ['p4'], enrolling: true },
  { name: 'University of Nevada', cats: [] },
  { name: 'University of New England', cats: [] },
  { name: 'University of New Hampshire', cats: [], enrolling: true },
  { name: 'University of North Carolina at Asheville', cats: [] },
  { name: 'University of North Carolina at Chapel Hill', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of North Carolina at Charlotte', cats: [], enrolling: true },
  { name: 'University of North Carolina at Greensboro', cats: [], enrolling: true },
  { name: 'University of North Carolina at Pembroke', cats: [] },
  { name: 'University of North Carolina at Wilmington', cats: [], enrolling: true },
  { name: 'University of Northern Colorado', cats: [] },
  { name: 'University of Notre Dame', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of Oklahoma', cats: ['p4'], enrolling: true },
  { name: 'University of Pittsburgh', cats: ['nu75', 'p4'] },
  { name: 'University of Rhode Island', cats: [], enrolling: true },
  { name: 'University of Richmond', cats: ['lac75'] },
  { name: 'University of Rochester', cats: ['nu75'] },
  { name: 'University of South Carolina', cats: ['p4'], enrolling: true },
  { name: 'University of South Florida', cats: [] },
  { name: 'University of Southern California', cats: ['nu75', 'p4'] },
  { name: 'University of Southern Mississippi', cats: [] },
  { name: 'University of Tampa', cats: [] },
  { name: 'University of Tennessee', cats: ['p4'], enrolling: true },
  { name: 'University of Texas', cats: ['nu75'], enrolling: true },
  { name: 'University of the South', cats: ['lac75'], enrolling: true },
  { name: 'University of Utah', cats: ['p4'] },
  { name: 'University of Vermont', cats: [] },
  { name: 'University of Virginia', cats: ['nu75', 'p4'] },
  { name: 'University of Washington', cats: ['nu75', 'p4'] },
  { name: 'Virginia Commonwealth University', cats: [] },
  { name: 'Virginia Tech', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Wake Forest University', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Washington and Lee University', cats: ['lac75'] },
  { name: 'West Virginia University', cats: ['p4'] },
  { name: 'Western Carolina University', cats: [] },
  { name: 'Westmont College', cats: [] },
  { name: 'Wheaton College', cats: [], enrolling: true },
  { name: 'William & Mary', cats: ['nu75'] },
  { name: 'Wingate University', cats: [], enrolling: true },
  { name: 'Winston-Salem State University', cats: ['hbcu'] },
  { name: 'Winthrop University', cats: [] },
  { name: 'Wofford College', cats: ['lac75'] },
  { name: 'Worcester Polytechnic Institute', cats: ['nu75'] },
  { name: 'Xavier University of Louisiana', cats: ['hbcu'] },
]

const PROFILE_2627 = 'https://resources.finalsite.net/images/v1725038322/charlotte/b12msqpqbmeqjqgszan1/2024_USprofile_admiss.pdf'
const COUNSELING = 'https://www.charlottechristian.com/academics/college-counseling'
const CCS = 'https://www.charlottechristian.com'
const CHECKLIST = 'https://www.charlottechristian.com/fs/resource-manager/view/7cd4f071-d452-48a0-a804-bbdf185c0e7b'
const CURRICULUM_GUIDE = 'https://www.charlottechristian.com/fs/resource-manager/view/e07cd151-2d20-44e0-a7db-f0b6d50ba314'

export const charlotteChristian: CollegeSupportProgram = {
  /* The area's SECOND card, after Where Graduates Go. Unlike every other card here, these figures are
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
      'Students in AP classes are required to sit the exam, and 94% of 2026’s 435 exams scored 3 or higher — a rate earned on a mandated rather than self-selected pool.',
    subhead:
      'Because the exams are required, the profile’s published exam, student and AP Scholar counts describe every AP student, not just the most confident testers. The transcript stands out most for its four credits of Biblical Studies.',
    stats: [
      { value: '435', label: 'AP exams taken in 2026 (208 students)' },
      { value: '94%', label: 'of exams scored 3+ in 2026' },
      { value: '90', label: 'AP Scholars in 2026' },
      { value: 'No rank', label: 'a published five-quintile GPA table stands in' },
    ],
    merit: [
      { year: '15-yr (2026–27 profile)', detail: '**12** Finalists · **46** Commended Scholars' },
      { year: '15-yr (2024–25 profile)', detail: '**14** Finalists · **48** Commended Scholars' },
      { year: '15-yr (2021–22 profile)', detail: '**16** Finalists · **45** Commended Scholars' },
      { year: '2025', detail: '**1** Commended Scholar (Jack Krause) — press separately names a Semifinalist the school does not list', unconfirmed: true },
      { year: '2025', detail: '**4** College Board National Recognition awards — 1 African American, 3 Hispanic (Class of 2024: 5)' },
    ],
    meritNote:
      'All three National Merit figures cover a rolling 15-year window. That is why the Finalist count can fall from 16 to 14 to 12 while Commended moves from 45 to 48 to 46: strong older years drop out of the window. The math allows this, so it is not necessarily an error. But the school does not explain it, and no edition publishes a count for each class year.',
    depth: [
      {
        label: 'Mathematics',
        text: '**Calculus III** is a real course beyond AP. It covers multivariable and vector-valued functions, curvature, double and triple integrals, vector analysis and differential equations. It requires a 93% in AP Calculus AB or completion of BC.',
      },
      {
        label: 'Physics',
        text: '**AP Physics 1** is the top physics course on both the 2026–27 profile and the 2026–27 Curriculum Guide. AP Physics C, which earlier editions listed, no longer appears on either.',
      },
      {
        label: 'Computer science',
        text: '**AP Computer Science** is on the 2026–27 profile, and the Curriculum Guide adds **Computer Science I** and **Computer Science II Honors** beneath it. No post-AP computer-science course is published.',
      },
      {
        label: 'World language',
        text: 'AP French, AP Spanish Language and AP Latin on the profile, over Honors ladders running to level IV. The Curriculum Guide adds **AP Spanish Literature**, which the profile does not list. No post-AP language seminar is published.',
      },
      {
        label: 'Beyond campus',
        text: '**Winterim** supplies internships and travel. There is one **dual-enrollment** course: Personal Finance and Biblical Stewardship, taken with Cedarville University.',
      },
    ],
    trust: [
      {
        label: 'Weighted on a 4.0 base',
        text: '**+0.5 for Honors and dual enrollment, +1.0 for AP** on a 4.0 base. Every Upper School course counts toward the GPA; grades transferred from another high school do not.',
      },
      {
        label: 'No rank → a five-quintile table',
        text: '“Charlotte Christian School does not rank its students”, stated flatly in every published profile — but a full five-quintile GPA table through the sixth semester is published every year, letting colleges locate a band without a rank.',
      },
      {
        label: 'A Christian-specific load signature',
        text: 'Graduation requires **27 credits including 4 of Biblical Studies**. Students also need a January Term credit, a half-credit Junior Seminar and a half-credit Speech course. Those four Biblical Studies credits use up elective space that peer schools spend on other courses. They are the transcript’s most distinctive feature.',
      },
    ],
    flags: [
      {
        kind: 'verify',
        text: 'Press coverage of the 71st National Merit competition names a Class of 2025 Semifinalist who appears neither in the school’s own National Merit block nor in its senior enrollment roster, which lists only a Commended Scholar. The two sources are inconsistent about who the honorees were.',
      },
      {
        kind: 'gap',
        text: 'Only the share scoring 3+ is reported. The share of exams scoring 4 or 5 is not published in any year, so no 4–5 rate should be guessed. The 2026–27 profile also drops the pass count and the AP Scholar breakdown by award level that the 2024–25 edition printed. What counts as a “Most rigorous” course load is not defined either. There is no published rubric and no statement of what share of students take the most demanding programme.',
      },
      {
        kind: 'verify',
        text: 'The profile gives dual enrollment two different weights. Page 1 says dual-enrollment courses receive **0.5** extra quality points; page 3 says the Cedarville course awards **.75**. The profile does not reconcile them.',
      },
      {
        kind: 'verify',
        text: 'The 2021–22 and 2024–25 profiles said the school **halved its weighting** with the Class of 2019, down from +1.0 and +2.0, so a pre-2019 GPA is not comparable to a current one. The 2026–27 edition no longer prints that note.',
      },
    ],
    sources: [
      { label: '2026–27 Academic & Student Profile (AP results, course list, GPA weighting, National Merit)', url: PROFILE_2627 },
      { label: '2026–27 Upper School Curriculum Guide', url: CURRICULUM_GUIDE },
      { label: 'Academics — Upper School curriculum', url: 'https://www.charlottechristian.com/academics' },
    ],
  },

  counseling: {
    headline:
      'Two college counselors split the alphabet and carry all four grades each — roughly 55 seniors apiece — under a director who has held the seat at least six years.',
    subhead:
      'The distinctive structure is Junior Seminar: a required, graded half-credit course with a mock admission committee and two mandatory college visits, rather than an optional evening programme.',
    stats: [
      { value: '~55:1', label: 'seniors per counselor (derived — no ratio is published)' },
      { value: '2', label: 'college counselors — Foxx takes K–Z, Miller A–J' },
      { value: '0.5 credit', label: 'Junior Seminar is a graded graduation requirement' },
      { value: 'Scoir', label: 'platform — not Naviance' },
    ],
    roster: [
      {
        role: 'Director',
        name: 'Jodi Foxx',
        detail: 'Director of College Counseling in the 2021–22, 2024–25 and 2026–27 profiles — at least six years in the role. Students K–Z.',
        email: 'jodi.foxx@charchrist.com',
      },
      {
        role: 'College Counselor',
        name: 'Lauren Miller',
        detail: 'Students A–J. Succeeded Katrina Cassier, who held the seat in 2021–22.',
        email: 'lauren.miller@charchrist.com',
      },
      {
        role: 'Registrar',
        name: 'Kirsten Mayers',
        detail: 'Owns transcripts. Personal counseling is a separate function with its own staff.',
        email: 'kirsten.mayers@charchrist.com',
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
      'Test-optional strategy is an explicit counseling topic rather than an unstated assumption — notable given only about 75% of the class sat the SAT and 82% the ACT.',
    reach: [
      'Scoir · an annually published School Profile · CEEB **340667**',
      'NACAC · SACAC · **NACCAP** — the Christian-college counseling association',
      'A published College Planning Checklist and College & Career Planning brochure',
    ],
    flags: [
      {
        kind: 'verify',
        text: 'Both ratios are derived — 442 Upper Schoolers ÷ 2 gives ~221:1 across all four grades, and 110 seniors in the Class of 2026 ÷ 2 gives ~55:1. The school publishes neither. Because the split is alphabetical, each counselor genuinely carries all four grades, so the 221:1 figure is the honest load measure and 55:1 describes senior-year intensity. The two personal counselors are not college counselors and do not belong in the denominator.',
      },
      {
        kind: 'gap',
        text: 'The school publishes no counselor’s years in the job, past employer or professional background. No bios appear on the college counseling page. It also publishes no count of visits by college reps or of campus visits by counselors.',
      },
    ],
    sources: [
      { label: 'charlottechristian.com — College Counseling', url: COUNSELING },
      { label: '2026–27 Academic & Student Profile (staffing, enrollment)', url: PROFILE_2627 },
      { label: 'College Planning Checklist (counselor split by last name)', url: CHECKLIST },
      { label: 'Student Counseling (personal counseling, credentials)', url: 'https://www.charlottechristian.com/student-life' },
    ],
  },

  outcomes: {
    headline:
      '249 colleges admitted the Classes of 2023–26, and 99% of graduates go on to a four-year college.',
    subhead:
      '14% of recent graduates attend a Christian college.',
    stats: [
      { value: '99%', label: 'of graduates attend a four-year college (100% offered admission)' },
      { value: '110', label: 'graduates in the Class of 2026 · 50 colleges enrolled at least one' },
      { value: '64%', label: 'attend out of state · 26% private · 82% Southeast (Classes of 2024–26)' },
      { value: '$3M+', label: 'in academic-merit scholarships offered, Class of 2026' },
    ],
    buckets: [
      { tier: 'Ivy League', count: '4 / 8', note: '— Columbia, Cornell, Dartmouth and Harvard' },
      { tier: '“Ivy Plus”', count: '7 / 17' },
      { tier: 'Top-75 National Universities', count: '49 / 75' },
      { tier: 'Top-75 Liberal Arts', count: '20 / 75' },
      { tier: 'Power Four', count: '54 / 68' },
      { tier: 'HBCUs', count: '11 / 107', note: '— Historically Black Colleges & Universities' },
    ],
    collegesTitle: 'Every acceptance, 2023–2026',
    colleges,
    collegesTotal: '249 institutions · bold = a Class of 2025 or 2026 graduate enrolled',
    scholarships: [
      'Over $3M in academic scholarships offered · Class of 2026',
      '$6.4M scholarships · Class of 2025',
      '$13,875,968 across the Classes of 2023–25',
      'SMU Hunt Leadership Scholars Program',
      '~90 individually named awards published',
      'Athletic awards at Florida State, Wake Forest, Kentucky',
    ],
    flags: [],
    sources: [
      { label: '2026–27 Academic & Student Profile (the 2024–26 acceptance list, Class of 2026 enrollment, matriculation split, scholarships)', url: PROFILE_2627 },
      { label: 'College & Career Planning brochure (the 2023–25 acceptance list, Class of 2025 enrollment, Classes of 2023–25 scholarship total, Christian-college share)', url: CCS },
      { label: 'U.S. News 2027 rankings (tier scoring)', url: 'https://www.usnews.com/best-colleges/rankings/national-universities' },
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
          '**Academic Conservatory** — the school’s strongest published credential. Importantly, it is **noted on the transcript**, so it reaches the admissions reader rather than appearing only on a résumé. The 2026–27 profile names six areas: Math and Science; Fine Arts; Bible, Philosophy & Religion; English; Social Studies; World Languages. **20% of the Class of 2026** earned at least one distinction.',
          '**Winterim / January Term** — a required credit every year (0.25 per year toward graduation). It offers internships, travel and job shadowing. The job-shadowing part is small: only about seven placements are published.',
          '**Junior Seminar** — a required, graded half-credit course containing a mock admission committee and two mandatory college visits. Structurally stronger than the optional evening programming most schools offer.',
          '**Athletic recruiting at scale** — 21 signees in the Class of 2025, roughly 22% of a 94-student class, with athletic scholarships at Florida State, Queens, Wake Forest, Kentucky and New Hampshire.',
          '**Seal of Biliteracy** — started in 2019 and awarded for passing a skills exam in two languages. The share earning it fell from 11% of the Class of 2021 to 4% of the Class of 2024. It then rose to 7% of the Class of 2026.',
          '**Scholastic Art & Writing** — 54 awards over the last five years, per the 2026–27 profile.',
        ],
      },
      {
        title: 'Lever 2 — What the school brings',
        glyph: '▲',
        items: [
          '**A Christian-college network with its own membership** — Charlotte Christian belongs to **NACCAP**, a counseling group for Christian colleges, as well as NACAC and SACAC. Its brochure lists Christian colleges as their own group, and 14% of graduates enroll at one. Class of 2026 graduates enrolled at Wheaton, Liberty, Samford, Gordon, Lipscomb and Baylor.',
          '**A named HBCU tier** — Hampton, Howard, Morehouse, NC A&T and Spelman are listed as a distinct group, with confirmed Class of 2025 enrollments at NC A&T and Johnson C. Smith.',
          '**The School Profile as an instrument** — it publishes the AP exam, student and AP Scholar counts and a five-quintile GPA table. It gives a GPA middle 50% (3.604–4.199 for the Class of 2026). It also prints the grading scale, the weighting formula and the CEEB code 340667.',
          '**Detailed scholarship reporting** — the school published roughly ninety named awards for a single class. That is far more specific than one total dollar figure. It lets a family see which colleges actually fund this school’s students.',
        ],
        note:
          'The discipline policy is published. The school follows the NACAC Statement of Principles of Good Practice. It “does not permit the reporting of any disciplinary infractions”. But it advises students to report on their own any grade 9–12 infraction that led to an out-of-school suspension.',
      },
    ],
    flags: [],
    sources: [
      { label: 'charlottechristian.com — Academic Conservatory', url: 'https://www.charlottechristian.com/academics' },
      { label: 'College & Career Planning brochure (Christian college and HBCU tiers)', url: CCS },
      { label: '2026–27 Academic & Student Profile (conservatory, Seal of Biliteracy, awards, memberships, disciplinary policy)', url: PROFILE_2627 },
      { label: 'College Counseling', url: COUNSELING },
    ],
  },

  wholeClass: {
    headline:
      'A full five-quintile GPA table, published every year — and in the Class of 2026 table it compressed: the top floor eased while the bottom rose sharply.',
    subhead:
      'The middle student sits in the third quintile at roughly 3.80–4.05 weighted. The profile puts the class’s GPA middle 50% at 3.604–4.199 on its GPA scale. Honors adds 0.5 and AP a full point. So a 4.240 floor for the top quintile points to a heavy load of advanced courses, not a perfect record.',
    scoreTables: [
      {
        title: 'SAT score percentiles',
        hint: '— Class of 2026 · 83 testers of 110 graduates (~75%)',
        rows: [{ label: 'SAT total', values: ['—', '1120', '—', '1320', '—', '—'] }],
        note:
          'The school publishes the composite middle-50% band and a tester count only. Those endpoints ARE the 25th and 75th percentiles; the mean, the median and any Reading or Maths section split are unpublished, so none is interpolated here.',
      },
      {
        title: 'ACT score percentiles',
        hint: '— Class of 2026 · 90 testers of 110 graduates (~82%)',
        rows: [{ label: 'ACT composite', values: ['—', '21', '—', '29', '—', '—'] }],
        note:
          '83 SAT plus 90 ACT testers against 110 graduates means heavy overlap: many students sat both. ACT testing rose from 33 testers in the Class of 2025 to 90 in the Class of 2026; the profile gives no reason. The school publishes no combined “share who tested” figure.',
      },
    ],
    gpaTitle: 'GPA percentiles',
    gpaHint: '— the no-rank mechanism · Class of 2026 weighted GPA through the sixth semester',
    quintiles: [
      { label: 'First fifth', gpa: '4.240–4.533', detail: 'a heavy AP and Honors load' },
      { label: 'Second', gpa: '4.081–4.220', detail: 'strong advanced coursework' },
      { label: 'Third', gpa: '3.804–4.053', detail: 'the median student sits here' },
      { label: 'Fourth', gpa: '3.542–3.803', detail: 'real, named destinations exist' },
      { label: 'Fifth', gpa: '2.269–3.524', detail: 'the floor of the published table' },
    ],
    gpaNote:
      'All five quintiles are the school’s own published figures. Compared with the Class of 2025 table, the spread narrowed in one year. The first-quintile floor eased from 4.277 to 4.240. The third rose from 3.686 to 3.804, the fourth from 3.124 to 3.542 and the fifth from 1.941 to 2.269. The bottom of the class moved up much more than the top moved down. No unweighted distribution is published.',
    support: [
      {
        label: 'What is published is counseling, not learning support',
        text: 'Two Upper School counselors teach study skills, help with course choices and track academic progress. They also help with test anxiety and refer students to outside resources. That is general counseling, not a programme for learning differences.',
      },
      {
        label: 'Credentials are a genuine strength',
        text: 'All counselors hold master’s degrees in counseling or a related field, and several hold clinical licences — LCMHC or LCSW.',
      },
      {
        label: 'The named academic-support structures',
        text: '**WIN (“What I Need”) labs** and advisory lessons are the Upper School’s named academic support. The **Media & Writing Center** is free and focused on writing. What WIN Lab actually teaches is not described.',
      },
    ],
    middle: [
      {
        label: 'The middle may be the best-served group',
        text: 'The list runs from Duke, Harvard and Columbia down to Central Piedmont Community College, Barton, Catawba, Spartanburg Methodist, Belmont Abbey, Wingate and Winthrop. A fourth- or fifth-quintile student at 3.54 or below has real, named places to go. The checklist also tells students to include “every possible type of college that might be of interest”.',
      },
      {
        label: 'The Christian-college route is real, not decorative',
        text: '14% of recent graduates enroll at a Christian college. Graduates of both the Class of 2025 and the Class of 2026 enrolled at Wheaton, Liberty, Samford and Baylor. Class of 2026 graduates also enrolled at Gordon and Lipscomb, and Class of 2025 graduates at Charleston Southern, Cedarville, Grove City and Abilene Christian.',
      },
      {
        label: 'Vocational and non-traditional',
        text: 'Central Piedmont Community College appears on the acceptance list. Two federal service academies, the **Air Force Academy** and **West Point**, each enrolled a Class of 2026 graduate.',
      },
    ],
    flags: [
      {
        kind: 'verify',
        text: 'Three things the 2026–27 profile leaves open. Its “GPA distribution” heading carries an asterisk with no matching footnote. The quintile table names no class year; it sits in the Class of 2026 column and runs “through 6th semester”. And it does not say whether the 3.604–4.199 GPA middle 50% is weighted. The printed bands also leave small gaps between them (4.220 to 4.240, for example).',
      },
    ],
    sources: [
      { label: '2026–27 Academic & Student Profile (test bands, GPA middle 50%, quintile table, acceptance list)', url: PROFILE_2627 },
      { label: 'Student Counseling (counselor credentials, WIN labs)', url: 'https://www.charlottechristian.com/student-life' },
    ],
  },

  verdict: {
    headline:
      'A demanding, open transcript: required AP exams, a full published quintile table, and published AP exam and Scholar counts. It comes with the thinnest learning-support disclosure among the schools on this site.',
    subhead:
      'The academic reporting is unusually honest. The gaps are concentrated in exactly one place, which makes the tour questions easy to aim.',
    points: [
      {
        label: 'AP exams are mandatory, so the pass rate means something',
        text: '“Students in AP classes are required to take the AP exam” — so 94% scoring 3+ in 2026, after 89% in 2024 and 78% in 2021, rests on a non-self-selected pool rather than only confident testers.',
      },
      {
        label: 'The AP counts are published with the rate',
        text: 'the 2026–27 profile prints 435 exams, 208 students and 90 AP Scholars beside the 94%, so the rate can be read against the size of the group that earned it.',
      },
      {
        label: 'A real quintile table, published annually',
        text: 'five quintiles through the sixth semester, so colleges can locate a student’s band without a rank — and comparing editions makes year-to-year grade movement visible rather than hidden.',
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
      'Your profile reports 12 National Merit finalists on a rolling 15-year window, down from 16 six years earlier. What were the per-class counts for the last five years?',
      'The school lists one Commended Scholar for the Class of 2025 while press coverage names a Semifinalist you do not list. Which is right?',
      'You state 99% attend a four-year college, but the Class of 2025’s named senior roster showed about five of 94 elsewhere. How is that 99% calculated for the 110 graduates of the Class of 2026?',
      'Your profile gives dual enrollment +0.5 on page 1 and +.75 on page 3. Which applies?',
      'Where did the Class of 2024 enroll? The two published lists mark only Class of 2025 and Class of 2026 enrollments.',
    ],
    flags: [],
    sources: [
      { label: '2026–27 Academic & Student Profile', url: PROFILE_2627 },
      { label: 'charlottechristian.com — College Counseling', url: COUNSELING },
      { label: 'College & Career Planning brochure', url: CCS },
      { label: 'Verdict synthesised by the researcher from the sources cited on the cards above', },
    ],
  },
}
