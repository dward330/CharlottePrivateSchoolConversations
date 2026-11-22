# Gaston Day School — After School (Program, Hours and Rates 2026)

**Provenance**

- **Compiled by:** Claude Code deep research pass (`/implement add-gaston-day`).
- **Date compiled:** 2026-08-18
- **Method:** The school's After School Program page fetched directly and transcribed. Rates
  cross-checked against the official **Schedule of Tuition and Fees 2025-2026** PDF
  (`pdftotext -layout`) — **the two sources disagree**, and the conflict is recorded in full
  below rather than silently resolved.
- **School:** Gaston Day School, Gastonia, NC.

## Source URLs

| Ref | URL | What it covers |
| --- | --- | --- |
| S1 | https://www.gastonday.org/afterschoolprogram/ | After School Program page — **3:15–5:30 PM**, PK-8 in two tiers, the daily activity schedule, homework and snack windows, late-pickup penalty, registration via the **Popsicle** app, staff contacts |
| S2 | https://www.gastonday.org/wp-content/uploads/2025/01/SCHEDULE-OF-TUITION-FEES-2025-2026.pdf | **Schedule of Tuition and Fees 2025-2026** — Lower School care **3:00 until 6:00** at **$95/week $30/day**; Middle School care **4:00 until 6:00** at **$55/week $15/day**; **Extended Day Drop-In Fee $25**; Music Lessons **$35**/lesson |

## The hours-and-rate conflict (recorded, not resolved by guesswork)

| | Web page (S1) | Tuition schedule (S2) |
| --- | --- | --- |
| Lower School window | 3:15 PM – 5:30 PM | **3:00 until 6:00** |
| Middle School window | 3:15 PM – 5:30 PM | **4:00 until 6:00** |
| Lower School recurring rate | **$100/month** | **$95/week** |
| Middle School recurring rate | **$60/month** | **$55/week** |
| Lower School drop-in | **$30/day** | **$30/day** ✅ |
| Middle School drop-in | **$15/day** | **$15/day** ✅ |

**What is certain:** the **drop-in rates agree exactly** across both sources — $30/day
Lower School, $15/day Middle School.

**What conflicts:** the recurring rate's *period label* and the operating window.
The page's "**/month**" is very unlikely to be literal: $100/month for daily aftercare
would price a full month below four days of the same source's own $30/day drop-in rate, and
below the tuition schedule's $95/week. The most economical reading is that the page's
"/month" is a label error for the schedule's weekly rate (the dollar amounts differ only by
$5, consistent with a small year-over-year change rather than a period change).

**How the app resolves it:** the **official tuition schedule (S2)** is treated as the rate
authority — it is the signed fee document families are billed against. The **web page (S1)**
is treated as the current operating window, since an in-year hours change is the more likely
of the two to be reflected on a page and not in a fee PDF. Both are surfaced, and the
figures used in the app are copied char-for-char from S2.

**Superseded by the 2026-27 schedule: the latest pickup used in the app is 5:30 PM**, at $100
a week for Lower School and $60 for Middle School. The conflict above is against the 2025-26 schedule only.

## Programme detail (S1)

**Grades served:** Pre-K through 8th grade, in two tiers — **Lower School (PS–4th)** and
**Middle School (5th–8th)**.

**Daily schedule:**

| Window | Activity |
| --- | --- |
| 3:15–4:00 PM | "Relax/Choice Time" — playground, games, socialising |
| 4:00–4:25 PM | **Snack and homework**, separated by grade level |
| 4:25–4:55 PM | Whole-group activities emphasising **STEAM and collaboration** |
| 4:55–5:30 PM | Choice time (tech activities **Fridays only**) |

**Homework support.** A dedicated homework window at 4:00–4:25 PM. Middle School students
waiting for music lessons may "work on homework at no charge."

**Snack.** Distributed around 4:15 PM; students may bring additional snacks.

**Pickup and late policy.** Pickup from the front carpool line. Late pickup is **$10 for the
first 5 minutes, then $5 per additional 5-minute increment.**

**Registration and staff.** Register via the **Popsicle** app. Contacts: **Letty Jimenez**
(980.502.5817, Ljimenez@gastonday.org) and **Julie Dellibovi** (jdellibovi@gastonday.org). Registration is free and stated as taking under five
minutes.

**Enrichment.** Enrichment programmes are listed as "coming soon" on the page at the time of
this pass.

## Related rates (S2)

- **Extended Day Drop-In Fee: $25**
- **Music Lessons: $35 per lesson** — Middle School students awaiting a music lesson may do
  homework in aftercare at no charge (S1), so the two programmes interlock.
- **Bus service** (not aftercare, but the same fee schedule): Round Trip **$2,500**, One Way
  **$1,630**, Per Trip **$18**.

## Not published

Staff-to-child ratios, capacity or enrolment caps, whether care runs on early-dismissal or
teacher-workday dates, and summer-vs-term-time distinctions. Recorded as absences. (Summer
wrap-around care **is** published separately and is documented in the summer-programs file.)

## Method

### Re-verification 2026-11-22 (plan consistency4, self-scan)

Fetched 2026-11-22 (curl, HTTP 200).

- https://www.gastonday.org/wp-content/uploads/2026/01/2627-GDS-Tuition-and-Fees.pdf (the 2026-2027 schedule):
  "Lower School After School Care Fee – 3:00 until 5:30 $100 per week/$30 per day";
  "Middle School After School Care Fee – 3:15 until 5:30 $60 per week/$15 per day".
  Also "PLANNED ENRICHMENT PROGRAM: We anticipate offering varying After School Enrichment Programs in Dance,
  Art/Painting, Cheer, Running (Speedy Spartans), Sports (Volleyball/Basketball) Science & Nature."
- https://www.gastonday.org/afterschoolprogram/ now reads "The weekly fee is $100 and you will be billed monthly by
  the Finance Office." (Lower) and "The weekly fee is $60 and you will be billed monthly by the Finance Office."
  (Middle). Both say "Students must be picked up no later than 5:30pm". Also "There is no charge to sign your child
  up and registration only takes 5 minutes or less." and "Students who are waiting on music lessons or afternoon
  practice may work on homework at no charge."
- So the period and hours conflicts recorded above hold only against the 2025-26 schedule. The page and the 2026-27
  schedule agree on $100 / $60 a week and 5:30.

### Re-verification 2026-11-22 (plan consistency4, implement)

Opened 2026-11-22 (curl, HTTP 200).

- https://www.gastonday.org/wp-content/uploads/2026/01/2627-GDS-Tuition-and-Fees.pdf and
  https://www.gastonday.org/afterschoolprogram/ both give $100 and $60 a week and a 5:30 close. The page bills
  monthly, and the registration links go to popsicle.app.
- Derived: 36 assumed weeks x $100 = $3,600 (Lower School) and 36 x $60 = $2,160 (Middle School).

### Re-verification 2026-11-22 (plan consistency4, implement): staff contacts

- https://www.gastonday.org/afterschoolprogram/ (HTTP 200) lists Letty Jimenez (980.502.5817,
  Ljimenez@gastonday.org) and says "Please contact Julie Dellibovi jdellibovi@gastonday.org if you have
  any questions or concerns."
- The second contact this record carried before is no longer on the page, so the card follows the page.
