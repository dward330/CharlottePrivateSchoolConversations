// i18n bootstrap.
//
// Translation strings live one-file-per-language under src/locales/<lang>.json,
// so a translator can be handed a single self-contained file. To add a language:
// copy en.json, translate the values (leave the keys alone), then add its code to
// TRANSLATED below — the loader picks the file up from the glob automatically.
//
// SCOPE: this layer covers UI chrome only — nav, buttons, headings, labels. The
// ~165k words of school research in src/data/ are deliberately NOT here; that
// content is locale-keyed at the data layer instead (see the i18n note in
// CLAUDE.md). Putting research prose in these files would desync every non-English
// locale on each ingest pass.
//
// PARTIAL SUPPORT IS THE NORMAL STATE. The picker offers ten languages; only the
// ones in TRANSLATED have a catalog today. The rest stay selectable and fall back
// to English string-by-string, so a locale that is half-translated renders as
// English where it has to and never as an error or an empty label.

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from '../locales/en.json'

export const FALLBACK_LANG = 'en'

/** Single app-level key. Shared with the design prototype and read cross-tab. */
export const STORAGE_KEY = 'csc.lang'

export type Lang = {
  code: string
  /** English name, shown under the native name in the picker. */
  label: string
  /** The language's own name — what the trigger and the row headline show. */
  native: string
  rtl?: boolean
  /** Google font family to load for this locale only; Latin locales use Barlow. */
  font?: string
}

/** Languages offered in the picker, in display order. */
export const SUPPORTED: readonly Lang[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'es', label: 'Spanish', native: 'Español' },
  { code: 'fr', label: 'French', native: 'Français' },
  { code: 'ht', label: 'Haitian Creole', native: 'Kreyòl Ayisyen' },
  { code: 'fa', label: 'Farsi', native: 'فارسی', rtl: true, font: 'Noto Naskh Arabic' },
  /* Bangla is standardised differently in Bangladesh and in West Bengal, India
     — everyday vocabulary diverges (পানি vs জল for water) and the two lean
     Perso-Arabic vs Sanskritic. This app targets the DHAKA / BANGLADESH
     standard, so the picker names the country rather than leaving a reader to
     guess which Bangla they are choosing. Code stays `bn` (not `bn-BD`): no
     Kolkata variant is offered, so there is nothing to disambiguate at the
     locale level, and the catalog filename would churn for no gain. */
  {
    code: 'bn',
    label: 'Bengali (Bangladesh)',
    native: 'বাংলা (বাংলাদেশ)',
    font: 'Noto Sans Bengali',
  },
  { code: 'ar', label: 'Arabic', native: 'العربية', rtl: true, font: 'Noto Naskh Arabic' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी', font: 'Noto Sans Devanagari' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు', font: 'Noto Sans Telugu' },
  { code: 'it', label: 'Italian', native: 'Italiano' },
] as const

export type LangCode = (typeof SUPPORTED)[number]['code']

const BY_CODE = new Map(SUPPORTED.map((l) => [l.code, l]))

export function langOf(code: string): Lang {
  return BY_CODE.get(code) ?? SUPPORTED[0]
}

/** Strip any region tag ("es-MX" -> "es") down to a code we actually list. */
export function langCodeOf(code: string | undefined): string {
  if (!code) return FALLBACK_LANG
  const base = code.toLowerCase().split('-')[0]
  return BY_CODE.has(base) ? base : FALLBACK_LANG
}

/**
 * Locales with a catalog in src/locales/. Everything else in SUPPORTED is
 * listed with a COMING SOON tag and renders English until its file lands —
 * adding `fr.json` and `'fr'` here is the whole job of shipping a language.
 *
 * This is UI chrome only. Whether a locale's *research prose* is translated is
 * tracked separately in PROSE_TRANSLATED below — the two layers ship on
 * different schedules by design (see the i18n note in CLAUDE.md).
 */
export const TRANSLATED: readonly string[] = ['en', 'es', 'bn']

export function isTranslated(code: string): boolean {
  return TRANSLATED.includes(code)
}

