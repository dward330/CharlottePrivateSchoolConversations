import { brandOf } from '../lib/manifest.ts'

type Props = {
  slug: string
  name: string
  size?: number
}

/** Brand-colored monogram badge standing in for each school's logo. */
export function SchoolBadge({ slug, name, size = 44 }: Props) {
  const brand = brandOf(slug)
  return (
    <span
      className="badge"
      style={{
        // eslint-disable-next-line
        ['--brand' as string]: brand.color,
        width: size,
        height: size,
        fontSize: size * 0.4,
      }}
      title={name}
      role="img"
      aria-label={name}
    >
      {brand.initials}
    </span>
  )
}
