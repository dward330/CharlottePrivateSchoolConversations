// Gaston Day School — The Arts research area.
//
// Every figure is traceable to source-material/the-arts/gaston-day/ —
// "Gaston Day School - The Arts - Program Facilities and Recognition 2026.md" —
// plus the course table in the Academic Profile 2025-2026 PDF.
//
// All five cards render. The school's arts page is unusually descriptive for a
// school this size (a named 550-seat centre, a six-year adjudication record,
// documented performance travel), and the profile supplies the course sequence
// and the fine-arts graduation requirement.
//
// Two deliberate omissions inside the cards:
//  - No `photo` on any card. The design's photo slots ship only with a real
//    sourced photograph of this school's own venue, and none was obtainable.
//  - The theatre `ledger` is omitted: the school names two productions a year
//    and a spring musical, but publishes no show titles, dates or competition
//    results, so an awards ledger would be an empty table.

import type { ArtsProgram } from '../artsProgram.ts'

const ARTS = 'https://www.gastonday.org/arts/'
const PROFILE =
  'https://www.gastonday.org/wp-content/uploads/2025/09/New-GDS-Profile-25-26.pdf'
const MIDDLE = 'https://www.gastonday.org/middle-school/'
const LOWER = 'https://www.gastonday.org/early-lower-school/'

