import type { NewsSource } from './types'
import * as cannon from './parsers/cannon'
import * as carmelChristian from './parsers/carmel-christian'
import * as charlotteCatholic from './parsers/charlotte-catholic'
import * as providenceDay from './parsers/providence-day'

/**
 * Slug → news source. ONE PARSER PER SCHOOL, deliberately isolated: two schools
 * on the same CMS must not share a parser, so one school's site redesign can
 * never break another school's section.
 *
 * A slug ABSENT from this map renders no chip, no rail item and no section —
 * the project's absence-of-data principle. That is the correct treatment for a
 * school whose board cannot be parsed; never ship an empty shell.
 *
 * Adding a school: see `.claude/skills/add-school-news/SKILL.md`. Step 1 is to
 * get the board URL FROM THE USER and wait for it — never derive it.
 */
export const NEWS_SOURCES: Record<string, NewsSource> = {
  'providence-day': {
    // USER-CONFIRMED 2026-08-27. The user stated this is the only site needed
    // for Providence Day, so it serves as both the parse target and the
    // "All news & media" destination.
    boardUrl: 'https://www.providenceday.org/about/pd-communications/news-media',
    indexUrl: 'https://www.providenceday.org/about/pd-communications/news-media',
    domain: 'providenceday.org',
    parse: providenceDay.parse,
    preview: providenceDay.preview,
  },
  cannon: {
    // USER-CONFIRMED 2026-08-28. One URL serves as both the parse target and
    // the "All news & media" destination.
    boardUrl: 'https://www.cannonschool.org/news-and-stories',
    indexUrl: 'https://www.cannonschool.org/news-and-stories',
    domain: 'cannonschool.org',
    parse: cannon.parse,
    preview: cannon.preview,
    // Cannon's board publishes NO date — it lives on the article page. See the
    // parser's `publishedAt` and the `publishedAt` note in types.ts.
    publishedAt: cannon.publishedAt,
  },
  'carmel-christian': {
    // USER-SUPPLIED 2026-08-28. The user gave the RSS FEED rather than an HTML
    // board, and for this school that is the better source: every rendered
    // field (title, link, date, summary, photo) is published inline, so unlike
    // both Finalsite parsers this school needs NO second per-article pass.
    //
    // boardUrl and indexUrl DIFFER here — the board is machine-readable XML and
    // is the wrong place to send a reader. indexUrl is not self-derived: it is
    // the <channel><link> the feed publishes as its own human-readable home
    // (verified HTTP 200, 2026-08-28).
    //
    // This parser reads the feed as application/xml. That is load-bearing, not
    // stylistic — parsed as text/html, <link> is a VOID element and every URL
    // is lost, yielding zero items and the section's error state. See TRAP 1 in
    // the parser and in the source-material record.
    boardUrl: 'https://www.carmelchristian.org/apps/news/news_rss.jsp?id=0',
    indexUrl: 'https://www.carmelchristian.org/apps/news/index.jsp?id=0',
    domain: 'carmelchristian.org',
    parse: carmelChristian.parse,
    // No `preview` and no `publishedAt`: the feed carries a genuine per-article
    // <description> and a real <pubDate>, so there is nothing for a second pass
    // to fetch.
  },
  'charlotte-catholic': {
    // USER-SUPPLIED 2026-08-28. One HTML board URL serves as both the parse
    // target and the "All news & media" destination.
    //
    // The SECOND Finalsite board in the app, and the case that justifies the
    // one-parser-per-school rule rather than merely illustrating it: the same
    // CMS ships a materially different board here. It publishes NO article
    // photos at all (verified by inspection, not inferred from an empty
    // scrape), scopes its body to `div.fsBody` rather than `.fsPageBody`, and
    // percent-encodes the image JSON where Providence Day HTML-entity-encodes
    // it. Sharing that parser would have silently produced photo-less rows.
    boardUrl: 'https://www.charlottecatholic.org/community/news',
    indexUrl: 'https://www.charlottecatholic.org/community/news',
    domain: 'charlottecatholic.org',
    parse: charlotteCatholic.parse,
    // Needed: the board is a title, a link and a timestamp — no summary.
    preview: charlotteCatholic.preview,
    // No `publishedAt`: unlike Cannon, this board publishes a real <time>.
  },
}

export function newsSourceFor(slug: string): NewsSource | undefined {
  return NEWS_SOURCES[slug]
}
