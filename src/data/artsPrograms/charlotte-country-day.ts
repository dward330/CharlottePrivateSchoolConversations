// Charlotte Country Day School — The Arts.
//
// Transcribed from source-material/the-arts/charlotte-country-day/
// "CCD - The Arts - Arts Redesign Deep Research.md", which carries a source URL
// and a VERIFIED / SCHOOL-CLAIM / NOT FOUND marker on every fact.
//
// The Blumey ledger below is built from PRIMARY records — the official
// Blumenthal Arts nominee-and-finalist PDFs for 2023, 2024 and 2025, parsed for
// every category naming this school — not from the school's own summary. That
// matters, because it changed the story in three ways:
//
//  1. The school's "31+ Blumey nominations" headline is only defensible as a
//     cumulative multi-year total that counts finalist placements; clean
//     category nominations across 2022–25 come to ~24. It is not a season
//     figure and not a win count, so the card never repeats "31+" unqualified.
//  2. Verified WINS are two, both in 2022 (Best Choreography, Best Direction).
//     No win was located for 2023, 2024, 2025 or 2026.
//  3. The trend is clearly downward — ~9 nominations (2023) → ~9 (2024) → 5,
//     all individual-performance (2025) → ZERO (2026, in a 59-school field).
//
// Several baseline claims did NOT survive checking and are therefore absent
// here rather than asserted: the Middle School Chamber Orchestra's state
// adjudication ratings, the MS "Iron Ring" NCTC honor, a Tri-M chapter, a
// National Art Honor Society chapter, and the exact catalog names "AP Studio
// Art" and "IB Visual Arts" (the pages say "AP art courses" / "IB art courses").
//
// The strongest independently verified credential is not a trophy at all:
// NCTC named Jenny Goodfellow North Carolina's 2022 K-12 Theatre Arts Educator,
// confirmed on NCTC's own awards page.

import type { ArtsProgram } from '../artsProgram.ts'

const CCD_ARTS = 'https://www.charlottecountryday.org/cd-experience/arts'
const CCD_MUSIC = 'https://www.charlottecountryday.org/cd-experience/arts/music'
const CCD_DRAMA = 'https://www.charlottecountryday.org/cd-experience/arts/drama'
const CCD_VISUAL = 'https://www.charlottecountryday.org/cd-experience/arts/visual-arts'
const CCD_AWARD_POST =
  'https://www.charlottecountryday.org/news-events/news-details-page/~board/school-news/post/award-winning-theater-program'
const NCTC_AWARDS = 'https://nctc.org/programs/awards/'

