// The Wells Fargo Cup ledger: official association standings, shared by every
// school's Cup card because one school's table needs the other schools' rows.
// Transcribed from source-material/sports/providence-day/Providence Day - Sports -
// Wells Fargo Cup Standings 2020-2026.md, which carries the URLs and the method.
//
// Official association tables only. An AI research report is a lead to check,
// never a source: the report behind the design matched 10 of 60 cells here.
// Places are copied as published, including the two oddities the source file
// notes. Headlines and tiles are computed in src/lib/wellsFargoCup.ts, never
// typed. `npm run check:cup` guards this file.
//
// Imported under plain Node by check:cup, so this module stays free of
// import.meta.glob.

export type CupAssociation = 'NCISAA' | 'NCHSAA'

/** One school's published result for one season. */
export type CupRecord = {
  /** App slug, or a stable key for a school outside the roster. */
  school: string
  association: CupAssociation
  /** '2A' | '3A' | '4A' | '6A' … */
  classification: string
  /** '2025–26' */
  season: string
  place: number
  /** A shared finish, shown as "T14th". */
  tied?: boolean
  points: number
  /** True renders a `~` and a TO VERIFY tag. No row is an estimate today. */
  isEstimate: boolean
  /** Split points, stored whenever the table publishes them. */
  fall?: number
  winter?: number
  spring?: number
}

/** First or second in a division, including schools outside the roster. */
export type CupDivisionLeader = Omit<CupRecord, 'school' | 'isEstimate'> & {
  /** Display name, as published. */
  school: string
  /** Set when the school is on our roster. */
  slug?: string
}

export type CupSport = { key: string; gender: 'boys' | 'girls' | 'both' }

/** The six seasons on the card, oldest first. */
export const CUP_SEASONS = ['2020–21', '2021–22', '2022–23', '2023–24', '2024–25', '2025–26'] as const

/** Points for 1st through 8th at a state championship. */
export const CUP_POINTS = [50, 45, 40, 35, 30, 25, 20, 15] as const

/** School names as the Cup card prints them. */
export const CUP_SHORT_NAMES: Record<string, string> = {
  'providence-day': 'Providence Day',
  'charlotte-latin': 'Charlotte Latin',
  'charlotte-country-day': 'Charlotte Country Day',
  cannon: 'Cannon',
  'charlotte-christian': 'Charlotte Christian',
  'covenant-day': 'Covenant Day',
  'carmel-christian': 'Carmel Christian',
  'davidson-day': 'Davidson Day',
  'gaston-day': 'Gaston Day',
  'hickory-grove-christian': 'Hickory Grove Christian',
  'charlotte-catholic': 'Charlotte Catholic',
  // Outside the roster, listed because the 4A table shows the whole division.
  'cary-academy': 'Cary Academy',
  'christ-school': 'Christ School',
  'durham-academy': 'Durham Academy',
  'forsyth-country-day': 'Forsyth Country Day',
  'greensboro-day': 'Greensboro Day',
  'metrolina-christian': 'Metrolina Christian',
  'north-raleigh-christian': 'North Raleigh Christian',
  'rabun-gap': 'Rabun Gap',
  ravenscroft: 'Ravenscroft',
  'saint-marys': 'Saint Mary’s',
  'wake-christian': 'Wake Christian',
  'wesleyan-christian': 'Wesleyan Christian',
}

/**
 * Every school in a division a Cup card shows, in the source file's order. A
 * card's table claims the whole division, so a card needs every school in it:
 * today that is all of 4A, plus the 3A seasons of schools that moved.
 */
