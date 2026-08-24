# unitrevert — the Spanish conversion worklist

Generated 2026-08-24 during Phase 1 by scanning `src/data/overlays/work/*.es.json`.

**26 entries carry a converted unit, not the 17 the plan estimated.** The plan's scan
pattern looked only for `m²` and metre heights; it missed three whole unit families —
pounds→kilograms (wrestling weight classes, dumbbell loads), acres→hectares (campus size)
and inches→centimetres (a stage height). All 26 are listed below.

Entries are keyed on `of` — the **content hash** of the English source — not on the array
index, because indices shift if a work file is re-extracted. `worklist.json` beside this
file carries the same data machine-readably.

| # | File | idx | `of` | Family | Restore to |
|---|---|---|---|---|---|
| 1 | sports | 121 | `34968366` | sq ft → m² | `53,000 sq ft` |
| 2 | sports | 124 | `d0ad00fe` | lb → kg | `100 lb` |
| 3 | sports | 168 | `1f45f1cd` | acre → ha | `128-acre` |
| 4 | sports | 194 | `b61847b9` | lb → kg | `150 lbs` |
| 5 | sports | 259 | `dbdee1ff` | acre → ha | `128-acre` |
| 6 | sports | 264 | `9cb5df4b` | sq ft → m² | `50,000 sq ft` |
| 7 | sports | 295 | `d9dff81b` | lb → kg | `175 lbs` |
| 8 | sports | 304 | `d52dceaf` | lb → kg | `175 lb` |
| 9 | sports | 329 | `e92a3e75` | lb → kg | `175 lb` |
| 10 | sports | 364 | `d631c24a` | sq ft → m² | `53,000 sq ft` |
| 11 | sports | 370 | `47e9e66a` | sq ft → m² | `5,400 sq ft` |
| 12 | sports | 372 | `e4e6ada6` | sq ft → m² | `53,000+ sq ft` |
| 13 | sports | 374 | `7a03bb91` | sq ft → m² | `7,800 sq ft` |
| 14 | sports | 584 | `0947d8c2` | sq ft → m² | `~30,000 sq ft` |
| 15 | sports | 586 | `da6c6eac` | sq ft → m² | `~47,000 sq ft` |
| 16 | sports | 602 | `06f84f5e` | sq ft → m² | `77,737 sq ft` |
| 17 | sports | 628 | `062ebfef` | ft/in → m | `28, 6'3"` |
| 18 | sports | 680 | `d4dd40af` | sq ft → m² | `4,100 sq ft` |
| 19 | sports | 682 | `193e212d` | sq ft → m² | `4,800 sq ft` |
| 20 | sports | 684 | `18736cb9` | sq ft → m² | `5,000 sq ft` |
| 21 | sports | 787 | `1c0730ce` | acre → ha | `15-acre` |
| 22 | sports | 815 | `6a411866` | ft/in → m | `6-foot-10` |
| 23 | the-arts | 226 | `3760bdf2` | sq ft → m² | `20,500–20,800 sq ft` |
| 24 | the-arts | 425 | `28e468bb` | sq ft → m² | `45,730 sq ft` |
| 25 | the-arts | 507 | `de464367` | sq ft → m² | `45,730 sq ft` |
| 26 | the-arts | 554 | `647afe65` | inch → cm | `42 inches` |

## Full text, entry by entry

Each block gives the English source and the current Spanish. Phase 2 replaces **only the
converted figure**, copying the English figure char-for-char, and leaves the surrounding
Spanish prose intact.

### 1. sports.es.json `[121]` — `of: 34968366`

`at`: `providence-day:facilities.photos[1].meta`

```
EN: 53,000 sq ft, 2001
ES: 4.924 m², 2001
```

### 2. sports.es.json `[124]` — `of: d0ad00fe`

`at`: `providence-day:facilities.photos[2].caption`

```
EN: 10 custom power racks, 6 digital rowers, dumbbells to 100 lb
ES: 10 jaulas de potencia a medida, 6 remos digitales, mancuernas hasta 45 kg
```

### 3. sports.es.json `[168]` — `of: 1f45f1cd`

`at`: `charlotte-latin:offered.headline`