export const charlotteCountryDay: ArtsProgram = {
  ladder: {
    headline:
      'A 45,730 sq ft dedicated fine arts center, a separate 400-seat theater, and both AP and IB arts ceilings — an unusual dual framework.',
    subhead:
      'The school reports 70+ performances and exhibits a year across JK–12. It also reports eight ensembles and roughly 39 Upper School fine arts courses each year. Three dedicated drama directors, one per division, staff the pipeline.',
    stats: [
      { value: 'JK–12', label: 'arts from junior kindergarten' },
      { value: 'AP + IB', label: 'dual arts frameworks — AP Sculpture, IB Theatre' },
      { value: '8', label: 'vocal & instrumental ensembles, MS + US' },
      { value: '2', label: 'wet darkrooms — nearly extinct at K–12' },
    ],
    divisions: [
      {
        name: 'Lower School',
        grades: 'JK–4',
        items: [
          'Music instruction begins in junior kindergarten',
          '"Recorder Karate" — a belt-progression recorder curriculum in grades 3–4',
          'Individual piano instruction in the Lower School piano studios',
          'Drama from JK onward — every student performs (e.g. "K is for Kindness")',
          'Two child-scaled art studios plus a Lower School ceramics studio',
          'Krista Maggart directs Lower School drama',
        ],
      },
      {
        name: 'Middle School',
        grades: '5–8 · Bissell campus',
        items: [
          'Band, Orchestra and General Music integrated into the daily curriculum',
          'Mixed Choir in grades 7–8',
          'Staged plays and musicals (recent: "Aladdin, Jr.")',
          '7th graders stage Shakespeare — "Henry V" and "Julius Caesar"',
          'Three dedicated visual arts rooms',
          'Aaron Mize directs Middle School drama',
        ],
      },
      {
        name: 'Upper School',
        grades: '9–12',
        items: [
          'Concert Choir, Chamber/Honors Choir, Symphonic Band, Honors Symphonic Band, Orchestra, Honors Orchestra, Percussion Ensemble, Piano class',
          'AP Music Theory; AP art courses including AP Sculpture; IB art courses including IB Theatre Arts',
          'Visual arts span drawing, painting, printmaking, mixed media, 3-D design, sculpture, film and digital photography, computer graphics, animation and filmmaking',
          'A three-show theatre season plus a technical-theatre track in set, lighting, sound and stage management',
          'Jenny Goodfellow directs Upper School theatre — NCTC’s 2022 NC K-12 Theatre Arts Educator',
        ],
      },
    ],
    enrichmentTitle: 'The enrichment layer — beyond the classroom',
    enrichment: [
      {
        label: 'Artist in Residence',
        text: 'Visiting artists work with Middle and Upper School students on major works: mosaics, murals, videos, music scores, quilts and bronze sculptures. The projects leave permanent, installed work, not a one-time workshop. The lasting work makes the residency one of the program’s real standouts.',
      },
      {
        label: 'The facilities, in full',
        text: 'The Hance Fine Arts Center holds: four visual arts studios · a photography studio with two darkrooms · a ceramics/3-D studio · a Black Box Theater · a two-story dance studio · a music suite with practice rooms · a computer graphics classroom · the Hance Family Gallery. The 400-seat Gorelick Family Theater sits in the Lower School Fine Arts Center, alongside the Dalton Gallery. The theater serves all of JK–12.',
      },
      {
        label: 'Edinburgh Fringe',
        text: 'The drama page lists the Edinburgh Festival Fringe as a program opportunity. A school post confirms a trip really happened: the theatre director shared photos and highlights from Country Day’s travels to Scotland. The year and the production performed are not published. It is worth asking how often the trip happens.',
      },
      {
        label: 'Friends of the Arts',
        text: 'A parent volunteer organization supporting fine arts events across all three divisions. The annual JK–12 All-School Art Show invites submissions from every student in the school.',
      },
    ],
    sources: [
      { label: 'charlottecountryday.org — Arts', url: CCD_ARTS },
      { label: 'Music', url: CCD_MUSIC },
      { label: 'Drama', url: CCD_DRAMA },
      { label: 'Visual Arts', url: CCD_VISUAL },
    ],
  },

  theatre: {
    headline:
      'Two Blumey wins in 2022 including Best Direction, back-to-back NCTC state championships, and a director named North Carolina’s best K-12 theatre educator.',
    subhead:
      'But the recent Blumey trend runs the other way: roughly nine nominations in 2023 and 2024, five in 2025, and none at all in 2026 from a 59-school field.',
    seasonTitle: 'The season rhythm — a three-show Upper School year',
    season: [
      {
        season: 'Fall',
        kind: 'One-Act Play',
        detail:
          'The NCTC festival entry. Country Day competed at the NCTC regional at Charlotte Catholic on Nov 7–8, 2025, so a 2025-26 one-act existed — but its title is not published anywhere findable.',
      },
      {
        season: 'Winter',
        kind: 'Musical',
        detail:
          'The Blumey entry. 2025-26: Frozen. Recent: Bright Star (2025), Bonnie and Clyde (2024), Something Rotten (2023), Anastasia (2022). Earlier: The Drowsy Chaperone, Catch Me If You Can, She Loves Me, Grease.',
      },
      {
        season: 'Spring',
        kind: 'Play',
        detail:
          'The third show of the Upper School season; the 2025-26 title is not published. Middle School stages its own musical (recent: Aladdin, Jr.), and 7th graders stage Shakespeare.',
      },
    ],
    whoRunsIt:
      'Jenny Goodfellow directs Upper School theatre. Karl Hoffman is technical director, Linda Booth does the choreography and Jaclyn Orchard does costumes. Country Day staffs three dedicated drama directors, one per division: Krista Maggart (Lower), Aaron Mize (Middle) and Goodfellow (Upper). That staffing backs up the JK–12 theatre claim better than the "100% participation" figure does. That figure is a result of drama being required from JK, so it does not measure how many students choose drama. An outside source has confirmed the technical-theatre track: students were named Blumey Stage Management finalists in both 2023 and 2024.',
    venueNote:
      'The 400-seat Gorelick Family Theater is the main stage. The Black Box Theater in the Hance Fine Arts Center adds more space, so performance, rehearsal and studio work never compete for the same room.',
    ledgerTitle: 'The Blumey ledger — from the official nominee records',
    ledger: [
      {
        year: '2026',
        show: 'Frozen',
        result:
          'Zero nominations and zero awards. Country Day appears only in the list of 59 participating schools.',
      },
      {
        year: '2025',
        show: 'Bright Star',
        result:
          'Five nominations, ALL individual performance — Best Actor, Best Actress, Best Supporting Actor, Best Supporting Actress, Best Featured Performer. No Direction, Ensemble, Choreography or Best Musical nod. Field: 54 schools.',
      },
      {
        year: '2024',
        show: 'Bonnie and Clyde',
        result:
          'Roughly nine placements, including Best Overall Direction, Best Choreography Execution and Best Ensemble/Chorus. The others: Best Actor · Best Actress · Best Supporting Actor · Best Supporting Actress · Best Featured Performer · a stage-manager finalist. No win located.',
      },
      {
        year: '2023',
        show: 'Something Rotten',
        result:
          'Roughly nine placements, including Best Overall Direction, Best Choreography Execution and Best Ensemble/Chorus. The others: Best Actor · Best Actress · Best Supporting Actor · Best Supporting Actress · Best Featured Performer · a stage manager. The school also claims a Best Musical nod, which the official PDF did not confirm. No win located.',
      },
      {
        year: '2022',
        show: 'Anastasia',
        result:
          'Best Choreography (Linda Booth) and Best Direction (Jenny Goodfellow): two wins from eight nominations at the 9th annual Blumeys. Of all the categories, Best Direction says the most about how good the whole program is, not one performer’s talent.',
        win: true,
      },
      {
        year: '~2018',
        show: 'The Drowsy Chaperone',
        result:
          'Five nominations including Best Musical. The exact year is not stated in the school’s own coverage; a school history page notes the program earned multiple nominations and awards in 2018.',
      },
    ],
    honestContext:
      'Country Day is a steady, credible Blumey contender, not a current front-runner. It was nominated every year from 2022 through 2025, but had zero wins after 2022, then had no nominations at all in 2026. Its best year was truly strong: two wins, including Best Direction. Its work developing individual performers looks repeatable, not lucky. One student placed in three consecutive cycles, twice in the Best Actress category (2023 and 2025), and five different students placed in five performance categories in 2025. On NCTC, the school claims five state championships, but only one play title could be verified. That title is The Crane Wife, a second consecutive championship, which places it in fall 2018, with the prior title in fall 2017 (title unknown). The other three years and titles could not be found. Country Day did not place at the 2025 state festival, so all five come before 2025. Treat "five championships" as the school’s claim. The strongest independently verified credential here is about teaching, not trophies. NCTC named Jenny Goodfellow North Carolina’s 2022 K-12 Theatre Arts Educator, confirmed on NCTC’s own awards page. For scale, the NCTC festival draws 3,500+ students from 100+ schools across 130+ productions.',
    photo: {
      src: '/arts/charlotte-country-day-anastasia.jpg',
      name: 'Anastasia (2022)',
      caption:
        'The full cast on the Gorelick stage. This production won Best Choreography and Best Direction at the 2022 Blumeys — the program’s only verified wins.',
      credit: 'charlottecountryday.org — school news',
    },
    sources: [
      { label: 'charlottecountryday.org — Drama', url: CCD_DRAMA },
      { label: 'Award-winning theater program', url: CCD_AWARD_POST },
      { label: 'NCTC — awards (Goodfellow, 2022 educator award)', url: NCTC_AWARDS },
      {
        label: 'Blumenthal Arts — 2023 nominees & finalists (PDF)',
        url: 'https://www.blumenthalarts.org/assets/doc/2023-Blumey-Nominees-and-Finalists-dc56d4a6fb.pdf',
      },
      {
        label: 'Blumenthal Arts — 2024 nominees & finalists (PDF)',
        url: 'https://www.blumenthalarts.org/assets/doc/2024-Blumey-Nominees-and-Finalists-6435d5b18b.pdf',
      },
      {
        label: 'Blumenthal Arts — 2025 all nominees & finalists (PDF)',
        url: 'https://www.blumenthalarts.org/assets/doc/2025-Blumey-All-Nominees-and-Finalists-9b848e893a.pdf',
      },
      {
        label: 'Blumenthal Arts — 2026 nominees (59 schools)',
        url: 'https://www.blumenthalarts.org/news/detail/2026blumeyawardsnominees',
      },
    ],
  },

  music: {
    headline:
      'Eight ensembles across Middle and Upper School, tiered into honors and open-enrollment sections, feeding conservatory summers and national honor bands.',
    subhead:
      'The school reports students earn recognition at 20+ state and regional music events a year; no itemized list of those events or results is published.',
    tracks: [
      {
        label: 'Honors / select tier — Upper School',
        ensembles: [
          'Chamber / Honors Choir',
          'Honors Symphonic Band',
          'Honors Orchestra',
          'Percussion Ensemble',
        ],
      },
      {
        label: 'Open enrollment — Upper School',
        ensembles: ['Concert Choir', 'Symphonic Band', 'Orchestra', 'Piano class'],
      },
      {
        label: 'Middle School — non-auditioned, in the daily curriculum',
        ensembles: ['Band', 'Orchestra', 'Mixed Choir (7–8)', 'General Music'],
      },
      {
        label: 'Classroom — theory track',
        ensembles: ['AP Music Theory'],
      },
    ],
    boardNote:
      'Chris Rydel directs Upper School instrumental music. No choral director or arts department chair is named on the public pages. Important caveat: the school’s "8 ensembles" figure covers Middle and Upper School together. The pages never state which groups are audition-only. So the honors/open split above is inferred from the "Honors" and "Chamber" labels. Confirm it on a tour.',
    ladderTitle: 'The honors ladder — how far it goes',
    ladder: [
      {
        label: 'Join an ensemble',
        text: 'band, orchestra, choir or General Music from the Middle School daily curriculum, or Concert Choir / Symphonic Band / Orchestra in the Upper School.',
      },
      {
        label: 'Audition up',
        text: 'the honors tier — Chamber/Honors Choir, Honors Symphonic Band, Honors Orchestra, Percussion Ensemble. Explicit audition requirements are not published.',
      },
      {
        label: 'Get selected beyond campus',
        text: 'the school reports students placed in: NC All-State Honors Band, Chorus and Orchestra · the John Philip Sousa National High School Honor Band · NC Governor’s School · the Charlotte Symphony Youth Orchestras. Summer conservatory placements include: Brevard Music Center · Boston University Tanglewood Institute · Eastern Music Festival · the Heifetz International Summer Music Institute. These are strong, well-known credentials. But the school reports them as placements students reach, with no counts for each year.',
      },
      {
        label: 'Be honored for it',
        text: 'no Tri-M chapter and no named Fine Arts Honor Society chapter could be found on any page checked, so neither is claimed here.',
      },
    ],
    ladderNote:
      'Two claims could not be backed up, so they are left out on purpose. One is the Middle School Chamber Orchestra’s "top state adjudication ratings" (no festival, year or rating could be located). The other is an itemized record of the "20+ music events" figure.',
    sources: [
      { label: 'charlottecountryday.org — Music', url: CCD_MUSIC },
      { label: 'Arts', url: CCD_ARTS },
    ],
  },

  visual: {
    headline:
      'Two working wet darkrooms, a ceramics studio with wheels and kilns, and sculpture in glass and metal — the hands-in-material side has not been traded for screens.',
    subhead:
      'Nine studios and rooms across three campuses, topping out in AP art courses (including AP Sculpture) and IB art courses.',
    mediaTitle: 'Studio media',
    media: [
      { name: 'Drawing & painting', detail: 'plus printmaking and mixed media' },
      { name: 'Film photography', detail: 'black-and-white in TWO wet darkrooms' },
      { name: 'Digital photography', detail: 'alongside the analog track' },
      { name: 'Ceramics & 3-D', detail: 'hand-building, wheel throwing, glazing, firing' },
      { name: 'Sculpture', detail: 'clay, plaster, wood, glass, metal and mixed media' },
      { name: 'Computer graphics', detail: 'plus animation and filmmaking' },
    ],
    path: [
      { name: 'Foundations' },
      { name: '2-D · 3-D studio' },
      { name: 'AP art courses', terminal: true },
    ],
    pathNote:
      'AP Sculpture and AP Music Theory are named; IB art courses including IB Theatre Arts run in parallel. The exact catalog titles "AP Studio Art" and "IB Visual Arts" are not published — the pages say "AP art courses" and "IB art courses"',
    exhibits: [
      {
        when: 'Annual',
        name: 'JK–12 All-School Art Show',
        detail: 'every student in the school is encouraged to submit work',
      },
      {
        when: 'Rotating',
        name: 'Hance Family Gallery',
        detail: 'student, faculty, alumni AND visiting-artist work — an unusual mix',
      },
      {
        when: 'Rotating',
        name: 'Dalton Gallery',
        detail: 'in the Lower School Fine Arts Center; shows all three divisions',
      },
      {
        when: 'External',
        name: 'Mint Museum',
        detail: 'student work exhibited in the museum’s sculpture exhibition',
      },
    ],
    footnote:
      'Stacy Utley teaches Upper School art. No visual arts or arts department chair is named publicly. The school cites recognition at: the Scholastic Art & Writing Awards, at both regional and national level · the National Congressional Art Competition · the Mint Museum Sculpture Exhibition · the Matthews Art Fest · the Rube Goldberg Competition. But specific years, student names and Gold/Silver Key counts are not published, so no number is given here. A National Art Honor Society chapter and its service projects could not be found and are not claimed. No dated 2025-26 exhibition schedule is available to the public.',
    sources: [
      { label: 'charlottecountryday.org — Visual Arts', url: CCD_VISUAL },
      { label: 'Arts', url: CCD_ARTS },
    ],
  },

  verdict: {
    headline:
      'The deepest arts facilities of any school in this set, a dual AP-and-IB ceiling, and a statewide-honored theatre director — with a Blumey record that has cooled sharply.',
    subhead:
      'The open questions are about the undocumented NCTC championship count and the 2026 nomination shutout — both good tour material.',
    holdsUp: [
      {
        label: 'The facility is top-tier and verified',
        text: 'a 45,730 sq ft fine arts center. It holds four studios, a two-story dance studio, a music suite with practice rooms and a Black Box Theater. There is also a separate 400-seat proscenium theater (one whose stage is framed by an arch), so performance, rehearsal and studio work never compete for the same room.',
      },
      {
        label: 'Two wet darkrooms',
        text: 'almost no peer K–12 program still runs film. Two darkrooms, a ceramics studio with wheels and kilns, and sculpture in glass and metal mean the material side of art survives here.',
      },
      {
        label: 'A genuine dual AP-and-IB ceiling',
        text: 'students can top out via AP (Sculpture, Music Theory) or IB (Theatre Arts, art courses). Most competitors offer one framework, not both.',
      },
      {
        label: 'Externally validated theatre at the highest level',
        text: 'two Blumey wins in 2022 including Best Direction, plus back-to-back NCTC state championships with The Crane Wife, in a festival drawing 100+ schools.',
      },
      {
        label: 'The strongest credential is about the teaching',
        text: 'NCTC named Jenny Goodfellow North Carolina’s 2022 K-12 Theatre Arts Educator — verified on NCTC’s own awards page, not the school’s. A statewide body picked Country Day’s director out of every K-12 theatre teacher in the state.',
      },
      {
        label: 'The JK–12 pipeline is staffed, not just asserted',
        text: 'three dedicated drama directors, one per division, with 7th graders staging Henry V and Julius Caesar.',
      },
    ],
    ask: [
      'Your site says five NCTC state championships. Which five years, and which plays? Only The Crane Wife is documented — and are they recent or decades old?',
      'You had zero Blumey nominations in 2026 for Frozen, after five in 2025 and about nine each in 2023 and 2024. What changed? Was it turnover on the creative team, or was Frozen chosen on purpose as a large-cast, accessible show?',
      'You have been nominated every year since 2022 but have not won since. Is the program aiming at competitive placement or at participation breadth? With 100% theatre participation, breadth may genuinely be the strategy.',
      'Which of the eight ensembles require an audition, and can a beginner still join band or orchestra in 9th grade? The pages never state audition requirements.',
      'How many Scholastic Art & Writing Gold and Silver Keys did students earn last year, and how many advanced to national judging?',
      'Is there a Tri-M chapter, a National Art Honor Society chapter, or a Fine Arts Honor Society? None could be found publicly.',
      'Which year did the Edinburgh Fringe trip happen, what did students perform, and how often does it recur?',
    ],
    sources: [
      { label: 'charlottecountryday.org — Arts', url: CCD_ARTS },
      { label: 'NCTC — awards', url: NCTC_AWARDS },
      {
        label: 'Verdict synthesized by the researcher from the sources cited on cards 1a–1d',
      },
    ],
  },
}
