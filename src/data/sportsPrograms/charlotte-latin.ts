// Charlotte Latin School — Sports research area.
//
// Every figure is traceable to
// source-material/sports/charlotte-latin/Charlotte Latin - Sports - Redesign Research 2026.md.
//
// SIX of seven cards render. `national` (1g) is deliberately omitted: no
// MaxPreps/ESPN/SBLive NATIONAL team ranking was found for any Latin program in
// any sport or year, no out-of-state non-conference schedule is published, and
// no named Latin NIL deal exists in public sources. Latin's genuine national
// signal is individual — National Prep wrestling seeds — which belongs on the
// pipeline and honors cards, not a National Stage card the evidence can't carry.

import type { SportsProgram } from '../sportsProgram.ts'

const TEAMS = 'https://www.charlottelatin.org/athletics/athletic-teams'
const STAFF = 'https://www.charlottelatin.org/athletics/meet-the-staff'
const CHAMPS_26 =
  'https://www.highschoolot.com/story/the-2025-26-ncisaa-team-state-champions-in-every-sport/22322092/'

export const charlotteLatin: SportsProgram = {
  /* ---------------------------------------------------------- 1a offered -- */
  offered: {
    headline:
      '66 teams across 17 sports on a 128-acre campus, with about 90% of students in grades 7–12 playing something.',
    subhead:
      'The largest campus among Charlotte-area independent schools, and 165 state championships across 21 sports since the NCISAA formed in 1973.',
    stats: [
      { value: '17', label: 'sports offered' },
      { value: '66', label: 'teams, grades 7–12' },
      { value: '~90%', label: 'of students play a sport' },
      { value: '165', label: 'state titles since 1973' },
    ],
    seasons: [
      {
        name: 'Fall',
        note: '8 varsity',
        sports: [
          { name: 'Football', levels: ['V', 'JV', 'MS'] },
          { name: 'Volleyball (Girls)', levels: ['V', 'JV', 'MS'] },
          { name: 'Soccer (Boys)', levels: ['V', 'JV'] },
          { name: 'Field Hockey', levels: ['V'] },
          { name: 'Cross Country (B & G)', levels: ['V'] },
          { name: 'Tennis (Girls)', levels: ['V'] },
          { name: 'Golf (Girls)', levels: ['V'] },
          { name: 'Cheerleading', levels: ['V'] },
        ],
      },
      {
        name: 'Winter',
        note: '6 varsity',
        sports: [
          { name: 'Basketball (Boys)', levels: ['V', 'JV', 'MS'] },
          { name: 'Basketball (Girls)', levels: ['V', 'JV', 'MS'] },
          { name: 'Wrestling', levels: ['V', 'MS'] },
          { name: 'Swimming (B & G)', levels: ['V'] },
          { name: 'Dance Team', levels: ['V'] },
        ],
      },
      {
        name: 'Spring',
        note: '9 varsity',
        sports: [
          { name: 'Baseball', levels: ['V', 'JV', 'MS'] },
          { name: 'Lacrosse (Boys)', levels: ['V', 'JV'] },
          { name: 'Lacrosse (Girls)', levels: ['V'] },
          { name: 'Soccer (Girls)', levels: ['V'] },
          { name: 'Softball', levels: ['V'] },
          { name: 'Tennis (Boys)', levels: ['V'] },
          { name: 'Golf (Boys)', levels: ['V'] },
          { name: 'Track & Field (B & G)', levels: ['V'] },
        ],
      },
    ],
    footnote:
      'The school publishes "17 sports / 66 teams" while its athletics directory lists 24 varsity programs counting boys’ and girls’ editions separately — both figures are the school’s own and are reproduced as published. JV and Middle School levels are confirmed only for the eight sports with distinct team pages; Latin does not publish a level-by-level breakdown of all 66 teams. Latin competes in NCISAA 4A and the CISAA, with football in the new "Big South" conference.',
    sources: [
      { label: 'charlottelatin.org — Athletic Teams', url: TEAMS },
      { label: 'clshawks.com — About Athletics', url: 'https://clshawks.com/sports/2024/10/16/about.aspx' },
      { label: 'Wikipedia — Charlotte Latin School', url: 'https://en.wikipedia.org/wiki/Charlotte_Latin_School' },
    ],
  },

  /* ----------------------------------------------------------- 1b record -- */
  record: {
    headline:
      'Eight NCISAA state championships in three seasons, led by four straight boys golf titles and a 26th wrestling crown.',
    subhead:
      'Latin’s strength is concentrated in the individual-scored sports — wrestling, golf and swimming — rather than the marquee team sports.',
    seasonLabels: ["'23–24", "'24–25", "'25–26"],
    rows: [
      {
        program: 'Boys Golf',
        cells: [
          { result: 'STATE', record: 'stroke play' },
          { result: 'STATE', record: 'stroke play' },
          { result: 'STATE', record: '561 (−15)' },
        ],
        note: 'Four straight NCISAA titles through 2026',
      },
      {
        program: 'Wrestling',
        cells: [
          { result: 'STATE', record: '250 pts' },
          { result: 'RUNNER-UP', record: '264.5 pts' },
          { result: 'STATE', record: '30–4 duals' },
        ],
        note: 'Lost the 2025 title by a single point; 26th title in 2026',
      },
      {
        program: 'Girls Lacrosse',
        cells: [
          { result: 'STATE', record: '15–3' },
          { result: 'RUNNER-UP' },
          { result: 'RUNNER-UP', record: '10–13' },
        ],
        note: 'Three consecutive state finals',
      },
      {
        program: 'Boys Swimming',
        cells: [
          { result: 'STATE', record: '462 pts' },
          { result: 'NONE', record: '2nd place' },
          { result: 'NONE', record: '2nd place' },
        ],
        note: 'Set four records winning the 2024 D1 meet',
      },
      {
        program: 'Girls Golf',
        cells: [
          { result: 'NONE' },
          { result: 'NONE' },
          { result: 'STATE', record: 'playoff hole' },
        ],
        note: 'First title of the window, won in a playoff',
      },
      {
        program: 'Volleyball',
        cells: [
          { result: 'NONE', record: '13–11' },
          { result: 'NONE', record: '18–6' },
          { result: 'RUNNER-UP', record: '29–2' },
        ],
        note: 'From rank 128 to rank 17 in three years — the best arc in the program',
      },
      {
        program: 'Field Hockey',
        cells: [
          { result: 'NONE', record: '14–6' },
          { result: 'NONE', record: '11–8' },
          { result: 'RUNNER-UP', record: '16–5' },
        ],
        note: 'Lost the final 1–0 to top-seed Charlotte Country Day',
      },
    ],
    didNotWin:
      'volleyball (North Raleigh Christian) · field hockey and girls tennis (Charlotte Country Day) · girls lacrosse, girls soccer, football and girls swimming (Providence Day) · boys basketball (Forsyth Country Day) · girls basketball (Cannon) · boys lacrosse, boys tennis, girls cross country and girls track (Durham Academy) · boys soccer, boys cross country and boys track (Christ School) · boys swimming (Cary Academy) · baseball (Charlotte Christian) · softball (Covenant Day).',
    bars: [
      { program: 'Volleyball', record: '60–19', pct: 0.759 },
      { program: 'Field Hockey', record: '41–19', pct: 0.683 },
      { program: 'Girls Basketball', record: '52–28', pct: 0.65 },
      { program: 'Baseball', record: '44–31–1', pct: 0.587 },
      { program: 'Boys Basketball', record: '45–38', pct: 0.542 },
      { program: 'Football', record: '17–15', pct: 0.531 },
    ],
    seasonDetail: [
      {
        program: 'Volleyball',
        text: 'The clearest upward arc at the school: 13–11 and ranked 128th in NC, then 18–6 and 35th, then 29–2 and 17th with a state-final appearance — the 2025 team won 22 straight before its first loss, under Caitlin Peters.',
      },
      {
        program: 'Wrestling',
        text: '2024 champions with 250 points · 2025 runner-up by one point, 265.5 to 264.5, to Metrolina Christian · 2026 champions with 321 points, a 30–4 dual record and four individual titles.',
      },
      {
        program: 'Golf',
        text: 'Boys golf has won four straight NCISAA titles through 2026, and girls golf added a first title on a playoff hole in 2026. Golf is stroke-play scored, so no win–loss record exists for the school’s most successful current program.',
      },
    ],
    sources: [
      { label: 'HighSchoolOT — 2025–26 NCISAA champions', url: CHAMPS_26 },
      {
        label: '2024 boys swimming title',
        url: 'https://www.highschoolot.com/story/charlotte-latin-wins-ncisaa-d1-boys-swimming-championship-sets-four-records/21295043/',
      },
      {
        label: '2025 wrestling — lost by one point',
        url: 'https://www.highschoolot.com/story/metrolina-christian-takes-ncisaa-wrestling-championship-by-one-point/21863211/',
      },
      {
        label: '2026 wrestling title & Coach of the Year',
        url: 'https://clshawks.com/news/2026/2/16/wrestling-mat-hawks-dominant-performance-wins-ncisaa-team-title-4-individual-titles-and-coach-of-the-year.aspx',
      },
    ],
  },

  /* --------------------------------------------------------- 1c pipeline -- */
  pipeline: {
    headline:
      '48 college commitments across 2024–26, 14 of them Division I — and a pipeline led by swimming and golf, not football.',
    subhead:
      'That inverts the usual assumption about Latin: football has produced exactly one Division I commit across these three classes.',
    funnel: [
      {
        label: 'Committed to college athletics',
        hint: '(all divisions)',
        count: '48',
        width: 1,
        shade: 'pale',
      },
      { label: 'NCAA Division I', hint: '(any conference)', count: '14', width: 0.29, shade: 'mid' },
      {
        label: 'Power 4',
        hint: '(SEC · Big Ten · ACC · Big 12)',
        count: '3',
        width: 0.07,
        shade: 'full',
      },
    ],
    funnelNote:
      'Twenty-nine of the 48 commitments — roughly 60% — are to NCAA Division III programs, heavily concentrated in academically selective conferences (NESCAC, UAA, ODAC, Centennial). Latin has no comprehensive alumni-in-college census; these 48 come from five published signing-day articles and may miss athletes who committed outside those events.',
    sportBars: [
      { sport: 'Swimming', count: 4, width: 1, p4Width: 0.25 },
      { sport: 'Golf', count: 3, width: 0.75, p4Width: 0.25 },
      { sport: 'Lacrosse', count: 2, width: 0.5 },
      { sport: 'Football', count: 1, width: 0.25, p4Width: 0.25 },
      { sport: 'Tennis', count: 1, width: 0.25 },
      { sport: 'Baseball', count: 1, width: 0.25 },
      { sport: 'Wrestling', count: 1, width: 0.25 },
    ],
    realityCheck:
      'Latin’s D1 pipeline is swimming- and golf-led. Football produced one D1 commit (Neil Salvage to South Carolina) in three classes, despite the program’s eleven historic state titles. For most Latin families the realistic outcome is a Division III place at an academically strong college — Washington & Lee, Emory, Tufts, Swarthmore and Case Western recur repeatedly on the signing lists.',
    rankedRecruits:
      'Wrestling supplies the genuine national credential: Spear Gorelick ’26 was a 2025 National Prep All-American and was pre-seeded No. 6 nationally at 150 lbs for the 2026 National Prep Championships, reaching 100 career wins before signing with Davidson. Freshman Jack Gilson also reached the national bracket at 138 lbs. In golf, Griffin Cheatwood was NCISAA medalist and Charlotte Observer Golfer of the Year; Aston Lee was CISAA Golfer of the Year. No Latin athlete currently appears in a 247Sports/On3/Rivals national top-100 for football or basketball.',
    roster: [
      { cls: "'26", name: 'Aston Lee', sport: 'Golf', college: 'NC State', conf: 'ACC', level: 'P4' },
      { cls: "'26", name: 'Harrison Short', sport: 'Swimming', college: 'Villanova', conf: 'Big East', level: 'D1' },
      { cls: "'26", name: 'Karlin Smith', sport: 'Swimming', college: 'Bucknell', conf: 'Patriot', level: 'D1' },
      { cls: "'26", name: 'Henry Holland', sport: 'Golf', college: 'James Madison', conf: 'Sun Belt', level: 'D1' },
      { cls: "'26", name: 'Spear Gorelick', sport: 'Wrestling', college: 'Davidson', conf: 'SoCon', level: 'D1' },
      { cls: "'26", name: 'Griffin Cheatwood', sport: 'Golf', college: 'Davidson', conf: 'Atlantic 10', level: 'D1' },
      { cls: "'26", name: 'Lanie Edwards', sport: 'Girls Basketball', college: 'Rollins', conf: 'SSC', level: 'D2' },
      { cls: "'26", name: 'Liam McConaughy', sport: 'Wrestling', college: 'Case Western Reserve', conf: 'UAA', level: 'D3' },
      { cls: "'26", name: 'Banks Cutter', sport: 'Football & Lacrosse', college: 'Middlebury', conf: 'NESCAC', level: 'D3' },
      { cls: "'26", name: 'Mollie Snyder', sport: 'Girls Basketball', college: 'Grove City', conf: 'PAC', level: 'D3' },
      { cls: "'26", name: 'Knox Hutcheson', sport: 'Boys Lacrosse', college: 'Sewanee', conf: 'SAA', level: 'D3' },
      { cls: "'26", name: 'Louis Markin', sport: 'Boys Soccer', college: 'Case Western Reserve', conf: 'UAA', level: 'D3' },
      { cls: "'26", name: 'Sunny Jin', sport: 'Girls Soccer', college: 'Case Western Reserve', conf: 'UAA', level: 'D3' },
      { cls: "'26", name: 'Claire Zhang', sport: 'Girls Soccer', college: 'MIT', conf: 'NEWMAC', level: 'D3' },
      { cls: "'26", name: 'Kelsey Sciacca', sport: 'Golf', college: 'Washington & Lee', conf: 'ODAC', level: 'D3' },
      { cls: "'26", name: 'Charlotte Tune', sport: 'Girls Basketball', college: 'Washington & Lee', conf: 'ODAC', level: 'D3' },
      { cls: "'26", name: 'Emily Cao', sport: 'Volleyball', college: 'Williams', conf: 'NESCAC', level: 'D3' },
      { cls: "'26", name: 'Jaden Hawa', sport: 'Baseball', college: 'William Peace', conf: 'USA South', level: 'D3' },
      { cls: "'26", name: 'Matthew Flynn', sport: 'Football', college: 'Hampden-Sydney', conf: 'ODAC', level: 'D3' },
      { cls: "'25", name: 'Norvy Clontz', sport: 'Swimming', college: 'UC Berkeley', conf: 'ACC', level: 'P4' },
      { cls: "'25", name: 'Avery Booker', sport: 'Baseball', college: 'Queens (Charlotte)', conf: 'ASUN', level: 'D1' },
      { cls: "'25", name: 'Lila Connor', sport: 'Swimming', college: 'Georgetown', conf: 'Big East', level: 'D1' },
      { cls: "'25", name: 'Riley Milligan', sport: 'Lacrosse', college: 'St. Bonaventure', conf: 'Atlantic 10', level: 'D1' },
      { cls: "'25", name: 'Reese Morgan', sport: 'Lacrosse', college: 'Temple', conf: 'American', level: 'D1' },
      { cls: "'25", name: 'Brayden Hampton', sport: 'Not published', college: 'Fairmont State', conf: 'MEC', level: 'D2' },
      { cls: "'25", name: 'Talia Hawa', sport: 'Not published', college: 'Roanoke', conf: 'ODAC', level: 'D3' },
      { cls: "'25", name: 'Maggie Hyder', sport: 'Not published', college: 'Trinity', conf: '—', level: 'D3' },
      { cls: "'25", name: 'Lillian Jarmosevich', sport: 'Not published', college: 'Swarthmore', conf: 'Centennial', level: 'D3' },
      { cls: "'25", name: 'Ethan Khouri', sport: 'Not published', college: 'Washington & Lee', conf: 'ODAC', level: 'D3' },
      { cls: "'25", name: 'Parker Rubinacci', sport: 'Not published', college: 'Emory', conf: 'UAA', level: 'D3' },
      { cls: "'25", name: 'Hudson Shoup', sport: 'Not published', college: 'Calvin', conf: 'MIAA', level: 'D3' },
      { cls: "'25", name: 'Ainsley Sullivan', sport: 'Not published', college: 'Macalester', conf: 'MIAC', level: 'D3' },
      { cls: "'25", name: 'Sydney Thune', sport: 'Not published', college: 'Emory', conf: 'UAA', level: 'D3' },
      { cls: "'25", name: 'Bridget Yu', sport: 'Not published', college: 'Tufts', conf: 'NESCAC', level: 'D3' },
      { cls: "'24", name: 'Neil Salvage', sport: 'Football', college: 'South Carolina', conf: 'SEC', level: 'P4' },
      { cls: "'24", name: 'Luke Coppage', sport: 'Tennis', college: 'Queens (Charlotte)', conf: 'ASUN', level: 'D1' },
      { cls: "'24", name: 'Charley Floyd', sport: 'Swimming', college: 'Tulane', conf: 'American', level: 'D1' },
      { cls: "'24", name: 'George Glassner', sport: 'Not published', college: 'Washington & Lee', conf: 'ODAC', level: 'D3' },
      { cls: "'24", name: 'Zachary Spicer', sport: 'Not published', college: 'Emory', conf: 'UAA', level: 'D3' },
      { cls: "'24", name: 'Jordan Pence', sport: 'Not published', college: 'Hampden-Sydney', conf: 'ODAC', level: 'D3' },
    ],
    rosterNote:
      'Several Class of 2024 and 2025 signing-day announcements named the college but not the sport; those rows read "Not published" rather than being guessed at. Level labels and conferences were added by the researcher from each college’s NCAA status. P4 = SEC · Big Ten · ACC · Big 12.',
    sources: [
      {
        label: 'clshawks.com — 2026 signing day',
        url: 'https://clshawks.com/news/2026/2/4/general-seven-hawks-celebrated-on-signing-day-2026.aspx',
      },
      {
        label: 'clshawks.com — Nov 2025 signing day',
        url: 'https://clshawks.com/news/2025/11/12/football-12-hawks-celebrated-on-signing-day.aspx',
      },
      {
        label: 'FloWrestling — 2026 National Prep pre-seeds',
        url: 'https://www.flowrestling.org/articles/15454487-2026-national-prep-wrestling-championship-pre-seeds',
      },
    ],
  },

  /* ----------------------------------------------------------- 1d honors -- */
  honors: {
    headline:
      'An NFL starting quarterback, an NBA three-point record-holder, and an LPGA golfer — with an NC Mr. Basketball among them.',
    subhead:
      'Latin’s Athletic Hall of Fame, established in 2014, now carries five induction classes.',
    pros: [
      {
        kicker: "NFL · Class of '15",
        name: 'Daniel Jones',
        detail:
          'Sixth overall pick in the 2019 NFL Draft and Duke’s career passing-yardage record holder. Re-signed with the Indianapolis Colts in March 2026 as their starting quarterback.',
        path: 'Latin → Duke → Giants / Vikings / Colts',
      },
      {
        kicker: "NBA · Class of '04",
        name: 'Anthony Morrow',
        detail:
          'Undrafted in 2008, then scored 37 points in his first NBA start — a record for an undrafted rookie — and became the only rookie ever to win the NBA three-point percentage title. NC Mr. Basketball as a Latin senior.',
        path: 'Latin → Georgia Tech → Warriors and others',
      },
      {
        kicker: "NFL · Class of '00",
        name: 'Chris Canty',
        detail:
          'Two-time second-team All-ACC defensive lineman at Virginia. As a Latin senior he recorded 89 tackles and 7 sacks leading the Hawks to the 1999 NCISAA title.',
        path: 'Latin → Virginia → NFL',
      },
      {
        kicker: 'LPGA Tour',
        name: 'Kathy Baker Guadagnino',
        detail:
          'Professional golfer on the LPGA Tour and a 2018 inductee into the Charlotte Latin Athletic Hall of Fame.',
        path: 'Latin → LPGA Tour',
      },
    ],
    honors: [
      {
        label: 'NC Mr. Basketball',
        text: 'Anthony Morrow won it as a senior in 2004, along with three All-State selections, leading Latin to back-to-back state titles while averaging 22.4 points, 9.8 rebounds and 3.1 assists.',
        tag: 'Statewide',
      },
      {
        label: 'National Prep All-American',
        text: 'Spear Gorelick earned wrestling All-American honors at the 2025 National Prep Tournament, and three Hawks — Davis Jones, Liam McConaughy and Banks Cutter — each won three consecutive individual NCISAA state titles from 2024 to 2026.',
        tag: 'National',
      },
      {
        label: 'Coach of the Year honors',
        text: 'David Paige was named 2026 NCISAA Wrestling Coach of the Year, the first from the association. Chris Berger has won Charlotte Observer Boys’ Golf Coach of the Year four consecutive years through 2026.',
        tag: 'Statewide + national',
      },
      {
        label: 'Wells Fargo Cups',
        text: 'Seventeen NCISAA Wells Fargo Cups for overall program excellence, most recently in 2019 — including eight consecutive under athletic director Jimmy Broadway.',
        tag: 'Program-wide',
      },
      {
        label: 'Athletic Hall of Fame',
        text: 'Established 2014. Inductees include Daniel Jones and Claudia Dickey (2024), Chris Canty (2022), coaches Larry McNulty and Suzie Pignetti (2020), and Anthony Morrow in the inaugural class.',
        tag: 'School culture signal',
        tagStyle: 'outline',
      },
    ],
    sources: [
      { label: 'clshawks.com — Hall of Fame', url: 'https://clshawks.com/honors/hall-of-fame' },
      { label: 'clshawks.com — Anthony Morrow', url: 'https://clshawks.com/honors/hall-of-fame/anthony-morrow/23' },
      {
        label: 'Wikipedia — Daniel Jones',
        url: 'https://en.wikipedia.org/wiki/Daniel_Jones_(American_football)',
      },
    ],
  },

  /* --------------------------------------------------------- 1e coaching -- */
  coaching: {
    headline:
      'A ten-year NFL fullback on the football staff and a 32-year Latin lifer running two varsity programs.',
    subhead:
      'Athletic Director: David Gatoux, in the role since 2012 and current president of the CISAA.',
    featured: [
      {
        kicker: 'The pedigree hire · Associate Head Football Coach, since 2023',
        name: 'Brad Hoover',
        stats: [
          { value: '10 yrs', label: 'NFL fullback, Carolina Panthers' },
          { value: '2000–10', label: 'his full professional playing career' },
          { value: '2015–20', label: 'head of program at Cannon School' },
        ],
        detail:
          'One of the most recognizable former professional athletes coaching in Charlotte-area high school sports. Hoover played a full decade in the NFL for the Panthers, then led Cannon School’s program for six years before joining Latin in 2023. He also serves as Middle School baseball head coach and a PE teacher — a pro pedigree embedded in the daily life of the school rather than a figurehead appointment.',
      },
      {
        kicker: 'The continuity anchor · Basketball & Golf, since 1994',
        name: 'Chris Berger',
        stats: [
          { value: '32 yrs', label: 'at Charlotte Latin — and a Latin alum' },
          { value: '4', label: 'straight NCISAA boys golf titles, 2023–26' },
          { value: '4×', label: 'Observer Boys’ Golf Coach of the Year' },
        ],
        detail:
          'A Latin graduate who was All-Conference and All-State as a student, played at Queens University, and returned in 1994 as Jerry Faulkner’s varsity assistant. He ran JV for a decade before taking over boys basketball in 2009 and golf in 2014, and now heads two varsity programs while serving as Assistant AD for Equipment and Grounds — an unbroken coaching lineage from Faulkner’s 515–157 era to today.',
      },
    ],
    tenure: [
      { name: 'Eric Smith', role: 'Middle School AD — girls basketball 1995–2005', width: 1, since: 'since 1993' },
      { name: 'Chris Berger', role: 'Boys Basketball · Boys Golf', width: 0.97, since: 'since 1994' },
      { name: 'Tim Kelly', role: 'Girls Golf · Asst. AD Sports Medicine', width: 0.58, since: 'since 2007' },
      { name: 'David Gatoux', role: 'Director of Athletics', width: 0.42, since: 'since 2012' },
      { name: 'David Paige', role: 'Wrestling · Director of S&C', width: 0.3, since: 'head coach 2016' },
      { name: 'Angel Trimble', role: 'Swimming · Asst. AD Sports Information', width: 0.3, since: 'since 2016' },
      { name: 'Caitlin Peters', role: 'Volleyball — 29–2 in 2025–26', width: 0.24, since: 'since 2018' },
      { name: 'Drew Dayton', role: 'Football', width: 0.09, since: 'head coach 2023' },
      { name: 'Giavonni Mack', role: 'Girls Basketball', width: 0.06, since: 'head coach 2024' },
    ],
    worthKnowing:
      'Latin’s strength & conditioning department is four people deep — and every one of them also runs a varsity program (Paige/wrestling, Mack/girls basketball, Peters/volleyball, Dayton/football), so strength programming is delivered by the same coaches who run the teams. Volleyball coach Caitlin Peters played twelve years professionally, finishing her final season left-handed after shoulder injuries; girls basketball coach Giavonni Mack played professionally in Istanbul.',
    sources: [
      { label: 'charlottelatin.org — Meet the Staff', url: STAFF },
      { label: 'clshawks.com — About Athletics', url: 'https://clshawks.com/sports/2024/10/16/about.aspx' },
      { label: 'clshawks.com — Brad Hoover', url: 'https://clshawks.com/staff-directory/brad-hoover/162' },
      { label: 'clshawks.com — Larry McNulty (HOF)', url: 'https://clshawks.com/honors/hall-of-fame/coach-larry-mcnulty/13' },
    ],
  },

  /* ------------------------------------------------------- 1f facilities -- */
  facilities: {
    headline:
      'A 128-acre campus — the largest of any Charlotte-area independent school — with three gymnasiums, nine tennis courts and seven playing fields.',
    subhead:
      'Three certified athletic trainers and two treatment centers, run in-house rather than through a hospital system.',
    photos: [
      {
        src: '/facilities/charlotte-latin-patten-stadium.jpg',
        name: 'Patten Stadium',
        meta: '1,450 seats, 1974',
        caption:
          'Football and soccer field with an all-weather outdoor track, named for longtime coach and Dean of Students Bob Patten',
        credit: 'Photo: Charlotte Latin School',
      },
      {
        src: '/facilities/charlotte-latin-beck-sac.jpg',
        name: 'Beck Student Activities Center',
        meta: '50,000 sq ft, 2001',
        caption: 'Arena, indoor track, wrestling room, coaches’ offices and training facilities',
        credit: 'Photo: Charlotte Latin School',
      },
      {
        src: '/facilities/charlotte-latin-strength-center.jpg',
        name: 'Strength Center',
        caption: 'Dedicated weight-training facility, staffed by four coaches who each also run a varsity program',
        credit: 'Photo: Charlotte Latin School',
      },
    ],
    venues: [
      { name: 'Belk Gymnasium', detail: 'the original 1973 gym; three gyms on campus' },
      { name: 'Olympic Pool (SwimMAC)', detail: '50m × 25yd — owned by SwimMAC, not the school' },
      { name: 'Tennis Center', detail: 'nine courts' },
      { name: 'Playing fields', detail: 'seven fields, three of them turf' },
      { name: 'Fitness Center', detail: 'cardio, strength and rehabilitation' },
      { name: 'Cross Country Trail', detail: 'on-campus course, South Campus' },
      { name: 'Baseball & Softball Fields', detail: 'dedicated, with a coaches’ pavilion' },
    ],
    broadcast:
      'Events stream on BoxCast and the NFHS Network, both home and away, with student broadcasters providing live commentary alongside media-production staff. Ticketing runs through GoFan. Angel Trimble serves as Assistant AD for Sports Information — and as head swimming coach.',
    care: [
      {
        label: 'Athletic trainers',
        text: '3 certified — Andy Russo (head, joined 2024, from College of Charleston), Kristin Edwards, and Cheri Pratt, at Latin since 2001',
      },
      {
        label: 'Treatment centers',
        text: 'Two sports-medicine treatment centers on campus, plus an athletic training room in the Beck SAC',
      },
      {
        label: 'Team physician',
        text: 'Not published. No Atrium or Novant partnership was found — the model appears to be in-house, but this is an absence of evidence rather than a stated policy',
      },
      {
        label: 'S&C staff',
        text: '4 coaches led by David Paige, a certified S&C coach who also heads wrestling — unusually deep for a high school',
      },
      {
        label: 'Concussion protocol',
        text: 'Not published as a policy document — a genuine gap, unlike its CISAA peers who publish theirs',
      },
    ],
    careNote:
      'Worth probing on a tour: Latin publishes no team physician, hospital partnership or concussion protocol, where Charlotte Country Day names OrthoCarolina, Cannon names Novant, Charlotte Christian names Atrium and Providence Day details a full in-house model. The pool is also owned and operated by SwimMAC Carolina, a third-party club, not the school.',
    sources: [
      {
        label: 'charlottelatin.org — Athletics Facilities',
        url: 'https://www.charlottelatin.org/athletics/athletics-facilities',
      },
      { label: 'charlottelatin.org — Meet the Staff', url: STAFF },
      { label: 'clshawks.com — Game streaming', url: 'https://clshawks.com/sports/2022/11/3/game-streaming.aspx' },
    ],
  },

  /* 1g National Stage & NIL — intentionally omitted. No national team ranking
     exists for any Latin program in any sport or year, no out-of-state
     non-conference schedule is published, and no named Latin athlete NIL deal
     appears in public sources. Latin's genuine national credential is
     individual (National Prep wrestling), carried on 1c and 1d instead. */
}
