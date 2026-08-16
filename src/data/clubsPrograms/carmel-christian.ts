// Carmel Christian School — Student Clubs (1b and 1c).
//
// Transcribed from source-material/student-clubs/carmel-christian/
// "Carmel Christian - Student Clubs - Clubs Redesign Deep Research.md", whose
// authoritative source is the 2021-22 Family Handbook (parsed verbatim via
// pdftotext), corroborated for the Timothy Project by its own live page.
//
// THE 1a AFFINITY CARD IS OMITTED, and that is the research finding rather
// than a hole in it: Carmel Christian's grouping model is faith-based — chapel,
// worship band, missions, and a discipleship/service organization — and no
// identity-based affinity group appears in any source, as expected at a
// Christian school. Card 1a is an ecosystem map built from a named roster; with
// no roster there are no cells to draw, so it is omitted rather than shipped
// thin (the same treatment, for the same reason, as Covenant Day).
//
// The standing club roster is deliberately thin because clubs here are
// student-initiated by application — the handbook is explicit that a student
// requests a form, applies, and the administration may accept or deny it — so
// there is no standing catalog to enumerate. The service card therefore leads
// with the Timothy Project and the published service requirement, and the
// honors card carries the four documented societies.

import type { ClubsProgram } from '../clubsProgram.ts'

const HANDBOOK = 'https://carmelchristian.org/pdf/carmel_parent/Family%20Handbook-Final.pdf'
const TIMOTHY =
  'https://www.carmelchristian.org/apps/pages/?type=d&uREC_ID=503058&pREC_ID=970730'

export const carmelChristian: ClubsProgram = {
  service: {
    headline:
      'A high-school discipleship-and-service organization where students mentor Extended-Day children weekly — the school’s one standing service org, entered by application and interview.',
    subhead:
      'Service is a published graduation-adjacent expectation here: a minimum of 20 service hours per grade level in high school, met partly through J-Term and Beta Club rather than a single logged total.',
    programs: [
      {
        value: '1 hr/wk',
        valueLabel: 'Mon–Fri · 3:30–4:30 · HS mentors',
        name: 'The Timothy Project',
        detail:
          'High school students mentor children in the school’s Extended-Day program, entered by application, teacher recommendation, a September interview and October training. It is the one standing high-school service and discipleship organization, run on a fixed weekly schedule rather than as an opt-in sign-up.',
        source: { label: 'The Timothy Project', url: TIMOTHY },
      },
      {
        value: '20 hrs',
        valueLabel: 'required per grade level · high school',
        name: 'Service-hour requirement',
        detail:
          '"A minimum of 20 hours are the required service hours per grade level." J-Term service hours can count toward the requirement (up to 20 per J-Term course), and Beta Club adds its own 10 hours per semester. No school-wide cumulative total is published.',
        source: { label: 'Family Handbook (2021–22)', url: HANDBOOK },
      },
      {
        value: 'req.',
        valueLabel: 'week-long · graduation requirement',
        name: 'J-Term & missions',
        detail:
          'A mandatory week-long J-Term course is a graduation requirement and can include mission trips; the high school also runs international missions trips. See You at the Pole, the annual student prayer gathering, is led by the MS SGA and HS Student Council.',
        source: { label: 'Family Handbook (2021–22)', url: HANDBOOK },
      },
    ],
    footnoteTitle: 'Beyond the standing org',
    footnote:
      'Spiritual-life traditions carry the rest of the program: the Windy Gap fall spiritual retreat in the NC mountains for Middle and High School, See You at the Pole, and Christmas and Spring Arts programs. Cornerstone Prayer Ministry is a parent gathering, not a student organization, and is not counted here.',
    flags: [
      {
        kind: 'not-a-club',
        text: 'The 20-hour service requirement is an individual expectation, not a membership, and J-Term is a required course rather than a club. Cornerstone Prayer Ministry is a parent/family prayer gathering, not a student organization. Only the Timothy Project is a standing student service org.',
      },
      {
        kind: 'gap',
        text: 'No school-wide cumulative service-hours total is published, and figures rest on the 2021–22 Family Handbook (the newest published edition), so they are current but date-sensitive.',
      },
    ],
    sources: [
      { label: 'carmelchristian.org — The Timothy Project', url: TIMOTHY },
      { label: 'carmelchristian.org — Family Handbook (2021–22)', url: HANDBOOK },
    ],
  },

  honors: {
    headline:
      'Four documented societies — three high-school chapters plus a middle-school junior society — each with published GPA and induction detail.',
    subhead:
      'Entered by achievement and application: the school publishes GPA thresholds and induction windows for its academic societies rather than a standing directory page.',
    societies: [
      {
        name: 'National Honor Society',
        division: 'High School',
        recognizes:
          'Scholarship, leadership, service and character — 3.85 weighted GPA (3.75 unweighted from the class of 2024); by application, with October inductions',
        feedsFrom: 'the classroom',
      },
      {
        name: 'National Beta Club',
        division: 'High School',
        recognizes:
          'Academic achievement and service — grades 10–12, 3.50 GPA, 10 service hours per semester and 2 service projects per year; fall inductions',
        feedsFrom: 'classroom + service',
      },
      {
        name: 'Spanish Honor Society',
        division: 'High School',
        recognizes:
          'Spanish-language achievement — the "CCS Chapter of SHS"',
        feedsFrom: 'world languages',
      },
      {
        name: 'National Junior Honor Society',
        division: 'Middle School (8th)',
        recognizes:
          'Scholarship and character for 8th graders — 3.8+ GPA; October inductions',
        feedsFrom: 'the classroom',
      },
    ],
    flags: [
      {
        kind: 'gap',
        text: 'The school publishes no standing honor-society page — divisions, GPA thresholds and induction windows are transcribed from the 2021–22 Family Handbook, so faculty-sponsor names and current member counts are unstated. The Spanish Honor Society’s most recent evidence is the 2021–22 senior-cords table, so whether the chapter is still active is unconfirmed.',
      },
    ],
    sources: [
      { label: 'carmelchristian.org — Family Handbook (2021–22)', url: HANDBOOK },
    ],
  },
}
