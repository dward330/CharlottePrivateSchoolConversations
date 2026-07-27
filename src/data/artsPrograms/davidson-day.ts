// Davidson Day School — The Arts.
//
// Transcribed from source-material/the-arts/davidson-day/
// "Davidson Day - The Arts - Arts Redesign Deep Research.md", which carries a
// source URL and a VERIFIED / SCHOOL-CLAIM / NOT FOUND marker on every fact.
//
// Davidson Day publishes almost nothing about its arts program on its own site —
// the arts subpages 404 on fetch. Nearly all hard data here comes from the
// 2026-27 Upper School Course Catalog, read from its page images on Issuu's CDN
// because the text layer is inaccessible. That makes the gaps unusually
// load-bearing, and they are stated rather than papered over.
//
// Four research outcomes shaped this file:
//
//  1. Davidson Day DOES have a real Blumey record, correcting the thin prior
//     research: 2023 Mean Girls drew program-level nominations (Best
//     Ensemble/Chorus AND Best Overall Direction), and 2026 Big Fish produced
//     three finalists. So card 1b renders with a ledger — but titled "Theatre &
//     External Recognition", since no NCTC record exists at all and the school's
//     entire competitive identity runs through the Blumeys.
//
//  2. "Matilda Jr." was an ATTRIBUTION ERROR in prior research and is dropped.
//     It was staged by the Davidson Community Players — a separate community
//     theater — at the Cain Center for the Arts in Cornelius, with no Davidson
//     Day involvement. The name collision is the likely cause.
//
//  3. There is NO music honors pipeline documented — no all-district, all-state,
//     NCAIS, adjudicated ratings, or Tri-M. And there is no band, orchestra or
//     chorus course of any kind: the only credit-bearing performing music
//     ensemble is a rock band. The music card still renders, because those
//     ensembles are real and the absence is itself the most useful finding for a
//     parent expecting a traditional ladder — but its honors ladder says plainly
//     that the rungs above campus are unpublished.
//
//  4. No arts facility is named anywhere, and catalog photos suggest the musical
//     is staged in a gymnasium and recitals inside the art studio. No photo slot
//     is filled: the only real images available are full catalog PAGES on Issuu's
//     CDN, not clean photographs, so the design's photo figures are omitted
//     rather than filled with a page scan.

import type { ArtsProgram } from '../artsProgram.ts'

const DD_ARTS = 'https://www.davidsonday.org/student-life/arts'
const DD_CATALOG =
  'https://issuu.com/davidsondayschool/docs/2026-2027_upper_school_course_catalog'

