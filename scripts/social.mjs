// Renders docs/social.png (1600×900): the X/Twitter announcement card, also usable as an Open Graph image.
// Usage: node scripts/social.mjs   (run after `npm run package` so the icons are current)
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import { gradientSvg } from './svg.mjs';
import { ROOT, readList, loadIcons } from './load.mjs';

const W = 1600, H = 900;
const icons = await loadIcons(await readList());
const byName = new Map(icons.map((i) => [i.name, i]));
const total = icons.length.toLocaleString('en-US');

// 6×5 showcase: AI icons up front, with everyday icons wearing their accent sparks.
const SHOW = [
  ['sparkles', 'f', 1], ['chat-sparkle', 'o', 0], ['brain', 'o', 0], ['bot', 'f', 0], ['regenerate', 'o', 1], ['image-generate', 'o', 0],
  ['agent', 'o', 0], ['wand-sparkles', 'o', 0], ['prompt', 'f', 1], ['model', 'o', 0], ['ai-search', 'o', 0], ['vision', 'f', 0],
  ['memory', 'o', 0], ['deep-research', 'o', 1], ['suggestion', 'o', 0], ['code-generate', 'o', 0], ['tokens', 'f', 0], ['text-to-speech', 'o', 0],
  ['home', 'o', 0], ['lock', 'f', 0], ['settings', 'o', 0], ['bell', 'o', 1], ['send', 'f', 0], ['file-sparkle', 'o', 0],
  ['cloud-sparkle', 'o', 0], ['shield-sparkle', 'f', 1], ['user-sparkle', 'o', 0], ['calendar-sparkle', 'o', 0], ['mail-sparkle', 'o', 0], ['lightbulb', 'f', 0],
];

const COLS = 6, TILE = 100, GAP = 12, ICON = 50;
const gridW = COLS * TILE + (COLS - 1) * GAP, gridH = 5 * TILE + 4 * GAP;
const gx = W - 84 - gridW, gy = (H - gridH) / 2;

const place = (svg, x, y, s) => svg.replace('<svg ', `<svg x="${x}" y="${y}" `).replace('width="24" height="24"', `width="${s}" height="${s}"`);

let tiles = '';
SHOW.forEach(([name, style, grad], k) => {
  const ic = byName.get(name);
  if (!ic) throw new Error(`missing showcase icon ${name}`);
  const x = gx + (k % COLS) * (TILE + GAP), y = gy + Math.floor(k / COLS) * (TILE + GAP);
  const src = style === 'f' ? ic.filled : ic.outline;
  const svg = grad ? gradientSvg(`s${k}`, src) : src.replaceAll('currentColor', '#ECECF4');
  tiles += `<rect x="${x}" y="${y}" width="${TILE}" height="${TILE}" rx="20" fill="${grad ? 'url(#tileGlow)' : '#15151E'}" stroke="${grad ? '#3B3270' : '#24242F'}" stroke-width="1.5"/>`;
  tiles += place(svg, x + (TILE - ICON) / 2, y + (TILE - ICON) / 2, ICON);
});

const sparkMark = byName.get('sparkles').filled;
const SANS = "Segoe UI, 'Segoe UI Variable Display', Arial, sans-serif";
const MONO = "Cascadia Mono, Consolas, monospace";
const lx = 92;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
  <radialGradient id="glowA" cx="18%" cy="8%" r="55%"><stop offset="0" stop-color="#7C3AED" stop-opacity=".45"/><stop offset="1" stop-color="#7C3AED" stop-opacity="0"/></radialGradient>
  <radialGradient id="glowB" cx="92%" cy="100%" r="55%"><stop offset="0" stop-color="#06B6D4" stop-opacity=".28"/><stop offset="1" stop-color="#06B6D4" stop-opacity="0"/></radialGradient>
  <linearGradient id="headline" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#A78BFA"/><stop offset=".55" stop-color="#818CF8"/><stop offset="1" stop-color="#22D3EE"/></linearGradient>
  <linearGradient id="tileGlow" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1D1733"/><stop offset="1" stop-color="#11202A"/></linearGradient>
  <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill="#FFFFFF" fill-opacity=".05"/></pattern>
</defs>
<rect width="${W}" height="${H}" fill="#0B0B11"/>
<rect width="${W}" height="${H}" fill="url(#dots)"/>
<rect width="${W}" height="${H}" fill="url(#glowA)"/>
<rect width="${W}" height="${H}" fill="url(#glowB)"/>

${place(gradientSvg('mark', sparkMark), lx, 128, 54)}
<text x="${lx + 70}" y="167" font-family="${SANS}" font-size="30" font-weight="600" fill="#ECECF4">AI Icon Pack</text>

<text font-family="${SANS}" font-weight="800" letter-spacing="-2">
  <tspan x="${lx}" y="306" font-size="84" fill="#FFFFFF">Icons made</tspan>
  <tspan x="${lx}" y="400" font-size="84" fill="url(#headline)">for AI apps.</tspan>
</text>

<text font-family="${SANS}" font-size="29" fill="#A9A9BC">
  <tspan x="${lx}" y="482"><tspan fill="#FFFFFF" font-weight="700">${total} icons</tspan> · outline + filled · AI gradient</tspan>
  <tspan x="${lx}" y="526">SVG · PNG · React · Vue · sprite</tspan>
</text>

<rect x="${lx}" y="590" width="640" height="74" rx="16" fill="#14141C" stroke="#2A2A38" stroke-width="1.5"/>
<text x="${lx + 26}" y="636" font-family="${MONO}" font-size="23" fill="#ECECF4">/plugin marketplace add djtoon/ai-icon-pack</text>
<text x="${lx}" y="716" font-family="${SANS}" font-size="23" fill="#8B8BA3">A Claude skill that drops them into any project.</text>

<text x="${lx}" y="790" font-family="${SANS}" font-size="25"><tspan font-weight="600" fill="#C4B5FD">djtoon.github.io/ai-icon-pack</tspan><tspan fill="#6B6B80">  ·  free &amp; MIT</tspan></text>

${tiles}
</svg>`;

const png = new Resvg(svg, { font: { loadSystemFonts: true, defaultFontFamily: 'Segoe UI' } }).render().asPng();
const out = path.join(ROOT, 'docs', 'social.png');
await writeFile(out, png);
console.log(`wrote ${path.relative(ROOT, out)} (${W}×${H}, ${(png.length / 1024).toFixed(0)} KB)`);
