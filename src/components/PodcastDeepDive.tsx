import { useEffect, useId, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  SHOW_APPLE_URL,
  SHOW_SPOTIFY_URL,
  episodesFor,
  unmappedEpisodesFor,
} from '../data/podcastEpisodes.ts'
import { BlueprintCorners } from './BlueprintCorners.tsx'

/**
 * Podcast deep-dive entry points, driven entirely by the episode table in
 * `src/data/podcastEpisodes.ts` — the component is school-agnostic and looks
 * everything up, so adding a school or an episode needs no change here.
 *
 * Two variants over one shared popover:
 *
 *  - `section` — the strip under a research-area header, offering the episodes
 *    that cover this school AND this topic.
 *  - `page`    — the line under the school-header chips, offering the episodes
 *    that cover this school but map to no research area (Summer Camp, the
 *    Season 1 finale).
 *
 * A variant with no matching episode renders NOTHING — no wrapper, no empty
 * state, no placeholder. Davidson Day's After School section is the live case:
 * episode 13 covers only Charlotte Latin and Charlotte Christian, so that one
 * cell of the 42-cell matrix stays bare and its header keeps its normal margin.
 *
 * Episode titles are deliberately NOT translated (they are identifiers a
 * listener matches against Spotify and Apple); only the chrome around them is.
 */

type Props = {
  /** School slug, as in `schools.json`. */
  school: string
  /** Localized school name, for the count/page lines. */
  schoolName: string
  /** Topic slug — required for `section`, unused by `page`. */
  area?: string
  /** Localized topic label, for the count line. Never a raw slug. */
  topicLabel?: string
  variant: 'section' | 'page'
}

export function PodcastDeepDive({ school, schoolName, area, topicLabel, variant }: Props) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const panelId = useId()

  // Close on outside click and on Escape; Escape returns focus to the trigger.
  // Same shape as LanguagePicker: listeners only exist while open, `mousedown`
  // rather than `click` so a press outside closes before the target reacts.
  // That also gives "one popover at a time" for free — pressing another strip's
  // trigger fires this one's outside handler first.
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      btnRef.current?.focus()
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const episodes =
    variant === 'page' ? unmappedEpisodesFor(school) : episodesFor(school, area ?? '')

  // The whole point of the "renders nothing" rule — no wrapper element either,
  // so a section without an episode is byte-identical to how it looked before.
  if (episodes.length === 0) return null

  const single = episodes.length === 1 ? episodes[0] : null

  const trigger = (
    <div className="podcast-pop" ref={wrapRef}>
      <button
        type="button"
        ref={btnRef}
        className="podbtn"
        data-on={open}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => { setOpen((v) => !v) }}
      >
        {variant === 'page' ? t('podcast.moreEpisodes') : t('podcast.listen')}
        <ChevronIcon />
      </button>

      {open && (
        <div
          className={single ? 'podcast-panel' : 'podcast-panel wide'}
          id={panelId}
        >
          <BlueprintCorners />
          <div className="podcast-panel-head">
            {single ? t('podcast.whereToListen') : t('podcast.showName')}
          </div>

          {single ? (
            <div className="podcast-rows">
              <a
                className="podrow"
                href={single.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SpotifyIcon />
                <span className="podrow-label">{t('podcast.spotify')}</span>
                <ExternalIcon />
              </a>
              <a
                className="podrow"
                href={single.appleUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AppleIcon />
                <span className="podrow-label">{t('podcast.apple')}</span>
                <ExternalIcon />
              </a>
            </div>
          ) : (
            <div className="podcast-list scrolllist">
              {episodes.map((e) => (
                <div key={e.id} className="podcast-episode">
                  {/* Not translated by design — an identifier the listener
                      matches against the platform, where it exists only in
                      English. */}
                  <div className="podcast-episode-title">{e.title}</div>
                  <div className="podcast-episode-links">
                    <a
                      className="podrow small"
                      href={e.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SpotifyIcon size={15} />
                      {t('podcast.spotify')}
                    </a>
                    <a
                      className="podrow small"
                      href={e.appleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <AppleIcon size={15} />
                      {t('podcast.appleShort')}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="podcast-follow">
            <span className="podcast-follow-label">{t('podcast.followShow')}</span>
            <a href={SHOW_SPOTIFY_URL} target="_blank" rel="noopener noreferrer">
              {t('podcast.spotify')}
            </a>
            <span aria-hidden="true">·</span>
            <a href={SHOW_APPLE_URL} target="_blank" rel="noopener noreferrer">
              {t('podcast.apple')}
            </a>
          </div>
        </div>
      )}
    </div>
  )

  if (variant === 'page') {
    return (
      <div className="podcast-pageline">
        <span className="podcast-pageline-glyph">
          <HeadphonesIcon size={16} />
        </span>
        <span className="podcast-pageline-text">
          {t('podcast.pageLine', { count: episodes.length, school: schoolName })}
        </span>
        {trigger}
      </div>
    )
  }

  return (
    <div className="podcast-strip">
      <span className="podcast-strip-glyph">
        <HeadphonesIcon size={20} />
      </span>
      <div className="podcast-strip-text">
        <div className="podcast-strip-title">{t('podcast.title')}</div>
        {/* One episode shows its own (published) title — the thing that earns
            the click. Several show a count, since three titles won't fit. */}
        <div className="podcast-strip-sub">
          {single
            ? single.fullTitle
            : t('podcast.countLine', {
                count: episodes.length,
                school: schoolName,
                topic: topicLabel ?? '',
              })}
        </div>
      </div>
      {trigger}
    </div>
  )
}

/* House-style inline SVG, transcribed from the design mock. Every icon:
   viewBox 0 0 24 24, fill none, stroke currentColor, strokeWidth 1.5, rounded
   caps/joins, aria-hidden. See SchoolDetail.tsx for the same convention. */

function HeadphonesIcon({ size }: { size: number }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" focusable="false"
    >
      <path d="M3 14v-2a9 9 0 0 1 18 0v2" />
      <path d="M21 16a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2z" />
      <path d="M3 16a2 2 0 0 0 2 2h1v-6H5a2 2 0 0 0-2 2z" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg
      width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" focusable="false"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

/** Neutral Lucide-style mark, not the official Spotify badge — the official
    marks carry brand-guideline obligations (clear space, minimum size, no
    recoloring) that a 17px glyph inheriting currentColor on hover would break. */
function SpotifyIcon({ size = 17 }: { size?: number }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round"
      aria-hidden="true" focusable="false"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M7.5 9.6c2.9-.7 6-.4 8.6 1" />
      <path d="M8 12.6c2.3-.5 4.8-.3 6.9.8" />
      <path d="M8.6 15.4c1.8-.4 3.7-.2 5.3.6" />
    </svg>
  )
}

function AppleIcon({ size = 17 }: { size?: number }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" focusable="false"
    >
      <rect x="9.5" y="3" width="5" height="10" rx="2.5" />
      <path d="M6 11a6 6 0 0 0 12 0" />
      <path d="M12 17v4" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg
      width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" focusable="false"
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  )
}
