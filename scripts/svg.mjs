// Wraps icon source markup (see README / STYLE.md) into standalone 24×24 SVG documents.

const ROOT_ATTRS = 'xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"';
const tidy = (s) => s.replace(/\s*\n\s*/g, '');

// Black strokes in `cut` markup are knocked out of `body`.
function masked(id, body, cut) {
  return (
    `<mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">` +
    `<rect width="24" height="24" fill="#fff" stroke="none"/><g fill="none" stroke="#000">${cut}</g></mask>` +
    `<g mask="url(#${id})">${body}</g>`
  );
}

export function outlineSvg(name, icon, strokeWidth = 1.75) {
  let body = icon.o;
  if (icon.ocut) body = masked(`${name}-ocut`, body, icon.ocut);
  if (icon.otop) body += icon.otop;
  return `<svg ${ROOT_ATTRS} fill="none" stroke="currentColor" stroke-width="${strokeWidth}">${tidy(body)}</svg>`;
}

export function filledSvg(name, icon, strokeWidth = 1.75) {
  if (icon.bold) return outlineSvg(`${name}-bold`, icon, strokeWidth + 0.75);
  let body = icon.f;
  if (icon.cut) body = masked(`${name}-cut`, body, icon.cut);
  if (icon.top) body += icon.top;
  return `<svg ${ROOT_ATTRS} fill="currentColor" stroke="currentColor" stroke-width="${strokeWidth}">${tidy(body)}</svg>`;
}

/** Swap currentColor for the AI gradient (violet → indigo → cyan, top-left to bottom-right). */
export function gradientSvg(name, svg) {
  const id = `${name}-grad`;
  const defs =
    `<defs><linearGradient id="${id}" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">` +
    `<stop offset="0" stop-color="#8B5CF6"/><stop offset=".55" stop-color="#6366F1"/><stop offset="1" stop-color="#06B6D4"/></linearGradient></defs>`;
  return svg.replace(/(<svg[^>]*>)/, `$1${defs}`).replaceAll('currentColor', `url(#${id})`);
}
