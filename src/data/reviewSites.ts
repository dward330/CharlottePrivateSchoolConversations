/**
 * Read Reviews — the review sites each school page links out to (plan
 * `readreviews`, 2026-11-25).
 *
 * HAND-MAINTAINED. Every URL below was opened in a browser and checked for the
 * school's name and city on the date in that school's research file,
 * `source-material/read-reviews/<slug>/<School Name> - Read Reviews - Review Site Links.md`.
 * `npm run check:reviewlinks` (in the build) fails when a URL here is not in that
 * file, so a link cannot change without its record. A NEW SCHOOL needs an entry
 * here and its research file, verified in a browser.
 *
 * Links only. Nothing from these sites is copied into the repo: no rating, grade,
 * review count, review text or reviewer name.
 *
 * Logos: every site ships as a text plate (its name in our own type, on the
 * school's own color). `logo` is set ONLY when the site's published terms allow
 * this use or the user holds its written permission, and `logoBasis` records
 * which (the terms URL, or the path of the committed permission record). See the
 * logo decision in `.claude/plans/readreviews.md`. A missing URL means no box.
 */

export type ReviewSiteKey = 'greatschools' | 'niche' | 'schooldigger'

export type ReviewSite = {
  key: ReviewSiteKey
  /** Brand name, written as the site writes it. Stays Latin in every locale. */
  name: string
  /** The only host this site's links may use (check:reviewlinks). */
  host: string
  /** Path under public/review-sites/. Set only with a `logoBasis`. */
  logo?: string
  /** Why the logo may be used: published terms URL or a committed permission record. */
  logoBasis?: string
}

export const REVIEW_SITES: ReviewSite[] = [
  { key: 'greatschools', name: 'GreatSchools', host: 'www.greatschools.org' },
  { key: 'niche', name: 'Niche', host: 'www.niche.com' },
  { key: 'schooldigger', name: 'SchoolDigger', host: 'www.schooldigger.com' },
]

