// Trinity Episcopal School — The Arts.
//
// Transcribed from the two committed research files under
// source-material/the-arts/trinity-episcopal/, each of which carries a
// provenance header, source URLs and per-item VERIFIED / CONFIRMED-ABSENT
// markers:
//
//   "Trinity Episcopal School - The Arts - Program Overview and Ensembles.md"
//   "Trinity Episcopal School - The Arts - Recognition and Exhibitions.md"
//
// Five things worth knowing before editing this file, each of which was a real
// error caught during research rather than a stylistic preference:
//
//  1. ⚠️ STUDENT NAMES ARE DELIBERATELY OMITTED. Every award on the `visual`
//     card was won by a named K–8 student and those names are not recorded.
//     Project rule, set by the user 2026-09-16: report the recognition — the
//     award, venue, date, count and denominator — without identifying the
//     child. ADULTS ARE NAMED in their professional capacity (the Visual Arts
//     Director, the art teacher, the Head of School), which is standard for
//     staff across the roster.
//
//  2. ⚠️ THERE IS NO STRINGS OR ORCHESTRA ENSEMBLE, and this resolves a
//     documented conflict between sources. `strings`, `string ensemble` and
//     `orchestra` return ZERO hits across all 98 sitemap pages and the 2026-27
//     School Profile PDF. The contradicting "fourth grade… chorus, strings or
//     band" wording was traced to /academics/lower-school/ls-curriculum, which
//     now returns HTTP 404 and whose last Wayback capture is 2021. The school
//     moved from *4th grade / three ensembles including strings* to *5th grade /
//     two ensembles* some time after 2021; the old wording survives only in
//     search-engine snippets. Do not ship strings.
//
//  3. ⚠️ TRINITY DOES NOT COMPETE IN THE BLUMEYS and this card set must never
//     mention them. The Blumeys are Blumenthal Performing Arts' HIGH-SCHOOL
//     musical-theatre awards; Trinity is K–8. The shared `theatre` card title is
//     "Theatre & the Blumeys", so this school needs a TITLE_OVERRIDES entry in
//     artsProgram.ts — see the note at the foot of this file. The `ledger` field
//     is deliberately left undefined: there is no awards circuit to ledger, and
//     Trinity's genuine recognition is visual-arts, so it lives on `visual`.
//
//  4. ⚠️ NO FACILITIES ARE NAMED. `auditorium`, `black box` and `art gallery`
//     return ZERO hits across all 98 pages. The only named campus facility is
//     the IDEA (STEM) Lab, which is not an arts space; chapel and performance
//     gatherings happen in "our Gym" and Jamie's Courtyard, both generic. No
//     `photo` slot is filled on any card here — per the handoff, a slot with no
//     genuine photo is dropped rather than shipped as an empty placeholder.
//
//  5. ⚠️ THE PRODUCTION SLATE CONFLICTS between the 2026-27 School Profile PDF
//     and the live web pages, and the Vimeo record supports BOTH. The ensemble
//     ladder is stable and is cited from the web pages; the production slate is
//     presented as varying by year rather than as a fixed annual calendar. That
//     conflict is stated in full on the `theatre` card rather than resolved
//     silently in favour of one source.
//
// One more trap recorded for whoever edits this next: the site's own search at
// /search.cfm?q= is JS-rendered and returns only nav chrome, yielding zero
// results for terms that demonstrably exist on the site. Every negative above
// was established by grepping a locally fetched 98-page corpus, never by the
// site search. And there is no /arts page on this site at all — the arts data
// lives on the two Enrichments pages, in the profile PDF, and on Vimeo.

import type { ArtsProgram } from '../artsProgram.ts'

const LS_ENRICH =
  'https://www.tescharlotte.org/academics/lower-school-enrichments.cfm'
const MS_ENRICH =
  'https://www.tescharlotte.org/academics/middle-school-enrichments.cfm'
const PROFILE_2627 =
  'https://www.tescharlotte.org/editoruploads/files/26-27SchoolProfile.pdf'
const VIMEO = 'https://vimeo.com/api/v2/tescharlotte/videos.json'
const HONORED =
  'https://www.tescharlotte.org/trinity-artists-honored-in-local-exhibits/'
const CATO =
  'https://www.tescharlotte.org/jen-rankey-zona-receives-excellence-in-teaching-award/'
const GHANA =
  'https://www.tescharlotte.org/fifth-grade-continues-art-exchange-with-ghana-students/'

