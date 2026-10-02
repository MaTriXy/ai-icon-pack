import { star, gear } from '../helpers.mjs';
import { BUBBLE, BODY, BADGE, BADGE_CLEAR, SLASH, SLASH_CLEAR, PAGE, PAGE_FOLD, PAGE_FOLD_CUT, SHIELD, CLOUD, LENS, LENS_HANDLE, DATABASE } from '../shapes.mjs';

// ── Local helpers & shared shapes for this category ──────────────────────────
const r2 = (v) => +v.toFixed(2);
const P = (x, y) => `${r2(x)} ${r2(y)}`;

/** Isometric cube (pointy top): `hex` silhouette and `y` inner edges. */
function cube(cx, cy, r) {
  const s = 0.866 * r;
  const hex = `M${P(cx, cy - r)}L${P(cx + s, cy - r / 2)}L${P(cx + s, cy + r / 2)}L${P(cx, cy + r)}L${P(cx - s, cy + r / 2)}L${P(cx - s, cy - r / 2)}Z`;
  const y = `M${P(cx - s, cy - r / 2)}L${P(cx, cy)}L${P(cx + s, cy - r / 2)}M${P(cx, cy)}V${r2(cy + r)}`;
  return { hex, y };
}

/** Straight line from a to b, trimmed by g1 at the start and g2 at the end. */
function seg(x1, y1, x2, y2, g1 = 0, g2 = 0) {
  const L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L;
  return `M${P(x1 + ux * g1, y1 + uy * g1)}L${P(x2 - ux * g2, y2 - uy * g2)}`;
}

// Left hemisphere of `brain` (identical geometry), used by brain-circuit.
const BRAIN_L = 'M12 5.5C12 4 10.8 3 9.5 3 8 3 6.9 4.1 6.9 5.4 5.2 5.6 4 7 4 8.7c0 .8.3 1.5.7 2.1C3.7 11.4 3 12.6 3 13.9c0 1.6.9 3 2.3 3.6C5.5 19.5 7.1 21 9 21c1.7 0 3-1.3 3-3Z';
const BRAIN_L_FOLDS = 'M6.9 5.4c0 1.1.6 2 1.5 2.5M4.7 10.8c.7.7 1.7 1.2 2.8 1.2M5.3 17.5c.7-.3 1.5-.5 2.3-.5';
const BRAIN_R = 'M12 5.5C12 4 13.2 3 14.5 3 16 3 17.1 4.1 17.1 5.4 18.8 5.6 20 7 20 8.7c0 .8-.3 1.5-.7 2.1 1 .6 1.7 1.8 1.7 3.1 0 1.6-.9 3-2.3 3.6-.2 2-1.8 3.5-3.7 3.5-1.7 0-3-1.3-3-3Z';
const BRAIN_R_FOLDS = 'M17.1 5.4c0 1.1-.6 2-1.5 2.5M19.3 10.8c-.7.7-1.7 1.2-2.8 1.2M18.7 17.5c-.7-.3-1.5-.5-2.3-.5';

/** Self-contained knockout for shapes drawn in `top` (front objects of overlapping pairs). */
function knock(id, body, holes) {
  return `<mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#fff" stroke="none"/><g fill="none" stroke="#000">${holes}</g></mask><g mask="url(#${id})">${body}</g>`;
}

// Prompt family: box, ">" chevron, spark in the content slot.
const PROMPT_BOX = '<rect x="3" y="4.5" width="18" height="15" rx="2.5"/>';
const PROMPT_CHEV = 'M6 9.5 8.5 12 6 14.5';
const BOOKMARK = 'M5 5.5A2.5 2.5 0 0 1 7.5 3h9A2.5 2.5 0 0 1 19 5.5V21l-7-4.5L5 21Z';
const hex = (cx, cy, r) => { let d = ''; for (let i = 0; i < 6; i++) { const a = (-90 + 60 * i) * Math.PI / 180; d += (i ? 'L' : 'M') + P(cx + r * Math.cos(a), cy + r * Math.sin(a)); } return d + 'Z'; };

const BULB = 'M9.25 17.5v-.9c0-.9-.7-1.6-1.75-2.41A6.5 6.5 0 1 1 16.5 14.19c-1.05.81-1.75 1.51-1.75 2.41v.9Z';
const BULB_BASE = 'M9.5 20.5h5';
// Open-end wrench in local coords: head at origin, jaw opening +y, handle toward -y.
const WRENCH = 'M-1.25 3.27V0h2.5v3.27A3.5 3.5 0 0 0 1.5-3.16V-13a1.5 1.5 0 0 0-3 0v9.84a3.5 3.5 0 0 0 .25 6.43Z';

// Loop-arrow badge glyph (regenerate's arrow at badge size), centred on (18,18).
const LOOP_BADGE = 'M21.25 18a3.25 3.25 0 1 1-1.06-2.4l1.06.98M21.25 14.75v1.83h-1.83';

// Icon source format (see README):
//   o    outline markup (root: fill none, stroke currentColor 1.75, round caps/joins)
//   f    filled markup  (root: fill + stroke currentColor 1.75 — so a filled shape matches the outline silhouette)
//   cut  knockout markup for the filled style (root: stroke black 1.75, fill none) — masked out of `f`
//   top  markup drawn over the filled style after the knockout
//   bold true → filled style is the outline at stroke 2.5 (for pure line icons)

