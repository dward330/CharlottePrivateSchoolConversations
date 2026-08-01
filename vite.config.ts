import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves this project from a subpath, not the domain root:
  //   https://dward330.github.io/CharlottePrivateSchoolConversations/
  // `base` makes Vite emit asset URLs relative to that subpath so the built
  // site loads correctly there. For local `vite dev` / `vite preview` this is
  // harmless — they serve under the same prefix.
  base: '/CharlottePrivateSchoolConversations/',
  plugins: [react()],
})