export const gastonDay: ArtsProgram = {
  /* ----------------------------------------------------------- 2a ladder -- */
  ladder: {
    headline:
      'Drama starts in second grade and runs unbroken to Visual Art IV Honors — a PS-12 arts ladder anchored by a named 550-seat arts centre.',
    subhead:
      'Two years of fine arts are required to graduate, and the arts sit inside the classroom rather than beside it: in the Lower School, music, art and drama lessons are coordinated with the units of study being taught.',
    stats: [
      { value: '550', label: 'seats in the Pamela Kimbrell Warlick Visual & Performing Arts Center' },
      { value: '2 yrs', label: 'fine arts required to graduate' },
      { value: 'Grade 2', label: 'where drama classes begin' },
      { value: '2', label: 'major productions a year, including the spring musical' },
    ],
    divisions: [
      {
        name: 'Early & Lower School',
        grades: 'PS–4',
        items: [
          'Music, art and drama coordinated with classroom units of study rather than taught in isolation',
          'Drama classes begin as early as second grade',
          'Experiential learning through frequent field trips, guest speakers and virtual tours',
        ],
      },
      {
        name: 'Middle School',
        grades: '5–8',
        items: [
          'Electives chosen from art, drama, chorus and band',
          'MS Instrumental Ensemble — woodwinds, brass, percussion, piano and guitar',
          'Middle School Chorus',
          'Private music lessons available',
        ],
      },
      {
        name: 'Upper School',
        grades: '9–12',
        items: [
          'Visual Art I, II, III and Visual Art IV (H)',
          'Band, Concert Choir and Drama as fine-arts courses',
          'Upper School Vocal Performance Ensemble',
          'Actors’ Conservatory Theatre as a dedicated programme',
          'Arts-adjacent electives: Music Appreciation, Cinema Studies, Creative Writing (H), Yearbook',
        ],
      },
    ],
    enrichmentTitle: 'Beyond the timetable',
    enrichment: [
      {
        label: 'Private lessons',
        text: 'Taught by contracted professional musicians, billed at $35 per lesson on the school’s published fee schedule. Middle School students waiting for a lesson may do homework in aftercare at no charge.',
      },
      {
        label: 'Performance travel',
        text: 'The programme has performed at St Mary-le-Bow and Canterbury Cathedral, and given joint concerts with the Westminster Youth Orchestra.',
      },
      {
        label: 'Summer arts camps',
        text: 'Thespian Camp (rising PK–6) runs in the summer catalog, alongside partner camps from the Children’s Theater of Charlotte (Frozen, Willy Wonka, Cowabunga) and Studio Elite dance.',
      },
      {
        label: 'Student publication',
        text: 'Blutopia, the literary and art magazine, is entirely student-developed, created and published — see the Verdict card for its award record.',
      },
    ],
    sources: [
      { label: 'gastonday.org — Arts (facilities, drama from grade 2, ensembles, private lessons)', url: ARTS },
      { label: 'gastonday.org — Academic Profile 2025-2026 (fine-arts requirement, course table)', url: PROFILE },
      { label: 'gastonday.org — Middle School (arts electives)', url: MIDDLE },
      { label: 'gastonday.org — Early/Lower School (integrated arts)', url: LOWER },
    ],
  },

  /* ---------------------------------------------------------- 2b theatre -- */
  theatre: {
    headline:
      'Two major productions a year, including a spring musical, staged in a 550-seat centre with a professional dance studio.',
    subhead:
      'Students work on stage, as stage managers, on crew or in design — the school states all four routes explicitly, so theatre is not only for performers.',
    seasonTitle: 'The production year',
    season: [
      {
        season: 'Across the year',
        kind: 'Two major shows',
        detail:
          'The school stages two major productions each year, one of which is the spring musical. Specific titles and dates are not published.',
      },
      {
        season: 'Spring',
        kind: 'Musical',
        detail:
          'The spring musical is the named anchor of the production calendar.',
      },
      {
        season: 'Curricular',
        kind: 'Drama from grade 2',
        detail:
          'Drama classes begin as early as second grade, so the pipeline into Upper School productions starts in the Lower School.',
      },
      {
        season: 'Summer',
        kind: 'Thespian Camp',
        detail:
          'Thespian Camp (rising PK–6) teaches songs and script for a short musical and involves campers in designing a simple set.',
      },
    ],
    whoRunsIt:
      'Travis Johnson chairs the Fine Arts Department (ext. 415). The Actors’ Conservatory Theatre operates as a dedicated programme within the school’s theatre offering.',
    venueNote:
      'The Pamela Kimbrell Warlick Visual & Performing Arts Center seats 550 and carries modern lighting and sound systems plus a professional dance studio — a substantial house for a school of 510 students.',
    honestContext:
      'The school publishes no production titles, performance dates, cast sizes or theatre competition results, and it names no International Thespian Society troupe number despite chartering the society. So the *shape* of the programme is well documented while its *record* is not — this card deliberately carries no awards ledger rather than an empty one.',
    sources: [
      { label: 'gastonday.org — Arts (productions, roles, Actors’ Conservatory Theatre, venue)', url: ARTS },
      { label: 'gastonday.org — Academic Profile 2025-2026 (Drama in the fine-arts course table)', url: PROFILE },
    ],
  },

  /* ------------------------------------------------------------ 2c music -- */
  music: {
    headline:
      'Chorus students earned “superior” ratings in regional adjudications across six years, and the programme has sent students on to the UNC School of the Arts and Governor’s School.',
    subhead:
      'Music is taught as a practice rather than a subject — the curriculum covers singing, movement, improvisation, reading, writing and performing.',
    boardTitle: 'The ensembles',
    tracks: [
      {
        label: 'Middle School',
        ensembles: [
          'MS Instrumental Ensemble — woodwinds',
          'MS Instrumental Ensemble — brass',
          'MS Instrumental Ensemble — percussion',
          'MS Instrumental Ensemble — piano',
          'MS Instrumental Ensemble — guitar',
          'Middle School Chorus',
        ],
      },
      {
        label: 'Upper School',
        ensembles: [
          'Vocal Performance Ensemble',
          'Band',
          'Concert Choir',
        ],
      },
      {
        label: 'Individual study',
        ensembles: [
          'Private lessons with contracted professional musicians',
          'Music Appreciation (elective)',
        ],
      },
    ],
    boardNote:
      'Band and Concert Choir appear in the profile’s fine-arts course table, so they carry academic credit toward the two-year requirement; the ensembles listed on the arts page sit alongside them.',
    ladderTitle: 'The recognition ladder',
    ladder: [
      {
        label: 'Regional adjudication',
        text: 'Chorus students earned “superior” ratings in regional adjudications over six years — a sustained record rather than a single strong year.',
      },
      {
        label: 'Conservatory admission',
        text: 'Students have gained admission to the North Carolina School of the Arts. UNC School of the Arts also appears on the school’s 2019–2025 college acceptance list, independently corroborating the pathway.',
      },
      {
        label: 'Governor’s School',
        text: 'Students have earned places at North Carolina Governor’s School, the state’s selective summer programme for gifted students.',
      },
      {
        label: 'International performance',
        text: 'Performances at St Mary-le-Bow and Canterbury Cathedral, plus joint concerts with the Westminster Youth Orchestra.',
      },
    ],
    ladderNote:
      'The school does not publish ensemble sizes, named all-state or all-district selections, festival ratings by year, or a music faculty roster beyond the department chair — so the ladder above is qualitative where a larger school would publish counts.',
    sources: [
      { label: 'gastonday.org — Arts (curriculum, ensembles, adjudication record, conservatory admissions, performance travel)', url: ARTS },
      { label: 'gastonday.org — Academic Profile 2025-2026 (Band and Concert Choir in the course table)', url: PROFILE },
    ],
  },

  /* ----------------------------------------------------------- 2d visual -- */
  visual: {
    headline:
      'A four-step Upper School sequence ending at Visual Art IV Honors, taught across five media including ceramics and printmaking.',
    subhead:
      'Portfolio development is named as part of the instruction, which is the practical difference between an art elective and a route to an art school — and the acceptance list bears it out.',
    mediaTitle: 'What students actually work in',
    media: [
      { name: 'Drawing' },
      { name: 'Painting' },
      { name: 'Ceramics' },
      { name: 'Printmaking' },
      { name: 'Portfolio development', detail: 'Named explicitly in the Upper School visual-arts description' },
    ],
    path: [
      { name: 'Visual Art I' },
      { name: 'Visual Art II' },
      { name: 'Visual Art III' },
      { name: 'Visual Art IV (H)', terminal: true },
    ],
    pathNote:
      'There is no AP Studio Art or AP Art History in the profile’s course table — Visual Art IV (H) is the terminal course, carrying the Honors +0.50 weighting rather than an AP +1.0. Cinema Studies, Creative Writing (H) and Yearbook sit alongside as arts-adjacent electives.',
    exhibitsTitle: 'Where the work goes',
    exhibits: [
      {
        when: 'Annual',
        name: 'Scholastic Art Awards',
        detail:
          'Numerous Scholastic Art Awards, plus wins at national, regional and local competitions.',
      },
      {
        when: 'Annual',
        name: 'Blutopia',
        detail:
          'The student literary and art magazine publishes illustrations, paintings and photographs alongside written work, and has taken numerous Scholastic Art and Writing Awards and repeated recognition in the NC Scholastic Media Association Literary Magazine Contest.',
      },
      {
        when: '2019–2025',
        name: 'Art-school matriculation',
        detail:
          'The 2019–2025 acceptance list includes RISD, SCAD, School of Visual Arts, Maryland Institute College of Art, the School of the Art Institute of Chicago, Minneapolis College of Art and Design and UNC School of the Arts — seven specialty art and design institutions.',
      },
    ],
    footnote:
      'The department is chaired by Travis Johnson; no other arts faculty are named publicly. The school publishes no gallery or exhibition calendar, no count of Scholastic awards by year and no named student winners — "numerous" is the school’s own word and is reproduced rather than quantified.',
    sources: [
      { label: 'gastonday.org — Arts (media, portfolio development, awards)', url: ARTS },
      { label: 'gastonday.org — Academic Profile 2025-2026 (Visual Art I–IV(H), Blutopia recognition, ARTS grade distribution)', url: PROFILE },
    ],
  },

  /* ---------------------------------------------------------- 2e verdict -- */
  verdict: {
    headline:
      'A serious arts programme for a 510-student school — a named 550-seat centre, a six-year adjudication record, and a student magazine with a national award history.',
    subhead:
      'What is missing is the record rather than the programme: almost nothing is published by year, by title or by name.',
    holdsUp: [
      {
        label: 'The facility is real and named',
        text: 'The Pamela Kimbrell Warlick Visual & Performing Arts Center seats 550 with modern lighting and sound and a professional dance studio — larger than the school’s entire enrollment.',
      },
      {
        label: 'The ladder is genuinely PS–12',
        text: 'Drama from second grade, integrated arts in the Lower School, four elective tracks in the Middle School, and a four-course visual sequence plus three ensembles in the Upper School.',
      },
      {
        label: 'Recognition is sustained, not one-off',
        text: 'Six years of “superior” regional chorus adjudications, and admissions to UNC School of the Arts and Governor’s School.',
      },
      {
        label: 'Blutopia is a genuine distinction',
        text: 'Entirely student-produced, with numerous Scholastic Art and Writing Awards and consistent recognition in the NC Scholastic Media Association Literary Magazine Contest.',
      },
      {
        label: 'Portfolio work leads somewhere',
        text: 'Portfolio development is taught, and seven specialty art and design schools — RISD, SCAD, SVA, MICA, SAIC, MCAD and UNCSA — appear on the acceptance list.',
      },
      {
        label: 'Arts grades are published',
        text: 'The profile prints an ARTS grade distribution for 2024-25 (72% A+, 22% A, 5% A-), which few schools disclose. Read it as context for how the department grades rather than as a difficulty signal.',
      },
    ],
    ask: [
      'What were the last two years’ productions, and how many students were cast versus crewed?',
      'How large are Band, Concert Choir and the Vocal Performance Ensemble — and does everyone who auditions get a place?',
      'Visual Art IV is the terminal course with no AP Studio Art — how do students building an art-school portfolio go further?',
      'Which regional adjudications does the chorus enter, and what were the ratings in the last two years specifically?',
      'How many Scholastic Art Awards did students win last year, and at what level (Gold Key, Silver Key, Honorable Mention)?',
      'Who teaches visual art, music and drama beyond the department chair, and what are their backgrounds?',
      'Is there an International Thespian Society troupe, and what are its induction requirements?',
    ],
    sources: [
      { label: 'Verdict synthesized by the researcher from the sources cited on the cards above' },
    ],
  },
}
