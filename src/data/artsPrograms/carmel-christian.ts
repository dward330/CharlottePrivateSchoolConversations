// Carmel Christian School — The Arts.
//
// Transcribed from source-material/the-arts/carmel-christian/
// "Carmel Christian - The Arts - Deep Research.md", which carries a source URL
// and a VERIFIED / SCHOOL-CLAIM / NOT FOUND / TO VERIFY marker on the hard data.
//
// Two honesty decisions worth flagging, both driven by that research:
//
//  1. The 2024 Blumey nominations were all for ANASTASIA, not "Singin' in the
//     Rain." The school's undated news page attributes a separate, earlier set of
//     noms ([name withheld]) to "Singin' in the Rain." The 2024 ledger below is
//     therefore attributed to Anastasia — extracted from Blumenthal's official
//     2024 nominee PDF. The category→role mapping we once typed was wrong for
//     several roles (there is no "labeling quirk"). It was re-read from the saved
//     PDF (plan consistency4, CAR-T2) — and the Singin' in the Rain row is kept separate, its year shown
//     as "Earlier (year not published)": the 2023 list has Carmel's show as Mary Poppins, so the
//     old "~2022-23" guess was wrong (plan consistency5, CAR-U1). (The
//     "(year to verify)" bookkeeping that once sat in the year cell was removed
//     in plan artsfacts, 2026-11-10: it rendered to parents in every locale.)
//
//  2. The signature result is a real, independently confirmed WIN: [name withheld],
//     Best Actress, "Footloose," 2026 Blumey Awards (WFAE). She advances to the
//     Jimmy Awards. Only that one row carries `win: true`; the other five 2026
//     placements are finalists/nominees, and every 2024 row is a nomination or
//     finalist placement.
//
// Facility names, director names, orchestra, a cappella and Tri-M are all NOT
// PUBLISHED, so the fields that would carry them are omitted rather than invented
// — including the photo slots on 1a / 1b / 1d, since no genuine photo could be
// sourced.

import type { ArtsProgram } from '../artsProgram.ts'

const CC_ARTS = 'https://carmelchristian.org/arts/'
const CC_OVERVIEW =
  'https://carmelchristian.org/apps/pages/index.jsp?uREC_ID=615425&type=d'
const CC_ELEM =
  'https://carmelchristian.org/apps/pages/index.jsp?uREC_ID=487086&type=d'
const CC_MS =
  'https://carmelchristian.org/apps/pages/index.jsp?uREC_ID=487087&type=d'
const CC_HS =
  'https://carmelchristian.org/apps/pages/index.jsp?uREC_ID=487088&type=d'
const CC_GUIDE_HS = 'https://www.calameo.com/read/003203619b939a7cb178b'
const CC_GUIDE_ES = 'https://www.carmelchristian.org/academics-elementary'
const CC_PRODUCTIONS =
  'https://carmelchristian.org/apps/pages/index.jsp?uREC_ID=487089&type=d'
const CC_SEASON_2425 =
  'https://carmelchristian.org/apps/news/show_news.jsp?REC_ID=910928&id=0'
const CC_SINGIN =
  'https://carmelchristian.org/apps/news/show_news.jsp?REC_ID=791781&id=0'
const BLUMEY_2024 =
  'https://www.blumenthalarts.org/assets/doc/2024-Blumey-Nominees-and-Finalists-6435d5b18b.pdf'
const BLUMEY_2026 =
  'https://www.blumenthalarts.org/news/detail/blumenthal-arts-announces-nominees-finalists-for-2026-blumey-awards'
const WFAE_2026 =
  'https://www.wfae.org/arts-culture/2026-05-18/blumey-awards-winners-announced'

