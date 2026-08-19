// Charlotte Catholic High School — the five Arts cards.
//
// Arts is the largest single department in the CCHS curriculum guide: 39 of the
// school's 195 courses, more than English, Science or Mathematics. It is also
// the department where a naive count would badly misrepresent the school —
// CCHS offers exactly ONE AP arts course (AP Studio Art, code 358), and no AP
// Music Theory or AP Art History, confirmed by sweeping all 195 courses in the
// guide rather than inferring from a web page. Reported as "1 AP" alone, a
// 39-course department with twelve Honors ensembles and studios reads as thin.
// Everything here therefore frames advanced coursework as 1 AP + 12 Honors.
//
// ⚠️ CCHS won NO Blumey award in 2026 — checked directly against Blumenthal's
// winners release. It had four nominees and one finalist for The Wizard of Oz.
// A wins claim would be factually wrong; the ledger below records tiers exactly.
//
// ⚠️ The school's own performances calendar is EMPTY ("No showings"), so the
// production season is reconstructed from Blumey records — two productions,
// which is all that is documented. The card does not imply a fuller season.
//
// CCHS is a 9–12 school, so its ladder card is retitled via TITLE_OVERRIDES in
// artsProgram.ts rather than carrying a lifted title in this file.
//
// See source-material/the-arts/charlotte-catholic/ for the hard data and URLs.

import type { ArtsProgram } from '../artsProgram.ts'

const DEPT = 'https://www.charlottecatholic.org/academics/visual-and-performing-arts'
const FACULTY =
  'https://www.charlottecatholic.org/academics/visual-and-performing-arts/meet-the-faculty'
const FAC = 'https://www.charlottecatholic.org/community/fac'
const GUIDE =
  'https://resources.finalsite.net/images/v1771958102/charlottecatholicorg/ggbqwr7ecdypclivyab5/2026-2027CurriculumGuideedited.pdf'
const PROFILE =
  'https://resources.finalsite.net/images/v1756128027/charlottecatholicorg/f5yfsecttu3cgmmtsh3f/CCHSSchoolProfile25-26FinalforOnline.pdf'
const BLUMEY25 =
  'https://www.blumenthalarts.org/assets/doc/2025-Blumey-All-Nominees-and-Finalists-9b848e893a.pdf'
const BLUMEY26 =
  'https://www.blumenthalarts.org/news/detail/blumenthal-arts-announces-nominees-finalists-for-2026-blumey-awards'
const BLUMEY26W =
  'https://www.blumenthalarts.org/news/detail/blumenthal-arts-announces-2026-blumey-award-winners'

