import type { NewsSource } from './types'
import * as cannon from './parsers/cannon'
import * as carmelChristian from './parsers/carmel-christian'
import * as charlotteCatholic from './parsers/charlotte-catholic'
import * as charlotteChristian from './parsers/charlotte-christian'
import * as charlotteCountryDay from './parsers/charlotte-country-day'
import * as charlotteLatin from './parsers/charlotte-latin'
import * as covenantDay from './parsers/covenant-day'
import * as davidsonDay from './parsers/davidson-day'
import * as gastonDay from './parsers/gaston-day'
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
    // USER'S DECISION 2026-11-01: read the unfiltered board. It replaces the
    // four category views (84 Arts, 85 Athletics, 167 Events, 89 STEAM) the user
    // supplied 2026-08-28, which by then missed six of the school's ten newest
    // posts, including the newest three. See TRAP 1 in the parser.
    //
    // The school publishes its athletics coverage on a SEPARATE domain,
    // clshawks.com (its pages carry `og:site_name: Charlotte Latin School`).
    // Six board rows link there, and the user confirmed 2026-08-28 that a
    // school's own athletics site is legitimate news. Those rows are therefore
    // KEPT rather than dropped as off-site.
    //
    // Third-party hosts this board also links to stay dropped, including
    // `sya.org` (a study-abroad organisation), `issuu.com` (a document host) and
    // `charlottelatinstories.com` (which no longer resolves at all). Being
    // linked BY the school is not the same as being published BY the school.
    //
    // clshawks.com is also in ALLOWED_HOSTS in the Worker; without that these
    // rows would render permanently preview-less. `npm run check:news` enforces
    // that the two lists agree.
    alsoAllowedHosts: ['clshawks.com'],
    boardUrl: 'https://www.charlottelatin.org/about/school-news',
    indexUrl: 'https://www.charlottelatin.org/about/school-news',
    domain: 'charlottelatin.org',
    parse: charlotteLatin.parse,
    // Needed: the board is a thumbnail, a category chip and a title — no summary.
    preview: charlotteLatin.preview,
    // REQUIRED here, unlike the other Finalsite boards. This board publishes no
    // date in ANY form, so without this the section could only show DOM order
    // with no dates. See TRAP 2 and TRAP 7 in the parser.
    publishedAt: charlotteLatin.publishedAt,
    // Measured 2026-11-01: only adjacent rows are out of date order, so a row
    // whose date fetch fails keeps its place. See TRAP 1 in the parser.
    boardIsChronological: true,
  },
  'covenant-day': {
    // USER-SUPPLIED 2026-08-28. The news URL serves as both the parse target and
    // the "All news & media" destination. The user approved adding the Lions
    // News page 2026-11-01.
    //
    // `/about-us/news` renders the school-news and features boards plus an old
    // sliver of athletics. Current athletics posts appear only on
    // `/athletics/lionsnews`, which `extraBoardUrls` adds. See TRAP 4 in the
    // parser, which also says why neither page is read in full.
    //
    // The fifth Finalsite board in the app and the only school with this field
    // combination — a REAL inline summary but NO date anywhere. It is the exact
    // inverse of Providence Day, which publishes a date and boilerplate.
    boardUrl: 'https://www.covenantday.org/about-us/news',
    extraBoardUrls: ['https://www.covenantday.org/athletics/lionsnews'],
    indexUrl: 'https://www.covenantday.org/about-us/news',
    domain: 'covenantday.org',
    parse: covenantDay.parse,
    // No `preview`: this board carries a genuine per-article `div.fsSummary`,
    // verified across all three boards rather than trusted because the element
    // exists. Adding a preview pass would spend extra proxy round-trips
    // re-fetching text the board already handed us.
    //
    // `publishedAt` IS required — the board publishes no date in any form, so
    // without it every row is undated and the section falls back to DOM order.
    // That order is badly wrong here: the boards are not interleaved by date.
    // See TRAP 3 and TRAP 4 in the parser.
    publishedAt: covenantDay.publishedAt,
  },
  'davidson-day': {
    // USER-SUPPLIED 2026-08-28. One HTML board URL serves as both the parse
    // target and the "All news & media" destination.
    //
    // The SIXTH Finalsite board in the app. Closest to Charlotte Christian —
    // dateless, a photo on every post, a boilerplate og:description — but its
    // article pages carry a `div.fsAuthor` byline directly above the body,
    // which no sibling has. See TRAP 3 in the parser.
    boardUrl: 'https://www.davidsonday.org/about/news-media/news',
    indexUrl: 'https://www.davidsonday.org/about/news-media/news',
    domain: 'davidsonday.org',
    parse: davidsonDay.parse,
    // Needed: a board post is a thumbnail, a title and a "Read More" link —
    // no summary, and og:description is the CMS template's own name.
    preview: davidsonDay.preview,
    // Needed since the school began publishing `article:published`: the board
    // still has no date, so without this every row renders undated. See TRAP 1
    // in the parser.
    publishedAt: davidsonDay.publishedAt,
    // Measured 2026-11-01: board order matches article dates exactly across all
    // nine posts, so a row whose date fetch fails keeps its place.
    boardIsChronological: true,
  },
  'gaston-day': {
    // USER-SUPPLIED 2026-08-28. The user gave the school's ATHLETICS board,
    // and it is the school's own publishing — verified from the site itself,
    // not assumed from the domain name: it serves
    // `<title>News - Gaston Day School</title>`, brands as "Spartan Athletics",
    // and links to gastonday.org for the official athletics handbook.
    //
    // Consequence worth stating: this is an ATHLETICS board, so the section
    // carries athletics news only — not a whole-school feed. That is what the
    // school publishes at the URL supplied.
    //
    // ⚠️ NO `alsoAllowedHosts`, deliberately — and adding one would be wrong.
    // Charlotte Latin declares `clshawks.com` because its athletics site is an
    // EXTRA host beside a main board on another domain. Here the athletics site
    // IS the board, so `normalizeItems` anchors the same-site test on it and
    // every row is same-site by construction. Inverted, not analogous.
    //
    // The app's TENTH CMS — Eventlink. See the parser for why nothing was
    // ported: its photos live in `src` (the inverse of every Finalsite
    // sibling), so the Finalsite decoder would find zero.
    boardUrl: 'https://gastondayathletics.com/News',
    indexUrl: 'https://gastondayathletics.com/News',
    // The board paginates 7 + 1. Without this the section shows 7 of the
    // school's 8 articles, which looks like a correct short board rather than a
    // missing row. Page 2 offers no "Next", so the board is 8 items total and
    // this is a complete list, not a first page of a crawl.
    extraBoardUrls: ['https://gastondayathletics.com/News?pageNumber=2'],
    domain: 'gastondayathletics.com',
    parse: gastonDay.parse,
    // Needed: a board row is a cover photo, a title and a "READ MORE" link —
    // the board carries no summary at all.
    preview: gastonDay.preview,
    // Needed: the board publishes NO date, but the article page does, inside
    // the same `p.text-muted` element as the byline. Places this school with
    // Cannon, Covenant Day and Davidson Day, NOT with the genuinely dateless
    // Charlotte Christian. See TRAP 1 in the parser.
    publishedAt: gastonDay.publishedAt,
  },
}

export function newsSourceFor(slug: string): NewsSource | undefined {
  return NEWS_SOURCES[slug]
}
