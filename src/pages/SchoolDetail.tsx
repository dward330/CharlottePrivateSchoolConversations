import { useEffect, useState } from 'react'
import {
  schoolBySlug,
  brandOf,
  topicsForSchool,
  docCount,
} from '../lib/manifest.ts'
import { loadMetricGroups, type MetricGroup } from '../lib/content.ts'
import { SchoolBadge } from '../components/SchoolBadge.tsx'
import { TopicGlyph } from '../components/TopicGlyph.tsx'
import { BlueprintCorners } from '../components/BlueprintCorners.tsx'
import { ProseContent } from '../components/ProseContent.tsx'
import { proseSummary, previewHasGapLanguage } from '../lib/prose.ts'
import { toCompare, toHome, useNavigate } from '../lib/router.ts'
import { schools as allSchools } from '../lib/manifest.ts'
import { valueMetricsForTopic } from '../data/metricValues.ts'
import { financialAidReport } from '../data/financialAidReports.ts'
import { FinancialAidReportCard } from '../components/FinancialAidReport.tsx'
import { clubClusters } from '../data/clubClusters.ts'
import { ClubClustersBody } from '../components/ClubClusters.tsx'
import { clubCatalog } from '../data/clubCatalog.ts'
import { ClubCatalogBody } from '../components/ClubCatalog.tsx'
import {
  clubsProgram,
  loadClubsOverlay,
  CLUBS_CARDS,
  clubsCardTitle,
  titleOverrideSlug as clubsOverrideSlug,
  type ClubsProgram,
} from '../data/clubsProgram.ts'
import {
  AffinityBody,
  ServiceBody,
  // Sports also exports a HonorsBody (athletic honors); alias to disambiguate.
  HonorsBody as ClubsHonorsBody,
} from '../components/ClubsProgram.tsx'
import { courseOfferings } from '../data/courseOfferings.ts'
import { CourseOfferingsBody } from '../components/CourseOfferings.tsx'
import {
  sportsProgram,
  loadSportsOverlay,
  SPORTS_CARDS,
  type SportsProgram,
} from '../data/sportsProgram.ts'
import {
  SportsOfferedBody,
  WinningRecordBody,
  CollegePipelineBody,
  HonorsBody,
  CoachingBody,
  FacilitiesBody,
  NationalStageBody,
} from '../components/SportsProgram.tsx'
import {
  artsProgram,
  ARTS_CARDS,
  artsCardTitle,
  loadArtsOverlay,
  titleOverrideSlug as artsOverrideSlug,
  type ArtsProgram,
} from '../data/artsProgram.ts'
import {
  ArtsLadderBody,
  TheatreBody,
  MusicBody,
  VisualArtsBody,
  VerdictBody,
} from '../components/ArtsProgram.tsx'
import {
  collegeSupportProgram,
  COLLEGE_SUPPORT_CARDS,
  type CollegeSupportProgram,
} from '../data/collegeSupport.ts'
import {
  TranscriptBody,
  CounselingBody,
  OutcomesBody,
  EdgeBody,
  WholeClassBody,
  // Arts also exports a VerdictBody; alias to disambiguate.
  VerdictBody as CsVerdictBody,
} from '../components/CollegeSupport.tsx'
import {
  afterSchoolProgram,
  loadAfterSchoolOverlay,
  AFTER_SCHOOL_CARDS,
} from '../data/afterSchool.ts'
import { AfterSchoolCardBody } from '../components/AfterSchool.tsx'
import { WelcomeVideo, PlayIcon } from '../components/WelcomeVideo.tsx'
import { useTranslation } from 'react-i18next'
import { topicLabel, metricLabel, cardTitle } from '../lib/labels.ts'

type Loaded = Record<string, MetricGroup[]>

/* Per-school card-order overrides, keyed slug → topic → metric-key order. Keys
   not listed keep their existing order after the listed ones. School-specific so
   no other school's ordering changes (the shared cross-school order lives in
   metrics.ts SECTION_ORDER). */
