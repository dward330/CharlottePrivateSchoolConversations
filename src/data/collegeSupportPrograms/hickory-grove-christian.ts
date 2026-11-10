// Hickory Grove Christian School (Charlotte, NC) — the six College Support cards.
//
// Transcribed from source-material/college-support/hickory-grove-christian/
// "Hickory Grove Christian - College Support - School Profile 2026-2027.md" (current)
// and "Hickory Grove Christian - College Support - School Profile.md" (the Fall 2025
// and Fall 2023 editions), which carry the source URLs and a year tag on every
// figure. The strong artifacts are the school's own three High School Profile PDFs —
// 2026–27 (current), Fall 2025 and Fall 2023 — all bearing CEEB 340661 and the
// verbatim "does not rank its students" line.
//
// Two structural facts shape the cards:
//
//  1. THREE profile editions are published, and the numbers must never be blended:
//     attendance is the 2026–27 profile's "typical" split (no class year, no counts)
//     beside the Class of 2025's counted buckets; the acceptance lists are the
//     Classes of 2023, 2025 and 2026; test scores are the Class of 2026 (final) and
//     the Class of 2024; AP is May 2026. Every figure below keeps its year.
//  2. The grading scale changed mid-2024 — the Honors/AP quality-point bonuses were
//     HALVED (Honors +1 → +½, AP +2 → +1). Both scales are published; transcripts
//     of the Classes of 2025 through 2027 span both.
//
// The acceptance list is the union of the three published class lists (2023 +
// 2025–2026; no Class of 2024 list was published),
// deduplicated, spellings preserved verbatim including the profile's own apparent
// typos ("Clafin", "Deleware", "Coker University"). It carries no matriculation
// markings, so `enrolling` is set on NO college. Buckets are scored against the
// 2027 U.S. News tables; the US News rank label resolves from the single-source
// master src/data/collegeRankings.ts via rankLabelFor(name), not stored here.
//
// Not published, and rendered as gaps rather than guessed: class rank (explicit —
// the school does not rank); the counselor caseload (computed only); counseling
// tools (Naviance/SCOIR/Common App) and NCAA code; a per-exam AP 1–5 distribution;
// and SAT/ACT percentile bands (only means/medians are published, so every
// wholeClass table sets noPercentiles).

import type { CollegeSupportProgram } from '../collegeSupport.ts'

const PROFILE_26 =
  'https://resources.finalsite.net/images/v1790771210/hgchristianorg/l6paia83bjrvwh9kpm20/2026-2027SchoolProfile.pdf'
const PROFILE_25 =
  'https://resources.finalsite.net/images/v1759254561/hgchristianorg/zymp8lu0k9m6ndgumpgi/HGCSHSProfileFall25.pdf'
const PROFILE_23 =
  'https://resources.finalsite.net/images/v1699879706/hgchristianorg/obmpbhs6ludijizshc8k/HGCSHSProfileFall23.pdf'
const GUIDANCE = 'https://www.hgchristian.org/academics/guidance'
const HIGH_SCHOOL = 'https://www.hgchristian.org/academics/high-school'
const USNEWS = 'https://www.usnews.com/best-colleges/rankings/national-universities'

/* The acceptance list — the union of the school's Class of 2023 (81), Class of 2025
   (86) and Class of 2026 (76) published lists, deduplicated to 158 distinct
   institutions. Spellings are preserved verbatim from the profiles, including
   apparent typos. Three 2026 respellings fold onto existing rows (Anderson
   University → "(SC)", "University of Tennessee, Knoxville", "University of
   Illinois, Urbana-Champaign"). The 2026 list's bare "Xavier University" is the
   Ohio university by its official name, a separate row from Xavier University of
   Louisiana. Entries carry only { name, cats }; the US News rank label resolves
   from the master. No edition marks matriculation, so `enrolling` is set on NO
   entry. */
