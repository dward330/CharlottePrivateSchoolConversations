# Charlotte Latin School — Student Clubs Redesign Deep Research

**Provenance.** Compiled 2026-07-26 by Claude Code for the Student Clubs sub-section
redesign (cards 1a Affinity & Identity Groups, 1b Service & Civic Engagement,
1c Honor Societies). Method: direct HTML reads of charlottelatin.org (the site is
Finalsite, has no `sitemap.xml`, and its search is JS-driven, so pages were scraped
directly rather than fetched by guessed slug), plus three Upper School Profile PDFs and
the Family Handbook PDF.

**Confidence key.** VERIFIED = read directly from a live page or PDF. NOT PUBLISHED =
explicitly searched and absent. REFUTED = the school's own pages contradict the premise.

**Headline.** Two research premises were **refuted** by the school's own live pages:
Charlotte Latin has **no service-hours graduation requirement**, and it publishes **no
affinity-group count or roster**, so there is no count discrepancy to flag. Honor-society
coverage is essentially one society.

---

## 1a. Affinity & Identity Groups

### The coordinating structure — VERIFIED

The DEI page's student section is headed **"Student Programs - Alliance Clubs"**:
"The student-led Diversity Club and Alliance Groups align perfectly with our school's
mission as they raise awareness about issues of inclusion of, respect for, and civility
toward all persons across many dimensions of identity." No founding year is published.
Named staff: **Vernette Rucker, Assistant Director of Diversity, Equity, and Inclusion**.
→ https://www.charlottelatin.org/about/diversity-equity-inclusion

### The enumerable structure — VERIFIED

The only named identity group is a **club**, not a separate affinity page:

**Mosaic (Upper School)** — "To promote diversity in and outside of our school community
through events that celebrate our cultural, religious, ethnic, social and racial diversity.
We strive to promote inclusivity and respect for all kinds of human diversity through
appreciation and acceptance. **Under Mosaic we have Q&A and BSA.**"
→ https://www.charlottelatin.org/student-life/student-clubs/clubs

So the structure is **Mosaic** (umbrella club) → two sub-groups, **Q&A** and **BSA**. The
initialisms are **not expanded anywhere on the site** and must not be glossed.

Identity-adjacent Upper School clubs on the same roster:

- **Girl Up** — "To empower all women at CLS though education, advocacy, and service"
- **SISTERS** — freshman-women / upperclass-women mentoring pairs

### Faculty and parent structures — VERIFIED

**Divisional DEI Committees** (faculty/staff). For parents: **Parent DEI Education Learning
Sessions** and the **Parent Cookbook Club** — "transform the typical book club model into an
immersive cultural experience… exploring diverse cultures one delicious recipe at a time."
→ https://www.charlottelatin.org/about/diversity-equity-inclusion

### Gaps — 1a

- **No count of affinity groups is published anywhere**, so the anticipated "N advertised
  vs. N enumerated" discrepancy **does not exist** at this school. The DEI page HTML was
  checked directly, including collapsed accordion markup — the only occurrence of
  "affinity/alliance" is the single sentence quoted above. **No count flag is rendered.**
- **The "Diversity Club List" link is a dead end.** The DEI page links to `/fs/pages/2417`,
  which renders the same generic sentence and **contains no list**. →
  https://www.charlottelatin.org/fs/pages/2417
- **No Lower/Middle School affinity groups** published; no per-division breakout.
- **No parent affinity groups** — the Cookbook Club is parent DEI programming, not an
  identity-based affinity group.
- **No student diversity leadership corps and no NAIS SDLC mention** anywhere reachable,
  including https://www.charlottelatin.org/leading-programs/student-leadership-development

### REFUTED — a cross-school attribution error, do not ingest

An early search snippet attributed programs called **"Voices – Brotherhood & Identity"
(Grades 3–5)** and **"The Boys' Room" (Middle School)**, plus "affinity programming for
historically underrepresented boys in Grades 3–12," to Charlotte Latin. **None of it could
be verified** — those strings appear nowhere in the live DEI page HTML, and a targeted
search returned no Charlotte Latin source. Almost certainly another school's programming.
**Excluded.**

---

## 1b. Service & Civic Engagement

### REFUTED — there is no service-hours graduation requirement

