import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { comparableSchools } from '../lib/manifest.ts'
import { sortRowsByLabel, type MatrixCell, type MatrixDisplayGroup } from '../lib/compareMatrix.ts'
import { CompareMatrixRows, stateTip, useLang } from './CompareMatrixRows.tsx'
import { clubCatalog } from '../data/clubCatalog.ts'
import { buildClubsMatrix } from '../lib/clubsMatrix.ts'

/** Compare › Student Clubs, "Club categories": each school's own taxonomy mapped to canonical rows. */
type Col = { slug: string; name: string }

const CLUBS = buildClubsMatrix(
  Object.fromEntries(comparableSchools.map((s) => [s.slug, clubCatalog(s.slug)])),
)

export function CompareClubsRows({ cols }: { cols: Col[] }) {
  const { t } = useTranslation()
  const lang = useLang()
  const topic = t('compare.clubs.topic')
  const groups = useMemo<MatrixDisplayGroup[]>(() => {
    // The school's own labels, localized, by category index.
    const labelsOf = (slug: string) => clubCatalog(slug, lang)?.categories.map((c) => c.full) ?? []
    const list = new Intl.ListFormat(lang, { type: 'conjunction' })
    const rows = sortRowsByLabel(
      CLUBS.rows.map((row) => {
        const label = t(`compare.clubs.row_${row.key}`)
        const cells: Record<string, MatrixCell> = {}
        for (const s of cols) {
          const c = row.cells[s.slug] ?? { state: 'na' }
          const own = labelsOf(s.slug)
          if (c.state === 'yes') {
            // An override club shows its own category label beneath, like a mapped category.
            const cat = clubCatalog(s.slug, lang)
            const ownCats = (c.clubs ?? []).map((n) => cat?.clubs.find((k) => k.name === n)?.cat).map((k) => cat?.categories.find((x) => x.key === k)?.full)
            const subLabels = [...(c.categoryIndexes ?? []).map((i) => own[i]), ...ownCats].filter((x): x is string => Boolean(x))
            const sub = [...new Set(subLabels)].join(' · ')
            const cell: MatrixCell = { state: 'yes', sub, tip: [] }
            cell.tip = [
              ...stateTip(t, lang, cell, label, s.name, topic),
              ...(c.clubs?.length ? [t('compare.clubs.tipClubs', { clubs: list.format(c.clubs) })] : []),
              ...(c.quotes ?? []).map((q) => t('compare.clubs.tipQuoted', { quote: q })),
              t('compare.clubs.tipGroupsAs', { school: s.name, labels: list.format(own) }),
            ]
            cells[s.slug] = cell
          } else {
            const cell: MatrixCell = { state: c.state, tip: [] }
            cell.tip = stateTip(t, lang, cell, label, s.name, topic)
            if (c.state === 'notListed') cell.tip.push(t('compare.clubs.tipGroupsAs', { school: s.name, labels: list.format(own) }))
            cells[s.slug] = cell
          }
        }
        return { key: row.key, label, cells }
      }),
      lang,
    )
    return [{ key: 'clubs', label: t('compare.clubs.group'), rows }]
  }, [t, lang, cols, topic])
  return <CompareMatrixRows cols={cols} groups={groups} idPrefix="cmk" />
}
