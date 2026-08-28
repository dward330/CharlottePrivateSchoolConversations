import type { NewsSource } from './types'
import * as cannon from './parsers/cannon'
import * as carmelChristian from './parsers/carmel-christian'
import * as charlotteCatholic from './parsers/charlotte-catholic'
import * as charlotteChristian from './parsers/charlotte-christian'
import * as charlotteCountryDay from './parsers/charlotte-country-day'
import * as charlotteLatin from './parsers/charlotte-latin'
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
  'charlotte-christian': {
    // USER-SUPPLIED 2026-08-28. One HTML board URL serves as both the parse
    // target and the "All news & media" destination.
    //
    // The THIRD Finalsite board, and the one that differs from BOTH siblings at
    // once: unlike Providence Day it publishes no <time>, and unlike Charlotte
    // Catholic it publishes a photo on every post. See the parser's TRAP 1/2.
    boardUrl: 'https://www.charlottechristian.com/about/knights-headlines',
    indexUrl: 'https://www.charlottechristian.com/about/knights-headlines',
    domain: 'charlottechristian.com',
    parse: charlotteChristian.parse,
    // Needed: the board is a thumbnail, a title and a tag list — no summary.
    preview: charlotteChristian.preview,
    // NO `publishedAt`, deliberately. Unlike Cannon — also dateless on its
    // board — this school publishes no date on the ARTICLE page either, and has
    // no feed. There is nothing for a second pass to fetch, so every item keeps
    // `date: null` and the board's own newest-first DOM order is preserved by
    // the stable sort in `normalizeItems`.
  },
  'charlotte-country-day': {
    // USER-SUPPLIED 2026-08-28. One HTML board URL serves as both the parse
    // target and the "All news & media" destination.
    //
    // The FOURTH Finalsite board, and the first board in the app that mixes
    // ordinary article posts with OFF-SITE LINK POSTS: two of its twenty posts
    // point straight at instagram.com. They are kept — they are real published
    // items with a title, date and photo — but the parser's `preview` fails
    // closed on any page that is not on charlottecountryday.org, so the second
    // pass never asks the relay to fetch instagram.com. That host is NOT in
    // ALLOWED_HOSTS and must not be added. See TRAP 3 in the parser.
    boardUrl: 'https://www.charlottecountryday.org/news-events/school-news-detailed/news-only',
    indexUrl: 'https://www.charlottecountryday.org/news-events/school-news-detailed/news-only',
    domain: 'charlottecountryday.org',
    parse: charlotteCountryDay.parse,
    // Needed: the board is a thumbnail, a title and a timestamp — no summary.
    preview: charlotteCountryDay.preview,
    // No `publishedAt`: every post publishes a real <time> on the board.
  },
  'charlotte-latin': {
    // USER-SUPPLIED 2026-08-28. The user gave FOUR category-filtered views of
    // the school's news board and asked for them merged, ordered by date, and
    // still capped at ten:
    //
    //   84 Arts · 85 Athletics · 167 School · 89 Academics
    //
    // This is the FIRST multi-board school, hence `extraBoardUrls`. The four
    // are filtered views of one underlying board (`fsBoard-209`) and cross-post
    // 10 articles between them; `normalizeItems` de-duplicates by URL.
    //
    // indexUrl is the UNFILTERED board — the four category URLs are parse
    // targets, and sending a reader to one of them would show them a quarter of
    // the news. It is not self-derived: it is the same path with the filter
    // dropped, which the school's own nav links (verified HTTP 200, 2026-08-28).
    boardUrl: 'https://www.charlottelatin.org/about/school-news?post_category_id=84',
    extraBoardUrls: [
      'https://www.charlottelatin.org/about/school-news?post_category_id=85',
      'https://www.charlottelatin.org/about/school-news?post_category_id=167',
      'https://www.charlottelatin.org/about/school-news?post_category_id=89',
    ],
    indexUrl: 'https://www.charlottelatin.org/about/school-news',
    domain: 'charlottelatin.org',
    parse: charlotteLatin.parse,
    // Needed: the board is a thumbnail, a category chip and a title — no summary.
    preview: charlotteLatin.preview,
    // REQUIRED here, unlike the other Finalsite boards. These views publish no
    // date in ANY form, so without this the merged list could only fall back to
    // DOM order — and the four views are months out of step with each other, so
    // that order would be wrong. See TRAP 2 and TRAP 7 in the parser.
    publishedAt: charlotteLatin.publishedAt,
  },
}

export function newsSourceFor(slug: string): NewsSource | undefined {
  return NEWS_SOURCES[slug]
}
