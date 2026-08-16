// Carmel Christian School — The Arts.
//
// Transcribed from source-material/the-arts/carmel-christian/
// "Carmel Christian - The Arts - Deep Research.md", which carries a source URL
// and a VERIFIED / SCHOOL-CLAIM / NOT FOUND / TO VERIFY marker on the hard data.
//
// Two honesty decisions worth flagging, both driven by that research:
//
//  1. The 2024 Blumey nominations were all for ANASTASIA, not "Singin' in the
//     Rain." The school's undated news page attributes a separate, earlier set of
//     noms (Pisacano/Wilson) to "Singin' in the Rain." The 2024 ledger below is
//     therefore attributed to Anastasia — extracted from Blumenthal's official
//     2024 nominee PDF via pdftotext -layout, so the category→nominee mapping is
//     exact — and the Singin' in the Rain row is kept separate and marked as a
//     year to verify.
//
//  2. The signature result is a real, independently confirmed WIN: Anna Jernigan,
//     Best Actress, "Footloose," 2026 Blumey Awards (WFAE). She advances to the
//     Jimmy Awards. Only that one row carries `win: true`; the other five 2026
//     placements are finalists/nominees, and every 2024 row is a nomination or
//     finalist placement.
//
// Facility names, director names, orchestra, a cappella and Tri-M are all NOT
// PUBLISHED, so the fields that would carry them are omitted rather than invented
// — including the photo slots on 1a / 1b / 1d, since no genuine photo could be
// sourced.

import type { ArtsProgram } from '../artsProgram.ts'

const CC_ARTS = 'https://carmelchristian.org/arts/'
const CC_OVERVIEW =
  'https://carmelchristian.org/apps/pages/index.jsp?uREC_ID=615425&type=d'
const CC_ELEM =
  'https://carmelchristian.org/apps/pages/index.jsp?uREC_ID=487086&type=d'
const CC_MS =
  'https://carmelchristian.org/apps/pages/index.jsp?uREC_ID=487087&type=d'
const CC_HS =
  'https://carmelchristian.org/apps/pages/index.jsp?uREC_ID=487088&type=d'
const CC_PRODUCTIONS =
  'https://carmelchristian.org/apps/pages/index.jsp?uREC_ID=487089&type=d'
const CC_SEASON_2425 =
  'https://carmelchristian.org/apps/news/show_news.jsp?REC_ID=910928&id=0'
const CC_SINGIN =
  'https://carmelchristian.org/apps/news/show_news.jsp?REC_ID=791781&id=0'
const BLUMEY_2024 =
  'https://www.blumenthalarts.org/assets/doc/2024-Blumey-Nominees-and-Finalists-6435d5b18b.pdf'
const BLUMEY_2026 =
  'https://www.blumenthalarts.org/news/detail/blumenthal-arts-announces-nominees-finalists-for-2026-blumey-awards'
const WFAE_2026 =
  'https://www.wfae.org/arts-culture/2026-05-18/blumey-awards-winners-announced'

