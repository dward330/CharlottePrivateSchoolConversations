// Providence Day School — Student Clubs (1a / 1b / 1c).
//
// Transcribed from source-material/student-clubs/providence-day/
// "Providence Day - Student Clubs - Clubs Redesign Deep Research.md", which
// carries a source URL and a VERIFIED / ARCHIVED / NOT FOUND marker on every
// fact.
//
// Providence Day has the richest affinity data in the comparison set — a full
// roster with FOUNDING YEARS for every group, three divisions, faculty, alumni
// and parent networks. Two research outcomes shaped this file:
//
//  1. The roster is only reachable in ARCHIVE. The site moved from /about/… to
//     /the-pd-difference/…, and the pages that enumerate groups now 404.
//     Re-verified live on 2026-07-26: the EIB landing page returns 200 but names
//     no groups (they are four unlabeled image tiles); the roster page returns
//     404. So the flag here is a GAP, not a count discrepancy — there is no
//     rival number to reconcile, the school simply stopped publishing the list.
//     Citations point at the dated Wayback captures that actually carry the
//     names, per the project's cite-the-URL standard.
//
//  2. The identity groups sit under the DEI office, NOT under global education,
//     which is a separate department. That settles the question the research
//     brief raised, and it is why Round Square appears under service (1b) and
//     not here.

import type { ClubsProgram } from '../clubsProgram.ts'

const EIB = 'https://www.providenceday.org/the-pd-difference/equity-inclusion-and-belonging'
const ROSTER_ARCHIVE =
  'https://web.archive.org/web/20250313123919/https://www.providenceday.org/about/equity-inclusion/office-of-equity-inclusion-summary-report/connectivity'
const REPORT_2022_ARCHIVE =
  'https://web.archive.org/web/20231213140845/https://www.providenceday.org/about/equity-inclusion/2022-annual-report-on-equity-inclusion-and-belonging/inclusion'
const GSA_NEWS =
  'https://www.providenceday.org/about/pd-communications/news-media/post/~board/news-media/post/upper-school-gsa-supports-time-out-youth'
const FREEDOM_SCHOOL = 'https://www.providenceday.org/about/freedom-school'
const SOCIAL_RESPONSIBILITY_ARCHIVE =
  'https://web.archive.org/web/20250407090326/https://www.providenceday.org/about/social-responsibility'
const PVSA_NEWS =
  'https://www.providenceday.org/about/pd-communications/news-media/post/~board/news-media/post/students-earn-national-honor-while-serving-their-community'
const GLOBAL_ED = 'https://www.providenceday.org/the-pd-difference/global-education'
const WHY_PD = 'https://www.providenceday.org/admissions/why-providence-day'
const CUM_LAUDE_NEWS =
  'https://www.providenceday.org/about/pd-communications/news-media/post/~board/news-media/post/pd-celebrates-34-new-members-of-the-cum-laude-society'
const NHS_NEWS = 'https://www.providenceday.org/cf_news/view.cfm?newsid=2101'
const TRI_M_NEWS =
  'https://www.providenceday.org/about/pd-communications/news-media/post/~board/news-media/post/eleven-upper-school-students-inducted-into-tri-m-music-honor-society'

