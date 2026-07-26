// Charlotte Christian School — Sports research area.
//
// Every figure is traceable to
// source-material/sports/charlotte-christian/Charlotte Christian - Sports - Redesign Research 2026.md.
//
// SIX of seven cards render. `national` (1g) is deliberately omitted: no
// MaxPreps/ESPN/SBLive NATIONAL team ranking was found for any Charlotte
// Christian program in 2024–2026 (the school's best documented placement is
// #19 in NORTH CAROLINA), and no named athlete NIL deal is publicly disclosed.
// The school's national profile rests on its alumni — Stephen Curry above all —
// which the Honors card carries. A National Stage card would imply a current
// national team standing the evidence does not support.

import type { SportsProgram } from '../sportsProgram.ts'

const ACCOLADES = 'https://www.charlottechristian.com/athletics/knights-accolades'
const CHAMPS_26 =
  'https://www.highschoolot.com/story/the-2025-26-ncisaa-team-state-champions-in-every-sport/22322092/'

export const charlotteChristian: SportsProgram = {
  /* ---------------------------------------------------------- 1a offered -- */
  offered: {
    headline:
      '22 sports and more than 50 teams, with over 80% of students in grades 7–12 playing.',
    subhead:
      'Forty-three state championships across seven different sports — a record concentrated heavily in baseball and football.',
    stats: [
      { value: '22', label: 'sports for boys and girls' },
      { value: '50+', label: 'teams across V · JV · MS' },
      { value: '80%+', label: 'of grades 7–12 participate' },
      { value: '43', label: 'state titles in 7 sports' },
    ],
    seasons: [
      {
        name: 'Fall',
        note: '6 varsity',
        sports: [
          { name: 'Football', levels: ['V', 'JV', 'MS'] },
          { name: 'Volleyball (Girls)', levels: ['V', 'JV', 'MS'] },
          { name: 'Tennis (Girls)', levels: ['V', 'JV', 'MS'] },
          { name: 'Soccer (Boys)', levels: ['V', 'MS'] },
          { name: 'Cross Country (B & G)', levels: ['V', 'MS'] },
          { name: 'Cheerleading', levels: ['V', 'MS'] },
        ],
      },
      {
        name: 'Winter',
        note: '6 varsity',
        sports: [
          { name: 'Basketball (Boys)', levels: ['V', 'JV', 'MS'] },
          { name: 'Basketball (Girls)', levels: ['V', 'MS'] },
          { name: 'Wrestling', levels: ['V', 'MS'] },
          { name: 'Swimming (B & G)', levels: ['V', 'MS'] },
          { name: 'Indoor Track & Field', levels: ['V'] },
          { name: 'Dance', levels: ['V'] },
        ],
      },
      {
        name: 'Spring',
        note: '8 varsity',
        sports: [
          { name: 'Baseball', levels: ['V', 'JV', 'MS'] },
          { name: 'Tennis (Boys)', levels: ['V', 'JV', 'MS'] },
          { name: 'Softball', levels: ['V', 'MS'] },
          { name: 'Lacrosse (Boys)', levels: ['V', 'MS'] },
          { name: 'Lacrosse (Girls)', levels: ['V', 'MS'] },
          { name: 'Soccer (Girls)', levels: ['V', 'MS'] },
          { name: 'Golf (Boys)', levels: ['V', 'MS'] },
          { name: 'Track & Field (B & G)', levels: ['V', 'MS'] },
        ],
      },
    ],
    footnote:
      'The school’s published figure of 22 sports counts boys’ and girls’ editions separately and includes girls’ golf, which is not on the current live teams page. Charlotte Christian competes in NCISAA 4A and the CISAA; its Head of School, Barry Giller, is president of the NCISAA Board of Directors.',
    sources: [
      { label: 'charlottechristian.com — Knights Accolades', url: ACCOLADES },
      { label: 'charlottechristian.com — Teams & Schedules', url: 'https://www.charlottechristian.com/athletics/teams' },
    ],
  },

  /* ----------------------------------------------------------- 1b record -- */
  record: {
    headline:
      'Eighteen baseball state championships — the deepest single-sport dynasty in the Charlotte private-school field — capped by a 28–7 title run in 2026.',
    subhead:
      'Football supplies the second pillar with nine titles, though Providence Day has ended the Knights’ season in each of the last three years.',
    seasonLabels: ["'23–24", "'24–25", "'25–26"],
    rows: [
      {
        program: 'Baseball',
        cells: [
          { result: 'NONE', toVerify: true },
          { result: 'NONE', toVerify: true },
          { result: 'STATE', record: '28–7' },
        ],
        note: '18th baseball title; beat Metrolina Christian in the series',
      },
      {
        program: 'Football',
        cells: [
          { result: 'NONE', record: '8–4' },
          { result: 'NONE', record: '7–4' },
          { result: 'RUNNER-UP', record: '7–6' },
        ],
        note: 'Lost the final 6–42 to Providence Day; beat Rabun Gap in the semi',
      },
      {
        program: 'Softball',
        cells: [
          { result: 'NONE', toVerify: true },
          { result: 'STATE', record: '16–6' },
          { result: 'NONE', record: '9–9' },
        ],
        note: 'Swept Charlotte Latin for the 2025 D1 title',
      },
      {
        program: 'Boys Track & Field',
        cells: [
          { result: 'NONE', toVerify: true },
          { result: 'STATE', record: '121 pts' },
          { result: 'NONE' },
        ],
        note: 'Christ School took the 2026 D1 title',
      },
      {
        program: 'Wrestling',
        cells: [
          { result: 'NONE', toVerify: true },
          { result: 'NONE', toVerify: true },
          { result: 'RUNNER-UP', record: '199.5 pts' },
        ],
        note: 'Best finish in program history; Max McNeer won at 175 lbs',
      },
      {
        program: 'Boys Basketball',
        cells: [
          { result: 'NONE', toVerify: true },
          { result: 'NONE', record: '7–20' },
          { result: 'NONE', record: '17–14' },
        ],
        note: 'Second-round exit in 2026 after a 10-win improvement',
      },
    ],
    didNotWin:
      'football, girls soccer, girls lacrosse and girls swimming (Providence Day) · boys basketball (Forsyth Country Day) · girls basketball (Cannon) · softball (Covenant Day) · wrestling and both golf titles (Charlotte Latin) · girls tennis and field hockey (Charlotte Country Day) · volleyball (North Raleigh Christian) · boys soccer and both boys distance titles (Christ School) · boys lacrosse, boys tennis and girls track (Durham Academy).',
    bars: [
      { program: 'Baseball', record: '28–7', pct: 0.8, tag: "'25–26" },
      { program: 'Football — Estep era', record: '138–42', pct: 0.767, tag: '2007–22' },
      { program: 'Softball', record: '25–15', pct: 0.625, tag: '2 YRS' },
      { program: 'Football — James era', record: '22–14', pct: 0.611, tag: '2023–25' },
      { program: 'Boys Basketball', record: '24–34', pct: 0.414, tag: '2 YRS' },
    ],
    seasonDetail: [
      {
        program: 'Baseball',
        text: 'The 2026 NCISAA 4A championship over Metrolina Christian was the program’s 18th state title and lifted the school’s all-time total to 43. Head coach Reid Fronk is a 2004 Charlotte Christian graduate who played in the Tampa Bay Rays organization.',
      },
      {
        program: 'Football',
        text: 'Providence Day has ended the Knights’ season three years running — playoff losses in 2023 and 2024, then the 2025 state final, 42–6. The run to that final included a 55–48 win over Rabun Gap-Nacoochee, the Georgia program that had beaten Providence Day for the 2024 title.',
      },
      {
        program: 'Wrestling',
        text: '2026 produced the best team finish in program history — runner-up with 199.5 points — with Max McNeer winning the 175 lb state title and three more Knights placing.',
      },
    ],
    sources: [
      { label: 'HighSchoolOT — 2025–26 NCISAA champions', url: CHAMPS_26 },
      {
        label: '2026 baseball championship',
        url: 'https://www.highschoolot.com/story/charlotte-christian-rallies-to-take-ncisaa-4a-baseball-championship-over-metrolina-christian/22358717/',
      },
      {
        label: '2025 football final',
        url: 'https://www.highschoolot.com/story/back-on-top-providence-day-reclaims-division-i-state-title-with-win-over-rival-charlotte-christian/22257301/',
      },
      {
        label: '2025 softball championship',
        url: 'https://www.highschoolot.com/story/charlotte-christian-sweeps-charlotte-latin-in-ncisaa-d1-softball-championship-series/22010718/',
      },
    ],
  },

  /* --------------------------------------------------------- 1c pipeline -- */
  pipeline: {
    headline:
      '38 college commitments across the classes of 2024 and 2025, 26 of them Division I and 8 Power 4.',
    subhead:
      'More than 100 Division I signees across the 2014–2025 classes — one of the deepest sustained pipelines in the Charlotte private-school field.',
    funnel: [
      {
        label: 'Committed to college athletics',
        hint: "(all divisions, '24–'25)",
        count: '38',
        width: 1,
        shade: 'pale',
      },
      { label: 'NCAA Division I', hint: '(any conference)', count: '26', width: 0.68, shade: 'mid' },
      {
        label: 'Power 4',
        hint: '(SEC · Big Ten · ACC · Big 12)',
        count: '8',
        width: 0.21,
        shade: 'full',
      },
    ],
    funnelNote:
      'These totals cover the classes of 2024 and 2025 only — the school’s published "Knights in College" roster stops there, and no Class of 2026 list exists as of July 2026. The true three-class figure is therefore higher. At 68%, the Division I share of commitments is the highest of any school in this comparison.',
    sportBars: [
      { sport: 'Football', count: 9, width: 1, p4Width: 0.33 },
      { sport: 'Track & Field', count: 5, width: 0.56, p4Width: 0.11 },
      { sport: 'Baseball', count: 4, width: 0.45, p4Width: 0.11 },
      { sport: 'Wrestling', count: 1, width: 0.11, p4Width: 0.11 },
      { sport: 'Softball', count: 1, width: 0.11, p4Width: 0.11 },
      { sport: 'Lacrosse', count: 1, width: 0.11, p4Width: 0.11 },
      { sport: 'Other', count: 5, width: 0.56 },
    ],
    realityCheck:
      'Football is the volume engine at nine Division I commits, but the Power 4 placements are spread unusually wide — wrestling to NC State, softball to Florida State, lacrosse to Penn State and track to Kentucky each produced a P4 signee from a single athlete. Charlotte Christian converts across many sports rather than concentrating in one.',
    rankedRecruits:
      'No top-100 national recruit is confirmed in the 2024–2026 classes; L.J. Porter appears among 247Sports’ 2026 North Carolina football recruits, though his numeric rank is not published. The instructive case is the inverse: Stephen Curry left in 2006 with no major-conference scholarship offer and 31 point guards ranked ahead of him, and Virginia Tech — his father’s alma mater — offered only a walk-on spot.',
    roster: [
      { cls: "'25", name: 'Evan Boykin', sport: 'Track & Field', college: 'Kentucky', conf: 'SEC', level: 'P4' },
      { cls: "'25", name: 'Anna Hinde', sport: 'Softball', college: 'Florida State', conf: 'ACC', level: 'P4' },
      { cls: "'25", name: 'Grant Nicholson', sport: 'Baseball', college: 'Wake Forest', conf: 'ACC', level: 'P4' },
      { cls: "'25", name: 'Beckett Vance', sport: 'Lacrosse', college: 'Penn State', conf: 'Big Ten', level: 'P4' },
      { cls: "'25", name: 'Cohen Bettencourt', sport: 'Baseball', college: 'High Point', conf: 'Big South', level: 'D1' },
      { cls: "'25", name: 'Aron Boykin', sport: 'Track & Field', college: 'Alabama A&M', conf: 'SWAC', level: 'D1' },
      { cls: "'25", name: 'Nina Dominique', sport: 'Track & Field', college: 'James Madison', conf: 'Sun Belt', level: 'D1' },
      { cls: "'25", name: 'Owen Farrell', sport: 'Football', college: 'Charleston Southern', conf: 'Big South', level: 'D1' },
      { cls: "'25", name: 'Corban Hall', sport: 'Football', college: 'Dartmouth', conf: 'Ivy', level: 'D1' },
      { cls: "'25", name: 'Sophia Harris', sport: 'Tennis', college: 'Fairfield', conf: 'MAAC', level: 'D1' },
      { cls: "'25", name: 'Brandon Hettwer', sport: 'Football', college: 'Marshall', conf: 'Sun Belt', level: 'D1' },
      { cls: "'25", name: 'Kelsey Mayers', sport: 'Swimming', college: 'New Hampshire', conf: 'America East', level: 'D1' },
      { cls: "'25", name: 'MadisonRae Noble', sport: 'Track & Field', college: 'North Carolina A&T', conf: 'CAA', level: 'D1' },
      { cls: "'25", name: 'Caroline Noonan', sport: 'Volleyball', college: 'College of Charleston', conf: 'CAA', level: 'D1' },
      { cls: "'25", name: 'Alexander Paschall', sport: 'Golf', college: 'Davidson', conf: 'Atlantic 10', level: 'D1' },
      { cls: "'25", name: 'Alesia Sylverain', sport: 'Track & Field', college: 'Johnson C. Smith', conf: 'CIAA', level: 'D2' },
      { cls: "'25", name: 'Wade Thompson', sport: 'Baseball', college: 'Wingate', conf: 'SAC', level: 'D2' },
      { cls: "'25", name: 'Stokes Greene', sport: 'Golf', college: 'Queens (Charlotte)', conf: 'SAC', level: 'D2' },
      { cls: "'25", name: 'Andrew Boythe', sport: 'Boys Soccer', college: 'Cedarville', conf: 'G-MAC', level: 'D2' },
      { cls: "'25", name: 'Nick Dunkley', sport: 'Soccer & Track', college: 'Christopher Newport', conf: 'C2C', level: 'D3' },
      { cls: "'25", name: 'Griffin Fox', sport: 'Lacrosse', college: 'Grove City', conf: 'PAC', level: 'D3' },
      { cls: "'24", name: 'Ryan Henley', sport: 'Football', college: 'Wake Forest', conf: 'ACC', level: 'P4' },
      { cls: "'24", name: 'Zach Zinger', sport: 'Football', college: 'Wake Forest', conf: 'ACC', level: 'P4' },
      { cls: "'24", name: 'Tre Wilfong', sport: 'Wrestling', college: 'NC State', conf: 'ACC', level: 'P4' },
      { cls: "'24", name: 'Tripp Woody', sport: 'Football', college: 'Iowa', conf: 'Big Ten', level: 'P4' },
      { cls: "'24", name: 'Micah Gilbert', sport: 'Football', college: 'Notre Dame', conf: 'FBS Ind.', level: 'D1' },
      { cls: "'24", name: 'Bryce Young', sport: 'Football', college: 'Notre Dame', conf: 'FBS Ind.', level: 'D1' },
      { cls: "'24", name: 'Drew Beard', sport: 'Baseball', college: 'James Madison', conf: 'Sun Belt', level: 'D1' },
      { cls: "'24", name: 'Nic Harris', sport: 'Baseball', college: 'Elon', conf: 'CAA', level: 'D1' },
      { cls: "'24", name: 'Gavin Major', sport: 'Football', college: 'Wofford', conf: 'Southern', level: 'D1' },
      { cls: "'24", name: 'Christian Vann', sport: 'Football', college: 'Gardner-Webb', conf: 'Big South', level: 'D1' },
      { cls: "'24", name: 'Olivia Dawson', sport: 'Track & Field', college: 'UNC-Greensboro', conf: 'Southern', level: 'D1' },
      { cls: "'24", name: 'Cross Killen', sport: 'Football', college: 'Limestone', conf: 'SAC', level: 'D2' },
      { cls: "'24", name: 'Sophia Fair', sport: 'Lacrosse', college: 'Anderson (SC)', conf: 'SAC', level: 'D2' },
      { cls: "'24", name: 'Kayla Lee', sport: 'Girls Basketball', college: 'Roanoke', conf: 'ODAC', level: 'D3' },
      { cls: "'24", name: 'Thomas McNally', sport: 'Golf', college: 'Guilford', conf: 'ODAC', level: 'D3' },
      { cls: "'24", name: 'Connor Natwick', sport: 'Golf', college: 'Sewanee', conf: 'SAA', level: 'D3' },
      { cls: "'24", name: 'Oliver Tobin', sport: 'Golf', college: 'Hampden-Sydney', conf: 'ODAC', level: 'D3' },
    ],
    rosterNote:
      'The Class of 2026 is not represented: the school publishes no 2026 commitment list as of July 2026, so every figure here is a floor for the three-class window. Level labels and conferences were added by the researcher from each college’s NCAA status.',
    sources: [
      { label: 'charlottechristian.com — Knights in College', url: ACCOLADES },
      {
        label: '247Sports — 2026 NC football recruits',
        url: 'https://247sports.com/Season/2026-Football/RecruitRankings/?InstitutionGroup=highschool&State=NC',
      },
    ],
  },

  /* ----------------------------------------------------------- 1d honors -- */
  honors: {
    headline:
      'Stephen Curry — four-time NBA champion, two-time MVP and the league’s all-time three-point leader — leads a ledger of 35 professional alumni.',
    subhead:
      'Charlotte Christian retired his No. 20 in the same small gym where he played, on January 24, 2017.',
    pros: [
      {
        kicker: "NBA · Class of '06",
        name: 'Stephen Curry',
        detail:
          '4× NBA champion, 2× MVP — the first unanimous winner — 12× All-Star, the NBA’s all-time three-point leader, and a 2024 Olympic gold medallist. He left Charlotte Christian as its all-time leading scorer with no major-conference offer.',
        path: 'CCS → Davidson → Golden State Warriors',
      },
      {
        kicker: "NFL · Class of '14",
        name: 'Garrett Bradbury',
        detail:
          'First-round pick, 18th overall in 2019, and a long-time starting NFL center after an All-American career at NC State.',
        path: 'CCS → NC State → Minnesota Vikings',
      },
      {
        kicker: "MLB · Class of '03",
        name: 'Daniel Bard',
        detail:
          'Major League reliever for the Red Sox and Rockies, and the 2003 NC Gatorade Player of the Year in baseball. His brother Luke ’09 also reached the majors.',
        path: 'CCS → North Carolina → Red Sox / Rockies',
      },
      {
        kicker: "NBA · Class of '08",
        name: 'Seth Curry',
        detail:
          'A decade-plus NBA guard and one of the league’s most accurate three-point shooters, now with the Charlotte Hornets.',
        path: 'CCS → Duke → NBA',
      },
    ],
    honors: [
      {
        label: 'Gatorade Players of the Year',
        text: 'Two confirmed — Daniel Bard (baseball, 2003) and Clint Irwin (boys soccer, 2006). Irwin went on to a long MLS goalkeeping career.',
        tag: 'Statewide, 1 per sport',
      },
      {
        label: 'Retired jersey',
        text: 'Stephen Curry’s No. 20 was retired on January 24, 2017 in the Lamb/Johnson Gymnasium during a game against Covenant Day; Davidson renamed its student section for him the same day.',
        tag: 'National top-tier',
      },
      {
        label: 'Strength of America Award',
        text: 'The Athletic Performance program is a four-time NSCA Strength of America Award recipient and has produced more than ten Strength & Conditioning All-Americans since 2022.',
        tag: 'National',
      },
      {
        label: '2026 all-state selections',
        text: 'Ten Knights earned NCISAA all-state honors across baseball (four), boys and girls lacrosse, girls soccer, softball and boys tennis. Max McNeer won the 175 lb state wrestling title.',
        tag: 'Statewide',
      },
      {
        label: 'Coaching honors',
        text: 'Jason Estep won NCSAA Coach of the Year twice and multiple Carolina Panthers Coach of the Week awards across a 138–42 run; the stadium field now bears his name.',
        tag: 'League level',
        tagStyle: 'outline',
      },
    ],
    sources: [
      { label: 'charlottechristian.com — Knights in Pros', url: ACCOLADES },
      { label: 'Wikipedia — Stephen Curry', url: 'https://en.wikipedia.org/wiki/Stephen_Curry' },
      {
        label: 'MaxPreps — Curry jersey retirement',
        url: 'https://www.maxpreps.com/news/Jm-4cT2SiE6sJqN-Lnk7Bw/stephen-curry-has-jersey-retired-at-charlotte-christian-high-school.htm',
      },
      {
        label: 'HighSchoolOT — every NC Gatorade POY',
        url: 'https://www.highschoolot.com/story/every-nc-gatorade-player-of-the-year-all-sports/22063756/',
      },
    ],
  },

  /* --------------------------------------------------------- 1e coaching -- */
  coaching: {
    headline:
      'Both marquee coaching seats turned over inside twelve months — a 25-year basketball tenure ended, and a former NFL receiver took over football.',
    subhead:
      'Athletic Director: Andrew Ross. Head of School Barry Giller is president of the NCISAA Board of Directors.',
    featured: [
      {
        kicker: 'The pedigree hire · Football, since April 2026',
        name: 'Jammie Deese',
        stats: [
          { value: '49–21', label: 'as head coach at Forest Hills, 2020–26' },
          { value: '2,348', label: 'receiving yards at Wake Forest' },
          { value: 'D-II', label: 'national champion as a coordinator' },
        ],
        detail:
          'A Wake Forest star receiver with 184 career catches who played professionally for the Washington Redskins and in the Arena and indoor leagues. He was offensive coordinator at West Florida for its NCAA Division II national title, then went 49–21 at Forest Hills with two fourth-round playoff runs, the school’s first winning season since 2015, and 2025 Union County Coach of the Year. The most credentialed outside hire in the department’s recent history.',
      },
      {
        kicker: 'The tenure that just ended · Boys Basketball, 2000–2025',
        name: 'Shonn Brown',
        stats: [
          { value: '486', label: 'wins across 25 seasons' },
          { value: '10', label: 'CISAA conference championships' },
          { value: '33', label: 'players sent to college basketball' },
        ],
        detail:
          'The defining tenure in school athletic history — and it closed in April 2025. Brown coached Stephen Curry, Seth Curry and Anthony Gill, sending ten players to the professional ranks, while serving as Upper School Principal from 2017. He stepped down at 51 citing the strain of the dual role, and remains Principal today. Luke Boythe, a 1998 graduate and former player who twice served as Brown’s assistant, succeeded him.',
      },
    ],
    tenure: [
      { name: 'Shonn Brown', role: 'Boys Basketball — now Upper School Principal', width: 1, since: '2000–2025' },
      { name: 'Jason Estep', role: 'Football — Estep Field is named for him', width: 0.64, since: '2007–2022' },
      { name: 'Reid Fronk', role: "Baseball — won the '26 state title", width: 0.12, since: 'since 2023' },
      { name: 'Kyle Jacksic', role: 'Director of Athletic Performance', width: 0.08, since: 'since 2024' },
      { name: 'Luke Boythe', role: 'Boys Basketball — CCS ’98 alum', width: 0.04, since: 'since 2025' },
      { name: 'Jammie Deese', role: 'Football · Director of Football Ops', width: 0.02, since: 'since 2026' },
      { name: 'Hank Suhr', role: "Softball — won the '25 state title", width: 0.12, since: 'tenure', toVerify: true },
    ],
    worthKnowing:
      'the school does not publish coach names for roughly fifteen of its sports, so this ledger covers only the programs with documented leadership. Baseball’s Reid Fronk is a 2004 graduate who pitched in the Tampa Bay Rays organization before returning to win the 2026 state title, and the late Greg Simmons — who built the 17-title baseball dynasty and died in 2023 — has the baseball field named for him.',
    sources: [
      {
        label: 'HighSchoolOT — Deese hired',
        url: 'https://www.highschoolot.com/story/charlotte-christians-next-football-coach-is-former-forest-hills-leader-jammie-deese/22352416/',
      },
      {
        label: 'Charlotte Observer — Brown steps down after 25 seasons',
        url: 'https://sports.yahoo.com/article/25-seasons-nearly-500-wins-131731017.html',
      },
      {
        label: 'Charlotte Weekly — Estep Field naming',
        url: 'https://www.thecharlotteweekly.com/southcltweekly/charlotte-christian-to-name-football-field-after-former-coach/article_bdab2408-a6c3-11ef-b59a-67b14218a3fb.html',
      },
    ],
  },

  /* ------------------------------------------------------- 1f facilities -- */
  facilities: {
    headline:
      'A 53,000 sq ft athletic center broke ground in November 2025, joining a 5,400 sq ft weight room and the small gym where Stephen Curry played.',
    subhead:
      'Care is a hybrid model: two in-house athletic trainers plus a third embedded through a partnership with Atrium Health.',
    photos: [
      {
        src: '/facilities/charlotte-christian-estep-field.jpg',
        name: 'Estep Field',
        meta: 'renamed 2025',
        caption:
          'The stadium field, named for Jason Estep after his 138–42 run; resurfaced with synthetic turf and a new track',
        credit: 'Photo: Charlotte Christian School',
      },
      {
        src: '/facilities/charlotte-christian-lamb-johnson-gym.jpg',
        name: 'Lamb/Johnson Gymnasium',
        caption:
          'The gym where Stephen Curry played — cinder-block walls, limited bleachers, and his retired No. 20 on the north wall',
        credit: 'Photo: Charlotte Christian School',
      },
      {
        src: '/facilities/charlotte-christian-weight-room.jpg',
        name: 'Weight Room',
        meta: '5,400 sq ft',
        caption: 'Eight powerlift racks and Olympic platforms, periodized by season',
        credit: 'Photo: Charlotte Christian School',
      },
    ],
    venues: [
      { name: 'Saleh Athletic Center', detail: '53,000+ sq ft — broke ground Nov 2025' },
      { name: 'Guy Gymnasium', detail: '2012 expansion, double-court space' },
      { name: 'Warner Field House', detail: '7,800 sq ft — offices, locker rooms' },
      { name: 'Harvick Field House & Tennis', detail: 'opened Nov 2022; eight courts' },
      { name: 'Guy Field', detail: 'artificial turf, opened Nov 2022' },
      { name: 'Greg Simmons Baseball Field', detail: 'named for the 17-title coach' },
      { name: 'CCS Swim Center', detail: 'on-campus pool' },
      { name: 'Hitting & Pitching Facility', detail: 'indoor cages' },
    ],
    broadcast:
      'Events stream on the school’s YouTube channel, with NCISAA events also on the NFHS Network, and tickets run through HomeTown Fan. Notably, the school charges admission only for varsity football, varsity basketball and NCISAA playoff events — every other contest is free. Football uses Division I-grade wireless sideline communications.',
    care: [
      {
        label: 'Athletic trainers',
        text: '3 — Dr. Kaitlynn Seymour (head, DPT Emory, formerly head football AT at Coastal Carolina), Madison Sitton, and Victor Jurkiewicz',
      },
      {
        label: 'Hospital partnership',
        text: 'Atrium Health embeds an athletic trainer on campus during the school day and at after-school events; required forms include an Atrium request for treatment',
      },
      {
        label: 'Team physician',
        text: 'Not named publicly — the Atrium partnership is confirmed, the individual physician is not',
      },
      {
        label: 'Concussions',
        text: 'Evidence-based assessment, individualized rehabilitation, functional testing and physician clearance before return to play',
      },
      {
        label: 'S&C staff',
        text: '3 — Kyle Jacksic (director, previously Clemson, Davidson and Buffalo), Cami Roy and Morgan Carter, a registered nurse',
      },
      {
        label: 'Recognition',
        text: '4× NSCA Strength of America Award; 10+ Strength & Conditioning All-Americans since 2022; 80+ collegiate athletes in five years',
      },
    ],
    careNote:
      'The hybrid model is the thing to probe on a tour: two employed trainers plus an Atrium-provided third sits between Providence Day’s fully in-house staff and Cannon’s fully outsourced Novant arrangement. Seating capacities are not published for any Charlotte Christian venue.',
    sources: [
      {
        label: 'charlottechristian.com — Athletic Facilities',
        url: 'https://www.charlottechristian.com/athletics/athletic-facilities',
      },
      {
        label: 'charlottechristian.com — Athletic Performance',
        url: 'https://www.charlottechristian.com/athletics/athletic-performance',
      },
      {
        label: 'WCNC — Saleh Athletic Center groundbreaking',
        url: 'https://www.wcnc.com/article/news/education/charlotte-christian-new-athletic-center-in-november/275-6a07c866-093e-450d-9470-8e09ff33da03',
      },
    ],
  },

  /* 1g National Stage & NIL — intentionally omitted. No national team ranking
     was found for any Charlotte Christian program in 2024–2026 (best documented:
     #19 in North Carolina), and no named athlete NIL deal is publicly disclosed.
     The school's national profile is alumni-driven and lives on card 1d. */
}
