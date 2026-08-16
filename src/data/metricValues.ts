// Quantitative "value" metrics for the Compare view — hand-maintained, NOT produced
// by the ingest pipeline. Coverage metrics (from metrics.ts) answer "did we research
// this?" with ✓ / N/A; value metrics answer "what is the number?" with an actual value
// per school (or null = N/A when unknown / not applicable).
//
// Keep values as short display strings. `null` renders as N/A. `note` shows as small
// print under the row label (definition, time window, source caveat).
//
// Coded cells (fraction, floor, ratio, range, magnitude, phrase) get a `quals`
// tooltip; run `npm run check:quals` after editing (also fires as a local hook).

import {
  localized,
  indexOverlay,
  setOverlayIndex,
  overlayIndex,
  hasOverlay,
  type OverlayFile,
} from '../lib/localizeData.ts'

/**
 * Per-cell provenance shown in a top-layer popover (see components/CellQual.tsx).
 * Only cells needing a caveat carry one — a plain exact count has no entry, and
 * the absence of the marker is itself the signal.
 */
export type CellQual = {
  /** Short uppercase kicker key — one of the `compare.qual.*` locale keys. */
  kind: 'minimum' | 'range' | 'official' | 'scope'
  /** At most two sentences. Reader-facing prose, not maintainer shorthand. */
  text: string
}

