// Hickory Grove Christian School — The Arts.
//
// Refreshed 2026-11-10 against the school's REDESIGNED live site (plan plainclubs,
// at the user's request): source-material/the-arts/hickory-grove-christian/
// "Hickory Grove Christian - The Arts - Program Overview Web Check 2026-11-10.md", with the
// 2026–27 Course Selection Catalog as the school's own course document. The
// redesign dropped several things the earlier cards cited from the old pages — Tri-M,
// a Jazz Band, "three productions a year", the AP "consistently score 3 or 4"
// statement, Orff and recorder, the Middle School band's superior ACSI ratings — so
// they are gone here too. The catalog confirms no Jazz Band course.
//
// The Blumey ledger is unchanged: it comes from Blumenthal Arts' official 2025
// nominees/finalists PDF (via pdftotext) and its 2026 nominees news page, so the
// category→nominee→show mapping is exact. Original research: "Hickory Grove
// Christian - The Arts - Deep Research.md".
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

const ARTS = 'https://hgchristian.org/arts-home'
const PERFORMING = 'https://hgchristian.org/performing-arts'
const VISUAL = 'https://hgchristian.org/visual-arts'
const DIGITAL = 'https://hgchristian.org/digital-arts'
const BLUMEY_2025 =
  'https://www.blumenthalarts.org/assets/doc/2025-Blumey-All-Nominees-and-Finalists-9b848e893a.pdf'
const BLUMEY_2026 =
  'https://www.blumenthalarts.org/news/detail/blumenthal-arts-announces-nominees-finalists-for-2026-blumey-awards'

