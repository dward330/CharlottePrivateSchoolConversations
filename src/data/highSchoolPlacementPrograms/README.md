# `highSchoolPlacementPrograms/`

One `<slug>.ts` per school with High School Placement research, each exporting a
`HighSchoolPlacementProgram` — the same arrangement as `collegeSupportPrograms/`,
so each school's research stays reviewable on its own.

**Empty by design.** The PreK–8 shape ships with no occupant (`.claude/plans/prek8shape.md`);
Charlotte Preparatory School is the first and arrives with its own research in
`.claude/plans/charlotteprep.md`.

Adding a school takes two edits: the file here, and an import plus a `PROGRAMS`
entry in [`../highSchoolPlacement.ts`](../highSchoolPlacement.ts). The area then
renders for that school only if `source-material/high-school-placement/<slug>/`
also exists — the card data and the research manifest are separate gates, and
`topicsForSchool()` reads the manifest one.
