import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { comparableSchools } from '../lib/manifest.ts'
import { sortRowsByLabel, type MatrixCell, type MatrixDisplayGroup } from '../lib/compareMatrix.ts'
import { CompareMatrixRows, stateTip, useLang } from './CompareMatrixRows.tsx'
import { summerProgram } from '../data/summerPrograms.ts'
import { buildSummerMatrix, SUMMER_CATALOG_NOTES } from '../lib/summerMatrix.ts'

/** Compare › Summer Programs, "Camp categories": each school's published filters mapped to canonical rows. */
type Col = { slug: string; name: string }

const SUMMER = buildSummerMatrix(
  Object.fromEntries(comparableSchools.map((s) => [s.slug, summerProgram(s.slug)])),
)

export function CompareSummerRows({ cols }: { cols: Col[] }) {
  const { t } = useTranslation()
  const lang = useLang()
  const topic = t('compare.summer.topic')
  const groups = useMemo<MatrixDisplayGroup[]>(() => {
    const list = new Intl.ListFormat(lang, { type: 'conjunction' })
    // One plain caveat per school, written for a parent (see SUMMER_CATALOG_NOTES).
    const note = (slug: string) => t(`compare.summer.note_${SUMMER_CATALOG_NOTES[slug] ?? 'default'}`)
    const rows = sortRowsByLabel(
      SUMMER.rows.map((row) => {
        const label = t(`compare.summer.row_${row.key}`)
        const cells: Record<string, MatrixCell> = {}
        for (const s of cols) {
          const c = row.cells[s.slug] ?? { state: 'na' }
          const cat = summerProgram(s.slug, lang)?.catalog
          const own = (cat?.categoryFilters ?? []).filter((f) => f.token.toLowerCase() !== 'all').map((f) => f.label)
          if (c.state === 'yes') {
            const subLabels = (c.filterIndexes ?? []).map((i) => cat?.categoryFilters[i]?.label).filter((x): x is string => Boolean(x))
            const sub = subLabels.join(' · ') || undefined
            const cell: MatrixCell = { state: 'yes', sub, tip: [] }
            cell.tip = [
              t('compare.summer.tipYes', { school: s.name, item: label }),
              ...(subLabels.length ? [t('compare.summer.tipFiledUnder', { labels: list.format(subLabels) })] : []),
              ...(c.camps?.length ? [t('compare.summer.tipExamples', { camps: list.format(c.camps) })] : []),
              note(s.slug),
            ]
            cells[s.slug] = cell
          } else if (c.state === 'notListed') {
            const cell: MatrixCell = { state: 'notListed', tip: [] }
            cell.tip = [t('compare.summer.tipNone', { school: s.name, item: label, labels: list.format(own) }), note(s.slug)]
            cells[s.slug] = cell
          } else {
            const cell: MatrixCell = { state: 'na', tip: [] }
            cell.tip = stateTip(t, lang, cell, label, s.name, topic)
            cells[s.slug] = cell
          }
        }
        return { key: row.key, label, cells }
      }),
      lang,
    )
    return [{ key: 'summer', label: t('compare.summer.group'), rows }]
  }, [t, lang, cols, topic])
  return <CompareMatrixRows cols={cols} groups={groups} idPrefix="cms" />
}
