# Charlotte Christian — Sports — Podcast Episode 33 (Saleh Athletic Center)

## Provenance

- **Who / when:** Fetched by Claude during `/plan newCharlotteChristianEpisode`, 2026-09-06.
- **How:** The show's RSS feed was resolved from the iTunes Lookup API
  (`https://itunes.apple.com/lookup?id=1894103555&entity=podcast` → `feedUrl`),
  then parsed directly. The canonical `open.spotify.com` episode URL is **not**
  in the feed — the feed's `<link>` is the *creator* URL
  (`podcasters.spotify.com` → redirects to `creators.spotify.com`), which carries
  only the Anchor short-id `e3obskr` and no base-62 Spotify episode id.
  It was recovered from the show's embed endpoint
  (`https://open.spotify.com/embed/show/31HWltz40P18VaObYhmtld`) and then
  **verified** against `https://open.spotify.com/embed/episode/6TLyGudcsLUiE7tLcCIgSG`,
  whose `name` and `releaseDate` both match the feed exactly.

## Source URLs

- RSS feed: https://anchor.fm/s/11187a32c/podcast/rss
- Apple episode: https://podcasts.apple.com/us/podcast/charlotte-private-school-conversations/id1894103555?i=1000787925116
- Spotify episode: https://open.spotify.com/episode/6TLyGudcsLUiE7tLcCIgSG
- Creator page (not used in the app): https://creators.spotify.com/pod/profile/dwardcoe/episodes/Charlotte-Christian-School---The-New-Saleh-Athletic-Center-Takes-Shape-Season-2-Premiere-e3obskr

## Episode record (verbatim from the feed)

| Field | Value |
|---|---|
| Published title | `Charlotte Christian School - The New Saleh Athletic Center Takes Shape (Season 2 Premiere)` |
| `itunes:season` | 2 |
| `itunes:episode` | 1 |
| `itunes:episodeType` | full |
| `pubDate` | Fri, 04 Sep 2026 20:31:18 GMT |
| `itunes:duration` | 00:13:17 |
| `guid` | 8b861352-407c-4237-8695-5f1b777e3f34 |
| Anchor short-id | e3obskr |
| Spotify episode id | 6TLyGudcsLUiE7tLcCIgSG |
| Apple `?i=` id | 1000787925116 |

**Feed position:** item 1 of 33 (newest). It is the 33rd episode of the show
overall, and the first of Season 2.

### Description (verbatim)

> A first look at Charlotte Christian School's new Saleh Athletic Center, the
> 53,000-square-foot final piece of its Master Campus Plan — seating for over
> 1,100, plus performance, wrestling, and training spaces. We walk the timeline
> from groundbreaking to the January 2027 completion target.

## Why this maps to `sports`

The episode is entirely about one athletic facility, and the app **already holds
that facility** in Charlotte Christian's Sports research area:

- `src/data/sportsPrograms/charlotte-christian.ts:411` (`facilities.headline`) —
  "A 53,000 sq ft athletic center broke ground in November 2025…"
- `src/data/sportsPrograms/charlotte-christian.ts:439` (`facilities.venues[0]`) —
  `{ name: 'Saleh Athletic Center', detail: '53,000+ sq ft — broke ground Nov 2025' }`
- `src/data/sportsPrograms/charlotte-christian.ts:488` (`facilities.sources[2]`) —
  the WCNC groundbreaking article

The `53,000` figure in the episode description matches the figure already in the
data character-for-character.

## New facts this episode carries that the app does NOT yet hold

Recorded for provenance. **Not part of the podcast-row change** — surfacing them
would edit the Sports facilities card, which is a separate decision:

- **Seating for over 1,100** — the current data says outright *"Seating capacities
  are not published for any Charlotte Christian venue"* (`facilities.careNote`).
  This episode contradicts that.
- **January 2027 completion target** — no completion date is in the app today.
- **Named interior spaces:** performance, wrestling, and training spaces.
- **Framing:** the centre is the *"final piece of its Master Campus Plan."*

The show is AI-assisted and synthesizes public school data, so it is a
**secondary** source. Before any of the above is published in the Sports card it
should be confirmed against a primary source (the school's own facilities page or
the WCNC article already cited).
