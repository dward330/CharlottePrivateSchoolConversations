// Resolves the research prose in src/data/** against a locale overlay.
//
// See .claude/docs/prose-translation-architecture.md. English is the source of
// truth and is never edited for translation; a locale ships a PARTIAL overlay
// keyed by field path, and anything absent falls back to English field-by-field.
//
// THE HARD REQUIREMENT — identity preservation. With no overlay for the active
// locale, `localized()` returns the EXACT English object it was given, not a
// copy. SchoolDetail derives render decisions from object presence (its own
// comments warn that a present-but-empty entry is still truthy and would
// suppress a whole section), and a fresh object identity on every render would
// risk dropping a section or churning re-renders — for ENGLISH readers, who get
// no benefit from any of this. Every early return below exists to honour that.
//
// STALENESS. Each overlay entry carries `of`, a hash of the English string it
// was translated from. When the English is rewritten the hash stops matching and
// the entry is IGNORED, so that field renders English. An overlay can therefore
// never serve a translation of text that no longer exists — staleness degrades
// to untranslated, never to wrong. `scripts/check_translations.mjs` reports the
// drift; this function is what makes it harmless in the meantime.

/** One translated string plus the hash of the English it was made from. */
export type OverlayEntry = {
  /** The translated text. */
  t: string
  /** Short hash of the English source string (see scripts/i18n_stamp.mjs). */
  of: string
  /** Field paths this string occurs at, as `school:path`. */
  at: string[]
  /**
   * The English source. Present in the work file a translator edits; STRIPPED
   * from the shipped overlay by `i18n_build_overlay.mjs`, because the runtime
   * never needs it — it re-derives the hash from the live English in
   * src/data/**. Carrying it to the browser would ship the whole corpus twice.
   */
  text?: string
}

/** A locale's work file, as written by i18n_extract.mjs and translated in place. */
export type OverlayFile = {
  topic: string
  lang: string
  strings: OverlayEntry[]
}

/**
 * `school:path` -> translated string, for entries whose English still matches.
 * Built once per (topic, locale) and reused across every school in that topic.
 */
export type OverlayIndex = Map<string, { t: string; of: string }>

/**
 * Flattens a work file into a lookup keyed by field path.
 *
 * Entries with an empty `t` are skipped: an untranslated string must render
 * English, not blank. Deduplication means one entry can cover many paths, so
 * each `at` becomes its own key.
 */
export function indexOverlay(file: OverlayFile | undefined): OverlayIndex | undefined {
  if (!file?.strings?.length) return undefined
  const index: OverlayIndex = new Map()
  for (const entry of file.strings) {
    if (!entry.t) continue
    for (const at of entry.at) index.set(at, { t: entry.t, of: entry.of })
  }
  return index.size ? index : undefined
}

/**
 * The same short hash `i18n_extract.mjs` stamps into `of`, reimplemented for the
 * browser (node:crypto is not available client-side). Both sides must agree
 * exactly or every entry reads as stale — `scripts/check_hash_parity.mjs`
 * asserts they do.
 *
 * FNV-1a, 32-bit, hex-padded to 8 chars.
 */
export function stampFor(s: string): string {
  let h = 0x811c9dc5
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 0x01000193) >>> 0
  }
  return h.toString(16).padStart(8, '0')
}

/**
 * Loaded overlay indexes, keyed `<topic>:<lang>`.
 *
 * Kept HERE rather than in a topic loader because sibling layers need to read
 * the same index — clubClusters.ts and clubCatalog.ts render two of the five
 * Student Clubs cards and resolve against the student-clubs overlay. Importing
 * the loader to reach it would drag `import.meta.glob` into modules the
 * build-time checkers load under plain Node, where it throws. This module has
 * no Vite-only syntax, so anything can import it.
 */
const OVERLAYS = new Map<string, OverlayIndex | undefined>()

export function setOverlayIndex(topic: string, lang: string, index: OverlayIndex | undefined): void {
  OVERLAYS.set(`${topic}:${lang}`, index)
}

export function overlayIndex(topic: string, lang: string): OverlayIndex | undefined {
  return OVERLAYS.get(`${topic}:${lang}`)
}

export function hasOverlay(topic: string, lang: string): boolean {
  return OVERLAYS.has(`${topic}:${lang}`)
}

/**
 * Returns `en` with every field the overlay covers replaced by its translation.
 *
 * `prefix` is the school slug, so overlay keys read `cannon:affinity.headline`
 * and one index serves every school in the topic.
 *
 * Returns `en` BY REFERENCE when nothing applies — see the identity requirement
 * above. That is the common path: it is what every English reader hits.
 */
export function localized<T>(en: T, index: OverlayIndex | undefined, prefix: string): T {
  if (!index || en == null) return en
  // Keys are `<school>:<path>` — the separator is a colon, so the school prefix
  // is passed as `<school>:` and `walk` appends the first path segment directly
  // rather than joining it with a dot.
  return walk(en, index, `${prefix}:`) as T
}

/**
 * Depth-first rebuild that reuses the original node whenever nothing beneath it
 * changed, so untranslated subtrees keep their original object identity and
 * React sees no change.
 */
function walk(node: unknown, index: OverlayIndex, path: string): unknown {
  if (typeof node === 'string') {
    const hit = index.get(path)
    // Hash mismatch = the English was rewritten after translation. Ignore the
    // overlay and render English rather than stale Spanish.
    if (!hit || hit.of !== stampFor(node)) return node
    return hit.t
  }

  if (Array.isArray(node)) {
    let changed = false
    const out = node.map((v, i) => {
      const next = walk(v, index, `${path}[${i}]`)
      if (next !== v) changed = true
      return next
    })
    return changed ? out : node
  }

  if (node && typeof node === 'object') {
    let changed = false
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(node)) {
      // `path` ends with ':' at the root (the `<school>:` prefix), so the first
      // segment attaches directly and only nested keys take a dot.
      const next = walk(v, index, path.endsWith(':') ? `${path}${k}` : `${path}.${k}`)
      if (next !== v) changed = true
      out[k] = next
    }
    return changed ? out : node
  }

  return node
}
