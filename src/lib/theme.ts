/* Light/dark theme. Defaults to the OS preference and follows it live until the
   user picks a side with the nav toggle; that choice is then remembered.

   `data-theme` is always written to <html> (never left unset), so the palette is
   pinned even in contexts that ignore prefers-color-scheme — print preview in
   particular renders as light-mode unless the attribute says otherwise. The
   matching pre-paint read lives in index.html so there's no flash on load. */

import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

export const THEME_KEY = 'cs-theme'

function stored(): Theme | null {
  try {
    const v = localStorage.getItem(THEME_KEY)
    return v === 'light' || v === 'dark' ? v : null
  } catch {
    return null // private mode / storage disabled
  }
}

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme(): { theme: Theme; toggle: () => void } {
  const [theme, setTheme] = useState<Theme>(() => stored() ?? systemTheme())
  // Null until the user commits to a side, which is what keeps us tracking the OS.
  const [pinned, setPinned] = useState<Theme | null>(() => stored())

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    if (pinned) return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => setTheme(systemTheme())
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [pinned])

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    setPinned(next)
    try {
      localStorage.setItem(THEME_KEY, next)
    } catch {
      /* not persisting is fine — the toggle still works for this session */
    }
  }

  return { theme, toggle }
}
