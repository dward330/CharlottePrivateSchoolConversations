import { useTranslation } from 'react-i18next'
import type { Level } from '../data/sportsProgram.ts'
import { DIVISIONS, type Division } from '../lib/compareMatrix.ts'

/**
 * The V / JV / MS depth chip and its legend, shared by the school page's
 * Sports Offered season board (SportsProgram.tsx) and the Compare page's
 * "Sports offered" group (CompareSportsRows.tsx), so the two cannot drift.
 *
 * The LS / MS / US division chip below is the arts / courses analogue, used by
 * the Compare "offered" matrices (CompareMatrixRows.tsx). It shares the base
 * class and the three hues: US takes the varsity hue, LS the JV hue, and MS the
 * same hue as the sports MS chip, because it means the same thing.
 */

/** A depth chip (V / JV / MS). */
export function DepthChip({ level }: { level: Level }) {
  return <span className={`sports-depth sports-depth-${level.toLowerCase()}`}>{level}</span>
}

/** A division chip (LS / MS / US); the label is chrome, the code is the key. */
export function DivisionChip({ div }: { div: Division }) {
  const { t } = useTranslation()
  return <span className={`sports-depth division-${div.toLowerCase()}`}>{t(`compare.matrix.div_${div}`)}</span>
}

/**
 * Depth-chip legend, so V / JV / MS read without guessing. `withGender` adds the
 * B / G letters and the no-letter line the Compare cells use.
 */
export function DepthLegend({ withGender = false, className = 'sports-legend' }: { withGender?: boolean; className?: string }) {
  const { t } = useTranslation()
  return (
    <div className={className}>
      <span className="text-muted">{t('sports.depthChips')}</span>
      <span>
        <DepthChip level="V" /> {t('sports.level_V')}
      </span>
      <span>
        <DepthChip level="JV" /> {t('sports.level_JV')}
      </span>
      <span>
        <DepthChip level="MS" /> {t('sports.level_MS')}
      </span>
      {withGender && (
        <>
          <span className="sm-lg-sep">
            <b>{t('compare.sportsMatrix.boysShort')}</b> {t('sports.cup.gender_boys')}
          </span>
          <span>
            <b>{t('compare.sportsMatrix.girlsShort')}</b> {t('sports.cup.gender_girls')}
          </span>
          <span>{t('compare.sportsMatrix.legendNoLetter')}</span>
        </>
      )}
    </div>
  )
}

/** Division-chip legend (LS / MS / US) with the "named, not taught" note. */
export function DivisionLegend({ className = 'cm-legend' }: { className?: string }) {
  const { t } = useTranslation()
  return (
    <div className={className}>
      <span className="text-muted">{t('compare.matrix.divisions')}</span>
      {DIVISIONS.map((d) => (
        <span key={d}>
          <DivisionChip div={d} /> {t(`compare.matrix.divName_${d}`)}
        </span>
      ))}
      <span className="sm-lg-sep">{t('compare.matrix.legendNote')}</span>
    </div>
  )
}
