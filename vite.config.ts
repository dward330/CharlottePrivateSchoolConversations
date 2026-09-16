import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Strip the Cloudflare Web Analytics beacon on the DEV SERVER ONLY.
 *
 * The beacon is a static <script> in index.html, which Vite serves verbatim under
 * `vite dev` — so local browsing used to fire page-views against the same
 * production token as the live site. Only the deployed site should report telemetry.
 *
 * `apply: 'serve'` confines this to the dev server, so `vite build` output is
 * byte-identical to before this plugin existed. That matters: scripts/prerender.mjs
 * drives headless Chromium over the BUILT dist/ and snapshots the DOM into 12 route
 * pages, so the beacon must survive the build to reach production at all.
 *
 * NOT covered, deliberately: `npm run preview` serves a production build and still
 * loads the beacon. Suppressing that needs a runtime hostname check which must then
 * avoid firing during prerender (also localhost, but its output ships) — a
 * "not production" conditional this project has been bitten by before.
 */
const stripBeaconOnDev = {
  name: 'strip-cf-beacon-on-dev',
  apply: 'serve' as const,
  transformIndexHtml: {
    order: 'pre' as const,
    handler(html: string) {
      const RE =
        /\s*<!--\s*Cloudflare Web Analytics[\s\S]*?-->\s*<script[^>]*static\.cloudflareinsights\.com[\s\S]*?<\/script>/i
      if (!RE.test(html)) {
        // Loud on purpose. If index.html is reworded and this silently stops
        // matching, the beacon quietly resumes logging localhost traffic to
        // production with nobody aware.
        console.warn(
          '\n[strip-cf-beacon-on-dev] Cloudflare beacon block NOT FOUND in index.html.\n' +
            '  If the beacon was removed, delete this plugin.\n' +
            '  If it was reworded, update the regex — dev traffic is being logged to production.\n',
        )
        return html
      }
      return html.replace(RE, '')
    },
  },
}

// https://vite.dev/config/
export default defineConfig({
  // The site is served from the ROOT of its custom domain
  // (https://charlotteschoolinsights.com/), so assets resolve at '/'. A CNAME
  // file in public/ pins that domain on every GitHub Pages deploy.
  //
  // History: while the site lived at the project subpath
  // (dward330.github.io/CharlottePrivateSchoolConversations/) this was
  // '/CharlottePrivateSchoolConversations/'. If you ever deploy back to the
  // github.io subpath, restore that value.
  base: '/',
  plugins: [react(), stripBeaconOnDev],
})
