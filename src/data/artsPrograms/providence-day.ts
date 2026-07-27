// Providence Day School — The Arts.
//
// Transcribed from source-material/the-arts/providence-day/
// "Providence Day - The Arts - Arts Redesign Deep Research.md", which carries a
// source URL and a VERIFIED / SCHOOL-CLAIM / NOT FOUND marker on every fact.
//
// Two honesty decisions worth flagging, both driven by that research:
//
//  1. The school's awards page claims "26 BLUMEY Awards." Cross-checked against
//     Blumenthal's own published winner lists, exactly ONE outright win is
//     independently verifiable (Max Odom, Best Supporting Actor, Xanadu, 2022).
//     The rest are nominations and finalist placements. So the ledger below
//     distinguishes wins from finalists row by row, and the honest-context note
//     states the discrepancy rather than repeating "26 awards" unqualified.
//
//  2. NCTC is where this program actually wins — Superior ratings, two regional
//     site wins, Excellence in Directing twice, and state-level design honors
//     for Radium Girls. The design mock underweighted it relative to the
//     Blumeys; the research inverted that, so the card carries both.

import type { ArtsProgram } from '../artsProgram.ts'

const PD_ARTS = 'https://www.providenceday.org/the-pd-difference/arts'
const PD_US = 'https://www.providenceday.org/upper-school/arts'
const PD_MS = 'https://www.providenceday.org/middle-school/arts'
const PD_LS = 'https://www.providenceday.org/lower-school/arts'
const PD_AWARDS = 'https://www.providenceday.org/performances-and-awards'
const PD_FOTA =
  'https://www.providenceday.org/the-pd-difference/get-involved/friends-of-the-arts'

