---
name: add-school-news
description: >
  Add a school's live "Latest News" section to its dossier page — confirm WHICH SCHOOL and
  its news board URL with the user (both are blocking questions; never infer either),
  inspect that site's real HTML, write a dedicated parser
  for its CMS, persist the structure into source-material, and register it BOTH in the app
  and in the CORS Worker's host allow-list so the section renders. Adding a school requires
  a one-off Cloudflare API token from the user to redeploy that Worker — a blocking step,
  so ask early rather than after the parser is written. Use when the user says "add news for <school>", "wire up the news section",
  "add the Latest News feed for <school>", or asks why a school's news section is missing
  or empty. Also use when a shipped news section breaks — a school site redesign is the
  expected failure mode and this skill carries the diagnosis path. The news section is
  deliberately NEVER translated: article headlines stay in the source language in every
  locale, and this skill states why so an i18n pass does not "fix" it.
---

# Add a school's Latest News section

Each school's news board runs on a different CMS with different markup. **There is no
universal parser.** This skill is the procedure for adding one school, plus the traps that
silently produce a plausible-but-wrong result.

Design reference: `Providence Day School.dc.html` (section `id="news"`) and
`latest-news-handoff-instructions.md`, in the Claude Design project
*Charlotte School Compare Website Design* (`5da24575-40bf-4787-8934-0fadfc56059f`).
Full build spec: [`.claude/plans/latestnews.md`](../../plans/latestnews.md).

---

## ⛔ The news section is NEVER translated — read this first

**Article content stays in English (the source language) in every locale. This is
deliberate. It is not deferred work, not a bug, and not an oversight.**

This is the single place in the project where the standing English-first-then-nine-locales
rule is switched off, so it is stated here in the skill a fresh window reads:

- **The content cannot be translated in principle.** Headlines, dates and previews are
  fetched live from the school's site at render time. There is no extraction step, no work
  file, no overlay, and no moment when a translator could see a string — tomorrow's
  headline does not exist today.
- **It is a citation surface.** A parent matches a headline against the school's own news
  board, exactly as they match a tuition figure against a published page. The reasoning
  that keeps figures copied char-for-char keeps headlines in the source language.
- **Render-time machine translation is explicitly rejected.** It would put unreviewed text
  on the page in nine locales with no native-speaker review possible — the exact failure
  mode nine locale rollouts were spent closing.

### The dividing line

| Layer | Translated? |
|---|---|
| Headline, date, preview sentence, photo alt | ❌ **No** — as published |
| Section chrome ("Latest News", "Read the story", "All news & media", status lines, error text) | ✅ **Yes** — normal `src/locales/*.json` keys, all ten catalogs |

**Chrome is chrome** and obeys the normal rule — a missing key fails `npm run check:chrome`.
Only *fetched article content* stays English.

Consequently, adding a school's news is **always single-phase**. There is no Phase 2.

**Never** add the news section to `i18n_topics.mjs`, the prose extractor, `PROSE_TRANSLATED`,
or any overlay. It is not a research area and holds no `src/data` prose.

If a reviewer reports "the news headlines are in English on the Spanish page" — **that is
correct behavior.** Point them here.

---

## Step 0 — STOP. Get the SCHOOL from the user, and wait for it

**If the invocation did not name a school, ask which one and block on the answer.**

> "Which school should I add the Latest News section for?"

### Do not infer which school — not by any route

Same rule and same reasoning as step 1. **All of these are forbidden:**

- ❌ the next school in `src/data/schools.json` or alphabetical order
- ❌ the school named in a plan, an open branch, or a recent commit
- ❌ "the one after whichever shipped last"
- ❌ the school in the design reference file (that is Providence Day for *every* mockup,
  because the design was authored on that page — it says nothing about which school is next)
- ❌ a school inferred from anything else in the repo

If the user names a school, use exactly that one. **Do not expand the scope** — adding news
is deliberately one school at a time, and doing two because they seem related is not the
user's decision to make.

### Why

