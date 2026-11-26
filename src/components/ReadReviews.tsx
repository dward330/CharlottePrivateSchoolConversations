import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { reviewLinks, SCHOOL_MAPS, type ReviewAudience } from '../data/reviewSites.ts'

/* Read Reviews (plan `readreviews`, designed in Claude Design as
   "Read Reviews Section.dc.html"): one box per review site, each opening the
   school's own page there in a new tab, then a decorative Google map.

   Links only. The plate is the site's NAME as plain text in our own type, on
   the school's own color (--brand) — never the site's logo, font or colors,
   unless reviewSites.ts records a `logoBasis` for a logo file. */

/* Literal keys, so the chrome checkers can see every one. The subheading says who
   wrote the reviews in that box (REVIEW_AUDIENCE in reviewSites.ts). */
const FROM: Record<ReviewAudience, string> = {
  parents: 'reviews.from.parents',
  'parents-students': 'reviews.from.parentsStudents',
  students: 'reviews.from.students',
}

function ExternalArrow() {
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
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  )
}

/* The map iframe mounts only in the browser, and only once the frame nears the
   viewport, so the pre-rendered HTML holds no iframe (a third-party embed can
   hang the pre-render) and a reader who never scrolls here loads nothing from
   Google. The frame's height is fixed in CSS, so nothing shifts when it loads. */
function ReviewsMap({ slug, school }: { slug: string; school: string }) {
  const { t } = useTranslation()
  const map = SCHOOL_MAPS[slug]
  const frameRef = useRef<HTMLDivElement | null>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!map || show) return
    const el = frameRef.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setShow(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true)
          io.disconnect()
        }
      },
      { rootMargin: '400px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [map, show])

  if (!map) return null
  return (
    <div className="reviews-map">
      <div className="reviews-map-frame no-print" ref={frameRef}>
        {show && (
          <iframe
            src={map.embed}
            title={t('reviews.mapTitle', { school })}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        )}
      </div>
      <div className="reviews-map-foot">
        <span className="reviews-map-name">{t('reviews.mapCaption', { school })}</span>
        <span className="reviews-map-links">
          <a className="reviews-map-open" href={map.link} target="_blank" rel="noopener noreferrer">
            {t('reviews.mapOpen')} <ExternalArrow />
          </a>
          <a className="reviews-map-open" href={map.apple} target="_blank" rel="noopener noreferrer">
            {t('reviews.mapOpenApple')} <ExternalArrow />
          </a>
        </span>
      </div>
    </div>
  )
}

export function ReadReviews({ slug, schoolName }: { slug: string; schoolName: string }) {
  const { t } = useTranslation()
  const links = reviewLinks(slug)
  if (links.length === 0) return null
  return (
    <>
      <p className="reviews-lead">{t('reviews.lead', { school: schoolName })}</p>
      <div className="review-sites">
        {links.map(({ site, url, audience }) => (
          <a
            key={site.key}
            className="review-site"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={`review-site-logo${site.logo ? ' has-logo' : ''}`}>
              {site.logo ? (
                <img src={site.logo} alt={t('reviews.logoAlt', { site: site.name })} />
              ) : (
                <span className="review-site-plate">{site.name}</span>
              )}
            </span>
            <span className="review-site-body">
              {site.logo && <span className="review-site-name">{site.name}</span>}
              <span className="review-site-blurb">{t(FROM[audience])}</span>
              <span className="review-site-go">
                {t('reviews.go', { site: site.name })} <ExternalArrow />
              </span>
            </span>
          </a>
        ))}
      </div>
      <p className="reviews-note">{t('reviews.note')}</p>
      <ReviewsMap slug={slug} school={schoolName} />
    </>
  )
}
