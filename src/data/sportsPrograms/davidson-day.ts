// Davidson Day School — Sports research area.
//
// Every figure is traceable to
// source-material/sports/davidson-day/Davidson Day - Sports - Redesign Research 2026.md.
//
// FIVE of seven cards render — the fewest in the set, and deliberately so.
// Davidson Day is a ~550-student school and two areas are genuinely empty
// rather than under-researched:
//
//   1f Facilities & Athlete Care — OMITTED. Two venue names exist (Yates Gym,
//      Wolter Field) with one descriptive sentence between them: no square
//      footage, capacity, or construction dates anywhere. Athlete care has
//      exactly one verifiable data point (a single athletic trainer) with no
//      team physician, no hospital partnership, no published concussion
//      protocol and no sports-medicine page of any kind. The school's official
//      athletics site (ddspatriotsathletics.com) is dead and unconfigured,
//      which accounts for much of this. A card here would be three near-empty
//      rows implying research failure where the truth is an absent public record.
//
//   1g National Stage & NIL — OMITTED. Davidson Day has never appeared in a
//      national top 25 in any sport (verified against the final 2025-26
//      High School On SI rankings), and there are zero named NIL deals despite
//      the program having a top-100 recruit and two ACC signees. The genuine
//      national result — beating Oak Hill Academy 86-79 — is carried on 1b.
//
// NOTE for future editors: Cam Reddish did NOT attend Davidson Day (he went to
// Haverford and Westtown in Pennsylvania). The school's NBA alum is C.J. Huntley.

import type { SportsProgram } from '../sportsProgram.ts'

const ATHLETICS = 'https://www.davidsonday.org/athletics'
const HISTORY = 'https://www.davidsonday.org/athletics/history-and-achievements'
const CHAMPS_26 =
  'https://www.highschoolot.com/story/the-2025-26-ncisaa-team-state-champions-in-every-sport/22322092/'

