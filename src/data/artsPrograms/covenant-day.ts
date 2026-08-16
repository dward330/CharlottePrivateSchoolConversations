// Covenant Day School — The Arts research area.
//
// Every figure is traceable to source-material/the-arts/covenant-day/ —
// principally "Covenant Day School - The Arts - Deep Research.md" (synthesis)
// and the per-subtopic files beside it.
//
// All five cards render. Two honest limits worth knowing before editing:
// production titles beyond *Curtains* (2019 Blumey nomination) are not
// published — the theater page lists categories, not shows — and the school
// publishes no arts-participation percentage and no NCMEA/All-State music
// honors (confirmed absent, not unresearched).

import type { ArtsProgram } from '../artsProgram.ts'

const ARTS = 'https://www.covenantday.org/arts'
const THEATER = 'https://www.covenantday.org/arts/theater'
const MUSIC = 'https://www.covenantday.org/arts/music'
const VISUAL = 'https://www.covenantday.org/arts/visual-arts'

export const covenantDay: ArtsProgram = {
  /* ------------------------------------------------------------ 2a ladder -- */
  ladder: {
    headline:
      'A JK–12 ladder with a worship-music spine: art integrated from junior kindergarten, sequential from grade 1, ensembles from grade 6.',
    subhead:
      'One Fine Arts credit is required to graduate, and worship bands run at both middle and high school — a rung no other school here has.',
    stats: [
      { value: 'JK–12', label: 'program span' },
      { value: '9', label: 'named ensembles' },
      { value: '3', label: 'ticketed productions a year' },
      { value: '1 unit', label: 'Fine Arts graduation requirement' },
    ],
    divisions: [
      {
        name: 'Lower School',
        grades: 'JK–5',
        items: [
          'General Music JK–4, with art integrated in JK–K and sequential from grade 1',
          'Introduction to Choir and Band in grade 5',
          'CDS Children’s Choir, grades 3–5',
        ],
      },
      {
        name: 'Middle School',
        grades: '6–8',
        items: [
          'MS Band, MS Choir, and MS Worship Band',
          'Drama for grades 6–8, feeding the October MS Musical',
          'Music in the Parks adjudications — Superior ratings three straight years (2021–23)',
        ],
      },
      {
        name: 'High School',
        grades: '9–12',
        items: [
          'Symphonic Band, HS Choir, HS Worship Band, and HS A Cappella',
          'Theater I–II, Theatre Tech, and Honors Auditioned Theatre (Performance or Technical track)',
          'Visual path from Intro to Art through AP Studio Art; Worship Leadership as a credit course',
        ],
      },
    ],
    enrichment: [
      { label: 'Support', text: 'The Covenant Arts Association funds and staffs all arts areas through four patron tiers ($100–$1,000), with early pre-sale access to the three annual productions.' },
      { label: 'Honor societies', text: 'Tri-M Music Honor Society and an International Thespian Society chapter.' },
      { label: 'Stated mission', text: 'Arts are "a crucial part of the curriculum" built on four components: foundations, creative expression, historical and cultural relevance, and critical evaluation and response.' },
    ],
    sources: [
      { label: 'covenantday.org — Arts', url: ARTS },
      { label: 'covenantday.org — Music', url: MUSIC },
      { label: 'covenantday.org — Theater', url: THEATER },
    ],
  },

  /* ----------------------------------------------------------- 2b theatre -- */
  theatre: {
    headline:
      'Two Blumey wins and eight recognitions between 2013 and 2019, plus a 2025 National Shakespeare Competition finalist.',
    subhead:
      'Three ticketed productions a year in the 200-seat Lions Theater, with a Shakespeare competition of its own feeding the national one.',
    season: [
      { season: 'October', kind: 'MS Musical', detail: 'A three-night run (e.g. October 15–17)' },
      { season: 'March', kind: 'HS Musical', detail: 'The Blumey-eligible production' },
      { season: 'April', kind: 'Spring Drama', detail: 'A straight play (April 25–27 on the current calendar)' },
      { season: 'Year-round', kind: 'Showcases', detail: 'MS and HS Theater Nights, the HS Shakespeare Competition, and NC Theatre Conference participation' },
    ],
    whoRunsIt:
      'Fine Arts Director Sherie-Beth Wilson, with the Covenant Arts Association staffing and pre-selling the three productions. Courses: MS Drama (6–8), Theater I–II, Theatre Tech, and Honors Auditioned Theatre with Performance or Technical tracks.',
    venueNote:
      'The Lions Theater seats 200, with LED lighting, a costume room and set storage — a black-box-scale house, which is why the Arts Association’s tiered pre-sale exists.',
    ledger: [
      { year: '2013', show: 'Blumey Awards', result: 'WON Best Featured Performer', win: true },
      { year: '2014', show: 'Blumey Awards', result: 'Best Ensemble + Best Actress nominations' },
      { year: '2016', show: 'Blumey Awards', result: 'WON the Student Critic Award', win: true },
      { year: '2017', show: 'Blumey Awards', result: 'Best Ensemble nomination' },
      { year: '2018', show: 'Blumey Awards', result: 'Featured Performer + Supporting Actress nominations' },
      { year: '2019', show: 'Curtains', result: 'Best Actress nomination (Evan Bertram as Georgia Hendricks)' },
      { year: '2025', show: 'National Shakespeare Competition', result: 'Caroline Garbarino named Finalist', win: true },
    ],
    honestContext:
      'The ledger goes quiet after 2019 at the Blumeys — the school’s own theater page carries no post-2019 Blumey entry — and production titles are not published, so *Curtains* is the one show recoverable by name. The Shakespeare finalist shows the pipeline is still producing.',
    sources: [
      { label: 'covenantday.org — Theater (ledger, courses, categories)', url: THEATER },
      {
        label: 'Blumenthal Arts — Blumey nominees (names Curtains)',
        url: 'https://www.blumenthalarts.org/about-us/news/detail/blumenthal-announces-blumey-awards-nominees',
      },
    ],
  },

  /* ------------------------------------------------------------- 2c music -- */
  music: {
    headline:
      'Nine ensembles from grade 3 up — and the distinctive rung is worship: credit-bearing Worship Leadership plus worship bands in both divisions.',
    subhead:
      'Adjudication record at Music in the Parks: Superior ratings for MS Choir three straight years, and a 2nd-place HS Band finish in 2025.',
    tracks: [
      { label: 'Choral', ensembles: ['CDS Children’s Choir (3–5)', 'MS Choir (6–8)', 'HS Choir', 'HS A Cappella'] },
      { label: 'Instrumental', ensembles: ['Intro to Band (gr. 5)', 'MS Band (6–8)', 'Symphonic Band'] },
      { label: 'Worship', ensembles: ['MS Worship Band', 'HS Worship Band', 'Worship Leadership (credit course)'] },
    ],
    boardNote:
      'Director: Zach Thompson, Worship and Choir Teacher. No orchestra or marching band — the instrumental program is concert/symphonic.',
    ladder: [
      { label: '2021–23', text: 'MS Choir earned a Superior rating at Music in the Parks three consecutive years; MS Band took Excellent ratings and a 3rd placement.' },
      { label: '2023', text: 'HS Band earned an Excellent rating.' },
      { label: '2025', text: 'HS Band earned an Excellent rating and 2nd placement.' },
      { label: 'Honor society', text: 'Tri-M Music Honor Society chapter for achievement plus service.' },
    ],
    ladderNote:
      'No NCMEA All-State or All-District honors appear on the music page — a confirmed absence. Performance venues run from Biltmore Estates to Christmas programs, sporting events and spring concerts.',
    sources: [
      { label: 'covenantday.org — Music (ensembles, adjudications)', url: MUSIC },
    ],
  },

  /* ------------------------------------------------------------ 2d visual -- */
  visual: {
    headline:
      'A clean Intro-to-AP path with a public AP exhibit at the end of it — and seven Youth Art Month honorees in one year.',
    subhead:
      'Art starts integrated in JK–K, turns sequential in grade 1, and tops out at AP Studio Art with its own show.',
    media: [
      { name: 'Drawing & painting', detail: 'Intro to Art through Studio Art' },
      { name: '2D / 3D design', detail: 'Art 2/3 splits into 2D and 3D tracks' },
      { name: 'Ceramics' },
      { name: 'Digital photography' },
      { name: 'Graphic design' },
      { name: 'Yearbook', detail: 'CP and Honors — publication design as coursework' },
    ],
    path: [
      { name: 'Intro to Art' },
      { name: 'Art 2/3 (2D & 3D)' },
      { name: 'Honors Studio Art' },
      { name: 'AP Studio Art', terminal: true },
    ],
    pathNote:
      'High School Art Teacher: Katie Spata. Placement into Honors and AP follows the school-wide gate of prior coursework, grades, and teacher feedback.',
    exhibits: [
      { when: 'All-school', name: 'ArtWalk', detail: 'the whole-school exhibit' },
      { when: 'Spring', name: 'Art Talk', detail: 'the AP Art exhibit — portfolio presentations' },
      { when: 'Regional', name: 'Pineville Art Show · Mint Hill Arts Competition · Youth Art Month', detail: '7 YAM honorees in 2023' },
      { when: 'National', name: 'Scholastic Art & Writing Awards', detail: '"multiple Scholastic Art Award winners"' },
    ],
    sources: [
      { label: 'covenantday.org — Visual Arts', url: VISUAL },
    ],
  },

  /* ----------------------------------------------------------- 2e verdict -- */
  verdict: {
    headline:
      'A real regional-award theatre program and a coherent JK–12 ladder, with worship arts as the identity — and a few things it does not offer.',
    subhead:
      'Strong for a family that wants faith-integrated arts; thinner for one hunting orchestra, dance, or a large-hall music program.',
    holdsUp: [
      {
        label: 'The Blumey record is genuine',
        text: 'Two wins and eight recognitions across seven seasons, verifiable in Blumenthal’s own archives, plus a 2025 National Shakespeare Competition finalist.',
      },
      {
        label: 'The visual path is complete and public',
        text: 'Intro → Art 2/3 → Honors Studio → AP Studio Art, with the AP exhibit (Art Talk) and an all-school show (ArtWalk) where the work is actually seen.',
      },
      {
        label: 'The worship-music spine is unique here',
        text: 'Credit-bearing Worship Leadership plus worship bands in both divisions — the school’s church-ministry identity expressed in the curriculum itself.',
      },
      {
        label: 'A patron organization with real money in it',
        text: 'The Covenant Arts Association’s $100–$1,000 tiers fund and staff all three arts areas.',
      },
    ],
    ask: [
      'What was the last high school musical, and when did the program last enter the Blumeys? The public ledger stops in 2019.',
      'Ensemble sizes: how many students are in Symphonic Band and HS Choir this year? No participation figure is published.',
      'Is there any strings/orchestra pathway, or dance? Neither appears in the program.',
      'How does the 200-seat Lions Theater handle demand for the HS musical — how fast do public tickets go after the Arts Association pre-sale?',
      'Which Music in the Parks division do the ensembles compete in, and is NCMEA All-State participation on the roadmap?',
    ],
    sources: [
      { label: 'covenantday.org — Arts', url: ARTS },
      { label: 'Verdict synthesized by the researcher from the sources cited on the cards above' },
    ],
  },
}