Picking the wrong school wastes the entire pass: the URL question, the HTML inspection, the
parser and the provenance record are all school-specific, and none of it transfers. Worse,
it can look like progress — a committed parser for a school nobody asked for reads as
completed work.

**Both blocking questions can be asked together.** If nothing was named, ask for the school
*and* its news board URL in one message, then wait for both.

---

## Before you start

**Is the shared infrastructure built yet?**

```bash
ls src/lib/news/ 2>/dev/null && ls src/components/LatestNews.tsx 2>/dev/null
```

- **Missing** → this is the first school. Build the whole feature from
  [`.claude/plans/latestnews.md`](../../plans/latestnews.md); this skill's step 3 is the
  parser part of that work.
- **Present** → adding a school is only steps 0–6 below. Do not touch the component,
  chrome strings, styles or wiring.

**One step needs the user and cannot be batched away: step 5b redeploys the CORS
Worker**, which requires a Cloudflare API token they must create. Surface that
early rather than at step 5b, so it is not discovered after the parser is written
and the only thing left is a blocked deploy.

---

## Step 1 — STOP. Get the news board URL from the user, and wait for it

**Ask, then genuinely block on the answer. The URL comes from the user and from
nowhere else.**

> "What's the permanent news page URL for {school} — the official news/press board?"

### Do not derive the URL yourself — not by any route

This is a hard rule, and it explicitly covers URLs that feel *verified* rather than
guessed. **All of these are forbidden sources:**

- ❌ links hardcoded in a Claude Design `.dc.html` reference file
- ❌ article URLs already present in design markup
- ❌ a footer, nav, or index link on the school's own site
- ❌ a plausible CMS path (`/news`, `/about/communications`, `/news-media`)
- ❌ a URL used for this school in a previous session, plan, or source-material record
- ❌ a search result

Inferring from a design file **is still inferring**. So is lifting a URL from this skill's
own reference table.

**Do not fetch, curl, or probe a URL you derived.** Announcing "ready for the URL" and then
proceeding without it is the specific failure to avoid — it has happened, and it produced a
merged plan built on an unconfirmed URL.

### Why the rule is this strict

The user is the authority on which page is the *permanent* news source. A plausible-but-wrong
URL fails in the worst available way: it returns **HTTP 200**, parses to **zero items**, and
renders as an empty or error section that reads as a **code bug** rather than a wrong input.
Nobody debugging it later looks at the URL first.

Corroborating evidence that a URL is "the one the designer used" is **not** the user
confirming it is the one they want. Only the user can settle that.

### While you wait

Blocking on this URL does not mean idling. Read the design spec, study repo conventions,
check whether the shared infrastructure exists, draft scaffolding. Just do not fetch, probe,
or bake a self-derived URL into a parser, plan, skill, or committed source-material record.

### What to capture

- **`boardUrl`** — the page the parser fetches, listing articles.
- **`indexUrl`** — where "All news & media" sends the reader.

**Ask whether they differ.** Often they are the same page, and the user may say so
explicitly ("this is the only site you need") — in that case use the one URL for both and
do not go hunting for a separate index page.

---

## Step 2 — Inspect the real HTML

```bash
curl -sS -L --max-time 25 \
  -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36" \
  "<boardUrl>" -o /tmp/news.html
wc -c /tmp/news.html
```

A desktop User-Agent matters — some CMSes serve a stripped page to unknown agents.

**Confirm the articles are server-rendered:**

```bash
grep -c '<article' /tmp/news.html
grep -oE '<time[^>]*datetime="[^"]*"' /tmp/news.html | head
```

**If the articles are NOT in the raw HTML**, the board is JS-hydrated and cannot be parsed
this way. **Stop and report.** Options: an RSS/JSON feed (check `/rss`, `/feed`,
`?format=rss` and any `<link rel="alternate">`), or a different source page. Do not attempt
headless rendering in the browser bundle.

**Identify the CMS** — it determines the selectors:

