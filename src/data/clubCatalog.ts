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
// publishes no full roster (Country Day, Davidson Day), only the clubs actually
// confirmed are listed — no clubs or counts are invented. This app is public
// facing, so research-gap and confidence framing stays in these maintainer
// comments and out of the rendered strings.

import { localized, overlayIndex } from '../lib/localizeData.ts'

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
  /** Small outline tag, e.g. 'School-reported', 'Structural', 'Named minimum'. */
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

// ── Charlotte Country Day ── the published count is ~45–50 Upper School clubs.
//
// MAINTAINER NOTE (not surfaced in the public app): Country Day publishes that
// count but not a complete enumerated roster — the full list lives in the
// login-gated BucsNet / Veracross portal. Per the persist-fetched-data standard we
// enumerate ONLY the clubs confirmed in public sources; no clubs or counts are
// invented, so the seven below are a public spine rather than the whole catalog.
// From src/content/student-clubs/charlotte-country-day.json.
const CHARLOTTE_COUNTRY_DAY: ClubCatalog = {
  verdict:
    'About 45–50 Upper School clubs and activities, spanning governance, academics, service, and affinity groups.',
  verdictHint: 'Filter by category to see the clubs in each area.',
  countNoun: 'clubs',
  categories: [
    { key: 'gov', short: 'Governance', full: 'Governance / leadership' },
    { key: 'acad', short: 'Academic', full: 'Academic / competition' },
    { key: 'svc', short: 'Service', full: 'Service' },
    { key: 'aff', short: 'Affinity', full: 'Affinity / special interest' },
  ],
  clubs: [
    { name: 'Model United Nations', cat: 'acad', note: 'Competes across multiple conferences; the flagship competitive program' },
    { name: 'Robotics', cat: 'acad', note: 'Upper School robotics program' },
    { name: 'Honor Council', cat: 'gov', note: 'Core governance body administering the school honor system' },
    { name: 'Student Government', cat: 'gov', note: 'Core student governance and leadership body' },
    { name: 'Big Brothers Big Sisters', cat: 'svc', note: 'Mentorship / service organization named in the School Profile' },
    { name: 'Environmental Council', cat: 'svc', note: 'Special-interest / service group' },
    { name: 'Interfaith Club', cat: 'aff', note: 'Affinity / special-interest group named on the DEIB page' },
  ],
  divisions: [
    {
      label: 'Also on offer',
      text: 'The Upper School page cites "nearly 50 clubs" and the 2025–26 School Profile lists "45 different clubs and activities." Beyond the clubs above, the school also runs 9 Upper School affinity groups (DEIB page) and 5 honor societies.',
      tag: 'School-reported',
    },
  ],
  source:
    'charlottecountryday.org — Upper School · School Profile 2025–26 & 2024–25 · About · DEIB Our Program',
}

