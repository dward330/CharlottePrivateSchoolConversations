import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { fetchNews, type NewsPhase } from '../lib/news/fetchNews'
import type { NewsItem, NewsSource } from '../lib/news/types'

/** Newspaper glyph — marks the Latest News section and both of its TOC entries,
    so it reads as "not a research area" at a glance, exactly as PlayIcon does
    for the Welcome Video. */
export function NewspaperIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9h4" />
      <path d="M18 14h-8M15 18h-5M10 6h8v4h-8V6Z" />
    </svg>
  )
}

function ArrowIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  )
}

/** Dates are chrome, not citation figures, so they localize. Article HEADLINES
    never do — see .claude/skills/add-school-news/SKILL.md. */
function useDateFormat() {
  const { i18n } = useTranslation()
  return useCallback(
    (iso: string | null, opts: Intl.DateTimeFormatOptions) => {
      if (!iso) return ''
      const d = new Date(iso)
      if (Number.isNaN(d.getTime())) return ''
      try {
        return new Intl.DateTimeFormat(i18n.language, opts).format(d)
      } catch {
        return new Intl.DateTimeFormat('en', opts).format(d)
      }
    },
    [i18n.language],
  )
}

function Skeleton({ domain, status, reduced }: { domain: string; status: string; reduced: boolean }) {
  return (
    <div className="news-loading" aria-busy="true" aria-live="polite">
      <div className="news-loading-head">
        <span className={reduced ? 'news-crosshair' : 'news-crosshair is-spinning'} aria-hidden="true">
          {/* Design's crosshair: ring + four ticks (not a dashed ring). */}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
          </svg>
        </span>
        <span className="news-status">{status}</span>
        <span className="news-loading-domain">{domain}</span>
      </div>
      <div className={reduced ? 'news-hairline' : 'news-hairline is-sweeping'} aria-hidden="true">
        <span />
      </div>
      <div className="news-skeleton" aria-hidden="true">
        <div className={reduced ? 'news-sk-featured' : 'news-sk-featured is-pulsing'}>
          <div className="news-sk-photo">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.09-3.09a2 2 0 0 0-2.83 0L6 21" />
            </svg>
          </div>
          <div className="news-sk-lines">
            {/* Design staggers the pulse across the stack rather than firing in unison. */}
            <span className="news-sk-line w40" />
            <span className="news-sk-line w90" style={{ animationDelay: '0.1s' }} />
            <span className="news-sk-line w55" style={{ animationDelay: '0.15s' }} />
            <span className="news-sk-line w70" style={{ animationDelay: '0.2s' }} />
          </div>
        </div>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={reduced ? 'news-sk-row' : 'news-sk-row is-pulsing'}
            style={reduced ? undefined : { animationDelay: `${0.06 * i}s` }}
          >
            <span className="news-sk-line w-date" />
            <span className="news-sk-line w80" />
            <span className="news-sk-thumb" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function LatestNews({ slug, source }: { slug: string; source: NewsSource }) {
  const { t } = useTranslation()
  const fmt = useDateFormat()

  const [items, setItems] = useState<NewsItem[] | null>(null)
  const [failed, setFailed] = useState(false)
  const [phase, setPhase] = useState<NewsPhase>('contacting')
  const [started, setStarted] = useState(false)
  const hostRef = useRef<HTMLElement | null>(null)

  const reduced =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  /* Lazy-trigger: the section sits below the fold, so a visitor who never
     scrolls to it never hits the rate-limited proxy. Falls back to
     fetch-on-mount where IntersectionObserver is unavailable. */
  useEffect(() => {
    if (started) return
    const el = hostRef.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setStarted(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true)
          io.disconnect()
        }
      },
      { rootMargin: '200px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const controller = new AbortController()
    let live = true

    setItems(null)
    setFailed(false)
    setPhase('contacting')

    fetchNews({
      slug,
      source,
      signal: controller.signal,
      onPhase: (p) => { if (live) setPhase(p) },
      onUpdate: (next) => { if (live) setItems(next) },
    })
      .then((next) => { if (live) setItems(next) })
      .catch(() => { if (live) setFailed(true) })

    return () => {
      live = false
      controller.abort()
    }
  }, [slug, source, started])

  const indexLink = (
    <a className="news-all" href={source.indexUrl} target="_blank" rel="noopener noreferrer">
      {t('news.allNews')}
      <ArrowIcon size={14} />
    </a>
  )

  const header = (
    <div className="news-head">
      <span className="glyph"><NewspaperIcon /></span>
      <h2>{t('news.title')}</h2>
      {items && items.length > 0 && (
        <span className="news-note">
          {t('news.note', { count: items.length, domain: source.domain })}
        </span>
      )}
    </div>
  )

  let body: React.ReactNode
  if (failed) {
    body = (
      <div className="news-error">
        <p className="news-error-title">{t('news.errorTitle')}</p>
        <p className="news-error-body">{t('news.errorBody')}</p>
        {indexLink}
      </div>
    )
  } else if (!items) {
    const status =
      phase === 'contacting'
        ? t('news.statusContacting', { domain: source.domain })
        : phase === 'parsing'
          ? t('news.statusParsing')
          : t('news.statusExtracting')
    body = <Skeleton domain={source.domain} status={status} reduced={reduced} />
  } else {
    const [lead, ...rest] = items
    body = (
      <div className="news-reveal">
        {/* Featured card. No photo -> single full-width text column, never an
            empty image box. */}
        <a
          className={lead.photo ? 'news-featured' : 'news-featured no-photo'}
          href={lead.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {lead.photo && (
            <span className="news-featured-photo">
              <img src={lead.photo} alt="" loading="lazy" />
            </span>
          )}
          <span className="news-featured-body">
            <span className="news-kicker">
              {t('news.newest')}
              {lead.date && ` · ${fmt(lead.date, { year: 'numeric', month: 'long', day: 'numeric' })}`}
            </span>
            <span className="news-featured-title">{lead.title}</span>
            {lead.summary && <span className="news-featured-preview">{lead.summary}</span>}
            <span className="news-read">
              {t('news.readStory')}
              <ArrowIcon size={15} />
            </span>
          </span>
        </a>

        <div className="news-rows">
          {rest.map((item) => (
            <a
              key={item.url}
              className="news-row"
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="news-row-date">{fmt(item.date, { month: 'short', day: 'numeric' })}</span>
              <span className="news-row-main">
                <span className="news-row-title">{item.title}</span>
                {item.summary && <span className="news-row-preview">{item.summary}</span>}
              </span>
              <span className="news-row-end">
                {/* No photo -> omit the thumbnail entirely, keep the arrow. */}
                {item.photo && (
                  <span className="news-row-thumb">
                    <img src={item.photo} alt="" loading="lazy" />
                  </span>
                )}
                <ArrowIcon size={15} />
              </span>
            </a>
          ))}
        </div>

        <div className="news-foot">
          <span className="news-foot-note">{t('news.footerNote')}</span>
          {indexLink}
        </div>
      </div>
    )
  }

  return (
    <section id="news" className="news-section" ref={hostRef as React.Ref<HTMLElement>}>
      {header}
      {body}
    </section>
  )
}
