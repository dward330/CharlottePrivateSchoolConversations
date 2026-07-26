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

// ── Cannon ── HONEST-GAP by design, like Country Day. Cannon publishes no
// centralized chartered Upper School club directory; its student-initiated model
// means the live roster shifts year to year. We enumerate ONLY the organizations
// Cannon names directly on its own pages / Upper School Deans' Daily Download —
// representative, explicitly NOT exhaustive; no count is asserted. From
// src/content/student-clubs/cannon.json ("Catalog Upper School"). Two families
// (honor societies; signature competitive programs) live in their own cards.
const CANNON: ClubCatalog = {
  verdict:
    'Cannon publishes no chartered club directory — only the organizations it names directly are listed here; the live roster shifts year to year by design.',
  verdictHint: 'Filter the representative spine; the full Upper School roster is not publicly disclosed.',
  countNoun: 'named orgs',
  categories: [
    { key: 'comp', short: 'Competitive', full: 'Competitive program' },
    { key: 'aff', short: 'Affinity', full: 'Affinity / belonging' },
    { key: 'svc', short: 'Service', full: 'Service' },
    { key: 'media', short: 'Publications', full: 'Student publication' },
    { key: 'interest', short: 'Interest', full: 'Interest / social' },
  ],
  clubs: [
    { name: 'DECA', cat: 'comp', note: 'Business competition team; reached 2026 CDC finalist standing (see Signature Competitive Programs)' },
    { name: 'Model UN', cat: 'comp', note: 'Academic competition team; earned awards at Duke’s DUMUNC (see Signature Competitive Programs)' },
    { name: 'Cannon School Gaming (CSG)', cat: 'comp', note: 'Cross-division esports program with a dedicated lab since 2021' },
    { name: 'Affinity Groups', cat: 'aff', note: 'Named as a flagship category of Upper School club life; detailed in the Affinity & Identity Groups card' },
    { name: 'Habitat Club', cat: 'svc', note: 'Cited as a representative service-based club' },
    { name: 'Yearbook (The Flashback)', cat: 'media', note: 'Active US publication with student editors and a dedication ceremony' },
    { name: 'Star Wars Club', cat: 'interest', note: 'Cited as a representative “fun and adventurous” interest club' },
  ],
  divisions: [
    {
      label: 'Student-initiated model',
      text: 'Cannon frames Upper School club life as student-led and faculty-supported, meeting during and after school; students may found new clubs when their interests aren’t already represented, so the active roster changes annually.',
      tag: 'School-reported',
    },
    {
      label: 'Roster gap',
      text: 'Cannon does not publish a centralized, chartered Upper School club directory. The organizations above are those it names on its own pages and Upper School blog — representative, not exhaustive. A precise club count is not supportable from public sources.',
      tag: 'Gap flagged',
    },
  ],
  source:
    'cannonschool.org — Upper School Student Life · Esports · Deans’ Daily Download · Niche (representative named orgs only; no public chartered directory)',
}

