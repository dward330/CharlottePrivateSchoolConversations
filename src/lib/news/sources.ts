import type { NewsSource } from './types'
import * as cannon from './parsers/cannon'
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
}

export function newsSourceFor(slug: string): NewsSource | undefined {
  return NEWS_SOURCES[slug]
}