export const CUP_RECORDS: CupRecord[] = [
  { school: 'providence-day', association: 'NCISAA', classification: '4A', season: '2020–21', place: 1, points: 670, isEstimate: false, fall: 267.5, winter: 157.5, spring: 245 },
  { school: 'providence-day', association: 'NCISAA', classification: '4A', season: '2021–22', place: 3, points: 627.5, isEstimate: false, fall: 192.5, winter: 165, spring: 270 },
  { school: 'providence-day', association: 'NCISAA', classification: '4A', season: '2022–23', place: 1, points: 782.5, isEstimate: false, fall: 250, winter: 175, spring: 357.5 },
  { school: 'providence-day', association: 'NCISAA', classification: '4A', season: '2023–24', place: 1, points: 757.5, isEstimate: false, fall: 257.5, winter: 195, spring: 305 },
  { school: 'providence-day', association: 'NCISAA', classification: '4A', season: '2024–25', place: 1, points: 650, isEstimate: false, fall: 217.5, winter: 180, spring: 252.5 },
  { school: 'providence-day', association: 'NCISAA', classification: '4A', season: '2025–26', place: 1, points: 692.5, isEstimate: false, fall: 222.5, winter: 200, spring: 270 },
  { school: 'charlotte-latin', association: 'NCISAA', classification: '4A', season: '2020–21', place: 3, points: 535, isEstimate: false, fall: 165, winter: 157.5, spring: 212.5 },
  { school: 'charlotte-latin', association: 'NCISAA', classification: '4A', season: '2021–22', place: 2, points: 655, isEstimate: false, fall: 185, winter: 197.5, spring: 272.5 },
  { school: 'charlotte-latin', association: 'NCISAA', classification: '4A', season: '2022–23', place: 2, points: 612.5, isEstimate: false, fall: 180, winter: 185, spring: 247.5 },
  { school: 'charlotte-latin', association: 'NCISAA', classification: '4A', season: '2023–24', place: 3, points: 512.5, isEstimate: false, fall: 137.5, winter: 162.5, spring: 212.5 },
  { school: 'charlotte-latin', association: 'NCISAA', classification: '4A', season: '2024–25', place: 2, points: 640, isEstimate: false, fall: 225, winter: 147.5, spring: 267.5 },
  { school: 'charlotte-latin', association: 'NCISAA', classification: '4A', season: '2025–26', place: 2, points: 690, isEstimate: false, fall: 277.5, winter: 205, spring: 207.5 },
  { school: 'charlotte-country-day', association: 'NCISAA', classification: '4A', season: '2020–21', place: 2, points: 645, isEstimate: false, fall: 237.5, winter: 107.5, spring: 300 },
  { school: 'charlotte-country-day', association: 'NCISAA', classification: '4A', season: '2021–22', place: 1, points: 682.5, isEstimate: false, fall: 272.5, winter: 87.5, spring: 322.5 },
  { school: 'charlotte-country-day', association: 'NCISAA', classification: '4A', season: '2022–23', place: 3, points: 570, isEstimate: false, fall: 235, winter: 150, spring: 185 },
  { school: 'charlotte-country-day', association: 'NCISAA', classification: '4A', season: '2023–24', place: 2, points: 690, isEstimate: false, fall: 272.5, winter: 132.5, spring: 285 },
  { school: 'charlotte-country-day', association: 'NCISAA', classification: '4A', season: '2024–25', place: 3, points: 547.5, isEstimate: false, fall: 265, winter: 127.5, spring: 155 },
  { school: 'charlotte-country-day', association: 'NCISAA', classification: '4A', season: '2025–26', place: 3, points: 602.5, isEstimate: false, fall: 237.5, winter: 142.5, spring: 222.5 },
  { school: 'cannon', association: 'NCISAA', classification: '4A', season: '2020–21', place: 4, points: 463.75, isEstimate: false, fall: 98.75, winter: 190, spring: 175 },
  { school: 'cannon', association: 'NCISAA', classification: '4A', season: '2021–22', place: 5, points: 417.5, isEstimate: false, fall: 85, winter: 140, spring: 192.5 },
  { school: 'cannon', association: 'NCISAA', classification: '4A', season: '2022–23', place: 5, points: 390, isEstimate: false, fall: 115, winter: 107.5, spring: 167.5 },
  { school: 'cannon', association: 'NCISAA', classification: '4A', season: '2023–24', place: 4, points: 370, isEstimate: false, fall: 115, winter: 112.5, spring: 142.5 },
  { school: 'cannon', association: 'NCISAA', classification: '4A', season: '2024–25', place: 5, points: 380, isEstimate: false, fall: 60, winter: 117.5, spring: 202.5 },
  { school: 'cannon', association: 'NCISAA', classification: '4A', season: '2025–26', place: 5, points: 407.5, isEstimate: false, fall: 80, winter: 97.5, spring: 230 },
  { school: 'charlotte-christian', association: 'NCISAA', classification: '4A', season: '2020–21', place: 9, points: 337.5, isEstimate: false, fall: 70, winter: 75, spring: 192.5 },
  { school: 'charlotte-christian', association: 'NCISAA', classification: '4A', season: '2021–22', place: 7, points: 320, isEstimate: false, fall: 102.5, winter: 37.5, spring: 180 },
  { school: 'charlotte-christian', association: 'NCISAA', classification: '4A', season: '2022–23', place: 9, points: 305, isEstimate: false, fall: 67.5, winter: 30, spring: 207.5 },
  { school: 'charlotte-christian', association: 'NCISAA', classification: '4A', season: '2023–24', place: 5, points: 362.5, isEstimate: false, fall: 97.5, winter: 50, spring: 215 },
  { school: 'charlotte-christian', association: 'NCISAA', classification: '4A', season: '2024–25', place: 6, points: 377.5, isEstimate: false, fall: 82.5, winter: 35, spring: 260 },
  { school: 'charlotte-christian', association: 'NCISAA', classification: '4A', season: '2025–26', place: 8, points: 347.5, isEstimate: false, fall: 67.5, winter: 45, spring: 235 },
  { school: 'covenant-day', association: 'NCISAA', classification: '4A', season: '2020–21', place: 14, points: 172.5, isEstimate: false, fall: 142.5, winter: 15, spring: 15 },
  { school: 'covenant-day', association: 'NCISAA', classification: '4A', season: '2021–22', place: 11, points: 215, isEstimate: false, fall: 132.5, winter: 22.5, spring: 60 },
  { school: 'covenant-day', association: 'NCISAA', classification: '4A', season: '2022–23', place: 8, points: 322.5, isEstimate: false, fall: 205, winter: 0, spring: 117.5 },
  { school: 'covenant-day', association: 'NCISAA', classification: '4A', season: '2023–24', place: 10, points: 302.5, isEstimate: false, fall: 137.5, winter: 37.5, spring: 127.5 },
  { school: 'covenant-day', association: 'NCISAA', classification: '4A', season: '2024–25', place: 10, points: 295, isEstimate: false, fall: 145, winter: 22.5, spring: 127.5 },
  { school: 'covenant-day', association: 'NCISAA', classification: '4A', season: '2025–26', place: 15, points: 185, isEstimate: false, fall: 67.5, winter: 0, spring: 117.5 },
  { school: 'carmel-christian', association: 'NCISAA', classification: '4A', season: '2020–21', place: 15, points: 155, isEstimate: false, fall: 65, winter: 45, spring: 45 },
  { school: 'carmel-christian', association: 'NCISAA', classification: '4A', season: '2021–22', place: 14, tied: true, points: 205, isEstimate: false, fall: 75, winter: 50, spring: 80 },
  { school: 'carmel-christian', association: 'NCISAA', classification: '4A', season: '2022–23', place: 14, points: 142.5, isEstimate: false, fall: 75, winter: 45, spring: 22.5 },
  { school: 'carmel-christian', association: 'NCISAA', classification: '4A', season: '2023–24', place: 15, points: 132.5, isEstimate: false, fall: 30, winter: 42.5, spring: 60 },
  { school: 'carmel-christian', association: 'NCISAA', classification: '4A', season: '2024–25', place: 15, points: 202.5, isEstimate: false, fall: 37.5, winter: 70, spring: 95 },
  { school: 'carmel-christian', association: 'NCISAA', classification: '4A', season: '2025–26', place: 16, points: 160, isEstimate: false, fall: 37.5, winter: 62.5, spring: 60 },
  { school: 'davidson-day', association: 'NCISAA', classification: '2A', season: '2020–21', place: 9, points: 182.5, isEstimate: false, fall: 95, winter: 50, spring: 37.5 },
  { school: 'davidson-day', association: 'NCISAA', classification: '2A', season: '2021–22', place: 3, points: 360, isEstimate: false, fall: 162.5, winter: 45, spring: 152.5 },
  { school: 'davidson-day', association: 'NCISAA', classification: '2A', season: '2022–23', place: 3, points: 302.5, isEstimate: false, fall: 110, winter: 55, spring: 137.5 },
  { school: 'davidson-day', association: 'NCISAA', classification: '2A', season: '2023–24', place: 1, points: 497.5, isEstimate: false, fall: 237.5, winter: 95, spring: 165 },
  { school: 'davidson-day', association: 'NCISAA', classification: '3A', season: '2024–25', place: 2, points: 367.5, isEstimate: false, fall: 167.5, winter: 62.5, spring: 137.5 },
  { school: 'davidson-day', association: 'NCISAA', classification: '3A', season: '2025–26', place: 8, points: 267.5, isEstimate: false, fall: 90, winter: 37.5, spring: 140 },
  { school: 'gaston-day', association: 'NCISAA', classification: '2A', season: '2020–21', place: 2, points: 302.5, isEstimate: false, fall: 120, winter: 75, spring: 107.5 },
  { school: 'gaston-day', association: 'NCISAA', classification: '2A', season: '2021–22', place: 1, points: 395, isEstimate: false, fall: 175, winter: 87.5, spring: 132.5 },
  { school: 'gaston-day', association: 'NCISAA', classification: '2A', season: '2022–23', place: 4, points: 285, isEstimate: false, fall: 117.5, winter: 72.5, spring: 95 },
  { school: 'gaston-day', association: 'NCISAA', classification: '2A', season: '2023–24', place: 4, points: 280, isEstimate: false, fall: 150, winter: 35, spring: 95 },
  { school: 'gaston-day', association: 'NCISAA', classification: '2A', season: '2024–25', place: 7, points: 232.5, isEstimate: false, fall: 185, winter: 30, spring: 17.5 },
  { school: 'gaston-day', association: 'NCISAA', classification: '2A', season: '2025–26', place: 6, points: 232.5, isEstimate: false, fall: 145, winter: 45, spring: 42.5 },
  { school: 'hickory-grove-christian', association: 'NCISAA', classification: '3A', season: '2020–21', place: 16, points: 132.5, isEstimate: false, fall: 22.5, winter: 22.5, spring: 87.5 },
  { school: 'hickory-grove-christian', association: 'NCISAA', classification: '3A', season: '2021–22', place: 13, tied: true, points: 145, isEstimate: false, fall: 20, winter: 22.5, spring: 102.5 },
  { school: 'hickory-grove-christian', association: 'NCISAA', classification: '3A', season: '2022–23', place: 8, points: 237.5, isEstimate: false, fall: 85, winter: 22.5, spring: 130 },
  { school: 'hickory-grove-christian', association: 'NCISAA', classification: '3A', season: '2023–24', place: 15, points: 147.5, isEstimate: false, fall: 62.5, winter: 0, spring: 85 },
  { school: 'hickory-grove-christian', association: 'NCISAA', classification: '3A', season: '2024–25', place: 12, points: 155, isEstimate: false, fall: 67.5, winter: 0, spring: 87.5 },
  { school: 'hickory-grove-christian', association: 'NCISAA', classification: '3A', season: '2025–26', place: 18, points: 110, isEstimate: false, fall: 25, winter: 22.5, spring: 62.5 },
  { school: 'charlotte-catholic', association: 'NCHSAA', classification: '6A', season: '2025–26', place: 1, points: 655, isEstimate: false },
  // The rest of the 4A field, outside the roster.
  { school: 'cary-academy', association: 'NCISAA', classification: '4A', season: '2020–21', place: 6, points: 412.5, isEstimate: false, fall: 172.5, winter: 95, spring: 145 },
  { school: 'cary-academy', association: 'NCISAA', classification: '4A', season: '2021–22', place: 6, points: 400, isEstimate: false, fall: 155, winter: 130, spring: 115 },
  { school: 'cary-academy', association: 'NCISAA', classification: '4A', season: '2022–23', place: 7, points: 360, isEstimate: false, fall: 167.5, winter: 120, spring: 72.5 },
  { school: 'cary-academy', association: 'NCISAA', classification: '4A', season: '2023–24', place: 8, points: 342.5, isEstimate: false, fall: 110, winter: 102.5, spring: 130 },
  { school: 'cary-academy', association: 'NCISAA', classification: '4A', season: '2024–25', place: 9, points: 325, isEstimate: false, fall: 162.5, winter: 80, spring: 82.5 },
  { school: 'cary-academy', association: 'NCISAA', classification: '4A', season: '2025–26', place: 7, points: 372.5, isEstimate: false, fall: 150, winter: 112.5, spring: 110 },
  { school: 'christ-school', association: 'NCISAA', classification: '4A', season: '2020–21', place: 11, points: 220, isEstimate: false, fall: 75, winter: 20, spring: 125 },
  { school: 'christ-school', association: 'NCISAA', classification: '4A', season: '2021–22', place: 12, points: 212.5, isEstimate: false, fall: 50, winter: 42.5, spring: 120 },
  { school: 'christ-school', association: 'NCISAA', classification: '4A', season: '2022–23', place: 10, points: 282.5, isEstimate: false, fall: 87.5, winter: 50, spring: 145 },
  { school: 'christ-school', association: 'NCISAA', classification: '4A', season: '2023–24', place: 12, points: 267.5, isEstimate: false, fall: 100, winter: 50, spring: 117.5 },
  { school: 'christ-school', association: 'NCISAA', classification: '4A', season: '2024–25', place: 13, points: 220, isEstimate: false, fall: 60, winter: 50, spring: 110 },
  { school: 'christ-school', association: 'NCISAA', classification: '4A', season: '2025–26', place: 10, points: 257.5, isEstimate: false, fall: 122.5, winter: 0, spring: 135 },
  { school: 'durham-academy', association: 'NCISAA', classification: '4A', season: '2020–21', place: 5, points: 462.5, isEstimate: false, fall: 240, winter: 37.5, spring: 185 },
  { school: 'durham-academy', association: 'NCISAA', classification: '4A', season: '2021–22', place: 4, points: 507.5, isEstimate: false, fall: 245, winter: 65, spring: 197.5 },
  { school: 'durham-academy', association: 'NCISAA', classification: '4A', season: '2022–23', place: 4, points: 537.5, isEstimate: false, fall: 227.5, winter: 70, spring: 240 },
  { school: 'durham-academy', association: 'NCISAA', classification: '4A', season: '2023–24', place: 7, points: 355, isEstimate: false, fall: 182.5, winter: 50, spring: 122.5 },
  { school: 'durham-academy', association: 'NCISAA', classification: '4A', season: '2024–25', place: 4, points: 465, isEstimate: false, fall: 192.5, winter: 65, spring: 207.5 },
  { school: 'durham-academy', association: 'NCISAA', classification: '4A', season: '2025–26', place: 4, points: 487.5, isEstimate: false, fall: 217.5, winter: 50, spring: 220 },
  { school: 'forsyth-country-day', association: 'NCISAA', classification: '3A', season: '2020–21', place: 1, points: 582.5, isEstimate: false, fall: 112.5, winter: 117.5, spring: 352.5 },
  { school: 'forsyth-country-day', association: 'NCISAA', classification: '3A', season: '2021–22', place: 1, points: 605, isEstimate: false, fall: 150, winter: 155, spring: 300 },
  { school: 'forsyth-country-day', association: 'NCISAA', classification: '3A', season: '2022–23', place: 1, points: 592.5, isEstimate: false, fall: 170, winter: 135, spring: 287.5 },
  { school: 'forsyth-country-day', association: 'NCISAA', classification: '3A', season: '2023–24', place: 1, points: 635, isEstimate: false, fall: 180, winter: 167.5, spring: 287.5 },
  { school: 'forsyth-country-day', association: 'NCISAA', classification: '4A', season: '2024–25', place: 7, points: 375, isEstimate: false, fall: 107.5, winter: 90, spring: 177.5 },
  { school: 'forsyth-country-day', association: 'NCISAA', classification: '4A', season: '2025–26', place: 6, points: 392.5, isEstimate: false, fall: 115, winter: 87.5, spring: 190 },
  { school: 'greensboro-day', association: 'NCISAA', classification: '4A', season: '2020–21', place: 12, points: 197.5, isEstimate: false, fall: 15, winter: 100, spring: 82.5 },
  { school: 'greensboro-day', association: 'NCISAA', classification: '4A', season: '2021–22', place: 13, points: 207.5, isEstimate: false, fall: 62.5, winter: 45, spring: 100 },
  { school: 'greensboro-day', association: 'NCISAA', classification: '3A', season: '2022–23', place: 2, points: 507.5, isEstimate: false, fall: 142.5, winter: 132.5, spring: 232.5 },
  { school: 'greensboro-day', association: 'NCISAA', classification: '3A', season: '2023–24', place: 4, points: 385, isEstimate: false, fall: 60, winter: 115, spring: 210 },
  { school: 'greensboro-day', association: 'NCISAA', classification: '3A', season: '2024–25', place: 1, points: 457.5, isEstimate: false, fall: 82.5, winter: 167.5, spring: 207.5 },
  { school: 'greensboro-day', association: 'NCISAA', classification: '3A', season: '2025–26', place: 2, points: 420, isEstimate: false, fall: 115, winter: 117.5, spring: 187.5 },
  { school: 'metrolina-christian', association: 'NCISAA', classification: '4A', season: '2020–21', place: 16, points: 122.5, isEstimate: false, fall: 15, winter: 25, spring: 82.5 },
  { school: 'metrolina-christian', association: 'NCISAA', classification: '4A', season: '2021–22', place: 14, tied: true, points: 205, isEstimate: false, fall: 37.5, winter: 70, spring: 97.5 },
  { school: 'metrolina-christian', association: 'NCISAA', classification: '4A', season: '2022–23', place: 13, points: 202.5, isEstimate: false, fall: 30, winter: 62.5, spring: 110 },
  { school: 'metrolina-christian', association: 'NCISAA', classification: '4A', season: '2023–24', place: 14, points: 232.5, isEstimate: false, fall: 82.5, winter: 45, spring: 105 },
  { school: 'metrolina-christian', association: 'NCISAA', classification: '4A', season: '2024–25', place: 8, points: 362.5, isEstimate: false, fall: 125, winter: 70, spring: 167.5 },
  { school: 'metrolina-christian', association: 'NCISAA', classification: '4A', season: '2025–26', place: 11, points: 227.5, isEstimate: false, fall: 55, winter: 35, spring: 137.5 },
  { school: 'north-raleigh-christian', association: 'NCISAA', classification: '4A', season: '2020–21', place: 8, points: 355, isEstimate: false, fall: 100, winter: 75, spring: 180 },
  { school: 'north-raleigh-christian', association: 'NCISAA', classification: '4A', season: '2021–22', place: 9, points: 245, isEstimate: false, fall: 100, winter: 60, spring: 85 },
  { school: 'north-raleigh-christian', association: 'NCISAA', classification: '4A', season: '2022–23', place: 12, points: 242.5, isEstimate: false, fall: 95, winter: 37.5, spring: 110 },
  { school: 'north-raleigh-christian', association: 'NCISAA', classification: '4A', season: '2023–24', place: 11, points: 290, isEstimate: false, fall: 112.5, winter: 22.5, spring: 155 },
  { school: 'north-raleigh-christian', association: 'NCISAA', classification: '4A', season: '2024–25', place: 16, points: 155, isEstimate: false, fall: 95, winter: 0, spring: 60 },
  { school: 'north-raleigh-christian', association: 'NCISAA', classification: '4A', season: '2025–26', place: 12, points: 220, isEstimate: false, fall: 95, winter: 57.5, spring: 67.5 },
  { school: 'rabun-gap', association: 'NCISAA', classification: '4A', season: '2020–21', place: 13, points: 177.5, isEstimate: false, fall: 120, winter: 20, spring: 37.5 },
  { school: 'rabun-gap', association: 'NCISAA', classification: '4A', season: '2021–22', place: 10, points: 237.5, isEstimate: false, fall: 130, winter: 70, spring: 37.5 },
  { school: 'rabun-gap', association: 'NCISAA', classification: '4A', season: '2022–23', place: 11, points: 262.5, isEstimate: false, fall: 87.5, winter: 107.5, spring: 67.5 },
  { school: 'rabun-gap', association: 'NCISAA', classification: '4A', season: '2023–24', place: 13, points: 247.5, isEstimate: false, fall: 95, winter: 62.5, spring: 90 },
  { school: 'rabun-gap', association: 'NCISAA', classification: '4A', season: '2024–25', place: 14, points: 212.5, isEstimate: false, fall: 100, winter: 52.5, spring: 60 },
  { school: 'rabun-gap', association: 'NCISAA', classification: '4A', season: '2025–26', place: 9, points: 267.5, isEstimate: false, fall: 122.5, winter: 60, spring: 85 },
  { school: 'ravenscroft', association: 'NCISAA', classification: '4A', season: '2020–21', place: 7, points: 365, isEstimate: false, fall: 107.5, winter: 135, spring: 122.5 },
  { school: 'ravenscroft', association: 'NCISAA', classification: '4A', season: '2021–22', place: 8, points: 267.5, isEstimate: false, fall: 45, winter: 80, spring: 142.5 },
  { school: 'ravenscroft', association: 'NCISAA', classification: '4A', season: '2022–23', place: 6, points: 377.5, isEstimate: false, fall: 120, winter: 122.5, spring: 135 },
  { school: 'ravenscroft', association: 'NCISAA', classification: '4A', season: '2023–24', place: 6, points: 357.5, isEstimate: false, fall: 130, winter: 145, spring: 82.5 },
  { school: 'ravenscroft', association: 'NCISAA', classification: '4A', season: '2024–25', place: 12, points: 225, isEstimate: false, fall: 57.5, winter: 95, spring: 72.5 },
  { school: 'ravenscroft', association: 'NCISAA', classification: '4A', season: '2025–26', place: 14, points: 192.5, isEstimate: false, fall: 85, winter: 55, spring: 52.5 },
  { school: 'saint-marys', association: 'NCISAA', classification: '4A', season: '2020–21', place: 18, points: 22.5, isEstimate: false, fall: 0, winter: 0, spring: 22.5 },
  { school: 'saint-marys', association: 'NCISAA', classification: '4A', season: '2021–22', place: 17, points: 107.5, isEstimate: false, fall: 85, winter: 0, spring: 22.5 },
  { school: 'saint-marys', association: 'NCISAA', classification: '4A', season: '2022–23', place: 15, points: 107.5, isEstimate: false, fall: 85, winter: 0, spring: 22.5 },
  { school: 'saint-marys', association: 'NCISAA', classification: '4A', season: '2023–24', place: 16, points: 100, isEstimate: false, fall: 62.5, winter: 0, spring: 37.5 },
  { school: 'saint-marys', association: 'NCISAA', classification: '4A', season: '2024–25', place: 17, points: 22.5, isEstimate: false, fall: 0, winter: 0, spring: 22.5 },
  { school: 'saint-marys', association: 'NCISAA', classification: '4A', season: '2025–26', place: 17, points: 22.5, isEstimate: false, fall: 0, winter: 0, spring: 22.5 },
  { school: 'wake-christian', association: 'NCISAA', classification: '4A', season: '2020–21', place: 17, points: 45, isEstimate: false, fall: 22.5, winter: 0, spring: 22.5 },
  { school: 'wake-christian', association: 'NCISAA', classification: '4A', season: '2021–22', place: 18, points: 37.5, isEstimate: false, fall: 37.5, winter: 0, spring: 0 },
  { school: 'wake-christian', association: 'NCISAA', classification: '3A', season: '2022–23', place: 10, points: 217.5, isEstimate: false, fall: 107.5, winter: 0, spring: 110 },
  { school: 'wake-christian', association: 'NCISAA', classification: '3A', season: '2023–24', place: 14, points: 180, isEstimate: false, fall: 60, winter: 0, spring: 120 },
  { school: 'wake-christian', association: 'NCISAA', classification: '3A', season: '2024–25', place: 18, points: 102.5, isEstimate: false, fall: 37.5, winter: 0, spring: 65 },
  { school: 'wake-christian', association: 'NCISAA', classification: '3A', season: '2025–26', place: 9, points: 265, isEstimate: false, fall: 90, winter: 30, spring: 145 },
  { school: 'wesleyan-christian', association: 'NCISAA', classification: '4A', season: '2020–21', place: 10, points: 272.5, isEstimate: false, fall: 122.5, winter: 45, spring: 105 },
  { school: 'wesleyan-christian', association: 'NCISAA', classification: '4A', season: '2021–22', place: 16, points: 120, isEstimate: false, fall: 37.5, winter: 37.5, spring: 45 },
  { school: 'wesleyan-christian', association: 'NCISAA', classification: '4A', season: '2022–23', place: 14, points: 147.5, isEstimate: false, fall: 37.5, winter: 37.5, spring: 72.5 },
  { school: 'wesleyan-christian', association: 'NCISAA', classification: '4A', season: '2023–24', place: 9, points: 310, isEstimate: false, fall: 82.5, winter: 75, spring: 152.5 },
  { school: 'wesleyan-christian', association: 'NCISAA', classification: '4A', season: '2024–25', place: 11, points: 245, isEstimate: false, fall: 60, winter: 97.5, spring: 87.5 },
  { school: 'wesleyan-christian', association: 'NCISAA', classification: '4A', season: '2025–26', place: 13, points: 205, isEstimate: false, fall: 75, winter: 70, spring: 60 },
]

