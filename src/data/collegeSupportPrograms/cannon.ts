// Cannon School — the six College Support cards.
//
// Every figure is transcribed from the school's OWN published materials —
// chiefly the 2026–27 School Profile PDF (with the 2024–25 edition for the
// grading scale), the College Counseling pages, and named news coverage. See
// source-material/college-support/cannon/ — `Cannon School - College Support -
// School Profile 2026-2027.md` for the current edition, and `Redesign Research
// 2026.md` for the earlier hard data, source URLs, and gap notes.
//
// Cannon publishes noticeably less college-outcome data than the larger
// Charlotte independents: there is no National Merit ledger, no AP Scholar
// count, no scholarship-dollar headline, no counselor tenure detail, and no
// rep-visit count. Those are recorded as gaps rather than estimated, and the
// merit ledger block is simply absent from the transcript card.
//
// Two structural notes that shape what renders below:
//
//  1. The 2026–27 profile RESTORES an acceptance list — 2024–2026, 218
//     institutions — after the 2025–26 edition dropped it. It replaces the
//     2022–24 rollup wholesale (the acceptance-years rule: newest window only).
//  2. The 2026–27 profile was published at the SAME Finalsite asset id and
//     filename as the 2025–26 edition (only the version segment changed), and
//     both version URLs now serve the 2026–27 file. Re-check every citation to
//     a Cannon profile whenever a new edition lands. The new list carries no
//     enrollment markers, so no row sets `enrolling`; the Class of 2023
//     matriculation list stays a separate, still-true fact on the outcomes card.

import type { CollegeSupportProgram } from '../collegeSupport.ts'

/* The 2024–2026 acceptance list (218 institutions), transcribed in the 2026–27
   School Profile's printed order with its spellings as printed. The profile marks
   no enrolling rows, so none carry `enrolling`. Rank labels and buckets are
   scored against the 2027 U.S. News tables. */