| CMS | Tell-tale markers |
|---|---|
| **Finalsite** | `fsElement`, `fsPostElement`, `data-board-id`, `article.fsBoard-N` |
| **Blackbaud** | `bb-`, `fsBoardPost`, `/podium/` URLs |
| **WordPress** | `wp-content`, `post-<id>`, `entry-title` |
| **Squarespace** | `sqs-`, `BlogList-item` |

**Note the CORS header** (expected absent — the proxy exists for this reason):

```bash
curl -sSI -L "<boardUrl>" | grep -i access-control-allow-origin || echo "no CORS header (expected)"
```

---

## Step 3 — Write the parser

One module per school: `src/lib/news/parsers/<slug>.ts`. **Isolated on purpose** — one
school's redesign must never break another's.

Extract per article: **title**, **url**, **date**, **photo** (may be absent), and a
**summary** if the board carries one.

Normalize to the shared shape — absolutize URLs, drop items with no title or URL,
de-duplicate, **sort newest-first**, **cap at 10**.

### Trap 1 — the photo may not be in `src`

Lazy-loading CMSes hide real image URLs in data attributes. **Finalsite** puts them in
`data-image-sizes` as an **HTML-entity-encoded JSON array** of `{url,width}`, with no `src`
at all.

A naive `src="…jpg"` scrape finds **zero** photos and renders every row photo-less — which
looks exactly like a correct application of the "some articles have no photo" rule while
actually being a parser bug. **Before concluding a school publishes no photos, grep for
`data-src`, `data-image-sizes`, `srcset` and `<noscript>`.**

Unescape entities, `JSON.parse`, pick a mid-range width (~640px), and wrap it all in
`try/catch` — a shape change should mean "no photo", never a crashed section.

### Trap 2 — `og:description` may be boilerplate

On Providence Day, **every** article's `og:description` is the literal string
`"News Post"`. It is non-empty, so it passes a naive check and ships as the preview on
every row.

**Always eyeball the actual value** on 2–3 articles before trusting it. If it is
boilerplate, take the first substantive `<p>` (>60 chars) of the article body instead,
truncated to ~160 chars on a word boundary.

### Trap 3 — a photo caption can outrank the opening paragraph

Found in the **browser check** of the Providence Day build, not in its HTML capture — so
it survives a careful `curl` pass. Posts that lead with a captioned hero image put that
caption in a `<p>` inside `<figure class="fsImageCaptioned">`, **before** the first body
paragraph. It is well over 60 chars, so a plain "first substantive `<p>`" rule ships

> "Pictured: Brooks Hinton '27 with Lower School Freedom School scholars."

as the preview: grammatical, plausible, and not what the story is about. Two of ten rows
were wrong this way.

Exclude captions **structurally** rather than by wording —
`p.closest('figure, figcaption, .fsImageCaptioned, .fsCaption')` — with a
`Pictured:` / `(L)` text guard as a backstop. **Read the previews on the rendered page**;
this class of defect only shows up there.

### Trap 4 — the board may carry no summary at all

Common (Finalsite list views show only thumbnail/title/date). Previews then need a second
fetch per article. Render the list as soon as the board parse resolves and let previews
fill in; an article whose body fetch fails shows **no preview line** — never an empty
element, never a stalled section.

### Reference: the verified Providence Day parser (Finalsite)

Captured 2026-08-27; all 10 articles server-rendered, HTTP 200, ~62KB.

| Field | Selector | Notes |
|---|---|---|
| Items | `article[data-post-id]` | 10 present |
| URL | `a.fsPostLink[href]` | already absolute |
| Title | `div.fsTitle > a` | `textContent.trim()` |
| Date | `time[datetime]` | ISO-8601, e.g. `2026-08-24T08:00:00-04:00` |
| Photo | `img[data-image-sizes]` | entity-encoded JSON — **Trap 1** |
| Summary | — | **absent** — needs per-article fetch |
| Preview | first body `<p>` >60 chars, **captions skipped** | **not** `og:description` — **Traps 2 & 3** |

