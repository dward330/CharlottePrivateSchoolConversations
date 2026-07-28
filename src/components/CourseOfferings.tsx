// The expanded body of a "Course Offerings" division card (Lower / Middle /
// Upper School Courses) on the school detail page, replacing the generic prose
// renderer for every school (see data/courseOfferings.ts).
//
// Recreates the design's `#courses` card body using the app's own tokens
// (src/index.css): a wrapping row of department tabs, a list header naming the
// active department with its course count, a fixed-height scrolling course
// list, and a SOURCE row with a hide-sources toggle.
//
// Two behaviors the design calls out explicitly:
//   * Tab clicks must NOT collapse the card. In the HTML prototype the tabs sit
//     outside <summary>; here the body already renders outside <summary>, and
//     the buttons are type="button" so they never submit or toggle the parent
//     <details>.
//   * Swapping departments — or editing the query — resets the list scroll to
//     the top, so a reader never lands mid-list in a result set they just
//     changed.
// Tab selection AND the filter query are per-card: each division card mounts
// its own instance and holds its own state. The query applies within whichever
// tab is active and deliberately survives a tab switch, so a reader can carry
// one search term across departments.

import { useEffect, useMemo, useRef, useState } from 'react'
import type { Course, Division } from '../data/courseOfferings.ts'
import { useTranslation } from 'react-i18next'

/** AP, Post-AP, and IB read as the advanced track and take the filled tag. */
function isAdvancedTag(tag: string): boolean {
  return /^(AP|Post-AP|AT|IB)\b/.test(tag)
}

/**
 * A course as rendered by the list: the source course plus the department it
 * came from. The department is only shown in the "All" view, where rows from
 * different departments are interleaved and would otherwise be unattributable.
 */
type ListedCourse = Course & { dept: string }

/**
 * Split `text` into alternating plain/highlighted segments on every
 * case-insensitive occurrence of `query`.
 *
 * Highlighting is done by segmenting the string and letting React render each
 * piece as its own node — never by building an HTML string, which would make
 * course text (and, worse, the reader's own query) an injection vector. Returns
 * a single plain segment when the query is empty or unmatched.
 */
function highlightSegments(text: string, query: string): { t: string; hl: boolean }[] {
  if (!query) return [{ t: text, hl: false }]
  const segs: { t: string; hl: boolean }[] = []
  const hay = text.toLowerCase()
  const needle = query.toLowerCase()
  let from = 0
  for (;;) {
    const at = hay.indexOf(needle, from)
    if (at === -1) break
    if (at > from) segs.push({ t: text.slice(from, at), hl: false })
    segs.push({ t: text.slice(at, at + needle.length), hl: true })
    from = at + needle.length
  }
  if (from < text.length) segs.push({ t: text.slice(from), hl: false })
  return segs
}

/** Renders text with every match of `query` tinted. */
function Highlighted({ text, query }: { text: string; query: string }) {
  const segs = highlightSegments(text, query)
  return (
    <>
      {segs.map((s, i) =>
        s.hl ? (
          <span key={i} className="course-hl">
            {s.t}
          </span>
        ) : (
          <span key={i}>{s.t}</span>
        ),
      )}
    </>
  )
}

/**
 * Index of the synthetic "All" tab, which precedes the real departments and is
 * the default selection. Real departments are therefore offset by one.
 */
const ALL_TAB = 0

