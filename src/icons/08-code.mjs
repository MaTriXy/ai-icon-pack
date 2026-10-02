import { star, FRAME, MONITOR, MONITOR_STAND, DATABASE, CLOUD, BADGE_CLEAR, SLASH, SLASH_CLEAR } from '../shapes.mjs';

// ── Local geometry helpers ────────────────────────────────────────────────────
const n = (v) => +v.toFixed(2);

/** Closed polygon with every corner softened by a quadratic of radius r. */
function rp(pts, r) {
  let d = '';
  const L = pts.length;
  for (let i = 0; i < L; i++) {
    const [px, py] = pts[(i - 1 + L) % L], [cx, cy] = pts[i], [nx, ny] = pts[(i + 1) % L];
    const a = Math.hypot(px - cx, py - cy), b = Math.hypot(nx - cx, ny - cy);
    const p1 = [cx + ((px - cx) * r) / a, cy + ((py - cy) * r) / a];
    const p2 = [cx + ((nx - cx) * r) / b, cy + ((ny - cy) * r) / b];
    d += `${i ? 'L' : 'M'}${n(p1[0])} ${n(p1[1])}Q${n(cx)} ${n(cy)} ${n(p2[0])} ${n(p2[1])}`;
  }
  return d + 'Z';
}

/** Isometric cube: hexagon outline + the "Y" of the front-top corner. */
function cube(cx, cy, s, r = 1.25) {
  const w = 0.866 * s;
  const T = [cx, cy - s], RT = [cx + w, cy - s / 2], RB = [cx + w, cy + s / 2], B = [cx, cy + s], LB = [cx - w, cy + s / 2], LT = [cx - w, cy - s / 2];
  return {
    hull: rp([T, RT, RB, B, LB, LT], r),
    y: `M${n(LT[0] + 0.3)} ${n(LT[1] + 0.17)} ${n(cx)} ${n(cy)} ${n(RT[0] - 0.3)} ${n(RT[1] + 0.17)}M${n(cx)} ${n(cy)}V${n(B[1] - 0.35)}`,
    LT, RT, T, B,
  };
}

// Bug: body, head and six legs. Shared by bug / bug-off / debug.
const BUG_BODY = 'M12 20.5c-3.25 0-5.5-2.5-5.5-5.75V11.75A3.5 3.5 0 0 1 10 8.25h4a3.5 3.5 0 0 1 3.5 3.5v3c0 3.25-2.25 5.75-5.5 5.75Z';
const BUG_HEAD = 'M9.25 8.25V7.5a2.75 2.75 0 0 1 5.5 0v.75';
const BUG_LEGS = 'M6.5 13.5H3.25M6.75 10.25 4.25 8.5M6.75 17.25 4.25 19M17.5 13.5h3.25M17.25 10.25l2.5-1.75M17.25 17.25l2.5 1.75';
const BUG_SEAM = 'M12 11.75v8.75';
const BUG_O = `<path d="${BUG_BODY}"/><path d="${BUG_HEAD}"/><path d="${BUG_LEGS}"/><path d="${BUG_SEAM}"/>`;
const BUG_F = `<path d="${BUG_BODY}"/><path d="${BUG_HEAD}Z"/><path d="${BUG_LEGS}"/>`;
const BUG_CUT = `<path d="${BUG_SEAM}M10 8.25h4" stroke-width="1.5"/>`;

// Brackets [ ] used as a frame around a small subject (api, environment, sdk).
const BRACKETS_SIDE = 'M6.5 4.5H5A1.5 1.5 0 0 0 3.5 6v12A1.5 1.5 0 0 0 5 19.5h1.5M17.5 4.5H19A1.5 1.5 0 0 1 20.5 6v12a1.5 1.5 0 0 1-1.5 1.5h-1.5';

// Book (repository, docs): cover with a page edge along the bottom.
const BOOK = 'M5 18.5v-13A2.5 2.5 0 0 1 7.5 3H19v18H7.5A2.5 2.5 0 0 1 5 18.5Z';
const BOOK_PAGE = 'M5 18.5A2.5 2.5 0 0 1 7.5 16H19';

// Server rack unit.
const SERVER_TOP = '<rect x="3" y="3.25" width="18" height="7.25" rx="2"/>';
const SERVER_BOTTOM = '<rect x="3" y="13.5" width="18" height="7.25" rx="2"/>';

