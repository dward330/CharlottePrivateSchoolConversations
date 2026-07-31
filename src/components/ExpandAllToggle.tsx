import { useState } from 'react'

/**
 * TEMPORARY — translation print-out aid. Remove once the French
 * print-outs are done.
 *
 * Opens (or closes) every <details> on the page in one click, so a whole
 * school's cards can be captured in a single screenshot instead of expanded
 * one at a time.
 *
 * Deliberately reaches into the DOM rather than threading `open` state through
 * SchoolDetail: the cards are native <details> elements scattered across ~30
 * render sites, and this is scaffolding with a known removal date. Nothing else
 * depends on it, so the blast radius of the hack is this file.
 *
 * Not translated and not in the locale catalogs — adding throwaway keys to
 * en.json would mean adding them to every other language too, and then removing
 * them again.
 */
export function ExpandAllToggle() {
  const [expanded, setExpanded] = useState(false)

  function toggle() {
    const next = !expanded
    // Skip the language picker's own disclosure so the menu does not spring
    // open behind the page you are trying to photograph.
    document
      .querySelectorAll<HTMLDetailsElement>('main details')
      .forEach((d) => { d.open = next })
    setExpanded(next)
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      title={expanded ? 'Collapse all cards' : 'Expand all cards'}
      aria-label={expanded ? 'Collapse all cards' : 'Expand all cards'}
      style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.04em', width: 'auto', padding: '0 0.55rem' }}
    >
      {expanded ? 'COLLAPSE' : 'EXPAND'}
    </button>
  )
}
