import { useId, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import type { CellQual as CellQualData } from '../data/metricValues.ts'

type Props = {
  /** The already-localized display value (e.g. '$3.68M', '≥19'). */
  value: string
  qual: CellQualData
  /** School display name, for the accessible label. */
  school: string
  /** Metric key, to namespace the popover id when a school repeats across rows. */
  metricKey: string
}

/**
 * A qualified Compare cell: the figure plus a top-layer provenance popover.
 *
 * The popover uses the native `popover` attribute so it renders in the browser's
 * top layer — outside `.table-wrap { overflow: auto }`, which would otherwise
 * clip a CSS-positioned tooltip on the right-hand school columns a reader has to
 * scroll to reach.
 *
 * It opens on HOVER and on keyboard FOCUS (not click). `popover="manual"` hands
 * open/close to us so a hovered-then-scrolled tooltip stays put; a short close
 * delay lets the pointer travel from the cell onto the tooltip to scroll it.
 */
export function CellQual({ value, qual, school, metricKey }: Props) {
  const { t } = useTranslation()
  // Stable across re-renders, unique when the same school appears in several rows.
  const id = `qual-${metricKey}-${useId().replace(/[:]/g, '')}`
  const btnRef = useRef<HTMLButtonElement>(null)
  const tipRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }
  // Place the top-layer tip against the trigger and clamp it into the viewport,
  // so a wide tip on an edge column can't run off-screen. Anchor positioning was
  // too unreliable for this across engines; explicit fixed coords are exact.
  const place = () => {
    const btn = btnRef.current
    const el = tipRef.current
    if (!btn || !el) return
    const M = 8 // gap + viewport margin
    const a = btn.getBoundingClientRect()
    const w = el.offsetWidth
    const h = el.offsetHeight
    const vw = document.documentElement.clientWidth
    const vh = document.documentElement.clientHeight
    // Prefer below; flip above if it would overflow the bottom and there's room.
    const below = a.bottom + M + h <= vh || a.top - M - h < 0
    const top = below ? a.bottom + M : a.top - M - h
    // Center on the trigger, then clamp to [M, vw - w - M].
    let left = a.left + a.width / 2 - w / 2
    left = Math.max(M, Math.min(left, vw - w - M))
    el.style.left = `${Math.round(left)}px`
    el.style.top = `${Math.round(top)}px`
  }
  const open = () => {
    clearClose()
    const el = tipRef.current
    if (el && !el.matches(':popover-open')) {
      el.showPopover()
      place()
    }
  }
  const scheduleClose = () => {
    clearClose()
    closeTimer.current = setTimeout(() => {
      const el = tipRef.current
      if (el && el.matches(':popover-open')) el.hidePopover()
    }, 160)
  }

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        className="qual"
        aria-label={t('compare.qualAria', { value, school })}
        aria-details={id}
        onPointerEnter={open}
        onPointerLeave={scheduleClose}
        onFocus={open}
        onBlur={scheduleClose}
      >
        <span className="mark-val">{value}</span>
        <span className="qual-dot" aria-hidden="true" />
      </button>
      <div
        id={id}
        ref={tipRef}
        popover="manual"
        className="tip"
        onPointerEnter={clearClose}
        onPointerLeave={scheduleClose}
      >
        <div className="tip-scroll">
          <span className="tip-kind">{t(`compare.qual.${qual.kind}`)}</span>
          <span className="tip-body">{qual.text}</span>
        </div>
      </div>
    </>
  )
}
