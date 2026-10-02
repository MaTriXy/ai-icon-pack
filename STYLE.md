# Spark style guide

Every icon in the pack follows these rules. Read `README.md` for the source format and look at `src/icons/*.mjs` for worked examples.

## Canvas
- 24×24 viewBox. Live area 2–22 **including stroke**. Keep path coordinates within about 2.9–21.1 for stroked outlines.
- The main subject fills the live area, about 16–18 units across. Centre the visual mass, not the bounding box.
- Write coordinates on 0.25 steps where you can. Never use more than 2 decimals.

## Stroke & geometry
- Outline stroke 1.75, round caps, round joins, `currentColor`. Never set colours other than `currentColor`, plus `#000`/`#fff` inside masks.
- Soft geometry. Rectangles 10+ units across get `rx` 2.5, smaller ones 1–2. Prefer curves and ovals to boxes where the object allows it (the chat bubble is an oval).
- Sharp corners only where they mean something: arrowheads, the paper-plane tip, spark tips, check marks.
- Minimum clear gap between two strokes: 1.25 visible. Centrelines of neighbouring strokes therefore need to be at least 3.0 apart.
- One idea per icon. Use at most 3 interior details; at 16px anything more turns to mush.

## The spark: the pack's signature
`star(cx, cy, r)` from `src/shapes.mjs` is the 4-point AI spark. Its meaning is **AI is involved**.

| Tier | When | Size |
|---|---|---|
| **Hero** | Every icon in *1. AI core*, and every `*-sparkle`, `ai-*`, `*-generate` icon. The spark is the main subject or replaces the main content (`file-sparkle`, `chat-sparkle`). | r 3.5–4.75 |
| **Accent** | A base icon with a natural *core detail* the spark can replace without changing the meaning: door (`home`), keyhole (`lock`), axle (`settings`), bell body (`bell`), trail (`send`), bulb filament, gem facet. Use one spark per icon at most. | r 2.25–3 |
| **None** | (a) Base icons whose AI twin exists in ICONS.md, so the pair stays distinct: `chat`/`chat-sparkle`, `search`/`ai-search`, `file`/`file-sparkle`, `user`/`user-sparkle`, `folder`, `cloud`, `mail`, `calendar`, `shield`, `image`, `code`, `text`, `cursor`… (b) People and identity icons. (c) Pure glyphs: arrows, chevrons, carets, plus/minus/x/check, text formatting, alignment, math, shapes, layout wireframes, media transport controls. | — |

Never shrink a spark below r 2 (r 2.25 preferred); it disappears at 16px. Give a spark at least 1.25 visible clearance from other strokes.

## Families and shared shapes
- Anything built on a shape exported from `src/shapes.mjs` (PAGE, FOLDER, BUBBLE, CLOUD, SHIELD, HOUSE, BELL, LOCK_*, MONITOR, PHONE, FRAME, CALENDAR, LENS, GEAR, HEAD/BODY, ENVELOPE, DATABASE, PLANE) **must import it**. Never redraw it. Don't edit `src/shapes.mjs`; define new shared shapes locally in your file.
- Variants of one object must be identical apart from the modifier.

## Modifiers
- **Badge** (`-plus`, `-minus`, `-x`, `-check`, `-alert`, `-question`, `-upload`, `-download`, `-lock`, `-search`, `-edit`, `-clock`, `-sparkle` when a hero spark can't replace the content): glyph at bottom-right, centred on (18,18). Use `BADGE.*` from shapes.mjs. Clear the base with `BADGE_CLEAR` in **both** `ocut` and `cut`, then draw the glyph in `otop` and `top`. See `file-plus`.
- Small custom badge glyphs (lock, pencil, magnifier) must fit inside x,y ∈ [14.5, 21.5].
- **Off / disabled** (`-off`, `mute`, `ban`-style slash): `SLASH_CLEAR` in `ocut`+`cut`, `SLASH` in `otop`+`top`. Drop any accent spark in the off state. See `bell-off`.
- Directional modifiers built into the subject (e.g. `phone-incoming`) use arrows drawn inside the subject's space, not a badge.

## Filled style
- The filled silhouette equals the outline's outer edge. The root carries a stroke, so `f` paths are filled *and* stroked at 1.75.
- Interior details become **knockouts** in `cut`: strokes for lines (width 1.5–2), and `fill="#000" stroke="none"` (or `stroke-width="1"` for sparks) for solid holes.
- Open paths in `f` or `top` that must not be filled need `fill="none"`.
- Pure line icons (arrows, chevrons, `code`, `search`, plus/minus) use `bold: true`. Their filled style is then the outline at stroke 2.5.
- Overlapping objects (`copy`, `files`, `layers`): cut the back shape with a stroke-width 4–4.5 copy of the front shape so a gap appears, then draw the front shape in `top`.

## Naming & coverage
- Icon keys must match ICONS.md exactly. The build rejects unknown names.
- Use ICONS.md's drawing hint where it helps, but the hint is a suggestion. Legibility at 16px wins.

## Verify every batch
`node scripts/build.mjs --check <NN>` validates your file and renders `dist/check/<NN>.png` with 72px and real 24px views. Open it and check:
1. Every icon is recognisable at 24px in both styles.
2. Outline and filled show the same object, and filled cut-outs are visible.
3. Nothing touches the canvas edge, and there are no near-touching strokes.
4. Shared shapes and modifiers line up with sibling icons.