export const davidsonDay: ArtsProgram = {
  ladder: {
    headline:
      'A small, accessible arts program — a complete visual ladder to AP Studio Art, but one performing music ensemble and no named arts facility.',
    subhead:
      'Arts run from Early Childhood through grade 12. Only one fine-arts credit is required to graduate, and theater participation can satisfy the PE credit instead.',
    stats: [
      { value: 'EC–12', label: 'arts from early childhood' },
      { value: '1 AP', label: 'Studio Art — the only arts AP' },
      { value: '2', label: 'credit-bearing performing ensembles' },
      { value: '1 credit', label: 'fine arts required to graduate' },
    ],
    divisions: [
      {
        name: 'Lower School',
        grades: 'Early Childhood–4',
        items: [
          'Visual arts begin in Early Childhood classrooms and extend through graduation',
          'The Lower School Art Studio — ceramics, painting, multimedia — is the only arts room the school names publicly',
          'Art is also integrated into regular classroom activities',
        ],
      },
      {
        name: 'Middle School',
        grades: '5–8',
        items: [
          'No Middle School arts course list is published — the catalog covers Upper School only, and the arts subpages return errors',
          'Whether a Middle School band or chorus exists, and whether it feeds anywhere, is unpublished',
        ],
      },
      {
        name: 'Upper School',
        grades: '9–12',
        items: [
          'Visual Arts: Photography I–III, Portfolio, Studio I, Studio II Honors, AP Studio Art',
          'Music & Performing Arts: Performance Ensemble (theatre), Contemporary Ensemble, Modern Music, Film Studies & Production',
          'Studio II Honors carries a .50 GPA weighting and requires an A− in the prerequisite',
          'Photography III students build and maintain their own websites to showcase work',
          'Theater participation can be requested in place of the PE credit',
        ],
      },
    ],
    enrichmentTitle: 'The enrichment layer — and what is not published',
    enrichment: [
      {
        label: 'Improv & Musical Review',
        text: 'The Theatre Performance Ensemble takes part in Davidson Day productions, an Improv Comedy show, a Musical Review, and collaborations with local theatre companies — though the partner companies are not named.',
      },
      {
        label: 'The performance venue',
        text: 'No theater, auditorium or arts-center name is published anywhere for the Jetton Street campus. Two catalog photographs bear on this and point toward multi-use space: a musical staged on a constructed set in what appears to be a gymnasium (basketball net and gym wall visible), and a keyboard recital held inside the art studio itself. Treat "is there a real theater?" as an open tour question.',
      },
      {
        label: 'The art studio',
        text: 'The catalog’s Visual Arts photograph shows a genuine, well-equipped room — flat-file drawing cabinets, wall storage, a sink and wet area, tabletop easels, a plaster bust and student work throughout. This reads as a real studio rather than a converted classroom.',
      },
      {
        label: 'Not found',
        text: 'No visiting-artist or artist-in-residence series, no parent arts organisation, no arts festival or gallery-night calendar, and no arts faculty member named in any source. Two arts teachers are pictured in the catalog but neither is captioned.',
      },
    ],
    sources: [
      { label: 'davidsonday.org — Arts', url: DD_ARTS },
      { label: '2026-27 Upper School Course Catalog', url: DD_CATALOG },
    ],
  },

  theatre: {
    headline:
      'A legitimate, program-level Blumey record from a very small school — Best Ensemble/Chorus and Best Overall Direction nominations in 2023, three finalists in 2026.',
    subhead:
      'The Blumeys are Blumenthal Performing Arts’ Charlotte-region high-school musical-theater awards. Davidson Day’s external theatre identity runs entirely through them — no NCTC record exists.',
    seasonTitle: 'The season rhythm — one Upper School musical a year',
    season: [
      {
        season: '2025-26',
        kind: 'Upper School Musical',
        detail:
          'Big Fish — the school’s 2026 Blumey entry, which produced three finalist placements.',
      },
      {
        season: 'Recent',
        kind: 'Upper School Musicals',
        detail:
          'Once Upon a One More Time, High School Edition (2024-25); Mean Girls (2022-23), the strongest competitive year. The 2023-24 title could not be found, and the school publishes no theatre season page.',
      },
    ],
    whoRunsIt:
      'No theatre director, musical director or drama teacher is named in any source, and the catalog does not attribute courses to faculty — notable given the school earned a Best Overall Direction nomination in 2023, which Blumenthal credits to the school rather than an individual. The Theatre Performance Ensemble is a select company; new students must audition, most class time is rehearsal, and there are after-school calls before performances. There is NO stagecraft or technical theatre course in the 2026-27 catalog — the nearest offering, Film Studies & Production, is video editing rather than stage tech. Students clearly build substantial multi-level scenery, and a Davidson Day student once won a scholarship for non-performing theater work, so backstage participation exists in some form; whether through a class, club or crew is unpublished.',
    venueNote:
      'Where performances happen is genuinely unclear — no venue is named, and the available photographic evidence suggests a gymnasium for the musical and the art studio for recitals.',
    ledgerTitle: 'The Blumey ledger — every year found',
    ledger: [
      {
        year: '2026',
        show: 'Big Fish',
        result:
          'Three finalists: Best Actor (Lukas Paeper as Edward Bloom), Best Supporting Actress (Katelyn Ray as Witch), Best Featured Performer (Elizabeth Robinson as Giant, also a nominee). No win recorded.',
      },
      {
        year: '2025',
        show: 'Once Upon a One More Time',
        result:
          'Listed among the 54 participating schools; no individual category nomination was found. The 2025 all-nominees PDF could not be text-extracted, so a buried nomination cannot be fully excluded.',
      },
      {
        year: '2023',
        show: 'Mean Girls',
        result:
          'The strongest year found — four nominations including two at program level: Best Ensemble/Chorus and Best Overall Direction, plus Best Actress (Kathleen Moore as Regina George) and Best Featured Performer (Ada Brown as Mrs. George).',
      },
      {
        year: '~2015',
        show: 'Gordon Hay Scholarship',
        result:
          'Aslan Freidline received the $5,000 Gordon Hay Scholarship, awarded to a Charlotte-area senior pursuing a NON-performing career in the performing arts. The award is well attested; the year attribution (the 4th annual Blumeys) is not confirmed on a fetched Blumenthal page.',
        win: true,
      },
    ],
    honestContext:
      'For a school this small, the Blumey record is real and better than the enrollment would predict — the 2023 nominations for Best Ensemble/Chorus and Best Overall Direction are program-level recognition, not just standout individuals. The flip side of small-school math is the upside for a student: mounting a full musical out of a very small student body means far fewer peers competing for a role. Two things a parent should note plainly: no NCTC participation, placement or award could be found anywhere, so the Blumeys are the whole external picture; and prior research attributing a production of "Matilda Jr." to this school was an error — that show was staged by the Davidson Community Players, a separate community theater company in the same town, so it is excluded here.',
    sources: [
      {
        label: 'Blumenthal Arts — 2026 nominees & finalists',
        url: 'https://www.blumenthalarts.org/news/detail/blumenthal-arts-announces-nominees-finalists-for-2026-blumey-awards',
      },
      {
        label: 'Blumenthal Arts — 2023 Blumey nominees',
        url: 'https://www.blumenthalarts.org/news/detail/blumenthal-performing-arts-announces-2023-blumey-awards-nominees',
      },
      {
        label: 'Blumenthal Arts — 2025 nominations',
        url: 'https://www.blumenthalarts.org/news/detail/2025-blumey-awards-nominations',
      },
      {
        label: 'Blumenthal Arts — Gordon Hay Scholarship',
        url: 'https://www.blumenthalarts.org/education/student-programs/scholarships/gordon-hay-scholarship',
      },
      { label: '2026-27 Upper School Course Catalog', url: DD_CATALOG },
    ],
  },

  music: {
    headline:
      'One performing music ensemble, and it is a rock band — open to any level with no audition, but there is no concert band, orchestra or chorus course at all.',
    subhead:
      'A contemporary/rock-band model rather than a concert-ensemble model. Parents expecting a traditional band-and-choir ladder should read that carefully.',
    tracks: [
      {
        label: 'Open enrolment — no audition',
        ensembles: ['Contemporary Ensemble'],
      },
      {
        label: 'Auditioned — new students must audition',
        ensembles: ['Theatre Performance Ensemble'],
      },
      {
        label: 'Classroom — no performance requirement',
        ensembles: ['Modern Music', 'Film Studies & Production'],
      },
    ],
    boardNote:
      'Contemporary Ensemble is described as the school’s "very own School of Rock" — pop and rock with a dash of jazz, blues and funk, open to all levels, all instruments and vocalists, with guitars, bass, keyboards and drums provided in the classroom. Members must perform publicly at least once per quarter. Modern Music covers music history and production in GarageBand with no performance requirement. No concert band, symphonic band, marching band, orchestra, jazz band, chorus or vocal ensemble appears as a named Upper School course in the 2026-27 catalog. No band, choral or music-department director is named anywhere.',
    ladderTitle: 'The honors ladder — where it stops',
    ladder: [
      {
        label: 'Join an ensemble',
        text: 'Contemporary Ensemble takes any level with no audition and adjusts repertoire to each student — a materially lower barrier than an auditioned band or choir. Quarterly public performance is required.',
      },
      {
        label: 'Audition up',
        text: 'the Theatre Performance Ensemble is the one auditioned group, and it is a theatre company rather than a music ensemble.',
      },
      {
        label: 'Get selected beyond campus',
        text: 'no all-district or all-state selections, no NCAIS honors ensembles and no adjudicated festival ratings could be found in any source. If this pipeline exists, it is unpublished.',
      },
      {
        label: 'Be honored for it',
        text: 'no Tri-M Music Honor Society chapter could be found.',
      },
    ],
    ladderNote:
      'This is the clearest gap in the school’s published arts picture, and it is the reason the tour questions below matter more here than at a school that publishes everything. A student who plays violin or flute, or who sings classically, has no published ensemble to join in grades 9–12 — ask directly what they would join, and whether private lessons happen on campus.',
    sources: [
      { label: '2026-27 Upper School Course Catalog', url: DD_CATALOG },
      { label: 'davidsonday.org — Arts', url: DD_ARTS },
    ],
  },

  visual: {
    headline:
      'The strongest part of the program — two parallel tracks, Photography I–III and Studio I → Studio II Honors → AP Studio Art, with Portfolio as a second route in.',
    subhead:
      'More depth than the enrolment would predict for a school this size. Photography is digital and Lightroom-based throughout; no darkroom is mentioned anywhere.',
    mediaTitle: 'Studio media',
    media: [
      { name: 'Graphite & charcoal', detail: 'observational drawing in Studio I' },
      { name: 'Paint', detail: 'from impressionist landscape to abstract expressionist collage in Portfolio' },
      { name: 'Ceramics', detail: 'hand-built forms — content inside Studio I, not a standalone course' },
      { name: 'Digital illustration', detail: 'also content inside Studio I' },
      { name: 'Digital photography', detail: 'DSLR and Adobe Lightroom across three course levels' },
      { name: 'Film / darkroom', detail: 'not mentioned anywhere — assume none unless the school says otherwise' },
    ],
    path: [
      { name: 'Studio I' },
      { name: 'Studio II Honors' },
      { name: 'AP Studio Art', terminal: true },
    ],
    pathNote:
      'AP Studio Art requires departmental approval. Portfolio runs as an alternate stepping-stone into AP, and Photography I → II → III is a parallel three-year track ending in a personal website',
    exhibits: [
      {
        when: 'Course-end',
        name: 'Photography portfolio',
        detail: 'Photography I and II both end in a final portfolio',
      },
      {
        when: 'Ongoing',
        name: 'Personal websites',
        detail: 'Photography III students build and maintain their own sites — a concrete, checkable output',
      },
      {
        when: 'Internal',
        name: 'Studio walls',
        detail: 'student work is displayed throughout the art studio; no gallery space is named',
      },
      {
        when: 'Not found',
        name: 'No public show',
        detail: 'no student art show, exhibition calendar or Art Honor Society chapter is published',
      },
    ],
    footnote:
      'No visual arts, photography or AP Studio Art teacher is named in any source. The school states that students building AP portfolios "pursue admission" at schools such as the Savannah College of Art and Design, Rhode Island School of Design and Chapman University — note the careful wording, which describes where students apply rather than confirmed admissions. Whether the school supplies cameras is unpublished, though catalog photos show students with their own DSLR bodies. One adjacent honor worth knowing: sophomore Sims Skaff was named Photographer of the Year in the Private School Journalism Association contest, co-sponsored by Quill and Scroll, announced April 2025 — but that came through the yearbook and journalism pipeline, which the catalog houses under English rather than the arts department.',
    sources: [
      { label: '2026-27 Upper School Course Catalog', url: DD_CATALOG },
      { label: 'davidsonday.org — Arts', url: DD_ARTS },
    ],
  },

  verdict: {
    headline:
      'An accessible arts program, not a conservatory one — with a real Blumey record and a full visual ladder, but almost nothing about it published.',
    subhead:
      'Several of the gaps below may simply be unpublished rather than absent, which is exactly why the tour questions matter more here than at a school that documents everything.',
    holdsUp: [
      {
        label: 'A genuine no-audition way into performing music',
        text: 'Contemporary Ensemble takes students at any level with no audition, adjusts repertoire to each player, and provides guitars, bass, keyboards and drums in the classroom. For a beginner or late starter that is a materially lower barrier than an auditioned band or choir.',
      },
      {
        label: 'Small-school math means real stage time',
        text: 'the school mounts a full Upper School musical out of a very small student body, so a student who wants to be cast competes against far fewer peers than at a large independent or public magnet.',
      },
      {
        label: 'The Blumey record is program-level, not just lucky individuals',
        text: '2023 Mean Girls drew Best Ensemble/Chorus and Best Overall Direction nominations, and 2026 Big Fish produced three finalists across Best Actor, Best Supporting Actress and Best Featured Performer.',
      },
      {
        label: 'A complete visual-arts ladder terminating in AP',
        text: 'Photography I–III alongside Studio I → Studio II Honors → AP Studio Art is a four-to-five-year runway, with Portfolio as a second, more self-directed route in.',
      },
      {
        label: 'Media breadth beyond the traditional arts',
        text: 'Film Studies & Production and Modern Music (GarageBand composition, soundtrack building), plus Photography III’s personal-website requirement, give a media-leaning student portfolio-visible output with no performance requirement.',
      },
      {
        label: 'The requirements are arts-friendly at the margins',
        text: 'only one fine-arts credit is required to graduate, so an arts-indifferent student is not forced into a heavy commitment — while an arts-committed one can claim the PE credit for theater, freeing a schedule slot.',
      },
    ],
    ask: [
      'Where do performances actually happen? No arts venue is named anywhere, and catalog photos appear to show a musical staged in the gym and a recital inside the art studio. Ask to stand in the space — is there a dedicated theater with fixed seating, stage lighting and a booth? What is the seat count?',
      'Who teaches the arts, and who directed Big Fish — and are they returning? Not one arts faculty name is published, and in a program this small one departure changes everything.',
      'Is there any concert band, orchestra or chorus, in any division at any level? The Upper School catalog shows only Contemporary Ensemble. If my child plays violin or flute, or sings classically, what do they join in grades 9–12?',
      'Who builds the sets, and is there any tech-theater pathway? The productions involve substantial constructed scenery and a student once won a scholarship for non-performing theater work, yet there is no stagecraft course.',
      'What external arts recognition have students earned in the last three years beyond the Blumeys? No all-state selections, adjudicated ratings, NCTC participation, Art Honor Society or Tri-M chapter could be found.',
      'How does visual art get shown, and is any film or darkroom work possible? No gallery, student-show calendar or art honor society is published, and the photo sequence reads as digital-only. Does the school provide cameras?',
      'Does a Middle School band or chorus exist, and does it feed anything in the Upper School?',
    ],
    sources: [
      { label: 'davidsonday.org — Arts', url: DD_ARTS },
      { label: '2026-27 Upper School Course Catalog', url: DD_CATALOG },
      {
        label: 'Verdict synthesized by the researcher from the sources cited on cards 1a–1d',
      },
    ],
  },
}