const colleges = [
  { name: 'Alabama A&M University', cats: ['hbcu'] },
  { name: 'American University', cats: [] },
  { name: 'Amherst College', cats: ['lac75'] },
  { name: 'Appalachian State University', cats: [] },
  { name: 'Arizona State University', cats: ['p4'] },
  { name: 'Arizona State University (Downtown Phoenix)', cats: ['p4'] },
  { name: 'Auburn University', cats: ['p4'] },
  { name: 'Babson College', cats: [] },
  { name: 'Bard College', cats: ['lac75'] },
  { name: 'Barnard College', cats: ['lac75'] },
  { name: 'Bates College', cats: ['lac75'] },
  { name: 'Baylor University', cats: ['p4'] },
  { name: 'Belmont University', cats: [] },
  { name: 'Beloit College', cats: [] },
  { name: 'Boston College', cats: ['nu75', 'p4'] },
  { name: 'Boston University', cats: ['nu75'] },
  { name: 'Bowdoin College', cats: ['lac75'] },
  { name: 'Bridgewater College', cats: [] },
  { name: 'Brigham Young University', cats: ['p4'] },
  { name: 'Brown University', cats: ['ivy', 'ivyplus', 'nu75'] },
  { name: 'Bucknell University', cats: ['lac75'] },
  { name: 'Butler University', cats: [] },
  { name: 'Cal Poly', cats: [] },
  { name: 'California Institute of Technology', cats: ['ivyplus', 'nu75'] },
  { name: 'Carnegie Mellon University', cats: ['nu75'] },
  { name: 'Case Western Reserve University', cats: ['nu75'] },
  { name: 'Charleston Southern University', cats: [] },
  { name: 'Christopher Newport University', cats: [] },
  { name: 'Claremont McKenna College', cats: ['lac75'] },
  { name: 'Clark Atlanta University', cats: ['hbcu'] },
  { name: 'Clemson University', cats: ['p4'] },
  { name: 'Coastal Carolina University', cats: [] },
  { name: 'Colby College', cats: ['lac75'] },
  { name: 'Colgate University', cats: ['lac75'] },
  { name: 'College of Charleston', cats: [] },
  { name: 'College of the Holy Cross', cats: ['lac75'] },
  { name: 'Colorado School of Mines', cats: [] },
  { name: 'Colorado State University', cats: [] },
  { name: 'Columbia University', cats: ['ivy', 'ivyplus', 'nu75'] },
  { name: 'Cornell University', cats: ['ivy', 'ivyplus', 'nu75'] },
  { name: 'Creighton University', cats: [] },
  { name: 'Dartmouth College', cats: ['ivy', 'ivyplus', 'nu75'] },
  { name: 'Davidson College', cats: ['lac75'] },
  { name: 'Davidson-Davie Community College', cats: [] },
  { name: 'Denison University', cats: ['lac75'] },
  { name: 'Drexel University', cats: [] },
  { name: 'Duke University', cats: ['ivyplus', 'nu75', 'p4'] },
  { name: 'Duquesne University', cats: [] },
  { name: 'East Carolina University', cats: [] },
  { name: 'East Tennessee State University', cats: [] },
  { name: 'Eckerd College', cats: [] },
  { name: 'Elizabeth City State University', cats: ['hbcu'] },
  { name: 'Elon University', cats: [] },
  { name: 'Embry-Riddle Aeronautical University (Daytona Beach)', cats: [] },
  { name: 'Emerson College', cats: [] },
  { name: 'Illinois Institute of Technology', cats: [] },
  { name: 'Indiana University (Bloomington)', cats: ['nu75', 'p4'] },
  { name: 'Jacksonville University', cats: [] },
  { name: 'James Madison University', cats: [] },
  { name: 'Johns Hopkins University', cats: ['ivyplus', 'nu75'] },
  { name: 'Johnson & Wales University (Charlotte)', cats: [] },
  { name: 'Kennesaw State University', cats: [] },
  { name: 'King\'s College London', cats: [] },
  { name: 'La Salle University', cats: [] },
  { name: 'Lehigh University', cats: ['nu75'] },
  { name: 'Lenoir-Rhyne University', cats: [] },
  { name: 'Louisiana State University', cats: ['p4'] },
  { name: 'Loyola Marymount University', cats: [] },
  { name: 'Luther College', cats: [] },
  { name: 'Lynn University', cats: [] },
  { name: 'Macalester College', cats: ['lac75'] },
  { name: 'Manhattan University', cats: [] },
  { name: 'Marymount University', cats: [] },
  { name: 'New York University', cats: ['nu75'] },
  { name: 'Niagara University', cats: [] },
  { name: 'North Carolina A&T State University', cats: ['hbcu'] },
  { name: 'North Carolina Central University', cats: ['hbcu'] },
  { name: 'North Carolina State University', cats: ['nu75', 'p4'] },
  { name: 'Northeastern University', cats: ['nu75'] },
  { name: 'Northwestern University', cats: ['ivyplus', 'nu75', 'p4'] },
  { name: 'Oberlin College', cats: ['lac75'] },
  { name: 'Ohio University', cats: [] },
  { name: 'Oklahoma State University', cats: ['p4'] },
  { name: 'Old Dominion University', cats: [] },
  { name: 'Penn State University', cats: ['nu75', 'p4'] },
  { name: 'Penn State University (Abington)', cats: [] },
  { name: 'Penn State University (World Campus)', cats: [] },
  { name: 'Pepperdine University', cats: [] },
  { name: 'Princeton University', cats: ['ivy', 'ivyplus', 'nu75'] },
  { name: 'Providence College', cats: [] },
  { name: 'Purdue University', cats: ['nu75', 'p4'] },
  { name: 'Purdue University (Fort Wayne)', cats: [] },
  { name: 'Queens University of Charlotte', cats: [] },
  { name: 'Rensselaer Polytechnic Institute', cats: ['nu75'] },
  { name: 'Rhodes College', cats: ['lac75'] },
  { name: 'Rice University', cats: ['nu75'] },
  { name: 'Roanoke College', cats: [] },
  { name: 'Rochester Institute of Technology', cats: [] },
  { name: 'Rutgers University', cats: ['nu75', 'p4'] },
  { name: 'Rutgers University (Newark)', cats: ['nu75'] },
  { name: 'Saint Joseph\'s University', cats: [] },
  { name: 'San Diego State University', cats: [] },
  { name: 'Santa Clara University', cats: ['nu75'] },
  { name: 'Sarah Lawrence College', cats: [] },
  { name: 'Savannah College of Art and Design', cats: [] },
  { name: 'School of the Art Institute of Chicago', cats: [] },
  { name: 'Seton Hall University', cats: [] },
  { name: 'Skidmore College', cats: ['lac75'] },
  { name: 'South Carolina State University', cats: ['hbcu'] },
  { name: 'Southern Methodist University', cats: ['p4'] },
  { name: 'Southern University and A&M College', cats: ['hbcu'] },
  { name: 'Spelman College', cats: ['lac75', 'hbcu'] },
  { name: 'St. Olaf College', cats: ['lac75'] },
  { name: 'Stanford University', cats: ['ivyplus', 'nu75', 'p4'] },
  { name: 'Stetson University', cats: [] },
  { name: 'Suffolk University', cats: [] },
  { name: 'Swarthmore College', cats: ['lac75'] },
  { name: 'Syracuse University', cats: ['nu75', 'p4'] },
  { name: 'Temple University', cats: [] },
  { name: 'Texas A&M University', cats: ['nu75', 'p4'] },
  { name: 'Texas Christian University', cats: ['p4'] },
  { name: 'The American University of Paris', cats: [] },
  { name: 'The Citadel', cats: [] },
  { name: 'The Ohio State University', cats: ['nu75', 'p4'] },
  { name: 'The University of Edinburgh', cats: [] },
  { name: 'The University of Manchester', cats: [] },
  { name: 'Trinity College', cats: ['lac75'] },
  { name: 'Trinity College Dublin', cats: [] },
  { name: 'Trinity University', cats: ['lac75'] },
  { name: 'Tufts University', cats: ['nu75'] },
  { name: 'Tulane University', cats: ['nu75'] },
  { name: 'United States Coast Guard Academy', cats: [] },
  { name: 'United States Naval Academy', cats: ['lac75'] },
  { name: 'University College Dublin', cats: [] },
  { name: 'University of Alabama', cats: ['p4'] },
  { name: 'University of Alabama (Birmingham)', cats: [] },
  { name: 'University of Arizona', cats: ['p4'] },
  { name: 'University of Arkansas', cats: ['p4'] },
  { name: 'University of California (Berkeley)', cats: ['nu75', 'p4'] },
  { name: 'University of California (Davis)', cats: ['nu75'] },
  { name: 'University of California (Irvine)', cats: ['nu75'] },
  { name: 'University of California (Los Angeles)', cats: ['nu75', 'p4'] },
  { name: 'University of California (San Diego)', cats: ['nu75'] },
  { name: 'University of California (Santa Barbara)', cats: ['nu75'] },
  { name: 'University of California (Santa Cruz)', cats: [] },
  { name: 'University of Central Florida', cats: ['p4'] },
  { name: 'University of Chicago', cats: ['ivyplus', 'nu75'] },
  { name: 'University of Cincinnati', cats: ['p4'] },
  { name: 'University of Colorado (Boulder)', cats: ['p4'] },
  { name: 'University of Connecticut', cats: ['nu75'] },
  { name: 'University of Dayton', cats: [] },
  { name: 'University of Delaware', cats: [] },
  { name: 'University of Denver', cats: [] },
  { name: 'University of Florida', cats: ['nu75', 'p4'] },
  { name: 'University of Georgia', cats: ['nu75', 'p4'] },
  { name: 'University of Hawaii (Manoa)', cats: [] },
  { name: 'University of Idaho', cats: [] },
  { name: 'University of Illinois (Chicago)', cats: [] },
  { name: 'University of Illinois (Urbana-Champaign)', cats: ['nu75', 'p4'] },
  { name: 'University of Iowa', cats: ['p4'] },
  { name: 'University of Kentucky', cats: ['p4'] },
  { name: 'University of Louisville', cats: ['p4'] },
  { name: 'University of Maryland', cats: ['nu75', 'p4'] },
  { name: 'University of Massachusetts (Amherst)', cats: ['nu75'] },
  { name: 'University of Miami', cats: ['nu75', 'p4'] },
  { name: 'University of Michigan', cats: ['nu75', 'p4'] },
  { name: 'University of Mississippi', cats: ['p4'] },
  { name: 'University of Montreal', cats: [] },
  { name: 'University of New Hampshire', cats: [] },
  { name: 'University of North Carolina (Asheville)', cats: [] },
  { name: 'University of North Carolina (Chapel Hill)', cats: ['nu75', 'p4'] },
  { name: 'University of North Carolina (Charlotte)', cats: [] },
  { name: 'University of North Carolina (Greensboro)', cats: [] },
  { name: 'University of North Carolina (Pembroke)', cats: [] },
  { name: 'University of North Carolina (Wilmington)', cats: [] },
  { name: 'University of Notre Dame', cats: ['nu75', 'p4'] },
  { name: 'University of Oklahoma', cats: ['p4'] },
  { name: 'University of Oregon', cats: ['p4'] },
  { name: 'University of Pennsylvania', cats: ['ivy', 'ivyplus', 'nu75'] },
  { name: 'University of Pittsburgh', cats: ['nu75', 'p4'] },
  { name: 'University of Richmond', cats: ['lac75'] },
  { name: 'University of San Francisco', cats: [] },
  { name: 'University of South Carolina', cats: ['p4'] },
  { name: 'University of South Carolina (Beaufort)', cats: [] },
  { name: 'University of South Florida', cats: [] },
  { name: 'University of Southern California', cats: ['nu75', 'p4'] },
  { name: 'University of Tampa', cats: [] },
  { name: 'University of Tennessee', cats: ['p4'] },
  { name: 'University of Texas', cats: ['nu75'] },
  { name: 'University of the Pacific', cats: [] },
  { name: 'University of the South', cats: ['lac75'] },
  { name: 'University of Toronto', cats: [] },
  { name: 'University of Utah', cats: ['p4'] },
  { name: 'University of Vermont', cats: [] },
  { name: 'University of Virginia', cats: ['nu75', 'p4'] },
  { name: 'University of Washington', cats: ['nu75', 'p4'] },
  { name: 'University of Wisconsin', cats: ['nu75', 'p4'] },
  { name: 'Ursinus College', cats: [] },
  { name: 'Vanderbilt University', cats: ['nu75', 'p4'] },
  { name: 'Vassar College', cats: ['lac75'] },
  { name: 'Villanova University', cats: ['nu75'] },
  { name: 'Virginia Tech', cats: ['nu75', 'p4'] },
  { name: 'Wake Forest University', cats: ['nu75', 'p4'] },
  { name: 'Washington and Lee University', cats: ['lac75'] },
  { name: 'Washington State University', cats: [] },
  { name: 'Washington University in St. Louis', cats: ['ivyplus', 'nu75'] },
  { name: 'Wesleyan University', cats: ['lac75'] },
  { name: 'West Virginia State University', cats: ['hbcu'] },
  { name: 'West Virginia University', cats: ['p4'] },
  { name: 'Western Carolina University', cats: [] },
  { name: 'Western University', cats: [] },
  { name: 'Wheaton College', cats: [] },
  { name: 'William & Mary', cats: ['nu75'] },
  { name: 'Williams College', cats: ['lac75'] },
  { name: 'Winston-Salem State University', cats: ['hbcu'] },
  { name: 'Wofford College', cats: ['lac75'] },
  { name: 'Worcester Polytechnic Institute', cats: ['nu75'] },
  { name: 'Yale University', cats: ['ivy', 'ivyplus', 'nu75'] },
]

