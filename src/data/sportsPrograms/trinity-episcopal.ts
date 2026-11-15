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
//     GRADE BAND (7th/8th, 8th). Only three cards are therefore built:
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
//  3. ⚠️ TRINITY IS NOT IN THE GCMSAA. It competes in the Queen City Athletic
//     Association (QCAA) — the name the school's live site uses since its fall
//     2026 redesign; the gone 2023–24 posts used an older name (source-material). The
//     Greater Charlotte Middle School Athletics Association names its
//     eight members in Charlotte Country Day's own 2018-19 information sheet —
//     Cannon, Charlotte Christian, Charlotte Country Day, Charlotte Latin,
//     Covenant Day, Holy Trinity, Lake Norman Charter and Providence Day. Eight
//     of eight named; Trinity absent. NEVER describe Trinity as competing
//     against the peer schools already in this app.
//
//  4. The live site publishes exactly ONE season of results — Fall 2026, in a
//     post dated Oct 21, 2026. (The Fall 2023 and Winter 2024 posts were not
//     migrated to the redesigned site; per the trinitysite plan, a past event
//     whose page is gone comes off the page and stays in source-material.)
//     NO `record` CARD IS BUILT. `TitleResult` is an NCISAA STATE-title
//     vocabulary that cannot express a middle-school CONFERENCE title without
//     making a false claim in the card's most prominent label. See the long
//     note where that card would have gone. The results are carried as prose
//     on 1a and 1e instead, which loses a grid and loses nothing else.
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

const ATHLETICS = 'https://www.tescharlotte.org/community/athletics'
const STAFF = 'https://www.tescharlotte.org/about-us/staculty'
const PROFILE_2627 =
  'https://resources.finalsite.net/images/v1790266877/tescharlotteorg/jraele9yxiqjc8nohifm/26-27SchoolProfile.pdf'
const FALL_2026 =
  'https://www.tescharlotte.org/about-us/news/news-landing-page/~board/news/post/trinity-sweeps-fall-sports-championships'
const FMK = 'https://www.fmkarchitects.com/work/community/trinity-episcopal-school'

