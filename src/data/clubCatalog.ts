// Structured "Club Catalog & Overview" interest index.
//
// Powers the expanded state of the Club Catalog & Overview card on the school
// detail page (see components/ClubCatalog.tsx), replacing the generic prose
// renderer for the `catalog` metric on schools that have a structured entry.
// A school with no entry falls back to the standard prose card.
//
// Recreates the "2a — Finalized" design in
// "Club Catalog Expand Options.dc.html" using the app's own tokens
// (src/index.css) — the same recreate-in-app pattern ClubClusters and the
// Financial Aid deep-dive followed. The catalog card differs from the academic
// clubs card: because the club NAMES are the content (a parent scans for their
// kid's interest), the whole roster stays visible and single-select filter chips
// narrow it, rather than deferring names behind per-row disclosure.
//
// Every club, category, count, and division note is transcribed from that
// school's OWN research dossier in source-material/ (the same text that ships as
// src/content/student-clubs/<school>.json) — nothing is inferred, averaged, or
// carried across schools. Categories genuinely differ per school. Where a school
// publishes no full roster (Country Day), the division notes keep honest-gap
// language and no clubs or counts are invented.

/** One club in the filterable roster. */
export type CatalogClub = {
  /** Display name. */
  name: string
  /** Category key — must match one of the school's `categories[].key`. */
  cat: string
  /** One-line purpose, so every club keeps its descriptor when filtered. */
  note: string
}

/** A filter category. The chip label is `${short} · ${count}`. */
export type CatalogCategory = {
  /** Stable key referenced by each club's `cat`. */
  key: string
  /** Short chip label (e.g. 'Service', 'Competitive'). */
  short: string
  /** Full category name shown on each club row (e.g. 'Service'). */
  full: string
}

/** A division that runs differently by design — kept as an honest note row
 *  rather than a fabricated roster. */
export type CatalogDivision = {
  /** Row label, e.g. 'Middle School (6–8)'. */
  label: string
  /** The honest description of how that division runs. */
  text: string
  /** Small outline tag, e.g. 'School-reported', 'Structural', 'Gap flagged'. */
  tag: string
}

export type ClubCatalog = {
  /** Bold lead of the header verdict (shown collapsed as the teaser and expanded). */
  verdict: string
  /** Muted continuation of the verdict line. */
  verdictHint: string
  /** Interest categories, in chip order. An implicit "All" chip precedes them. */
  categories: CatalogCategory[]
  /** The full filterable roster. */
  clubs: CatalogClub[]
  /** Division notes rendered below the grid (younger divisions, gaps). */
  divisions: CatalogDivision[]
  /** Source line shown in the footer SOURCES row. */
  source: string
  /** Optional noun for the counter, default "clubs" (e.g. "confirmed clubs"). */
  countNoun?: string
}

