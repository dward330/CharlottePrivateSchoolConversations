// Charlotte Country Day School — Sports research area.
//
// Every figure is traceable to
// source-material/sports/charlotte-country-day/Charlotte Country Day - Sports - Redesign Research 2026.md.
//
// SIX of seven cards render. `national` (1g) is deliberately omitted. Country
// Day does hold one national marker — MaxPreps ranked its field hockey #22
// nationally in 2025–26 — but that figure conflicts with the sport's own
// authority (MAX Field Hockey's final national top 25 contains no NC team at
// all), no other program has a national ranking, the schedule is almost
// entirely in-state, and no named athlete NIL deal exists. One contested data
// point cannot carry a card; the field hockey ranking is noted on 1b instead.

import type { SportsProgram } from '../sportsProgram.ts'

const ATHLETICS = 'https://www.charlottecountryday.org/cd-experience/athletics'
const AWARDS = 'https://www.charlottecountryday.org/cd-experience/athletics/awards-and-honors'
const CHAMPS_26 =
  'https://www.highschoolot.com/story/the-2025-26-ncisaa-team-state-champions-in-every-sport/22322092/'

export const charlotteCountryDay: SportsProgram = {
  /* ---------------------------------------------------------- 1a offered -- */
  offered: {
    headline:
      '72 teams across 26 sports, with about 85% of students in grades 7–12 playing — and 155 state championships all-time.',
    subhead:
      'A 130-person athletics staff supports the broadest participation rate in the Charlotte private-school field.',
    stats: [
      { value: '26', label: 'sports offered' },
      { value: '72', label: 'teams across V · JV · MS' },
      { value: '~85%', label: 'of grades 7–12 participate' },
      { value: '155', label: 'state titles all-time' },
    ],
    seasons: [
      {
        name: 'Fall',
        note: '8 varsity',
        sports: [
          { name: 'Football', levels: ['V', 'JV', 'MS'] },
          { name: 'Field Hockey', levels: ['V', 'JV', 'MS'] },
          { name: 'Soccer (Boys)', levels: ['V', 'JV', 'MS'] },
          { name: 'Volleyball (Girls)', levels: ['V', 'JV', 'MS'] },
          { name: 'Tennis (Girls)', levels: ['V', 'JV', 'MS'] },
          { name: 'Cross Country (B & G)', levels: ['V', 'MS'] },
          { name: 'Golf (Girls)', levels: ['V', 'MS'] },
          { name: 'Cheerleading', levels: ['V', 'MS'] },
        ],
      },
      {
        name: 'Winter',
        note: '6 varsity',
        sports: [
          { name: 'Basketball (Boys)', levels: ['V', 'JV', 'MS'] },
          { name: 'Basketball (Girls)', levels: ['V', 'JV', 'MS'] },
          { name: 'Swimming (B & G)', levels: ['V', 'MS'] },
          { name: 'Wrestling', levels: ['V', 'MS'] },
          { name: 'Indoor Track', levels: ['V'] },
          { name: 'Cheerleading (Winter)', levels: ['V', 'MS'] },
        ],
      },
      {
        name: 'Spring',
        note: '9 varsity',
        sports: [
          { name: 'Lacrosse (Boys)', levels: ['V', 'JV', 'MS'] },
          { name: 'Lacrosse (Girls)', levels: ['V', 'JV', 'MS'] },
          { name: 'Baseball', levels: ['V', 'JV', 'MS'] },
          { name: 'Soccer (Girls)', levels: ['V', 'JV', 'MS'] },
          { name: 'Tennis (Boys)', levels: ['V', 'JV', 'MS'] },
          { name: 'Track & Field (B & G)', levels: ['V', 'MS'] },
          { name: 'Softball', levels: ['V', 'MS'] },
          { name: 'Golf (Boys)', levels: ['V', 'MS'] },
        ],
      },
    ],
    footnote:
      'Middle School splits several sports into Green and White squads. The published "72 teams / 26 sports" figure counts boys’ and girls’ programs separately; enumerating the team directory yields roughly 65 — a counting convention difference, and both figures are the school’s own. Country Day runs two campuses: Cannon (Upper/Lower School and main athletics) and Bissell (Middle School).',
    sources: [
      { label: 'charlottecountryday.org — Athletics', url: ATHLETICS },
      {
        label: 'Team directory',
        url: 'https://www.charlottecountryday.org/cd-experience/athletics/teams/athletics-team',
      },
    ],
  },

  /* ----------------------------------------------------------- 1b record -- */
  record: {
    headline:
      'Girls tennis has won four straight NCISAA titles, and field hockey took its 16th — but the girls swimming dynasty ended in 2026.',
    subhead:
      'Country Day won four state titles in each of 2023–24 and 2024–25, then two in 2025–26 with two more runner-up finishes.',
    seasonLabels: ["'23–24", "'24–25", "'25–26"],
    rows: [
      {
        program: 'Girls Tennis',
        cells: [
          { result: 'STATE', record: '19–0' },
          { result: 'STATE' },
          { result: 'STATE' },
        ],
        note: 'Four-peat, beating Durham Academy in the 2026 final',
      },
      {
        program: 'Field Hockey',
        cells: [
          { result: 'STATE' },
          { result: 'NONE' },
          { result: 'STATE', record: '20–1' },
        ],
        note: '16th title; beat Charlotte Latin 1–0, avenging its only loss',
      },
      {
        program: 'Girls Swimming',
        cells: [
          { result: 'STATE' },
          { result: 'STATE' },
          { result: 'RUNNER-UP', record: '328 pts' },
        ],
        note: 'Two-year reign ended by Providence Day, 420–328',
      },
      {
        program: 'Girls Track & Field',
        cells: [
          { result: 'STATE' },
          { result: 'STATE' },
          { result: 'NONE', record: '3rd at state' },
        ],
        note: 'Durham Academy took the 2026 title',
      },
      {
        program: 'Girls Cross Country',
        cells: [
          { result: 'NONE' },
          { result: 'STATE' },
          { result: 'NONE', record: '3rd at state' },
        ],
        note: 'CISAA conference champions in 2026',
      },
      {
        program: 'Boys Lacrosse',
        cells: [
          { result: 'NONE' },
          { result: 'NONE' },
          { result: 'RUNNER-UP', record: '19–3' },
        ],
        note: 'Lost 6–5 in overtime to Durham Academy; outright CISAA champions',
      },
    ],
    didNotWin:
      'girls swimming and boys lacrosse, both lost as runner-up (Providence Day and Durham Academy) · girls cross country, girls track, boys tennis and boys lacrosse (Durham Academy) · volleyball (North Raleigh Christian) · girls lacrosse, girls soccer and football (Providence Day) · both golf titles and wrestling (Charlotte Latin) · baseball (Charlotte Christian) · girls basketball (Cannon) · boys basketball (Forsyth Country Day).',
    bars: [
      { program: 'Field Hockey', record: '20–1', pct: 0.952, tag: "'25–26" },
      { program: 'Boys Lacrosse', record: '19–3', pct: 0.864, tag: "'25–26" },
      { program: 'Girls Lacrosse', record: '17–3', pct: 0.85, tag: "'25–26" },
      { program: 'Boys Soccer', record: '12–7', pct: 0.632, tag: "'25–26" },
      { program: 'Football', record: '6–4', pct: 0.6, tag: "'25–26" },
      { program: 'Volleyball', record: '13–9', pct: 0.591, tag: "'25–26" },
    ],
    seasonDetail: [
      {
        program: 'Field Hockey',
        text: '2025–26: 20–1 with an 88–6 goal differential and a perfect 12–0 at home. The sole loss was 0–1 to Charlotte Latin on October 7, avenged 1–0 in the state final on October 25. MaxPreps ranked the team #22 nationally and #2 in NC — though MAX Field Hockey’s own final national top 25 contains no North Carolina team, so treat the national figure as MaxPreps-specific.',
      },
      {
        program: 'Girls Swimming',
        text: 'The two-year reign ended in 2026: Providence Day scored 420 to Country Day’s 328 at the D1 meet. Taylor Klein set an NCISAA record in the 100 fly at 53.16 and has committed to Stanford.',
      },
      {
        program: 'Boys Lacrosse',
        text: '2026: 19–3, outright CISAA champions and MaxPreps’ No. 1 team in NCISAA Division I, but lost the state final 6–5 in overtime to Durham Academy. Goalkeeper Owen Timperman finished with more than 960 career saves, a program record.',
      },
    ],
    sources: [
      { label: 'HighSchoolOT — 2025–26 NCISAA champions', url: CHAMPS_26 },
      { label: 'charlottecountryday.org — Awards & Honors', url: AWARDS },
      {
        label: 'HighSchoolOT — Durham Academy wins boys lacrosse in OT',
        url: 'https://www.highschoolot.com/story/durham-academy-shocks-charlotte-country-day-in-ot-to-win-ncisaa-d1-boys-lacrosse-title/22358718/',
      },
      {
        label: 'MaxPreps — field hockey 2025–26',
        url: 'https://www.maxpreps.com/nc/charlotte/charlotte-country-day-school-buccaneers/field-hockey/25-26/',
      },
    ],
  },

  /* --------------------------------------------------------- 1c pipeline -- */
  pipeline: {
    headline:
      '51 college commitments across 2024–26, 28 of them Division I and 9 Power 4 — with swimming as the clear engine.',
    subhead:
      'The school reports roughly 15 seniors committing per year over the last five years.',
    funnel: [
      {
        label: 'Committed to college athletics',
        hint: '(all divisions)',
        count: '51',
        width: 1,
        shade: 'pale',
      },
      { label: 'NCAA Division I', hint: '(any conference)', count: '28', width: 0.55, shade: 'mid' },
      {
        label: 'Power 4',
        hint: '(SEC · Big Ten · ACC · Big 12)',
        count: '9',
        width: 0.18,
        shade: 'full',
      },
    ],
    funnelNote:
      'Swimming supplies five of the nine Power 4 commits — including all three from the class of 2026, to Stanford, Florida and Purdue. Six commitments went to Ivy League programs, a share matched by no other school in this comparison and consistent with Country Day’s academic profile.',
    sportBars: [
      { sport: 'Swimming', count: 8, width: 1, p4Width: 0.63 },
      { sport: 'Track / XC', count: 8, width: 1, p4Width: 0.25 },
      { sport: 'Tennis', count: 2, width: 0.25, p4Width: 0.13 },
      { sport: 'Soccer', count: 2, width: 0.25 },
      { sport: 'Basketball', count: 1, width: 0.13 },
      { sport: 'Equestrian', count: 1, width: 0.13, p4Width: 0.13 },
      { sport: 'Field Hockey', count: 1, width: 0.13 },
      { sport: 'Other', count: 5, width: 0.63 },
    ],
    realityCheck:
      'Swimming is unambiguously the Power 4 engine — five of nine P4 commits, and every 2026 P4 signee. Football and basketball, the sports that dominate national recruiting coverage, produced one D1 commit each across three classes. For most Country Day families the pipeline runs through Olympic and racquet sports into academically selective programs, not through the revenue sports.',
    rankedRecruits:
      'No Country Day athlete appears in a national top-100 composite for football or basketball in the classes reviewed — consistent with a school whose elite output is swimming, tennis and distance running, which those databases do not rank. The school does hold 7 of the 22 NCISAA Division I state swimming records, more than any other school in the division, and recorded 13 USA Swimming All-American nominations from eight swimmers in a single state meet.',
    roster: [
      { cls: "'26", name: 'Taylor Klein', sport: 'Swimming', college: 'Stanford', conf: 'ACC', level: 'P4' },
      { cls: "'26", name: 'Santiago Alzate-Celin', sport: 'Swimming', college: 'Florida', conf: 'SEC', level: 'P4' },
      { cls: "'26", name: 'Caroline Mallard', sport: 'Swimming', college: 'Purdue', conf: 'Big Ten', level: 'P4' },
      { cls: "'26", name: 'Joseph Youakim', sport: 'Boys Basketball', college: 'Bucknell', conf: 'Patriot', level: 'D1' },
      { cls: "'26", name: 'Kaylee Daniell', sport: 'Swimming', college: 'Tulane', conf: 'American', level: 'D1' },
      { cls: "'26", name: 'Logan Crane', sport: 'Baseball', college: 'Queens (Charlotte)', conf: 'ASUN', level: 'D1' },
      { cls: "'26", name: 'Crandall Wilkins', sport: 'Football & Lacrosse', college: 'Middlebury', conf: 'NESCAC', level: 'D3' },
      { cls: "'26", name: 'Olive Bigham', sport: 'Girls Basketball', college: 'Washington & Lee', conf: 'ODAC', level: 'D3' },
      { cls: "'26", name: 'Molly Brown', sport: 'Girls Soccer', college: 'Washington & Lee', conf: 'ODAC', level: 'D3' },
      { cls: "'26", name: 'Alex Stiefel', sport: 'Baseball', college: 'Bates', conf: 'NESCAC', level: 'D3' },
      { cls: "'26", name: "L.W. O'Neil", sport: 'Baseball', college: 'Sewanee', conf: 'SAA', level: 'D3' },
      { cls: "'26", name: 'Olivia Roark', sport: 'Volleyball', college: 'Randolph-Macon', conf: 'ODAC', level: 'D3' },
      { cls: "'26", name: 'Dante Graham', sport: 'Wrestling', college: 'SW Minnesota State', conf: 'NSIC', level: 'D2' },
      { cls: "'25", name: 'Elle Scott', sport: 'Swimming', college: 'UC Berkeley', conf: 'ACC', level: 'P4' },
      { cls: "'25", name: 'Sydney Pifer', sport: 'Equestrian', college: 'Oklahoma State', conf: 'Big 12', level: 'P4' },
      { cls: "'25", name: 'Kobey Riley', sport: 'Track / XC', college: 'Princeton', conf: 'Ivy', level: 'D1' },
      { cls: "'25", name: 'Avery Johnson', sport: 'Girls Soccer', college: 'Yale', conf: 'Ivy', level: 'D1' },
      { cls: "'25", name: 'Connor Wickerham', sport: 'Swimming', college: 'Brown', conf: 'Ivy', level: 'D1' },
      { cls: "'25", name: 'Abby Kerrins', sport: 'Track / XC', college: 'Dartmouth', conf: 'Ivy', level: 'D1' },
      { cls: "'25", name: 'Lindsey Kerrins', sport: 'Track / XC', college: 'Dartmouth', conf: 'Ivy', level: 'D1' },
      { cls: "'25", name: 'Khalel Wright', sport: 'Football', college: 'Ball State', conf: 'MAC', level: 'D1' },
      { cls: "'25", name: 'Grayson Anne McCurdy', sport: 'Girls Lacrosse', college: 'James Madison', conf: 'Sun Belt', level: 'D1' },
      { cls: "'25", name: 'Gabbie Baskett', sport: 'Tennis', college: 'Delaware State', conf: 'MEAC', level: 'D1' },
      { cls: "'25", name: 'Jada Erwin', sport: 'Track / XC', college: 'Western Carolina', conf: 'Southern', level: 'D1' },
      { cls: "'25", name: 'Brooke McCall', sport: 'Volleyball', college: 'Florida Atlantic', conf: 'American', level: 'D1' },
      { cls: "'25", name: 'Esme Van Orden', sport: 'Swimming', college: 'Williams', conf: 'NESCAC', level: 'D3' },
      { cls: "'25", name: 'Zachary Lu', sport: 'Squash', college: 'Wesleyan', conf: 'NESCAC', level: 'D3' },
      { cls: "'25", name: 'Alyssa Hankerson', sport: 'Girls Basketball', college: 'Columbus State', conf: 'PBC', level: 'D2' },
      { cls: "'25", name: 'Alana Hankerson', sport: 'Girls Basketball', college: 'Columbus State', conf: 'PBC', level: 'D2' },
      { cls: "'25", name: 'Carlin Parker', sport: 'Girls Basketball', college: 'Tampa', conf: 'SSC', level: 'D2' },
      { cls: "'25", name: 'Jerome Lowery', sport: 'Boys Basketball', college: 'Marymount', conf: 'Atlantic East', level: 'D3' },
      { cls: "'24", name: 'Freddy Klein', sport: 'Swimming', college: 'UC Berkeley', conf: 'ACC', level: 'P4' },
      { cls: "'24", name: 'Emma Hayden Lewis', sport: 'Track / XC', college: 'Miami (FL)', conf: 'ACC', level: 'P4' },
      { cls: "'24", name: 'Kate Stajos', sport: 'Track / XC', college: 'Michigan State', conf: 'Big Ten', level: 'P4' },
      { cls: "'24", name: 'Noah McDonald', sport: 'Tennis', college: 'Southern Methodist', conf: 'ACC', level: 'P4' },
      { cls: "'24", name: 'Josh Porter', sport: 'Track / XC', college: 'Lehigh', conf: 'Patriot', level: 'D1' },
      { cls: "'24", name: 'Margaret Scheurer', sport: 'Field Hockey', college: 'Richmond', conf: 'Atlantic 10', level: 'D1' },
      { cls: "'24", name: 'Dylan Swinehart', sport: 'Boys Soccer', college: 'Liberty', conf: 'CUSA', level: 'D1' },
      { cls: "'24", name: "Charlie O'Shea", sport: 'Golf', college: 'Appalachian State', conf: 'Sun Belt', level: 'D1' },
      { cls: "'24", name: 'Kasey Cone', sport: 'Track / XC', college: 'Richmond', conf: 'Atlantic 10', level: 'D1' },
      { cls: "'24", name: 'David Harner', sport: 'Track / XC', college: 'Presbyterian', conf: 'Big South', level: 'D1' },
      { cls: "'24", name: 'Ellie Wilkins', sport: 'Field Hockey', college: 'Tufts', conf: 'NESCAC', level: 'D3' },
      { cls: "'24", name: 'Liza Bray', sport: 'Girls Soccer', college: 'Kenyon', conf: 'NCAC', level: 'D3' },
      { cls: "'24", name: 'Marshall Pifer', sport: 'Swimming', college: 'Denison', conf: 'NCAC', level: 'D3' },
      { cls: "'24", name: 'Owen Miller', sport: 'Baseball', college: 'Denison', conf: 'NCAC', level: 'D3' },
      { cls: "'24", name: 'Campbell Baumgartner', sport: 'Swimming', college: 'Connecticut College', conf: 'NESCAC', level: 'D3' },
      { cls: "'24", name: 'Amare Bethel', sport: 'Boys Basketball', college: 'Metropolitan State', conf: 'RMAC', level: 'D2' },
    ],
    rosterNote:
      'Level labels and conferences were added by the researcher from each college’s NCAA status; they are not on the school’s published roster. P4 = SEC · Big Ten · ACC · Big 12.',
    sources: [
      {
        label: 'charlottecountryday.org — Collegiate Athletics',
        url: 'https://www.charlottecountryday.org/cd-experience/athletics/collegiate-athletics',
      },
      { label: 'charlottecountryday.org — Awards & Honors', url: AWARDS },
    ],
  },

  /* ----------------------------------------------------------- 1d honors -- */
  honors: {
    headline:
      'A two-time Super Bowl champion, an ATP world No. 29, an NFL running back and a USL Goalkeeper of the Year.',
    subhead:
      'The Athletics Hall of Honor was revived in October 2024 after roughly two decades dormant.',
    pros: [
      {
        kicker: "NFL · Class of '82",
        name: 'Mike Cofer',
        detail:
          'Placekicker and two-time Super Bowl champion with the San Francisco 49ers, winning Super Bowls XXIII and XXIV across an NFL career from 1987 to 1995.',
        path: 'Country Day → NC State → San Francisco 49ers',
      },
      {
        kicker: "ATP Tour · Class of '95",
        name: 'Tripp Phillips',
        detail:
          'Reached a career-high world No. 29 in doubles with two ATP titles and a 2006 US Open doubles semifinal. Now associate head coach of UNC men’s tennis.',
        path: 'Country Day → UNC → ATP Tour',
      },
      {
        kicker: "NFL · Class of '01",
        name: 'Alvin Pearman',
        detail:
          'Fourth-round pick in the 2005 NFL Draft, playing for the Jaguars, Seahawks and Titans. He now teaches at Country Day and coaches its track & field program.',
        path: 'Country Day → Virginia → NFL → back to CD',
      },
      {
        kicker: 'USL · pro soccer',
        name: 'Brandon Miller',
        detail:
          '2015 USL Goalkeeper of the Year, setting league records for shutouts (13) and goals-against average (0.54). Founder of the Black Players Alliance of the USL.',
        path: 'Country Day → UNC Wilmington → USL',
      },
    ],
    honors: [
      {
        label: 'Wells Fargo Cup',
        text: 'Won ten times for statewide athletics excellence — 1982–83 through 2000–01, and most recently 2021–22.',
        tag: 'Statewide',
      },
      {
        label: 'Swimming records & All-Americans',
        text: 'Country Day holds 7 of the 22 NCISAA Division I state swimming records — more than any other school in the division — and produced 13 USA Swimming All-American nominations from eight swimmers in a single state meet.',
        tag: 'National',
      },
      {
        label: 'USA Lacrosse All-Americans',
        text: 'Five in 2026: Katy Blythe, Piper Brawley and Evelyn Turner (girls); Crandall Wilkins and Owen Timperman (boys). Timperman finished with a program-record 960+ career saves.',
        tag: 'National',
      },
      {
        label: 'Gatorade Player of the Year',
        text: 'Kearns Kelly won NC Boys Soccer Player of the Year in 1985–86. No recent Country Day Gatorade winner was located.',
        tag: 'Statewide, 1 per sport',
      },
      {
        label: 'In-house awards',
        text: 'The Victora Ludorum (senior girl, since 1968) and Athlete’s Cup (senior boy, since 1964) are the school’s highest athletic honors — 2026 went to Molly Brown and Crandall Wilkins.',
        tag: 'School culture signal',
        tagStyle: 'outline',
      },
    ],
    sources: [
      { label: 'charlottecountryday.org — Awards & Honors', url: AWARDS },
      { label: 'charlottecountryday.org — Hall of Honor', url: 'https://www.charlottecountryday.org/alumni/hall-of-honor' },
      { label: 'Wikipedia — Mike Cofer', url: 'https://en.wikipedia.org/wiki/Mike_Cofer_(kicker)' },
      { label: 'Wikipedia — Tripp Phillips', url: 'https://en.wikipedia.org/wiki/Tripp_Phillips' },
    ],
  },

  /* --------------------------------------------------------- 1e coaching -- */
  coaching: {
    headline:
      'The winningest lacrosse coach in North Carolina history and a Hall-of-Fame tennis coach with 38 state championships — both still on staff.',
    subhead:
      'Athletic Director: Masanori Toguchi Jr., in the role since July 2021 after eleven years as founding AD at Hough High School.',
    featured: [
      {
        kicker: 'The pedigree hire · Girls Tennis, since 1990',
        name: 'Calvin Davis Jr.',
        stats: [
          { value: '38', label: 'combined state championships' },
          { value: '36 yrs', label: 'at Charlotte Country Day' },
          { value: '5×', label: 'PTR national Coach of the Year' },
        ],
        detail:
          'Inducted into the North Carolina Tennis Hall of Fame in 2024, a USTA-NC Mary Milam Award winner, and named to the Charlotte Observer’s all-time top-10 Mecklenburg County coaches across all sports. He has coached four professionals, including a US Open doubles semifinalist, and the Rankin Courts scoreboard was dedicated in his name in 2022. His son C.C. Davis ’99 now coaches boys tennis alongside him.',
      },
      {
        kicker: 'The continuity anchor · Boys Lacrosse, 1987–2026',
        name: 'Brad Touma',
        stats: [
          { value: '540+', label: 'career wins — most in NC history' },
          { value: '39 yrs', label: 'coaching his alma mater, Class of ’83' },
          { value: '19', label: 'conference titles, 9 state titles' },
        ],
        detail:
          'A 1983 Country Day graduate who helped organize North Carolina’s first high school lacrosse league in 1988 — five teams, now roughly 150 — and founded the Charlotte Lacrosse Jamboree for brain-tumor research in 1996. Inducted into the NILCA Hall of Fame in 2023, he has produced 200+ college players and 20+ USA All-Americans. He retires after the 2026 season, which passes the continuity-anchor role to Calvin Davis Jr.',
      },
    ],
    tenure: [
      { name: 'Brad Touma', role: 'Boys Lacrosse — retiring after 2026', width: 1, since: 'since 1987' },
      { name: 'Calvin Davis Jr.', role: 'Girls Tennis', width: 0.92, since: 'since 1990' },
      { name: 'Kayleigh Ferlan', role: 'Field Hockey — 4 titles since 2017', width: 0.23, since: 'since 2017' },
      { name: 'Masanori Toguchi Jr.', role: 'Director of Athletics', width: 0.13, since: 'since 2021' },
      { name: 'Kenny Hairston', role: 'Boys Basketball', width: 0.03, since: 'since 2026' },
      { name: 'C.C. Davis', role: "Boys Tennis — Calvin Davis Jr.'s son", width: 0.03, since: 'since 2026' },
      { name: 'Logan Smith', role: 'Baseball', width: 0.03, since: 'since 2026' },
    ],
    worthKnowing:
      'Country Day turned over four head-coaching jobs in the 2025–26 cycle — boys basketball, girls basketball, boys tennis and baseball — with Brad Touma’s lacrosse retirement still to come and the girls basketball seat vacant as of this research. That is unusually high churn for a department otherwise defined by multi-decade tenures, and worth asking about on a tour. Track coach Alvin Pearman is a former NFL running back who returned to teach at his old school.',
    sources: [
      {
        label: 'Country Day — Touma NILCA Hall of Fame',
        url: 'https://www.charlottecountryday.org/cd-experience/athletics/news-details/~board/athletics-news/post/coach-brad-touma-national-interscholastic-lacrosse-coaches-association-hall-of-fame-honoree',
      },
      {
        label: 'Country Day — Calvin Davis Jr., NC Tennis Hall of Fame',
        url: 'https://www.charlottecountryday.org/cd-experience/athletics/news-details/~board/athletics-news/post/coach-calvin-davis-jr-north-carolina-tennis-association-hall-of-fame',
      },
      {
        label: 'Country Day — athletic director announcement',
        url: 'https://www.charlottecountryday.org/news-events/news-details-page/~board/school-news/post/athletic-director-announcement',
      },
    ],
  },

  /* ------------------------------------------------------- 1f facilities -- */
  facilities: {
    headline:
      'A $30.5M athletics build opened in 2022 — a 700-seat natatorium and a 1,200-seat performance gym — anchored by an OrthoCarolina sports-medicine partnership.',
    subhead:
      'Five named certified athletic trainers across two campuses, more than any other school in this comparison.',
    photos: [
      {
        src: '/facilities/charlotte-country-day-belk-stadium.jpg',
        name: 'Belk Stadium & John Cook Field',
        meta: '2,500 seats',
        caption:
          'Natural grass with an eight-lane all-weather track, lights and a two-level press box',
        credit: 'Photo: Charlotte Country Day School',
      },
      {
        src: '/facilities/charlotte-country-day-klein-aquatic-center.jpg',
        name: 'Klein Aquatic Center',
        meta: '~30,000 sq ft, 2022',
        caption: 'Eight-lane competition pool plus a five-lane warm-up pool, seating 700+',
        credit: 'Photo: Charlotte Country Day School',
      },
      {
        src: '/facilities/charlotte-country-day-harris-performance-gym.jpg',
        name: 'Harris Performance Gym',
        meta: '~47,000 sq ft, 2022',
        caption: 'Seats 1,200+; houses the strength centre, wrestling room and Hall of Honor',
        credit: 'Photo: Charlotte Country Day School',
      },
    ],
    venues: [
      { name: 'Bruton Smith Athletic Center', detail: 'three courts, elevated indoor track' },
      { name: "O'Leary Sports Medicine Center", detail: 'inside Bruton Smith' },
      { name: 'Rankin Tennis Courts', detail: 'eight courts, four lit' },
      { name: 'Dowd Field', detail: 'field hockey and lacrosse' },
      { name: 'Ed Walton Field', detail: 'varsity baseball' },
      { name: 'Crawford Field', detail: 'soccer training, Cannon Campus' },
      { name: 'Bissell (MS) complex', detail: '4 fields, 6 tennis courts, 4-lane track' },
    ],
    broadcast:
      'Home events stream free on Hudl Focus with no account required, via bucs.link/bucssportslive; the Klein Aquatic Center streams separately on the Bucs Sports YouTube channel. Country Day no longer carries the NFHS Network for home events. Schedules publish with RSS and iCal feeds. No Sports Information Director is named publicly.',
    care: [
      {
        label: 'Athletic trainers',
        text: '5 named — Monica Erb (Director of Sports Medicine), Stephanie Miller (head), Mike Hervis, plus Jason Farmer and Jessica Raynor at the Middle School',
      },
      {
        label: 'Team physician',
        text: 'Dr. James E. Fleischli, MD, of OrthoCarolina — Country Day is listed among OrthoCarolina’s sports-medicine affiliates',
      },
      {
        label: 'Concussions',
        text: 'A formal concussion-management and return-to-play protocol, with evaluations documented and individualized treatment plans',
      },
      {
        label: 'Facilities',
        text: "Two on-campus sports-medicine facilities, anchored by the O'Leary Sports Medicine Center, which the school compares to top college centers",
      },
      {
        label: 'S&C staff',
        text: '2 full-time coaches with dedicated centers in both Harris Performance Gym and Bruton Smith; 6 performance and sports-medicine specialists overall',
      },
    ],
    careNote:
      'The OrthoCarolina partnership is the differentiator among Charlotte private schools — Cannon uses Novant, Charlotte Christian uses Atrium, and Providence Day keeps care fully in-house. The combined Klein and Harris project totalled 77,737 sq ft and roughly $30.5M, funded by a $10M lead gift from the Klein family, the Dowd Foundation and two anonymous donors.',
    sources: [
      {
        label: 'charlottecountryday.org — Sports Medicine',
        url: 'https://www.charlottecountryday.org/cd-experience/athletics/sports-medicine',
      },
      { label: 'Little — Country Day athletics project', url: 'https://www.littleonline.com/work/project/charlotte-country-day-school/' },
      { label: 'OrthoCarolina — sports affiliates', url: 'https://www.orthocarolina.com/listings/sports-affiliates' },
      {
        label: 'charlottecountryday.org — live stream',
        url: 'https://www.charlottecountryday.org/cd-experience/athletics/live-stream',
      },
    ],
  },

  /* 1g National Stage & NIL — intentionally omitted. The one national marker
     (MaxPreps #22 field hockey, 2025–26) is contested by the sport's own
     authority, no other program is nationally ranked, the schedule is almost
     entirely in-state, and no named athlete NIL deal exists. The field hockey
     ranking is carried on card 1b instead. */
}