The school states verbatim: **"Latin does not have a formal requirement of service hours
for graduation. We believe that our students find meaningful ways to engage in the community
through our school-based partnerships and their familial-based organizations."**
→ https://www.charlottelatin.org/leading-programs/student-leadership-development/service

Corroborated twice: the Upper School Profile — "Although service is not required, students
design, manage, and staff a wide variety of on-going weekly programs"
(https://www.charlottelatin.org/uploaded/COMPOSER/AcademicsTab/USprofile1718.pdf) — and the
Family Handbook: "Service is not a graduation requirement."
(https://www.charlottelatin.org/uploaded/COMPOSER/PortalUploads/All_School/CLSfamilyhandbook1819.pdf)

**URL note:** the working service page is
`/leading-programs/student-leadership-development/service`. The commonly cited
`/programs/service` returns **HTTP 404**.

### Program 1 — Latin Service Society — scale: 150 hours, founded 1997-98

A **recognition** program, not a requirement: "Latin's Service Society encourages Upper
School students to participate in various Community-Engaged Learning experiences and
recognizes students who make significant contributions to the community through service,"
using a reflection-based model across all four Upper School years.

Family Handbook: "To be inducted into the Service Society, a four-year student must perform
**150 hours** of service," prorated for transfers; and "The level of student involvement in
the Service Program since the Service Society's formation during the **1997-1998** school
year has been gratifying."

- Sources: https://www.charlottelatin.org/leading-programs/student-leadership-development/service ·
  https://www.charlottelatin.org/uploaded/COMPOSER/PortalUploads/All_School/CLSfamilyhandbook1819.pdf

### Program 2 — Habitat for Humanity — scale: four houses, and a national first

"Charlotte Latin is the **first private or independent school in the country** with a senior
class that funded and built a Habitat for Humanity House," and "The Latin community has
funded and built **four Habitat houses** and regularly assists with Habitat builds both
locally and in El Salvador."
→ https://www.charlottelatin.org/leading-programs/student-leadership-development/service

### Program 3 — Community Partners & Principles of Good Practice — scale: 3 school-wide partners, 6 principles

Named school-wide partners: **Baby Bundles**, **Special Olympics**, **Habitat for Humanity
of the Charlotte Region**. The six Principles of Good Practice for Community-Engaged
Learning: Sustained Partnerships · Safety · Reciprocity + Interrelatedness · Consistent
Communication · Humility + Dignity · Training + Reflection (the site renders the last as the
typo "Reflextion"). A fourth initiative, **Good Neighbors**, provides campus gym space to
community organizations.
→ https://www.charlottelatin.org/leading-programs/student-leadership-development/service

### Additional verified scale figures

- **3,396 community service hours** by the Class of 2023 by the end of junior year —
  https://www.charlottelatin.org/uploaded/Veracross/Upper_School_Profile_for_Admissions.pdf
- **5,485 hours** by the Class of 2018 by the end of junior year, with **five** class members
  qualifying for the Service Society; **seven** students earned a **Presidential Volunteer
  Service Award** in 2016-17 (requires 100+ hours in a calendar year) —
  https://www.charlottelatin.org/uploaded/COMPOSER/AcademicsTab/USprofile1718.pdf
- The **Upper School Service Council** organizes "numerous service-related activities…
  available to students each and every week"; the 150-hour Service Society recognition is
  conferred at the end of senior year —
  https://www.charlottelatin.org/student-life/student-clubs/clubs

### "Individual activity, not a club" — VERIFIED

From the clubs page's **"SPECIAL NOTES"** section, listed *separately from* the club roster:

- **Blessings in a Backpack** — "meets every Wednesday during the year to pack non-perishable
  foods… distributed to students who receive free lunch and breakfast at their school but may
  not have access to food over the weekend" — a standing activity, not an enumerated club.
- **StuCo / Student Council** — elected officers and delegates, not open-enrollment.
- **CLS Service Council**-organized weekly activities — individual service activity rather
  than club membership.

→ https://www.charlottelatin.org/student-life/student-clubs/clubs

---

## 1c. Honor Societies

### The roster — VERIFIED (three, and only one is a conventional academic society)

| Society | Division | What it recognizes | Feeds from |
|---|---|---|---|
| **Cum Laude Society — Edward J. Fox Chapter** | Upper School | Top academic achievement; honors "the ideals exemplified by the Greek words Areté (excellence), Diké (justice), and Timé (honor)" | The classroom |
| **Latin Service Society** | Upper School | Significant contribution to the community through service; 150 hours | Service |
| **International Thespian Society** | Upper School | "To honor excellence in high school theater; a part of the Educational Theatre Association" (listed as a *club*) | The Arts — theatre |

### Cum Laude detail — unusually well documented for this set

- Society founded **1906**; Latin's chapter chartered **1976**, when the school was six years
  old — "making Latin the youngest school ever so recognized."
- **Annual induction count IS published: 28 new members** (14 from the Class of '25 and 14
  from the Class of '24). Head of School Chuck Baldecchi: "It's a tribute to the school's
  long-standing regard for academic excellence."
- → https://www.charlottelatin.org/about/school-news/news-details/~board/news/post/charlotte-latin-students-inducted-into-cum-laude-society
- **Induction criteria ARE published** — in the Family Handbook rather than on the news page:
  "Induction into the Cum Laude Society is the highest academic honor a student can receive
  at Charlotte Latin School… **Seniors in the top 20% of their class and juniors in the top
  10%** of their class who have completed at least two full semesters at the School are
  eligible for induction," with additional requirements for "intellectual curiosity and
  character," and "As mandated by the national organization, no one with an honor violation
  record may be admitted into the society."
  → https://www.charlottelatin.org/uploaded/COMPOSER/PortalUploads/All_School/CLSfamilyhandbook1819.pdf

This makes Charlotte Latin the **only school in the comparison set that publishes both
induction criteria and an induction count** — so its 1c card carries no gap flag on those
two points.

### Related non-society academic honors — VERIFIED (label accordingly)

**Headmaster's List** (GPA 3.50+, no grade below C−) and **Junior Marshals** (juniors in the
top 10% by cumulative average through the first semester of junior year, who assist at
Commencement).
→ https://www.charlottelatin.org/uploaded/COMPOSER/PortalUploads/All_School/CLSfamilyhandbook1819.pdf

### NOT FOUND — explicitly searched

The live club roster, the DEI page, the Student Leadership page, the 2025 Honors and Awards
Ceremony article, the Family Handbook PDF, and three Upper School Profile PDFs were all
checked. **No published evidence of:** National Honor Society, National Junior Honor
Society, National Art Honor Society, Tri-M Music Honor Society, Quill & Scroll, Rho Kappa,
Mu Alpha Theta, Science National Honor Society, National Latin Honor Society, or any
French/Spanish/Chinese world-language honor society. A keyword scan of the Family Handbook
returned **zero hits** for every one of those names.

Two nuances that explain the absence:

- **Subject-area and world-language recognition at Latin is delivered as named prizes, not
  honor societies** — the Victor Hugo Award (French), Homer Award (Greek), Petrarch Award
  (Latin), Cervantes Award (Spanish), Bausch + Lomb Honorary Science Award, and Rensselaer
  Medal. The 2025 Honors and Awards Ceremony article is exhaustive and names **no honor
  society at all**, which is strong negative evidence. →
  https://www.charlottelatin.org/about/school-news/news-details/~board/news/post/2025-honors-and-awards-ceremony
- **The closest classics analogue is a club, not a society:** the **National Junior Classical
  League** — "To encourage an interest in and an appreciation of the language, literature,
  and culture of ancient Greece and Rome…" →
  https://www.charlottelatin.org/student-life/student-clubs/clubs

### Gaps — 1c

- **No Middle School honor society** is published. The Middle School club model is
  rotational rather than honorary: "Middle School students choose a club from more than 25
  offerings. Students meet with their clubs once a week for a period of 8-10 weeks, and then
  try a different club." **No Middle School clubs are individually named** on the site beyond
  examples (Cooking Club, Just Dance Club, Robotics Club, Student Council, Sports Club).
- Apart from the single Cum Laude induction article, **no chapter activity** is published for
  any society.

---

## URL notes for future ingests

- Working club roster (full Upper School enumeration, ~29 clubs):
  **https://www.charlottelatin.org/student-life/student-clubs/clubs** — the parent page
  `/student-life/student-clubs` is only a landing page with no names.
- Working service page:
  **https://www.charlottelatin.org/leading-programs/student-leadership-development/service**
  (`/programs/service` returns 404).
- The site is Finalsite with no `sitemap.xml` and JS-driven search, so scraping page HTML
  directly is the reliable route rather than fetching guessed slugs.
