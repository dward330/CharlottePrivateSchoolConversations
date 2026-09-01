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
  // The NC admissions ledger's caveat: that a row is a JOINT figure of school ×
  // university, not either one's own admit rate, and that the dashboard covers
  // UNC-system campuses only. It is the sentence that stops the card being read
  // as a matriculation list, so it must reach a non-English reader.
  'methodNote',
  'venueNote', 'catalogIntro', 'leadership', 'broadcast', 'reach',
  'recognizes', 'feedsFrom', 'didNotWin',
  // Human-readable labels and captions
  'label', 'valueLabel', 'gradeLabel', 'panelLabel', 'flatLabel', 'title',
  // Course Offerings: the course one-liner, the collapsed-card teaser, and the
  // honest "school publishes subject areas, not named courses" note.
  'description', 'teaser', 'notPublished',
  // Financial Aid report. `questions` is the parent-facing checklist that is the
  // point of the last section; the note/caption/title fields carry every figure
  // caveat in the document.
  'questions', 'navTitle', 'bullets', 'figureCaption', 'figureNote', 'figureNote2',
  'componentsTitle', 'componentsAside', 'componentsNote', 'questionsNote',
  'questionsTitle',
  // Per-school transcript-card headings (collegeSupport) — set only where the
  // school's content diverges from the sections.* fallback (Covenant Day's
  // merit block is a five-year AP line, not a National Merit ledger), so they
  // are research findings that vary per school: prose.
  'meritTitle',
  'depthTitle',
  'trustTitle',
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
  //                (in artsPrograms only — `*.flags[].kind` is an enum key and
  //                 is pinned false in PATH_OVERRIDES)
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
  // Surfaced by Gaston Day (2026-08-18), the first school to override these
  // sub-headings. Each renders as `data.xTitle ?? t('sections.…')`, so the
  // uniform test above decides it: these NINE genuinely diverge from their
  // fallback and are research findings ("How the list scores against the
  // selectivity tiers" vs the generic "The selectivity buckets"), so they are
  // prose. Five siblings that were byte-identical to their fallback
  // (pathTitle, holdsUpTitle, adjacentTitle, and both checklistTitles) were
  // DELETED from the data rather than classified — a lifted heading pins that
  // heading to English in every locale. artsProgram's `askTitle` was deleted
  // too: the type declared it but no component ever read it.
  'boardTitle', 'exhibitsTitle', 'strengthsTitle', 'watchoutsTitle',
  'reachTitle', 'bucketsTitle', 'scholarshipsTitle', 'supportTitle',
  'middleTitle',
  // Photo credits name a publisher and are half descriptive ("Photo: Providence
  // Day School athletics"); the leading noun reads as chrome in Spanish.
  'credit',
  // clubClusters.ts / clubCatalog.ts — the two Student Clubs cards that render
  // from their own hand-maintained modules rather than clubsPrograms/.
  'oneLiner', 'evidenceLabel', 'verdictHint', 'countNoun', 'short', 'full',
  // Summer Programs. `categoryLabel` is the visible chip beside a camp name
  // ("Traditional Day Camp", "STEM premium") — the DISPLAY half of the
  // token/label pair whose `category` token is skipped below. `intro` is the
  // sentence that says a catalog is a sample rather than the whole slate, which
  // is the one line a reader most needs in their own language.
  'categoryLabel', 'intro',
  // `dayLabel` and `weeks` are the "sentence wearing an identifier's clothes"
  // shape the rollout docs keep finding — a field that looks like a code because
  // MOST of its values are codes, holding a minority that are English phrases.
  //
  //   dayLabel  "Mon–Fri" and "M–F" are codes … but so are "4 days",
  //             "Two weeks" and "3-week run", which are not.
  //   weeks     "S1, S2, S6" is a code … but "Session 1", "Sessions 2, 5",
  //             "Weeks 1-6" and "June 8–26" carry English nouns and month names.
  //
  // Classifying either as a skip would ship those phrases as English into all
  // nine locales, inside a table cell — precisely where every previous leak of
  // this class hid. They are therefore prose, and the translator is instructed
  // to carry the session numerals and date figures through char-for-char.
  'dayLabel', 'weeks',
])