export const providenceDay: ArtsProgram = {
  ladder: {
    headline:
      'One continuous arts course of study from TK to grade 12, ending in three AP arts disciplines.',
    subhead:
      'Six named disciplines school-wide — band, chorus, orchestra, theatre, production and design, and visual arts — anchored by the McMahon Fine Arts Center and a parent Friends of the Arts group.',
    stats: [
      { value: 'TK–12', label: 'continuous arts program' },
      { value: '3 AP', label: 'Studio Art · Art History · Music Theory' },
      { value: '7', label: 'named ensembles + auditioned groups' },
      { value: '37k sq ft', label: 'McMahon complex · 500-seat theater' },
    ],
    divisions: [
      {
        name: 'Lower School',
        grades: 'TK–4',
        items: [
          'Active-listening music curriculum — singing, moving, playing; classical, popular and global repertoire',
          'Sequential music reading; percussion work; 4th graders learn the recorder',
          'Separate Lower School Music, Theatre and Visual Arts strands',
          'Arts field trips on a rotating basis — a musical, a symphony concert or a ballet',
          'A Lower School musical each year (2025-26: "Schoolhouse Rock Jr.")',
        ],
      },
      {
        name: 'Middle School',
        grades: '5–8',
        items: [
          'Band · chorus · orchestra · theatre · technical theatre — tech starts this early',
          'A Middle School musical (2025-26: "Disney\'s Descendants The Musical")',
          'Ensembles perform on and off campus at local and state competitions',
          'Visual arts built to feed progressively into the Upper School studio',
          'First honors doors open — NCAIS honors ensembles are optional from MS',
        ],
      },
      {
        name: 'Upper School',
        grades: '9–12',
        items: [
          'Full ensemble slate plus a wide range of theater and technical theater classes',
          'AP Studio Art · AP Art History · AP Music Theory',
          'Studio work spans darkroom film photography and unconventional materials',
          'National Art Honor Society and Tri-M Music Honor Society chapters',
        ],
      },
    ],
    enrichmentTitle: 'The enrichment layer — beyond the classroom',
    enrichment: [
      {
        label: 'Spotlight on the Arts',
        text: 'A monthly showcase during Upper School lunch (1:30–2 p.m.) in the McMahon Fine Arts Foyer — low-stakes stage time every month. Past editions ran from Jazz Ensemble and A Cappella sets to participatory demos like stick-and-ink drawing and printing on fabric.',
      },
      {
        label: 'Visiting artists',
        text: 'Master classes and visiting artists supplement the classroom program in both Middle and Upper School. The school claims over 40 masterclass opportunities in the performing arts (school-reported, no time window given).',
      },
      {
        label: 'Friends of the Arts',
        text: 'The Parents’ Association volunteer group backing both departments — ushers, a theatre behind-the-scenes crew running concessions and tickets, production photography and T-shirts, and the crew that hangs student and faculty artwork across campus. Open to parents, faculty, alumni and grandparents; no membership fee.',
      },
      {
        label: 'Professional affiliations',
        text: 'NAfME and NCMEA (music education), ACDA (choral), and the NC Theatre Conference (theatre) — the bodies whose honors circuits the pipeline in card 1c actually feeds.',
      },
    ],
    sources: [
      { label: 'providenceday.org — Arts overview', url: PD_ARTS },
      { label: 'Lower School Arts', url: PD_LS },
      { label: 'Middle School Arts', url: PD_MS },
      { label: 'Upper School Arts', url: PD_US },
      { label: 'Friends of the Arts', url: PD_FOTA },
    ],
  },

  theatre: {
    headline:
      'A play and a musical every year in a 500-seat home theatre — with one verified Blumey win and a genuinely strong NCTC one-act record.',
    subhead:
      'The Blumeys are Blumenthal Performing Arts’ regional high-school musical-theater awards, judged at home-venue performances; 59 schools submitted in 2026. NCTC is the NC Theatre Conference one-act festival circuit.',
    seasonTitle: 'The season rhythm — every year, on the McMahon stage',
    season: [
      {
        season: 'Fall',
        kind: 'Play / One-Act',
        detail:
          '2025-26: The Crucible (Oct 24–26) — the same production doubles as the NCTC one-act entry. 2026-27 already cast: The Women of Lockerbie. Recent: Psycho Beach Party (2024), Radium Girls (2023).',
      },
      {
        season: 'Spring',
        kind: 'Musical',
        detail:
          '2025-26: Sweet Charity (Apr 16–18), auditions the prior December. Recent: Peter Pan (2025), Freaky Friday (2024), Once Upon a Mattress (2023), Xanadu (2022).',
      },
    ],
    whoRunsIt:
      'Brooke Fulton directs Upper School theatre with a dedicated technical director, Jordan Ellis — so stagecraft, set building and production tech form a real second track for students who want the theater without the spotlight. Technical theatre is offered from Middle School onward, and the awards page gives "Set Builds" its own media section alongside "Productions." Sierra Key directs Middle School theatre.',
    venueNote:
      'All performances are free and staged in the McMahon Fine Arts Center theatre. Individual technical course titles (Stagecraft, Tech Theatre I/II) are not published — the school describes the track only in the aggregate.',
    ledgerTitle: 'The Blumey ledger — a decade of external judging',
    ledger: [
      {
        year: '2026',
        show: 'Sweet Charity',
        result:
          'No wins. Six finalist placements, all acting/design: Best Actress (Ayla Hoody), Best Actor (Eli Coblenz), Best Supporting Actress (Rowan Barwick), Best Supporting Actor (Owen Moore), Best Featured Performer (Kate Reece), Best Student Set Designer (April Liu).',
      },
      {
        year: '2025',
        show: 'Peter Pan',
        result:
          'No wins. Five finalist placements: Best Actor (Wyatt Olliff), Best Actress (Liza Grimes as Peter Pan), Best Supporting Actor (Eli Coblenz as John), Best Supporting Actress (Rowan Barwick), Best Featured Performer (Mia Ostrowski). Absent from all six production-level categories.',
      },
      {
        year: '2024',
        show: 'Freaky Friday',
        result:
          'Six placements per the school, incl. Best Student Set Designer (April Liu) — not cross-checked against a Blumenthal list; win status not found.',
      },
      {
        year: '2023',
        show: 'Once Upon a Mattress',
        result:
          'Six placements per the school (Best Actor, Actress, Supporting ×2, Featured Performer, Student Set Designer) — win status not found.',
      },
      {
        year: '2022',
        show: 'Xanadu',
        result:
          'Best Supporting Actor — Max Odom as Danny, independently confirmed. Also nominated for Best Overall Direction and Best Musical (Tier 2); both went elsewhere — Tier-2 Best Musical to Central Academy, Direction to Charlotte Country Day.',
        win: true,
      },
      {
        year: '2021',
        show: 'Title not published',
        result:
          'Best Actress finalist (Katie Beason) — the school lists the finalist but not the show.',
      },
      {
        year: '2018',
        show: 'Pippin',
        result:
          'Five nominations — Best Choreography Execution, Best Ensemble/Chorus, Best Supporting Actress (Isabella Patterson); Tess Giordano and Chris Melton both invited to audition for the top six in the lead categories.',
      },
      {
        year: '2017',
        show: 'Side Show',
        result:
          'Five-plus placements incl. Best Overall Direction, Best Set Construction, Best Ensemble/Chorus; Chris Melton a top-six Best Actor finalist. Director: Caroline Bower.',
      },
      {
        year: '2016',
        show: 'Anything Goes',
        result:
          'The largest haul on the ledger — eight placements including a Best Musical nod, plus Set Construction, Choreography, Ensemble/Chorus and Overall Direction.',
      },
      {
        year: '2015',
        show: 'Into the Woods',
        result:
          'Five placements — set construction, costume creation, choreography, Best Supporting Actress (Katlyn Gonzalez), plus a top-20 acting finalist.',
      },
    ],
    honestContext:
      'The school’s awards page claims "26 BLUMEY Awards," but that figure counts nominations and finalist placements together with wins. Cross-checked against Blumenthal’s published winner lists, exactly one outright win is verifiable — Max Odom, 2022. PD is a consistent participant and a reliable producer of individual acting finalists, not a Blumey powerhouse: in 2025 and 2026 it placed 5–6 finalists each year, converted none, and appeared in no production-level category, while Northwest School of the Arts took three wins in 2026 alone. Its high-water mark was 2016–2022. Where the program does win is NCTC: Superior ratings in 2014, 2019 and 2022; Overall Regional Site Winner (Adjudicators’ Choice) for The Yellow Boat; Regional Site Winner (Audience Choice) for Radium Girls, which advanced to the State Festival and took state-level Lighting and Set Design honors; and Excellence in Directing in both 2023 and 2024.',
    sources: [
      { label: 'providenceday.org — Past Performances & Awards', url: PD_AWARDS },
      { label: 'Upper School Arts', url: PD_US },
      {
        label: 'Blumenthal Arts — 2026 Blumey winners',
        url: 'https://www.blumenthalarts.org/news/detail/blumenthal-arts-announces-2026-blumey-award-winners',
      },
      {
        label: 'Blumenthal Arts — 2025 all nominees & finalists (PDF)',
        url: 'https://www.blumenthalarts.org/assets/doc/2025-Blumey-All-Nominees-and-Finalists-9b848e893a.pdf',
      },
      {
        label: 'Charlotte Post — 2022 Blumey winners',
        url: 'https://www.thecharlottepost.com/news/2022/06/01/arts-and-entertainment/regional-high-school-musicals-take-bow-at-the-ninth-annual-blumey-awards/',
      },
    ],
  },

  music: {
    headline:
      'Four curricular ensembles plus auditioned groups, feeding an honors circuit that sits on the published arts calendar as recurring fixtures.',
    subhead:
      'The hardest recent result: five students selected for the 2026 ACDA Southern Region Honor Choir, chosen from over 1,500 applicants across 11 southeastern states.',
    tracks: [
      {
        label: 'Curricular — join by enrolling',
        ensembles: ['Band', 'Orchestra', 'Chorus', 'Jazz Ensemble'],
      },
      {
        label: 'Auditioned — earn a seat',
        ensembles: ['A Cappella', 'The ChargHers'],
      },
      {
        label: 'Classroom — theory track',
        ensembles: ['AP Music Theory'],
      },
    ],
    boardNote:
      'Chaired by Michael Hough (Performing Arts chair, Director of Bands), with Adrian Gordon (orchestras), Stephanie Smeltzer (choirs), Lesli Clowes (assistant band) and Kyra Totillo (assistant orchestra). Lower School music is taught by Arienne Hood and Ron Pringle. Institutional member of NAfME, NCMEA and ACDA. Whether Jazz Ensemble is formally auditioned is not published.',
    ladderTitle: 'The honors ladder — how far it goes',
    ladder: [
      {
        label: 'Join an ensemble',
        text: 'concert cycles each semester — choral, orchestra, band/jazz, plus 5th-grade and Middle School cycles and community dates such as the Jazz Ensemble at the Founders Dinner.',
      },
      {
        label: 'Audition up',
        text: 'A Cappella and the ChargHers hold their own auditions (ChargHers auditions are a discrete calendar fixture). Ensembles perform at adjudicated festivals — the school reports 50+ superior ratings, cumulative and undated.',
      },
      {
        label: 'Get selected beyond campus',
        text: 'the circuit sits on the calendar as fixed dates: HS Honors Chorus auditions, NCAIS Honors Band at UNC Charlotte, NCAIS Honors Chorus at Gardner-Webb, NC-ASTA All-State Orchestra Clinic, Mars Hill Choral Clinic, NC Honors Chorus Weekend, All-District Band auditions. Verified result: five students into the 2026 ACDA Southern Region Honor Choir, prepared by Stephanie Smeltzer — one of them in her first year in chorus.',
      },
      {
        label: 'Be honored for it',
        text: 'Tri-M Music Honor Society chapter, with an annual induction ceremony in the McMahon Theatre. A National Art Honor Society chapter covers the visual side.',
      },
    ],
    ladderNote:
      'The school’s "over 100 students selected for honors ensembles" and "50+ superior ratings" figures carry no time window and are almost certainly cumulative over many years — do not read either as annual. Per-year audition and selection counts are not published.',
    sources: [
      { label: 'providenceday.org — Upper School Arts', url: PD_US },
      { label: 'Middle School Arts', url: PD_MS },
      { label: 'Arts overview (honors counts)', url: PD_ARTS },
      {
        label: 'PD news — five students earn ACDA Southern Region Honor Choir spots',
        url: 'https://www.providenceday.org/about/pd-communications/news-media/post/~board/news-media/post/providence-day-students-earn-spot-in-one-of-choral-musics-most-prestigious-honors',
      },
    ],
  },

  visual: {
    headline:
      'A working film darkroom alongside digital and unconventional-materials studio work, building to AP Studio Art and AP Art History.',
    subhead:
      'The department calls itself process-oriented, challenging students to be "original, resourceful, and innovative."',
    mediaTitle: 'Studio media',
    media: [
      { name: 'Drawing & painting', detail: 'traditional studio foundation' },
      { name: 'Film photography', detail: 'developed and printed in a working wet darkroom' },
      { name: 'Sculpture', detail: 'corroborated by a Scholastic Gold Key in sculpture' },
      { name: 'Unconventional materials', detail: 'experimental studio work' },
      { name: 'Print & textile', detail: 'stick-and-ink drawing, printing on fabric' },
      { name: 'Ceramics', detail: 'not published — no kiln is mentioned anywhere; ask on the tour' },
    ],
    path: [
      { name: 'MS foundations' },
      { name: 'US studio courses' },
      { name: 'AP Studio Art', terminal: true },
    ],
    pathNote:
      'AP Art History runs parallel, no portfolio required. The intermediate rungs are not published — the school describes the ladder only in prose',
    exhibits: [
      {
        when: 'Monthly',
        name: 'Spotlight demos',
        detail: 'participatory technique demos in the McMahon foyer, not passive hangs',
      },
      {
        when: 'Spring',
        name: 'Best-of-Year exhibit',
        detail: 'the department’s flagship annual show, a month-long run',
      },
      {
        when: 'Spring',
        name: 'Student / Faculty exhibit',
        detail: 'students hang beside their teachers',
      },
      {
        when: 'Rotating',
        name: 'Campus displays',
        detail: 'the redefined McMahon foyer plus displays hung across campus',
      },
    ],
    footnote:
      'Department chaired by Lindsay Woog; Upper School faculty include Felipe Maldonado, Herman Nicholson and Sydney Sheaffer, with Charly Gray and Sierra Key in Middle School and Gabe Devereux in Lower School. External recognition is thinner here than in theatre or music, and skews to writing: in the 2025 Scholastic Art & Writing Awards (Mid-Carolina region) the school took two art Gold Keys — Elle Sigg for sculpture and Bridget Brewster for photography — out of roughly fifteen awards overall, exhibited at the Mint Museum Uptown. No national-level Scholastic medals were found. A separately named AP Art Show was not found; the Best-of-Year exhibit appears to be the capstone.',
    sources: [
      { label: 'providenceday.org — Upper School Arts', url: PD_US },
      { label: 'Middle School Arts', url: PD_MS },
      {
        label: 'PD news — 2025 Scholastic Awards',
        url: 'https://www.providenceday.org/about/pd-communications/news-media/post/~board/news-media/post/artists-and-writers-shine-in-2025-scholastic-awards',
      },
    ],
  },

  verdict: {
    headline:
      'A genuinely competitive arts program beside the academics: AP depth in all three disciplines, a strong NCTC record, and a calendared honors pipeline.',
    subhead:
      'The open questions are about the undocumented course ladder and about converting Blumey finalists into wins — exactly what a campus visit answers.',
    holdsUp: [
      {
        label: 'Three AP arts courses',
        text: 'Studio Art, Art History and Music Theory — unusual breadth for one school, and a real asset for a college-bound arts student.',
      },
      {
        label: 'The NCTC record is strong and recent',
        text: 'between 2019 and 2024: Superior ratings, an Overall Regional Site Winner (Adjudicators’ Choice), a Regional Audience Choice win, Excellence in Directing twice, and a State Festival run with Radium Girls that took state-level Lighting and Set Design honors.',
      },
      {
        label: 'The honors pipeline is infrastructure, not aspiration',
        text: 'NCAIS Honors Band and Chorus, NC-ASTA All-State, Mars Hill, All-District and a Tri-M induction all sit as fixed dates on the published calendar — backed by five students into the 2026 ACDA Southern Region Honor Choir from a 1,500-applicant field.',
      },
      {
        label: 'Design and tech are first-class',
        text: 'technical theatre starts in Middle School, "Set Builds" gets its own showcase section, students win named NCTC awards in lighting, set design, stage management and carpentry, and April Liu earned Blumey Best Student Set Designer placements in both 2024 and 2026.',
      },
      {
        label: 'A working wet darkroom',
        text: 'increasingly rare at the K–12 level, and corroborated by a student Scholastic Gold Key in photography.',
      },
    ],
    ask: [
      'Show me the visual arts course sequence on paper — what exactly does a student take between Middle School art and AP Studio Art? And is there ceramics, with a kiln?',
      'Of the "26 Blumey Awards" on your awards page, how many were outright wins versus nominations or finalist placements?',
      'In 2025 and 2026 you had five and six Blumey finalists and no wins, and no production-level nominations. What is the plan to convert — do you staff a choreographer and a pit orchestra for the spring musical?',
      'How many students made honors ensembles last year, out of how many who auditioned? The "100+ musicians" and "50+ superior ratings" figures carry no time window.',
      'Can a student do a sport and the spring musical? The fall one-act, NCTC festivals, December auditions and April performances make for a dense calendar at a strong athletics school.',
      'What happens to the student who does not make ChargHers — is there a non-auditioned choral home for them through senior year?',
      'Who directs the spring musical now? Caroline Bower led the 2015–2017 award-winning run and is no longer on the roster.',
    ],
    sources: [
      { label: 'providenceday.org — Arts pages', url: PD_ARTS },
      { label: 'Past Performances & Awards', url: PD_AWARDS },
      {
        label: 'Verdict synthesized by the researcher from the sources cited on cards 1a–1d',
      },
    ],
  },
}
