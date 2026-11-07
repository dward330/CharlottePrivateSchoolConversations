import { useTranslation } from 'react-i18next'
import type { TFunction } from 'i18next'
import { brandOf } from '../lib/manifest.ts'
import { isolateFigures } from '../lib/format.ts'
import { TopLayerTip } from './TopLayerTip.tsx'
import { DivisionChip, DivisionLegend } from './DepthChip.tsx'
import {
  DIVISIONS,
  type Division,
  type MatrixCell,
  type MatrixDisplayGroup,
} from '../lib/compareMatrix.ts'

/**
 * Compare "offered" matrices for The Arts, Course Offerings, Student Clubs and
 * Summer Programs (plan `comparerows`): the shared renderer and its helpers.
 * One thin component per topic (CompareArtsRows.tsx, CompareCourseRows.tsx,
 * CompareClubsRows.tsx, CompareSummerRows.tsx) builds its matrix and composes
 * the chrome strings into this display shape.
 *
 * The matrices are computed from each school's own structured card data (or,
 * for the arts, from typed claims that cite it verbatim), so the row set is the
 * canonical vocabulary in the locale catalogs and the cells never drift from
 * the school pages. Like the Sports group, the aliases key on the ENGLISH raw
 * data; what a cell shows beneath a Yes (a club category, a camp filter) is
 * read from the localized accessor at render.
 *
 * The negative cell reads "Not listed", never "No" — see lib/compareMatrix.ts.
 */

type Col = { slug: string; name: string }

export const DIV_NAME_KEY: Record<Division, string> = {
  LS: 'compare.matrix.divName_LS',
  MS: 'compare.matrix.divName_MS',
  US: 'compare.matrix.divName_US',
}

function divisionsText(t: TFunction, lang: string, divs: Division[]): string {
  const list = new Intl.ListFormat(lang, { type: 'conjunction' })
  return list.format(divs.map((d) => t(DIV_NAME_KEY[d])))
}

/** The tooltip body lines shared by every matrix for a cell's state. */
export function stateTip(t: TFunction, lang: string, cell: MatrixCell, item: string, school: string, topic: string): string[] {
  if (cell.state === 'na') return [t('compare.matrix.tipNa', { school, topic })]
  if (cell.state === 'yes') {
    return [
      cell.divs?.length
        ? t('compare.matrix.tipYesDivs', { school, item, divisions: divisionsText(t, lang, cell.divs) })
        : t('compare.matrix.tipYes', { school, item }),
    ]
  }
  return [t('compare.matrix.tipNotListed', { item, school })]
}

export function unknownDivTips(t: TFunction, school: string, divs: Division[] | undefined): string[] {
  return (divs ?? []).map((d) => t('compare.matrix.tipUnknownDiv', { school, division: t(DIV_NAME_KEY[d]) }))
}

export function CompareMatrixRows({
  cols,
  groups,
  legend,
  idPrefix,
}: {
  cols: Col[]
  groups: MatrixDisplayGroup[]
  legend?: 'division'
  idPrefix: string
}) {
  const { t } = useTranslation()
  const total = cols.length
  const kind = (cell: MatrixCell) =>
    cell.state === 'na'
      ? t('compare.matrix.tipKindNa')
      : cell.state === 'yes'
        ? t('compare.matrix.tipKindYes')
        : t('compare.matrix.tipKindNotListed')
  return (
    <>
      {groups.map((g) => (
        <tbody key={g.key}>
          <tr className="group-row cm-band">
            <td className="group-label" colSpan={cols.length + 1}>
              <span className="group-label-text cm-band-in">
                <span>{g.label}</span>
                {legend === 'division' && <DivisionLegend />}
              </span>
            </td>
          </tr>
          {g.rows.map((row) => (
            <tr key={row.key} className="value-row cm-row">
              <th scope="row" className="row-metric">
                <span className="row-metric-label">{row.label}</span>
                <span className="row-metric-cov">
                  {t('compare.coverage', {
                    count: cols.filter((s) => row.cells[s.slug]?.state === 'yes').length,
                    total,
                  })}
                </span>
              </th>
              {cols.map((s) => {
                const cell = row.cells[s.slug] ?? { state: 'na', tip: [] }
                return (
                  <td key={s.slug} className="cell cm-cell" style={{ ['--brand' as string]: brandOf(s.slug).color }}>
                    <TopLayerTip
                      idPrefix={`${idPrefix}-${row.key}`}
                      className="qual cm-tip"
                      ariaLabel={t('compare.matrix.cellAria', { item: row.label, school: s.name, state: kind(cell) })}
                      trigger={
                        cell.state === 'na' ? (
                          <span className="mark-na">{t('compare.na')}</span>
                        ) : cell.state === 'yes' ? (
                          <>
                            <span className="cm-yes">{t('compare.matrix.yes')}</span>
                            {cell.divs && cell.divs.length > 0 && (
                              <span className="cm-chips">
                                {DIVISIONS.filter((d) => cell.divs!.includes(d)).map((d) => (
                                  <DivisionChip key={d} div={d} />
                                ))}
                              </span>
                            )}
                            {cell.sub && <span className="cm-sub">{isolateFigures(cell.sub)}</span>}
                          </>
                        ) : (
                          <span className="cm-no">{t('compare.matrix.notListed')}</span>
                        )
                      }
                    >
                      <span className="tip-kind">{kind(cell)}</span>
                      {cell.tip.map((line, i) => (
                        <span key={i} className="tip-body">
                          {isolateFigures(line)}
                        </span>
                      ))}
                    </TopLayerTip>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      ))}
    </>
  )
}

export function useLang() {
  const { i18n } = useTranslation()
  return i18n.resolvedLanguage ?? i18n.language ?? 'en'
}