export function CourseOfferingsBody({ division }: { division: Division }) {
  const { t } = useTranslation()
  const [active, setActive] = useState(ALL_TAB)
  const [query, setQuery] = useState('')
  const [hideSources, setHideSources] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  // Swapping departments or editing the query replaces the list contents; reset
  // scroll so the reader starts at the top of the new result set rather than
  // wherever the previous one was scrolled to.
  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = 0
  }, [active, query])

  // The card is an uncontrolled <details> owned by SchoolDetail, so there is no
  // React open-state to prop-drill. Listen to the ancestor's native `toggle`
  // event and reset to the default read — All tab, no query, sources shown —
  // whenever it collapses.
  useEffect(() => {
    const details = rootRef.current?.closest('details')
    if (!details) return
    const onToggle = () => {
      if (!details.open) {
        setActive(ALL_TAB)
        setQuery('')
        setHideSources(false)
      }
    }
    details.addEventListener('toggle', onToggle)
    return () => details.removeEventListener('toggle', onToggle)
  }, [])

  const depts = division.departments

  // Every course in the division, tagged with its department — the "All" tab's
  // backing list, and the source of the department tag shown only in that view.
  const allCourses = useMemo<ListedCourse[]>(
    () => depts.flatMap((d) => d.courses.map((c) => ({ ...c, dept: d.name }))),
    [depts],
  )

  const showingAll = active === ALL_TAB
  // A school may publish nothing for a division (Davidson Day's Lower School);
  // clamp so an empty or shrinking list can never index out of bounds.
  const current = showingAll ? null : depts[Math.min(active - 1, depts.length - 1)]
  if (!showingAll && !current) return null

  // With one department there are no tabs, so "All departments" would be a
  // misnomer for what is simply that department's list — name it instead.
  const label = showingAll
    ? depts.length > 1
      ? t('courses.allDepartments')
      : (depts[0]?.name ?? division.title)
    : current!.name
  const base: ListedCourse[] = showingAll
    ? allCourses
    : current!.courses.map((c) => ({ ...c, dept: current!.name }))

  // Filtering matches title OR description, case-insensitively, on the trimmed
  // query — a stray trailing space while typing must not empty the list.
  const q = query.trim()
  const needle = q.toLowerCase()
  const shown = q
    ? base.filter(
        (c) =>
          c.title.toLowerCase().includes(needle) ||
          c.description.toLowerCase().includes(needle),
      )
    : base

  const total = base.length
  const count = shown.length
  // While filtering the count reports the match ratio; idle it reports the
  // plain size of the active tab.
  const countText = q
    ? t('courses.countMatch', { count, total })
    : t('courses.countCourses', { count: total })
  // The design shows a scroll affordance only where the list actually
  // overflows the 380px frame; ~7 rows is the practical threshold.
  const scrollHint = !q && total > 7 ? t('courses.scrollHint') : ''

  return (
    <div className="courses" ref={rootRef}>
      {division.notPublished && (
        <p className="courses-gap">{division.notPublished}</p>
      )}

      {/* Department tabs — "All" first and active by default, then one tab per
          department. Exactly one active per card. */}
      {depts.length > 1 && (
        <div
          className="courses-tabs"
          role="tablist"
          aria-label={t('courses.departmentsAria', { division: division.title })}
        >
          <button
            type="button"
            role="tab"
            className="depttab"
            data-active={showingAll}
            aria-selected={showingAll}
            onClick={() => setActive(ALL_TAB)}
          >
            {t('courses.allTab')}
          </button>
          {depts.map((d, i) => (
            <button
              key={d.name}
              type="button"
              role="tab"
              className="depttab"
              data-active={i + 1 === active}
              aria-selected={i + 1 === active}
              onClick={() => setActive(i + 1)}
            >
              {d.name}
            </button>
          ))}
        </div>
      )}

      <div className="courses-listhead">
        <span className="courses-deptname">{label}</span>
        <span className="courses-count text-muted" aria-live="polite">
          {countText}
          {scrollHint}
        </span>
        <div className="courses-filter">
          <span className="courses-filter-icon" aria-hidden="true">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </span>
          <input
            type="text"
            className="input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('courses.filterPlaceholder')}
            aria-label={t('courses.filterAria', { division: division.title })}
          />
        </div>
      </div>

      {/* The scroll region: fixed max height inside a 1px divider frame. */}
      <div className="courselist" ref={listRef} tabIndex={0} role="tabpanel">
        {/* The grade tag belongs in the key: a middle-school catalog names its
            per-grade courses identically — Country Day runs four distinct
            "Health" courses across grades 5–8, and separate "English" courses in
            7 and 8 — so dept + title is not a unique identity, only dept + title
            + tag is. */}
        {shown.map((c) => (
          <div key={`${c.dept}-${c.title}-${c.tag ?? ''}`} className="course-row">
            <div className="course-row-head">
              <span className="course-title">
                <Highlighted text={c.title} query={q} />
              </span>
              {c.tag && (
                <span className={isAdvancedTag(c.tag) ? 'tag-accent' : 'tag-outline'}>
                  {c.tag}
                </span>
              )}
              {/* Department attribution only where rows are actually
                  interleaved. A single-department division hides its tab row
                  altogether, so the tag would repeat one value down the list
                  with no tabs to give it meaning. */}
              {showingAll && depts.length > 1 && (
                <span className="tag-neutral">{c.dept}</span>
              )}
            </div>
            <p className="course-desc text-muted">
              <Highlighted text={c.description} query={q} />
            </p>
          </div>
        ))}
        {shown.length === 0 && (
          <p className="courses-empty text-muted">
            No courses match “{q}” — try a shorter term or another department.
          </p>
        )}
      </div>

      {/* Sources footer with a hide-sources toggle, matching Club Catalog. */}
      <div className="courses-foot">
        <button
          type="button"
          className="catalog-src-toggle"
          aria-pressed={hideSources}
          onClick={() => setHideSources((v) => !v)}
        >
          {t(hideSources ? 'courses.showSources' : 'courses.hideSources')}
        </button>
        {!hideSources && (
          <div className="courses-src srcrow">
            <span className="tag-outline">{t('cardLabels.source')}</span>
            <span className="courses-src-text text-muted">
              {division.sourceUrl ? (
                <a href={division.sourceUrl} target="_blank" rel="noopener noreferrer">
                  {division.source}
                </a>
              ) : (
                division.source
              )}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