export const carmelChristian: ArtsProgram = {
  ladder: {
    headline:
      'A K–12 arts program — integrated music and art for every K–4 student, becoming a sequential, elective-driven track from grade 5 up.',
    subhead:
      'Overseen by Arts Director Christina McCorkle, and headlined in 2026 by a Blumey Best Actress win that advanced to the national Jimmy Awards.',
    stats: [
      { value: 'K–12', label: 'arts program, integrated K–4' },
      { value: '3', label: 'named ensembles + auditioned Ignite Band' },
      { value: '2026', label: 'Blumey Best Actress win — "Footloose"' },
      { value: 'CITA', label: 'Christians in Theatre Arts conference' },
    ],
    divisions: [
      {
        name: 'Elementary',
        grades: 'K–5',
        items: [
          'Every K–4 student takes both music and art classes',
          'At grade 5 visual art continues and students may join choir / creative arts',
          'A 5th-grade musical (2024-25: "Seussical KIDS")',
        ],
      },
      {
        name: 'Middle School',
        grades: '6–8',
        items: [
          'Band · Choir · Ignite (MS Praise Band) · Art · Theatre',
          'A Middle School musical (2024-25: "Disney\'s The Lion King Jr.")',
          'Musical Theatre Dance, Spring Play Competition (NCTC) and a Shakespeare Play Festival',
          'Honor Band, Christmas and Spring Concerts, and an Art Festival',
          'Christians in Theatre Arts (CITA) Conference',
        ],
      },
      {
        name: 'High School',
        grades: '9–12',
        items: [
          'Choir · Symphonic Band · Ignite Band (HS Praise Band, audition-based)',
          'Theatre plus Technical Theater and Design',
          'Visual Arts · Digital Photography · Yearbook · Creative Writing · Journalism',
        ],
      },
    ],
    enrichmentTitle: 'The enrichment layer — beyond the classroom',
    enrichment: [
      {
        label: 'Christians in Theatre Arts (CITA)',
        text: 'Middle School theatre students attend the CITA Conference — a faith-based theatre-arts gathering that sits on the published Middle School arts calendar.',
      },
      {
        label: 'Festival calendar',
        text: 'The Middle School program lists a Spring Play Competition (the NCTC one-act circuit), a Shakespeare Play Festival, an Honor Band event and an annual Art Festival as recurring fixtures.',
      },
    ],
    sources: [
      { label: 'carmelchristian.org — Arts hub', url: CC_ARTS },
      { label: 'Arts at Carmel Christian (Arts Director)', url: CC_OVERVIEW },
      { label: 'Elementary (K–5) Arts', url: CC_ELEM },
      { label: 'Middle School (6–8) Arts', url: CC_MS },
      { label: 'High School (9–12) Arts', url: CC_HS },
    ],
  },

  theatre: {
    headline:
      'A K–12 production season topped by a 2026 Blumey Best Actress win — Anna Jernigan in "Footloose" — that advanced to the national Jimmy Awards.',
    subhead:
      'The Blumeys are Blumenthal Performing Arts’ regional high-school musical-theater awards. Carmel Christian converted a finalist run into an outright win in 2026 and placed six across five categories that year.',
    seasonTitle: 'The season rhythm — a K–12 slate each year',
    season: [
      {
        season: 'Fall',
        kind: 'Musical (junior edition)',
        detail:
          '2025-26: Disney\'s High School Musical, Jr. (Nov 14–15, 2025). The fall slot skews to a junior-edition musical drawing across the divisions.',
      },
      {
        season: 'Spring',
        kind: 'Musical (Upper School)',
        detail:
          '2025-26: Footloose — The Musical (Mar 26–28, 2026, "SOLD OUT!"), the production that took the 2026 Blumey Best Actress win. 2024-25 ran three shows across divisions: Seussical KIDS (5th grade), Disney\'s The Lion King Jr. (Middle School) and Oklahoma! (High School).',
      },
    ],
    venueNote:
      'The director and the venue are not published — the arts nav carries a "Main Stage" label but no room name, and the Footloose "SOLD OUT!" note implies a fixed-capacity house that is not named anywhere.',
    ledgerTitle: 'The Blumey ledger — external judging',
    ledger: [
      {
        year: '2026',
        show: 'Footloose',
        result:
          'Best Actress WIN — Anna Jernigan as Ariel Moore, who advances to the national Jimmy Awards (ceremony May 17, 2026, Belk Theater; announced May 18). Plus five more placements across four categories: Best Actor finalist (James Coleman as Ren McCormack), Best Supporting Actor finalist (Sloan Pettus as Willard Hewitt), Best Supporting Actress finalist (Charlotte Scott as Rusty), Best Featured Performer finalist (Titus Teague as Garvin) and a Best Choreography Execution nominee (production).',
        win: true,
      },
      {
        year: '2024',
        show: 'Anastasia',
        result:
          'Seven placements, no win: Best Featured Performer nominees Sasha Mashchenko (Ballet Lead) and Caeden Moore (Vlad); Best Actor finalists Dylan Wilson (Dmitry) and Anna Jernigan (Lily); Best Supporting Actor finalists Caeden Moore (Vlad) and Karleigh Robin (Dowager Empress); and a Best Featured Performer finalist, Sasha Mashchenko (Ballet Lead). Jernigan appears under "Finalists for Best Actor" verbatim in Blumenthal\'s official PDF — a likely labeling quirk (she played Lily); TO VERIFY.',
      },
      {
        year: '~2022-23 (year to verify)',
        show: "Singin' in the Rain",
        result:
          'Two nominations per the school’s undated news page: Best Actress (Darien Pisacano) and Best Actor (Dylan Wilson). Attributed by the school to "Singin\' in the Rain," an earlier production than Anastasia; the exact year is not published and is TO VERIFY.',
      },
    ],
    honestContext:
      'Anna Jernigan’s arc anchors the program: a 2024 Best Actor finalist placement (as Lily in Anastasia, per Blumenthal’s own labeling) became the 2026 Best Actress win for Footloose, which carried on to the national Jimmy Awards. Note that the 2024 nominations belong to Anastasia, not to "Singin\' in the Rain" — the school’s undated news page pins a separate, earlier pair of noms (Pisacano, Wilson) to that different production. No NCTC festival result or state-level theatre honor was found in this pass; the Middle School Spring Play Competition names the NCTC circuit but no placement is published.',
    sources: [
      { label: 'carmelchristian.org — Theatre Productions (2025-26 season)', url: CC_PRODUCTIONS },
      { label: 'carmelchristian.org — 2024-25 theatre season', url: CC_SEASON_2425 },
      { label: 'carmelchristian.org — earlier "Singin\' in the Rain" Blumey noms (undated)', url: CC_SINGIN },
      { label: 'Blumenthal Arts — 2026 Blumey nominees & finalists', url: BLUMEY_2026 },
      { label: 'Blumenthal Arts — 2024 Blumey nominees & finalists (PDF)', url: BLUMEY_2024 },
      { label: 'WFAE — 2026 Blumey Awards winners announced', url: WFAE_2026 },
    ],
  },

  music: {
    headline:
      'Three named ensembles across the divisions — Symphonic Band, Choir and the audition-based Ignite Band praise team.',
    subhead:
      'The ensemble slate is band- and choir-centered; no orchestra, a cappella group or music honor society is published.',
    tracks: [
      {
        label: 'Curricular — join by enrolling',
        ensembles: ['Symphonic Band (HS)', 'Choir (HS · 5th · MS)', 'Band (MS)'],
      },
      {
        label: 'Auditioned — earn a seat',
        ensembles: ['Ignite Band (HS Praise Band)'],
      },
      {
        label: 'Middle School worship',
        ensembles: ['Ignite (MS Praise Band)'],
      },
    ],
    boardNote:
      'Ignite Band, the High School praise team, is audition-based — a video submission followed by an in-person round by invitation. No orchestra, a cappella group or Tri-M / music honor society is published.',
    ladderTitle: 'The honors ladder — what is published',
    ladder: [
      {
        label: 'Join an ensemble',
        text: 'band and choir run from grade 5 through High School, with Christmas and Spring Concerts on the Middle School calendar.',
      },
      {
        label: 'Audition up',
        text: 'Ignite Band (HS Praise Band) holds an audition — a video round followed by an in-person round by invitation.',
      },
      {
        label: 'Get selected beyond campus',
        text: 'the Middle School program lists an "Honor Band" event; no all-state, adjudication or festival result is published, and a mentioned "Carowinds Festival of Music" did not surface in this pass (TO VERIFY).',
      },
    ],
    ladderNote:
      'No music honor society (e.g. Tri-M) and no per-year selection or superior-rating counts are published. The honors picture beyond the Middle School Honor Band event is not documented.',
    sources: [
      { label: 'carmelchristian.org — Middle School (6–8) Arts', url: CC_MS },
      { label: 'carmelchristian.org — High School (9–12) Arts', url: CC_HS },
    ],
  },

  visual: {
    headline:
      'A studio track that widens into media and publications in High School — visual arts, digital photography, yearbook, creative writing and journalism.',
    subhead:
      'The arts page names no leveled studio sequence, but the Course Offerings guide does: a path from Art I/II up to AP 2-D Art & Design.',
    mediaTitle: 'Studio & media',
    media: [
      { name: 'Visual Arts', detail: 'the core studio strand, K–12' },
      { name: 'Digital Photography', detail: 'a discrete High School course' },
      { name: 'Yearbook', detail: 'publication design' },
      { name: 'Creative Writing', detail: 'a High School arts elective' },
      { name: 'Journalism', detail: 'a High School arts elective' },
    ],
    pathTitle: 'The studio course path',
    path: [
      { name: 'Art I / II' },
      { name: 'Honors Art III / IV' },
      { name: 'AP 2-D Art & Design', terminal: true },
    ],
    pathNote:
      'This sequence comes from the Course Offerings guide, not the arts page — the two disagree, and the arts page names no leveled sequence at all. Graphic design as a discrete course is not published (TO VERIFY).',
    exhibitsTitle: 'Where the work goes public',
    exhibits: [
      {
        when: 'Annual',
        name: 'Middle School Art Festival',
        detail: 'the one named exhibit event on the arts calendar',
      },
    ],
    footnote:
      'High School gallery or exhibit events beyond the Middle School Art Festival are not published, and no external visual-arts recognition (Scholastic or otherwise) surfaced in this pass. The Honors and AP studio courses appear only in the Course Offerings guide, which the arts page does not corroborate.',
    sources: [
      { label: 'carmelchristian.org — Elementary (K–5) Arts', url: CC_ELEM },
      { label: 'carmelchristian.org — Middle School (6–8) Arts', url: CC_MS },
      { label: 'carmelchristian.org — High School (9–12) Arts', url: CC_HS },
    ],
  },

  verdict: {
    headline:
      'A theatre program with a genuine, recently converted Blumey win, sitting on a leaner music and visual-arts footprint than its regional peers.',
    subhead:
      'The 2026 Best Actress win and its Jimmy Awards advancement are the real, verified headline; the open questions are about the undocumented venue, director and honors circuits.',
    holdsUp: [
      {
        label: 'A verified Blumey win — not just finalists',
        text: 'Anna Jernigan took Best Actress for "Footloose" at the 2026 Blumey Awards (confirmed by WFAE) and advanced to the national Jimmy Awards — an outright win, converted from her 2024 finalist placement.',
      },
      {
        label: 'Depth behind the win',
        text: 'the 2026 "Footloose" run placed six across five categories (actress, actor, both supporting, featured performer and choreography), and "Anastasia" placed seven in 2024 — a repeat producer of acting finalists, not a one-off.',
      },
      {
        label: 'A studio path that reaches AP',
        text: 'the Course Offerings guide runs Art I/II → Honors Art III/IV → AP 2-D Art & Design, plus a media-and-publications cluster (digital photography, yearbook, creative writing, journalism) in High School.',
      },
      {
        label: 'A faith-based theatre circuit',
        text: 'Middle School students attend the Christians in Theatre Arts (CITA) Conference and enter the NCTC Spring Play Competition — an early on-ramp to competitive and community theatre.',
      },
    ],
    ask: [
      'Where do productions like "Footloose" actually stage — what is the venue, and how many seats? The site names a "Main Stage" but no room.',
      'Who directs the Upper School musical, and who ran the 2026 Blumey-winning "Footloose"? No director is published.',
      'The Course Offerings guide lists Honors Art III/IV, Honors Acting Studio and AP 2-D Art & Design, but the arts page names none of them — which of these actually runs each year?',
      'Is there any music beyond band, choir and the Ignite praise teams — an orchestra, a strings program, or an a cappella group?',
      'What happens at the Middle School "Honor Band" event, and do students audition into any all-state or regional honors ensemble from there?',
      'Was the "Singin\' in the Rain" Blumey pair (Pisacano, Wilson) a separate year from the 2024 "Anastasia" nominations — and what year was it?',
    ],
    sources: [
      { label: 'carmelchristian.org — Arts pages', url: CC_ARTS },
      { label: 'WFAE — 2026 Blumey Awards winners announced', url: WFAE_2026 },
      { label: 'Verdict synthesized by the researcher from the sources cited on cards 1a–1d' },
    ],
  },
}
