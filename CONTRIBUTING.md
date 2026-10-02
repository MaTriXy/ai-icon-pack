# Contributing

Icons are hand-authored SVG markup in small JS modules and built by script. To add or change an icon:

1. Make sure the name is in [`ICONS.md`](ICONS.md) (the master list with drawing hints). The build rejects names that aren't listed.
2. Follow [`STYLE.md`](STYLE.md): grid, stroke, soft geometry, when to use the spark, modifiers and the filled style.
3. Add the icon to `src/icons/<NN-category>.mjs`. Import shared silhouettes (page, folder, bubble, cloud…) from `src/shapes.mjs`; never redraw them.
4. Check it: `npm run check -- 05` validates `src/icons/05-*.mjs` and renders `dist/check/05.png` at 72px and real 24px.
5. Run `npm run package` to refresh the skill, the site data and the zips, then open a PR.

## Source format

Each icon is `name: { o, f?, cut?, top?, ocut?, otop?, bold? }`. Each value holds the inner markup for a 24×24 SVG.

| key | meaning |
|---|---|
| `o` | Outline. The root sets `fill="none" stroke="currentColor" stroke-width="1.75"` with round caps and joins. |
| `f` | Filled. The root sets fill and stroke to `currentColor`, stroke 1.75, so a filled shape has the same outer edge as its outline. |
| `cut` | Cut-outs for the filled style. Drawn into a mask with a black 1.75 stroke and no fill. Use `fill="#000" stroke="none"` for solid holes. |
| `top` | Drawn on top of the filled style after the cut-outs, e.g. a shackle or antenna. Open paths need `fill="none"`. |
| `ocut` | Cut-outs for the outline style (same rules as `cut`). Use it to open a contour, e.g. around a badge or slash. |
| `otop` | Drawn on top of the outline style after `ocut`. |
| `bold` | `true` makes the filled style the outline at stroke 2.5. Use it for pure line icons like `search` and `code`. |

`src/helpers.mjs` has `star()` (the 4-point spark), `gear()` and `poly()`. `src/shapes.mjs` has the shared silhouettes, the modifier badge (`BADGE`, `BADGE_CLEAR`) and the "-off" slash (`SLASH`, `SLASH_CLEAR`).

## Scripts

| command | does |
|---|---|
| `npm run build` | Writes every format into `dist/`: `svg/`, `svg-gradient/`, `png/{black,white,gradient}/{16…512}/`, a per-category contact sheet in `sheets/`, and `preview.html`. |
| `npm run build -- --no-png` | Same, without PNGs. Much faster. |
| `npm run check -- <NN>` | Validates one category file and renders `dist/check/<NN>.png`. Safe to run in parallel. |
| `npm run package` | Refreshes the skill (`plugins/ai-icon-pack/skills/ai-icon-pack`), `docs/icons.js`, `docs/banner.png` and the zips in `docs/downloads/`. |

## Repo layout

```
ICONS.md, STYLE.md                 the list and the rules
src/icons/*.mjs, src/shapes.mjs    icon sources
scripts/                           build, check, package
plugins/ai-icon-pack/              Claude Code plugin; skills/ai-icon-pack is the Agent Skill
.claude-plugin/marketplace.json    makes this repo a plugin marketplace
docs/                              GitHub Pages site (gallery + install guide) and downloads
```