// ── Cannon ── HONEST-GAP by design, like Country Day, but CONSOLIDATED: this one
// card is Cannon's whole student-clubs view. It merges the named, enumerable
// organizations from four dossiers — Catalog Upper School, Middle School,
// Affinity & Identity Groups, and Service Learning & Community Engagement — so on
// the Cannon page those four render only here (the merge is applied in
// SchoolDetail.tsx, Cannon-only). Only orgs Cannon names DIRECTLY are listed;
// each note carries its grade band. The prose those sections also contain
// (the DBE framework, Lower School structure, service scale/traditions, the
// student-initiated model) is folded into the division notes so nothing is lost.
// Still representative, NOT exhaustive — Cannon publishes no chartered directory,
// so no precise count is asserted. Honor societies and the signature competitive
// programs (robotics deep-dive, DECA/MUN results) keep their own cards.
const CANNON: ClubCatalog = {
  verdict:
    'One consolidated view of every student organization Cannon names directly, across Upper, Middle, and Lower School — the school publishes no chartered directory, so this is representative, not exhaustive.',
  verdictHint: 'Filter the named spine by interest; the full roster shifts year to year and is not fully disclosed.',
  countNoun: 'named orgs',
  categories: [
    { key: 'comp', short: 'Competitive', full: 'Competitive program' },
    { key: 'acad', short: 'Academic teams', full: 'Academic competition team' },
    { key: 'gov', short: 'Governance', full: 'Student leadership' },
    { key: 'svc', short: 'Service', full: 'Service' },
    { key: 'aff', short: 'Affinity', full: 'Affinity / belonging' },
    { key: 'media', short: 'Publications', full: 'Student publication' },
    { key: 'interest', short: 'Interest', full: 'Interest / social' },
  ],
  clubs: [
    // Competitive programs (cross-division / Upper School)
    { name: 'Brainy Yaks Robotics', cat: 'comp', note: 'Flagship FLL robotics team (grades 6–10); FLL World top 100 in ’24 & ’25 (see Signature Competitive Programs)' },
    { name: 'DECA', cat: 'comp', note: 'Upper School business competition team; 2026 CDC finalist standing (see Signature Competitive Programs)' },
    { name: 'Cannon School Gaming (CSG)', cat: 'comp', note: 'Cross-division esports program with a dedicated lab since 2021' },
    // Academic competition teams (Middle School, named by the school)
    { name: 'Model United Nations', cat: 'acad', note: 'Middle & Upper School; MS team named among the academic-competition teams, US team earned awards at Duke’s DUMUNC' },
    { name: 'Science Olympiad', cat: 'acad', note: 'Middle School faculty-facilitated academic-competition team' },
    { name: 'Battle of the Books', cat: 'acad', note: 'Middle School reading-competition team (plus an Elementary Battle of the Books)' },
    { name: 'Envirothon', cat: 'acad', note: 'Middle School environmental academic-competition team' },
    // Student leadership / governance (all three divisions)
    { name: 'Upper School Student Council', cat: 'gov', note: 'Elected Upper School student governance body' },
    { name: 'Middle School Student Council', cat: 'gov', note: 'Grades 5–8, ~4 elected students per grade; plans events and supports student life' },
    { name: 'Lower School Student Council', cat: 'gov', note: 'Elected Lower School leadership; year-long core-values initiatives' },
    // Service (named clubs / teams)
    { name: 'Habitat Club', cat: 'svc', note: 'Upper School service club; Habitat for Humanity builds incl. Winterm trips' },
    { name: 'Special Olympics Team (MS)', cat: 'svc', note: 'Middle School team coordinating volunteers for the Special Olympics of Cabarrus County' },
    // Affinity
    { name: 'Affinity Groups', cat: 'aff', note: 'Flagship category of Upper School club life under the DBE framework; no named roster published (Black affinity groups cited in reviews)' },
    // Publications
    { name: 'Yearbook (The Flashback)', cat: 'media', note: 'Active Upper School publication with student editors and a dedication ceremony' },
    // Interest
    { name: 'Star Wars Club', cat: 'interest', note: 'Cited as a representative “fun and adventurous” Upper School interest club' },
  ],
  divisions: [
    {
      label: 'Student-initiated model',
      text: 'Cannon frames club life as student-led and faculty-supported, meeting during and after school (Middle School clubs meet at lunch or a designated club time). Students may found new clubs when their interests aren’t represented, so the active roster changes annually.',
      tag: 'School-reported',
    },
    {
      label: 'Lower School (JrK–4)',
      text: 'Runs on elected student leadership, signature traditions, Adaptive Expertise (AE) “passion class” days, and after-school enrichment (After School Program + Beyond the Bell) rather than a roster of standing interest clubs — a structural difference, not a gap.',
      tag: 'Structural',
    },
    {
      label: 'Service & belonging',
      text: 'Service runs deep — ~15,000 school-wide hours a year (not a graduation requirement), Senior Capstone philanthropy projects, and a House Day of Service — but as frameworks/traditions rather than standing clubs. Affinity work sits under the Diversity, Belongingness & Engagement (DBE) commitment.',
      tag: 'School-reported',
    },
  ],
  source:
    'cannonschool.org — Upper / Middle / Lower School Student Life · Esports · Student Profile · Deans’ Daily Download · Niche (named orgs only; no public chartered directory)',
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

// ── Davidson Day ── the thinnest slate. Student life also runs through programs,
// councils, and traditions (AFAR, Community Engagement Councils, House System,
// Patriot Pals), carried in the division note.
//
// MAINTAINER NOTE (not surfaced in the public app): the individual club names
// below come from the third-party aggregator PrivateSchoolReview — single-source,
// undated, no division breakdown, and uncorroborated against davidsonday.org,
// which publishes no enumerated roster of its own. Only genuine non-athletic /
// non-arts interest & academic clubs from that source are listed; art, guitar,
// and photography are excluded as fine-arts, and SGA / Honor Council / Student
// Ambassadors as governance. No clubs, counts, or divisions are invented. From
// source-material/student-clubs/davidson-day/Davidson Day - Clubs - Club Catalog
// and Overview.md (web research, 2026-07-26).
// ── Covenant Day ── the school publishes no club directory of its own; this
// is the documented floor after filtering the third-party roster for division
// and type (paid lessons, curricular ensembles and club sports excluded from
// the count, carried in the divisions note instead).
const COVENANT_DAY: ClubCatalog = {
  verdict:
    'A documented floor of Upper School clubs and honor societies — the school publishes no directory, so this is what public sources confirm.',
  verdictHint: 'Filter by category to see the clubs in each area.',
  countNoun: 'documented orgs',
  categories: [
    { key: 'acad', short: 'Academic', full: 'Academic / competition' },
    { key: 'honor', short: 'Honor', full: 'Honor societies' },
    { key: 'spirit', short: 'Spirit', full: 'Spirit / leadership' },
  ],
  clubs: [
    { name: 'Mock Trial', cat: 'acad', note: 'Flagship — 2025 state runner-up courtroom artist' },
    { name: 'Robotics (First Lego League)', cat: 'acad', note: 'FLL competition robotics' },
    { name: 'Sustainability Engineering', cat: 'acad', note: 'The R&S department’s club arm' },
    { name: 'Latin (JCL) Club', cat: 'acad', note: 'Junior Classical League chapter' },
    { name: 'French Club', cat: 'acad', note: 'Language club' },
    { name: 'Book Club', cat: 'acad', note: 'Reading / literary club' },
    { name: 'Beta Club', cat: 'honor', note: 'National academic honor + service organization' },
    { name: 'National Honor Society', cat: 'honor', note: 'Scholarship, service, leadership, character' },
    { name: 'National Art Honor Society', cat: 'honor', note: 'Visual-arts achievement' },
    { name: 'Spanish Honor Society', cat: 'honor', note: 'Spanish-language achievement' },
    { name: 'International Thespian Society', cat: 'honor', note: 'Theatre honor society (school-confirmed)' },
    { name: 'Tri-M Music Honor Society', cat: 'honor', note: 'Music honor society (school-confirmed)' },
    { name: 'Covenant Crazies', cat: 'spirit', note: 'The student spirit section' },
    { name: 'Student Council', cat: 'spirit', note: 'Student leadership' },
  ],
  divisions: [
    {
      label: 'Middle & Lower School',
      text: 'Junior First Lego League, the MS Board Game Club, the CDS Children’s Choir (grades 3–5), Goodness Gorillas (the 4th-grade service program), and the Kanuga fifth-grade retreat.',
      tag: 'Documented',
    },
    {
      label: 'Beyond the club roster',
      text: 'The third-party roster also lists paid enrichment (piano/guitar/voice lessons, painting), curricular ensembles (band, choir, theater, worship team), and boys volleyball — a club sport. Those are excluded from the count above. Restore525 runs as both a service program and a credit-bearing course.',
      tag: 'Filtered out',
    },
  ],
  source:
    'privateschoolreview.com — Covenant Day profile (third-party roster) · covenantday.org — academics/high-school, arts/theater, arts/music · ncmocktrial.org',
}

const DAVIDSON_DAY: ClubCatalog = {
  verdict:
    'A compact slate of academic, interest, and service clubs, alongside student life run through programs, councils, and traditions.',
  verdictHint: 'Filter by category to see the clubs in each area.',
  countNoun: 'clubs',
  categories: [
    { key: 'acad', short: 'Academic', full: 'Academic / competition' },
    { key: 'interest', short: 'Interest', full: 'Interest' },
    { key: 'svc', short: 'Service', full: 'Service / environmental' },
  ],
  clubs: [
    { name: 'Debate Club', cat: 'acad', note: 'Academic / competition club' },
    { name: 'Science Club', cat: 'acad', note: 'Academic / competition club' },
    { name: 'Math Olympiad', cat: 'acad', note: 'Academic-competition club' },
    { name: 'Chess Club', cat: 'interest', note: 'Strategy / interest club' },
    { name: 'Film Club', cat: 'interest', note: 'Interest club' },
    { name: 'Creative Writing Club', cat: 'interest', note: 'Literary interest club' },
    { name: 'Outdoor Club', cat: 'interest', note: 'Outdoor / interest club' },
    { name: 'Environmental Club', cat: 'svc', note: 'Environmental / service club' },
    { name: 'Community Service Club', cat: 'svc', note: 'Service club' },
  ],
  divisions: [
    {
      label: 'Beyond the club roster',
      text: 'School-run structures alongside the clubs: AFAR archaeology field research, the Community Engagement Councils and Patriot Week service framework, the Student Diversity Council, National Honor Society, the Middle School Battle of the Books team, and traditions like the House System and Patriot Pals.',
      tag: 'School-reported',
    },
  ],
  source:
    'privateschoolreview.com — Davidson Day profile · davidsonday.org — Upper/Middle School, Community & Culture',
}

const CATALOG: Record<string, ClubCatalog> = {
  'charlotte-latin': CHARLOTTE_LATIN,
  'providence-day': PROVIDENCE_DAY,
  'charlotte-country-day': CHARLOTTE_COUNTRY_DAY,
  cannon: CANNON,
  'charlotte-christian': CHARLOTTE_CHRISTIAN,
  'covenant-day': COVENANT_DAY,
  'davidson-day': DAVIDSON_DAY,
}

/**
 * The interest-index catalog for a school, or undefined to fall back to prose.
 *
 * This layer's prose is extracted under the `catalog.` prefix of the
 * student-clubs overlay — the same file `loadClubsOverlay()` fetches — because
 * it renders as one of that topic's five cards. With no overlay for `lang` the
 * English object is returned by reference (see src/lib/localizeData.ts).
 */
export function clubCatalog(schoolSlug: string, lang = 'en'): ClubCatalog | undefined {
  const en = CATALOG[schoolSlug]
  if (!en || lang === 'en') return en
  // Keys are `<school>:catalog.<field>`, so resolve the entry nested under its
  // prefix and unwrap — that makes walk() build exactly those paths.
  const idx = overlayIndex('student-clubs', lang)
  if (!idx) return en
  return localized({ catalog: en }, idx, schoolSlug).catalog
}
