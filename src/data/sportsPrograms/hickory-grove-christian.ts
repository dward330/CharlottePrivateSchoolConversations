// Hickory Grove Christian School — Sports research area.
//
// Every figure is traceable to
// source-material/sports/hickory-grove-christian/Hickory Grove Christian - Sports -
// Redesign Research 2026.md, which carries the provenance header, source URLs and
// gap notes. Figures the research could not confirm carry `toVerify` and render a
// TO VERIFY tag rather than being guessed at. The title and runner-up counts trace
// to Hickory Grove Christian - Sports - Wells Fargo Cup Standings 2020-2026.md.
//
// Six of the eight cards render for HGCS. The two that do not:
//  - 1g Facilities — no named venue, weight room, pool or athletic-training
//    detail is published on any HGCS page (confirmed NOT FOUND) → omitted.
//  - 1h National Stage & NIL — no national poll ranking, NIL deal or
//    national-showcase content exists for this regional NCISAA 3A program
//    (confirmed NOT FOUND) → omitted.
//
// Softball is the school's most decorated program, with seven NCISAA 3A titles, and
// it reached the state final again in 2022 and 2023.

import type { SportsProgram } from '../sportsProgram.ts'

const ATHLETICS = 'https://www.hgchristian.org/athletics-home'
const FALL_SPORTS = 'https://www.hgchristian.org/fall-sports'
const WINTER_SPORTS = 'https://www.hgchristian.org/winter-sports'
const SPRING_SPORTS = 'https://www.hgchristian.org/spring-sports'
const ARCHIVE = 'https://archives.ncisaa.org/index.php?sport='
const CUP_BASE = 'https://www.ncisaa.org/recognition/wells-fargo-cup/'
const TRACK_25 = 'https://admin.ncisaa.org/uploads/Docs/NCISAA%20D2%20FInal%20Results.pdf'
const MAXPREPS = 'https://www.maxpreps.com/nc/charlotte/hickory-grove-christian-lions/'
const TRACK_2025 =
  'https://www.highschoolot.com/story/hickory-grove-christian-dominates-ncisaa-d2-boys-track-field-championship/22010600/'
const BASEBALL_2024 =
  'https://www.highschoolot.com/story/grace-christian-of-sanford-wins-ncisaa-3a-baseball-title-sweeps-hickory-grove-christian/21457257/'
const RECRUIT_TRACKER =
  'https://www.highschoolot.com/story/north-carolina-high-school-baseball-recruiting-tracker/21296816/'
const WIKI = 'https://en.wikipedia.org/wiki/Hickory_Grove_Christian_School'