// Git node circles (r 2.5) at the four corners.
const node = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="2.5"/>`;

const PKG = cube(12, 12, 9.25, 1.5);
const PKG_TAPE = 'M8 5.06l8 4.63';
const SDK_CUBE = cube(12, 12, 4.75, 1);
const NPM_CUBE = cube(12, 12, 5.25, 1);

const PACK_A = cube(6.82, 16.5, 4.25, 1), PACK_B = cube(17.18, 16.5, 4.25, 1), PACK_C = cube(12, 7.5, 4.25, 1);

const DIAMOND = (cx, cy, r) => rp([[cx, cy - r], [cx + r, cy], [cx, cy + r], [cx - r, cy]], 1);
const COMPONENT = [DIAMOND(12, 6.25, 3.25), DIAMOND(17.75, 12, 3.25), DIAMOND(12, 17.75, 3.25), DIAMOND(6.25, 12, 3.25)].join('');

// Pointy-top hexagon.
const hex = (cx, cy, r) => {
  const p = [];
  for (let i = 0; i < 6; i++) {
    const a = ((-90 + 60 * i) * Math.PI) / 180;
    p.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  return rp(p, 1);
};
const HEXES = [hex(12, 7.7, 4), hex(7.04, 16.3, 4), hex(16.96, 16.3, 4)].join('');

// Tag (version).
const TAG = 'M3.5 5.5v5.85c0 .53.21 1.04.59 1.41l7.65 7.65a2 2 0 0 0 2.82 0l5.85-5.85a2 2 0 0 0 0-2.82l-7.65-7.65a2 2 0 0 0-1.41-.59H5.5a2 2 0 0 0-2 2Z';

// Hammer (build) and broom (lint), drawn upright and turned 45°.
const HAMMER = '<rect x="8" y="3.75" width="8" height="4.5" rx="1.25"/>';
const HAMMER_HANDLE = 'M12 8.25v13';
const BROOM_HANDLE = 'M12 2.75v8.5';
const BROOM_HEAD = 'M9.5 11.25h5l1.5 8.5H8Z';
const BROOM_BRISTLES = 'M10.5 15.5 10 19.75M13.5 15.5l.5 4.25';

// Scroll (script).
const SCROLL_TOP = 'M18.5 17V5.5A2.5 2.5 0 0 0 16 3H5';
const SCROLL_BODY = 'M9.25 21h9.5A2.25 2.25 0 0 0 21 18.75V18a1 1 0 0 0-1-1h-7.5a1 1 0 0 0-1 1v.75a2.25 2.25 0 1 1-4.5 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3';
const SCROLL_F = 'M5 3h11a2.5 2.5 0 0 1 2.5 2.5V17h-6a1 1 0 0 0-1 1v.75a2.25 2.25 0 1 1-4.5 0V8H4a1 1 0 0 1-1-1V5a2 2 0 0 1 2-2Z';
const SCROLL_F2 = 'M11.5 18a1 1 0 0 1 1-1H20a1 1 0 0 1 1 1v.75A2.25 2.25 0 0 1 18.75 21h-9.5a2.25 2.25 0 0 0 2.25-2.25Z';
const SCROLL_CODE = 'M10 7h5.5M12.25 10.5h3.25M10 14h3.5';

// Magnifier badge glyph (query).
const MAG_BADGE = '<circle cx="17.5" cy="17.5" r="2.25"/><path d="m19.25 19.25 1.75 1.75"/>';
// Lightning badge glyph (cache).
const BOLT_BADGE = 'M18.75 14.5 15.5 18.5H18l-.75 3 3.25-4.25H18Z';

const HELM_SPOKES = 'M12 9.75V3M13.95 10.88l5.84-3.38M13.95 13.13l5.84 3.37M12 14.25V21M10.05 13.13 4.21 16.5M10.05 10.88 4.21 7.5';
const DB_RINGS = 'M4.5 5.5c0 1.5 3.4 2.75 7.5 2.75s7.5-1.25 7.5-2.75M4.5 12c0 1.5 3.4 2.75 7.5 2.75s7.5-1.25 7.5-2.75';
const ROCKET = 'M12 3.25C15.25 5.25 17 8.25 17 12v3.5a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V12c0-3.75 1.75-6.75 5-8.75Z';
const ROCKET_FINS = 'M7 13l-2.5 2.5V19L7 17ZM17 13l2.5 2.5V19L17 17Z';
const FLASK = 'M9.5 3.5V9l-5.05 8.95A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.75-3.05L14.5 9V3.5';

const BLOCKS = '<rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="8.5" y="3.5" width="7" height="7" rx="1.5"/>';
const PUZZLE = 'M5.75 6.75H8.5a2.25 2.25 0 1 1 3.5 0h2.75a2.5 2.5 0 0 1 2.5 2.5V12a2.25 2.25 0 1 1 0 3.5v2.75a2.5 2.5 0 0 1-2.5 2.5h-9a2.5 2.5 0 0 1-2.5-2.5v-9a2.5 2.5 0 0 1 2.5-2.5Z';
const HIER_BOXES = '<rect x="3" y="3" width="7" height="5.5" rx="1.5"/><rect x="14" y="8.5" width="7" height="4.5" rx="1.5"/><rect x="14" y="16" width="7" height="4.5" rx="1.5"/>';
const HIER_LINKS = 'M6.5 8.5v8.25a1.5 1.5 0 0 0 1.5 1.5h6M6.5 10.75H14';
const SITEMAP_BOXES = '<rect x="8.5" y="3" width="7" height="5" rx="1.5"/><rect x="3" y="16" width="4" height="4.5" rx="1"/><rect x="10" y="16" width="4" height="4.5" rx="1"/><rect x="17" y="16" width="4" height="4.5" rx="1"/>';
const SITEMAP_LINKS = 'M12 8v8M5 16v-2.5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1V16';
const LEAF = 'M8.5 16.5C8 11 11 7.5 15.5 7.5c.5 5-2.5 9-7 9Z';
const LEAF_VEIN = 'M8.5 16.5l4-4';
const QUEUE_BARS = '<rect x="3.5" y="3.75" width="10.5" height="3.5" rx="1.25"/><rect x="3.5" y="10.25" width="10.5" height="3.5" rx="1.25"/><rect x="3.5" y="16.75" width="10.5" height="3.5" rx="1.25"/>';
const LB_NODES = '<circle cx="5.5" cy="12" r="2.5"/><circle cx="18.75" cy="5" r="2"/><circle cx="18.75" cy="12" r="2"/><circle cx="18.75" cy="19" r="2"/>';
const LB_LINKS = 'M8 12h8.75M10.5 12c2.5 0 3-7 6.25-7M10.5 12c2.5 0 3 7 6.25 7';
const FLAME = 'M12 3c.25 2 3.25 3.25 3.25 5.75a3.25 3.25 0 0 1-6.5 0c0-1.1.45-2 1.1-2.65.15.85.6 1.4 1.15 1.65C10.75 6.4 11.1 4.6 12 3Z';
const MORTAR = 'M3 18h18M8 15v3M16 15v3M12 18v3';

export default {
  code: {
    o: `<path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4.5l-4 15"/>`,
    bold: true,
  },

  'code-square': {
    o: `${FRAME}<path d="m10 8.5-3.5 3.5 3.5 3.5M14 8.5l3.5 3.5-3.5 3.5"/>`,
    f: FRAME,
    cut: `<path d="m10 8.5-3.5 3.5 3.5 3.5M14 8.5l3.5 3.5-3.5 3.5"/>`,
  },

  // Terminal window: title bar plus a prompt.
  terminal: {
    o: `<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 8.5h18M7 12l2.5 2.5L7 17M12 17h4.5"/>`,
    f: `<rect x="3" y="4" width="18" height="16" rx="2.5"/>`,
    cut: `<path d="M3 8.5h18M7 12l2.5 2.5L7 17M12 17h4.5"/>`,
  },

  'terminal-square': {
    o: `${FRAME}<path d="m7.5 9 3 3-3 3M13 15h4"/>`,
    f: FRAME,
    cut: `<path d="m7.5 9 3 3-3 3M13 15h4"/>`,
  },

  command: {
    o: `<path d="M15 6.5v11a2.5 2.5 0 1 0 2.5-2.5h-11A2.5 2.5 0 1 0 9 17.5v-11A2.5 2.5 0 1 0 6.5 9h11A2.5 2.5 0 1 0 15 6.5Z"/>`,
    bold: true,
  },

  brackets: {
    o: `<path d="M8.5 4H6.5A1.5 1.5 0 0 0 5 5.5v13A1.5 1.5 0 0 0 6.5 20h2M15.5 4h2A1.5 1.5 0 0 1 19 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-2"/>`,
    bold: true,
  },

  braces: {
    o: `<path d="M8.5 3.5h-1a2 2 0 0 0-2 2V10a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4.5a2 2 0 0 0 2 2h1M15.5 3.5h1a2 2 0 0 1 2 2V10a2 2 0 0 0 2 2 2 2 0 0 0-2 2v4.5a2 2 0 0 1-2 2h-1"/>`,
    bold: true,
  },

  variable: {
    o: `<path d="M7.5 20.5S4 17.75 4 12s3.5-8.5 3.5-8.5M16.5 3.5S20 6.25 20 12s-3.5 8.5-3.5 8.5M9.5 9l5 6M14.5 9l-5 6"/>`,
    bold: true,
  },

  bug: {
    o: BUG_O,
    f: BUG_F,
    cut: BUG_CUT,
  },

  'bug-off': {
    o: BUG_O,
    ocut: SLASH_CLEAR,
    otop: SLASH,
    f: BUG_F,
    cut: BUG_CUT + SLASH_CLEAR,
    top: SLASH,
  },

  // Bug with a play badge.
  debug: {
    o: BUG_O,
    ocut: BADGE_CLEAR,
    otop: `<path d="M16.5 15.25v5.5l4.25-2.75Z"/>`,
    f: BUG_F,
    cut: BUG_CUT + BADGE_CLEAR,
    top: `<path d="M16.5 15.25v5.5l4.25-2.75Z"/>`,
  },

  'git-branch': {
    o: `${node(6, 18)}${node(18, 6)}<path d="M6 3.5v12M18 8.5A9.5 9.5 0 0 1 8.5 18"/>`,
    f: `${node(6, 18)}${node(18, 6)}<path d="M6 3.5v12M18 8.5A9.5 9.5 0 0 1 8.5 18" fill="none"/>`,
  },

  'git-commit': {
    o: `<circle cx="12" cy="12" r="3.5"/><path d="M3 12h5.5M15.5 12H21"/>`,
    f: `<circle cx="12" cy="12" r="3.5"/><path d="M3 12h5.5M15.5 12H21"/>`,
  },

  'git-merge': {
    o: `${node(6, 6)}${node(18, 18)}<path d="M6 20.5V8.5a9.5 9.5 0 0 0 9.5 9.5"/>`,
    f: `${node(6, 6)}${node(18, 18)}<path d="M6 20.5V8.5a9.5 9.5 0 0 0 9.5 9.5" fill="none"/>`,
  },

  'git-pull-request': {
    o: `${node(6, 6)}${node(6, 18)}${node(18, 18)}<path d="M6 8.5v7M11.5 6H16a2 2 0 0 1 2 2v7.5M14 3.5 11.5 6 14 8.5"/>`,
    f: `${node(6, 6)}${node(6, 18)}${node(18, 18)}<path d="M6 8.5v7M11.5 6H16a2 2 0 0 1 2 2v7.5M14 3.5 11.5 6 14 8.5" fill="none"/>`,
  },

  'git-fork': {
    o: `${node(6, 6)}${node(18, 6)}${node(12, 18)}<path d="M6 8.5v.5a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-.5M12 12v3.5"/>`,
    f: `${node(6, 6)}${node(18, 6)}${node(12, 18)}<path d="M6 8.5v.5a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-.5M12 12v3.5" fill="none"/>`,
  },

  'git-compare': {
    o: `${node(6, 6)}${node(18, 18)}<path d="M11.5 6H16a2 2 0 0 1 2 2v7.5M14 3.5 11.5 6 14 8.5M12.5 18H8a2 2 0 0 1-2-2V8.5M10 15.5l2.5 2.5-2.5 2.5"/>`,
    f: `${node(6, 6)}${node(18, 18)}<path d="M11.5 6H16a2 2 0 0 1 2 2v7.5M14 3.5 11.5 6 14 8.5M12.5 18H8a2 2 0 0 1-2-2V8.5M10 15.5l2.5 2.5-2.5 2.5" fill="none"/>`,
  },

  // Book with a bookmark ribbon hanging from the top edge.
  repository: {
    o: `<path d="${BOOK}"/><path d="${BOOK_PAGE}"/><path d="M10 3v7l2-1.5 2 1.5V3"/>`,
    f: `<path d="${BOOK}"/>`,
    cut: `<path d="${BOOK_PAGE}" stroke-width="1.5"/><path d="M10 3v7l2-1.5 2 1.5V3" stroke-width="1.5"/>`,
  },

  diff: {
    o: `<path d="M12 3.5v11M6.5 9h11M6.5 20h11"/>`,
    bold: true,
  },

  package: {
    o: `<path d="${PKG.hull}"/><path d="${PKG.y}"/><path d="${PKG_TAPE}"/>`,
    f: `<path d="${PKG.hull}"/>`,
    cut: `<path d="${PKG.y}${PKG_TAPE}" stroke-width="1.5"/>`,
  },

  packages: {
    o: [PACK_A, PACK_B, PACK_C].map((c) => `<path d="${c.hull}"/><path d="${c.y}"/>`).join(''),
    f: [PACK_A, PACK_B, PACK_C].map((c) => `<path d="${c.hull}"/>`).join(''),
    cut: `<path d="${PACK_A.y}${PACK_B.y}${PACK_C.y}" stroke-width="1.5"/>`,
  },

  // Generic registry: a crate tile holding a package.
  'npm-like': {
    o: `${FRAME}<path d="${NPM_CUBE.hull}"/><path d="${NPM_CUBE.y}"/>`,
    f: FRAME,
    cut: `<path d="${NPM_CUBE.hull}" stroke-width="1.5"/><path d="${NPM_CUBE.y}" stroke-width="1.5"/>`,
  },

  // Shipping container: corrugated side panel.
  container: {
    o: `<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M8 9v6M12 9v6M16 9v6"/>`,
    f: `<rect x="3" y="5.5" width="18" height="13" rx="2"/>`,
    cut: `<path d="M8 9v6M12 9v6M16 9v6" stroke-width="1.5"/>`,
  },

  // Ship's helm: rim, hub and six handles (generic, not a logo).
  'kubernetes-like': {
    o: `<circle cx="12" cy="12" r="6.25"/><circle cx="12" cy="12" r="2.25"/><path d="${HELM_SPOKES}"/>`,
    f: `<circle cx="12" cy="12" r="6.25"/><path d="${HELM_SPOKES}"/>`,
    cut: `<circle cx="12" cy="12" r="4.25" stroke-width="2.5"/>`,
    top: `<path d="${HELM_SPOKES}"/>`,
  },

  server: {
    o: `${SERVER_TOP}${SERVER_BOTTOM}<path d="M7 6.88h.01M10 6.88h.01M7 17.13h.01M10 17.13h.01"/>`,
    f: `${SERVER_TOP}${SERVER_BOTTOM}`,
    cut: `<path d="M7 6.88h.01M10 6.88h.01M7 17.13h.01M10 17.13h.01" stroke-width="2"/>`,
  },

  // Rack of three units.
  servers: {
    o: `${FRAME}<path d="M3 9h18M3 15h18M7 6h.01M10 6h.01M7 12h.01M10 12h.01M7 18h.01M10 18h.01"/>`,
    f: FRAME,
    cut: `<path d="M3 9h18M3 15h18" stroke-width="1.5"/><path d="M7 6h.01M10 6h.01M7 12h.01M10 12h.01M7 18h.01M10 18h.01" stroke-width="2"/>`,
  },

  // Small cloud over a single server unit.
  'cloud-server': {
    o: `<g transform="translate(4.36 .62) scale(.65)"><path d="${CLOUD}" stroke-width="2.69"/></g><rect x="4.5" y="16" width="15" height="5" rx="1.5"/><path d="M8 18.5h.01M11 18.5h.01"/>`,
    f: `<g transform="translate(4.36 .62) scale(.65)"><path d="${CLOUD}" stroke-width="2.69"/></g><rect x="4.5" y="16" width="15" height="5" rx="1.5"/>`,
    cut: `<path d="M8 18.5h.01M11 18.5h.01" stroke-width="2"/>`,
  },

  // Plug between brackets.
  api: {
    o: `<path d="${BRACKETS_SIDE}"/><path d="M10.5 5v3M13.5 5v3M8.5 8h7v3a3.5 3.5 0 0 1-7 0ZM12 14.5V19"/>`,
    f: `<path d="${BRACKETS_SIDE}M10.5 5v3M13.5 5v3M12 14.5V19" fill="none"/><path d="M8.5 8h7v3a3.5 3.5 0 0 1-7 0Z"/>`,
  },

  webhook: {
    o: `<path d="M17.5 16.5H12c-1 0-1.8.6-2.35 1.5A3.5 3.5 0 0 1 3 16.5c0-.6.15-1.2.45-1.75M6.5 16.5l2.8-5.1c.45-.8.3-1.7-.17-2.39A3.5 3.5 0 1 1 15.03 5.25M12 7l2.9 5.2c.5.5 1.6.8 2.6.8a3.5 3.5 0 0 1 0 7"/>`,
    bold: true,
  },

  // Arrow arriving at a target node.
  endpoint: {
    o: `<path d="M3.5 12H11M7.5 8.5 11 12l-3.5 3.5"/><circle cx="17.25" cy="12" r="3.25"/>`,
    f: `<path d="M3.5 12H11M7.5 8.5 11 12l-3.5 3.5" fill="none" stroke-width="2.5"/><circle cx="17.25" cy="12" r="3.25"/>`,
  },

  json: {
    o: `<path d="M8.5 3.5h-1a2 2 0 0 0-2 2V10a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4.5a2 2 0 0 0 2 2h1M15.5 3.5h1a2 2 0 0 1 2 2V10a2 2 0 0 0 2 2 2 2 0 0 0-2 2v4.5a2 2 0 0 1-2 2h-1M8.75 12h.01M12 12h.01M15.25 12h.01"/>`,
    bold: true,
  },

  // Asterisk and a dot: ".*".
  regex: {
    o: `<path d="M16.5 3.5v9M12.6 5.75l7.8 4.5M12.6 10.25l7.8-4.5"/><rect x="4" y="15" width="4.5" height="4.5" rx="1.5"/>`,
    f: `<path d="M16.5 3.5v9M12.6 5.75l7.8 4.5M12.6 10.25l7.8-4.5" stroke-width="2.5"/><rect x="4" y="15" width="4.5" height="4.5" rx="1.5"/>`,
  },

  // Database with a magnifier badge.
  query: {
    o: DATABASE,
    ocut: BADGE_CLEAR,
    otop: MAG_BADGE,
    f: DATABASE,
    cut: `<path d="${DB_RINGS}" stroke-width="1.5"/>${BADGE_CLEAR}`,
    top: `<g fill="none">${MAG_BADGE}</g>`,
  },

  // Two linked tables (entity diagram).
  schema: {
    o: `<rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/><path d="M3 6.5h8M13 16.5h8M7 11v6a1.5 1.5 0 0 0 1.5 1.5H13"/>`,
    f: `<rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/><path d="M7 11v6a1.5 1.5 0 0 0 1.5 1.5H13" fill="none"/>`,
    cut: `<path d="M3 6.5h8M13 16.5h8" stroke-width="1.5"/>`,
  },

  // Rocket; the spark is its window (accent).
  deploy: {
    o: `<path d="${ROCKET}"/><path d="${ROCKET_FINS}"/><path d="M12 19.5v1.25"/><path d="${star(12, 10.5, 2.25)}"/>`,
    f: `<path d="${ROCKET}"/><path d="${ROCKET_FINS}"/><path d="M12 19.5v1.25"/>`,
    cut: `<path d="${star(12, 10.5, 2.5)}" fill="#000" stroke-width="1"/>`,
  },

  build: {
    o: `<g transform="translate(-1.25 1.25) rotate(45 12 12)">${HAMMER}<path d="${HAMMER_HANDLE}"/></g>`,
    f: `<g transform="translate(-1.25 1.25) rotate(45 12 12)">${HAMMER}<path d="${HAMMER_HANDLE}" stroke-width="2.5"/></g>`,
  },

  'test-tube': {
    o: `<path d="M8.5 3.75v13.5a3.5 3.5 0 0 0 7 0V3.75M7 3.75h10M8.5 12h7"/>`,
    f: `<path d="M8.5 3.75v13.5a3.5 3.5 0 0 0 7 0V3.75M7 3.75h10" fill="none"/><path d="M8.5 12h7v5.25a3.5 3.5 0 0 1-7 0Z"/>`,
  },

  flask: {
    o: `<path d="${FLASK}M8 3.5h8M6.7 14h10.6"/>`,
    f: `<path d="${FLASK}M8 3.5h8" fill="none"/><path d="M6.68 14h10.64l2.23 3.95A2 2 0 0 1 17.8 21H6.2a2 2 0 0 1-1.75-3.05Z"/>`,
  },

  beaker: {
    o: `<path d="M4.5 3.5h15M6 3.5V18a2.5 2.5 0 0 0 2.5 2.5h7A2.5 2.5 0 0 0 18 18V3.5M6 13h12"/>`,
    f: `<path d="M4.5 3.5h15M6 3.5V18a2.5 2.5 0 0 0 2.5 2.5h7A2.5 2.5 0 0 0 18 18V3.5" fill="none"/><path d="M6 13h12v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 6 18Z"/>`,
  },

  // Broom.
  lint: {
    o: `<g transform="translate(1 -1) rotate(45 12 12)"><path d="${BROOM_HANDLE}"/><path d="${BROOM_HEAD}"/><path d="M12 15v4.75"/></g>`,
    f: `<g transform="translate(1 -1) rotate(45 12 12)"><path d="${BROOM_HANDLE}" stroke-width="2.5"/><path d="${BROOM_HEAD}"/></g>`,
    cut: `<g transform="translate(1 -1) rotate(45 12 12)"><path d="M12 15v4.75" stroke-width="1.5"/></g>`,
  },

  // Indented code lines tidied by a wand.
  'format-code': {
    o: `<path d="M3.5 5h11M7 9.5h6.5M7 14h3M3.5 18.5h4M11.5 20.5l5.5-5.5M18.5 9.5v1.75M21 13.5h-1.75M20.75 11.25l-.9.9"/>`,
    bold: true,
  },

  cli: {
    o: `<path d="m4.5 6 6 6-6 6M13 18h6.5"/>`,
    bold: true,
  },

  // Scroll with indented code lines.
  script: {
    o: `<path d="${SCROLL_TOP}"/><path d="${SCROLL_BODY}"/><path d="${SCROLL_CODE}"/>`,
    f: `<path d="${SCROLL_F}"/><path d="${SCROLL_F2}"/>`,
    cut: `<path d="${SCROLL_CODE}" stroke-width="1.5"/>`,
  },

  // Timestamp column and message lines.
  log: {
    o: `<path d="M3.5 6h3M10 6h10.5M3.5 12h3M10 12h10.5M3.5 18h3M10 18h7"/>`,
    bold: true,
  },

  'monitor-code': {
    o: `${MONITOR}<path d="${MONITOR_STAND}"/><path d="m9.5 8-2.5 2.5 2.5 2.5M14.5 8l2.5 2.5-2.5 2.5"/>`,
    f: `${MONITOR}<path d="${MONITOR_STAND}"/>`,
    cut: `<path d="m9.5 8-2.5 2.5 2.5 2.5M14.5 8l2.5 2.5-2.5 2.5"/>`,
  },

  component: {
    o: `<path d="${COMPONENT}"/>`,
    f: `<path d="${COMPONENT}"/>`,
  },

  // Toy blocks: two on the floor, one stacked on top.
  blocks: {
    o: BLOCKS,
    f: BLOCKS,
  },

  puzzle: {
    o: `<path d="${PUZZLE}"/>`,
    f: `<path d="${PUZZLE}"/>`,
  },

  // Indented tree: parent node with two children.
  hierarchy: {
    o: `${HIER_BOXES}<path d="${HIER_LINKS}"/>`,
    f: `${HIER_BOXES}<path d="${HIER_LINKS}" fill="none"/>`,
  },

  // Top page linked to three pages below.
  sitemap: {
    o: `${SITEMAP_BOXES}<path d="${SITEMAP_LINKS}"/>`,
    f: `${SITEMAP_BOXES}<path d="${SITEMAP_LINKS}" fill="none"/>`,
  },

  // 1 0 / 0 1
  binary: {
    o: `<path d="M6 4.75 8.25 3.5V10M6 10h4.5M14.5 15.25l2.25-1.25v6.5M14.5 20.5H19"/><rect x="14" y="3.5" width="4.5" height="6.5" rx="2.25"/><rect x="5.5" y="14" width="4.5" height="6.5" rx="2.25"/>`,
    bold: true,
  },

  hash: {
    o: `<path d="M4 9h16M4 15h16M10 3.5 8 20.5M16 3.5l-2 17"/>`,
    bold: true,
  },

  // Leaf between brackets (environment variables).
  environment: {
    o: `<path d="${BRACKETS_SIDE}"/><path d="${LEAF}"/><path d="${LEAF_VEIN}"/>`,
    f: `<path d="${BRACKETS_SIDE}" fill="none"/><path d="${LEAF}"/>`,
    cut: `<path d="${LEAF_VEIN}" stroke-width="1.5"/>`,
  },

  // A toggle switch flying as a flag.
  'feature-flag': {
    o: `<path d="M4.5 21V3.5H16a4.5 4.5 0 0 1 0 9H4.5"/><circle cx="16" cy="8" r="1.25" fill="currentColor"/>`,
    f: `<path d="M4.5 3.5H16a4.5 4.5 0 0 1 0 9H4.5Z"/><path d="M4.5 3.5V21" fill="none"/>`,
    cut: `<circle cx="16" cy="8" r="2" fill="#000" stroke="none"/>`,
  },

  // Tag with a "v".
  version: {
    o: `<path d="${TAG}"/><circle cx="7.5" cy="7.5" r=".75" fill="currentColor"/><path d="m11 11.5 2 4 2-4"/>`,
    f: `<path d="${TAG}"/>`,
    cut: `<circle cx="7.5" cy="7.5" r="1.5" fill="#000" stroke="none"/><path d="m11 11.5 2 4 2-4"/>`,
  },

  // Timeline of entries.
  changelog: {
    o: `<circle cx="6.5" cy="5" r="2"/><circle cx="6.5" cy="12" r="2"/><circle cx="6.5" cy="19" r="2"/><path d="M6.5 7v3M6.5 14v3M11.5 5h9M11.5 12h9M11.5 19h6"/>`,
    f: `<circle cx="6.5" cy="5" r="2"/><circle cx="6.5" cy="12" r="2"/><circle cx="6.5" cy="19" r="2"/><path d="M6.5 7v3M6.5 14v3M11.5 5h9M11.5 12h9M11.5 19h6"/>`,
  },

  // Book with </>.
  docs: {
    o: `<path d="${BOOK}"/><path d="${BOOK_PAGE}"/><path d="m10.5 7-2.5 2.5 2.5 2.5M13.5 7l2.5 2.5-2.5 2.5"/>`,
    f: `<path d="${BOOK}"/>`,
    cut: `<path d="${BOOK_PAGE}" stroke-width="1.5"/><path d="m10.5 7-2.5 2.5 2.5 2.5M13.5 7l2.5 2.5-2.5 2.5"/>`,
  },

  // Package between brackets.
  sdk: {
    o: `<path d="${BRACKETS_SIDE}"/><path d="${SDK_CUBE.hull}"/><path d="${SDK_CUBE.y}"/>`,
    f: `<path d="${BRACKETS_SIDE}" fill="none"/><path d="${SDK_CUBE.hull}"/>`,
    cut: `<path d="${SDK_CUBE.y}" stroke-width="1.5"/>`,
  },

  // Clock face inside a repeat arrow.
  cron: {
    o: `<path d="M20.5 12a8.5 8.5 0 1 1-8.5-8.5c2.4 0 4.65.95 6.35 2.6l2.15 2.15M20.5 3.75v4.5H16M12 7.5V12l3 2"/>`,
    bold: true,
  },

  // Stacked items with a flow arrow.
  queue: {
    o: `${QUEUE_BARS}<path d="M19.25 4.5V20m-1.75-1.75L19.25 20 21 18.25"/>`,
    f: `${QUEUE_BARS}<path d="M19.25 4.5V20m-1.75-1.75L19.25 20 21 18.25" fill="none"/>`,
  },

  // Database with a lightning badge.
  cache: {
    o: DATABASE,
    ocut: BADGE_CLEAR,
    otop: `<path d="${BOLT_BADGE}" fill="currentColor" stroke-width="1"/>`,
    f: DATABASE,
    cut: `<path d="${DB_RINGS}" stroke-width="1.5"/>${BADGE_CLEAR}`,
    top: `<path d="${BOLT_BADGE}" stroke-width="1"/>`,
  },

  // One node fanning out to three.
  'load-balancer': {
    o: `${LB_NODES}<path d="${LB_LINKS}"/>`,
    f: `${LB_NODES}<path d="${LB_LINKS}" fill="none"/>`,
  },

  // Brick wall with a flame.
  firewall: {
    o: `<path d="${FLAME}"/><rect x="3" y="15" width="18" height="6" rx="1.5"/><path d="${MORTAR}"/>`,
    f: `<path d="${FLAME}"/><rect x="3" y="15" width="18" height="6" rx="1.5"/>`,
    cut: `<path d="${MORTAR}" stroke-width="1.5"/>`,
  },

  // Archway on the ground.
  gateway: {
    o: `<path d="M4 21V11a8 8 0 0 1 16 0v10M9 21v-7a3 3 0 0 1 6 0v7M3 21h18"/>`,
    f: `<path d="M4 21V11a8 8 0 0 1 16 0v10Z"/>`,
    cut: `<path d="M9 22v-8a3 3 0 0 1 6 0v8Z" fill="#000"/>`,
    top: `<path d="M3 21h18"/>`,
  },

  microservices: {
    o: `<path d="${HEXES}"/>`,
    f: `<path d="${HEXES}"/>`,
  },
};
