---
name: learning-support-episode
description: >
  Make a Charlotte Private School Conversations podcast episode about one school's
  Learning Support & Student Services area. Asks which school, re-checks the app's data
  against the school's OWN live pages, rewrites every fee amount, name, email and phone
  number out of the source for audio, builds the NotebookLM source PDF and the talk-show
  prompt, and hands back the files, the upload steps and the traps to listen for. Also
  judges a transcript the user brings back and writes the next prompt version. Use when
  the user types /learning-support-episode, or asks to "make a learning support episode
  for <school>", "turn <school>'s learning support into a podcast", or brings back a
  learning-support episode transcript to check. Only for a school whose Learning Support
  area already shipped; it never edits app code or research data.
---

# /learning-support-episode — one school's Learning Support area, as a podcast episode

The repeatable form of the hand-built Global Exposure episodes (Providence Day, Charlotte
Country Day, Charlotte Latin), designed with the user on 2026-10-25. The generator is
`scripts/gen_learning_episode.mjs` (`npm run report:learning`); its header comment holds the
reasons behind every rule below.

**Show rules:** the Podcast episode standard in `CLAUDE.md` applies in full. It's a talk
show, never a reading, and a PDF is never mentioned aloud. The opening is exactly "Welcome
to another episode of Charlotte Private School Conversations." charlotteschoolinsights.com
is named as a great resource to learn more at the open and the close, with the school's own
site as the authority. The generated prompt carries all three; keep them when editing it.

## The decisions this skill encodes (user, 2026-10-25)

| Decision | How it is enforced |
|---|---|
| **The order follows a parent's questions, not the order of the cards on screen:** big picture → can they serve my child → how a need gets noticed → day-to-day support → therapy → wellness & health → the team → what the school doesn't say → close | The generator writes the PDF and the prompt in this order. Testing comes before Services, and Services' Wellness & health group is its own segment. |
| **No person is named on air** (staff, therapists or students). Provider *companies* may be named. | `staff.people` and `therapy.people` render as roles with counts. Any other string carrying a staffer's name fails the build until it is rewritten. |
| **Costs: say whether something costs extra, never the amount** | `IH_FEE` renders as "Offered by the school, at an extra cost". Any string with a dollar figure fails the build until it is rewritten. |
| **The Ask the School questions are dropped** | The `ask` card never renders. Only its `asOf` date is used, as the PDF's "As of". |
| **Two need examples, not seven** | All seven "By need" verdicts are in the PDF, and the prompt asks for two. |
| **Gaps are spoken as gaps** | NOT STATED items are collected under "What the school's pages do not say", which explains that this is not the same as "not offered". The prompt has a matching rule. |
| **Segment 3 is about identifying a need, never admission** | The Services "Entrance testing" row never renders. |

**Why these are kept out of the PDF instead of just banned in the prompt:** every episode so
far shows that a prompt rule loses to source text pulling the other way. The hosts cannot
say a fee or a name that is not in the PDF.

## Step 1 — which school

```bash
node scripts/gen_learning_episode.mjs        # lists the eligible schools, exits 2
```

Eligibility is computed from `src/data/learningSupport/*.ts`. Never state the roster from
memory. If the school has no Learning Support area, stop: the area is built with
`/learning-support`, and nothing is written here.

## Step 2 — the freshness check (required)

Before building, re-check the app's data against the school's **own live pages**: the
`sources` on the eligibility, services, therapy, testing and staff cards. Tell the user it is
running, because it is the slow step. Compare what the episode speaks as fact:

- which services exist, and their codes (offered / at extra cost / outside provider / not stated)
- outside provider companies, and which days they are on campus
- eligibility and documentation rules, including evaluation review cycles
- screening and identification steps
- staff counts by role and division (counts only; names are never spoken)
- anything the data marks NOT STATED that the school has since published

**The school's own site wins.** Put each difference in the overrides file as
`{ "value": …, "note": "…, checked <date>", "source": "<url>" }`. Those notes print in a
"Checked against the school's live site" section. If a page cannot be reached, say which
ones and that the build uses the researched data. Never present unverified data as
verified. Never edit `src/data/learningSupport/**` or `source-material/**` here. Updating
the app is a separate branch and PR under the data-provenance standard, so offer it and
do not do it.

## Step 3 — rewrite for audio

```bash
npm run report:learning -- --school <slug> --overrides <scratch>/overrides.json \
  --skeleton <scratch>/skeleton.json
```

