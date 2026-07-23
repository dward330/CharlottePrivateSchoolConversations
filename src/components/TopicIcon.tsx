// Emoji glyphs per topic. Falls back to a book for any future topic slug.
const ICONS: Record<string, string> = {
  'after-school': '🎒',
  'college-support': '🎓',
  'financial-aid-tuition': '💵',
  sports: '🏅',
  'student-clubs': '🤝',
  'the-arts': '🎨',
}

export function TopicIcon({ slug, size = 20 }: { slug: string; size?: number }) {
  return (
    <span aria-hidden="true" style={{ fontSize: size, lineHeight: 1 }}>
      {ICONS[slug] ?? '📚'}
    </span>
  )
}
