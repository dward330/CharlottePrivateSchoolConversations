import { BlueprintCorners } from './BlueprintCorners.tsx'

/** Solid play triangle — marks the Welcome Video section and both of its TOC
    entries, so it reads as "not a research area" at a glance. */
export function PlayIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  )
}

/** The school's own introduction video, above the research areas. Deliberately
    NOT a research area: no document count, no expand/collapse, no citations.
    The iframe is plain (no `autoplay=1`), so YouTube only loads the poster frame
    until the reader presses play. */
export function WelcomeVideo({ name, url }: { name: string; url: string }) {
  return (
    <section id="welcome" className="welcome-section">
      <div className="welcome-head">
        <span className="glyph"><PlayIcon /></span>
        <h2>Welcome Video</h2>
        <span className="welcome-note">From the school</span>
      </div>
      <div className="welcome-frame">
        <BlueprintCorners />
        <div className="welcome-embed">
          <iframe
            src={url}
            title={`${name} — Welcome Video`}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            loading="lazy"
          />
        </div>
        <p className="welcome-caption">
          An introduction to {name}, in the school&rsquo;s own words. Press play to watch.
        </p>
      </div>
    </section>
  )
}