/** Places 1 and 2 in 2A, 3A and 4A for every season, on or off the roster. */
export const CUP_DIVISION_LEADERS: CupDivisionLeader[] = [
  { school: "The O'Neal School", association: 'NCISAA', classification: '2A', season: '2020–21', place: 1, points: 335, fall: 112.5, winter: 102.5, spring: 120 },
  { school: 'Gaston Day', slug: 'gaston-day', association: 'NCISAA', classification: '2A', season: '2020–21', place: 2, points: 302.5, fall: 120, winter: 75, spring: 107.5 },
  { school: 'Forsyth Country Day', association: 'NCISAA', classification: '3A', season: '2020–21', place: 1, points: 582.5, fall: 112.5, winter: 117.5, spring: 352.5 },
  { school: 'Cary Christian', association: 'NCISAA', classification: '3A', season: '2020–21', place: 2, points: 490, fall: 180, winter: 110, spring: 200 },
  { school: 'Providence Day School', slug: 'providence-day', association: 'NCISAA', classification: '4A', season: '2020–21', place: 1, points: 670, fall: 267.5, winter: 157.5, spring: 245 },
  { school: 'Charlotte Country Day School', slug: 'charlotte-country-day', association: 'NCISAA', classification: '4A', season: '2020–21', place: 2, points: 645, fall: 237.5, winter: 107.5, spring: 300 },
  { school: 'Gaston Day School', slug: 'gaston-day', association: 'NCISAA', classification: '2A', season: '2021–22', place: 1, points: 395, fall: 175, winter: 87.5, spring: 132.5 },
  { school: 'The O’Neal School', association: 'NCISAA', classification: '2A', season: '2021–22', place: 2, points: 392.5, fall: 110, winter: 125, spring: 157.5 },
  { school: 'Forsyth Country Day School', association: 'NCISAA', classification: '3A', season: '2021–22', place: 1, points: 605, fall: 150, winter: 155, spring: 300 },
  { school: 'Cape Fear Academy', association: 'NCISAA', classification: '3A', season: '2021–22', place: 2, points: 525, fall: 177.5, winter: 117.5, spring: 230 },
  { school: 'Charlotte Country Day School', slug: 'charlotte-country-day', association: 'NCISAA', classification: '4A', season: '2021–22', place: 1, points: 682.5, fall: 272.5, winter: 87.5, spring: 322.5 },
  { school: 'Charlotte Latin School', slug: 'charlotte-latin', association: 'NCISAA', classification: '4A', season: '2021–22', place: 2, points: 655, fall: 185, winter: 197.5, spring: 272.5 },
  { school: 'The O’Neal School', association: 'NCISAA', classification: '2A', season: '2022–23', place: 1, points: 322.5, fall: 130, winter: 102.5, spring: 90 },
  { school: 'Trinity Academy', association: 'NCISAA', classification: '2A', season: '2022–23', place: 2, points: 305, fall: 147.5, winter: 47.5, spring: 110 },
  { school: 'Forsyth Country Day School', association: 'NCISAA', classification: '3A', season: '2022–23', place: 1, points: 592.5, fall: 170, winter: 135, spring: 287.5 },
  { school: 'Greensboro Day School', association: 'NCISAA', classification: '3A', season: '2022–23', place: 2, points: 507.5, fall: 142.5, winter: 132.5, spring: 232.5 },
  { school: 'Providence Day School', slug: 'providence-day', association: 'NCISAA', classification: '4A', season: '2022–23', place: 1, points: 782.5, fall: 250, winter: 175, spring: 357.5 },
  { school: 'Charlotte Latin School', slug: 'charlotte-latin', association: 'NCISAA', classification: '4A', season: '2022–23', place: 2, points: 612.5, fall: 180, winter: 185, spring: 247.5 },
  { school: 'Davidson Day School', slug: 'davidson-day', association: 'NCISAA', classification: '2A', season: '2023–24', place: 1, points: 497.5, fall: 237.5, winter: 95, spring: 165 },
  { school: 'The O’Neal School', association: 'NCISAA', classification: '2A', season: '2023–24', place: 2, points: 372.5, fall: 87.5, winter: 130, spring: 155 },
  { school: 'Forsyth Country Day School', association: 'NCISAA', classification: '3A', season: '2023–24', place: 1, points: 635, fall: 180, winter: 167.5, spring: 287.5 },
  { school: 'Cape Fear Academy', association: 'NCISAA', classification: '3A', season: '2023–24', place: 2, points: 407.5, fall: 162.5, winter: 47.5, spring: 197.5 },
  { school: 'Providence Day School', slug: 'providence-day', association: 'NCISAA', classification: '4A', season: '2023–24', place: 1, points: 757.5, fall: 257.5, winter: 195, spring: 305 },
  { school: 'Charlotte Country Day School', slug: 'charlotte-country-day', association: 'NCISAA', classification: '4A', season: '2023–24', place: 2, points: 690, fall: 272.5, winter: 132.5, spring: 285 },
  { school: 'Caldwell Academy', association: 'NCISAA', classification: '2A', season: '2024–25', place: 1, points: 425, fall: 157.5, winter: 110, spring: 157.5 },
  { school: 'Rocky Mount Academy', association: 'NCISAA', classification: '2A', season: '2024–25', place: 2, points: 380, fall: 112.5, winter: 70, spring: 197.5 },
  { school: 'Greensboro Day School', association: 'NCISAA', classification: '3A', season: '2024–25', place: 1, points: 457.5, fall: 82.5, winter: 167.5, spring: 207.5 },
  { school: 'Davidson Day School', slug: 'davidson-day', association: 'NCISAA', classification: '3A', season: '2024–25', place: 2, points: 367.5, fall: 167.5, winter: 62.5, spring: 137.5 },
  { school: 'Providence Day School', slug: 'providence-day', association: 'NCISAA', classification: '4A', season: '2024–25', place: 1, points: 650, fall: 217.5, winter: 180, spring: 252.5 },
  { school: 'Charlotte Latin School', slug: 'charlotte-latin', association: 'NCISAA', classification: '4A', season: '2024–25', place: 2, points: 640, fall: 225, winter: 147.5, spring: 267.5 },
  { school: 'Caldwell Academy', association: 'NCISAA', classification: '2A', season: '2025–26', place: 1, points: 482.5, fall: 150, winter: 152.5, spring: 180 },
  { school: 'Burlington Christian Academy', association: 'NCISAA', classification: '2A', season: '2025–26', place: 2, points: 382.5, fall: 107.5, winter: 0, spring: 275 },
  { school: 'Cape Fear Academy', association: 'NCISAA', classification: '3A', season: '2025–26', place: 1, points: 450, fall: 170, winter: 57.5, spring: 222.5 },
  { school: 'Greensboro Day School', association: 'NCISAA', classification: '3A', season: '2025–26', place: 2, points: 420, fall: 115, winter: 117.5, spring: 187.5 },
  { school: 'Providence Day School', slug: 'providence-day', association: 'NCISAA', classification: '4A', season: '2025–26', place: 1, points: 692.5, fall: 222.5, winter: 200, spring: 270 },
  { school: 'Charlotte Latin School', slug: 'charlotte-latin', association: 'NCISAA', classification: '4A', season: '2025–26', place: 2, points: 690, fall: 277.5, winter: 205, spring: 207.5 },
]

