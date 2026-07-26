// Cannon School — Sports research area.
//
// Every figure is traceable to
// source-material/sports/cannon/Cannon - Sports - Redesign Research 2026.md.
//
// SIX of seven cards render. `national` (1g) is deliberately omitted: research
// confirmed two negatives rather than gaps — no MaxPreps/ESPN/SBLive NATIONAL
// team ranking exists for any Cannon program in any year, and no named Cannon
// athlete NIL deal is publicly disclosed. Cannon's basketball schedule is
// regionally, not nationally, constructed. Rendering a National Stage & NIL
// card here would imply a national profile the evidence does not support.

import type { SportsProgram } from '../sportsProgram.ts'

const ATHLETICS = 'https://athletics.cannonschool.org/'
const CHAMPS_26 =
  'https://www.highschoolot.com/story/the-2025-26-ncisaa-team-state-champions-in-every-sport/22322092/'

export const cannon: SportsProgram = {
  /* ---------------------------------------------------------- 1a offered -- */
  offered: {
    headline: '47 teams across 13 sports, serving more than 300 student-athletes.',
    subhead:
      'Middle School teams begin in grade 7, and 8th-graders do reach varsity — an eighth-grader scored 12 points in the 2026 state final.',
    stats: [
      { value: '21', label: 'varsity programs' },
      { value: '47', label: 'teams across V · JV · MS' },
      { value: '300+', label: 'student-athletes' },
      { value: 'NCISAA', label: '4A state · CISAA conference' },
    ],
    seasons: [
      {
        name: 'Fall',
        note: '7 varsity',
        sports: [
          { name: 'Football', levels: ['V', 'JV', 'MS'] },
          { name: 'Soccer (Boys)', levels: ['V', 'JV', 'MS'] },
          { name: 'Volleyball (Girls)', levels: ['V', 'JV', 'MS'] },
          { name: 'Tennis (Girls)', levels: ['V', 'JV', 'MS'] },
          { name: 'Cross Country (B & G)', levels: ['V', 'MS'] },
          { name: 'Golf (Girls)', levels: ['V'] },
          { name: 'Cheerleading', levels: ['V', 'MS'] },
        ],
      },
      {
        name: 'Winter',
        note: '5 varsity',
        sports: [
          { name: 'Basketball (Boys)', levels: ['V', 'JV', 'MS'] },
          { name: 'Basketball (Girls)', levels: ['V', 'JV', 'MS'] },
          { name: 'Swimming (B & G)', levels: ['V', 'MS'] },
          { name: 'Wrestling', levels: ['V', 'MS'] },
          { name: 'Cheerleading (Winter)', levels: ['V', 'MS'] },
        ],
      },
      {
        name: 'Spring',
        note: '8 varsity',
        sports: [
          { name: 'Baseball', levels: ['V', 'MS'] },
          { name: 'Softball', levels: ['V', 'MS'] },
          { name: 'Lacrosse (Boys)', levels: ['V', 'MS'] },
          { name: 'Lacrosse (Girls)', levels: ['V', 'MS'] },
          { name: 'Soccer (Girls)', levels: ['V', 'JV', 'MS'] },
          { name: 'Tennis (Boys)', levels: ['V', 'JV', 'MS'] },
          { name: 'Track & Field (B & G)', levels: ['V', 'MS'] },
          { name: 'Golf (Boys)', levels: ['V', 'MS'] },
        ],
      },
    ],
    footnote:
      'Middle School basketball splits into Maroon and Gold squads to widen participation. The "47 teams" figure is the school’s own count; enumerating the published teams list yields roughly 45–50 depending on how co-ed Middle School teams are counted. Cannon has no on-campus pool — the swim team’s home venue is not published.',
    sources: [
      { label: 'athletics.cannonschool.org — teams list', url: 'https://athletics.cannonschool.org/teams/teams-list' },
      { label: 'Cannon Athletics', url: ATHLETICS },
    ],
  },

  /* ----------------------------------------------------------- 1b record -- */
  record: {
    headline:
      'Three straight NCISAA 4A girls basketball state championships — four titles in six years, and the state’s dominant girls program.',
    subhead:
      'Cannon also won three titles in 2023–24 alone: girls basketball, volleyball and boys lacrosse.',
    seasonLabels: ["'23–24", "'24–25", "'25–26"],
    rows: [
      {
        program: 'Girls Basketball',
        cells: [
          { result: 'STATE', record: '23–7' },
          { result: 'STATE', record: '26–7' },
          { result: 'STATE', record: '25–6' },
        ],
        note: 'Three-peat; beat Providence Day in both the 2024 and 2026 finals',
      },
      {
        program: 'Volleyball',
        cells: [
          { result: 'STATE', record: '23–2' },
          { result: 'NONE' },
          { result: 'NONE' },
        ],
        note: "Ended North Raleigh Christian's 8-year reign, 3–0",
      },
      {
        program: 'Boys Lacrosse',
        cells: [
          { result: 'STATE', record: '19–3' },
          { result: 'NONE' },
          { result: 'NONE' },
        ],
        note: 'Beat Providence Day 8–7; No. 1 in the final statewide top 25',
      },
      {
        program: 'Baseball',
        cells: [
          { result: 'NONE' },
          { result: 'NONE' },
          { result: 'RUNNER-UP', record: 'swept 7–5, 9–5' },
        ],
        note: 'Lost the D1 series to Covenant Day',
      },
      {
        program: 'Boys Basketball',
        cells: [
          { result: 'NONE' },
          { result: 'NONE', record: '15–12' },
          { result: 'NONE', record: '16–13' },
        ],
        note: 'Second in CISAA at 8–2; lost the 4A quarterfinal at Carmel Christian',
      },
      {
        program: 'Football',
        cells: [
          { result: 'NONE' },
          { result: 'NONE' },
          { result: 'NONE' },
        ],
        note: 'Playoff 2nd round; beat Charlotte Latin 40–21, lost to Providence Day',
      },
    ],
    didNotWin:
      'football, girls soccer, girls lacrosse and girls swimming (Providence Day) · boys basketball (Forsyth Country Day) · baseball, in the D1 series (Covenant Day) · volleyball (North Raleigh Christian) · both golf titles and wrestling (Charlotte Latin) · girls tennis and field hockey (Charlotte Country Day) · boys soccer, boys XC and boys track (Christ School) · boys lacrosse, boys tennis, girls XC and girls track (Durham Academy).',
    bars: [
      { program: 'Volleyball', record: '23–2', pct: 0.92, tag: "'23–24" },
      { program: 'Boys Lacrosse', record: '19–3', pct: 0.864, tag: "'23–24" },
      { program: 'Girls Basketball', record: '74–20', pct: 0.787 },
      { program: 'Boys Basketball', record: '31–25', pct: 0.554, tag: '2 YRS' },
    ],
    seasonDetail: [
      {
        program: 'Girls Basketball',
        text: '2024 beat Providence Day 62–51 · 2025 beat Wesleyan Christian 71–55 · 2026 beat Providence Day 47–37, with eighth-grader London Truesdale scoring 12. Four NCISAA 4A titles in six years (2021, 2024, 2025, 2026).',
      },
      {
        program: 'Volleyball',
        text: '2023: 23–2, sweeping North Raleigh Christian 25–21, 25–18, 25–23 to end an eight-year title reign. Both losses came to Davidson Day (the 2A champion) and Hoggard, a 2,000-student public school.',
      },
      {
        program: 'Boys Lacrosse',
        text: '2024: 19–3 and the NCISAA D1 title over Providence Day 8–7, finishing No. 1 in HighSchoolOT’s final statewide top 25 with six wins over top-10 finishers.',
      },
    ],
    sources: [
      { label: 'HighSchoolOT — 2025–26 NCISAA champions', url: CHAMPS_26 },
      {
        label: '2026 girls basketball final',
        url: 'https://www.highschoolot.com/story/cannon-school-girls-basketball-wins-ncisaa-state-championship-against-providence-day/22329610/',
      },
      {
        label: '2023–24 NCISAA champions',
        url: 'https://www.highschoolot.com/story/the-2023-24-ncisaa-team-state-champions-in-every-sport/21461689/',
      },
      {
        label: '2024 volleyball title',
        url: 'https://www.highschoolot.com/story/cannon-school-dethrones-north-raleigh-christian-in-ncisaa-4a-volleyball-title-ends-8-year-reign/21144814/',
      },
    ],
  },

  /* --------------------------------------------------------- 1c pipeline -- */
  pipeline: {
    headline:
      'A documented floor of six college commitments across 2024–26, three of them Division I — but Cannon publishes no consolidated signing list.',
    subhead:
      'This is the most honest number available, not a census: the school’s athletics news portal renders client-side with no indexable article text, so classes of 2024 and 2026 are almost certainly undercounted.',
    funnel: [
      {
        label: 'Committed to college athletics',
        hint: '(all divisions, documented)',
        count: '6',
        width: 1,
        shade: 'pale',
        toVerify: true,
      },
      { label: 'NCAA Division I', hint: '(any conference)', count: '3', width: 0.5, shade: 'mid' },
      {
        label: 'Power 4',
        hint: '(SEC · Big Ten · ACC · Big 12)',
        count: '1',
        width: 0.17,
        shade: 'full',
      },
    ],
    funnelNote:
      'Treat every figure on this card as a floor. Unlike its CISAA peers, Cannon does not publish an "alumni at the next level" roster, so these names come from a regional signing-day roundup rather than the school. The recruiting story here is better told by its ranked underclassmen than by its commit count.',
    sportBars: [
      { sport: 'Swimming', count: 1, width: 0.34, p4Width: 0.34 },
      { sport: 'Girls Basketball', count: 1, width: 0.34 },
      { sport: 'Volleyball', count: 1, width: 0.34 },
    ],
    realityCheck:
      'With only six documented commitments, the by-sport split is too thin to read as a pattern. What is visible: the single Power 4 commit is a swimmer, not a basketball player, despite basketball being the school’s flagship — a reminder that title-winning programs and recruiting pipelines are not the same thing.',
    rankedRecruits:
      'Cannon’s strongest recruiting signal is its underclassmen. JaKaila Gaskin (’28, 6\'3" center) is ranked No. 30 nationally by Prep Girls Hoops and No. 3 in NC for her class, a four-star with a USA Basketball profile and offers from Ohio State, Tennessee, Alabama, Auburn, Florida and Louisville. Brooke Busby (’27) has committed to Princeton. Earlier: Jaden Bradley was a five-star, No. 18 nationally, and Reigan Richardson ’21 was a McDonald’s All-American.',
    roster: [
      { cls: "'25", name: 'John Kroll', sport: 'Swimming', college: 'Notre Dame', conf: 'ACC', level: 'P4' },
      { cls: "'25", name: 'Maya McCorkle', sport: 'Girls Basketball', college: 'East Tennessee State', conf: 'Southern', level: 'D1' },
      { cls: "'25", name: 'Maria Nix', sport: 'Volleyball', college: 'Butler', conf: 'Big East', level: 'D1' },
      { cls: "'25", name: 'Khloe Thompson', sport: 'Girls Basketball', college: 'Winston-Salem State', conf: 'CIAA', level: 'D2' },
      { cls: "'25", name: 'Ari Lopez', sport: 'Not published', college: 'Tampa', conf: 'SSC', level: 'D2' },
      { cls: "'25", name: 'Lily Wittgraefe', sport: 'Not published', college: 'Hobart & William Smith', conf: 'Liberty', level: 'D3' },
      { cls: "'27", name: 'Brooke Busby', sport: 'Girls Basketball', college: 'Princeton', conf: 'Ivy', level: 'D1' },
    ],
    rosterNote:
      'Brooke Busby is Class of 2027 and is listed here because her commitment is already public. Level labels and conferences were added by the researcher from each college’s NCAA status. Two athletes’ sports are not published in the source roundup and are marked as such rather than guessed.',
    sources: [
      {
        label: 'Charlotte-area signing day roundup',
        url: 'https://sports.yahoo.com/national-signing-day-where-charlotte-111500448.html',
      },
      { label: 'Prep Girls Hoops — JaKaila Gaskin', url: 'https://prepgirlshoops.com/player/jakaila-gaskin/' },
      { label: 'Prep Girls Hoops — Brooke Busby', url: 'https://prepgirlshoops.com/player/brooke-busby/' },
    ],
  },

  /* ----------------------------------------------------------- 1d honors -- */
  honors: {
    headline:
      'A Daytona 500 winner, a PGA Tour golfer, an NBA three-point champion and a trophy-winning pro footballer — an unusually wide set of professional paths.',
    subhead:
      'Cannon’s pro alumni run well beyond the traditional stick-and-ball sports, into NASCAR and professional golf.',
    pros: [
      {
        kicker: "NASCAR · Class of '17",
        name: 'Austin Cindric',
        detail:
          '2022 Daytona 500 winner — the first rookie ever to win it — and the 2020 Xfinity Series champion. He graduated from Cannon and raced a Truck Series event at Charlotte the same day.',
        path: 'Cannon → Team Penske No. 2 Ford',
      },
      {
        kicker: "NBA + intl · Class of '10",
        name: 'Jarell Eddie',
        detail:
          "Cannon's all-time leading scorer with 2,600 points. Played for the Wizards, Suns, Celtics and Bulls, won the 2015 NBA D-League Three-Point Contest, and has since played in France, Spain, Turkey and Romania.",
        path: 'Cannon → Virginia Tech → NBA → Europe',
      },
      {
        kicker: "PGA Tour · Class of '15",
        name: 'Will Gordon',
        detail:
          '2019 SEC Player of the Year and a first-team All-American at Vanderbilt; turned pro in 2019 and holds a 2026 PGA Tour card. A U.S. Amateur quarterfinalist in 2018.',
        path: 'Cannon → Vanderbilt → PGA Tour',
      },
      {
        kicker: "Pro soccer · Class of '12",
        name: 'Vicky Bruce',
        detail:
          'Won the 2012 NCAA College Cup at UNC, then league titles in Denmark and England. The first-ever signing for Carolina Ascent FC, winning the 2024–25 USL Super League Players’ Shield.',
        path: 'Cannon → UNC / Davidson → Europe → Carolina Ascent',
      },
    ],
    honors: [
      {
        label: 'Gatorade Player of the Year',
        text: 'Jaden Bradley won the 2020 NC Gatorade Player of the Year in boys basketball as a Cannon sophomore, averaging 23.1 points, 6.4 rebounds and 6.1 assists.',
        tag: 'Statewide, 1 per sport',
      },
      {
        label: "McDonald's All-American",
        text: "Reigan Richardson (2021) earned the honor at Cannon before going to Duke. Jaden Bradley was also a McDonald's All-American, but earned it at IMG Academy after leaving Cannon.",
        tag: 'National top-tier',
      },
      {
        label: '2026 all-state, girls basketball',
        text: 'Two first-team selections — Brooke Busby (10.5 ppg, 61 three-pointers, Princeton commit) and JaKaila Gaskin (14.0 ppg, 9.2 rpg as a sophomore).',
        tag: 'Statewide',
      },
      {
        label: 'CISAA Player of the Year',
        text: 'Four consecutive Cannon boys basketball players have won it, most recently Austin Swartz as a unanimous selection. The three prior winners are not named in public sources.',
        tag: 'League level',
        tagStyle: 'outline',
      },
      {
        label: 'Athletics Hall of Fame',
        text: 'Inaugural 2020 class included Vicky Bruce, Jarell Eddie, Will Gordon, Krista Gross and Anna Redding. The 2025 class added Drew Balsbough, Gabby Holloway, Trey Hoover and two championship golf teams.',
        tag: 'School culture signal',
        tagStyle: 'outline',
      },
    ],
    sources: [
      { label: 'Cannon Athletics Hall of Fame', url: 'https://athletics.cannonschool.org/athletics-hall-of-fame' },
      { label: 'Wikipedia — Austin Cindric', url: 'https://en.wikipedia.org/wiki/Austin_Cindric' },
      { label: 'PGA Tour — Will Gordon', url: 'https://www.pgatour.com/player/56762/will-gordon/bio' },
      { label: 'Wikipedia — Vicky Bruce', url: 'https://en.wikipedia.org/wiki/Vicky_Bruce' },
    ],
  },

  /* --------------------------------------------------------- 1e coaching -- */
  coaching: {
    headline:
      'A 500-win college head coach running boys basketball, and the girls dynasty built by his own former player.',
    subhead:
      'Athletic Director: Chris Satterfield. Cannon’s continuity anchor and its marquee hire are former player and coach, now colleagues.',
    featured: [
      {
        kicker: 'The pedigree hire · Boys Basketball, since 2024',
        name: 'Jim Baker',
        stats: [
          { value: '500+', label: 'career wins — 344 college, 156 high school' },
          { value: '20 yrs', label: 'head coach at Catawba College, 344–236' },
          { value: '95–1', label: 'at Central Cabarrus, 2021–24' },
        ],
        detail:
          'Twenty seasons as an NCAA head coach at Catawba — six SAC regular-season titles, six conference tournament titles and nine NCAA regional appearances — then back-to-back NCHSAA 3A state championships at Central Cabarrus with a 65-game winning streak. Very few high schools at any level hire a coach with a two-decade college head-coaching record. His 500th win came in January 2026.',
      },
      {
        kicker: 'The continuity anchor · Girls Basketball, 11 seasons',
        name: 'Kelvin Drakeford',
        stats: [
          { value: '4', label: 'state titles in six years' },
          { value: '3', label: 'consecutive championships, 2024–26' },
          { value: "'08", label: 'Cannon alumnus and former Cougar' },
        ],
        detail:
          'A Cannon graduate who played college basketball at Catawba under Jim Baker, then returned to his old school — five seasons in the boys program before taking the girls job in 2015–16. He led Cannon to its first-ever girls basketball state title in 2021 and has since built the state’s dominant 4A program. He also teaches Lower School PE.',
      },
    ],
    tenure: [
      { name: 'Chris Satterfield', role: 'Director of Athletics', width: 1, since: '15+ years' },
      { name: 'Shawn Powell', role: 'Director of Sports Performance', width: 0.8, since: 'since 2014' },
      { name: 'Kelvin Drakeford', role: 'Girls Basketball', width: 0.73, since: 'since 2015' },
      { name: 'Kevin Steuer', role: 'Associate Athletic Director', width: 0.27, since: 'since 2022' },
      { name: 'Geoff Rosser', role: 'Volleyball', width: 0.15, since: 'since 2024' },
      { name: 'Jim Baker', role: 'Boys Basketball', width: 0.13, since: 'since 2024' },
      { name: 'Jamaal Birch', role: 'Football Program Director', width: 0.08, since: 'since 2025' },
    ],
    worthKnowing:
      'the football staff includes Haruki Nakamura as safeties coach — a former NFL safety who played for the Baltimore Ravens and Carolina Panthers. Head coach Jamaal Birch arrived in 2025 from Providence Day, First Baptist School of Charleston and Oceanside Collegiate, where he was part of back-to-back state championships and coached six wide receivers to Division I scholarships.',
    sources: [
      { label: 'Cannon Athletics leadership', url: ATHLETICS },
      {
        label: 'Cannon — Q&A with Coach Jim Baker on 500 wins',
        url: 'https://www.cannonschool.org/news-and-stories/in-the-news-details/~board/cannon-news-cougar-news-internal-sources/post/qa-with-coach-jim-baker-on-500-wins',
      },
      { label: 'Cannon — Kelvin Drakeford', url: 'https://www.cannonschool.org/kelvin-drakeford' },
      {
        label: 'HighSchoolOT — Baker leaves Central Cabarrus for Cannon',
        url: 'https://www.highschoolot.com/story/2-time-state-champion-basketball-coach-jim-baker-leaves-central-cabarrus-for-cannon/21473128/',
      },
    ],
  },

  /* ------------------------------------------------------- 1f facilities -- */
  facilities: {
    headline:
      'A two-floor strength center open to every student, a turf stadium with a three-booth press box, and a Novant Health partnership staffing the training room.',
    subhead:
      'Athletic training and strength & conditioning explicitly "operate as one team" here.',
    photos: [
      {
        src: '/facilities/cannon-randy-marion-field.jpg',
        name: 'Randy Marion Field',
        meta: 'synthetic turf',
        caption:
          'Hosts football, soccer, lacrosse and track meets, ringed by the eight-lane Tysinger Family Track',
        credit: 'Photo: Cannon School athletics',
      },
      {
        src: '/facilities/cannon-boswell-gym.jpg',
        name: 'Boswell Gym',
        meta: 'Hoffman Riley Court',
        caption: 'Main competition gym; the court was named in January 2019 for announcers Mike Hoffman and the late John Riley',
        credit: 'Photo: Cannon School athletics',
      },
      {
        src: '/facilities/cannon-andrews-strength-center.jpg',
        name: 'Andrews Strength & Conditioning Center',
        meta: '4,100 sq ft, two floors',
        caption: 'Eight strength stations, thirteen racks, and a second floor for rehab and low-impact cardio',
        credit: 'Photo: Cannon School athletics',
      },
    ],
    venues: [
      { name: 'Randy Marion Family Field House', detail: '4,800 sq ft; three-booth press box' },
      { name: 'Tysinger Family Track', detail: 'eight lanes, behind the Upper School' },
      { name: 'Hill Grimmett Multipurpose Center', detail: '5,000 sq ft — wrestling, cages, agility' },
      { name: 'Snyder Baseball Field', detail: 'adjacent to softball' },
      { name: 'Softball Field', detail: 'behind the school' },
      { name: 'Tennis Courts', detail: 'six courts on two levels' },
      { name: 'Auxiliary Gym', detail: 'supplemental practice gym' },
      { name: 'Soccer & Practice Field', detail: 'at the front entrance' },
    ],
    broadcast:
      'LocalLive and the NFHS Network carry Cannon events, with Hudl also listed; the Randy Marion Field House holds a three-booth press box for calling, video and scoring. Craig Reynolds serves as Assistant AD and Sports Information Director. The ticketing platform is not published.',
    care: [
      {
        label: 'Athletic trainers',
        text: '2 — Hayley Goldman (head) and Kelby Hurlocker, provided through a partnership with Novant Health',
      },
      {
        label: 'Team physicians',
        text: '2 Novant Health orthopedic surgeons — Dr. Bryan Edwards (sports-medicine fellowship with the Atlanta Falcons) and Dr. Jess Kirby',
      },
      {
        label: 'Concussions',
        text: 'Follows current research and national best practices; every case documented with a personalized care and recovery plan',
      },
      {
        label: 'Return to play',
        text: 'Athletes must hit all recovery milestones, pass functional testing, and be cleared by the trainer and, where appropriate, a physician',
      },
      {
        label: 'Safety infrastructure',
        text: 'Custom emergency action plans for each venue, AEDs throughout, heat acclimatization plan, and First Aid/CPR/AED certification for all coaches',
      },
      {
        label: 'S&C staff',
        text: 'Shawn Powell (director, since 2014) and Duncan Hundley, running a grade-by-grade "block" system from grade 7 up',
      },
    ],
    careNote:
      'Cannon is a clinical education site for UNC Charlotte’s Master’s in Athletic Training. Note the contrast worth probing on a tour: Cannon and Charlotte Christian outsource to Novant and Atrium respectively, Charlotte Country Day uses OrthoCarolina, and Providence Day keeps care fully in-house. Seating capacities are not published for any Cannon venue.',
    sources: [
      { label: 'Cannon — Athletic facilities', url: 'https://athletics.cannonschool.org/facilities' },
      { label: 'Cannon — Athletic training', url: 'https://athletics.cannonschool.org/training/athletic-training' },
      { label: 'Cannon — Fit for Life (S&C)', url: 'https://athletics.cannonschool.org/fit-for-life' },
    ],
  },

  /* 1g National Stage & NIL — intentionally omitted. See the header note: no
     national team ranking exists for any Cannon program, and no named athlete
     NIL deal is publicly disclosed. Both are confirmed negatives. */
}