export const providenceDay: ClubsProgram = {
  affinity: {
    headline:
      'Nine Upper School affinity groups with a documented founding year apiece, plus Middle and Lower School groups, faculty and alumni networks, and three parent groups — all under a staffed DEI office.',
    subhead:
      'The deepest published affinity structure in this comparison set, built out steadily from 1995 onward — though the school’s own live site no longer lists it.',
    umbrella: {
      name: 'Office of Equity, Inclusion & Belonging (EIB)',
      detail:
        'led by Tyrone Jean, Assistant Head of School for EIB and Chief Diversity Officer · 1 assistant head + 2 associate directors + 6 faculty coordinators',
    },
    groups: [
      { name: 'Fellowship of Christian Athletes', detail: 'est. 1995 — the oldest group' },
      { name: 'Gender and Sexuality Alliance', detail: 'est. 2015, formerly HRA · 40+ active members' },
      { name: 'Black Student Union', detail: 'est. 2016' },
      { name: 'Asian Affinity Group', detail: 'est. 2017' },
      { name: 'Jewish Culture Club', detail: 'est. 2017' },
      { name: 'SAGE', detail: 'Students Advocating for Gender Equality · est. 2017' },
      { name: 'Multiracial Affinity Group', detail: 'est. 2017' },
      { name: 'Hispanic/Latinx Affinity Group', detail: 'est. 2018' },
      {
        name: 'AMEMSA',
        detail: 'Arab, Middle Eastern, Muslim & South Asian affinity · est. 2020',
      },
    ],
    strips: [
      {
        title: 'Middle School',
        hint: '· 3 groups',
        text: 'Diversity Club, est. 2018 · CEED — Council for Education on Equity and Diversity, est. 2020 · Rainbow Alliance, added by 2022',
      },
      {
        title: 'Lower School',
        hint: '· grades 4–5',
        text: 'Kaleidoscope, a 5th-grade equity and social-justice learning space, est. 2019 · African-American and Asian Affinity Group for grades 4–5, est. 2020 · a Jewish Affinity Group added by 2022',
      },
      {
        title: 'Parents',
        text: 'Anti-Racist Task Force, parent-led since 2020, grown out of the Multicultural Advisory Board · Black Families Network and Hispanic Families Network, both est. 2021 · the Parents’ Association Cultural Connections committee, which hosts Diwali, Hanukkah, Lunar New Year and Eid al-Fitr.',
      },
      {
        title: 'Faculty & alumni',
        text: 'Faculty of Color Group, est. 2018 · AWARE — Alliance of White Anti-Racist Educators, est. 2019 · AFIRM for alumni, est. 2020.',
      },
    ],
    leadership:
      'The Student Diversity Council, established 2017, is the formal liaison between students and Upper School administrators. Faculty attend the NAIS People of Color Conference for professional development; no student attendance at the national Student Diversity Leadership Conference is published.',
    flags: [
      {
        kind: 'gap',
        text: 'The school’s live site no longer enumerates its own affinity groups. The EIB page presents them as four unlabeled image tiles — Lower School, Middle School, Upper School, and Families/Faculty/Staff — with no names and no count anywhere in the page. The full roster above survives only in dated web-archive captures of pages that now return 404, which is why the sources below point there.',
      },
      {
        kind: 'count',
        text: 'The archived roster lists Black Student Union twice with two different founding years — 2016 and 2017 — on the school’s own page. We show 2016, the earlier of the two.',
      },
    ],
    sources: [
      { label: 'providenceday.org — Equity, Inclusion & Belonging (live)', url: EIB },
      { label: 'EIB "Connectivity" roster — web archive, captured 2025-03-13', url: ROSTER_ARCHIVE },
      { label: '2022 EIB annual report — web archive, captured 2023-12-13', url: REPORT_2022_ARCHIVE },
      { label: 'School news — GSA membership & Rainbow Day', url: GSA_NEWS },
    ],
  },

  service: {
    headline:
      'The first independent school in the country to host a Children’s Defense Fund Freedom School — and still the only one running it every summer.',
    subhead:
      'Service here is measured and externally recognized: thousands of logged hours, national volunteer awards, and a global network membership no other school in the state holds.',
    programs: [
      {
        value: '55',
        valueLabel: 'scholars each summer · since 2012',
        name: 'Providence Day Freedom School',
        detail:
          'A summer literacy program for K–8 Charlotte scholars run with Freedom School Partners. Providence Day was the first independent school in the country to host a CDF Freedom School, and remains the only one hosting a program every summer; the community collects supplies for all 18 Charlotte sites.',
        source: { label: 'Freedom School', url: FREEDOM_SCHOOL },
      },
      {
        value: '5,247',
        valueLabel: 'service hours in one school year',
        name: 'Community Engagement & the President’s Volunteer Service Award',
        detail:
          'Logged service totalling 20,642 hours since 2017, with 48 students earning the national award in 2024 — 24 Gold, 5 Silver, 9 Bronze. Partners include Wayfinders, the Charlotte Mecklenburg Library, Mecklenburg County Teen Court and the Augustine Literacy Project.',
        source: { label: 'School news — PVSA', url: PVSA_NEWS },
      },
      {
        value: '250+',
        valueLabel: 'schools · 50 countries · joined 2016',
        name: 'Round Square',
        detail:
          'The only member school in North Carolina. The global network is built on the IDEALS framework — International understanding, Democracy, Environmental stewardship, Adventure, Leadership and Service — and carries international service projects ("Big Builds") and exchanges.',
        source: { label: 'Global Education', url: GLOBAL_ED },
      },
    ],
    footnoteTitle: 'Beyond the big three',
    footnote:
      'The school also advertises over 30 student-run service clubs, and each division carries its own partnership: 6th grade with Movement School, 7th with Winterfield Elementary, 8th with Wilson STEM Academy, and a 9th-grade Charger Impact Challenge.',
    flags: [
      {
        kind: 'not-a-club',
        text: 'The grade-level partnerships and the Charger Impact Challenge are curricular initiatives rather than clubs, and the President’s Volunteer Service Award is an individual recognition of logged hours, not a membership. The Community Engagement Portal is an opportunity-listing tool. The catalog card lists only confirmed organizations.',
      },
    ],
    sources: [
      { label: 'providenceday.org — Freedom School', url: FREEDOM_SCHOOL },
      { label: 'Social Responsibility — web archive, captured 2025-04-07', url: SOCIAL_RESPONSIBILITY_ARCHIVE },
      { label: 'Why Providence Day (30+ service clubs)', url: WHY_PD },
    ],
  },

  honors: {
    headline:
      'Five selective societies spanning scholarship, service, visual art, music and French.',
    subhead:
      'These are outcomes of achievement elsewhere in the program — a student earns their way in; nobody signs up.',
    societies: [
      {
        name: 'Cum Laude Society',
        division: 'Upper School',
        recognizes:
          'Superior scholastic achievement — the national academic honor society',
        feedsFrom: 'the classroom',
      },
      {
        name: 'National Honor Society',
        division: 'Upper School',
        recognizes:
          'Scholarship, leadership, service and character — 3.6 cumulative GPA minimum',
        feedsFrom: 'classroom + service',
      },
      {
        name: 'National Art Honor Society',
        division: 'Upper School',
        recognizes: 'Visual-arts achievement and service',
        feedsFrom: 'The Arts',
      },
      {
        name: 'Tri-M Music Honor Society',
        division: 'Upper School',
        recognizes: 'Music achievement and leadership · chapter established 2016',
        feedsFrom: 'The Arts',
      },
      {
        name: 'Société Honoraire de Français',
        division: 'Upper School',
        recognizes: 'French achievement — the high-school equivalent of Pi Delta Phi',
        feedsFrom: 'world languages',
      },
    ],
    flags: [
      {
        kind: 'gap',
        text: 'There is no standing honor-societies page. Every fact here comes from one-off news posts, so the published counts are historical rather than current — 89 NHS inductees in 2017, 34 Cum Laude members in 2022, nearly 50 art inductees one May, 11 Tri-M inductees in 2019. Induction criteria are published only for the National Honor Society; the other four publish none.',
      },
      {
        kind: 'gap',
        text: 'No Middle School honor society could be confirmed, and despite five world languages on offer only the French society is evidenced. Archive searches across the site’s full URL history for Rho Kappa, Mu Alpha Theta, Quill & Scroll, a junior honor society and a Spanish society returned nothing.',
      },
    ],
    sources: [
      { label: 'School news — Cum Laude induction', url: CUM_LAUDE_NEWS },
      { label: 'School news — National Honor Society criteria & induction', url: NHS_NEWS },
      { label: 'School news — Tri-M induction', url: TRI_M_NEWS },
    ],
  },
}
