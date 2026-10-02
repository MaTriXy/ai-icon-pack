// Package for distribution:
//   plugins/ai-icon-pack/skills/ai-icon-pack/{icons/{outline,filled}/*.svg, manifest.json}   ← the skill
//   docs/icons.js                                   ← data for the GitHub Pages gallery (docs/index.html)
//   docs/downloads/ai-icon-pack-skill.zip           ← skill zip for claude.ai upload / manual install
//   docs/downloads/ai-icon-pack-svg.zip             ← all SVGs (outline, filled, gradient)
// Usage: node scripts/package.mjs [--allow-missing]
import { mkdir, writeFile, rm, readFile, cp } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { gradientSvg } from './svg.mjs';
import { ROOT, readList, loadIcons } from './load.mjs';
import { STATE_NAMES } from '../src/states/ai-state.js';

const PLUGIN = path.join(ROOT, 'plugins', 'ai-icon-pack');
const SKILL = path.join(PLUGIN, 'skills', 'ai-icon-pack');
const DOCS = path.join(ROOT, 'docs');

const listed = await readList();
const icons = await loadIcons(listed);
const missing = [...listed.keys()].filter((n) => !icons.some((i) => i.name === n));
if (missing.length && !process.argv.includes('--allow-missing')) {
  throw new Error(`${missing.length} icons in ICONS.md are not drawn yet (e.g. ${missing.slice(0, 8).join(', ')}). Pass --allow-missing to package anyway.`);
}
const { version } = JSON.parse(await readFile(path.join(PLUGIN, '.claude-plugin', 'plugin.json'), 'utf8'));

// ── skill ──
await rm(path.join(SKILL, 'icons'), { recursive: true, force: true });
for (const style of ['outline', 'filled']) {
  await mkdir(path.join(SKILL, 'icons', style), { recursive: true });
  for (const ic of icons) await writeFile(path.join(SKILL, 'icons', style, `${ic.name}.svg`), ic[style] + '\n');
}
const manifest = {
  name: 'ai-icon-pack',
  version,
  count: icons.length,
  styles: ['outline', 'filled'],
  states: STATE_NAMES,
  icons: icons.map(({ name, category, hint }) => ({ name, category, hint })),
};
await writeFile(path.join(SKILL, 'manifest.json'), JSON.stringify(manifest, null, 1) + '\n');

// ── morphing AI states runtime → skill + site ──
await mkdir(path.join(SKILL, 'runtime'), { recursive: true });
for (const f of ['ai-state.js', 'ai-state.d.ts']) await cp(path.join(ROOT, 'src', 'states', f), path.join(SKILL, 'runtime', f));
await mkdir(DOCS, { recursive: true });
await cp(path.join(ROOT, 'src', 'states', 'ai-state.js'), path.join(DOCS, 'ai-state.js'));

// ── site data ──
await mkdir(path.join(DOCS, 'downloads'), { recursive: true });
const data = icons.map(({ name, category, hint, outline, filled }) => ({ n: name, c: category, h: hint, o: outline, f: filled }));
await writeFile(path.join(DOCS, 'icons.js'), `window.ICON_PACK=${JSON.stringify({ version, icons: data })};\n`);

// ── zips ──
function zip(srcDir, entry, outFile) {
  const winTar = 'C:\\Windows\\System32\\tar.exe';
  if (process.platform === 'win32' && existsSync(winTar)) execFileSync(winTar, ['-a', '-cf', outFile, '-C', srcDir, entry]);
  else execFileSync('zip', ['-qr', outFile, entry], { cwd: srcDir });
}
const skillZip = path.join(DOCS, 'downloads', 'ai-icon-pack-skill.zip');
await rm(skillZip, { force: true });
zip(path.dirname(SKILL), 'ai-icon-pack', skillZip);

const stage = path.join(tmpdir(), `ai-icon-pack-svg-${process.pid}`);
await rm(stage, { recursive: true, force: true });
for (const style of ['outline', 'filled']) {
  await cp(path.join(SKILL, 'icons', style), path.join(stage, 'ai-icon-pack-svg', 'svg', style), { recursive: true });
  await mkdir(path.join(stage, 'ai-icon-pack-svg', 'svg-gradient', style), { recursive: true });
  for (const ic of icons)
    await writeFile(path.join(stage, 'ai-icon-pack-svg', 'svg-gradient', style, `${ic.name}.svg`), gradientSvg(`${ic.name}-${style}`, ic[style]) + '\n');
}
const svgZip = path.join(DOCS, 'downloads', 'ai-icon-pack-svg.zip');
await rm(svgZip, { force: true });
zip(stage, 'ai-icon-pack-svg', svgZip);
await rm(stage, { recursive: true, force: true });

// ── README banner: a sample of icons, mixing ink, filled and gradient ──
{
  const pick = ['sparkles', 'chat-sparkle', 'brain', 'bot', 'regenerate', 'image-generate', 'wand-sparkles', 'agent', 'prompt', 'model', 'tokens', 'memory',
    'home', 'lock', 'settings', 'bell', 'send', 'search', 'file-sparkle', 'folder', 'user', 'shield-check', 'calendar', 'cloud-upload',
    'mail', 'heart', 'trash', 'copy', 'edit', 'code', 'chart-bar', 'microphone', 'camera', 'globe', 'rocket', 'lightbulb']
    .map((n) => icons.find((i) => i.name === n)).filter(Boolean);
  const COLS = 12, CELL = 92, PAD = 40, S = 44;
  const rows = Math.ceil(pick.length / COLS);
  const W = COLS * CELL + PAD * 2, H = rows * CELL + PAD * 2;
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="${W}" height="${H}" rx="24" fill="#fbfbfd"/>`;
  pick.forEach((ic, k) => {
    const style = k % 3 === 1 ? 'filled' : 'outline';
    let s = k % 4 === 0 ? gradientSvg(`b${k}`, ic[style]) : ic[style].replaceAll('currentColor', '#18181b');
    const x = PAD + (k % COLS) * CELL + (CELL - S) / 2, y = PAD + Math.floor(k / COLS) * CELL + (CELL - S) / 2;
    svg += s.replace('<svg ', `<svg x="${x}" y="${y}" `).replace('width="24" height="24"', `width="${S}" height="${S}"`);
  });
  const { Resvg } = await import('@resvg/resvg-js');
  await writeFile(path.join(DOCS, 'banner.png'), new Resvg(svg + '</svg>', { font: { loadSystemFonts: false } }).render().asPng());
}

console.log(`packaged ${icons.length} icons (v${version})${missing.length ? `, ${missing.length} not drawn yet` : ''}
  skill   → ${path.relative(ROOT, SKILL)}
  site    → docs/icons.js
  zips    → docs/downloads/ai-icon-pack-skill.zip, ai-icon-pack-svg.zip`);
