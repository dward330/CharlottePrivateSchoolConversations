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
//   * Swapping departments resets the list scroll to the top, so a reader never
//     lands mid-list in a department they just opened.
// Tab selection is per-card: each division card mounts its own instance and
// holds its own active-department state.

import { useEffect, useRef, useState } from 'react'
import type { Division } from '../data/courseOfferings.ts'

/** AP, Post-AP, and IB read as the advanced track and take the filled tag. */
function isAdvancedTag(tag: string): boolean {
  return /^(AP|Post-AP|AT|IB)\b/.test(tag)
}

export function CourseOfferingsBody({ division }: { division: Division }) {
  const [active, setActive] = useState(0)
  const [hideSources, setHideSources] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  // Swapping departments replaces the list contents; reset scroll so the reader
  // starts at the top of the newly chosen department rather than wherever the
  // previous one was scrolled to.
  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = 0
  }, [active])

  // The card is an uncontrolled <details> owned by SchoolDetail, so there is no
  // React open-state to prop-drill. Listen to the ancestor's native `toggle`
  // event and reset to the first department with sources shown whenever it
  // collapses — matching the design's default read on re-open.
  useEffect(() => {
    const details = rootRef.current?.closest('details')
    if (!details) return
    const onToggle = () => {
      if (!details.open) {
        setActive(0)
        setHideSources(false)
      }
    }
    details.addEventListener('toggle', onToggle)
    return () => details.removeEventListener('toggle', onToggle)
  }, [])

  const depts = division.departments
  // A school may publish nothing for a division (Davidson Day's Lower School);
  // clamp so an empty or shrinking list can never index out of bounds.
  const current = depts[Math.min(active, depts.length - 1)]
  if (!current) return null

  const count = current.courses.length
  // The design shows a scroll affordance only where the list actually
  // overflows the 380px frame; ~7 rows is the practical threshold.
  const scrollHint = count > 7 ? ' — scroll for full list' : ''

  return (
    <div className="courses" ref={rootRef}>
      {division.notPublished && (
        <p className="courses-gap">{division.notPublished}</p>
      )}

      {/* Department tabs — one active per card, first active by default. */}
      {depts.length > 1 && (
        <div
          className="courses-tabs"
          role="tablist"
          aria-label={`${division.title} departments`}
        >
          {depts.map((d, i) => (
            <button
              key={d.name}
              type="button"
              role="tab"
              className="depttab"
              data-active={i === active}
              aria-selected={i === active}
              onClick={() => setActive(i)}
            >
              {d.name}
            </button>
          ))}
        </div>
      )}

      <div className="courses-listhead">
        <span className="courses-deptname">{current.name}</span>
        <span className="courses-count text-muted" aria-live="polite">
          {count} {count === 1 ? 'course' : 'courses'}
          {scrollHint}
        </span>
      </div>

      {/* The scroll region: fixed max height inside a 1px divider frame. */}
      <div className="courselist" ref={listRef} tabIndex={0} role="tabpanel">
        {current.courses.map((c) => (
          <div key={`${current.name}-${c.title}`} className="course-row">
            <div className="course-row-head">
              <span className="course-title">{c.title}</span>
              {c.tag && (
                <span className={isAdvancedTag(c.tag) ? 'tag-accent' : 'tag-outline'}>
                  {c.tag}
                </span>
              )}
            </div>
            <p className="course-desc text-muted">{c.description}</p>
          </div>
        ))}
      </div>

      {/* Sources footer with a hide-sources toggle, matching Club Catalog. */}
      <div className="courses-foot">
        <button
          type="button"
          className="catalog-src-toggle"
          aria-pressed={hideSources}
          onClick={() => setHideSources((v) => !v)}
        >
          {hideSources ? 'Show sources' : 'Hide sources'}
        </button>
        {!hideSources && (
          <div className="courses-src srcrow">
            <span className="tag-outline">SOURCE</span>
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