const SCHOOL_SECTION_ORDER: Record<string, Record<string, string[]>> = {
  cannon: {
    'the-arts': ['overview', 'visual-arts', 'music', 'theatre', 'courses', 'facilities', 'in-depth-report'],
  },
  // Charlotte Christian: The Arts has sub-sections (digital-arts, music, theatre)
  // outside the shared order, which pushed the report mid-list; list them all so
  // the In-Depth Report lands last.
  'charlotte-christian': {
    'the-arts': ['overview', 'awards', 'visual-arts', 'digital-arts', 'music', 'theatre', 'in-depth-report'],
  },
  // Charlotte Country Day: The Arts — Facilities second-to-last, In-Depth Report
  // last (music/theatre were falling past them under the shared order).
  'charlotte-country-day': {
    'the-arts': ['overview', 'awards', 'visual-arts', 'theatre', 'music', 'facilities', 'in-depth-report'],
  },
  // Providence Day: The Arts — In-Depth Report last (music/theatre were falling
  // past it under the shared order).
  'providence-day': {
    'the-arts': ['overview', 'awards', 'visual-arts', 'music', 'theatre', 'in-depth-report'],
  },
}

/* Maps a Sports card key to its body renderer. Each card has a purpose-built
   layout rather than a shared prose body, so the dispatch is explicit; the
   caller only renders keys the school's program actually has. */
function SportsCardBody({
  program,
  cardKey,
}: {
  program: SportsProgram
  cardKey: (typeof SPORTS_CARDS)[number]['key']
}) {
  switch (cardKey) {
    case 'offered':
      return <SportsOfferedBody data={program.offered!} />
    case 'record':
      return <WinningRecordBody data={program.record!} />
    case 'pipeline':
      return <CollegePipelineBody data={program.pipeline!} />
    case 'honors':
      return <HonorsBody data={program.honors!} />
    case 'coaching':
      return <CoachingBody data={program.coaching!} />
    case 'facilities':
      return <FacilitiesBody data={program.facilities!} />
    case 'national':
      return <NationalStageBody data={program.national!} />
  }
}

/* Maps an Arts card key to its body renderer — same explicit dispatch as
   SportsCardBody, for the same reason: each card is a purpose-built layout
   rather than a shared prose body. */
function ArtsCardBody({
  program,
  cardKey,
}: {
  program: ArtsProgram
  cardKey: (typeof ARTS_CARDS)[number]['key']
}) {
  switch (cardKey) {
    case 'ladder':
      return <ArtsLadderBody data={program.ladder!} />
    case 'theatre':
      return <TheatreBody data={program.theatre!} />
    case 'music':
      return <MusicBody data={program.music!} />
    case 'visual':
      return <VisualArtsBody data={program.visual!} />
    case 'verdict':
      return <VerdictBody data={program.verdict!} />
  }
}

/* Maps a Clubs card key to its body renderer — same explicit dispatch as
   SportsCardBody and ArtsCardBody, for the same reason: each card is a
   purpose-built layout rather than a shared prose body. */
function ClubsCardBody({
  program,
  cardKey,
}: {
  program: ClubsProgram
  cardKey: (typeof CLUBS_CARDS)[number]['key']
}) {
  switch (cardKey) {
    case 'affinity':
      return <AffinityBody data={program.affinity!} />
    case 'service':
      return <ServiceBody data={program.service!} />
    case 'honors':
      return <ClubsHonorsBody data={program.honors!} />
  }
}

/* Maps a College Support card key to its body renderer — same explicit dispatch
   as SportsCardBody / ArtsCardBody / ClubsCardBody, for the same reason: each
   card is a purpose-built layout rather than a shared prose body. */
function CollegeSupportCardBody({
  program,
  cardKey,
}: {
  program: CollegeSupportProgram
  cardKey: (typeof COLLEGE_SUPPORT_CARDS)[number]['key']
}) {
  switch (cardKey) {
    case 'transcript':
      return <TranscriptBody data={program.transcript!} />
    case 'counseling':
      return <CounselingBody data={program.counseling!} />
    case 'outcomes':
      return <OutcomesBody data={program.outcomes!} />
    case 'edge':
      return <EdgeBody data={program.edge!} />
    case 'wholeClass':
      return <WholeClassBody data={program.wholeClass!} />
    case 'verdict':
      return <CsVerdictBody data={program.verdict!} />
  }
}

function PlusIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

/* The hash router owns location.hash, so a raw "#topic-…" anchor would be
   parsed as an unknown route and bounce home. Scroll in place instead. */
function scrollToTopic(e: React.MouseEvent, slug: string) {
  e.preventDefault()
  scrollToId(e, `topic-${slug}`)
}

/* Same reason as scrollToTopic: the hash router would treat a bare "#welcome"
   as an unknown route. */
