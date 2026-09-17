// Trinity Episcopal School — Sports research area.
//
// Every figure is traceable to the two committed research files under
// source-material/sports/trinity-episcopal/, which carry the provenance header,
// source URLs and per-item gap notes:
//
//   "Trinity Episcopal School - Sports - Sports Offered and Participation.md"
//   "Trinity Episcopal School - Sports - Selected Results and Coaching.md"
//
// FOUR THINGS ABOUT THIS SCHOOL THAT MAKE IT UNLIKE EVERY OTHER SCHOOL IN THE SET,
// each of which is a live contamination risk rather than a stylistic note:
//
//  1. Trinity Charlotte is K–8. It fields MIDDLE SCHOOL teams only — the words
//     "varsity" and "JV" appear NOWHERE in its material. Teams are fielded by
//     GRADE BAND (7th/8th, 8th, 6th/7th). Only three cards are therefore built:
//     1a offered and 1e coaching. The four college-bound cards (pipeline,
//     honors, facilities, national) are omitted entirely — their absence is a
//     property of a K–8 school, not a gap in the research — and 1b record is
//     omitted for a separate, sharper reason given in point 4.
//
//  2. ⚠️ TRINITY EPISCOPAL SCHOOL, RICHMOND VA (trinityes.org) is a grades 8–12
//     HIGH SCHOOL with a full varsity schedule, state championships and college
//     commits. A search for "Trinity Episcopal athletics" returns exactly that —
//     and it is the wrong school. Any varsity or state-title result attributed
//     to "Trinity Episcopal" belongs to Richmond until proven otherwise on
//     tescharlotte.org.
//
//  3. ⚠️ TRINITY IS NOT IN THE GCMSAA. It competes in the Queen City Conference
//     (QCC). The Greater Charlotte Middle School Athletics Association names its
//     eight members in Charlotte Country Day's own 2018-19 information sheet —
//     Cannon, Charlotte Christian, Charlotte Country Day, Charlotte Latin,
//     Covenant Day, Holy Trinity, Lake Norman Charter and Providence Day. Eight
//     of eight named; Trinity absent. NEVER describe Trinity as competing
//     against the peer schools already in this app.
//
//  4. There are exactly TWO seasons on record — Fall 2023 and Winter 2024 — and
//     nothing athletic has been published since February 2024. NO `record` CARD
//     IS BUILT. The results are real and strong, but `TitleResult` is an NCISAA
//     STATE-title vocabulary that cannot express a middle-school CONFERENCE
//     title without making a false claim in the card's most prominent label.
//     See the long note where that card would have gone. The results are
//     carried as prose on 1a and 1e instead, which loses a grid and loses
//     nothing else.
//
// One structural note on this file: the SportsProgram type has no `flags` field
// (flags are a College Support / After School concept), so the research file's
// verify / discrepancy / gap items had been carried in the cards' own prose
// slots. Most of those were removed at review (2026-09-16) as apparatus — the
// flag-football source conflict, the campus paragraph, the participation
// qualifier and the whole `worthKnowing` null inventory. The GCMSAA negative
// survives in 1a's subhead, because it prevents a wrong-school claim. Every
// removed item is still in source-material/sports/trinity-episcopal/.

import type { SportsProgram } from '../sportsProgram.ts'

const ATHLETICS = 'https://www.tescharlotte.org/community/athletics.cfm'
const PROFILE_2627 =
  'https://www.tescharlotte.org/editoruploads/files/26-27SchoolProfile.pdf'
const PROFILE_2526 =
  'https://www.tescharlotte.org/editoruploads/files/25-26SchoolProfile.pdf'
const FALL_2023 = 'https://www.tescharlotte.org/blog.cfm?threadid=10'
const CHAMPIONSHIP = 'https://www.tescharlotte.org/blog.cfm?threadid=12'
const FMK = 'https://www.fmkarchitects.com/work/community/trinity-episcopal-school'

