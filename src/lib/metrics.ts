// Metric normalization.
//
// The raw subtopic strings in schools.json drift across schools ("Theater" vs
// "Theatre", "Win-Loss Records" vs "WinLoss Records", "Coaches Pedigree and
// Continuity" vs "Coaches, Pedigree and Continuity", sport-specific "National
// Football/Basketball/Swimming Profile"). If we compared on the raw strings, schools
// would show false N/A gaps just from naming. So we canonicalize each subtopic to a
// stable metric { key, label } per topic before building any comparison.
//
// Rules are ordered — first match wins — so put specific patterns before generic ones.
// A subtopic that matches no rule becomes its own metric (slugified). Returning null
// hides a subtopic from the parent-facing UI (internal artifacts like NotebookLM
// prompts and the aggregate "Sources referenced" section).

export type Metric = { key: string; label: string }
type Rule = { match: RegExp; key: string; label: string }

// Hidden everywhere (both the metrics axis and the detail sections).
//
// The governance/student-leadership subtopics are dropped by request: the
// "Governance & Student Leadership" card is removed from every school's Student
// Clubs page. These anchored patterns match only the student-clubs subtopics that
// used to feed that card (verified not to collide with any other topic), including
// the ones that fuse governance with service or student media.
const HIDE = [
  /notebooklm/i,
  /^sources? referenced/i,
  /^governance\b/i,
  /^leadership,?\s+governance/i,
  /^service,?\s+leadership/i,
]

const RULES: Record<string, Rule[]> = {
  // Course Offerings renders as three per-division cards driven by
  // data/courseOfferings.ts, not by the ingested prose. The single research
  // file per school ("… - Course Offerings - Curriculum Guide.md") folds onto
  // one key so SchoolDetail can swap in the division cards; without a rules
  // array the subtopic would slugify into an orphan prose section.
  'course-offerings': [
    { match: /curriculum guide|course offerings|program of stud/i, key: 'curriculum', label: 'Course Offerings' },
  ],
  'after-school': [
    { match: /program overview/i, key: 'overview', label: 'Program Overview' },
    { match: /program details/i, key: 'details', label: 'Program Details' },
    { match: /enrichment|swim|youth athletics/i, key: 'enrichment', label: 'Enrichment & Activities' },
    { match: /extended (day|care)|clubhouse|hawks club|talons|after ?care/i, key: 'aftercare', label: 'Extended Day / Aftercare' },
    // Pricing notes fold into the same card as the deep-research report so the cost
    // matrix appears inside "In-Depth Report".
    { match: /pricing|cost/i, key: 'in-depth-report', label: 'In-Depth Report' },
    { match: /deep research/i, key: 'in-depth-report', label: 'In-Depth Report' },
  ],
  // The deep-dive report is rendered by a dedicated component keyed to
  // 'in-depth-report' (see pages/SchoolDetail.tsx), so it must land on that key.
  // The tuition-history provenance file arrives as one section per markdown
  // heading; those all fold into a single card rather than becoming seven.
  'financial-aid-tuition': [
    { match: /deep dive report|deep research/i, key: 'in-depth-report', label: 'In-Depth Report' },
    {
      match: /tuition history|provenance|source snapshots|tuition by (band|division)|year-over-year|reduced-day|captured in the same snapshots|published \d+(\.\d+)?% increase/i,
      key: 'tuition-history',
      label: 'Tuition History & Sources',
    },
  ],
  'college-support': [
    { match: /academic case/i, key: 'academic-case', label: 'Academic Case' },
    { match: /application support/i, key: 'application-support', label: 'Application Support' },
    { match: /counseling engine/i, key: 'counseling-engine', label: 'Counseling Engine' },
    { match: /fit and/i, key: 'fit-rank', label: 'Fit & Rank' },
    { match: /institutional leverage/i, key: 'institutional-leverage', label: 'Institutional Leverage' },
    { match: /outcomes/i, key: 'outcomes', label: 'Placement Outcomes' },
    { match: /standing out/i, key: 'standing-out', label: 'Standing Out' },
    { match: /deep research/i, key: 'in-depth-report', label: 'In-Depth Report' },
  ],
  sports: [
    { match: /awards and honors/i, key: 'awards', label: 'Awards & Honors' },
    { match: /championships/i, key: 'championships', label: 'Championships' },
    { match: /coach/i, key: 'coaches', label: 'Coaches: Pedigree & Continuity' },
    // "College Commitments <years>" is the same material as the D1 matriculation
    // note; without this it slugified into its own orphan section on every school.
    { match: /d1|matriculation|college commitments/i, key: 'matriculation', label: 'D1 / Top-College Matriculation' },
    { match: /facilities/i, key: 'facilities', label: 'Facilities & Infrastructure' },
    { match: /nil/i, key: 'nil', label: 'NIL Landscape' },
    { match: /national.*profile|^national profile/i, key: 'national-profile', label: 'National Profile' },
    { match: /power 4/i, key: 'power-4', label: 'Power 4 Offers' },
    { match: /professional athletes/i, key: 'pros', label: 'Professional Athletes' },
    { match: /sports medicine/i, key: 'sports-medicine', label: 'Sports Medicine & Performance' },
    { match: /sports offered/i, key: 'sports-offered', label: 'Sports Offered' },
    { match: /top 100|recruiting/i, key: 'recruiting', label: 'Top-100 Recruiting Rankings' },
    { match: /win.?loss/i, key: 'win-loss', label: 'Win–Loss Records' },
  ],
  'student-clubs': [
    { match: /honor societ/i, key: 'honor-societies', label: 'Honor Societies' },
    { match: /affinity|identity|diversity|belonging|global awareness/i, key: 'affinity', label: 'Affinity & Identity Groups' },
    { match: /publication|student media|\bmedia\b/i, key: 'media', label: 'Publications & Media' },
    { match: /service|civic|outreach|community engagement/i, key: 'service', label: 'Service & Civic Engagement' },
    { match: /academic|competit/i, key: 'academic-clubs', label: 'Academic & Competitive Clubs' },
    { match: /lower (school|and middle)|middle school/i, key: 'lower-middle', label: 'Lower / Middle School Activities' },
    { match: /catalog|landscape|club.*overview|descriptions|clubs and activities/i, key: 'catalog', label: 'Club Catalog & Overview' },
    { match: /signature|tradition|thematic|participation|popularity|special interest|recreational|afar|archaeology/i, key: 'signature', label: 'Signature Programs & Traditions' },
  ],
  'the-arts': [
    { match: /awards and recognition/i, key: 'awards', label: 'Awards & Recognition' },
    { match: /program overview/i, key: 'overview', label: 'Program Overview' },
    { match: /visual arts/i, key: 'visual-arts', label: 'Visual Arts' },
    { match: /performing arts/i, key: 'performing-arts', label: 'Performing Arts' },
    { match: /music/i, key: 'music', label: 'Music' },
    { match: /theat|drama/i, key: 'theatre', label: 'Theatre & Drama' },
    { match: /digital arts/i, key: 'digital-arts', label: 'Digital Arts' },
    { match: /course offerings/i, key: 'courses', label: 'Course Offerings' },
    { match: /facilities/i, key: 'facilities', label: 'Facilities' },
    { match: /deep research/i, key: 'in-depth-report', label: 'In-Depth Report' },
  ],
}

