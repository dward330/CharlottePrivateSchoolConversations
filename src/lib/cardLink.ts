/**
 * Card deep links: `/school/<slug>/#<area name>/<card name>` scrolls to one
 * research card and opens it.
 *
 * THE NAMING RULE IS A HARD RULE, set by the user on 2026-11-13. Both halves of
 * the link are the ENGLISH name exactly as the page shows it for that school
 * (on every locale — one link works in every language), converted by
 * `linkName()`:
 *
 *   1. `&` becomes the word `and`
 *   2. apostrophes (`'` and `’`) are removed
 *   3. accents are stripped (NFD, then combining marks dropped)
 *   4. lower-cased
 *   5. every run of characters outside [a-z0-9] becomes a single `-`
 *   6. `-` is trimmed from both ends
 *
 *   Sports / The College Pipeline         → #sports/the-college-pipeline
 *   Global Exposure / Verdict & Visit Checklist
 *                                         → #global-exposure/verdict-and-visit-checklist
 *
 * The rule is defined here and nowhere else. A rename changes the link, and the
 * old link keeps working through ./cardLinkAliases.ts (enforced by
 * `npm run check:cardlink`). The older `#topic-<slug>` section links stay
 * working permanently, and they go through here too (user, 2026-11-13). The
 * browser's own fragment scroll handled them until then, and it was not
 * stable: it fires before the research renders, so the first area drifted
 * 340–640px as Latest News loaded above it, and some areas never scrolled at
 * all (measured on the live site). Re-aiming through scrollToSection fixes both.
 */

import { quietReplaceUrl } from './analytics.ts'
import { AREA_ALIASES, CARD_ALIASES } from './cardLinkAliases.ts'
import { scrollToSection } from './scrollToSection.ts'

/** The link form of a visible name. See the six-step rule above. */
export function linkName(name: string): string {
  return name
    .replace(/&/g, ' and ')
    .replace(/['’]/g, '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** The element id (and link hash) of one card: `<area>/<card>`. */
export function cardLinkId(areaName: string, cardName: string): string {
  return `${linkName(areaName)}/${linkName(cardName)}`
}

/** The area half of a card id: `sports/the-college-pipeline` → `sports`. */
export function areaOfCardId(id: string): string {
  return id.split('/')[0]
}

/**
 * Show `hash` (no leading '#'; null clears it) in the address bar, quietly.
 * The path and query (`?lang=es`) are kept, and so is `history.state`.
 *
 * The URL follows the reader (user, 2026-11-14, replacing the cardlink rule
 * "read the hash, never write it"), under three constraints:
 *
 *   - replaceState ONLY — never pushState (Back would step through every card)
 *     and never `location.hash = …` (a history entry, a `hashchange` that
 *     re-runs openFromHash, and the browser's own fragment jump).
 *   - Through quietReplaceUrl(), never a raw replaceState. The Cloudflare
 *     beacon counts any same-document navigation as a page-view wherever the
 *     Navigation API exists; the `<head>` guard in index.html silences only
 *     writes that go through quietReplaceUrl. `npm run audit:pageviews` checks.
 *   - On user clicks only: never on load, scroll, openFromHash or "Expand all".
 *
 * A no-op when the URL already matches. Never throws: a URL write must never
 * break a click.
 */
export function showLinkInUrl(hash: string | null): void {
  if (typeof window === 'undefined') return
  const { pathname, search, hash: current } = window.location
  const target = pathname + search + (hash ? `#${hash}` : '')
  if (target === pathname + search + current) return
  try {
    quietReplaceUrl(target)
  } catch {
    /* An exotic sandbox: the click still did its job. */
  }
}

/**
 * Act on an inbound card or area hash. Returns the slug of the research area
 * it scrolled to (so the caller can select that area in the table of
 * contents), or null when the hash is not one of ours.
 *
 * `areas` is this school's covered research areas, each with its `linkName()`
 * form of the English area name.
 *
 * This only READS the hash. A load or a hashchange never writes the URL. The
 * address bar follows the reader's own clicks instead (a card's summary, a
 * table-of-contents chip), and only through `showLinkInUrl()` below.
 */
export function openFromHash(
  hash: string,
  areas: { slug: string; link: string }[],
): string | null {
  let h = hash.replace(/^#/, '')
  try {
    h = decodeURIComponent(h)
  } catch {
    /* A malformed escape: match on the raw text. */
  }
  h = h.toLowerCase()
  /* `welcome`, `news` and the legacy `#/…` routes belong to the browser's own
     anchor scroll or to the router. */
  if (!h || h.startsWith('/')) return null

  /* The original section links, `#topic-<slug>`: already shared, kept forever.
     The browser has made its own one-shot jump by now; re-aim so the section
     stays put while the page grows above it. */
  if (h.startsWith('topic-')) {
    const slug = h.slice('topic-'.length)
    if (!areas.some((a) => a.slug === slug)) return null
    scrollToSection(`topic-${slug}`)
    return slug
  }

  const cut = h.indexOf('/')
  const areaPart = cut === -1 ? h : h.slice(0, cut)
  const cardPart = cut === -1 ? '' : h.slice(cut + 1)

  let area = areas.find((a) => a.link === areaPart)
  if (!area) {
    const alias = AREA_ALIASES.find((a) => a.from === areaPart)
    area = alias && areas.find((a) => a.slug === alias.topic)
  }
  if (!area) return null

  if (cardPart) {
    let el: HTMLElement | null = document.getElementById(`${area.link}/${cardPart}`)
    if (!el) {
      const slug = area.slug
      const alias = CARD_ALIASES.find(
        (a) => a.from === cardPart && (a.topic === undefined || a.topic === slug),
      )
      if (alias) {
        el = document.querySelector<HTMLElement>(
          `details.note-card[data-card="${CSS.escape(`${slug}:${alias.key}`)}"]`,
        )
      }
    }
    if (el && el.id) {
      if (el instanceof HTMLDetailsElement) el.open = true
      scrollToSection(el.id)
      return area.slug
    }
  }

  scrollToSection(`topic-${area.slug}`)
  return area.slug
}