export type ValueMetric = {
  topic: string // topic slug
  key: string
  label: string
  note?: string
  values: Record<string, string | null> // school slug -> display value | null (N/A)
  /**
   * Optional second display line, shown under the value in a smaller, quieter
   * face. For a cost row this is the same money in the other billing period —
   * the row leads with a monthly figure and restates it annualized beneath, so
   * the column scans in one unit without hiding the school's own published one.
   *
   * Like `values`, these are display strings and go through `localizeMoneyText()`
   * at render. A cell with no entry simply renders one line.
   */
  subs?: Record<string, string>
  /**
   * Suppress the leader highlight on this row.
   *
   * Compare tints `Math.max` as the standout, which is right for a row where
   * more is better (courses catalogued, acceptances) and WRONG for a cost row,
   * where it would mark the most expensive school as the winner. Set this on any
   * metric whose highest value is not its best value.
   */
  noLead?: boolean
  /**
   * Tint the LOWEST value as the leader instead of the highest.
   *
   * For a row where less is better — seniors per counselor, where the note
   * itself says "a lower ratio means more counselor time per student". Ignored
   * when `noLead` is set, since that suppresses the tint entirely.
   */
  lowerIsBetter?: boolean
  /** Optional per-school provenance. Only cells needing a caveat appear here. */
  quals?: Record<string, CellQual>
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
    quals: {
      'charlotte-christian': {
        kind: 'scope',
        text: 'About 135 unique course titles; 6 of them are cross-listed in two departments, so a department-by-department tally would count those twice.',
      },
      'davidson-day': {
        kind: 'scope',
        text: '74 courses are described in the 2026–27 catalog, with one more (AP Spanish Literature) listed without a description. The school’s own offerings grid shows 66.',
      },
      'providence-day': {
        kind: 'scope',
        text: 'Distinct course entries, with multi-year language sequences counted once per track rather than once per level.',
      },
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
    quals: {
      cannon: {
        kind: 'scope',
        text: 'From the 2026–27 catalog. The 2025–26 profile stated 13 AP / 8 AT before the Advanced Topics program expanded; the AT courses carry the same weight as an AP.',
      },
      'charlotte-country-day': {
        kind: 'scope',
        text: 'The only school here offering both AP and the full IB Diploma. Beyond the 18 IB courses sit the IB core — Theory of Knowledge, the Extended Essay, and CAS.',
      },
      'charlotte-latin': {
        kind: 'scope',
        text: '22 is the school’s own stated figure; 23 AP-titled entries actually appear on the course-offerings page.',
      },
      'providence-day': {
        kind: 'scope',
        text: '28 AP courses are described in the catalog, whose prose names 27 subject areas.',
      },
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
  // ============================ College Support ============================
  // Extracted from each school's College Support research note (verified against
  // the note text July 2026). null = the school does not publish that figure.
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
    quals: {
      cannon: { kind: 'scope', text: 'About 92% of AP exams scored 3 or higher (the school reports 92.39%). A score of 3+ is the level most colleges treat as a passing result.' },
      'charlotte-christian': { kind: 'scope', text: '89% of AP exams scored 3 or higher in 2024 (265 of 298). A score of 3+ is the level most colleges treat as a passing result.' },
      'charlotte-country-day': { kind: 'scope', text: '93% of AP exams scored 3 or higher overall in 2025. A score of 3+ is the level most colleges treat as a passing result.' },
      'providence-day': { kind: 'scope', text: '94% of AP exams scored 3 or higher in May 2025. A score of 3+ is the level most colleges treat as a passing result.' },
    },
  },
  {
    topic: 'college-support',
    key: 'bucket-ivy',
    label: 'Ivy League',
    note: 'Of the 8 Ivy League universities, how many appear on the school’s published acceptance list. Derived from that list against the 2026 U.S. News tables — not a school-reported figure.',
    values: {
      cannon: '3 / 8', // buckets, collegeSupportPrograms/cannon.ts
      'charlotte-christian': '2 / 8', // buckets, collegeSupportPrograms/charlotte-christian.ts
      'charlotte-country-day': '7 / 8', // buckets, collegeSupportPrograms/charlotte-country-day.ts
      'charlotte-latin': '5 / 8', // buckets, collegeSupportPrograms/charlotte-latin.ts
      'davidson-day': '3 / 8', // buckets, collegeSupportPrograms/davidson-day.ts
      'providence-day': '8 / 8', // buckets, collegeSupportPrograms/providence-day.ts
    },
    quals: {
      cannon: { kind: 'scope', text: '3 of the 8 Ivy League universities appear on Cannon’s published acceptance list, matched against the 2026 U.S. News tables — not a figure the school reports itself.' },
      'charlotte-christian': { kind: 'scope', text: '2 of the 8 Ivy League universities appear on Charlotte Christian’s published acceptance list, matched against the 2026 U.S. News tables — not a figure the school reports itself.' },
      'charlotte-country-day': { kind: 'scope', text: '7 of the 8 Ivy League universities appear on Charlotte Country Day’s published acceptance list, matched against the 2026 U.S. News tables — not a figure the school reports itself.' },
      'charlotte-latin': { kind: 'scope', text: '5 of the 8 Ivy League universities appear on Charlotte Latin’s published acceptance list, matched against the 2026 U.S. News tables — not a figure the school reports itself.' },
      'davidson-day': { kind: 'scope', text: '3 of the 8 Ivy League universities appear on Davidson Day’s published acceptance list, matched against the 2026 U.S. News tables — not a figure the school reports itself.' },
      'providence-day': { kind: 'scope', text: '8 of the 8 Ivy League universities appear on Providence Day’s published acceptance list, matched against the 2026 U.S. News tables — not a figure the school reports itself.' },
    },
  },
  {
    topic: 'college-support',
    key: 'bucket-ivyplus',
    label: '“Ivy Plus”',
    note: 'Of the 17 “Ivy Plus” institutions — the eight Ivies plus Stanford, MIT, Chicago, Duke, Caltech and peers — how many appear on the school’s acceptance list.',
    values: {
      cannon: '10 / 17', // buckets, collegeSupportPrograms/cannon.ts
      'charlotte-christian': '4 / 17', // buckets, collegeSupportPrograms/charlotte-christian.ts
      'charlotte-country-day': '13 / 17', // buckets, collegeSupportPrograms/charlotte-country-day.ts
      'charlotte-latin': '12 / 17', // buckets, collegeSupportPrograms/charlotte-latin.ts
      'davidson-day': '8 / 17', // buckets, collegeSupportPrograms/davidson-day.ts
      'providence-day': '17 / 17', // buckets, collegeSupportPrograms/providence-day.ts
    },
    quals: {
      cannon: { kind: 'scope', text: '10 of the 17 “Ivy Plus” institutions appear on Cannon’s published acceptance list, matched against the 2026 U.S. News tables — not a figure the school reports itself.' },
      'charlotte-christian': { kind: 'scope', text: '4 of the 17 “Ivy Plus” institutions appear on Charlotte Christian’s published acceptance list, matched against the 2026 U.S. News tables — not a figure the school reports itself.' },
      'charlotte-country-day': { kind: 'scope', text: '13 of the 17 “Ivy Plus” institutions appear on Charlotte Country Day’s published acceptance list, matched against the 2026 U.S. News tables — not a figure the school reports itself.' },
      'charlotte-latin': { kind: 'scope', text: '12 of the 17 “Ivy Plus” institutions appear on Charlotte Latin’s published acceptance list, matched against the 2026 U.S. News tables — not a figure the school reports itself.' },
      'davidson-day': { kind: 'scope', text: '8 of the 17 “Ivy Plus” institutions appear on Davidson Day’s published acceptance list, matched against the 2026 U.S. News tables — not a figure the school reports itself.' },
      'providence-day': { kind: 'scope', text: '17 of the 17 “Ivy Plus” institutions appear on Providence Day’s published acceptance list, matched against the 2026 U.S. News tables — not a figure the school reports itself.' },
    },
  },
  {
    topic: 'college-support',
    key: 'bucket-nu75',
    label: 'Top-75 National Universities',
    note: 'Of the top 75 National Universities in the 2026 U.S. News table, how many appear on the school’s acceptance list.',
    values: {
      cannon: '46 / 75', // buckets, collegeSupportPrograms/cannon.ts
      'charlotte-christian': '30 / 75', // buckets, collegeSupportPrograms/charlotte-christian.ts
      'charlotte-country-day': '55 / 75', // buckets, collegeSupportPrograms/charlotte-country-day.ts
      'charlotte-latin': '53 / 75', // buckets, collegeSupportPrograms/charlotte-latin.ts
      'davidson-day': '44 / 75', // buckets, collegeSupportPrograms/davidson-day.ts
      'providence-day': '58 / 75', // buckets, collegeSupportPrograms/providence-day.ts
    },
    quals: {
      cannon: { kind: 'scope', text: '46 of the top 75 National Universities appear on Cannon’s published acceptance list, matched against the 2026 U.S. News tables — not a figure the school reports itself.' },
      'charlotte-christian': { kind: 'scope', text: '30 of the top 75 National Universities appear on Charlotte Christian’s published acceptance list, matched against the 2026 U.S. News tables — not a figure the school reports itself.' },
      'charlotte-country-day': { kind: 'scope', text: '55 of the top 75 National Universities appear on Charlotte Country Day’s published acceptance list, matched against the 2026 U.S. News tables — not a figure the school reports itself.' },
      'charlotte-latin': { kind: 'scope', text: '53 of the top 75 National Universities appear on Charlotte Latin’s published acceptance list, matched against the 2026 U.S. News tables — not a figure the school reports itself.' },
      'davidson-day': { kind: 'scope', text: '44 of the top 75 National Universities appear on Davidson Day’s published acceptance list, matched against the 2026 U.S. News tables — not a figure the school reports itself.' },
      'providence-day': { kind: 'scope', text: '58 of the top 75 National Universities appear on Providence Day’s published acceptance list, matched against the 2026 U.S. News tables — not a figure the school reports itself.' },
    },
  },
  {
    topic: 'college-support',
    key: 'bucket-lac75',
    label: 'Top-75 Liberal Arts',
    note: 'Of the top 75 Liberal Arts Colleges in the 2026 U.S. News table, how many appear on the school’s acceptance list.',
    values: {
      cannon: '27 / 75', // buckets, collegeSupportPrograms/cannon.ts
      'charlotte-christian': '7 / 75', // buckets, collegeSupportPrograms/charlotte-christian.ts
      'charlotte-country-day': '41 / 75', // buckets, collegeSupportPrograms/charlotte-country-day.ts
      'charlotte-latin': '40 / 75', // buckets, collegeSupportPrograms/charlotte-latin.ts
      'davidson-day': '26 / 75', // buckets, collegeSupportPrograms/davidson-day.ts
      'providence-day': '43 / 75', // buckets, collegeSupportPrograms/providence-day.ts
    },
    quals: {
      cannon: { kind: 'scope', text: '27 of the top 75 Liberal Arts Colleges appear on Cannon’s published acceptance list, matched against the 2026 U.S. News tables — not a figure the school reports itself.' },
      'charlotte-christian': { kind: 'scope', text: '7 of the top 75 Liberal Arts Colleges appear on Charlotte Christian’s published acceptance list, matched against the 2026 U.S. News tables — not a figure the school reports itself.' },
      'charlotte-country-day': { kind: 'scope', text: '41 of the top 75 Liberal Arts Colleges appear on Charlotte Country Day’s published acceptance list, matched against the 2026 U.S. News tables — not a figure the school reports itself.' },
      'charlotte-latin': { kind: 'scope', text: '40 of the top 75 Liberal Arts Colleges appear on Charlotte Latin’s published acceptance list, matched against the 2026 U.S. News tables — not a figure the school reports itself.' },
      'davidson-day': { kind: 'scope', text: '26 of the top 75 Liberal Arts Colleges appear on Davidson Day’s published acceptance list, matched against the 2026 U.S. News tables — not a figure the school reports itself.' },
      'providence-day': { kind: 'scope', text: '43 of the top 75 Liberal Arts Colleges appear on Providence Day’s published acceptance list, matched against the 2026 U.S. News tables — not a figure the school reports itself.' },
    },
  },
  {
    topic: 'college-support',
    key: 'bucket-p4',
    label: 'Power Four',
    note: 'Of the 68 Power Four athletic-conference universities (ACC, Big Ten, Big 12, SEC — including Notre Dame), how many appear on the school’s acceptance list.',
    values: {
      cannon: '43 / 68', // buckets, collegeSupportPrograms/cannon.ts
      'charlotte-christian': '34 / 68', // buckets, collegeSupportPrograms/charlotte-christian.ts
      'charlotte-country-day': '53 / 68', // buckets, collegeSupportPrograms/charlotte-country-day.ts
      'charlotte-latin': '53 / 68', // buckets, collegeSupportPrograms/charlotte-latin.ts (researcher’s exact count was 62; table shows 53 / 68)
      'davidson-day': '42 / 68', // buckets, collegeSupportPrograms/davidson-day.ts
      'providence-day': '57 / 68', // buckets, collegeSupportPrograms/providence-day.ts
    },
    quals: {
      cannon: { kind: 'scope', text: '43 of the 68 Power Four universities (ACC, Big Ten, Big 12, SEC, plus Notre Dame) appear on Cannon’s published acceptance list, matched against the 2026 U.S. News tables — not a figure the school reports itself.' },
      'charlotte-christian': { kind: 'scope', text: '34 of the 68 Power Four universities (ACC, Big Ten, Big 12, SEC, plus Notre Dame) appear on Charlotte Christian’s published acceptance list, matched against the 2026 U.S. News tables — not a figure the school reports itself.' },
      'charlotte-country-day': { kind: 'scope', text: '53 of the 68 Power Four universities (ACC, Big Ten, Big 12, SEC, plus Notre Dame) appear on Charlotte Country Day’s published acceptance list, matched against the 2026 U.S. News tables — not a figure the school reports itself.' },
      'charlotte-latin': {
        kind: 'scope',
        text: 'Counted from the school’s published acceptance list against the Power Four conferences. The researcher’s own tally reached 62; the figure shown, 53, is the conservative count reflected in this table.',
      },
      'davidson-day': { kind: 'scope', text: '42 of the 68 Power Four universities (ACC, Big Ten, Big 12, SEC, plus Notre Dame) appear on Davidson Day’s published acceptance list, matched against the 2026 U.S. News tables — not a figure the school reports itself.' },
      'providence-day': { kind: 'scope', text: '57 of the 68 Power Four universities (ACC, Big Ten, Big 12, SEC, plus Notre Dame) appear on Providence Day’s published acceptance list, matched against the 2026 U.S. News tables — not a figure the school reports itself.' },
    },
  },
  {
    topic: 'college-support',
    key: 'bucket-hbcu',
    label: 'HBCUs',
    note: 'Of the 107 Historically Black Colleges & Universities, how many appear on the school’s acceptance list.',
    values: {
      cannon: '5 / 107', // buckets, collegeSupportPrograms/cannon.ts
      'charlotte-christian': '10 / 107', // buckets, collegeSupportPrograms/charlotte-christian.ts
      'charlotte-country-day': '18 / 107', // buckets, collegeSupportPrograms/charlotte-country-day.ts
      'charlotte-latin': '6 / 107', // buckets, collegeSupportPrograms/charlotte-latin.ts
      'davidson-day': '3 / 107', // buckets, collegeSupportPrograms/davidson-day.ts
      'providence-day': '14 / 107', // buckets, collegeSupportPrograms/providence-day.ts
    },
    quals: {
      cannon: { kind: 'scope', text: '5 of the 107 Historically Black Colleges & Universities appear on Cannon’s published acceptance list, matched against the 2026 U.S. News tables — not a figure the school reports itself.' },
      'charlotte-christian': { kind: 'scope', text: '10 of the 107 Historically Black Colleges & Universities appear on Charlotte Christian’s published acceptance list, matched against the 2026 U.S. News tables — not a figure the school reports itself.' },
      'charlotte-country-day': { kind: 'scope', text: '18 of the 107 Historically Black Colleges & Universities appear on Charlotte Country Day’s published acceptance list, matched against the 2026 U.S. News tables — not a figure the school reports itself.' },
      'charlotte-latin': { kind: 'scope', text: '6 of the 107 Historically Black Colleges & Universities appear on Charlotte Latin’s published acceptance list, matched against the 2026 U.S. News tables — not a figure the school reports itself.' },
      'davidson-day': { kind: 'scope', text: '3 of the 107 Historically Black Colleges & Universities appear on Davidson Day’s published acceptance list, matched against the 2026 U.S. News tables — not a figure the school reports itself.' },
      'providence-day': { kind: 'scope', text: '14 of the 107 Historically Black Colleges & Universities appear on Providence Day’s published acceptance list, matched against the 2026 U.S. News tables — not a figure the school reports itself.' },
    },
  },
  {
    topic: 'college-support',
    key: 'counselor-caseload',
    label: 'Seniors per counselor',
    note: 'Approximate seniors per dedicated college counselor at peak application season, from each school’s note.',
    // The lightest caseload wins: a lower ratio means more counselor time per
    // student, as every one of this row's tooltips says.
    lowerIsBetter: true,
    values: {
      cannon: '28:1', // 111 seniors ÷ 4 counselors
      'charlotte-christian': '~47:1', // effective caseload ~47 seniors/counselor
      'charlotte-country-day': '~34:1', // ~34–35 seniors/counselor
      'charlotte-latin': '~36:1', // ~36–37 seniors/counselor
      'davidson-day': '~23:1', // ~23–24 seniors in a ~47-student class
      'providence-day': '~44:1', // ~44–45 seniors/counselor (quarter-class model)
    },
    quals: {
      cannon: { kind: 'scope', text: 'About 28 seniors per dedicated college counselor at peak application season — 111 seniors across 4 counselors. A lower ratio means more counselor time per student.' },
      'charlotte-christian': { kind: 'scope', text: 'An effective caseload of about 47 seniors per college counselor at peak application season. A lower ratio means more counselor time per student.' },
      'charlotte-country-day': { kind: 'scope', text: 'About 34–35 seniors per college counselor at peak application season. A lower ratio means more counselor time per student.' },
      'charlotte-latin': { kind: 'scope', text: 'About 36–37 seniors per college counselor at peak application season. A lower ratio means more counselor time per student.' },
      'davidson-day': { kind: 'scope', text: 'About 23–24 seniors per college counselor at peak application season, in a senior class of roughly 47 — the lightest caseload here. A lower ratio means more counselor time per student.' },
      'providence-day': { kind: 'scope', text: 'About 44–45 seniors per college counselor at peak application season, under a quarter-class model. A lower ratio means more counselor time per student.' },
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
    // No leader tint: this is a price, so the highest value is the worst one.
    noLead: true,
    values: {
      cannon: '$32,070', // Grades 9–12, 2026–27
      'charlotte-christian': '$27,055', // Grades 9–12, 2026–27
      'charlotte-country-day': '$34,075', // Grades 9–12, 2026–27
      'charlotte-latin': '$36,500', // Grades 9–12, 2026–27
      'davidson-day': '$26,910', // Upper School 9–12, 2026–27
      'providence-day': '$36,325', // Grades 6–12, 2026–27
    },
    quals: {
      'providence-day': {
        kind: 'scope',
        text: 'This is the Grades 6–12 tuition for 2026–27. Providence Day’s top band spans Grades 6–12, so it covers a wider grade range than the 9–12 figures beside it.',
      },
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
    quals: {
      cannon: {
        kind: 'scope',
        text: 'Share of students receiving aid in 2025–26.',
      },
      'charlotte-country-day': {
        kind: 'scope',
        text: 'Approximately 20% of the student body; the school does not date this figure.',
      },
      'charlotte-latin': {
        kind: 'scope',
        text: '14% of students, from the school’s strategic plan.',
      },
      'providence-day': {
        kind: 'scope',
        text: 'Approximately 21% of families — a family-level share rather than a share of students, and the school does not date it.',
      },
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
    quals: {
      cannon: {
        kind: 'scope',
        text: '$3,000,000 in tuition assistance awarded in 2025–26.',
      },
      'charlotte-latin': {
        kind: 'scope',
        text: '$3.25M awarded in 2024–25.',
      },
      'providence-day': {
        kind: 'scope',
        text: '$3,683,971 — the most recent figure the school publishes, from 2017–18, so it is older than the others shown here.',
      },
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
    quals: {
      'charlotte-latin': {
        kind: 'scope',
        text: 'Average aid award in 2024–25.',
      },
      'providence-day': {
        kind: 'scope',
        text: '$13,695 average grant, from 2017–18 — the most recent year the school publishes an average, so it is older than the Charlotte Latin figure beside it.',
      },
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
    quals: {
      cannon: {
        kind: 'scope',
        text: 'Arts are offered from Junior Kindergarten (JrK) through grade 12, across all three divisions.',
      },
      'charlotte-christian': {
        kind: 'scope',
        text: 'Arts are offered from Junior Kindergarten (JK) through grade 12.',
      },
      'charlotte-country-day': {
        kind: 'scope',
        text: 'Arts are offered from Junior Kindergarten (JK) through grade 12.',
      },
      'charlotte-latin': {
        kind: 'scope',
        text: 'Arts are offered from Transitional Kindergarten (TK) through grade 12.',
      },
      'davidson-day': {
        kind: 'scope',
        text: 'Arts run from age 2 through grade 12 — the widest span among these schools, reaching down to the earliest early-childhood years.',
      },
      'providence-day': {
        kind: 'scope',
        text: 'Arts are offered from Transitional Kindergarten (TK) through grade 12.',
      },
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
    quals: {
      cannon: {
        kind: 'scope',
        text: 'The school’s theatre program competes in the NC Theatre Conference High School Play Festival — the recognition its note leads with.',
      },
      'charlotte-christian': {
        kind: 'scope',
        text: 'Won Best Show at the Wells Fargo Blumey Awards for its production of Oklahoma! (2013). The Blumeys are the Charlotte region’s high-school musical-theatre awards.',
      },
      'charlotte-country-day': {
        kind: 'scope',
        text: '31+ nominations at the Blumey Awards, the Charlotte region’s high-school musical-theatre awards — a breadth-of-recognition figure rather than a single win.',
      },
      'charlotte-latin': {
        kind: 'scope',
        text: 'Over 80% of students take part in the arts — a participation measure the school leads with, alongside individual Blumey wins (Best Actress, 2022).',
      },
      'providence-day': {
        kind: 'scope',
        text: 'Repeated recognition at the Blumey Awards, the Charlotte region’s high-school musical-theatre awards.',
      },
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
    quals: {
      cannon: {
        kind: 'scope',
        text: 'The advanced arts course the note names is AP Studio Art.',
      },
      'charlotte-country-day': {
        kind: 'scope',
        text: 'Offers both AP and IB arts pathways — a dual AP/IB arts offering that is rare among these schools.',
      },
      'providence-day': {
        kind: 'scope',
        text: 'Three AP arts courses: AP Studio Art, AP Art History, and AP Music Theory.',
      },
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
    quals: {
      cannon: {
        kind: 'scope',
        text: 'The program is organized around three pillars — Visual Arts, Music, and Theater — rather than counted as a number of ensembles.',
      },
      'charlotte-christian': {
        kind: 'minimum',
        text: '40+ arts electives across four areas — a stated floor rather than an exact catalog count.',
      },
      'charlotte-country-day': {
        kind: 'scope',
        text: 'Eight vocal and instrumental groups across Middle and Upper School, spanning auditioned honors ensembles and open-enrollment groups.',
      },
      'providence-day': {
        kind: 'scope',
        text: 'Four performing ensembles: Band, Orchestra, Chorus, and Jazz.',
      },
    },
  },

  // ============================ Student Clubs ============================
  // From each school's Student Clubs note (verified July 2026). The total-club
  // count now SHIPS as the first row below: the per-cell provenance tooltip
  // (quals) resolves the objection that once dropped it — the counts are defined
  // inconsistently (exact vs range vs documented minimum), but each cell now
  // discloses exactly what it counts on hover/focus, and the ≥ prefix + verbatim
  // ~45–50 range make a floor or range visible without the tooltip. The
  // competitive-club count tile stays dropped: only one school publishes one, so
  // it still does not compare cleanly.
  {
    topic: 'student-clubs',
    key: 'us-organizations',
    label: 'Upper School student organizations',
    note: 'Clubs, honor societies, and student-led organizations in the Upper School. Each school counts differently — hover a figure for what it includes.',
    values: {
      cannon: '≥19', // 8 named US orgs + 11 US honor societies; no chartered directory published
      'charlotte-christian': '23', // 23 named US orgs (part of 35 across JK–12)
      'charlotte-country-day': '~45–50', // school publishes a range; only 7 confirmed by name
      'charlotte-latin': '25', // exact, in-scope US clubs across six interest areas
      'davidson-day': '≥9', // confirmed clubs only; no US roster published
      'providence-day': '77', // official 25–26 US list, 5 arts clubs excluded
    },
    quals: {
      cannon: {
        kind: 'minimum',
        text: 'Cannon publishes no chartered club directory, so this is a documented floor: 8 named Upper School organizations plus its 11 Upper School honor societies. The live roster shifts year to year and is not fully disclosed.',
      },
      'charlotte-christian': {
        kind: 'scope',
        text: 'Counts the 23 named organizations in the Upper School across four categories. The school also reports 35 across JK–12; only the Upper School band is used here for a like-for-like comparison.',
      },
      'charlotte-country-day': {
        kind: 'range',
        text: 'The school publishes a range rather than a list — its Upper School page cites “nearly 50 clubs” and the 2025–26 profile lists “45 different clubs and activities.” Only 7 are confirmed by name in public sources.',
      },
      'davidson-day': {
        kind: 'minimum',
        text: 'Davidson Day publishes no Upper School club roster, so this counts only the clubs confirmed in public sources — a documented floor, not a total.',
      },
      'providence-day': {
        kind: 'official',
        text: 'Taken from the school’s official 2025–26 Upper School club list, with 5 arts clubs excluded for a clean count — the deepest slate in the set.',
      },
      // charlotte-latin deliberately absent — exact in-scope count, no caveat
    },
  },
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
    quals: {
      cannon: {
        kind: 'scope',
        text: 'The Brainy Yaks robotics team finished in the top 100 of more than 32,000 teams at the FIRST LEGO League World Championship, in back-to-back years (2024 and 2025).',
      },
      'charlotte-christian': {
        kind: 'scope',
        text: 'The Middle School Chess team placed 2nd at a tournament — the most notable competitive club result the school’s note documents.',
      },
      'charlotte-country-day': {
        kind: 'scope',
        text: 'The Model UN team earned 6 awards at the MUNCH 2025 conference, including 4 Outstanding Delegate honors.',
      },
      'charlotte-latin': {
        kind: 'scope',
        text: 'The debate program was named to the NSDA Schools of Excellence — a top-20 ranking nationally.',
      },
      'davidson-day': {
        kind: 'scope',
        text: 'The Middle School Battle of the Books team placed 1st in its regional competition.',
      },
      'providence-day': {
        kind: 'scope',
        text: 'The DECA business team advanced to the national International Career Development Conference (ICDC) in 2026.',
      },
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
    quals: {
      cannon: {
        kind: 'scope',
        text: 'About 10,000 service hours a year, scoped to the Upper School page that carries it. This replaces an older ~15,000 school-wide figure the school no longer publishes.',
      },
      'charlotte-country-day': {
        kind: 'scope',
        text: 'About half of juniors and seniors mentor younger students weekly — a mentoring-participation figure rather than a club-membership one.',
      },
      'charlotte-latin': {
        kind: 'scope',
        text: 'About 90% of students in grades 7–12 play a sanctioned sport. This is a sports-participation figure, the breadth measure the school publishes.',
      },
      'providence-day': {
        kind: 'scope',
        text: 'Service clubs engage roughly half of the Upper School.',
      },
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
      cannon: '6:00 PM', // After School Program, 3:00–6:00 p.m. on regular days
      // These two remain null because no single hour is honest for the whole school:
      // Charlotte Christian's Lower School runs to 6:00 but Middle School stops at
      // 5:00, and Providence Day's 1–6 p.m. Extended Day is Lower School only.
      'charlotte-christian': null,
      'providence-day': null,
    },
    quals: {
      cannon: {
        kind: 'scope',
        text: 'The JrK–8 After School Program runs 3:00–6:00 p.m. on regular days. On early-dismissal days it runs 11:45 a.m.–4:00 p.m., ending two hours earlier than the 6:00 shown here.',
      },
      'charlotte-christian': {
        kind: 'scope',
        text: 'The two divisions differ, so no single time fits: Lower School Extended Day (JK–4) runs to 6:00 p.m., while Middle School Extended Day ends at 5:00 p.m., a full hour earlier.',
      },
      'charlotte-country-day': {
        kind: 'scope',
        text: 'The Lower School’s Structured Care program runs until 6:00 p.m. Confirm current hours with the school.',
      },
      'charlotte-latin': {
        kind: 'scope',
        text: 'The Lower School’s Hawks’ Club aftercare runs 1:30–6:00 p.m. Confirm current hours with the school.',
      },
      'davidson-day': {
        kind: 'scope',
        text: 'The Lower School’s Extended Care runs 2:45–6:00 p.m. Confirm current hours with the school.',
      },
    },
  },

  // Cost of the most expensive published after-school arrangement at each school:
  // highest-priced grade band × latest pickup tier × five days a week. Rates come
  // from the July 2026 research pass in source-material/after-school/<school>/
  // ("Redesign Research 2026.md" — these SUPERSEDE the older Pricing.md files),
  // and every figure was re-verified against the school's live page on 2026-08-15.
  //
  // The schools bill in different units — annual, monthly, per semester — so each
  // headline is the school's OWN published figure in its OWN unit, never annualized
  // into a number no school publishes. Where a school bills monthly, the tooltip
  // carries a ×10-month estimate, worded as an estimate.
  //
  // "Most expensive" partly measures who dismisses earliest — a school whose TK
  // day ends at 1:00 p.m. sells five hours of care where a 3:00 p.m. dismissal
  // sells three — so every tooltip states the hours covered.
  {
    topic: 'after-school',
    key: 'aftercare-cost',
    label: 'Cost of after-school care',
    // No leader tint: this is a price, so the highest value is the worst one.
    noLead: true,
    note: 'The most expensive published arrangement: the highest-priced grade band, at the latest pickup tier, five days a week. Each cell shows a monthly cost with the year’s total beneath it. The schools bill in different periods — monthly, per semester, annually — so a ≈ marks the figure we converted rather than the one that school publishes, assuming a 10-month school year. Read the per-cell notes before comparing. 2026–27 rates, except Cannon’s 2025–26.',
    values: {
      cannon: '≈$378/mo', // $3,784/yr ÷ 10 — Cannon publishes the ANNUAL figure only
      'charlotte-christian': '$325/mo', // JK–Grade 4 Extended Day to 6:00 p.m., 5 days/wk, 2026-27
      'charlotte-country-day': '$900/mo', // JK · 6:00 p.m. tier · 5 days/wk, 2026-27
      'charlotte-latin': '≈$930/mo', // $4,650/sem × 2 ÷ 10 — Latin publishes the SEMESTER figure only
      'davidson-day': null, // publishes no extended-care pricing — its Extended Care page 404s
      'providence-day': '$750/mo', // TK · 1–6 p.m. tier · 5 days/wk, 2026-27
    },
    // The year's total under each monthly figure. Cannon's and Latin's are the
    // schools' OWN published figures ($3,784/yr, $4,650/sem × 2) and carry no ≈;
    // the other three are 10-month estimates of a monthly rate, so they do.
    subs: {
      cannon: '$3,784/yr', // published as an annual figure
      'charlotte-christian': '≈$3,250/yr', // $325 × 10
      'charlotte-country-day': '≈$9,000/yr', // $900 × 10
      'charlotte-latin': '$9,300/yr', // $4,650 × 2 semesters, as published
      'providence-day': '≈$7,500/yr', // $750 × 10
    },
    quals: {
      cannon: {
        kind: 'scope',
        text: 'Cannon publishes one annual price, $3,784 — the monthly figure above is that spread over 10 months, not a rate the school quotes. It buys the JrK–8 After School Program, 3:00–6:00 p.m. (3 hours) five days a week, at 2025–26 rates: the only school here not on 2026–27, because the page carrying the rate card is no longer publicly linked.',
      },
      'charlotte-christian': {
        kind: 'scope',
        text: 'JK–Grade 4 Extended Day to 6:00 p.m., five days a week, billed monthly at $325 for 2026–27; the yearly total assumes 10 billing months. Rates rose 32–52% over 2024–25, and Middle School is not in this figure because it bills by the hour ($8/hr, ending at 5:00 p.m.).',
      },
      'charlotte-country-day': {
        kind: 'scope',
        text: 'Junior Kindergarten at the 6:00 p.m. tier, five days a week, billed monthly at $900 — the yearly total assumes 10 months, which the school does not publish. JK dismisses at 1:15 p.m., so this buys roughly 4.75 hours a day; Grades 1–4 at the same 6:00 p.m. tier is $610/mo.',
      },
      'charlotte-latin': {
        kind: 'scope',
        text: 'Latin bills per semester, $4,650 twice a year — the monthly figure above is that $9,300 spread over 10 months, not a rate the school quotes. It covers TK/K at the 1:30–6:00 p.m. tier five days a week; TK and Kindergarten dismiss at 1:30 p.m., so this buys 4.5 hours a day, more than any figure beside it. Grades 1–5 at their 2:55–6:00 p.m. tier is $3,000 a semester.',
      },
      'providence-day': {
        kind: 'scope',
        text: 'Transitional Kindergarten at the 1–6 p.m. tier, five days a week, billed monthly at $750; the yearly total assumes 10 months, and the school states outright that its number of billing months is not published. TK dismisses at 1:00 p.m., so this covers 5 hours a day; Grades 1–5 at 3–6 p.m. is $470/mo, and there is no drop-in option.',
      },
    },
  },

  // =========================== Summer Programs =============================
  // Transcribed from each school's own 2026 summer publication — see
  // source-material/summer-programs/<school>/ for the per-camp detail and source
  // URLs behind every figure.
  //
  // DAVIDSON DAY IS null ON ALL FOUR ROWS, and that is a finding rather than a
  // hole in the research: it publishes no summer program at all (its summer page
  // renders a heading over an empty content block). See
  // .claude/docs/summer-programs-davidson-day-negative-finding.md. Its school
  // page shows no Summer Programs section for the same reason.
  //
  // The camp counts are NOT directly comparable school to school, because the
  // schools count differently — Latin and Cannon publish session-level rows (a
  // camp offered in three weeks counts three times), Country Day the same, while
  // Charlotte Christian's 133 is also session-level. Each cell therefore carries
  // a `quals` note saying which unit it is in; the Compare row is honest only
  // with those notes attached.
  {
    topic: 'summer-programs',
    key: 'summer-weeks',
    label: 'Weeks of summer camp',
    note: 'Number of camp weeks the school runs in summer 2026, counting shortened holiday weeks. A longer season is more weeks a family can cover.',
    values: {
      cannon: '7', // June 8 – July 31, closed Juneteenth + the week of June 29
      'charlotte-christian': '6', // June 1 – July 17, two-week break around July 4
      'charlotte-country-day': '8', // June 1 – July 24, incl. the June 1-5 "Pre-Camp" week
      'charlotte-latin': '7', // June 8 – July 31, no camps June 29 – July 4
      'davidson-day': null, // publishes no summer program — see the negative-finding note
      'providence-day': '9', // June 1 – July 31, the longest season of the five
    },
    quals: {
      'charlotte-country-day': {
        kind: 'scope',
        text: 'Eight weeks including the June 1-5 "Pre-Camp" week, which carries 9 priced camps. The school’s own summer landing page markets the season as the seven weeks from June 8.',
      },
      'charlotte-christian': {
        kind: 'scope',
        text: 'Six weeks, but not consecutive: the school takes a two-week break around July 4 (June 29 – July 3 has no camps).',
      },
    },
  },
  {
    topic: 'summer-programs',
    key: 'summer-camps',
    label: 'Camps published',
    note: 'Camp offerings in the school’s own 2026 catalog. Counting conventions differ — most schools count each week a camp runs as a separate row — so read the per-cell notes before comparing.',
    values: {
      cannon: '251', // camp-week offerings; ~180 distinct titles
      'charlotte-christian': '133', // session-level rows; ~96 distinct camps
      'charlotte-country-day': '132', // session-level rows; ~85 distinct titles
      'charlotte-latin': '232', // camp offerings; 169 unique titles
      'davidson-day': null,
      'providence-day': '170', // priced brochure rows; 151 distinct names
    },
    quals: {
      cannon: {
        kind: 'scope',
        text: '251 camp-week offerings across seven weeks, representing roughly 180 distinct camp titles. Counted from the school’s own 80-page 2026 brochure.',
      },
      'charlotte-latin': {
        kind: 'scope',
        text: '232 offerings across seven sessions, from 169 unique camp titles — a camp running in three sessions is counted three times.',
      },
      'providence-day': {
        kind: 'scope',
        text: '170 priced rows in the 2026 brochure, covering 151 distinct camp names and 231 total camp-session offerings.',
      },
      'charlotte-country-day': {
        kind: 'scope',
        text: '132 priced rows, roughly 85 distinct camp titles. The school separately markets the program as "over 150 exciting camp options", a figure its public listing does not itemize.',
      },
      'charlotte-christian': {
        kind: 'scope',
        text: '133 half-day sessions across six weeks, roughly 96 distinct camps. Every one is a three-hour half-day — the school publishes no full-day camp.',
      },
    },
  },
  {
    topic: 'summer-programs',
    key: 'summer-ages',
    label: 'Ages served',
    note: 'The span the school’s own summer catalog covers. Latin and Cannon index camps by age; the others publish grade bands, shown here as the school states them.',
    values: {
      cannon: '4–18', // "Open to all children ages 4 to 18"
      'charlotte-christian': 'JK–Grade 12', // rising 2026-27 grades; JK must turn 4 by Feb 1
      'charlotte-country-day': 'Age 4–Grade 12', // listing bands run Age 4 to Grade 12
      'charlotte-latin': '3.5–18', // "open to all campers ages 3.5 - 18 years old"
      'davidson-day': null,
      'providence-day': '4–18', // four by January 1, 2026; About page says 4.5 to 18
    },
    quals: {
      'charlotte-latin': {
        kind: 'official',
        text: 'The school states camps are "open to all campers ages 3.5 - 18 years old". Age is calculated as of August 1, 2026, and all Pre-K campers must be toilet trained.',
      },
      'providence-day': {
        kind: 'official',
        text: 'The brochure says campers must be "at least four years old by January 1, 2026"; the About page states ages 4.5 to 18. Both are the school’s own wording.',
      },
      'charlotte-country-day': {
        kind: 'scope',
        text: 'The listing’s lowest published band is Age 4. The school’s own pages disagree on the floor — the summer page says ages 4–18, the after-school page says 3–18.',
      },
      'charlotte-christian': {
        kind: 'scope',
        text: 'Grades are rising 2026-27. JK campers must have turned 4 by February 1, 2026.',
      },
      cannon: {
        kind: 'official',
        text: 'The school states Camp Cannon is "open to all children ages 4 to 18". Campers must be fully potty trained, and only camps matching a child’s age appear during online registration.',
      },
    },
  },
  {
    topic: 'summer-programs',
    key: 'summer-care-span',
    label: 'Wrap-around care',
    note: 'Earliest drop-off to latest pickup with the school’s paid before- and after-care options — the real outer limit of a camp day for a working family.',
    values: {
      cannon: '7:30 AM–5:30 PM', // before care from 7:30, after care to 5:30
      'charlotte-christian': '8:00 AM–5:00 PM', // "arrive as early as 8 a.m. and stay as late as 5 p.m."
      'charlotte-country-day': '7:30 AM–5:00 PM', // Morning Care 7:30, Afternoon Care ends 5
      'charlotte-latin': '7:30 AM–5:30 PM', // Before Care 7:30–8:15, After Care to 5:30
      'davidson-day': null,
      'providence-day': '7:00 AM–6:00 PM', // Before Care from 7, After Care to 6 — the widest span
    },
    quals: {
      'providence-day': {
        kind: 'scope',
        text: 'An eleven-hour span, the widest of the five — Before Care from 7am and After Care to 6pm, both $120/week, or $220/week bundled as Complete Care.',
      },
      'charlotte-christian': {
        kind: 'scope',
        text: 'A nine-hour span. Because every camp is a half-day, covering a full working day means registering a morning AND an afternoon camp; the noon–1 p.m. bridge care between them is free.',
      },
      cannon: {
        kind: 'scope',
        text: 'A ten-hour span: Before Care from 7:30 am at $50/week and After Care to 5:30 pm at $60/week, or $90/week for both. Camp itself runs 9:00–4:00.',
      },
      'charlotte-latin': {
        kind: 'scope',
        text: 'A ten-hour span. Before Care runs 7:30–8:15 am ($70.00/week) and After Care to 5:30 pm ($150.00/week); the Super Care bundle is $195.00/week. Late pick-up is $25.00 every 15 minutes.',
      },
      'charlotte-country-day': {
        kind: 'scope',
        text: 'A nine-and-a-half-hour span: Morning Care from 7:30 am ($105/week) and Afternoon Care to 5 pm ($85/week), or $160/week bundled as Super Care. Late pick-up is $1/minute after 5 pm.',
      },
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
    quals: {
      cannon: {
        kind: 'minimum',
        text: 'A documented minimum. Several of Cannon’s best-known athletes committed outside the 2024–26 window and so are not counted here.',
      },
      'charlotte-christian': {
        kind: 'minimum',
        text: 'A documented minimum: the school’s public commitment list runs through 2025, and its Class of 2026 is not yet compiled.',
      },
      'charlotte-latin': {
        kind: 'minimum',
        text: 'A documented minimum. Charlotte Latin’s academically heavy classes send many athletes to Division III, and its November signing lists are partial.',
      },
      'davidson-day': {
        kind: 'minimum',
        text: 'A documented minimum; the Classes of 2024 and 2026 are under-documented for Davidson Day.',
      },
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
    quals: {
      cannon: {
        kind: 'minimum',
        text: 'A documented minimum. Several of Cannon’s best-known athletes committed outside the 2024–26 window and so are not counted here.',
      },
      'charlotte-christian': {
        kind: 'minimum',
        text: 'A documented minimum: the school’s public commitment list runs through 2025, and its Class of 2026 is not yet compiled.',
      },
      'charlotte-latin': {
        kind: 'minimum',
        text: 'A documented minimum. Charlotte Latin’s academically heavy classes send many athletes to Division III, and its November signing lists are partial.',
      },
      'davidson-day': {
        kind: 'minimum',
        text: 'A documented minimum; the Classes of 2024 and 2026 are under-documented for Davidson Day.',
      },
    },
  },
]

/* ---------------------------------------------------------- translations -- */

/*
 * DEFERRED behind a function — `import.meta.glob` cannot be parsed by plain
 * Node, and the build-time checkers import this module directly. At module
 * scope it makes check_translations.mjs report an empty topic. See
 * courseOfferings.ts for the same treatment and the reasoning.
 */
function overlayFiles() {
  return import.meta.glob<OverlayFile>('./overlays/metric-values.*.json', {
    import: 'default',
  })
}

/** Warms the overlay for a locale; resolves once the index is ready. */
export async function loadMetricValuesOverlay(lang: string): Promise<void> {
  if (hasOverlay('metric-values', lang)) return
  const load = overlayFiles()?.[`./overlays/metric-values.${lang}.json`]
  if (!load) {
    setOverlayIndex('metric-values', lang, undefined)
    return
  }
  try {
    setOverlayIndex('metric-values', lang, indexOverlay(await load()))
  } catch {
    // A missing or malformed overlay must not break the page: English stands in.
    setOverlayIndex('metric-values', lang, undefined)
  }
}

/**
 * Stat-tile metrics for a topic, localized.
 *
 * Unlike the per-school topics, VALUE_METRICS is ONE array shared by every
 * school, so the overlay was extracted under the first slug and is resolved
 * with that same prefix here.
 *
 * With no overlay for `lang` this returns the English objects BY REFERENCE (see
 * the identity requirement in src/lib/localizeData.ts).
 */
export function valueMetricsForTopic(topicSlug: string, lang = 'en'): ValueMetric[] {
  const en = VALUE_METRICS.filter((m) => m.topic === topicSlug)
  if (lang === 'en') return en

  const index = overlayIndex('metric-values', lang)
  if (!index) return en
  // The extractor walks the WHOLE array, so overlay keys read
  // `providence-day:[17].label` — the array index is part of the path, not the
  // prefix. Localize the array itself so `walk` produces that index, then pick
  // the topic's rows back out. Filtering first and localizing each row would
  // renumber the indices and resolve nothing.
  const all = localized(VALUE_METRICS, index, 'providence-day')
  return all.filter((m) => m.topic === topicSlug)
}
