import { useTranslation } from 'react-i18next'
import type { TFunction } from 'i18next'
import { comparableSchools, brandOf } from '../lib/manifest.ts'
import { sportsProgram, type Level } from '../data/sportsProgram.ts'
import { buildSportsMatrix, type GenderMark, type SportCell } from '../lib/sportsMatrix.ts'
import { TopLayerTip } from './TopLayerTip.tsx'
import { DepthChip, DepthLegend } from './DepthChip.tsx'

/**
 * Compare › Sports, "Sports offered" group: one row per sport recorded for any
 * comparable school, computed from each school's Sports Offered card (see
 * lib/sportsMatrix.ts for why it is computed rather than a VALUE_METRICS row).
 *
 * Built once from the ENGLISH sport data in every locale: the aliases key on the
 * English raw names, which carry no overlay. Only the chrome around them
 * translates. The row set is the union over all comparable schools, so it stays
 * stable while columns are toggled.
 */
const MATRIX = buildSportsMatrix(
  Object.fromEntries(comparableSchools.map((s) => [s.slug, sportsProgram(s.slug)?.offered])),
)

const LEVELS: Level[] = ['V', 'JV', 'MS']
const MARK_KEY: Record<GenderMark, string> = { B: 'boysShort', G: 'girlsShort', CO: 'coed' }
const WHO_KEY: Record<GenderMark, string> = { B: 'tipWho_boys', G: 'tipWho_girls', CO: 'tipWho_coed' }

function YesTip({ cell, sport, school, t, lang }: { cell: SportCell; sport: string; school: string; t: TFunction; lang: string }) {
  const list = new Intl.ListFormat(lang, { type: 'conjunction' })
  const present = LEVELS.filter((l) => cell[l])
  const unstated = present.some((l) => cell[l]!.unstated)
  return (
    <>
      <span className="tip-kind">{t('compare.sportsMatrix.tipKindYes')}</span>
      <span className="tip-body">{t('compare.sportsMatrix.tipYesLead', { school, sport })}</span>
      {present.map((l) => {
        const marks = cell[l]!.marks
        const level = t(`sports.level_${l}`)
        return (
          <span key={l} className="tip-body">
            {marks.length
              ? t('compare.sportsMatrix.tipLevel', {
                  level,
                  who: list.format(marks.map((m) => t(`compare.sportsMatrix.${WHO_KEY[m]}`))),
                })
              : t('compare.sportsMatrix.tipLevelOnly', { level })}
          </span>
        )
      })}
      {unstated && <span className="tip-body">{t('compare.sportsMatrix.tipUnstated')}</span>}
    </>
  )
}

export function CompareSportsRows({ cols }: { cols: { slug: string; name: string }[] }) {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage ?? i18n.language ?? 'en'
  // The fraction counts the schools selected at the top, not the whole roster: a
  // reader comparing four schools asks how many of THOSE field the sport. The row
  // set stays the full union, so a sport none of them offers reads 0/4.
  const total = cols.length
  const label = (key: string) => t(`sports.cup.sport_${key}`)
  const collator = new Intl.Collator(lang)
  const rows = [...MATRIX.rows].sort((a, b) => collator.compare(label(a.key), label(b.key)))

  return (
    <tbody>
      <tr className="group-row sm-band">
        <td className="group-label" colSpan={cols.length + 1}>
          <span className="group-label-text sm-band-in">
            <span>{t('compare.sportsMatrix.group')}</span>
            <DepthLegend withGender className="sm-legend" />
          </span>
        </td>
      </tr>
      {rows.map((row) => {
        const sport = label(row.key)
        return (
          <tr key={row.key} className="value-row sm-row">
            <th scope="row" className="row-metric">
              <span className="row-metric-label">{sport}</span>
              <span className="row-metric-cov">
                {row.seasons.map((s) => t(`sports.cup.term_${s}`)).join(' · ')}
                {' · '}
                {t('compare.coverage', {
                  count: cols.filter((s) => { const c = row.cells[s.slug]; return c != null && c !== 'na' }).length,
                  total,
                })}
              </span>
            </th>
            {cols.map((s) => {
              const cell = row.cells[s.slug]
              const state =
                cell === 'na'
                  ? t('compare.sportsMatrix.tipKindNa')
                  : cell
                    ? t('compare.sportsMatrix.tipKindYes')
                    : t('compare.sportsMatrix.tipKindNo')
              return (
                <td key={s.slug} className="cell sm-cell" style={{ ['--brand' as string]: brandOf(s.slug).color }}>
                  <TopLayerTip
                    idPrefix={`sm-${row.key}`}
                    className="qual sm-tip"
                    ariaLabel={t('compare.sportsMatrix.cellAria', { sport, school: s.name, state })}
                    trigger={
                      cell === 'na' ? (
                        <span className="mark-na">{t('compare.na')}</span>
                      ) : cell ? (
                        <>
                          <span className="sm-yes">{t('compare.sportsMatrix.yes')}</span>
                          <span className="sm-ladder">
                            {LEVELS.filter((l) => cell[l]).map((l) => {
                              const marks = cell[l]!.marks
                              return (
                                <span key={l} className="sm-rung">
                                  <DepthChip level={l} />
                                  {marks.length > 0 && (
                                    <span className="sm-gx">
                                      ({marks.map((m) => t(`compare.sportsMatrix.${MARK_KEY[m]}`)).join(', ')})
                                    </span>
                                  )}
                                </span>
                              )
                            })}
                          </span>
                        </>
                      ) : (
                        <span className="sm-no">{t('compare.sportsMatrix.no')}</span>
                      )
                    }
                  >
                    {cell === 'na' ? (
                      <>
                        <span className="tip-kind">{t('compare.sportsMatrix.tipKindNa')}</span>
                        <span className="tip-body">{t('compare.sportsMatrix.tipNa', { school: s.name })}</span>
                      </>
                    ) : cell ? (
                      <YesTip cell={cell} sport={sport} school={s.name} t={t} lang={lang} />
                    ) : (
                      <>
                        <span className="tip-kind">{t('compare.sportsMatrix.tipKindNo')}</span>
                        <span className="tip-body">{t('compare.sportsMatrix.tipNo', { sport, school: s.name })}</span>
                      </>
                    )}
                  </TopLayerTip>
                </td>
              )
            })}
          </tr>
        )
      })}
    </tbody>
  )
}