```
EN: 66 teams across 17 sports on a 128-acre campus, with about 90% of students in grades 7–12 playing something.
ES: 66 equipos en 17 deportes sobre un campus de 52 hectáreas, con cerca del 90% del alumnado de los grados 7–12 practicando algún deporte.
```

### 4. sports.es.json `[194]` — `of: b61847b9`

`at`: `charlotte-latin:pipeline.rankedRecruits`

```
EN: Wrestling supplies the genuine national credential: Spear Gorelick ’26 was a 2025 National Prep All-American and was pre-seeded No. 6 nationally at 150 lbs for the 2026 National Prep Championships, reaching 100 career wins before signing with Davidson. Freshman Jack Gilson also reached the national bracket at 138 lbs. In golf, Griffin Cheatwood was NCISAA medalist and Charlotte Observer Golfer of the Year; Aston Lee was CISAA Golfer of the Year. No Latin athlete currently appears in a 247Sports/On3/Rivals national top-100 for football or basketball.
ES: La lucha aporta la credencial nacional genuina: Spear Gorelick ’26 fue All-American en el National Prep de 2025 y partía como 6.º cabeza de serie nacional en 68 kg para el National Prep Championships de 2026, alcanzando las 100 victorias en su carrera antes de firmar por Davidson. El estudiante de primer año Jack Gilson también llegó al cuadro nacional en 63 kg. En golf, Griffin Cheatwood fue medallista de la NCISAA y Golfista del Año del Charlotte Observer; Aston Lee fue Golfista del Año de la CISAA. Ningún deportista de Latin figura actualmente en un top-100 nacional de 247Sports/On3/Rivals en fútbol americano o baloncesto.
```

### 5. sports.es.json `[259]` — `of: dbdee1ff`

`at`: `charlotte-latin:facilities.headline`

```
EN: A 128-acre campus — the largest of any Charlotte-area independent school — with three gymnasiums, nine tennis courts and seven playing fields.
ES: Un campus de 52 hectáreas — el mayor de cualquier colegio independiente del área de Charlotte — con tres gimnasios, nueve pistas de tenis y siete campos de juego.
```

### 6. sports.es.json `[264]` — `of: 9cb5df4b`

`at`: `charlotte-latin:facilities.photos[1].meta`

```
EN: 50,000 sq ft, 2001
ES: 4.645 m², 2001
```

### 7. sports.es.json `[295]` — `of: d9dff81b`

`at`: `charlotte-christian:record.rows[4].note`

```
EN: Best finish in program history; Max McNeer won at 175 lbs
ES: Mejor clasificación de la historia del programa; Max McNeer ganó en 79 kg
```

### 8. sports.es.json `[304]` — `of: d52dceaf`

`at`: `charlotte-christian:record.seasonDetail[2].text`

```
EN: 2026 produced the best team finish in program history — runner-up with 199.5 points — with Max McNeer winning the 175 lb state title and three more Knights placing.
ES: 2026 produjo la mejor clasificación por equipos de la historia del programa — subcampeón con 199.5 puntos — con Max McNeer ganando el título estatal de 79 kg y otros tres Knights clasificándose.
```

### 9. sports.es.json `[329]` — `of: e92a3e75`

`at`: `charlotte-christian:honors.honors[3].text`

```
EN: Ten Knights earned NCISAA all-state honors across baseball (four), boys and girls lacrosse, girls soccer, softball and boys tennis. Max McNeer won the 175 lb state wrestling title.
ES: Diez Knights obtuvieron honores All-State de la NCISAA en béisbol (cuatro), lacrosse masculino y femenino, fútbol femenino, sóftbol y tenis masculino. Max McNeer ganó el título estatal de lucha de 79 kg.
```

### 10. sports.es.json `[364]` — `of: d631c24a`

`at`: `charlotte-christian:facilities.headline`

```
EN: A 53,000 sq ft athletic center broke ground in November 2025, joining a 5,400 sq ft weight room and the small gym where Stephen Curry played.
ES: Un centro deportivo de 4.924 m² inició sus obras en noviembre de 2025, sumándose a una sala de pesas de 502 m² y al pequeño gimnasio donde jugó Stephen Curry.
```

### 11. sports.es.json `[370]` — `of: 47e9e66a`

