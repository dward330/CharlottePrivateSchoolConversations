/* How long a jump keeps following its target. Long enough to outlast a cold
   news relay; once the scroll has landed, the browser's own scroll anchoring
   holds the heading in place, so nothing depends on this being exact. */
const FOLLOW_MS = 12_000

/* Anything that says the reader has taken over. `pointerdown` matters as much
   as the scroll inputs: opening a card right after landing grows the page, and
   following that growth would drag them back to the heading. */
const TAKEOVER_EVENTS = ['wheel', 'pointerdown', 'keydown', 'popstate'] as const

let stopFollowing: (() => void) | null = null

/* A smooth scroll fixes its destination when it starts. On a school page the
   scroll then passes Latest News, which trips its lazy fetch, and the real list
   lands mid-flight at up to 3x the skeleton's height — so the jump finishes a
   whole screen short of the section (Providence Day on a phone: 1,900px). The
   research swapping in on first load does the same on a smaller scale.

   Reserving height cannot fix this: real news runs ~1,000-2,700px by school and
   width. So re-aim instead, whenever the page height changes, until the reader
   takes over or the window closes. */
export function scrollToSection(id: string) {
  stopFollowing?.()
  const target = document.getElementById(id)
  if (!target) return
  target.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const root = document.documentElement
  const deadline = performance.now() + FOLLOW_MS
  let height = root.scrollHeight

  const observer = new ResizeObserver(() => {
    if (performance.now() > deadline || !target.isConnected) {
      stop()
      return
    }
    if (root.scrollHeight === height) return
    height = root.scrollHeight
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })

  function stop() {
    observer.disconnect()
    TAKEOVER_EVENTS.forEach((name) => window.removeEventListener(name, stop, true))
    stopFollowing = null
  }

  observer.observe(document.body)
  TAKEOVER_EVENTS.forEach((name) =>
    window.addEventListener(name, stop, { capture: true, passive: true }),
  )
  stopFollowing = stop
}
