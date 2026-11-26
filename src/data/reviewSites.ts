/**
 * Read Reviews — the review sites each school page links out to (plan
 * `readreviews`, 2026-11-25).
 *
 * HAND-MAINTAINED. Every URL below was checked for the school's name and city on
 * the date in that school's research file (Niche, SchoolDigger and the map links
 * opened in a browser; GreatSchools by fetch, which the browser extension blocks):
 * `source-material/read-reviews/<slug>/<School Name> - Read Reviews - Review Site Links.md`.
 * `npm run check:reviewlinks` (in the build) fails when a URL here is not in that
 * file, so a link cannot change without its record. A NEW SCHOOL needs an entry
 * here and its research file, checked the same way.
 *
 * Links only. The page shows nothing from these sites but their names, and the
 * repo stores no rating, grade, review text or reviewer name. (Each research file
 * notes whether SchoolDigger showed any reviews, which is why its box promises
 * school data rather than reviews.)
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
export const SCHOOL_MAPS: Record<string, { embed: string; link: string; apple: string }> = {
  'cannon': {
    embed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3252.005927742211!2d-80.67408082056338!3d35.40510361318815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8854051c46f6ad1f%3A0xed2e20befed37c69!2sCannon%20School!5e0!3m2!1sen!2sus!4v1795657377945!5m2!1sen!2sus',
    link: 'https://www.google.com/maps/search/?api=1&query=Cannon%20School%2C%205801%20Poplar%20Tent%20Road%2C%20Concord%2C%20NC%2028027',
    apple: 'https://maps.apple.com/?address=5801%20Poplar%20Tent%20Road%2C%20Concord%2C%20NC%2028027&q=Cannon%20School',
  },
  'carmel-christian': {
    embed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3263.7554291447886!2d-80.7567535228285!3d35.112817453036556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x885426c54dc3d141%3A0x80aa28eca6b34310!2sCarmel%20Christian%20School!5e0!3m2!1sen!2sus!4v1795657413086!5m2!1sen!2sus',
    link: 'https://www.google.com/maps/search/?api=1&query=Carmel%20Christian%20School%2C%201145%20Pineville%20Matthews%20Road%2C%20Matthews%2C%20NC%2028105',
    apple: 'https://maps.apple.com/?address=1145%20Pineville%20Matthews%20Road%2C%20Matthews%2C%20NC%2028105&q=Carmel%20Christian%20School',
  },
  'charlotte-catholic': {
    embed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1632.3733647002612!2d-80.85146877679063!3d35.088060443254385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88569d0097ae7fd3%3A0x1c8ea924fadb477!2sCharlotte%20Catholic%20High%20School!5e0!3m2!1sen!2sus!4v1795657456208!5m2!1sen!2sus',
    link: 'https://www.google.com/maps/search/?api=1&query=Charlotte%20Catholic%20High%20School%2C%207702%20Pineville%20Matthews%20Rd%2C%20Charlotte%2C%20NC%2028226',
    apple: 'https://maps.apple.com/?address=7702%20Pineville%20Matthews%20Rd%2C%20Charlotte%2C%20NC%2028226&q=Charlotte%20Catholic%20High%20School',
  },
  'charlotte-christian': {
    embed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3262.657982792795!2d-80.7722525229773!3d35.14020765314121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x885420d91744fd5b%3A0xe496db17d9111d69!2sCharlotte%20Christian%20School!5e0!3m2!1sen!2sus!4v1795657483063!5m2!1sen!2sus',
    link: 'https://www.google.com/maps/search/?api=1&query=Charlotte%20Christian%20School%2C%207301%20Sardis%20Road%2C%20Charlotte%2C%20NC%2028270',
    apple: 'https://maps.apple.com/?address=7301%20Sardis%20Road%2C%20Charlotte%2C%20NC%2028270&q=Charlotte%20Christian%20School',
  },
  'charlotte-country-day': {
    embed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3082.8407243960005!2d-80.80468762106125!3d35.147018733840135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x885420a3cfadd4d5%3A0x9b8df86e77d82e00!2sCharlotte%20Country%20Day%20School!5e0!3m2!1sen!2sus!4v1795657529774!5m2!1sen!2sus',
    link: 'https://www.google.com/maps/search/?api=1&query=Charlotte%20Country%20Day%20School%2C%201440%20Carmel%20Road%2C%20Charlotte%2C%20NC%2028226',
    apple: 'https://maps.apple.com/?address=1440%20Carmel%20Road%2C%20Charlotte%2C%20NC%2028226&q=Charlotte%20Country%20Day%20School',
  },
  'charlotte-latin': {
    embed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3265.1303480503902!2d-80.77661152297861!3d35.07847575648977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x885427a8f5c6b4a7%3A0xc2a27f49ef17a956!2sCharlotte%20Latin%20School!5e0!3m2!1sen!2sus!4v1795657556677!5m2!1sen!2sus',
    link: 'https://www.google.com/maps/search/?api=1&query=Charlotte%20Latin%20School%2C%209502%20Providence%20Road%2C%20Charlotte%2C%20NC%2028277',
    apple: 'https://maps.apple.com/?address=9502%20Providence%20Road%2C%20Charlotte%2C%20NC%2028277&q=Charlotte%20Latin%20School',
  },
  'charlotte-prep': {
    embed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1631.1906151246747!2d-80.77104987678806!3d35.14711194003495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x885420de1dd50489%3A0xfcccbad567eb431c!2sCharlotte%20Preparatory%20School!5e0!3m2!1sen!2sus!4v1795657617715!5m2!1sen!2sus',
    link: 'https://www.google.com/maps/search/?api=1&query=Charlotte%20Preparatory%20School%2C%20212%20Boyce%20Road%2C%20Charlotte%2C%20NC%2028211',
    apple: 'https://maps.apple.com/?address=212%20Boyce%20Road%2C%20Charlotte%2C%20NC%2028211&q=Charlotte%20Preparatory%20School',
  },
  'covenant-day': {
    embed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3263.5338899792555!2d-80.73441072297783!3d35.118348154331265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x885426adf107543d%3A0x487af5400a2b184f!2sCovenant%20Day%20School!5e0!3m2!1sen!2sus!4v1795657646766!5m2!1sen!2sus',
    link: 'https://www.google.com/maps/search/?api=1&query=Covenant%20Day%20School%2C%20800%20Fullwood%20Lane%2C%20Matthews%2C%20NC%2028105',
    apple: 'https://maps.apple.com/?address=800%20Fullwood%20Lane%2C%20Matthews%2C%20NC%2028105&q=Covenant%20Day%20School',
  },
  'davidson-day': {
    embed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1624.0336489088736!2d-80.86190337738522!3d35.50261412698918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8856abb6051aed0f%3A0xec8c61d8e1c7746d!2sDavidson%20Day%20School!5e0!3m2!1sen!2sus!4v1795657725046!5m2!1sen!2sus',
    link: 'https://www.google.com/maps/search/?api=1&query=Davidson%20Day%20School%2C%20750%20Jetton%20Street%2C%20Davidson%2C%20NC%2028036',
    apple: 'https://maps.apple.com/?address=750%20Jetton%20Street%2C%20Davidson%2C%20NC%2028036&q=Davidson%20Day%20School',
  },
  'gaston-day': {
    embed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3260.1866832654905!2d-81.14378142297701!3d35.20181864978868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8856951f5d02184d%3A0x51e2efe29ba54d55!2sGaston%20Day%20School!5e0!3m2!1sen!2sus!4v1795657765808!5m2!1sen!2sus',
    link: 'https://www.google.com/maps/search/?api=1&query=Gaston%20Day%20School%2C%202001%20Gaston%20Day%20School%20Rd%2C%20Gastonia%2C%20NC%2028056',
    apple: 'https://maps.apple.com/?address=2001%20Gaston%20Day%20School%20Rd%2C%20Gastonia%2C%20NC%2028056&q=Gaston%20Day%20School',
  },
  'hickory-grove-christian': {
    embed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3259.406297013773!2d-80.72778882297634!3d35.22125464874557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88541f52ef866821%3A0x7affbd16327a7aa8!2sHickory%20Grove%20Christian%20School!5e0!3m2!1sen!2sus!4v1795657822690!5m2!1sen!2sus',
    link: 'https://www.google.com/maps/search/?api=1&query=Hickory%20Grove%20Christian%20School%2C%207200%20E.%20WT%20Harris%20Blvd.%2C%20Charlotte%2C%20NC%2028215',
    apple: 'https://maps.apple.com/?address=7200%20E.%20WT%20Harris%20Blvd.%2C%20Charlotte%2C%20NC%2028215&q=Hickory%20Grove%20Christian%20School',
  },
  'providence-day': {
    embed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.8450102924726!2d-80.78237091151611!3d35.16048593110129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x885420f1c569ee31%3A0x82f5260b53f2af69!2sProvidence%20Day%20School!5e0!3m2!1sen!2sus!4v1795657271900!5m2!1sen!2sus',
    link: 'https://www.google.com/maps/search/?api=1&query=Providence%20Day%20School%2C%205800%20Sardis%20Road%2C%20Charlotte%2C%20NC%2028270',
    apple: 'https://maps.apple.com/?address=5800%20Sardis%20Road%2C%20Charlotte%2C%20NC%2028270&q=Providence%20Day%20School',
  },
  'trinity-episcopal': {
    embed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1629.6396050486962!2d-80.83136997738939!3d35.22441894220137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8856a018dd0966cd%3A0x8e3f229736c0a5c6!2sTrinity%20Episcopal%20School!5e0!3m2!1sen!2sus!4v1795657878176!5m2!1sen!2sus',
    link: 'https://www.google.com/maps/search/?api=1&query=Trinity%20Episcopal%20School%2C%20750%20E.%209th%20Street%2C%20Charlotte%2C%20NC%2028202',
    apple: 'https://maps.apple.com/?address=750%20E.%209th%20Street%2C%20Charlotte%2C%20NC%2028202&q=Trinity%20Episcopal%20School',
  },
}
