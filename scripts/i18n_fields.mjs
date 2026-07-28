/**
 * Which fields in the structured research layer are translatable prose.
 *
 * Shared by i18n_extract.mjs and check_translations.mjs so the two can never
 * disagree about what "translatable" means — a field the extractor emits but
 * the checker ignores would drift silently, which is the exact failure mode
 * the hash stamping exists to prevent.
 *
 * The lists are keyed by LEAF KEY (the last path segment), not by full path.
 * `detail` means the same kind of thing in sportsPrograms and afterSchool, and
 * keying by leaf keeps this reviewable at ~40 lines instead of 365 full paths.
 * Where a leaf key is genuinely ambiguous it is resolved by full path in
 * PATH_OVERRIDES below.
 *
 * Classification rule: a field is PROSE if translating it helps a reader who
 * does not read English, and does not falsify the research. Proper nouns,
 * figures, codes and URLs are therefore NOT prose even though they are strings
 * — "Clemson" and "12–1" mean the same in every language, and re-typing them
 * per locale is how tuition and record data drifts between languages.
 */

/* --------------------------------------------------------------- prose -- */

/**
 * Translatable. Sentence- or phrase-level text written by the researcher.
 */
export const PROSE_KEYS = new Set([
  // Card lead text
  'headline', 'subhead', 'text', 'detail', 'footnote', 'note', 'caption',
  'desc', 'hint', 'summary', 'body',
  // Verdict cards — list-of-sentences shapes
  'checklist', 'ask', 'watchouts', 'strengths', 'holdsUp', 'items',
  // Named prose blocks (one per card, researcher-written analysis)
  'honestContext', 'whoRunsIt', 'wordsText', 'caveat', 'rankedRecruits',
  'boardNote', 'bucketsNote', 'worthKnowing', 'scholarshipsNote', 'funnelNote',
  'realityCheck', 'gpaNote', 'ladderNote', 'supportNote', 'basisNote',
  'rosterNote', 'meritNote', 'mechanicsNote', 'careNote', 'pathNote',
  'venueNote', 'catalogIntro', 'leadership', 'broadcast', 'reach',
  'recognizes', 'feedsFrom', 'didNotWin',
  // Human-readable labels and captions
  'label', 'valueLabel', 'gradeLabel', 'panelLabel', 'flatLabel', 'title',
  'kicker', 'verdict', 'result',
  // Tenure and record annotations read as phrases, not bare figures: "since 2002",
  // "long-tenured", "15+ years", "2 OF 3 YRS", "meet-scored", "stroke play",
  // "3rd at state". The numerals inside them are preserved by the translator; the
  // surrounding words are not English-invariant.
  'since', 'tag',
  // Venue metadata ("built 2012–13", "53,000 sq ft, 2001", "renamed 2025"),
  // timeline dates ("May 2023", "July 1, 2025") and season names are phrases with
  // figures embedded, not bare codes. The figures are preserved; the words move.
  'meta', 'date', 'season',
  // Found by scripts/i18n_audit_skips.mjs — each of these was skipped on the
  // strength of its field NAME while its values are phrases:
  //   dismissal    "dismissal 1:00"        (not a bare time)
  //   intensity    "Light touch", "Ramps up", "Senior-weighted"
  //   mechanics    "Applications", "Standardized testing", "Teacher recs"
  //   scholarships "$23M+ merit offers · Class of 2025", "West Point appointment"
  //   words        "catch up with friends", "safe & supervised"
  //   when         "Monthly", "Year-round", "Rotating"
  //   kind         "Play / One-Act", "Mainstage musicals"
  'dismissal', 'intensity', 'mechanics', 'scholarships', 'words', 'when', 'kind',
  // Per-school section headings. CLAUDE.md's i18n standard splits headings by
  // the uniform test: one that is byte-identical across all six schools is
  // chrome and belongs in src/locales/*.json, while one that VARIES per school
  // ("Every acceptance, 2023–2026") is a research finding and stays here. These
  // are the varying kind, so they are prose and must be translated at this
  // layer — the standard explicitly warns against lifting them into a locale
  // file, which would pin the heading to English.
  'enrichmentTitle', 'seasonTitle', 'ledgerTitle', 'ladderTitle', 'mediaTitle',
  'footnoteTitle', 'timelineTitle', 'mechanicsTitle', 'collegesTitle',
  'wordsTitle', 'gpaTitle', 'rhythmTitle', 'catalogTitle', 'scheduleTitle',
  'scheduleNote', 'gpaHint', 'collegesTotal', 'periodsLabel',
  // Photo credits name a publisher and are half descriptive ("Photo: Providence
  // Day School athletics"); the leading noun reads as chrome in Spanish.
  'credit',
  // clubClusters.ts / clubCatalog.ts — the two Student Clubs cards that render
  // from their own hand-maintained modules rather than clubsPrograms/.
  'oneLiner', 'evidenceLabel', 'verdictHint', 'countNoun', 'short', 'full',
])

/* ----------------------------------------------------------- not prose -- */

/**
 * Deliberately NOT translated, with the reason. Anything here is excluded from
 * extraction, so it never reaches model context and never appears in an
 * overlay. Keeping the reasons inline makes this list arguable in review rather
 * than mysterious.
 */
