// Structured "Academic & Competitive Clubs" layered read.
//
// Powers the expanded state of the Academic & Competitive Clubs card on the
// school detail page (see components/ClubClusters.tsx), replacing the generic
// prose renderer for this one metric. Recreates the "2a — Finalized" design in
// "Academic Clubs Expand Options.dc.html" using the app's own tokens
// (src/index.css) — the same recreate-in-app pattern the Financial Aid deep-dive
// followed.
//
// Every figure is transcribed from that school's OWN research dossier in
// source-material/ (the same text that ships as
// src/content/student-clubs/<school>.json) — nothing is inferred, averaged, or
// carried across schools. The schools' slates genuinely differ (Latin's flagship
// is a top-20 NSDA debate program; Country Day's is Model UN; Cannon's is an
// FLL robotics team; Davidson Day's competitive footprint is a Middle School
// Battle of the Books team), so each entry names its own real clusters, flagship,
// and verified events. A school with no entry falls back to the standard prose
// card.

/** Whether a row's headline claim carries a verified external result.
 *  - 'verified' → accent tag (an outcome confirmed by an outside body/event)
 *  - 'reported' → outline tag (existence/participation, results not published)
 *  The exact tag wording is per-row in `evidenceLabel`, since schools cite
 *  their evidence differently ("Verified — event", "Official list", "School
 *  news", "School-reported", "Named only"). */
export type ClubEvidence = 'verified' | 'reported'