It exits **3** and lists every string carrying a **fee amount, email address, phone number
or staff name**. `--skeleton` writes them out as a starter overrides file. Merge those paths
into the overrides file and rewrite each value. A string replaces the value; `null` drops
the item (a stat tile, a note).

- **Fee →** what it is, without the amount: "billed per session", "carries a fee",
  "the family pays the provider directly". A stat tile whose value is the fee: `null`.
- **Name →** the role: "the Director of Learning Services". Never use a pronoun the
  school did not publish.
- **Email or phone →** drop it, or say what it is: "the school links national crisis lines".
- **Quotes stay char-for-char.** If a quote contains an amount, take the quote marks off
  and paraphrase rather than edit inside them.
- Change nothing else about the meaning, and add no fact.

While doing this, also look for wording in the data that a host would hear as **"not
offered"** where the research shows only *not described*, and rewrite it the same way. Check
against the school's `Official Site Research.md` before changing anything.

The gate's name list comes from `staff.people` + `therapy.people` in the **original** data,
so a name the school publishes but the data never lists is invisible to it. Read the
rendered PDF anyway.

## Step 4 — school notes, then build

The generic prompt runs about 3,600 characters. A `--notes <file>` adds up to ~1,200 more,
and the 4,900 budget is enforced on the whole body. Use the notes for:

- a `PRONOUNCE:` line for any name the hosts might trip on (methods, provider companies, places)
- **two to four** school-specific lines that must land, e.g. two published review cycles that
  disagree, a service only one division has, a qualifier the hosts would flatten

Write each line **positively and without a condition.** Never write "if …" or "where the
school says …", which is the part NotebookLM drops. Never write a negation as a quotable
fact ("never required"), because a host will say it as the school's words. Say the silence
instead: "the school does not say whether …".

```bash
npm run report:learning -- --school <slug> --overrides <scratch>/overrides.json --notes <scratch>/notes.txt
```

Outputs go to `reports/learning-support/` (gitignored, so there is no PR for an episode):
`<School> - Learning Support - NotebookLM Source.pdf`, `… Prompt.txt`, and the `.html` it
was rendered from. Read the PDF with `pdftotext -layout` before handing it over.

## Step 5 — hand over

Give both paths, then the steps:

1. [notebooklm.google.com](https://notebooklm.google.com): a new notebook named
   `Charlotte Private School Conversations — <School> Learning Support`
2. Upload **the PDF as the only source**
3. Audio Overview → Deep Dive → **Customize**: paste everything below the `PASTE FROM HERE` line
4. Length: Default. Generate, then bring back the transcript.

Then list the **traps to listen for**. Always include these, plus the school-specific ones:

- any spoken fee, price or dollar figure
- any spoken name of a staff member, therapist or student
- a NOT STATED service said as "not offered" or "doesn't have"
- entrance tests (ISEE, Gesell, readiness visits) in the "how a need gets noticed" segment
- a promised outcome ("will thrive", "will catch up"), or advice that a child needs an evaluation
- qualifiers dropped: "typically", "may", "as staffing allows", "first-come, first-served"
- an outside provider described as school staff, or the reverse
- the opening line not exact; the site not named at the open and the close
- "PDF", "document" or "source" spoken; rules recited on air
- anything after the closing disclaimer, or only half of it

Save a project memory recording the build, the school's traps and the prompt length, as
the Global Exposure episodes did.

## Step 6 — judging a take

When the user brings a transcript back, **check its claims against the PDF text**
(`pdftotext -layout`, then grep). Don't just read it through, because a correct PDF does not
make a correct episode. Report a verdict (**PUBLISHABLE** or **RE-DO**), each defect with
the PDF's actual wording, and the minor residue separately.

A re-do gets a hand-edited `… Prompt v2.txt` beside the first, with a `#` header line naming
what it fixes. Keep it under 4,900: fix a defect by rewording a line, not by stacking
rules, because the more rules a prompt has, the more of them the hosts recite. **Compare
takes rather than assume the newest is best.** A fix often moves the loss somewhere else
(Charlotte Latin take 3 was worse than take 2). If the same fix is needed for a second
school, fold it into the generator's template and rebuild every school.

## Step 7 — after the user publishes

Adding the episode to `src/data/podcastEpisodes.ts` (`researchArea: 'learning-support'`)
is a separate one-row change on its own branch and PR. The section's Listen strip picks it
up with no other change. Verify the Spotify URL via oEmbed first. Deploying is the user's
call, every time.

**Deliberately cannot:** edit app code or research data, speak a fee or a name, render the
Ask the School questions, or deploy.