// ── Charlotte Christian ── the fullest enumerated roster of the honest-gap set:
// 35 named organizations across JK–12, assembled from several school pages (no
// single directory). The filterable grid holds the 23 Upper School orgs by the
// school's own four categories (14 clubs, 5 honor societies, 3 leadership/media,
// 1 global-awareness); Middle & Lower School are named minimums in the division
// notes because those offerings rotate / are schedule-embedded. Arts honor
// societies stay in scope per the series rule; esports is in scope. From
// src/content/student-clubs/charlotte-christian.json ("Clubs and Activities
// Landscape").
const CHARLOTTE_CHRISTIAN: ClubCatalog = {
  verdict:
    '23 named Upper School organizations across four categories, part of 35 across JK–12; the younger divisions rotate, so their counts are named minimums.',
  verdictHint: 'Filter the Upper School roster by category; there is no single published directory.',
  countNoun: 'US orgs',
  categories: [
    { key: 'club', short: 'Student clubs', full: 'Student club' },
    { key: 'honor', short: 'Honor societies', full: 'Honor society' },
    { key: 'lead', short: 'Leadership & media', full: 'Leadership / media' },
    { key: 'global', short: 'Global awareness', full: 'Global awareness' },
  ],
  clubs: [
    // Upper School student clubs (14)
    { name: 'Athletes in Action', cat: 'club', note: 'Upper School student club' },
    { name: 'Best Buddies', cat: 'club', note: 'Friendship and inclusion for people with intellectual and developmental disabilities' },
    { name: 'Debate', cat: 'club', note: 'Student-led debate club' },
    { name: 'DECA', cat: 'club', note: 'Business, marketing, and entrepreneurship competition chapter' },
    { name: 'Environmental', cat: 'club', note: 'Environmental awareness and stewardship' },
    { name: "Girl's Leadership", cat: 'club', note: 'Leadership development for young women' },
    { name: 'Healthy Lifestyle', cat: 'club', note: 'Wellness and healthy-living club' },
    { name: 'Letters of Light', cat: 'club', note: 'Encouragement / letter-writing service club' },
    { name: 'Movie', cat: 'club', note: 'Film-appreciation interest club' },
    { name: 'Spikeball', cat: 'club', note: 'Recreational Spikeball club' },
    { name: 'Ultimate Frisbee', cat: 'club', note: 'Recreational ultimate frisbee club' },
    { name: 'Latin', cat: 'club', note: 'Latin language and classical culture' },
    { name: 'Model UN', cat: 'club', note: 'Model United Nations diplomacy and debate' },
    { name: 'Esports', cat: 'club', note: 'Competitive video-gaming (also a Middle School after-school club)' },
    // Honor societies (5)
    { name: 'National Honor Society', cat: 'honor', note: 'Academic honor society' },
    { name: 'Spanish National Honor Society', cat: 'honor', note: 'Spanish-language honor society' },
    { name: 'Tri-M Music Honor Society', cat: 'honor', note: 'Music honor society' },
    { name: 'National Art Honor Society', cat: 'honor', note: 'Visual-arts honor society (retained per the series rule)' },
    { name: 'International Thespian Society', cat: 'honor', note: 'Theater honor society (retained per the series rule)' },
    // Leadership / media (3)
    { name: 'Prefect Leadership System', cat: 'lead', note: 'Nine student leadership roles across the Upper School' },
    { name: 'Knights Knews', cat: 'lead', note: 'Student broadcast / news media program' },
    { name: 'VEX Robotics Competition Team', cat: 'lead', note: 'Competitive VEX robotics team (grades 9–12)' },
    // Global awareness (1)
    { name: 'Global Knights Club', cat: 'global', note: 'Global-awareness student club (also a Middle School student group)' },
  ],
  divisions: [
    {
      label: 'Middle School (5–8)',
      text: 'Named minimum: Mountain Biking, Chess (incl. a competitive Chess Team), and Esports, plus a Global Knights student group — some offerings are schedule-embedded and not posted publicly, so this is a floor, not a total.',
      tag: 'Named minimum',
    },
    {
      label: 'Lower School (JK–4)',
      text: 'Named minimum: eight rotating after-school enrichment clubs — Art, Coding, Flag Football, Lacrosse, Running, Soccer, STEM, and a Robotics Team (representative). Enrichment rotates weekly and the public list is explicitly partial.',
      tag: 'Named minimum',
    },
    {
      label: 'Count & scope',
      text: '35 named in-scope organizations JK–12 (23 Upper + 4 Middle + 8 Lower); no single published directory. Excluded as non-clubs: the “kingdom” system, Reading Knights, Knights Serve, and parent/community bodies (PTF, boosters, etc.). Could not confirm: a Middle School student council or an NJHS chapter.',
      tag: 'School-reported',
    },
  ],
  source:
    'charlottechristian.com — Upper School · Middle School · Extended Day & After School Clubs · Diversity & Belonging · CCS News (roster assembled from several pages; no single directory)',
}