**URL — user-confirmed 2026-08-27:**
`https://www.providenceday.org/about/pd-communications/news-media`

The user stated this is the **only** site needed for Providence Day, so it serves as both
`boardUrl` and `indexUrl` (the "All news & media" link points back to the same board). An
earlier `/about/pd-communications` index URL was **self-derived and has been removed** — it
was never confirmed.

For any **other** school, this table is a worked example of the *method*, not a source of
URLs. Step 1 still applies in full: get the URL from the user and wait for it.

---

## Step 4 — Persist provenance (required)

The project's data-provenance standard applies. Write
`source-material/news/<slug>/<School> - News - News Board Structure.md` containing:

- a provenance header (who/when/how),
- **both source URLs**,
- the CMS and the selector table,
- which fields are present vs absent,
- any traps specific to this site,
- the CORS observation.

This is what later distinguishes *a school redesigned its site* from *the parser broke*.

Use `source-material/news/providence-day/` as the model.

---

## Step 5 — Register the school

Add the slug → `NewsSource` entry in `src/lib/news/sources.ts` (`boardUrl`, `indexUrl`,
`domain`, `parse`, optional `preview`).

**A slug absent from this registry renders no chip, no rail item and no section** — the
project's absence-of-data principle. That is the correct treatment for a school whose board
cannot be parsed; never ship an empty shell.

**This is only HALF of registering a school. Step 5b is the other half** — the Worker must
also be told it may fetch that host, or the section ships and errors.

---

## Step 5b — Allow the school's host in the CORS Worker (REQUIRED)

**This step needs the USER — it cannot be completed unattended.** Read the whole
section before starting, because the deploy needs a credential a fresh window
does not have.

### Why it exists

The relay is **our own Cloudflare Worker** (`workers/news-proxy/`, live at
`https://news-proxy.dward330.workers.dev`), not a public proxy. It allow-lists
**which hosts it will fetch** — without that it would be an open proxy anyone
could point at any URL, on this account's quota and reputation.

**A school registered in `sources.ts` but missing from `ALLOWED_HOSTS` fails with
`403 Host not allowed`, which renders as the section's error state.** Nothing in
the app build catches this. It looks identical to a parser bug or a dead site, so
it is the FIRST thing to check when one school errors and the others are fine.

### 1 — Add the host

In `workers/news-proxy/worker.js`, add the board's hostname to `ALLOWED_HOSTS`.
**Add both the apex and the `www.` form** unless you have confirmed which one the
board actually serves — a redirect between them is invisible until it 403s.

### 2 — Get a credential from the user (BLOCKING)

`npx wrangler deploy` needs auth, and there is no stored credential — the token
used for the last deploy was deliberately rolled afterwards.

**Do not attempt `npx wrangler login` first.** It opens a browser OAuth flow that
failed on this machine with `request_forbidden` / *"No CSRF value available in
the session cookie"* (the callback landing in a different browser than the one
that started it). It also cannot be completed by an agent in a headless or
Remote Control session at all.

**Ask the user for a scoped API token** — this is the path that works, including
unattended:

> "Adding <school> needs a one-off Cloudflare token to redeploy the news Worker.
> At https://dash.cloudflare.com/profile/api-tokens → Create Token → Create
> Custom Token, with permission **Account → Workers Scripts → Edit**."

Then:

```bash
cd workers/news-proxy
CLOUDFLARE_API_TOKEN=<token> npx wrangler deploy
```

**Tell the user to roll or delete the token afterwards.** A token pasted into a
conversation lives in that transcript, which is append-only — rotating the
credential is the fix, not deleting text. The Worker keeps running once deployed;
the token is only needed to push.

### 3 — Verify the host is actually allowed

```bash
curl -s -o /dev/null -w '%{http_code}\n' \
  "https://news-proxy.dward330.workers.dev/?url=<url-encoded board URL>"
```

