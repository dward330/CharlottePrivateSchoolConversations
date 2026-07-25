// Structured "Academic & Competitive Clubs" layered read.
//
// Powers the expanded state of the Academic & Competitive Clubs card on the
// school detail page (see components/ClubClusters.tsx), replacing the generic
// prose renderer for this one metric. Recreates the "2a — Finalized" design in
// "Academic Clubs Expand Options.dc.html" using the app's own tokens
// (src/index.css) — the same recreate-in-app pattern the Financial Aid deep-dive
// followed.
//
// Every figure is transcribed from the school's own research dossier in
// source-material/ (the same text that ships as
// src/content/student-clubs/<school>.json) — nothing is inferred or carried
// across schools. Only Providence Day publishes an official Upper School club
// list detailed enough to cluster this way, so it is the only entry; schools
// with no entry fall back to the standard prose card.

/** How well a row's headline claim is backed. Drives the summary-row tag. */
export type ClubEvidence = 'verified-event' | 'official-list'

/** One cluster row — either a single flagship club or a named group. */
export type ClubRow = {
  /** Display name. Multi-club rows carry a " clubs →" suffix per the design. */
  name: string
  /** One-liner that names the member clubs, so all clubs stay visible collapsed. */
  oneLiner: string
  /** Evidence tag: accent "Verified — event" vs outline "Official list". */
  evidence: ClubEvidence
  /** 1–2 sentence research note revealed when the row is expanded. */
  note: string
  /** Source line shown under the note. */
  source: string
}

export type ClubClusters = {
  /** Bold lead of the verdict line (shown collapsed and expanded). */
  verdict: string
  /** Muted continuation of the verdict line. */
  verdictHint: string
  rows: ClubRow[]
}

const PROVIDENCE_DAY: ClubClusters = {
  verdict: 'Fifteen clubs compete, in five clusters; DECA is the co-flagship.',
  verdictHint: 'Open any row for the full research note and its source.',
  rows: [
    {
      name: 'DECA',
      oneLiner: "Advanced from the state conference to the national ICDC in '26",
      evidence: 'verified-event',
      note: 'The competitive co-flagship: DECA advanced from the state career development conference to the national ICDC in 2026. Individual placements are not public.',
      source: "Upper School Club List '25–26; school news",
    },
    {
      name: 'Civic clubs →',
      oneLiner: 'Speech & Debate, Mock Trial, Model U.N., World Quest, Quiz Bowl',
      evidence: 'official-list',
      note: "Five civic and rhetoric programs confirmed on the official Upper School list. Event placements are largely not public — existence, not results, is what's confirmed.",
      source: "Upper School Club List '25–26",
    },
    {
      name: 'STEM clubs →',
      oneLiner: 'Science Olympiad, Robotics, TSA, Drone Club, Build Your Own Boat',
      evidence: 'official-list',
      note: 'Five STEM programs including the Technology Student Association and a build-your-own-boat competition. Competition-circuit results are not published.',
      source: "Upper School Club List '25–26",
    },
    {
      name: 'Business & econ clubs →',
      oneLiner: 'FBLA, Euro Challenge, PD Economics Challenge — plus DECA',
      evidence: 'official-list',
      note: 'A standout strand for a school this size — four business and economics competition chapters on the official list.',
      source: "Upper School Club List '25–26",
    },
    {
      name: 'Health & esports clubs →',
      oneLiner: 'HOSA and a competitive E-Sports Club',
      evidence: 'official-list',
      note: 'HOSA (health occupations) and a competitive esports program round out the slate.',
      source: "Upper School Club List '25–26",
    },
  ],
}

const CLUSTERS: Record<string, ClubClusters> = {
  'providence-day': PROVIDENCE_DAY,
}

/** The layered club read for a school, or undefined to fall back to prose. */
export function clubClusters(schoolSlug: string): ClubClusters | undefined {
  return CLUSTERS[schoolSlug]
}