// ── Charlotte Latin ── copy is final: transcribed verbatim from the design's 2a
// section and cross-checked against src/content/student-clubs/charlotte-latin.json
// (25 in-scope Upper School clubs; six interest areas; MS rotating sampler; LS
// enrichment-based). Category counts: svc·7, comp·5, lead·4, spec·4, aff·3, cult·2.
const CHARLOTTE_LATIN: ClubCatalog = {
  verdict:
    '25 Upper School clubs across six interest areas; the younger divisions run differently by design.',
  verdictHint: 'Filter by interest; every club keeps its one-line purpose.',
  categories: [
    { key: 'svc', short: 'Service', full: 'Service' },
    { key: 'comp', short: 'Competitive', full: 'Competitive & academic' },
    { key: 'lead', short: 'Leadership', full: 'Leadership & governance' },
    { key: 'spec', short: 'Special interest', full: 'Special interest & publications' },
    { key: 'aff', short: 'Affinity', full: 'Affinity & mentorship' },
    { key: 'cult', short: 'Language', full: 'Culture & language' },
  ],
  clubs: [
    { name: 'CLS Service Council', cat: 'svc', note: 'Umbrella — coordinates weekly service across the Upper School; feeds the 150-hour Service Society' },
    { name: 'Club Sandwich', cat: 'svc', note: 'Sandwiches for people experiencing homelessness; service hours awarded' },
    { name: 'Blessings in a Backpack', cat: 'svc', note: 'Weekly weekend-food packing for students who rely on free school meals' },
    { name: 'Environmental Club', cat: 'svc', note: 'Adopt-a-stream, campus recycling, and the Sierra Student Coalition' },
    { name: 'Paws for the Cause', cat: 'svc', note: 'Blankets and toys for Humane Society shelter animals' },
    { name: 'SADD', cat: 'svc', note: 'Raises awareness of the dangers of impaired driving' },
    { name: 'CLS Math Tutors', cat: 'svc', note: 'Math tutoring partnerships with local schools' },
    { name: 'Forensics Club', cat: 'comp', note: 'Interscholastic debate and public speaking; feeds the flagship Speech & Debate program' },
    { name: 'Model United Nations', cat: 'comp', note: 'Global-issue debate at local and international MUN conferences' },
    { name: 'World Quest', cat: 'comp', note: 'Current-affairs quiz team; competes annually against local high schools' },
    { name: 'Math Club', cat: 'comp', note: 'Builds toward interscholastic competition via the CLS Math Team' },
    { name: 'Junior Classical League', cat: 'comp', note: 'Language, literature, and culture of ancient Greece and Rome' },
    { name: 'Student Council', cat: 'lead', note: 'Elected officers and grade delegates; student concerns and campus events' },
    { name: 'Honor Council Advisory Board', cat: 'lead', note: 'Resource group to the elected Honor Council; cross-division liaison' },
    { name: 'Ambassadors of Admissions', cat: 'lead', note: 'Host prospective students and families at admissions events' },
    { name: 'Spirit Council', cat: 'lead', note: 'Generates enthusiasm and support for all Charlotte Latin teams' },
    { name: 'Book Club', cat: 'spec', note: 'Reading for pleasure with peer discussion of literature' },
    { name: 'Chess Club', cat: 'spec', note: 'Open play and instruction for any student' },
    { name: 'Outdoor Club', cat: 'spec', note: 'Camping and adventure skills: hiking, climbing, rafting' },
    { name: 'Yearbook Club', cat: 'spec', note: 'Photography and reporting for students not enrolled in the yearbook class' },
    { name: 'Mosaic (incl. Q&A and BSA)', cat: 'aff', note: 'Diversity-programming umbrella; houses Q&A and the Black Student Association' },
    { name: 'SISTERS', cat: 'aff', note: 'Pairs upperclass women with freshmen to smooth the transition into high school' },
    { name: 'Girl Up', cat: 'aff', note: 'Empowering women at CLS through education, advocacy, and service' },
    { name: 'Spanish Club', cat: 'cult', note: 'Appreciation of Spanish language and culture' },
    { name: 'Table Française', cat: 'cult', note: 'French language and culture in an informal setting' },
  ],
  divisions: [
    {
      label: 'Middle School (6–8)',
      text: 'Rotating sampler: 25+ offerings in 8–10-week cycles — by design, no fixed roster. Named: Cooking, Just Dance, Robotics, StuCo, Sports, Science Olympiad, Speech & Debate',
      tag: 'School-reported',
    },
    {
      label: 'Lower School (TK–5)',
      text: "Enrichment-based (Hawks' Club + Enrichment blocks), not a club roster — structural, not a gap",
      tag: 'Structural',
    },
  ],
  source:
    'charlottelatin.org — Student Life / Clubs · After School · School News · Count: 27 published − 5 arts + 3 service orgs = 25',
}