`at`: `charlotte-christian:facilities.photos[2].meta`

```
EN: 5,400 sq ft
ES: 502 m²
```

### 12. sports.es.json `[372]` — `of: e4e6ada6`

`at`: `charlotte-christian:facilities.venues[0].detail`

```
EN: 53,000+ sq ft — broke ground Nov 2025
ES: más de 4.900 m² — obras iniciadas en noviembre de 2025
```

### 13. sports.es.json `[374]` — `of: 7a03bb91`

`at`: `charlotte-christian:facilities.venues[2].detail`

```
EN: 7,800 sq ft — offices, locker rooms
ES: 725 m² — despachos, vestuarios
```

### 14. sports.es.json `[584]` — `of: 0947d8c2`

`at`: `charlotte-country-day:facilities.photos[1].meta`

```
EN: ~30,000 sq ft, 2022
ES: ~2.787 m², 2022
```

### 15. sports.es.json `[586]` — `of: da6c6eac`

`at`: `charlotte-country-day:facilities.photos[2].meta`

```
EN: ~47,000 sq ft, 2022
ES: ~4.366 m², 2022
```

### 16. sports.es.json `[602]` — `of: 06f84f5e`

`at`: `charlotte-country-day:facilities.careNote`

```
EN: The OrthoCarolina partnership is the differentiator among Charlotte private schools — Cannon uses Novant, Charlotte Christian uses Atrium, and Providence Day keeps care fully in-house. The combined Klein and Harris project totalled 77,737 sq ft and roughly $30.5M, funded by a $10M lead gift from the Klein family, the Dowd Foundation and two anonymous donors.
ES: La alianza con OrthoCarolina es el factor diferencial entre los colegios privados de Charlotte — Cannon trabaja con Novant, Charlotte Christian con Atrium y Providence Day mantiene la atención totalmente interna. El proyecto conjunto Klein y Harris sumó 7.222 m² y unos 30.5 millones de dólares, financiado con una donación principal de 10 millones de la familia Klein, la Fundación Dowd y dos donantes anónimos.
```

### 17. sports.es.json `[628]` — `of: 062ebfef`

`at`: `cannon:pipeline.rankedRecruits`

```
EN: Cannon’s strongest recruiting signal is its underclassmen. JaKaila Gaskin (’28, 6'3" center) is ranked No. 30 nationally by Prep Girls Hoops and No. 3 in NC for her class, a four-star with a USA Basketball profile and offers from Ohio State, Tennessee, Alabama, Auburn, Florida and Louisville. Brooke Busby (’27) has committed to Princeton. Earlier: Jaden Bradley was a five-star, No. 18 nationally, and Reigan Richardson ’21 was a McDonald’s All-American.
ES: La señal de reclutamiento más fuerte de Cannon está en sus cursos inferiores. JaKaila Gaskin (’28, pívot de 1,90 m) es la n.º 30 nacional según Prep Girls Hoops y la n.º 3 de Carolina del Norte en su promoción, con cuatro estrellas, perfil en USA Basketball y ofertas de Ohio State, Tennessee, Alabama, Auburn, Florida y Louisville. Brooke Busby (’27) se ha comprometido con Princeton. Antes: Jaden Bradley fue cinco estrellas y n.º 18 nacional, y Reigan Richardson ’21 fue McDonald’s All-American.
```

### 18. sports.es.json `[680]` — `of: d4dd40af`

`at`: `cannon:facilities.photos[2].meta`

```
EN: 4,100 sq ft, two floors
ES: 381 m², dos plantas
```

### 19. sports.es.json `[682]` — `of: 193e212d`

`at`: `cannon:facilities.venues[0].detail`

```
EN: 4,800 sq ft; three-booth press box
ES: 446 m²; cabina de prensa de tres puestos
```

### 20. sports.es.json `[684]` — `of: 18736cb9`

`at`: `cannon:facilities.venues[2].detail`

```
EN: 5,000 sq ft — wrestling, cages, agility
ES: 465 m² — lucha, jaulas, agilidad
```

### 21. sports.es.json `[787]` — `of: 1c0730ce`

`at`: `davidson-day:offered.headline`

