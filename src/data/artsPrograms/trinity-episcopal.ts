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
//  4. ⚠️ ONE ARTS SPACE IS NAMED, AND ONLY IN PASSING. The redesigned site
//     (fall 2026) holds its open house in the "CCA Auditorium" in "Trinity's
//     Center for Community and the Arts", but never says plays or concerts are
//     staged there — so the visit checklist asks rather than the cards
//     asserting it. `black box` and `art gallery` still return zero hits. No
//     `photo` slot is filled on any card here — per the handoff, a slot with no
//     genuine photo is dropped rather than shipped as an empty placeholder.
//
//  5. ⚠️ THE LOWER SCHOOL PRODUCTION SLATE CONFLICTS between the 2026-27
//     School Profile PDF (4th Grade Musical) and the live Lower School page
//     (1st Grade Fairy Tale Plays), and the Vimeo record supports BOTH. The
//     Middle School half was resolved by the 2026 redesign: the page now says
//     "after-school fall play or winter musical", matching the profile, and the
//     drama elective is no longer stated. The slate is presented as varying by
//     year, and the open Lower School question is on the visit checklist.
//
// Live-site recheck 2026-11-14 (plan trinitysite): the redesign dropped the
// 2025 Arts & Science Council teaching-award post and the 5th-grade
// international art-exchange post. Per the user's
// "live site only" decision both came OUT of these cards even though true;
// the Wayback copies stay in source-material/ as the record.
//
// One more trap recorded for whoever edits this next: the site's own search at
// /search.cfm?q= is JS-rendered and returns only nav chrome, yielding zero
// results for terms that demonstrably exist on the site. Every negative above
// was established by grepping a locally fetched 98-page corpus, never by the
// site search. And there is no /arts page on this site at all — the arts data
// lives in the enrichment tiles on the Lower and Middle School pages, in the
// profile PDF, in the staff directory, and on Vimeo.

import type { ArtsProgram } from '../artsProgram.ts'

const LS_ENRICH = 'https://www.tescharlotte.org/academics/lower-school'
const MS_ENRICH = 'https://www.tescharlotte.org/academics/middle-school'
const PROFILE_2627 =
  'https://resources.finalsite.net/images/v1790266877/tescharlotteorg/jraele9yxiqjc8nohifm/26-27SchoolProfile.pdf'