`200` = allow-listed. `403` = the host is not in `ALLOWED_HOSTS`, or the deploy
did not land. **A plain `curl` is a valid health check against this Worker** —
unlike the old public relay `corsproxy.io`, which gated on User-Agent and 403'd
every non-browser client while browsers passed cleanly.

### Traps, all of which cost real time on the first deploy

- **A brand-new `workers.dev` hostname takes minutes to serve TLS.** Symptoms in
  order: `SSLV3_ALERT_HANDSHAKE_FAILURE`, then Cloudflare `error code: 1010`
  returned to `curl`/Python — that is **bot protection rejecting the client
  signature, not your Worker**. A real browser is the only trustworthy test in
  that window. This only affects a first-ever deploy, not a redeploy.
- **The free tier is 100k requests/day PER ACCOUNT**, not per Worker. The section
  costs ~11 requests per scrolling visitor (1 board + 10 previews), so roughly
  9,000 visitors/day — and a 15-minute edge cache plus the app's 30-minute
  `sessionStorage` cache both sit in front of that. Over-cap requests are
  **rejected, never billed**. If headroom ever gets tight, raising the Worker's
  edge TTL is far cheaper than upgrading.
- **`localhost` is already an allowed origin, deliberately.** Do not remove it —
  without it the section renders its error state under `npm run dev` while
  production is perfectly healthy, which reads as a broken feature.

## Step 6 — Verify

```bash
npm run build
npm run lint
```

Then **in a real browser** — the standing project rule, because every defect found after the
data read 100% has been render-layer:

1. Section renders between Welcome Video and Course Offerings; chip after Welcome Video;
   rail item above "Research areas".
2. Loading → reveal, status lines advancing on **real** parse phases (not a timer).
3. Headlines, dates and photos match the school's live board.
4. Rows without a photo omit the thumbnail and keep the arrow — no empty box.
5. **Block `news-proxy.dward330.workers.dev` in devtools / go offline** → error state with
   a working link, no infinite spinner.
6. **Confirm the requests actually hit the Worker** — in the Network tab, filter on
   `news-proxy` and expect `1 board + N previews`, all `200`. **A `403` here means step 5b
   was skipped or the deploy did not land**, and it is the one failure that renders exactly
   like a broken parser.
7. Non-English locale → chrome translated, **headlines English**. Correct — see the top of
   this skill.
8. `prefers-reduced-motion: reduce` → no spin/sweep/pulse.

---

## Diagnosing a broken section

| Symptom | Likely cause |
|---|---|
| Error state for every school | The Worker is down or misdeployed — check `PROXY` and `npx wrangler deployments list` in `workers/news-proxy/` |
| Error state, one school — **check this first** | **`ALLOWED_HOSTS` (step 5b)** — host missing from the Worker, or the redeploy never ran. `curl` the Worker with that board URL: `403` confirms it. Costs seconds to rule out. |
| Error state, one school, Worker returns `200` | Site redesign — re-run step 2 and diff against the `source-material` record |
| Renders, but no photos anywhere | **Trap 1** — photos moved to a data attribute |
| Every preview identical/boilerplate | **Trap 2** — `og:description` is not a summary |
| Previews read "Pictured: …" / describe a photo | **Trap 3** — a caption is outranking the body text |
| Empty section, HTTP 200 | Wrong URL (step 1) or selectors matching nothing |
| Headlines in English on a translated page | **Not a bug.** See the top of this skill. |

---

## Boundaries

- **Never guess a news URL** — always confirm with the user.
- **Never translate fetched article content**, and never add this section to any overlay or
  the prose extractor.
- **Never inject fetched HTML into the live DOM** — parse with `DOMParser` only. This is
  third-party markup.
- **Registering a school is TWO places, not one.** `src/lib/news/sources.ts` *and*
  `ALLOWED_HOSTS` in `workers/news-proxy/worker.js` (redeployed). Either alone ships a
  section that errors.
- **One parser per school.** Do not generalize two schools into a shared parser because
  their CMS looks alike; the isolation is the point.
- **Do not run `npm run deploy`** — publishing is the user's call, every time.
