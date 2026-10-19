// Charlotte Preparatory School — The Arts.
//
// Transcribed from the two committed research files under
// source-material/the-arts/charlotte-prep/:
//
//   "Charlotte Preparatory School - The Arts - Program Overview and Ensembles.md"
//   "Charlotte Preparatory School - The Arts - Theatre Productions and Recognition.md"
//
// Things worth knowing before editing this file:
//
//  1. ⚠️ STUDENT NAMES ARE DELIBERATELY OMITTED (no-minor-names rule). Staff are
//     named in their professional capacity.
//  2. ⚠️ NO BLUMEYS. They are Blumenthal's HIGH-SCHOOL musical-theatre awards and
//     a PreK–8 school cannot enter them, so `theatre` carries a TITLE_OVERRIDES
//     entry in artsProgram.ts and no `ledger`. The production record comes from
//     the school's own news stories and its Vimeo channel's title cards.
//  3. ⚠️ THE CARNEGIE HALL PERFORMANCE IS UNCORROBORATED. The Fine Arts page has
//     claimed it since at least December 2021, but no date, news story or DCINY
//     page names the school, so it is attributed to the school's own page and
//     never stated as a dated fact.
//  4. Visual-arts recognition is CONFIRMED ABSENT, not unsearched: zero hits in
//     23 Mid-Carolina Scholastic Art Awards lists, 2020–2026. The card therefore
//     carries the school's own showcases rather than an awards ledger.

import type { ArtsProgram } from '../artsProgram.ts'

const FINE_ARTS = 'https://www.charlotteprep.org/student-life/fine-arts'
const LOWER = 'https://charlotteprep.org/academics/lower-school'
const PACKET =
  'https://charlotteprep.org/uploads/files/Admissions/fall-2025-admissions-packet-web.pdf'
const FAST_FACTS = 'https://charlotteprep.org/about/fast-facts'
const AFTER_SCHOOL = 'https://charlotteprep.org/student-life/after-school'
const WONKA =
  'https://charlotteprep.org/community/news/stories/charlotte-prep-presents-willy-wonka-jr'
const ALICE = 'https://charlotteprep.org/community/news/stories/prep-players-present-alice'
const REPORT_2425 =
  'https://issuu.com/charlottepreparatoryschool/docs/2024-2025_calendar_and_annual_report'
const VIMEO = 'https://vimeo.com/charlotteprep'
const DIRECTORY = 'https://charlotteprep.org/about/faculty-staff-directory'

