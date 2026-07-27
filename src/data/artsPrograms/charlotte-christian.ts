// Charlotte Christian School — The Arts.
//
// Transcribed from source-material/the-arts/charlotte-christian/
// "Charlotte Christian - The Arts - Arts Redesign Deep Research.md", which
// carries a source URL and a VERIFIED / SCHOOL-CLAIM / NOT FOUND marker on
// every fact.
//
// The single most important wording decision in this file: the 2024 Tarzan
// results are FINALISTS, not nominations. The 2024 Blumeys ran two tiers — each
// production names one finalist per performance category, and a top-6 nominee
// cut is announced from that pool. Charlotte Christian took a finalist slot in
// all five acting categories (a whole-cast result) but appears nowhere in the
// top-6 nominee list. That is why the school's announcement page showed no
// nominations while search snippets surfaced individual students: both readings
// were half-right. The ledger says "finalist" throughout and must never be
// restated as "nominations."
//
// Two other research outcomes shaped this file:
//
//  - The 2013 Oklahoma! result is STRONGER than the baseline claim: not one
//    award but a four-award sweep (Best Musical, Best Ensemble/Chorus, Best
//    Choreography Execution, Best Lighting Execution) from a 17-school field.
//  - The venue is better than the school markets. The general contractor
//    documents a black box theater, a scene shop and dressing rooms that appear
//    nowhere on the school's own pages — which materially softens the "the
//    theatre is really a chapel" concern and underpins the tech electives.
//    Facility photos belong to the architect and contractor rather than the
//    school, so none is republished here.
//
// Claims deliberately ABSENT because they could not be verified: "Excellent and
// Superior festival ratings" (absent from the music page entirely), AP Music
// Theory (no music theory course is named anywhere), and any named student or
// year for Scholastic Art & Writing, Festival in the Park, Patriotic Art, or NC
// honors-ensemble placements.

import type { ArtsProgram } from '../artsProgram.ts'

const CC_ARTS = 'https://www.charlottechristian.com/fine-arts'
const CC_MUSIC = 'https://www.charlottechristian.com/fine-arts/music'
const CC_THEATRE = 'https://www.charlottechristian.com/fine-arts/theatre'
const CC_VISUAL = 'https://www.charlottechristian.com/fine-arts/visual-art'
const CC_DIGITAL = 'https://www.charlottechristian.com/fine-arts/digital-arts'
const CC_FOTA = 'https://www.charlottechristian.com/fine-arts/friends-of-the-arts'
const CC_US = 'https://www.charlottechristian.com/academics/upper-school'
const CC_BOX = 'https://www.charlottechristian.com/fine-arts/box-office'

