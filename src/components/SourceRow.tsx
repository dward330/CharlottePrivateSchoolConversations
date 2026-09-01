// The SOURCE row every research card ends with, plus its show/hide toggle.
//
// WHY THIS EXISTS. Seven components carried a near-identical `SourceRow` local
// function — Arts, Sports, Clubs, College Support, After School, Summer
// Programs and Admissions — differing only in three things: the wrapper's
// per-area class, which locale key names the tag, and whether the non-URL
// branch ran the label through `sourceLabel()`. Three more rows (Course
// Offerings, Club Catalog, Club Clusters) and two in the financial-aid report
// hand-rolled the same markup around a single wrapper span. Adding the toggle
// to all twelve meant either twelve copies of the same `useState`, or one
// component. This is the one component.
//
// THE TOGGLE IS PER-ROW, BY DECISION (user's call, 2026-08-31). A school page
// renders roughly forty source rows, so a page-level control would have been
// less chrome — but the two rows that already shipped a toggle (Club Catalog
// and Course Offerings) put it beside their own citations, and the user asked
// for that same affordance everywhere rather than a new page-level one. Each
// row therefore owns its own state and starts EXPANDED, exactly as those two
// did.
//
// THE "SOURCE" TAG IS GONE, BY DECISION (user's call, 2026-08-31). Every row
// used to open with a bordered SOURCE / SOURCES chip. Once the toggle sat
// beside it, the pair read as two boxes saying the same word, so the tag was
// removed and the button carries the labelling on its own. The tag's locale
// keys (`cardLabels.source`, `cardLabels.sources`, `sports.source`,
// `finAid.source`) are deliberately LEFT IN the catalogs: ClubsProgram's inline
// per-tile attributions still render the chip, and `finAid.source` is still
// passed as a section label elsewhere. Do not prune them as unused.
//
// LAYOUT. The toggle sits on its own line with one citation per line below it —
// see the `.srcrow` block in src/index.css, which explains why that rule lives
// at the end of the stylesheet and what it has to work around. This component
// only decides WHAT renders; `.srcrow` decides how it stacks.

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { TFunction } from 'i18next'
import { sourceLabel } from '../lib/labels.ts'

/** The shape every area's citation type already satisfies. */
export type Source = { label: string; url?: string }

type Props = {
  sources: Source[]
  /**
   * The per-area wrapper class (`arts-src`, `sports-src`, …). Kept per area
   * because each one carries its own border/spacing above the shared `.srcrow`
   * layout; collapsing them into one class would change five areas' spacing as
   * a side effect of adding a toggle.
   */
  className: string
  /**
   * True where the area's non-URL citations may be the verdict attribution
   * sentence rather than a document name — see `sourceLabel()`. Arts, After
   * School, Summer, College Support and Admissions pass it; Sports and Clubs
   * deliberately do not, matching what each shipped.
   */
  localizeLabels?: boolean
  /** Locale keys for the toggle, so the two plural rows keep their own wording. */
  showKey?: string
  hideKey?: string
}

/**
 * The toggle button. Rendered even when the row is collapsed — it is the only
 * way back — and labelled by what the NEXT click does, which is why the text
 * flips rather than the icon.
 */
export function SourceToggle({
  hidden,
  onToggle,
  showKey = 'cardLabels.showSources',
  hideKey = 'cardLabels.hideSources',
  t,
}: {
  hidden: boolean
  onToggle: () => void
  showKey?: string
  hideKey?: string
  t: TFunction
}) {
  return (
    <button
      type="button"
      className="catalog-src-toggle"
      aria-pressed={hidden}
      onClick={onToggle}
    >
      {t(hidden ? showKey : hideKey)}
    </button>
  )
}

export function SourceRow({
  sources,
  className,
  localizeLabels = true,
  showKey,
  hideKey,
}: Props) {
  const { t } = useTranslation()
  const [hidden, setHidden] = useState(false)

  // A card with no citations renders nothing at all — not an empty row with a
  // toggle that reveals nothing, which is the zero-items rule in CLAUDE.md.
  if (sources.length === 0) return null

  return (
    <div className={`${className} srcrow`}>
      <div className="srcrow-head">
        <SourceToggle
          hidden={hidden}
          onToggle={() => setHidden((v) => !v)}
          showKey={showKey}
          hideKey={hideKey}
          t={t}
        />
      </div>
      {!hidden &&
        sources.map((s) =>
          s.url ? (
            <a
              key={s.label}
              className="srcrow-item"
              href={s.url}
              target="_blank"
              rel="noreferrer noopener"
            >
              {s.label} ↗
            </a>
          ) : (
            <span key={s.label} className="srcrow-item text-muted">
              {localizeLabels ? sourceLabel(t, s.label) : s.label}
            </span>
          ),
        )}
    </div>
  )
}

/**
 * The same row for the four sites whose citations are ALREADY assembled into a
 * single node — Course Offerings, Club Catalog, Club Clusters and the
 * financial-aid report each pass one wrapper span rather than a list. They get
 * the toggle and the header layout; what is inside the wrapper is theirs.
 */
export function SourceRowRaw({
  className,
  showKey,
  hideKey,
  children,
}: {
  className: string
  showKey?: string
  hideKey?: string
  children: React.ReactNode
}) {
  const { t } = useTranslation()
  const [hidden, setHidden] = useState(false)
  return (
    <div className={`${className} srcrow`}>
      <div className="srcrow-head">
        <SourceToggle
          hidden={hidden}
          onToggle={() => setHidden((v) => !v)}
          showKey={showKey}
          hideKey={hideKey}
          t={t}
        />
      </div>
      {!hidden && children}
    </div>
  )
}