function scrollToId(e: React.MouseEvent, id: string) {
  e.preventDefault()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function SchoolDetail({ slug }: { slug: string }) {
  const { t: tr, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage ?? 'en'
  const navigate = useNavigate()
  const school = schoolBySlug(slug)
  const [loaded, setLoaded] = useState<Loaded>({})
  const [ready, setReady] = useState(false)
  /* The last-clicked research area in the nav keeps the active (foreground)
     treatment so the reader can see which section they jumped to. */
  const [activeSlug, setActiveSlug] = useState<string | null>(null)

  const covered = school ? topicsForSchool(slug) : []

  useEffect(() => {
    let alive = true
    setReady(false)
    setLoaded({})
    Promise.all([
      /* Prose overlays load alongside the notes and behind the same `ready`
         gate: resolving them after first paint would render the English
         research for a frame and then swap it, which reads as a glitch. */
      loadClubsOverlay(lang),
      loadArtsOverlay(lang),
      loadSportsOverlay(lang),
      loadAfterSchoolOverlay(lang),
      ...covered.map(async (t) => [t.slug, await loadMetricGroups(t.slug, slug)] as const),
    ]).then(([, , , , ...entries]) => {
      if (!alive) return
      setLoaded(Object.fromEntries(entries))
      setReady(true)
    })
    return () => {
      alive = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, lang])

  if (!school) {
    return (
      <div className="page">
        <p className="empty">
          {tr('school.unknown')} <a href={toHome()}>{tr('school.backHome')}</a>.
        </p>
      </div>
    )
  }

  const brand = brandOf(slug)
  const totalDocs = covered.reduce((sum, t) => sum + docCount(t.slug, slug), 0)
  const otherSlugs = allSchools.map((s) => s.slug)

  return (
    <div className="page school-page" style={{ ['--brand' as string]: brand.color }}>
      <a className="back" href={toHome()} onClick={(e) => { e.preventDefault(); navigate(toHome()) }}>
        {tr('school.allSchools')}
      </a>

      <header className="dossier-header">
        <BlueprintCorners />
        <SchoolBadge slug={slug} name={school.name} size={84} />
        <div className="dossier-body">
          <p className="dossier-kicker">{tr('school.dossierKicker')}</p>
          <h1>{school.name}</h1>
          <p className="school-sub">
            {tr('school.subAreas', { count: covered.length })} ·{' '}
            {tr('school.subDocs', { count: totalDocs })}
          </p>
          <div className="school-header-topics">
            {brand.welcomeVideoUrl && (
              <a
                className="chip chip-accent"
                href="#welcome"
                onClick={(e) => scrollToId(e, 'welcome')}
              >
                <PlayIcon size={10} />
                {tr('school.welcomeVideo')}
              </a>
            )}
            {covered.map((t) => (
              <a
                key={t.slug}
                className={t.slug === activeSlug ? 'chip is-active' : 'chip'}
                href={`#topic-${t.slug}`}
                onClick={(e) => {
                  setActiveSlug(t.slug)
                  scrollToTopic(e, t.slug)
                }}
              >
                {topicLabel(tr, t.slug, t.name)}
              </a>
            ))}
          </div>
        </div>
        {brand.logo && (
          <img
            className="dossier-crest"
            src={brand.logo}
            alt={`${school.name} athletics logo`}
            loading="lazy"
          />
        )}
      </header>

      <div className="dossier-layout">
        <aside className="dossier-nav">
          {brand.welcomeVideoUrl && (
            <a
              className="dossier-nav-welcome"
              href="#welcome"
              onClick={(e) => scrollToId(e, 'welcome')}
            >
              <PlayIcon size={13} />
              {tr('school.welcomeVideo')}
            </a>
          )}
          <div className="dossier-nav-label">{tr('school.researchAreas')}</div>
          {covered.map((t) => (
            <a
              key={t.slug}
              className={t.slug === activeSlug ? 'is-active' : undefined}
              href={`#topic-${t.slug}`}
              onClick={(e) => {
                setActiveSlug(t.slug)
                scrollToTopic(e, t.slug)
              }}
            >
              {topicLabel(tr, t.slug, t.name)}
              <span className="count">{String(docCount(t.slug, slug)).padStart(2, '0')}</span>
            </a>
          ))}
          <p className="dossier-nav-hint">
            {tr('school.navHint')}
          </p>
        </aside>

        <main className="dossier-main">
          {brand.welcomeVideoUrl && (
            <WelcomeVideo name={school.name} url={brand.welcomeVideoUrl} />
          )}
          {covered.map((t) => {
            const allGroups = loaded[t.slug] ?? []
            /* Per-school overrides: some schools use a school-specific card
               order for a topic. Other schools use allGroups as-is.

               Cannon used to need an extra filter here, because its consolidated
               Club Catalog card absorbs the named orgs from the Affinity,
               Lower/Middle and Service sub-sections. The Student Clubs redesign
               subsumes it: the prose loop is now narrowed to Academic Clubs and
               the Catalog for EVERY school, which drops those keys anyway. */
            let groups = allGroups
            const schoolOrder = SCHOOL_SECTION_ORDER[slug]?.[t.slug]
            if (schoolOrder) {
              const rank = (k: string) => {
                const i = schoolOrder.indexOf(k)
                return i === -1 ? schoolOrder.length : i
              }
              groups = [...groups].sort(
                (a, b) => rank(a.metric.key) - rank(b.metric.key),
              )
            }
            const stats = valueMetricsForTopic(t.slug).filter((vm) => vm.values[slug] != null)
            /* Course Offerings is rendered from the structured curriculum layer
               as one card per division, so its header count and card grid come
               from `offerings` rather than the ingested metric groups. */
            const offerings =
              t.slug === 'course-offerings' ? courseOfferings(slug) : undefined
            /* Sports is thirteen ingested sub-sections but seven consolidated
               cards on the page (see data/sportsProgram.ts), so — like Course
               Offerings — it replaces the metric-group loop rather than
               swapping one card's body. Cards absent from a school's entry
               (no pro alumni, no NIL posture) simply don't render. */
            const sports = t.slug === 'sports' ? sportsProgram(slug, lang) : undefined
            const sportsCards = sports
              ? SPORTS_CARDS.filter((c) => sports[c.key] != null)
              : []
            /* The Arts is six ingested sub-sections but five consolidated cards
               on the page (see data/artsProgram.ts) — same substitution as
               Sports. A school with no theatre season and no awards history
               simply omits 1b rather than rendering it empty.

               A school whose structured entry has no cards at all must keep
               rendering its ingested prose: an entry that is present but empty
               is still truthy, and would otherwise suppress the prose and leave
               the whole section blank. */
            const artsEntry = t.slug === 'the-arts' ? artsProgram(slug, lang) : undefined
            const artsCardList = artsEntry
              ? ARTS_CARDS.filter((c) => artsEntry[c.key] != null)
              : []
            const arts = artsCardList.length > 0 ? artsEntry : undefined
            const artsCards = artsCardList
            /* Student Clubs differs from Sports and The Arts: the redesign
               replaces only THREE of the five sub-sections (1a Affinity,
               1b Service, 1c Honor Societies) while Academic & Competitive
               Clubs and Club Catalog & Overview keep rendering from their own
               structured layers below. So this is a merge, not a substitution —
               the structured cards render first, and the prose loop is filtered
               down to the two that remain.

               A school with no data for a card omits it entirely rather than
               rendering it empty: Davidson Day publishes no affinity roster and
               no honor-society record, so it shows 1b alone. */
            const clubs = t.slug === 'student-clubs' ? clubsProgram(slug, lang) : undefined
            const clubsCards = clubs
              ? CLUBS_CARDS.filter((c) => clubs[c.key] != null)
              : []
            /* The two prose cards Student Clubs keeps: everything the redesign
               replaced (affinity, service, honor-societies) plus the legacy
               sub-sections it removed outright (Publications & Media, Signature
               Programs & Traditions, Lower/Middle School Activities) drop out of
               the prose loop. Only Academic & Competitive Clubs and the Club
               Catalog survive, each with its own structured body. */
            const clubsProseKeys = new Set(['academic-clubs', 'catalog'])
            if (clubs) {
              groups = groups.filter((g) => clubsProseKeys.has(g.metric.key))
            }
            /* College Support: a full substitution like Sports and The Arts —
               the six consolidated cards replace ALL eight ingested prose
               sub-sections (Academic Case, Application Support, Counseling
               Engine, Fit & Rank, Institutional Leverage, Placement Outcomes,
               Standing Out, In-Depth Report), which are the very topics the
               redesign merged.

               A school whose structured entry has no cards at all must keep
               rendering its ingested prose: an entry that is present but empty
               is still truthy, and would otherwise suppress the prose and leave
               the whole section blank. */
            const csEntry =
              t.slug === 'college-support' ? collegeSupportProgram(slug) : undefined
            const csCardList = csEntry
              ? COLLEGE_SUPPORT_CARDS.filter((c) => csEntry[c.key] != null)
              : []
            const collegeSupport = csCardList.length > 0 ? csEntry : undefined
            const csCards = csCardList
            /* After School: a full substitution like Sports, The Arts and
               College Support — the four consolidated cards replace ALL five
               ingested prose sub-sections (Program Overview, Program Details,
               Enrichment & Activities, Extended Day / Aftercare, In-Depth
               Report), which are the very topics the redesign merged.

               Cards a school has no data for don't render: Davidson Day
               publishes no rate of any kind, so it shows three cards rather than
               an empty Cost Planner.

               Same guard as the areas above — an entry that is present but empty
               is still truthy, and would otherwise suppress the prose and leave
               the whole section blank. */
            const asEntry =
              t.slug === 'after-school' ? afterSchoolProgram(slug, lang) : undefined
            const asCardList = asEntry
              ? AFTER_SCHOOL_CARDS.filter((c) => asEntry[c.key] != null)
              : []
            const afterSchool = asCardList.length > 0 ? asEntry : undefined
            const asCards = asCardList
            const cardCount = offerings
              ? offerings.divisions.length
              : sports
                ? sportsCards.length
                : arts
                  ? artsCards.length
                  : collegeSupport
                    ? csCards.length
                    : afterSchool
                      ? asCards.length
                      : clubs
                        ? clubsCards.length + groups.length
                        : groups.length
            return (
              <section key={t.slug} id={`topic-${t.slug}`} className="topic-section">
                <div className="topic-section-head">
                  <span className="glyph"><TopicGlyph slug={t.slug} /></span>
                  <h2>{topicLabel(tr, t.slug, t.name)}</h2>
                  <span className="topic-count">
                    {!ready
                      ? '…'
                      : offerings
                        ? `${cardCount} divisions`
                        : `${cardCount} topics`}
                  </span>
                  <a
                    className="btn"
                    href={toCompare(t.slug, otherSlugs)}
                    onClick={(e) => { e.preventDefault(); navigate(toCompare(t.slug, otherSlugs)) }}
                  >
                    {tr('school.compareOn', { topic: topicLabel(tr, t.slug, t.name) })} <ArrowIcon />
                  </a>
                </div>

                {stats.length > 0 && (
                  <div className="stat-strip">
                    {stats.map((vm) => (
                      <div key={vm.key} className="stat-tile">
                        <div className="stat-tile-val">{vm.values[slug]}</div>
                        <div className="stat-tile-label">{vm.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {!ready && <p className="loading">Loading research…</p>}
                {ready && groups.length === 0 && (
                  <p className="empty">{tr('tables.noReadableNotes')}</p>
                )}

                {/* Course Offerings is one research file per school but three
                    per-division cards on the page (Lower / Middle / Upper), so
                    it replaces the metric-group loop entirely rather than
                    swapping a single card's body. */}
                {ready && t.slug === 'course-offerings' && offerings && (
                  <div className="note-cards">
                    {offerings.divisions.map((d) => (
                      <details key={d.title} className="note-card note-card-report">
                        <BlueprintCorners />
                        <summary>
                          <span className="note-card-head">
                            <span className="course-kicker">{d.grades}</span>
                            <span className="topic-title">{d.title}</span>
                            <span className="topic-teaser">{d.teaser}</span>
                          </span>
                          <span className="plusmark"><PlusIcon /></span>
                        </summary>
                        <div className="note-card-body">
                          <CourseOfferingsBody division={d} />
                        </div>
                      </details>
                    ))}
                  </div>
                )}

                {/* Sports: seven consolidated cards built from the structured
                    program layer, in the fixed 1a–1g order. A school missing a
                    card's data (no verified pro alumni, no NIL story) omits
                    that card rather than rendering it thin. */}
                {ready && t.slug === 'sports' && sports && (
                  <div className="note-cards">
                    {sportsCards.map((card) => (
                      <details
                        key={card.key}
                        className="note-card note-card-report note-card-sports"
                      >
                        <BlueprintCorners />
                        <summary>
                          <span className="note-card-head">
                            <span className="topic-title">{cardTitle(tr, 'sports', card.key, card.title)}</span>
                            <span className="topic-teaser">
                              {sports[card.key]!.headline}
                            </span>
                          </span>
                          <span className="plusmark"><PlusIcon /></span>
                        </summary>
                        <div className="note-card-body">
                          <SportsCardBody program={sports} cardKey={card.key} />
                        </div>
                      </details>
                    ))}
                  </div>
                )}

                {/* The Arts: five consolidated cards built from the structured
                    program layer, in the fixed 1a–1e order. Card titles adapt
                    per school — a school outside the Blumey footprint gets
                    "Theatre & External Recognition" rather than a card naming
                    an award it does not compete for. */}
                {ready && t.slug === 'the-arts' && arts && (
                  <div className="note-cards">
                    {artsCards.map((card) => (
                      <details
                        key={card.key}
                        className="note-card note-card-report note-card-arts"
                      >
                        <BlueprintCorners />
                        <summary>
                          <span className="note-card-head">
                            <span className="topic-title">
                              {cardTitle(tr, 'the-arts', card.key, artsCardTitle(slug, card), artsOverrideSlug(slug, card.key))}
                            </span>
                            <span className="topic-teaser">
                              {arts[card.key]!.headline}
                            </span>
                          </span>
                          <span className="plusmark"><PlusIcon /></span>
                        </summary>
                        <div className="note-card-body">
                          <ArtsCardBody program={arts} cardKey={card.key} />
                        </div>
                      </details>
                    ))}
                  </div>
                )}

                {/* College Support: six consolidated cards built from the
                    structured program layer, in the fixed order set by
                    COLLEGE_SUPPORT_CARDS. The design reference labels these
                    1a–1f for review only — the shipped cards show the topic
                    name alone, with no letter/number prefix.

                    A school with no data for a card omits it entirely rather
                    than rendering it with placeholder content. */}
                {ready && t.slug === 'college-support' && collegeSupport && (
                  <div className="note-cards">
                    {csCards.map((card) => (
                      <details
                        key={card.key}
                        className="note-card note-card-report note-card-cs"
                      >
                        <BlueprintCorners />
                        <summary>
                          <span className="note-card-head">
                            <span className="topic-title">{cardTitle(tr, 'college-support', card.key, card.title)}</span>
                            <span className="topic-teaser">
                              {collegeSupport[card.key]!.headline}
                            </span>
                          </span>
                          <span className="plusmark"><PlusIcon /></span>
                        </summary>
                        <div className="note-card-body">
                          <CollegeSupportCardBody
                            program={collegeSupport}
                            cardKey={card.key}
                          />
                        </div>
                      </details>
                    ))}
                  </div>
                )}

                {/* After School: four consolidated cards built from the
                    structured program layer, in the fixed order set by
                    AFTER_SCHOOL_CARDS. The design reference labels these 1a–1d
                    for review only — the shipped cards show the topic name
                    alone, with no letter/number prefix.

                    A school with no data for a card omits it entirely rather
                    than rendering it with placeholder content: Davidson Day
                    publishes no rate of any kind, so its Cost Planner is absent
                    rather than empty. */}
                {ready && t.slug === 'after-school' && afterSchool && (
                  <div className="note-cards">
                    {asCards.map((card) => (
                      <details
                        key={card.key}
                        className="note-card note-card-report note-card-as"
                      >
                        <BlueprintCorners />
                        <summary>
                          <span className="note-card-head">
                            <span className="topic-title">{cardTitle(tr, 'after-school', card.key, card.title)}</span>
                            <span className="topic-teaser">
                              {afterSchool[card.key]!.headline}
                            </span>
                          </span>
                          <span className="plusmark"><PlusIcon /></span>
                        </summary>
                        <div className="note-card-body">
                          <AfterSchoolCardBody
                            program={afterSchool}
                            cardKey={card.key}
                          />
                        </div>
                      </details>
                    ))}
                  </div>
                )}

                <div className="note-cards">
                  {/* Student Clubs: the three redesigned cards, in the fixed
                      1a–1c order, ahead of the two prose cards that remain.
                      Cards a school has no data for are absent from clubsCards
                      and simply do not render.

                      These render INSIDE the shared .note-cards grid rather than
                      in a grid of their own: two adjacent grids each start their
                      own rows, so the prose cards below could not see these
                      cards' row heights and collided with the tallest of them.
                      One grid means all five cards flow as siblings. */}
                  {ready &&
                    t.slug === 'student-clubs' &&
                    clubs &&
                    clubsCards.map((card) => (
                      <details
                        key={card.key}
                        className="note-card note-card-report note-card-clubs"
                      >
                        <BlueprintCorners />
                        <summary>
                          <span className="note-card-head">
                            <span className="topic-title">
                              {cardTitle(tr, 'student-clubs', card.key, clubsCardTitle(slug, card), clubsOverrideSlug(slug, card.key))}
                            </span>
                            <span className="topic-teaser">
                              {clubs[card.key]!.headline}
                            </span>
                          </span>
                          <span className="plusmark"><PlusIcon /></span>
                        </summary>
                        <div className="note-card-body">
                          <ClubsCardBody program={clubs} cardKey={card.key} />
                        </div>
                      </details>
                    ))}
                  {(
                    (t.slug === 'course-offerings' && offerings) ||
                    (t.slug === 'sports' && sports) ||
                    (t.slug === 'the-arts' && arts) ||
                    (t.slug === 'college-support' && collegeSupport) ||
                    (t.slug === 'after-school' && afterSchool)
                      ? []
                      : groups
                  ).map((g) => {
                    /* The Financial Aid deep-dive has a hand-structured report
                       behind it; it replaces the prose body and always claims
                       the full grid row rather than reflowing into columns.
                       It attaches to the deep-dive card only — the topic also
                       carries plain notes (tuition history, provenance) that
                       must keep rendering as prose. */
                    const report =
                      t.slug === 'financial-aid-tuition' &&
                      g.metric.key === 'in-depth-report'
                        ? financialAidReport(slug)
                        : undefined
                    /* The Academic & Competitive Clubs card, where the school
                       has a structured entry, swaps its prose body for the
                       layered club-cluster rows and leads with the verdict as
                       its collapsed teaser. */
                    const clusters =
                      t.slug === 'student-clubs' &&
                      g.metric.key === 'academic-clubs'
                        ? clubClusters(slug, lang)
                        : undefined
                    /* The Club Catalog & Overview card, where the school has a
                       structured entry, swaps its prose body for the filterable
                       interest index and leads with the catalog verdict as its
                       collapsed teaser. */
                    const catalog =
                      t.slug === 'student-clubs' && g.metric.key === 'catalog'
                        ? clubCatalog(slug, lang)
                        : undefined
                    return (
                      <details
                        key={g.metric.key}
                        className={`note-card${report || clusters || catalog ? ' note-card-report' : ''}`}
                      >
                        <BlueprintCorners />
                        <summary>
                          <span className="note-card-head">
                            <span className="topic-title">{metricLabel(tr, g.metric.key, g.metric.label)}</span>
                            <span className="topic-teaser">
                              {clusters
                                ? clusters.verdict
                                : catalog
                                  ? catalog.verdict
                                  : proseSummary(g.sections[0]?.text ?? '', g.metric.label, t.slug) ||
                                    // The stored preview is raw, unparsed text, so it can carry the
                                    // research-gap framing the parser strips — only use it if clean.
                                    (previewHasGapLanguage(g.sections[0]?.preview ?? '', t.slug)
                                      ? ''
                                      : g.sections[0]?.preview)}
                            </span>
                          </span>
                          <span className="plusmark"><PlusIcon /></span>
                        </summary>
                        <div className="note-card-body">
                          {report ? (
                            <FinancialAidReportCard report={report} />
                          ) : clusters ? (
                            <ClubClustersBody clusters={clusters} />
                          ) : catalog ? (
                            <ClubCatalogBody catalog={catalog} />
                          ) : (
                            g.sections.map((s, i) => (
                              <article key={i} className="section-text">
                                {g.sections.length > 1 &&
                                  s.subtopic !== g.metric.label &&
                                  !/deep research/i.test(s.subtopic) && (
                                    <h3 className="section-sub">{s.subtopic}</h3>
                                  )}
                                <ProseContent text={s.text} title={metricLabel(tr, g.metric.key, g.metric.label)} topic={t.slug} />
                              </article>
                            ))
                          )}
                        </div>
                      </details>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </main>
      </div>
    </div>
  )
}