const colleges = [
  {"name":"American University","cats":[]},
  {"name":"Anderson University (SC)","cats":[]},
  {"name":"Appalachian State University","cats":[]},
  {"name":"Auburn University","cats":["p4"]},
  {"name":"Belmont Abbey College","cats":[]},
  {"name":"Benedict College","cats":["hbcu"]},
  {"name":"Boston University","cats":["nu75"]},
  {"name":"Campbell University","cats":[]},
  {"name":"Cape Fear Community College","cats":[]},
  {"name":"Catawba College","cats":[]},
  {"name":"Catholic University of America","cats":[]},
  {"name":"Central Piedmont Community College","cats":[]},
  {"name":"Charleston Southern University","cats":[]},
  {"name":"Clafin University","cats":["hbcu"]},
  {"name":"Clemson University","cats":["p4"]},
  {"name":"Clinton College","cats":["hbcu"]},
  {"name":"Coker University","cats":[]},
  {"name":"College of Charleston","cats":[]},
  {"name":"Columbia International University","cats":[]},
  {"name":"Concord University","cats":[]},
  {"name":"Covenant College","cats":[]},
  {"name":"Deleware State University","cats":["hbcu"]},
  {"name":"East Carolina University","cats":[]},
  {"name":"Eckerd College","cats":[]},
  {"name":"Elizabeth City State University","cats":["hbcu"]},
  {"name":"Elon University","cats":[]},
  {"name":"Emory & Henry College","cats":[]},
  {"name":"Florida Institute of Technology","cats":[]},
  {"name":"Florida Southern College","cats":[]},
  {"name":"Fordham University","cats":[]},
  {"name":"Francis Marion University","cats":[]},
  {"name":"Furman University","cats":["lac75"]},
  {"name":"Gardner-Webb University","cats":[]},
  {"name":"Geneva College","cats":[]},
  {"name":"George Mason University","cats":[]},
  {"name":"Georgia Institute of Technology","cats":["nu75","p4"]},
  {"name":"Georgia Southern University","cats":[]},
  {"name":"Greensboro College","cats":[]},
  {"name":"Hawaii Pacific University","cats":[]},
  {"name":"High Point University","cats":[]},
  {"name":"Hofstra University","cats":[]},
  {"name":"Indiana Wesleyan University","cats":[]},
  {"name":"James Madison University","cats":[]},
  {"name":"Johnson C. Smith University","cats":["hbcu"]},
  {"name":"Lenoir-Rhyne University","cats":[]},
  {"name":"Liberty University","cats":[]},
  {"name":"Limestone University","cats":[]},
  {"name":"Louisburg College","cats":[]},
  {"name":"Manhattan University","cats":[]},
  {"name":"Mars Hill University","cats":[]},
  {"name":"Meredith College","cats":[]},
  {"name":"Michigan State University","cats":["nu75","p4"]},
  {"name":"Montreat College","cats":[]},
  {"name":"Morgan State University","cats":["hbcu"]},
  {"name":"Mount Saint Mary College","cats":[]},
  {"name":"New York Institute of Technology","cats":[]},
  {"name":"Newberry College","cats":[]},
  {"name":"North Carolina A&T State University","cats":["hbcu"]},
  {"name":"North Carolina Central University","cats":["hbcu"]},
  {"name":"North Carolina State University","cats":["nu75","p4"]},
  {"name":"North Greenville University","cats":[]},
  {"name":"Ohio University","cats":[]},
  {"name":"Palm Beach Atlantic University","cats":[]},
  {"name":"Penn State University, Brandywine","cats":[]},
  {"name":"Penn State University, Harrisburg","cats":[]},
  {"name":"Penn State University, University Park","cats":["nu75","p4"]},
  {"name":"Purdue University","cats":["nu75","p4"]},
  {"name":"Queens University of Charlotte","cats":[]},
  {"name":"Rensselaer Polytechnic Institute","cats":["nu75"]},
  {"name":"Roanoke College","cats":[]},
  {"name":"Robert Morris University","cats":[]},
  {"name":"Rochester Institute of Technology","cats":[]},
  {"name":"Rollins College","cats":[]},
  {"name":"Rowan-Cabarrus Community College","cats":[]},
  {"name":"Rutgers University, New Brunswick","cats":["nu75","p4"]},
  {"name":"South Carolina State University","cats":["hbcu"]},
  {"name":"Southeastern Baptist Theological Seminary","cats":[]},
  {"name":"Southwestern University","cats":[]},
  {"name":"St. Andrews University","cats":[]},
  {"name":"Suffolk University","cats":[]},
  {"name":"The University of Tennessee, Knoxville","cats":['p4']},
  {"name":"Tuskegee University","cats":["hbcu"]},
  {"name":"Union Commonwealth University","cats":[]},
  {"name":"University of Albany","cats":[]},
  {"name":"University of California, Davis","cats":["nu75"]},
  {"name":"University of California, Santa Barbara","cats":["nu75"]},
  {"name":"University of Connecticut","cats":["nu75"]},
  {"name":"University of Georgia","cats":["nu75","p4"]},
  {"name":"University of Massachusetts, Boston","cats":[]},
  {"name":"University of Minnesota, Twin Cities","cats":["nu75","p4"]},
  {"name":"University of Mississippi","cats":["p4"]},
  {"name":"University of North Carolina at Asheville","cats":[]},
  {"name":"University of North Carolina at Chapel Hill","cats":["nu75","p4"]},
  {"name":"University of North Carolina at Charlotte","cats":[]},
  {"name":"University of North Carolina at Greensboro","cats":[]},
  {"name":"University of North Carolina at Pembroke","cats":[]},
  {"name":"University of North Carolina at Wilmington","cats":[]},
  {"name":"University of South Alabama","cats":[]},
  {"name":"University of South Carolina","cats":["p4"]},
  {"name":"University of South Carolina, Union","cats":[]},
  {"name":"University of Tampa","cats":[]},
  {"name":"Virginia Polytechnic Institute & State University","cats":["nu75","p4"]},
  {"name":"Voorhees University","cats":["hbcu"]},
  {"name":"Western Carolina University","cats":[]},
  {"name":"Wheeling University","cats":[]},
  {"name":"Wingate University","cats":[]},
  {"name":"Winston-Salem State University","cats":["hbcu"]},
  {"name":"Winthrop University","cats":[]},
  {"name":"Wofford College","cats":["lac75"]},
  {"name":"Xavier University","cats":[]},
  {"name":"York Technical College","cats":[]},
  {"name":"Alabama A&M University","cats":["hbcu"]},
  {"name":"Arizona State University","cats":["p4"]},
  {"name":"Baylor University","cats":["p4"]},
  {"name":"Bowdoin College","cats":["lac75"]},
  {"name":"Bridgewater College","cats":[]},
  {"name":"Carolina University","cats":[]},
  {"name":"Claremont McKenna College","cats":["lac75"]},
  {"name":"Coastal Carolina University","cats":[]},
  {"name":"Colgate University","cats":["lac75"]},
  {"name":"Converse University","cats":[]},
  {"name":"Fisk University","cats":["hbcu"]},
  {"name":"Florida A&M University","cats":["hbcu"]},
  {"name":"Grand Canyon University","cats":[]},
  {"name":"Grinnell College","cats":["lac75"]},
  {"name":"Hampton University","cats":["hbcu"]},
  {"name":"Houghton University","cats":[]},
  {"name":"Howard University","cats":["hbcu","nu75"]},
  {"name":"Indiana University at Bloomington","cats":["nu75","p4"]},
  {"name":"Johnson & Wales University","cats":[]},
  {"name":"Lee University","cats":[]},
  {"name":"Mercer University","cats":[]},
  {"name":"Morehouse College","cats":["hbcu"]},
  {"name":"Northeastern University","cats":["nu75"]},
  {"name":"Oberlin College","cats":["lac75"]},
  {"name":"Pfeiffer University","cats":[]},
  {"name":"Pomona College","cats":["lac75"]},
  {"name":"Saint Augustine's University","cats":["hbcu"]},
  {"name":"Stony Brook University","cats":["nu75"]},
  {"name":"Syracuse University","cats":["nu75","p4"]},
  {"name":"Tennessee State University","cats":["hbcu"]},
  {"name":"The Ohio State University","cats":["nu75","p4"]},
  {"name":"The University of Alabama","cats":["p4"]},
  {"name":"University of California, Riverside","cats":[]},
  {"name":"University of California, Santa Cruz","cats":[]},
  {"name":"University of Illinois at Urbana-Champaign","cats":["nu75","p4"]},
  {"name":"University of Iowa","cats":["p4"]},
  {"name":"University of Massachusetts, Amherst","cats":["nu75"]},
  {"name":"University of Miami","cats":["nu75","p4"]},
  {"name":"University of Oregon","cats":["p4"]},
  {"name":"University of Pittsburgh","cats":["nu75","p4"]},
  {"name":"University of Washington","cats":["nu75","p4"]},
  {"name":"Virginia State University","cats":["hbcu"]},
  {"name":"Wake Forest University","cats":["nu75","p4"]},
  {"name":"Walters State Community College","cats":[]},
  { name: 'Washington & Lee', cats: ['lac75'] },
  { name: 'Xavier University of Louisiana', cats: ['hbcu'] },
  { name: 'York College of Pennsylvania', cats: [] },
]

