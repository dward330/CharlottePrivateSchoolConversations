import { useEffect, useRef, useState } from 'react'
import {
  schoolBySlug,
  brandOf,
  topicsForSchool,
  docCount,
} from '../lib/manifest.ts'
import {
  loadMetricGroups,
  peekMetricGroups,
  loadContentOverlay,
  type MetricGroup,
} from '../lib/content.ts'
import { SchoolBadge } from '../components/SchoolBadge.tsx'
import { TopicGlyph } from '../components/TopicGlyph.tsx'
import { ProseContent } from '../components/ProseContent.tsx'
import { PodcastDeepDive } from '../components/PodcastDeepDive.tsx'
import { proseSummary, previewHasGapLanguage, proseIsEmpty, flattenMarkdown } from '../lib/prose.ts'
import { toCompare, toHome, useNavigate } from '../lib/router.ts'
import { schools as allSchools } from '../lib/manifest.ts'
import { valueMetricsForTopic, loadMetricValuesOverlay } from '../data/metricValues.ts'
import { financialAidReport, loadFinancialAidReportOverlay } from '../data/financialAidReports.ts'
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
import { courseOfferings, loadCourseOfferingsOverlay } from '../data/courseOfferings.ts'
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
  loadCollegeSupportOverlay,
  COLLEGE_SUPPORT_CARDS,
  type CollegeSupportProgram,
} from '../data/collegeSupport.ts'
import {
  NcAdmissionsBody,
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
import {
  summerProgram,
  loadSummerOverlay,
  SUMMER_CARDS,
} from '../data/summerPrograms.ts'
import {
  SummerProgramsCardBody,
  SummerPhotoBand,
} from '../components/SummerPrograms.tsx'
import {
  admissionsProgram,
  loadAdmissionsOverlay,
  ADMISSIONS_CARDS,
  admissionsCardTitleFor,
  titleOverrideSlug as admissionsOverrideSlug,
} from '../data/admissionsPrograms.ts'
import {
  AdmissionsCardBody,
  AdmissionsStatBand,
} from '../components/AdmissionsProgram.tsx'
import { WelcomeVideo, PlayIcon } from '../components/WelcomeVideo.tsx'
import { LatestNews, NewspaperIcon } from '../components/LatestNews.tsx'
import { newsSourceFor } from '../lib/news/sources.ts'
import { useTranslation } from 'react-i18next'
import { topicLabel, metricLabel, cardTitle } from '../lib/labels.ts'
import { localizeMoneyText } from '../lib/format.ts'

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
    case 'ncAdmissions':
      return <NcAdmissionsBody data={program.ncAdmissions!} />
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

/* Double chevron — points down to "expand all", up to "collapse all". The `up`
   flag flips it so one icon serves both states of the print toolbar. */
function ExpandAllIcon({ up = false }: { up?: boolean }) {
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
      style={up ? { transform: 'rotate(180deg)' } : undefined}
    >
      <path d="M6 9l6 6 6-6M6 4l6 6 6-6" />
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

  /* Hoisted above the hooks on purpose. All three are pure lookups on `slug`,
     and the table-of-contents seed below needs them inside a `useState`
     initializer — which must run before the `if (!school)` early return, so
     they cannot wait for their original positions further down the component. */
  const brand = brandOf(slug)
  /* Absent slug -> no chip, no rail item, no section (absence-of-data). */
  const newsSource = newsSourceFor(slug)
  const covered = school ? topicsForSchool(slug) : []

  /* The page opens at the top, so the first table-of-contents entry that
     renders is the section the reader is already looking at — seed the
     selection to match it. The chain follows the render order in both tables of
     contents (Welcome Video, Latest News, then the research areas), so the
     seeded key always names a section that actually exists on this page. */
  const initialKey = brand.welcomeVideoUrl
    ? 'welcome'
    : newsSource
      ? 'news'
      : (covered[0]?.slug ?? null)

  /* Seed from the synchronous cache so RE-VISITING a school (back button,
     language switch, navigating away and back) renders complete on the first
     pass instead of flashing "Loading research…" again.

     NOTE this does not help the very first load — the cache is empty then, so
     the placeholder still renders once. That first paint is handled separately,
     by reserving the placeholder's height in CSS (see `.topic-section-pending`
     in index.css), because loading the research synchronously would mean
     bundling ~400-480 KB per school into the main chunk and trading a layout
     shift for a slower LCP.

     Computed lazily (useState with an initializer) so the cache is read once
     per mount rather than on every render. */
  const seed = (): { loaded: Loaded; ready: boolean } => {
    if (!school) return { loaded: {}, ready: false }
    const entries: Loaded = {}
    for (const t of topicsForSchool(slug)) {
      const hit = peekMetricGroups(t.slug, slug, lang)
      if (!hit) return { loaded: {}, ready: false } // any miss -> load normally
      entries[t.slug] = hit
    }
    return { loaded: entries, ready: true }
  }
  const [initial] = useState(seed)
  const [loaded, setLoaded] = useState<Loaded>(initial.loaded)
  const [ready, setReady] = useState(initial.ready)
  /* The selected table-of-contents entry — a research-area slug, or 'welcome' /
     'news' for the two entries that are not research areas. One variable, so
     selection is mutually exclusive for free: exactly one entry in each table of
     contents wears the active (foreground) treatment, and the reader can see
     which section they jumped to. Click-driven, plus the initial seed above;
     deliberately NOT a scroll-spy. */
  const [activeKey, setActiveKey] = useState<string | null>(initialKey)

  /* Every research card is an uncontrolled <details>, which is what lets a
     reader open just the ones they want. The print toolbar drives them all at
     once through the DOM rather than by lifting `open` into state on each card
     — the goal is a page ready to print, and this touches no card logic.
     `allOpen` only tracks which label/icon the button shows. */
  const mainRef = useRef<HTMLElement>(null)
  const [allOpen, setAllOpen] = useState(false)
  const setAllDetails = (open: boolean) => {
    /* Every <details> inside the report — the top-level cards and the nested
       club-cluster rows both hold content a printed page needs, so open them
       all, not just the cards. */
    mainRef.current
      ?.querySelectorAll<HTMLDetailsElement>('details')
      .forEach((d) => { d.open = open })
    setAllOpen(open)
  }

  useEffect(() => {
    let alive = true
    /* This component is reused across schools — client-side navigation between
       two school pages re-renders it rather than remounting it, so the
       `useState` seed above runs only once. Without this reset, navigating from
       a school with Sports selected to a different school would carry 'sports'
       over instead of landing on the new school's Welcome Video. */
    setActiveKey(initialKey)
    /* Only blank the page when the new school/language is NOT already cached.
       Unconditionally resetting would re-introduce the placeholder frame this
       fix removes — including on a plain re-render, since the effect re-runs
       whenever `slug` or `lang` changes. */
    const warm = school
      ? topicsForSchool(slug).every((t) => peekMetricGroups(t.slug, slug, lang))
      : false
    if (!warm) {
      setReady(false)
      setLoaded({})
    }
    Promise.all([
      /* Prose overlays load alongside the notes and behind the same `ready`
         gate: resolving them after first paint would render the English
         research for a frame and then swap it, which reads as a glitch. */
      loadClubsOverlay(lang),
      loadArtsOverlay(lang),
      loadSportsOverlay(lang),
      loadAfterSchoolOverlay(lang),
      loadSummerOverlay(lang),
      loadCollegeSupportOverlay(lang),
      loadCourseOfferingsOverlay(lang),
      loadMetricValuesOverlay(lang),
      loadFinancialAidReportOverlay(lang),
      loadAdmissionsOverlay(lang),
      /* The content overlay must be warmed BEFORE loadMetricGroups reads it —
         it resolves blocks synchronously off the cached index, so racing them
         would render English on first paint. */
      ...covered.map(
        async (t) =>
          [
            t.slug,
            await loadContentOverlay(t.slug, lang).then(() =>
              loadMetricGroups(t.slug, slug, lang),
            ),
          ] as const,
      ),
      /* The leading holes below MUST match the number of overlay loaders above.
         Adding a loader without adding a hole silently feeds its `void` result
         into Object.fromEntries as if it were a [slug, groups] pair — which is
         what `tsc -b` caught when Summer Programs made it nine. Admissions
         made it ten. */
    ]).then(([, , , , , , , , , , ...entries]) => {
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

  const totalDocs = covered.reduce((sum, t) => sum + docCount(t.slug, slug), 0)
  const otherSlugs = allSchools.map((s) => s.slug)

  return (
    <div className="page school-page" style={{ ['--brand' as string]: brand.color }}>
      <a className="back" href={toHome()} onClick={(e) => { e.preventDefault(); navigate(toHome()) }}>
        {tr('school.allSchools')}
      </a>

      <header className="dossier-header">
        <SchoolBadge slug={slug} name={school.name} size={84} />
        <div className="dossier-body">
          <p className="dossier-kicker">{tr('school.dossierKicker', { city: brand.city })}</p>
          {/* StickySchoolTitle observes this id to know when the school name has
              scrolled under the sticky nav — don't rename it without updating
              src/components/StickySchoolTitle.tsx. */}
          <h1 id="school-title">{school.name}</h1>
          <p className="school-sub">
            {tr('school.subAreas', { count: covered.length })} ·{' '}
            {tr('school.subDocs', { count: totalDocs })}
          </p>
          <div className="school-header-topics">
            {brand.welcomeVideoUrl && (
              <a
                className={activeKey === 'welcome' ? 'chip is-active' : 'chip'}
                href="#welcome"
                onClick={(e) => { setActiveKey('welcome'); scrollToId(e, 'welcome') }}
              >
                <PlayIcon size={10} />
                {tr('school.welcomeVideo')}
              </a>
            )}
            {newsSource && (
              <a
                className={activeKey === 'news' ? 'chip is-active' : 'chip'}
                href="#news"
                onClick={(e) => { setActiveKey('news'); scrollToId(e, 'news') }}
              >
                <NewspaperIcon size={10} />
                {tr('news.tocLabel')}
              </a>
            )}
            {covered.map((t) => (
              <a
                key={t.slug}
                className={t.slug === activeKey ? 'chip is-active' : 'chip'}
                href={`#topic-${t.slug}`}
                onClick={(e) => {
                  setActiveKey(t.slug)
                  scrollToTopic(e, t.slug)
                }}
              >
                {topicLabel(tr, t.slug, t.name)}
              </a>
            ))}
          </div>
          {/* Episodes that feature this school but map to no research area
              (Summer Camp, the Season 1 finale). Returns null for a school with
              none, so the line omits itself. */}
          <PodcastDeepDive variant="page" school={slug} schoolName={school.name} />
        </div>
        {brand.logo && (
          /* width/height are the crests' real intrinsic pixels (every file in
             public/logos is 1200x800). They are what lets the browser reserve
             the 3:2 box before the PNG arrives — without them the crest occupies
             zero width until it loads, then pops in at 156px and squeezes
             .school-header-topics from 986px to 830px. On Davidson Day that
             squeeze re-wraps the chip row from one line to two and pushes the
             whole page down 39px: desktop CLS 0.35. Not decorative, and not
             `loading="lazy"` either — the crest is above the fold on every
             school page, so lazy-loading only delays the pop-in.
             See .claude/plans/vitals.md. */
          <img
            className="dossier-crest"
            src={brand.logo}
            alt={tr('a11y.crestAlt', { school: school.name })}
            width={1200}
            height={800}
          />
        )}
      </header>

      <div className="dossier-layout">
        <aside className="dossier-nav">
          {brand.welcomeVideoUrl && (
            <a
              className={
                activeKey === 'welcome'
                  ? 'dossier-nav-welcome is-active'
                  : 'dossier-nav-welcome'
              }
              href="#welcome"
              onClick={(e) => { setActiveKey('welcome'); scrollToId(e, 'welcome') }}
            >
              <PlayIcon size={13} />
              {tr('school.welcomeVideo')}
            </a>
          )}
          {newsSource && (
            <a
              className={
                activeKey === 'news' ? 'dossier-nav-welcome is-active' : 'dossier-nav-welcome'
              }
              href="#news"
              onClick={(e) => { setActiveKey('news'); scrollToId(e, 'news') }}
            >
              <NewspaperIcon size={13} />
              {tr('news.tocLabel')}
            </a>
          )}
          <div className="dossier-nav-label">{tr('school.researchAreas')}</div>
          {covered.map((t) => (
            <a
              key={t.slug}
              className={t.slug === activeKey ? 'is-active' : undefined}
              href={`#topic-${t.slug}`}
              onClick={(e) => {
                setActiveKey(t.slug)
                scrollToTopic(e, t.slug)
              }}
            >
              {topicLabel(tr, t.slug, t.name)}
              {/* Local-testing-only research-coverage signal: how many source
                  documents were distilled into this area. It is an internal
                  corpus statistic, not information about the school — a reader
                  learns nothing from it and is invited into the wrong
                  comparison — so it NEVER ships to the production site.
                  `import.meta.env.DEV` is true only under the `vite` dev server
                  and false in every `vite build`, including the pre-render pass
                  (which drives the built dist/). Do not remove the DEV guard,
                  and do not delete the `.dossier-nav .count` CSS or the
                  `docCount` import — both are still live in dev, and `docCount`
                  additionally decides which areas render at all. */}
              {import.meta.env.DEV && (
                <span className="count">{String(docCount(t.slug, slug)).padStart(2, '0')}</span>
              )}
            </a>
          ))}
          <p className="dossier-nav-hint">
            {tr('school.navHint')}
          </p>
        </aside>

        <main className="dossier-main" ref={mainRef}>
          {/* Local-testing-only print affordance: open (or close) every research
              card in one click so the page is ready to print during a print-out
              pass on the dev server. `import.meta.env.DEV` is true only under the
              `vite` dev server and false in every `vite build`, so this button
              NEVER ships to the production site — it is a testing tool, not a
              reader feature. (It is also `no-print`, so it never appears in the
              printed output.) Do not remove the DEV guard. */}
          {import.meta.env.DEV && (
            <div className="expand-all-bar no-print">
              <button
                type="button"
                className="btn ghost small expand-all-btn"
                onClick={() => setAllDetails(!allOpen)}
              >
                <ExpandAllIcon up={allOpen} />
                {allOpen ? tr('school.collapseAll') : tr('school.expandAll')}
              </button>
            </div>
          )}
          {brand.welcomeVideoUrl && (
            <WelcomeVideo name={school.name} url={brand.welcomeVideoUrl} />
          )}
          {newsSource && <LatestNews slug={slug} source={newsSource} />}
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
            const stats = valueMetricsForTopic(t.slug, lang).filter((vm) => vm.values[slug] != null)
            /* Course Offerings is rendered from the structured curriculum layer
               as one card per division, so its header count and card grid come
               from `offerings` rather than the ingested metric groups. */
            const offerings =
              t.slug === 'course-offerings' ? courseOfferings(slug, lang) : undefined
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
              t.slug === 'college-support' ? collegeSupportProgram(slug, lang) : undefined
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
            /* Summer Programs: a full substitution like the areas above — the
               two cards replace the whole ingested prose for the topic, which
               is one long research document per school folded onto a single
               metric key by RULES['summer-programs'].

               A school that runs no summer program has no source files, so
               `topicsForSchool()` never yields the topic and this branch is
               never reached — the section is absent from the page entirely
               rather than rendering empty. A school that publishes camps but no
               rates keeps its catalog and drops the Cost Planner.

               Same guard as the areas above — an entry that is present but
               empty is still truthy, and would otherwise suppress the prose and
               leave the whole section blank. */
            const suEntry =
              t.slug === 'summer-programs' ? summerProgram(slug, lang) : undefined
            const suCardList = suEntry
              ? SUMMER_CARDS.filter((c) => suEntry[c.key] != null)
              : []
            const summer = suCardList.length > 0 ? suEntry : undefined
            const suCards = suCardList
            /* Admissions: a full substitution like the areas above — the one
               Grade-by-Grade Application Guide card replaces the whole ingested
               prose for the topic, which is one long research document per
               school folded onto a single metric key by RULES['admissions'].

               Ten of the eleven schools have no admissions research at all, so
               `topicsForSchool()` never yields the topic for them and this
               branch is never reached — the section is absent from their pages
               entirely rather than rendering empty.

               Same guard as the areas above — an entry that is present but
               empty is still truthy, and would otherwise suppress the prose and
               leave the whole section blank. */
            const adEntry = t.slug === 'admissions' ? admissionsProgram(slug, lang) : undefined
            const adCardList = adEntry
              ? ADMISSIONS_CARDS.filter((c) => adEntry[c.key] != null)
              : []
            const admissions = adCardList.length > 0 ? adEntry : undefined
            const adCards = adCardList
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
                      : summer
                        ? suCards.length
                        : admissions
                          ? adCards.length
                          : clubs
                            ? clubsCards.length + groups.length
                            : groups.length
            return (
              <section key={t.slug} id={`topic-${t.slug}`} className="topic-section">
                <div className="topic-section-head">
                  <span className="glyph"><TopicGlyph slug={t.slug} /></span>
                  <h2>{topicLabel(tr, t.slug, t.name)}</h2>
                  {/* Local-testing-only structure signal: how many cards this
                      research area holds ("5 topics", or "3 divisions" for
                      Course Offerings). It counts cards we built, not anything
                      about the school — a reader learns nothing from it and is
                      invited into the wrong comparison — so it NEVER ships to
                      the production site. `import.meta.env.DEV` is true only
                      under the `vite` dev server and false in every `vite
                      build`, including the pre-render pass (which drives the
                      built dist/). Do not remove the DEV guard, and do not
                      delete the `.topic-count` CSS rule or the `school.topics`
                      / `school.divisions` keys from the ten locale catalogs —
                      all are still live in dev. The `'…'` placeholder is part
                      of this affordance: it only reserves the count's slot
                      while notes load, so it goes with it. */}
                  {import.meta.env.DEV && (
                    <span className="topic-count">
                      {!ready
                        ? '…'
                        : offerings
                          ? tr('school.divisions', { count: cardCount })
                          : tr('school.topics', { count: cardCount })}
                    </span>
                  )}
                  <a
                    className="btn"
                    href={toCompare(t.slug, otherSlugs)}
                    onClick={(e) => { e.preventDefault(); navigate(toCompare(t.slug, otherSlugs)) }}
                  >
                    {tr('school.compareOn', { topic: topicLabel(tr, t.slug, t.name) })} <ArrowIcon />
                  </a>
                </div>

                {/* Renders nothing when this school × topic has no episode, so a
                    section without one keeps exactly the layout it had before
                    (the header's own margin-bottom is only zeroed when a strip
                    actually follows it — see .topic-section-head:has() in the CSS). */}
                <PodcastDeepDive
                  variant="section"
                  school={slug}
                  schoolName={school.name}
                  area={t.slug}
                  topicLabel={topicLabel(tr, t.slug, t.name)}
                />

                {stats.length > 0 && (
                  <div className="stat-strip">
                    {stats.map((vm) => (
                      <div key={vm.key} className="stat-tile">
                        {/* localizeMoneyText, for the same reason the card bodies
                            use it: these values are authored US-style ("$36,325",
                            "$3.68M") and must render in the reader's convention.
                            Without it the topic-header tiles showed "$3.68M" while
                            the financial-aid report directly below them showed
                            "3 683 971 $US" — one figure, one page, two shapes.
                            This is the most visible element on every school page.
                            Caught by the Providence Day French print-out. */}
                        <div className="stat-tile-val">{localizeMoneyText(String(vm.values[slug]))}</div>
                        <div className="stat-tile-label">{vm.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Admissions renders its 4-tile band from the topic's OWN data
                    rather than from VALUE_METRICS. The strip above and the
                    Compare table's Key Stats rows are the same array filtered by
                    topic, so adding rows there would have shipped the Compare
                    surface the user deferred for this area (2026-08-30). Same
                    classes, same position — visually it is the band above. */}
                {ready && t.slug === 'admissions' && admissions && (
                  <AdmissionsStatBand program={admissions} />
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

                {/* Summer Programs: the photo band, then the two cards built
                    from the structured program layer in the fixed order set by
                    SUMMER_CARDS.

                    The band renders only where real, sourced photographs of the
                    school's summer exist, and nothing at all otherwise — see
                    the SummerPhotoBand docstring. It sits above the cards
                    because it is section-level context, not a card's content.

                    A school with camps but no published rates omits the Cost
                    Planner rather than rendering a planner that cannot total
                    anything. */}
                {ready && t.slug === 'summer-programs' && summer && (
                  <>
                    {summer.photos && <SummerPhotoBand photos={summer.photos} />}
                    <div className="note-cards">
                      {suCards.map((card) => (
                        <details
                          key={card.key}
                          className="note-card note-card-report note-card-su"
                        >
                          <summary>
                            <span className="note-card-head">
                              <span className="topic-title">{cardTitle(tr, 'summer-programs', card.key, card.title)}</span>
                              <span className="topic-teaser">
                                {summer[card.key]!.headline}
                              </span>
                            </span>
                            <span className="plusmark"><PlusIcon /></span>
                          </summary>
                          <div className="note-card-body">
                            <SummerProgramsCardBody
                              program={summer}
                              cardKey={card.key}
                            />
                          </div>
                        </details>
                      ))}
                    </div>
                  </>
                )}

                {/* Admissions: one card, in its own grid like Summer Programs
                    (Mechanism A). The substitution disjunction below empties
                    `groups` for this topic, so the shared grid that follows
                    renders nothing — the one-grid rule exists for Student Clubs,
                    which MERGES structured and prose cards, and does not apply
                    here. */}
                {ready && t.slug === 'admissions' && admissions && (
                  <div className="note-cards">
                    {adCards.map((card) => (
                      <details
                        key={card.key}
                        className="note-card note-card-report note-card-adm"
                      >
                        <summary>
                          <span className="note-card-head">
                            <span className="topic-title">
                              {cardTitle(tr, 'admissions', card.key, admissionsCardTitleFor(slug, card), admissionsOverrideSlug(slug, card.key))}
                            </span>
                            <span className="topic-teaser">
                              {admissions[card.key]!.headline}
                            </span>
                          </span>
                          <span className="plusmark"><PlusIcon /></span>
                        </summary>
                        <div className="note-card-body">
                          <AdmissionsCardBody
                            program={admissions}
                            cardKey={card.key}
                            slug={slug}
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
                    (t.slug === 'after-school' && afterSchool) ||
                    (t.slug === 'summer-programs' && summer) ||
                    (t.slug === 'admissions' && admissions)
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
                        ? financialAidReport(slug, lang)
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
                        <summary>
                          <span className="note-card-head">
                            <span className="topic-title">{metricLabel(tr, g.metric.key, g.metric.label, t.slug)}</span>
                            <span className="topic-teaser">
                              {/* The report replaces the prose BODY, so the teaser
                                  must come from the report too — deriving it from
                                  the prose would show English under a Spanish card. */}
                              {report
                                ? `${report.title} · ${report.meta}`
                                : clusters
                                ? clusters.verdict
                                : catalog
                                  ? catalog.verdict
                                  : proseSummary(
                                      g.sections[0]?.text ?? '',
                                      g.metric.label,
                                      t.slug,
                                      g.sections[0]?.subtopic,
                                    ) ||
                                    /* The stored preview is raw, unparsed text: it can carry both
                                       the research-gap framing the parser strips AND markdown
                                       syntax, which this plain-text span would render literally
                                       ("| Band | 2021–22 | | --- |"). Gate on the first, flatten
                                       the second. */
                                    (previewHasGapLanguage(g.sections[0]?.preview ?? '', t.slug)
                                      ? ''
                                      : flattenMarkdown(g.sections[0]?.preview ?? ''))}
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
                            /* A subtopic whose whole body is filtered out at parse
                               time (the tuition-history provenance sections) would
                               otherwise ship as a bare <h3> over empty space — the
                               shape the no-empty-cards rule forbids. The heading is
                               rendered here rather than inside ProseContent, so the
                               emptiness has to be tested here too. */
                            g.sections
                              .filter(
                                (s) =>
                                  !proseIsEmpty(
                                    s.text,
                                    metricLabel(tr, g.metric.key, g.metric.label, t.slug),
                                    t.slug,
                                    s.subtopic,
                                  ),
                              )
                              .map((s, i, kept) => (
                              <article key={i} className="section-text">
                                {kept.length > 1 &&
                                  s.subtopic !== g.metric.label &&
                                  !/deep research/i.test(s.subtopic) && (
                                    <h3 className="section-sub">{s.subtopic}</h3>
                                  )}
                                <ProseContent
                                  text={s.text}
                                  title={metricLabel(tr, g.metric.key, g.metric.label, t.slug)}
                                  topic={t.slug}
                                  subtopic={s.subtopic}
                                />
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
