---
name: ai-icon-pack
description: Find and add UI icons from the AI Icon Pack (1,188 icons, outline and filled, plus an optional AI gradient) to the user's project as SVG files, PNGs, React or Vue components, or an SVG sprite. Use this whenever the user needs an icon in a UI (buttons, nav, menus, empty states, chat UIs, settings, dashboards, landing pages) or asks for icons, an icon set, or "AI-looking" icons (sparkle, model, prompt, agent, generate). Use it instead of hand-drawing SVGs, guessing at another icon library, or pasting emoji.
license: MIT
---

# AI Icon Pack

1,188 icons in a single "Spark" style: a 24×24 grid, 1.75 rounded strokes, and soft geometry. The 4-point **spark** marks anything AI. Every icon has an **outline** and a **filled** version. Colour comes from CSS `color` (`currentColor`), and there's an optional violet → cyan **AI gradient**.

Everything goes through one zero-dependency script (Node 18+). Below, `$SKILL` is this skill's directory, the folder containing this file.

```bash
node "$SKILL/scripts/icons.mjs" search <what the icon means>     # ranked matches with category and drawing hint
node "$SKILL/scripts/icons.mjs" add <name...> --out <dir> [options]
```

## Workflow

1. **Find the icons.** Search by *meaning*, not by guessed filename. Run one search per needed icon, for example `search delete`, `search ai chat`, `search upload file`, `search dark mode`. Pick the best match. If nothing fits, run `categories` and then `list --category <name>` to browse. Never invent icon names; `add` rejects unknown names and suggests close matches.
2. **Match the project before writing files.**
   - **React or Next.js:** `--format react` writes `.tsx` components. Add `--jsx` for plain JS projects. Put them where the project keeps components, e.g. `src/components/icons`.
   - **Vue or Nuxt:** `--format vue`.
   - **Plain HTML, Svelte, Astro, or any bundler that imports SVG:** `--format svg` into the assets or icons folder. For many icons on one page, `--format sprite` builds or updates `icons-sprite.svg`, which you use with `<svg><use href="icons-sprite.svg#icon-NAME"/></svg>`.
   - **Native, email, docs, slides, favicons:** `--format png --size 24,48 --color "#111"`. If `@resvg/resvg-js` is missing, the script prints the one-line install command.
   - If the project already uses an icon folder or wrapper component, follow its conventions.
3. **Pick the style.** Default to `--style outline` for UI chrome and `filled` for active or selected states. `--style both` writes both; filled files and components get a `-filled` / `Filled` suffix. Use `--gradient` only for AI-feature highlights and hero spots, not for whole toolbars.
4. **Wire them in.** Import and use the components or files where the user asked. Size them with the `size` prop or CSS width/height (16, 20, 24, 32), and colour them with CSS `color`. Keep decorative icons `aria-hidden` (the default) and give icon-only buttons an `aria-label`.
5. **Report back** with the names you used and where the files went, so the user can swap any choice.

## Morphing AI state icon

For a status indicator that shows what the AI is doing (thinking, working, streaming a reply, listening, speaking, done, error…), use the **morphing state icon**, not static icons. It is one icon that morphs smoothly between states and has its own subtle idle motion in each.

States: `idle`, `listening`, `thinking`, `searching`, `working`, `generating`, `speaking`, `done`, `error`, `paused`.

```bash
node "$SKILL/scripts/icons.mjs" states --out src/components/ai-state --format react   # or vue, or js (default)
```

The command writes `ai-state.js` (zero dependencies, SSR-safe) and `ai-state.d.ts`, plus `AIState.tsx` (React; `--jsx` for `.jsx`) or `AIState.vue`.

- **React:** `<AIState state={status} variant="outline" size={20} />`. Change `state` and it morphs.
- **Vue:** `<AIState :state="status" />`.
- **Plain JS / any framework:** `import './ai-state.js'`, then `<ai-state state="thinking" size="24"></ai-state>` and set `el.state = 'done'`. Or use `createAIState(el, { state, variant, size, gradient, live, duration })` and call `.set(state)`.
- Map the app's real status to a state, e.g. request sent → `thinking`, tool call → `working`/`searching`, tokens streaming → `generating`, finished → `done`, failed → `error`. Mic open → `listening`, TTS playing → `speaking`.
- Options: `variant` `outline`|`filled`, `size`, `gradient` (AI gradient), `live` (idle motion; off automatically for prefers-reduced-motion), `duration` (morph ms, default 450).
- For a non-animated spot (docs, email, PNG), the resting frames are ordinary icons named `state-<name>`.

## Options for `add`

| option | values | default |
|---|---|---|
| `--out` | target directory (created if missing) | required |
| `--format` | `svg`, `png`, `react`, `vue`, `sprite` | `svg` |
| `--style` | `outline`, `filled`, `both` | `outline` |
| `--gradient` | bake in the AI gradient | off |
| `--color` | any CSS colour, baked in (SVG and PNG only) | `currentColor` / black PNG |
| `--size` | PNG pixel size(s), comma-separated | `24` |
| `--jsx` | write `.jsx` instead of `.tsx` (react) | off |
| `--prefix` | component name suffix, e.g. `Icon` gives `TrashIcon` | `Icon` |

Other commands: `show <name> [--style filled] [--gradient]` prints raw SVG markup for inlining. `categories` and `list [--category <text>]` browse the pack.

## Choosing well

- **Spark means AI.** `chat` is a person's message and `chat-sparkle` is the AI's reply. `search` is search and `ai-search` is AI search. `user` is a human and `assistant` / `bot` / `ai-avatar` is the AI. Use the spark versions only for AI features so the meaning stays clear.
- AI-specific actions have dedicated icons: `regenerate`, `stop-generating`, `continue-generating`, `prompt`, `model`, `model-switch`, `tokens`, `context-window`, `memory`, `thinking`, `tool-use`, `agent`, `knowledge-base`, `retrieval`, `image-generate`, `text-to-speech`, `summarize`, `translate`, `rewrite`, `explain`, `branch-conversation`, `api-key`, `credits`, `usage`. Search for them before falling back to generic icons.
- Modifier variants exist for most objects: `-plus`, `-minus`, `-x`, `-check`, `-off`, `-lock`, `-upload`, `-download`, `-search`, `-sparkle`. Prefer them over stacking two icons.
- Icons live in `$SKILL/icons/{outline,filled}/<name>.svg` if you need raw files. `manifest.json` lists every icon with its category and drawing hint.