/**
 * Locales whose *research prose* is translated, as opposed to the UI chrome in
 * TRANSLATED above. Deliberately a separate list: the two layers shipped on
 * different schedules, chrome first (PRs #40–#43), prose across eight stages.
 *
 * Spanish joined 2026-07-28 when the last stage landed. That covers both prose
 * layers — the structured cards in src/data/** and the ingested notes in
 * src/content/** that a parent can still reach.
 *
 * Bangla joined 2026-07-29 with all nine topics translated in one pass. It is
 * LTR, so the `dir` consumer below is a no-op for it; it is listed here because
 * its prose genuinely is translated, which is what this list means.
 *
 * Only consumer is the `dir` attribute below, which drives one CSS rule. An RTL
 * locale whose prose is still English has to render that prose as an LTR run,
 * or the bidi algorithm mangles it (see `[data-prose='en'] main` in index.css).
 * Adding a locale here retires that rule for it automatically.
 */
export const PROSE_TRANSLATED: readonly string[] = ['es', 'bn']

export function isProseTranslated(code: string): boolean {
  return PROSE_TRANSLATED.includes(code)
}

// Catalogs load on demand so ten locales don't ride along in the initial bundle.
// English is imported statically: it's the fallback, so it must be present before
// the first paint and can never be the thing that fails to arrive.
// en.json is excluded: it's the static import above, and a module that is both
// statically and dynamically imported can't be split into its own chunk anyway.
const catalogs = import.meta.glob<Record<string, unknown>>(
  ['../locales/*.json', '!../locales/en.json'],
  { import: 'default' },
)

/** Resolved when a locale's catalog is in i18next, or rejected if it can't load. */
async function loadCatalog(code: string): Promise<void> {
  if (code === FALLBACK_LANG || i18n.hasResourceBundle(code, 'translation')) return
  const load = catalogs[`../locales/${code}.json`]
  // Not-yet-translated locale: nothing to fetch, and English fallback covers it.
  if (!load) return
  i18n.addResourceBundle(code, 'translation', await load(), true, true)
}

/**
 * Browser preference, mapped to a language we can actually render. Region tags
 * are dropped, and a listed-but-untranslated match is skipped in favour of the
 * next preference: auto-selecting French would strand the reader on an all-
 * English page with a disabled French row and no way back.
 */
function detectFromNavigator(): string | null {
  const prefs = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const pref of prefs) {
    if (!pref) continue
    const base = pref.toLowerCase().split('-')[0]
    if (BY_CODE.has(base) && isTranslated(base)) return base
  }
  return null
}

/** A code saved before its catalog was pulled must not strand us there either. */
function storedLang(): string | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return v && BY_CODE.has(v) && isTranslated(v) ? v : null
  } catch {
    return null // private mode / storage disabled
  }
}

// An explicit choice always wins; with nothing saved we follow the browser.
// Both sources are already normalised to a bare code we list, which matters:
// `supportedLngs` is checked against the raw `lng` before `load: 'languageOnly'`
// strips a region, so handing init an "es-MX" here would be rejected at startup
// and silently boot English.
const initialLang = storedLang() ?? detectFromNavigator() ?? FALLBACK_LANG

void i18n.use(initReactI18next).init({
  resources: { en: { translation: en } },
  lng: initialLang,
  fallbackLng: FALLBACK_LANG,
  supportedLngs: SUPPORTED.map((l) => l.code),
  // Treat "es-MX", "es-419" etc. as "es" — we translate per language, not per region.
  load: 'languageOnly',
  // A key absent from a partial catalog must render the English string, not the
  // raw key and not an empty node.
  parseMissingKeyHandler: (key: string) => i18n.getFixedT(FALLBACK_LANG)(key),
  returnEmptyString: false,
  interpolation: {
    // React already escapes interpolated values.
    escapeValue: false,
  },
})

/**
 * Resolves once the startup locale's catalog is in i18next AND that locale is
 * the resolved one.
 *
 * main.tsx awaits this before the first render. Without it a saved locale boots
 * visibly English and repaints a frame later, because init() resolves the
 * language synchronously while its catalog is still in flight. A failure here is
 * deliberately swallowed: English is already loaded, which is exactly the
 * fallback we want.
 *
 * The `changeLanguage` call is load-bearing, not a formality. init() is handed
 * `resources: { en }` only — every other catalog arrives later — so i18next
 * resolves past a language it has no bundle for and leaves
 * `i18n.resolvedLanguage === 'en'` even when `lng: 'es'` was passed. Emitting
 * `languageChanged` does NOT fix that; only changeLanguage() updates it.
 *
 * Anything keying off `resolvedLanguage` therefore saw 'en' on a cold load.
 * That silently disabled the research-prose overlays (see
 * src/data/clubsProgram.ts), which resolve by locale and fall back to English
 * without erroring: a returning Spanish reader got Spanish chrome wrapped
 * around English cards, while switching languages by hand worked fine — because
 * the picker calls changeLanguage() itself.
 */
