// Hickory Grove Christian School — Student Clubs (service + honors).
//
// Transcribed from source-material/student-clubs/hickory-grove-christian/
// "Hickory Grove Christian - Student Clubs - Deep Research.md".
//
// Provenance caveat that shapes every card: the full 27-organization non-sports
// roster rides on ONE aggregator (PrivateSchoolReview) — the school's own site
// has no clubs/activities page. The school site DOES individually corroborate a
// subset (Discipleship, Choir, Drama, Jazz Band, the DR/Ecuador/Haiti/Kenya
// mission trips, the HGBC food-pantry partnership, and the Exodus yearbook); the
// rest rest on the aggregator alone. That single-source status is flagged on the
// cards and on the standalone club catalog.
//
// THE 1a AFFINITY CARD IS OMITTED, and that is the research finding rather than a
// hole in it: HGCS's grouping model is faith-based (discipleship, worship,
// missions), and no identity-based affinity group appears in any source — as
// expected at a Christian school. Card 1a is an ecosystem map built from a named
// roster; with no such roster there are no cells to draw, so it is omitted rather
// than shipped thin (the same treatment, for the same reason, as Carmel Christian
// and Covenant Day).

import type { ClubsProgram } from '../clubsProgram.ts'

const PSR = 'https://www.privateschoolreview.com/hickory-grove-christian-school-profile'
const ACADEMICS = 'https://www.hgchristian.org/academics/'

export const hickoryGroveChristian: ClubsProgram = {
  service: {
    headline:
      'A faith-and-service spine built on international mission trips and a working food-pantry partnership — the service programs the school\'s own site confirms.',
    subhead:
      'Service here runs through the church ministry rather than a single logged club: mission trips to four countries, an aquaponics program feeding a church food pantry, and named leadership programs.',
    programs: [
      {
        value: '4',
        valueLabel: 'countries · international mission trips',
        name: 'Mission trips',
        detail:
          'The school names international outreach and mission trips to the Dominican Republic, Ecuador, Haiti and Kenya — the clearest published service commitment, corroborated on the school\'s own Academics page.',
        source: { label: 'hgchristian.org — Academics', url: ACADEMICS },
      },
      {
        value: 'HGBC',
        valueLabel: 'food pantry · via aquaponics',
        name: 'Food-pantry partnership',
        detail:
          'HGCS runs an aquaponics program that supplies the Hickory Grove Baptist Church food pantry — a standing, school-confirmed community-service channel rather than an opt-in club.',
        source: { label: 'hgchristian.org — Academics', url: ACADEMICS },
      },
      {
        value: '2',
        valueLabel: 'named leadership programs',
        name: 'Leadership programs',
        detail:
          'The aggregator roster names a Chick-fil-A Leadership Academy chapter and a Global Ambassadors program, alongside small-group discipleship; the school site confirms discipleship but not the two named programs individually.',
        source: { label: 'privateschoolreview.com — HGCS profile', url: PSR },
      },
    ],
    footnoteTitle: 'The broader roster',
    footnote:
      'PrivateSchoolReview lists 27 non-sports organizations in all — 18 "Clubs and Organizations" and 9 "Arts and Music" — spanning interest clubs (Apologetics, Public Speaking, Spanish, International Culture, Venture, Spirit) and arts clubs (Art, Guitar, Ukulele, Fiber, Pep Band, Praise Band). The full list is on the Club Catalog card, flagged single-source.',
    flags: [
      {
        kind: 'gap',
        text: 'The 27-organization roster is single-source (PrivateSchoolReview) — the school publishes no clubs/activities page. The mission trips, food-pantry partnership, discipleship, choir, drama and jazz band are individually corroborated on the school site; the other named clubs rest on the aggregator alone.',
      },
    ],
    sources: [
      { label: 'hgchristian.org — Academics (mission trips, food pantry, discipleship)', url: ACADEMICS },
      { label: 'privateschoolreview.com — HGCS profile (full roster)', url: PSR },
    ],
  },

  honors: {
    headline:
      'Five honor societies span academics, science, journalism and social studies — from the middle-school NJHS to four high-school chapters.',
    subhead:
      'PrivateSchoolReview lists an explicit "Honor Societies" grouping of exactly these five; no induction dates, GPA thresholds, chapter names or advisor names are published anywhere.',
    societies: [
      {
        name: 'National Honor Society',
        division: 'High School',
        recognizes: 'Scholarship, leadership, service and character (NHS)',
        feedsFrom: 'the classroom',
      },
      {
        name: 'National Junior Honor Society',
        division: 'Middle School',
        recognizes: 'Scholarship and character for middle-school students (NJHS)',
        feedsFrom: 'the classroom',
      },
      {
        name: 'National Science Honor Society',
        division: 'High School',
        recognizes: 'Achievement in the sciences',
        feedsFrom: 'science',
      },
      {
        name: 'Quill and Scroll Honor Society',
        division: 'High School',
        recognizes: 'The international high-school journalism honor society',
        feedsFrom: 'student media',
      },
      {
        name: 'Rho Kappa',
        division: 'High School',
        recognizes: 'The National Social Studies Honor Society (juniors/seniors)',
        feedsFrom: 'social studies',
      },
    ],
    flags: [
      {
        kind: 'gap',
        text: 'The five societies appear in PrivateSchoolReview\'s roster; the school publishes no honor-society page, so induction windows, GPA thresholds, chapter names, advisor names and member counts are all unstated. Some are national programs whose active HGCS chapter is not independently confirmed.',
      },
    ],
    sources: [
      { label: 'privateschoolreview.com — HGCS profile (Honor Societies grouping)', url: PSR },
    ],
  },
}