// ── Providence Day ── recategorized from src/content/student-clubs/providence-day.json
// (official Upper School Club List '25–26). 77 in-scope US clubs across six of the
// school's OWN category groupings; only 5 arts clubs excluded. Per-club focus is
// the dossier's generic descriptor derived from each club's name (the school does
// not publish per-club descriptions). Counts: interest·40, comp·15, aff·9, rec·6,
// gov·4, media·3.
const PROVIDENCE_DAY: ClubCatalog = {
  verdict:
    '77 Upper School clubs in scope from the official 25–26 list — the deepest slate in the set; the younger divisions run differently.',
  verdictHint: 'Filter by interest; only 5 arts clubs are excluded for a clean count.',
  categories: [
    { key: 'interest', short: 'Activity & interest', full: 'Activity & interest' },
    { key: 'comp', short: 'Competitive', full: 'Team-oriented / competitive' },
    { key: 'aff', short: 'Affinity', full: 'Affinity / alliance' },
    { key: 'rec', short: 'Recreational sport', full: 'Recreational sport & outdoor' },
    { key: 'gov', short: 'Governance', full: 'Application / election-based' },
    { key: 'media', short: 'Publications', full: 'Publications / media' },
  ],
  clubs: [
    // Activity & interest (40)
    { name: 'AI / Machine Learning Club', cat: 'interest', note: 'Artificial intelligence and machine-learning exploration' },
    { name: 'Aviation Club', cat: 'interest', note: 'Aviation and flight' },
    { name: 'Book Club', cat: 'interest', note: 'Shared reading and discussion' },
    { name: 'Charger Guides', cat: 'interest', note: 'Student ambassador / guide group' },
    { name: 'Chess Club', cat: 'interest', note: 'Casual and competitive chess' },
    { name: 'Chinese Club', cat: 'interest', note: 'Chinese language and culture' },
    { name: 'Coding Club (Swift)', cat: 'interest', note: 'Programming, focused on Swift' },
    { name: 'Comfort Club', cat: 'interest', note: 'Comfort, wellbeing, and peer support' },
    { name: 'Computer Science Honors Society', cat: 'interest', note: 'Recognition society for computer science' },
    { name: 'Criminal Justice Club', cat: 'interest', note: 'Criminal-justice topics and discussion' },
    { name: 'Cubing Club', cat: 'interest', note: 'Speedcubing (Rubik’s-style puzzles)' },
    { name: 'Dungeons & Dragons Club', cat: 'interest', note: 'Tabletop role-playing games' },
    { name: 'Fishing Club', cat: 'interest', note: 'Recreational fishing' },
    { name: 'French Language Club', cat: 'interest', note: 'French language and culture' },
    { name: 'Future Business Leaders of America', cat: 'interest', note: 'Business-skills organization (FBLA)' },
    { name: 'German Language Club', cat: 'interest', note: 'German language and culture' },
    { name: 'Greek Society', cat: 'interest', note: 'Ancient and modern Greek culture' },
    { name: 'International Food Club', cat: 'interest', note: 'Global cuisines and food culture' },
    { name: 'Investment Management Society', cat: 'interest', note: 'Investing and portfolio concepts' },
    { name: 'Italian Culture Club', cat: 'interest', note: 'Italian language and culture' },
    { name: 'Latin Club', cat: 'interest', note: 'Latin language and Roman culture' },
    { name: 'Lower School Buddies', cat: 'interest', note: 'Mentoring younger Lower School students' },
    { name: 'Magic, the Gathering Club', cat: 'interest', note: 'The Magic: The Gathering card game' },
    { name: 'Math Club', cat: 'interest', note: 'Mathematics enrichment and problem-solving' },
    { name: 'Meditation Club', cat: 'interest', note: 'Mindfulness and meditation practice' },
    { name: 'Meet and Eat Club', cat: 'interest', note: 'Social gatherings centered on food' },
    { name: 'Microfinance Club', cat: 'interest', note: 'Microfinance and small-scale lending concepts' },
    { name: 'Motorsport Club', cat: 'interest', note: 'Motorsport and automotive interest' },
    { name: 'Network of Complimentary Schools', cat: 'interest', note: 'Inter-school academic program / exchange' },
    { name: 'Outdoors Club', cat: 'interest', note: 'Outdoor activities and the outdoors' },
    { name: 'Poker Theory Club', cat: 'interest', note: 'Game theory and strategy via poker' },
    { name: 'Random Acts of Kindness', cat: 'interest', note: 'Small acts of kindness across campus' },
    { name: 'Retro Games Club', cat: 'interest', note: 'Classic and retro video games' },
    { name: 'Soccer & Service Club (Footy & Facts)', cat: 'interest', note: 'Service paired with soccer interest' },
    { name: 'Science Club', cat: 'interest', note: 'General science exploration' },
    { name: 'SPAM', cat: 'interest', note: 'Purpose not specified on the School’s list' },
    { name: 'Spanish Language Club', cat: 'interest', note: 'Spanish language and culture' },
    { name: 'Students for Students', cat: 'interest', note: 'Peer support and student advocacy' },
    { name: 'Wing Haven', cat: 'interest', note: 'Environmental / garden-stewardship service' },
    { name: 'Women in STEM', cat: 'interest', note: 'Supporting women in science and engineering' },
    // Team-oriented / competitive (15)
    { name: 'Build Your Own Boat', cat: 'comp', note: 'Design-and-build engineering challenge' },
    { name: 'DECA', cat: 'comp', note: 'Marketing, finance, and entrepreneurship competition' },
    { name: 'Drone Club', cat: 'comp', note: 'Drones and unmanned-flight projects' },
    { name: 'E-Sports Club', cat: 'comp', note: 'Competitive video-gaming' },
    { name: 'Euro Challenge Club', cat: 'comp', note: 'European-economics competition' },
    { name: 'HOSA', cat: 'comp', note: 'Health Occupations Students of America' },
    { name: 'Mock Trial', cat: 'comp', note: 'Simulated courtroom trial competition' },
    { name: 'Model UN', cat: 'comp', note: 'Model United Nations diplomacy and debate' },
    { name: 'PD Economics Challenge', cat: 'comp', note: 'Economics knowledge competition' },
    { name: 'Quiz Bowl', cat: 'comp', note: 'Buzzer-based academic quiz competition' },
    { name: 'Science Olympiad', cat: 'comp', note: 'Team STEM events competition' },
    { name: 'World Quest', cat: 'comp', note: 'Current-affairs and geography competition' },
    { name: 'Robotics Team', cat: 'comp', note: 'Competitive robotics design and build' },
    { name: 'Speech & Debate', cat: 'comp', note: 'Interscholastic speech and debate' },
    { name: 'Technology Student Association (TSA)', cat: 'comp', note: 'Technology and engineering competition' },
    // Affinity / alliance (9)
    { name: 'AMEMSA Affinity Club', cat: 'aff', note: 'Arab, Middle Eastern, Muslim & South Asian community' },
    { name: 'AAPI Affinity Club', cat: 'aff', note: 'Asian American and Pacific Islander community' },
    { name: 'Black Student Union (BSU)', cat: 'aff', note: 'Black student community and culture' },
    { name: 'Diabuddies', cat: 'aff', note: 'Support for students affected by diabetes' },
    { name: 'Fellowship of Christian Athletes (FCA)', cat: 'aff', note: 'Faith-based fellowship community' },
    { name: 'Gender & Sexuality Alliance (GSA)', cat: 'aff', note: 'LGBTQ+ students and allies' },
    { name: 'Hispanic / Latinx Affinity Club', cat: 'aff', note: 'Hispanic and Latinx community and culture' },
    { name: 'Jewish Culture Club (JCC)', cat: 'aff', note: 'Jewish culture and community' },
    { name: 'SAGE', cat: 'aff', note: 'Students Advocating for Gender Equality' },
    // Recreational sport & outdoor (6)
    { name: 'Pickleball Club', cat: 'rec', note: 'Casual pickleball play' },
    { name: 'Ski Club', cat: 'rec', note: 'Skiing outings and interest' },
    { name: 'Ultimate Frisbee Club', cat: 'rec', note: 'Casual ultimate frisbee' },
    { name: 'Mountain Biking Club', cat: 'rec', note: 'Mountain biking outings' },
    { name: 'Lift Club', cat: 'rec', note: 'Weightlifting and strength training' },
    { name: 'Girls in Sports', cat: 'rec', note: 'Supports and encourages girls’ involvement in athletics' },
    // Application / election-based governance (4)
    { name: 'Foundation Board', cat: 'gov', note: 'Student board (application / election-based)' },
    { name: 'Honor Council', cat: 'gov', note: 'Administers the School’s honor system' },
    { name: 'Investment Board', cat: 'gov', note: 'Student investment / finance board' },
    { name: 'National Honor Society', cat: 'gov', note: 'Academic honor society' },
    // Publications / media (3)
    { name: 'Charger Newspaper', cat: 'media', note: 'Student news publication' },
    { name: 'The Science Journal', cat: 'media', note: 'Student STEM journal' },
    { name: 'PDSN (Providence Day Sports Network)', cat: 'media', note: 'Student sports broadcast / media outlet' },
  ],
  divisions: [
    {
      label: 'Middle School',
      text: 'Continues Model U.N., Science Olympiad, robotics, STEM clubs, and Student Council alongside the IDEAS@PD program — no separate enumerated roster published (arts and Street Soccer out of scope)',
      tag: 'School-reported',
    },
    {
      label: 'Lower School (TK–5)',
      text: 'Club life runs through Extended Day and enrichment (Auerbach Hall) rather than a named student-club roster — structural, not a gap',
      tag: 'Structural',
    },
  ],
  source:
    "providenceday.org — Upper School Club List '25–26 · 82 organizations − 5 arts = 77 in scope (40 interest + 15 competitive + 9 affinity + 6 recreational + 4 election-based + 3 media)",
}

