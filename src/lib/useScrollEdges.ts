// Edge fades for the sideways-scroll tables on a school page.
//
// About a hundred research cards hold a genuine multi-column table (records,
// ledgers, cost matrices) that scrolls sideways inside its own wrapper on a
// phone. That works, but nothing on screen said there was more to the right.
// This marks each wrapper with `data-scroll-left` / `data-scroll-right` while
// content is hidden on that side, and index.css draws a mask-image fade there.
//
// A mask rather than a `background-attachment: local` shadow because the tables
// paint opaque header and row-header backgrounds, which cover a background.
//
// The attributes are PHYSICAL sides. In RTL (fa, ar) a wrapper starts scrolled
// to its right edge and scrollLeft runs 0 → negative, so start/end are computed
// from the element's direction first, then mapped to left/right.

import { useEffect, type RefObject } from 'react'

const WRAPPERS = [
  '.table-wrap',
  '.as-table-wrap',
  '.as-scroll',
  '.cs-ledger-wrap',
  '.sports-scroll',
  '.arts-scroll',
  '.clubs-ledger-wrap',
  '.prose-table-wrap',
  '.catalog-scroll',
  '.hsp-destlist',
].join(', ')

function update(el: HTMLElement) {
  const max = el.scrollWidth - el.clientWidth
  const rtl = getComputedStyle(el).direction === 'rtl'
  const from = rtl ? -el.scrollLeft : el.scrollLeft // distance scrolled from the start
  const startHidden = max > 1 && from > 1
  const endHidden = max > 1 && from < max - 1
  el.toggleAttribute('data-scroll-left', rtl ? endHidden : startHidden)
  el.toggleAttribute('data-scroll-right', rtl ? startHidden : endHidden)
}

export function useScrollEdges(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const host = root.current
    if (!host) return
    const seen = new WeakSet<HTMLElement>()
    const onScroll = (e: Event) => update(e.currentTarget as HTMLElement)
    const resize = new ResizeObserver((entries) => {
      for (const en of entries) {
        const el = en.target as HTMLElement
        update(el.matches(WRAPPERS) ? el : (el.parentElement as HTMLElement))
      }
    })
    const scan = () => {
      host.querySelectorAll<HTMLElement>(WRAPPERS).forEach((el) => {
        if (!seen.has(el)) {
          seen.add(el)
          el.addEventListener('scroll', onScroll, { passive: true })
          resize.observe(el)
          // The wrapper's own size need not change when its content widens.
          if (el.firstElementChild) resize.observe(el.firstElementChild)
        }
        update(el)
      })
    }
    // Research sections mount lazily and cards open later, so re-scan on both.
    let frame = 0
    const rescan = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(scan)
    }
    const mo = new MutationObserver(rescan)
    mo.observe(host, { childList: true, subtree: true })
    host.addEventListener('toggle', rescan, true) // <details> toggle does not bubble
    scan()
    return () => {
      cancelAnimationFrame(frame)
      mo.disconnect()
      resize.disconnect()
      host.removeEventListener('toggle', rescan, true)
      host.querySelectorAll<HTMLElement>(WRAPPERS).forEach((el) => el.removeEventListener('scroll', onScroll))
    }
  }, [root])
}