export const hickoryGroveChristian: SportsProgram = {
  /* ---------------------------------------------------------- 1a offered -- */
  offered: {
    headline:
      'Around 30 teams across roughly 12–14 sports for grades 6–12, competing in NCISAA 3A and the Metrolina Athletic Conference as the Lions.',
    subhead:
      'Most varsity programs carry a Middle School ladder beneath them, and several a JV squad. Levels below reflect the teams that list a head coach on the school\'s Coaches & Teams page.',
    stats: [
      { value: '~30', label: 'teams across V · JV · MS' },
      { value: '~12–14', label: 'sports (school says 12; Wikipedia 14)' },
      { value: '6–12', label: 'grades eligible to compete' },
      { value: 'NCISAA 3A', label: 'Metrolina Athletic Conference' },
    ],
    seasons: [
      {
        name: 'Fall',
        sports: [
          { name: 'Cross Country (B & G)', levels: ['V', 'MS'] },
          { name: 'Football', levels: ['V', 'MS'] },
          { name: 'Golf (Girls)', levels: ['V'] },
          { name: 'Soccer (Boys)', levels: ['V', 'MS'] },
          { name: 'Volleyball', levels: ['V', 'JV', 'MS'] },
          { name: 'Cheerleading', levels: ['V'] },
        ],
      },
      {
        name: 'Winter',
        sports: [
          { name: 'Basketball (Boys)', levels: ['V', 'JV', 'MS'] },
          { name: 'Basketball (Girls)', levels: ['V', 'MS'] },
          { name: 'Swimming', levels: ['V'] },
          { name: 'Cheerleading (Winter)', levels: ['V', 'MS'] },
        ],
      },
      {
        name: 'Spring',
        sports: [
          { name: 'Baseball', levels: ['V', 'JV', 'MS'] },
          { name: 'Golf (Boys)', levels: ['V'] },
          { name: 'Soccer (Girls)', levels: ['V', 'MS'] },
          { name: 'Softball', levels: ['V'] },
          { name: 'Track & Field', levels: ['V'] },
        ],
      },
    ],
    footnote:
      'The athletics page states "30 teams participating in 12 different sports" (Wikipedia says 14 sports / 28 teams). Tennis (boys & girls), Wrestling and Field Hockey appear in MaxPreps\' sport inventory but list no head coach on the school\'s Coaches & Teams page, so a level chip is not drawn for them. Athletic Director Jim Rhodes; Assistant AD Crystal Rhodes.',
    sources: [
      { label: 'hgchristian.org — Athletics Home (30 teams / 12 sports, NCISAA + MAC)', url: ATHLETICS },
      { label: 'hgchristian.org — Fall Sports (season/level roster)', url: FALL_SPORTS },
      { label: 'hgchristian.org — Winter Sports (season/level roster)', url: WINTER_SPORTS },
      { label: 'hgchristian.org — Spring Sports (season/level roster)', url: SPRING_SPORTS },
      { label: 'MaxPreps — Hickory Grove Christian Lions', url: MAXPREPS },
    ],
  },

  /* -------------------------------------------------------------- 1b cup -- */
  cup: {
    pointSources: [
      { sport: 'baseball', gender: 'boys', season: 'spring', titleYears: [2021, 2023], runnerUpYears: [2024] },
      { sport: 'softball', gender: 'girls', season: 'spring', titleYears: [], runnerUpYears: [2022, 2023] },
      { sport: 'trackField', gender: 'boys', season: 'spring', titleYears: [2025] },
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
      { label: 'NCISAA baseball bracket, 2020–21', url: `${ARCHIVE}1&years=2020-2021` },
      { label: 'NCISAA baseball bracket, 2022–23', url: `${ARCHIVE}1&years=2022-2023` },
      { label: 'NCISAA baseball bracket, 2023–24', url: `${ARCHIVE}1&years=2023-2024` },
      { label: 'NCISAA softball bracket, 2021–22', url: `${ARCHIVE}21&years=2021-2022` },
      { label: 'NCISAA softball bracket, 2022–23', url: `${ARCHIVE}21&years=2022-2023` },
      { label: 'NCISAA track and field results, 2024–25', url: `${ARCHIVE}22&years=2024-2025` },
      { label: 'NCISAA Division II track results, 2025', url: TRACK_25 },
    ],
  },

  /* ----------------------------------------------------------- 1c record -- */
  record: {
    headline:
      'Twelve NCISAA team state titles since joining in 2002 — seven in softball, three in baseball, and one each in girls basketball and boys track.',
    subhead:
      '"State" = NCISAA (the private-school association); HGCS competes in 3A. Softball is the flagship: seven titles across 2006–2019, and back in the state final in 2022 and 2023.',
    seasonLabels: ['2021', '2023', '2024–25'],
    rows: [
      {
        program: 'Baseball',
        cells: [
          { result: 'STATE', record: '3A champ' },
          { result: 'STATE', record: '3A champ' },
          { result: 'RUNNER-UP', record: '18–10' },
        ],
        note: '3A champions 2021 & 2023 (and 2A in 2005); runner-up 2024 — swept by Grace Christian of Sanford',
      },
      {
        program: 'Boys Track & Field',
        cells: [
          { result: 'NONE' },
          { result: 'NONE' },
          { result: 'STATE', record: '2025 D2' },
        ],
        note: 'Won the 2025 NCISAA Division II title with 130 points, 37 clear of Asheville School',
      },
      {
        program: 'Softball',
        cells: [
          { result: 'SEMIFINAL' },
          { result: 'RUNNER-UP' },
          { result: 'NONE' },
        ],
        note: 'Seven 3A titles 2006–2019; lost the 2022 and 2023 state finals to High Point Christian',
      },
    ],
    didNotWin:
      'the 2024 3A baseball final went to Grace Christian of Sanford, which swept the best-of-three series (4–1, 7–5).',
    bars: [
      { program: 'Softball', record: '7 state titles', pct: 1, tag: '2006–2019' },
      { program: 'Baseball', record: '3 state titles', pct: 0.43, tag: '2005 · 2021 · 2023' },
      { program: 'Girls Basketball', record: '1 state title', pct: 0.14, tag: '2009 (3A)' },
      { program: 'Boys Track', record: '1 state title', pct: 0.14, tag: '2025 (D2)' },
    ],
    seasonDetail: [
      {
        program: 'Softball',
        text: 'Seven NCISAA 3A championships — 2019, 2017, 2010, 2009, 2008, 2007 and 2006 — plus 3A runner-up finishes in 2023, 2022, 2018, 2015 and 2013 and a 2A runner-up in 2004. High Point Christian won both recent finals, 2022 in three games and 2023 in two. It is the deepest title run of any HGCS program.',
      },
      {
        program: 'Baseball',
        text: 'NCISAA 3A champions in 2021 and 2023 (and 2A champions in 2005), beating High Point Christian in both finals: 5–1 and 4–2 in 2021, then 8–1, 3–13 and 5–1 in 2023. In 2024 the Lions reached the 3A final but were swept by Grace Christian of Sanford, 4–1 and 7–5, finishing 18–10.',
      },
      {
        program: 'Boys Track & Field',
        text: '2025 NCISAA Division II champions with 130 points, 37 ahead of Asheville School — Anthony Hawkins swept the discus (164-8) and shot put (53-7.25), backed by three relay wins.',
      },
    ],
    sources: [
      { label: 'hgchristian.org — Fall Sports (varsity records and titles)', url: FALL_SPORTS },
      { label: 'hgchristian.org — Winter Sports (varsity records and titles)', url: WINTER_SPORTS },
      { label: 'hgchristian.org — Spring Sports (varsity records and titles)', url: SPRING_SPORTS },
      { label: 'HighSchoolOT — 2025 NCISAA D2 boys track championship', url: TRACK_2025 },
      { label: 'HighSchoolOT — 2024 3A baseball final (Grace Christian sweep)', url: BASEBALL_2024 },
      { label: 'Wikipedia — HGCS program totals since 2002', url: WIKI },
      { label: 'NCISAA playoff results archive', url: 'https://archives.ncisaa.org/' },
      { label: 'NCISAA baseball bracket, 2020–21', url: `${ARCHIVE}1&years=2020-2021` },
      { label: 'NCISAA baseball bracket, 2022–23', url: `${ARCHIVE}1&years=2022-2023` },
      { label: 'NCISAA softball bracket, 2021–22', url: `${ARCHIVE}21&years=2021-2022` },
      { label: 'NCISAA softball bracket, 2022–23', url: `${ARCHIVE}21&years=2022-2023` },
      { label: 'NCISAA track and field results, 2024–25', url: `${ARCHIVE}22&years=2024-2025` },
    ],
  },

  /* --------------------------------------------------------- 1d pipeline -- */
  pipeline: {
    headline:
      'Three Division I baseball commits across the classes of 2024–26 — all to mid-major conferences, none Power 4.',
    subhead:
      'Built from HighSchoolOT\'s NC baseball recruiting tracker and a PrepBaseballReport preview; division labels were added by the researcher from each college\'s NCAA status.',
    funnel: [
      { label: 'Committed to college athletics', hint: '(all divisions, baseball)', count: '5', width: 1, shade: 'pale' },
      { label: 'NCAA Division I', hint: '(mid-major)', count: '3', width: 0.6, shade: 'mid' },
      { label: 'Power 4', hint: '(SEC · Big Ten · ACC · Big 12)', count: '0', width: 0.04, shade: 'full' },
    ],
    funnelNote:
      'Every recent college-athletics commit the research located is in baseball. All three Division I commits are to mid-major conferences (SoCon, CAA, Big South); there are no Power 4 commits in this window. Treat the tally as a floor — a school-published all-sport commit list was not found.',
    sportBars: [
      { sport: 'Baseball', count: 3, width: 1 },
    ],
    realityCheck:
      'HGCS\'s recruiting footprint in this window is baseball, the program with two of its recent state titles. No basketball, football or other-sport college commit surfaced for 2024–26, and no all-sport "next level" page is published, so other sports may send commits the research could not see.',
    roster: [
      { cls: "'25", name: 'Davis Cabbage', sport: 'Baseball', college: 'UNC Wilmington', conf: 'CAA', level: 'D1' },
      { cls: "'25", name: 'Ben Green', sport: 'Baseball', college: 'UNC Asheville', conf: 'Big South', level: 'D1' },
      { cls: "'25", name: 'Brady Johnson', sport: 'Baseball', college: 'East Tennessee State', conf: 'SoCon', level: 'D1' },
      { cls: "'25", name: 'Von Pelow', sport: 'Baseball', college: 'Mars Hill', conf: 'SAC', level: 'D2' },
      { cls: "'24", name: 'Colby Vanhook', sport: 'Baseball', college: 'Gaston College', conf: 'Region 10', level: 'D2' },
    ],
    rosterNote:
      'Level labels (D1 / D2) and conferences were added by the researcher from each college\'s NCAA status. Brady Johnson → ETSU is from a PrepBaseballReport preview surfaced via search (the page 403s on direct fetch), so it carries a TO VERIFY. P4 = SEC · Big Ten · ACC · Big 12.',
    sources: [
      { label: 'HighSchoolOT — NC baseball recruiting tracker (Cabbage, Green, Vanhook)', url: RECRUIT_TRACKER },
      {
        label: 'PrepBaseballReport — 2025 NC preview (Johnson, Pelow) — via search snippet',
        url: 'https://www.prepbaseballreport.com/news/NC/2025-nc-high-school-previews--volume-i',
      },
    ],
  },

  /* ----------------------------------------------------------- 1e honors -- */
  honors: {
    headline:
      'No professional or Power-4 alumni surfaced — the honors here are individual NCISAA state champions in golf, cross country and track.',
    subhead:
      'HGCS maintains no pro-alumni tracker, and none was found; the verified individual honors are its state champions.',
    pros: [],
    honors: [
      {
        label: 'Track & Field — individual state champions',
        text: 'Anthony Hawkins swept the discus (164-8) and shot put (53-7.25) at the 2025 NCISAA D2 meet. The school lists multiple individual and relay state champions across 2019, 2021, 2023, 2024 and 2025.',
        tag: 'NCISAA, individual',
      },
      {
        label: 'Men\'s Golf — individual state champion',
        text: 'Chad Cox won the NCISAA 3A individual title in both 2009 and 2010.',
        tag: 'NCISAA, individual',
      },
      {
        label: 'Cross Country — individual state champion',
        text: 'Daniel Similton won the NCISAA 3A men\'s individual title (2019), and HGCS took the boys individual title in 2018 as well.',
        tag: 'NCISAA, individual',
      },
      {
        label: 'Program totals',
        text: 'Since joining NCISAA in 2002: 57 state playoff appearances, 22 state Final Fours, 12 team state championships, at least nine state runner-ups and 48 MAC regular-season / tournament championships.',
        tag: 'Since 2002',
        tagStyle: 'outline',
      },
    ],
    sources: [
      { label: 'hgchristian.org — Fall Sports (individual champions)', url: FALL_SPORTS },
      { label: 'hgchristian.org — Winter Sports (individual champions)', url: WINTER_SPORTS },
      { label: 'hgchristian.org — Spring Sports (individual champions)', url: SPRING_SPORTS },
      { label: 'HighSchoolOT — 2025 D2 track (Hawkins marks)', url: TRACK_2025 },
      { label: 'Wikipedia — HGCS program totals since 2002', url: WIKI },
    ],
  },

  /* --------------------------------------------------------- 1f coaching -- */
  coaching: {
    headline:
      'A full head-coaching roster is published by name — but no coaching bios, records or tenures are, so this is a directory rather than a pedigree.',
    subhead: 'Athletic Director: Jim Rhodes. Assistant AD: Crystal Rhodes.',
    featured: [],
    tenure: [
      { name: 'Tad Baucom', role: 'Football', width: 1, since: 'head coach', toVerify: true },
      { name: 'Austin Turner', role: 'Boys Basketball', width: 1, since: 'head coach', toVerify: true },
      { name: 'Dwayne Robinson', role: 'Girls Basketball', width: 1, since: 'head coach', toVerify: true },
      { name: 'Nick Daddio', role: 'Baseball (V & JV)', width: 1, since: 'head coach', toVerify: true },
      { name: 'Brandon Williams', role: 'Softball · MS Girls Basketball', width: 1, since: 'head coach', toVerify: true },
      { name: 'Andrew Stover', role: 'Track & Field', width: 1, since: 'head coach', toVerify: true },
      { name: 'Fernando Rogante', role: 'Boys Soccer', width: 1, since: 'head coach', toVerify: true },
      { name: 'Hannah Griffin', role: 'Volleyball (V & JV)', width: 1, since: 'head coach', toVerify: true },
    ],
    worthKnowing:
      'The Coaches & Teams page names a head coach for nearly every varsity, JV and Middle School squad (Cross Country and Golf coaches Elizabeth Hamilton, Keith White and Todd Staples; Swimming Sam Cox; Cheer Carmen Costner among them), but publishes no bios, career records or tenure lengths — so no pedigree or continuity claim can be made from public sources. The "since" and width fields are therefore marked TO VERIFY rather than filled with a guessed year.',
    sources: [
      { label: 'hgchristian.org — Fall Sports (named head coaches)', url: FALL_SPORTS },
      { label: 'hgchristian.org — Winter Sports (named head coaches)', url: WINTER_SPORTS },
      { label: 'hgchristian.org — Spring Sports (named head coaches)', url: SPRING_SPORTS },
    ],
  },
}
