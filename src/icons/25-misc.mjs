import { star } from '../shapes.mjs';

// Misc & symbols. Shapes and symbols are pure glyphs (no spark); lab, cursor-sparkle and ai-chip-badge carry a hero spark.

const n2 = (v) => +v.toFixed(2);

/** Closed polygon through `pts` ([[x,y],...]) with every corner rounded by radius-ish `r` (quadratic fillet). */
function roundPoly(pts, r) {
  const n = pts.length;
  let d = '';
  for (let i = 0; i < n; i++) {
    const [px, py] = pts[(i - 1 + n) % n], [x, y] = pts[i], [nx, ny] = pts[(i + 1) % n];
    const l1 = Math.hypot(px - x, py - y), l2 = Math.hypot(nx - x, ny - y);
    const a = [x + ((px - x) / l1) * r, y + ((py - y) / l1) * r];
    const b = [x + ((nx - x) / l2) * r, y + ((ny - y) / l2) * r];
    d += `${i ? 'L' : 'M'}${n2(a[0])} ${n2(a[1])}Q${n2(x)} ${n2(y)} ${n2(b[0])} ${n2(b[1])}`;
  }
  return d + 'Z';
}
/** Vertices of a regular polygon (first vertex at rotDeg, 0 = right). */
const ngon = (cx, cy, rad, sides, rotDeg) =>
  Array.from({ length: sides }, (_, i) => {
    const a = ((rotDeg + (360 / sides) * i) * Math.PI) / 180;
    return [cx + rad * Math.cos(a), cy + rad * Math.sin(a)];
  });

const TRIANGLE = roundPoly([[12, 3.75], [21, 19.75], [3, 19.75]], 2);
const HEXAGON = roundPoly(ngon(12, 12, 9, 6, -90), 1.75);
const OCTAGON = roundPoly(ngon(12, 12, 9.25, 8, 22.5), 1);
const PENTAGON = roundPoly(ngon(12, 12.75, 9.25, 5, -90), 1.75);
const DIAMOND = roundPoly([[12, 2.75], [20.75, 12], [12, 21.25], [3.25, 12]], 2);

// Compass rose: long cardinal points, short diagonal points, valleys in between.
const ROSE = (() => {
  const pts = [];
  for (let i = 0; i < 16; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 8;
    const rad = i % 4 === 0 ? 9 : i % 2 === 0 ? 5.25 : 2.6;
    pts.push(`${n2(12 + rad * Math.cos(a))} ${n2(12 + rad * Math.sin(a))}`);
  }
  return `M${pts.join('L')}Z`;
})();

const KEYHOLE = 'M10.6 12.1A2.75 2.75 0 1 1 13.4 12.1L14 16.5h-4Z';
const BOLT = 'M13 6.5 8.5 13H12l-1 4.5 4.5-6.5H12Z';
const PUZZLE = 'M3.5 8.5A1.5 1.5 0 0 1 5 7h4a2.25 2.25 0 1 1 4 0h3.5A1.5 1.5 0 0 1 18 8.5V12a2.25 2.25 0 1 1 0 4v3.5a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5Z';

// Hands: fingers are 3 wide with round tips; the thumb sweeps out to the lower left.
const PALM = 'V15c0 3.3-2.7 6-6 6h-1.5c-2 0-3.4-.8-4.6-2.1l-3.3-3.6a1.5 1.5 0 0 1 2.2-2.1L7 14.5Z';
const HAND_STOP = `M7 14.5V6.5a1.5 1.5 0 0 1 3 0V5a1.5 1.5 0 0 1 3 0v.75a1.5 1.5 0 0 1 3 0v2a1.5 1.5 0 0 1 3 0${PALM}`;
const HAND_STOP_LINES = 'M10 6.5V11M13 5.75v5M16 7.75v3';
const HAND_POINT = `M7 14.5V5a1.5 1.5 0 0 1 3 0v5.5a1.5 1.5 0 0 1 3 0v.5a1.5 1.5 0 0 1 3 0v.5a1.5 1.5 0 0 1 3 0${PALM}`;
const HAND_POINT_LINES = 'M10 10.5v2M13 11v1.75M16 11.5v1.5';
const HAND_PEACE = `M7 14.5V5.5a1.5 1.5 0 0 1 3 0V4.5a1.5 1.5 0 0 1 3 0v6.5a1.5 1.5 0 0 1 3 0v.5a1.5 1.5 0 0 1 3 0${PALM}`;
const HAND_PEACE_LINES = 'M10 5.5V11M13 11v1.75M16 11.5v1.5';

