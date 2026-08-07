import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

// The school name, frozen into the sticky nav once the page's own <h1> scrolls
// under it, so a reader deep in the research areas still knows which of the six
// schools they're reading. Deliberately NOT a link: .brand right beside it
// already goes Home, and BackToTop covers returning to the title.
//
// `name` is null on Home and Compare, where there's nothing to freeze.
//
// The trigger is an IntersectionObserver on #school-title (SchoolDetail.tsx),
// not a scrollY threshold — the dossier header's height varies with the school
// (crest, podcast line, chip wrapping) and the viewport, so no fixed pixel
// value is right everywhere.

export function StickySchoolTitle({ name }: { name: string | null }) {
  const { t } = useTranslation()
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (!name) return
    // A fresh school page starts scrolled to the top, with the <h1> visible.
    setShown(false)

    // The -80px top inset matches the scroll-margin-top the page already uses
    // for the sticky nav, so the swap fires as the title slides under the bar
    // rather than when it clears the raw viewport.
    const io = new IntersectionObserver(
      ([entry]) => setShown(!entry.isIntersecting),
      { rootMargin: '-80px 0px 0px 0px', threshold: 0 },
    )

    // On a cold load SchoolDetail renders placeholders behind its `ready` gate,
    // so the <h1> is usually absent when this effect first runs. Watch for it.
    let mo: MutationObserver | null = null
    const attach = () => {
      const el = document.getElementById('school-title')
      if (!el) return false
      io.observe(el)
      return true
    }
    if (!attach()) {
      mo = new MutationObserver(() => {
        if (attach()) {
          mo?.disconnect()
          mo = null
        }
      })
      mo.observe(document.body, { childList: true, subtree: true })
    }

    return () => {
      io.disconnect()
      mo?.disconnect()
    }
  }, [name])

  if (!name) return null

  return (
    <span
      className={`nav-school ${shown ? 'show' : ''}`}
      aria-hidden={!shown}
      aria-label={t('a11y.viewingSchool', { school: name })}
    >
      {name}
    </span>
  )
}
