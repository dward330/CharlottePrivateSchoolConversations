import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { comparableSchools } from '../lib/manifest.ts'
import { sortRowsByLabel, type MatrixCell, type MatrixDisplayGroup } from '../lib/compareMatrix.ts'
import { CompareMatrixRows, stateTip, useLang } from './CompareMatrixRows.tsx'
import { summerProgram } from '../data/summerPrograms.ts'
import { buildSummerMatrix } from '../lib/summerMatrix.ts'

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
    const rows = sortRowsByLabel(
      SUMMER.rows.map((row) => {
        const label = t(`compare.summer.row_${row.key}`)
        const cells: Record<string, MatrixCell> = {}
        for (const s of cols) {
          const c = row.cells[s.slug] ?? { state: 'na' }
          const cat = summerProgram(s.slug, lang)?.catalog
          const own = cat?.categoryFilters.map((f) => f.label) ?? []
          const tail = cat?.intro ? [cat.intro] : []
          if (c.state === 'yes') {
            const subLabels = (c.filterIndexes ?? []).map((i) => own[i]).filter(Boolean)
            const sub = subLabels.join(' · ') || undefined
            const cell: MatrixCell = { state: 'yes', sub, tip: [] }
            cell.tip = [
              ...stateTip(t, lang, cell, label, s.name, topic),
              ...(c.camps?.length ? [t('compare.summer.tipOverride', { camps: list.format(c.camps) })] : []),
              ...tail,
            ]
            cells[s.slug] = cell
          } else {
            const cell: MatrixCell = { state: c.state, tip: [] }
            cell.tip = stateTip(t, lang, cell, label, s.name, topic)
            if (c.state === 'notListed') {
              cell.tip.push(t('compare.summer.tipLabelsAs', { school: s.name, labels: list.format(own.filter((_, i) => cat?.categoryFilters[i].token.toLowerCase() !== 'all')) }), ...tail)
            }
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
