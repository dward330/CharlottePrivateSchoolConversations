// Open/close state for one PhotoViewer group (plan `photolightbox`).

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Viewer state for one photo group. Remembers the thumbnail button that opened
 * it and focuses it again on close — the LanguagePicker convention, rather than
 * relying on the browser's own focus restore.
 *
 * The refocus waits for the commit that unmounts the dialog: while a modal
 * <dialog> is still open the page behind it is inert, and focus() on the
 * trigger silently does nothing.
 */
export function usePhotoViewer() {
  const [index, setIndex] = useState<number | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const restoreRef = useRef(false)
  const open = useCallback((i: number, trigger: HTMLElement | null) => {
    triggerRef.current = trigger
    setIndex(i)
  }, [])
  const close = useCallback(() => {
    restoreRef.current = true
    setIndex(null)
  }, [])
  useEffect(() => {
    if (index !== null || !restoreRef.current) return
    restoreRef.current = false
    triggerRef.current?.focus()
  }, [index])
  return { index, open, close, setIndex }
}