export const ready: Promise<void> = loadCatalog(initialLang)
  .then(() => i18n.changeLanguage(initialLang))
  .then(
    () => { /* resolvedLanguage now matches initialLang */ },
    () => { /* startup bundle failure — English stands in, nothing to undo */ },
  )

/**
 * Switch the active locale for the whole app.
 *
 * Resolves to `true` on success. On a bundle that fails to load we return to
 * English and resolve `false`, which is what the picker turns into its quiet
 * inline notice — never a half-translated page.
 */
export async function setLanguage(code: string): Promise<boolean> {
  // Untranslated locales are inert in the picker; reject them here too so no
  // other caller (cross-tab sync, a stale saved value) can strand us there.
  if (!BY_CODE.has(code) || !isTranslated(code)) return false
  try {
    await loadCatalog(code)
  } catch {
    if (i18n.resolvedLanguage !== FALLBACK_LANG) await i18n.changeLanguage(FALLBACK_LANG)
    persist(FALLBACK_LANG)
    return false
  }
  await i18n.changeLanguage(code)
  persist(code)
  return true
}

function persist(code: string) {
  try {
    localStorage.setItem(STORAGE_KEY, code)
  } catch {
    /* not persisting is fine — the choice still holds for this session */
  }
}

// ---------------------------------------------------------------------------
// Document-level effects of the active locale
// ---------------------------------------------------------------------------

/**
 * Keep <html lang>/<html dir> in step, for screen readers and RTL mirroring.
 *
 * Also publishes `data-prose`, the language the research content is actually
 * written in — 'en' until that locale's prose is translated at the data layer.
 * CSS keys the RTL prose workaround off this rather than off the locale, so the
 * workaround retires itself the moment the prose lands.
 */
function syncHtml(code: string) {
  const lang = langOf(code)
  document.documentElement.setAttribute('lang', lang.code)
  document.documentElement.setAttribute('dir', lang.rtl ? 'rtl' : 'ltr')
  document.documentElement.setAttribute(
    'data-prose',
    isProseTranslated(lang.code) ? lang.code : FALLBACK_LANG,
  )
}

/**
 * Load the script-matched face for non-Latin locales, and only for those — the
 * Latin locales stay on Barlow / Barlow Condensed with no extra request. The
 * family is applied through a token, so every rule that already reads
 * var(--sans) / var(--heading) picks the script up without being touched.
 */
function syncFont(code: string) {
  const font = langOf(code).font
  const style = document.getElementById('i18n-font-vars')
  if (!font) {
    style?.remove()
    return
  }

  const linkId = `i18n-font-${font.replace(/\s+/g, '-')}`
  if (!document.getElementById(linkId)) {
    const link = document.createElement('link')
    link.id = linkId
    link.rel = 'stylesheet'
    link.href = `https://fonts.googleapis.com/css2?family=${font.replace(/\s+/g, '+')}:wght@400;500;600;700&display=swap`
    document.head.appendChild(link)
  }

  const el = style ?? document.createElement('style')
  el.id = 'i18n-font-vars'
  // Barlow stays in the stack as the fallback for Latin runs (acronyms, figures,
  // school names) that the research content keeps in English regardless of locale.
  el.textContent =
    `:root { --sans: '${font}', 'Barlow', system-ui, sans-serif;` +
    ` --heading: '${font}', 'Barlow Condensed', system-ui, sans-serif; }`
  if (!style) document.head.appendChild(el)
}

function applyLocale(code: string) {
  syncHtml(code)
  syncFont(code)
}

applyLocale(i18n.resolvedLanguage ?? initialLang)
i18n.on('languageChanged', applyLocale)

// The choice is one app-level locale, so a change in another tab applies here too.
window.addEventListener('storage', (e) => {
  if (e.key !== STORAGE_KEY || !e.newValue) return
  if (!BY_CODE.has(e.newValue) || e.newValue === i18n.resolvedLanguage) return
  void setLanguage(e.newValue)
})

export default i18n