// ── Davidson Day ── the thinnest, most honest case. Davidson Day publishes NO
// public club roster on its own site; student life runs through programs,
// councils, and traditions (AFAR, Community Engagement Councils, House System,
// Patriot Pals). The only source that names individual clubs is the third-party
// aggregator PrivateSchoolReview — single-source, undated, no division breakdown,
// and uncorroborated against the school. We therefore list ONLY the genuine
// non-athletic/non-arts interest & academic clubs from that source, mark them
// clearly as aggregator-sourced, and let the division notes carry the gaps and
// what the school itself documents. No clubs, counts, or divisions are invented.
// From source-material/student-clubs/davidson-day/Davidson Day - Clubs - Club
// Catalog and Overview.md (web research, 2026-07-26).
const DAVIDSON_DAY: ClubCatalog = {
  verdict:
    'Davidson Day publishes no official club roster — student life runs through programs, councils, and traditions. These interest clubs are named only by a third-party aggregator and are unverified by the school.',
  verdictHint: 'Filter the aggregator-listed clubs; the school itself documents no public roster.',
  countNoun: 'aggregator-listed clubs',
  categories: [
    { key: 'acad', short: 'Academic', full: 'Academic / competition' },
    { key: 'interest', short: 'Interest', full: 'Interest' },
    { key: 'svc', short: 'Service', full: 'Service / environmental' },
  ],
  clubs: [
    { name: 'Debate Club', cat: 'acad', note: 'Aggregator-listed (PrivateSchoolReview); unconfirmed on the school site' },
    { name: 'Science Club', cat: 'acad', note: 'Aggregator-listed (PrivateSchoolReview); unconfirmed on the school site' },
    { name: 'Math Olympiad', cat: 'acad', note: 'Academic-competition club, aggregator-listed; unconfirmed on the school site' },
    { name: 'Chess Club', cat: 'interest', note: 'Aggregator-listed (PrivateSchoolReview); unconfirmed on the school site' },
    { name: 'Film Club', cat: 'interest', note: 'Aggregator-listed (PrivateSchoolReview); unconfirmed on the school site' },
    { name: 'Creative Writing Club', cat: 'interest', note: 'Literary interest club, aggregator-listed; unconfirmed on the school site' },
    { name: 'Outdoor Club', cat: 'interest', note: 'Aggregator-listed (PrivateSchoolReview); unconfirmed on the school site' },
    { name: 'Environmental Club', cat: 'svc', note: 'Aggregator-listed (PrivateSchoolReview); unconfirmed on the school site' },
    { name: 'Community Service Club', cat: 'svc', note: 'Aggregator-listed (PrivateSchoolReview); unconfirmed on the school site' },
  ],
  divisions: [
    {
      label: 'No official roster',
      text: 'Davidson Day’s own site (davidsonday.org) publishes no enumerated club list — every division and student-life page frames activities as programs, councils, and traditions. A real activities list likely lives behind the login-gated Patriot Connect portal, which could not be accessed.',
      tag: 'Gap flagged',
    },
    {
      label: 'Single-source clubs',
      text: 'The nine clubs above appear only on PrivateSchoolReview (a third-party aggregator; undated, no division breakdown) and are uncorroborated against the school. Art, Guitar, and Photography clubs from that list are excluded as fine-arts; SGA, Honor Council, and the Student Ambassador Program are governance/programs, not interest clubs.',
      tag: 'Unverified',
    },
    {
      label: 'What the school documents',
      text: 'Verified school-run structures (in their own dossiers, not clubs): AFAR archaeology field research, the Community Engagement Councils and Patriot Week service framework, the Student Diversity Council, National Honor Society, the Middle School Battle of the Books team, and traditions like the House System and Patriot Pals.',
      tag: 'School-reported',
    },
  ],
  source:
    'privateschoolreview.com — Davidson Day profile (single-source, unverified) · davidsonday.org — Upper/Middle School, Community & Culture (programs/councils/traditions; no public club roster)',
}

const CATALOG: Record<string, ClubCatalog> = {
  'charlotte-latin': CHARLOTTE_LATIN,
  'providence-day': PROVIDENCE_DAY,
  'charlotte-country-day': CHARLOTTE_COUNTRY_DAY,
  cannon: CANNON,
  'charlotte-christian': CHARLOTTE_CHRISTIAN,
  'davidson-day': DAVIDSON_DAY,
}

/** The interest-index catalog for a school, or undefined to fall back to prose. */
export function clubCatalog(schoolSlug: string): ClubCatalog | undefined {
  return CATALOG[schoolSlug]
}
