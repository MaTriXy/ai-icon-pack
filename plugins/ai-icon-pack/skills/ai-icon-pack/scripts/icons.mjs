#!/usr/bin/env node
// AI Icon Pack CLI: search the pack and add icons to a project.
// Zero dependencies (Node 18+). PNG export optionally uses @resvg/resvg-js.
//
//   node icons.mjs search <query...> [--category <text>] [--limit 15]
//   node icons.mjs categories
//   node icons.mjs list [--category <text>]
//   node icons.mjs show <name> [--style outline|filled] [--gradient]
//   node icons.mjs add <name...> --out <dir> [--format svg|png|react|vue|sprite] [--style outline|filled|both]
//                       [--gradient] [--size 24[,48,...]] [--color #111] [--jsx] [--prefix Icon]

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const SKILL_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(readFileSync(path.join(SKILL_DIR, 'manifest.json'), 'utf8'));
const byName = new Map(manifest.icons.map((i) => [i.name, i]));

// ── args ──────────────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const cmd = argv.shift();
const flags = {};
const positional = [];
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a.startsWith('--')) {
    const key = a.slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith('--')) flags[key] = true;
    else (flags[key] = next), i++;
  } else positional.push(a);
}

function die(msg) {
  console.error(`error: ${msg}`);
  process.exit(1);
}

// ── search ────────────────────────────────────────────────────────────────────
// Everyday words → words used in icon names/hints.
const SYNONYMS = {
  ai: ['sparkle', 'sparkles', 'magic', 'bot', 'model'], magic: ['sparkle', 'wand'], delete: ['trash', 'x'], remove: ['trash', 'minus', 'x'],
  close: ['x'], add: ['plus'], new: ['plus'], create: ['plus', 'new'], settings: ['settings', 'cog', 'gear', 'sliders'], config: ['settings', 'cog'],
  preferences: ['settings'], options: ['menu', 'settings'], more: ['menu-dots'], profile: ['user', 'avatar'], account: ['user'], person: ['user'],
  people: ['users', 'team'], message: ['chat', 'mail'], conversation: ['chat'], email: ['mail'], notification: ['bell'], alert: ['alert', 'bell', 'warning'],
  save: ['save', 'download', 'bookmark'], favorite: ['star', 'heart', 'bookmark'], like: ['heart', 'thumbs-up'], dislike: ['thumbs-down'],
  find: ['search'], lookup: ['search'], magnifier: ['search'], home: ['home', 'house'], back: ['arrow-left', 'chevron-left', 'back'], next: ['arrow-right', 'chevron-right'],
  refresh: ['refresh', 'regenerate', 'rotate'], retry: ['regenerate', 'refresh'], reload: ['refresh'], loading: ['loader', 'spinner'], spinner: ['loader'],
  edit: ['edit', 'pencil', 'pen'], write: ['pen', 'edit', 'writing'], copy: ['copy', 'duplicate'], share: ['share'], upload: ['upload'], download: ['download'],
  image: ['image', 'photo'], picture: ['image'], photo: ['image', 'camera'], video: ['video', 'film'], audio: ['audio', 'volume', 'music', 'waveform'],
  voice: ['microphone', 'voice', 'speech'], mic: ['microphone'], speak: ['speech', 'microphone'], stop: ['stop'], cancel: ['x', 'stop'],
  security: ['shield', 'lock'], secure: ['shield', 'lock'], private: ['lock', 'privacy', 'incognito'], password: ['key', 'lock', 'password'],
  money: ['dollar', 'coins', 'wallet', 'credit-card'], pay: ['credit-card', 'wallet'], billing: ['billing', 'invoice', 'receipt'], buy: ['shopping-cart', 'bag'],
  time: ['clock', 'timer'], date: ['calendar'], schedule: ['calendar', 'schedule'], history: ['history', 'clock'], code: ['code', 'terminal', 'brackets'],
  developer: ['code', 'terminal'], data: ['database', 'chart', 'table'], analytics: ['chart', 'analytics', 'dashboard'], graph: ['chart'], stats: ['chart'],
  doc: ['file', 'document'], document: ['file', 'document'], files: ['file', 'folder'], attachment: ['attach', 'paperclip'], link: ['link'],
  agent: ['agent', 'bot'], robot: ['robot', 'bot'], assistant: ['assistant', 'bot'], prompt: ['prompt'], brain: ['brain'], thinking: ['thinking', 'reasoning', 'brain'],
  generate: ['generate', 'sparkle'], dark: ['dark-mode', 'moon'], light: ['light-mode', 'sun'], theme: ['theme', 'dark-mode'],
};

function tokens(s) {
  return s.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
}

