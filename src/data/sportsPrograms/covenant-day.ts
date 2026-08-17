// Covenant Day School — Sports research area.
//
// Every figure is traceable to source-material/sports/covenant-day/ —
// principally "Covenant Day School - Sports - Redesign Research 2026.md" and
// "Covenant Day School - Sports - College Commitments 2024-2026.md".
//
// SIX of seven cards render. 1g National Stage & NIL is OMITTED: the boys
// soccer team's fall-2025 #1 national ranking is a genuine national moment and
// is carried on 1b and 1d, but the school plays no national schedule and has
// zero documented NIL activity (the Lions News archive carries none), so a
// standing "national stage" card would be one real fact padded with absences.
// Same treatment as Davidson Day's omitted 1g.
//
// Per-team V/JV/MS levels come from each team page's "Additional Levels" box
// on covenantday.org — the school's own per-sport statement of which JV and
// middle-school ladders exist (8 sports field a JV, all but Girls Golf field an
// MS team). The full matrix, page ids and re-verification method are in
// source-material/sports/covenant-day/Covenant Day School - Sports - Team Levels (V-JV-MS).md.

import type { SportsProgram } from '../sportsProgram.ts'

const ATHLETICS = 'https://www.covenantday.org/athletics'
const TEAMS = 'https://www.covenantday.org/athletics/teams'
const SPRING_26 =
  'https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/2026-spring-sports-highlights-1781042195259'
const FALL_25 =
  'https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/2025fallsportshighlights1'
const CHAMPS_26 =
  'https://www.highschoolot.com/story/the-2025-26-ncisaa-team-state-champions-in-every-sport/22322092/'