/** GreatSchools and Niche link to the school's reviews page; SchoolDigger has none, so its profile page. */
export const REVIEW_LINKS: Record<string, Partial<Record<ReviewSiteKey, string>>> = {
  cannon: {
    greatschools: 'https://www.greatschools.org/north-carolina/concord/2219-Cannon-School/reviews/',
    niche: 'https://www.niche.com/k12/cannon-school-concord-nc/reviews/',
    schooldigger: 'https://www.schooldigger.com/go/NC/schools/9999924871/school.aspx',
  },
  'carmel-christian': {
    greatschools: 'https://www.greatschools.org/north-carolina/matthews/2557-Carmel-Christian-School/reviews/',
    niche: 'https://www.niche.com/k12/carmel-christian-school-matthews-nc/reviews/',
    schooldigger: 'https://www.schooldigger.com/go/NC/schools/9999968988/school.aspx',
  },
  'charlotte-catholic': {
    greatschools: 'https://www.greatschools.org/north-carolina/charlotte/2133-Charlotte-Catholic-High-School/reviews/',
    niche: 'https://www.niche.com/k12/charlotte-catholic-high-school-charlotte-nc/reviews/',
    schooldigger: 'https://www.schooldigger.com/go/NC/schools/9999924894/school.aspx',
  },
  'charlotte-christian': {
    greatschools: 'https://www.greatschools.org/north-carolina/charlotte/2170-Charlotte-Christian-School/reviews/',
    niche: 'https://www.niche.com/k12/charlotte-christian-school-charlotte-nc/reviews/',
    schooldigger: 'https://www.schooldigger.com/go/NC/schools/9999924895/school.aspx',
  },
  'charlotte-country-day': {
    greatschools: 'https://www.greatschools.org/north-carolina/charlotte/2175-Charlotte-Country-Day-School/reviews/',
    niche: 'https://www.niche.com/k12/charlotte-country-day-school-charlotte-nc/reviews/',
    schooldigger: 'https://www.schooldigger.com/go/NC/schools/9999942994/school.aspx',
  },
  'charlotte-latin': {
    greatschools: 'https://www.greatschools.org/north-carolina/charlotte/2146-Charlotte-Latin-School/reviews/',
    niche: 'https://www.niche.com/k12/charlotte-latin-school-charlotte-nc/reviews/',
    schooldigger: 'https://www.schooldigger.com/go/NC/schools/9999924899/school.aspx',
  },
  'charlotte-prep': {
    greatschools: 'https://www.greatschools.org/north-carolina/charlotte/2536-Charlotte-Preparatory-School/reviews/',
    niche: 'https://www.niche.com/k12/charlotte-preparatory-school-charlotte-nc/reviews/',
    schooldigger: 'https://www.schooldigger.com/go/NC/schools/9999950665/school.aspx',
  },
  'covenant-day': {
    greatschools: 'https://www.greatschools.org/north-carolina/matthews/2336-Covenant-Day-School/reviews/',
    niche: 'https://www.niche.com/k12/covenant-day-school-matthews-nc/reviews/',
    schooldigger: 'https://www.schooldigger.com/go/NC/schools/9999950670/school.aspx',
  },
  'davidson-day': {
    greatschools: 'https://www.greatschools.org/north-carolina/davidson/2984-Davidson-Day-School/reviews/',
    niche: 'https://www.niche.com/k12/davidson-day-school-davidson-nc/reviews/',
    schooldigger: 'https://www.schooldigger.com/go/NC/schools/9999924942/school.aspx',
  },
  'gaston-day': {
    greatschools: 'https://www.greatschools.org/north-carolina/gastonia/2142-Gaston-Day-School-/reviews/',
    niche: 'https://www.niche.com/k12/gaston-day-school-gastonia-nc/reviews/',
    schooldigger: 'https://www.schooldigger.com/go/NC/schools/9999933863/school.aspx',
  },
  'hickory-grove-christian': {
    greatschools: 'https://www.greatschools.org/north-carolina/charlotte/2506-Hickory-Grove-Baptist-Chr.-School/reviews/',
    niche: 'https://www.niche.com/k12/hickory-grove-christian-school-charlotte-nc/reviews/',
    schooldigger: 'https://www.schooldigger.com/go/NC/schools/9999925040/school.aspx',
  },
  'providence-day': {
    greatschools: 'https://www.greatschools.org/north-carolina/charlotte/2144-Providence-Day-School/reviews/',
    niche: 'https://www.niche.com/k12/providence-day-school-charlotte-nc/reviews/',
    schooldigger: 'https://www.schooldigger.com/go/NC/schools/9999925170/school.aspx',
  },
  'trinity-episcopal': {
    greatschools: 'https://www.greatschools.org/north-carolina/charlotte/3221-Trinity-Episcopal-School/reviews/',
    niche: 'https://www.niche.com/k12/trinity-episcopal-school-charlotte-nc/reviews/',
    schooldigger: 'https://www.schooldigger.com/go/NC/schools/9999925307/school.aspx',
  },
}

/** The boxes for one school, in REVIEW_SITES order, skipping a site with no URL. */
export function reviewLinks(slug: string): { site: ReviewSite; url: string }[] {
  const links = REVIEW_LINKS[slug] ?? {}
  return REVIEW_SITES.flatMap((site) => {
    const url = links[site.key]
    return url ? [{ site, url }] : []
  })
}

/**
 * The decorative map under the boxes. `embed` is the iframe `src` Google Maps
 * itself hands out under Share → "Embed a map" (never built by hand, never an
 * API key); `link` opens the listing in Google Maps; `apple` is Apple's
 * documented Map Links form, `https://maps.apple.com/?address=…&q=…`. A school
 * with no entry shows the boxes and no map.
 */
export const SCHOOL_MAPS: Record<string, { embed: string; link: string; apple: string }> = {}
