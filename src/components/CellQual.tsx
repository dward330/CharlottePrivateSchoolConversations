import { useTranslation } from 'react-i18next'
import { localizeMoneyText } from '../lib/format.ts'
import type { CellQual as CellQualData } from '../data/metricValues.ts'
import { TopLayerTip } from './TopLayerTip.tsx'

type Props = {
  /** The already-localized display value (e.g. '$3.68M', '≥19'). */
  value: string
  qual: CellQualData
  /** School display name, for the accessible label. */
  school: string
  /** Metric key, to namespace the popover id when a school repeats across rows. */
  metricKey: string
}

/**
 * A qualified Compare cell: the figure plus a top-layer provenance popover.
 * The popover mechanics (top layer, hover/focus, placement) live in TopLayerTip.
 */
export function CellQual({ value, qual, school, metricKey }: Props) {
  const { t } = useTranslation()
  return (
    <TopLayerTip
      idPrefix={`qual-${metricKey}`}
      className="qual"
      ariaLabel={t('compare.qualAria', { value, school })}
      trigger={
        <>
          <span className="mark-val">{value}</span>
          <span className="qual-dot" aria-hidden="true" />
        </>
      }
    >
      <span className="tip-kind">{t(`compare.qual.${qual.kind}`)}</span>
      <span className="tip-body">{localizeMoneyText(qual.text)}</span>
    </TopLayerTip>
  )
}