const b = (key: string): CupSport => ({ key, gender: 'boys' })
const g = (key: string): CupSport => ({ key, gender: 'girls' })
const e = (key: string): CupSport => ({ key, gender: 'both' })

/** Each key resolves to `sports.cup.sport_<key>` in the locale catalogs. */
export const CUP_SPORTS: Record<CupAssociation, Record<'fall' | 'winter' | 'spring', CupSport[]>> = {
  NCISAA: {
    fall: [b('crossCountry'), b('football11'), b('football8'), b('soccer'), g('crossCountry'), g('fieldHockey'), g('golf'), g('tennis'), g('volleyball')],
    winter: [b('basketball'), b('swimming'), b('wrestling'), g('basketball'), g('swimming')],
    spring: [b('baseball'), b('golf'), b('lacrosse'), b('tennis'), b('trackField'), g('lacrosse'), g('soccer'), g('softball'), g('trackField')],
  },
  NCHSAA: {
    fall: [e('cheerleading'), e('crossCountry'), e('flagFootball'), e('football'), b('soccer'), g('golf'), g('tennis'), g('volleyball')],
    winter: [e('basketball'), e('indoorTrack'), e('swimmingDiving'), e('wrestling')],
    spring: [e('baseball'), e('lacrosse'), b('golf'), b('tennis'), b('volleyball'), e('softball'), e('trackField'), g('soccer')],
  },
}
