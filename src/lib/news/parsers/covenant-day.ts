import { type NewsItem } from '../types'

/**
 * Covenant Day School — Finalsite post board.
 *
 * Structure verified against the live board 2026-08-28; the full capture and
 * every trap are recorded in
 * `source-material/news/covenant-day/Covenant Day School - News - News Board Structure.md`.
 *
 * This parser is deliberately isolated to this school. It is the FIFTH
 * Finalsite board in the app and it disagrees with all four of the others on
 * where the two most important fields come from, which is precisely why the
 * one-parser-per-school rule exists rather than a shared "Finalsite parser":
 *
 *   • Providence Day / Charlotte Catholic — carry NO summary, so they need a
 *     per-article `preview()` fetch.
 *   • Cannon — carries no summary AND no date.
 *   • Covenant Day — the INVERSE of Providence Day: it publishes a genuine
 *     per-article summary inline in the board markup, and NO date anywhere.
 *
 * So this school needs `publishedAt` but NOT `preview` — the only school in the
 * app with that combination. Sharing any existing Finalsite parser would have
 * either thrown away real summaries or performed ten pointless body fetches.
 *
 * THREE BOARDS, ONE PAGE. `/about-us/news` renders three Finalsite boards, all
 * of them Covenant Day's own news and all kept:
 *   • `fsBoard-218` — `~board/news`       (15 posts, school news)
 *   • `fsBoard-230` — `~board/features`   (15 posts, "Get to Know…" profiles)
 *   • `fsBoard-234` — `~board/lions-news` (7 posts, athletics)
 *
 * They are NOT interleaved by date on the page, and the athletics board is over
 * a YEAR stale (2024 posts) while the other two run current. Date sorting is
 * therefore what actually orders this section — the board's own DOM order would
 * put a two-year-old athletics post above last month's news. Because no date
 * exists until the second pass, `fetchNews` deliberately keeps all 37 posts as
 * a candidate pool and caps to ten only once the dates arrive. See the
 * `needsDates` note in `fetchNews.ts`.
 */

/** Prefer a mid-range render. This board offers 256/512/800/1200/1600/2200 per
    article, so ~640 lands on the 800px variant — a real thumbnail without
    pulling the multi-megabyte original. */
const TARGET_WIDTH = 640

type Sized = { url?: string; width?: number }

/**
 * TRAP 1 — the photo is not in `src`.
 *
 * As on Providence Day and Cannon, the <img> carries NO src attribute at all;
 * the real URLs live in `data-image-sizes` as an HTML-entity-encoded JSON array
 * of {url,width}. A naive src="…jpg" scrape finds ZERO photos and renders every
 * row photo-less — which reads as a correct application of the "some articles
 * have no photo" rule while actually being a parser bug.
 *
 * All 37 Covenant Day posts carry a photo, so a photo-less row here is a signal
 * worth noticing rather than normal.
 *
 * Reading via the DOM decodes the entities. Any shape change means "no photo",
 * never a crashed section.
 */
function pickPhoto(img: Element | null): string | undefined {
  if (!img) return undefined
  const raw = img.getAttribute('data-image-sizes')
  if (!raw) return undefined
  try {
    const sizes = JSON.parse(raw) as Sized[]
    if (!Array.isArray(sizes) || !sizes.length) return undefined

    const usable = sizes.filter(
      (s): s is Required<Sized> => typeof s?.url === 'string' && typeof s?.width === 'number',
    )
    if (!usable.length) return undefined

    // Smallest variant that still meets the target, else the largest available.
    const atLeast = usable.filter((s) => s.width >= TARGET_WIDTH)
    const chosen = atLeast.length
      ? atLeast.reduce((a, b) => (a.width <= b.width ? a : b))
      : usable.reduce((a, b) => (a.width >= b.width ? a : b))
    return chosen.url
  } catch {
    return undefined
  }
}

/**
 * Finalsite appends a screen-reader-only "(opens in new window/tab)" span
 * inside the title anchor of any post that opens externally, and this board's
 * thumbnail <img> also carries `class="fsStyleSROnly"`. `textContent` on the
 * raw anchor would fold such spans into the headline.
 *
 * All 37 posts are currently `data-opens-in="page"` so none carry the span
 * today — it is stripped anyway, because the board gaining one external post
 * must not silently corrupt that row's title.
 */