export const carmelChristian: ArtsProgram = {
  ladder: {
    headline:
      'A K–12 arts program — integrated music and art in the early grades, becoming a more elective-driven track from grade 5 up.',
    subhead:
      'Overseen by Arts Director Christina McCorkle, and headlined in 2026 by a Blumey Best Actress win that advanced to the national Jimmy Awards.',
    stats: [
      { value: 'K–12', label: 'arts program, integrated in the early grades' },
      { value: '3', label: 'named ensembles, including the auditioned Ignite Band' },
      { value: '2026', label: 'Blumey Best Actress win — "Footloose"' },
      { value: 'CITA', label: 'Christians in Theatre Arts conference' },
    ],
    divisions: [
      {
        name: 'Elementary',
        grades: 'K–5',
        items: [
          // VERIFY (plan consistency5, CAR-U3): the two school sources differ on grade 5 music. Pick neither.
          'The arts page says every K–4 student takes music and art; the 2026–27 elementary guide lists music for every grade through 5',
          'At grade 5 visual art continues and students may join choir / creative arts',
          'A 5th-grade musical (2024-25: "Seussical KIDS")',
        ],
      },
      {
        name: 'Middle School',
        grades: '6–8',
        items: [
          'Band · Choir · Ignite (MS Praise Band) · Art · Theatre',
          'A Middle School musical (2024-25: "Disney\'s The Lion King Jr.")',
          'Musical Theatre Dance, Spring Play Competition (NCTC) and a Shakespeare Play Festival',
          'Honor Band, Christmas and Spring Concerts, and an Art Festival',
          'Christians in Theatre Arts (CITA) Conference',
        ],
      },
      {
        name: 'High School',
        grades: '9–12',
        items: [
          // VERIFY (plan consistency5, CAR-U4 and 5b): high school Choir, Technical Theater, Creative
          // Writing and Journalism are on the arts page and not in the 2026–27 guide. Pick neither.
          'Symphonic Band · Ignite Band (HS Praise Band, audition-based)',
          'Theatre',
          'Visual Arts · Digital Photography · Yearbook',
          'On the arts page but not in the 2026–27 course guide: Choir, Technical Theater and Design, Creative Writing and Journalism',
        ],
      },
    ],
    enrichmentTitle: 'The enrichment layer — beyond the classroom',
    enrichment: [
      {
        label: 'Christians in Theatre Arts (CITA)',
        text: 'Middle School theatre students attend the CITA Conference — a faith-based theatre-arts gathering that sits on the published Middle School arts calendar.',
      },
      {
        label: 'Festival calendar',
        text: 'The Middle School program lists a Spring Play Competition (the NCTC one-act circuit), a Shakespeare Play Festival, an Honor Band event and an annual Art Festival as recurring fixtures.',
      },
    ],
    sources: [
      { label: 'carmelchristian.org — Arts hub', url: CC_ARTS },
      { label: 'Arts at Carmel Christian (Arts Director)', url: CC_OVERVIEW },
      { label: 'Elementary (K–5) Arts', url: CC_ELEM },
      { label: 'Middle School (6–8) Arts', url: CC_MS },
      { label: 'High School (9–12) Arts', url: CC_HS },
      { label: '2026-27 Elementary Course Description Guide', url: CC_GUIDE_ES },
      { label: '2026-2027 High School Course Description Guide', url: CC_GUIDE_HS },
    ],
  },

  theatre: {
    headline:
      'A K–12 production season topped by a 2026 Blumey Best Actress win — a student in "Footloose" — that advanced to the national Jimmy Awards.',
    subhead:
      'The Blumeys are Blumenthal Performing Arts’ regional high-school musical-theater awards. Carmel Christian converted a finalist run into an outright win in 2026 and placed in six categories that year.',
    seasonTitle: 'The season rhythm — a K–12 slate each year',
    season: [
      {
        season: 'Fall',
        kind: 'Musical (junior edition)',
        detail:
          '2025-26: Disney\'s High School Musical, Jr. (Nov 14–15, 2025). The fall slot skews to a junior-edition musical drawing across the divisions.',
      },
      {
        season: 'Spring',
        kind: 'Musical (Upper School)',
        detail:
          '2025-26: Footloose — The Musical (Mar 26–28, 2026, "SOLD OUT!"), the production that took the 2026 Blumey Best Actress win. 2024-25 ran three shows across divisions: Seussical KIDS (5th grade), Disney\'s The Lion King Jr. (Middle School) and Oklahoma! (High School).',
      },
    ],
    venueNote:
      'The director and the venue are not published. The arts menu has a "Main Stage" label but no room name. The Footloose "SOLD OUT!" note suggests a hall with a fixed number of seats, but the hall is not named anywhere.',
    ledgerTitle: 'The Blumey ledger — external judging',
    ledger: [
      {
        year: '2026',
        show: 'Footloose',
        result:
          'Best Actress WIN — a student playing Ariel Moore, who advances to the national Jimmy Awards (ceremony May 17, 2026, Belk Theater; announced May 18). Plus five more placements in five other categories: Best Actor finalist (as Ren McCormack) · Best Supporting Actor finalist (as Willard Hewitt) · Best Supporting Actress finalist (as Rusty) · Best Featured Performer finalist (as Garvin) · a Best Choreography Execution nominee (production).',
        win: true,
      },
      {
        year: '2025',
        show: 'Oklahoma!',
        result:
          'Five finalists: Best Actor (as Curly McLain) · Best Actress (as Laurey Williams) · Best Supporting Actor (as Ali Hakim) · Best Supporting Actress (as Ado Annie Carnes) · Best Featured Performer (as Gertie Cummings).',
      },
      {
        year: '2024',
        show: 'Anastasia',
        result:
          'Five finalists, no win: Best Actor (as Dmitry) · Best Actress (as Lily) · Best Supporting Actor (as Vlad) · Best Supporting Actress (as Dowager Empress) · Best Featured Performer (as Ballet Lead). Vlad and Ballet Lead were also top-six nominees.',
      },
      {
        year: '2023',
        show: 'Mary Poppins',
        result:
          'Three finalists: Best Supporting Actor (as George Banks) · Best Supporting Actress (as Winifred Banks) · Best Featured Performer (as Miss Andrew).',
      },
      {
        year: 'Earlier (year not published)',
        show: "Singin' in the Rain",
        result:
          'Two nominations per the school’s undated news page: Best Actress and Best Actor. Attributed by the school to "Singin\' in the Rain," an earlier production than Anastasia; the exact year is not published.',
      },
    ],
    honestContext:
      'Two students placed in three straight years: one 2023–25, one 2024–26. The first was a finalist as George Banks, Dmitry and Curly McLain. The second was a finalist as Lily in 2024 and as Laurey Williams in 2025. In 2026 that student won Best Actress for Footloose and advanced to the national Jimmy Awards. The 2024 nominations belong to Anastasia, not to "Singin\' in the Rain". The school’s undated news page ties a separate, earlier pair of nominations to that production.',
    sources: [
      { label: 'carmelchristian.org — Theatre Productions (2025-26 season)', url: CC_PRODUCTIONS },
      { label: 'carmelchristian.org — 2024-25 theatre season', url: CC_SEASON_2425 },
      { label: 'carmelchristian.org — earlier "Singin\' in the Rain" Blumey noms (undated)', url: CC_SINGIN },
      { label: 'Blumenthal Arts — 2026 Blumey nominees & finalists', url: BLUMEY_2026 },
      { label: 'Blumenthal Arts — 2025 Blumey all nominees & finalists (PDF)', url: 'https://www.blumenthalarts.org/assets/doc/2025-Blumey-All-Nominees-and-Finalists-9b848e893a.pdf' },
      { label: 'Blumenthal Arts — 2024 Blumey nominees & finalists (PDF)', url: BLUMEY_2024 },
      { label: 'Blumenthal Arts — 2023 Blumey nominees & finalists (PDF)', url: 'https://www.blumenthalarts.org/assets/doc/2023-Blumey-Nominees-and-Finalists-dc56d4a6fb.pdf' },
      { label: 'WFAE — 2026 Blumey Awards winners announced', url: WFAE_2026 },
    ],
  },

  music: {
    headline:
      'Three ensembles named on the arts pages — Symphonic Band, Choir and the audition-based Ignite Band praise team.',
    subhead:
      'The ensemble slate is band- and choir-centered; no orchestra, a cappella group or music honor society is published.',
    tracks: [
      {
        label: 'Curricular — join by enrolling',
        ensembles: ['Symphonic Band (HS)', 'Choir (HS · 5th · MS)', 'Band (MS)'],
      },
      {
        label: 'Auditioned — earn a seat',
        ensembles: ['Ignite Band (HS Praise Band)'],
      },
      {
        label: 'Middle School worship',
        ensembles: ['Ignite (MS Praise Band)'],
      },
    ],
    boardNote:
      'The arts page lists a High School Choir; the 2026–27 Course Description Guide does not. Ignite Band is the High School praise team. The band is audition-based: a video submission followed by an in-person round by invitation. No orchestra, a cappella group or Tri-M / music honor society is published.',
    ladderTitle: 'The honors ladder — what is published',
    ladder: [
      {
        label: 'Join an ensemble',
        text: 'choir runs from grade 5 and band from Middle School, with Christmas and Spring Concerts on the Middle School calendar. The arts page carries both through High School. The 2026–27 course guide lists band there, but no choir.',
      },
      {
        label: 'Audition up',
        text: 'Ignite Band (HS Praise Band) holds an audition — a video round followed by an in-person round by invitation.',
      },
      {
        label: 'Get selected beyond campus',
        text: 'the Middle School program lists an "Honor Band" event; no all-state, adjudication or festival result is published, and a mentioned "Carowinds Festival of Music" could not be confirmed.',
      },
    ],
    ladderNote:
      'No music honor society (e.g. Tri-M) and no per-year selection or superior-rating counts are published. The honors picture beyond the Middle School Honor Band event is not documented.',
    sources: [
      { label: 'carmelchristian.org — Middle School (6–8) Arts', url: CC_MS },
      { label: 'carmelchristian.org — High School (9–12) Arts', url: CC_HS },
      { label: '2026-2027 High School Course Description Guide', url: CC_GUIDE_HS },
    ],
  },

  visual: {
    headline:
      'A studio track that widens in High School to digital photography and yearbook. The arts page also names creative writing and journalism, which the 2026–27 course guide does not list.',
    subhead:
      'The arts page names no leveled studio sequence, but the Course Offerings guide does: a path from Art I/II up to AP 2-D Art & Design.',
    mediaTitle: 'Studio & media',
    media: [
      { name: 'Visual Arts', detail: 'the core studio strand, K–12' },
      { name: 'Digital Photography', detail: 'a discrete High School course' },
      { name: 'Yearbook', detail: 'publication design' },
      { name: 'Creative Writing', detail: 'on the arts page, not in the 2026–27 course guide' },
      { name: 'Journalism', detail: 'on the arts page, not in the 2026–27 course guide' },
    ],
    path: [
      { name: 'Art I / II' },
      { name: 'Honors Art III / IV' },
      { name: 'AP 2-D Art & Design', terminal: true },
    ],
    pathNote:
      'This sequence comes from the Course Offerings guide, not the arts page — the two disagree, and the arts page names no leveled sequence at all. Graphic design as a separate course is not published.',
    exhibits: [
      {
        when: 'Annual',
        name: 'Middle School Art Festival',
        detail: 'the one named exhibit event on the arts calendar',
      },
    ],
    footnote:
      'High School gallery or exhibit events beyond the Middle School Art Festival are not published. No external visual-arts recognition (Scholastic or otherwise) turned up either. The Honors and AP studio courses appear only in the Course Offerings guide; the arts page does not confirm them.',
    sources: [
      { label: 'carmelchristian.org — Elementary (K–5) Arts', url: CC_ELEM },
      { label: 'carmelchristian.org — Middle School (6–8) Arts', url: CC_MS },
      { label: 'carmelchristian.org — High School (9–12) Arts', url: CC_HS },
      { label: '2026-2027 High School Course Description Guide', url: CC_GUIDE_HS },
    ],
  },

  verdict: {
    headline:
      'A theatre program with a genuine, recently converted Blumey win, sitting on a leaner music and visual-arts footprint than many schools in the region.',
    subhead:
      'The 2026 Best Actress win and its Jimmy Awards advancement are the real, verified headline; the open questions are about the undocumented venue, director and honors circuits.',
    holdsUp: [
      {
        label: 'A verified Blumey win — not just finalists',
        text: 'a student took Best Actress for "Footloose" at the 2026 Blumey Awards, as WFAE reported. They went on to the national Jimmy Awards. It was an outright win, after that student’s finalist places in 2024 and 2025.',
      },
      {
        label: 'The record around the win',
        text: 'the 2026 "Footloose" run placed in six categories (actress, actor, both supporting, featured performer and choreography). "Oklahoma!" had five finalists in 2025. "Anastasia" had five in 2024, two of them top-six nominees. "Mary Poppins" had three in 2023.',
      },
      {
        label: 'A studio path that reaches AP',
        text: 'the Course Offerings guide runs Art I/II → Honors Art III/IV → AP 2-D Art & Design, plus digital photography and yearbook in High School. The arts page adds creative writing and journalism, which the guide does not list.',
      },
      {
        label: 'A faith-based theatre circuit',
        text: 'Middle School students attend the Christians in Theatre Arts (CITA) Conference and enter the NCTC Spring Play Competition — an early on-ramp to competitive and community theatre.',
      },
    ],
    ask: [
      'Where do productions like "Footloose" actually stage — what is the venue, and how many seats? The site names a "Main Stage" but no room.',
      'Who directs the Upper School musical, and who ran the 2026 Blumey-winning "Footloose"? No director is published.',
      'The Course Offerings guide lists Honors Art III/IV, Honors Acting Studio and AP 2-D Art & Design, but the arts page names none of them. The arts page lists Choir, Technical Theater, Creative Writing and Journalism, which the guide does not. Which of these actually run each year?',
      'Does every 5th grader take music?',
      'Is there any music beyond band, choir and the Ignite praise teams — an orchestra, a strings program, or an a cappella group?',
      'What happens at the Middle School "Honor Band" event, and do students audition into any all-state or regional honors ensemble from there?',
      'What year was the "Singin\' in the Rain" Blumey pair? The 2023 show was "Mary Poppins" and the 2024 show "Anastasia".',
    ],
    sources: [
      { label: 'carmelchristian.org — Arts pages', url: CC_ARTS },
      { label: 'Carmel Christian — 2026-2027 High School Course Description Guide', url: 'https://www.calameo.com/read/003203619b939a7cb178b' },
      { label: 'WFAE — 2026 Blumey Awards winners announced', url: WFAE_2026 },
      { label: 'Verdict synthesized by the researcher from the sources cited on cards 1a–1d' },
    ],
  },
}
