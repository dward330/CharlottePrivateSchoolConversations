/**
 * The *Charlotte Private School Conversations* episode table — the single source
 * of truth behind every podcast deep-dive strip on a school page.
 *
 * ONE ROW PER EPISODE, never a per-school copy. Most episodes cover three
 * schools at once (episode 1 covers Cannon, Providence Day and Charlotte Country
 * Day), so a single row lights up the same research area on three pages. Adding
 * a school to `schools[]` is how an episode reaches another page; the title is
 * never reworded per school.
 *
 * Hand-maintained, like `brands.ts` and `clubClusters.ts` — this is metadata
 * about the show, not research about a school, so it is deliberately outside
 * `src/content/**` and the ingest pipeline.
 *
 * `scripts/check_podcast_episodes.mjs` (`npm run check:podcast`) validates every
 * school and research-area slug against `schools.json`. That guard matters
 * because the failure mode is otherwise invisible: a row naming a slug that
 * doesn't exist simply renders nothing, exactly like the "no episode" case.
 *
 * Titles are NOT translated. They are identifiers a listener matches against
 * Spotify and Apple, where the episode exists only in English — the same rule
 * that keeps `AP Calculus BC` and `Upper School` in English. Only the chrome
 * around them goes through i18next.
 */

export type PodcastEpisode = {
  /** Episode number in the show, 1–32. */
  id: number
  /**
   * The condensed form, shown in the popover's episode list. The published
   * titles run 90+ characters and wrap to three lines inside a 380px popover;
   * these are the design mock's own shortened forms. `fullTitle` keeps the
   * published wording for traceability back to the feed.
   */
  title: string
  /** The title exactly as published in the feed. Shown as the single-episode subline. */
  fullTitle: string
  spotifyUrl: string
  appleUrl: string
  /** School slugs from `schools.json` that this episode covers. */
  schools: string[]
  /** Topic slug from `schools.json`, or null for an episode that maps to no research area. */
  researchArea: string | null
}

export const SHOW_SPOTIFY_URL = 'https://open.spotify.com/show/31HWltz40P18VaObYhmtld'
export const SHOW_APPLE_URL =
  'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555'

/**
 * All 32 Season 1 episodes, in id order.
 *
 * The mapping comes from each episode's own title and description in the show's
 * episode guide — every one names the schools it covers explicitly, so nothing
 * here is inferred. Episode 5 (Affordability) covers all six schools; the
 * athletics episodes (14–19) and the college-support episodes (26–31) are one
 * school each. Episodes 10, 11 and 32 map to no research area and surface
 * through the page-level entry point instead.
 */
