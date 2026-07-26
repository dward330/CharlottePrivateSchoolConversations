// The "Club Catalog & Overview" interest index — the expanded body of the
// Club Catalog card on the school detail page, replacing the generic prose
// renderer for schools with a structured entry (see data/clubCatalog.ts).
//
// Unlike the Academic Clubs layered read (ClubClusters), the club NAMES are the
// content here, so the whole roster stays visible and single-select filter chips
// narrow it. Recreates the design's "2a — Finalized" section using the app's own
// tokens (src/index.css): single-select chips ("Category · count", "All"
// default, accent fill when active), a live "Showing N of M" counter, a
// two-column club grid, honest division-note rows, and a SOURCES footer with a
// hide-sources toggle. Filter + hide-sources state reset whenever the card
// collapses (driven by the `open` prop from SchoolDetail).

import { useEffect, useRef, useState } from 'react'
import type { ClubCatalog } from '../data/clubCatalog.ts'

const ALL = 'all'

export function ClubCatalogBody({ catalog }: { catalog: ClubCatalog }) {
  const [filter, setFilter] = useState<string>(ALL)
  const [hideSources, setHideSources] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  // The card is an uncontrolled <details> owned by SchoolDetail; there is no
  // React open-state to prop-drill. Listen to the ancestor's native `toggle`
  // event and reset the filter whenever it collapses, so re-opening always
  // starts from "All" with sources shown — matching the design's default read.
  useEffect(() => {
    const details = rootRef.current?.closest('details')
    if (!details) return
    const onToggle = () => {
      if (!details.open) {
        setFilter(ALL)
        setHideSources(false)
      }
    }
    details.addEventListener('toggle', onToggle)
    return () => details.removeEventListener('toggle', onToggle)
  }, [])

  const total = catalog.clubs.length
  const noun = catalog.countNoun ?? 'clubs'
  const counts: Record<string, number> = {}
  for (const c of catalog.clubs) counts[c.cat] = (counts[c.cat] ?? 0) + 1

  const shown =
    filter === ALL ? catalog.clubs : catalog.clubs.filter((c) => c.cat === filter)
  const catFull = (key: string) =>
    catalog.categories.find((c) => c.key === key)?.full ?? key

  return (
    <div className="club-catalog" ref={rootRef}>
      <p className="club-verdict">
        <strong>{catalog.verdict}</strong>{' '}
        <span className="text-muted">{catalog.verdictHint}</span>
      </p>

      {/* Single-select filter chips — real buttons, accent fill when active. */}
      <div className="catalog-filters" role="group" aria-label="Filter clubs by interest">
        <button
          type="button"
          className={filter === ALL ? 'catalog-chip is-active' : 'catalog-chip'}
          aria-pressed={filter === ALL}
          onClick={() => setFilter(ALL)}
        >
          All · {total}
        </button>
        {catalog.categories.map((cat) => (
          <button
            key={cat.key}
            type="button"
            className={filter === cat.key ? 'catalog-chip is-active' : 'catalog-chip'}
            aria-pressed={filter === cat.key}
            onClick={() => setFilter(cat.key)}
          >
            {cat.short} · {counts[cat.key] ?? 0}
          </button>
        ))}
        <span className="catalog-count" aria-live="polite">
          Showing {shown.length} of {total} {noun}
        </span>
      </div>

      {/* Two-column club grid. */}
      <div className="catalog-grid">
        {shown.map((club) => (
          <div key={club.name} className="catalog-club">
            <div className="catalog-club-head">
              <span className="catalog-club-name">{club.name}</span>
              <span className="catalog-club-cat">{catFull(club.cat)}</span>
            </div>
            <div className="catalog-club-note text-muted">{club.note}</div>
          </div>
        ))}
      </div>

      {/* Division / honest-gap notes — younger divisions and login-gated rosters. */}
      <div className="catalog-divisions">
        {catalog.divisions.map((div) => (
          <div key={div.label} className="catalog-division">
            <span className="catalog-division-label">{div.label}</span>
            <span className="catalog-division-text">{div.text}</span>
            <span className="tag-outline catalog-division-tag">{div.tag}</span>
          </div>
        ))}
      </div>

      {/* Sources footer with a hide-sources toggle. */}
      <div className="catalog-foot">
        <button
          type="button"
          className="catalog-src-toggle"
          aria-pressed={hideSources}
          onClick={() => setHideSources((v) => !v)}
        >
          {hideSources ? 'Show sources' : 'Hide sources'}
        </button>
        {!hideSources && (
          <div className="catalog-src srcrow">
            <span className="tag-outline">SOURCES</span>
            <span className="catalog-src-text text-muted">{catalog.source}</span>
          </div>
        )}
      </div>
    </div>
  )
}
