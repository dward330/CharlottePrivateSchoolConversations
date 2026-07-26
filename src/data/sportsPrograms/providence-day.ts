// Providence Day School — Sports research area.
//
// Every figure is traceable to
// source-material/sports/providence-day/Providence Day - Sports - Redesign Research 2026.md,
// which carries the provenance header, source URLs and gap notes. Figures the
// research could not confirm carry `toVerify` and render a TO VERIFY tag rather
// than being guessed at.
//
// All seven cards render for PD — it is the only school in the set with a
// documented NIL story tied to a named athlete.

import type { SportsProgram } from '../sportsProgram.ts'

const PDS = 'https://www.pdschargers.com/more/about-pds-athletics/'
const CHAMPS =
  'https://www.highschoolot.com/story/the-2025-26-ncisaa-team-state-champions-in-every-sport/22322092/'
const NEXT_LEVEL = 'https://www.pdschargers.com/more/honors-hall-of-fame-wells-fargo-cup/'

export const providenceDay: SportsProgram = {
  /* ---------------------------------------------------------- 1a offered -- */
  offered: {
    headline:
      '27 varsity programs, 66 teams total — among the largest private-school athletic programs in North Carolina.',
    subhead:
      'Sports are open to grades 7–12, and historically over 80% of students play. Most varsity sports carry a JV and Middle School ladder beneath them.',
    stats: [
      { value: '27', label: 'varsity sports / programs' },
      { value: '66', label: 'teams across V · JV · MS' },
      { value: '7–12', label: 'grades eligible to compete' },
      { value: 'NCISAA', label: '4A state · CISAA conference' },
    ],
    seasons: [
      {
        name: 'Fall',
        note: '9 varsity',
        sports: [
          { name: 'Football', levels: ['V', 'JV', 'MS'] },
          { name: 'Cross Country (B & G)', levels: ['V', 'MS'] },
          { name: 'Field Hockey', levels: ['V', 'JV', 'MS'] },
          { name: 'Soccer (Boys)', levels: ['V', 'JV', 'MS'] },
          { name: 'Tennis (Girls)', levels: ['V', 'JV', 'MS'] },
          { name: 'Volleyball (Girls)', levels: ['V', 'JV', 'MS'] },
          { name: 'Golf (Girls)', levels: ['V', 'MS'] },
          { name: 'Cheerleading', levels: ['V', 'MS'] },
        ],
      },
      {
        name: 'Winter',
        note: '9 varsity',
        sports: [
          { name: 'Basketball (Boys)', levels: ['V', 'JV', 'MS'] },
          { name: 'Basketball (Girls)', levels: ['V', 'JV', 'MS'] },
          { name: 'Swimming (B & G)', levels: ['V', 'MS'] },
          { name: 'Wrestling', levels: ['V', 'MS'] },
          { name: 'Indoor Track (B & G)', levels: ['V'] },
          { name: 'Dance', levels: ['V'] },
          { name: 'Cheerleading (Winter)', levels: ['V', 'MS'] },
        ],
      },
      {
        name: 'Spring',
        note: '9 varsity',
        sports: [
          { name: 'Baseball', levels: ['V', 'JV', 'MS'] },
          { name: 'Lacrosse (Boys)', levels: ['V', 'JV', 'MS'] },
          { name: 'Lacrosse (Girls)', levels: ['V', 'JV', 'MS'] },
          { name: 'Soccer (Girls)', levels: ['V', 'JV', 'MS'] },
          { name: 'Tennis (Boys)', levels: ['V', 'JV', 'MS'] },
          { name: 'Track & Field (B & G)', levels: ['V', 'MS'] },
          { name: 'Softball', levels: ['V', 'MS'] },
          { name: 'Golf (Boys)', levels: ['V', 'MS'] },
        ],
      },
    ],
    footnote:
      'Counting boys’ and girls’ editions separately, this is 27 varsity programs; the remaining ~39 of 66 teams are the JV and Middle School squads beneath them. Middle School splits larger sports into "Blue" and "Red" squads to widen participation. As of 2025–26, football competes in the new NCISAA "Big South" conference with Charlotte Latin, Charlotte Christian and Charlotte Country Day — PD went 3–0 and finished first.',
    sources: [
      { label: 'pdschargers.com Athletics Directory', url: PDS },
      {
        label: 'MaxPreps team index',
        url: 'https://www.maxpreps.com/nc/charlotte/providence-day-chargers/',
      },
      {
        label: 'SBLive — 2025 football schedule',
        url: 'https://www.si.com/high-school/north-carolina/a-closer-look-at-providence-day-s-2025-football-schedule-01jprqcq455s',
      },
    ],
  },

  /* ----------------------------------------------------------- 1b record -- */
  record: {
    headline:
      'Four NCISAA 4A state titles in 2025–26 — the most of any 4A school in North Carolina that year.',
    subhead:
      '"State" = NCISAA (the private-school association); PD does not compete in the public-school NCHSAA.',
    seasonLabels: ["'23–24", "'24–25", "'25–26"],
    rows: [
      {
        program: 'Football',
        cells: [
          { result: 'STATE', record: '12–1' },
          { result: 'RUNNER-UP', record: '9–3' },
          { result: 'STATE', record: '13–0' },
        ],
        note: '4 titles in 5 years; first undefeated season in program history',
      },
      {
        program: 'Girls Soccer',
        cells: [
          { result: 'STATE', record: '24–1–1' },
          { result: 'STATE', toVerify: true },
          { result: 'STATE', record: '18–4–1' },
        ],
        note: 'Three-peat — strongest single program',
      },
      {
        program: 'Girls Lacrosse',
        cells: [
          { result: 'NONE' },
          { result: 'STATE', record: '20–1' },
          { result: 'STATE', record: '13–8' },
        ],
        note: "First-ever title in '25, then repeated",
      },
      {
        program: 'Girls Swimming',
        cells: [
          { result: 'NONE' },
          { result: 'NONE' },
          { result: 'STATE', record: 'meet-scored' },
        ],
        note: 'Won the 2026 D1 meet by 88 points on depth',
      },
      {
        program: 'Boys Basketball',
        cells: [
          { result: 'RUNNER-UP', record: '25–9' },
          { result: 'SEMIFINAL', record: '24–7' },
          { result: 'RUNNER-UP', record: '23–7' },
        ],
        note: 'Elite but title-less in this window',
      },
      {
        program: 'Girls Basketball',
        cells: [
          { result: 'NONE' },
          { result: 'NONE' },
          { result: 'RUNNER-UP', toVerify: true },
        ],
        note: "Lost the '26 final to Cannon (Cannon's 3rd straight)",
      },
    ],
    didNotWin:
      'boys basketball (Forsyth Country Day) · girls basketball (Cannon) · boys cross country, boys soccer & boys track (Christ School) · girls cross country, boys lacrosse & boys tennis (Durham Academy) · wrestling and both golf titles (Charlotte Latin) · field hockey & girls tennis (Charlotte Country Day) · boys swimming (Cary Academy) · baseball (Charlotte Christian) · volleyball (North Raleigh Christian).',
    bars: [
      { program: 'Football', record: '34–4', pct: 0.895 },
      { program: 'Girls Soccer', record: '42–5–2', pct: 0.878, tag: '2 OF 3 YRS' },
      { program: 'Girls Lacrosse', record: '33–9', pct: 0.786 },
      { program: 'Boys Basketball', record: '72–23', pct: 0.758 },
    ],
    seasonDetail: [
      {
        program: 'Football',
        text: '2023 12–1 (state champion) · 2024 9–3 (runner-up, lost 42–39 to Rabun Gap-Nacoochee, GA) · 2025 13–0 (champion; beat Charlotte Christian 42–6 behind three Zaid Lott touchdown passes — the first undefeated season in program history).',
      },
      {
        program: 'Boys Basketball',
        text: "'23–24 25–9 (lost the final to Christ School) · '24–25 24–7 (semifinal) · '25–26 23–7 (lost the final 69–59 to Forsyth Country Day).",
      },
      {
        program: 'Girls Soccer',
        text: '2026: beat Carmel Christian 2–1 for a third straight title, finishing 18–4–1, with Grayson Dudley scoring both goals. The 2024–25 season record is still unconfirmed.',
      },
      {
        program: 'Girls Swimming',
        text: '2026 NCISAA D1 meet: 420 points to Charlotte Country Day’s 328 — PD won just 2 of 11 events but took the meet by 88 on depth, ending Country Day’s two-year run.',
      },
    ],
    sources: [
      { label: 'HighSchoolOT — 2025–26 NCISAA champions in every sport', url: CHAMPS },
      {
        label: '2025 football final',
        url: 'https://www.highschoolot.com/story/back-on-top-providence-day-reclaims-division-i-state-title-with-win-over-rival-charlotte-christian/22257301/',
      },
      {
        label: '2026 girls soccer final',
        url: 'https://www.highschoolot.com/story/providence-day-shuts-out-carmel-christian-for-third-straight-ncisaa-4a-girls-soccer-championship/22359052/',
      },
      {
        label: '2026 girls swimming meet',
        url: 'https://www.highschoolot.com/story/ncisaa-d1-girls-swimming-and-diving-2026-championship/22319386/',
      },
    ],
  },

  /* --------------------------------------------------------- 1c pipeline -- */
  pipeline: {
    headline:
      '~39 Division I commits across the classes of 2024–26, 17 of them Power 4 — and an honest map of which sports feed which level.',
    subhead:
      'Built from the school’s official "Alumni at the Next Level" list; division and conference labels were added by the researcher from each college’s NCAA status.',
    funnel: [
      {
        label: 'Committed to college athletics',
        hint: '(all divisions)',
        count: '~72',
        width: 1,
        shade: 'pale',
      },
      { label: 'NCAA Division I', hint: '(any conference)', count: '~39', width: 0.54, shade: 'mid' },
      {
        label: 'Power 4',
        hint: '(SEC · Big Ten · ACC · Big 12)',
        count: '17',
        width: 0.24,
        shade: 'full',
      },
    ],
    funnelNote:
      'Treat the D1 tally as a floor, not a ceiling: the school’s own single-class graphic claims 31 future NCAA student-athletes across 15 sports and 24 colleges in one senior class. An offer also differs from a commitment — one elite recruit can hold 7–8 Power 4 offers but makes a single commitment. Of the 17 P4 commits, the ACC takes 8, the Big Ten 4 and the SEC 4; the Big 12 is not represented in this window.',
    sportBars: [
      { sport: 'Football', count: 15, width: 1, p4Width: 0.73 },
      { sport: 'Swimming', count: 4, width: 0.27, p4Width: 0.2 },
      { sport: 'Girls Soccer', count: 4, width: 0.27, p4Width: 0.07 },
      { sport: 'Track / XC', count: 4, width: 0.27, p4Width: 0.13 },
      { sport: 'Basketball', count: 4, width: 0.27 },
      { sport: 'Boys Lacrosse', count: 3, width: 0.2 },
      { sport: 'Field Hockey', count: 2, width: 0.13 },
      { sport: 'Other', count: 4, width: 0.27 },
    ],
    realityCheck:
      'Baseball, lacrosse, golf, tennis, softball and both basketballs send commits overwhelmingly to NCAA Division III — Denison, Hampden-Sydney, Tufts, Emory, Kenyon, Hamilton and Washington & Lee recur heavily. That pattern matches PD’s academically selective identity: for many families, a D3 offer from a top academic college is the win.',
    rankedRecruits:
      'Seven PD players made NC Football News’ 53-man consensus list for the class of 2027 (blending 247Sports, Rivals and ESPN), led by safety Robert Geathers III. Recent blue-chips: David Sanders ’25 (five-star, the No. 1 offensive tackle and No. 4 recruit nationally, to Tennessee) and Jadyn Davis ’24 (NC Mr. Football, to Michigan). PD fielded one five-star and seven four-stars in the 2025 football class alone.',
    roster: [
      { cls: "'26", name: 'Gordon Sellars', sport: 'Football', college: 'Clemson', conf: 'ACC', level: 'P4' },
      { cls: "'26", name: 'Zaid Lott', sport: 'Football', college: 'Syracuse', conf: 'ACC', level: 'P4' },
      { cls: "'26", name: 'Leo Delaney', sport: 'Football', college: 'Clemson', conf: 'ACC', level: 'P4' },
      { cls: "'26", name: 'Jacob Baggett', sport: 'Football', college: 'Michigan', conf: 'Big Ten', level: 'P4' },
      { cls: "'26", name: 'Abby Goldean', sport: 'Girls Soccer', college: 'Southern Methodist', conf: 'ACC', level: 'P4' },
      { cls: "'26", name: 'Zetta Grace Bartee', sport: 'Swimming', college: 'Auburn', conf: 'SEC', level: 'P4' },
      { cls: "'26", name: 'Quintin McCray', sport: 'Football', college: 'Richmond', conf: 'CAA', level: 'D1' },
      { cls: "'26", name: 'Brendan Ravin', sport: 'Football', college: 'Davidson', conf: 'Pioneer', level: 'D1' },
      { cls: "'26", name: 'Jaida McClure', sport: 'Girls Basketball', college: 'Appalachian State', conf: 'Sun Belt', level: 'D1' },
      { cls: "'26", name: 'Tina Garofoli', sport: 'Field Hockey', college: 'Miami (Ohio)', conf: 'MAC', level: 'D1' },
      { cls: "'26", name: 'Devin McElroy', sport: 'Girls Soccer', college: 'Miami (Ohio)', conf: 'MAC', level: 'D1' },
      { cls: "'26", name: 'Chloe Scofield', sport: 'Golf', college: 'Presbyterian', conf: 'Big South', level: 'D1' },
      { cls: "'26", name: 'Carter Martin', sport: 'Boys Lacrosse', college: 'Jacksonville', conf: 'ASUN', level: 'D1' },
      { cls: "'26", name: 'Matthew Hankins', sport: 'Football', college: 'Wingate', conf: 'SAC', level: 'D2' },
      { cls: "'26", name: 'DC Carr', sport: 'Football', college: 'Wingate', conf: 'SAC', level: 'D2' },
      { cls: "'26", name: 'Osvaldo "Deuce" Haynes', sport: 'Boys Basketball', college: 'Morehouse', conf: 'SIAC', level: 'D2' },
      { cls: "'26", name: 'Austen Graziano', sport: 'Volleyball', college: 'Belmont Abbey', conf: 'Conf. Carolinas', level: 'D2' },
      { cls: "'26", name: 'Thomas Daly', sport: 'Baseball', college: 'Denison', conf: 'NCAC', level: 'D3' },
      { cls: "'26", name: 'Aidan Scruitsky', sport: 'Boys Basketball', college: 'Hampden-Sydney', conf: 'ODAC', level: 'D3' },
      { cls: "'26", name: 'Katelyn Ramsden', sport: 'Girls Basketball', college: 'Chicago', conf: 'UAA', level: 'D3' },
      { cls: "'26", name: "Julia O'Malley", sport: 'Girls Basketball', college: 'Johns Hopkins', conf: 'Centennial', level: 'D3' },
      { cls: "'26", name: 'Mark Franco', sport: 'Football', college: 'Denison', conf: 'NCAC', level: 'D3' },
      { cls: "'26", name: 'Will Wagner', sport: 'Football', college: 'Denison', conf: 'NCAC', level: 'D3' },
      { cls: "'26", name: 'Aidan Gallos', sport: 'Football', college: 'Tufts', conf: 'NESCAC', level: 'D3' },
      { cls: "'26", name: 'William McDermott', sport: 'Boys Lacrosse', college: 'Stevenson', conf: 'MAC Commonwealth', level: 'D3' },
      { cls: "'26", name: 'Bridget Brewster', sport: 'Girls Lacrosse', college: 'Hamilton', conf: 'NESCAC', level: 'D3' },
      { cls: "'26", name: 'Ethan He', sport: 'Boys Soccer', college: 'MIT', conf: 'NEWMAC', level: 'D3' },
      { cls: "'26", name: 'Mikaela Arey', sport: 'Girls Soccer', college: 'Emory', conf: 'UAA', level: 'D3' },
      { cls: "'26", name: 'Rachel Lyons', sport: 'Softball', college: 'Kenyon', conf: 'NCAC', level: 'D3' },
      { cls: "'26", name: 'Evelyn Hee', sport: 'Track & Field', college: 'Emory', conf: 'UAA', level: 'D3' },
      { cls: "'26", name: 'Raj Das', sport: 'Track & Field', college: 'Emory', conf: 'UAA', level: 'D3' },
      { cls: "'25", name: 'David Sanders Jr.', sport: 'Football', college: 'Tennessee', conf: 'SEC', level: 'P4' },
      { cls: "'25", name: 'Cairo Skanes', sport: 'Football', college: 'Wisconsin', conf: 'Big Ten', level: 'P4' },
      { cls: "'25", name: 'Braxton Winston', sport: 'Football', college: 'Wake Forest', conf: 'ACC', level: 'P4' },
      { cls: "'25", name: 'Granger Bartee', sport: 'Swimming', college: 'North Carolina', conf: 'ACC', level: 'P4' },
      { cls: "'25", name: 'Clark Neace', sport: 'Swimming', college: 'Georgia', conf: 'SEC', level: 'P4' },
      { cls: "'25", name: 'Ian Cline', sport: 'Football', college: 'Army – West Point', conf: 'AAC', level: 'D1' },
      { cls: "'25", name: 'Trajan Thompson', sport: 'Boys Basketball', college: 'Denver', conf: 'Summit', level: 'D1' },
      { cls: "'25", name: 'Julian Johnson', sport: 'Boys Basketball', college: 'Howard', conf: 'MEAC', level: 'D1' },
      { cls: "'25", name: 'Ellie Fyans', sport: 'Girls Basketball', college: 'Western Carolina', conf: 'Southern', level: 'D1' },
      { cls: "'25", name: 'Blane McElroy', sport: 'Girls Soccer', college: 'Princeton', conf: 'Ivy', level: 'D1' },
      { cls: "'25", name: 'Aiden Ray', sport: 'Track & Field', college: 'Northeastern', conf: 'CAA', level: 'D1' },
      { cls: "'25", name: 'Mikayla Moore', sport: 'Volleyball', college: 'Tennessee State', conf: 'OVC', level: 'D1' },
      { cls: "'25", name: 'Shaurya Bharadwaj', sport: 'Boys Tennis', college: 'Pennsylvania', conf: 'Ivy', level: 'D1' },
      { cls: "'25", name: 'Jaylen Himes', sport: 'Football', college: 'Wingate', conf: 'SAC', level: 'D2' },
      { cls: "'25", name: 'Jonah Lawrence', sport: 'Boys Basketball', college: 'USC – Aiken', conf: 'Peach Belt', level: 'D2' },
      { cls: "'25", name: 'Austin Nelson', sport: 'Baseball', college: 'Rhodes', conf: 'SAA', level: 'D3' },
      { cls: "'25", name: 'Davis Dudley', sport: 'Football', college: 'Hampden-Sydney', conf: 'ODAC', level: 'D3' },
      { cls: "'25", name: 'Jack Langston', sport: 'Football', college: 'Kenyon', conf: 'NCAC', level: 'D3' },
      { cls: "'25", name: 'Jason Zawtocki', sport: 'Golf', college: 'Tufts', conf: 'NESCAC', level: 'D3' },
      { cls: "'25", name: 'Scott Thompson', sport: 'Boys Lacrosse', college: 'Hampden-Sydney', conf: 'ODAC', level: 'D3' },
      { cls: "'25", name: "Harry O'Neil", sport: 'Boys Lacrosse', college: 'Ithaca', conf: 'Liberty', level: 'D3' },
      { cls: "'25", name: 'Marlo Stuart', sport: 'Girls Lacrosse', college: 'Tufts', conf: 'NESCAC', level: 'D3' },
      { cls: "'25", name: 'Lucy Dyer', sport: 'Girls Lacrosse', college: 'Colby', conf: 'NESCAC', level: 'D3' },
      { cls: "'25", name: 'Owen Yu', sport: 'Boys Soccer', college: 'New York University', conf: 'UAA', level: 'D3' },
      { cls: "'25", name: 'Ethan Andrews', sport: 'Boys Soccer', college: 'Vassar', conf: 'Liberty', level: 'D3' },
      { cls: "'25", name: 'Will Chase', sport: 'Boys Soccer', college: 'Dean College', conf: '—', level: 'D3' },
      { cls: "'25", name: 'Emma Grace Sachar', sport: 'Swimming', college: 'Hamilton', conf: 'NESCAC', level: 'D3' },
      { cls: "'25", name: 'Tejus Ranadive', sport: 'Boys Tennis', college: 'Hobart & William Smith', conf: 'Liberty', level: 'D3' },
      { cls: "'25", name: 'Renat Kramin', sport: 'Boys Tennis', college: 'Stevens Inst. of Tech.', conf: 'MAC Freedom', level: 'D3' },
      { cls: "'25", name: 'Austin Skeete', sport: 'Track & Field', college: 'Rochester', conf: 'Liberty', level: 'D3' },
      { cls: "'24", name: 'Brody Barnhardt', sport: 'Football', college: 'NC State', conf: 'ACC', level: 'P4' },
      { cls: "'24", name: 'Jordan Shipp', sport: 'Football', college: 'North Carolina', conf: 'ACC', level: 'P4' },
      { cls: "'24", name: 'Channing Goodwin', sport: 'Football', college: 'Michigan', conf: 'Big Ten', level: 'P4' },
      { cls: "'24", name: 'Jadyn Davis', sport: 'Football', college: 'Michigan', conf: 'Big Ten', level: 'P4' },
      { cls: "'24", name: 'Nia Poole', sport: 'Track & Field', college: 'NC State', conf: 'ACC', level: 'P4' },
      { cls: "'24", name: 'Zach Makemson', sport: 'Track & Field', college: 'Tennessee', conf: 'SEC', level: 'P4' },
      { cls: "'24", name: 'Chase Jackson', sport: 'Baseball', college: 'Gardner-Webb', conf: 'Big South', level: 'D1' },
      { cls: "'24", name: 'Morgan Boonshaft', sport: 'Girls Cross Country', college: 'Brown', conf: 'Ivy', level: 'D1' },
      { cls: "'24", name: 'Elle Louise Kocmond', sport: 'Field Hockey', college: 'UC Davis', conf: 'Big West', level: 'D1' },
      { cls: "'24", name: 'Kyle Van Dam', sport: 'Boys Lacrosse', college: 'Colgate', conf: 'Patriot', level: 'D1' },
      { cls: "'24", name: 'Alex Jessey', sport: 'Boys Lacrosse', college: 'Dartmouth', conf: 'Ivy', level: 'D1' },
      { cls: "'24", name: 'KK Hart', sport: 'Girls Soccer', college: 'Tulsa', conf: 'American', level: 'D1' },
      { cls: "'24", name: 'Davis Dunham', sport: 'Swimming', college: 'Georgetown', conf: 'Big East', level: 'D1' },
      { cls: "'24", name: 'Kashe Smith', sport: 'Track & Field', college: 'Wingate', conf: 'SAC', level: 'D2' },
      { cls: "'24", name: 'Jordan Appling', sport: 'Boys Basketball', college: 'Johnson & Wales', conf: 'GNAC', level: 'D3' },
      { cls: "'24", name: 'Sophie Levine', sport: 'Girls Basketball', college: 'Franklin & Marshall', conf: 'Centennial', level: 'D3' },
      { cls: "'24", name: 'Sophie Powell', sport: 'Girls Cross Country', college: 'Emory', conf: 'UAA', level: 'D3' },
      { cls: "'24", name: 'Reese Ziegler', sport: 'Field Hockey', college: 'Connecticut College', conf: 'NESCAC', level: 'D3' },
      { cls: "'24", name: 'Gracie Kaspar', sport: 'Field Hockey', college: 'Washington & Lee', conf: 'ODAC', level: 'D3' },
      { cls: "'24", name: 'Kenna White', sport: 'Field Hockey', college: 'Hamilton', conf: 'NESCAC', level: 'D3' },
      { cls: "'24", name: 'Lukas "Thor" Santwier', sport: 'Football', college: 'Hampden-Sydney', conf: 'ODAC', level: 'D3' },
      { cls: "'24", name: 'George Hinton', sport: 'Golf', college: 'Bates', conf: 'NESCAC', level: 'D3' },
      { cls: "'24", name: 'Liam Hedinger', sport: 'Boys Soccer', college: 'Gettysburg', conf: 'Centennial', level: 'D3' },
      { cls: "'24", name: 'Joe Henry Teates', sport: 'Track & Field', college: 'Denison', conf: 'NCAC', level: 'D3' },
      { cls: "'24", name: 'Brandon Ackermann', sport: 'Girls Tennis', college: 'Kenyon', conf: 'NCAC', level: 'D3' },
    ],
    rosterNote:
      'Level labels (P4 / D1 / D2 / D3) and conferences were added by the researcher from each college’s NCAA status — they are not on the school’s list. P4 = SEC · Big Ten · ACC · Big 12.',
    sources: [
      { label: 'pdschargers.com — Alumni at the Next Level', url: NEXT_LEVEL },
      {
        label: 'NC Football News — 2027 consensus rankings',
        url: 'https://ncfootballnews.com/north-carolina-2027-football-recruiting-consensus-rankings-may-2026-update/',
      },
      { label: '247Sports — David Sanders', url: 'https://247sports.com/player/david-sanders-46118364/' },
    ],
  },

  /* ----------------------------------------------------------- 1d honors -- */
  honors: {
    headline:
      'Four verified pros — an NFL top-10 pick, two NBA players and a Team USA Olympian — atop an NC-record run of Gatorade Players of the Year.',
    subhead:
      'Every name individually verified; PD does not maintain a single pro-alumni tracker.',
    pros: [
      {
        kicker: "NFL · Class of '19",
        name: 'Ikem Ekwonu',
        detail:
          '#6 overall pick in the 2022 NFL Draft. Unanimous All-American and ACC Jacobs Blocking Trophy winner at NC State; the Panthers exercised his fifth-year option in 2025.',
        path: 'PD → NC State → Carolina Panthers',
      },
      {
        kicker: "NBA · Class of '16",
        name: 'Grant Williams',
        detail:
          '2019 first-round pick; reached the 2022 NBA Finals with Boston and was elected First Vice President of the NBA Players Association.',
        path: 'PD → Tennessee → Celtics / Mavericks / Hornets',
      },
      {
        kicker: "NBA + intl · Class of '18",
        name: 'Devon Dotson',
        detail:
          "PD's all-time leading scorer with 2,607 points; led the Big 12 in scoring at Kansas and was a 2018 McDonald's All-American.",
        path: 'PD → Kansas → Bulls / Wizards → Europe',
      },
      {
        kicker: "Olympics · Class of '16",
        name: 'Anna Cockrell',
        detail:
          '400m hurdler for Team USA, competing at the Paris Games after an All-American career at USC.',
        path: 'PD → USC → Team USA',
      },
    ],
    honors: [
      {
        label: 'Gatorade Players of the Year',
        text: 'Girls basketball holds an NC-record seven, four of them in five years (2012–2016). Recent winners: Jadyn Davis (football, 2022), David Sanders (football, 2023) and Blane McElroy (girls soccer).',
        tag: 'Statewide, 1 per sport',
      },
      {
        label: "McDonald's All-Americans",
        text: "Three — Jatarie White '14 and Janelle Bailey '17 (girls basketball), Devon Dotson '18 (boys). Only about 24 boys and 24 girls are selected nationally each year.",
        tag: 'National top-tier',
      },
      {
        label: 'NC Mr. Football + All-Americans',
        text: 'Jadyn Davis — 2022 NC Mr. Football and MaxPreps NC Player of the Year. David Sanders — MaxPreps All-American and a Mr. Football finalist who did not allow a sack as a senior.',
        tag: 'Statewide + national',
      },
      {
        label: 'Conference & all-state',
        text: 'CISAA Players of the Year 2026: Abby Goldean and Trevor Yancey. NCISAA All-State selections across fall, winter and spring 2025–26.',
        tag: 'League level',
        tagStyle: 'outline',
      },
      {
        label: 'PD ESPYs (in-house)',
        text: 'Annual internal awards for Athletes, Coaches, Academic Athletes and Impact Athletes of the Year. 2026: Jane Updyke & Aidan Gallos (Athletes), Kristina Bond & Chad Grier (Coaches) — both athletes having delivered in their title games.',
        tag: 'School culture signal',
        tagStyle: 'outline',
      },
    ],
    sources: [
      { label: 'pdschargers.com — Honors & Hall of Fame', url: NEXT_LEVEL },
      { label: 'Wikipedia — Ikem Ekwonu', url: 'https://en.wikipedia.org/wiki/Ikem_Ekwonu' },
      {
        label: 'Panthers.com — fifth-year option',
        url: 'https://www.panthers.com/news/panthers-to-pick-up-fifth-year-option-on-ikem-ekwonu',
      },
      { label: 'Wikipedia — Devon Dotson', url: 'https://en.wikipedia.org/wiki/Devon_Dotson' },
    ],
  },

  /* --------------------------------------------------------- 1e coaching -- */
  coaching: {
    headline:
      'A marquee external hire (Grier), a homegrown Hall-of-Famer (Hovis), and an NBA champion volunteering on the bench (Battier).',
    subhead: 'Athletic Director: Nancy Beatty. A deliberate mix of prestige and stability.',
    featured: [
      {
        kicker: 'The pedigree hire · Football, since 2020',
        name: 'Chad Grier',
        stats: [
          { value: '147–26', label: 'career record, 15 seasons' },
          { value: '8', label: 'state titles — 3rd-most in NC history' },
          { value: '#1', label: 'win % in NC, coaches with 100+ games' },
        ],
        detail:
          'QB-developer reputation: coached his son Will Grier (NFL), Sam Hartman (most TD passes in ACC history) and Jadyn Davis (Mr. Football). Every starting QB across 12+ years has gone on to play college football. Built Davidson Day from scratch (64–9, four titles in six years), then turned around Oceanside Collegiate in South Carolina. Stated reason for staying: raising his youngest son near family.',
      },
      {
        kicker: 'The continuity anchor · XC / Track, since 2002',
        name: 'Ben Hovis',
        stats: [
          { value: '24 yrs', label: "leading the program — PD alum, Class of '96" },
          { value: 'HOF', label: 'NC Track & Field / XC Hall of Fame' },
          { value: '20', label: 'consecutive CISAA XC titles, 2000–20' },
        ],
        detail:
          'A former PD runner who took over from the founding coach and built a perennial power — 2023 Charlotte Observer Boys Track Coach of the Year, having won a fourth straight state title (nine of the prior ten).',
      },
    ],
    tenure: [
      { name: 'Ben Hovis', role: 'Cross Country / Track', width: 1, since: 'since 2002' },
      { name: 'C.D. Cater', role: 'Football QBs · Game Day Coordinator', width: 0.62, since: 'since 2011' },
      { name: 'Chad Grier', role: 'Football · Asst. AD Facilities', width: 0.25, since: 'since 2020' },
      { name: 'Evan Gates', role: 'Strength & Conditioning (lead)', width: 0.17, since: 'since 2022' },
      { name: 'Jonathan McIntyre', role: 'Boys Basketball — 19 yrs as assistant', width: 0.08, since: 'head coach 2026' },
      { name: 'Josh Springer', role: 'Girls Basketball', width: 0.5, since: 'long-tenured', toVerify: true },
      { name: 'Kristina Bond', role: "Swimming — '26 girls state title", width: 0.17, since: 'tenure', toVerify: true },
      { name: 'Dan Dudley', role: 'Girls Soccer — 3 straight state titles', width: 0.17, since: 'tenure', toVerify: true },
    ],
    worthKnowing:
      'boys basketball’s staff includes Shane Battier — Duke national champion, 13-year NBA veteran and two-time NBA champion — as an assistant coach; his son Zeke plays for the Chargers. Also on staff is Brian Field, the former PD head coach who led the 2016 state title team to the national tournament in New York.',
    sources: [
      { label: 'pdschargers.com Athletics Directory', url: PDS },
      { label: 'G7 Football — Chad Grier bio', url: 'https://www.g7football.com/copy-of-mission-statement' },
      {
        label: 'WBTV — Grier hire',
        url: 'https://www.wbtv.com/2020/03/21/chad-grier-comes-home-become-head-football-coach-providence-day/',
      },
      {
        label: 'pdschargers.com — McIntyre appointment & staff',
        url: 'https://www.pdschargers.com/coach-jonathan-mcintyre-named-interim-head-coach-of-varsity-boys-basketball/',
      },
    ],
  },

  /* ------------------------------------------------------- 1f facilities -- */
  facilities: {
    headline:
      'Two weight rooms the program calls "two of the very best in the nation," a 2012 stadium, and an in-house medical staff of three certified trainers plus a team physician.',
    subhead: 'Facilities build the athlete; the care model keeps them on the field.',
    photos: [
      {
        src: '/facilities/providence-day-overcash-stadium.jpg',
        name: 'Overcash Stadium',
        meta: 'built 2012–13',
        caption:
          'Mosack Field (football / soccer / lacrosse) plus the Compton Track; the Field House holds the Sports Weight Room',
        credit: 'Photo: Providence Day School athletics',
      },
      {
        src: '/facilities/providence-day-mosack-athletic-center.jpg',
        name: 'Mosack Athletic Center',
        meta: '53,000 sq ft, 2001',
        caption: 'Main basketball venue; houses the Wellness Center, dance studio and golf simulator',
        credit: 'Photo: Providence Day School athletics',
      },
      {
        src: '/facilities/providence-day-wellness-center.jpg',
        name: 'MAC Wellness Center',
        meta: 'remodeled Spring 2026',
        caption: '10 custom power racks, 6 digital rowers, dumbbells to 100 lb',
        credit: 'Photo: Providence Day School athletics',
      },
    ],
    venues: [
      { name: 'Murdock Baseball Field', detail: 'natural grass, covered batting cage' },
      { name: 'Softball Facility', detail: 'natural grass, cage + bullpens' },
      { name: 'Tennis Complex', detail: 'eight championship hard courts' },
      { name: 'PD Upper Field', detail: 'MS, lacrosse, field hockey, soccer' },
      { name: 'PD Wrestling Room', detail: 'dedicated space' },
      { name: 'Sports Weight Room', detail: 'Overcash Field House — 2nd S&C space' },
    ],
    broadcast:
      'Hudl TV live streams, the PD Sports Network on YouTube, a Bahakel Sports partnership (PD–Charlotte Christian has been its Game of the Week), GoFan ticketing, and a dedicated Sports Information Director.',
    care: [
      {
        label: 'Athletic trainers',
        text: '3 licensed & nationally certified — Carlie Murray (head), Jacqui Frithsen, David Montes',
      },
      {
        label: 'Team physician',
        text: 'Dr. Shadley Schiffern — no hospital-system partnership; care is delivered in-house',
      },
      {
        label: 'Concussions',
        text: 'SCAT + King-Devick baselines for grades 7–12; Gfeller-Waller Act return-to-play protocol',
      },
      {
        label: 'S&C staff',
        text: '2 full-time CSCS coaches (Evan Gates, Tim Mansfield) — year-round, all sports',
      },
      {
        label: 'Recognition',
        text: '2020 National Safe Sports School 1st Team; 5-year Strength of America Award; training room "comparable to most college facilities"',
      },
    ],
    careNote:
      'Context: CMS public schools partner with Atrium Health and Charlotte Country Day uses OrthoCarolina. PD’s fully in-house model is the differentiator to probe on a tour. Seating capacities are not published for any PD venue.',
    sources: [
      {
        label: 'pdschargers.com — Athletic Facilities',
        url: 'https://www.pdschargers.com/athletic-facilities/',
      },
      {
        label: 'Wellness Center & Sports Weight Room',
        url: 'https://pdschargers.com/wellness-center-sports-weight-room/',
      },
      {
        label: 'Athletic Training & Magnus Health',
        url: 'https://www.pdschargers.com/more/athletic-training-magnus-health/',
      },
    ],
  },

  /* -------------------------------------------------------- 1g national -- */
  national: {
    headline:
      'MaxPreps ranked PD #1 in North Carolina across all classifications — and for a full year its athletes could sign NIL deals while public-school rivals legally could not.',
    subhead: 'Grier’s stated goal: "the epicenter of high school football… and beyond."',
    stats: [
      { value: '#1 in NC', label: "MaxPreps '24 preseason, all classifications" },
      { value: '#65', label: 'MaxPreps national rank, 2025–26' },
      { value: '13–0', label: 'first undefeated season, 2025' },
      { value: '5 straight', label: 'NCISAA D-I state finals, 2021–25' },
    ],
    scheduleTitle: 'The deliberately national schedule — 2025',
    schedule: [
      { opponent: 'Roman Catholic (PA)', detail: 'Pennsylvania powerhouse; PIAA 5A finalist' },
      { opponent: 'Rabun Gap (GA)', detail: "National-power boarding school; beat PD twice in '24" },
      { opponent: 'Rolesville (NC 4A)', detail: '14–2 public-school state finalist the prior year' },
      {
        opponent: 'Butler · Charlotte Catholic',
        detail: 'Charlotte-area public powers, sought out rather than avoided',
      },
    ],
    scheduleNote:
      'Scheduling up is the tell of a program chasing national recognition — it also means a harder week-to-week slate for your athlete. Note the tension: PD went 13–0 and won state in 2025 yet MaxPreps still ranked it #3 in NC, because the algorithm weights strength of schedule against large public programs.',
    nil: [
      {
        date: 'May 2023',
        text: 'NCHSAA approves public-school NIL; the legislature intervenes and blocks it.',
      },
      { date: 'June 2024', text: 'The State Board of Education bans public-school NIL outright.' },
      {
        date: '2024–25',
        text: "NCISAA's NIL policy takes effect. For roughly a full year, private-school athletes can sign while public-school rivals cannot — On3 named PD's David Sanders as the direct beneficiary, and he signed with WME Sports and released his own merchandise line.",
        highlight: true,
        tag: "PD'S WINDOW",
      },
      {
        date: 'July 1, 2025',
        text: 'Public-school NIL becomes legal and the field levels. NCISAA deals still require state-office approval and must stay separate from school branding.',
      },
    ],
    sources: [
      {
        label: 'MaxPreps — PD football rankings',
        url: 'https://www.maxpreps.com/nc/charlotte/providence-day-chargers/football/rankings/',
      },
      {
        label: 'HighSchoolOT — NCISAA adopts NIL',
        url: 'https://www.highschoolot.com/story/private-schools-in-ncisaa-adopt-nil-policy-for-next-school-year/21265297/',
      },
      {
        label: 'HighSchoolOT — State Board bans public-school NIL',
        url: 'https://www.highschoolot.com/story/state-board-of-education-bans-athletes-at-public-nc-high-schools-from-profiting-off-nil/21478959/',
      },
      {
        label: 'SBLive — 2025 schedule analysis',
        url: 'https://www.si.com/high-school/north-carolina/a-closer-look-at-providence-day-s-2025-football-schedule-01jprqcq455s',
      },
    ],
  },
}