/** One cluster row — either a single flagship club or a named group. */
export type ClubRow = {
  /** Display name. Multi-club rows carry a " clubs →" suffix per the design. */
  name: string
  /** One-liner that names the member clubs, so all clubs stay visible collapsed. */
  oneLiner: string
  /** Whether the row gets the accent (verified) or outline (reported) tag. */
  evidence: ClubEvidence
  /** Tag wording, e.g. 'Verified — event', 'Official list', 'School news'. */
  evidenceLabel: string
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

// ── Providence Day ── the design's own "2a" reference. Fifteen clubs on the
// official Upper School list, in five clusters; DECA is the co-flagship (advanced
// state → national ICDC 2026). Verbatim from the 2a section, cross-checked
// against src/content/student-clubs/providence-day.json.
const PROVIDENCE_DAY: ClubClusters = {
  verdict: 'Fifteen clubs compete, in five clusters; DECA is the co-flagship.',
  verdictHint: 'Open any row for the full research note and its source.',
  rows: [
    {
      name: 'DECA',
      oneLiner: "Advanced from the state conference to the national ICDC in '26",
      evidence: 'verified',
      evidenceLabel: 'Verified — event',
      note: 'The competitive co-flagship: DECA advanced from the state career development conference to the national ICDC in 2026. Individual placements are not public.',
      source: "Upper School Club List '25–26; school news",
    },
    {
      name: 'Civic clubs →',
      oneLiner: 'Speech & Debate, Mock Trial, Model U.N., World Quest, Quiz Bowl',
      evidence: 'reported',
      evidenceLabel: 'Official list',
      note: "Five civic and rhetoric programs confirmed on the official Upper School list. Event placements are largely not public — existence, not results, is what's confirmed.",
      source: "Upper School Club List '25–26",
    },
    {
      name: 'STEM clubs →',
      oneLiner: 'Science Olympiad, Robotics, TSA, Drone Club, Build Your Own Boat',
      evidence: 'reported',
      evidenceLabel: 'Official list',
      note: 'Five STEM programs including the Technology Student Association and a build-your-own-boat competition. Competition-circuit results are not published.',
      source: "Upper School Club List '25–26",
    },
    {
      name: 'Business & econ clubs →',
      oneLiner: 'FBLA, Euro Challenge, PD Economics Challenge — plus DECA',
      evidence: 'reported',
      evidenceLabel: 'Official list',
      note: 'A standout strand for a school this size — four business and economics competition chapters on the official list.',
      source: "Upper School Club List '25–26",
    },
    {
      name: 'Health & esports clubs →',
      oneLiner: 'HOSA and a competitive E-Sports Club',
      evidence: 'reported',
      evidenceLabel: 'Official list',
      note: 'HOSA (health occupations) and a competitive esports program round out the slate.',
      source: "Upper School Club List '25–26",
    },
  ],
}

// ── Charlotte Latin ── the flagship is Speech & Debate by a wide margin (NSDA
// top-20 Schools of Excellence, charter + 200 Club). This is the same slate the
// design's 1a/1b/1c explorations were drawn from. From
// src/content/student-clubs/charlotte-latin.json.
const CHARLOTTE_LATIN: ClubClusters = {
  verdict: 'Six programs compete; Speech & Debate is national-tier.',
  verdictHint: 'Open any row for the full research note and its source.',
  rows: [
    {
      name: 'Speech & Debate',
      oneLiner: "Top-20 NSDA program nationally; 5th in Public Forum at the '26 Nationals",
      evidence: 'verified',
      evidenceLabel: 'Verified — NSDA',
      note: 'A genuine national-tier operation with external evidence: the NSDA Debate Schools of Excellence Award (top 20 nationally), charter status, and 2025 membership in the 200 Club. Director Bilal Butt holds a second NSDA Diamond. Recent Nationals: Chandra & Rao 5th (Public Forum), Berman & Willett 25th, Yang 33rd (World Schools), Pan (’23) Academic All-American.',
      source: 'charlottelatin.org — News & Speech and Debate; NSDA',
    },
    {
      name: 'Science Olympiad',
      oneLiner: "Div B (MS) + Div C (US); reached the NC state tournament in '26",
      evidence: 'verified',
      evidenceLabel: 'Verified entry',
      note: "Appearing in the '26 NC State Tournament field confirms the Div C team advanced past regionals. The public result table doesn't list a confirmed finishing rank, so no placement is claimed.",
      source: "NC Science Olympiad; Duosmium '26 NC State (Div. C)",
    },
    {
      name: 'Model UN',
      oneLiner: 'Local + international conferences, incl. NAIMUN at Georgetown',
      evidence: 'reported',
      evidenceLabel: 'School-reported',
      note: 'Delegate-award tallies aren’t published consistently year to year, so this is reported at the program level rather than with a medal count. The school notes international travel for both Model UN and Debate.',
      source: 'charlottelatin.org — Clubs; Upper School Profile',
    },
    {
      name: 'World Quest',
      oneLiner: 'Current-affairs quiz competition vs local high schools, annually',
      evidence: 'reported',
      evidenceLabel: 'School-reported',
      note: 'An academic-quiz-style competition on current affairs, geography, and history — distinct from Model UN.',
      source: 'charlottelatin.org — Clubs',
    },
    {
      name: 'Math Team',
      oneLiner: 'CLS Math Team competes interscholastically; standings unpublished',
      evidence: 'reported',
      evidenceLabel: 'School-reported',
      note: 'The Math Club feeds the CLS Math Team; the separate CLS Math Tutors club extends math into service via tutoring partnerships with local schools. Competition results aren’t published in detail.',
      source: 'charlottelatin.org — Clubs',
    },
    {
      name: 'Individual STEM',
      oneLiner: "A junior placed at the NC State Science & Engineering Fair, spring '26",
      evidence: 'reported',
      evidenceLabel: 'School news',
      note: 'Individual science-fair and research competition recurs in the school’s news beyond team clubs.',
      source: "charlottelatin.org — School News, April '26",
    },
  ],
}

// ── Cannon ── flagship is the Brainy Yaks FLL robotics team (top 100 of 32,000+
// at FLL Worlds, back-to-back 2024 & 2025). From
// src/content/student-clubs/cannon.json.
const CANNON: ClubClusters = {
  verdict: 'A robotics-led slate; the Brainy Yaks reached the FLL World top 100.',
  verdictHint: 'Open any row for the full research note and its source.',
  rows: [
    {
      name: 'Brainy Yaks',
      oneLiner: "FLL robotics (grades 6–10); top 100 of 32,000+ at Worlds, '24 & '25",
      evidence: 'verified',
      evidenceLabel: 'Verified — FLL Worlds',
      note: 'Cannon’s standout: a FIRST LEGO League team that won the NC Champions Award and finished top 100 of 32,000+ teams at the FLL World Championship in Houston, in back-to-back years (2024 and 2025). Its coach earned one of only four FLL Coach/Mentor Awards.',
      source: 'cannonschool.org — Brainy Yaks FLL Top 100 (2025); Independent Tribune',
    },
    {
      name: 'Business & academic →',
      oneLiner: 'DECA (’26 CDC finalists), Model UN (Duke DUMUNC awards)',
      evidence: 'verified',
      evidenceLabel: 'Verified — event',
      note: 'DECA students reached finalist standing at the 2026 CDC (entrepreneurship, marketing, personal finance). The Model UN team attended Duke’s DUMUNC among 400+ delegates, earning Outstanding Delegate and Verbal Commendation.',
      source: 'Deans’ Daily Download — Cannon Upper School',
    },
    {
      name: 'Esports',
      oneLiner: 'Cannon School Gaming — dedicated esports lab since 2021',
      evidence: 'reported',
      evidenceLabel: 'School-reported',
      note: 'Cannon School Gaming launched in fall 2020 and runs from a dedicated lab (converted 2021); titles include Fortnite, League of Legends, Rocket League, and Overwatch, alongside a "Business of Esports" course.',
      source: 'cannonschool.org — Esports / Cannon School Gaming',
    },
    {
      name: 'Middle School teams →',
      oneLiner: 'Science Olympiad, Envirothon, Battle of the Books, Model UN',
      evidence: 'reported',
      evidenceLabel: 'School-reported',
      note: 'The Middle School fields several academic-competition teams; a full multi-year results history is not centrally published.',
      source: 'cannonschool.org — Middle School Student Life',
    },
  ],
}

// ── Charlotte Christian ── a spread across business, debate, diplomacy, classical
// language, robotics, and chess; the one documented result is a Middle School
// Chess Team second place. From src/content/student-clubs/charlotte-christian.json.
const CHARLOTTE_CHRISTIAN: ClubClusters = {
  verdict: 'Clubs span six fields; the Middle School Chess Team placed 2nd.',
  verdictHint: 'Open any row for the full research note and its source.',
  rows: [
    {
      name: 'Chess Team',
      oneLiner: 'Competitive Middle School team — earned 2nd place at a tournament',
      evidence: 'verified',
      evidenceLabel: 'Verified — event',
      note: 'Chess is a Middle School after-school club with a competitive team; school news reported the team earning second place at a tournament ("Making Their Move"). It is the one documented competitive result in this slate.',
      source: 'charlottechristian.com — Middle School; CCS News',
    },
    {
      name: 'US academic clubs →',
      oneLiner: 'DECA, Debate, Model UN, Latin Club',
      evidence: 'reported',
      evidenceLabel: 'Official list',
      note: 'The Upper School lists a business/marketing chapter (DECA), a student-led Debate club, Model UN, and a Latin Club tied to the classical world-languages program. Per-club competitive records are not published.',
      source: 'charlottechristian.com — Upper School',
    },
    {
      name: 'Robotics →',
      oneLiner: 'VEX teams across Upper, Middle, and Lower School',
      evidence: 'reported',
      evidenceLabel: 'Official list',
      note: 'A VEX VRC Robotics Competition Team for grades 9–12, VEX competition teams in Middle School innovation electives, and a recently-added competitive Lower School robotics team.',
      source: 'charlottechristian.com — Upper & Middle School; parent reviews',
    },
  ],
}

// ── Charlotte Country Day ── flagship is Model UN, the best-documented competitive
// program (repeat conference awards). Several peer clubs could not be confirmed —
// reported honestly. From src/content/student-clubs/charlotte-country-day.json.
const CHARLOTTE_COUNTRY_DAY: ClubClusters = {
  verdict: 'Model UN is the flagship; the rest of the slate is thinly documented.',
  verdictHint: 'Open any row for the full research note and its source.',
  rows: [
    {
      name: 'Model UN',
      oneLiner: 'Delegations of 15–17 to Duke, UNC (MUNCH) & a Virginia conference',
      evidence: 'verified',
      evidenceLabel: 'Verified — event',
      note: 'Country Day’s best-documented competitive program. At MUNCH (March 2025) seventeen students competed and six earned awards, including four Outstanding Delegate honors; a Virginia conference produced a Best Delegate award. Both Middle and Upper School delegations are active.',
      source: 'charlottecountryday.org — school news (MUNCH, Virginia, Duke)',
    },
    {
      name: 'Robotics',
      oneLiner: 'Confirmed by name through student profiles; no results published',
      evidence: 'reported',
      evidenceLabel: 'Named only',
      note: 'Robotics is confirmed by name via student profiles in the news archive, but no public competition results (FIRST, VEX, or similar) surfaced for the Upper School program.',
      source: 'charlottecountryday.org — school news (scholarship nominee profiles)',
    },
    {
      name: 'Not confirmed',
      oneLiner: 'Science Olympiad, quiz bowl, debate, DECA — not found in public sources',
      evidence: 'reported',
      evidenceLabel: 'Gap flagged',
      note: 'Several academic-competition clubs common at peer schools could not be confirmed for Country Day in public sources — likely held in the login-gated activities catalog. "Not found" means not asserted here, not "does not exist."',
      source: 'Research gap — no public source located',
    },
  ],
}

// ── Davidson Day ── a small school; the competitive footprint is a Middle School
// Battle of the Books team (regional first place), plus honor-society and
// academic-distinction programs. Common competition clubs are honestly flagged as
// not found. From src/content/student-clubs/davidson-day.json.
const DAVIDSON_DAY: ClubClusters = {
  verdict: 'A compact slate; Battle of the Books took regional first place.',
  verdictHint: 'Open any row for the full research note and its source.',
  rows: [
    {
      name: 'Battle of the Books',
      oneLiner: 'Middle School reading-quiz team — regional first place (documented)',
      evidence: 'verified',
      evidenceLabel: 'Verified — event',
      note: 'A reading-comprehension quiz competition; Davidson Day’s Middle School team is documented taking first place in a regional competition against several area schools — the school’s clearest competitive result in this area.',
      source: 'Davidson Day School — Academic Recognition & Competition dossier',
    },
    {
      name: 'Honors & distinctions →',
      oneLiner: 'National Honor Society (28 in ’25), Global Studies Diploma, Acclaim Scholars',
      evidence: 'reported',
      evidenceLabel: 'School-reported',
      note: 'A confirmed National Honor Society chapter (28 members, Class of 2025), a Global Studies Diploma recognizing research and international study, and the Acclaim Scholars merit program. Chapter specifics are not published publicly.',
      source: 'Davidson Day School — Academic Recognition & Competition dossier',
    },
    {
      name: 'Research showcase',
      oneLiner: 'Davidson Day Scholars Research Conference (Upper School capstones)',
      evidence: 'reported',
      evidenceLabel: 'School-reported',
      note: 'The venue where Global Studies Diploma seniors present capstone research; some students also present at a collegiate archaeology conference.',
      source: 'Davidson Day School — Academic Recognition & Competition dossier',
    },
    {
      name: 'Not confirmed',
      oneLiner: 'Debate, Model UN, mock trial, quiz bowl, Science Olympiad, math team',
      evidence: 'reported',
      evidenceLabel: 'Gap flagged',
      note: 'No evidence was found for these standing programs — most likely simply not offered at a small school, though direct confirmation is recommended before treating them as definitively absent.',
      source: 'Research gap — no public source located',
    },
  ],
}

const CLUSTERS: Record<string, ClubClusters> = {
  'providence-day': PROVIDENCE_DAY,
  'charlotte-latin': CHARLOTTE_LATIN,
  cannon: CANNON,
  'charlotte-christian': CHARLOTTE_CHRISTIAN,
  'charlotte-country-day': CHARLOTTE_COUNTRY_DAY,
  'davidson-day': DAVIDSON_DAY,
}

/** The layered club read for a school, or undefined to fall back to prose. */
export function clubClusters(schoolSlug: string): ClubClusters | undefined {
  return CLUSTERS[schoolSlug]
}
