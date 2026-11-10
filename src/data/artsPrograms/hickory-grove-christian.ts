// Hickory Grove Christian School — The Arts.
//
// Transcribed from source-material/the-arts/hickory-grove-christian/
// "Hickory Grove Christian - The Arts - Deep Research.md", which carries source
// URLs and a VERIFIED / NOT FOUND marker on the hard data. The Blumey ledger was
// extracted from Blumenthal Arts' official 2025 nominees/finalists PDF (via
// pdftotext) and its 2026 nominees news page, so the category→nominee→show
// mapping is exact.
//
// Two honesty decisions, both driven by that research:
//
//  1. NO Blumey win is published for HGCS — the 2025 (Seussical) and 2026 (The
//     Little Mermaid) placements are nominees and finalists only, so no ledger row
//     carries `win: true`.
//  2. Facilities, orchestra, a cappella, National Art Honor Society and any
//     literary magazine / newspaper are all NOT PUBLISHED, so the fields that
//     would carry them are omitted rather than invented — including the Facilities
//     card and every photo slot, since no genuine venue or photo could be sourced.

import type { ArtsProgram } from '../artsProgram.ts'

const ARTS = 'https://www.hgchristian.org/arts'
const PERFORMING = 'https://www.hgchristian.org/arts/performing-arts'
const VISUAL = 'https://www.hgchristian.org/arts/visual-arts'
const BLUMEY_2025 =
  'https://www.blumenthalarts.org/assets/doc/2025-Blumey-All-Nominees-and-Finalists-9b848e893a.pdf'
const BLUMEY_2026 =
  'https://www.blumenthalarts.org/news/detail/blumenthal-arts-announces-nominees-finalists-for-2026-blumey-awards'

