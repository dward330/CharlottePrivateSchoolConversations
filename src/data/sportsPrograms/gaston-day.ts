// Gaston Day School — Sports research area.
//
// Every figure is traceable to source-material/sports/gaston-day/ —
// "Gaston Day School - Sports - Program and Championship Ledger 2026.md", and
// "Gaston Day School - Sports - Wells Fargo Cup Standings 2020-2026.md" for the
// Cup card and the corrected title record.
//
// FIVE of eight cards render. Three are omitted, each for a stated reason
// rather than for lack of a research pass:
//
//  - 1d College Pipeline — the school publishes NO enumerated signing list.
//    A focused deep pass at assessment time checked local press, the athletics
//    news feed and the NCSA/recruiting databases (whose Gaston Day pages are
//    generic recruit-marketing pages carrying no commit lists). This is a
//    confirmed absence, so the Compare commit rows are deliberate nulls and the
//    funnel card would be an empty shell. Same treatment as the omitted cards
//    on Davidson Day and Covenant Day.
//  - 1f Coaching — only the Athletic Director (Lulu Brase) and the 2025
//    volleyball head coach (Derek Bing) are named anywhere public; there is no
//    tenure ledger, no coach bios, no records-by-coach. Two names is not a card.
//  - 1h National Stage & NIL — no national schedule, no national ranking, and
//    zero documented NIL activity. Nothing to render.
//
// gastondayathletics.com is JS-RENDERED: rosters, per-sport levels, banners and
// signing news are all invisible to a plain fetch (the same class as the
// documented Finalsite popup-tile trap). MaxPreps was the working substitute for
// the sport list. That is why per-sport V/JV/MS levels are NOT claimed here —
// only volleyball's are published in an extractable form, and inventing the
// rest would be worse than omitting them.

import type { SportsProgram } from '../sportsProgram.ts'

const MAXPREPS = 'https://www.maxpreps.com/nc/gastonia/gaston-day-spartans/'
const MAXPREPS_VB =
  'https://www.maxpreps.com/nc/gastonia/gaston-day-spartans/volleyball/'
const CHAMPS_26 =
  'https://www.highschoolot.com/the-2025-26-ncisaa-team-state-champions-in-every-sport/22322092/'
const CHAMPS_25 =
  'https://www.highschoolot.com/the-2024-25-ncisaa-team-state-champions-in-every-sport/22016545/'
const TENNIS_23 =
  'https://www.highschoolot.com/story/gaston-day-rolls-to-ncisaa-2a-girls-tennis-title-over-trinity-school-of-durham-chapel-hill/21119771/'
const TENNIS_24 =
  'https://www.highschoolot.com/story/gaston-day-repeats-ncisaa-2a-girls-tennis-title-downs-epiphany-school/21693252/'
const PROFILE =
  'https://www.gastonday.org/wp-content/uploads/2025/09/New-GDS-Profile-25-26.pdf'
const ATHLETICS = 'https://gastondayathletics.com/'
const CUP_BASE = 'https://www.ncisaa.org/recognition/wells-fargo-cup/'
const ARCHIVE = 'https://archives.ncisaa.org/index.php?sport='
const SWIM = 'https://admin.ncisaa.org/uploads/SWIMMING/'
const GOLF_22 = 'https://sports.yahoo.com/happy-blue-gaston-day-boys-170121762.html'
const GOLF_23 = 'https://www.highschoolot.com/story/highschoolot-hsot-final-statewide-rankings-for-boys-golf/20898527/'
const GOLF_24 =
  'https://www.highschoolot.com/story/the-o-neal-school-wins-ncisaa-d3-boys-golf-trinity-academy-s-eastman-wins-medalist/21453701/'
const TRACK_23 = 'https://alamancenews.com/bca-boys-track-and-field-team-secures-first-title-in-any-sport-for-school/'
const TRACK_24 = 'https://sports.yahoo.com/super-saturday-seven-charlotte-area-011100010.html'