export const charlotteChristian: ArtsProgram = {
  ladder: {
    headline:
      'Four fine-arts branches — Digital Arts, Music, Theatre and Visual Art — with a transcript-level arts credential and an honor society for each discipline.',
    subhead:
      'Roughly 43–44 named courses and ensembles across JK–12, staged in a purpose-built 518-seat Center for Worship and Performing Arts that also holds a black box theater and a scene shop.',
    stats: [
      { value: 'JK–12', label: 'four branches · ~43 named offerings' },
      { value: '2 AP', label: 'Studio Art (2-D & 3-D) · Art History' },
      { value: '518', label: 'seats — plus a black box theater' },
      { value: '3', label: 'arts honor societies, one per branch' },
    ],
    divisions: [
      {
        name: 'Lower School',
        grades: 'JK–6',
        items: [
          'Visual art begins "at the earliest stages" — creativity, technique and media literacy',
          'Instrumental music starts in Grade 5, split by instrument family: brass, woodwind, high/low strings, plus choral',
          'Grade 6 continues brass, woodwinds, choir and strings',
          'Mainstage musicals cast from Grade 4 — elementary students appear on the main stage',
        ],
      },
      {
        name: 'Middle School',
        grades: '7–8',
        items: [
          'Grade 7 and Grade 8 Concert Band; Grade 7 and Grade 8 Orchestra; Grade 7/8 Advanced Choir',
          'Digital Arts and Theatre electives both open at Grade 6',
          'ACT 2 — the audition-only middle school competition drama team',
          'NCTC Middle School Play Festival competition',
        ],
      },
      {
        name: 'Upper School',
        grades: '9–12',
        items: [
          'All six music ensembles are Honors-designated: Wind Ensemble, Jazz Band, Choir, Orchestra, Chamber Ensemble, plus uKnight Worship',
          'Drawing & Painting beginner → intermediate → honors → AP; Art & Design beginner → AP; AP Art History',
          'Nine Digital Arts electives on professional software',
          'Seven theatre electives incl. technical directing and stage management; ACT 1 competition team',
          'Graduate "with distinction" in Fine Arts via the Academic Conservatory Program',
        ],
      },
    ],
    enrichmentTitle: 'The enrichment layer — beyond the classroom',
    enrichment: [
      {
        label: 'The venue, in full',
        text: 'The Center for Worship and Performing Arts opened in Fall 2017 as Phase 1 of the master campus plan — two storeys, roughly 20,500–20,800 sq ft, seating 518 per the architect. Beyond the main auditorium the contractor documents a black box theater, a scene shop for set construction and dressing rooms. None of those three appears on the school’s own pages, so confirm them on a tour — they are what separate this from a chapel that also does plays.',
      },
      {
        label: 'Friends of the Arts',
        text: 'A parent, alumni, faculty and business organization with seven giving tiers from $50 to $7,500. It funds real line items rather than refreshments: mainstage lighting and technical effects, band and orchestra instrument inventory, commissioned compositions, guest artist visits, gallery and performance field trips, arts technology, and faculty professional development. Publishes a monthly newsletter, Opening Knights.',
      },
      {
        label: 'Box office & season',
        text: 'A dedicated Fine Arts Box Office sells tickets online with PDF delivery and a HomeTown Fan app. The 2025-26 season is themed "Pure Imagination," with sales opening September 2025 — individual production titles were not published at time of research.',
      },
      {
        label: 'Apple Distinguished School',
        text: 'The school maintains an Apple Distinguished School page, and the Digital Arts software stack is Apple-native at the entry tier (Pages, Keynote, iMovie, GarageBand). The connection to the Digital Arts curriculum is inferential — the school does not state it, and the designation years are not published.',
      },
    ],
    sources: [
      { label: 'charlottechristian.com — Fine Arts', url: CC_ARTS },
      { label: 'Music', url: CC_MUSIC },
      { label: 'Visual Art', url: CC_VISUAL },
      { label: 'Digital Arts', url: CC_DIGITAL },
      { label: 'Upper School (conservatory, honor societies)', url: CC_US },
      { label: 'Friends of the Arts', url: CC_FOTA },
    ],
  },

  theatre: {
    headline:
      'A four-award Blumey sweep in 2013 including Best Musical — and in 2024, a finalist slot in all five acting categories for Tarzan.',
    subhead:
      'Three mainstage musicals a year cast from Grade 4 up, plus four competition circuits: NCTC high school and middle school festivals, the CITA Secondary Theatre Festival, and the English Speaking Union Regional Shakespeare Competition.',
    seasonTitle: 'The season rhythm — three mainstage musicals, grades 4–12',
    season: [
      {
        season: '2025-26',
        kind: 'Season: "Pure Imagination"',
        detail:
          'The season carries a theme — "familiar fictional worlds brimming with humor, joy, love, fantasy, and imagination" — but individual production titles were not published at time of research.',
      },
      {
        season: 'Recent',
        kind: 'Mainstage musicals',
        detail:
          'Published as an unordered set, without years: High School Musical, Shrek, Footloose, Beauty and the Beast, Joseph and the Amazing Technicolor Dreamcoat, Into the Woods, Tarzan, Freaky Friday.',
      },
    ],
    whoRunsIt:
      'Two audition-only competition teams carry the competitive work: ACT 1 (high school) and ACT 2 (middle school). The tech track is better resourced than the school advertises — technical directing and stage management are two of the seven theatre electives, the venue includes a scene shop and dressing rooms per the contractor, and students place in technical categories externally (a CITA Technical Theatre Costume Design award, plus the 2013 Blumey win for Best Lighting Execution). Caution on personnel: the only theatre staff names findable anywhere date to a 2016 news post — Angela Tomaselli (ACT 1) and Conrad Bear (ACT 2) — and may be stale. No current director or technical director is published, and no faculty are named on any of the four branch pages.',
    venueNote:
      'Productions are staged in the Center for Worship and Performing Arts, which also hosts weekly chapel and assemblies — a dual-purpose room by design. The black box theater gives the program a second space that does not compete with the chapel calendar.',
    ledgerTitle: 'The awards ledger — Blumeys and CITA',
    ledger: [
      {
        year: '2024',
        show: 'Tarzan (Blumey)',
        result:
          'FINALIST — not nominee — in all five performance categories: Best Actor (Jayden Stall as Tarzan), Best Actress (Karsen Betzold as Jane), Best Supporting Actor (Jeffery Wilson as Kerchak), Best Supporting Actress (Hannah Roddy as Terk), Best Featured Performer (Isa Long as Jaquar). A whole-cast result. The school did not reach the top-6 nominee cut in any category. Field: 50 schools.',
      },
      {
        year: '2016',
        show: 'CITA Secondary Festival',
        result:
          'Six placements: 1st Place Ensemble Theatre (DuPre’, Gallagher, King, Williams); 1st Place Solo Jr High Musical Theatre (Hailey Thomas); 3rd Place same category (Lilly Mull); Honorable Mention Duo (Hanegraaff, Johnson); Honorable Mention Contrasting Monologues (Lily Robinson); Technical Theatre Costume Design (Katherine Hanebutt).',
        win: true,
      },
      {
        year: '2013',
        show: 'Oklahoma! (Blumey)',
        result:
          'A four-award sweep: Wells Fargo Best Musical, Best Ensemble/Chorus, Best Choreography Execution and Best Lighting Execution — the lighting award signalling technical capability, not just strong singing. Field: 17 schools.',
        win: true,
      },
    ],
    honestContext:
      'The 2013 Best Musical win is the program’s headline arts achievement and it is confirmed directly by Blumenthal Arts. But there has been no Blumey win, and no top-6 nomination, since — the 2024 Tarzan result is real and impressive as a whole-cast showing, yet it sits one tier below nomination, in a field that had grown from 17 schools to 50. The CITA record is the school’s most distinctive credential because the circuit suits its identity, but it rests on a single published year: 2016. The school describes CITA honors as earned "each year," and that framing has one data point behind it. Separately, no specific NCTC award could be found for any year.',
    sources: [
      { label: 'charlottechristian.com — Theatre', url: CC_THEATRE },
      { label: 'Box Office (2025-26 season)', url: CC_BOX },
      {
        label: 'Blumenthal Arts — 2013 Blumey winners',
        url: 'https://www.blumenthalarts.org/news/detail/announcing-2013-blumey-award-winners',
      },
      {
        label: 'Blumenthal Arts — 2024 all nominees & finalists (PDF)',
        url: 'https://www.blumenthalarts.org/assets/doc/2024-Blumey-All-Nominees-and-Finalists-c0f5a7ba22.pdf',
      },
      {
        label: 'CCS news — CITA 2016 results',
        url: 'https://www.charlottechristian.com/cf_news/view.cfm?newsid=1030',
      },
    ],
  },

  music: {
    headline:
      'Instrumental music from Grade 5 by instrument family, climbing to six Honors ensembles — and a Carnegie Hall Honors Performance Series placement.',
    subhead:
      'uKnight Worship makes the faith integration structural rather than decorative: a credit-bearing Upper School worship ensemble.',
    tracks: [
      {
        label: 'Lower School — curricular, by instrument family (grades 5–6)',
        ensembles: [
          'Grade 5 Brass',
          'Grade 5 Woodwind',
          'Grade 5 High/Low Strings',
          'Grade 5 Music (choral)',
          'Grade 6 Brass',
          'Grade 6 Woodwinds',
          'Grade 6 Choir',
          'Grade 6 High/Low Strings',
        ],
      },
      {
        label: 'Middle School — curricular, by grade (7–8)',
        ensembles: [
          'Grade 7 Concert Band',
          'Grade 8 Concert Band',
          'Grade 7/8 Advanced Choir',
          'Grade 7 Orchestra',
          'Grade 8 Orchestra',
        ],
      },
      {
        label: 'Upper School — all Honors-designated (9–12)',
        ensembles: [
          'Honors Wind Ensemble',
          'Honors Jazz Band',
          'Honors Choir',
          'Honors Orchestra',
          'Honors Chamber Ensemble',
          'uKnight Worship',
        ],
      },
    ],
    boardNote:
      'No music faculty, directors or chairs are named anywhere on the school’s pages. The Honors label on all six Upper School ensembles implies placed or selective entry, but the music page never states an audition requirement — so the tiering above reflects the published structure rather than a confirmed auditioned/open split. Note one real asymmetry: there is no music theory course of any kind named, so no AP Music Theory, even though the visual branch reaches AP twice.',
    ladderTitle: 'The honors ladder — how far it goes',
    ladder: [
      {
        label: 'Join an ensemble',
        text: 'placement by grade and instrument family from Grade 5 — every Grade 7 band student is in Grade 7 Concert Band. These are graded classes, not clubs.',
      },
      {
        label: 'Move into the Honors tier',
        text: 'all six Upper School ensembles carry an Honors designation. Whether entry is by audition is not published.',
      },
      {
        label: 'Get selected beyond campus',
        text: 'students participate in NCAIS Honor Band and Honor Chorus, state-level honors ensembles, the Winthrop and UNC Charlotte Invitationals, the Carowinds Festival — and the Carnegie Hall Honors Performance Series, a genuinely selective national placement and the standout line on the music page.',
      },
      {
        label: 'Be honored for it',
        text: 'Tri-M Music Honor Society, alongside the International Thespian Society for theatre and the National Art Honor Society for visual art — three societies, one per branch.',
      },
    ],
    ladderNote:
      'No named student or year could be found for any honors-ensemble placement, so no count is given. The frequently-repeated claim of "Excellent and Superior ratings at local music festivals" could not be verified at any source — it does not appear on the school’s music page — and is therefore omitted here rather than repeated.',
    sources: [
      { label: 'charlottechristian.com — Music', url: CC_MUSIC },
      { label: 'Fine Arts', url: CC_ARTS },
      { label: 'Upper School (honor societies)', url: CC_US },
    ],
  },

  visual: {
    headline:
      'Two AP ceilings in Visual Art plus a separate nine-elective Digital Arts branch running professional software — Logic Pro X, Ableton, Premiere Pro, Photoshop.',
    subhead:
      'Student work lives year-round in the Huge Gallery’s "Blue Ribbon Collection," curated across all three divisions.',
    mediaTitle: 'Studio media & the digital stack',
    media: [
      { name: '2-D: drawing & painting', detail: 'the deeper ladder — four levels to AP' },
      { name: '3-D: Art & Design', detail: 'beginner straight to AP; specific media unpublished' },
      { name: 'Digital photography', detail: 'a named course; Photoshop and Lightroom' },
      { name: 'Film & video', detail: 'the deepest sub-track — production I/II, history, broadcasting' },
      { name: 'Audio production', detail: 'Logic Pro X and Ableton — industry-standard tools' },
      { name: 'Graphic design & illustration', detail: 'taught as content via Canva and Procreate, not as named courses' },
    ],
    path: [
      { name: 'Drawing & Painting' },
      { name: 'Intermediate' },
      { name: 'Honors' },
      { name: 'AP Studio Art', terminal: true },
    ],
    pathNote:
      'Art & Design runs beginner → AP for the 3-D portfolio, and AP Art History runs parallel. Digital Arts has nine electives but NO AP capstone — a portfolio-bound student has to route through Visual Art',
    exhibits: [
      {
        when: 'Spring',
        name: 'KnightVision Art Show',
        detail: 'the all-school show, spanning both Visual Art and Digital Arts',
      },
      {
        when: 'Year-round',
        name: 'The Huge Gallery',
        detail: 'a named gallery holding the curated "Blue Ribbon Collection" from all three divisions',
      },
      {
        when: 'Regional',
        name: 'Festival in the Park',
        detail: 'plus the Patriotic Art Competition — participation confirmed',
      },
      {
        when: 'National',
        name: 'Scholastic Art & Writing',
        detail: 'participation cited on both the Visual Art and Digital Arts pages',
      },
    ],
    footnote:
      'No visual art or digital arts faculty are named on either branch page. A dedicated Digital Media Studio is named but not described — no size, equipment or station count, and no separate broadcast studio, green screen or recording booth is documented despite a Broadcasting course. The school calls the program "award-winning" and confirms participation in Scholastic Art & Writing, Festival in the Park and the Patriotic Art Competition, but not one individual visual-art award with a student name and year could be found — so no award counts appear here. A specific studio-media list (ceramics, printmaking, sculpture, fibres, kiln, wheel, darkroom) is also unpublished; the page speaks generically of "a variety of media."',
    sources: [
      { label: 'charlottechristian.com — Visual Art', url: CC_VISUAL },
      { label: 'Digital Arts', url: CC_DIGITAL },
      { label: 'Fine Arts', url: CC_ARTS },
    ],
  },

  verdict: {
    headline:
      'A Best Musical Blumey, a purpose-built two-venue arts facility, a transcript-level arts distinction — and a program whose faculty are entirely unpublished.',
    subhead:
      'The faith integration is structural rather than decorative, which is both the program’s distinctive asset and the thing a comparing parent should probe.',
    holdsUp: [
      {
        label: 'A top-prize win, plus proof of current competitiveness',
        text: 'the 2013 Oklahoma! Best Musical win came as a four-award sweep including Best Lighting Execution, from a 17-school field. In 2024, Tarzan earned finalist slots in all five acting categories — a whole-cast result in a field grown to 50.',
      },
      {
        label: 'Two performance spaces and a scene shop',
        text: 'a 518-seat centre opened in 2017, plus — per the contractor — a black box theater, a scene shop for set construction and dressing rooms. Better infrastructure than the school itself markets.',
      },
      {
        label: 'A transcript-level arts credential',
        text: 'students can graduate "with distinction" in Fine Arts through the Academic Conservatory Program, backed by three honor societies — Thespian, National Art, and Tri-M. Few peer schools formalise arts achievement on the transcript this way.',
      },
      {
        label: 'Digital Arts is genuinely resourced',
        text: 'nine electives on Logic Pro X, Ableton, Premiere Pro, Photoshop and Lightroom — industry tools rather than classroom apps — in a dedicated Digital Media Studio.',
      },
      {
        label: 'Wide on-ramps and year-round visibility',
        text: 'mainstage musicals cast from Grade 4, instrumental music starts in Grade 5 by instrument family, and the Huge Gallery curates a standing cross-divisional collection.',
      },
      {
        label: 'A funded parent arts organisation',
        text: 'Friends of the Arts runs seven giving tiers to $7,500 and funds commissioned compositions, guest artists, instrument inventory and faculty development.',
      },
    ],
    ask: [
      'Who directs theatre and who is your technical director, and how long have they been here? No faculty are named for any of the four branches, and the only names findable date to 2016 — ask this first.',
      'In 2024 Tarzan was a finalist in all five acting categories but did not reach the top-6 nominees. What is the gap you are working on, and what is your best Blumey result since 2013?',
      'Can you show me CITA results for the last three years, by category? The 2016 ledger is strong; nothing after it is public.',
      'Show me the black box and the scene shop. How often is the black box used, and who builds the sets — students or contractors?',
      'The main auditorium is chapel, assembly and theatre. Walk me through a production week: how much stage time does the cast get, and where do they rehearse when chapel owns the room?',
      'Digital Arts has nine electives and professional software but no AP. If my child wants a film or design portfolio, does the path have to route through AP Studio Art in Visual Art?',
      'Which students earned Scholastic Art & Writing Gold or Silver Keys in the last two years, and in what categories?',
      'Of the 40-plus electives, how many can one Upper School student realistically take across four years alongside AP academics? The figure is a JK–12 count that includes Grade 5 brass and Grade 6 choir.',
      'Is there a music theory course at all? There is no AP Music Theory, even though Visual Art reaches AP twice.',
    ],
    sources: [
      { label: 'charlottechristian.com — Fine Arts', url: CC_ARTS },
      { label: 'Upper School', url: CC_US },
      {
        label: 'Verdict synthesized by the researcher from the sources cited on cards 1a–1d',
      },
    ],
  },
}
