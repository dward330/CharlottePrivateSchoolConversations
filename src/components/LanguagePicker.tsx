import { useEffect, useId, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SUPPORTED, isTranslated, langCodeOf, langOf, setLanguage } from '../lib/i18n.ts'

/**
 * Nav control that switches the UI language for the whole app. It only sets the
 * active locale — react-i18next re-renders everything downstream — and the choice
 * persists to one localStorage key that every page and open tab reads.
 *
 * Languages without a catalog yet stay selectable and carry a COMING SOON tag;
 * they render English until their file lands (see src/lib/i18n.ts).
 */
export function LanguagePicker() {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const [failed, setFailed] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const panelId = useId()

  // The *chosen* locale, not i18n.resolvedLanguage — for a language we list but
  // haven't translated yet, resolvedLanguage is 'en' (that's the string fallback
  // working), and reading it here would label the trigger "English" and tick the
  // English row while Hindi is selected. i18n.language may carry a region
  // ("es-MX"), so normalise to the bare code the rows use.
  const current = langCodeOf(i18n.language)
  const currentLang = langOf(current)

  // Close on outside click and on Escape; Escape returns focus to the trigger.
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      btnRef.current?.focus()
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  async function choose(code: string) {
    const ok = await setLanguage(code)
    // A bundle that fails to load leaves us on English; say so in the panel
    // rather than closing it on a change that didn't happen.
    setFailed(!ok)
    if (ok) {
      setOpen(false)
      btnRef.current?.focus()
    }
  }

  return (
    <div className="lang-picker" ref={wrapRef}>
      <button
        type="button"
        ref={btnRef}
        className="lang-trigger"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={t('language.label')}
        onClick={() => { setOpen((v) => !v) }}
      >
        <GlobeIcon />
        <span className="lang-trigger-name">{currentLang.native}</span>
        <ChevronIcon />
      </button>

      {open && (
        <div className="lang-panel" id={panelId}>
          <div className="lang-panel-head">
            <span className="tag-outline">{t('language.tag')}</span>
            {failed && <span className="lang-note">{t('language.loadFailed')}</span>}
          </div>

          <div className="lang-list" role="listbox" aria-label={t('language.label')}>
            {SUPPORTED.map((l) => {
              const on = l.code === current
              // Listed so the roadmap is visible, but not selectable until its
              // catalog lands — picking one would only render English.
              const soon = !isTranslated(l.code)
              return (
                <button
                  key={l.code}
                  type="button"
                  role="option"
                  aria-selected={on}
                  aria-disabled={soon}
                  disabled={soon}
                  className={`lang-row ${on ? 'on' : ''} ${soon ? 'soon' : ''}`}
                  onClick={() => { void choose(l.code) }}
                >
                  {/* dir sits on the native name alone, never the row: an RTL row
                      would reverse the whole flex line and drag the Arabic and
                      Farsi names out of the column the other rows share. */}
                  <span className="lang-row-names">
                    {/* No dir attribute: the bidi algorithm already shapes the
                        Arabic/Farsi run correctly, and forcing dir="rtl" here
                        would right-align the name inside its own block. */}
                    <span className="lang-row-native" lang={l.code}>{l.native}</span>
                    {l.native !== l.label && (
                      <span className="lang-row-label">{l.label}</span>
                    )}
                  </span>
                  {soon && <span className="lang-soon">{t('language.comingSoon')}</span>}
                  <span className="lang-check" aria-hidden="true">{on && <CheckIcon />}</span>
                </button>
              )
            })}
          </div>

          <p className="lang-foot">{t('language.disclosure')}</p>
        </div>
      )}
    </div>
  )
}

function GlobeIcon() {
  return (
    <svg
      width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" focusable="false"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg
      width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" focusable="false"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" focusable="false"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}