export const charlotteCatholic: ArtsProgram = {
  ladder: {
    headline: 'The biggest department in the school — 39 courses, one per five in the whole catalog.',
    subhead:
      'Arts at CCHS is not an elective afterthought: it carries more courses than English, Science or Mathematics, across five disciplines and a purpose-built centre.',
    stats: [
      { value: '39', label: 'arts courses — the largest department in the curriculum guide' },
      { value: '12', label: 'named performing ensembles' },
      { value: '1 AP + 12 Honors', label: 'advanced arts coursework' },
      { value: '650', label: 'seats in the Fine Arts Center auditorium, dedicated 2022' },
    ],
    divisions: [
      {
        name: 'Visual art & photography',
        grades: '9–12',
        items: [
          'Art I → Art II → Art III → Honors Art IV, with Honors Portfolio Prep alongside',
          'AP Studio Art — the department’s single AP course',
          'Ceramics I and Ceramics II',
          'Introduction to Photography → Photography II → Photography III',
          'Digital Art and Graphic Design; Digital Art, Graphics, and Anime',
        ],
      },
      {
        name: 'Choral',
        grades: '9–12',
        items: [
          'Freshman Men’s Chorus and Freshman Women’s Chorus — a dedicated entry rung',
          'Choral Ensemble',
          'Women’s Chamber Ensemble and Honors Women’s Chamber Ensemble',
          'Men’s Chamber Ensemble and Honors Men’s Chamber Ensemble',
          'Honors Concert Choir — the co-ed terminal ensemble',
        ],
      },
      {
        name: 'Instrumental',
        grades: '9–12',
        items: [
          'Concert Band → Honors Wind Ensemble',
          'Percussion → Honors Percussion',
          'Introduction to Guitar → Guitar II',
          'Marching Band, and Jazz Band as an after-school ensemble',
        ],
      },
      {
        name: 'Theatre',
        grades: '9–12',
        items: [
          'Acting → Honors Acting',
          'Theatre: Design and Tech → Honors Theatre: Design and Tech',
          'Costume Design and Production → Honors Costume Design and Production',
          'On The Stage: Acting, Directing, Movie Making',
          'Behind the Scenes: Set Design and Construction',
          'Honors TV, Film, and Production',
        ],
      },
      {
        name: 'Dance',
        grades: '9–12',
        items: ['Dance I → Dance II → Honors Dance III'],
      },
    ],
    enrichmentTitle: 'Beyond the timetable',
    enrichment: [
      { label: 'Charlotte Symphony partnership', text: 'Symphony orchestra members provide sectionals and private lessons to CCHS students.' },
      { label: 'Three Fine Arts Festivals a year', text: 'Plus the annual school musical — the department’s published performance rhythm.' },
      { label: 'Dublin, every four years', text: 'The band performs quadrennially in the St. Patrick’s Day Parade in Dublin, Ireland.' },
      { label: 'National performance', text: 'The band and choral programmes have performed in New York and Chicago.' },
      { label: 'Diocesan touring', text: 'The choral programme tours and undertakes service projects across the Diocese of Charlotte.' },
      { label: 'Scholastic Art Awards', text: 'Students submit to the Charlotte-Mecklenburg Scholastic Art Awards, earning Gold, Silver and Honorable Mention.' },
    ],
    sources: [
      { label: 'charlottecatholic.org — Visual and Performing Arts', url: DEPT },
      { label: 'charlottecatholic.org — Curriculum Guide 2026-2027 (PDF)', url: GUIDE },
      { label: 'charlottecatholic.org — School Profile 2025-2026 (PDF)', url: PROFILE },
    ],
  },

  theatre: {
    headline: 'Five Blumey finalists in 2025, five more nominations in 2026 — and no win yet.',
    subhead:
      'Fiddler on the Roof placed a finalist in every one of the five individual performance categories, which is a rare sweep of nominations for one production.',
    seasonTitle: 'The documented production season',
    season: [
      { season: '2024–25', kind: 'Musical', detail: 'Fiddler on the Roof — five Blumey finalists, one in each individual performance category' },
      { season: '2025–26', kind: 'Musical', detail: 'The Wizard of Oz — four Blumey nominees and one finalist' },
    ],
    whoRunsIt:
      'Marcus Riter has led theatre at CCHS for twelve years. The programme runs acting, directing, design and tech, costume and film as separate course strands, each with an Honors rung.',
    venueNote:
      'Performances are staged in the MACS Fine Arts Center’s 650-seat auditorium, dedicated in 2022 and shared across all Mecklenburg Area Catholic Schools.',
    ledgerTitle: 'Blumey Awards ledger',
    ledger: [
      { year: '2025', show: 'Fiddler on the Roof', result: 'Finalist, Best Actor — Brenden Ortiz as Motel' },
      { year: '2025', show: 'Fiddler on the Roof', result: 'Finalist, Best Actress — Maye Glessner as Hodel' },
      { year: '2025', show: 'Fiddler on the Roof', result: 'Finalist, Best Supporting Actor — Jon Pacheco as Perchik' },
      { year: '2025', show: 'Fiddler on the Roof', result: 'Finalist, Best Supporting Actress — Anna Wall as Tzeitel' },
      { year: '2025', show: 'Fiddler on the Roof', result: 'Finalist, Best Featured Performer — Connor Nichols as Rabbi' },
      { year: '2026', show: 'The Wizard of Oz', result: 'Nominee, Best Actor — Aaron Quintero as Scarecrow' },
      { year: '2026', show: 'The Wizard of Oz', result: 'Nominee, Best Actress — Maye Glessner as Dorothy' },
      { year: '2026', show: 'The Wizard of Oz', result: 'Nominee, Best Supporting Actor — Jack Gordon as Uncle Henry / Guard' },
      { year: '2026', show: 'The Wizard of Oz', result: 'Nominee, Best Supporting Actress — Amelia Quintero as Glinda' },
      { year: '2026', show: 'The Wizard of Oz', result: 'Finalist, Best Featured Performer — Olivia Overhalser as Toto Puppeteer' },
    ],
    honestContext:
      'CCHS has NOT won a Blumey in either year — verified against Blumenthal’s own 2026 winners release, where the five individual performance awards went to North Lincoln, Carmel Christian, Northwest School of the Arts and Weddington. Recognition here is consistent and deep rather than victorious: ten placements across two years, with Maye Glessner recognised in both (Hodel in 2025, Dorothy in 2026). Note also that the school’s own performances calendar publishes nothing — the two productions above are reconstructed from Blumey records, so the real season may well be larger than the school lets a family see.',
    sources: [
      { label: 'blumenthalarts.org — 2025 Blumey nominees and finalists (PDF)', url: BLUMEY25 },
      { label: 'blumenthalarts.org — 2026 Blumey nominees and finalists', url: BLUMEY26 },
      { label: 'blumenthalarts.org — 2026 Blumey winners', url: BLUMEY26W },
    ],
  },

  music: {
    headline: 'Twelve named ensembles, and an Honors rung on almost every one.',
    subhead:
      'The choral programme alone runs a freshman entry point, single-sex chamber ensembles at two levels, and a co-ed Honors Concert Choir at the top.',
    boardTitle: 'The ensemble board',
    tracks: [
      {
        label: 'Choral',
        ensembles: [
          'Freshman Men’s Chorus',
          'Freshman Women’s Chorus',
          'Choral Ensemble',
          'Women’s Chamber Ensemble',
          'Honors Women’s Chamber Ensemble',
          'Men’s Chamber Ensemble',
          'Honors Men’s Chamber Ensemble',
          'Honors Concert Choir',
        ],
      },
      {
        label: 'Band & percussion',
        ensembles: ['Concert Band', 'Honors Wind Ensemble', 'Percussion', 'Honors Percussion', 'Marching Band'],
      },
      {
        label: 'After school',
        ensembles: ['Jazz Band'],
      },
      {
        label: 'Guitar',
        ensembles: ['Introduction to Guitar', 'Guitar II'],
      },
    ],
    boardNote:
      'Twelve ensembles carry course codes; Marching Band and Jazz Band operate alongside them, Jazz Band as an after-school group rather than a timetabled course.',
    ladderTitle: 'The honors pipeline',
    ladder: [
      { label: 'Entry', text: 'Freshman Men’s or Women’s Chorus (301, 302) — a dedicated ninth-grade rung most schools do not staff separately.' },
      { label: 'Development', text: 'Choral Ensemble (332), Concert Band (326), Percussion (372) — the open-enrolment middle of the programme.' },
      { label: 'Selective', text: 'Women’s and Men’s Chamber Ensembles (304, 303) — auditioned single-sex groups.' },
      { label: 'Honors', text: 'Honors Chamber Ensembles (392, 357), Honors Wind Ensemble (394), Honors Percussion (373) — each carrying the extra quality point.' },
      { label: 'Terminal', text: 'Honors Concert Choir (361) — the co-ed top of the choral ladder.' },
    ],
    ladderNote:
      'Every Honors ensemble carries the same +1 quality point as an Honors academic course, so a serious musician’s weighted GPA is not penalised for spending four years in the music wing. There is no AP Music Theory at CCHS — the Honors rungs are the ceiling.',
    sources: [
      { label: 'charlottecatholic.org — Visual and Performing Arts', url: DEPT },
      { label: 'charlottecatholic.org — Curriculum Guide 2026-2027 (PDF)', url: GUIDE },
    ],
  },

  visual: {
    headline: 'A darkroom, a ceramics studio and a broadcast studio — nine named spaces in one building.',
    subhead:
      'Film photography is still taught with a working darkroom alongside the digital lab.',
    mediaTitle: 'What students actually work in',
    media: [
      { name: 'Drawing & painting', detail: 'the Art I–IV spine' },
      { name: 'Ceramics', detail: 'two-course sequence in a dedicated studio' },
      { name: 'Film photography', detail: 'shot, developed and printed in the school’s darkroom' },
      { name: 'Digital photography', detail: 'in the photography and digital labs' },
      { name: 'Graphic design', detail: 'Digital Art and Graphic Design' },
      { name: 'Anime & illustration', detail: 'Digital Art, Graphics, and Anime' },
      { name: 'Broadcast & film', detail: 'Honors TV, Film, and Production, in the broadcast studio' },
      { name: 'Sculpture & design', detail: 'through the studio-art sequence' },
    ],
    path: [
      { name: 'Art I' },
      { name: 'Art II' },
      { name: 'Art III' },
      { name: 'Honors Art IV' },
      { name: 'AP Studio Art', terminal: true },
    ],
    pathNote:
      'Honors Portfolio Prep (364) runs alongside the upper rungs for students building an application portfolio. AP Studio Art is the department’s ONLY AP course — there is no AP Art History and no AP Music Theory, confirmed by sweeping all 195 courses in the curriculum guide.',
    exhibitsTitle: 'Where the work goes public',
    exhibits: [
      { when: 'Three times a year', name: 'Fine Arts Festivals', detail: 'the department’s own showcase cycle' },
      { when: 'Annual', name: 'Charlotte-Mecklenburg Scholastic Art Awards', detail: 'Gold, Silver and Honorable Mention' },
      { when: 'Annual', name: 'The school musical', detail: 'staged in the 650-seat Fine Arts Center auditorium' },
      { when: 'Ongoing', name: 'Fine Arts Center gallery spaces', detail: 'exhibits alongside performances in the 2022 building' },
    ],
    footnote:
      'Faculty: Melissa Parks (visual art and AP Studio Art), Barry Johnson (photography and graphic design), Jacob Bohan (band), Marcus Riter (theatre, twelve years), Tara Ryan (dance), Christopher Jones (guitar). The nine named Fine Arts Center spaces are the 650-seat auditorium, two art studios, the band room, the broadcast studio, the ceramics studio, the dance studio, the darkroom and the photography/digital lab. The centre serves all MACS schools, not CCHS alone, so availability is shared.',
    sources: [
      { label: 'charlottecatholic.org — Meet the arts faculty', url: FACULTY },
      { label: 'charlottecatholic.org — MACS Fine Arts Center', url: FAC },
      { label: 'charlottecatholic.org — Curriculum Guide 2026-2027 (PDF)', url: GUIDE },
    ],
  },

  verdict: {
    headline: 'A genuinely large arts department that under-publishes itself.',
    subhead:
      'The course catalog and the Blumey record both say more than the school’s own website does.',
    holdsUp: [
      { label: 'It is the biggest department in the school', text: '**39 of 195 courses** — more than English, Science or Mathematics. That is a staffing commitment, not a brochure claim.' },
      { label: 'The honors ladder is real', text: '**Twelve Honors arts courses**, each carrying the same **+1 quality point** as an Honors academic course, so four years in the music wing does not cost a student GPA.' },
      { label: 'Recognition is consistent', text: '**Five Blumey finalists in 2025** — one in every individual performance category — and **five more placements in 2026**. Deep and repeated, across two different shows.' },
      { label: 'The facility is purpose-built and recent', text: 'A **650-seat auditorium dedicated in 2022**, with a darkroom, ceramics studio, broadcast studio and dance studio among **nine named spaces**.' },
      { label: 'Outside expertise is wired in', text: 'A **Charlotte Symphony partnership** supplying sectionals and private lessons, and a band that performs **quadrennially in Dublin**.' },
      { label: 'Be clear about the AP ceiling', text: '**AP Studio Art is the only AP arts course.** No AP Music Theory, no AP Art History — the Honors rungs are the top of the ladder here.' },
    ],
    ask: [
      'The performances calendar shows "No showings" — where do families actually find the season, and can we see this year’s?',
      'Twelve ensembles is a lot for 1,171 students: which are auditioned, and what proportion of applicants get in?',
      'The Fine Arts Center serves all MACS schools — how often does that limit CCHS rehearsal or performance time?',
      'Honors ensembles carry a quality point. Is there any cap on how many arts Honors courses count toward the weighted GPA?',
      'Five Blumey finalists in 2025 and no win — what does the theatre programme think is the gap?',
      'Is the darkroom still in regular use, or is film photography now taught mainly digitally?',
      'When is the next Dublin parade trip, and what does it cost a family?',
      'AP Studio Art is the only AP. For a student wanting AP Music Theory or AP Art History, what is the alternative — dual enrollment, or nothing?',
    ],
    sources: [
      { label: 'charlottecatholic.org — Visual and Performing Arts', url: DEPT },
      { label: 'blumenthalarts.org — 2026 Blumey winners', url: BLUMEY26W },
    ],
  },
}
