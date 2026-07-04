// Tiny dependency-free hash router. Hash URLs keep deep links shareable (a compare
// selection, a school page) without needing any server routing config.
//
//   #/                      -> home
//   #/school/<slug>         -> single school
//   #/compare?topic=..&schools=a,b  -> comparison

import { useSyncExternalStore, useCallback } from 'react'

export type Route =
  | { name: 'home' }
  | { name: 'school'; slug: string }
  | { name: 'compare'; topic: string | null; schools: string[] }

function parse(hash: string): Route {
  const clean = hash.replace(/^#\/?/, '')
  const [path, queryStr] = clean.split('?')
  const segs = path.split('/').filter(Boolean)
  const query = new URLSearchParams(queryStr ?? '')

  if (segs[0] === 'school' && segs[1]) {
    return { name: 'school', slug: decodeURIComponent(segs[1]) }
  }
  if (segs[0] === 'compare') {
    return {
      name: 'compare',
      topic: query.get('topic'),
      schools: (query.get('schools') ?? '').split(',').map((s) => s.trim()).filter(Boolean),
    }
  }
  return { name: 'home' }
}

function subscribe(cb: () => void): () => void {
  window.addEventListener('hashchange', cb)
  return () => window.removeEventListener('hashchange', cb)
}

export function useRoute(): Route {
  const hash = useSyncExternalStore(
    subscribe,
    () => window.location.hash,
    () => '',
  )
  return parse(hash)
}

/** Imperative navigation helpers. */
export function toHome(): string {
  return '#/'
}
export function toSchool(slug: string): string {
  return `#/school/${encodeURIComponent(slug)}`
}
export function toCompare(topic: string | null, schools: string[]): string {
  const params = new URLSearchParams()
  if (topic) params.set('topic', topic)
  if (schools.length) params.set('schools', schools.join(','))
  const q = params.toString()
  return q ? `#/compare?${q}` : '#/compare'
}

export function useNavigate(): (href: string) => void {
  return useCallback((href: string) => {
    window.location.hash = href.startsWith('#') ? href.slice(1) : href
    // Bring the new view into view on navigation (esp. mobile).
    window.scrollTo({ top: 0 })
  }, [])
}
