// i18n bootstrap.
//
// Translation strings live one-file-per-language under src/locales/<lang>.json,
// so a translator can be handed a single self-contained file. To add a language:
// copy en.json, translate the values (leave the keys alone), then register it in
// SUPPORTED and `resources` below.
//
// SCOPE: this layer covers UI chrome only — nav, buttons, headings, labels. The
// ~165k words of school research in src/data/ are deliberately NOT here; that
// content is locale-keyed at the data layer instead (see the i18n note in
// CLAUDE.md). Putting research prose in these files would desync every non-English
// locale on each ingest pass.
//
// These files are small enough to bundle statically. If the language list grows
// past a handful, switch to i18next-http-backend and lazy-load per locale.

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from '../locales/en.json'
import es from '../locales/es.json'

export const FALLBACK_LANG = 'en'

/** Languages offered in the picker, in display order. */
export const SUPPORTED = [
  { code: 'en', labelKey: 'language.en' },
  { code: 'es', labelKey: 'language.es' },
] as const

export type LangCode = (typeof SUPPORTED)[number]['code']

const STORAGE_KEY = 'cpsc-lang'

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    fallbackLng: FALLBACK_LANG,
    supportedLngs: SUPPORTED.map((l) => l.code),
    // Treat "es-MX", "es-419" etc. as "es" — we translate per language, not per region.
    load: 'languageOnly',
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: STORAGE_KEY,
      caches: ['localStorage'],
    },
    interpolation: {
      // React already escapes interpolated values.
      escapeValue: false,
    },
  })

// Keep <html lang> in step with the active language, for screen readers and for
// browser/machine translation heuristics.
function syncHtmlLang(lng: string) {
  document.documentElement.setAttribute('lang', lng)
}
syncHtmlLang(i18n.resolvedLanguage ?? FALLBACK_LANG)
i18n.on('languageChanged', syncHtmlLang)

export default i18n