export const hickoryGroveChristian: ArtsProgram = {
  ladder: {
    headline:
      'A TK–12 arts ladder — visual art and general music for every young student, widening into band, choir, theatre and a leveled studio track in the upper grades.',
    subhead:
      'Band- and choir-centered, with no orchestra at any level. The performing-arts headline is a run of Blumey Award nominations in 2025 and 2026.',
    stats: [
      { value: 'TK–12', label: 'arts program, integrated in the early grades' },
      { value: '2026', label: 'a Blumey nominee from The Little Mermaid' },
      { value: '3 / yr', label: 'theatre productions, plus a biennial spring musical' },
      { value: 'Tri-M', label: 'music + Thespian (ITS) theatre honor societies' },
    ],
    divisions: [
      {
        name: 'Early Education / Elementary',
        grades: 'TK–5',
        items: [
          'Visual art at every level — foundation skills in shape, color, texture, value and 3D',
          'General music aligned to the National Standards: singing, rhythm and Orff instruments',
          'Recorder introduced in fourth grade; composing rhythmic patterns and melodies',
        ],
      },
      {
        name: 'Middle School',
        grades: '6–8',
        items: [
          'Band (6th-grade beginners, 7th–8th intermediate) · Choir (open to all)',
          'Theatre and Musical Theatre — stage presence, speech, backstage, acting/singing/dance',
          'Visual arts: original artwork, color mixing, artist studies (e.g. Picasso), mixed-media portraits',
          'Christmas Chapel, Winter/Spring Performing Arts Concerts, ACSI band festivals',
        ],
      },
      {
        name: 'High School',
        grades: '9–12',
        items: [
          'Concert Band · Jazz Band · Choir · Musical Theatre · Theatre · Technical Theatre',
          'Visual Arts (Art I–IV), AP Studio Art 2D and Art Appreciation',
          'Yearbook / Student Media — the Exodus yearbook (Yearbook I, Honors Yearbook I–III)',
        ],
      },
    ],
    enrichmentTitle: 'Beyond the classroom',
    enrichment: [
      {
        label: 'Festivals & adjudication',
        text: 'Band students take part in adjudicated festivals (where judges rate each group) every year. The Middle School band has earned superior ratings at ACSI band festivals. Choir performs at community events, statewide festivals and on out-of-state tours.',
      },
      {
        label: 'Competition',
        text: 'Drama students compete in fall competitions, and visual-arts students display work throughout the year and compete in public and private competitions.',
      },
    ],
    sources: [
      { label: 'hgchristian.org — Arts hub', url: ARTS },
      { label: 'hgchristian.org — Performing Arts', url: PERFORMING },
      { label: 'hgchristian.org — Visual Arts', url: VISUAL },
    ],
  },

  theatre: {
    headline:
      'Three productions a year and a biennial spring musical — with Blumey Award recognition in back-to-back seasons: Seussical in 2025 and Disney\'s The Little Mermaid in 2026.',
    subhead:
      'The Blumeys are Blumenthal Performing Arts\' regional high-school musical-theater awards. HGCS placed nominees and finalists across both years, though no outright win is published.',
    seasonTitle: 'The season rhythm',
    season: [
      {
        season: 'Every year',
        kind: 'Three productions',
        detail:
          'Drama students mount three productions per year and compete in fall competitions, drawing students across grade levels.',
      },
      {
        season: 'Every other year',
        kind: 'Large-scale spring musical',
        detail:
          'A biennial spring musical is the marquee production — Seussical (2025) and Disney\'s The Little Mermaid (2026) are the two most recent, both Blumey-recognized.',
      },
    ],
    venueNote:
      'The theatre director and the performance venue are not published on any HGCS arts page.',
    ledgerTitle: 'The Blumey ledger — external judging',
    ledger: [
      {
        year: '2026',
        show: "Disney's The Little Mermaid",
        result:
          'Three nominees: Best Supporting Actor (as Scuttle), Best Supporting Actress (as Flounder), and Best Featured Performer (as Aquata). No win is published.',
      },
      {
        year: '2025',
        show: 'Seussical',
        result:
          'The student playing Sour Kangaroo was a Best Featured Performer nominee. The production also placed five finalists: Best Actor (as Jojo) · Best Actress (as Mayzie) · Best Supporting Actor (as Mr. Mayor) · Best Supporting Actress (as Mrs. Mayor) · the same Sour Kangaroo performer again, among the Best Featured Performer finalists.',
      },
    ],
    honestContext:
      'Two performers each appear in both years. So the program is a repeat producer of recognized performers. But no Blumey win is published for HGCS in either year. The school’s recognition came as nominees and finalists only. No director name, venue or recent non-Blumey show title is published either.',
    sources: [
      { label: 'hgchristian.org — Arts hub (production cadence)', url: ARTS },
      { label: 'Blumenthal Arts — 2026 Blumey nominees & finalists', url: BLUMEY_2026 },
      { label: 'Blumenthal Arts — 2025 Blumey all nominees & finalists (PDF)', url: BLUMEY_2025 },
    ],
  },

  music: {
    headline:
      'Band and choir across the divisions — Concert Band, Jazz Band and Choir in High School — with no orchestra published at any level.',
    subhead:
      'The ensemble slate is band- and choir-centered; the honors mark is the Tri-M Music Honor Society, and adjudicated festivals are a recurring fixture.',
    tracks: [
      {
        label: 'High School',
        ensembles: ['Concert Band', 'Jazz Band', 'Choir'],
      },
      {
        label: 'Middle School',
        ensembles: ['Band (6–8)', 'Choir'],
      },
      {
        label: 'Elementary',
        ensembles: ['General music', 'Orff', 'Recorder (Gr 4)'],
      },
    ],
    boardNote:
      'Middle School band is split into a 6th-grade beginner section and a 7th–8th intermediate section. In elementary school, music is a general-music class taught to the National Standards. The class uses Orff and rhythm instruments, adding recorder in Grade 4. No orchestra or strings ensemble is published at any level, and no a cappella group is named.',
    ladderTitle: 'The honors ladder — what is published',
    ladder: [
      {
        label: 'Join an ensemble',
        text: 'band and choir run from the elementary grades through High School, with Christmas Chapel and Winter/Spring Performing Arts Concerts on the calendar.',
      },
      {
        label: 'Earn a superior rating',
        text: 'band students take part in adjudicated festivals annually, and the Middle School band has earned superior ratings at ACSI band festivals.',
      },
      {
        label: 'Be recognized',
        text: 'the Tri-M Music Honor Society is the published music honor at HGCS; per-year selection or superior-rating counts are not published.',
      },
    ],
    ladderNote:
      'Beyond Tri-M and the ACSI band festivals, no all-state selection, adjudication result count or festival placement is published.',
    sources: [
      { label: 'hgchristian.org — Arts hub (Concert & Jazz Band)', url: ARTS },
      { label: 'hgchristian.org — Performing Arts (ensembles, festivals, Tri-M)', url: PERFORMING },
    ],
  },

  visual: {
    headline:
      'A leveled studio sequence — Art I through Art IV to AP Studio Art 2D — plus Art Appreciation and the Exodus yearbook publications track.',
    subhead:
      'The visual-arts page names an actual leveled path (unlike the performing-arts page), and reports AP Studio Art students consistently scoring 3 or 4.',
    mediaTitle: 'Studio & media',
    media: [
      { name: 'Visual Arts (Art I–IV)', detail: 'the core leveled studio strand' },
      { name: 'Art Appreciation', detail: 'a High School survey course' },
      { name: 'Yearbook (Exodus)', detail: 'Yearbook I and Honors Yearbook I–III' },
    ],
    path: [
      { name: 'Art I / II' },
      { name: 'Art III / IV' },
      { name: 'AP Studio Art 2D', terminal: true },
    ],
    pathNote:
      'This sequence is published on the visual-arts page. AP Studio Art students "consistently score 3 or 4 on the AP exam" (scores dipped during remote learning); no National Art Honor Society is published.',
    exhibits: [
      {
        when: 'Throughout the year',
        name: 'Student exhibitions & competitions',
        detail: 'visual-arts students display work throughout the year and compete in public and private competitions',
      },
    ],
    footnote:
      'None of these is published: a named gallery or exhibit event · a National Art Honor Society · external visual-arts recognition (Scholastic or otherwise). K–5 art covers shapes, colors and texture, and Middle School adds artist studies and mixed-media portraits. Both lead into the High School sequence.',
    sources: [
      { label: 'hgchristian.org — Visual Arts (Art I–IV, AP Studio Art 2D)', url: VISUAL },
      { label: 'hgchristian.org — Arts hub (Exodus yearbook)', url: ARTS },
    ],
  },

  verdict: {
    headline:
      'A band-and-choir music program and a step-by-step studio track. The theatre program has drawn Blumey recognition two years running. The open questions are the unpublished venue, director and orchestra.',
    subhead:
      'The Blumey nominations across Seussical (2025) and The Little Mermaid (2026) are the real, verified headline; the gaps are the undocumented facilities and the absence of orchestra and a cappella.',
    holdsUp: [
      {
        label: 'Back-to-back Blumey recognition',
        text: 'HGCS placed nominees and finalists at the 2025 (Seussical) and 2026 (The Little Mermaid) Blumey Awards. Two performers each appear in both years. So the program is a repeat producer of recognized performers.',
      },
      {
        label: 'A studio path that reaches AP',
        text: 'the visual-arts page publishes a leveled Art I → IV → AP Studio Art 2D sequence, with AP students consistently scoring 3 or 4.',
      },
      {
        label: 'Adjudicated music',
        text: 'band students take part in adjudicated festivals annually, the Middle School band has earned superior ACSI ratings, and Tri-M recognizes the strongest musicians.',
      },
      {
        label: 'A full TK–12 ladder',
        text: 'visual art and general music reach every young student, widening into band, choir, theatre, technical theatre and the Exodus yearbook by High School.',
      },
    ],
    ask: [
      'Where do the biennial musicals stage — what is the venue, and how many seats? No performance space is named.',
      'Who directs the Upper School theatre program, and who directed the Blumey-recognized Seussical and The Little Mermaid?',
      'Is there any music beyond band and choir — an orchestra, a strings program, or an a cappella group? None is published.',
      'What does the AP Studio Art 2D score distribution actually look like year to year, beyond "consistently 3 or 4"?',
      'Is there a National Art Honor Society or any external visual-arts recognition (Scholastic) the page does not mention?',
    ],
    sources: [
      { label: 'hgchristian.org — Arts pages', url: ARTS },
      { label: 'Verdict synthesized by the researcher from the sources cited on cards 1a–1d' },
    ],
  },
}