const VIMEO = 'https://vimeo.com/api/v2/tescharlotte/videos.json'
const NEWS = 'https://www.tescharlotte.org/about-us/news/news-landing-page/~board/news/post/'
const HONORED = `${NEWS}trinity-artists-honored-in-local-exhibits`
const GRANT = `${NEWS}2026-light-the-fire-grants-announced`
const NINE_ELEVEN = `${NEWS}25-years-after-911-trinitys-hands-still-touch-ground-zero`
const STACULTY = 'https://www.tescharlotte.org/about-us/staculty'
const CALENDAR = 'https://www.tescharlotte.org/calendar'
const EVENTS = 'https://www.tescharlotte.org/admissions/admission-events-tours'
const BEYOND = 'https://www.tescharlotte.org/academics/beyondclassroom'

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
          'General music for every student: "All students take general music, which emphasizes creativity, music appreciation, musical literacy, and performance preparation."',
          'Visual art on the Teaching Artistic Behaviors (TAB) model from the start — choice-based, teacher-facilitated, worked in centers or mini-art studios',
          'A dramatic or musical performance at every grade level, such as Fairy Tale Plays in First Grade and Shakespeare in Fifth Grade',
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
          '"Sixth-grade students choose from one of two ensembles: Choir or Band."',
          '"Seventh and 8th grade students who choose to continue in an ensemble can choose Advanced Band or Advanced Choir." In 7th and 8th grade both are year-long electives.',
          'An "after-school fall play or winter musical"',
          'Studio Art, a year-long 7th–8th elective — the course whose students exhibited at the VAPA Center in 2026',
        ],
      },
    ],
    enrichmentTitle: 'The enrichment layer',
    enrichment: [
      {
        label: 'Where the work goes public',
        text: 'Ensembles "may perform at chapels, commencement and various venues outside of school." The school posts full-length recordings to its own Vimeo channel instead of a photo gallery. The full concerts and plays, including the Shakespeare review, run 20 to 70 minutes each. Visual work travels further: to two off-campus Charlotte venues in 2026 alone, the Carolina Theatre and the VAPA Center.',
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
      { label: 'tescharlotte.org — Lower School page (enrichments)', url: LS_ENRICH },
      { label: 'tescharlotte.org — Middle School page (enrichments and electives)', url: MS_ENRICH },
      { label: '2026-27 School Profile (PDF)', url: PROFILE_2627 },
    ],
  },

  /* ------------------------------------------------------------ 1b theatre -- */
  theatre: {
    headline:
      'A dramatic or musical performance at every grade level in Lower School, plus an after-school fall play and winter musical in Middle School.',
    // No subhead (user, 2026-09-16) — it explained why a K-8 school has no
    // awards ledger, which is apparatus about the card rather than the program.
    seasonTitle: 'The season — as the school describes it',
    season: [
      {
        season: 'Lower School',
        kind: 'Grade-level productions',
        detail:
          '"Each grade level in Lower School features a dramatic or musical performance, such as Fairy Tale Plays in First Grade and Shakespeare in Fifth Grade." Both are on the record: Durban:Holthouser 1st Grade Fairy Tale Plays (Feb 2025, 28:37) and Shakespeare 2025 (May 2025, 45:32). A 4th Grade "Aladdin" Performance (Nov 2021, 35:02) shows the slate is not fixed year to year. Lower School students also make regular walks to the Children\'s Theatre.',
      },
      {
        season: 'Middle School',
        kind: 'After-school productions',
        detail:
          '"Middle School students may also choose to participate in the after-school fall play or winter musical." Leslie Cossor is Director of Middle School Theatre Arts. The most recent named production is Emma - A Pop Musical (Feb 2025, 69:43). Earlier: Spring Arts Fest 2020: Selections from Fiddler on the Roof (May 2020, 10:48).',
      },
    ],
    // No whoRunsIt, venueNote, ledgerTitle or honestContext (user, 2026-09-16).
    // All four described the RESEARCH rather than the productions: unpublished
    // staff credits, absent venues, two sources disagreeing about the slate, and
    // why a K-8 school has no awards circuit. The season above and the Vimeo
    // record are the card. Every detail remains in source-material/.
    sources: [
      { label: 'tescharlotte.org — Lower School page (enrichments)', url: LS_ENRICH },
      { label: 'tescharlotte.org — Middle School page (Performing Arts)', url: MS_ENRICH },
      { label: 'tescharlotte.org — Beyond the Classroom', url: BEYOND },
      { label: 'tescharlotte.org — Staculty directory', url: STACULTY },
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
        text: '"Sixth-grade students choose from one of two ensembles: Choir or Band. Seventh and 8th grade students who choose to continue in an ensemble can choose Advanced Band or Advanced Choir." In 7th and 8th grade, both are electives that run "on alternating days for the entire academic year."',
      },
      {
        label: 'Perform on and off campus',
        text: '"Ensembles may perform at chapels, commencement and various venues outside of school." The outside-school venues are not named. The 2026-27 calendar lists a Grades 5-8 Choir Concert on November 10 and a Grades 5-8 Band Concert on November 19.',
      },
      {
        label: 'On the record',
        text: 'the school posts full concerts to its own Vimeo channel: 5th and 6th Grade Band Concert 11-16-21 (21:48) · 5th-6th Grade Fall Choir Performance - Final (Oct 2021, 33:37). Smaller pieces sit alongside them, including: TES Presents: Crowded Table (2021) · Kindergarten Students Present: For the Beauty of the Earth (2020) · Love Train (2020) · TES presents: Be A Light (2021) · What the World Needs Now (2021).',
      },
      {
        label: 'Who teaches it',
        text: 'David Wallace is Band Director and Grades 3-4 Music Teacher. Matt Moorman is Middle School Chaplain and Music Chaplain. Both won the school\'s 2026 Light the Fire grant; Wallace used his to attend the Creative Musicians Retreat in New Hampshire.',
      },
    ],
    // No ladderNote (user, 2026-09-16) — an inventory of what the school does
    // not publish (faculty names, ensemble sizes, festival selection).
    sources: [
      { label: 'tescharlotte.org — Lower School page (enrichments)', url: LS_ENRICH },
      { label: 'tescharlotte.org — Middle School page (Performing Arts, Electives)', url: MS_ENRICH },
      { label: 'tescharlotte.org — Staculty directory', url: STACULTY },
      { label: 'tescharlotte.org — "2026 Light the Fire Grants Announced", Mar 2026', url: GRANT },
      { label: 'tescharlotte.org — 2026-27 calendar', url: CALENDAR },
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
      'A named, choice-based teaching method — Teaching Artistic Behaviors (TAB) — and the one area where Trinity wins things outside the building.',
    subhead:
      'Student work reached two off-campus Charlotte venues in 2026, and two students won stipend awards for their pieces. The art program\'s reach goes back to 2001, when Trinity families painted banners of hope for Ground Zero.',
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
      'The Lower School page: "Trinity\'s art curriculum follows the pedagogy of Teaching Artistic Behaviors (TAB), a methodology that is student-focused, choice-based, and teacher-facilitated." The Middle School page names the same method "Teaching for Artistic Behavior (TAB)."',
    exhibitsTitle: 'Where the work goes public — and what it has won',
    exhibits: [
      {
        when: 'March 2026',
        name: 'Youth Art Month — Carolina Theatre',
        detail:
          'Six Lower School students were selected for the Youth Art Month exhibition at the Carolina Theatre. They span Kindergarten through 4th grade: one student each from K, 1st, 2nd and 4th, and two from 3rd. The exhibit showed art by K-5 students from across the Charlotte area and ran until March 30.',
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
          'Two students received stipend awards for their pieces. An 8th grader won for "The Laureate," which honors Jaki Shelton Green, North Carolina\'s first Black female poet laureate. A 7th grader won for "The Boy Who Flew."',
      },
      {
        when: 'September 2001',
        name: 'Banners for Ground Zero',
        detail:
          'Three days after the 9/11 attacks, students and families painted messages of hope on canvas banners, with the Arts & Science Council. More than 20 were shipped to New York. A Trinity banner of handprints and the word "HOPE" is still in place at St. Paul\'s Chapel, in a permanent memorial to the attacks.',
      },
    ],
    // Trimmed to the faculty fact (user, 2026-09-16). What went: the statement
    // of the no-minor-names policy, a post-mortem on an earlier sweep's false
    // negative, and a Lower/Middle spelling variance in the TAB passage.
    // ⚠️ The no-minor-names POLICY still applies — never name a student here.
    footnote:
      'Faculty: Jen Rankey-Zona is Visual Art Director and an art teacher, and "a founding Trinity faculty member." Shelby Hawk is the K-4 art teacher: "I am truly so honored to teach these wonderful artists."',
    sources: [
      {
        label: 'tescharlotte.org — "Trinity Artists Honored in Local Exhibits", March 2026',
        url: HONORED,
      },
      {
        label: 'tescharlotte.org — "25 Years After 9/11, Trinity\'s Hands Still Touch Ground Zero", Sep 10 2026',
        url: NINE_ELEVEN,
      },
      { label: 'tescharlotte.org — Staculty directory', url: STACULTY },
      { label: 'tescharlotte.org — Lower School page (Visual Arts, TAB)', url: LS_ENRICH },
      { label: 'tescharlotte.org — Middle School page (Visual Arts, TAB)', url: MS_ENRICH },
    ],
  },

  /* ------------------------------------------------------------ 1e verdict -- */
  verdict: {
    headline:
      'A real arts program for a K–8 school, strongest in the studio. It has a named teaching method, two off-campus exhibitions in one year, and an ensemble path from 5th grade to Advanced Band or Advanced Choir.',
    // No subhead (user, 2026-09-16) — it summarised what the school does not
    // publish, and pointed at gap notes this card no longer carries.
    // No `holdsUp` (user, 2026-09-16) — the six checkmark rows restated the
    // cards above (the TAB pedagogy, the two exhibitions, the ensemble ladder,
    // the Vimeo record) as a summary.
    // Per-school heading: this panel is Trinity's visit checklist.
    askTitle: 'Visit Checklist',
    ask: [
      'Where do the plays and concerts happen? Your site holds its open house in the CCA Auditorium, in Trinity\'s Center for Community and the Arts. Are the grade-level plays, the fall play and the winter musical staged there too?',
      'Who teaches general music in Kindergarten through 2nd grade, and who leads the choirs? Your directory names a Band Director who also teaches Grades 3-4 music, and a Music Chaplain.',
      'Which Lower School productions are running this year? Your 2026-27 profile names a 4th Grade Musical and a 5th Grade Shakespeare Review. Your Lower School page names 1st Grade Fairy Tale Plays and 5th Grade Shakespeare. Which is current?',
      'Is "chorus" in 5th grade the same ensemble as "choir" in 6th, or two different groups? Your own pages use both words.',
      'Is there any strings or instrumental option beyond band? Older search results still show a "chorus, strings or band" choice, but that page is gone and strings appears nowhere current.',
      'What does the art course sequence look like on paper, from Kindergarten to Studio Art in 7th and 8th?',
      'Can a student do a sport and an ensemble in the same season? With roughly 90% of the Middle School playing a sport, the overlap must be routine — how do the calendars work together?',
      'Which outside-school venues do the ensembles perform at? Your pages say they "may perform at… various venues outside of school" without naming any.',
    ],
    sources: [
      { label: 'tescharlotte.org — Lower School page (enrichments)', url: LS_ENRICH },
      { label: 'tescharlotte.org — Middle School page (enrichments and electives)', url: MS_ENRICH },
      { label: 'tescharlotte.org — Admission Events & Tours (CCA Auditorium)', url: EVENTS },
      { label: 'tescharlotte.org — Staculty directory', url: STACULTY },
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