export const hickoryGroveChristian: ArtsProgram = {
  ladder: {
    headline:
      'A TK–12 arts ladder — visual art and music for every young student, widening into band, choir, theatre, dance and a leveled studio track in the upper grades.',
    subhead:
      'Band- and choir-centered, with no orchestra at any level. The performing-arts headline is a run of Blumey Award nominations in 2025 and 2026.',
    stats: [
      { value: 'TK–12', label: 'arts program, from the Early Education Center up' },
      { value: '2026', label: 'a Blumey nominee from The Little Mermaid' },
      { value: '2 / yr', label: 'drama productions: a fall show and a spring musical' },
      { value: 'ITS', label: 'International Thespian Society, the theatre honor society' },
    ],
    divisions: [
      {
        name: 'Early Education / Elementary',
        grades: 'TK–5',
        items: [
          'Visual art: sketching and drawing first, then painting and other media, with the elements of art and the principles of design',
          'Music class, plus an Elementary Choir with more chances to sing and perform',
        ],
      },
      {
        name: 'Middle School',
        grades: '6–8',
        items: [
          'Band (6th-grade beginners, 7th–8th intermediate) · Praise Team (7th–8th)',
          'Theatre, Musical Theatre and Beginning Dance (7th–8th) — each quarter of Theatre ends with a one-act play',
          'Visual arts: Bible Sketch (6th) and Sewing (7th–8th)',
          'Every course ends with a chance to perform',
        ],
      },
      {
        name: 'High School',
        grades: '9–12',
        items: [
          'Concert Band · Chapel Band · High School Choir · Theatre · Musical Theatre · Technical Theatre & Management',
          'Art I–IV and AP 2D Studio Art · Ceramics I–II · Fiber Crafts I–II · Art Appreciation',
          'Digital Arts: the Exodus yearbook (Yearbook I, II and III - Honors) · Photography and Design · Digital Media (the HG360 weekly broadcast) · a Communications Internship',
        ],
      },
    ],
    enrichmentTitle: 'Beyond the classroom',
    enrichment: [
      {
        label: 'Festivals & adjudication',
        text: 'Band students take part in at least one adjudicated band festival (where judges rate each group) each year. Each spring the Concert Band performs at the ACSI Festival. Students can also audition for NCBA All-District, All-State and Solo & Ensemble. Choir gives performances, goes on tours and sings at community events.',
      },
      {
        label: 'Competition',
        text: 'The spring musical takes part in the Blumey Awards each year. Visual-arts students show their work around campus and at school events, in the Silent Auction and in competitions.',
      },
    ],
    sources: [
      { label: 'hgchristian.org — Arts', url: ARTS },
      { label: 'hgchristian.org — Performing Arts', url: PERFORMING },
      { label: 'hgchristian.org — Visual Arts', url: VISUAL },
      { label: 'hgchristian.org — Digital Arts', url: DIGITAL },
    ],
  },

  theatre: {
    headline:
      'Two productions a year, a fall show and a spring musical — with Blumey Award recognition in back-to-back seasons: Seussical in 2025 and Disney\'s The Little Mermaid in 2026.',
    subhead:
      'The Blumeys are Blumenthal Performing Arts\' regional high-school musical-theater awards. HGCS placed nominees and finalists across both years, though no outright win is published.',
    seasonTitle: 'The season rhythm',
    season: [
      {
        season: 'Every fall',
        kind: 'Fall show',
        detail:
          'Drama students stage a fall show each year, the first of the year\'s two drama productions.',
      },
      {
        season: 'Every spring',
        kind: 'Spring musical',
        detail:
          'The spring musical is the marquee production, and it takes part in the Blumey Awards each year. Seussical (2025) and Disney\'s The Little Mermaid (2026) are the two most recent, both Blumey-recognized.',
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
      { label: 'hgchristian.org — Performing Arts (productions, Blumey participation)', url: PERFORMING },
      { label: 'Blumenthal Arts — 2026 Blumey nominees & finalists', url: BLUMEY_2026 },
      { label: 'Blumenthal Arts — 2025 Blumey all nominees & finalists (PDF)', url: BLUMEY_2025 },
    ],
  },

  music: {
    headline:
      'Band, choir and worship ensembles across the divisions — Concert Band, Chapel Band and High School Choir in High School — with no orchestra published at any level.',
    subhead:
      'The ensemble list is band- and choir-centered, and adjudicated festivals are a yearly fixture. No music honor society is named.',
    tracks: [
      {
        label: 'High School',
        ensembles: ['Concert Band', 'Chapel Band', 'High School Choir'],
      },
      {
        label: 'Middle School',
        ensembles: ['Beginner Band (6th)', 'Intermediate Band (7th–8th)', 'Praise Team (7th–8th)'],
      },
      {
        label: 'Elementary',
        ensembles: ['Music class', 'Elementary Choir'],
      },
    ],
    boardNote:
      'Middle School band is split into a 6th-grade beginner section and a 7th–8th intermediate section. Concert Band requires two years of middle school band or an audition, and Chapel Band is by audition. In elementary school, students take Music class and can join the Elementary Choir. No orchestra or strings ensemble is published at any level, and no a cappella group is named.',
    ladderTitle: 'The honors ladder — what is published',
    ladder: [
      {
        label: 'Join an ensemble',
        text: 'choir starts in the elementary grades and band in 6th grade, with chapel and end-of-semester concerts on the calendar.',
      },
      {
        label: 'Be adjudicated',
        text: 'band students take part in at least one adjudicated band festival each year, and the Concert Band performs at the ACSI Festival each spring.',
      },
      {
        label: 'Be recognized',
        text: 'students can audition for NCBA All-District, All-State and Solo & Ensemble. No music honor society is named, and selection counts are not published.',
      },
    ],
    ladderNote:
      'Beyond the ACSI Festival and the NCBA auditions, no all-state selection, adjudication result or festival placement is published.',
    sources: [
      { label: 'hgchristian.org — Performing Arts (ensembles, festivals)', url: PERFORMING },
      { label: 'hgchristian.org — Arts (adjudicated festivals, NCBA honor bands)', url: ARTS },
    ],
  },

  visual: {
    headline:
      'A leveled studio sequence — Art I through Art IV to AP 2D Studio Art — plus Ceramics, Fiber Crafts, Art Appreciation and a Digital Arts track.',
    subhead:
      'The visual-arts page lays out a leveled path to a college-level AP portfolio, built from a 15-piece body of work.',
    mediaTitle: 'Studio & media',
    media: [
      { name: 'Art I–IV', detail: 'the core leveled studio strand' },
      { name: 'Ceramics I–II', detail: 'handbuilding, sgraffito and glazing, with the wheel in Ceramics II' },
      { name: 'Fiber Crafts I–II', detail: 'crochet, cross stitch, sewing and quilting' },
      { name: 'Art Appreciation', detail: 'open to all students, whatever their art background' },
      { name: 'Digital Arts', detail: 'the Exodus yearbook, Photography and Design, and Digital Media (the HG360 broadcast)' },
    ],
    path: [
      { name: 'Art I / II' },
      { name: 'Art III / IV' },
      { name: 'AP 2D Studio Art', terminal: true },
    ],
    pathNote:
      'This sequence is published on the visual-arts page. AP 2D Studio Art is a 15-piece body of work driven by the student’s own essential question; no National Art Honor Society is published.',
    exhibits: [
      {
        when: 'Throughout the year',
        name: 'Student exhibitions & competitions',
        detail: 'student artwork is displayed across campus, featured in the Silent Auction and entered in competitions',
      },
    ],
    footnote:
      'None of these is published: a named gallery or exhibit event · a National Art Honor Society · external visual-arts recognition (Scholastic or otherwise). Elementary art builds from sketching and drawing to painting and other media. Middle School offers Bible Sketch (6th) and Sewing (7th–8th).',
    sources: [
      { label: 'hgchristian.org — Visual Arts (Art I–IV, AP 2D Studio Art, Ceramics, Fiber Crafts)', url: VISUAL },
      { label: 'hgchristian.org — Digital Arts (Exodus yearbook, HG360)', url: DIGITAL },
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
        text: 'the visual-arts page publishes a leveled Art I → IV → AP 2D Studio Art sequence, ending in a college-level AP portfolio.',
      },
      {
        label: 'Adjudicated music',
        text: 'band students are judged at a festival at least once a year. The Concert Band plays at the ACSI Festival each spring, and students can try out for NCBA honor bands.',
      },
      {
        label: 'A full TK–12 ladder',
        text: 'visual art and music reach every young student, widening into band, choir, theatre, dance, ceramics, fiber crafts and a Digital Arts track by High School.',
      },
    ],
    ask: [
      'Where does the spring musical stage — what is the venue, and how many seats? No performance space is named.',
      'Who directs the Upper School theatre program, and who directed the Blumey-recognized Seussical and The Little Mermaid?',
      'Is there any music beyond band, choir and the worship bands — an orchestra, a strings program, or an a cappella group? None is published.',
      'How do AP 2D Studio Art students score on the AP exam year to year? The visual-arts page publishes no results.',
      'Is there a National Art Honor Society or any external visual-arts recognition (Scholastic) the page does not mention?',
    ],
    sources: [
      { label: 'hgchristian.org — Arts pages', url: ARTS },
      { label: 'Verdict synthesized by the researcher from the sources cited on cards 1a–1d' },
    ],
  },
}