const HEART_GIVEN = 'M13 11.25s-4.25-2.4-4.25-5.5a2.25 2.25 0 0 1 4.25-1.2 2.25 2.25 0 0 1 4.25 1.2c0 3.1-4.25 5.5-4.25 5.5Z';
const HAND_CUFF = '<rect x="3" y="13.5" width="3" height="7.5" rx="1"/>';
const OPEN_HAND = 'M6 14.75h2.75a3 3 0 0 1 2.1.85l1.4 1.4h2.25a1.5 1.5 0 0 1 0 3H10.5M6 20h9.75l4.35-3.45a1.5 1.5 0 0 0-1.85-2.35L15.5 16.5';

const CURSOR = 'M11.5 11.5l9.25 3.5-4 1.75-1.75 4Z';

const FLASK = 'M10 3v5.75L4.6 18.2A1.8 1.8 0 0 0 6.2 21h11.6a1.8 1.8 0 0 0 1.6-2.8L14 8.75V3';

const CERT = '<rect x="3" y="4" width="18" height="13" rx="2.5"/>';
const SEAL = '<circle cx="16" cy="15" r="2.75"/>';
const SEAL_TAILS = 'M14.75 17.5 14 21l2-1.25L18 21l-.75-3.5';

// "AI" badge: rounded square, letters A and I, hero spark breaking the top-right corner.
const AI_FRAME = '<rect x="3" y="6.5" width="14.5" height="14.5" rx="2.5"/>';
const AI_LETTERS = 'M6 18l2.25-7 2.25 7M6.85 15.5h2.8M13.5 11v7';
const AI_SPARK = star(17.5, 6.5, 3.5);

// Dashed square: corner brackets and one dash per side.
const DASH_SQUARE = 'M3.5 7V6A2.5 2.5 0 0 1 6 3.5h1M17 3.5h1A2.5 2.5 0 0 1 20.5 6v1M20.5 17v1a2.5 2.5 0 0 1-2.5 2.5h-1M7 20.5H6A2.5 2.5 0 0 1 3.5 18v-1M10.5 3.5h3M20.5 10.5v3M13.5 20.5h-3M3.5 13.5v-3';

const ATOM = [30, 90, 150].map((a) => `<ellipse cx="12" cy="12" rx="8.5" ry="3.25" transform="rotate(${a} 12 12)"/>`).join('');

