// Hickory Grove Christian School (Charlotte, NC) — the six College Support cards.
//
// Transcribed from source-material/college-support/hickory-grove-christian/
// "Hickory Grove Christian - College Support - School Profile.md", which carries
// the source URLs and a year tag on every figure. The strong artifacts are the
// school's own two High School Profile PDFs — Fall 2025 (current) and Fall 2023 —
// both bearing CEEB 340661 and the verbatim "does not rank its students" line.
//
// Two structural facts shape the cards:
//
//  1. TWO profile years are published, and the numbers must never be blended:
//     outcomes are Class of 2025 (current) and Class of 2023; test scores are the
//     ENTERING Class of 2026 and Class of 2024; AP is May 2025 and May 2023. Every
//     figure below keeps its year.
//  2. The grading scale changed mid-2024 — the Honors/AP quality-point bonuses were
//     HALVED (Honors +1 → +½, AP +2 → +1). Both scales are published; a Class of
//     2025 transcript spans both.
//
// The acceptance list is the union of the two published class lists (2023 + 2025),
// deduplicated, spellings preserved verbatim including the profile's own apparent
// typos ("Clafin", "Deleware", "Coker University"). It carries no matriculation
// markings, so `enrolling` is set on NO college. Buckets are scored against the
// 2026 U.S. News tables; the US News rank label resolves from the single-source
// master src/data/collegeRankings.ts via rankLabelFor(name), not stored here.
//
// Not published, and rendered as gaps rather than guessed: class rank (explicit —
// the school does not rank); the counselor caseload (computed only); counseling
// tools (Naviance/SCOIR/Common App) and NCAA code; a per-exam AP 1–5 distribution;
// and SAT/ACT percentile bands (only means/medians are published, so every
// wholeClass table sets noPercentiles).

import type { CollegeSupportProgram } from '../collegeSupport.ts'

const PROFILE_25 =
  'https://resources.finalsite.net/images/v1759254561/hgchristianorg/zymp8lu0k9m6ndgumpgi/HGCSHSProfileFall25.pdf'
const PROFILE_23 =
  'https://resources.finalsite.net/images/v1699879706/hgchristianorg/obmpbhs6ludijizshc8k/HGCSHSProfileFall23.pdf'
const GUIDANCE = 'https://www.hgchristian.org/academics/guidance'
const HIGH_SCHOOL = 'https://www.hgchristian.org/academics/high-school'
const USNEWS = 'https://www.usnews.com/best-colleges/rankings'

/* The acceptance list — the union of the school's Class of 2023 (81) and Class of
   2025 (86) published lists, deduplicated to 132 distinct institutions. Spellings
   are preserved verbatim from the profiles, including apparent typos. Entries carry
   only { name, cats }; the US News rank label resolves from the master. Nothing is
   marked as matriculating, so `enrolling` is set on NO entry. */
