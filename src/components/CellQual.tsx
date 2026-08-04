import { useId } from 'react'
import { useTranslation } from 'react-i18next'
import type { CellQual as CellQualData } from '../data/metricValues.ts'
import { BlueprintCorners } from './BlueprintCorners.tsx'

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
 *
 * The popover uses the native `popover` attribute so it renders in the browser's
 * top layer — outside `.table-wrap { overflow: auto }`, which would otherwise
 * clip a CSS-positioned tooltip on the right-hand school columns a reader has to
 * scroll to reach.
 */
export function CellQual({ value, qual, school, metricKey }: Props) {
  const { t } = useTranslation()
  // Stable across re-renders, unique when the same school appears in several rows.
  const id = `qual-${metricKey}-${useId().replace(/[:]/g, '')}`

  return (
    <>
      <button
        type="button"
        className="qual"
        // @ts-expect-error — React 19 passes popovertarget through to the DOM.
        popovertarget={id}
        aria-label={t('compare.qualAria', { value, school })}
        style={{ ['anchorName' as string]: `--${id}` }}
      >
        <span className="mark-val">{value}</span>
        <span className="qual-dot" aria-hidden="true" />
      </button>
      <div
        id={id}
        popover="auto"
        className="tip"
        style={{ ['positionAnchor' as string]: `--${id}` }}
      >
        <BlueprintCorners />
        <span className="tip-kind">{t(`compare.qual.${qual.kind}`)}</span>
        <span className="tip-body">{qual.text}</span>
      </div>
    </>
  )
}