export const covenantDay: SportsProgram = {
  /* ---------------------------------------------------------- 1a offered -- */
  offered: {
    headline:
      '18 teams across three seasons, with 82% of students playing at least one sport.',
    subhead:
      'A CISAA / NCISAA 4A program that has sent more than 175 athletes to college sports since the school’s first graduating class in 2006.',
    stats: [
      { value: '18', label: 'teams, V · JV · MS' },
      { value: '82%', label: 'of students play a sport' },
      { value: '175+', label: 'collegiate athletes since 2006' },
      { value: 'CISAA', label: '4A conference in the NCISAA' },
    ],
    seasons: [
      {
        name: 'Fall',
        note: '8 teams',
        sports: [
          { name: 'Football', levels: ['V', 'JV', 'MS'] },
          { name: 'Soccer (Boys)', levels: ['V', 'JV', 'MS'] },
          { name: 'Field Hockey (Girls)', levels: ['V', 'JV', 'MS'] },
          { name: 'Volleyball (Girls)', levels: ['V', 'JV', 'MS'] },
          { name: 'Cross Country (B & G)', levels: ['V', 'MS'] },
          { name: 'Tennis (Girls)', levels: ['V', 'JV', 'MS'] },
          { name: 'Golf (Girls)', levels: ['V'] },
          { name: 'Cheerleading', levels: ['V', 'MS'] },
        ],
      },
      {
        name: 'Winter',
        note: '4 teams',
        sports: [
          { name: 'Basketball (Boys)', levels: ['V', 'JV', 'MS'] },
          { name: 'Basketball (Girls)', levels: ['V', 'MS'] },
          { name: 'Swimming (B & G)', levels: ['V', 'MS'] },
          { name: 'Cheerleading', levels: ['V', 'MS'] },
        ],
      },
      {
        name: 'Spring',
        note: '6 teams',
        sports: [
          { name: 'Baseball', levels: ['V', 'JV', 'MS'] },
          { name: 'Softball (Girls)', levels: ['V', 'MS'] },
          { name: 'Soccer (Girls)', levels: ['V', 'JV', 'MS'] },
          { name: 'Tennis (Boys)', levels: ['V', 'MS'] },
          { name: 'Golf (Boys)', levels: ['V', 'MS'] },
          { name: 'Track & Field (B & G)', levels: ['V', 'MS'] },
        ],
      },
    ],
    footnote:
      'The 18-team figure and season groupings are the school’s own. The per-sport V / JV / MS chips are taken from each team’s "Additional Levels" listing on the school site: 8 sports field a JV team and every sport but Girls Golf fields a middle-school team. Boys volleyball runs as a club sport, and a combined lacrosse program appears in the school’s signing coverage. MaxPreps counts 21 varsity sports and 50 total teams by splitting genders and levels the school aggregates.',
    sources: [
      { label: 'covenantday.org — Teams', url: TEAMS },
      { label: 'covenantday.org — Athletics', url: ATHLETICS },
      { label: 'MaxPreps — Covenant Day Lions', url: 'https://www.maxpreps.com/nc/matthews/covenant-day-lions/' },
    ],
  },

  /* ----------------------------------------------------------- 1b record -- */
  record: {
    headline:
      'The 2025–26 softball team beat Cannon for the NCISAA 4A title — the school’s first team state championship since 2017, inside 26 all-time championship appearances.',
    subhead:
      'Boys soccer reached back-to-back state finals and spent part of fall 2025 ranked first in the nation during an 8-game unbeaten streak.',
    seasonLabels: ["'23–24", "'24–25", "'25–26"],
    rows: [
      {
        program: 'Softball',
        cells: [
          { result: 'NONE' },
          { result: 'NONE' },
          { result: 'STATE', record: '10–1 conf' },
        ],
        note: 'First-ever softball CISAA conference and NCISAA state titles; beat Cannon in the final',
      },
      {
        program: 'Boys Soccer',
        cells: [
          { result: 'NONE' },
          { result: 'RUNNER-UP', record: '1st final' },
          { result: 'RUNNER-UP', record: '#1 seed' },
        ],
        note: 'First-ever final in 2024–25, then hosted the 2025–26 final as the top seed and lost 2–1 to Christ School',
      },
      {
        program: 'Field Hockey',
        cells: [
          { result: 'NONE' },
          { result: 'NONE' },
          { result: 'SEMIFINAL', record: '#6 seed' },
        ],
        note: 'Took Providence Day to overtime in the state semifinal; state runner-up in 2022',
      },
    ],
    didNotWin:
      'boys soccer (Christ School won the 2025–26 final 2–1 at Covenant Day) · field hockey (eliminated in overtime by Providence Day) · volleyball, whose three consecutive state runner-up finishes are the program’s standing high-water mark.',
    bars: [
      { program: 'Softball', record: '10–1', pct: 0.909, tag: "'25–26 CONF" },
      { program: 'Baseball', record: '12–14', pct: 0.462, tag: "'25–26" },
    ],
    seasonDetail: [
      {
        program: 'Softball',
        text: 'The 2025–26 team captured the first-ever softball CISAA Conference and NCISAA State Championship — and the first CDS team state title of any kind since 2017 — going 10–1 in conference and defeating Cannon in the final. Senior Avery Houseton was Conference Player of the Year and All-State before signing with UNC Charlotte.',
      },
      {
        program: 'Boys Soccer',
        text: 'Made the program’s first NCISAA 4A final in 2024–25, then earned the #1 overall seed in 2025–26, hosted the championship game for a second consecutive year, and was "ranked first in the nation" during an 8-game unbeaten streak before falling 2–1 to Christ School.',
      },
      {
        // `program` values are skipped as sport-name identifiers by the i18n
        // extractor — keep them sport-name-shaped, never editorial phrases
        // (the recorded seven-string defect is exactly that shape).
        program: 'Boys Basketball · Baseball',
        text: 'Boys basketball earned the #4 overall seed in the 2024–25 NCISAA playoffs behind an All-State senior pair; baseball took the #8 seed in 2025–26 at 12–14 (5–5 in conference). Neither reached the semifinal, so they sit outside the title matrix above.',
      },
      {
        program: 'Girls Basketball · XC · Tennis',
        text: 'Girls basketball won 15 more games in 2024–25 than the season before, including a 10-game winning streak. Girls cross country’s Caitlin Kasten won both the CISAA and NCISAA championship meets as a sophomore. Girls tennis took the Ashe Cup — the annual trophy against Charlotte Christian — for the first time in school history in 2025.',
      },
    ],
    sources: [
      { label: 'covenantday.org — 2026 Spring Sports Highlights', url: SPRING_26 },
      { label: 'covenantday.org — 2025 Fall Sports Highlights', url: FALL_25 },
      { label: 'HighSchoolOT — 2025–26 NCISAA champions', url: CHAMPS_26 },
      { label: 'covenantday.org — Athletics (26 championship appearances)', url: ATHLETICS },
    ],
  },

  /* --------------------------------------------------------- 1c pipeline -- */
  pipeline: {
    headline:
      '33 documented college commitments across the classes of 2024–26 — nine Division I, one to a Power 4 program.',
    subhead:
      'The signature signing is Emily Eaton ’24, who started every game as a freshman for a top-10 Louisville field hockey team.',
    funnel: [
      {
        label: 'Committed to college athletics',
        hint: '(all divisions, documented)',
        count: '33',
        width: 1,
        shade: 'pale',
        toVerify: true,
      },
      { label: 'NCAA Division I', hint: '(any conference)', count: '9', width: 0.27, shade: 'mid' },
      {
        label: 'Power 4',
        hint: '(SEC · Big Ten · ACC · Big 12)',
        count: '1',
        width: 0.03,
        shade: 'full',
      },
    ],
    funnelNote:
      'Documented minimums compiled from the school’s six signing/commitment articles. The Class of 2024’s spring signing article names six athletes but only four are recoverable, so early-2024 commits may be missing. The school’s cumulative claim is 175+ collegiate athletes since 2006.',
    sportBars: [
      { sport: 'Soccer', count: 9, width: 1 },
      { sport: 'Baseball', count: 7, width: 0.78 },
      { sport: 'Basketball', count: 5, width: 0.56 },
      { sport: 'XC / Track', count: 4, width: 0.44 },
      { sport: 'Softball', count: 2, width: 0.22 },
      { sport: 'Volleyball', count: 2, width: 0.22 },
      { sport: 'Field Hockey', count: 1, width: 0.11, p4Width: 0.11 },
    ],
    realityCheck:
      'The pipeline is broad rather than tall: commitments span eleven sports, but the ceiling outside field hockey is D1 mid-major — Louisiana Tech, East Carolina, UNC Charlotte, Queens, Gardner-Webb, Davidson, Wofford, Appalachian State. That also explains the absence of NIL activity and top-100 recruiting rankings, which track Power 4 football and basketball pipelines.',
    rankedRecruits:
      'No nationally top-100-ranked recruit is documented. The two best-covered recruits are Emily Eaton ’24 — 2023 NCISAA Player of the Year and NC Player of the Year per Max Field Hockey, signed by a top-10-ranked Louisville program — and 6′9″ forward Michael Marcus Jr ’24, who chose Appalachian State after NC state-level coverage.',
    roster: [
      { cls: "'24", name: 'Emily Eaton', sport: 'Field Hockey', college: 'Louisville', conf: 'ACC', level: 'P4' },
      { cls: "'24", name: 'Michael Marcus Jr', sport: 'Basketball', college: 'Appalachian State', conf: 'Sun Belt', level: 'D1' },
      { cls: "'24", name: 'Robbie Johnson', sport: 'Track & Field', college: 'Western Colorado', conf: 'RMAC', level: 'D2' },
      { cls: "'24", name: 'Colden Welsh', sport: 'XC / Track', college: 'Colorado Christian', conf: 'RMAC', level: 'D2' },
      { cls: "'24", name: 'Will Goodling', sport: 'Soccer', college: 'Gordon', conf: 'CCC', level: 'D3' },
      { cls: "'24", name: 'Kessler Forrest', sport: 'Soccer', college: 'Messiah', conf: 'MAC', level: 'D3' },
      { cls: "'25", name: 'Hamilton Huitt', sport: 'Tennis', college: 'Queens (Charlotte)', conf: 'ASUN', level: 'D1' },
      { cls: "'25", name: 'Maggie Dirks', sport: 'XC / Track', college: 'Gardner-Webb', conf: 'Big South', level: 'D1' },
      { cls: "'25", name: 'Grant Gardner', sport: 'Baseball', college: 'Davidson', conf: 'Atlantic 10', level: 'D1' },
      { cls: "'25", name: 'Shea Stanley', sport: 'Soccer', college: 'Wofford', conf: 'Southern', level: 'D1' },
      { cls: "'25", name: 'Landon DeCarlo', sport: 'Lacrosse', college: 'Berry', conf: 'SAA', level: 'D3' },
      { cls: "'25", name: 'Tyler Dennison', sport: 'Football', college: 'Grove City', conf: 'PAC', level: 'D3' },
      { cls: "'25", name: 'Sean Freace', sport: 'Soccer', college: 'Covenant College', conf: 'CCS', level: 'D3' },
      { cls: "'25", name: 'Everett Macurda', sport: 'Volleyball', college: 'Messiah', conf: 'MAC', level: 'D3' },
      { cls: "'25", name: 'Chris Rivens', sport: 'Basketball', college: 'Guilford', conf: 'ODAC', level: 'D3' },
      { cls: "'25", name: 'Tyree White', sport: 'Basketball', college: 'Hampden-Sydney', conf: 'ODAC', level: 'D3' },
      { cls: "'25", name: 'Ethan Andujar', sport: 'Baseball', college: 'Roanoke', conf: 'ODAC', level: 'D3' },
      { cls: "'25", name: 'Brode Dixon', sport: 'Baseball', college: 'Asbury', conf: 'NAIA', level: 'NAIA' },
      { cls: "'25", name: 'Lydia Johnson', sport: 'Soccer', college: 'Taylor', conf: 'NAIA', level: 'NAIA' },
      { cls: "'25", name: 'Millie Jones', sport: 'Soccer', college: 'Taylor', conf: 'NAIA', level: 'NAIA' },
      { cls: "'25", name: 'Isaac Snapp', sport: 'Baseball', college: 'Southeastern CC', conf: 'NJCAA', level: 'D3' },
      { cls: "'26", name: 'Jane Neil', sport: 'Soccer', college: 'Louisiana Tech', conf: 'CUSA', level: 'D1' },
      { cls: "'26", name: 'Ethan Welsh', sport: 'XC / Track', college: 'East Carolina', conf: 'AAC', level: 'D1' },
      { cls: "'26", name: 'Avery Houseton', sport: 'Softball', college: 'UNC Charlotte', conf: 'AAC', level: 'D1' },
      { cls: "'26", name: 'Brady Johnson', sport: 'Soccer', college: 'Cedarville', conf: 'G-MAC', level: 'D2' },
      { cls: "'26", name: 'Kaitlyn Allen', sport: 'Softball', college: 'Tusculum', conf: 'SAC', level: 'D2' },
      { cls: "'26", name: 'Hunter Kincheloe', sport: 'Baseball', college: 'Hampden-Sydney', conf: 'ODAC', level: 'D3' },
      { cls: "'26", name: 'Baker Runge', sport: 'Soccer', college: 'Gordon', conf: 'CCC', level: 'D3' },
      { cls: "'26", name: 'Maggie Shannon', sport: 'Volleyball', college: 'Springfield', conf: 'NEWMAC', level: 'D3' },
      { cls: "'26", name: 'Douglas Smith', sport: 'Basketball', college: 'Grove City', conf: 'PAC', level: 'D3' },
      { cls: "'26", name: 'Luke Thompson', sport: 'Basketball', college: 'Macalester', conf: 'MIAC', level: 'D3' },
      { cls: "'26", name: 'Jalen Boyd', sport: 'Baseball', college: 'Paul D. Camp CC', conf: 'NJCAA', level: 'D3' },
      { cls: "'26", name: 'Matthew Dorsey', sport: 'Baseball', college: 'Wake Tech CC', conf: 'NJCAA', level: 'D3' },
    ],
    rosterNote:
      'Compiled from the school’s own Lions News signing articles (September 2024 through April 2026). Levels and conferences were verified per college by the researcher; the two junior-college signees are listed at the D3 tier for want of an NJCAA level in this table’s scale. Eaton transferred from Louisville to Virginia — also ACC — for fall 2026.',
    sources: [
      {
        label: 'covenantday.org — 2 student-athletes commit to D1 schools (Eaton, Marcus)',
        url: 'https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/2-student-athletes-commit-to-d1-schools',
      },
      {
        label: 'covenantday.org — 7 commitments, Class of 2026 (April 2026)',
        url: 'https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/7-cds-students-celebrate-athletic-collegiate-commitments-2026',
      },
      {
        label: 'covenantday.org — 8 commitments, Class of 2025 (April 2025)',
        url: 'https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/8-cds-students-celebrate-athletic-collegiate-commitments',
      },
      { label: 'gocards.com — Emily Eaton, Louisville roster', url: 'https://gocards.com/sports/field-hockey/roster/emily-eaton/16101' },
    ],
  },

  /* ----------------------------------------------------------- 1d honors -- */
  honors: {
    headline:
      'The program’s benchmark alumna started every game as an ACC freshman; its benchmark season put boys soccer first in the nation.',
    subhead:
      'No professional alumni yet — the first graduating class was 2006 — but a deep all-conference and all-state ledger every season.',
    pros: [
      {
        kicker: "ACC · Class of '24",
        name: 'Emily Eaton',
        detail:
          '2023 NCISAA Player of the Year, Charlotte Observer Offensive Player of the Year, and Max Field Hockey’s NC Player of the Year after leading the state with 18 goals. CDS’s all-time leading scorer, she started all 17 games as a Louisville freshman and transferred to Virginia for fall 2026.',
        path: 'Covenant Day → Louisville → Virginia',
      },
      {
        kicker: "Sun Belt · Class of '24",
        name: 'Michael Marcus Jr',
        detail:
          'A 6′9″ forward who averaged 14.9 points as a senior and led the Lions to a 4A semifinal, then posted an 18-point, 10-rebound double-double in his second college game.',
        path: 'Covenant Day → Appalachian State',
      },
    ],
    honors: [
      {
        label: 'Two-sport All-State senior',
        text: 'Avery Houseton ’26 was softball Conference Player of the Year and All-State while also earning volleyball All-Conference and All-State honors, recording her 1,000th career dig, and signing with UNC Charlotte.',
        tag: 'Statewide',
      },
      {
        label: 'Conference champions of the year',
        text: 'Caitlin Kasten won both the CISAA and NCISAA cross-country championship meets as a sophomore and was named CISAA Runner of the Year (2024).',
        tag: 'Statewide',
      },
      {
        label: 'All-American Bowl selections',
        text: 'Five football players were selected for the Gatlinburg All-American Bowl after the 2024 season, out of six All-Conference and four All-State honorees.',
        tag: 'Multi-state',
      },
      {
        label: 'Middle-school phenom',
        text: 'Carlton Huitt earned First Team All-Conference and All-State in boys tennis in 2026 — as an 8th grader.',
        tag: 'Statewide',
        tagStyle: 'outline',
      },
      {
        label: 'Career milestones',
        text: 'Chris Rivens ’25 passed 1,000 career basketball points; Maggie Shannon ’26 passed 1,000 volleyball assists in three seasons; Ethan Welsh ’26 ran the second-fastest cross-country time in school history (15:58.7).',
        tag: 'Program record book',
        tagStyle: 'outline',
      },
    ],
    sources: [
      { label: 'covenantday.org — 2026 Spring Sports Highlights', url: SPRING_26 },
      { label: 'covenantday.org — 2025 Fall Sports Highlights', url: FALL_25 },
      { label: 'gocards.com — Eaton newcomer bio (POY honors)', url: 'https://gocards.com/news/2024/8/19/meet-the-2024-field-hockey-newcomers' },
    ],
  },

  /* --------------------------------------------------------- 1e coaching -- */
  coaching: {
    headline:
      'The college counseling director has coached varsity volleyball for 22 seasons — and the new athletic director was promoted from high school principal.',
    subhead:
      'Athletic Director: Mike Freace. Continuity here is generational: two current signees are children of the AD and the guidance counselor.',
    featured: [
      {
        kicker: 'The continuity anchor · Volleyball, 22 seasons',
        name: 'Heather Mills',
        stats: [
          { value: '22', label: 'seasons as head coach in 2024' },
          { value: '3', label: 'straight state runner-up finishes' },
          { value: '2003', label: 'at Covenant Day since' },
        ],
        detail:
          'The Director of Guidance and College Counseling doubles as the varsity volleyball head coach — a two-decade tenure that produced three consecutive NCISAA state runner-up finishes and, in 2025, a 1,000-dig and a 1,000-assist senior in the same rotation.',
      },
      {
        kicker: 'The internal promotion · Athletic Director',
        name: 'Mike Freace',
        stats: [
          { value: 'HS', label: 'Principal before taking the AD role' },
          { value: '2', label: 'assistant ADs beside him' },
          { value: "'25", label: 'son Sean signed to play college soccer' },
        ],
        detail:
          'Freace moved from High School Principal to Athletic Director — an internal promotion announced on the school’s own news feed rather than an outside hire. The department around him: Aja Teich (Assistant AD / Sports Information Director), Michael Laney (Assistant AD for Middle School Athletics and head basketball coach), Chad Smith (strength & conditioning), plus an operations manager and transportation coordinator.',
      },
    ],
    tenure: [
      { name: 'Heather Mills', role: 'Volleyball · Guidance Director', width: 1, since: 'since 2003' },
      { name: 'Mike Freace', role: 'Athletic Director', width: 0.3, since: 'promoted from HS Principal', toVerify: true },
      { name: 'Michael Laney', role: 'Asst AD · Boys Basketball', width: 0.3, since: 'tenure', toVerify: true },
      { name: 'Chad Smith', role: 'Strength & Conditioning', width: 0.3, since: 'tenure', toVerify: true },
      { name: 'Jordan Langs', role: 'Football — dated hire', width: 0.15, since: 'announced on Lions News' },
      { name: 'Katie Johnson', role: 'Girls Soccer — dated hire', width: 0.15, since: 'announced on Lions News' },
    ],
    worthKnowing:
      'the school publishes no coaching directory with tenure dates — the two dated head-coach announcements (Langs for football, Johnson for girls soccer) and Mills’ 22-season milestone are the documented anchors. Program coaches named in school coverage include David Houseton (baseball, father of softball signee Avery), Vanessa Laney, Rachael Klohr, Julius Klohr, Mike Hawks and Bobby Wehane.',
    sources: [
      { label: 'covenantday.org — Athletics staff', url: ATHLETICS },
      {
        label: 'covenantday.org — Mike Freace begins tenure as AD',
        url: 'https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/mike-freace-begins-tenure-as-athletic-director',
      },
      { label: 'covenantday.org — 2024 Fall Sports Highlights (Mills’ 22nd season)', url: 'https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/lions-news/post/2024-fall-sports-highlights1' },
    ],
  },

  /* ------------------------------------------------------- 1f facilities -- */
  facilities: {
    headline:
      'An 800-seat gym, a turf field ringed by a 200-meter track, six new tennis courts, and a 27-acre athletic park down the road.',
    subhead:
      'The Forever Covenant campaign plans an eight-lane track and field house at Warner Park.',
    venues: [
      { name: 'Main Gym', detail: 'Holds more than 800 fans; home court for basketball and volleyball.' },
      { name: 'Covenant Field + Davis Track', detail: 'A fully turf field beside the middle school, ringed by the four-lane, 200-meter Davis Track.' },
      { name: 'Warner Park', detail: '27 acres at 515 Matthews Township Parkway — baseball, softball, football/soccer fields, and middle-school field hockey. Homecoming is played here.' },
      { name: 'Tennis complex', detail: 'Six brand-new hard courts with a pavilion.' },
      { name: 'Fullwood Field', detail: 'Primary field hockey venue and spring track field events.' },
      { name: 'Auxiliary Gym', detail: 'Middle-school volleyball and basketball, lower-school PE.' },
      { name: 'Webb Fitness Center', detail: 'Built 2015 — power racks, kettlebells, free weights; serves grades 6–12.' },
    ],
    care: [
      {
        label: 'Strength & conditioning',
        text: 'A dedicated faculty position — Chad Smith, HS Strength and Conditioning Teacher and Coach. Programming is age-appropriate with integrated speed and agility work; progress is tracked daily, and athletes lift after school and through summers.',
      },
      {
        label: 'Strength as curriculum',
        text: 'Strength & Fitness is a credit-bearing PE course in the High School Profile, and grades 6–12 take strength electives in the Webb Fitness Center.',
      },
      {
        label: 'Athletic training',
        text: 'No athletic trainers or sports-medicine partnership (OrthoCarolina / Novant / Atrium) are named anywhere on the athletics site — the S&C program above is the published extent of athlete care.',
      },
    ],
    careNote:
      'The planned Warner Park upgrades — an eight-lane track, field-event spaces, a field house, concessions and restrooms — would replace the current four-lane track as the program’s home for meets.',
    sources: [
      { label: 'covenantday.org — Facilities', url: 'https://www.covenantday.org/athletics/facilities' },
      { label: 'covenantday.org — Strength & Conditioning', url: 'https://www.covenantday.org/athletics/strength-and-conditioning' },
    ],
  },

  /* 1g National Stage & NIL — intentionally omitted. The fall-2025 #1 national
     soccer ranking is carried on 1b and the honors card; there is no national
     schedule and zero documented NIL activity to build a standing card from. */
}