// Explicit order for the topic section headers themselves (the "After School",
// "Sports"… bands on a school page and the topic list on Home). Topic slugs not
// listed fall to the end in manifest order (alphabetical). Edit this to reorder the
// top-level sections without touching source-material folder names.
const TOPIC_ORDER: string[] = [
  'course-offerings',
  'student-clubs',
  'the-arts',
  'sports',
  'college-support',
  'after-school'
]

/** Stable-sort topic slugs into the explicit TOPIC_ORDER; unlisted slugs keep order. */
export function orderTopicSlugs(slugs: string[]): string[] {
  const rank = (s: string) => {
    const i = TOPIC_ORDER.indexOf(s)
    return i === -1 ? TOPIC_ORDER.length : i
  }
  return slugs
    .map((s, i) => [s, i] as const)
    .sort((a, b) => rank(a[0]) - rank(b[0]) || a[1] - b[1])
    .map(([s]) => s)
}

// Explicit page order for a topic's sub-sections. Keys not listed keep their document
// order after the listed ones; topics without an entry keep document order entirely.
const SECTION_ORDER: Record<string, string[]> = {
  'after-school': ['overview', 'details', 'enrichment', 'aftercare', 'in-depth-report'],
  'the-arts': ['overview', 'awards', 'performing-arts', 'visual-arts', 'facilities', 'in-depth-report'],
}

/** Stable-sort metric keys into the topic's explicit page order, if it has one. */
export function orderMetricKeys(topicSlug: string, keys: string[]): string[] {
  const order = SECTION_ORDER[topicSlug]
  if (!order) return keys
  const rank = (k: string) => {
    const i = order.indexOf(k)
    return i === -1 ? order.length : i
  }
  return keys
    .map((k, i) => [k, i] as const)
    .sort((a, b) => rank(a[0]) - rank(b[0]) || a[1] - b[1])
    .map(([k]) => k)
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Canonicalize a raw subtopic to a metric, or null if it should be hidden. */
export function normalizeMetric(topicSlug: string, subtopic: string): Metric | null {
  if (HIDE.some((re) => re.test(subtopic))) return null
  const rules = RULES[topicSlug] ?? []
  for (const rule of rules) {
    if (rule.match.test(subtopic)) return { key: rule.key, label: rule.label }
  }
  // Unknown topic or subtopic: stand up a metric from the raw label so new
  // source-material still renders (just without hand-tuned grouping).
  return { key: slugify(subtopic), label: subtopic }
}

/**
 * How a subtopic resolved — for tooling, not the UI.
 *
 * The fallthrough path in `normalizeMetric` is deliberately silent so new
 * source-material always renders, which also means an unmatched subtopic looks
 * identical to a matched one on screen. `scripts/check_metrics.mjs` uses this to
 * tell the two apart. It mirrors `normalizeMetric`'s branches exactly; keep the
 * two in step if that function's logic changes.
 */
export type MetricResolution =
  | { status: 'hidden' }
  | { status: 'matched'; metric: Metric }
  | { status: 'no-topic-rules'; metric: Metric }
  | { status: 'fellthrough'; metric: Metric }

export function resolveMetric(topicSlug: string, subtopic: string): MetricResolution {
  if (HIDE.some((re) => re.test(subtopic))) return { status: 'hidden' }
  const rules = RULES[topicSlug]
  for (const rule of rules ?? []) {
    if (rule.match.test(subtopic)) {
      return { status: 'matched', metric: { key: rule.key, label: rule.label } }
    }
  }
  const metric = { key: slugify(subtopic), label: subtopic }
  return { status: rules ? 'fellthrough' : 'no-topic-rules', metric }
}