// ── Charlotte Country Day ── HONEST-GAP by design. Country Day publishes a club
// COUNT (~45–50) but not a complete enumerated roster; the full list lives in the
// login-gated BucsNet / Veracross portal. Per the persist-fetched-data standard we
// enumerate ONLY the clubs confirmed in public sources — no clubs or counts are
// invented. The division/overview notes carry the count reconciliation and the
// login-gated gap. From src/content/student-clubs/charlotte-country-day.json.
const CHARLOTTE_COUNTRY_DAY: ClubCatalog = {
  verdict:
    'About 45–50 Upper School clubs are published, but no full roster is — only the clubs confirmed in public sources are listed here.',
  verdictHint: 'Filter the confirmed spine; the complete catalog is login-gated by design.',
  countNoun: 'confirmed clubs',
  categories: [
    { key: 'gov', short: 'Governance', full: 'Governance / leadership' },
    { key: 'acad', short: 'Academic', full: 'Academic / competition' },
    { key: 'svc', short: 'Service', full: 'Service' },
    { key: 'aff', short: 'Affinity', full: 'Affinity / special interest' },
  ],
  clubs: [
    { name: 'Model United Nations', cat: 'acad', note: 'Confirmed via school news across multiple conferences; the best-documented competitive program' },
    { name: 'Robotics', cat: 'acad', note: 'Confirmed by name through a student profile in the news archive; no public results found' },
    { name: 'Honor Council', cat: 'gov', note: 'Core governance body administering the school honor system' },
    { name: 'Student Government', cat: 'gov', note: 'Core student governance and leadership body' },
    { name: 'Big Brothers Big Sisters', cat: 'svc', note: 'Mentorship / service organization named in the School Profile' },
    { name: 'Environmental Council', cat: 'svc', note: 'Special-interest / service group confirmed via a student profile' },
    { name: 'Interfaith Club', cat: 'aff', note: 'Affinity / special-interest group confirmed via school news and the DEIB page' },
  ],
  divisions: [
    {
      label: 'Count reconciliation',
      text: 'The Upper School page cites "nearly 50 clubs"; the 2025–26 School Profile lists "45 different clubs and activities." We report the range (about 45–50) rather than a single figure. Also documented but not separately enumerable here: 9 Upper School affinity groups (DEIB page; marketing elsewhere cites 7) and 5 honor societies.',
      tag: 'School-reported',
    },
    {
      label: 'Roster gap',
      text: 'Country Day publishes the club count but not a complete, enumerated public roster — the full list lives in the password-protected BucsNet / Veracross portal and student handbook. This is a publication gap, not a search-depth one: the seven clubs above are the confirmed public spine, not the whole catalog.',
      tag: 'Gap flagged',
    },
  ],
  source:
    'charlottecountryday.org — Upper School · School Profile 2025–26 & 2024–25 · About · DEIB Our Program (confirmed public sources only; full roster login-gated)',
}

const CATALOG: Record<string, ClubCatalog> = {
  'charlotte-latin': CHARLOTTE_LATIN,
  'providence-day': PROVIDENCE_DAY,
  'charlotte-country-day': CHARLOTTE_COUNTRY_DAY,
}

/** The interest-index catalog for a school, or undefined to fall back to prose. */
export function clubCatalog(schoolSlug: string): ClubCatalog | undefined {
  return CATALOG[schoolSlug]
}
