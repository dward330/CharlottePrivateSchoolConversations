import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { comparableSchools } from '../lib/manifest.ts'
import { sortRowsByLabel, type MatrixCell, type MatrixDisplayGroup, type MatrixDisplayRow } from '../lib/compareMatrix.ts'
import { CompareMatrixRows, DIV_NAME_KEY, stateTip, unknownDivTips, useLang } from './CompareMatrixRows.tsx'
import { courseOfferings } from '../data/courseOfferings.ts'
import { buildCourseMatrix, type CourseCell } from '../lib/courseMatrix.ts'

/** Compare › Course Offerings: subjects and languages by division, from courseOfferings.ts. */
type Col = { slug: string; name: string }

const COURSES = buildCourseMatrix(
  Object.fromEntries(comparableSchools.map((s) => [s.slug, courseOfferings(s.slug)])),
)

export function CompareCourseRows({ cols }: { cols: Col[] }) {
  const { t } = useTranslation()
  const lang = useLang()
  const topic = t('compare.courses.topic')
  const groups = useMemo<MatrixDisplayGroup[]>(() => {
    const toRows = (rows: { key: string; cells: Record<string, CourseCell> }[]): MatrixDisplayRow[] =>
      sortRowsByLabel(
        rows.map((row) => {
          const label = t(`compare.courses.row_${row.key}`)
          const cells: Record<string, MatrixCell> = {}
          for (const s of cols) {
            const c: CourseCell = row.cells[s.slug] ?? { state: 'na' }
            const base: MatrixCell =
              c.state === 'yes' ? { state: 'yes', divs: c.divs, tip: [] } : { state: c.state, tip: [] }
            const flags = c.state === 'na' ? undefined : c
            base.tip = [
              ...stateTip(t, lang, base, label, s.name, topic),
              ...unknownDivTips(t, s.name, flags?.unknownDivs),
              ...(flags?.notPublishedDivs ?? []).map((d) =>
                t('compare.courses.tipNotPublished', { school: s.name, division: t(DIV_NAME_KEY[d]) }),
              ),
            ]
            cells[s.slug] = base
          }
          return { key: row.key, label, cells }
        }),
        lang,
      )
    return [
      { key: 'subjects', label: t('compare.courses.group_subjects'), rows: toRows(COURSES.subjects) },
      { key: 'languages', label: t('compare.courses.group_languages'), rows: toRows(COURSES.languages) },
    ]
  }, [t, lang, cols, topic])
  return <CompareMatrixRows cols={cols} groups={groups} legend="division" idPrefix="cmc" />
}
