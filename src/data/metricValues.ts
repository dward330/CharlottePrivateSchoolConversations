// Quantitative "value" metrics for the Compare view — hand-maintained, NOT produced
// by the ingest pipeline. Coverage metrics (from metrics.ts) answer "did we research
// this?" with ✓ / N/A; value metrics answer "what is the number?" with an actual value
// per school (or null = N/A when unknown / not applicable).
//
// Keep values as short display strings. `null` renders as N/A. `note` shows as small
// print under the row label (definition, time window, source caveat).

export type ValueMetric = {
  topic: string // topic slug
  key: string
  label: string
  note?: string
  values: Record<string, string | null> // school slug -> display value | null (N/A)
}

export const VALUE_METRICS: ValueMetric[] = [
  // =========================== Course Offerings ============================
  // Transcribed from each school's OWN published curriculum guide (see
  // source-material/course-offerings/<school>/). Guide vintages differ by
  // school — Cannon, Charlotte Christian, and Davidson Day publish 2026-27;
  // Providence Day and Country Day publish 2025-26; Charlotte Latin publishes
  // an undated live course list. Where a school's own documents disagree, the
  // per-school research file records the discrepancy and which figure was used.
  {
    topic: 'course-offerings',
    key: 'us-courses',
    label: 'Upper School courses catalogued',
    note: 'Distinct Upper School course entries in the school’s own current curriculum guide. Counting conventions differ — Country Day’s index bundles language levels onto one line, so its true course count is higher than the line count shown.',
    values: {
      cannon: '104', // counted from the 11 course-offering sections of the 2026-27 catalog
      'charlotte-christian': '~135', // ~135 unique titles; 6 are cross-listed in two departments
      'charlotte-country-day': '119', // line-by-line count of the Total Index of Courses by Department (p.8)
      'charlotte-latin': '129', // counted from the live Upper School course-offerings page
      'davidson-day': '~75', // 74 described + AP Spanish Literature listed without a description; 66 on the 2026-27 offerings grid
      'providence-day': '149', // distinct entries; multi-year language sequences counted once per track
    },
  },
  {
    topic: 'course-offerings',
    key: 'advanced-courses',
    label: 'AP / advanced courses',
    note: 'The school’s own count of college-level courses. Country Day is the only school here offering both AP and the IB Diploma; Cannon adds 13 faculty-designed Advanced Topics courses carrying the same weight as an AP.',
    values: {
      cannon: '14 AP + 13 AT', // 2026-27 catalog count; the 2025-26 profile stated 13 AP / 8 AT before the AT program expanded
      'charlotte-christian': '21 AP', // the guide's own AP roster, corroborated by the admissions FAQ
      'charlotte-country-day': '23 AP + 18 IB', // plus the IB core (Theory of Knowledge, Extended Essay, CAS)
      'charlotte-latin': '22 AP subjects', // the school's stated figure; 23 AP-titled entries appear on the course page
      'davidson-day': '26 AP', // the catalog's explicit AP list (p.11)
      'providence-day': '28 AP', // 28 AP courses described; catalog prose names 27 subject areas
    },
  },
  {
    topic: 'course-offerings',
    key: 'us-departments',
    label: 'Upper School departments',
    note: 'Academic departments in the Upper School catalog. Cannon has no standalone computer-science department — CS sits inside Innovation & Enterprise.',
    values: {
      cannon: '8', // English, Arts, Math, Science, Social Studies, World Languages, Innovation/Enterprise, PE
      'charlotte-christian': '11', // counting Fine Arts as one department with four sub-areas
      'charlotte-country-day': '9', // 7 core academic plus Non-Departmental and Physical Education
      'charlotte-latin': '13', // department headings on the course-offerings page
      'davidson-day': '9', // per the catalog contents (pp. 4-6)
      'providence-day': '11', // catalog sections, incl. both IDEAS@PDS strands
    },
  },
  {
    topic: 'course-offerings',
    key: 'grade-span',
    label: 'one continuous course of study',
    note: 'The school’s own lowest published entry point through Grade 12. Division bands differ: Charlotte Christian puts Grade 5 in Middle School, and Davidson Day enrolls from age 2.',
    values: {
      cannon: 'JrK–12', // Junior Kindergarten through Grade 12
      'charlotte-christian': 'JK–12', // Junior Kindergarten through Grade 12; Lower School is JK–4
      'charlotte-country-day': 'JK–12', // 13 grades served, Junior Kindergarten through 12
      'charlotte-latin': 'TK–12', // Transitional Kindergarten through Grade 12
      'davidson-day': 'Age 2–12', // Early Preschool (2s/3s) through Grade 12
      'providence-day': 'TK–12', // Transitional Kindergarten through Grade 12
    },
  },

  // ============================ College Support ============================
  // Extracted from each school's College Support research note (verified against
  // the note text July 2026). null = the school does not publish that figure.
  {
    topic: 'college-support',
    key: 'ap-scope',
    label: 'AP scope',
    note: 'AP exam volume for the most recent reported year, or AP course/subject count where exam volume is unpublished. IB flagged where offered.',
    values: {
      cannon: '425 AP exams', // 197 students sat 425 AP exams (most recent reported)
      'charlotte-christian': '21 AP courses', // 21 AP/college-level courses in a 45+ AP/honors catalog
      'charlotte-country-day': '530 AP exams + IB', // 238 students sat 530 AP exams; also full IB Diploma
      'charlotte-latin': '23 AP subjects', // AP in 23 subjects; every AP student must sit the exam
      'davidson-day': null, // AP volume not published
      'providence-day': '1,213 AP exams', // May 2025: 461 students, 1,213 exams
    },
  },
  {
    topic: 'college-support',
    key: 'ap-performance',
    label: 'AP scoring 3+',
    note: 'Share of AP exams scoring 3 or higher, most recent reported year. Charlotte Latin & Davidson Day do not publish a pass rate.',
    values: {
      cannon: '92%', // 92.39% of exams scored 3+
      'charlotte-christian': '89%', // 2024: 265/298 (89%)
      'charlotte-country-day': '93%', // 2025 overall 93%
      'charlotte-latin': null, // pass rate not published
      'davidson-day': null, // pass rate not published
      'providence-day': '94%', // May 2025: 94% scored 3+
    },
  },
  {
    topic: 'college-support',
    key: 'national-merit',
    label: 'National Merit',
    note: 'Most recent single-class Semifinalist/Finalist count the school announced. Cannon & Davidson Day unpublished; Charlotte Christian reports only rolling multi-year totals.',
    values: {
      cannon: null, // no recent-year NM count located
      'charlotte-christian': null, // only 15-year rolling totals published
      'charlotte-country-day': '2 Finalists ’25', // Class of 2025: 2 Finalists, 2 Semifinalists, 5 Commended
      'charlotte-latin': '12 Semifinalists ’26', // Class of 2026: 12 Semifinalists, 18 Commended
      'davidson-day': null, // NM standing unpublished/unconfirmed
      'providence-day': '7 Semifinalists ’25', // Class of 2025: 7 Semifinalists, 16 Commended
    },
  },
  {
    topic: 'college-support',
    key: 'counselor-caseload',
    label: 'Seniors per counselor',
    note: 'Approximate seniors per dedicated college counselor at peak application season, from each school’s note.',
    values: {
      cannon: '28:1', // 111 seniors ÷ 4 counselors
      'charlotte-christian': '~47:1', // effective caseload ~47 seniors/counselor
      'charlotte-country-day': '~34:1', // ~34–35 seniors/counselor
      'charlotte-latin': '~36:1', // ~36–37 seniors/counselor
      'davidson-day': '~23:1', // ~23–24 seniors in a ~47-student class
      'providence-day': '~44:1', // ~44–45 seniors/counselor (quarter-class model)
    },
  },

  // ============================ Financial Aid ============================
  // From each school's structured Financial-Aid Deep-Dive report / note (verified
  // July 2026). Many schools publish tuition but withhold aid detail — null there.
  {
    topic: 'financial-aid-tuition',
    key: 'top-tuition',
    label: 'Top tuition',
    note: 'Highest published grade-band tuition, 2026–27 school year.',
    values: {
      cannon: '$32,070', // Grades 9–12, 2026–27
      'charlotte-christian': '$27,055', // Grades 9–12, 2026–27
      'charlotte-country-day': '$34,075', // Grades 9–12, 2026–27
      'charlotte-latin': '$36,500', // Grades 9–12, 2026–27
      'davidson-day': '$26,910', // Upper School 9–12, 2026–27
      'providence-day': '$36,325', // Grades 6–12, 2026–27
    },
  },
  {
    topic: 'financial-aid-tuition',
    key: 'pct-aid',
    label: '% receiving aid',
    note: 'Share of students/families receiving aid as the school states it. “~” where the school says “approximately”; year/denominator vary — see the school’s report. Charlotte Christian & Davidson Day do not publish this.',
    values: {
      cannon: '24%', // 24% of students, 2025–26
      'charlotte-christian': null, // share receiving aid not published
      'charlotte-country-day': '~20%', // ~20% of student body (undated)
      'charlotte-latin': '14%', // 14% of students (strategic plan)
      'davidson-day': null, // share on aid not published
      'providence-day': '~21%', // ~21% of families (undated)
    },
  },
  {
    topic: 'financial-aid-tuition',
    key: 'aid-awarded',
    label: 'Aid awarded / year',
    note: 'Total tuition assistance awarded, most recent year the school states a figure. Charlotte Christian & Davidson Day do not publish a total; Country Day’s published totals conflict and are omitted.',
    values: {
      cannon: '$3.0M', // $3,000,000 in 2025–26
      'charlotte-christian': null, // total awarded not published
      'charlotte-country-day': null, // four conflicting undated totals — omitted to avoid a guess
      'charlotte-latin': '$3.25M', // $3.25M, 2024–25
      'davidson-day': null, // aid budget not published
      'providence-day': '$3.68M', // $3,683,971 (2017–18, most recent published)
    },
  },
  {
    topic: 'financial-aid-tuition',
    key: 'avg-award',
    label: 'Average award',
    note: 'Average aid grant where the school publishes one. Most schools publish neither an average nor a median.',
    values: {
      cannon: null, // average award not published
      'charlotte-christian': null, // average/median not published
      'charlotte-country-day': null, // average/median not published
      'charlotte-latin': '$17,900', // average award, 2024–25
      'davidson-day': null, // average/median not published
      'providence-day': '$13,695', // average grant (2017–18, most recent published)
    },
  },

  // ============================ The Arts ============================
  // From each school's The Arts research note (verified July 2026).
  {
    topic: 'the-arts',
    key: 'program-span',
    label: 'Program span',
    note: 'Grade span of the arts program as each school states it.',
    values: {
      cannon: 'JrK–12',
      'charlotte-christian': 'JK–12',
      'charlotte-country-day': 'JK–12',
      'charlotte-latin': 'TK–12',
      'davidson-day': 'Age 2–Gr 12',
      'providence-day': 'TK–12',
    },
  },
  {
    topic: 'the-arts',
    key: 'signature-recognition',
    label: 'Signature recognition',
    note: 'The most notable arts recognition or distinction named in each school’s note (measured differently per school).',
    values: {
      cannon: 'NCTC festival', // competes in NC Theatre Conference HS Play Festival
      'charlotte-christian': 'Blumey Best Show', // Blumey Best Show for Oklahoma! (2013)
      'charlotte-country-day': '31+ Blumey noms', // 31+ Blumey Award nominations
      'charlotte-latin': '80%+ participation', // 80%+ of students participate in the arts
      'davidson-day': null, // no signature recognition named
      'providence-day': 'Blumey recognition', // repeated Blumey Awards recognition
    },
  },
  {
    topic: 'the-arts',
    key: 'advanced-arts-coursework',
    label: 'Advanced coursework',
    note: 'Advanced (AP/IB) arts coursework offered, where the note names it.',
    values: {
      cannon: 'AP Studio Art',
      'charlotte-christian': null, // advanced arts coursework not detailed
      'charlotte-country-day': 'AP + IB', // AP and IB arts pathways (rare dual offering)
      'charlotte-latin': null, // not detailed
      'davidson-day': null, // not detailed
      'providence-day': '3 AP arts', // AP Studio Art, AP Art History, AP Music Theory
    },
  },
  {
    topic: 'the-arts',
    key: 'ensembles',
    label: 'Ensembles / offerings',
    note: 'Count or breadth of ensembles / arts offerings as each note describes them.',
    values: {
      cannon: '3 pillars', // Visual Arts, Music, Theater
      'charlotte-christian': '40+ electives', // 40+ arts electives across four areas
      'charlotte-country-day': '8 ensembles', // 8 vocal/instrumental groups
      'charlotte-latin': null, // no count stated
      'davidson-day': null, // no count stated
      'providence-day': '4 ensembles', // Band, Orchestra, Chorus, Jazz
    },
  },

  // ============================ Student Clubs ============================
  // From each school's Student Clubs note (verified July 2026). Two proposed tiles
  // (total-club count, competitive-club count) were dropped: club counts are defined
  // inconsistently across schools (exact vs range vs minimum) and a competitive count
  // was published by only one school — neither compares cleanly.
  {
    topic: 'student-clubs',
    key: 'flagship-result',
    label: 'Flagship result',
    note: 'The single most notable competitive club achievement documented in each school’s note.',
    values: {
      cannon: 'FLL Worlds top 100', // FIRST Lego League World Championship, top 100 of 32,000+ (2024 & 2025)
      'charlotte-christian': 'Chess 2nd place', // MS Chess team 2nd at tournament
      'charlotte-country-day': 'Model UN — 6 awards', // MUNCH 2025: 6 awards incl. 4 Outstanding Delegate
      'charlotte-latin': 'Debate top-20 US', // NSDA Schools of Excellence — top 20 nationally
      'davidson-day': 'Battle of Books 1st', // MS team 1st in regional competition
      'providence-day': 'DECA → ICDC ’26', // DECA advanced to national ICDC 2026
    },
  },
  {
    topic: 'student-clubs',
    key: 'participation',
    label: 'Participation signal',
    note: 'A breadth-of-participation figure where the school publishes one (measured differently per school — see the school’s note). Charlotte Latin’s figure is sports participation.',
    values: {
      // Corrected Jul 2026: the ~15,000 figure came from the 2024-25 Student
      // Profile and is superseded. The live Upper School page says "almost
      // 10,000 service hours each year", and the 2025-26 Profile drops the stat
      // entirely — so this is scoped to the Upper School, the page carrying it.
      // See source-material/student-clubs/cannon/…Clubs Redesign Deep Research.md
      cannon: '~10k service hrs', // ~10,000 service hours/year (Upper School)
      'charlotte-christian': null, // no participation figure published
      'charlotte-country-day': '~50% mentor weekly', // ~half of juniors/seniors mentor weekly
      'charlotte-latin': '~90% play a sport', // ~90% in grades 7–12 play a sanctioned sport
      'davidson-day': null, // no participation figure published
      'providence-day': '~50% in service clubs', // service clubs engage ~half of Upper School
    },
  },

  {
    topic: 'after-school',
    key: 'latest-pickup',
    label: 'Latest pickup time',
    note: 'End of the Lower-School extended-care/aftercare day. Verify current hours with the school.',
    values: {
      // Sourced from each school’s after-school research note:
      'charlotte-country-day': '6:00 PM', // "Structured Care to 6 pm"
      'charlotte-latin': '6:00 PM', // Hawks’ Club, 1:30–6:00 p.m.
      'davidson-day': '6:00 PM', // Extended Care, 2:45–6:00 p.m.
      // These schools publish hours only in an enrollment packet / flag pickup as
      // "confirm with school" — no public latest-pickup time located:
      cannon: null,
      'charlotte-christian': null,
      'providence-day': null,
    },
  },

  // --- Sports college commitments, cumulative over the Classes of 2024, 2025 & 2026.
  // Counts of DISTINCT athletes who committed to play college sports at each level;
  // NESTED (Power 4 ⊆ Division I). Power 4 = SEC / Big Ten / ACC / Big 12 only
  // (Big East, AAC, A-10, Ivy, etc. are "other D1"; Cal/Berkeley counts P4 as an ACC
  // member; Notre Dame's non-football sports count P4 via the ACC).
  //
  // Compiled by hand from each school's published commitment rosters + Charlotte-area
  // signing-day coverage (see git history for per-athlete sourcing in this file's
  // review). These are DOCUMENTED MINIMUMS — coverage is uneven: Providence Day &
  // Country Day publish full by-class rosters; Charlotte Christian's public list runs
  // through 2025 (its 2026 class isn't compiled yet); Charlotte Latin's academic-
  // heavy classes send many to D3 and its November signing lists are partial; Cannon's
  // best-known athletes (Richardson '21, Bradley '22, Nix '27) fall outside this window.
  {
    topic: 'sports',
    key: 'p4-commits-2426',
    label: 'Power 4 commits',
    note: 'Distinct athletes committed to an SEC / Big Ten / ACC / Big 12 program, Classes of 2024–2026. Documented minimum.',
    values: {
      cannon: '1', // Notre Dame (swim, ’25)
      'charlotte-christian': '8', // ’24: Henley, Wilfong, Woody, Zinger · ’25: E.Boykin, Hinde, Nicholson, Vance (’26 not yet compiled)
      'charlotte-country-day': '9', // ’24: Klein, Lewis, Stajos, McDonald · ’25: Scott, Pifer · ’26: T.Klein, Alzate-Celin, Mallard
      'charlotte-latin': '3', // ’24 Salvage (South Carolina) · ’25 Clontz (Cal) · ’26 Lee (NC State)
      'davidson-day': '3', // ’25 Denis (UNC), Gordon (Georgia) · ’26 Stevens (Clemson)
      'providence-day': '17', // school "Alumni at the Next Level" roster, 2024–26 (17 P4 tally)
    },
  },
  {
    topic: 'sports',
    key: 'd1-commits-2426',
    label: 'Division I commits',
    note: 'Distinct athletes committed to any NCAA Division I program, Classes of 2024–2026 (includes the Power 4 count above). Documented minimum.',
    values: {
      cannon: '3', // ’25: Notre Dame, ETSU, Butler
      'charlotte-christian': '26', // ’24: 11 · ’25: 15 (’26 class not yet compiled)
      'charlotte-country-day': '25', // ’24: 10 · ’25: 12 · ’26: 3
      'charlotte-latin': '14', // ’24: Coppage, Floyd, Salvage (3) · ’25: Booker, Clontz, Connor, Milligan, Morgan (5) · ’26: Short, K.Smith, Lee, Holland, Gorelick, Cheatwood (6)
      'davidson-day': '9', // ’24: M.Smith · ’25: Denis, Doty, Glass, Gordon, Seifert, K.Smith · ’26: Stevens, Peck (2024 & 2026 under-documented — floor)
      'providence-day': '39', // school roster D1 tally, 2024–26
    },
  },
]

export function valueMetricsForTopic(topicSlug: string): ValueMetric[] {
  return VALUE_METRICS.filter((m) => m.topic === topicSlug)
}
