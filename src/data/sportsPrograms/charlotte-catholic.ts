// Charlotte Catholic High School — the seven Sports cards.
//
// ⚠️ CCHS IS AN NCHSAA SCHOOL, NOT NCISAA. It is a private school competing in
// North Carolina's PUBLIC state association — one of only four parochial members
// — currently in Division 6A, Southern Carolina Split 6A/7A Conference. Every
// other school in this app plays NCISAA. Championship counts, conference records
// and win-loss ledgers here therefore come from a different governing body and
// are not directly comparable to the rest of the roster. The TitleResult type's
// doc comment says "NCISAA state champion"; for this school every title chip
// means an NCHSAA title, which is said on the card itself.
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

const PROFILE =
  'https://resources.finalsite.net/images/v1756128027/charlottecatholicorg/f5yfsecttu3cgmmtsh3f/CCHSSchoolProfile25-26FinalforOnline.pdf'
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

export const charlotteCatholic: SportsProgram = {
  offered: {
    headline: '20 sports across three seasons, played against the state’s public schools.',
    subhead:
      'CCHS is one of only four parochial schools in the NCHSAA, so a Cougars team is measured against North Carolina’s largest public programs rather than in a private-school bracket.',
    stats: [
      { value: '20', label: 'sports offered' },
      { value: '74', label: 'state championships since 2000' },
      { value: '8', label: 'Wachovia / Wells Fargo Cups' },
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
      { label: 'charlottecatholic.org — School Profile 2025-2026 (PDF)', url: PROFILE },
    ],
  },

  record: {
    headline: '74 state championships since 2000 — and three more in 2026 alone.',
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
      'The rows above are the programs with a documented result in this window. CCHS does not publish a season-by-season title ledger, so a blank cell means "no title found for that year", not a verified loss — the 74-title total since 2000 is the school’s own figure and spans far more sports than these four.',
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
        text: 'Fourteen consecutive state championships — the longest title streak in the school’s history and the single strongest line in the 74-title total.',
      },
    ],
    sources: [
      { label: 'charlottecatholic.org — School Profile 2025-2026 (PDF)', url: PROFILE },
      { label: 'highschoolot.com — 2026 NCHSAA 6A girls soccer final', url: GSOCCER26 },
      { label: 'highschoolot.com — 2026 NCHSAA 1A-6A boys lacrosse final', url: BLAX26 },
      { label: 'highschoolot.com — 2026 NCHSAA 1A-6A girls lacrosse final', url: GLAX26 },
      { label: 'maxpreps.com — Charlotte Catholic football', url: MAXPREPS },
    ],
  },

  pipeline: {
    headline: '35 documented college athletes across three graduating classes — 10 of them Power Four.',
    subhead:
      'Every athlete below is named in a dated article. Nothing here comes from a commitment-tracker summary.',
    funnel: [
      { label: 'Student body', hint: 'grades 9–12', count: '~1,171', width: 100, shade: 'pale' },
      { label: 'Alumni who played in college', hint: 'NCAA / NAIA / JUCO, all years', count: '1000+', width: 62, shade: 'pale' },
      { label: 'Documented commits', hint: 'Classes of 2024–2026', count: '35', width: 30, shade: 'mid' },
      { label: 'Division I', hint: 'includes Power Four', count: '25', width: 21, shade: 'mid' },
      { label: 'Power Four', hint: 'ACC · Big Ten · Big 12 · SEC', count: '10', width: 9, shade: 'full' },
    ],
    funnelNote:
      'The 1000+ figure is the school’s own all-time count and is not restricted to these three classes, so it sits on a different time base from the rows beneath it. The Class of 2026 row is a documented MINIMUM: the February article covers only the February ceremony (football, soccer, cross country), and CCHS holds separate fall and spring signing days, so baseball and lacrosse — historically its richest sports — are largely unpublished for that class.',
    sportBars: [
      { sport: 'Lacrosse', count: 11, width: 100 },
      { sport: 'Baseball', count: 6, width: 55 },
      { sport: 'Football', count: 5, width: 45 },
      { sport: 'Basketball', count: 3, width: 27 },
      { sport: 'Soccer', count: 2, width: 18 },
      { sport: 'Swim & dive', count: 2, width: 18 },
      { sport: 'Golf', count: 2, width: 18 },
      { sport: 'Softball', count: 1, width: 9 },
      { sport: 'Tennis', count: 1, width: 9 },
      { sport: 'Field hockey', count: 1, width: 9 },
      { sport: 'Cross country / track', count: 1, width: 9 },
    ],
    realityCheck:
      'Lacrosse is the single strongest pipeline here — 11 of 35 documented athletes, and both lacrosse programs won state titles in 2026. Baseball is the next, and its 2026 class is almost certainly understated because that class’s baseball signings were never published.',
    rankedRecruits:
      'No CCHS athlete was found in a national top-100 recruiting ranking. The 247Sports and On3 school pages return 403/404, so this is recorded as not published rather than as zero.',
    roster: [
      { cls: '2024', name: 'Jack Ransom', sport: 'Lacrosse', college: 'Georgetown University', conf: 'Big East', level: 'D1' },
      { cls: '2024', name: 'Mark McMahon', sport: 'Lacrosse', college: 'St. Bonaventure University', conf: 'Atlantic 10', level: 'D1' },
      { cls: '2024', name: 'John McKillop', sport: 'Baseball', college: 'West Point', conf: 'Patriot', level: 'D1' },
      { cls: '2024', name: 'Evan MacIntyre', sport: 'Baseball', college: 'Indiana University', conf: 'Big Ten', level: 'P4' },
      { cls: '2024', name: 'Colin Mendicino', sport: 'Lacrosse', college: 'Towson University', conf: 'CAA', level: 'D1' },
      { cls: '2024', name: 'Mason Child', sport: 'Baseball', college: 'UNC Wilmington', conf: 'CAA', level: 'D1' },
      { cls: '2024', name: 'Gracynn Gough', sport: 'Basketball', college: 'College of the Holy Cross', conf: 'Patriot', level: 'D1' },
      { cls: '2024', name: 'Molly Haskell', sport: 'Field hockey', college: 'Sewanee', conf: 'SAA', level: 'D3' },
      { cls: '2024', name: 'Lauren Bernardo', sport: 'Swim & dive', college: 'Louisiana State University', conf: 'SEC', level: 'P4' },
      { cls: '2024', name: 'Blanca Thomas', sport: 'Basketball', college: 'North Carolina', conf: 'ACC', level: 'P4' },
      { cls: '2024', name: 'Natalie Dominguez', sport: 'Softball', college: 'Yale University', conf: 'Ivy', level: 'D1' },
      { cls: '2024', name: 'Charlotte Bergman', sport: 'Tennis', college: 'Belmont Abbey College', conf: 'Conference Carolinas', level: 'D2' },
      { cls: '2024', name: 'Kate Daniels', sport: 'Lacrosse', college: 'University of Louisville', conf: 'ACC', level: 'P4' },
      { cls: '2024', name: 'Abby Druhan', sport: 'Swim & dive', college: 'University of Pennsylvania', conf: 'Ivy', level: 'D1' },
      { cls: '2024', name: 'Jack Hedrick', sport: 'Baseball', college: 'Duke University', conf: 'ACC', level: 'P4' },
      { cls: '2025', name: 'Madison Baumgratz', sport: 'Lacrosse', college: 'Virginia Tech', conf: 'ACC', level: 'P4' },
      { cls: '2025', name: 'Luke Colwell', sport: 'Lacrosse', college: 'Randolph-Macon College', conf: 'ODAC', level: 'D3' },
      { cls: '2025', name: 'Giovanni Delissio', sport: 'Lacrosse', college: 'University of Detroit Mercy', conf: 'Horizon', level: 'D1' },
      { cls: '2025', name: 'Chris Eagan', sport: 'Basketball', college: 'American University', conf: 'Patriot', level: 'D1' },
      { cls: '2025', name: 'Brooks Griffith', sport: 'Lacrosse', college: 'University of Lynchburg', conf: 'ODAC', level: 'D3' },
      { cls: '2025', name: 'Will Guthrie', sport: 'Golf', college: 'University of Georgia', conf: 'SEC', level: 'P4' },
      { cls: '2025', name: 'Will Hartman', sport: 'Golf', college: 'Vanderbilt University', conf: 'SEC', level: 'P4' },
      { cls: '2025', name: 'Brendan Leonard', sport: 'Lacrosse', college: 'Salisbury University', conf: 'Coast-To-Coast', level: 'D3' },
      { cls: '2025', name: 'Matt McKnight', sport: 'Baseball', college: 'North Carolina', conf: 'ACC', level: 'P4' },
      { cls: '2025', name: 'Cannon Ridinger', sport: 'Lacrosse', college: 'Providence College', conf: 'Big East', level: 'D1' },
      { cls: '2025', name: 'Max Sovie', sport: 'Lacrosse', college: 'Mercer University', conf: 'SoCon', level: 'D1' },
      { cls: '2026', name: 'Dominic Basrawala', sport: 'Football', college: 'Air Force Academy', conf: 'Mountain West', level: 'D1' },
      { cls: '2026', name: 'Zach Deblitz', sport: 'Soccer', college: 'Hampden-Sydney College', conf: 'ODAC', level: 'D3' },
      { cls: '2026', name: 'Carter Garnett', sport: 'Football', college: 'Johns Hopkins University', conf: 'Centennial', level: 'D3' },
      { cls: '2026', name: 'Lukas Lupinski', sport: 'Football', college: 'Columbia University', conf: 'Ivy', level: 'D1' },
      { cls: '2026', name: 'Margueritte McPhillips', sport: 'Soccer', college: 'Connecticut College', conf: 'NESCAC', level: 'D3' },
      { cls: '2026', name: 'Caden O’Neill', sport: 'Football', college: 'Furman University', conf: 'SoCon', level: 'D1' },
      { cls: '2026', name: 'Duncan Smith', sport: 'Cross country / track', college: 'Washington and Lee University', conf: 'ODAC', level: 'D3' },
      { cls: '2026', name: 'Keanen Teeter', sport: 'Football', college: 'Lenoir-Rhyne University', conf: 'South Atlantic', level: 'D2' },
      { cls: '2026', name: 'Alex Hoffman', sport: 'Baseball', college: 'Virginia Tech', conf: 'ACC', level: 'P4' },
    ],
    rosterNote:
      'Cannon Ridinger graduated from CCHS after earlier attending Charlotte Country Day (also in this app) and Hotchkiss; he is attributed here by graduating school and must not be double-counted. Evan MacIntyre is counted P4 at commitment time and has since transferred to Belmont Abbey via JUCO. Mary Catherine Farley (Wofford) appears on the 2024 signing list but never on a college roster, and is excluded from every count. Alex Hoffman surfaced only through a reverse roster lookup, not a signing article.',
    sources: [
      { label: 'catholicnewsherald.com — 15 CCHS student-athletes commit (Nov 2023, Class of 2024)', url: SIGN24 },
      { label: 'Charlotte Observer — National Signing Day roundup (Nov 2024, Class of 2025)', url: SIGN25 },
      { label: 'catholicnewsherald.com — College Signing Day (Feb 2026, Class of 2026)', url: SIGN26 },
      { label: 'goduke.com — Duke baseball roster (Hedrick corroboration)', url: 'https://goduke.com/sports/baseball/roster' },
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
      { label: 'Wells Fargo Cups', text: '8 Wachovia / Wells Fargo Cups, awarded to the top athletic program by division in North Carolina.', tag: '8 CUPS', tagStyle: 'accent' },
      { label: 'Sportsmanship and academics', text: 'The school reports awards for sportsmanship, academic achievement and 100% community-service participation among its student-athletes.' },
    ],
    sources: [
      { label: 'charlottecatholic.org — School Profile 2025-2026 (PDF)', url: PROFILE },
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
      { name: 'Baseball coaching staff', role: '8 coaches with published bios, start years and playing history', width: 100, since: 'published' },
      { name: 'Kevin Christmas', role: 'Athletic Director', width: 60, since: 'not published', toVerify: true },
      { name: 'Brodowicz', role: 'Head Coach, Football', width: 60, since: 'not published', toVerify: true },
      { name: 'Todd Wisocki, LAT/ATC', role: 'Athletic Trainer', width: 60, since: 'not published', toVerify: true },
      { name: 'Mike Hazel, NSCA CSCS', role: 'Strength & Conditioning Coach', width: 60, since: 'not published', toVerify: true },
    ],
    worthKnowing:
      'The disclosure gap here is unusually sharp. Baseball’s staff page carries eight coaches with full bios including start years, coaching records and professional or draft history, while the other nineteen sports publish nav boilerplate with no named coach at all. Tenure bars above are therefore marked to verify for everyone except the baseball staff — the school does not publish start years outside that one programme.',
    sources: [
      { label: 'charlottecatholic.org — Athletics', url: 'https://www.charlottecatholic.org/athletics/all-sports' },
      { label: 'charlottecatholic.org — School Profile 2025-2026 (PDF)', url: PROFILE },
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
      { label: 'charlottecatholic.org — School Profile 2025-2026 (PDF)', url: PROFILE },
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
      { label: 'charlottecatholic.org — School Profile 2025-2026 (PDF)', url: PROFILE },
      { label: 'maxpreps.com — Charlotte Catholic Cougars', url: 'https://www.maxpreps.com/nc/charlotte/charlotte-catholic-cougars/' },
    ],
  },
}