export const davidsonDay: SportsProgram = {
  /* ---------------------------------------------------------- 1a offered -- */
  offered: {
    headline:
      '35 teams across 13 sports on a 15-acre campus, with about 90% of students in grades 5–12 playing.',
    subhead:
      'Athletics start in grade 5 here — earlier than any other school in this comparison — and the school fields rowing on Lake Davidson.',
    stats: [
      { value: '13', label: 'distinct sports' },
      { value: '35', label: 'teams across V · JV · MS' },
      { value: '~90%', label: 'of grades 5–12 participate' },
      { value: 'NCISAA', label: '3A state · Foothills conference' },
    ],
    seasons: [
      {
        name: 'Fall',
        note: '6 varsity',
        sports: [
          { name: 'Football', levels: ['V', 'MS'] },
          { name: 'Volleyball (Girls)', levels: ['V', 'JV', 'MS'] },
          { name: 'Soccer (Boys)', levels: ['V', 'MS'] },
          { name: 'Cross Country (B & G)', levels: ['V', 'MS'] },
          { name: 'Tennis (Girls)', levels: ['V'] },
          { name: 'Golf (Girls)', levels: ['V'] },
        ],
      },
      {
        name: 'Winter',
        note: '5 varsity',
        sports: [
          { name: 'Basketball (Boys)', levels: ['V', 'JV', 'MS'] },
          { name: 'Basketball (Girls)', levels: ['V', 'JV', 'MS'] },
          { name: 'Swimming (B & G)', levels: ['V', 'MS'] },
          { name: 'Indoor Track & Field', levels: ['V'] },
          { name: 'Cheerleading', levels: ['V', 'MS'] },
        ],
      },
      {
        name: 'Spring',
        note: '7 varsity',
        sports: [
          { name: 'Baseball', levels: ['V', 'MS'] },
          { name: 'Soccer (Girls)', levels: ['V', 'MS'] },
          { name: 'Lacrosse (Girls)', levels: ['V'] },
          { name: 'Tennis (Boys)', levels: ['V', 'MS'] },
          { name: 'Golf (Boys)', levels: ['V', 'MS'] },
          { name: 'Rowing (Co-ed)', levels: ['V'] },
          { name: 'Track & Field (B & G)', levels: ['V'] },
        ],
      },
    ],
    footnote:
      'Davidson Day moved up from 1A to 2A to 3A as enrollment grew, reaching 3A for 2024–25. It fields no wrestling, softball, field hockey or boys lacrosse — MaxPreps lists some of these, but the school’s own teams page does not, and the school’s page is treated as authoritative. Eight of the campus’s fifteen acres are given to fields and a wooded park with waterfront access to the Lake Davidson Nature Preserve, which supports the rowing program.',
    sources: [
      { label: 'davidsonday.org — Patriot Teams', url: 'https://www.davidsonday.org/athletics/patriot-teams' },
      { label: 'davidsonday.org — Athletics', url: ATHLETICS },
      { label: 'davidsonday.org — Our Campus', url: 'https://www.davidsonday.org/about/our-campus' },
    ],
  },

  /* ----------------------------------------------------------- 1b record -- */
  record: {
    headline:
      'Seven state championships in 2023–24 — the most of any 2A school that year — then four, then one. This is a program in visible decline.',
    subhead:
      'Boys tennis is the only title survivor of 2025–26; three separate three-peats ended in the same year.',
    seasonLabels: ["'23–24", "'24–25", "'25–26"],
    rows: [
      {
        program: 'Boys Tennis',
        cells: [
          { result: 'STATE' },
          { result: 'STATE', record: '5–1 final' },
          { result: 'STATE', record: '5–0 final' },
        ],
        note: 'Three straight; blanked Cape Fear Academy in 2026',
      },
      {
        program: 'Volleyball',
        cells: [
          { result: 'STATE', record: '24–4–2' },
          { result: 'STATE', record: '24–4' },
          { result: 'RUNNER-UP', record: '18–11' },
        ],
        note: 'Lost the 2026 final 1–3 to Wake Christian',
      },
      {
        program: 'Girls Soccer',
        cells: [
          { result: 'STATE', record: '18–3' },
          { result: 'STATE', record: '14–2' },
          { result: 'NONE', record: '3–11' },
        ],
        note: 'Three-peat broken; collapsed to a first-round exit',
      },
      {
        program: 'Boys Soccer',
        cells: [
          { result: 'STATE', record: '17–3' },
          { result: 'STATE', record: '17–4' },
          { result: 'NONE' },
        ],
        note: 'Three-peat broken; lost the quarterfinal 2–3',
      },
      {
        program: 'Boys Basketball',
        cells: [
          { result: 'STATE', record: '24–7' },
          { result: 'SEMIFINAL', record: '22–13' },
          { result: 'SEMIFINAL', record: '23–11' },
        ],
        note: 'Lost the 2026 semi to eventual champion Greensboro Day',
      },
      {
        program: 'Cross Country (B & G)',
        cells: [
          { result: 'STATE x2', record: 'meet-scored' },
          { result: 'NONE' },
          { result: 'NONE' },
        ],
        note: 'Both squads won in 2023–24; GRACE Christian took both in 2026',
      },
      {
        program: 'Girls Basketball',
        cells: [
          { result: 'NONE' },
          { result: 'NONE' },
          { result: 'NONE', record: '0–6' },
        ],
        note: 'Seven different head coaches in eight documented seasons',
      },
    ],
    didNotWin:
      'volleyball (Wake Christian) · girls soccer (Gaston Christian) · boys basketball (Greensboro Day, which also eliminated Davidson Day in the semifinal) · both cross country titles (GRACE Christian of Raleigh) · boys soccer (Trinity Academy eliminated the Patriots in the quarterfinals).',
    bars: [
      { program: 'Boys Basketball', record: '30–1', pct: 0.968, tag: "'19–20 PEAK" },
      { program: 'Volleyball', record: '111–33–2', pct: 0.771, tag: '5 YRS' },
      { program: 'Boys Soccer', record: '63–15–1', pct: 0.797, tag: '4 YRS' },
      { program: 'Boys Basketball', record: '69–31', pct: 0.69, tag: '3 YRS' },
    ],
    seasonDetail: [
      {
        program: 'The 2023–24 peak',
        text: 'Seven state titles in one year — boys and girls soccer, volleyball, boys and girls cross country, boys basketball and boys tennis — the most of any 2A school in the NCISAA, plus the Wells Fargo Cup for all-sports excellence.',
      },
      {
        program: 'Boys Basketball',
        text: 'The historic peak was 2019–20: 30–1, ranked No. 5 in North Carolina, and the NCISAA 2A championship, led by senior C.J. Huntley. In 2025–26 the Patriots went 23–11 under new coach Gary Ellington and beat Oak Hill Academy 86–79 — handing that national program its first loss of the season — before losing the state semifinal to Greensboro Day.',
      },
      {
        program: 'The 2025–26 decline',
        text: 'Three-peats ended in girls soccer and boys soccer, volleyball lost the final, and both cross country titles went elsewhere. Girls soccer fell from 14–2 champions to 3–11. Coaching turnover is the visible common factor: soccer changed hands after 2024–25, and girls basketball has had seven head coaches in eight documented seasons.',
      },
    ],
    sources: [
      { label: 'HighSchoolOT — 2025–26 NCISAA champions', url: CHAMPS_26 },
      {
        label: '2023–24 NCISAA champions',
        url: 'https://www.highschoolot.com/story/the-2023-24-ncisaa-team-state-champions-in-every-sport/21461689/',
      },
      {
        label: 'MaxPreps — beat Oak Hill Academy',
        url: 'https://www.maxpreps.com/news/DENPuVfqpEmRw2iffpG6ew/basketball-recap-oak-hill-academys-undefeated-season-over-after-six-games.htm',
      },
      { label: 'davidsonday.org — History & Achievements', url: HISTORY },
    ],
  },

  /* --------------------------------------------------------- 1c pipeline -- */
  pipeline: {
    headline:
      'Ten documented commitments across 2024–26, nine of them Division I and three Power 4 — a remarkably high conversion rate for a 550-student school.',
    subhead:
      'Basketball drives it: four D1 commits including signees to North Carolina, Clemson and Dayton.',
    funnel: [
      {
        label: 'Committed to college athletics',
        hint: '(all divisions, documented)',
        count: '10',
        width: 1,
        shade: 'pale',
        toVerify: true,
      },
      { label: 'NCAA Division I', hint: '(any conference)', count: '9', width: 0.9, shade: 'mid' },
      {
        label: 'Power 4',
        hint: '(SEC · Big Ten · ACC · Big 12)',
        count: '3',
        width: 0.3,
        shade: 'full',
      },
    ],
    funnelNote:
      'These are documented floors, not a census. The school published a full seven-athlete list for the class of 2025 but no equivalent for 2024 or 2026, and its official athletics site is dead — so non-basketball commitments in those years are almost certainly missing. The school states that more than 100 Davidson Day athletes have gone on to compete at 80 different colleges.',
    sportBars: [
      { sport: 'Basketball', count: 4, width: 1, p4Width: 0.5 },
      { sport: 'Volleyball', count: 2, width: 0.5 },
      { sport: 'Soccer', count: 1, width: 0.25 },
      { sport: 'Swimming', count: 1, width: 0.25 },
      { sport: 'Equestrian', count: 1, width: 0.25, p4Width: 0.25 },
    ],
    realityCheck:
      'The unusual thing here is the ratio, not the volume: nine of ten documented commitments are Division I, where larger peer schools convert closer to a third. That reflects a small school whose recruiting story is concentrated almost entirely in one nationally-visible basketball program rather than spread across many sports — and it means the experience for an athlete outside that program looks very different.',
    rankedRecruits:
      'Three four-star basketball recruits in consecutive classes. Cody Peck ’26 is ranked No. 82 nationally by 247Sports and No. 99 by ESPN — he transferred in from IMG Academy for his senior year and chose Dayton over Creighton, Tennessee and Miami. Isaiah Denis ’25 was No. 56 in the On3 Industry ranking and the No. 1 recruit in North Carolina before signing with UNC. Will Stevens ’26, a 6-foot-10 center, was No. 1 in NC per On3 and committed to Clemson over Vanderbilt and South Carolina.',
    roster: [
      { cls: "'26", name: 'Will Stevens', sport: 'Boys Basketball', college: 'Clemson', conf: 'ACC', level: 'P4' },
      { cls: "'26", name: 'Cody Peck', sport: 'Boys Basketball', college: 'Dayton', conf: 'Atlantic 10', level: 'D1' },
      { cls: "'25", name: 'Isaiah Denis', sport: 'Boys Basketball', college: 'North Carolina', conf: 'ACC', level: 'P4' },
      { cls: "'25", name: 'Abbie Gordon', sport: 'Equestrian', college: 'Georgia', conf: 'SEC', level: 'P4' },
      { cls: "'25", name: 'Matthew Doty', sport: 'Swimming', college: 'Air Force', conf: 'Mountain West', level: 'D1' },
      { cls: "'25", name: 'Jordin Glass', sport: 'Volleyball', college: 'UT Chattanooga', conf: 'Southern', level: 'D1' },
      { cls: "'25", name: 'Kaydee Smith', sport: 'Volleyball', college: 'Alabama A&M', conf: 'SWAC', level: 'D1' },
      { cls: "'25", name: 'Isabel Seifert', sport: 'Girls Soccer', college: 'Richmond', conf: 'Atlantic 10', level: 'D1' },
      { cls: "'25", name: 'Domenic Desmond', sport: 'Boys Soccer', college: 'Sewanee', conf: 'SAA', level: 'D3' },
      { cls: "'24", name: 'Mason Smith', sport: 'Boys Basketball', college: 'Mercer', conf: 'Southern', level: 'D1' },
    ],
    rosterNote:
      'The classes of 2024 and 2026 are under-represented because the school publishes no signing list for those years and its athletics website is offline. Level labels and conferences were added by the researcher from each college’s NCAA status.',
    sources: [
      {
        label: 'davidsonday.org — seven athletes sign letters of intent',
        url: 'https://www.davidsonday.org/p/~board/all-school-news/post/seven-davidson-day-student-athletes-sign-national-letters-of-intent',
      },
      { label: '247Sports — Cody Peck', url: 'https://247sports.com/player/cody-peck-46150042/' },
      {
        label: 'On3 — Isaiah Denis commits to UNC',
        url: 'https://www.on3.com/news/north-carolina-basketball-isaiah-denis-commits-to-tar-heels-hubert-davis/',
      },
      { label: 'On3 — Will Stevens commits to Clemson', url: 'https://www.on3.com/rivals/news/4-star-pf-will-stevens-commits-to-clemson/' },
    ],
  },

  /* ----------------------------------------------------------- 1d honors -- */
  honors: {
    headline:
      'An NBA two-way signing, a Heisman finalist quarterback, a WNBA draft pick and a NASCAR Cup Series driver.',
    // The Cam Reddish correction lives in the file header and the research note,
    // not here: a parent reading this card has no reason to think he ever
    // attended, so surfacing the denial would raise a question nobody asked and
    // put another school's athlete on Davidson Day's page.
    subhead:
      'Unusually wide professional reach for a school of about 550 students — across three sports and NASCAR.',
    pros: [
      {
        kicker: "NBA · Class of '20",
        name: 'C.J. Huntley',
        detail:
          'Signed a two-way contract with the Phoenix Suns in June 2025 and made his NBA debut in 2025–26 — the first Appalachian State player to appear in an NBA game since 1952. He led Davidson Day to its 30–1 state title season.',
        path: 'Davidson Day → Appalachian State → Phoenix Suns',
      },
      {
        kicker: "NFL · Class of '14",
        name: 'Will Grier',
        detail:
          'Third-round pick in the 2019 NFL Draft and fourth in the 2018 Heisman voting. As a Davidson Day senior he threw for 837 yards and 10 touchdowns in a single game.',
        path: 'Davidson Day → Florida / West Virginia → NFL',
      },
      {
        kicker: "WNBA · Class of '17",
        name: 'Maya Caldwell',
        detail:
          'Drafted 33rd overall by the Indiana Fever in 2021 after an SEC career at Georgia; has played for Atlanta and Indiana and professionally in Israel, Turkey and Spain.',
        path: 'Davidson Day → Georgia → WNBA',
      },
      {
        kicker: 'NASCAR Cup Series',
        name: 'John Hunter Nemechek',
        detail:
          '2021 NASCAR Truck Series regular-season champion with 13 Truck and 11 Xfinity Series wins, now driving the No. 42 Toyota for Legacy Motor Club.',
        path: 'Davidson Day → NASCAR',
      },
    ],
    honors: [
      {
        label: 'Gatorade Player of the Year',
        text: 'Will Grier won it twice in North Carolina, alongside national Player of the Year honors from Parade Magazine and ABC Future Stars, and an Army All-American selection.',
        tag: 'Statewide + national',
      },
      {
        label: 'Individual state champions',
        text: '37 individual state championships. Melissa Zammitti ’17 alone won ten across distance events in three varsity years; Matt Doty and Logan Zucker dominated the pool.',
        tag: 'Statewide',
      },
      {
        label: 'Team state championships',
        text: '37 team titles across 13 programs — girls soccer leads with six, and the school has won the NCISAA Wells Fargo Cup twice, in 2019–20 and 2023–24.',
        tag: 'Program-wide',
      },
      {
        label: 'All-state selections',
        text: 'More than 150 NCISAA All-State athletes all-time. Seven Patriots earned spring 2026 all-state honors across girls lacrosse, girls soccer and boys tennis.',
        tag: 'Statewide',
        tagStyle: 'outline',
      },
      {
        label: 'Patriot Athletic Hall of Fame',
        text: 'Created in 2025 with an eight-person inaugural class — Lamar Briggs, Maya Caldwell, Rashun Davis, Jenny Falcone, Will Grier, Aaron Seward, Melissa Zammitti and contributors Chuck and Karen Wolter. It inducts biennially, next in 2027.',
        tag: 'School culture signal',
        tagStyle: 'outline',
      },
    ],
    sources: [
      { label: 'davidsonday.org — History & Achievements', url: HISTORY },
      {
        label: 'davidsonday.org — Patriot Athletic Hall of Fame',
        url: 'https://www.davidsonday.org/athletics/patriot-athletic-hall-of-fame',
      },
      {
        label: 'HighSchoolOT — Huntley signs with the Suns',
        url: 'https://www.highschoolot.com/story/c-j-huntley-davidson-day-and-appalachian-state-grad-signs-two-way-contract-with-the-phoenix-suns/22067021/',
      },
      { label: 'Wikipedia — John Hunter Nemechek', url: 'https://en.wikipedia.org/wiki/John_Hunter_Nemechek' },
    ],
  },

  /* --------------------------------------------------------- 1e coaching -- */
  coaching: {
    headline:
      'A 319-win, two-time state champion took over boys basketball in 2025 — and won 23 games plus a victory over Oak Hill in year one.',
    subhead:
      'Athletic Director: Chris Turner. Coaching stability is the sharpest dividing line at this school.',
    featured: [
      {
        kicker: 'The pedigree hire · Boys Basketball, since 2025',
        name: 'Gary Ellington',
        stats: [
          { value: '319–143', label: 'over 17 years at Weddington HS' },
          { value: '2', label: 'NCHSAA state championships' },
          { value: '9×', label: 'conference Coach of the Year' },
        ],
        detail:
          'A genuinely significant hire for a school this size — two state titles, nine conference championships, eight Sweet 16 appearances and two North Carolina Basketball Coaches Association Coach of the Year awards. In year one at Davidson Day he went 23–11, reached the state semifinal and beat Oak Hill Academy. He also serves as the Upper School Strength Teacher, which is the only documented strength-training role on campus.',
      },
      {
        kicker: 'The continuity anchor · Soccer, since 2017',
        name: 'Brad Laatsch',
        stats: [
          { value: '8+ yrs', label: 'heading both boys and girls soccer' },
          { value: '5', label: 'state titles across the two programs' },
          { value: '63–15–1', label: 'boys record across four title-era seasons' },
        ],
        detail:
          'The longest verified head-coaching tenure at the school, and the clearest illustration of what continuity buys: he rebuilt boys soccer from 7–13 in 2019–20 to 17–4 and a No. 9 state ranking, winning three straight titles, while girls soccer took two more under him. Both programs collapsed in 2025–26 — girls soccer from 14–2 to 3–11 — the season after his departure.',
      },
    ],
    tenure: [
      { name: 'Catherine Glass', role: 'Volleyball · Assistant AD', width: 1, since: 'since ~2017' },
      { name: 'Brad Laatsch', role: 'Boys & Girls Soccer', width: 0.95, since: '2017–2025' },
      { name: 'Chris Turner', role: 'Director of Athletics', width: 0.4, since: 'tenure', toVerify: true },
      { name: 'Gary Ellington', role: 'Boys Basketball · Strength Teacher', width: 0.12, since: 'since 2025' },
      { name: 'Mallorie Haines', role: "Girls Basketball — Davidson Day '21 alum", width: 0.12, since: 'since 2025' },
      { name: 'P. Letourneau', role: 'Soccer — succeeded Laatsch', width: 0.12, since: 'since 2025' },
    ],
    worthKnowing:
      'the school publishes no coaching directory, so head coaches for eight of its thirteen sports are undocumented — a consequence of its official athletics website being offline. Volleyball’s Catherine Glass and soccer’s Brad Laatsch represent long, title-producing tenures; basketball is the opposite, with at least seven boys head coaches since 2008 and seven girls head coaches in eight documented seasons. The 2024 title-winning coach, James Long, left for the college ranks a season later.',
    sources: [
      { label: 'davidsonday.org — Athletics', url: ATHLETICS },
      {
        label: 'davidsonday.org — new varsity boys basketball head coach',
        url: 'https://www.davidsonday.org/p/~board/all-school-news/post/davidson-day-announces-new-varsity-boys-basketball-head-coach',
      },
      {
        label: 'MaxPreps — boys basketball history',
        url: 'https://www.maxpreps.com/nc/davidson/davidson-day-patriots/basketball/history/',
      },
    ],
  },

  /* 1f Facilities & Athlete Care — intentionally omitted. See the header note:
     two venue names with one sentence between them, zero published specs, and
     exactly one verifiable athlete-care data point. Genuinely absent public
     record, not a research shortfall.

     1g National Stage & NIL — intentionally omitted. No national top-25
     appearance in any sport in any year, and zero named NIL deals. */
}