export const trinityEpiscopal: ArtsProgram = {
  /* ------------------------------------------------------------- 1a ladder -- */
  ladder: {
    headline:
      'General music for every child through 4th grade, then a single choice — chorus or band — that carries a student to Advanced Band or Advanced Choir by 8th.',
    // No subhead and no stat strip (user, 2026-09-16). The subhead compared
    // Trinity against the K-12 schools on the roster — absent rungs a K-8 school
    // is not missing — and the four tiles restated the headline (K–8, two
    // ensembles, the 5th-grade choice), with TAB named and explained in the
    // cards below. Both added emphasis rather than information.
    divisions: [
      {
        name: 'Lower School',
        grades: 'K–4',
        items: [
          'General music classes for all students — "The music program provides many opportunities for individual growth and fosters every child\'s innate love of music."',
          'Visual art on the Teaching Artistic Behaviors (TAB) model from the start — choice-based, teacher-facilitated, worked in centers or mini-art studios',
          'A dramatic or musical performance at every grade level, such as Fairy Tale Plays in First Grade and Shakespeare in Fifth Grade',
          'A 5th-grade art exchange with students in Ghana, running since 2023-24',
        ],
      },
      {
        name: 'The ensemble choice',
        grades: '5',
        items: [
          '"Beginning in 5th Grade, students may choose from one of two ensembles: chorus or band."',
          'Ensembles perform at chapels, commencement, and venues outside of school',
          'No audition is described — the choice is between two ensembles, not a competition for a seat',
          'NOT offered: strings or orchestra. Neither exists at Trinity; a 2021 page that said otherwise is dead',
        ],
      },
      {
        name: 'Middle School',
        grades: '6–8',
        items: [
          '"6th Grade students choose from one of two ensembles: choir or band."',
          '"7th and 8th Grade students who decide to continue in an ensemble can choose Advanced Band or Advanced Choir…"',
          'A drama elective available within the schedule, plus a winter play or spring musical',
          'Studio Art in 7th and 8th — the course whose students exhibited at the VAPA Center in 2026',
        ],
      },
    ],
    enrichmentTitle: 'The enrichment layer',
    enrichment: [
      {
        label: 'Where the work goes public',
        text: 'Ensembles perform "at chapels, commencement, and various venues outside of school", and the school posts full-length recordings to its own Vimeo channel rather than a photo gallery — concerts, plays and the Shakespeare review run 20 to 70 minutes each. Visual work travels further: two external Charlotte venues in 2026 alone, the Carolina Theatre and the VAPA Center.',
      },
      {
        label: 'An international exchange',
        text: 'Fifth grade runs an art exchange with students in Ghana through the nonprofit Children Inspiring Hope (CIH), begun in 2023-24 and in its second consecutive year as of October 2024 — CIH\'s first new partner school since the pandemic. Led by Visual Arts Director Jen Rankey-Zona with CIH founder Amy Gaylor Nedriga.',
      },
      {
        label: 'The wording shift, preserved',
        text: 'The school writes "chorus" for the 5th-grade ensemble and "choir" for the 6th, on two different pages.',
      },
      // No "What is not published" row (user, 2026-09-16) — it inventoried
      // absent facility names (zero-hit searches, the non-arts STEM lab) rather
      // than describing the arts program. Still in source-material/.
    ],
    sources: [
      { label: 'tescharlotte.org — Lower School Enrichments', url: LS_ENRICH },
      { label: 'tescharlotte.org — Middle School Enrichments', url: MS_ENRICH },
      { label: '2026-27 School Profile (PDF)', url: PROFILE_2627 },
    ],
  },

  /* ------------------------------------------------------------ 1b theatre -- */
  theatre: {
    headline:
      'A dramatic or musical performance at every grade level in Lower School, plus a drama elective and a winter/spring production in Middle School.',
    // No subhead (user, 2026-09-16) — it explained why a K-8 school has no
    // awards ledger, which is apparatus about the card rather than the program.
    seasonTitle: 'The season — as the school describes it',
    season: [
      {
        season: 'Lower School',
        kind: 'Grade-level productions',
        detail:
          '"Each grade level in Lower School features a dramatic or musical performance, such as Fairy Tale Plays in First Grade and Shakespeare in Fifth Grade." Both are on the record: Durban:Holthouser 1st Grade Fairy Tale Plays (Feb 2025, 28:37) and Shakespeare 2025 (May 2025, 45:32). A 4th Grade "Aladdin" Performance (Nov 2021, 35:02) shows the slate is not fixed year to year.',
      },
      {
        season: 'Middle School',
        kind: 'Elective + one or two productions',
        detail:
          '"Middle School students may also choose to take the drama elective within their schedule, or participate in the winter play or spring musical." The most recent named production is Emma - A Pop Musical (Feb 2025, 69:43). Earlier: Spring Arts Fest 2020: Selections from Fiddler on the Roof (May 2020, 10:48).',
      },
    ],
    // No whoRunsIt, venueNote, ledgerTitle or honestContext (user, 2026-09-16).
    // All four described the RESEARCH rather than the productions: unpublished
    // staff credits, absent venues, two sources disagreeing about the slate, and
    // why a K-8 school has no awards circuit. The season above and the Vimeo
    // record are the card. Every detail remains in source-material/.
    sources: [
      { label: 'tescharlotte.org — Lower School Enrichments', url: LS_ENRICH },
      { label: 'tescharlotte.org — Middle School Enrichments', url: MS_ENRICH },
      { label: '2026-27 School Profile (PDF) — the conflicting slate', url: PROFILE_2627 },
      { label: 'Trinity\'s own Vimeo channel (API listing)', url: VIMEO },
      { label: 'Shakespeare 2025', url: 'https://vimeo.com/1089330054' },
      { label: 'Emma - A Pop Musical', url: 'https://vimeo.com/1059929386' },
      {
        label: 'Durban:Holthouser 1st Grade Fairy Tale Plays',
        url: 'https://vimeo.com/1059308131',
      },
      { label: '4th Grade "Aladdin" Performance', url: 'https://vimeo.com/642493556' },
      {
        label: 'Spring Arts Fest 2020: Selections from Fiddler on the Roof',
        url: 'https://vimeo.com/421094281',
      },
    ],
  },

  /* -------------------------------------------------------------- 1c music -- */
  music: {
    headline:
      'Two ensembles, one choice, no audition — chorus or band from 5th grade, continuing as Advanced Band or Advanced Choir in 7th and 8th.',
    // The comparative opening (no honors pipeline, the circuits a K-8 school
    // cannot enter) removed 2026-09-16; what remains describes the program.
    subhead:
      'An ensemble every interested student can join, and a performance calendar that reaches outside the building.',
    boardTitle: 'The ensemble board — how a student gets in',
    tracks: [
      {
        label: 'Curricular, K–4 — everyone participates',
        ensembles: ['General music classes'],
      },
      {
        label: 'Curricular, 5th grade — choose one of two',
        ensembles: ['Chorus', 'Band'],
      },
      {
        label: 'Curricular, 6th grade — choose one of two',
        ensembles: ['Choir', 'Band'],
      },
      {
        label: 'Curricular, 7th–8th — for those continuing',
        ensembles: ['Advanced Band', 'Advanced Choir'],
      },
    ],
    // No boardNote (user, 2026-09-16) — the no-audition point is already carried
    // by the ladder rows below ("No audition, no prerequisite"), and the rest was
    // apparatus: zero-hit searches for strings/orchestra and a 404'd page.
    ladderTitle: 'Where the ensembles actually perform',
    ladder: [
      {
        label: 'Join in 5th grade',
        text: '"Beginning in 5th Grade, students may choose from one of two ensembles: chorus or band." No audition, no prerequisite and no instrument requirement is published.',
      },
      {
        label: 'Continue through Middle School',
        text: '"6th Grade students choose from one of two ensembles: choir or band. 7th and 8th Grade students who decide to continue in an ensemble can choose Advanced Band or Advanced Choir…" — continuing is framed as a decision the student makes, not a selection made about them.',
      },
      {
        label: 'Perform on and off campus',
        text: '"Ensembles perform at chapels, commencement, and various venues outside of school." The outside-school venues are not named.',
      },
      {
        label: 'On the record',
        text: 'The school posts full concerts to its own Vimeo channel: 5th and 6th Grade Band Concert 11-16-21 (21:48) and 5th-6th Grade Fall Choir Performance - Final (Oct 2021, 33:37), alongside smaller pieces such as TES Presents: Crowded Table (2021), Kindergarten Students Present: For the Beauty of the Earth (2020), Love Train (2020), TES presents: Be A Light (2021) and What the World Needs Now (2021).',
      },
    ],
    // No ladderNote (user, 2026-09-16) — an inventory of what the school does
    // not publish (faculty names, ensemble sizes, festival selection).
    sources: [
      { label: 'tescharlotte.org — Lower School Enrichments', url: LS_ENRICH },
      { label: 'tescharlotte.org — Middle School Enrichments', url: MS_ENRICH },
      { label: 'Trinity\'s own Vimeo channel (API listing)', url: VIMEO },
      {
        label: '5th and 6th Grade Band Concert 11-16-21',
        url: 'https://vimeo.com/647455856',
      },
      {
        label: '5th-6th Grade Fall Choir Performance - Final',
        url: 'https://vimeo.com/637686767',
      },
    ],
  },

  /* ------------------------------------------------------------- 1d visual -- */
  visual: {
    headline:
      'A named choice-based pedagogy — Teaching Artistic Behaviors — and the one area where Trinity wins things outside the building.',
    subhead:
      'Student work reached two external Charlotte venues in 2026, the Visual Arts Director took a 2025 CATO Excellence in Teaching Award as one of six educators recognized across the Charlotte area, and 5th grade has run an art exchange with students in Ghana since 2023-24.',
    // NOTE: the no-minor-names rule still applies to this card — the sentence
    // that STATED it was removed 2026-09-16 as apparatus, not the practice.
    // Never add a student's name here; report the recognition, not the child.
    // No media grid (user, 2026-09-17) — three medium names with one-line
    // sourcing notes, plus a centers gloss, read as research annotation beside
    // the TAB pedagogy the card is actually about. Still in source-material/.
    // No `pathTitle`: it was byte-identical to the shared sections.coursePath
    // chrome, and a lifted heading pins that heading to English in all ten
    // locales. Deleted 2026-09-16, as the other schools' copies already were.
    path: [
      { name: 'K–4 art, on the TAB model' },
      { name: 'Middle School art' },
      { name: 'Studio Art (7–8)', terminal: true },
    ],
    // Trimmed to the school's own words (user, 2026-09-16); the removed opening
    // described how the rung was NAMED and what catalog is not published.
    pathNote:
      '"Trinity\'s art curriculum follows the pedagogy of Teaching Artistic Behaviors (TAB), a methodology that is student-focused, choice-based, and teacher-facilitated."',
    exhibitsTitle: 'Where the work goes public — and what it has won',
    exhibits: [
      {
        when: 'March 2026',
        name: 'Youth Art Month — Carolina Theatre',
        detail:
          'Six Lower School students were selected for the Youth Art Month exhibition at the Carolina Theatre, spanning Kindergarten through 4th grade — one student each from K, 1st, 2nd and 4th, and two from 3rd.',
      },
      {
        when: 'February 2026',
        name: '"Deeply Rooted" — VAPA Center',
        detail:
          'Seventeen seventh- and eighth-grade Studio Art students exhibited work on Charlotte\'s Black history at the VAPA Center.',
      },
      {
        when: 'March 2026',
        name: 'Two stipend awards',
        detail:
          'Two students received stipend awards for individual works — one 8th-grade piece titled "The Laureate", honoring North Carolina poet laureate Jaki Shelton Green, and one 7th-grade piece titled "The Boy Who Flew."',
      },
      {
        when: 'May 2025',
        name: 'CATO Excellence in Teaching Award',
        detail:
          'Visual Arts Director Jen Rankey-Zona, a founding teacher of the school, received a 2025 CATO Excellence in Teaching Award from the Arts & Science Council — one of six educators recognized across the Charlotte area. "I\'m humbled and honored." Head of School Imana Sherrill: "Her impact is felt deeply at Trinity and far beyond."',
      },
      {
        when: 'Since 2023-24',
        name: 'Art exchange with Ghana',
        detail:
          'Fifth grade runs an ongoing exchange with students in Ghana through the nonprofit Children Inspiring Hope, in its second consecutive year as of October 2024 and CIH\'s first new partner school since the pandemic. Led by Jen Rankey-Zona with CIH founder Amy Gaylor Nedriga; two exchanges are described, one on shared humanity, generosity and kindness, and one on water as a global resource. No Ghanaian partner school is named.',
      },
    ],
    // Trimmed to the faculty fact (user, 2026-09-16). What went: the statement
    // of the no-minor-names policy, a post-mortem on an earlier sweep's false
    // negative, and a Lower/Middle spelling variance in the TAB passage.
    // ⚠️ The no-minor-names POLICY still applies — never name a student here.
    footnote:
      'Faculty: Jen Rankey-Zona is Visual Arts Director and a founding teacher of the school; Shelby Hawk is the art teacher — "I am truly so honored to teach these wonderful artists."',
    sources: [
      {
        label: 'tescharlotte.org — "Trinity Artists Honored in Local Exhibits", March 7 2026',
        url: HONORED,
      },
      {
        label: 'tescharlotte.org — "Jen Rankey-Zona Receives Excellence in Teaching Award", May 2025',
        url: CATO,
      },
      {
        label: 'tescharlotte.org — "Fifth Grade Continues Art Exchange with Ghana Students", Oct 29 2024',
        url: GHANA,
      },
      { label: 'tescharlotte.org — Lower School Enrichments (TAB pedagogy)', url: LS_ENRICH },
      { label: 'tescharlotte.org — Middle School Enrichments (TAB pedagogy)', url: MS_ENRICH },
    ],
  },

  /* ------------------------------------------------------------ 1e verdict -- */
  verdict: {
    headline:
      'A real arts programme for a K–8 school, strongest in the studio: a named pedagogy, two external exhibitions in one year, an award-winning director, and an international exchange.',
    // No subhead (user, 2026-09-16) — it summarised what the school does not
    // publish, and pointed at gap notes this card no longer carries.
    // No `holdsUp` (user, 2026-09-16) — the six checkmark rows restated the
    // cards above (the TAB pedagogy, the two exhibitions, the CATO award, the
    // ensemble ladder, the Vimeo record, the Ghana exchange) as a summary.
    // Per-school heading: this panel is Trinity's visit checklist.
    askTitle: 'Visit Checklist',
    ask: [
      'Where do the plays and concerts actually happen? No auditorium, black box or theatre appears anywhere on your site — chapel and performances are described as being in "our Gym" and Jamie\'s Courtyard. What is "Trinity\'s Center for Community and the Arts", and is it a performance space?',
      'Who teaches music? No music faculty member is named anywhere on the site, though the Visual Arts Director and the art teacher both are.',
      'Which productions are running this year, and in which grades? Your 2026-27 profile says 4th Grade Musical and a Middle School fall play plus winter musical; your web pages say 1st Grade Fairy Tale Plays, 5th Grade Shakespeare, and a winter play plus spring musical. Which is current?',
      'Is "chorus" in 5th grade the same ensemble as "choir" in 6th, or two different groups? Your own pages use both words.',
      'Is there any strings or instrumental option beyond band? Older search results still show a "chorus, strings or band" choice, but that page is gone and strings appears nowhere current.',
      'What does the art course sequence look like on paper between Kindergarten and Studio Art in 7th and 8th — and does TAB continue all the way up, or does Middle School become more directed?',
      'Can a student do a sport and an ensemble in the same season? With roughly 90% of the Middle School playing a sport, the overlap must be routine — how do the calendars work together?',
      'Which outside-school venues do the ensembles perform at? Your pages say they perform "at venues outside of school" without naming any.',
      'Does the Ghana exchange still run, and does it reach grades other than 5th?',
    ],
    sources: [
      { label: 'tescharlotte.org — Lower School Enrichments', url: LS_ENRICH },
      { label: 'tescharlotte.org — Middle School Enrichments', url: MS_ENRICH },
      { label: '2026-27 School Profile (PDF)', url: PROFILE_2627 },
      {
        label: 'Verdict synthesized by the researcher from the sources cited on cards 1a–1d',
      },
    ],
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// ⚠️ FOLLOW-UP REQUIRED OUTSIDE THIS FILE — two registration steps and a title
// override, none of which this file can perform on its own:
//
//  1. Register this module in src/data/artsProgram.ts (import + PROGRAMS entry)
//     and its sports counterpart in src/data/sportsProgram.ts. Until then
//     neither card set renders.
//
//  2. ADD A TITLE_OVERRIDES ENTRY in src/data/artsProgram.ts:
//
//        'trinity-episcopal': {
//          ladder: 'The K–8 Arts Ladder',
//          theatre: 'Theatre & Grade-Level Productions',
//        },
//
//     Both are required rather than cosmetic. The shared ladder title reads
//     "The TK–12 Arts Ladder" and Trinity ends at 8th grade. The shared theatre
//     title reads "Theatre & the Blumeys" — Blumenthal Performing Arts' regional
//     HIGH-SCHOOL musical-theatre awards — and per the standing rule in that
//     file, a card naming them must not appear for a school that does not
//     compete in them. A K–8 school cannot.
// ─────────────────────────────────────────────────────────────────────────────