```
EN: 35 teams across 13 sports on a 15-acre campus, with about 90% of students in grades 5–12 playing.
ES: 35 equipos en 13 deportes sobre un campus de 6 hectáreas, con cerca del 90% del alumnado de los grados 5–12 compitiendo.
```

### 22. sports.es.json `[815]` — `of: 6a411866`

`at`: `davidson-day:pipeline.rankedRecruits`

```
EN: Three four-star basketball recruits in consecutive classes. Cody Peck ’26 is ranked No. 82 nationally by 247Sports and No. 99 by ESPN — he transferred in from IMG Academy for his senior year and chose Dayton over Creighton, Tennessee and Miami. Isaiah Denis ’25 was No. 56 in the On3 Industry ranking and the No. 1 recruit in North Carolina before signing with UNC. Will Stevens ’26, a 6-foot-10 center, was No. 1 in NC per On3 and committed to Clemson over Vanderbilt and South Carolina.
ES: Tres reclutas de baloncesto de cuatro estrellas en promociones consecutivas. Cody Peck ’26 es el n.º 82 nacional según 247Sports y el n.º 99 según ESPN — se trasladó desde IMG Academy para su último curso y eligió Dayton por delante de Creighton, Tennessee y Miami. Isaiah Denis ’25 fue el n.º 56 del ranking On3 Industry y el mejor recluta de Carolina del Norte antes de firmar por UNC. Will Stevens ’26, pívot de 2,08 m, fue el n.º 1 de Carolina del Norte según On3 y se comprometió con Clemson por delante de Vanderbilt y South Carolina.
```

### 23. the-arts.es.json `[226]` — `of: 3760bdf2`

`at`: `charlotte-christian:ladder.enrichment[0].text`

```
EN: The Center for Worship and Performing Arts opened in Fall 2017 as Phase 1 of the master campus plan — two storeys, roughly 20,500–20,800 sq ft, seating 518 per the architect. Beyond the main auditorium the contractor documents a black box theater, a scene shop for set construction and dressing rooms. None of those three appears on the school’s own pages, so confirm them on a tour — they are what separate this from a chapel that also does plays.
ES: El Center for Worship and Performing Arts se inauguró en otoño de 2017 como Fase 1 del plan director del campus — dos plantas, en torno a 1.900–1.930 m², con 518 butacas según el arquitecto. Más allá del auditorio principal, la constructora documenta un teatro de caja negra, un taller para construir decorados y camerinos. Ninguno de los tres aparece en las páginas de la propia escuela, así que conviene confirmarlos en la visita — son lo que distingue esto de una capilla en la que además se hace teatro.
```

### 24. the-arts.es.json `[425]` — `of: 28e468bb`

`at`: `charlotte-country-day:ladder.headline`

```
EN: A 45,730 sq ft dedicated fine arts center, a separate 400-seat theater, and both AP and IB arts ceilings — an unusual dual framework.
ES: Un centro de bellas artes propio de 4.248 m², un teatro independiente de 400 butacas y techos tanto AP como IB — un marco doble poco habitual.
```

### 25. the-arts.es.json `[507]` — `of: de464367`

`at`: `charlotte-country-day:verdict.holdsUp[0].text`

```
EN: a 45,730 sq ft fine arts center with four studios, a two-story dance studio, a music suite with practice rooms and a Black Box Theater, plus a separate 400-seat proscenium house — so performance, rehearsal and studio work never compete for the same room.
ES: un centro de bellas artes de 4.248 m² con cuatro talleres, una sala de danza de dos alturas, un módulo de música con cabinas de ensayo y un teatro de caja negra, más una sala a la italiana independiente de 400 butacas — de modo que función, ensayo y trabajo de taller nunca compiten por la misma sala.
```

### 26. the-arts.es.json `[554]` — `of: 647afe65`

`at`: `cannon:ladder.photo.caption`

```
EN: The Leck Family thrust stage, raised 42 inches, under the curved acoustic "clouds" — 450 moveable seats on a flat floor so the room can host dances, dinners and exhibits too.
ES: El escenario de proscenio invertido Leck Family, elevado 107 cm, bajo las “nubes” acústicas curvas — 450 butacas móviles sobre suelo plano, de modo que la sala también puede acoger bailes, cenas y exposiciones.
```

