// Renders docs/states-film.png: every transition in the state cycle, 7 frames each (outline row + filled row).
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import { STATE_NAMES, morphMarkup } from '../src/states/ai-state.js';
import { ROOT } from './load.mjs';

const FR = [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1], S = 44, G = 10, PAD = 20, LBL = 190;
const pairs = STATE_NAMES.map((s, i) => [s, STATE_NAMES[(i + 1) % STATE_NAMES.length]]);
const W = PAD * 2 + LBL + FR.length * (S + G) * 2 + 30, H = PAD * 2 + pairs.length * (S + 16);
let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="100%" height="100%" fill="#fff"/>`;
pairs.forEach(([a, b], r) => {
  const y = PAD + r * (S + 16);
  svg += `<text x="${PAD}" y="${y + S / 2 + 5}" font-family="Segoe UI" font-size="15" fill="#333">${a} → ${b}</text>`;
  ['none', '#111'].forEach((fill, v) => FR.forEach((e, k) => {
    const x = PAD + LBL + v * (FR.length * (S + G) + 30) + k * (S + G);
    svg += `<rect x="${x}" y="${y}" width="${S}" height="${S}" rx="6" fill="#f2f2f5"/>`;
    svg += `<svg x="${x + 4}" y="${y + 4}" width="${S - 8}" height="${S - 8}" viewBox="0 0 24 24" fill="${fill}" stroke="#111" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${morphMarkup(a, b, e)}</svg>`;
  }));
});
const out = path.join(ROOT, 'docs', 'states-film.png');
await writeFile(out, new Resvg(svg + '</svg>', { font: { loadSystemFonts: true } }).render().asPng());
console.log('wrote', path.relative(ROOT, out));
