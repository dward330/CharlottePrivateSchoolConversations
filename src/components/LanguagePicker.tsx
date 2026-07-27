import { useTranslation } from 'react-i18next'
import { SUPPORTED } from '../lib/i18n.ts'

/** Nav control that switches the UI language. Choice persists to localStorage. */
export function LanguagePicker() {
  const { t, i18n } = useTranslation()

  // i18n.language may carry a region ("es-MX"); the picker options are bare codes.
  const current = i18n.resolvedLanguage ?? i18n.language

  return (
    <label className="lang-picker">
      <span className="sr-only">{t('language.label')}</span>
      <select
        value={current}
        onChange={(e) => { void i18n.changeLanguage(e.target.value) }}
      >
        {SUPPORTED.map((l) => (
          <option key={l.code} value={l.code}>
            {t(l.labelKey)}
          </option>
        ))}
      </select>
    </label>
  )
}
