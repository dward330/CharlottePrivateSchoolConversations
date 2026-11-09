// Charlotte Catholic High School — the eight Sports cards.
//
// ⚠️ CCHS IS AN NCHSAA SCHOOL, NOT NCISAA. It is a private school competing in
// North Carolina's PUBLIC state association — one of only four parochial members
// — currently in Division 6A, Southern Carolina Split 6A/7A Conference. Every
// other school in this app plays NCISAA. Championship counts, conference records
// and win-loss ledgers here therefore come from a different governing body and
// are not directly comparable to the rest of the roster. The TitleResult type's
// doc comment says "NCISAA state champion"; for this school every title chip
// means an NCHSAA title, which is said on the card itself. The Cup card's scoring,
// heading and table differ for the same reason.
//
// ⚠️ COMMIT DATA PROVENANCE. The commitment roster below was table-parsed from
// three named articles and each athlete checked individually. It deliberately
// does NOT use the NCFootballNews commitment tracker: read through page
// summarization that source returns ~18 "Charlotte Catholic" commits, while its
// raw HTML shows only ~4 — the rest belong to Providence Day and Charlotte
// Christian, both already in this app (Leo Delaney and Zaid Lott are live in
// src/data/sportsPrograms/providence-day.ts). None of the 35 athletes below is
// one of those canary names.
//
// Three counting rules applied here:
//  1. Attribute by GRADUATING school. Cannon Ridinger attended Charlotte Country
//     Day (also in this app) before graduating from CCHS, so he counts here and
//     must not also be counted for Country Day.
//  2. Mary Catherine Farley (Wofford) is EXCLUDED — she appears on the signing
//     list but never on a college roster, failing the corroboration bar every
//     other athlete here clears. Including her would make D1 26 rather than 25.
//  3. Evan MacIntyre counts P4 at COMMITMENT time (signed Indiana); he has since
//     transferred to Belmont Abbey via JUCO. The row records the commitment.
//
// See source-material/sports/charlotte-catholic/ for the hard data and URLs.

import type { SportsProgram } from '../sportsProgram.ts'

const PROFILE_2627 =
  'https://resources.finalsite.net/images/v1787830297/charlottecatholicorg/ihsker6gva69wmhq5agy/2026-2027CCHSSchoolProfile.pdf'
const SIGN24 =
  'https://catholicnewsherald.com/94-news/schools/9839-15-cchs-student-athletes-commit-to-college-sports'
const SIGN25 = 'https://sports.yahoo.com/national-signing-day-where-charlotte-111500239.html'
const SIGN26 =
  'https://catholicnewsherald.com/94-news/schools/12397-college-signing-day-big-dreams-bigger-futures'
const GSOCCER26 =
  'https://www.highschoolot.com/story/nchsaa-6a-girls-soccer-championship-2026-charlotte-catholic-jacksonville/22362945/'
const BLAX26 =
  'https://www.highschoolot.com/story/leonards-goal-gives-charlotte-catholic-a-1a-6a-boys-lacrosse-title-over-middle-creek/22363031/'
const GLAX26 =
  'https://www.highschoolot.com/story/tan-s-ot-goal-lifts-charlotte-catholic-1a-6a-title-over-east-chapel-hill/22362987/'
const MAXPREPS = 'https://www.maxpreps.com/nc/charlotte/charlotte-catholic-cougars/football/'
const NCHSAA = 'https://www.nchsaa.org/'