function titleText(link: Element): string {
  const clone = link.cloneNode(true) as Element
  for (const sr of Array.from(clone.querySelectorAll('.fsStyleSROnly, [data-nosnippet]'))) {
    sr.remove()
  }
  return (clone.textContent ?? '').replace(/\s+/g, ' ').trim()
}

/**
 * TRAP 2 — the summary is REAL here, and that is the unusual case.
 *
 * Every other Finalsite board in this app either omits the summary entirely or
 * fills it with boilerplate: Providence Day returns the literal "News Post" for
 * every article, Cannon returns "In the News Details - Cannon School ". The
 * project rule is therefore to distrust `og:description` and re-fetch the body.
 *
 * Covenant Day's `div.fsSummary` was eyeballed across all three boards before
 * being trusted (the skill's Trap 2 discipline) and holds genuine, distinct,
 * per-article prose:
 *   • "Seven CDS athletes committed to continuing their athletic careers…"
 *   • "Registration is open for the upcoming Booster Club Golf Tournament!"
 *   • "Siti Oo's family immigrated from Burma and descends from the Chin people."
 *
 * So this school needs no `preview()` pass, and adding one "for consistency"
 * would cost ~37 extra proxy round-trips to recover text already in hand.
 *
 * NBSP is flattened — the source markup ends several summaries with `&nbsp;`,
 * which would otherwise render as a trailing gap before the arrow.
 */
function summaryText(article: Element): string | undefined {
  const el = article.querySelector('div.fsSummary')
  if (!el) return undefined
  const text = (el.textContent ?? '')
    .replace(/ /g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return text.length ? text : undefined
}

export function parse(html: string, _boardUrl: string): NewsItem[] {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const items: NewsItem[] = []

  for (const article of Array.from(doc.querySelectorAll('article[data-post-id]'))) {
    const titleLink = article.querySelector('div.fsTitle a')
    const title = titleLink ? titleText(titleLink) : ''

    /* Read the href — never construct one from the title. This board's slugs
       are NOT title-derived: "Join us at the Booster Club Golf Tournament"
       lives at `~board/news/post/teeing-up-the-booster-club-golf-tournament-1785429931067`.
       A title-derived URL 404s, which would cost the row its date and drop it
       to the bottom of the section rather than failing visibly. */
    const href =
      titleLink?.getAttribute('href') ??
      article.querySelector('a.fsPostLink[href]')?.getAttribute('href') ??
      ''
    if (!title || !href) continue

    /* Skip rows linking straight to an uploaded FILE rather than an article
       page: it has no article page, so it can yield no date, and an undated row
       sorts to the bottom of a section whose order comes entirely from dates.
       None present today — this guards the board gaining one. */
    if (/\.(pdf|docx?|pptx?|xlsx?|zip)(\?|#|$)/i.test(href)) continue

    /* TRAP 3 — this board publishes NO date, in any form. No <time> element, no
       fsDate/fsDateTime class, no data attribute — verified across all 37 posts
       on all three boards, not inferred from one. `date: null` is therefore
       EXPECTED here, and `publishedAt` supplies the real date on the second
       pass. Anything that made this look dated would be wrong. */
    const photo = pickPhoto(article.querySelector('img[data-image-sizes]'))
    const summary = summaryText(article)

    items.push({
      title,
      url: href,
      date: null,
      ...(photo ? { photo } : {}),
      ...(summary ? { summary } : {}),
    })
  }

  return items
}

/**
 * The board publishes no date (see TRAP 3 in `parse`), so it is read from the
 * article page's `article:published` meta tag — ISO-8601, verified varied and
 * present across articles sampled from all three boards.
 *
 * Unlike Cannon, this site emits NO `page-published` tag (confirmed ABSENT
 * rather than assumed), so there is no decoy to select away from here. The
 * property is still matched exactly rather than by prefix, so a future
 * `page-published` cannot start satisfying this selector and sort every item to
 * one identical instant.
 */
export function publishedAt(html: string): string | undefined {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const meta = doc.querySelector('meta[property="article:published"]')
  const value = meta?.getAttribute('content')?.trim()
  if (!value) return undefined
  return Number.isNaN(Date.parse(value)) ? undefined : value
}