function search(query, { category, limit = 15 } = {}) {
  const q = query.toLowerCase().trim();
  const qTokens = tokens(q);
  const expanded = new Set(qTokens.flatMap((t) => [t, ...(SYNONYMS[t] || [])]));
  const scored = [];
  for (const icon of manifest.icons) {
    if (category && !icon.category.toLowerCase().includes(String(category).toLowerCase())) continue;
    const nameTokens = icon.name.split('-');
    const hay = tokens(`${icon.hint} ${icon.category}`);
    let score = 0;
    if (icon.name === q.replace(/\s+/g, '-')) score += 100;
    else if (icon.name.includes(q.replace(/\s+/g, '-'))) score += 40;
    for (const t of expanded) {
      const direct = qTokens.includes(t) ? 1 : 0.6;
      if (nameTokens.includes(t)) score += 20 * direct;
      else if (nameTokens.some((n) => n.startsWith(t) || (t.length > 3 && t.startsWith(n)))) score += 10 * direct;
      if (hay.includes(t)) score += 6 * direct;
      else if (hay.some((h) => h.startsWith(t))) score += 3 * direct;
    }
    if (score > 0) scored.push({ icon, score: score - icon.name.length * 0.05 });
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, limit).map((s) => s.icon);
}

// ── SVG helpers ───────────────────────────────────────────────────────────────
function svgFor(name, style, { gradient = false } = {}) {
  const icon = byName.get(name);
  if (!icon) {
    const close = search(name, { limit: 5 }).map((i) => i.name);
    die(`no icon "${name}".${close.length ? ` Did you mean: ${close.join(', ')}?` : ''}`);
  }
  let svg = readFileSync(path.join(SKILL_DIR, 'icons', style, `${name}.svg`), 'utf8').trim();
  if (gradient) {
    const id = `${name}-${style}-grad`;
    const defs =
      `<defs><linearGradient id="${id}" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">` +
      `<stop offset="0" stop-color="#8B5CF6"/><stop offset=".55" stop-color="#6366F1"/><stop offset="1" stop-color="#06B6D4"/></linearGradient></defs>`;
    svg = svg.replace(/(<svg[^>]*>)/, `$1${defs}`).replaceAll('currentColor', `url(#${id})`);
  }
  return svg;
}

const inner = (svg) => svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
const rootAttrs = (svg) => svg.match(/^<svg([^>]*)>/)[1].replace(/\s(width|height)="[^"]*"/g, '').trim();
const pascal = (s) => s.replace(/(^|[-_ ])([a-z0-9])/g, (_, __, c) => c.toUpperCase());
const jsxAttrs = (s) => s.replace(/\s([a-z]+(?:-[a-z]+)+)=/g, (_, a) => ' ' + a.replace(/-([a-z])/g, (__, c) => c.toUpperCase()) + '=');

function styles(flag) {
  const s = flag || 'outline';
  if (s === 'both') return ['outline', 'filled'];
  if (!['outline', 'filled'].includes(s)) die(`--style must be outline, filled or both`);
  return [s];
}

const fileBase = (name, style) => (style === 'filled' ? `${name}-filled` : name);

// ── writers ───────────────────────────────────────────────────────────────────
function writeSvg(out, names, opts) {
  const written = [];
  for (const name of names)
    for (const style of opts.styles) {
      let svg = svgFor(name, style, opts);
      if (opts.color) svg = svg.replaceAll('currentColor', opts.color);
      const file = path.join(out, `${fileBase(name, style)}.svg`);
      writeFileSync(file, svg + '\n');
      written.push(file);
    }
  return written;
}

async function loadResvg() {
  const candidates = [process.cwd(), SKILL_DIR];
  for (const base of candidates) {
    try {
      const req = createRequire(path.join(base, 'noop.js'));
      return (await import(pathToFileURL(req.resolve('@resvg/resvg-js')).href)).Resvg;
    } catch {}
  }
  die(
    `PNG export needs @resvg/resvg-js. Install it once into the skill folder:\n` +
      `  npm install --prefix "${SKILL_DIR}" @resvg/resvg-js\n` +
      `(or add it as a dev dependency of the current project), then re-run.`,
  );
}

async function writePng(out, names, opts) {
  const Resvg = await loadResvg();
  const sizes = String(opts.size || 24).split(',').map(Number);
  const written = [];
  for (const name of names)
    for (const style of opts.styles) {
      let svg = svgFor(name, style, opts);
      svg = svg.replaceAll('currentColor', opts.color || '#000000');
      for (const size of sizes) {
        const png = new Resvg(svg, { fitTo: { mode: 'width', value: size }, font: { loadSystemFonts: false } }).render().asPng();
        const file = path.join(out, `${fileBase(name, style)}${sizes.length > 1 ? `-${size}` : ''}.png`);
        writeFileSync(file, png);
        written.push(file);
      }
    }
  return written;
}

function writeReact(out, names, opts) {
  const ext = opts.jsx ? 'jsx' : 'tsx';
  const written = [];
  for (const name of names)
    for (const style of opts.styles) {
      const svg = svgFor(name, style, opts);
      const comp = `${pascal(fileBase(name, style))}${opts.prefix ?? 'Icon'}`;
      const typeImport = opts.jsx ? '' : `import type { SVGProps } from 'react';\n\n`;
      const sig = opts.jsx ? `{ size = 24, ...props }` : `{ size = 24, ...props }: SVGProps<SVGSVGElement> & { size?: number | string }`;
      const code =
        `${typeImport}// ${name} (${style}) — AI Icon Pack. Colour follows CSS \`color\` (currentColor).\n` +
        `export function ${comp}(${sig}) {\n` +
        `  return (\n    <svg ${jsxAttrs(' ' + rootAttrs(svg)).trim()} width={size} height={size} aria-hidden="true" {...props}>\n` +
        `      ${jsxAttrs(inner(svg))}\n    </svg>\n  );\n}\n\nexport default ${comp};\n`;
      const file = path.join(out, `${comp}.${ext}`);
      writeFileSync(file, code);
      written.push(file);
    }
  return written;
}