export const hickoryGroveChristian: CollegeSupportProgram = {
  /* The area's SECOND card, after Where Graduates Go. Unlike every other card here, these figures are
     GOVERNMENT-published — the UNC System's Insight dashboard, pulled via the
     nc-admissions-data skill — rather than the school’s own marketing number.
     Full per-term counts, the exact filter values and the provenance header are in
     source-material/college-support/hickory-grove-christian/
     Hickory Grove Christian School - College Support - UNC System Admissions.md.

     Every rate ships with its denominator: these are small cells, and a bare
     percentage off a single-digit base is not publishable. The five-year figure is
     POOLED — sum(admitted)/sum(applied) over the five most recent terms — never the
     mean of the five annual rates. */
  ncAdmissions: {
    headline:
      'Across the six top-ranked NC public universities, Hickory Grove Christian School’s applicants were admitted at a pooled 74.9% over the last five entering classes — 256 acceptances from 342 applications.',
    subhead:
      'UNC-Chapel Hill is the hard one: 20.0% in Fall 2025 — 2 of 10 — against far higher rates at the less-selective universities. These are UNC-system figures published by the state, not the school’s own.',
    stats: [
      { value: '342', label: 'applications to the six universities, Fall 2021–2025' },
      { value: '74.9%', label: 'pooled admit rate — 256 of 342 across those five classes' },
      { value: '20.0%', label: 'at UNC-Chapel Hill — 2 of 10, the toughest of the six for this school' },
      { value: 'UNC Charlotte', label: 'drew the most applications in Fall 2025 (25)' },
    ],
    latestTerm: '2025',
    universities: [
      {
        key: 'unc-chapel-hill',
        name: 'UNC-Chapel Hill',
        rank: 1,
        note: 'Flagship · Chapel Hill · the most selective of the six',
        applied: '10',
        accepted: '2',
        rate: '20.0%',
        ratePct: 0.2,
        fiveYearRate: '26.7%',
        fiveYearApplied: '45',
        fiveYearAccepted: '12',
      },
      {
        key: 'nc-state-university',
        name: 'NC State University',
        rank: 2,
        note: 'Flagship STEM · Raleigh',
        applied: '19',
        accepted: '10',
        rate: '52.6%',
        ratePct: 0.526,
        fiveYearRate: '53.9%',
        fiveYearApplied: '76',
        fiveYearAccepted: '41',
      },
      {
        key: 'unc-charlotte',
        name: 'UNC Charlotte',
        rank: 3,
        note: 'Hometown campus',
        applied: '25',
        accepted: '21',
        rate: '84.0%',
        ratePct: 0.84,
        fiveYearRate: '91.6%',
        fiveYearApplied: '107',
        fiveYearAccepted: '98',
      },
      {
        key: 'east-carolina-university',
        name: 'East Carolina University',
        rank: 4,
        note: 'Greenville · eastern NC',
        applied: '5',
        accepted: '5',
        rate: '100.0%',
        ratePct: 1,
        fiveYearRate: '91.7%',
        fiveYearApplied: '36',
        fiveYearAccepted: '33',
      },
      {
        key: 'unc-wilmington',
        name: 'UNC Wilmington',
        rank: 5,
        note: 'Coastal · mid-selectivity',
        applied: '8',
        accepted: '7',
        rate: '87.5%',
        ratePct: 0.875,
        fiveYearRate: '91.3%',
        fiveYearApplied: '46',
        fiveYearAccepted: '42',
      },
      {
        key: 'unc-greensboro',
        name: 'UNC Greensboro',
        rank: 6,
        note: 'Piedmont Triad · largest admit rates of the six',
        applied: '6',
        accepted: '6',
        rate: '100.0%',
        ratePct: 1,
        fiveYearRate: '93.8%',
        fiveYearApplied: '32',
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
  /* ------------------------------------------------------- transcript ------ */
  transcript: {
    headline:
      '85 students sat 176 AP exams in May 2026 across a 17-course AP program with AP Capstone — and 14 of them earned a 5 on at least one exam.',
    subhead:
      'A college-prep school, built on a biblical worldview, that does not rank students. The transcript rests on a weighted GPA, with a quality-point bonus for honors and AP courses. Its AP catalog reaches as far as AP Seminar and AP Research.',
    stats: [
      { value: '17 + Capstone', label: 'AP courses, plus the AP Seminar → Research Capstone track' },
      { value: '85 / 176', label: 'AP students / exams, May 2026 (14 earned a 5 on ≥1 exam)' },
      { value: 'No rank', label: 'the school does not rank its students' },
      { value: '340661', label: 'CEEB code' },
    ],
    meritTitle: 'National recognition — the profile’s 2020–2026 window',
    merit: [
      { year: '2020–2026', detail: 'National Merit — 1 Finalist and 8 Commended Students across the seven-year profile window.' },
      { year: '2020–2026', detail: 'College Board National Recognition — 8 National African American and 6 National Hispanic Recognition awardees.' },
      { year: '2024–2025', detail: 'AP Scholars — 18 AP Scholars, 6 with Honors, 10 with Distinction, plus 3 AP Capstone Diplomas.' },
    ],
    meritNote:
      'Figures are cumulative windows the profile prints, not single-year counts. The Fall 2023 profile carried a smaller window (1 Finalist / 5 Commended; 11 AP Scholars), so the program is growing.',
    depthTitle: 'What the AP record rests on',
    depth: [
      {
        label: 'A broad AP catalog',
        text: 'The school advertises **17 AP courses plus AP Capstone** (AP Seminar + AP Research). The 2026–27 profile names 13 by title. Calculus BC and Psychology are no longer printed, and Human Geography is back. The 2023 profile named 17, covering every title any edition has printed. So which of them run varies from year to year.',
      },
      {
        label: 'Real depth in the scores',
        text: '**14 students earned a 5 on one or more AP exams in May 2026** (38 a 4, 50 a 3) — these are students-scoring-X counts, which overlap, not a per-exam distribution the school does not publish.',
      },
      {
        label: 'Dual enrollment beyond AP',
        text: 'Courses taught on campus are credited through **Judson College** (2026–27 profile; earlier years went through the College at Southeastern). Only courses taught by HGCS teachers carry dual credit. Students also take **NC Career & College Promise** courses at local community colleges.',
      },
    ],
    trustTitle: 'How the grade is framed',
    trust: [
      {
        label: 'Weighted, and does not rank',
        text: 'The school **does not rank students** (verbatim, both profiles). GPA averages regular and weighted courses together on a 4.0 base.',
      },
      {
        label: 'The weighting was halved mid-2024',
        text: 'Under the current (Spring 2024 and beyond) scale, **Honors courses earn +½ a quality point and AP courses +1** — down from +1 and +2 on the 2016–17 scale. Transcripts of the Classes of 2025 through 2027 span both scales.',
      },
      {
        label: '27 units to graduate',
        text: 'Bible 4 · English 4 · Math 4 · Social Studies 4 · Science 3 · Foreign Language 2 · Health/PE 1 · Fine Arts 1 · Electives 4 — a Bible credit every year is part of the required load.',
      },
    ],
    flags: [
      {
        kind: 'verify',
        text: 'No per-exam AP 1–5 distribution is published — only the overlapping "students who earned a 5 / 4 / 3 on at least one exam" counts. The "17 AP courses" marketing figure and the profile\'s shorter named list (13) are reconciled here as catalog-vs-offered-this-year, not a contradiction.',
      },
      {
        kind: 'verify',
        text: 'The 2026–27 profile prints AP Scholar counts of 18 AP Scholars, 6 with Honors, 10 with Distinction and 3 AP Capstone Diplomas under the label "2024-2025". The 2025–26 profile printed 22 / 5 / 10 / 4 under the same label. The school has not said which is right; the newer edition is shipped. Re-check against the next profile.',
      },
    ],
    sources: [
      { label: 'hgchristian.org — 2026–27 High School Profile (CEEB, AP list, grading scale, May 2026 AP results, recognition)', url: PROFILE_26 },
      { label: 'hgchristian.org — Fall 2025 High School Profile (the earlier AP Scholar counts)', url: PROFILE_25 },
      { label: 'hgchristian.org — Fall 2023 High School Profile (prior-year window)', url: PROFILE_23 },
      { label: 'hgchristian.org — High School (AP + full honors track, dual enrollment)', url: HIGH_SCHOOL },
    ],
  },

  /* ------------------------------------------------------- counseling ------ */
  counseling: {
    headline:
      'A two-person counseling office — a Director of Counseling and an Administrator for Student Services — running a biblical-worldview program of 1:1 meetings, guidance lunches and parent-night sessions.',
    subhead:
      'The school does not publish how many seniors each counselor serves. Using the Class of 2025 senior count, the latest it has published, the ratio works out to roughly 34:1 across the two staff. Across all 287 high-school students, it is about 144:1.',
    stats: [
      { value: '2', label: 'named counseling staff (Bennett + Similton)' },
      { value: '≈34:1', label: 'seniors per counselor — computed, not published' },
      { value: '287', label: 'high-school students (2026–27)' },
      { value: 'No tools', label: 'Naviance / SCOIR / Common App account not published' },
    ],
    roster: [
      {
        role: 'Director of Counseling',
        name: 'Tracey Bennett',
        detail: 'Listed as "Guidance Counselor" on the Fall 2023 profile and "Director of Counseling" since Fall 2025 — the lead college-counseling contact.',
        email: 'traceybennett@hgchristian.org',
      },
      {
        role: 'Administrator for Student Services',
        name: 'Dr. Mildred Similton',
        detail: 'Oversees student services alongside the counseling office.',
        email: 'mildredsimilton@hgchristian.org',
      },
    ],
    mechanicsTitle: 'What the guidance office publishes',
    mechanics: [
      'Biblical-worldview counseling',
      'One-on-one meetings',
      'Guidance lunches',
      'Parent-night sessions',
      'Standardized-testing support',
      'College & career planning',
    ],
    mechanicsNote:
      'The guidance page describes these as its program. It does not publish a grade-by-grade timeline. None of the profiles or the guidance page names an application platform (Naviance / SCOIR / Common App) or an NCAA code.',
    // No published four-year timeline — the guidance page lists a program, not a
    // grade-by-grade cadence — so the timeline block is left empty per the type's
    // "empty where a school publishes no four-year cadence" contract.
    timeline: [],
    reach: [
      'Two named counseling staff serve the whole high school — no separate college-only counselor is published',
      'A "College Admissions Boot Camp" summer program (rising juniors & seniors) is run by the counseling staff, including 1–2 campus visits',
    ],
    flags: [
      {
        kind: 'verify',
        text: 'No senior-class size or seniors-per-counselor ratio is published. The ≈34:1 figure is computed from the Class of 2025 bucket counts (43 + 15 + 7 + 2 = 67 graduates) against the two counseling staff; the ≈144:1 school-wide figure uses all 287 high-school students. Both are derived, not stated. The 2026–27 profile prints attendance shares without counts, so no newer senior count exists.',
      },
    ],
    sources: [
      { label: 'hgchristian.org — 2026–27 High School Profile (counselor roster, enrollment)', url: PROFILE_26 },
      { label: 'hgchristian.org — Fall 2025 High School Profile (Class of 2025 attendance counts behind the ≈34:1)', url: PROFILE_25 },
      { label: 'hgchristian.org — Guidance (program description)', url: GUIDANCE },
      { label: 'Our Staff directory (counselor email addresses)', url: 'https://www.hgchristian.org/about-us/our-staff' },
    ],
  },

  /* --------------------------------------------------------- outcomes ------ */
  outcomes: {
    headline:
      '158 different colleges appear on the school\'s three published acceptance lists (Classes of 2023, 2025 and 2026). They run from Bowdoin, Pomona, Georgia Tech and Boston University to many NC public colleges, Christian colleges and HBCUs (historically Black colleges).',
    subhead:
      'The lists carry no markings showing where students enrolled, so they read as acceptances. No Class of 2024 list was published. Here the three lists are combined, with repeats removed, and scored against the current U.S. News tiers.',
    stats: [
      { value: '158', label: 'institutions across the 2023, 2025 and 2026 acceptance lists' },
      { value: '65%', label: 'of graduates typically attend a 4-year college (25% 2-year; 10% work, military or gap year)' },
      { value: '9', label: 'Top-75 Liberal Arts colleges on the list' },
      { value: '23', label: 'HBCUs on the list' },
    ],
    buckets: [
      { tier: 'Ivy League', count: '0 / 8' },
      { tier: '“Ivy Plus”', count: '0 / 17' },
      { tier: 'Top-75 National Universities', count: '27 / 75' },
      { tier: 'Top-75 Liberal Arts', count: '9 / 75', note: '— incl. Bowdoin, Pomona, Claremont McKenna, Grinnell, Colgate, Washington & Lee' },
      { tier: 'Power Four', count: '28 / 68' },
      { tier: 'HBCUs', count: '23 / 107', note: '— incl. Howard, Hampton, Morehouse, Tuskegee, NC A&T, Florida A&M' },
    ],
    collegesTitle: 'Every named acceptance (2023 + 2025–2026)',
    colleges,
    collegesTotal: '158 institutions across three published class lists · no enrollment markings',
    scholarships: [
      'No scholarship dollar totals published',
      'No per-college enrollment markings — acceptances only',
      'HBCU strength: 23 HBCUs across the three lists',
    ],
    scholarshipsNote:
      'The profiles publish acceptance lists and recognition counts, but no scholarship-offer totals or named-award ledger.',
    flags: [
      {
        kind: 'verify',
        text: 'Bucket membership near the Top-75 line should be re-confirmed against the live U.S. News edition at ingest. HBCU membership was checked per institution. The list holds both "Xavier University of Louisiana" (2023 list, an HBCU) and "Xavier University" (2026 list, printed bare, read as the Ohio university by its official name, untagged).',
      },
    ],
    sources: [
      { label: 'hgchristian.org — 2026–27 High School Profile (Class of 2026 list, attendance split)', url: PROFILE_26 },
      { label: 'hgchristian.org — Fall 2025 High School Profile (Class of 2025 list)', url: PROFILE_25 },
      { label: 'hgchristian.org — Fall 2023 High School Profile (Class of 2023 list)', url: PROFILE_23 },
      { label: 'U.S. News 2027 rankings (tier scoring)', url: USNEWS },
    ],
  },

  /* ------------------------------------------------------------- edge ------ */
  edge: {
    headline:
      'The edge here is a broad-participation AP program with AP Capstone and a growing National-recognition record, set inside an explicitly biblical-worldview college-prep school.',
    subhead:
      'What the school hands a family is a real AP catalog and a decade of College Board recognitions; what it does not publish is a research-program or national-competition track.',
    levers: [
      {
        title: 'Lever 1 — Build the record',
        hint: 'what your child brings',
        glyph: '◆',
        items: [
          '**A 17-course AP program with AP Capstone** — the AP Seminar → AP Research sequence produced 3 AP Capstone Diplomas in the profile’s 2024–25 window, and 85 students sat 176 exams in May 2026.',
          '**A widening recognition record** — 1 National Merit Finalist and 8 Commended over 2020–2026, up from 1/5 in the 2019–2023 window, plus 14 College Board National African American / Hispanic recognitions.',
          '**Dual-enrollment credit** — courses credited through Judson College (prior years, the College at Southeastern) and NC Career & College Promise at community colleges.',
        ],
      },
      {
        title: 'Lever 2 — What the office brings',
        hint: 'what the building lends the file',
        glyph: '▲',
        items: [
          '**A clear, no-rank transcript** — the school does not rank. It publishes both grading scales and the honors/AP weighting, so a reader can judge how hard a student’s courses were.',
          '**A signature summer on-ramp** — the counseling office runs a College Admissions Boot Camp for rising juniors and seniors, with campus visits.',
          '**A deep HBCU and NC-public pipeline** — 23 HBCUs and the full NC public system appear across the three acceptance lists, matching the school\'s applicant base.',
        ],
        note: 'No research program, Olympiad results, or national-competition credentials are published — the differentiators are AP breadth and legibility, not competition results.',
      },
    ],
    flags: [],
    sources: [
      { label: 'hgchristian.org — 2026–27 High School Profile', url: PROFILE_26 },
      { label: 'hgchristian.org — Guidance', url: GUIDANCE },
    ],
  },

  /* -------------------------------------------------------- wholeClass ----- */
  wholeClass: {
    headline:
      'The school publishes class means — not percentile distributions — and it says so: small tester counts (SAT n=45) are disclosed on the profile itself.',
    subhead:
      'Test scores are the Class of 2026’s, the same class as the newest acceptance list; the counted attendance split is the Class of 2025’s. Every table below is means, so none carries a percentile header.',
    scoreTables: [
      {
        title: 'ACT & SAT — class means',
        hint: '— both are means; Class of 2026',
        noPercentiles: true,
        rows: [
          { label: 'ACT Composite (mean)', values: ['20.5'] },
          { label: 'SAT Composite (mean)', values: ['1066'] },
        ],
        note: 'Class of 2026: ACT mean 20.5 (n=79, range 12–31); SAT mean 1066 (n=45, range 760–1400). The 2025–26 profile printed a SAT median for the same class mid-year (1090, n=20). Class of 2024: ACT mean 19.7 (n=63); SAT median 1110 (n=12).',
      },
      {
        title: 'AP recognition — count tiers (2024–25 window)',
        hint: '— AP Scholar tiers, 2024–25 (counts, not a percentile distribution)',
        noPercentiles: true,
        rows: [
          { label: 'AP Scholars', values: ['18'] },
          { label: 'AP Scholars with Distinction', values: ['10'] },
          { label: 'AP Scholars with Honors', values: ['6'] },
          { label: 'AP Capstone Diplomas', values: ['3'] },
        ],
        note: 'Count tiers, not percentiles — the profile publishes AP Scholar awardee counts, not an AP score distribution.',
      },
    ],
    quintiles: [],
    gpaNote:
      'No GPA distribution or quintile table is published — the school does not rank, and prints no GPA quantiles. The published grading scales (§transcript) are the entire GPA disclosure.',
    support: [
      {
        label: 'Educational Support Services',
        text: 'Fee-based **Educational Support Services (ESS)** work under an annual contract and serve K through 12th grade. They offer accommodations plans built from educational testing or a prior 504/IEP. They also offer approved testing accommodations and high school Academic Coaching.',
      },
    ],
    middle: [
      {
        label: 'The list matches a broad class',
        text: 'The three acceptance lists run from Bowdoin, Pomona, Georgia Tech and Boston University through the full NC public system. That includes Chapel Hill, NC State, Charlotte, Wilmington, Greensboro, Asheville and Pembroke. Christian colleges, HBCUs and community colleges (Central Piedmont, Cape Fear, Rowan-Cabarrus) appear too. That is the spread of a broad class, not one that is elite all the way through.',
      },
      {
        label: 'Non-4-year paths are real',
        text: 'The 2026–27 profile puts typical plans after high school at 65% 4-year college, 25% 2-year college and 10% work, military or a gap year. The Class of 2025 is the last year printed with counts. It had 22% planning a 2-year college and 11% choosing not to pursue higher education. The acceptance list reflects this, with community colleges and trade paths on it.',
      },
    ],
    flags: [
      {
        kind: 'gap',
        text: 'No score percentiles, GPA quintiles or outcomes by quintile are published. There are only class averages and medians (with the number of testers shown) and AP award tiers. The shape of the class cannot be worked out from public sources.',
      },
    ],
    sources: [
      { label: 'hgchristian.org — 2026–27 High School Profile (Class of 2026 test means, AP tiers, attendance split)', url: PROFILE_26 },
      { label: 'hgchristian.org — Fall 2025 High School Profile (mid-year Class of 2026 SAT median, Class of 2025 attendance)', url: PROFILE_25 },
      { label: 'hgchristian.org — Fall 2023 High School Profile (prior-year test means)', url: PROFILE_23 },
    ],
  },

  /* ---------------------------------------------------------- verdict ------ */
  verdict: {
    headline:
      'A college-prep school with a biblical worldview, a real AP-and-Capstone program and a growing record of awards. The small tester counts and the unpublished caseload are the two things a visit should probe.',
    subhead:
      'The AP catalog and the three-class acceptance record are the real strengths; the quantitative profile is thin by design (means, not distributions) and the counseling caseload is never stated.',
    points: [
      {
        label: 'The AP story is real and broad',
        text: '17 AP courses with AP Capstone, 176 exams taken in May 2026, 14 students earning a 5 on at least one, and 3 AP Capstone Diplomas. That is a program with real depth for a school this size.',
      },
      {
        label: 'Recognition is growing',
        text: 'National Merit (1 Finalist / 8 Commended) and 14 College Board National recognitions over 2020–2026, both up from the 2019–2023 window.',
      },
      {
        label: 'A two-person counseling office',
        text: 'A Director of Counseling and an Administrator for Student Services run the program, but the senior caseload is never published — the ≈34:1 figure here is computed, so ask it directly.',
      },
      {
        label: 'Outcomes show breadth over three classes',
        text: '158 institutions across the 2023, 2025 and 2026 lists — Bowdoin and Pomona at the top, 23 HBCUs, the full NC public system. But the lists do not mark where students enrolled, so they show acceptances, not enrollment.',
      },
      {
        label: 'The quantitative profile is thin by design',
        text: 'The school publishes class averages based on small numbers of testers (SAT n=45). It publishes no percentile spread or GPA table, and it does not rank. So the shape of the class is not public.',
      },
    ],
    checklist: [
      'How many seniors does each of the two counselors carry, and is there a college-only counselor at peak season?',
      'Which of the 17 AP courses actually run in 2026–27 — the profile names 13, the catalog lists 17?',
      'The acceptance lists mark no enrollments. Where did the Classes of 2024, 2025 and 2026 actually enroll, and how many went to each college?',
      'How does the school document and support College Board and ACT testing accommodations for a student with an ESS accommodations plan?',
      'Only 45 students took the SAT and 79 the ACT — what share of the class tests, and how is test-optional handled?',
      'How does the College Admissions Boot Camp fit the application calendar, and is it open to all rising juniors and seniors?',
    ],
    flags: [],
    sources: [
      { label: 'Verdict synthesized by the researcher from the sources cited on the cards above' },
    ],
  },
}


