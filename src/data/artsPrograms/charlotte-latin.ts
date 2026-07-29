// Charlotte Latin School — The Arts.
//
// Transcribed from source-material/the-arts/charlotte-latin/
// "Charlotte Latin - The Arts - Arts Redesign Deep Research.md", which carries a
// source URL and a VERIFIED / SCHOOL-CLAIM / NOT FOUND marker on every fact.
//
// Three findings shaped this file:
//
//  1. Latin DOES have Blumey history, contrary to the working assumption — it
//     competed in the inaugural 2012 year and took TWO wins in 2022 (Best
//     Actress and Best Featured Performer, both for Bright Star). But the
//     trajectory is front-loaded: a craft-category nomination in 2025 and zero
//     nominations for Cabaret in 2026. The ledger shows all four years,
//     including the shutout — cherry-picking 2022 would overstate the program.
//
//  2. There is NO AP Studio Art, no AP 2-D/3-D Art & Design, and no AP Art
//     History. AP Music Theory is the only arts AP. Since the course-offerings
//     page does surface AP where it exists, this is a real structural gap, not a
//     publishing omission — so the visual course path tops out at Art Studio IV
//     and the verdict names the gap outright.
//
//  3. The music honors trail is thin: exactly one named All-State student. No
//     auditioned sub-ensembles are published at all — no jazz, no a cappella,
//     no chamber or tiered band. The ensemble board and honors ladder say so
//     rather than implying depth the research could not find.

import type { ArtsProgram } from '../artsProgram.ts'

const CL_ARTS = 'https://www.charlottelatin.org/the-arts'
const CL_PERF = 'https://www.charlottelatin.org/the-arts/performing'
const CL_VISUAL = 'https://www.charlottelatin.org/the-arts/visual'
const CL_CAL = 'https://www.charlottelatin.org/the-arts/arts-calendar'
const CL_COURSES =
  'https://www.charlottelatin.org/academics/upper-school/course-offerings'
const CL_LAA = 'https://www.charlottelatin.org/latinartsassociation'
const CL_ARTSWALK = 'https://www.charlottelatin.org/the-arts/artswalk'

