import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

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
  plugins: [react()],
})
