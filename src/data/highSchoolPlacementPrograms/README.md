# `highSchoolPlacementPrograms/`

One `<slug>.ts` per school with High School Placement research, each exporting a
`HighSchoolPlacementProgram` — the same arrangement as `collegeSupportPrograms/`,
so each school's research stays reviewable on its own.

**Trinity Episcopal School is the first occupant** (`.claude/plans/add-trinity-episcopal.md`),
added 2026-09-16. The shape itself shipped with no occupant in
`.claude/plans/prek8shape.md`. Charlotte Preparatory School was assessed for this area
first and **abandoned** after review (`.claude/plans/charlotteprep.md`).

**One thing to know before adding the second school.** `PlacementClass` requires
`acceptedPct` and `acceptedCount`, and `HighSchoolPlacement.tsx` renders them under a
chrome header reading "Accepted to a top-two choice". That shape was designed around a
school that publishes an acceptance rate. Trinity does not publish one — so it ships
`classes: []` and carries its per-class series (graduates, "lifers", distinct high
schools) in `stats` and `destinations` instead. A school with matriculation data rather
than acceptance data has the same problem; extending `PlacementClass` would need UX
approval, since it touches a shared component and ten locale catalogs.

Adding a school takes two edits: the file here, and an import plus a `PROGRAMS`
entry in [`../highSchoolPlacement.ts`](../highSchoolPlacement.ts). The area then
renders for that school only if `source-material/high-school-placement/<slug>/`
also exists — the card data and the research manifest are separate gates, and
`topicsForSchool()` reads the manifest one.