const PROFILE_2627 =
  'https://resources.finalsite.net/images/v1791909516/cannonschoolorg/i5lqf0krxcb4uejss6ul/Cannon_2526_Profile.pdf'
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
      'UNC-Chapel Hill is the hard one: 31.7% in Fall 2025 — 20 of 63 — against far higher rates at the less-selective universities. These are UNC-system figures published by the state, not the school’s own.',
    stats: [
      { value: '788', label: 'applications to the six universities, Fall 2021–2025' },
      { value: '60.8%', label: 'pooled admit rate — 479 of 788 across those five classes' },
      { value: '31.7%', label: 'at UNC-Chapel Hill — 20 of 63, the toughest of the six for this school' },
      { value: 'UNC-Chapel Hill', label: 'drew the most applications in Fall 2025 (63)' },
    ],
    latestTerm: '2025',
    universities: [
      {
        key: 'unc-chapel-hill',
        name: 'UNC-Chapel Hill',
        rank: 1,
        note: 'Flagship · Chapel Hill · the most selective of the six',
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
        note: 'Hometown campus · largest admit rates of the six',
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
        note: 'Greenville · eastern NC',
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
      'Cannon publishes something almost no peer does — an explicit maximum AP/AT load by grade, capping a four-year transcript at twelve advanced courses and barring freshmen entirely.',
    subhead:
      'That ceiling is the key to reading a Cannon transcript: “most rigorous” here has a hard, published limit, and the 90% scoring 3+ comes from students who chose to sit an optional exam.',
    stats: [
      { value: '27', label: 'advanced courses — AP plus school-designed Advanced Topics, the school’s own count' },
      { value: '90%', label: 'of students scored 3+ (446 exams, 195 students, May 2026)' },
      { value: '0 / 1 / 5 / 6', label: 'published max AP/AT courses in grades 9 / 10 / 11 / 12' },
      { value: 'No rank', label: '“Cannon School does not rank students”' },
    ],
    // No merit ledger: no National Merit counts are published in any year.
    merit: [],
    depth: [
      {
        label: 'Mathematics',
        text: 'The ceiling is now **AT: Mathematics & Calculus**, which the 2026–27 Course Catalog describes as a seminar for students who have completed AP Calculus BC. AP Precalculus also appears. No multivariable calculus or linear algebra course is published by name.',
      },
      {
        label: 'Computer science',
        text: '**AP Computer Science plus AT: Principles of Computer Science & Coding**, still with no data-structures or post-AP course — thin relative to the rest of the advanced catalogue.',
      },
      {
        label: 'Advanced Topics',
        text: '**School-designed AT courses** sit alongside the APs and carry the same 1.0 quality point, several with no corresponding College Board exam at all — for example AT: Design Thinking for Entrepreneurship.',
      },
      {
        label: 'Beyond campus',
        text: 'No Global Online Academy membership and no dual-enrolment partnership is published — this was checked specifically.',
      },
      {
        label: 'Before and after the school year',
        text: '**Zero Hour** runs Varsity Chorus and Varsity Orchestra, pass/fail, on Monday, Wednesday and Friday before school. **Summer Term** offers Geometry Acceleration pass/fail, and Honors Biology and Honors Chemistry for a grade; summer courses are designated as Summer Term on the transcript, and BIOREX is not offered in the summer section.',
      },
    ],
    trust: [
      {
        label: 'Weighted narrowly, and deliberately',
        text: 'Three tiers: AT and AP courses carry **1.0 quality point**, **Honors Accelerated 0.5** (new for 2026–27), and Honors **none at all**. Both weighted and unweighted GPAs are calculated from Cannon coursework only.',
      },
      {
        label: 'No rank, and a modest ceiling',
        text: 'No rank, no decile or quintile table — but the narrow weighting plus the twelve-course cap means the weighted top decile tops out around **4.28**. Cannon does not produce inflated 4.9 GPAs, which needs context for readers used to heavier schemes.',
      },
      {
        label: 'A per-discipline rigour key',
        text: 'Bold entries in the profile’s course table mark the “most demanding coursework in that discipline per appropriate grade level”, so a reader can see the ceiling subject by subject rather than guessing.',
      },
    ],
    flags: [
      {
        kind: 'verify',
        text: 'AP exams are OPTIONAL — “students in AT/AP classes have the option of sitting for the appropriate AP exam”. The 90.16% scoring 3+ therefore rests on a self-selected pool and is not directly comparable with schools that mandate the exam. The denominator is also undefined: the profile labels the figure “Students with Scores 3+” while giving both 195 students and 446 exams, so whether it is a share of students or of exams is not stated.',
      },
      {
        kind: 'gap',
        text: 'No National Merit ledger of any kind is published — no Semifinalist, Finalist or Commended counts in any year, on any profile or in news posts. Repeated searches surfaced only a 2011 item naming a single Scholar. AP Scholar counts and the share scoring 4–5 are likewise unpublished; Cannon reports only the 3+ threshold.',
      },
    ],
    sources: [
      { label: 'cannonschool.org — 2026–27 School Profile (advanced-course counts, AP stats, load ceiling, weighting, no-rank policy)', url: PROFILE_2627 },
      { label: '2024–25 School Profile (the grading scale the newer editions dropped)', url: PROFILE_2425 },
    ],
  },

  counseling: {
    headline:
      'Cannon promises something structural that most schools do not: a student keeps the same college counselor for all four years, rather than being handed off in junior year.',
    subhead:
      'Five staff, the same four directors across three published profiles, and a co-director model — plus the regional case-studies programme it physically hosts.',
    stats: [
      { value: '~26:1', label: 'seniors per counselor — computed, 105 seniors ÷ 4 (Class of 2026)' },
      { value: '5', label: 'staff — two co-directors, two associates, one coordinator' },
      { value: '4 years', label: 'the same counselor for a student’s whole Upper School career' },
      { value: 'SCOIR', label: 'platform, alongside an annually refreshed School Profile' },
    ],
    roster: [
      { role: 'Co-Director', name: 'Courtney Brayboy', detail: 'Cannon runs an unusual shared top role rather than a single director.' },
      { role: 'Co-Director', name: 'Heidi Waibel', detail: 'The four directors are unchanged across the 2024–25, 2025–26 and 2026–27 profiles.' },
      { role: 'Assoc. Director', name: 'Adrian LeFevre' },
      { role: 'Assoc. Director', name: 'Connie Stavrakas' },
      { role: 'Coordinator', name: 'Brittany Pasut', detail: 'Named on the 2026–27 profile, succeeding Clay Morrell.' },
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
        text: 'The “28:1” ratio Cannon once marketed no longer appears on its College Counseling page (checked 2026-10-25), and it only ever worked as seniors per counselor. The figure above is computed: 105 Class of 2026 seniors ÷ 4 counselors ≈ 26:1. Measured across the 421-student Upper School it is about 105:1, and the school publishes no caseload figure of its own.',
      },
      {
        kind: 'gap',
        text: 'No counselor tenure, prior background, degrees or biographies are published — names and titles only, so director tenure is unknown. Neither rep-visit counts nor counselor campus-visit counts are published in any form. Note that Davidson Day’s published “80+ reps a year” belongs to Davidson Day, not Cannon.',
      },
      {
        kind: 'gap',
        text: 'The student-facing curriculum is unpublished: seminar cadence, one-on-one meeting counts, essay workshops and junior conference timing appear nowhere. Cannon publishes what it invites parents to, not what it does with students. A four-year self-exploration strand described in the 2024–25 profile was cut from later editions without explanation.',
      },
    ],
    sources: [
      { label: 'cannonschool.org — College Counseling', url: COUNSELING },
      { label: '2026–27 School Profile (staffing, enrollment)', url: PROFILE_2627 },
      { label: 'Davidson Day — the co-hosted Lake Norman case-studies programme at Cannon', url: 'https://www.davidsonday.org/academics/college-counseling' },
    ],
  },

  outcomes: {
    headline:
      'Cannon publishes what most schools here do not — an actual matriculation list. 58 institutions enrolled a Class of 2023 graduate, including Stanford, Duke, Penn, UCLA and the Air Force Academy.',
    subhead:
      'Beside it, the acceptance list is now current: the 2026–27 profile restores a full 2024–2026 list of 218 institutions, including seven of the eight Ivies.',
    stats: [
      { value: '98%', label: 'of the Class of 2026 to four-year colleges · 2% to two-year' },
      { value: '58', label: 'institutions where a Class of 2023 student actually enrolled' },
      { value: '105', label: 'graduating seniors, Class of 2026' },
      { value: '7 of 8', label: 'Ivy League on the 2024–26 acceptance list' },
    ],
    buckets: [
      { tier: 'Ivy League', count: '7 / 8', note: '— Brown, Columbia, Cornell, Dartmouth, Penn, Princeton, Yale; absent Harvard' },
      { tier: '“Ivy Plus”', count: '14 / 17' },
      { tier: 'Top-75 National Universities', count: '62 / 75' },
      { tier: 'Top-75 Liberal Arts', count: '28 / 75' },
      { tier: 'Power Four', count: '55 / 68' },
      { tier: 'HBCUs', count: '10 / 107', note: '— Historically Black Colleges & Universities' },
    ],
    collegesTitle: 'Every acceptance, 2024–2026',
    colleges,
    collegesTotal: '218 institutions',
    scholarships: [
      'No merit-scholarship total published',
      'Morehead-Cain: a 2015 recipient, nothing current',
      'U.S. Air Force Academy enrollment (Class of 2023)',
      'National Honor Society chapter awarded in 2025',
      'U.S. Naval Academy and Coast Guard Academy acceptances (2024–26)',
    ],
    scholarshipsNote:
      'This is Cannon’s single largest outcome-data gap. No merit-scholarship dollar figure appears on any of the three published profiles or in any news post, and no current Morehead-Cain, Park, QuestBridge or ROTC outcome is published. Cannon does publish $3,000,000 in tuition assistance to 24% of its students — but that is the school’s own inbound financial aid, not college merit money, and the two must not be conflated.',
    flags: [],
    sources: [
      { label: 'cannonschool.org — 2026–27 School Profile (the 2024–26 acceptance list, Class of 2026 outcomes)', url: PROFILE_2627 },
      { label: 'College Counseling resources (Class of 2023 matriculation list)', url: 'https://www.cannonschool.org/college-counseling-resources-clone' },
      { label: 'U.S. News 2027 rankings (tier scoring)', url: 'https://www.usnews.com/best-colleges/rankings/national-universities' },
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
          '**Institutional memberships** — **SAIS** accreditation; NAIS, NCAIS, CSEE, **ACCIS**, NACAC and SACAC; and a **National Honor Society** chapter awarded in 2025.',
          '**Hosting regional admissions traffic** — Cannon is the venue for the Lake Norman case-studies programme and fair, pulling visiting admissions officers onto its own campus at regional scale rather than only sending students out.',
        ],
      },
    ],
    flags: [],
    sources: [
      { label: 'cannonschool.org — 2026–27 School Profile (signature experiences, memberships, discipline reporting)', url: PROFILE_2627 },
      { label: 'Academics — Upper School curriculum', url: 'https://www.cannonschool.org/academics' },
      { label: 'College Counseling', url: COUNSELING },
    ],
  },

  wholeClass: {
    headline:
      'Cannon publishes a top-10% band and a middle-50% band for both tests and both GPAs — a genuinely useful shape, reported in a format that is not percentiles.',
    subhead:
      'The most informative figure is the unweighted middle 50% of 3.76–3.94: the median Cannon student sits in the A-minus range before any weighting.',
    scoreTables: [
      {
        title: 'SAT score percentiles',
        hint: '— Class of 2026 · number of testers not published',
        rows: [{ label: 'SAT total', values: ['—', '1290', '—', '1410', '1510', '—'] }],
        note:
          'Cannon publishes a middle-50% band and a top-10% band only. The middle-50% endpoints conventionally ARE the 25th and 75th percentiles, so those columns are real; the top-10% figure is shown in the 90th column as the floor of that band (1510–1560). No mean, median, section subscores, or tester counts are published for either test.',
      },
      {
        title: 'ACT score percentiles',
        hint: '— Class of 2026 · number of testers not published',
        rows: [{ label: 'ACT composite', values: ['—', '25', '—', '31', '33', '—'] }],
        note:
          'Same reporting format: the 90th column shows the floor of the published top-10% band (33–36). Without a tester count there is no way to tell what share of 105 seniors sat either exam, which materially limits how far these bands can be read.',
      },
    ],
    gpaTitle: 'GPA distribution',
    gpaHint: '— Class of 2026, cumulative through grade 11 · transfers excluded',
    quintiles: [
      { label: 'Weighted · top 10%', gpa: '4.08–4.28', detail: 'a modest ceiling, by design' },
      { label: 'Weighted · mid 50%', gpa: '3.93–4.11', detail: 'the middle of the class' },
      { label: 'Unweighted · top 10%', gpa: '3.85–4.0', detail: 'A-range' },
      { label: 'Unweighted · mid 50%', gpa: '3.76–3.94', detail: 'A− range before weighting' },
    ],
    gpaNote:
      'These are bands, not a quintile table — no full quintile or decile breakdown, median GPA, or per-band student count is published. The modest weighted ceiling follows directly from the 1.0-quality-point cap and the twelve-course AP/AT maximum, which is a transparency point in Cannon’s favour but needs context for readers used to heavier weighting schemes. As printed, the weighted top-10% band (from 4.08) begins below the top of the middle 50% (4.11), and the profile does not explain the overlap.',
    support: [
      {
        label: 'Two named Upper School learning-support staff',
        text: '**Michelle Donah**, Upper School Learning Specialist, and **Jennifer Ridenhour**, Upper School Dean of Academic Support — substantial staffing for 421 Upper School students, and among the best-documented learning support in this set.',
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
    middle: [
      {
        label: 'The list is printed honestly',
        text: 'The acceptance list runs from Caltech, Stanford, Princeton and Yale down through Davidson-Davie Community College, Charleston Southern, Coastal Carolina, Lenoir-Rhyne, Queens, Western Carolina, UNC Pembroke and USC Beaufort. A school optimising for prestige would omit these; Cannon prints them, and discloses its 2% two-year figure rather than burying it.',
      },
      {
        label: 'A thinner arts pathway this window',
        text: 'SCAD, the School of the Art Institute of Chicago and Emerson. The 2024–26 list is thinner on art and design schools than the 2022–24 list was: Pratt, Parsons, Ringling, FIT, FIDM and UNCSA no longer appear.',
      },
      {
        label: 'Other non-traditional destinations',
        text: 'International universities (Edinburgh, Manchester, King’s College London, Trinity College Dublin, University College Dublin, The American University of Paris, Toronto, Montreal and Western); service academies (the US Naval Academy and US Coast Guard Academy) and The Citadel; technical institutes (Caltech, Colorado School of Mines, RPI, WPI, Illinois Tech, RIT and Embry-Riddle); HBCUs (Alabama A&M, Clark Atlanta, Elizabeth City State, NC A&T, NC Central, South Carolina State, Southern University and A&M, Spelman, West Virginia State and Winston-Salem State).',
      },
    ],
    flags: [
      {
        kind: 'gap',
        text: 'No gap-year statistic, policy or counselling service is described anywhere — and since 98% four-year plus 2% two-year accounts for the whole Class of 2026, the published outcomes leave no room for a gap-year cohort at all.',
      },
    ],
    sources: [
      { label: 'cannonschool.org — 2026–27 School Profile (testing distribution, GPA bands)', url: PROFILE_2627 },
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
        text: 'students keep the same college counselor for their whole Upper School career rather than being handed off in junior year — and the roster shows the same four directors across three published profiles (only the coordinator changed).',
      },
      {
        label: 'The rigour ceiling is disclosed, not implied',
        text: 'a published maximum of 0/1/5/6 AP or AT courses by grade caps a transcript at twelve, so colleges read “most rigorous” against a limit the school itself states.',
      },
      {
        label: 'Research experiences with real external judging',
        text: 'BIOREX is presented to a committee including science professionals and local business leaders, Symposium demands an original historical argument, and Independent Study has the student writing the rubric.',
      },
      {
        label: 'It publishes an actual matriculation list',
        text: '58 institutions where a Class of 2023 graduate genuinely enrolled — Stanford, Duke, Penn, UCLA, USC, Vanderbilt, Middlebury, Vassar, Georgia Tech, UNC, UVA, William & Mary and the Air Force Academy. That is stronger evidence than any acceptance rollup — and the 2026–27 profile restores a full 2024–26 acceptance list beside it.',
      },
      {
        label: 'Learning support is named and reaches the application',
        text: 'two named Upper School learning-support staff, student-authored personalised learning plans, and explicit guidance for juniors and seniors on requesting College Board and ACT accommodations.',
      },
      {
        label: 'Grades are not inflated',
        text: 'Honors courses carry no weight, Honors Accelerated adds half a point and only AT/AP add a full point, so the weighted top decile tops out at 4.28.',
      },
    ],
    checklist: [
      'The newest acceptance list covers 2024–26, but the newest matriculation list is the Class of 2023. Where did the Classes of 2024–2026 actually enroll?',
      'With 105 seniors and four counselors, what is the actual caseload per counselor across all four Upper School grades?',
      'Has Cannon had any National Merit Semifinalists, Finalists or Commended Students in recent years? Nothing is published in any year.',
      'AP exams are optional here. What share of students in AP and AT courses actually sit the exam, what share scored 4 or 5 rather than just 3+ — and does the 90.16% count students or exams?',
      'What were the total merit-scholarship offers for the last graduating class? No dollar figure is published anywhere.',
      'Your 2024–25 profile declined to report Class of 2025 test scores on test-optional principle, then the 2025–26 profile published them for that same class. What changed?',
      'As printed, the Class of 2026 weighted top-10% band (4.08–4.28) overlaps the middle 50% (3.93–4.11). How is the top 10% defined?',
      'What does the student-facing counseling curriculum look like grade by grade — how many one-on-one meetings, and when do essays start?',
    ],
    flags: [],
    sources: [
      { label: 'cannonschool.org — College Counseling', url: COUNSELING },
      { label: '2026–27 School Profile', url: PROFILE_2627 },
      { label: 'Verdict synthesised by the researcher from the sources cited on the cards above', },
    ],
  },
}
