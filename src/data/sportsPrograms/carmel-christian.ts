// Carmel Christian School — Sports research area.
//
// Every figure is traceable to
// source-material/sports/carmel-christian/Carmel Christian - Sports - Redesign Research 2026.md,
// which carries the provenance header, source URLs and gap notes. Figures the
// research could not confirm carry `toVerify` and render a TO VERIFY tag rather
// than being guessed at.
//
// Carmel renders six of seven cards. Coaching is intentionally thin (head-coach
// names are not published) and Facilities is omitted-by-absence for a named
// venue ledger — see the gap notes. There is no 1d pro-alumni card: no
// professional athlete who attended Carmel is confirmed (Cade Tyson is a draft
// prospect, not yet pro), so 1d renders only its honors ledger.

import type { SportsProgram } from '../sportsProgram.ts'

const INSIDE = 'https://www.carmelchristianathletics.org/inside-athletics/'
const NEXT_STEPS = 'https://www.carmelchristianathletics.org/inside-athletics/next-steps/'

export const carmelChristian: SportsProgram = {
  /* ---------------------------------------------------------- 1a offered -- */
  offered: {
    headline:
      '9 varsity sports across roughly 28 teams — a focused Cougars program in NCISAA 4A, the top private-school classification.',
    subhead:
      'Basketball, soccer and volleyball carry a JV and Middle School ladder; there is no football, lacrosse or track on the current offered list.',
    stats: [
      { value: '9', label: 'distinct varsity sports' },
      { value: '~28', label: 'teams across V · JV · MS' },
      { value: '4A', label: 'NCISAA (was 3A through ~2019)' },
      { value: 'Cougars', label: 'Matthews, NC' },
    ],
    seasons: [
      {
        name: 'Fall',
        sports: [
          { name: 'Cross Country (B & G)', levels: ['V', 'MS'] },
          { name: 'Golf (Girls)', levels: ['V'] },
          { name: 'Soccer (Boys)', levels: ['V', 'JV', 'MS'] },
          { name: 'Tennis (Girls)', levels: ['V'] },
          { name: 'Volleyball (Girls)', levels: ['V', 'JV', 'MS'] },
        ],
      },
      {
        name: 'Winter',
        sports: [
          { name: 'Basketball (Boys)', levels: ['V', 'JV', 'MS'] },
          { name: 'Basketball (Girls)', levels: ['V', 'MS'] },
          { name: 'Cheerleading', levels: ['V', 'MS'] },
          { name: 'Swimming (B & G)', levels: ['V', 'MS'] },
        ],
      },
      {
        name: 'Spring',
        sports: [
          { name: 'Baseball', levels: ['V', 'JV', 'MS'] },
          { name: 'Golf (Boys)', levels: ['V'] },
          { name: 'Golf (Co-ed)', levels: ['MS'] },
          { name: 'Soccer (Girls)', levels: ['V', 'JV', 'MS'] },
          { name: 'Tennis (Boys)', levels: ['V', 'MS'] },
        ],
      },
    ],
    footnote:
      'Middle School boys basketball splits into "Blue & Gold" squads to widen participation, and golf runs a co-ed Middle School team in spring. Carmel moved up from NCISAA 3A to 4A around 2019.',
    sources: [
      { label: 'carmelchristianathletics.org — Inside Athletics', url: INSIDE },
      { label: 'carmelchristian.org — Athletics 101', url: 'https://carmelchristian.org/athletics101' },
    ],
  },

  /* ----------------------------------------------------------- 1b record -- */
  record: {
    headline:
      'Three recent NCISAA titles — two in boys basketball (2019 3A, 2022 4A) and one in boys soccer (2020 4A) — behind a string of deep finals runs.',
    subhead:
      '"State" = NCISAA (the private-school association); Carmel does not compete in the public-school NCHSAA.',
    seasonLabels: ['2019–2020', '2021–2022', '2022–2023 →'],
    rows: [
      {
        program: 'Boys Basketball',
        cells: [
          { result: 'STATE', toVerify: true },
          { result: 'STATE', record: '26–3' },
          { result: 'RUNNER-UP', record: '28–4' },
        ],
        note: 'Back-to-back 3A in 2018 & 2019; 4A champion 2022; runner-up 2023 & 2025',
      },
      {
        program: 'Boys Soccer',
        cells: [
          { result: 'STATE', record: '14–1' },
          { result: 'RUNNER-UP', record: '' },
          { result: 'NONE' },
        ],
        note: 'Four straight finals 2019–2022, winning 4A in 2020',
      },
      {
        program: 'Girls Soccer',
        cells: [
          { result: 'NONE' },
          { result: 'NONE' },
          { result: 'RUNNER-UP', record: '14–5' },
        ],
        note: "Lost the '26 4A final 1–2 to Providence Day",
      },
    ],
    didNotWin:
      "Christ School took the boys basketball 4A titles Carmel lost in 2023 (48–53) and 2025 (Christ School three-peated); Rabun Gap-Nacoochee beat Carmel in the 2021 (1–0) and 2022 (1–0) boys soccer 4A finals, and Coastal Christian in the 2019 3A final; Providence Day shut Carmel out for the 2026 girls soccer 4A title (1–2).",
    bars: [
      { program: 'Boys Basketball', record: '26–3', pct: 0.897, tag: "'21–22 SEASON" },
      { program: 'Boys Soccer', record: '14–1', pct: 0.933, tag: '2020 TITLE RUN' },
      { program: 'Girls Soccer', record: '14–5', pct: 0.737, tag: "'25–26 SEASON" },
    ],
    seasonDetail: [
      {
        program: 'Boys Basketball',
        text: '2022: NCISAA 4A champion — beat Greensboro Day 71–66 on Feb 26, 2022 at Wingate, Cade Tyson scoring 31. 2023: 28–4, lost the 4A final 48–53 to Christ School (Feb 25, 2023) behind a Jaeden Mustaf-led team. 2025: reached the 4A final again and lost to Christ School, which three-peated (score to verify). Regular-season records: 2021–22 26–3, 2022–23 28–4, 2016–17 21–6, 2015–16 22–8.',
      },
      {
        program: 'Boys Soccer',
        text: '2020: NCISAA 4A champion — beat Rabun Gap-Nacoochee 2–0, finishing 14–1. This was the middle of four straight finals: lost the 2019 3A final to Coastal Christian, won 2020, then lost the 2021 (1–0) and 2022 (1–0) 4A finals to Rabun Gap.',
      },
      {
        program: 'Girls Soccer',
        text: '2026: reached the NCISAA 4A final and lost 1–2 to Providence Day (May 16, 2026), finishing 14–5. The athletics site tagged the season a "2025-26 state champions" run, which conflicts with the final loss — treated here as runner-up pending confirmation.',
      },
    ],
    sources: [
      { label: 'HighSchoolOT — 2022 boys basketball 4A title (71–66)', url: 'https://www.maxpreps.com/nc/matthews/carmel-christian-cougars/basketball/history/' },
      {
        label: 'HighSchoolOT — 2023 boys basketball 4A final (Christ School 53–48)',
        url: 'https://www.highschoolot.com/story/christ-school-edges-carmel-christian-for-ncisaa-4a-boys-basketball-title/20736737/',
      },
      {
        label: 'HighSchoolOT — 2020 boys soccer 4A title (2–0 over Rabun Gap)',
        url: 'https://www.highschoolot.com/story/carmel-christian-beats-rabun-gap-to-win-4a-soccer-title/19375567/',
      },
      {
        label: 'HighSchoolOT — 2026 girls soccer 4A final (1–2 to Providence Day)',
        url: 'https://www.highschoolot.com/story/providence-day-shuts-out-carmel-christian-for-third-straight-ncisaa-4a-girls-soccer-championship/22359052/',
      },
    ],
  },

  /* --------------------------------------------------------- 1c pipeline -- */
  pipeline: {
    headline:
      'Five Division I commits across the classes of 2024–26 — every one in basketball, and every one a mid-major. Zero Power 4.',
    subhead:
      'Built from the school’s official "Next Steps" college-commit roster; division and conference labels were added by the researcher from each college’s NCAA status.',
    funnel: [
      {
        label: 'Committed to college athletics',
        hint: '(all divisions, 2024–26)',
        count: '12+',
        width: 1,
        shade: 'pale',
      },
      { label: 'NCAA Division I', hint: '(all basketball)', count: '5', width: 0.42, shade: 'mid' },
      {
        label: 'Power 4',
        hint: '(SEC · Big Ten · ACC · Big 12)',
        count: '0',
        width: 0.04,
        shade: 'full',
      },
    ],
    funnelNote:
      'All five D1 commits are basketball players who signed with mid-major programs — Big South and Sun Belt. No Carmel signee in this window went to a Power 4 school. Kam Taylor reached the ACC (Florida State) only later through the transfer portal, not as a Carmel commit.',
    sportBars: [
      { sport: 'Basketball', count: 5, width: 1 },
    ],
    realityCheck:
      'Outside basketball, Carmel’s recent signees land overwhelmingly in NCAA Division II and III: baseball to Lander (D2), Ferrum (D3) and USC Aiken (D2); basketball also to Fayetteville State (D2) and Johnson & Wales (D3); volleyball to Winston-Salem State (D2); plus golf, tennis and dance signees. A D2/D3 offer is the common outcome, with basketball the one sport that reliably produces D1.',
    rankedRecruits:
      'Cade Tyson (’22) was 2022 NC Mr. Basketball and left as the program’s recruiting headliner (Belmont → UNC → Minnesota; a 2026 NBA G League Draft Combine / Portsmouth invitee). Jaeden Mustaf, all-state at Carmel and son of ex-NBA Jerrod Mustaf, led the 2022–23 team to 28–4 and the state final before Georgia Tech → Indiana. Cody Peck (6\'10", four-star, top-100 → Dayton) is often linked to Carmel but played only two seasons there and graduated elsewhere — he is not a Carmel commit.',
    roster: [
      { cls: "'26", name: 'Jordan Buzzard', sport: 'Basketball', college: 'Coastal Carolina', conf: 'Sun Belt', level: 'D1' },
      { cls: "'26", name: 'Logan Johnson', sport: 'Basketball', college: 'UNC Asheville', conf: 'Big South', level: 'D1' },
      { cls: "'25", name: 'Bryce Slay', sport: 'Basketball', college: 'Marshall', conf: 'Sun Belt', level: 'D1' },
      { cls: "'25", name: 'Braylen Bowman', sport: 'Basketball', college: 'UNC Greensboro', conf: 'Big South', level: 'D1' },
      { cls: "'24", name: 'Kam Taylor', sport: 'Basketball', college: 'UNC Asheville', conf: 'Big South', level: 'D1' },
      { cls: "'26", name: 'Caden Tarr', sport: 'Baseball', college: 'Lander', conf: 'Peach Belt', level: 'D2' },
      { cls: "'25", name: 'Landon Boyd', sport: 'Baseball', college: 'USC Aiken', conf: 'Peach Belt', level: 'D2' },
      { cls: "'25", name: 'Chandler Kennedy', sport: 'Basketball', college: 'Fayetteville State', conf: 'CIAA', level: 'D2' },
      { cls: "'25", name: 'Jazmyne Slay', sport: 'Volleyball', college: 'Winston-Salem State', conf: 'CIAA', level: 'D2' },
      { cls: "'25", name: 'Anderson Rider', sport: 'Baseball', college: 'Ferrum', conf: 'ODAC', level: 'D3' },
      { cls: "'25", name: 'Miles Leaks', sport: 'Basketball', college: 'Johnson & Wales', conf: 'GNAC', level: 'D3' },
    ],
    rosterNote:
      'Level labels (P4 / D1 / D2 / D3) and conferences were added by the researcher from each college’s NCAA status — they are not on the school’s list. P4 = SEC · Big Ten · ACC · Big 12. The D2/D3 rows are a representative sample of the non-D1 signees on the "Next Steps" roster, not the full list.',
    sources: [
      { label: 'carmelchristianathletics.org — Next Steps (college commits)', url: NEXT_STEPS },
      {
        label: 'carmelchristianathletics.org — National Signing Day (Buzzard, Johnson)',
        url: 'https://www.carmelchristianathletics.org/cougar-athletics-celebrate-national-signing-day/',
      },
      {
        label: 'goccusports.com — Jordan Buzzard signs with Coastal Carolina',
        url: 'https://goccusports.com/news/2025/11/17/mens-basketball-signs-two-prep-standouts.aspx',
      },
    ],
  },

  /* ----------------------------------------------------------- 1d honors -- */
  honors: {
    headline:
      'No confirmed professional athlete — but an NC Mr. Basketball and a high-major recruiting pipeline out of the basketball program.',
    subhead:
      'Carmel does not maintain a pro-alumni tracker, and no alumnus is a confirmed pro; the names below are recruiting and player-of-the-year honors.',
    pros: [],
    honors: [
      {
        label: 'NC Mr. Basketball',
        text: 'Cade Tyson (’22) — 2022 North Carolina Mr. Basketball, averaging 24.0 ppg as a senior and scoring 31 in the state-title win over Greensboro Day. Belmont → UNC → Minnesota; a 2026 NBA G League Draft Combine and Portsmouth invitee (a draft prospect, not yet a pro).',
        tag: 'Statewide, 1 per year',
        tagStyle: 'accent',
      },
      {
        label: 'High-major recruiting',
        text: 'Jaeden Mustaf — all-state at Carmel, led the 2022–23 team to 28–4 and the state final, and the son of ex-NBA player Jerrod Mustaf. Georgia Tech → Indiana (April 2026). He transferred in from DeMatha; whether he graduated from Carmel is unconfirmed.',
        tag: 'National recruit',
        tagStyle: 'accent',
      },
      {
        label: 'All-conference',
        text: 'Kam Taylor (’24) — first-team All-Big South (18.9 ppg as a sophomore) at UNC Asheville before transferring to Florida State.',
        tag: 'League level',
        tagStyle: 'outline',
      },
    ],
    sources: [
      { label: 'carmelchristianathletics.org — Next Steps (college commits)', url: NEXT_STEPS },
      { label: 'MaxPreps — Carmel Christian boys basketball history', url: 'https://www.maxpreps.com/nc/matthews/carmel-christian-cougars/basketball/history/' },
    ],
  },

  /* --------------------------------------------------------- 1e coaching -- */
  coaching: {
    headline:
      'Athletic Director Grant Coffey leads the Cougars program; individual head-coach names, tenures and records are not published.',
    subhead: 'Athletic Director: Grant Coffey, BEd, CAA.',
    featured: [],
    tenure: [],
    worthKnowing:
      'Carmel’s athletics pages reference a coaches directory but list no head-coach names, tenures or career records. Those details are unpublished on the pages fetched — a deeper pass (school directory, press) would be needed to populate a coaching ledger.',
    sources: [
      { label: 'carmelchristianathletics.org — Inside Athletics (AD contact)', url: INSIDE },
    ],
  },

  /* -------------------------------------------------------- 1g national -- */
  national: {
    headline:
      'A first-wave NIL deal for a Carmel basketball alumnus — Bryce Slay signed with a national brand in August 2025.',
    subhead:
      'Carmel competes in NCISAA 4A, the top private-school classification; no team national-poll ranking is published.',
    stats: [
      { value: '4A', label: 'NCISAA top classification' },
      { value: 'Aug 12 2025', label: 'Bryce Slay NIL deal announced' },
      { value: '5', label: 'D1 basketball signees, 2024–26' },
    ],
    schedule: [],
    nilTitle: 'The NIL timeline',
    nil: [
      {
        date: 'August 12, 2025',
        text: 'Class of 2025 basketball alumnus Bryce Slay signed his first NIL deal — with College HUNKS (College Hunks Hauling Junk & Moving) — described as among the first Charlotte high-school graduates to secure such an agreement. No dollar figure was disclosed; the deal was initiated by his parents, Tamar (ex-Charlotte Bobcats) and Celeste Slay. Slay had committed to Marshall.',
        highlight: true,
        tag: "CARMEL'S FIRST",
      },
    ],
    sources: [
      {
        label: 'WCCB Charlotte — Bryce Slay NIL deal',
        url: 'https://www.wccbcharlotte.com/2025/08/12/local-high-school-star-athlete-signs-nil-deal-with-national-brand/',
      },
      {
        label: 'carmelchristian.org — Bryce Slay NIL alumnus feature',
        url: 'https://carmelchristian.org/apps/news/show_news.jsp?REC_ID=980022&id=0',
      },
    ],
  },
}