export const EPISODES: PodcastEpisode[] = [
  {
    id: 1,
    title: 'STEM at Cannon, Providence Day and Charlotte Country Day',
    // Published: "Career-Focused Pathways - STEM at Cannon School, Providence Day School, and Charlotte Country Day School"
    fullTitle:
      'Career-Focused Pathways - STEM at Cannon School, Providence Day School, and Charlotte Country Day School',
    spotifyUrl: 'https://open.spotify.com/episode/1DYlsybeAS2gei8wDgVOI7',
    appleUrl:
      'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000761912600',
    schools: ['cannon', 'providence-day', 'charlotte-country-day'],
    researchArea: 'course-offerings',
  },
  {
    id: 2,
    title: 'STEM at Davidson Day, Charlotte Christian and Charlotte Latin',
    // Published: "Career-Focused Pathways - STEM at Davidson Day School, Charlotte Christian School, and Charlotte Latin School"
    fullTitle:
      'Career-Focused Pathways - STEM at Davidson Day School, Charlotte Christian School, and Charlotte Latin School',
    spotifyUrl: 'https://open.spotify.com/episode/5s9UeXKJpfwwnJR0ZPkp7T',
    appleUrl:
      'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000762022019',
    schools: ['davidson-day', 'charlotte-christian', 'charlotte-latin'],
    researchArea: 'course-offerings',
  },
  {
    id: 3,
    title: 'Pre-Law and Public Safety at Cannon, Providence Day and Charlotte Country Day',
    // Published: "Career-Focused Pathways - Pre-Law and Public Safety at Cannon School, Providence Day School, and Charlotte Country Day School"
    fullTitle:
      'Career-Focused Pathways - Pre-Law and Public Safety at Cannon School, Providence Day School, and Charlotte Country Day School',
    spotifyUrl: 'https://open.spotify.com/episode/1paprw7bqb0TWPu0LdoAbR',
    appleUrl:
      'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000762193183',
    schools: ['cannon', 'providence-day', 'charlotte-country-day'],
    researchArea: 'course-offerings',
  },
  {
    id: 4,
    title: 'Pre-Law and Public Safety at Davidson Day, Charlotte Christian and Charlotte Latin',
    // Published: "Career-Focused Pathways - Pre-Law and Public Safety at Davidson Day School, Charlotte Christian School, and Charlotte Latin School"
    fullTitle:
      'Career-Focused Pathways - Pre-Law and Public Safety at Davidson Day School, Charlotte Christian School, and Charlotte Latin School',
    spotifyUrl: 'https://open.spotify.com/episode/6TooPU6mzKrRjzwjAKgfgm',
    appleUrl:
      'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000762200164',
    schools: ['davidson-day', 'charlotte-christian', 'charlotte-latin'],
    researchArea: 'course-offerings',
  },
  {
    id: 5,
    // The one episode that covers every school — it renders on the Financial Aid
    // & Tuition section of all six pages.
    title: 'Affordability — The Financial Aid Roadmap',
    // Published: "Affordability — The Financial Aid Roadmap: Overcoming W-2 Self-Rejection"
    fullTitle: 'Affordability — The Financial Aid Roadmap: Overcoming W-2 Self-Rejection',
    spotifyUrl: 'https://open.spotify.com/episode/6xEhZcQlpVjovwGvVfgsik',
    appleUrl:
      'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000762236466',
    schools: [
      'cannon',
      'charlotte-christian',
      'charlotte-country-day',
      'charlotte-latin',
      'davidson-day',
      'providence-day',
    ],
    researchArea: 'financial-aid-tuition',
  },
  {
    id: 6,
    title: 'Entrepreneurship and Finance at Cannon, Providence Day and Charlotte Country Day',
    // Published: "Entrepreneurship and Finance at Cannon School, Providence Day School, and Charlotte Country Day School"
    fullTitle:
      'Entrepreneurship and Finance at Cannon School, Providence Day School, and Charlotte Country Day School',
    spotifyUrl: 'https://open.spotify.com/episode/2Y7TQ9dNB2uIoNkaWeEnWi',
    appleUrl:
      'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000763055920',
    schools: ['cannon', 'providence-day', 'charlotte-country-day'],
    researchArea: 'course-offerings',
  },
  {
    id: 7,
    title: 'Entrepreneurship and Finance at Davidson Day, Charlotte Christian and Charlotte Latin',
    // Published: "Entrepreneurship and Finance at Davidson Day School, Charlotte Christian School, and Charlotte Latin School"
    fullTitle:
      'Entrepreneurship and Finance at Davidson Day School, Charlotte Christian School, and Charlotte Latin School',
    spotifyUrl: 'https://open.spotify.com/episode/0TmbWLhKQifRB2wRcgx4qU',
    appleUrl:
      'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000763246520',
    schools: ['davidson-day', 'charlotte-christian', 'charlotte-latin'],
    researchArea: 'course-offerings',
  },
  {
    id: 8,
    title: 'The Arts at Cannon, Providence Day and Charlotte Country Day',
    // Published: "The Arts at Cannon School, Providence Day School, and Charlotte Country Day School"
    fullTitle:
      'The Arts at Cannon School, Providence Day School, and Charlotte Country Day School',
    spotifyUrl: 'https://open.spotify.com/episode/55t4lSo6jJhcjSsB6nqaNB',
    appleUrl:
      'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000763362891',
    schools: ['cannon', 'providence-day', 'charlotte-country-day'],
    researchArea: 'the-arts',
  },
  {
    id: 9,
    title: 'The Arts at Davidson Day, Charlotte Christian and Charlotte Latin',
    // Published: "The Arts at Davidson Day School, Charlotte Christian School, and Charlotte Latin School"
    fullTitle:
      'The Arts at Davidson Day School, Charlotte Christian School, and Charlotte Latin School',
    spotifyUrl: 'https://open.spotify.com/episode/4KZuAamktd407IKFnwcqov',
    appleUrl:
      'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000763519353',
    schools: ['davidson-day', 'charlotte-christian', 'charlotte-latin'],
    researchArea: 'the-arts',
  },
  {
    id: 10,
    // Summer Camp is not a research area on these pages, so this surfaces through
    // the page-level "More episodes" entry point instead.
    title: 'Summer Camp at Cannon, Providence Day and Charlotte Country Day',
    // Published: "Summer Camp at Cannon School, Providence Day School, and Charlotte Country Day School"
    fullTitle:
      'Summer Camp at Cannon School, Providence Day School, and Charlotte Country Day School',
    spotifyUrl: 'https://open.spotify.com/episode/6CLcHEHUh59RO1vIiREdeL',
    appleUrl:
      'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000768206516',
    schools: ['cannon', 'providence-day', 'charlotte-country-day'],
    researchArea: null,
  },
  {
    id: 11,
    title: 'Summer Camp at Charlotte Latin, Charlotte Christian and Davidson Day',
    // Published: "Summer Camp at Charlotte Latin School, Charlotte Christian School, and Davidson Day School"
    fullTitle:
      'Summer Camp at Charlotte Latin School, Charlotte Christian School, and Davidson Day School',
    spotifyUrl: 'https://open.spotify.com/episode/1lXqGWuPxfDqyZrZT0vkF0',
    appleUrl:
      'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000768494057',
    schools: ['charlotte-latin', 'charlotte-christian', 'davidson-day'],
    researchArea: null,
  },
  {
    id: 12,
    title: 'After School at Cannon, Providence Day and Charlotte Country Day',
    // Published: "After School at Cannon School, Providence Day School, and Charlotte Country Day School"
    fullTitle:
      'After School at Cannon School, Providence Day School, and Charlotte Country Day School',
    spotifyUrl: 'https://open.spotify.com/episode/4XKD6Jb0EcofyxmImxHgOU',
    appleUrl:
      'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000771222516',
    schools: ['cannon', 'providence-day', 'charlotte-country-day'],
    researchArea: 'after-school',
  },
  {
    id: 13,
    // TWO schools only, not three — which is why Davidson Day's After School
    // section is the single (school × topic) cell in the 42-cell matrix with no
    // episode, and renders no strip at all.
    title: 'After School at Charlotte Latin and Charlotte Christian',
    // Published: "After School at Charlotte Latin School and Charlotte Christian School"
    fullTitle: 'After School at Charlotte Latin School and Charlotte Christian School',
    spotifyUrl: 'https://open.spotify.com/episode/637LBrcf09IPChYo41cjkS',
    appleUrl:
      'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000771324716',
    schools: ['charlotte-latin', 'charlotte-christian'],
    researchArea: 'after-school',
  },
  {
    id: 14,
    title: 'The Athletics Machine: Unpacking Sports at Providence Day',
    // Published: "The Athletics Machine: Unpacking Sports at Providence Day School"
    fullTitle: 'The Athletics Machine: Unpacking Sports at Providence Day School',
    spotifyUrl: 'https://open.spotify.com/episode/3rfSC31LUAQdsE5F2ciwCQ',
    appleUrl:
      'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000773261387',
    schools: ['providence-day'],
    researchArea: 'sports',
  },
  {
    id: 15,
    title: 'Inside the Cannon School Athletic Powerhouse',
    // Published: "Inside the Cannon School Athletic Powerhouse"
    fullTitle: 'Inside the Cannon School Athletic Powerhouse',
    spotifyUrl: 'https://open.spotify.com/episode/3n9oBJkrQTHzF4XxAKPE3L',
    appleUrl:
      'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000773544343',
    schools: ['cannon'],
    researchArea: 'sports',
  },
  {
    id: 16,
    title: 'The Charlotte Christian School Athletic Blueprint',
    // Published: "The Charlotte Christian School Athletic Blueprint"
    fullTitle: 'The Charlotte Christian School Athletic Blueprint',
    spotifyUrl: 'https://open.spotify.com/episode/1cW9T5g9tTEdompgjVXVwF',
    appleUrl:
      'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000773600308',
    schools: ['charlotte-christian'],
    researchArea: 'sports',
  },
  {
    id: 17,
    title: 'A Record Signing Class: Inside Charlotte Latin Athletics',
    // Published: "A Record Signing Class - Inside Charlotte Latin School Athletics - Class of 2026"
    fullTitle:
      'A Record Signing Class - Inside Charlotte Latin School Athletics - Class of 2026',
    spotifyUrl: 'https://open.spotify.com/episode/5hBPaE7z7WrHSByfelBsM9',
    appleUrl:
      'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000773878450',
    schools: ['charlotte-latin'],
    researchArea: 'sports',
  },
  {
    id: 18,
    title: '72 Teams, One School: Inside the Charlotte Country Day Athletic Machine',
    // Published: "72 Teams, One School - Inside the Charlotte Country Day Athletic Machine"
    fullTitle: '72 Teams, One School - Inside the Charlotte Country Day Athletic Machine',
    spotifyUrl: 'https://open.spotify.com/episode/0KJQCoyczWTWE5BtuG8JUo',
    appleUrl:
      'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000774082826',
    schools: ['charlotte-country-day'],
    researchArea: 'sports',
  },
  {
    id: 19,
    title: '15 Acres, 37 Team Championships: Inside Davidson Day Athletics',
    // Published: "15 Acres, 37 Team Championships - Inside Davidson Day Athletics"
    fullTitle: '15 Acres, 37 Team Championships - Inside Davidson Day Athletics',
    spotifyUrl: 'https://open.spotify.com/episode/11LWwOnmj2fM6PYjKzvdy6',
    appleUrl:
      'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000774103204',
    schools: ['davidson-day'],
    researchArea: 'sports',
  },
  {
    id: 20,
    title: 'The Miniature City: Student Clubs and Activities at Charlotte Latin',
    // Published: "The Miniature City - Inside Student Clubs and Activities at Charlotte Latin"
    fullTitle: 'The Miniature City - Inside Student Clubs and Activities at Charlotte Latin',
    spotifyUrl: 'https://open.spotify.com/episode/0Gbm5MU1n6Vk6pyHail9lB',
    appleUrl:
      'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000774202139',
    schools: ['charlotte-latin'],
    researchArea: 'student-clubs',
  },
  {
    id: 21,
    title: 'Mapping the 6 Student Club Pathways at Providence Day',
    // Published: "Mapping the 6 Student Club Pathways at Providence Day"
    fullTitle: 'Mapping the 6 Student Club Pathways at Providence Day',
    spotifyUrl: 'https://open.spotify.com/episode/4hLXLCNoddDHqo2VTpcEdv',
    appleUrl:
      'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000774201993',
    schools: ['providence-day'],
    researchArea: 'student-clubs',
  },
  {
    id: 22,
    title: "Inside Cannon's Student Clubs: Councils, Competition & Community",
    // Published: "Inside Cannon's Student Clubs: Councils, Competition & Community"
    fullTitle: "Inside Cannon's Student Clubs: Councils, Competition & Community",
    spotifyUrl: 'https://open.spotify.com/episode/2Qhpvgr1odxQa7uf6ApsDt',
    appleUrl:
      'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000774399513',
    schools: ['cannon'],
    researchArea: 'student-clubs',
  },
  {
    id: 23,
    title: "Beyond the Classroom: Charlotte Christian's Student Clubs & Leadership",
    // Published: "Beyond the Classroom: Charlotte Christian's Student Clubs & Leadership"
    fullTitle: "Beyond the Classroom: Charlotte Christian's Student Clubs & Leadership",
    spotifyUrl: 'https://open.spotify.com/episode/5s50bFyLMJ4q4E6n0A5SBJ',
    appleUrl:
      'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000774474675',
    schools: ['charlotte-christian'],
    researchArea: 'student-clubs',
  },
  {
    id: 24,
    title: 'Charlotte Country Day Clubs: Model UN, Affinity Groups & Service at Scale',
    // Published: "Charlotte Country Day Clubs: Model UN, Affinity Groups & Service at Scale"
    fullTitle: 'Charlotte Country Day Clubs: Model UN, Affinity Groups & Service at Scale',
    spotifyUrl: 'https://open.spotify.com/episode/572loR9eFhuPem7XW0IqI7',
    appleUrl:
      'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000774515879',
    schools: ['charlotte-country-day'],
    researchArea: 'student-clubs',
  },
  {
    id: 25,
    title: 'Davidson Day Clubs: AFAR Archaeology, Community Engagement & the Yearbook',
    // Published: "Davidson Day School Clubs: AFAR Archaeology, Community Engagement & an Award-Winning Yearbook"
    fullTitle:
      'Davidson Day School Clubs: AFAR Archaeology, Community Engagement & an Award-Winning Yearbook',
    spotifyUrl: 'https://open.spotify.com/episode/2WYp9EB2H7E34TbYTq5Ec4',
    appleUrl:
      'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000774574203',
    schools: ['davidson-day'],
    researchArea: 'student-clubs',
  },
  {
    id: 26,
    title: "Inside Charlotte Latin's College Counseling & Admissions Support",
    // Published: "Inside Charlotte Latin's College Counseling & Admissions Support"
    fullTitle: "Inside Charlotte Latin's College Counseling & Admissions Support",
    spotifyUrl: 'https://open.spotify.com/episode/4x9ogDOJAAun0q4cFt8CTO',
    appleUrl:
      'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000774956930',
    schools: ['charlotte-latin'],
    researchArea: 'college-support',
  },
  {
    id: 27,
    title: 'Charlotte Country Day College Support: Counseling, Rigor, and Where Graduates Go',
    // Published: "Charlotte Country Day College Support: Counseling, Rigor, and Where Graduates Go"
    fullTitle:
      'Charlotte Country Day College Support: Counseling, Rigor, and Where Graduates Go',
    spotifyUrl: 'https://open.spotify.com/episode/5TKs5aBEj9WnSByXWyxT1b',
    appleUrl:
      'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000775158996',
    schools: ['charlotte-country-day'],
    researchArea: 'college-support',
  },
  {
    id: 28,
    title: "Charlotte Christian: A Parent's Guide to College Counseling & Placement",
    // Published: "Charlotte Christian School — A Parent's Guide to College Counseling & Placement"
    fullTitle:
      "Charlotte Christian School — A Parent's Guide to College Counseling & Placement",
    spotifyUrl: 'https://open.spotify.com/episode/4Km1dY87fB0mzQ3LUlrNuM',
    appleUrl:
      'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000775174520',
    schools: ['charlotte-christian'],
    researchArea: 'college-support',
  },
  {
    id: 29,
    title: 'How Providence Day Gets Kids to College: The Counseling Engine',
    // Published: "How Providence Day Gets Kids to College: The Counseling Engine, the Data, and the Honest Questions"
    fullTitle:
      'How Providence Day Gets Kids to College: The Counseling Engine, the Data, and the Honest Questions',
    spotifyUrl: 'https://open.spotify.com/episode/5bylC8vqhLtDeZHU5VPBzf',
    appleUrl:
      'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000775333836',
    schools: ['providence-day'],
    researchArea: 'college-support',
  },
  {
    id: 30,
    title: 'Inside Cannon School College Support: Counseling, Rigor, and Where Grads Go',
    // Published: "Inside Cannon School College Support: Counseling, Rigor, and Where Grads Go"
    fullTitle: 'Inside Cannon School College Support: Counseling, Rigor, and Where Grads Go',
    spotifyUrl: 'https://open.spotify.com/episode/72H3Ri84VULjargDfzgcy3',
    appleUrl:
      'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000775470657',
    schools: ['cannon'],
    researchArea: 'college-support',
  },
  {
    id: 31,
    title: 'Inside Davidson Day College Support: Counseling, Research Hooks & Where Grads Land',
    // Published: "Inside Davidson Day College Support - Counseling, Research Hooks & Where Grads Land"
    fullTitle:
      'Inside Davidson Day College Support - Counseling, Research Hooks & Where Grads Land',
    spotifyUrl: 'https://open.spotify.com/episode/2YaUcxdMnKHHGUYjJRGtI6',
    appleUrl:
      'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000775513880',
    schools: ['davidson-day'],
    researchArea: 'college-support',
  },
  {
    id: 32,
    // The finale recaps the whole season, so it covers every school and maps to
    // no single research area — it reaches all six pages through the page-level
    // entry point.
    title: 'Season 1 Finale — The Full Recap',
    // Published: "Season 1 Finale - Charlotte Private School Conversations - The Full Recap"
    fullTitle: 'Season 1 Finale - Charlotte Private School Conversations - The Full Recap',
    spotifyUrl: 'https://open.spotify.com/episode/2WgBu84Sthm8sDiWYrrgWz',
    appleUrl:
      'https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000775782107',
    schools: [
      'cannon',
      'charlotte-christian',
      'charlotte-country-day',
      'charlotte-latin',
      'davidson-day',
      'providence-day',
    ],
    researchArea: null,
  },
]

/** Episodes covering `school` that map to research area `area`, in episode order. */
export function episodesFor(school: string, area: string): PodcastEpisode[] {
  return EPISODES
    .filter((e) => e.schools.includes(school) && e.researchArea === area)
    .sort((a, b) => a.id - b.id)
}

/**
 * Episodes covering `school` that map to no research area — the page-level
 * "More episodes" entry point. Empty for a school with no such episode, in
 * which case the page-level line is omitted entirely.
 */
export function unmappedEpisodesFor(school: string): PodcastEpisode[] {
  return EPISODES
    .filter((e) => e.schools.includes(school) && e.researchArea === null)
    .sort((a, b) => a.id - b.id)
}
