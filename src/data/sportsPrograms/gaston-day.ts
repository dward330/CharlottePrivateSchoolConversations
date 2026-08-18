// Gaston Day School — Sports research area.
//
// Every figure is traceable to source-material/sports/gaston-day/ —
// "Gaston Day School - Sports - Program and Championship Ledger 2026.md".
//
// FOUR of seven cards render. Three are omitted, each for a stated reason
// rather than for lack of a research pass:
//
//  - 1c College Pipeline — the school publishes NO enumerated signing list.
//    A focused deep pass at assessment time checked local press, the athletics
//    news feed and the NCSA/recruiting databases (whose Gaston Day pages are
//    generic recruit-marketing pages carrying no commit lists). This is a
//    confirmed absence, so the Compare commit rows are deliberate nulls and the
//    funnel card would be an empty shell. Same treatment as the omitted cards
//    on Davidson Day and Covenant Day.
//  - 1e Coaching — only the Athletic Director (Lulu Brase) and the 2025
//    volleyball head coach (Derek Bing) are named anywhere public; there is no
//    tenure ledger, no coach bios, no records-by-coach. Two names is not a card.
//  - 1g National Stage & NIL — no national schedule, no national ranking, and
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

export const gastonDay: SportsProgram = {
  /* ---------------------------------------------------------- 1a offered -- */
  offered: {
    headline:
      '19 team sports across three seasons, with about 70% of students in grades 6–12 playing at least one.',
    subhead:
      'An NCISAA 2A program that has won eight team state championships since 2021 — a title rate that reads much larger than the school’s 510 enrollment.',
    stats: [
      { value: '19', label: 'team sports across three seasons' },
      { value: '~70%', label: 'of grades 6–12 play at least one sport' },
      { value: '8', label: 'NCISAA 2A team state titles since 2021' },
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
      'Levels shown are what the sources actually publish. Volleyball is the one sport whose ladder is documented — MaxPreps lists varsity, JV and freshman teams — so it is the only row carrying a JV chip; every other sport shows V alone because the athletics site that would list its ladder is JavaScript-rendered and exposes nothing to a fetch. The Middle School fields its own teams in soccer, basketball, track & field and swimming (grades 6–8, subject to academic standing and behaviour), but the school does not publish a full MS roster, so no MS chips are claimed. Cheering and track & field come from Private School Review rather than the MaxPreps season grid.',
    sources: [
      { label: 'MaxPreps — Gaston Day Spartans (sport list by gender and season)', url: MAXPREPS },
      { label: 'MaxPreps — Gaston Day volleyball (varsity / JV / freshman levels, 2A classification)', url: MAXPREPS_VB },
      { label: 'gastonday.org — Academic Profile 2025-2026 (Athletic Director)', url: PROFILE },
      { label: 'gastondayathletics.com — Spartan Athletics (JS-rendered; no extractable roster data)', url: ATHLETICS },
    ],
  },

  /* ----------------------------------------------------------- 1b record -- */
  record: {
    headline:
      'Eight NCISAA 2A state championships since 2021 — including a three-title year in 2024–25 when volleyball, boys soccer and girls tennis all won.',
    subhead:
      'Girls tennis has four titles and is on a three-peat; volleyball has three and reached the 2025 final in five sets.',
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
          { result: 'NONE' },
          { result: 'STATE', record: 'swept' },
          { result: 'STATE', record: '3–2 final' },
        ],
        note: 'Three titles (2021, 2024, 2025); swept Westminster Catawba on Oct 26 2024, then beat St. Thomas More Academy 3–2 on Oct 25 2025. Plus three further finals appearances and five league titles over the decade',
      },
      {
        program: 'Boys Soccer',
        cells: [
          { result: 'NONE' },
          { result: 'STATE', record: 'shutout' },
          { result: 'NONE' },
        ],
        note: 'Blanked Westchester Country Day for the 2024 NCISAA 2A championship',
      },
    ],
    didNotWin:
      'every other program. The eight titles since 2021 sit in exactly three sports — girls tennis, volleyball and boys soccer — and the school publishes no championship history for the other sixteen, so this ledger is a record of concentrated strength rather than program-wide depth.',
    bars: [],
    seasonDetail: [
      {
        program: 'Girls Tennis',
        text: 'The most decorated program at the school: NCISAA 2A champions in 2021, 2023, 2024 and 2025. The 2024 win over Epiphany School was described in coverage as the program’s third state championship in four years and fourth overall; the 2025 win over the same opponent made it three straight.',
      },
      {
        program: 'Volleyball',
        text: 'Won the 2A title in 2021, then again in 2024 and 2025 under head coach Derek Bing. The 2025 final against St. Thomas More Academy went the full five sets, 3–2, on October 25 2025. Beyond the three titles the programme has reached three further finals and taken five league titles over the decade.',
      },
      {
        program: 'Boys Soccer',
        text: 'Won the 2024 NCISAA 2A championship with a shutout of Westchester Country Day, completing a three-title school year alongside volleyball and girls tennis — the run local coverage headlined as "Déjà vu".',
      },
    ],
    sources: [
      { label: 'HighSchoolOT — 2025-26 NCISAA team state champions in every sport', url: CHAMPS_26 },
      { label: 'HighSchoolOT — 2024-25 NCISAA team state champions in every sport', url: CHAMPS_25 },
      { label: 'HighSchoolOT — Gaston Day rolls to NCISAA 2A girls tennis title (2023)', url: TENNIS_23 },
      { label: 'HighSchoolOT — Gaston Day repeats NCISAA 2A girls tennis title (2024)', url: TENNIS_24 },
      { label: 'MaxPreps — Gaston Day volleyball (2025 final score and date)', url: MAXPREPS_VB },
    ],
  },

  /* --------------------------------------------------------- 1d honors ---- */
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
          'Volleyball — NCISAA 2A state champions (swept Westminster Catawba, Oct 26). Boys soccer — NCISAA 2A state champions (def. Westchester Country Day). Girls tennis — NCISAA 2A state champions, second straight.',
      },
      {
        label: '2023',
        text:
          'Girls tennis — NCISAA 2A state champions, def. Trinity School of Durham & Chapel Hill 5–1.',
      },
      {
        label: '2021',
        text:
          'Volleyball and girls tennis — NCISAA 2A state champions, the first title in each programme’s current run.',
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
    ],
  },

  /* ------------------------------------------------------ 1f facilities --- */
  facilities: {
    headline:
      'A 60-acre campus supporting 19 sports, with the athletics department run by a single named director.',
    subhead:
      'Venue-level detail is the weakest part of the public record here — the school publishes no facility inventory, and the athletics site is JavaScript-rendered.',
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
        text: 'Lulu Brase, named in the school’s own Academic Profile. She also co-directs the summer camp programme.',
      },
      {
        label: 'Athletic training / sports medicine',
        text: 'Not published. No athletic trainer, team physician or concussion protocol is named in any accessible source.',
      },
      {
        label: 'Eligibility',
        text: 'Middle School participation (grades 6–8) requires academic standing and positive behaviour — the one eligibility rule the school states publicly.',
      },
      {
        label: 'Governing documents',
        text: 'The athletics site references an Athletic Department Handbook 2026-2027 and tryout information, but both sit behind the JS-rendered layer and could not be retrieved.',
      },
    ],
    careNote:
      'This card is deliberately short. Every peer school on this roster publishes a venue list; Gaston Day does not, and the one document that would carry it (the Athletic Handbook) is not reachable. That is a publication gap, not an absence of facilities — a campus fielding 19 sports plainly has them.',
    sources: [
      { label: 'gastonday.org — Academic Profile 2025-2026 (Athletic Director, five-county draw)', url: PROFILE },
      { label: 'Private School Review — Gaston Day School profile (60-acre campus)', url: 'https://www.privateschoolreview.com/gaston-day-school-profile' },
      { label: 'gastondayathletics.com — Spartan Athletics (handbook referenced; JS-rendered)', url: ATHLETICS },
      { label: 'gastonday.org — Middle School (grades 6-8 athletics and eligibility)', url: 'https://www.gastonday.org/middle-school/' },
    ],
  },
}
