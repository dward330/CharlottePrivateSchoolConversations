// Charlotte Preparatory School — Sports research area.
//
// Every figure is traceable to the two committed research files under
// source-material/sports/charlotte-prep/, which carry the source URLs, the
// conflicts recorded both ways, and the confirmed-not-published list:
//
//   "Charlotte Preparatory School - Sports - Sports Offered and Participation.md"
//   "Charlotte Preparatory School - Sports - Selected Results and Coaching.md"
//
// Charlotte Prep is PreK–8, so — as with Trinity Episcopal, the K–8 precedent —
// only two cards are built: 1a offered and 1e coaching. The four
// college-bound cards (pipeline, honors, facilities, national) do not apply to a
// middle school programme, and `record` is omitted because `TitleResult` is an
// NCISAA STATE-title vocabulary: Charlotte Prep's titles are Queen City
// Conference titles, so they are carried as prose in `offered.footnote`.
//
// Three traps, each a real stale-data risk on this school's own site:
//
//  1. Fast Facts' "18 conference and tournament titles" is NOT current. The
//     January 2013 Fast Facts read "eighteen conference or tournament
//     championships in the last five years", and the figure has not moved
//     since. It is never shown here.
//  2. Former staff. "Coach Shelley" was AD as late as September 2024, and the
//     2024 volleyball coach is no longer in the staff directory. Neither is
//     named as current staff.
//  3. The two participation figures disagree (athletics page "more than 80
//     percent"; Fast Facts "70+%"). The school's own athletics-page sentence is
//     quoted with its wording rather than either figure being picked silently.

import type { SportsProgram } from '../sportsProgram.ts'

const ATHLETICS = 'https://charlotteprep.org/student-life/athletics'
const FAST_FACTS = 'https://charlotteprep.org/about/fast-facts'
const STRATEGIC = 'https://charlotteprep.org/about/strategic-plan-2022-2027'
const QCC_BASKETBALL =
  'https://charlotteprep.org/community/news/stories/tigers-win-qcc-championship'
const QCC_VOLLEYBALL =
  'https://charlotteprep.org/community/news/stories/victory-for-girls-volleyball'
const SUTTLES = 'https://charlotteprep.org/about/faculty-staff-directory?id=455452'
const SUMMER_GROWTH =
  'https://charlotteprep.org/community/news/stories/summer-of-growth-teachers-learning-leading-and-innovating'
const PORTAL_2013 =
  'https://web.archive.org/web/20130719131848/http://www.charlotteprep.org/athletics/portal/default.asp'

