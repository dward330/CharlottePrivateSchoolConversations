# HBCUs — Membership and Count 2026

Cross-school reference. This file backs the **denominator 107** used in the new "HBCUs"
row of the Selectivity buckets table on every school's College Support page, and the
`hbcu` category applied to individual acceptances in the "Every acceptance" list.

It is filed under `_shared/` rather than a school folder because neither the denominator
nor the canonical membership list is a school-specific research finding — it is the same
fixed set for all six schools. This mirrors
`Power Four - Conference Membership 2026.md` in the same folder.

## Provenance

- **Who:** Researched by Claude (Opus 4.8) on behalf of the project owner.
- **When:** 2026-08-02.
- **How:** Live web check of the count of federally-designated HBCUs and the HBCU status
  of every candidate institution that appears on at least one of the six schools'
  acceptance lists. The candidate set was extracted from
  `src/data/collegeSupportPrograms/*.ts` and each name was confirmed against a published
  HBCU roster.
- **Method note:** This is a **membership census, not a derived count.** The HBCU
  designation is a fixed federal list, so both the denominator (107) and each school's
  numerator (an exact intersection of that school's acceptance list with the roster) are
  exact, not approximate — unlike the Top-75 buckets, which are scored against U.S. News
  rank tables around a tie boundary.

## The denominator: 107

- **107** is the count the U.S. Department of Education has given the HBCU designation,
  per the White House Initiative on HBCUs framing. This is the denominator the project
  owner chose for the bucket row (over the narrower NCES count of ~99, which reflects a
  different classification methodology).
- Recorded so a later pass does not "correct" 107 to 99: the two counts measure different
  things. 107 = DoE-designated institutions; ~99 = NCES-classified. The app uses the
  DoE designation deliberately.

## Source URLs

- https://hbculifestyle.com/hbcu-colleges-list/ — "Complete HBCU Colleges List 2026: All
  107 Schools by State"; states the 107 DoE-designated count and enumerates the roster.
- https://en.wikipedia.org/wiki/Lincoln_University_(Pennsylvania) — Lincoln (PA), HBCU.
- https://www.britannica.com/topic/Lincoln-University-Jefferson-City-Missouri — Lincoln
  (MO), also an HBCU (relevant to the Providence Day disambiguation below).

## The canonical membership used for tagging

Every institution below appears on at least one of the six schools' acceptance lists and
is a confirmed HBCU. An acceptance is tagged `hbcu` (and counted toward that school's
`n / 107`) **iff** its college name exactly matches one of these:

| Institution | Notes |
|---|---|
| Howard University | |
| Spelman College | Also `lac75` (Top-75 liberal arts) — HBCU tag is additive |
| Morehouse College | |
| Hampton University | |
| Xavier University of Louisiana | |
| Florida A&M University | |
| North Carolina A&T State University | |
| North Carolina Central University | |
| Winston-Salem State University | |
| Fayetteville State University | |
| Elizabeth City State University | |
| Johnson C. Smith University | Providence Day spells it `Johnson C Smith University` (no period) — both are the same HBCU |
| Livingstone College | |
| Morgan State University | |
| Delaware State University | |
| Albany State University | |
| Clark Atlanta University | |
| Tennessee State University | |
| Virginia State University | |
| South Carolina State University | |
| Alabama A&M University | |
| Fisk University | |
| Lincoln University | Providence Day lists a bare "Lincoln University". Both Lincoln (PA) and Lincoln (MO) are HBCUs, so this counts as an HBCU regardless of which campus is meant |

### Roster additions, 2026-08-25

Added when `src/data/collegeMemberships.ts` was created and first checked against the
data. **These were already tagged `hbcu` in the school files and were correct** — the
roster above enumerated only the institutions the acceptance lists named *as of
2026-08-02*, and the lists have grown since (Hickory Grove and Gaston Day were added
later). The check reported them as "over-inclusions"; the tags were right and this table
was incomplete.

| Institution | Notes |
|---|---|
| Norfolk State University | Norfolk, VA |
| Benedict College | Columbia, SC |
| Claflin University | Orangeburg, SC — Hickory Grove's list spells it `Clafin University` |
| Clinton College | Rock Hill, SC |
| Voorhees University | Denmark, SC |
| Saint Augustine's University | Raleigh, NC |
| Tougaloo College | Tougaloo, MS — also carries `Liberal Rank #180`, outside the top 75 |

- **Who:** Claude (Opus 5), on behalf of the project owner.
- **When:** 2026-08-25.
- **How:** Each name was already carried as `hbcu` in one or more committed acceptance
  lists; membership was confirmed against the DoE-designated roster cited above. No new
  denominator was derived — 107 is unchanged.

**The lesson, recorded because it nearly went the other way:** a membership check that
reports a violation is asking a question, not delivering a verdict. Confirm which side is
wrong before editing either. Removing these seven tags would have been a silent
data-quality regression that every check would then have reported as clean.

### Roster additions, 2026-10-25

Added for Cannon School's 2026–27 School Profile acceptance list (plan `cannonprofile`),
the first list to name either institution. Both confirmed on 2026-10-25 against the
DoE-designated roster at https://hbculifestyle.com/hbcu-colleges-list/, which lists
"Southern University and A&M College / Public, 4 Year / Baton Rouge, LA" and "West
Virginia State University / Public, 4 Year / Institute, WV". 107 is unchanged.

| Institution | Notes |
|---|---|
| Southern University and A&M College | Baton Rouge, LA — the Southern University System flagship. Not to be confused with Georgia Southern or Charleston Southern (below) |
| West Virginia State University | Institute, WV |

### Roster additions, 2026-11-04

Added for Hickory Grove Christian's 2026–27 High School Profile list (plan `hgprofile`),
the first list to name it. Confirmed on 2026-11-04 against the DoE-designated roster at
https://hbculifestyle.com/hbcu-colleges-list/, which lists "Tuskegee University / Private,
4 Year / Tuskegee, AL". 107 is unchanged.

| Institution | Notes |
|---|---|
| Tuskegee University | Tuskegee, AL — added 2026-11-04 (hgprofile) |

### Explicitly NOT HBCUs (guard against substring false-positives)

These appear on the lists and superficially resemble an HBCU name but are **not**
designated HBCUs. Do not tag them:

- **East Tennessee State University**, **Middle Tennessee State University** — substring
  of "Tennessee State University" (which *is* an HBCU), but these two are not.
- **Georgia Southern University**, **Charleston Southern University** — "Southern" is not
  the HBCU "Southern University"; neither is an HBCU.

## Per-school counts (as of 2026-08-02)

Exact intersection of each school's `colleges` array with the roster above, counted by
full-name match (not substring):

| School | HBCUs on list | Denominator |
|---|---|---|
| Charlotte Country Day | 18 | 107 |
| Providence Day | 14 | 107 |
| Charlotte Christian | 10 | 107 |
| Charlotte Latin | 6 | 107 |
| Cannon | 5 | 107 |
| Davidson Day | 3 | 107 |

These are the numerators written into each school's `buckets` HBCU row. Re-derive them
from the data at implementation time rather than trusting this table — the acceptance
lists may have grown since this file was written.

## Method

### Re-verification 2026-11-22 (plan consistency5, self-scan)

- https://www.law.cornell.edu/cfr/text/34/608.2 (HTTP 200), the federal list of historically
  Black colleges and universities, names "University of the District of Columbia" and
  "University of Maryland-Eastern Shore—Princess Anne".
- https://www.udc.edu/ (HTTP 200), page title: "University of the District of Columbia,
  Washington, DC - HBCU, Land-Grant University".
- https://www.umes.edu/about/ (HTTP 200): "our heritage as a historically black, public
  research institution".
- Neither is in the membership roster. Providence Day's list has the first and Country Day's
  has the second, both untagged.

### The 107-school roster, saved 2026-11-22 (plan consistency5, 7b)

From https://hbculifestyle.com/hbcu-colleges-list/ (HTTP 200, fetched 2026-11-22), the denominator
source above, names as that page prints them. The page has 114 rows. Seven are schools or campuses
of institutions it also lists and are folded into them: the Howard medical and law schools, the
UDC, Florida A&M, NC Central and Texas Southern law schools, and the second Virgin Islands campus.

`scripts/check_memberships.mjs` reads this table. An accepted college that matches a name in the
first or last column and is absent from `HBCUS` fails the build. The last column holds current or
alternate names, added by hand and separated by semicolons. Never swap College and University
wholesale: Shorter University and Simmons University are not HBCUs.

<!-- roster:start -->

| Institution | Type | Location | Also matched as |
|---|---|---|---|
| Alabama A&M University | Public, 4 Year | Normal, AL | Alabama Agricultural and Mechanical University |
| Alabama State University | Public, 4 Year | Montgomery, AL |  |
| Bishop State Community College | Public, 2 Year | Mobile, AL |  |
| Concordia College (Alabama) | Private, 4 Year | Selma, AL | Concordia College Alabama |
| Gadsden State Community College | Public, 2 Year | Gadsden, AL |  |
| Lawson State Community College | Public, 2 Year | Birmingham, AL |  |
| Miles College | Private, 4 Year | Fairfield, AL |  |
| Oakwood University | Private, 4 Year | Huntsville, AL |  |
| Selma University | Private, 4 Year | Selma, AL |  |
| Shelton State Community College | Public, 2 Year | Tuscaloosa, AL |  |
| Stillman College | Private, 4 Year | Tuscaloosa, AL |  |
| Talladega College | Private, 4 Year | Talladega, AL | Talladega University |
| Tuskegee University | Private, 4 Year | Tuskegee, AL |  |
| J.F. Drake State Community and Technical College | Public, 2 Year | Huntsville, AL |  |
| University of Arkansas at Pine Bluff | Public, 4 Year | Pine Bluff, AR |  |
| Arkansas Baptist College | Private, 4 Year | Little Rock, AR |  |
| Philander Smith College | Private, 4 Year | Little Rock, AR |  |
| Shorter College | Private, 2 Year | Little Rock, AR |  |
| Charles R. Drew University of Medicine and Science | Private, 4 Year | Los Angeles, CA |  |
| Delaware State University | Public, 4 Year | Dover, DE |  |
| Howard University | Private, 4 Year | Washington, D.C. |  |
| University of the District of Columbia (UDC) | Public, 4 Year | Washington, D.C. | University of the District of Columbia |
| Bethune-Cookman University | Private, 4 Year | Daytona Beach, FL |  |
| Edward Waters College | Private, 4 Year | Jacksonville, FL | Edward Waters University |
| Florida A&M University | Public, 4 Year | Tallahassee, FL | Florida Agricultural and Mechanical University |
| Florida Memorial University | Private, 4 Year | Miami Gardens, FL |  |
| Albany State University | Public, 4 Year | Albany, GA |  |
| Fort Valley State University | Public, 4 Year | Fort Valley, GA |  |
| Savannah State University | Public, 4 Year | Savannah, GA |  |
| Clark Atlanta University | Private, 4 Year | Atlanta, GA |  |
| Interdenominational Theological Center | Private, 4 Year | Atlanta, GA |  |
| Morehouse College | Private, 4 Year | Atlanta, GA |  |
| Morehouse School of Medicine | Private, 4 Year | Atlanta, GA |  |
| Morris Brown College | Private, 4 Year | Atlanta, GA |  |
| Paine College | Private, 4 Year | Augusta, GA |  |
| Spelman College | Private, 4 Year | Atlanta, GA |  |
| Kentucky State University | Public, 4 Year | Frankfort, KY |  |
| Simmons College | Private, 4 Year | Louisville, KY | Simmons College of Kentucky |
| Grambling State University | Public, 4 Year | Grambling, LA |  |
| Southern University and A&M College | Public, 4 Year | Baton Rouge, LA | Southern University |
| Southern University Law Center | Public, 4 Year | Baton Rouge, LA |  |
| Southern University at New Orleans | Public, 4 Year | New Orleans, LA |  |
| Southern University at Shreveport | Public, 2 Year | Shreveport, LA |  |
| Dillard University | Private, 4 Year | New Orleans, LA |  |
| Xavier University of Louisiana | Private, 4 Year | New Orleans, LA |  |
| Bowie State University | Public, 4 Year | Bowie, MD |  |
| Coppin State University | Public, 4 Year | Baltimore, MD |  |
| Morgan State University | Public, 4 Year | Baltimore, MD |  |
| University of Maryland Eastern Shore | Public, 4 Year | Princess Anne, MD |  |
| Alcorn State University | Public, 4 Year | Lorman, MS |  |
| Jackson State University | Public, 4 Year | Jackson, MS |  |
| Mississippi Valley State University | Public, 4 Year | Itta Bena, MS |  |
| Coahoma Community College | Public, 2 Year | Clarksdale, MS |  |
| Hinds Community College-Utica | Public, 2 Year | Utica, MS | Hinds Community College at Utica |
| Rust College | Private, 4 Year | Holly Springs, MS |  |
| Tougaloo College | Private, 4 Year | Tougaloo, MS |  |
| Harris-Stowe State University | Public, 4 Year | St. Louis, MO |  |
| Lincoln University of Missouri | Public, 4 Year | Jefferson City, MO | Lincoln University (MO) |
| Elizabeth City State University | Public, 4 Year | Elizabeth City, NC |  |
| Fayetteville State University | Public, 4 Year | Fayetteville, NC |  |
| North Carolina A&T State University | Public, 4 Year | Greensboro, NC | North Carolina Agricultural and Technical State University |
| North Carolina Central University | Public, 4 Year | Durham, NC |  |
| Winston-Salem State University | Public, 4 Year | Winston-Salem, NC |  |
| Barber-Scotia College | Private, 4 Year | Concord, NC |  |
| Bennett College | Private, 4 Year | Greensboro, NC |  |
| Johnson C. Smith University | Private, 4 Year | Charlotte, NC |  |
| Livingstone College | Private, 4 Year | Salisbury, NC |  |
| St. Augustine’s College | Private, 4 Year | Raleigh, NC | Saint Augustine’s University |
| Shaw University | Private, 4 Year | Raleigh, NC |  |
| Central State University | Public, 4 Year | Wilberforce, OH |  |
| Payne Theological Seminary | Private, 4 Year | Wilberforce, OH |  |
| Wilberforce University | Private, 4 Year | Wilberforce, OH |  |
| Langston University | Public, 4 Year | Langston, OK |  |
| Cheyney University of Pennsylvania | Public, 4 Year | Cheyney, PA | Cheyney University |
| Lincoln University | Public, 4 Year | Lincoln University, PA | Lincoln University of Pennsylvania; Lincoln University (PA) |
| South Carolina State University | Public, 4 Year | Orangeburg, SC |  |
| Denmark Technical College | Public, 2 Year | Denmark, SC |  |
| Allen University | Private, 4 Year | Columbia, SC |  |
| Benedict College | Private, 4 Year | Columbia, SC |  |
| Claflin University | Private, 4 Year | Orangeburg, SC |  |
| Morris College | Private, 4 Year | Sumter, SC |  |
| Voorhees College | Private, 4 Year | Denmark, SC | Voorhees University |
| Clinton Junior College | Private, 2 Year | Rock Hill, SC | Clinton College |
| Tennessee State University | Public, 4 Year | Nashville, TN |  |
| American Baptist College | Private, 4 Year | Nashville, TN |  |
| Fisk University | Private, 4 Year | Nashville, TN |  |
| Knoxville College | Private, 4 Year | Knoxville, TN |  |
| Lane College | Private, 4 Year | Jackson, TN |  |
| LeMoyne-Owen College | Private, 4 Year | Memphis, TN |  |
| Meharry Medical College | Private, 4 Year | Nashville, TN |  |
| Prairie View A&M University | Public, 4 Year | Prairie View, TX | Prairie View A and M University |
| Texas Southern University | Public, 4 Year | Houston, TX |  |
| St. Philip’s College | Public, 2 Year | San Antonio, TX |  |
| Huston-Tillotson University | Private, 4 Year | Austin, TX |  |
| Jarvis Christian College | Private, 4 Year | Hawkins, TX | Jarvis Christian University |
| Paul Quinn College | Private, 4 Year | Dallas, TX |  |
| Southwestern Christian College | Private, 4 Year | Terrell, TX |  |
| Texas College | Private, 4 Year | Tyler, TX |  |
| Wiley College | Private, 4 Year | Marshall, TX | Wiley University |
| Norfolk State University | Public, 4 Year | Norfolk, VA |  |
| Virginia State University | Public, 4 Year | Petersburg, VA |  |
| Hampton University | Private, 4 Year | Hampton, VA |  |
| Virginia Union University | Private, 4 Year | Richmond, VA |  |
| Virginia University of Lynchburg | Private, 4 Year | Lynchburg, VA |  |
| Bluefield State College | Public, 4 Year | Bluefield, WV | Bluefield State University |
| West Virginia State University | Public, 4 Year | Institute, WV |  |
| University of the Virgin Islands (St. Thomas Campus) | Public, 4 Year | St. Thomas, V.I. | University of the Virgin Islands |

<!-- roster:end -->