const colleges = [
  {"name":"Anderson University (SC)","cats":[]},
  {"name":"Appalachian State University","cats":[]},
  {"name":"Auburn University","cats":["p4"]},
  {"name":"Belmont Abbey College","cats":[]},
  {"name":"Campbell University","cats":[]},
  {"name":"Cape Fear Community College","cats":[]},
  {"name":"Catawba College","cats":[]},
  {"name":"Catholic University of America","cats":[]},
  {"name":"Central Piedmont Community College","cats":[]},
  {"name":"Charleston Southern University","cats":[]},
  {"name":"Clafin University","cats":["hbcu"]},
  {"name":"Clemson University","cats":["nu75","p4"]},
  {"name":"Clinton College","cats":["hbcu"]},
  {"name":"Coker University","cats":[]},
  {"name":"College of Charleston","cats":[]},
  {"name":"Concord University","cats":[]},
  {"name":"Deleware State University","cats":["hbcu"]},
  {"name":"East Carolina University","cats":[]},
  {"name":"Eckerd College","cats":[]},
  {"name":"Elizabeth City State University","cats":["hbcu"]},
  {"name":"Elon University","cats":[]},
  {"name":"Emory & Henry College","cats":[]},
  {"name":"Florida Institute of Technology","cats":[]},
  {"name":"Florida Southern College","cats":[]},
  {"name":"Fordham University","cats":[]},
  {"name":"Furman University","cats":["lac75"]},
  {"name":"Gardner-Webb University","cats":[]},
  {"name":"Geneva College","cats":[]},
  {"name":"Georgia Institute of Technology","cats":["nu75","p4"]},
  {"name":"Georgia Southern University","cats":[]},
  {"name":"Greensboro College","cats":[]},
  {"name":"High Point University","cats":[]},
  {"name":"Johnson C. Smith University","cats":["hbcu"]},
  {"name":"Lenoir-Rhyne University","cats":[]},
  {"name":"Liberty University","cats":[]},
  {"name":"Limestone University","cats":[]},
  {"name":"Louisburg College","cats":[]},
  {"name":"Manhattan University","cats":[]},
  {"name":"Mars Hill University","cats":[]},
  {"name":"Meredith College","cats":[]},
  {"name":"Michigan State University","cats":["nu75","p4"]},
  {"name":"Mount Saint Mary College","cats":[]},
  {"name":"New York Institute of Technology","cats":[]},
  {"name":"Newberry College","cats":[]},
  {"name":"North Carolina A&T State University","cats":["hbcu"]},
  {"name":"North Carolina Central University","cats":["hbcu"]},
  {"name":"North Carolina State University","cats":["nu75","p4"]},
  {"name":"North Greenville University","cats":[]},
  {"name":"Palm Beach Atlantic University","cats":[]},
  {"name":"Penn State University, Brandywine","cats":[]},
  {"name":"Penn State University, University Park","cats":["nu75","p4"]},
  {"name":"Queens University of Charlotte","cats":[]},
  {"name":"Rensselaer Polytechnic Institute","cats":["nu75"]},
  {"name":"Roanoke College","cats":[]},
  {"name":"Robert Morris University","cats":[]},
  {"name":"Rochester Institute of Technology","cats":[]},
  {"name":"Rollins College","cats":[]},
  {"name":"Rowan-Cabarrus Community College","cats":[]},
  {"name":"Rutgers University, New Brunswick","cats":["nu75","p4"]},
  {"name":"South Carolina State University","cats":["hbcu"]},
  {"name":"Southwestern University","cats":[]},
  {"name":"St. Andrews University","cats":[]},
  {"name":"Suffolk University","cats":[]},
  {"name":"The University of Tennessee, Knoxville","cats":[]},
  {"name":"Union Commonwealth University","cats":[]},
  {"name":"University of Albany","cats":[]},
  {"name":"University of Connecticut","cats":["nu75"]},
  {"name":"University of Massachusetts, Boston","cats":[]},
  {"name":"University of Minnesota, Twin Cities","cats":["nu75","p4"]},
  {"name":"University of Mississippi","cats":["p4"]},
  {"name":"University of North Carolina at Asheville","cats":[]},
  {"name":"University of North Carolina at Chapel Hill","cats":["nu75","p4"]},
  {"name":"University of North Carolina at Charlotte","cats":[]},
  {"name":"University of North Carolina at Greensboro","cats":[]},
  {"name":"University of North Carolina at Pembroke","cats":[]},
  {"name":"University of North Carolina at Wilmington","cats":[]},
  {"name":"University of South Carolina","cats":["p4"]},
  {"name":"University of South Carolina, Union","cats":[]},
  {"name":"Voorhees University","cats":["hbcu"]},
  {"name":"Western Carolina University","cats":[]},
  {"name":"Wingate University","cats":[]},
  {"name":"Winston-Salem State University","cats":["hbcu"]},
  {"name":"Winthrop University","cats":[]},
  {"name":"Wofford College","cats":["lac75"]},
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
  {"name":"Howard University","cats":["hbcu"]},
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
  {"name":"University of California, Riverside","cats":["nu75"]},
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
  /* The area's FIRST card. Unlike every other card here, these figures are
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
      'UNC-Chapel Hill is the hard one: 26.7% pooled there, against far higher rates at the less-selective campuses. These are UNC-system figures published by the state, not the school’s own.',
    stats: [
      { value: '342', label: 'applications to the six campuses, Fall 2021–2025' },
      { value: '74.9%', label: 'pooled admit rate — 256 of 342 across those five classes' },
      { value: '26.7%', label: 'at UNC-Chapel Hill — 12 of 45, the most selective of the six' },
      { value: 'UNC Charlotte', label: 'drew the most applications in Fall 2025 (25)' },
    ],
    latestTerm: '2025',
    universities: [
      {
        key: 'unc-chapel-hill',
        name: 'UNC-Chapel Hill',
        rank: 1,
        note: 'Flagship · the most selective of the six',
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
        note: 'Greenville · largest admit rates of the six',
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
        note: 'Piedmont Triad',
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
  /* ------------------------------------------------------- transcript ------ */
  transcript: {
    headline:
      '82 students sat 176 AP exams in May 2025 across a 17-course AP program with AP Capstone — and 29 of them earned a 5 on at least one exam.',
    subhead:
      'A biblical-worldview college-prep school that does not rank; the transcript rests on a weighted GPA with an honors and AP quality-point bonus, and an AP catalog that reaches AP Seminar and AP Research.',
    stats: [
      { value: '17 + Capstone', label: 'AP courses, plus the AP Seminar → Research Capstone track' },
      { value: '82 / 176', label: 'AP students / exams, May 2025 (29 earned a 5 on ≥1 exam)' },
      { value: 'No rank', label: 'the school does not rank its students' },
      { value: '340661', label: 'CEEB code' },
    ],
    meritTitle: 'National recognition — a 10-year window (2019–2025)',
    merit: [
      { year: '2019–2025', detail: 'National Merit — 1 Finalist and 7 Commended Students across the seven-year profile window.' },
      { year: '2019–2025', detail: 'College Board National Recognition — 8 National African American and 6 National Hispanic Recognition awardees.' },
      { year: '2024–2025', detail: 'AP Scholars — 22 AP Scholars, 5 with Honors, 10 with Distinction, plus 4 AP Capstone Diplomas.' },
    ],
    meritNote:
      'Figures are cumulative windows the profile prints, not single-year counts. The Fall 2023 profile carried a smaller window (1 Finalist / 5 Commended; 11 AP Scholars), so the program is growing.',
    depthTitle: 'What the AP record rests on',
    depth: [
      {
        label: 'A broad AP catalog',
        text: 'The school advertises **17 AP courses plus AP Capstone** (AP Seminar + AP Research). The Fall 2025 profile names 14 by title; the 2023 profile named 17 (adding Human Geography, Computer Science A and Spanish Language & Culture), so which of the 18 distinct titles run in a given year varies.',
      },
      {
        label: 'Real depth in the scores',
        text: '**29 students earned a 5 on one or more AP exams in May 2025** (59 a 4, 53 a 3) — these are students-scoring-X counts, which overlap, not a per-exam distribution the school does not publish.',
      },
      {
        label: 'Dual enrollment beyond AP',
        text: 'Courses taught on campus are credited through **Judson College** (Fall 2025 profile; prior years credited via the College at Southeastern), and students also take **NC Career & College Promise** courses at local community colleges.',
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
        text: 'Under the current (Spring 2024 and beyond) scale, **Honors courses earn +½ a quality point and AP courses +1** — down from +1 and +2 on the 2016–17 scale. A Class of 2025 transcript spans both scales.',
      },
      {
        label: '27 units to graduate',
        text: 'Bible 4 · English 4 · Math 4 · Social Studies 4 · Science 3 · Foreign Language 2 · Health/PE 1 · Fine Arts 1 · Electives 4 — a Bible credit every year is part of the required load.',
      },
    ],
    flags: [
      {
        kind: 'gap',
        text: 'No per-exam AP 1–5 distribution is published — only the overlapping "students who earned a 5 / 4 / 3 on at least one exam" counts. The "17 AP courses" marketing figure and the profile\'s shorter named list (14) are reconciled here as catalog-vs-offered-this-year, not a contradiction.',
      },
    ],
    sources: [
      { label: 'hgchristian.org — Fall 2025 High School Profile (CEEB, AP list, grading scale, AP results, recognition)', url: PROFILE_25 },
      { label: 'hgchristian.org — Fall 2023 High School Profile (prior-year window)', url: PROFILE_23 },
      { label: 'hgchristian.org — High School (AP + full honors track, dual enrollment)', url: HIGH_SCHOOL },
    ],
  },

  /* ------------------------------------------------------- counseling ------ */
  counseling: {
    headline:
      'A two-person counseling office — a Director of Counseling and an Administrator for Student Services — running a biblical-worldview program of 1:1 meetings, guidance lunches and parent-night sessions.',
    subhead:
      'The seniors-per-counselor ratio is not published; against the Class of 2025 senior count it computes to roughly 34:1 across the two staff, or about 138:1 measured over all 275 high-school students.',
    stats: [
      { value: '2', label: 'named counseling staff (Bennett + Similton)' },
      { value: '≈34:1', label: 'seniors per counselor — computed, not published' },
      { value: '275', label: 'high-school students (2025–26)' },
      { value: 'No tools', label: 'Naviance / SCOIR / Common App account not published' },
    ],
    roster: [
      {
        role: 'Director of Counseling',
        name: 'Tracey Bennett',
        detail: 'Listed as "Guidance Counselor" on the Fall 2023 profile and "Director of Counseling" on Fall 2025 — the lead college-counseling contact (traceybennett@hgchristian.org).',
      },
      {
        role: 'Administrator for Student Services',
        name: 'Dr. Mildred Similton',
        detail: 'Oversees student services alongside the counseling office (mildredsimilton@hgchristian.org).',
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
      'The guidance page describes these as its program rather than publishing a grade-by-grade timeline. No application-platform account (Naviance / SCOIR / Common App) and no NCAA code are stated on either profile or the guidance page.',
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
        kind: 'gap',
        text: 'No senior-class size or seniors-per-counselor ratio is published. The ≈34:1 figure is computed from the Class of 2025 bucket counts (43 + 15 + 7 + 2 = 67 graduates) against the two counseling staff; the ≈138:1 school-wide figure uses all 275 high-school students. Both are derived, not stated.',
      },
    ],
    sources: [
      { label: 'hgchristian.org — Fall 2025 High School Profile (counselor roster)', url: PROFILE_25 },
      { label: 'hgchristian.org — Guidance (program description)', url: GUIDANCE },
    ],
  },

  /* --------------------------------------------------------- outcomes ------ */
  outcomes: {
    headline:
      '132 distinct institutions appear across the school\'s two published acceptance lists (Classes of 2023 and 2025) — from Bowdoin, Pomona and Georgia Tech through a deep bench of NC publics, Christian colleges and HBCUs.',
    subhead:
      'The lists carry no matriculation markings, so they read as acceptances. Here the combined, deduplicated list is scored against the current U.S. News tiers.',
    stats: [
      { value: '132', label: 'institutions across the 2023 + 2025 acceptance lists' },
      { value: '64%', label: 'of the Class of 2025 planned a 4-year college (22% 2-year, 11% none, 3% gap year)' },
      { value: '9', label: 'Top-75 Liberal Arts colleges on the list' },
      { value: '20', label: 'HBCUs on the list' },
    ],
    buckets: [
      { tier: 'Ivy League', count: '0 / 8' },
      { tier: '“Ivy Plus”', count: '0 / 17' },
      { tier: 'Top-75 National Universities', count: '22 / 75' },
      { tier: 'Top-75 Liberal Arts', count: '9 / 75', note: '— incl. Bowdoin, Pomona, Claremont McKenna, Grinnell, Colgate, Washington & Lee' },
      { tier: 'Power Four', count: '24 / 68' },
      { tier: 'HBCUs', count: '20 / 107', note: '— incl. Howard, Hampton, Morehouse, NC A&T, Florida A&M, Fisk' },
    ],
    bucketsNote:
      'Counts are derived by this research from the same 132-institution list you can filter at right, scored against the 2026 U.S. News tables — not figures the school reports. The list is the union of the Class of 2023 (81) and Class of 2025 (86) profiles; verbatim spellings are preserved, including the profiles\' own apparent typos ("Clafin", "Deleware", "Coker University"), and community colleges (Central Piedmont, Cape Fear, Rowan-Cabarrus, York Technical) are kept because the school lists them.',
    collegesTitle: 'Every named acceptance (2023 + 2025)',
    colleges,
    collegesTotal: '132 institutions across two published class lists · no matriculation markings',
    scholarships: [
      'No scholarship dollar totals published',
      'No per-college matriculation markings — acceptances only',
      'HBCU strength: 20 HBCUs across the two lists',
    ],
    scholarshipsNote:
      'The profiles publish acceptance lists and recognition counts, but no scholarship-offer totals or named-award ledger.',
    caveat:
      'these are acceptance lists, not matriculation lists, and mark no enrollments — so they show breadth of acceptances rather than where students actually enrolled. The Class of 2025 profile marks first-ever acceptances with an asterisk, showing the list is still widening.',
    flags: [
      {
        kind: 'verify',
        text: 'Bucket membership near the Top-75 line should be re-confirmed against the live U.S. News edition at ingest. HBCU membership was checked per institution; ambiguous names (e.g. "Xavier University of Louisiana") are resolved to the HBCU, not the Ohio Xavier.',
      },
    ],
    sources: [
      { label: 'hgchristian.org — Fall 2025 High School Profile (Class of 2025 list, buckets, recognition)', url: PROFILE_25 },
      { label: 'hgchristian.org — Fall 2023 High School Profile (Class of 2023 list)', url: PROFILE_23 },
      { label: 'U.S. News 2026 rankings (tier scoring)', url: USNEWS },
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
          '**A 17-course AP program with AP Capstone** — the AP Seminar → AP Research sequence produced 4 AP Capstone Diplomas in 2024–25, and 82 students sat 176 exams in May 2025.',
          '**A widening recognition record** — 1 National Merit Finalist and 7 Commended over 2019–2025, up from 1/5 in the prior window, plus 14 College Board National African American / Hispanic recognitions.',
          '**Dual-enrollment credit** — courses credited through Judson College (prior years, the College at Southeastern) and NC Career & College Promise at community colleges.',
        ],
      },
      {
        title: 'Lever 2 — The office’s leverage',
        hint: 'what the building lends the file',
        glyph: '▲',
        items: [
          '**A legible, no-rank transcript** — the school does not rank, and publishes both grading scales and the honors/AP weighting so a reader can reconstruct rigor in context.',
          '**A signature summer on-ramp** — the counseling office runs a College Admissions Boot Camp for rising juniors and seniors, with campus visits.',
          '**A deep HBCU and NC-public pipeline** — 20 HBCUs and the full NC public system appear across the two acceptance lists, matching the school\'s applicant base.',
        ],
        note: 'No research program, Olympiad results, or national-competition credentials are published — the differentiators are AP breadth and legibility, not competition results.',
      },
    ],
    flags: [],
    sources: [
      { label: 'hgchristian.org — Fall 2025 High School Profile', url: PROFILE_25 },
      { label: 'hgchristian.org — Guidance', url: GUIDANCE },
    ],
  },

  /* -------------------------------------------------------- wholeClass ----- */
  wholeClass: {
    headline:
      'The school publishes class means and medians — not percentile distributions — and it says so: small tester counts (SAT n=20) are disclosed on the profile itself.',
    subhead:
      'Test scores are tagged to the ENTERING class (2026 / 2024), a year apart from the Class-of-2025 outcomes; every table below is means/medians, so none carries a percentile header.',
    scoreTables: [
      {
        title: 'ACT & SAT — class means and medians',
        hint: '— ACT is a mean, SAT a median; entering Class of 2026 (current)',
        noPercentiles: true,
        rows: [
          { label: 'ACT Composite (mean)', values: ['20.5'] },
          { label: 'SAT Composite (median)', values: ['1090'] },
        ],
        note: 'Class of 2026: ACT mean 20.5 (n=85); SAT median 1090 (n=20). The profile discloses these small tester counts. Class of 2024 (prior): ACT mean 19.7 (n=63); SAT median 1110 (n=12).',
      },
      {
        title: 'AP recognition — count tiers, May 2025',
        hint: '— AP Scholar tiers, 2024–25 (counts, not a percentile distribution)',
        noPercentiles: true,
        rows: [
          { label: 'AP Scholars', values: ['22'] },
          { label: 'AP Scholars with Distinction', values: ['10'] },
          { label: 'AP Scholars with Honors', values: ['5'] },
          { label: 'AP Capstone Diplomas', values: ['4'] },
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
        text: 'The Student Services page names an Educational Support Services (ESS) channel alongside standardized-testing support and wellness, but publishes no learning-differences program detail, resource-room description, or accommodations figures.',
      },
    ],
    supportNote:
      'No structured learning-differences program, accommodations count, or resource-room detail is published; ESS is named without figures.',
    middle: [
      {
        label: 'The list matches a broad class',
        text: 'The two acceptance lists run from Bowdoin, Pomona and Georgia Tech through the full NC public system (Chapel Hill, NC State, Charlotte, Wilmington, Greensboro, Asheville, Pembroke), Christian colleges, HBCUs and community colleges (Central Piedmont, Cape Fear, Rowan-Cabarrus) — the spread of a broad, not uniformly elite, class.',
      },
      {
        label: 'Non-4-year paths are real',
        text: 'For the Class of 2025, 22% planned a 2-year college and 11% chose not to pursue higher education — and the acceptance list includes the community colleges and trade paths that reflects.',
      },
    ],
    flags: [
      {
        kind: 'gap',
        text: 'No score percentiles, no GPA quintiles and no per-quintile outcomes are published — only class means/medians (with disclosed tester counts) and AP awardee tiers. The shape of the class is not recoverable from public sources.',
      },
    ],
    sources: [
      { label: 'hgchristian.org — Fall 2025 High School Profile (test means, AP tiers)', url: PROFILE_25 },
      { label: 'hgchristian.org — Fall 2023 High School Profile (prior-year test means)', url: PROFILE_23 },
    ],
  },

  /* ---------------------------------------------------------- verdict ------ */
  verdict: {
    headline:
      'A biblical-worldview college-prep school with a genuine AP-and-Capstone program and a widening recognition record — with the small tester counts and the unpublished caseload the two things a visit should probe.',
    subhead:
      'The AP catalog and the two-year acceptance record are the real strengths; the quantitative profile is thin by design (means, not distributions) and the counseling caseload is never stated.',
    points: [
      {
        label: 'The AP story is real and broad',
        text: '17 AP courses with AP Capstone, 176 exams sat in May 2025, 29 students earning a 5 on at least one, and 4 AP Capstone Diplomas — a program with genuine depth for a school this size.',
      },
      {
        label: 'Recognition is growing',
        text: 'National Merit (1 Finalist / 7 Commended) and 14 College Board National recognitions over 2019–2025, both up from the prior window.',
      },
      {
        label: 'A two-person counseling office',
        text: 'A Director of Counseling and an Administrator for Student Services run the program, but the senior caseload is never published — the ≈34:1 figure here is computed, so ask it directly.',
      },
      {
        label: 'Outcomes show breadth over two years',
        text: '132 institutions across the 2023 and 2025 lists — Bowdoin and Pomona at the top, 20 HBCUs, the full NC public system — but the lists mark no matriculations, so they show acceptances, not enrollment.',
      },
      {
        label: 'The quantitative profile is thin by design',
        text: 'The school publishes class means/medians on small tester counts (SAT n=20), not percentile distributions or a GPA table, and does not rank — so the shape of the class is not public.',
      },
    ],
    checklist: [
      'How many seniors does each of the two counselors carry, and is there a college-only counselor at peak season?',
      'Which of the 17 AP courses actually run in 2025–26 — the profile names 14, the school advertises 17?',
      'The acceptance lists mark no enrollments — where did the Classes of 2024 and 2025 actually matriculate, and in what concentrations?',
      'What does Educational Support Services (ESS) provide, and how are College Board / ACT accommodations documented?',
      'Only 20 students took the SAT and 85 the ACT — what share of the class tests, and how is test-optional handled?',
      'How does the College Admissions Boot Camp fit the application calendar, and is it open to all rising juniors and seniors?',
    ],
    flags: [],
    sources: [
      { label: 'Verdict synthesized by the researcher from the sources cited on the cards above' },
    ],
  },
}


