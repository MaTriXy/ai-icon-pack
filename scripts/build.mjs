// Build: src/icons/*.mjs →
//   dist/svg/{outline,filled}/<name>.svg            currentColor
//   dist/svg-gradient/{outline,filled}/<name>.svg   AI gradient
//   dist/png/{black,white,gradient}/<size>/{outline,filled}/<name>.png
//   dist/sheets/<NN-category>.png, dist/preview.html
//
// Usage:
//   node scripts/build.mjs                 full build
//   node scripts/build.mjs --no-png        skip PNGs
//   node scripts/build.mjs --check 05      validate src/icons/05-*.mjs only and write dist/check/05.png (no other output, safe to run in parallel)
import { mkdir, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import { gradientSvg } from './svg.mjs';
import { ROOT, readList, loadIcons, renderPng } from './load.mjs';

const DIST = path.join(ROOT, 'dist');
const SIZES = [16, 24, 32, 48, 64, 128, 256, 512];
const STYLES = ['outline', 'filled'];
const args = process.argv.slice(2);
const checkPrefix = args.includes('--check') ? args[args.indexOf('--check') + 1] : null;
const withPng = !args.includes('--no-png') && !checkPrefix;

function sheetPng(icons, title) {
  const COLS = 6, CW = 220, CH = 132, PAD = 24, HEAD = title ? 44 : 0;
  const rows = Math.ceil(icons.length / COLS);
  const W = COLS * CW + PAD * 2, H = rows * CH + PAD * 2 + HEAD;
  const place = (svg, x, y, s) =>
    svg.replace('<svg ', `<svg x="${x}" y="${y}" `).replace('width="24" height="24"', `width="${s}" height="${s}"`).replaceAll('currentColor', '#111');
  let out = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="#fff"/>`;
  if (title) out += `<text x="${PAD + 4}" y="${PAD + 22}" font-family="Segoe UI, Arial" font-size="22" font-weight="700" fill="#111">${title}</text>`;
  icons.forEach((ic, i) => {
    const x = PAD + (i % COLS) * CW, y = PAD + HEAD + Math.floor(i / COLS) * CH;
    out += `<rect x="${x + 4}" y="${y + 4}" width="${CW - 8}" height="${CH - 8}" rx="10" fill="#f4f4f5"/>`;
    out += place(ic.outline, x + 16, y + 14, 72) + place(ic.filled, x + 100, y + 14, 72);
    out += place(ic.outline, x + 184, y + 18, 24) + place(ic.filled, x + 184, y + 50, 24);
    out += `<text x="${x + 16}" y="${y + 112}" font-family="Segoe UI, Arial" font-size="14" fill="#333">${ic.name}</text>`;
  });
  return new Resvg(out + '</svg>', { font: { loadSystemFonts: true } }).render().asPng();
}

function previewHtml(icons, total) {
  const cells = icons
    .map(
      (ic) =>
        `<figure data-name="${ic.name}" data-cat="${ic.category}"><div class="o">${ic.outline}</div><div class="f">${ic.filled}</div>` +
        `<div class="o g">${gradientSvg(`p-${ic.name}-o`, ic.outline)}</div><div class="f g">${gradientSvg(`p-${ic.name}-f`, ic.filled)}</div><figcaption>${ic.name}</figcaption></figure>`,
    )
    .join('\n');
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>AI Icon Pack</title>
<style>
:root{--bg:#fafafa;--card:#fff;--ink:#18181b;--muted:#71717a;--line:#e4e4e7;--accent:#6d28d9}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#0f0f11;--card:#18181b;--ink:#f4f4f5;--muted:#a1a1aa;--line:#27272a;--accent:#a78bfa}}
:root[data-theme="dark"]{--bg:#0f0f11;--card:#18181b;--ink:#f4f4f5;--muted:#a1a1aa;--line:#27272a;--accent:#a78bfa}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:14px/1.4 system-ui,-apple-system,"Segoe UI",sans-serif}
header{position:sticky;top:0;z-index:1;background:var(--bg);border-bottom:1px solid var(--line);padding:14px 16px;display:flex;flex-wrap:wrap;gap:10px 16px;align-items:center}
h1{font-size:16px;margin:0 8px 0 0}.count{color:var(--muted)}
input,select,button{font:inherit;color:var(--ink);background:var(--card);border:1px solid var(--line);border-radius:8px;padding:6px 10px}
input[type=search]{flex:1 1 200px;max-width:320px}button[aria-pressed=true]{border-color:var(--accent);color:var(--accent)}
main{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;padding:16px}
figure{margin:0;background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px 10px 10px;display:grid;grid-template-columns:1fr 1fr;justify-items:center;gap:8px;cursor:pointer}
figure svg{display:block;width:var(--size,32px);height:var(--size,32px);color:var(--ink)}
figure:hover{border-color:var(--accent)}figcaption{grid-column:1/-1;font-size:12px;color:var(--muted);word-break:break-all;text-align:center}
body[data-show=outline] .f,body[data-show=filled] .o{display:none}body:not([data-show=both]) figure{grid-template-columns:1fr}
body:not([data-color=gradient]) .g,body[data-color=gradient] figure>div:not(.g){display:none}
.toast{position:fixed;bottom:16px;left:50%;transform:translateX(-50%);background:var(--ink);color:var(--bg);padding:8px 14px;border-radius:8px;opacity:0;transition:opacity .2s}.toast.on{opacity:1}
</style></head>
<body data-show="both" data-color="ink">
<header><h1>AI Icon Pack</h1><span class="count">${icons.length} of ${total} drawn</span>
<input type="search" id="q" placeholder="Search icons…" aria-label="Search icons">
<span role="group" aria-label="Style"><button data-show="both" aria-pressed="true">Both</button> <button data-show="outline" aria-pressed="false">Outline</button> <button data-show="filled" aria-pressed="false">Filled</button></span>
<select id="color" aria-label="Colour"><option value="ink">Ink</option><option value="gradient">AI gradient</option></select>
<select id="size" aria-label="Size"><option>16</option><option>24</option><option selected>32</option><option>48</option><option>64</option></select>
<button id="theme">Theme</button></header>
<main>${cells}</main><div class="toast" id="toast"></div>
<script>
const q=document.getElementById('q'),figs=[...document.querySelectorAll('figure')];
q.oninput=()=>{const t=q.value.trim().toLowerCase();figs.forEach(f=>f.hidden=t&&!(f.dataset.name.includes(t)||f.dataset.cat.toLowerCase().includes(t)))};
document.querySelectorAll('button[data-show]').forEach(b=>b.onclick=()=>{document.body.dataset.show=b.dataset.show;document.querySelectorAll('button[data-show]').forEach(x=>x.setAttribute('aria-pressed',x===b))});
document.getElementById('color').onchange=e=>document.body.dataset.color=e.target.value;
document.getElementById('size').onchange=e=>document.querySelector('main').style.setProperty('--size',e.target.value+'px');
document.getElementById('theme').onclick=()=>{const r=document.documentElement,d=r.dataset.theme==='dark'||(!r.dataset.theme&&matchMedia('(prefers-color-scheme: dark)').matches);r.dataset.theme=d?'light':'dark'};
const toast=document.getElementById('toast');
figs.forEach(f=>f.onclick=()=>{const g=document.body.dataset.color==='gradient'?'.g':':not(.g)';const sel=(document.body.dataset.show==='filled'?'.f':'.o')+g+' svg';navigator.clipboard?.writeText(f.querySelector(sel).outerHTML).then(()=>{toast.textContent='Copied '+f.dataset.name+' SVG';toast.classList.add('on');setTimeout(()=>toast.classList.remove('on'),1200)}).catch(()=>{})});
</script></body></html>`;
}

const listed = await readList();

if (checkPrefix) {
  const icons = await loadIcons(listed, checkPrefix);
  await mkdir(path.join(DIST, 'check'), { recursive: true });
  const out = path.join(DIST, 'check', `${checkPrefix}.png`);
  await writeFile(out, sheetPng(icons, `${icons[0].file} — ${icons.length} icons`));
  const want = [...listed].filter(([, v]) => v.category === icons[0].category).map(([n]) => n);
  const missing = want.filter((n) => !icons.some((ic) => ic.name === n));
  console.log(`OK ${icons.length} icons valid → ${path.relative(ROOT, out)}`);
  if (missing.length) console.log(`Not yet drawn in "${icons[0].category}" (${missing.length}): ${missing.join(', ')}`);
  process.exit(0);
}

const icons = await loadIcons(listed);
await rm(DIST, { recursive: true, force: true });

let pngCount = 0;
for (const ic of icons) {
  for (const style of STYLES) {
    const svg = ic[style];
    const grad = gradientSvg(`${ic.name}-${style}`, svg);
    await mkdir(path.join(DIST, 'svg', style), { recursive: true });
    await mkdir(path.join(DIST, 'svg-gradient', style), { recursive: true });
    await writeFile(path.join(DIST, 'svg', style, `${ic.name}.svg`), svg + '\n');
    await writeFile(path.join(DIST, 'svg-gradient', style, `${ic.name}.svg`), grad + '\n');
    if (!withPng) continue;
    for (const [variant, src] of [['black', svg.replaceAll('currentColor', '#000000')], ['white', svg.replaceAll('currentColor', '#FFFFFF')], ['gradient', grad]]) {
      for (const size of SIZES) {
        const dir = path.join(DIST, 'png', variant, String(size), style);
        await mkdir(dir, { recursive: true });
        await writeFile(path.join(dir, `${ic.name}.png`), renderPng(src, '#000', size));
        pngCount++;
      }
    }
  }
}

await writeFile(path.join(DIST, 'preview.html'), previewHtml(icons, listed.size));
await mkdir(path.join(DIST, 'sheets'), { recursive: true });
for (const file of [...new Set(icons.map((ic) => ic.file))]) {
  const group = icons.filter((ic) => ic.file === file);
  await writeFile(path.join(DIST, 'sheets', `${file}.png`), sheetPng(group, `${file} — ${group.length} icons`));
}

console.log(`${icons.length}/${listed.size} icons → ${icons.length * 4} SVGs (incl. gradient), ${pngCount} PNGs, preview.html, sheets/`);
