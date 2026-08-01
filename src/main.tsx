import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ready } from './lib/i18n.ts'
import { initAnalytics } from './lib/analytics.ts'
import App from './App.tsx'

// Wait for the saved/detected locale's catalog before the first paint, so a
// returning Spanish reader doesn't get a frame of English. `ready` never
// rejects — a bundle that fails to load leaves English in place.
await ready

// Report hash navigations to Cloudflare Web Analytics as distinct page-views
// (the beacon in index.html only sees the shared path otherwise). Best-effort;
// never affects routing. See src/lib/analytics.ts.
initAnalytics()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
