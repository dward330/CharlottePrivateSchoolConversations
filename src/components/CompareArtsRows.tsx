import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { comparableSchools } from '../lib/manifest.ts'
import { sortRowsByLabel, type MatrixCell, type MatrixDisplayGroup } from '../lib/compareMatrix.ts'
import { CompareMatrixRows, stateTip, unknownDivTips, useLang } from './CompareMatrixRows.tsx'
import { artsProgram } from '../data/artsProgram.ts'
import { buildArtsMatrix, type ArtsCell } from '../lib/artsMatrix.ts'
import { ARTS_MATRIX, ARTS_UNKNOWN_DIVISIONS } from '../data/artsMatrix.ts'

/** Compare › The Arts, "Arts offered": typed claims citing each school's arts module (data/artsMatrix.ts). */
type Col = { slug: string; name: string }

const ARTS = buildArtsMatrix(
  Object.fromEntries(comparableSchools.map((s) => [s.slug, artsProgram(s.slug) != null])),
  ARTS_MATRIX,
  ARTS_UNKNOWN_DIVISIONS,
)

export function CompareArtsRows({ cols }: { cols: Col[] }) {
  const { t } = useTranslation()
  const lang = useLang()
  const topic = t('compare.arts.topic')
  const groups = useMemo<MatrixDisplayGroup[]>(
    () =>
      ARTS.groups.map((g) => ({
        key: g.key,
        label: t(`compare.arts.group_${g.key}`),
        rows: sortRowsByLabel(
          g.rows.map((row) => {
            const label = t(`compare.arts.row_${row.key}`)
            const cells: Record<string, MatrixCell> = {}
            for (const s of cols) {
              const c: ArtsCell = row.cells[s.slug] ?? { state: 'na' }
              const base: MatrixCell =
                c.state === 'yes' ? { state: 'yes', divs: c.divs, tip: [] } : { state: c.state, tip: [] }
              base.tip = [...stateTip(t, lang, base, label, s.name, topic), ...unknownDivTips(t, s.name, c.state === 'na' ? undefined : c.unknownDivs)]
              cells[s.slug] = base
            }
            return { key: row.key, label, cells }
          }),
          lang,
        ),
      })),
    [t, lang, cols, topic],
  )
  return <CompareMatrixRows cols={cols} groups={groups} legend="division" idPrefix="cma" />
}