export const charlotteLatin: ArtsProgram = {
  ladder: {
    headline:
      'A TK–12 arts program built for breadth over selection — one band, one orchestra and one choir per division, with the stage "open to everyone."',
    subhead:
      'Over 80% of students participate (school-reported, no methodology published). Anchored by the Horne Performing Arts Center, six visual art studios, a Student Art Gallery and the permanent Arts Walk collection.',
    stats: [
      { value: 'TK–12', label: '1,500+ students · 80%+ participate' },
      { value: '1 AP', label: 'Music Theory — the only arts AP' },
      { value: '6', label: 'visual art studios' },
      { value: '5', label: 'productions across three divisions, 2026-27' },
    ],
    divisions: [
      {
        name: 'Lower School',
        grades: 'TK–4/5',
        items: [
          'Experiential music — rhythm, melody, genre through singing, dancing and playing',
          'Young actors develop through imaginative storytelling',
          'Visual art begins in transitional kindergarten',
          'Grandparents’ Day is the signature Lower School performance tradition',
          'Band and stringed instruments introduced in Grade 5 as a bridge upward',
          'Grades 4–5 present an age-appropriate musical each year (2026-27: "Madagascar Kids")',
        ],
      },
      {
        name: 'Middle School',
        grades: '5–8',
        items: [
          'Band, orchestra, choir and theater are the foundation, with ensemble and solo performance',
          'Theater runs Grades 7–12 — but the backstage/technical course starts in Grade 6, a year earlier',
          'Visual arts electives by choice',
          'Grade 8 visual art is SELF-DESIGNED: students set their own course and may sculpt, paint, draw, design or photograph any subject in any genre',
        ],
      },
      {
        name: 'Upper School',
        grades: '9–12',
        items: [
          'Art Studio I–IV plus Photography; Band, Concert Choir, Orchestra',
          'Music Theory I → AP Music Theory — the only arts AP path',
          'Acting, Film Acting, Stagecraft I–II, Advanced Design',
          'Seniors may take on a capstone film project',
          'Typical load is five academics plus one enrichment class — the structural reason participation runs high',
        ],
      },
    ],
    enrichmentTitle: 'The enrichment layer — beyond the classroom',
    enrichment: [
      {
        label: 'Latin Arts Association',
        text: 'A parent AND faculty organization with five standing committees — Friends of Creative Writing, Music, Speech & Debate, Theater, and Visual Arts. Latin folds creative writing and speech & debate into "the arts," a broader definition than most peers. Volunteer roles are concrete: ushering, ticketing, backstage and costume work, debate judging, and supporting The Blue Review. The LAA also organizes fall play and musical auditions.',
      },
      {
        label: 'Arts Walk',
        text: 'A permanent collection installed across campus — Wingspan, Torsionsphere, The Hurdler, Girl on Swing, Crater, the "Eyes Up" Reflection Garden Mosaic and more. Several works are athletics-themed, so it reads partly as school-identity sculpture. A separate annual community event, "Arts Walk: Create and Celebrate," runs each October.',
      },
      {
        label: 'The season calendar',
        text: 'Mosaic Night, Behind the Curtain, the Youth Art Month opening reception, the Senior Art Show, music recitals, a community sing-along and a student fashion show — a dense, named year rather than vague promises.',
      },
      {
        label: 'Guest artists',
        text: 'Guest artist presentations on campus reinforce classroom concepts, though no individual visiting artists are named on the school’s pages.',
      },
    ],
    photo: {
      src: '/arts/charlotte-latin-arts-facilities.jpg',
      name: 'The arts building',
      caption:
        'Etched-glass panels of a microphone and instruments mark the entrance. The school’s Arts Facilities page is a photo gallery with no descriptive text, so room names and seat counts are unpublished.',
      credit: 'charlottelatin.org — Arts Facilities gallery',
    },
    sources: [
      { label: 'charlottelatin.org — The Arts', url: CL_ARTS },
      { label: 'Performing Arts', url: CL_PERF },
      { label: 'Visual Arts', url: CL_VISUAL },
      { label: 'Upper School course offerings', url: CL_COURSES },
      { label: 'Latin Arts Association', url: CL_LAA },
    ],
  },

  theatre: {
    headline:
      'A Best Actress Blumey win in 2022 — the region’s marquee individual award — from a program whose recent record has cooled.',
    subhead:
      'The Blumeys are Blumenthal Performing Arts’ Charlotte-region high-school musical-theater awards; 59 schools competed in 2026. Latin has entered since the inaugural 2012 year.',
    seasonTitle: 'The season rhythm — five productions across three divisions',
    season: [
      {
        season: 'Fall',
        kind: 'Upper School Play',
        detail:
          '2026-27: The Trial (Oct 9–11) — a Kafka adaptation, a notably literary choice for a fall play. The 2025-26 fall play title is no longer posted; the calendar has rolled over.',
      },
      {
        season: 'Spring',
        kind: 'Upper School Musical',
        detail:
          '2026-27: The Little Mermaid (Feb 26–28) — Latin’s 2027 Blumey entry. 2025-26: Cabaret, which sold out with a box-office waitlist. 2024-25: The Drowsy Chaperone.',
      },
      {
        season: 'Also staged',
        kind: 'MS & LS shows',
        detail:
          '2026-27: Into the Woods Jr. (MS, Nov), Madagascar Kids (LS, Jan), The Odyssey (MS play, May).',
      },
    ],
    whoRunsIt:
      'Alicia Long heads the performing arts program. The tech track is genuinely articulated and undersold: the backstage/technical course starts in Grade 6 — a year before the acting course — and the Upper School sequence runs Stagecraft I → Stagecraft II → Advanced Design, plus an after-school stagecraft option. It produced a 2025 Blumey nomination for Best Student Stage Manager. For a student who would rather build than perform, this is stronger than most peer schools publish.',
    venueNote:
      'Latin runs a dedicated box office (boxoffice@charlottelatin.org) with waitlist handling for sold-out shows — the theatre program operates as a ticketed venue. No named theatre director or technical director is published, which is a real transparency gap versus peers.',
    ledgerTitle: 'The Blumey ledger — every year Latin has placed',
    ledger: [
      {
        year: '2026',
        show: 'Cabaret',
        result:
          'Competed among the 59-school field and received no nominations in any category.',
      },
      {
        year: '2025',
        show: 'The Drowsy Chaperone',
        result:
          'Nominated: Best Student Stage Manager (Claire Addison) — a craft category rather than a performance one.',
      },
      {
        year: '2022',
        show: 'Bright Star',
        result:
          'Best Actress — Kate McCracken as Alice Murphy. Also won Best Featured Performer — Dominick Charles as Daryl. Two wins in one night.',
        win: true,
      },
      {
        year: '2012',
        show: 'Joseph and the Amazing Technicolor Dreamcoat',
        result:
          'The inaugural Blumeys: nominated for Wells Fargo Best Musical and Best Actor (Will Branner as Joseph).',
      },
    ],
    honestContext:
      'A Best Actress Blumey is the single most competitive individual honor in the region, and Latin has one — plus Best Featured Performer the same night. That is a genuine peak. But the trajectory since is modest: one stage-manager nomination in 2025, then zero nominations for Cabaret in 2026 against a 59-school field. Latin is a real participant, not a dominant one. Separately, no NCTC one-act festival results could be found anywhere — Latin’s competitive theatre identity is Blumey-based (musical), not NCTC-based (play festival). This ledger reflects four Blumenthal releases checked in one research pass and is a floor, not a complete history.',
    photo: {
      src: '/arts/charlotte-latin-production.jpg',
      name: 'Winnie the Pooh Jr.',
      caption:
        'A Lower School production on the mainstage — the fourth- and fifth-grade musical is an annual fixture.',
      credit: 'charlottelatin.org — Performing Arts',
    },
    sources: [
      { label: 'charlottelatin.org — Performing Arts', url: CL_PERF },
      { label: 'Arts Calendar', url: CL_CAL },
      {
        label: 'Blumenthal Arts — inaugural 2012 nominees',
        url: 'https://www.blumenthalarts.org/news/detail/blumenthal-performing-arts-announces-the-inaugural-blumey-awards-nominees',
      },
      {
        label: 'Blumenthal Arts — 9th annual (2022) winners',
        url: 'https://www.blumenthalarts.org/news/detail/blumenthal-performing-arts-announced-the-9th-annual-blumey-awards-winners',
      },
      {
        label: 'Blumenthal Arts — 2025 nominations',
        url: 'https://www.blumenthalarts.org/news/detail/2025-blumey-awards-nominations',
      },
      {
        label: 'Blumenthal Arts — 2026 nominees (59 competing schools)',
        url: 'https://www.blumenthalarts.org/news/detail/2026blumeyawardsnominees',
      },
    ],
  },

  music: {
    headline:
      'One band, one orchestra and one choir per division — deliberately inclusive rather than tiered, with a two-step theory path to AP.',
    subhead:
      'The school’s own framing: a place for "both the most advanced student and those trying something new for the first time."',
    tracks: [
      {
        label: 'Curricular — join by enrolling',
        ensembles: ['Band (6–12)', 'Orchestra (6–12)', 'Concert Choir (5–12)', 'Community Chorale'],
      },
      {
        // `ensembles` is in SKIP_KEYS as "proper noun — ensemble name", so
        // nothing in this array is ever extracted or translated. A hedge
        // sentence here therefore shipped as raw English to every non-English
        // locale — the Telugu print-out showed it sitting directly under its
        // own translated label. The label already carries the hedge, so the
        // sentence was redundant; the empty array renders as an empty row.
        label: 'Auditioned — none published',
        ensembles: [],
      },
      {
        label: 'Classroom — theory track',
        ensembles: ['Music Theory I', 'AP Music Theory'],
      },
    ],
    boardNote:
      'Alicia Long chairs performing arts; Pam Sweer is named as Assistant Band Director. No Director of Bands, orchestra director or choral director is publicly named — an odd gap. Orchestra splits into MS and US groups for spring concerts. Whether the Community Chorale is auditioned, or includes adults, is not published.',
    ladderTitle: 'The honors ladder — how far it goes',
    ladder: [
      {
        label: 'Join an ensemble',
        text: 'band, orchestra or choir from Grade 5 or 6, with six-plus concerts a year plus recitals, a community sing-along and Grandparents’ Day.',
      },
      {
        label: 'Audition up',
        text: 'there is no published next rung on campus — Latin lists no auditioned or tiered ensembles, so an advanced player stays in the same ensemble rather than moving up one.',
      },
      {
        label: 'Get selected beyond campus',
        text: 'Sofia Rodrigues Angrisano, an eighth-grade clarinettist, cleared the South Central District audition at UNC Greensboro and earned 11th chair of 20 in the NC Music Educators Association All-State Honors Band, announced May 2026. The school ran this as a standalone "Kudos" post and named no other selectees, which suggests it is uncommon rather than routine.',
      },
      {
        label: 'Be honored for it',
        text: 'no Tri-M Music Honor Society chapter could be found, and no NCAIS honors ensemble participation or adjudicated festival ratings are published.',
      },
    ],
    ladderNote:
      'Latin’s publicly documented music-honors record is one named All-State student. For a 1,500-student school that is a thin external-validation trail, and the absence of auditioned ensembles means an already-advanced player has no published route to progress on campus — the sharpest question on the tour list.',
    sources: [
      { label: 'charlottelatin.org — Performing Arts', url: CL_PERF },
      { label: 'Upper School course offerings', url: CL_COURSES },
      { label: 'Arts Calendar', url: CL_CAL },
      {
        label: 'Latin news — eighth grader earns All-State Honors Band seat',
        url: 'https://www.charlottelatin.org/about/school-news/news-details/~board/kudos/post/latin-eighth-grader-earns-seat-in-all-state-honors-band',
      },
    ],
  },

  visual: {
    headline:
      'Six studios and an unusual Grade 8 self-designed course — but the ladder tops out at Art Studio IV, with no AP studio option at all.',
    subhead:
      'Documented Scholastic recognition across fashion, oil painting, drawing and photography, including a Gold Key.',
    mediaTitle: 'Studio media',
    media: [
      { name: 'Drawing & painting', detail: 'oil painting among the Scholastic-recognized work' },
      { name: 'Sculpture', detail: 'named in the Grade 8 self-designed course' },
      { name: 'Photography', detail: 'its own Upper School course; a Gold Key winner' },
      { name: 'Design', detail: 'named in the Grade 8 self-designed course' },
      { name: 'Fashion & fiber', detail: 'practiced but not a named course — two Scholastic pieces plus a student fashion show' },
      { name: 'Per-studio detail', detail: 'not published — which of the six studios holds ceramics, a kiln or a darkroom is unknown' },
    ],
    path: [
      { name: 'Grade 8 self-designed' },
      { name: 'Art Studio I' },
      { name: 'II · III' },
      { name: 'Art Studio IV', terminal: true },
    ],
    pathNote:
      'Photography runs alongside. There is NO AP Studio Art, no AP 2-D/3-D Art & Design and no AP Art History — the capstone is Art Studio IV plus the Senior Art Show. The course page does list AP Music Theory, so the absence is structural, not a publishing gap',
    exhibits: [
      {
        when: 'February',
        name: 'Senior Art Show',
        detail: 'the capstone exhibition in place of an AP portfolio submission',
      },
      {
        when: 'March',
        name: 'Youth Art Month',
        detail: 'opening reception for the month-long showcase',
      },
      {
        when: 'April',
        name: 'Mosaic Night',
        detail: 'an annual department event',
      },
      {
        when: 'Standing',
        name: 'Student Art Gallery',
        detail: 'an online exhibition organized by division, framed as a development opportunity for personal artistic voice',
      },
    ],
    footnote:
      'Richard Fletcher chairs visual arts; no other visual-arts faculty are named anywhere on the school’s pages, which refer only to "a team of dedicated and experienced art educators." Scholastic Art & Writing recognition found: Ella Hennessy ’28 took a GOLD KEY for "Strike" (photography) — the top regional award, which advances to national judging; plus Hope Gottschling ’24 (fashion, "Silk Strength"), Anjali Rao ’27 (fashion, 2023), Cary Mone (oil painting, 2023) and Madison Nabors ’25 (drawing, 2023). Method caveat: those names, titles, media and the Gold Key level are read from image filenames in the school’s page HTML — reliable for identity, but Latin publishes no Scholastic results page with award tiers, so Gottschling’s frequently-cited "honorable mention" level could not be confirmed. The Fab Lab is referenced once in connection with portfolio work but sits under Innovation & Design rather than the arts department; there is no named cross-disciplinary art course, project or equipment list, so it is not presented here as an arts facility.',
    sources: [
      { label: 'charlottelatin.org — Visual Arts', url: CL_VISUAL },
      { label: 'Upper School course offerings', url: CL_COURSES },
      { label: 'Arts Calendar', url: CL_CAL },
      { label: 'Arts Walk', url: CL_ARTSWALK },
      {
        label: 'Student Art Gallery',
        url: 'https://www.charlottelatin.org/the-arts/student-art-gallery-clone',
      },
    ],
  },

  verdict: {
    headline:
      'A broad, inclusive arts culture with a real Blumey win and a strong tech-theatre track — but thin external validation and no AP studio path.',
    subhead:
      'The gaps here are unusually specific, which makes them good tour questions: no auditioned ensembles, no AP studio art, and an arts facilities page with no text on it.',
    holdsUp: [
      {
        label: 'A Blumey win in the marquee category',
        text: 'Kate McCracken took Best Actress at the 2022 Blumeys for Bright Star, with Dominick Charles taking Best Featured Performer the same night. In a 59-school field, Best Actress is the most competitive individual honor available.',
      },
      {
        label: 'A genuinely articulated tech-theatre track',
        text: 'backstage tech starts in Grade 6 — a year before the acting course — and runs Stagecraft I → II → Advanced Design, plus after-school stagecraft. It produced a 2025 Blumey nomination for Best Student Stage Manager.',
      },
      {
        label: 'An independent-study on-ramp at Grade 8',
        text: 'eighth graders design their own visual arts course and may sculpt, paint, draw, design or photograph any subject in any genre — self-directed portfolio behavior two years before Upper School.',
      },
      {
        label: 'A dense, named season',
        text: 'five productions across three divisions in 2026-27, six-plus concerts, the Senior Art Show, Youth Art Month, Mosaic Night and Arts Walk: Create and Celebrate. The fall play is a Kafka adaptation, signalling a willingness to program literary material.',
      },
      {
        label: 'Documented Scholastic recognition and real demand',
        text: 'a Gold Key for photography plus recognized work in fashion, oil painting and drawing across multiple years — and Cabaret sold out with a managed box-office waitlist.',
      },
    ],
    ask: [
      'You offer AP Music Theory but no AP Studio Art, AP 2-D/3-D Art & Design or AP Art History. If my child wants to submit a college-level studio portfolio, what is the path past Art Studio IV?',
      'Latin had two Blumey wins in 2022, one stage-manager nomination in 2025, and zero nominations for Cabaret in 2026. What changed, and where is the musical theatre program heading with The Little Mermaid?',
      'Your materials name Alicia Long, Richard Fletcher and an assistant band director — but no Director of Bands, orchestra director, choral director, theatre director or technical director. Who leads each ensemble, and how long have they been here?',
      'There are no auditioned or tiered ensembles published — no jazz band, no a cappella, no chamber or wind ensemble. How does a player already at All-State level keep progressing rather than coasting?',
      'Six studios — which media does each hold? Is there a kiln, a darkroom, a printmaking press, a dedicated dance studio? The Arts Facilities page is photos only, with no descriptive text.',
      'You cite over 80% arts participation. Does that count required Lower and Middle School arts classes, or only elective and ensemble enrollment — and what is the Upper School–only number?',
      'How is the Fab Lab actually used by the arts department, as opposed to Innovation & Design? Walk me through one project combining digital fabrication with studio art.',
    ],
    sources: [
      { label: 'charlottelatin.org — The Arts', url: CL_ARTS },
      { label: 'Upper School course offerings', url: CL_COURSES },
      {
        label: 'Verdict synthesized by the researcher from the sources cited on cards 1a–1d',
      },
    ],
  },
}
