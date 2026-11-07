// Compare › The Arts, "Arts offered" group: one row per art form in three
// bands, one cell per school, with LS / MS / US chips where the school's own
// arts pages name it for that division.
//
// WHY A TYPED TABLE, NOT A DERIVATION. The arts modules (src/data/artsPrograms)
// are prose lines per division, ensemble names and a curated studio grid — not
// a roster. Deriving a "No" from the media grid would say Hickory Grove teaches
// no painting, which its "Art I–IV" plainly does. So each Yes is a typed claim
// in src/data/artsMatrix.ts whose value is a VERBATIM fragment of that school's
// arts module; check:matrices asserts every fragment is still a substring of
// the file, so an arts-prose edit that invalidates a claim fails the build.
// The negative cell reads "Not listed", never "No".
//
// Types only, so this loads under plain Node for the check and the schema doc.

import type { Division, BuiltCell } from './compareMatrix.ts'

export type ArtKey =
  | 'visualArt' | 'drawingPainting' | 'ceramics' | 'sculpture' | 'printmaking' | 'photography'
  | 'darkroom' | 'graphicDesign' | 'filmVideo' | 'fiberFashion' | 'designFabrication'
  | 'generalMusic' | 'band' | 'orchestra' | 'choir' | 'jazz' | 'aCappella' | 'percussion'
  | 'marchingBand' | 'guitar' | 'piano' | 'worshipBand' | 'contemporaryEnsemble'
  | 'musicTechnology' | 'musicTheory'
  | 'plays' | 'musicals' | 'technicalTheatre' | 'dance'

export type ArtGroupKey = 'visual' | 'music' | 'theatre'

export const ART_GROUPS: { key: ArtGroupKey; keys: ArtKey[] }[] = [
  {
    key: 'visual',
    keys: ['visualArt', 'drawingPainting', 'ceramics', 'sculpture', 'printmaking', 'photography', 'darkroom',
      'graphicDesign', 'filmVideo', 'fiberFashion', 'designFabrication'],
  },
  {
    key: 'music',
    keys: ['generalMusic', 'band', 'orchestra', 'choir', 'jazz', 'aCappella', 'percussion', 'marchingBand',
      'guitar', 'piano', 'worshipBand', 'contemporaryEnsemble', 'musicTechnology', 'musicTheory'],
  },
  { key: 'theatre', keys: ['plays', 'musicals', 'technicalTheatre', 'dance'] },
]

export const ART_KEYS: ArtKey[] = ART_GROUPS.flatMap((g) => g.keys)

/** Per art form, per division: the verbatim fragment of the school's arts module that proves it. */
export type ArtsClaims = Partial<Record<ArtKey, Partial<Record<Division, string>>>>
export type ArtsTable = Record<string, ArtsClaims>
/** Per school, a division it publishes nothing for (one reader-facing reason each). */
export type ArtsUnknown = Record<string, Partial<Record<Division, string>>>

export type ArtsCell = BuiltCell & { unknownDivs?: Division[] }

export type ArtsMatrixRow = { key: ArtKey; count: number; cells: Record<string, ArtsCell> }
export type ArtsMatrix = {
  groups: { key: ArtGroupKey; rows: ArtsMatrixRow[] }[]
  /** Every typed claim, flattened, for the cite check. */
  cites: { slug: string; key: ArtKey; div: Division; cite: string }[]
}

const DIVS: Division[] = ['LS', 'MS', 'US']

/**
 * @param hasProgram per comparable slug: whether an arts module exists (false → N/A).
 */
export function buildArtsMatrix(
  hasProgram: Record<string, boolean>,
  table: ArtsTable,
  unknown: ArtsUnknown,
): ArtsMatrix {
  const slugs = Object.keys(hasProgram)
  const cites: ArtsMatrix['cites'] = []
  for (const [slug, claims] of Object.entries(table)) {
    for (const [key, byDiv] of Object.entries(claims)) {
      for (const [div, cite] of Object.entries(byDiv ?? {})) {
        cites.push({ slug, key: key as ArtKey, div: div as Division, cite: cite as string })
      }
    }
  }
  const groups = ART_GROUPS.map((g) => ({
    key: g.key,
    rows: g.keys.map((key) => {
      const cells: Record<string, ArtsCell> = {}
      let count = 0
      for (const slug of slugs) {
        if (!hasProgram[slug]) {
          cells[slug] = { state: 'na' }
          continue
        }
        const unknownDivs = DIVS.filter((d) => unknown[slug]?.[d])
        const byDiv = table[slug]?.[key]
        const divs = DIVS.filter((d) => byDiv?.[d])
        if (divs.length) {
          count++
          cells[slug] = { state: 'yes', divs, ...(unknownDivs.length ? { unknownDivs } : {}) }
        } else {
          cells[slug] = { state: 'notListed', ...(unknownDivs.length ? { unknownDivs } : {}) }
        }
      }
      return { key, count, cells }
    }),
  }))
  return { groups, cites }
}