export const trinityEpiscopal: SportsProgram = {
  /* ---------------------------------------------------------- 1a offered -- */
  offered: {
    headline:
      '7 sports across 10 season-teams, with no skill-based cuts — "If a student wants to play one of the sports we offer then we create that opportunity."',
    subhead:
      'A K–8 middle school programme in the Queen City Conference, NOT the GCMSAA that the larger Charlotte independents play in. Teams are fielded by grade band — 7th/8th, 8th, 6th/7th — never as varsity, JV or A/B squads. Motto: "Play Hard, Play Smart, Play Together, and Have Fun".',
    stats: [
      { value: '7', label: 'distinct sports offered' },
      { value: '10', label: 'season-teams across three seasons' },
      { value: '90%', label: 'of Middle School plays in at least one season' },
      { value: 'QCC', label: 'Queen City Conference · not the GCMSAA' },
    ],
    seasons: [
      {
        name: 'Fall',
        note: '4 teams',
        sports: [
          { name: 'Volleyball – Girls', levels: ['MS'] },
          { name: 'Cross Country – Co-Ed', levels: ['MS'] },
          { name: 'Soccer – Boys', levels: ['MS'] },
          { name: 'Tennis – Girls', levels: ['MS'] },
        ],
      },
      {
        name: 'Winter',
        note: '2 teams',
        sports: [
          { name: 'Basketball – Boys', levels: ['MS'] },
          { name: 'Basketball – Girls', levels: ['MS'] },
        ],
      },
      {
        name: 'Spring',
        note: '4 teams',
        sports: [
          { name: 'Tennis – Boys', levels: ['MS'] },
          { name: 'Track and Field – Co-Ed', levels: ['MS'] },
          { name: 'Soccer – Girls', levels: ['MS'] },
          { name: 'Golf – Co-Ed', levels: ['MS'] },
        ],
      },
    ],
    // Trimmed to the RESULTS (user, 2026-09-16). Removed: the 90% participation
    // qualifier, the flag-football three-way source conflict, and the campus /
    // architect paragraph. These are Trinity's only published results and there
    // is no `record` card to carry them (see the block below), so they stay.
    footnote:
      'Selected results, not a record — Trinity has published exactly two seasons, Fall 2023 and Winter 2024, all of it Queen City Conference play. WINTER 2024: "For the first time in school history, the Trinity 8th Grade boys\' basketball team won the Queen City Conference championship on Feb. 8 to cap their undefeated season." The title was clinched in a 54–23 win at home over Carmel Christian. FALL 2023: the girls cross country team was "conference champion for the 4th year running, ranked first among independent schools in North Carolina, and had 7 runners named all-conference." Alongside it, the 7th/8th Grade boys soccer team won both the conference title and the tournament championship; the 8th Grade volleyball team tied for first; and boys cross country placed third, with 3 runners in the top 15 and 1 named all-conference.',
    sources: [
      { label: 'tescharlotte.org — Athletics (under /community/, not /athletics/)', url: ATHLETICS },
      { label: '2026-27 School Profile (PDF) — flag football listed', url: PROFILE_2627 },
      { label: '2025-26 School Profile (PDF) — flag football absent', url: PROFILE_2526 },
      { label: 'FMK Architects — Trinity Episcopal School project page', url: FMK },
      {
        label:
          'tescharlotte.org — "Congrats to Trinity\'s Fall Sports Teams", Nov 03 2023, by Chris Miller (also where the Queen City Conference is named)',
        url: FALL_2023,
      },
      {
        label:
          'tescharlotte.org — "Wildcats Win Historic Basketball Championship", Feb 13 2024, by Chris Miller',
        url: CHAMPIONSHIP,
      },
    ],
  },

  /* ------------------------------------------- 1b record — DELIBERATELY OMITTED -- */
  //
  // NO `record` CARD IS BUILT FOR TRINITY, and this is a correctness decision
  // rather than a thin-data one. The two seasons Trinity has published contain
  // genuinely strong results — a first basketball championship in school
  // history, and a girls cross country team ranked first among independent
  // schools in North Carolina — and they ARE carried on this page, as prose, in
  // `offered.footnote` and in `coaching` below. What could not be built is the
  // MATRIX.
  //
  // The reason: `TitleResult` in ../sportsProgram.ts is an NCISAA STATE-title
  // vocabulary, and every value in it makes a claim Trinity cannot support.
  // Per that type's own doc comments, 'STATE' means NCISAA state champion,
  // 'RUNNER-UP' means LOST IN THE STATE FINAL, and 'SEMIFINAL' means reached
  // the state semifinal. Trinity's championships are MIDDLE-SCHOOL QUEEN CITY
  // CONFERENCE titles. Marking a QCC champion 'STATE' claims a state title the
  // school has never won; marking it 'RUNNER-UP' claims it LOST a state final
  // it never played in. Both are false statements rendered as a chip, and the
  // chip is the most prominent label in the card. The type simply cannot
  // express what this school won.
  //
  // Two further signals that the matrix is the wrong instrument here, not just
  // an awkward fit: the heading above it is hardcoded chrome reading
  // "State-title matrix, last N seasons" (sports.stateTitleMatrix), which is
  // false for Trinity on its face; and `seasonLabels` on every other school is
  // a school YEAR ('23–24), whereas Trinity has two disconnected SEASONS
  // (Fall 2023, Winter 2024) with nothing published since February 2024.
  //
  // Filling the matrix with 'NONE' in every cell was considered and rejected:
  // `WinningRecordBody` renders the matrix heading and grid unconditionally, so
  // that ships a 6x2 grid of em dashes under a false heading — an empty shell,
  // which the zero-items rule forbids. A card whose required shape the data
  // cannot honestly fill is omitted, not faked.

  /* --------------------------------------------------------- 1e coaching -- */
  coaching: {
    headline:
      'One name carries this programme: David Martin, Athletic Director and head basketball coach since 2004 — a twenty-year tenure that ended in the school\'s first championship.',
    subhead:
      'Athletic Director: David Martin, who is also the only athletics staff member Trinity lists anywhere. Assistant Coach Jason Martin works alongside him on the basketball staff.',
    featured: [
      {
        kicker: 'The twenty-year anchor · AD and head basketball coach, since 2004',
        name: 'David Martin',
        stats: [
          { value: '20 yrs', label: 'leading the basketball programme' },
          { value: '2004', label: 'joined Trinity; the team began with him' },
          { value: '~250', label: 'students on the 8th Grade team, by his own count' },
        ],
        detail:
          'Martin has helmed the basketball team since its beginning in 2004 when he joined Trinity. By his count, some 250 students have played on the 8th Grade team in that time — the school\'s own hedge, and it should be carried rather than presented as a counted figure. There had been many close brushes with a championship before the Feb. 8, 2024 win: "For 20 daggum years, I have thought about this moment pretty much nonstop," Martin said. "I can\'t explain how much energy has gone into trying to win this tournament championship over the last 20 years." He is Athletic Director as well as head coach, which is what a K–8 athletics department of this size looks like from the inside.',
      },
    ],
    tenure: [
      {
        name: 'David Martin',
        role: 'Athletic Director · Head Basketball Coach',
        width: 1,
        since: 'since 2004',
      },
      {
        name: 'Jason Martin',
        role: 'Assistant Coach, basketball — "another longtime Trinity staculty member"',
        width: 0.5,
        since: 'longtime',
        toVerify: true,
      },
    ],
    // No `worthKnowing` (user, 2026-09-16) — it inventoried confirmed nulls
    // (no records, schedules, rosters, venues or trainer), the QCC's lack of a
    // web presence, and a "not found" coach the pass could not verify. All of it
    // remains in source-material/sports/trinity-episcopal/.
    // ⚠️ The Grady Smith attribution stays OUT: "not found" is not the same as
    // confirmed absent, so it is neither shipped nor recorded as a verified null.
    sources: [
      {
        label: 'tescharlotte.org — "Wildcats Win Historic Basketball Championship", Feb 13 2024',
        url: CHAMPIONSHIP,
      },
      { label: 'tescharlotte.org — Athletics (Athletic Director listing)', url: ATHLETICS },
    ],
  },
}