/**
 * `hours` is SKIPPED as a time literal, and that is right for 20 of the 24
 * values Summer Programs holds — `9am–4pm`, `8:30am - 3:30pm`. Four are not:
 *
 *   "9 a.m. - Noon"                      Charlotte Christian, ×many
 *   "9 a.m. - Noon & 1-4 p.m."
 *   "drop-off 8:45 am, pick-up 5:00 pm"  Country Day swim camp
 *   "drop-off 8:45 am, pick-up 12:45 pm"
 *
 * Those carry English WORDS — Noon, drop-off, pick-up — inside a field whose
 * name promises a bare clock reading, so they shipped English into every locale
 * from inside a table cell. Same shape as `ensembles`, `program` and `dismissal`
 * before them: a field correctly classified for the values it held when it was
 * classified, which later gained one that is prose.
 *
 * Rather than reclassify the whole field (which would send 20 pure clock
 * literals through translation and invite exactly the re-typing the figure rule
 * forbids), PATH_OVERRIDES below promotes only Summer's `hours` to prose, and
 * the translator is told to move the words while leaving every digit alone.
 */

/* ----------------------------------------------------------- not prose -- */

/**
 * Deliberately NOT translated, with the reason. Anything here is excluded from
 * extraction, so it never reaches model context and never appears in an
 * overlay. Keeping the reasons inline makes this list arguable in review rather
 * than mysterious.
 */