export const charlottePrep: SportsProgram = {
  /* ---------------------------------------------------------- 1a offered -- */
  offered: {
    headline:
      'Ten named middle school teams across three seasons, open from 5th grade — "one of the few schools that allow 5th Graders the opportunity to be a part of our sports program."',
    subhead:
      'Every team is a single grades 5–8 squad in the Queen City Conference; no A/B or JV split is published. "Including others is sometimes more important than winning." Athletics fees have been folded into tuition since 2024–25.',
    stats: [
      { value: '10', label: 'teams named on the athletics page · Fast Facts says 11' },
      { value: '5–8', label: 'grades eligible to play' },
      { value: '80%+', label: 'of Middle School plays at least one season, per the athletics page' },
      { value: 'QCC', label: 'Queen City Conference' },
    ],
    seasons: [
      {
        name: 'Fall',
        note: '4 teams',
        sports: [
          { name: 'Cross-Country – Coed', levels: ['MS'] },
          { name: 'Soccer – Boys', levels: ['MS'] },
          { name: 'Tennis – Girls', levels: ['MS'] },
          { name: 'Volleyball – Girls', levels: ['MS'] },
        ],
      },
      {
        name: 'Winter',
        note: '2 teams',
        sports: [
          { name: 'Basketball – Boys', levels: ['MS'] },
          { name: 'Basketball – Girls', levels: ['MS'] },
        ],
      },
      {
        name: 'Spring',
        note: '3 teams',
        sports: [
          { name: 'Golf – Coed', levels: ['MS'] },
          { name: 'Soccer – Girls', levels: ['MS'] },
          { name: 'Tennis – Boys', levels: ['MS'] },
        ],
      },
    ],
    footnote:
      'Selected results, all Queen City Conference play. GIRLS’ BASKETBALL, 2023–24: "They won the regular season conference for the first time in 10 years and the QCC Tournament Championship final for the first time in 14 years." GIRLS’ VOLLEYBALL, fall 2024: the 12-player team "won the QCC tournament championship". Girls Cheerleading is also offered, with no season given on the current page. For younger students, "various athletic studios are offered to students of all ages, from Pre-Primary to 8th Grade" — golf, tennis, martial arts, soccer and gymnastics among them. The campus field, developed in 2013 as Founders Field, held modular classrooms that have since been decommissioned; its restoration was due to begin in fall 2025. The gym doubles as the stage for school productions.',
    sources: [
      { label: 'charlotteprep.org — Athletics', url: ATHLETICS },
      { label: 'charlotteprep.org — Fast Facts (11 teams, 70+% participation)', url: FAST_FACTS },
      { label: 'charlotteprep.org — Strategic Plan 2022–2027 (fees folded into tuition)', url: STRATEGIC },
      {
        label: 'charlotteprep.org — "Tigers Win QCC Championship!", Feb 14 2024',
        url: QCC_BASKETBALL,
      },
      {
        label: 'charlotteprep.org — "Victory for Girls\' Volleyball", Oct 24 2024',
        url: QCC_VOLLEYBALL,
      },
      { label: 'Archived athletics portal, 2013 (Queen City Conference named)', url: PORTAL_2013 },
    ],
  },

  /* --------------------------------------------------------- 1e coaching -- */
  coaching: {
    headline:
      'Renee Suttles leads the programme as Athletic Director and P.E. teacher — at Charlotte Prep since 2018.',
    subhead:
      'Teams are coached by faculty: the 2023–24 girls’ basketball champions were coached by "three Charlotte Prep teachers".',
    featured: [
      {
        kicker: 'Athletic Director · P.E. teacher, at Charlotte Prep since 2018',
        name: 'Renee Suttles',
        stats: [
          { value: '2018', label: 'joined Charlotte Prep, as Middle School P.E. teacher' },
          { value: 'B.S.', label: 'PK-12 Health and Physical Education, Kennesaw State University' },
        ],
        detail:
          'Suttles came to Charlotte Prep in 2018 to teach Middle School P.E. and now holds the Athletic Director title alongside it. Before Charlotte Prep she taught P.E. at Crowders\' Creek Elementary School and health and P.E. for grades 6–8 at Moses Middle School, where she coached softball and girls\' basketball. In summer 2025 she attended Athletic Directors Training in Charlottesville, VA, "focusing on planning and safety". The school does not publish the date she became AD.',
      },
    ],
    tenure: [
      {
        name: 'Renee Suttles',
        role: 'Athletic Director · P.E. Teacher',
        width: 1,
        since: 'since 2018',
      },
      {
        name: 'Amber O\'Connell',
        role: 'P.E. and Middle School Health Teacher · has served as cross country coach',
        width: 0.5,
        since: 'since 2022',
      },
    ],
    sources: [
      { label: 'charlotteprep.org — Faculty & Staff Directory: Renee Suttles', url: SUTTLES },
      {
        label: 'charlotteprep.org — Faculty & Staff Directory: Amber O\'Connell',
        url: 'https://charlotteprep.org/about/faculty-staff-directory?id=455426',
      },
      {
        label: 'charlotteprep.org — "Summer of Growth", Oct 1 2025 (AD training)',
        url: SUMMER_GROWTH,
      },
      {
        label: 'charlotteprep.org — "Tigers Win QCC Championship!", Feb 14 2024',
        url: QCC_BASKETBALL,
      },
    ],
  },
}