export default {
  circle: {
    o: `<circle cx="12" cy="12" r="9"/>`,
    f: `<circle cx="12" cy="12" r="9"/>`,
  },

  square: {
    o: `<rect x="3.5" y="3.5" width="17" height="17" rx="2.5"/>`,
    f: `<rect x="3.5" y="3.5" width="17" height="17" rx="2.5"/>`,
  },

  triangle: {
    o: `<path d="${TRIANGLE}"/>`,
    f: `<path d="${TRIANGLE}"/>`,
  },

  hexagon: {
    o: `<path d="${HEXAGON}"/>`,
    f: `<path d="${HEXAGON}"/>`,
  },

  octagon: {
    o: `<path d="${OCTAGON}"/>`,
    f: `<path d="${OCTAGON}"/>`,
  },

  pentagon: {
    o: `<path d="${PENTAGON}"/>`,
    f: `<path d="${PENTAGON}"/>`,
  },

  'diamond-shape': {
    o: `<path d="${DIAMOND}"/>`,
    f: `<path d="${DIAMOND}"/>`,
  },

  dot: {
    o: `<circle cx="12" cy="12" r="4"/>`,
    f: `<circle cx="12" cy="12" r="4"/>`,
  },

  asterisk: {
    o: `<path d="M12 4v16M5.07 8l13.86 8M5.07 16l13.86-8"/>`,
    bold: true,
  },

  at: {
    o: `<circle cx="12" cy="12" r="3.75"/><path d="M15.75 8.5V13a2.38 2.38 0 0 0 4.75 0v-1a8.5 8.5 0 1 0-3.3 6.7"/>`,
    bold: true,
  },

  ampersand: {
    o: `<path d="M19 20.5 9.38 9.12A3 3 0 1 1 13.62 9.12L7.75 14.25C5.75 16 6.5 20.5 10 20.5c2.75 0 5.5-2.5 7.5-6.5"/>`,
    bold: true,
  },

  question: {
    o: `<path d="M8.25 8.5a3.75 3.75 0 1 1 5.6 3.25c-1.15.65-1.85 1.5-1.85 2.75v.5M12 19.5h.01"/>`,
    bold: true,
  },

  exclamation: {
    o: `<path d="M12 4.5v10M12 19.5h.01"/>`,
    bold: true,
  },

  copyright: {
    o: `<circle cx="12" cy="12" r="9"/><path d="M14.5 9.5a3.5 3.5 0 1 0 0 5"/>`,
    f: `<circle cx="12" cy="12" r="9"/>`,
    cut: `<path d="M14.5 9.5a3.5 3.5 0 1 0 0 5" stroke-width="2"/>`,
  },

  trademark: {
    o: `<path d="M3.5 7H10M6.75 7v10M13 17V7l3.75 5.5L20.5 7v10"/>`,
    bold: true,
  },

  registered: {
    o: `<circle cx="12" cy="12" r="9"/><path d="M9.5 16.5v-9h3a2.5 2.5 0 0 1 0 5h-3M12.5 12.5l2.5 4"/>`,
    f: `<circle cx="12" cy="12" r="9"/>`,
    cut: `<path d="M9.5 16.5v-9h3a2.5 2.5 0 0 1 0 5h-3M12.5 12.5l2.5 4" stroke-width="2"/>`,
  },

  // Generic open ring around code brackets (not the OSI keyhole mark).
  'open-source': {
    o: `<path d="M7.75 19.36A8.5 8.5 0 1 1 16.25 19.36M9.5 10 7 12.5 9.5 15M14.5 10l2.5 2.5-2.5 2.5"/>`,
    bold: true,
  },

  // Certificate with a ribboned seal.
  license: {
    o: `${CERT}<path d="M7 8h10M7 11.5h3.5"/>`,
    ocut: `<circle cx="16" cy="15" r="2.75" fill="#000" stroke-width="4.5"/><path d="${SEAL_TAILS}" fill="#000" stroke-width="4.5"/>`,
    otop: `${SEAL}<path d="${SEAL_TAILS}"/>`,
    f: CERT,
    cut: `<path d="M7 8h10M7 11.5h3.5" stroke-width="1.5"/><circle cx="16" cy="15" r="2.75" fill="#000" stroke-width="4.5"/><path d="${SEAL_TAILS}" fill="#000" stroke-width="4.5"/>`,
    top: `${SEAL}<path d="${SEAL_TAILS}Z"/>`,
  },

  'ai-chip-badge': {
    o: `${AI_FRAME}<path d="${AI_LETTERS}"/>`,
    ocut: `<path d="${AI_SPARK}" fill="#000" stroke-width="4.5"/>`,
    otop: `<path d="${AI_SPARK}"/>`,
    f: AI_FRAME,
    cut: `<path d="${AI_LETTERS}" stroke-width="2"/><path d="${AI_SPARK}" fill="#000" stroke-width="4.5"/>`,
    top: `<path d="${AI_SPARK}"/>`,
  },

  // Greek beta.
  beta: {
    o: `<path d="M8 20.5V7a3.5 3.5 0 0 1 7 0c0 1.95-1.55 3.5-3.5 3.5h.5a4 4 0 0 1 0 8c-1.75 0-3.25-.75-4-2"/>`,
    bold: true,
  },

  // Flask with a hero spark: experimental features.
  lab: {
    o: `<path d="${FLASK}"/><path d="M9 3h6"/><path d="${star(12, 15, 3.5)}"/>`,
    f: `<path d="${FLASK}Z"/><path d="M9 3h6"/>`,
    cut: `<path d="${star(12, 15, 3.75)}" fill="#000" stroke-width="1"/>`,
  },

  'infinity-loop': {
    o: `<path d="M12 12c-1.7-2.3-3-3.75-4.75-3.75a3.75 3.75 0 0 0 0 7.5c1.75 0 3.05-1.45 4.75-3.75Zm0 0c1.7 2.3 3 3.75 4.75 3.75a3.75 3.75 0 0 0 0-7.5c-1.75 0-3.05 1.45-4.75 3.75Z"/>`,
    bold: true,
  },

  atom: {
    o: `${ATOM}<circle cx="12" cy="12" r="1.25" fill="currentColor"/>`,
    bold: true,
  },

  'compass-rose': {
    o: `<path d="${ROSE}"/>`,
    f: `<path d="${ROSE}"/>`,
  },

  anchor: {
    o: `<circle cx="12" cy="5.25" r="1.75"/><path d="M12 7v13.25M8.5 10.25h7M5.5 13.75a6.5 6.5 0 0 0 13 0M3.5 15.75l2-2 2 2M16.5 15.75l2-2 2 2"/>`,
    bold: true,
  },

  'key-hole': {
    o: `<circle cx="12" cy="12" r="9"/><path d="${KEYHOLE}"/>`,
    f: `<circle cx="12" cy="12" r="9"/>`,
    cut: `<path d="${KEYHOLE}" fill="#000" stroke-width="1"/>`,
  },

  'puzzle-piece': {
    o: `<path transform="translate(-.5 0)" d="${PUZZLE}"/>`,
    f: `<path transform="translate(-.5 0)" d="${PUZZLE}"/>`,
  },

  'bolt-circle': {
    o: `<circle cx="12" cy="12" r="9"/><path d="${BOLT}"/>`,
    f: `<circle cx="12" cy="12" r="9"/>`,
    cut: `<path d="${BOLT}" fill="#000" stroke-width="1"/>`,
  },

  'hand-pointing': {
    o: `<path d="${HAND_POINT}"/><path d="${HAND_POINT_LINES}"/>`,
    f: `<path d="${HAND_POINT}"/>`,
    cut: `<path d="${HAND_POINT_LINES}" stroke-width="1.25"/>`,
  },

  'hand-stop': {
    o: `<path d="${HAND_STOP}"/><path d="${HAND_STOP_LINES}"/>`,
    f: `<path d="${HAND_STOP}"/>`,
    cut: `<path d="${HAND_STOP_LINES}" stroke-width="1.25"/>`,
  },

  'hand-peace': {
    o: `<path d="${HAND_PEACE}"/><path d="${HAND_PEACE_LINES}"/>`,
    f: `<path d="${HAND_PEACE}"/>`,
    cut: `<path d="${HAND_PEACE_LINES}" stroke-width="1.25"/>`,
  },

  // Open hand offering a heart.
  'hand-heart': {
    o: `<path d="${HEART_GIVEN}"/>${HAND_CUFF}<path d="${OPEN_HAND}"/>`,
    f: `<path d="${HEART_GIVEN}"/>${HAND_CUFF}<path fill="none" d="${OPEN_HAND}"/>`,
  },

  // AI pointer: spark leads the cursor.
  'cursor-sparkle': {
    o: `<path d="${star(7.5, 7.5, 4)}"/><path d="${CURSOR}"/>`,
    f: `<path d="${star(7.5, 7.5, 4)}"/><path d="${CURSOR}"/>`,
  },

  placeholder: {
    o: `<path d="${DASH_SQUARE}"/><path d="M9.5 9.5l5 5M14.5 9.5l-5 5"/>`,
    bold: true,
  },
};