function writeVue(out, names, opts) {
  const written = [];
  for (const name of names)
    for (const style of opts.styles) {
      const svg = svgFor(name, style, opts);
      const comp = `${pascal(fileBase(name, style))}${opts.prefix ?? 'Icon'}`;
      const code =
        `<!-- ${name} (${style}) — AI Icon Pack. Colour follows CSS \`color\` (currentColor). -->\n` +
        `<script setup>\ndefineProps({ size: { type: [Number, String], default: 24 } });\n</script>\n\n` +
        `<template>\n  <svg ${rootAttrs(svg)} :width="size" :height="size" aria-hidden="true">${inner(svg)}</svg>\n</template>\n`;
      const file = path.join(out, `${comp}.vue`);
      writeFileSync(file, code);
      written.push(file);
    }
  return written;
}

function writeSprite(out, names, opts) {
  const file = path.join(out, 'icons-sprite.svg');
  const symbols = new Map();
  if (existsSync(file)) {
    for (const m of readFileSync(file, 'utf8').matchAll(/<symbol id="([^"]+)"[\s\S]*?<\/symbol>/g)) symbols.set(m[1], m[0]);
  }
  for (const name of names)
    for (const style of opts.styles) {
      const svg = svgFor(name, style, opts);
      const id = `icon-${fileBase(name, style)}`;
      symbols.set(id, `<symbol id="${id}" ${rootAttrs(svg).replace(/xmlns="[^"]*"\s*/, '')}>${inner(svg)}</symbol>`);
    }
  writeFileSync(file, `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">\n${[...symbols.values()].join('\n')}\n</svg>\n`);
  return [file + `  (${symbols.size} symbols — use <svg width="24" height="24"><use href="icons-sprite.svg#icon-NAME"/></svg>)`];
}

// ── commands ──────────────────────────────────────────────────────────────────
const fmtIcon = (i) => `${i.name.padEnd(28)} ${i.category}${i.hint ? ` — ${i.hint}` : ''}`;

switch (cmd) {
  case 'search': {
    if (!positional.length) die('usage: search <query...>');
    const res = search(positional.join(' '), { category: flags.category, limit: Number(flags.limit) || 15 });
    console.log(res.length ? res.map(fmtIcon).join('\n') : 'no matches — try a broader word, or `categories` / `list`');
    break;
  }
  case 'categories': {
    const counts = new Map();
    for (const i of manifest.icons) counts.set(i.category, (counts.get(i.category) || 0) + 1);
    for (const [c, n] of counts) console.log(`${String(n).padStart(4)}  ${c}`);
    console.log(`${String(manifest.icons.length).padStart(4)}  total`);
    break;
  }
  case 'list': {
    const list = flags.category ? manifest.icons.filter((i) => i.category.toLowerCase().includes(String(flags.category).toLowerCase())) : manifest.icons;
    console.log(list.map(fmtIcon).join('\n'));
    break;
  }
  case 'show': {
    const name = positional[0] || die('usage: show <name>');
    console.log(svgFor(name, styles(flags.style)[0], { gradient: !!flags.gradient }));
    break;
  }
  case 'add': {
    if (!positional.length) die('usage: add <name...> --out <dir>');
    const out = path.resolve(flags.out || die('--out <dir> is required'));
    mkdirSync(out, { recursive: true });
    const opts = { styles: styles(flags.style), gradient: !!flags.gradient, color: flags.color, size: flags.size, jsx: !!flags.jsx, prefix: flags.prefix };
    for (const n of positional) svgFor(n, 'outline'); // fail fast on unknown names
    const format = flags.format || 'svg';
    const writers = { svg: writeSvg, png: writePng, react: writeReact, vue: writeVue, sprite: writeSprite };
    if (!writers[format]) die(`--format must be one of ${Object.keys(writers).join(', ')}`);
    const written = await writers[format](out, positional, opts);
    console.log(written.map((f) => `wrote ${f}`).join('\n'));
    break;
  }
  default:
    console.log(`AI Icon Pack — ${manifest.icons.length} icons × outline/filled (v${manifest.version})
Commands:
  search <query...> [--category <text>] [--limit N]   find icons by meaning ("delete", "ai chat", "upload file")
  categories                                          list categories with counts
  list [--category <text>]                            list icon names
  show <name> [--style outline|filled] [--gradient]   print the SVG markup
  add <name...> --out <dir> [--format svg|png|react|vue|sprite] [--style outline|filled|both]
                [--gradient] [--color <css colour>] [--size 24[,48]] [--jsx] [--prefix Icon]`);
}