export default {
  sparkles: {
    o: `<path d="${star(10, 14, 7)}"/><path d="${star(18, 6, 3)}"/><circle cx="19.5" cy="17.5" r="1"/>`,
    f: `<path d="${star(10, 14, 7)}"/><path d="${star(18, 6, 3)}"/><circle cx="19.5" cy="17.5" r="1"/>`,
  },

  'wand-sparkles': {
    o: `<g transform="rotate(45 10 14)"><rect x="8.75" y="6" width="2.5" height="16" rx="1"/><path d="M8.75 10h2.5"/></g>
        <path d="${star(20, 11.5, 2.5)}"/><path d="${star(12.5, 4, 2)}"/><circle cx="19.5" cy="5" r=".5"/>`,
    f: `<rect transform="rotate(45 10 14)" x="8.75" y="6" width="2.5" height="16" rx="1"/>
        <path d="${star(20, 11.5, 2.5)}"/><path d="${star(12.5, 4, 2)}"/><circle cx="19.5" cy="5" r=".5"/>`,
    cut: `<path transform="rotate(45 10 14)" d="M7.5 10h5" stroke-width="1.25"/>`,
  },

  brain: {
    o: `<path d="M12 5.5C12 4 10.8 3 9.5 3 8 3 6.9 4.1 6.9 5.4 5.2 5.6 4 7 4 8.7c0 .8.3 1.5.7 2.1C3.7 11.4 3 12.6 3 13.9c0 1.6.9 3 2.3 3.6C5.5 19.5 7.1 21 9 21c1.7 0 3-1.3 3-3Z"/>
        <path d="M12 5.5C12 4 13.2 3 14.5 3 16 3 17.1 4.1 17.1 5.4 18.8 5.6 20 7 20 8.7c0 .8-.3 1.5-.7 2.1 1 .6 1.7 1.8 1.7 3.1 0 1.6-.9 3-2.3 3.6-.2 2-1.8 3.5-3.7 3.5-1.7 0-3-1.3-3-3Z"/>
        <path d="M6.9 5.4c0 1.1.6 2 1.5 2.5M4.7 10.8c.7.7 1.7 1.2 2.8 1.2M5.3 17.5c.7-.3 1.5-.5 2.3-.5M17.1 5.4c0 1.1-.6 2-1.5 2.5M19.3 10.8c-.7.7-1.7 1.2-2.8 1.2M18.7 17.5c-.7-.3-1.5-.5-2.3-.5"/>`,
    f: `<path d="M12 5.5C12 4 10.8 3 9.5 3 8 3 6.9 4.1 6.9 5.4 5.2 5.6 4 7 4 8.7c0 .8.3 1.5.7 2.1C3.7 11.4 3 12.6 3 13.9c0 1.6.9 3 2.3 3.6C5.5 19.5 7.1 21 9 21c1.7 0 3-1.3 3-3Z"/>
        <path d="M12 5.5C12 4 13.2 3 14.5 3 16 3 17.1 4.1 17.1 5.4 18.8 5.6 20 7 20 8.7c0 .8-.3 1.5-.7 2.1 1 .6 1.7 1.8 1.7 3.1 0 1.6-.9 3-2.3 3.6-.2 2-1.8 3.5-3.7 3.5-1.7 0-3-1.3-3-3Z"/>`,
    cut: `<path stroke-width="1.5" d="M12 3v19M6.9 5.4c0 1.1.6 2 1.5 2.5M4.7 10.8c.7.7 1.7 1.2 2.8 1.2M5.3 17.5c.7-.3 1.5-.5 2.3-.5M17.1 5.4c0 1.1-.6 2-1.5 2.5M19.3 10.8c-.7.7-1.7 1.2-2.8 1.2M18.7 17.5c-.7-.3-1.5-.5-2.3-.5"/>`,
  },

  // Spark as the antenna tip.
  bot: {
    o: `<rect x="5" y="9" width="14" height="11" rx="3.5"/><path d="M12 9V7.5"/><path d="${star(12, 5, 2.25)}"/>
        <path d="M2.5 13.5v3M21.5 13.5v3M9.5 13.5v1.5M14.5 13.5v1.5M10.5 17.5h3"/>`,
    f: `<rect x="5" y="9" width="14" height="11" rx="3.5"/><path d="${star(12, 5, 2.25)}"/>`,
    cut: `<path d="M9.5 13.5v1.5M14.5 13.5v1.5M10.5 17.5h3"/>`,
    top: `<path d="M12 9V7.5M2.5 13.5v3M21.5 13.5v3"/>`,
  },

  regenerate: {
    o: `<path d="M20 12a8 8 0 1 1-2.6-5.9L20 8.5"/><path d="M20 4v4.5h-4.5"/><path d="${star(12, 12, 3.5)}"/>`,
    f: `<path fill="none" stroke-width="2.25" d="M20 12a8 8 0 1 1-2.6-5.9L20 8.5"/><path fill="none" stroke-width="2.25" d="M20 4v4.5h-4.5"/><path d="${star(12, 12, 3.5)}"/>`,
  },

  'image-generate': {
    // Same frame and spark placement as the other *-generate icons (01b-ai-core GEN_FRAME).
    o: `<rect x="3" y="6" width="15" height="15" rx="2.5"/><circle cx="7.5" cy="10.5" r="1.5"/><path d="m18 16.5-2.9-2.9a1.5 1.5 0 0 0-2.1 0L6 21"/>`,
    ocut: `<path d="${star(17.5, 6.5, 3.5)}" fill="#000" stroke-width="4.5"/>`,
    otop: `<path d="${star(17.5, 6.5, 3.5)}"/>`,
    f: `<rect x="3" y="6" width="15" height="15" rx="2.5"/>`,
    cut: `<path d="${star(17.5, 6.5, 3.5)}" fill="#000" stroke-width="4.5"/><path stroke-width="1.5" d="m18 16.5-2.9-2.9a1.5 1.5 0 0 0-2.1 0L6 21"/><circle cx="7.5" cy="10.5" r="1.75" fill="#000" stroke="none"/>`,
    top: `<path d="${star(17.5, 6.5, 3.5)}"/>`,
  },

  'stop-generating': {
    o: `<circle cx="12" cy="12" r="9"/><rect x="9" y="9" width="6" height="6" rx="1"/>`,
    f: `<circle cx="12" cy="12" r="9"/>`,
    cut: `<rect x="8.5" y="8.5" width="7" height="7" rx="1.5" fill="#000" stroke="none"/>`,
  },

  // ── Batch: sparkle … compare-models ─────────────────────────────────────────
  sparkle: {
    o: `<path d="${star(12, 12, 9)}"/>`,
    f: `<path d="${star(12, 12, 9)}"/>`,
  },

  // One hero spark at the tip (wand-sparkles has the small cluster).
  'magic-wand': {
    o: `<g transform="rotate(45 9 15)"><rect x="7.75" y="8.75" width="2.5" height="12.5" rx="1"/><path d="M7.75 12.75h2.5"/></g><path d="${star(17.25, 6.75, 3.75)}"/>`,
    f: `<rect transform="rotate(45 9 15)" x="7.75" y="8.75" width="2.5" height="12.5" rx="1"/><path d="${star(17.25, 6.75, 3.75)}"/>`,
    cut: `<path transform="rotate(45 9 15)" d="M6.5 12.75h5" stroke-width="1.25"/>`,
  },

  'brain-circuit': {
    o: `<path d="${BRAIN_L}"/><path d="${BRAIN_L_FOLDS}"/>
        <path d="M12 5.5h6M12 18h6M12 11.75h1"/><circle cx="19.5" cy="5.5" r="1.25"/><circle cx="19.5" cy="18" r="1.25"/><path d="${star(16.5, 11.75, 3.5)}"/>`,
    f: `<path d="${BRAIN_L}"/><path d="M12 5.5h6M12 18h6M12 11.75h1"/><circle cx="19.5" cy="5.5" r="1.25"/><circle cx="19.5" cy="18" r="1.25"/><path d="${star(16.5, 11.75, 3.5)}"/>`,
    cut: `<path stroke-width="1.5" d="${BRAIN_L_FOLDS}"/>`,
  },

  robot: {
    o: `<rect x="3.5" y="8" width="17" height="12.5" rx="2.5"/><path d="M12 8V6"/><circle cx="12" cy="4.5" r="1.5"/>
        <circle cx="8.5" cy="12.75" r="1.5"/><circle cx="15.5" cy="12.75" r="1.5"/><path d="M9.5 17.25h5"/>`,
    f: `<rect x="3.5" y="8" width="17" height="12.5" rx="2.5"/><path d="M12 8V6"/><circle cx="12" cy="4.5" r="1.5"/>`,
    cut: `<circle cx="8.5" cy="12.75" r="1.75" fill="#000" stroke="none"/><circle cx="15.5" cy="12.75" r="1.75" fill="#000" stroke="none"/><path d="M9.5 17.25h5"/>`,
  },

  'bot-message': {
    o: `<path d="${BUBBLE}"/><path d="M9.5 8.75v1.75M14.5 8.75v1.75M10.5 13.5h3"/>`,
    f: `<path d="${BUBBLE}"/>`,
    cut: `<path d="M9.5 8.75v1.75M14.5 8.75v1.75M10.5 13.5h3"/>`,
  },

  // The spark is the assistant's head.
  assistant: {
    o: `<path d="${star(12, 7, 4)}"/><path d="${BODY}"/>`,
    f: `<path d="${star(12, 7, 4)}"/><path d="${BODY}Z"/>`,
  },

  // Bot + loop badge (autonomous loop).
  agent: {
    o: `<rect x="3.5" y="8.5" width="13" height="10.5" rx="3.5"/><path d="M10 8.5V7.25"/><path d="${star(10, 5, 2.25)}"/>
        <path d="M7.5 12.5v1.5M12.5 12.5v1.5M8.5 16h3"/>`,
    ocut: BADGE_CLEAR,
    otop: `<path d="${LOOP_BADGE}"/>`,
    f: `<rect x="3.5" y="8.5" width="13" height="10.5" rx="3.5"/><path d="M10 8.5V7.25"/><path d="${star(10, 5, 2.25)}"/>`,
    cut: `<path d="M7.5 12.5v1.5M12.5 12.5v1.5M8.5 16h3"/>${BADGE_CLEAR}`,
    top: `<path fill="none" d="${LOOP_BADGE}"/>`,
  },

  // Front bot (spark antenna) with a second bot behind.
  agents: {
    o: `<rect x="14" y="3.5" width="7" height="8" rx="2.5"/><path d="M16 6.25v1.5M19 6.25v1.5"/>`,
    ocut: `<rect x="3" y="10" width="11.5" height="10" rx="3.5" fill="#000" stroke-width="4.5"/>`,
    otop: `<rect x="3" y="10" width="11.5" height="10" rx="3.5"/><path d="M8.75 10V8.25"/><path d="${star(8.75, 6, 2.25)}"/><path d="M6.75 13.75v1.5M10.75 13.75v1.5M7.75 17.5h2"/>`,
    f: `<rect x="14" y="3.5" width="7" height="8" rx="2.5"/>`,
    cut: `<path d="M16 6.25v1.5M19 6.25v1.5"/><rect x="3" y="10" width="11.5" height="10" rx="3.5" fill="#000" stroke-width="4.5"/>`,
    // Front face knocked out with its own mask (the front bot is drawn in `top`).
    top: `<mask id="agents-face" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#fff" stroke="none"/><path d="M6.75 13.75v1.5M10.75 13.75v1.5M7.75 17.5h2" stroke="#000" fill="none"/></mask>
        <rect mask="url(#agents-face)" x="3" y="10" width="11.5" height="10" rx="3.5"/><path d="M8.75 10V8.25"/><path d="${star(8.75, 6, 2.25)}"/>`,
  },

  cpu: {
    o: `<rect x="5.5" y="5.5" width="13" height="13" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1.5"/>
        <path d="M9 3v2.5M12 3v2.5M15 3v2.5M9 18.5V21M12 18.5V21M15 18.5V21M3 9h2.5M3 12h2.5M3 15h2.5M18.5 9H21M18.5 12H21M18.5 15H21"/>`,
    f: `<rect x="5.5" y="5.5" width="13" height="13" rx="2"/>
        <path d="M9 3v2.5M12 3v2.5M15 3v2.5M9 18.5V21M12 18.5V21M15 18.5V21M3 9h2.5M3 12h2.5M3 15h2.5M18.5 9H21M18.5 12H21M18.5 15H21"/>`,
    cut: `<rect x="9" y="9" width="6" height="6" rx="1.5" stroke-width="1.5"/>`,
  },

  gpu: {
    o: `<rect x="3" y="4.5" width="18" height="13" rx="2.5"/><circle cx="9.75" cy="11" r="3.5"/><path d="${star(9.75, 11, 3.5)}"/>
        <path d="M17.25 8.5v5M7.5 17.5v3M10.5 17.5v3M13.5 17.5v3"/>`,
    f: `<rect x="3" y="4.5" width="18" height="13" rx="2.5"/><path d="M7.5 17.5v3M10.5 17.5v3M13.5 17.5v3"/>`,
    cut: `<circle cx="9.75" cy="11" r="3.5" stroke-width="1.5"/><path d="${star(9.75, 11, 3.5)}" fill="#000" stroke-width="1"/><path d="M17.25 8.5v5" stroke-width="1.5"/>`,
  },

  'chip-sparkle': {
    o: `<rect x="5.5" y="5.5" width="13" height="13" rx="2"/><path d="${star(12, 12, 3.5)}"/>
        <path d="M9 3v2.5M12 3v2.5M15 3v2.5M9 18.5V21M12 18.5V21M15 18.5V21M3 9h2.5M3 12h2.5M3 15h2.5M18.5 9H21M18.5 12H21M18.5 15H21"/>`,
    f: `<rect x="5.5" y="5.5" width="13" height="13" rx="2"/>
        <path d="M9 3v2.5M12 3v2.5M15 3v2.5M9 18.5V21M12 18.5V21M15 18.5V21M3 9h2.5M3 12h2.5M3 15h2.5M18.5 9H21M18.5 12H21M18.5 15H21"/>`,
    cut: `<path d="${star(12, 12, 3.75)}" fill="#000" stroke-width="1"/>`,
  },

  // Two hidden layers feeding a spark output.
  'neural-network': (() => {
    const A = [[4.75, 7.5], [4.75, 16.5]], B = [[11, 4.5], [11, 12], [11, 19.5]], S = [18, 12];
    const nodes = [...A, ...B].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.75"/>`).join('');
    const e = [[A[0], B[0]], [A[0], B[1]], [A[1], B[1]], [A[1], B[2]]].map(([a, b]) => seg(a[0], a[1], b[0], b[1], 1.75, 1.75)).join('')
      + seg(B[0][0], B[0][1], S[0] - 1.6, S[1] - 1.6, 1.75, 0) + seg(B[1][0], B[1][1], S[0] - 3.5, S[1], 1.75, 1.25) + seg(B[2][0], B[2][1], S[0] - 1.6, S[1] + 1.6, 1.75, 0);
    return {
      o: `${nodes}<path d="${e}"/><path d="${star(S[0], S[1], 3.75)}"/>`,
      f: `${nodes}<path d="${e}"/><path d="${star(S[0], S[1], 3.75)}"/>`,
    };
  })(),

  model: (() => {
    const c = cube(9, 14.75, 6.25);
    return {
      o: `<path d="${c.hex}"/><path d="${c.y}"/><path d="${star(17.5, 6.5, 3.5)}"/>`,
      f: `<path d="${c.hex}"/><path d="${star(17.5, 6.5, 3.5)}"/>`,
      cut: `<path d="${c.y}" stroke-width="1.5"/>`,
    };
  })(),

  'model-switch': (() => {
    const a = cube(7.25, 7.25, 4.25), b = cube(16.75, 16.75, 4.25);
    const arrows = 'M14 4.75h2.5a1.5 1.5 0 0 1 1.5 1.5V9.5M16.5 8l1.5 1.5L19.5 8M10 19.25H7.5A1.5 1.5 0 0 1 6 17.75V14.5M7.5 16 6 14.5 4.5 16';
    return {
      o: `<path d="${a.hex}"/><path d="${a.y}"/><path d="${b.hex}"/><path d="${b.y}"/><path d="${arrows}"/>`,
      f: `<path d="${a.hex}"/><path d="${b.hex}"/><path fill="none" d="${arrows}"/>`,
      cut: `<path d="${a.y}${b.y}" stroke-width="1.5"/>`,
    };
  })(),

  'compare-models': (() => {
    const a = cube(6.5, 12, 4), b = cube(17.5, 12, 4);
    return {
      o: `<path d="${a.hex}"/><path d="${a.y}"/><path d="${b.hex}"/><path d="${b.y}"/><path d="M12 3v3.5M12 17.5V21M12 12h.01"/>`,
      f: `<path d="${a.hex}"/><path d="${b.hex}"/><path d="M12 3v3.5M12 17.5V21M12 12h.01"/>`,
      cut: `<path d="${a.y}${b.y}" stroke-width="1.5"/>`,
    };
  })(),

  // ── Batch: prompt … thinking ────────────────────────────────────────────────
  prompt: {
    o: `${PROMPT_BOX}<path d="${PROMPT_CHEV}"/><path d="${star(15, 12, 3.5)}"/>`,
    f: PROMPT_BOX,
    cut: `<path d="${PROMPT_CHEV}"/><path d="${star(15, 12, 3.75)}" fill="#000" stroke-width="1"/>`,
  },

  'prompt-library': {
    o: `<rect x="3" y="7.5" width="15" height="13.5" rx="2.5"/><path d="M6 4.5h12.5A2.5 2.5 0 0 1 21 7v11"/><path d="M6 11.75l2.5 2.5L6 16.75M11.5 16.75h3.5"/>`,
    f: `<rect x="3" y="7.5" width="15" height="13.5" rx="2.5"/><path fill="none" d="M6 4.5h12.5A2.5 2.5 0 0 1 21 7v11"/>`,
    cut: `<path d="M6 11.75l2.5 2.5L6 16.75M11.5 16.75h3.5"/>`,
  },

  // Template slot: braces around the spark.
  'prompt-template': (() => {
    const braces = 'M7.75 3.75H7a2 2 0 0 0-2 2V10a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4.25a2 2 0 0 0 2 2h.75M16.25 3.75H17a2 2 0 0 1 2 2V10a2 2 0 0 0 2 2 2 2 0 0 0-2 2v4.25a2 2 0 0 1-2 2h-.75';
    return {
      o: `<path d="${braces}"/><path d="${star(12, 12, 3.75)}"/>`,
      f: `<path fill="none" d="${braces}"/><path d="${star(12, 12, 3.75)}"/>`,
    };
  })(),

  // Gear takes the spark's slot in the prompt box.
  'system-prompt': {
    o: `${PROMPT_BOX}<path d="${PROMPT_CHEV}"/><path d="${gear(15, 12, 8, 3.75, 2.75, 0.16, 0.27)}"/>`,
    f: PROMPT_BOX,
    cut: `<path d="${PROMPT_CHEV}"/><path d="${gear(15, 12, 8, 3.75, 2.75, 0.16, 0.27)}" fill="#000" stroke-width="1"/>`,
  },

  'context-window': {
    o: `<path d="M7.5 3.5H6a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h1.5M16.5 3.5H18a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-1.5"/><path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4.5"/>`,
    bold: true,
  },

  // Two hex chips; the front one carries the spark.
  tokens: {
    o: `<path d="${hex(14, 10.25, 7.25)}"/>`,
    ocut: `<path d="${hex(10, 13.75, 7.25)}" fill="#000" stroke-width="4.5"/>`,
    otop: `<path d="${hex(10, 13.75, 7.25)}"/><path d="${star(10, 13.75, 3.5)}"/>`,
    f: `<path d="${hex(14, 10.25, 7.25)}"/>`,
    cut: `<path d="${hex(10, 13.75, 7.25)}" fill="#000" stroke-width="4.5"/>`,
    top: knock('tokens-front', `<path d="${hex(10, 13.75, 7.25)}"/>`, `<path d="${star(10, 13.75, 3.75)}" fill="#000" stroke-width="1"/>`),
  },

  temperature: {
    o: `<path d="M11 14.35V6a3 3 0 0 0-6 0v8.35a4 4 0 1 0 6 0Z"/><path d="M8 17V9.5"/><path d="${star(17.5, 7.25, 3.5)}"/>`,
    f: `<path d="M11 14.35V6a3 3 0 0 0-6 0v8.35a4 4 0 1 0 6 0Z"/><path d="${star(17.5, 7.25, 3.5)}"/>`,
    cut: `<path d="M8 17V9.5"/>`,
  },

  // Points in a 3-axis space; one point is the spark.
  embedding: {
    o: `<path d="M7 16V3.5M7 16h13.5M7 16l-3.5 3.5"/><path d="M10.5 11.5h.01M16.5 14h.01" stroke-width="2.75"/><path d="${star(16, 7.5, 3.5)}"/>`,
    f: `<path d="M7 16V3.5M7 16h13.5M7 16l-3.5 3.5"/><path d="M10.5 11.5h.01M16.5 14h.01" stroke-width="3.25"/><path d="${star(16, 7.5, 3.5)}"/>`,
  },

  vector: {
    o: `<path d="M4 3.5V20h16.5"/><path d="M4 20 17 7M11.5 7H17v5.5"/>`,
    bold: true,
  },

  'vector-database': (() => {
    const dots = 'M8 10.75h.01M12 11.5h.01M16 10.75h.01M8 17.25h.01M12 18h.01M16 17.25h.01';
    return {
      o: `${DATABASE}<path d="${dots}" stroke-width="2.5"/>`,
      f: DATABASE,
      cut: `<path stroke-width="1.5" d="M4.5 5.5c0 1.5 3.4 2.75 7.5 2.75s7.5-1.25 7.5-2.75M4.5 12c0 1.5 3.4 2.75 7.5 2.75s7.5-1.25 7.5-2.75"/><path d="${dots}" stroke-width="2.5"/>`,
    };
  })(),

  'knowledge-base': {
    o: `<path d="M5 18.5v-13A2.5 2.5 0 0 1 7.5 3H19v18H7.5a2.5 2.5 0 0 1 0-5H19"/><path d="${star(12, 9.5, 3.5)}"/>`,
    f: `<path d="M5 18.5v-13A2.5 2.5 0 0 1 7.5 3H19v18H7.5A2.5 2.5 0 0 1 5 18.5Z"/>`,
    cut: `<path d="M7.5 16H19" stroke-width="1.5"/><path d="${star(12, 9.5, 3.75)}" fill="#000" stroke-width="1"/>`,
  },

  // RAG: the spark pulls content out of the document.
  retrieval: {
    o: `<path d="${PAGE}"/><path d="${PAGE_FOLD}"/><path d="${star(10.75, 11.75, 3.5)}"/>`,
    ocut: BADGE_CLEAR,
    otop: '<path d="m15 15 5 5M20 15.5V20h-4.5"/>',
    f: `<path d="${PAGE}"/>`,
    cut: `<path d="${PAGE_FOLD_CUT}" stroke-width="1.5"/><path d="${star(10.75, 11.75, 3.75)}" fill="#000" stroke-width="1"/>${BADGE_CLEAR}`,
    top: '<path fill="none" d="m15 15 5 5M20 15.5V20h-4.5"/>',
  },

  memory: {
    o: `<path d="${BOOKMARK}"/><path d="${star(12, 9.75, 3.5)}"/>`,
    f: `<path d="${BOOKMARK}"/>`,
    cut: `<path d="${star(12, 9.75, 3.75)}" fill="#000" stroke-width="1"/>`,
  },

  'memory-off': {
    o: `<path d="${BOOKMARK}"/>`,
    ocut: SLASH_CLEAR,
    otop: SLASH,
    f: `<path d="${BOOKMARK}"/>`,
    cut: SLASH_CLEAR,
    top: SLASH,
  },

  thinking: {
    o: `<ellipse cx="13" cy="9.25" rx="8" ry="6"/><circle cx="7" cy="17.5" r="1.5"/><circle cx="4.25" cy="20.25" r=".75"/><path d="M9.5 9.25h.01M13 9.25h.01M16.5 9.25h.01" stroke-width="2.5"/>`,
    f: `<ellipse cx="13" cy="9.25" rx="8" ry="6"/><circle cx="7" cy="17.5" r="1.5"/><circle cx="4.25" cy="20.25" r=".75"/>`,
    cut: `<path d="M9.5 9.25h.01M13 9.25h.01M16.5 9.25h.01" stroke-width="2.5"/>`,
  },

  // ── Batch: reasoning … data-labeling ───────────────────────────────────────
  reasoning: {
    o: `<path d="${BULB}"/><path d="${BULB_BASE}"/><path d="${gear(12, 9.5, 8, 3.5, 2.6, 0.16, 0.28)}"/>`,
    f: `<path d="${BULB}"/><path d="${BULB_BASE}"/>`,
    cut: `<path d="${gear(12, 9.5, 8, 3.5, 2.6, 0.16, 0.28)}" fill="#000" stroke-width="1"/>`,
  },

  // Zigzag of steps ending in the spark (the conclusion).
  'chain-of-thought': (() => {
    const N = [[5, 19], [12, 16.5], [7, 10.5]];
    const e = seg(...N[0], ...N[1], 1.75, 1.75) + seg(...N[1], ...N[2], 1.75, 1.75) + seg(...N[2], 14.56, 7.94, 1.75, 1.25);
    const nodes = N.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.75"/>`).join('');
    return {
      o: `${nodes}<path d="${e}"/><path d="${star(16.5, 6.5, 4)}"/>`,
      f: `${nodes}<path d="${e}"/><path d="${star(16.5, 6.5, 4)}"/>`,
    };
  })(),

  planning: {
    o: `<path d="${star(6.5, 6.5, 3.5)}"/><path d="M13 6.5h7.5M12 14h8.5M12 19.25h8.5"/><path d="m4.25 14 1.5 1.5 3-3M4.25 19.25l1.5 1.5 3-3"/>`,
    f: `<path d="${star(6.5, 6.5, 3.5)}"/><path d="M13 6.5h7.5M12 14h8.5M12 19.25h8.5"/><path d="m4.25 14 1.5 1.5 3-3M4.25 19.25l1.5 1.5 3-3" fill="none"/>`,
  },

  'tool-use': {
    o: `<path transform="translate(7.25 17) rotate(45)" d="${WRENCH}"/><path d="${star(6.75, 6.75, 3.5)}"/>`,
    f: `<path transform="translate(7.25 17) rotate(45)" d="${WRENCH}"/><path d="${star(6.75, 6.75, 3.5)}"/>`,
  },

  'function-call': {
    o: '<path d="M9.5 4.5H9a3 3 0 0 0-3 3V20M3.5 10.5h5M13 5c-2.25 3.75-2.25 10.25 0 14M19 5c2.25 3.75 2.25 10.25 0 14M14.25 10l3.25 4.5M17.5 10l-3.25 4.5"/>',
    bold: true,
  },

  plugin: {
    o: `<path d="M4 9a2 2 0 0 1 2-2h3a2.25 2.25 0 1 1 3 0h3a2 2 0 0 1 2 2v3a2.25 2.25 0 1 1 0 3v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/><path d="${star(10.5, 13.5, 3.5)}"/>`,
    f: '<path d="M4 9a2 2 0 0 1 2-2h3a2.25 2.25 0 1 1 3 0h3a2 2 0 0 1 2 2v3a2.25 2.25 0 1 1 0 3v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/>',
    cut: `<path d="${star(10.5, 13.5, 3.75)}" fill="#000" stroke-width="1"/>`,
  },

  // Plug and socket about to join, on the diagonal.
  connector: {
    o: '<g transform="rotate(-45 12 12)"><path d="M10 8.5H8a3.5 3.5 0 0 0 0 7h2ZM15.5 8.5h.5a3.5 3.5 0 0 1 0 7h-.5Z"/><path d="M1.5 12h3M19.5 12h3M10 10.5h2.5M10 13.5h2.5"/></g>',
    f: '<g transform="rotate(-45 12 12)"><path d="M10 8.5H8a3.5 3.5 0 0 0 0 7h2ZM15.5 8.5h.5a3.5 3.5 0 0 1 0 7h-.5Z"/><path d="M1.5 12h3M19.5 12h3M10 10.5h2.5M10 13.5h2.5"/></g>',
  },

  // Server rack + plug badge.
  'mcp-server': (() => {
    const plug = 'M16.5 14.5V16M19.5 14.5V16M15 16h6v1a3 3 0 0 1-6 0ZM18 20v1.5';
    const leds = 'M7 6.5h.01M10 6.5h.01M7 16.5h.01M10 16.5h.01';
    return {
      o: `<rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="${leds}" stroke-width="2.5"/>`,
      ocut: BADGE_CLEAR,
      otop: `<path d="${plug}"/>`,
      f: '<rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/>',
      cut: `<path d="${leds}" stroke-width="2.5"/>${BADGE_CLEAR}`,
      top: `<path d="${plug}"/>`,
    };
  })(),

  workflow: {
    o: `<rect x="3" y="3" width="5.5" height="5.5" rx="1.5"/><rect x="15.5" y="15.5" width="5.5" height="5.5" rx="1.5"/><path d="M8.5 5.75H10a2 2 0 0 1 2 2v.75M12 15.5v.75a2 2 0 0 0 2 2h1.5"/><path d="${star(12, 12, 3.5)}"/>`,
    f: `<rect x="3" y="3" width="5.5" height="5.5" rx="1.5"/><rect x="15.5" y="15.5" width="5.5" height="5.5" rx="1.5"/><path fill="none" d="M8.5 5.75H10a2 2 0 0 1 2 2v.75M12 15.5v.75a2 2 0 0 0 2 2h1.5"/><path d="${star(12, 12, 3.5)}"/>`,
  },

  pipeline: {
    o: '<path d="M8 8.5H5.5A2.5 2.5 0 0 0 3 11v2a2.5 2.5 0 0 0 2.5 2.5H8M10.5 8.5h3M10.5 15.5h3M16 8.5h2.5A2.5 2.5 0 0 1 21 11v2a2.5 2.5 0 0 1-2.5 2.5H16"/><rect x="8" y="6" width="2.5" height="12" rx="1"/><rect x="13.5" y="6" width="2.5" height="12" rx="1"/>',
    f: '<path d="M8 8.5H5.5A2.5 2.5 0 0 0 3 11v2a2.5 2.5 0 0 0 2.5 2.5H8ZM16 8.5h2.5A2.5 2.5 0 0 1 21 11v2a2.5 2.5 0 0 1-2.5 2.5H16Z"/><rect x="10.5" y="8.5" width="3" height="7"/><rect x="8" y="6" width="2.5" height="12" rx="1"/><rect x="13.5" y="6" width="2.5" height="12" rx="1"/>',
    cut: '<path d="M10.5 6.5v11M13.5 6.5v11" stroke-width="1.25"/>',
  },

  orchestration: (() => {
    const N = [[4.75, 4.75], [19.25, 4.75], [4.75, 19.25], [19.25, 19.25]];
    const spokes = N.map(([x, y]) => seg(12, 12, x, y, 4.25, 1.75)).join('');
    const nodes = N.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.75"/>`).join('');
    return {
      o: `${nodes}<path d="${spokes}"/><path d="${star(12, 12, 4)}"/>`,
      f: `${nodes}<path d="${spokes}"/><path d="${star(12, 12, 4)}"/>`,
    };
  })(),

  // Sliders; the middle knob is the spark.
  'fine-tune': {
    o: `<path d="M3 5h3M10 5h11M3 12h5M18 12h3M3 19h10M17 19h4"/><circle cx="8" cy="5" r="2"/><circle cx="15" cy="19" r="2"/><path d="${star(13, 12, 3.5)}"/>`,
    f: `<path d="M3 5h3M10 5h11M3 12h5M18 12h3M3 19h10M17 19h4"/><circle cx="8" cy="5" r="2"/><circle cx="15" cy="19" r="2"/><path d="${star(13, 12, 3.5)}"/>`,
  },

  // Brain + loop badge (same badge as agent).
  training: {
    o: `<path d="${BRAIN_L}"/><path d="${BRAIN_R}"/><path d="${BRAIN_L_FOLDS}${BRAIN_R_FOLDS}"/>`,
    ocut: BADGE_CLEAR,
    otop: `<path d="${LOOP_BADGE}"/>`,
    f: `<path d="${BRAIN_L}"/><path d="${BRAIN_R}"/>`,
    cut: `<path stroke-width="1.5" d="M12 3v19${BRAIN_L_FOLDS}${BRAIN_R_FOLDS}"/>${BADGE_CLEAR}`,
    top: `<path fill="none" d="${LOOP_BADGE}"/>`,
  },

  dataset: {
    o: '<rect x="3" y="7" width="14.5" height="14" rx="2.5"/><path d="M6.5 3.5h12A2.5 2.5 0 0 1 21 6v11.5"/><path d="M3 11.5h14.5M8.5 11.5V21M8.5 16.25h9"/>',
    f: '<rect x="3" y="7" width="14.5" height="14" rx="2.5"/><path fill="none" d="M6.5 3.5h12A2.5 2.5 0 0 1 21 6v11.5"/>',
    cut: '<path d="M2 11.5h16.5M8.5 11.5V22M8.5 16.25h10" stroke-width="1.5"/>',
  },

  'data-labeling': {
    o: '<path d="M3 5h18M3 11.5h4.5M3 18.5h18"/><path d="M10.5 11.5 13.5 8H19a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-5.5Z"/><circle cx="15" cy="11.5" r=".75"/>',
    f: '<path d="M3 5h18M3 11.5h4.5M3 18.5h18"/><path d="M10.5 11.5 13.5 8H19a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-5.5Z"/>',
    cut: '<circle cx="15" cy="11.5" r="1.25" fill="#000" stroke="none"/>',
  },

  // ── Batch: inference … seed ────────────────────────────────────────────────
  // Model cube running forward: arrow badge.
  inference: (() => {
    const c = cube(11.5, 11.5, 8.5);
    const arrow = 'M14.5 18h6.5M18.5 15.5 21 18l-2.5 2.5';
    return {
      o: `<path d="${c.hex}"/><path d="${c.y}"/>`,
      ocut: BADGE_CLEAR,
      otop: `<path d="${arrow}"/>`,
      f: `<path d="${c.hex}"/>`,
      cut: `<path d="${c.y}" stroke-width="1.5"/>${BADGE_CLEAR}`,
      top: `<path fill="none" d="${arrow}"/>`,
    };
  })(),

  // Clipboard with check + spark badge.
  evaluation: {
    o: '<path d="M15.5 4.5H17A2.5 2.5 0 0 1 19.5 7v11.5A2.5 2.5 0 0 1 17 21H7a2.5 2.5 0 0 1-2.5-2.5V7A2.5 2.5 0 0 1 7 4.5h1.5"/><rect x="8.5" y="3" width="7" height="3.5" rx="1"/><path d="m8 12.25 2.5 2.5 4.5-4.5"/>',
    ocut: BADGE_CLEAR,
    otop: `<path d="${BADGE.spark}"/>`,
    f: '<rect x="4.5" y="4.5" width="15" height="16.5" rx="2.5"/>',
    cut: `<rect x="8.5" y="3" width="7" height="3.5" rx="1" fill="#000" stroke-width="4"/><path d="m8 12.25 2.5 2.5 4.5-4.5"/>${BADGE_CLEAR}`,
    top: `<rect x="8.5" y="3" width="7" height="3.5" rx="1"/><path d="${BADGE.spark}"/>`,
  },

  // Rising bars; the spark marks the model.
  benchmark: {
    o: `<rect x="4.5" y="13.5" width="3" height="7" rx="1"/><rect x="10.5" y="9.5" width="3" height="11" rx="1"/><rect x="16.5" y="5" width="3" height="15.5" rx="1"/><path d="${star(6.5, 6.5, 3.5)}"/>`,
    f: `<rect x="4.5" y="13.5" width="3" height="7" rx="1"/><rect x="10.5" y="9.5" width="3" height="11" rx="1"/><rect x="16.5" y="5" width="3" height="15.5" rx="1"/><path d="${star(6.5, 6.5, 3.5)}"/>`,
  },

  leaderboard: {
    o: `<path d="M3 21v-3.5a1 1 0 0 1 1-1h5V15a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3.5h5a1 1 0 0 1 1 1V21Z"/><path d="${star(12, 7, 4)}"/>`,
    f: `<path d="M3 21v-3.5a1 1 0 0 1 1-1h5V15a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3.5h5a1 1 0 0 1 1 1V21Z"/><path d="${star(12, 7, 4)}"/>`,
  },

  hallucination: {
    o: `<path d="${CLOUD}"/><path d="M9.75 10.5a2.25 2.25 0 1 1 3.25 2c-.6.3-1 .75-1 1.4v.35M12 16.75h.01"/>`,
    f: `<path d="${CLOUD}"/>`,
    cut: '<path d="M9.75 10.5a2.25 2.25 0 1 1 3.25 2c-.6.3-1 .75-1 1.4v.35M12 16.75h.01"/>',
  },

  guardrails: {
    o: '<rect x="3" y="8" width="18" height="6.5" rx="2"/><path d="m8.75 14.5 3.5-6.5M14.25 14.5l3.5-6.5"/><path d="M5.5 14.5V21M18.5 14.5V21M5.5 8V5M18.5 8V5M3.5 21h4M16.5 21h4"/>',
    f: '<rect x="3" y="8" width="18" height="6.5" rx="2"/><path d="M5.5 14.5V21M18.5 14.5V21M5.5 8V5M18.5 8V5M3.5 21h4M16.5 21h4"/>',
    cut: '<path d="m8.25 15.5 4.5-8.5M13.75 15.5l4.5-8.5" stroke-width="2"/>',
  },

  'ai-safety': {
    o: `<path d="${SHIELD}"/><path d="${star(12, 11.5, 4.5)}"/>`,
    f: `<path d="${SHIELD}"/>`,
    cut: `<path d="${star(12, 11.5, 4.75)}" fill="#000" stroke-width="1"/>`,
  },

  // Target aimed at the spark.
  alignment: {
    o: `<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2"/><path d="${star(12, 12, 3.5)}"/>`,
    f: `<circle cx="12" cy="12" r="8.5"/>`,
    cut: `<path d="M12 3.5v2.5M12 18v2.5M3.5 12H6M18 12h2.5" stroke-width="1.5"/><path d="${star(12, 12, 3.75)}" fill="#000" stroke-width="1"/>`,
  },

  // Tilted balance, spark as the pivot.
  bias: (() => {
    const lines = 'M5.5 11 18.5 9M12 10v10.5M8.5 20.5h7M3 17l2.5-6 2.5 6M16 15l2.5-6 2.5 6';
    const pans = 'M3 17a2.5 2.5 0 0 0 5 0ZM16 15a2.5 2.5 0 0 0 5 0Z';
    return {
      o: `<path d="${lines}"/><path d="${pans}"/><path d="${star(12, 6.5, 3.5)}"/>`,
      f: `<path fill="none" d="${lines}"/><path d="${pans}"/><path d="${star(12, 6.5, 3.5)}"/>`,
    };
  })(),

  // Magnifier over a small node graph.
  explainability: (() => {
    const N = [[8, 11], [13.5, 8], [13.5, 14]];
    const e = seg(...N[0], ...N[1], 1.5, 1.5) + seg(...N[0], ...N[2], 1.5, 1.5);
    const dots = N.map(([x, y]) => `M${x} ${y}h.01`).join('');
    return {
      o: `${LENS}<path d="${LENS_HANDLE}"/><path d="${dots}" stroke-width="2.75"/><path d="${e}" stroke-width="1.25"/>`,
      f: `${LENS}<path d="${LENS_HANDLE}"/>`,
      cut: `<path d="${dots}" stroke-width="2.75"/><path d="${e}" stroke-width="1.25"/>`,
    };
  })(),

  confidence: {
    o: '<path d="M3 16a9 9 0 0 1 18 0"/><path d="m13.1 14.9 3.4-3.4"/><circle cx="12" cy="16" r="1.5"/>',
    f: '<path d="M3 16a9 9 0 0 1 18 0Z"/>',
    cut: '<path d="m12 16 4.5-4.5"/><circle cx="12" cy="16" r="1.75" fill="#000" stroke="none"/>',
  },

  // A seed sprouting a spark.
  seed: {
    o: `<ellipse cx="12" cy="18.25" rx="4.5" ry="2.75"/><path d="M12 10v5.5"/><path d="M12 14.5c.25-2.75 2.25-4.25 5.5-4.5-.25 2.75-2.25 4.25-5.5 4.5Z"/><path d="${star(12, 6.5, 3.5)}"/>`,
    f: `<ellipse cx="12" cy="18.25" rx="4.5" ry="2.75"/><path d="M12 10v5.5"/><path d="M12 14.5c.25-2.75 2.25-4.25 5.5-4.5-.25 2.75-2.25 4.25-5.5 4.5Z"/><path d="${star(12, 6.5, 3.5)}"/>`,
  },
};