export const SKIP_KEYS = new Map([
  ['url', 'link target'],
  ['src', 'asset path'],
  ['id', 'internal key'],
  ['name', 'proper noun — people, schools, colleges, sports, venues'],
  ['college', 'proper noun'],
  ['conf', 'athletic conference code (ACC, SEC)'],
  ['level', 'recruiting tier code (P4, D1)'],
  ['levels', 'competition-level code (V, JV, MS)'],
  ['cls', 'class year — "\'26"'],
  ['cats', 'internal category code (lac75)'],
  ['sport', 'sport name — matched against English data elsewhere'],
  ['program', 'sport/program name'],
  ['record', 'win–loss figure — "12–1"'],
  ['value', 'numeric stat figure'],
  ['count', 'numeric figure'],
  ['fee', 'currency — localized at render by localizeMoneyText()'],
  ['price', 'currency — localized at render'],
  ['prices', 'currency — localized at render'],
  ['year', 'numeral'],
  ['grades', 'grade code (TK, K, 9–12)'],
  ['grade', 'grade code'],
  ['rankLabel', 'ranking code — "Liberal Rank #2"'],
  ['tier', 'proper noun — "Ivy League"'],
  ['show', 'proper noun — production title'],
  ['ensembles', 'proper noun — ensemble name'],
  ['role', 'job title — see PATH_OVERRIDES, translated where descriptive'],
  ['day', 'weekday code (Mon) — rendered from a chrome key'],
  ['time', 'time literal'],
  ['until', 'time literal'],
  ['hours', 'time literal'],
  ['division', 'division name — see PATH_OVERRIDES'],
  ['width', 'layout number'],
  ['shade', 'colour token'],
  ['startFrac', 'layout number'],
  ['endFrac', 'layout number'],
  ['flags', 'internal render flag'],
  ['show_', 'internal render flag'],
  ['source', 'citation label — see PATH_OVERRIDES'],
  ['sources', 'citation container'],
  ['path', 'career path — proper nouns joined by arrows'],
  ['sportBars', 'container'],
  ['honors', 'container'],
  ['values', 'score-table cell — figures and em-dashes'],
  ['gpa', 'numeral'],
  ['seasonLabels', "season code — \"'23–24\""],
  ['glyph', 'decorative character'],
  ['tagStyle', 'render style token'],
  ['gradeFilters', 'filter chip — chrome-owned, matched by value in the component'],
  ['dayFilters', 'filter chip — chrome-owned'],
  ['opponent', 'proper noun — school name'],
  ['basis', 'billing-period code, mapped to a chrome key at render'],
  ['defaultRow', 'internal row id'],
  ['cat', 'internal category code (interest, comp, aff)'],
  ['key', 'internal object key'],
  ['evidence', 'internal evidence-tier code (verified, reported)'],
])

/**
 * Skips REVIEWED against their actual values (scripts/i18n_audit_skips.mjs) and
 * confirmed correct, even though the audit's heuristic flags them for containing
 * words. Listing them here is what lets the audit report clean, so a genuinely
 * new misclassification stands out instead of hiding in a wall of known noise.
 *
 *   basis, shade, tagStyle, defaultRow, cats  render tokens and internal ids
 *   src                                       asset paths
 *   fee, price                                currency — localizeMoneyText() owns
 *                                             these; re-typing is how amounts drift
 *   grades                                    "TK–4", "JK–6" — grade codes
 *   record                                    "12–1" — the figure the rule protects
 *   path                                      "PD → NC State → Panthers" — proper
 *                                             nouns joined by arrows
 *   show                                      production titles, kept English like
 *                                             every other work title in this corpus
 */
export const REVIEWED_SKIPS = new Set([
  'basis', 'cats', 'defaultRow', 'fee', 'grades', 'path',
  'price', 'record', 'shade', 'show', 'src', 'tagStyle',
])

/**
 * Full-path decisions that override the leaf-key default, for keys whose
 * meaning genuinely differs by location.
 */
export const PATH_OVERRIDES = new Map([
  // Citation labels are publisher + page name: "providenceday.org — Arts overview".
  // Half proper noun, half descriptive. Left English so a citation always matches
  // the page it points at — a translated citation label cannot be checked against
  // the source by a reader who follows the link.
  ['*.sources[].label', false],
  ['*.source.label', false],
  // Coaching roles ARE descriptive prose ("Cross Country / Track", "Director of
  // Athletics") and read as chrome to a Spanish parent.
  ['coaching.tenure[].role', true],
  ['counseling.roster[].role', true],
  // `value` is mixed by design: the stat strips carry bare figures ("27", "66")
  // that must never be re-typed, while the coaching and national cards use short
  // phrases ("24 yrs", "HOF", "5 straight", "#1 in NC"). Split by path rather
  // than blanket-classifying the leaf.
  ['coaching.featured[].stats[].value', true],
  ['national.stats[].value', true],
  // Season names are chrome — byte-identical for every school — but they live at
  // `offered.seasons[].name`, and `name` is otherwise a proper noun (sports,
  // people, venues). Resolved by path so the sport names beneath stay English.
  ['offered.seasons[].name', true],
  // `time` is mixed: the enrichment catalog uses clock literals ("2:40–3:00")
  // while the coverage table uses phrases ("Grades 1–2", "After class", "Then").
  ['coverage.rows[].tiers[].time', true],
  ['dayInside.rhythm[].time', true],
  // Cluster row names are mixed: single clubs are proper nouns kept English
  // ("DECA", "Brainy Yaks", "Chess Team") while grouped rows are descriptive
  // labels ("Civic clubs →", "US academic clubs →", "Middle School teams →").
  // Marked prose so the descriptive ones translate; the translator leaves the
  // proper nouns identical, which the overlay stores as a no-op.
  ['clusters.rows[].name', true],
])