export const charlottePrep: ArtsProgram = {
  /* ------------------------------------------------------------- 1a ladder -- */
  ladder: {
    headline:
      'Music, drama and art for every child through 4th grade, band from 4th, then a choice between chorus and band in 5th and between drama and art in 7th.',
    subhead:
      'The school counts "20+ arts performances and events per year", and fine arts fees have been included in tuition since 2024–25.',
    stats: [
      { value: '20+', label: 'arts performances and events per year' },
      { value: '4–8', label: 'grades in band' },
      { value: '3–8', label: 'grades in the spring stage show' },
    ],
    divisions: [
      {
        name: 'Early School',
        grades: 'PreK–MK',
        items: [
          '"All early school students participate in music classes."',
          'Montessori Kindergarten adds weekly art alongside P.E., Spanish and technology',
          'An Early School Winter Concert each year',
        ],
      },
      {
        name: 'Lower School',
        grades: 'K–4',
        items: [
          'Music, drama and art in a 6-day rotation of specialized classes',
          'K–2 "shine on stage annually in age-appropriate, curricular-themed costumed productions"',
          'Recorders and Orff instruments; a 3rd-grade recorder musical and a 4th-grade bilingual play',
          'Band begins in 4th grade',
        ],
      },
      {
        name: 'Middle School',
        grades: '5–8',
        items: [
          '"Students may choose between Chorus and Band as 5th graders, while they continue to take both Drama and Art."',
          '"Once they are in 7th grade they may choose between Drama and Art."',
          'Middle School drama runs as year-long electives',
          'The spring show is open to 3rd–8th grade artists',
        ],
      },
    ],
    enrichmentTitle: 'Beyond the school day',
    enrichment: [
      {
        label: 'After School Studios',
        text: 'Fee-based studios add arts options, from a sample list that includes Storybook Theater (K–2), One-Act Play (3–8), Ukulele (3–5), Beginner and Intermediate Print Making (3–5, 6–8), Primary Chorus (1–2) and a before-school Beginner Chorus (3–6) in the Music Cottage.',
      },
      {
        label: 'Where the work goes public',
        text: 'A Winter and a Spring Fine Arts Showcase each year, performances for Grandparents & Special Friends’ Day, and school assemblies. The school’s Fine Arts page says students have performed at the Biltmore Estate, at Charlotte Knights and Hornets games, "and with Distinguished Concerts International New York at Carnegie Hall".',
      },
    ],
    sources: [
      { label: 'charlotteprep.org — Fine Arts', url: FINE_ARTS },
      { label: 'charlotteprep.org — Lower School (the 6-day rotation)', url: LOWER },
      { label: 'Fall 2025 Admissions Packet (PDF) — the Middle School choices', url: PACKET },
      { label: 'charlotteprep.org — Fast Facts (20+ performances and events)', url: FAST_FACTS },
      { label: 'charlotteprep.org — After School (studio list, labelled "Sample")', url: AFTER_SCHOOL },
    ],
  },

  /* ------------------------------------------------------------ 1b theatre -- */
  theatre: {
    headline:
      'A stage show at nearly every grade — K–2 musicals, a 3rd-grade recorder musical, a 4th-grade bilingual play — and a 3rd–8th grade spring production with a Middle School one-act in the fall.',
    subhead:
      'Productions run as "Prep Players" in the gym, which has a proscenium stage and $180,000 of new stage lighting, plus new sets bought in 2024–25.',
    seasonTitle: 'The season, from the school’s own record',
    season: [
      {
        season: 'November',
        kind: 'Middle School one-act',
        detail:
          'Alice by Lindsay Price, November 14–15, 2025, in the gymnasium, with the Middle School set design club crafting props and costumes.',
      },
      {
        season: 'December',
        kind: '4th-grade bilingual play',
        detail: 'Los Tres Cuentos, December 3, 2025.',
      },
      {
        season: 'February',
        kind: '1st & 2nd grade musical',
        detail:
          'Piece By Piece (February 25, 2026); earlier, United We Stand (2024) and Could You Hug a Cactus? (2025).',
      },
      {
        season: 'April',
        kind: 'The 3rd–8th grade spring show',
        detail:
          'The Wizard of Oz (April 17, 2026); a murder-mystery comedy (April 11, 2025); Willy Wonka Jr. (April 19–20, 2024), which took more than 150 rehearsal hours and had its own stage crew.',
      },
      {
        season: 'April–May',
        kind: '3rd-grade recorder musical',
        detail:
          'Perseverance Project (April 30, 2026); Just Imagine (May 1, 2025); The Perseverance Project (May 2024).',
      },
      {
        season: 'May',
        kind: 'Kindergarten performance',
        detail: 'An annual Kindergarten performance closes the year.',
      },
    ],
    whoRunsIt:
      'Drama teacher Erica Davis (BFA in Musical Theater, East Carolina University; at Charlotte Prep since 2021) directs; Morgan Moscati was music director for Willy Wonka Jr.',
    sources: [
      { label: 'charlotteprep.org — "Charlotte Prep Presents Willy Wonka Jr.", 2024', url: WONKA },
      { label: 'charlotteprep.org — "Prep Players Present Alice", Nov 2025', url: ALICE },
      { label: '2024-2025 Calendar and Annual Report (Issuu) — stage lighting and sets', url: REPORT_2425 },
      { label: 'Charlotte Prep’s own Vimeo channel (performance recordings)', url: VIMEO },
      { label: 'charlotteprep.org — Faculty & Staff Directory', url: DIRECTORY },
    ],
  },

  /* -------------------------------------------------------------- 1c music -- */
  music: {
    headline:
      'Band from 4th grade, then chorus or band from 5th — with recorders and Orff instruments underneath and a recorder musical in 3rd grade.',
    subhead:
      'An ensemble any interested student can join; no audition is described.',
    boardTitle: 'The ensemble board',
    tracks: [
      { label: 'Early School and K–3 — everyone participates', ensembles: ['General music', 'Recorders', 'Orff instruments'] },
      { label: '4th grade', ensembles: ['Band'] },
      { label: '5th grade on — choose one', ensembles: ['Chorus', 'Band'] },
    ],
    ladderTitle: 'Where the ensembles perform',
    ladder: [
      {
        label: 'Fine Arts Showcases',
        text: 'A Winter and a Spring Fine Arts Showcase each year — the May 14, 2026 recording is titled "Middle School Band & Chorus".',
      },
      {
        label: 'School occasions',
        text: 'Grandparents & Special Friends’ Day, the Veterans Day program and the International Day of Peace assembly, and traditional Prep songs from the chorus at 8th-grade graduation.',
      },
      {
        label: 'Off campus',
        text: 'The school says its musicians have performed at the Biltmore Estate, at Charlotte Knights and Hornets games, "and with Distinguished Concerts International New York at Carnegie Hall" — no date is given for that performance.',
      },
    ],
    sources: [
      { label: 'charlotteprep.org — Fine Arts', url: FINE_ARTS },
      { label: 'Charlotte Prep’s own Vimeo channel (showcase recordings)', url: VIMEO },
      { label: 'charlotteprep.org — Faculty & Staff Directory', url: DIRECTORY },
    ],
  },

  /* ------------------------------------------------------------- 1d visual -- */
  visual: {
    headline:
      'A spiral curriculum — "growing in complexity from year to year" — across drawing, painting, printmaking, sculpture, collage, weaving and digital photography.',
    subhead:
      'Work goes public at the Winter and Spring Fine Arts Showcases and on Grandparents & Special Friends’ Day.',
    mediaTitle: 'The media',
    media: [
      { name: 'Drawing and painting' },
      { name: 'Printmaking', detail: 'gelli, relief, linoleum, foam, screen and collograph' },
      { name: 'Sculpture' },
      { name: 'Collage and weaving' },
      { name: 'Digital photography' },
    ],
    path: [
      { name: 'Art in the K–4 rotation' },
      { name: 'Art and Drama, grades 5–6' },
      { name: 'Art or Drama, grades 7–8', terminal: true },
    ],
    pathNote:
      '"Art is taught as a spiral curriculum woven around artistic principles, concepts, and habits, growing in complexity from year to year."',
    exhibitsTitle: 'Where the work goes public',
    exhibits: [
      { when: 'December', name: 'Winter Fine Arts Showcase' },
      { when: 'May', name: 'Spring Fine Arts Showcase' },
      {
        when: 'Each year',
        name: 'Grandparents & Special Friends’ Day',
        detail: 'Guests "view student work" alongside the performances.',
      },
    ],
    footnote:
      'Faculty: Stephanie Mould is the art teacher (MA in Art Education, University of Florida; BA in Studio Art, SUNY Oneonta; at Charlotte Prep since 2021), working from the Art Studio.',
    sources: [
      { label: 'charlotteprep.org — Fine Arts', url: FINE_ARTS },
      { label: 'Fall 2025 Admissions Packet (PDF)', url: PACKET },
      { label: 'charlotteprep.org — Faculty & Staff Directory', url: DIRECTORY },
    ],
  },

  /* ------------------------------------------------------------ 1e verdict -- */
  verdict: {
    headline:
      'A broad, every-child arts programme for a PreK–8 school: a stage at nearly every grade, a freshly equipped theatre, and credentialed teachers in each discipline.',
    holdsUpTitle: 'Why it holds up',
    holdsUp: [
      {
        label: 'Everyone takes all three',
        text: 'Music, drama and art for every child through 4th grade, and both Drama and Art alongside an ensemble in 5th and 6th.',
      },
      {
        label: 'A stage at nearly every grade',
        text: 'Six recurring productions across the year, from Kindergarten to the 3rd–8th grade spring show.',
      },
      {
        label: 'Real investment',
        text: '$180,000 of new stage lighting and new sets, paid for by the auction, a parent fundraiser and the annual fund.',
      },
    ],
    askTitle: 'Visit Checklist',
    ask: [
      'How often does each art meet in the 6-day rotation?',
      'Do 7th and 8th graders keep band or chorus alongside their Drama-or-Art choice?',
      'Is the 3rd–8th grade spring show part of the school day or an after-school program, and does it cost extra?',
      'When was the Carnegie Hall performance, and which students took part?',
      'Who teaches chorus this year, and what does the current After School Studio list look like — with prices?',
      'Does the school enter student art in any outside exhibitions or competitions?',
    ],
    sources: [
      { label: 'charlotteprep.org — Fine Arts', url: FINE_ARTS },
      { label: '2024-2025 Calendar and Annual Report (Issuu)', url: REPORT_2425 },
      { label: 'Verdict synthesized from the sources cited on the cards above' },
    ],
  },
}
