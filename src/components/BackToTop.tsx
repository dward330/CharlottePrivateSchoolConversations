import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

// A floating "back to top" button. Hidden until the page is scrolled past a
// threshold, then fades in at the bottom-right; clicking smooth-scrolls to the top.
// `accent` overrides the button color (used to match a school page's brand); when
// omitted it falls back to the app's default --brand.

export function BackToTop({ accent }: { accent?: string }) {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      className={`back-to-top ${visible ? 'show' : ''}`}
      aria-label={t('school.backToTop')}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      style={accent ? { ['--brand' as string]: accent } : undefined}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 19V6M6 12l6-6 6 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