export const charlotteCatholic: SportsProgram = {
  offered: {
    headline: '20 sports across three seasons, played against the state’s public schools.',
    subhead:
      'CCHS is one of only four parochial schools in the NCHSAA, so a Cougars team is measured against North Carolina’s largest public programs rather than in a private-school bracket.',
    stats: [
      { value: '20', label: 'sports offered' },
      { value: '79', label: 'state championships since 2000' },
      { value: '10', label: 'Wachovia / Wells Fargo Cups' },
      { value: '1000+', label: 'alumni who went on to NCAA / NAIA / JUCO play' },
    ],
    seasons: [
      {
        name: 'Fall',
        note: 'NCHSAA fall season',
        sports: [
          { name: 'Cross Country', levels: ['V'] },
          { name: 'Field Hockey', levels: ['V'] },
          { name: 'Football', levels: ['V', 'JV'] },
          { name: 'Golf', levels: ['V'] },
          { name: 'Soccer', levels: ['V', 'JV'] },
          { name: 'Tennis', levels: ['V'] },
          { name: 'Volleyball', levels: ['V', 'JV'] },
          { name: 'Cheerleading', levels: ['V', 'JV'] },
          { name: 'Dance Team', levels: ['V'] },
        ],
      },
      {
        name: 'Winter',
        note: 'NCHSAA winter season',
        sports: [
          { name: 'Basketball', levels: ['V', 'JV'] },
          { name: 'Hockey', levels: ['V'] },
          { name: 'Indoor Track', levels: ['V'] },
          { name: 'Swimming and Diving', levels: ['V'] },
          { name: 'Wrestling', levels: ['V'] },
        ],
      },
      {
        name: 'Spring',
        note: 'NCHSAA spring season',
        sports: [
          { name: 'Baseball', levels: ['V', 'JV'] },
          { name: 'Lacrosse', levels: ['V', 'JV'] },
          { name: 'Mountain Biking', levels: ['V'] },
          { name: 'Rugby', levels: ['V'] },
          { name: 'Softball', levels: ['V', 'JV'] },
          { name: 'Track & Field', levels: ['V'] },
        ],
      },
    ],
    footnote:
      'The 20 sports and their names are exactly as the school lists them on its All Sports page — it publishes no gender split for Soccer, Golf, Tennis, Basketball or Lacrosse even though it fields both boys’ and girls’ teams in each, and it groups nothing by season. The season grouping above follows the standard NCHSAA calendar; the school itself publishes the list flat. Level splits are indicative for the same reason: the individual sport pages are navigation boilerplate carrying no rosters or schedules. CCHS has no middle school — it is a 9–12 school — so no team carries an MS level, unlike every PK/K–12 school on this roster.',
    sources: [
      { label: 'charlottecatholic.org — School Profile 2026-2027 (PDF)', url: PROFILE_2627 },
      { label: 'NCHSAA all-time state cup winners', url: 'https://www.nchsaa.org/all-time-list-of-wells-fargo-state-cup-winners/' },
    ],
  },

  cup: {
    pointSources: [
      { sport: 'lacrosse', gender: 'girls', season: 'spring', titleYears: [2026], runnerUpYears: [2022, 2023, 2024] },
      { sport: 'swimmingDiving', gender: 'girls', season: 'winter', titleYears: [2021, 2026], runnerUpYears: [2023] },
      { sport: 'golf', gender: 'boys', season: 'spring', titleYears: [2021, 2022], runnerUpYears: [2026] },
      { sport: 'tennis', gender: 'girls', season: 'fall', titleYears: [2021, 2025] },
      { sport: 'lacrosse', gender: 'boys', season: 'spring', titleYears: [2026], runnerUpYears: [2023] },
      { sport: 'golf', gender: 'girls', season: 'fall', titleYears: [2025], runnerUpYears: [2024] },
      { sport: 'football', gender: 'boys', season: 'fall', titleYears: [2021] },
      { sport: 'soccer', gender: 'boys', season: 'fall', titleYears: [2025] },
      { sport: 'soccer', gender: 'girls', season: 'spring', titleYears: [2026] },
    ],
    sources: [
      { label: 'NCHSAA Wells Fargo Cup standings, 2025–26', url: `${NCHSAA}2025-2026-wells-fargo-cup-champions/` },
      { label: 'NCHSAA Wells Fargo Cup standings, 2024–25', url: `${NCHSAA}wells-fargo-state-cup-standings-update-2/` },
      { label: 'NCHSAA Wells Fargo Cup standings, 2023–24', url: `${NCHSAA}2023-24-wells-fargo-cup-winners/` },
      { label: 'NCHSAA Wells Fargo Cup standings, 2022–23', url: `${NCHSAA}nchsaa-announces-2022-2023-wells-fargo-cup-and-conference-cup-champions/` },
      { label: 'NCHSAA Wells Fargo Cup standings, 2021–22', url: `${NCHSAA}wells-fargo-state-cup-competition-winners-2021-22-announced/` },
      { label: 'NCHSAA Wells Fargo Cup standings, 2020–21', url: `${NCHSAA}2020-2021-wells-fargo-state-cup-winners-recognized/` },
      { label: 'NCHSAA Wells Fargo Cup scoring', url: `${NCHSAA}wells-fargo-cup/` },
      { label: 'NCHSAA all-time state cup winners', url: `${NCHSAA}all-time-list-of-wells-fargo-state-cup-winners/` },
      { label: 'NCHSAA sport list', url: `${NCHSAA}sports/` },
      { label: 'NCHSAA football state champions', url: `${NCHSAA}wp-content/uploads/2025/01/FB-State-Champion-List-thru-24.pdf` },
      { label: 'NCHSAA swimming and diving record book', url: `${NCHSAA}record-book/swimming-and-diving/` },
      { label: 'NCHSAA 4A swimming results, 2023', url: `${NCHSAA}sites/default/files/2023%20NCHSAA%204A%20State%20Swim%20%26%20Dive%20Championship%20Results.pdf` },
      { label: 'NCHSAA men’s golf record book', url: `${NCHSAA}record-book/mens-golf/` },
      { label: 'NCHSAA men’s golf championships, 2026', url: `${NCHSAA}2026-mens-golf-championships/` },
      { label: 'NCHSAA women’s golf championships, 2024', url: `${NCHSAA}2024-womens-golf-championships/` },
      { label: 'NCHSAA women’s golf championships, 2025', url: `${NCHSAA}2025-womens-golf-championships/` },
      { label: 'NCHSAA women’s dual team tennis champions', url: `${NCHSAA}wp-content/uploads/2023/11/Dual-team-state-champs.pdf` },
      { label: 'NCHSAA women’s dual team tennis, 2025', url: `${NCHSAA}2025-womens-dual-team-tennis-championships/` },
      { label: 'NCHSAA men’s lacrosse record book', url: `${NCHSAA}record-book/mens-lacrosse/` },
      { label: 'NCHSAA women’s lacrosse record book', url: `${NCHSAA}record-book/womens-lacrosse/` },
      { label: 'NCHSAA lacrosse championships, 2026', url: `${NCHSAA}2026-lacrosse-championships/` },
      { label: 'NCHSAA men’s soccer championships, 2025', url: `${NCHSAA}2025-mens-soccer-championships/` },
      { label: 'NCHSAA women’s soccer championships, 2026', url: `${NCHSAA}2026-womens-soccer-championships/` },
    ],
  },

  record: {
    headline: '79 state championships since 2000 — and four more in 2026 alone.',
    subhead:
      'Girls soccer went undefeated; both lacrosse programs won in overtime, each ending a twelve-year drought. All NCHSAA titles.',
    seasonLabels: ['2024', '2025', '2026'],
    rows: [
      {
        program: 'Girls soccer',
        cells: [
          { result: 'NONE' },
          { result: 'NONE' },
          { result: 'STATE', record: 'undefeated' },
        ],
        note: 'Beat Jacksonville 1–0 in the NCHSAA 6A final and finished the year without a loss.',
      },
      {
        program: 'Boys lacrosse',
        cells: [
          { result: 'NONE' },
          { result: 'NONE' },
          { result: 'STATE', record: '9–8 (OT)' },
        ],
        note: 'Leonard’s overtime goal beat Middle Creek for the 1A-6A title — the programme’s second, and first in twelve years.',
      },
      {
        program: 'Girls lacrosse',
        cells: [
          { result: 'NONE' },
          { result: 'NONE' },
          { result: 'STATE', record: '9–8 (OT)' },
        ],
        note: 'Tan’s overtime goal beat East Chapel Hill for the 1A-6A title, ending a twelve-year drought.',
      },
      {
        program: 'Football',
        cells: [
          { result: 'NONE' },
          { result: 'NONE' },
          { result: 'NONE', record: '7–5' },
        ],
        note: '8 state titles from 11 championship-game appearances historically. The 2025 season finished 7–5 (3–3 conference) with a 27–0 opening-round playoff win over A.C. Reynolds.',
      },
    ],
    didNotWin:
      'The rows above are the programs with a documented result in this window. CCHS does not publish a season-by-season title ledger, so a blank cell means "no title found for that year", not a verified loss — the 79-title total since 2000 is the school’s own figure and spans far more sports than these four.',
    bars: [
      { program: 'Boys lacrosse (2026)', record: '21–3', pct: 0.875, tag: 'STATE' },
      { program: 'Baseball (2025)', record: '22–6–1', pct: 0.776 },
      { program: 'Baseball (2024)', record: '23–10', pct: 0.697 },
      { program: 'Football (2025)', record: '7–5', pct: 0.583 },
    ],
    seasonDetail: [
      {
        program: 'Football 2025',
        text: '7–5 overall and 3–3 in the Southern Carolina 6A/7A conference, with 235 points scored against 198 allowed across a twelve-game season, then a 27–0 shutout of A.C. Reynolds in the opening playoff round.',
      },
      {
        program: 'Girls swimming, 2002–2015',
        text: 'Fourteen consecutive state championships — the longest title streak in the school’s history and the single strongest line in the 79-title total.',
      },
    ],
    sources: [
      { label: 'charlottecatholic.org — School Profile 2026-2027 (PDF)', url: PROFILE_2627 },
      { label: 'NCHSAA swimming and diving championships, 2026', url: 'https://www.nchsaa.org/2026-swimming-diving-championships/' },
      { label: 'highschoolot.com — 2026 NCHSAA 6A girls soccer final', url: GSOCCER26 },
      { label: 'highschoolot.com — 2026 NCHSAA 1A-6A boys lacrosse final', url: BLAX26 },
      { label: 'highschoolot.com — 2026 NCHSAA 1A-6A girls lacrosse final', url: GLAX26 },
      { label: 'maxpreps.com — Charlotte Catholic football', url: MAXPREPS },
    ],
  },

  pipeline: {
    headline: '54 documented college athletes across three graduating classes — 39 of them Division I and 15 Power Four.',
    subhead:
      'Every athlete below is named in a signing-day article, a newspaper signing list or the college’s own roster.',
    funnel: [
      { label: 'Student body', hint: 'grades 9–12', count: '~1,171', width: 1.0, shade: 'pale' },
      { label: 'Alumni who played in college', hint: 'NCAA / NAIA / JUCO, all years', count: '1000+', width: 0.62, shade: 'pale' },
      { label: 'Documented commits', hint: 'Classes of 2024–2026', count: '54', width: 0.46, shade: 'mid' },
      { label: 'Division I', hint: 'includes Power Four', count: '39', width: 0.33, shade: 'mid' },
      { label: 'Power Four', hint: 'ACC · Big Ten · Big 12 · SEC', count: '15', width: 0.13, shade: 'full' },
    ],
    funnelNote:
      'The 1000+ figure is the school’s own all-time count and is not restricted to these three classes, so it sits on a different time base from the rows beneath it. The three classes below are a documented minimum: CCHS holds separate fall, winter and spring signing days and publishes no consolidated list, so athletes appear here once a signing article, a newspaper signing list or the college’s own roster names them.',
    sportBars: [
      { sport: 'Baseball', count: 13, width: 1.0 },
      { sport: 'Football', count: 11, width: 0.85 },
      { sport: 'Lacrosse', count: 11, width: 0.85 },
      { sport: 'Basketball', count: 5, width: 0.38 },
      { sport: 'Swim & dive', count: 4, width: 0.31 },
      { sport: 'Soccer', count: 3, width: 0.23 },
      { sport: 'Golf', count: 2, width: 0.15 },
      { sport: 'Cross country / track', count: 2, width: 0.15 },
      { sport: 'Softball', count: 1, width: 0.08 },
      { sport: 'Tennis', count: 1, width: 0.08 },
      { sport: 'Field hockey', count: 1, width: 0.08 },
    ],
    realityCheck:
      'Baseball is now the deepest pipeline here — 13 of 54 documented athletes, including Power Four signees at Duke, North Carolina, Virginia Tech, Arizona and NC State in three classes. Football and lacrosse follow with 11 each, and both lacrosse programs won state titles in 2026.',
    rankedRecruits:
      'Three football signees carry 247Sports Composite ranks — Jack Larsen (Notre Dame) was No. 15 in North Carolina in the Class of 2024 — and no CCHS athlete in these classes was a national top-100 recruit.',
    roster: [
      { cls: '2026', name: 'Alex Hoffman', sport: 'Baseball', college: 'Virginia Tech', conf: 'ACC', level: 'P4' },
      { cls: '2026', name: 'Quinn O’Rourke', sport: 'Baseball', college: 'University of Arizona', conf: 'Big 12', level: 'P4' },
      { cls: '2026', name: 'Cooper Gornet', sport: 'Baseball', college: 'NC State University', conf: 'ACC', level: 'P4' },
      { cls: '2026', name: 'Dominic Basrawala', sport: 'Football', college: 'Air Force Academy', conf: 'Mountain West', level: 'D1',
        rank247: { state: 82, url: 'https://247sports.com/player/dominic-basrawala-46150298/' } },
      { cls: '2026', name: 'Lukas Lupinski', sport: 'Football', college: 'Columbia University', conf: 'Ivy', level: 'D1' },
      { cls: '2026', name: 'Caden O’Neill', sport: 'Football', college: 'Furman University', conf: 'SoCon', level: 'D1' },
      { cls: '2026', name: 'Brady Marconi', sport: 'Baseball', college: 'College of Charleston', conf: 'CAA', level: 'D1' },
      { cls: '2026', name: 'Ben Bordeaux', sport: 'Baseball', college: 'Queens University of Charlotte', conf: 'ASUN', level: 'D1' },
      { cls: '2026', name: 'Mary Martin Spinner', sport: 'Soccer', college: 'College of Charleston', conf: 'CAA', level: 'D1' },
      { cls: '2026', name: 'Keanen Teeter', sport: 'Football', college: 'Lenoir-Rhyne University', conf: 'South Atlantic', level: 'D2' },
      { cls: '2026', name: 'Jack Siegel', sport: 'Basketball', college: 'Mars Hill University', conf: 'South Atlantic', level: 'D2' },
      { cls: '2026', name: 'Zach Deblitz', sport: 'Soccer', college: 'Hampden-Sydney College', conf: 'ODAC', level: 'D3' },
      { cls: '2026', name: 'Carter Garnett', sport: 'Football', college: 'Johns Hopkins University', conf: 'Centennial', level: 'D3' },
      { cls: '2026', name: 'Margueritte McPhillips', sport: 'Soccer', college: 'Connecticut College', conf: 'NESCAC', level: 'D3' },
      { cls: '2026', name: 'Duncan Smith', sport: 'Cross country / track', college: 'Washington and Lee University', conf: 'ODAC', level: 'D3' },
      { cls: '2025', name: 'Madison Baumgratz', sport: 'Lacrosse', college: 'Virginia Tech', conf: 'ACC', level: 'P4' },
      { cls: '2025', name: 'Will Guthrie', sport: 'Golf', college: 'University of Georgia', conf: 'SEC', level: 'P4' },
      { cls: '2025', name: 'Will Hartman', sport: 'Golf', college: 'Vanderbilt University', conf: 'SEC', level: 'P4' },
      { cls: '2025', name: 'Matt McKnight', sport: 'Baseball', college: 'North Carolina', conf: 'ACC', level: 'P4' },
      { cls: '2025', name: 'Giovanni Delissio', sport: 'Lacrosse', college: 'University of Detroit Mercy', conf: 'Horizon', level: 'D1' },
      { cls: '2025', name: 'Chris Eagan', sport: 'Basketball', college: 'American University', conf: 'Patriot', level: 'D1' },
      { cls: '2025', name: 'Cannon Ridinger', sport: 'Lacrosse', college: 'Providence College', conf: 'Big East', level: 'D1' },
      { cls: '2025', name: 'Max Sovie', sport: 'Lacrosse', college: 'Mercer University', conf: 'SoCon', level: 'D1' },
      { cls: '2025', name: 'Roman Hyland', sport: 'Football', college: 'U.S. Naval Academy', conf: 'American', level: 'D1' },
      { cls: '2025', name: 'Charlie Smith', sport: 'Football', college: 'Harvard University', conf: 'Ivy', level: 'D1',
        rank247: { state: 66, url: 'https://247sports.com/player/charlie-smith-46147891/' } },
      { cls: '2025', name: 'Jack Baade', sport: 'Football', college: 'Harvard University', conf: 'Ivy', level: 'D1' },
      { cls: '2025', name: 'Nick Bierman', sport: 'Football', college: 'Lafayette College', conf: 'Patriot', level: 'D1' },
      { cls: '2025', name: 'Luciano Salas', sport: 'Swim & dive', college: 'Queens University of Charlotte', conf: 'ASUN', level: 'D1' },
      { cls: '2025', name: 'Jon Fijalkowski', sport: 'Baseball', college: 'Clarion University', conf: 'PSAC', level: 'D2' },
      { cls: '2025', name: 'Will O’Rourke', sport: 'Baseball', college: 'Lenoir-Rhyne University', conf: 'South Atlantic', level: 'D2' },
      { cls: '2025', name: 'Luke Colwell', sport: 'Lacrosse', college: 'Randolph-Macon College', conf: 'ODAC', level: 'D3' },
      { cls: '2025', name: 'Brooks Griffith', sport: 'Lacrosse', college: 'University of Lynchburg', conf: 'ODAC', level: 'D3' },
      { cls: '2025', name: 'Brendan Leonard', sport: 'Lacrosse', college: 'Salisbury University', conf: 'Coast-To-Coast', level: 'D3' },
      { cls: '2025', name: 'Maggie Kernodle', sport: 'Basketball', college: 'Hamilton College', conf: 'NESCAC', level: 'D3' },
      { cls: '2024', name: 'Evan MacIntyre', sport: 'Baseball', college: 'Indiana University', conf: 'Big Ten', level: 'P4' },
      { cls: '2024', name: 'Lauren Bernardo', sport: 'Swim & dive', college: 'Louisiana State University', conf: 'SEC', level: 'P4' },
      { cls: '2024', name: 'Blanca Thomas', sport: 'Basketball', college: 'North Carolina', conf: 'ACC', level: 'P4' },
      { cls: '2024', name: 'Kate Daniels', sport: 'Lacrosse', college: 'University of Louisville', conf: 'ACC', level: 'P4' },
      { cls: '2024', name: 'Jack Hedrick', sport: 'Baseball', college: 'Duke University', conf: 'ACC', level: 'P4' },
      { cls: '2024', name: 'Jack Larsen', sport: 'Football', college: 'University of Notre Dame', conf: 'ACC', level: 'P4',
        rank247: { national: 481, state: 15, url: 'https://247sports.com/player/jack-larsen-46117223/' } },
      { cls: '2024', name: 'Logan Hill', sport: 'Cross country / track', college: 'University of South Carolina', conf: 'SEC', level: 'P4' },
      { cls: '2024', name: 'Logan Leckner', sport: 'Swim & dive', college: 'West Virginia University', conf: 'Big 12', level: 'P4' },
      { cls: '2024', name: 'Jack Ransom', sport: 'Lacrosse', college: 'Georgetown University', conf: 'Big East', level: 'D1' },
      { cls: '2024', name: 'Mark McMahon', sport: 'Lacrosse', college: 'St. Bonaventure University', conf: 'Atlantic 10', level: 'D1' },
      { cls: '2024', name: 'John McKillop', sport: 'Baseball', college: 'West Point', conf: 'Patriot', level: 'D1' },
      { cls: '2024', name: 'Colin Mendicino', sport: 'Lacrosse', college: 'Towson University', conf: 'CAA', level: 'D1' },
      { cls: '2024', name: 'Mason Child', sport: 'Baseball', college: 'UNC Wilmington', conf: 'CAA', level: 'D1' },
      { cls: '2024', name: 'Gracynn Gough', sport: 'Basketball', college: 'College of the Holy Cross', conf: 'Patriot', level: 'D1' },
      { cls: '2024', name: 'Natalie Dominguez', sport: 'Softball', college: 'Yale University', conf: 'Ivy', level: 'D1' },
      { cls: '2024', name: 'Abby Druhan', sport: 'Swim & dive', college: 'University of Pennsylvania', conf: 'Ivy', level: 'D1' },
      { cls: '2024', name: 'Nick Segarra', sport: 'Football', college: 'Ohio University', conf: 'MAC', level: 'D1',
        rank247: { state: 52, url: 'https://247sports.com/player/nick-segarra-46135129/' } },
      { cls: '2024', name: 'Charlotte Bergman', sport: 'Tennis', college: 'Belmont Abbey College', conf: 'Conference Carolinas', level: 'D2' },
      { cls: '2024', name: 'Brody Roderick', sport: 'Baseball', college: 'Southern Wesleyan University', conf: 'Conference Carolinas', level: 'D2' },
      { cls: '2024', name: 'Molly Haskell', sport: 'Field hockey', college: 'Sewanee', conf: 'SAA', level: 'D3' },
      // Class of 2027 — public verbal commitments, not yet signed; not in the funnel or Compare
      { cls: '2027', name: 'James Hedley', sport: 'Lacrosse', college: 'University of North Carolina', conf: 'ACC', level: 'P4' },
      { cls: '2027', name: 'John Hucko', sport: 'Baseball', college: 'Auburn University', conf: 'SEC', level: 'P4' },
      { cls: '2027', name: 'Griffin McKain', sport: 'Baseball', college: 'Clemson University', conf: 'ACC', level: 'P4' },
      { cls: '2027', name: 'Madi Hertzig', sport: 'Swim & dive', college: 'Yale University', conf: 'Ivy', level: 'D1' },
      { cls: '2027', name: 'Emmett Drensek', sport: 'Soccer', college: 'Bucknell University', conf: 'Patriot', level: 'D1' },
    ],
    rosterNote:
      'Cannon Ridinger graduated from CCHS after earlier attending Charlotte Country Day (also in this app) and Hotchkiss; he is attributed here by graduating school and must not be double-counted. Evan MacIntyre is counted P4 at commitment time and has since transferred to Belmont Abbey via JUCO. Three athletes named on signing lists or by recruiting sites — Mary Catherine Farley (Wofford), Audrey Pardue (Georgetown) and Conor Clendenin (Ithaca) — have not appeared on those colleges’ rosters and are excluded from every count. The Class of 2027 rows are public verbal commitments, listed because they are already announced and not counted in the funnel, the sport bars or the Power 4 and Division I rows until those athletes sign.',
    sources: [
      { label: 'catholicnewsherald.com — 15 CCHS student-athletes commit (Nov 2023, Class of 2024)', url: SIGN24 },
      { label: 'Charlotte Observer — National Signing Day roundup (Nov 2024, Class of 2025)', url: SIGN25 },
      { label: 'catholicnewsherald.com — College Signing Day (Feb 2026, Class of 2026)', url: SIGN26 },
      { label: 'goduke.com — Duke baseball roster (Hedrick corroboration)', url: 'https://goduke.com/sports/baseball/roster' },
      {
        label: '247Sports Composite — 2026 North Carolina football rankings',
        url: 'https://247sports.com/season/2026-football/compositerecruitrankings/?InstitutionGroup=HighSchool&State=NC',
      },
      { label: 'Team 91 Charlotte — The Scoop: the 2027 commitments (Hedley)', url: 'https://team91charlotte.substack.com/p/the-scoop-the-commitments' },
      { label: 'National Lacrosse Federation — James Hedley', url: 'https://nationallacrossefederation.com/player/james-hedley/' },
      { label: 'Perfect Game — Auburn college commitments (Hucko)', url: 'https://www.perfectgame.org/college/CollegeCommitments.aspx?college=1566' },
      { label: 'TigerNet — 2027 Clemson baseball commitments (McKain)', url: 'https://www.tigernet.com/2027-clemson-baseball-commitments' },
      { label: 'Prep Baseball Report — North Carolina Class of 2027 rankings', url: 'https://www.prepbaseballreport.com/rankings/NC/North-Carolina-class-of-2027' },
      { label: 'SwimSwam — Madi Hertzig chooses Yale (2027)', url: 'https://swimswam.com/nc-high-school-6a-state-champ-madi-hertzig-chooses-yale-2027/' },
      { label: 'Charlotte Observer via Yahoo — 2026–27 Charlotte-area swimming preview', url: 'https://sports.yahoo.com/articles/best-high-school-swimmers-charlotte-100000360.html' },
      { label: 'TopDrawerSoccer — recruiting roundup, Dec. 8–14, 2025 (Drensek)', url: 'https://www.topdrawersoccer.com/club-soccer-articles/recruiting-roundup:-december-8-14_aid55451' },
      { label: 'Charlotte Observer via Yahoo — early football signing list (Dec 2023, Class of 2024)', url: 'https://ca.news.yahoo.com/national-signing-day-where-observer-104500782.html' },
      { label: 'Charlotte Observer via Yahoo — early football signing list (Dec 2024, Class of 2025)', url: 'https://sports.yahoo.com/articles/where-charlotte-area-football-players-113000707.html' },
      { label: 'arizonawildcats.com — Arizona baseball 2026 signing class (Quinn O’Rourke)', url: 'https://arizonawildcats.com/news/2025/11/12/arizona-baseball-unveils-15-man-2026-signing-class.aspx' },
      { label: 'fightingirish.com — Notre Dame football roster (Larsen)', url: 'https://fightingirish.com/sports/football/roster/' },
      { label: 'gamecocksonline.com — Logan Hill, South Carolina track & field', url: 'https://gamecocksonline.com/sports/track/roster/player/logan-hill/' },
      { label: 'wvusports.com — Logan Leckner, West Virginia swimming & diving', url: 'https://wvusports.com/sports/mswim/roster/logan-leckner/18229' },
      { label: 'gopack.com — NC State baseball roster (Gornet)', url: 'https://gopack.com/sports/baseball/roster' },
      { label: 'HighSchoolOT — NC recruiting trackers, by sport', url: 'https://www.highschoolot.com/story/recruiting-tracker-see-where-nc-s-high-school-athletes-are-committed-to-play/21296096/' },
      { label: 'RealGM — Charlotte Catholic High School basketball players', url: 'https://basketball.realgm.com/highschool/teams/2034/Charlotte-Catholic-High-School-NC' },
    ],
  },

  honors: {
    headline: 'Six alumni in professional sport, and a national lacrosse ranking that moved 158 places.',
    subhead: 'The pro list spans four decades and four sports.',
    pros: [
      { kicker: 'NFL', name: 'Elijah Hood', detail: 'Drafted by the Oakland Raiders in 2017, 7th round, pick 242. Earlier the US Army Player of the Year (Hall Trophy).', path: 'CCHS → North Carolina → NFL' },
      { kicker: 'NFL', name: 'Derrick Taylor', detail: 'Reached the National Football League.' },
      { kicker: 'MLS', name: 'Brendan McDonough', detail: 'Major League Soccer.' },
      { kicker: 'MLS', name: 'Donnie Smith', detail: 'Major League Soccer.' },
      { kicker: 'USL', name: 'Patrick Hogan', detail: 'United Soccer League.' },
      { kicker: 'WTA', name: 'Laura DuPont', detail: 'Professional tennis — the earliest of the school’s professional alumni.' },
    ],
    honors: [
      { label: 'Boys lacrosse, national rank', text: '#28 in the country on MaxPreps and #1 in North Carolina — up from #186.', tag: '#28 NATIONAL', tagStyle: 'accent' },
      { label: 'Football, state rank', text: '#4 in NCHSAA 6A.', tag: '#4 IN 6A', tagStyle: 'outline' },
      { label: 'Will Hartman', text: 'Charlotte Observer golfer of the year; went on to Vanderbilt.' },
      { label: 'Elijah Hood', text: 'US Army Player of the Year — the Hall Trophy — before North Carolina and the NFL.' },
      { label: 'Mason Poveromo', text: 'Named in athlete-of-the-year recognition.' },
      { label: 'Wells Fargo Cups', text: '10 Wachovia / Wells Fargo Cups, awarded to the top athletic program by division in North Carolina.', tag: '10 CUPS', tagStyle: 'accent' },
      { label: 'Sportsmanship and academics', text: 'The school reports awards for sportsmanship, academic achievement and 100% community-service participation among its student-athletes.' },
    ],
    sources: [
      { label: 'charlottecatholic.org — School Profile 2026-2027 (PDF)', url: PROFILE_2627 },
      { label: 'NCHSAA all-time state cup winners', url: 'https://www.nchsaa.org/all-time-list-of-wells-fargo-state-cup-winners/' },
      { label: 'maxpreps.com — Charlotte Catholic Cougars', url: 'https://www.maxpreps.com/nc/charlotte/charlotte-catholic-cougars/' },
    ],
  },

  coaching: {
    headline: 'A deep baseball staff, and thin public disclosure everywhere else.',
    subhead:
      'Baseball publishes eight coaches with full bios, start years, records and playing history. No other sport publishes anything comparable.',
    featured: [
      {
        kicker: 'Athletic Director',
        name: 'Kevin Christmas',
        stats: [
          { value: '20', label: 'sports administered' },
          { value: '6A', label: 'NCHSAA division' },
        ],
        detail:
          'Directs an athletics department of 20 sports competing in the NCHSAA — the state’s public-school association — and advises the Fellowship of Christian Athletes club from the AD office.',
      },
      {
        kicker: 'Head Coach — Football',
        name: 'Brodowicz',
        stats: [
          { value: '7–5', label: '2025 record' },
          { value: '3–3', label: '2025 conference' },
        ],
        detail:
          'Led the 2025 team to a 7–5 finish and a 27–0 opening-round playoff win over A.C. Reynolds, in a programme with 8 state titles from 11 championship-game appearances.',
      },
    ],
    tenure: [
      { name: 'Baseball coaching staff', role: '8 coaches with published bios, start years and playing history', width: 1.0, since: 'published' },
      { name: 'Kevin Christmas', role: 'Athletic Director', width: 0.6, since: 'not published', toVerify: true },
      { name: 'Brodowicz', role: 'Head Coach, Football', width: 0.6, since: 'not published', toVerify: true },
      { name: 'Todd Wisocki, LAT/ATC', role: 'Athletic Trainer', width: 0.6, since: 'not published', toVerify: true },
      { name: 'Mike Hazel, NSCA CSCS', role: 'Strength & Conditioning Coach', width: 0.6, since: 'not published', toVerify: true },
    ],
    worthKnowing:
      'The disclosure gap here is unusually sharp. Baseball’s staff page carries eight coaches with full bios including start years, coaching records and professional or draft history, while the other nineteen sports publish nav boilerplate with no named coach at all.',
    sources: [
      { label: 'charlottecatholic.org — Athletics', url: 'https://www.charlottecatholic.org/athletics/all-sports' },
      { label: 'charlottecatholic.org — School Profile 2026-2027 (PDF)', url: PROFILE_2627 },
    ],
  },

  facilities: {
    headline: 'Oddo Field at Keffer Stadium, and athletic training staffed by Atrium Health.',
    subhead:
      'The care model is outsourced to a hospital system rather than run in house — a different structure from the independent schools on this roster.',
    venues: [
      { name: 'Oddo Field at Keffer Stadium', detail: 'approximately 3,500 seats; the field is named for Jim Oddo' },
      { name: 'Gymnasium', detail: 'basketball, volleyball and wrestling' },
      { name: 'Baseball complex', detail: 'home of the programme with the school’s deepest published coaching staff' },
      { name: 'Training room', detail: 'base for the Atrium Health athletic-training staff and the student Sports Medicine club' },
      { name: 'MACS Fine Arts Center', detail: '650-seat auditorium, dedicated 2022 — shared with the arts programme' },
    ],
    care: [
      { label: 'Athletic trainers', text: 'Full-time licensed and certified athletic trainers, provided by Atrium Health rather than employed directly by the school.' },
      { label: 'Lead trainer', text: 'Todd Wisocki, LAT/ATC — who also advises the student-run Sports Medicine club.' },
      { label: 'Strength & conditioning', text: 'Mike Hazel, NSCA CSCS.' },
      { label: 'Student pathway', text: 'Sports Medicine runs as both a curriculum course (851) and a student club, so an interested athlete can study the field as well as be treated by it.' },
    ],
    careNote:
      'Atrium Health provision is a genuine structural difference: coverage and continuity come from a hospital system’s staffing model. The school publishes no concussion protocol, no team-physician name and no coverage schedule by sport, so what is available at a given practice or away fixture is not disclosed.',
    sources: [
      { label: 'charlottecatholic.org — Athletics', url: 'https://www.charlottecatholic.org/athletics/all-sports' },
      { label: 'charlottecatholic.org — School Profile 2026-2027 (PDF)', url: PROFILE_2627 },
    ],
  },

  national: {
    headline: 'A private school playing the public-school bracket — and an NIL policy it inherits from the NCHSAA.',
    subhead:
      'CCHS is one of only four parochial members of the North Carolina High School Athletic Association.',
    stats: [
      { value: '4', label: 'parochial schools in the entire NCHSAA' },
      { value: '#28', label: 'boys lacrosse, national MaxPreps rank' },
      { value: '#1', label: 'boys lacrosse, rank in North Carolina' },
      { value: '6A', label: 'NCHSAA division played' },
    ],
    scheduleTitle: 'What playing NCHSAA actually means',
    schedule: [
      { opponent: 'Southern Carolina Split 6A/7A Conference', detail: 'The conference CCHS competes in — public schools of comparable enrollment' },
      { opponent: 'East Chapel Hill', detail: 'Beaten 9–8 in overtime for the 2026 girls lacrosse state title' },
      { opponent: 'Middle Creek', detail: 'Beaten 9–8 in overtime for the 2026 boys lacrosse state title' },
      { opponent: 'Jacksonville', detail: 'Beaten 1–0 for the 2026 6A girls soccer state title' },
      { opponent: 'A.C. Reynolds', detail: 'Shut out 27–0 in the opening round of the 2025 football playoffs' },
    ],
    scheduleNote:
      'This is the real differentiator for a recruiting family: every other school in this app plays NCISAA, the independent-school association. A CCHS athlete’s record, rankings and championships are set against North Carolina’s public schools, which is a larger and differently-shaped competitive field — and it makes cross-comparison with the rest of this roster imprecise in both directions.',
    nil: [
      { date: 'July 1, 2023', text: 'The NCHSAA’s name, image and likeness policy takes effect, covering every member school including CCHS.', highlight: true },
      { date: 'Current', text: 'No CCHS-specific NIL deal was found in any published source. The school itself publishes no NIL guidance of its own beyond the association policy it is bound by.' },
    ],
    sources: [
      { label: 'charlottecatholic.org — School Profile 2026-2027 (PDF)', url: PROFILE_2627 },
      { label: 'maxpreps.com — Charlotte Catholic Cougars', url: 'https://www.maxpreps.com/nc/charlotte/charlotte-catholic-cougars/' },
    ],
  },
}