export const gastonDay: SportsProgram = {
  /* ---------------------------------------------------------- 1a offered -- */
  offered: {
    headline:
      '19 team sports across three seasons, with about 70% of students in grades 6–12 playing at least one.',
    subhead:
      'An NCISAA 2A program that has won 14 team state championships since 2021 — a title rate that reads much larger than the school’s 510 enrollment.',
    stats: [
      { value: '19', label: 'team sports across three seasons' },
      { value: '~70%', label: 'of grades 6–12 play at least one sport' },
      { value: '14', label: 'NCISAA team state titles since 2021' },
      { value: '2A', label: 'NCISAA classification' },
    ],
    seasons: [
      {
        name: 'Fall',
        note: '7 teams',
        sports: [
          { name: 'Volleyball (Girls)', levels: ['V', 'JV'] },
          { name: 'Soccer (Boys)', levels: ['V'] },
          { name: 'Field Hockey (Girls)', levels: ['V'] },
          { name: 'Cross Country (Boys)', levels: ['V'] },
          { name: 'Cross Country (Girls)', levels: ['V'] },
          { name: 'Tennis (Girls)', levels: ['V'] },
          { name: 'Cheering', levels: ['V'] },
        ],
      },
      {
        name: 'Winter',
        note: '5 teams',
        sports: [
          { name: 'Basketball (Boys)', levels: ['V'] },
          { name: 'Basketball (Girls)', levels: ['V'] },
          { name: 'Swimming (Boys)', levels: ['V'] },
          { name: 'Swimming (Girls)', levels: ['V'] },
          { name: 'Wrestling (Boys)', levels: ['V'] },
        ],
      },
      {
        name: 'Spring',
        note: '7 teams',
        sports: [
          { name: 'Baseball (Boys)', levels: ['V'] },
          { name: 'Softball (Girls)', levels: ['V'] },
          { name: 'Lacrosse (Boys)', levels: ['V'] },
          { name: 'Golf (Boys)', levels: ['V'] },
          { name: 'Golf (Girls)', levels: ['V'] },
          { name: 'Tennis (Boys)', levels: ['V'] },
          { name: 'Track & Field (B & G)', levels: ['V'] },
        ],
      },
    ],
    footnote:
      'Levels shown are what the sources actually publish. Volleyball is the one sport whose team levels are documented: MaxPreps lists varsity, JV and freshman teams. So it is the only row carrying a JV chip. Every other sport shows V alone, because the school’s athletics site does not list its other levels in a form this page can show. The Middle School fields its own teams in soccer, basketball, track & field and swimming (grades 6–8, subject to academic standing and behavior). But the school does not publish a full MS roster, so no MS chips are claimed. Cheering and track & field come from Private School Review rather than the MaxPreps season grid.',
    sources: [
      { label: 'MaxPreps — Gaston Day Spartans (sport list by gender and season)', url: MAXPREPS },
      { label: 'MaxPreps — Gaston Day volleyball (varsity / JV / freshman levels, 2A classification)', url: MAXPREPS_VB },
      { label: 'gastonday.org — Academic Profile 2025-2026 (Athletic Director)', url: PROFILE },
      { label: 'gastondayathletics.com — Spartan Athletics', url: ATHLETICS },
    ],
  },

  /* -------------------------------------------------------------- 1b cup -- */
  cup: {
    pointSources: [
      { sport: 'tennis', gender: 'girls', season: 'fall', titleYears: [2021, 2023, 2024, 2025], runnerUpYears: [2022] },
      { sport: 'volleyball', gender: 'girls', season: 'fall', titleYears: [2021, 2024, 2025], runnerUpYears: [2020] },
      { sport: 'soccer', gender: 'boys', season: 'fall', titleYears: [2021, 2022, 2024], runnerUpYears: [2025] },
      { sport: 'golf', gender: 'boys', season: 'spring', titleYears: [2022, 2023], runnerUpYears: [2024] },
      { sport: 'trackField', gender: 'boys', season: 'spring', titleYears: [2024], runnerUpYears: [2023] },
      { sport: 'tennis', gender: 'boys', season: 'spring', titleYears: [], runnerUpYears: [2021, 2022] },
      { sport: 'swimming', gender: 'girls', season: 'winter', titleYears: [2022] },
    ],
    sources: [
      { label: 'NCISAA Wells Fargo Cup standings, 2025–26', url: `${CUP_BASE}current-champions/` },
      { label: 'NCISAA Wells Fargo Cup standings, 2024–25', url: `${CUP_BASE}past-champions-2024-2025/` },
      { label: 'NCISAA Wells Fargo Cup standings, 2023–24', url: `${CUP_BASE}pastchampions2023-2024/` },
      { label: 'NCISAA Wells Fargo Cup standings, 2022–23', url: `${CUP_BASE}past-champions/past-champions-2022-2023/` },
      { label: 'NCISAA Wells Fargo Cup standings, 2021–22', url: `${CUP_BASE}past-champions/past-champions-2021-2022/` },
      { label: 'NCISAA Wells Fargo Cup standings, 2020–21', url: `${CUP_BASE}past-champions/past-champions-2020-2021/` },
      { label: 'NCISAA Wells Fargo Cup scoring and history', url: `${CUP_BASE}history/` },
      { label: 'NCISAA sport list', url: 'https://www.ncisaa.org/sports/' },
      { label: 'NCISAA playoff results archive', url: 'https://archives.ncisaa.org/' },
      { label: 'NCISAA girls tennis bracket, 2021–22', url: `${ARCHIVE}11&years=2021-2022` },
      { label: 'NCISAA girls tennis bracket, 2022–23', url: `${ARCHIVE}11&years=2022-2023` },
      { label: 'NCISAA girls tennis bracket, 2023–24', url: `${ARCHIVE}11&years=2023-2024` },
      { label: 'NCISAA girls tennis bracket, 2024–25', url: `${ARCHIVE}11&years=2024-2025` },
      { label: 'NCISAA girls tennis bracket, 2025–26', url: `${ARCHIVE}11&years=2025-2026` },
      { label: 'NCISAA volleyball bracket, 2020–21', url: `${ARCHIVE}12&years=2020-2021` },
      { label: 'NCISAA volleyball bracket, 2021–22', url: `${ARCHIVE}12&years=2021-2022` },
      { label: 'NCISAA volleyball bracket, 2024–25', url: `${ARCHIVE}12&years=2024-2025` },
      { label: 'NCISAA volleyball bracket, 2025–26', url: `${ARCHIVE}12&years=2025-2026` },
      { label: 'NCISAA boys soccer bracket, 2021–22', url: `${ARCHIVE}8&years=2021-2022` },
      { label: 'NCISAA boys soccer bracket, 2022–23', url: `${ARCHIVE}8&years=2022-2023` },
      { label: 'NCISAA boys soccer bracket, 2024–25', url: `${ARCHIVE}8&years=2024-2025` },
      { label: 'NCISAA boys soccer bracket, 2025–26', url: `${ARCHIVE}8&years=2025-2026` },
      { label: 'NCISAA boys tennis bracket, 2020–21', url: `${ARCHIVE}16&years=2020-2021` },
      { label: 'NCISAA boys tennis bracket, 2021–22', url: `${ARCHIVE}16&years=2021-2022` },
      { label: 'NCISAA swimming team scores, 2022', url: `${SWIM}Div%203%20Final_Team_Ind.pdf` },
      { label: 'Gaston Gazette — boys golf title, 2022', url: GOLF_22 },
      { label: 'HighSchoolOT — 2023 boys golf rankings, NCISAA D3 champion', url: GOLF_23 },
      { label: 'HighSchoolOT — NCISAA D3 boys golf, 2024', url: GOLF_24 },
      { label: 'Alamance News — NCISAA boys track, 2023', url: TRACK_23 },
      { label: 'Charlotte Observer — NCISAA boys track, 2024', url: TRACK_24 },
    ],
  },

  /* ----------------------------------------------------------- 1c record -- */
  record: {
    headline:
      'Fourteen NCISAA team state championships since 2021, in six sports — including five in the 2021–22 school year alone.',
    subhead:
      'Girls tennis has four titles and is on a three-peat; volleyball and boys soccer have three each, and the 2025 volleyball final went five sets.',
    seasonLabels: ['2023', '2024', '2025'],
    rows: [
      {
        program: 'Girls Tennis',
        cells: [
          { result: 'STATE', record: '5–1 final' },
          { result: 'STATE' },
          { result: 'STATE' },
        ],
        note: 'Four titles overall (2021, 2023, 2024, 2025) and three straight through 2025 — beat Trinity School of Durham & Chapel Hill 5–1 in 2023, then Epiphany School in both 2024 and 2025',
      },
      {
        program: 'Volleyball',
        cells: [
          { result: 'SEMIFINAL' },
          { result: 'STATE', record: 'swept' },
          { result: 'STATE', record: '3–2 final' },
        ],
        note: 'Three titles (2021, 2024, 2025); swept Westminster Catawba on Oct 26 2024, then beat St. Thomas More Academy 3–2 on Oct 25 2025. Plus three further finals appearances and five league titles over the decade',
      },
      {
        program: 'Boys Soccer',
        cells: [
          { result: 'SEMIFINAL' },
          { result: 'STATE', record: 'shutout' },
          { result: 'RUNNER-UP', record: '1–4 final' },
        ],
        note: 'Three titles (2021, 2022, 2024); blanked Westchester Country Day in 2024, then lost the 2025 final 1–4 to Caldwell Academy',
      },
      {
        program: 'Boys Golf',
        cells: [{ result: 'STATE' }, { result: 'RUNNER-UP' }, { result: 'NONE' }],
        note: 'Titles in 2022 and 2023, then runner-up to The O’Neal School in 2024',
      },
      {
        program: 'Boys Track & Field',
        cells: [{ result: 'RUNNER-UP' }, { result: 'STATE' }, { result: 'NONE' }],
        note: 'Lost the 2023 title to Burlington Christian 68–75, then won in 2024 with 87 points',
      },
    ],
    didNotWin:
      'every other program. The 14 titles since 2021 sit in six sports: girls tennis, volleyball, boys soccer, boys golf, boys track and girls swimming. The school publishes no championship history of its own, so this list rests on association results and local coverage.',
    bars: [],
    seasonDetail: [
      {
        program: 'Girls Tennis',
        text: 'The most decorated program at the school: NCISAA 2A champions in 2021, 2023, 2024 and 2025. The 2024 win over Epiphany School was described in coverage as the program’s third state championship in four years and fourth overall. The 2025 win over the same opponent made it three straight.',
      },
      {
        program: 'Volleyball',
        text: 'Won the 2A title in 2021, then again in 2024 and 2025 under head coach Derek Bing. The 2025 final against St. Thomas More Academy went the full five sets, 3–2, on October 25 2025. Beyond the three titles the program has reached three further finals and taken five league titles over the decade.',
      },
      {
        program: 'Boys Soccer',
        text: 'Won the NCISAA 2A title in 2021, 2022 and 2024, and lost the 2025 final 1–4 to Caldwell Academy. The 2024 win was a shutout of Westchester Country Day. It completed a three-title school year alongside volleyball and girls tennis, the run local coverage headlined as "Déjà vu".',
      },
      {
        program: 'Boys Golf',
        text: 'State champions in 2022 on a team score of 226, four strokes clear of The O’Neal School and Caldwell Academy, and again in 2023; runner-up to The O’Neal School in 2024, 228 to 217.',
      },
      {
        program: 'Boys Track & Field',
        text: 'Runner-up to Burlington Christian in 2023, 68 to 75, then NCISAA Division III champions in 2024 with 87 points, ahead of Caldwell Academy on 75 and The O’Neal School on 73.',
      },
      {
        program: 'Girls Swimming',
        text: 'NCISAA Division III champions in 2022, 231 to The O’Neal School’s 222, one of five team titles that school year.',
      },
    ],
    sources: [
      { label: 'HighSchoolOT — 2025-26 NCISAA team state champions in every sport', url: CHAMPS_26 },
      { label: 'HighSchoolOT — 2024-25 NCISAA team state champions in every sport', url: CHAMPS_25 },
      { label: 'HighSchoolOT — Gaston Day rolls to NCISAA 2A girls tennis title (2023)', url: TENNIS_23 },
      { label: 'HighSchoolOT — Gaston Day repeats NCISAA 2A girls tennis title (2024)', url: TENNIS_24 },
      { label: 'MaxPreps — Gaston Day volleyball (2025 final score and date)', url: MAXPREPS_VB },
      { label: 'NCISAA playoff results archive', url: 'https://archives.ncisaa.org/' },
      { label: 'NCISAA boys soccer bracket, 2025–26', url: `${ARCHIVE}8&years=2025-2026` },
      { label: 'NCISAA swimming team scores, 2022', url: `${SWIM}Div%203%20Final_Team_Ind.pdf` },
      { label: 'Gaston Gazette — boys golf title, 2022', url: GOLF_22 },
      { label: 'HighSchoolOT — 2023 boys golf rankings, NCISAA D3 champion', url: GOLF_23 },
      { label: 'HighSchoolOT — NCISAA D3 boys golf, 2024', url: GOLF_24 },
      { label: 'Alamance News — NCISAA boys track, 2023', url: TRACK_23 },
      { label: 'Charlotte Observer — NCISAA boys track, 2024', url: TRACK_24 },
    ],
  },

  /* ------------------------------------------------------- 1d pipeline -- */
  pipeline: {
    headline:
      'Three documented college commitments across the classes of 2024–26 — two of them Division I volleyball players, one to a Power 4 program.',
    subhead:
      'Built from Gaston Day’s varsity rosters and each college’s own roster; the school publishes no list of its college signees.',
    funnel: [
      { label: 'Committed to college athletics', hint: '(all divisions, 2024–26)', count: '3', width: 1, shade: 'pale' },
      { label: 'NCAA Division I', hint: '(any conference)', count: '2', width: 0.67, shade: 'mid' },
      { label: 'Power 4', hint: '(SEC · Big Ten · ACC · Big 12)', count: '1', width: 0.33, shade: 'full' },
    ],
    funnelNote:
      'Both Division I commits are volleyball players. One is Megan Brown (’24), at Wofford in the Southern Conference. The other is Anne Bradley Bing (’25), at South Carolina in the SEC, Gaston Day’s one Power 4 commitment in this window.',
    sportBars: [
      { sport: 'Volleyball', count: 2, width: 1, p4Width: 0.5 },
      { sport: 'Boys Basketball', count: 1, width: 0.5 },
    ],
    realityCheck:
      'Volleyball, Gaston Day’s state-championship program, produced both Division I commits. Braylen Todd (’26) went on to play basketball at Johnson & Wales in Charlotte. The school publishes no signing list or signing-day announcements, so the count is a documented minimum. Bree Smith (’27), a 50 and 100 freestyle swimmer, has committed to swim at Stanford.',
    roster: [
      { cls: "'26", name: 'Braylen Todd', sport: 'Boys Basketball', college: 'Johnson & Wales (Charlotte)', conf: 'USCAA', level: 'D3' },
      { cls: "'25", name: 'Anne Bradley Bing', sport: 'Volleyball', college: 'South Carolina', conf: 'SEC', level: 'P4' },
      { cls: "'24", name: 'Megan Brown', sport: 'Volleyball', college: 'Wofford', conf: 'Southern', level: 'D1' },
      // Class of 2027 — public verbal commitment, not yet signed; not in the funnel or Compare
      { cls: "'27", name: 'Bree Smith', sport: 'Swimming', college: 'Stanford', conf: 'ACC', level: 'P4' },
    ],
    rosterNote:
      'Each row is the college the athlete went to out of Gaston Day, as listed on that college’s own roster. P4 = SEC · Big Ten · ACC · Big 12. Johnson & Wales in Charlotte competes in the USCAA rather than the NCAA. Braylen Todd is listed at the D3 level, because this table has no USCAA level. The Class of 2027 row is a public commitment, listed because it is already announced. This row is not counted in the funnel, the sport bars or on the Compare page until the athlete signs.',
    sources: [
      { label: 'HighSchoolOT — NC volleyball recruiting tracker (Brown, Bing)', url: 'https://www.highschoolot.com/story/north-carolina-high-school-volleyball-recruiting-tracker/21031942/' },
      { label: 'Wofford — volleyball inks five signees, December 2023 (Megan Brown)', url: 'https://woffordterriers.com/news/2023/12/14/volleyball-inks-five-signees.aspx' },
      { label: 'Wofford — volleyball roster (Megan Brown)', url: 'https://woffordterriers.com/sports/womens-volleyball/roster/megan-brown/8731' },
      { label: 'South Carolina — volleyball roster (Anne Bradley Bing)', url: 'https://gamecocksonline.com/sports/wvball/roster/player/anne-bradley-bing/' },
      { label: 'Johnson & Wales Charlotte — men’s basketball roster 2026–27 (Braylen Todd)', url: 'https://charlotte.jwuathletics.com/sports/mens-basketball/roster' },
      { label: 'Charlotte Observer via Yahoo — 2026–27 Charlotte-area swimming preview (Bree Smith)', url: 'https://sports.yahoo.com/articles/best-high-school-swimmers-charlotte-100000360.html' },
      { label: 'MaxPreps — Gaston Day varsity rosters', url: MAXPREPS },
    ],
  },

  /* --------------------------------------------------------- 1e honors ---- */
  honors: {
    headline:
      'The public honors record is thin next to the championship ledger — the school publishes team results, not individual accolades.',
    subhead:
      'No professional alumni, All-State lists or player-of-the-year awards appear in any published source, and the athletics site that would carry them is not machine-readable.',
    pros: [],
    honors: [
      {
        label: '2025',
        text:
          'Girls tennis — NCISAA 2A state champions, third consecutive title (def. Epiphany School). Volleyball — NCISAA 2A state champions (def. St. Thomas More Academy 3–2, Oct 25).',
      },
      {
        label: '2024',
        text:
          'Volleyball — NCISAA 2A state champions (swept Westminster Catawba, Oct 26). Boys soccer — NCISAA 2A state champions (def. Westchester Country Day). Girls tennis — NCISAA 2A state champions, second straight. Boys track — NCISAA Division III state champions.',
      },
      {
        label: '2023',
        text:
          'Girls tennis — NCISAA 2A state champions, def. Trinity School of Durham & Chapel Hill 5–1. Boys golf — NCISAA Division III state champions.',
      },
      {
        label: '2022',
        text: 'Boys soccer — NCISAA 2A state champions (def. Greenfield 3–1). Girls swimming and boys golf — NCISAA state champions.',
      },
      {
        label: '2021',
        text:
          'Volleyball, girls tennis and boys soccer — NCISAA 2A state champions, three of five team titles that school year.',
      },
      {
        label: 'Decade',
        text:
          'Volleyball — three further NCISAA finals appearances and five league titles beyond the three championships.',
      },
    ],
    sources: [
      { label: 'HighSchoolOT — 2025-26 NCISAA team state champions', url: CHAMPS_26 },
      { label: 'HighSchoolOT — 2024-25 NCISAA team state champions', url: CHAMPS_25 },
      { label: 'HighSchoolOT — Gaston Day Spartans coverage', url: 'https://www.highschoolot.com/gaston-day-school/17527719/' },
      { label: 'NCISAA swimming team scores, 2022', url: `${SWIM}Div%203%20Final_Team_Ind.pdf` },
      { label: 'Gaston Gazette — boys golf title, 2022', url: GOLF_22 },
      { label: 'HighSchoolOT — 2023 boys golf rankings, NCISAA D3 champion', url: GOLF_23 },
      { label: 'HighSchoolOT — NCISAA D3 boys golf, 2024', url: GOLF_24 },
      { label: 'Alamance News — NCISAA boys track, 2023', url: TRACK_23 },
      { label: 'Charlotte Observer — NCISAA boys track, 2024', url: TRACK_24 },
    ],
  },

  /* ------------------------------------------------------ 1g facilities --- */
  facilities: {
    headline:
      'A 60-acre campus supporting 19 sports, with the athletics department run by a single named director.',
    subhead:
      'Venue-level detail is the weakest part of the school’s public record: the school publishes no facility inventory.',
    venues: [
      {
        name: 'Campus',
        detail:
          '60 acres in Gastonia, serving a five-county draw — Gaston, Lincoln, Cleveland, Mecklenburg and York.',
      },
      {
        name: 'Pamela Kimbrell Warlick Visual & Performing Arts Center',
        detail:
          '550 seats, modern lighting and sound, and a professional dance studio. The one campus venue the school describes in detail — it serves the arts rather than athletics, and is covered on the Arts cards.',
      },
      {
        name: 'Athletics venues',
        detail:
          'Not published. No gymnasium, field, court or pool inventory appears on any accessible page; home swim and wrestling arrangements are unstated.',
      },
    ],
    care: [
      {
        label: 'Athletic Director',
        text: 'Lulu Brase, named in the school’s own Academic Profile. She also co-directs the summer camp program.',
      },
      {
        label: 'Athletic training / sports medicine',
        text: 'Not published. No athletic trainer, team physician or concussion protocol is named in any accessible source.',
      },
      {
        label: 'Eligibility',
        text: 'Middle School participation (grades 6–8) requires academic standing and positive behavior — the one eligibility rule the school states publicly.',
      },
      {
        label: 'Governing documents',
        text: 'The athletics site references an Athletic Department Handbook 2026-2027 and tryout information, but not in a form this page can show.',
      },
    ],
    careNote:
      'This card is short because Gaston Day publishes no venue list. The one document that would carry that list, the Athletic Handbook, is mentioned on the school’s athletics site, but not in a form this page can show. That is a gap in what the school publishes, not a lack of facilities. A campus that fields 19 sports clearly has them.',
    sources: [
      { label: 'gastonday.org — Academic Profile 2025-2026 (Athletic Director, five-county draw)', url: PROFILE },
      { label: 'Private School Review — Gaston Day School profile (60-acre campus)', url: 'https://www.privateschoolreview.com/gaston-day-school-profile' },
      { label: 'gastondayathletics.com — Spartan Athletics (handbook referenced)', url: ATHLETICS },
      { label: 'gastonday.org — Middle School (grades 6-8 athletics and eligibility)', url: 'https://www.gastonday.org/middle-school/' },
    ],
  },
}
