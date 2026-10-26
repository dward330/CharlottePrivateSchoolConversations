// Click-and-drag sideways panning for the Compare table.
//
// With every school selected the table is far wider than its frame, and a mouse
// user had to find the scrollbar or use shift+wheel. This lets them grab any
// non-interactive part of the table and drag it left or right. The wrapper gets
// `can-pan` while it actually overflows (index.css shows a grab cursor) and
// `is-panning` during a drag (a closed hand).
//
// Mouse only. Touch and pen already scroll the wrapper natively, and taking over
// touch gestures would break vertical page scrolling on a phone.
//
// A drag can never START on a link or tooltip trigger (INTERACTIVE), but it can
// END over one, and the browser then fires a click on it. So after a real drag
// the next click on the wrapper is swallowed in the capture phase.
//
// RTL (fa, ar): scrollLeft runs 0 → negative there, but `startLeft - dx` still
// holds — in both directions, dragging right reveals the content to the left.

import { useEffect, type RefObject } from 'react'

// Anything that has its own click or hover behaviour. A press here never pans.
const INTERACTIVE =
  'a, button, input, select, textarea, summary, label, [role="button"], .qual, .tip'

// How far the mouse must move before a press counts as a drag, not a click.
const THRESHOLD = 5

export function useDragPan(ref: RefObject<HTMLElement | null>, enabled: boolean) {
  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return

    const measure = () => el.classList.toggle('can-pan', el.scrollWidth - el.clientWidth > 1)
    const resize = new ResizeObserver(measure)
    resize.observe(el)
    // The wrapper's own size need not change when the table widens.
    if (el.firstElementChild) resize.observe(el.firstElementChild)
    measure()

    let pressed = false
    let dragged = false
    let startX = 0
    let startLeft = 0
    let pointerId = -1
    let clearTimer = 0

    const swallow = (e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      disarm()
    }
    const disarm = () => {
      clearTimeout(clearTimer)
      el.removeEventListener('click', swallow, true)
    }

    const onDown = (e: PointerEvent) => {
      disarm()
      if (e.pointerType !== 'mouse' || e.button !== 0) return
      if (!el.classList.contains('can-pan')) return
      if ((e.target as Element).closest(INTERACTIVE)) return
      pressed = true
      dragged = false
      startX = e.clientX
      startLeft = el.scrollLeft
      pointerId = e.pointerId
      e.preventDefault() // no text selection
    }
    const onMove = (e: PointerEvent) => {
      if (!pressed || e.pointerId !== pointerId) return
      // Released outside the table before the threshold (no capture yet).
      if ((e.buttons & 1) === 0) return onEnd(e)
      const dx = e.clientX - startX
      if (!dragged) {
        if (Math.abs(dx) < THRESHOLD) return
        dragged = true
        el.classList.add('is-panning')
        el.setPointerCapture(pointerId)
      }
      el.scrollLeft = startLeft - dx
    }
    const onEnd = (e: PointerEvent) => {
      if (!pressed || e.pointerId !== pointerId) return
      pressed = false
      el.classList.remove('is-panning')
      if (el.hasPointerCapture(pointerId)) el.releasePointerCapture(pointerId)
      if (dragged) {
        el.addEventListener('click', swallow, true)
        // A drag released off the table fires no click here; don't let the
        // swallower eat a later, unrelated one.
        clearTimer = window.setTimeout(disarm, 0)
      }
    }

    el.addEventListener('pointerdown', onDown)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerup', onEnd)
    el.addEventListener('pointercancel', onEnd)
    el.addEventListener('lostpointercapture', onEnd)
    return () => {
      disarm()
      resize.disconnect()
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerup', onEnd)
      el.removeEventListener('pointercancel', onEnd)
      el.removeEventListener('lostpointercapture', onEnd)
      el.classList.remove('can-pan', 'is-panning')
    }
  }, [ref, enabled])
}