export const SKIP_KEYS = new Map([
  ['url', 'link target'],
  ['sourceUrl', 'link target'],
  ['status', 'render code — priced / range / unpriced, mapped to a glyph'],
  ['icon', 'render code — info / clock / book, mapped to an SVG path'],
  ['topic', 'topic slug — routing key, never displayed'],
  ['delta', 'figure delta — "+$950", "+4.5%"'],
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
  // A description mentioning "chrome" is a PROMISE that the UI translates this
  // field. check_chrome_keys.mjs verifies it — `day` was skipped on exactly this
  // claim for a whole stage while the key it named did not exist.
  ['day', 'weekday code (Mon) — rendered from a chrome key'],
  ['days', 'weekday codes (Mon, Tue) — a filter-match enum, each rendered from the same afterSchool.day_* chrome key as `day`'],
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
  // Summer Programs filter plumbing. `category` and `token` are MATCHED BY
  // VALUE in CampCatalogBody — a camp's `category` is compared against the
  // chip's `token`, and 'All' is the filter's sentinel. Translating either
  // breaks the comparison and the filter silently matches nothing, the same
  // failure `flags[].kind` had in Spanish. The visible half of each pair
  // (`categoryLabel`, and the chip's own `label`) IS translated.
  ['category', 'filter token — matched by value against categoryFilters[].token'],
  ['token', 'filter token — matched by value; "All" is the sentinel'],
  ['defaultTier', 'internal tier id — matched against tiers[].id'],
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
 * Individual VALUES reviewed and confirmed correct, for fields that are mostly
 * proper nouns but hold a few entries the heuristic flags.
 *
 * Deliberately value-level, not field-level. Adding the whole field to
 * REVIEWED_SKIPS above would exempt it forever, including values added later —
 * which is exactly how "No jazz, a cappella, chamber or tiered band is
 * published" shipped as English inside `ensembles` to four locales. These two
 * are ensemble/course names carrying a lowercase descriptor, no different from
 * "AP Music Theory"; a real sentence appearing in this field must still fail.
 */
export const REVIEWED_SKIP_VALUES = new Set([
  'Grade 5 Music (choral)',
  'Piano class',
])

/**
 * Full-path decisions that override the leaf-key default, for keys whose
 * meaning genuinely differs by location.
 */
export const PATH_OVERRIDES = new Map([
  // `flags[].kind` is an ENUM KEY, not display text. The component looks it up
  // in a FLAG_LABEL map (`verify` → "TO VERIFY") whose wording is chrome and
  // lives in src/locales/*.json. Translating the key makes the lookup miss and
  // the chip render BLANK.
  //
  // The leaf `kind` is prose because artsPrograms uses it for season-slot
  // phrases ("Play / One-Act"). That reading is right for The Arts and wrong
  // here — the third instance of a leaf name that is correct for most of its
  // values and wrong for a few, after `value` and `tier`.
  //
  // Caught in Bangla, but it had already shipped in Spanish: 58 blank chips
  // across all six schools, on the one card where the qualifier IS the
  // parent-facing content. Coverage read 100% throughout — only a runtime
  // resolution test sees it.
  ['*.flags[].kind', false],

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
  // College Support splits the same way. `outcomes.stats[].value` is pure
  // figures ("249", "$14.7M", "8 of 8"), but the counseling and transcript
  // strips mix figures with phrases a Spanish parent must be able to read:
  // "No rank", "Not published", "Quintiles", "9th grade", "4 years",
  // "0.5 credit", "18+ yrs", "25 AP + IB". Marked prose so those translate;
  // the bare numerals beside them round-trip unchanged, and the translator
  // leaves them identical.
  ['counseling.stats[].value', true],
  ['transcript.stats[].value', true],
  // `outcomes.stats[].value` was left as a skip on the assumption it held only
  // bare figures. A print-out found "8 of 8" and "63 of 64" rendering English
  // inside Spanish cards — the "of" is a real word, not a separator. The
  // currency and percentage values beside them ("$14.7M", "99%") round-trip
  // unchanged, so marking the path prose costs nothing and fixes the ratios.
  ['outcomes.stats[].value', true],
  // Same mixed shape at `outcomes.buckets[].tier`. Three of its five values are
  // genuine proper nouns kept English ("Ivy League", "Power Four", "Ivy Plus"),
  // but two are descriptive phrases — "Top-75 National Universities" and
  // "Top-75 Liberal Arts". Marked prose so those translate; the translator
  // leaves the proper nouns identical and the overlay stores a no-op.
  ['outcomes.buckets[].tier', true],
  // Financial Aid report. Enumerated before classifying, per the Stage 6 method.
  //
  //   ladder[].gift   MIXED — four money rungs ($220K…$880K) and six named
  //                   scholarship/division labels (Early Ed, Lower, Middle,
  //                   Upper, Acclaim, Wolter). The money round-trips; the words
  //                   must translate, and localizeMoneyText() still renders the
  //                   currency at display time.
  //   plans[].figure  MIXED — mostly multipliers and money (10×, $1,500, 2.8%)
  //                   but also "2 wk" and an em-dash placeholder.
  //
  // `when`, `tag`, `label`, `meta` and `title` are already prose globally, which
  // matters here: `when` holds "Every year" / "Not published" / "With contracts"
  // beside real dates, and would have shipped English under a date-code reading.
  ['ladder[].gift', true],
  ['plans[].figure', true],

  // metricValues.ts — the stat-tile captions under every topic header
  // ("Participation signal", "Flagship result", "AP scope"). `label` and `note`
  // are already prose globally; the DISPLAY VALUES needed enumerating. They are
  // keyed by school slug, so each school is its own path, and they are mixed:
  // bare figures ("149", "~44:1") sit beside phrases a parent reads
  // ("~50% in service clubs", "Debate top-20 US", "Blumey Best Show", "TK–12").
  // Marked prose so the phrases translate; the figures round-trip unchanged.
  ['values.providence-day', true],
  ['values.charlotte-latin', true],
  ['values.charlotte-christian', true],
  ['values.charlotte-catholic', true],
  ['values.charlotte-country-day', true],
  ['values.cannon', true],
  ['values.covenant-day', true],
  ['values.davidson-day', true],
  ['values.carmel-christian', true],
  ['values.hickory-grove-christian', true],
  ['values.gaston-day', true],
  // The second display line under a value (metricValues.ts `subs`) — same money
  // in the other billing period, e.g. "≈$3,250/yr" under "$325/mo". Same shape and
  // same reason as `values` above: the digits round-trip untouched, but the `/yr`
  // and `/mo` suffixes are English abbreviations a reader reads, so they must move.
  // Keyed per slug because the path matcher only does suffix matching.
  ['subs.providence-day', true],
  ['subs.charlotte-latin', true],
  ['subs.charlotte-christian', true],
  ['subs.charlotte-catholic', true],
  ['subs.charlotte-country-day', true],
  ['subs.cannon', true],
  ['subs.covenant-day', true],
  ['subs.davidson-day', true],
  ['subs.carmel-christian', true],
  ['subs.hickory-grove-christian', true],
  ['subs.gaston-day', true],
  // Per-cell provenance tooltips (metricValues.ts `quals`). The `.text` leaf is
  // prose (translated); the `.kind` leaf is an ENUM KEY resolved through the
  // locale catalogs (compare.qual.*), NOT display text — it must NOT be extracted.
  // The global PROSE_KEYS set marks `kind` prose for artsPrograms' season slots,
  // so each quals `kind` needs an explicit skip. Keyed per school slug because the
  // path matcher only does suffix matching, not a mid-path wildcard.
  ['quals.providence-day.kind', false],
  ['quals.charlotte-latin.kind', false],
  ['quals.charlotte-christian.kind', false],
  ['quals.charlotte-catholic.kind', false],
  ['quals.charlotte-country-day.kind', false],
  ['quals.cannon.kind', false],
  ['quals.covenant-day.kind', false],
  // `compareAs` (metricValues.ts) — a ranking-strategy ENUM ('span' | 'sum' |
  // 'fraction' | …) consumed by Compare's leader logic, never display text.
  ['compareAs', false],
  ['quals.davidson-day.kind', false],
  ['quals.carmel-christian.kind', false],
  ['quals.hickory-grove-christian.kind', false],
  ['quals.gaston-day.kind', false],
  // Course Offerings. Classified from an ENUMERATION of every distinct value in
  // the module, not from the leaf names — the lesson of the three College
  // Support splits.
  //
  //   departments[].name  52 values, all descriptive subject areas
  //                       ("Mathematics", "World Languages", "Core Academics").
  //                       The `name` leaf is otherwise a proper noun, so this
  //                       needs the path.
  //   divisions[].grades  7 values, all grade bands ("Grades 9 – 12",
  //                       "Age 2 – Grade 4"). "Grades"/"Age" ARE English words a
  //                       parent reads, so prose despite the leaf being a skip.
  //
  // `tag` and `title` are already prose globally. Worth recording why `tag`
  // matters here: 38 of its 70 values are real words — Required, Elective,
  // Semester, Fall, Audition, Pass/Fail, Weekly — and only 32 are grade codes.
  // Classifying it by the codes would have shipped all 38 in English.
  ['departments[].name', true],
  ['divisions[].grades', true],
  // `guideYear` is mostly year codes ('2026-27') but one school publishes
  // 'current listing' — a phrase. Prose; the codes round-trip unchanged.
  ['guideYear', true],
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
  // After School — caught by the skip audit BEFORE translating, which is what
  // that script is for. `name` is a proper noun in the enrichment catalog
  // ("Art", "Chess", "YoLa — Yoga & Language") but a descriptive step in the
  // day-rhythm strip ("Collected at the door", "Snack → class → dismissal").
  ['dayInside.rhythm[].name', true],
  // `value` in the fee ledger carries phrases as often as figures:
  // "$80 / student", "$1.00 / min", "23 Sep & 20 Jan", "not published".
  // localizeMoneyText() still owns the pure-currency rows at render.
  ['cost.fees[].value', true],
  // `sport` is a proper noun in every row but the ones where the school never
  // said which sport the athlete signed for: 15 rows across Charlotte Latin and
  // Cannon read "Not published". SKIP_KEYS covers the field as a sport name, so
  // that hedge shipped as raw English inside the commitments table — 13 English
  // rows on one otherwise-Telugu page, in all four non-English locales. The
  // identical string is translated (ప్రచురించలేదు) where it lands in a prose
  // field, which is what makes the inconsistency visible to a reader. Real
  // sport names round-trip unchanged, exactly as course titles already do.
  ['pipeline.roster[].sport', true],
  // Summer Programs' `hours` — see the note above PATH_OVERRIDES' PROSE_KEYS
  // neighbour. Twenty of its 24 values are bare clock literals, four carry
  // English words ("9 a.m. - Noon", "drop-off 8:45 am, pick-up 5:00 pm") and
  // shipped untranslated inside a table cell. Promoted to prose HERE rather than
  // by leaf, so `hours` stays a skip everywhere else. Every digit still round-
  // trips char-for-char; only the words move.
  ['catalog.camps[].hours', true],

  // ------------------------------------------------ nc admissions ledger --
  //
  // The six-university ledger is a table of GOVERNMENT-PUBLISHED figures
  // (UNC system Insight dashboard, via the nc-admissions-data skill). Every
  // cell below is a figure a parent matches against the state's own table, so
  // each is copied char-for-char and none of them translate.
  //
  // `key` and `name` are already skipped by leaf — `key` as an internal key,
  // `name` as a proper noun. Both readings are correct here: `key` is a lookup
  // identifier (translating it is the failure `flags[].kind` caused), and the
  // university names are spelled exactly as the dashboard spells them, which
  // is what a reader matches against the source.
  ['ncAdmissions.universities[].applied', false],
  ['ncAdmissions.universities[].accepted', false],
  ['ncAdmissions.universities[].rate', false],
  ['ncAdmissions.universities[].fiveYearRate', false],
  // Formerly one string, `fiveYearCounts: '341 applied · 133 in'` — two English
  // words wrapped around two numerals, inside a table cell. That is the leak
  // shape this repo keeps rediscovering (`ensembles`, `sport`, `hours`), and
  // neither classification fixed it: prose would send 66 figure strings through
  // translation, skip would ship English to nine locales. The figures were split
  // into these two fields and the words moved to the `tables.ncFiveYearCounts`
  // chrome key, which interpolates them. So both stay figures.
  ['ncAdmissions.universities[].fiveYearApplied', false],
  ['ncAdmissions.universities[].fiveYearAccepted', false],
  // A bare term year ('2025'), interpolated into the `sections.ncLedgerTerm`
  // chrome key, which is what carries the translatable words around it. The
  // year itself is a figure and does not translate — same reading as the
  // applied/accepted counts above.
  ['ncAdmissions.latestTerm', false],

  // ------------------------------------------------------------ admissions --
  //
  // Classified from an ENUMERATION of every distinct value in
  // admissionsPrograms/providence-day.ts, not from the leaf names — the lesson
  // of the three College Support splits and of `hours` before it. Sixteen paths
  // in this topic hit no existing rule; fifteen are prose and one is not.
  //
  // `tagKind` is the ONE skip: a render enum ('accent' | 'outline') selecting
  // which chip style the deadline tag draws. It is exactly `flags[].kind` — an
  // enum key whose translation makes the lookup miss — and it is never
  // displayed. The leaf `kind` is prose globally (artsPrograms season slots),
  // so this needs the path.
  ['*.steps[].tagKind', false],
  // The paper checklist's action lines are full imperative sentences ("Submit
  // the Inquiry form and book a campus tour") — the single most important prose
  // on the printed sheet, since the sheet is what a parent works from offline.
  ['*.checklistRows[].action', true],
  // `due` looks like a bare date field and is one for 5 of its 7 values
  // ("Jan 2, 2027"). The other two are "Fall 2026" and "Spring 2027", which
  // carry English season nouns — the recurring "sentence wearing an
  // identifier's clothes" shape, here inside a right-aligned table cell, which
  // is precisely where every previous leak of this class hid. Prose; the
  // translator carries the dated values through char-for-char.
  ['*.checklistRows[].due', true],
  // The band selector's sublabel is what tells a parent WHY the bands differ
  // ("Readiness model · earlier calendar", "Standardized testing (ISEE)").
  // `ISEE` is a searchable identifier and stays English inside it.
  ['*.bands[].sublabel', true],
  // The bolded lead-in of the checklist callout — "Apply early.",
  // "Portal is definitive.", "Testing note." Short, but three real sentences.
  ['guide.bands[].checklistCallout.lead', true],
  // Contact lines mix a proper noun with a descriptive job title and an
  // English preposition ("Lisa Knight, Asst. Head of School for Admissions —
  // 704-887-6002", "Admissions main — 704-887-6000", "En español: Claudia
  // Trower"). Same reading as `coaching.tenure[].role`: the title is chrome to
  // a non-English parent. Phone numbers and the street address round-trip.
  ['contactPanel.lines[]', true],
  // "2026–27 entry cycle" — the label stamped on every date on the page. The
  // year span round-trips; "entry cycle" is what a reader needs.
  ['guide.cycle', true],
  // The paragraph under the band selector, including a verbatim quoted list of
  // the school's own selection factors. Plain prose.
  ['guide.spineNote', true],
  // The button that jumps to the Financial Aid & Tuition topic. Its English is
  // the topic's own display name, which IS translated in the locale catalogs,
  // so leaving it English would render one English button on an otherwise
  // translated card.
  ['guide.aid.button', true],
  // The cross-band comparison cells are MIXED by design, and this is the
  // topic's leak-shape hot spot. Five of the six rows per band are figures or
  // identifiers that round-trip ("Jan 15, 2027", "WPPSI-IV + Readiness
  // Screening + Classroom Visit"), while the rest are sentences that must move
  // ("Required — instrument not published", "Via portal checklist — form not
  // published", "4:00 p.m. release — see live calendar"). Prose, per band key
  // plus the `all` spanning cell, because the path matcher does suffix matching
  // only and each band key is its own path.
  // Band keys are PER-SCHOOL, not a fixed vocabulary: Providence Day's bands
  // break at K->1 and 5->6, Country Day's at K->1 and 4->5. Adding a school to
  // this area therefore adds new cell paths, and an unregistered one is
  // EXCLUDED from extraction rather than flagged at render — it ships English
  // cells to every locale with coverage still reading 100%. The extractor
  // reports it as unclassified (exit 1); register the new keys here.
  ['comparison.rows[].cells.tkk', true],
  ['comparison.rows[].cells.g15', true],
  ['comparison.rows[].cells.g612', true],
  ['comparison.rows[].cells.jkk', true],
  ['comparison.rows[].cells.g14', true],
  ['comparison.rows[].cells.g512', true],
  // Charlotte Christian ships FOUR bands rather than three: its deadline
  // boundary (K->1) and its assessment boundary (Grade 1->2) fall in different
  // places, so `g1` and `g24` are its own two extra keys.
  ['comparison.rows[].cells.g1', true],
  ['comparison.rows[].cells.g24', true],
  // Charlotte Latin names its four bands after the DIVISIONS rather than the
  // grade numbers, so it contributes three more keys on top of the shared
  // `tkk`: `ls` (Grades 1-5), `ms` (6-8) and `us` (9-12).
  ['comparison.rows[].cells.ls', true],
  ['comparison.rows[].cells.ms', true],
  ['comparison.rows[].cells.us', true],
  // Covenant Day's third band spans Grades 6-11, not 6-12: the school is JK-12
  // but publishes no Grade 12 entry point. `jkk` and `g15` it shares with the
  // cards above; `g611` is its own key.
  ['comparison.rows[].cells.g611', true],
  ['comparison.rows[].cells.all', true],
  // "5800 Sardis Road, Charlotte, NC 28270 · main 704-887-6000" — the street
  // address round-trips char-for-char, but `main` is an English word labelling
  // the number. Same reading as the contact lines above.
  ['contacts.address', true],
  // "Portal: Charger Commons · providenceday.org" — `Charger Commons` is the
  // portal's proper name and the domain is a link target, but `Portal:` is a
  // label. Prose; the translator leaves both identifiers alone.
  ['checklist.portalNote', true],
  // The printed sheet's disclaimer — provenance, the retrieval date, the
  // "verify against the live calendar" instruction and the not-affiliated
  // statement. The one paragraph on the sheet that must reach every reader.
  ['checklist.disclaimer', true],
])