export const trinityEpiscopal: SportsProgram = {
  /* ---------------------------------------------------------- 1a offered -- */
  offered: {
    headline:
      '7 sports across 10 season-teams, with no skill-based cuts — "If a student wants to play one of the sports we offer then we create that opportunity."',
    subhead:
      'A K–8 middle school program in the Queen City Athletic Association (QCAA), NOT the GCMSAA that the larger Charlotte independents play in. Teams are fielded by grade band, such as 7th and 8th Grade boys soccer, never as varsity, JV or A/B squads. Motto: "Play Hard, Play Smart, Play Together, and Have Fun".',
    stats: [
      { value: '7', label: 'distinct sports offered' },
      { value: '10', label: 'season-teams across three seasons' },
      { value: '90%', label: 'of Middle School plays in at least one season' },
      { value: 'QCAA', label: 'Queen City Athletic Association · not the GCMSAA' },
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
    // The RESULTS (user, 2026-09-16). Since the fall 2026 redesign the live site
    // publishes one season, Fall 2026 (post dated Oct 21, 2026). The post prints
    // game dates of Nov. 19 and Nov. 20, 2026 — after its own post date — so the
    // season and the post date are cited, never the game dates. The Fall 2023 and
    // Winter 2024 results came off with their gone pages (trinitysite plan); they
    // stay in source-material. There is no `record` card (see the block below).
    footnote:
      'Selected results, not a record. In a post dated Oct 21, 2026, Trinity says its Middle School teams swept their Fall 2026 championships, all in QCAA play. The 7th and 8th Grade boys soccer team "capped its undefeated season with a victory in the Queen City Athletic Association championship." Volleyball earned "Trinity\'s first-ever win in the QCAA\'s volleyball championship." The 8th Grade girls team also placed runner-up in the regular season. The boys and girls cross country teams both won the QCAA\'s Championship Run-Off at McAlpine Creek Park. Each team had three runners in the top 5, and an 8th Grade runner won the boys race.',
    sources: [
      { label: 'tescharlotte.org — Athletics', url: ATHLETICS },
      { label: '2026-27 School Profile (PDF) — flag football listed', url: PROFILE_2627 },
      { label: 'FMK Architects — Trinity Episcopal School project page', url: FMK },
      {
        label: 'tescharlotte.org — "Trinity Sweeps Fall Sports Championships", Oct 2026',
        url: FALL_2026,
      },
    ],
  },

  /* ------------------------------------------- 1b record — DELIBERATELY OMITTED -- */
  //
  // NO `record` CARD IS BUILT FOR TRINITY, and this is a correctness decision
  // rather than a thin-data one. The one season Trinity's live site publishes,
  // Fall 2026, holds genuinely strong results — a sweep of the fall
  // championships, including the school's first-ever QCAA volleyball title —
  // and they ARE carried on this page, as prose, in `offered.footnote` and in
  // `coaching` below. What could not be built is the MATRIX.
  //
  // The reason: `TitleResult` in ../sportsProgram.ts is an NCISAA STATE-title
  // vocabulary, and every value in it makes a claim Trinity cannot support.
  // Per that type's own doc comments, 'STATE' means NCISAA state champion,
  // 'RUNNER-UP' means LOST IN THE STATE FINAL, and 'SEMIFINAL' means reached
  // the state semifinal. Trinity's championships are MIDDLE-SCHOOL QUEEN CITY
  // ATHLETIC ASSOCIATION titles. Marking a QCAA champion 'STATE' claims a state
  // title the school has never won; marking it 'RUNNER-UP' claims it LOST a
  // state final it never played in. Both are false statements rendered as a
  // chip, and the chip is the most prominent label in the card. The type
  // simply cannot express what this school won.
  //
  // Two further signals that the matrix is the wrong instrument here, not just
  // an awkward fit: the heading above it is hardcoded chrome reading
  // "State-title matrix, last N seasons" (sports.stateTitleMatrix), which is
  // false for Trinity on its face; and `seasonLabels` on every other school is
  // a school YEAR ('23–24), whereas Trinity publishes a single SEASON
  // (Fall 2026).
  //
  // Filling the matrix with 'NONE' in every cell was considered and rejected:
  // `WinningRecordBody` renders the matrix heading and grid unconditionally, so
  // that ships a grid of em dashes under a false heading — an empty shell,
  // which the zero-items rule forbids. A card whose required shape the data
  // cannot honestly fill is omitted, not faked.

  /* --------------------------------------------------------- 1e coaching -- */
  // Rebuilt 2026-11-14 (trinitysite) from the live Athletics page, the staff
  // directory and the Fall 2026 post. Removed with their gone source
  // (the Feb 2024 championship post): "head basketball coach since 2004", "20 yrs",
  // "~250" and the "20 daggum years" quote. The parent and alum soccer coaches
  // and the parent cross country coach stay unnamed (families of K–8 minors);
  // staff are named by their live titles.
  coaching: {
    headline:
      'A three-person athletics staff led by Athletic Director David Martin, with teams coached by Trinity staff and parents.',
    subhead:
      'The Athletics page lists three staff: Athletic Director David Martin, K-8 Healthful Living Teacher Jason Martin, and Jalen Haffaney, Assistant Athletic Director & P.E. Teacher. In Fall 2026, Jason Martin coached cross country, and two staff members coached volleyball. Trinity parents and a Trinity alum coached boys soccer.',
    featured: [
      {
        kicker: 'Athletic Director',
        name: 'David Martin',
        stats: [
          { value: '3', label: 'athletics staff on the Athletics page' },
          { value: '4', label: 'QCAA titles in Fall 2026: soccer, volleyball, boys and girls cross country' },
        ],
        detail:
          'Martin leads the athletics department, and the staff directory also lists him as a Healthful Living Teacher. He works with Assistant Athletic Director Jalen Haffaney, who also teaches P.E. The school\'s site does not say how long Martin has held the role.',
      },
    ],
    tenure: [
      { name: 'David Martin', role: 'Athletic Director', width: 1, since: 'tenure not published' },
      {
        name: 'Jalen Haffaney',
        role: 'Assistant Athletic Director & P.E. Teacher',
        width: 1,
        since: 'tenure not published',
      },
      {
        name: 'Jason Martin',
        role: 'K-8 Healthful Living Teacher · Cross Country coach',
        width: 1,
        since: 'coached Fall 2026',
      },
      {
        name: 'Rachel Fuller',
        role: '3rd Grade Instructional Assistant · Volleyball coach',
        width: 1,
        since: 'coached Fall 2026',
      },
      {
        name: 'Claire Walter',
        role: 'K-4 Counselor · Volleyball coach',
        width: 1,
        since: 'coached Fall 2026',
      },
    ],
    // No `worthKnowing` (user, 2026-09-16) — it inventoried confirmed nulls
    // (no records, schedules, rosters, venues or trainer), the conference's lack
    // of a web presence, and a "not found" coach the pass could not verify. All
    // of it remains in source-material/sports/trinity-episcopal/.
    // ⚠️ The Grady Smith attribution stays OUT: "not found" is not the same as
    // confirmed absent, so it is neither shipped nor recorded as a verified null.
    sources: [
      { label: 'tescharlotte.org — Athletics (athletics staff listing)', url: ATHLETICS },
      { label: 'tescharlotte.org — Staculty directory', url: STAFF },
      {
        label: 'tescharlotte.org — "Trinity Sweeps Fall Sports Championships", Oct 2026',
        url: FALL_2026,
      },
    ],
  },
}
