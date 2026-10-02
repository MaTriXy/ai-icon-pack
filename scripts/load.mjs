// Shared loader: reads ICONS.md (names, categories, hints) and the icon sources in src/icons.
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import { outlineSvg, filledSvg } from './svg.mjs';

export const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'src', 'icons');

/** name → { category, categoryIndex, hint } in ICONS.md order */
export async function readList() {
  const listed = new Map();
  let category = '', categoryIndex = 0;
  for (const line of (await readFile(path.join(ROOT, 'ICONS.md'), 'utf8')).split('\n')) {
    const h = line.match(/^## (\d+)\. (.+)/);
    if (h) [categoryIndex, category] = [Number(h[1]), h[2].trim()];
    const m = line.match(/^- `([^`]+)`(?:\s+—\s+(.+))?/);
    if (m && categoryIndex) listed.set(m[1], { category, categoryIndex, hint: (m[2] || '').trim() });
  }
  return listed;
}

export function renderPng(svg, color, size) {
  return new Resvg(svg.replaceAll('currentColor', color), { fitTo: { mode: 'width', value: size }, font: { loadSystemFonts: false } }).render().asPng();
}

/** Loads and validates every icon (or only files starting with `prefix`). */
export async function loadIcons(listed, prefix) {
  const icons = [];
  const seen = new Set();
  const files = (await readdir(SRC)).filter((f) => f.endsWith('.mjs') && (!prefix || f.startsWith(prefix))).sort();
  if (!files.length) throw new Error(`no source files match "${prefix}"`);
  for (const file of files) {
    const mod = (await import(pathToFileURL(path.join(SRC, file)).href)).default;
    for (const [name, icon] of Object.entries(mod)) {
      const where = `"${name}" (${file})`;
      if (seen.has(name)) throw new Error(`duplicate icon ${where}`);
      if (!listed.has(name)) throw new Error(`${where} is not in ICONS.md`);
      if (!icon.o) throw new Error(`${where} has no outline`);
      if (!icon.bold && !icon.f) throw new Error(`${where} has no filled markup (set f or bold)`);
      seen.add(name);
      const ic = { name, file: file.replace('.mjs', ''), ...listed.get(name), outline: outlineSvg(name, icon), filled: filledSvg(name, icon) };
      for (const style of ['outline', 'filled']) {
        try {
          renderPng(ic[style], '#000', 24);
        } catch (e) {
          throw new Error(`${where} ${style} SVG does not render: ${e.message}`);
        }
      }
      icons.push(ic);
    }
  }
  // Keep ICONS.md order so output is stable regardless of which file an icon lives in.
  const order = [...listed.keys()];
  return icons.sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));
}
