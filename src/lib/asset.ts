// Resolve a public-folder asset path against Vite's configured `base`.
//
// Assets under public/ are authored with a root-absolute path ("/logo.png",
// "/arts/foo.jpg"). That works when the site is served from the domain root,
// but GitHub Pages serves this project from a subpath
// ("/CharlottePrivateSchoolConversations/"). `import.meta.env.BASE_URL` holds
// whatever `base` is set to in vite.config.ts (with a trailing slash), so we
// strip the leading slash off the asset path and join the two.
//
// Keeping this at the render layer means the research data files (which the
// ingest pipeline regenerates) never need to know about the deploy path.
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL // e.g. "/CharlottePrivateSchoolConversations/"
  return base.replace(/\/$/, '') + '/' + path.replace(/^\//, '')
}
