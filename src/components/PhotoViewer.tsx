// Click-to-enlarge photo viewer shared by every research photo surface —
// sports Facilities, the Arts card photos and the Summer Programs band (plan
// `photolightbox`).
//
// A native <dialog> opened with showModal(): it sits in the top layer above the
// sticky nav, traps focus, makes the page inert and fires `cancel` on Escape,
// so no lightbox library is needed. The dialog is mounted only while open, so
// prerendered pages carry no viewer markup at all.
//
// The viewer adds no prose. Captions, credits and alt text are the same
// research values the thumbnail shows, already localized (or deliberately kept
// in English) by the overlay layer; only the button labels and counter are
// chrome, from `photoViewer.*`. Its open/close state lives in usePhotoViewer.ts.

import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

/** One photo as the viewer shows it. `src` is already resolved by the caller. */
export type ViewerPhoto = {
  src: string
  alt: string
  title?: string
  meta?: string
  caption?: string
  credit?: string
}

/**
 * The thumbnail trigger: a real button around the <img>, so keyboard and
 * screen-reader users can open the viewer. The existing `.sports-photo img`
 * etc. selectors still match because the image stays a descendant.
 */
export function PhotoZoomButton({
  label,
  onOpen,
  children,
}: {
  label: string
  onOpen: (trigger: HTMLButtonElement) => void
  children: React.ReactNode
}) {
  const { t } = useTranslation()
  return (
    <button
      type="button"
      className="photo-zoom"
      aria-label={t('photoViewer.open', { name: label })}
      aria-haspopup="dialog"
      onClick={(e) => { onOpen(e.currentTarget) }}
    >
      {children}
      <svg className="photo-zoom-glyph" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <circle cx="10.5" cy="10.5" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M15 15l5 5M10.5 7.5v6M7.5 10.5h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </button>
  )
}

export function PhotoViewer({
  photos,
  index,
  onIndexChange,
  onClose,
}: {
  photos: ViewerPhoto[]
  index: number | null
  onIndexChange: (i: number) => void
  onClose: () => void
}) {
  const { t } = useTranslation()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const isOpen = index !== null

  useEffect(() => {
    if (!isOpen) return
    const dialog = dialogRef.current
    // StrictMode double-invokes effects in dev; showModal() throws on an open dialog.
    if (dialog && !dialog.open) dialog.showModal()
    const root = document.documentElement
    root.classList.add('photo-viewer-open')
    closeRef.current?.focus()
    // Cleanup, not onClose, owns the scroll lock — a route change can unmount
    // the viewer while it is open.
    return () => { root.classList.remove('photo-viewer-open') }
  }, [isOpen])

  if (index === null) return null
  const photo = photos[index]
  if (!photo) return null
  const total = photos.length
  const step = (d: number) => { onIndexChange((index + d + total) % total) }

  // "Next" always points in the reading direction, so RTL swaps left and right.
  const rtl = () => document.documentElement.dir === 'rtl'

  function onKeyDown(e: React.KeyboardEvent<HTMLDialogElement>) {
    if (total < 2 || (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')) return
    e.preventDefault()
    step((e.key === 'ArrowRight') !== rtl() ? 1 : -1)
  }

  // Phones: a horizontal swipe on the image steps through the group, like the
  // arrow keys — a finger moving left reveals the next photo (mirrored in RTL).
  // A mostly-vertical or short drag is ignored, so it never fights a tap.
  function onTouchStart(e: React.TouchEvent) {
    const p = e.touches[0]
    touchStart.current = e.touches.length === 1 && p ? { x: p.clientX, y: p.clientY } : null
  }
  function onTouchEnd(e: React.TouchEvent) {
    const start = touchStart.current
    const p = e.changedTouches[0]
    touchStart.current = null
    if (total < 2 || !start || !p) return
    const dx = p.clientX - start.x
    const dy = p.clientY - start.y
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy) * 1.5) return
    step((dx < 0) !== rtl() ? 1 : -1)
  }

  return (
    <dialog
      ref={dialogRef}
      className="pv-dialog"
      aria-label={t('photoViewer.dialogLabel')}
      onCancel={(e) => { e.preventDefault(); onClose() }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      onKeyDown={onKeyDown}
    >
      <div className="pv-panel">
        <button
          type="button"
          ref={closeRef}
          className="pv-close"
          aria-label={t('photoViewer.close')}
          onClick={onClose}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <figure className="pv-figure">
          <div className="pv-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <img key={photo.src} className="pv-img" src={photo.src} alt={photo.alt} />
          </div>
          {total > 1 && (
            <div className="pv-navs">
              <button
                type="button"
                className="pv-nav pv-prev"
                aria-label={t('photoViewer.previous')}
                onClick={() => { step(-1) }}
              >
                <ArrowGlyph />
              </button>
              <span className="pv-count">
                {t('photoViewer.position', { current: index + 1, total })}
              </span>
              <button
                type="button"
                className="pv-nav pv-next"
                aria-label={t('photoViewer.next')}
                onClick={() => { step(1) }}
              >
                <ArrowGlyph />
              </button>
            </div>
          )}
          {(photo.title || photo.meta || photo.caption || photo.credit) && (
            <figcaption className="pv-caption">
              {photo.title && <strong>{photo.title}</strong>}
              {photo.meta && <>{photo.title && ' · '}{photo.meta}</>}
              {photo.caption && <div className="pv-muted">{photo.caption}</div>}
              {photo.credit && <div className="pv-muted pv-credit">{photo.credit}</div>}
            </figcaption>
          )}
        </figure>
      </div>
    </dialog>
  )
}

/** A right-pointing chevron; `.pv-prev` and RTL mirror it in CSS. */
function ArrowGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
