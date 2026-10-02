import { CLOUD } from '../shapes.mjs';

// Weather & nature. No sparks: weather and nature are not AI concepts.

const n2 = (v) => +v.toFixed(2);

// CLOUD (from shapes) placed with translate + scale; stroke compensated so it stays 1.75.
const cloudAt = (tx, ty, s, attrs = '', w = 1.75) =>
  `<path transform="translate(${tx} ${ty}) scale(${s})" stroke-width="${n2(w / s)}" d="${CLOUD}"${attrs}/>`;
// Same cloud as a solid knockout with a wide margin (for ocut/cut).
const cloudClear = (tx, ty, s, w = 4.5) => cloudAt(tx, ty, s, ' fill="#000"', w);
// Weather cloud sits high so precipitation fits beneath it (centreline y 3–15, x 4.2–19.8).
const WX = [2.6, -0.25, 0.8];
const wxCloud = (attrs = '') => cloudAt(...WX, attrs);

/** Union outline of n circles of radius r whose centres sit at distance d around (cx,cy): a lobed flower head. */
function lobes(cx, cy, n, d, r, rotDeg = -90) {
  const step = (2 * Math.PI) / n, half = step / 2;
  const h = d * Math.sin(half);
  const valley = d * Math.cos(half) + Math.sqrt(r * r - h * h);
  const large = d > valley * Math.cos(half) ? 1 : 0; // petal centre beyond the chord → major arc
  const pt = (rad, a) => `${n2(cx + rad * Math.cos(a))} ${n2(cy + rad * Math.sin(a))}`;
  let p = '';
  for (let i = 0; i < n; i++) {
    const a = (rotDeg * Math.PI) / 180 + i * step;
    if (i === 0) p += `M${pt(valley, a - half)}`;
    p += `A${r} ${r} 0 ${large} 1 ${pt(valley, a + half)}`;
  }
  return p + 'Z';
}

/** n-point star polygon (outer R, inner r), first point up. */
function starPoly(cx, cy, R, r, n = 5) {
  const pts = [];
  for (let i = 0; i < n * 2; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / n;
    const rad = i % 2 ? r : R;
    pts.push(`${n2(cx + rad * Math.cos(a))} ${n2(cy + rad * Math.sin(a))}`);
  }
  return `M${pts.join('L')}Z`;
}

const SUN_RAYS = 'M12 3v2.25M12 18.75V21M3 12h2.25M18.75 12H21M5.64 5.64l1.59 1.59M16.77 16.77l1.59 1.59M5.64 18.36l1.59-1.59M16.77 7.23l1.59-1.59';
const MOON = 'M12.5 3a6.25 6.25 0 0 0 8.5 8.5A8.5 8.5 0 1 1 12.5 3Z';
const UMBRELLA = 'M3 12a9 9 0 0 1 18 0c-1.5-1.3-3-1.3-4.5 0-1.5-1.3-3-1.3-4.5 0-1.5-1.3-3-1.3-4.5 0-1.5-1.3-3-1.3-4.5 0Z';
const DROP = 'M12 3c-2.5 3-6.5 7.25-6.5 11.5a6.5 6.5 0 0 0 13 0C18.5 10.25 14.5 6 12 3Z';
const FLAME = 'M12 21a6.5 6.5 0 0 0 6.5-6.5c0-4.5-3.5-6.5-4.5-11.5-2.5 2-3.5 4.5-3 7-1-.5-2-1.75-2.25-3C6.5 9 5.5 11.5 5.5 14.5A6.5 6.5 0 0 0 12 21Z';
const FLAME_CORE = 'M12 18.5a2.5 2.5 0 0 0 2.5-2.5c0-1.75-1.5-2.5-2.5-4-1 1.5-2.5 2.25-2.5 4a2.5 2.5 0 0 0 2.5 2.5Z';
const LEAF = 'M6 18C5 10 10 4.5 20 4c.5 10-4.5 15-14 14Z';
const TREE = 'M12 3a5.5 5.5 0 0 1 5.4 6.6A4 4 0 0 1 16 17H8a4 4 0 0 1-1.4-7.4A5.5 5.5 0 0 1 12 3Z';
const FLOWER = lobes(12, 9.25, 5, 3.1, 2.6);

// Recycle: one arm (left side → bottom-left corner → bottom side, arrowhead pointing right), repeated at 120°.
const RC = [12, 13]; // triangle centroid
const RECYCLE_ARM = 'M6.9 12.34 4.9 15.8Q3.77 17.75 6.02 17.75h4.65M8.67 15.75l2 2-2 2';
const recycle = (attrs = '') =>
  [0, 120, 240].map((a) => `<path transform="rotate(${a} ${RC[0]} ${RC[1]})" d="${RECYCLE_ARM}"${attrs}/>`).join('');

// Planet ring: ellipse rx 9.5 ry 3.25 tilted -20°, split into the back (upper) and front (lower) halves.
const RING_BACK = 'M3.07 15.25A9.5 3.25 -20 0 1 20.93 8.75';
const RING_FRONT = 'M3.07 15.25A9.5 3.25 -20 0 0 20.93 8.75';

const PAW_PAD = 'M12 12c-2.5 0-5.5 3.5-5.5 6 0 1.5 1 2.5 2.5 2.5 1.25 0 2-.75 3-.75s1.75.75 3 .75c1.5 0 2.5-1 2.5-2.5 0-2.5-3-6-5.5-6Z';
const PAW_TOES = '<ellipse cx="5.25" cy="10.75" rx="1.75" ry="2.25" transform="rotate(-20 5.25 10.75)"/><ellipse cx="9" cy="5.75" rx="1.75" ry="2.5"/><ellipse cx="15" cy="5.75" rx="1.75" ry="2.5"/><ellipse cx="18.75" cy="10.75" rx="1.75" ry="2.25" transform="rotate(20 18.75 10.75)"/>';

const FISH = 'M3 12c1.75-3.25 4.75-5.5 8.25-5.5 2.75 0 4.75 1.25 6.25 3.25L21 7v10l-3.5-2.75c-1.5 2-3.5 3.25-6.25 3.25-3.5 0-6.5-2.25-8.25-5.5Z';
const BIRD = 'M4 17.5h7.5a7 7 0 0 0 7-7V8.5a3.5 3.5 0 0 0-6.75-1.3L7.5 15.5';
const BIRD_FILL = 'M4 17.5h7.5a7 7 0 0 0 7-7V8.5a3.5 3.5 0 0 0-6.75-1.3L7.5 15.5C6.5 16.5 5.5 17 4 17.5Z';

export default {
  sun: {
    o: `<circle cx="12" cy="12" r="3.75"/><path d="${SUN_RAYS}"/>`,
    f: `<circle cx="12" cy="12" r="3.75"/><path d="${SUN_RAYS}"/>`,
  },

  moon: {
    o: `<path d="${MOON}"/>`,
    f: `<path d="${MOON}"/>`,
  },

  // Sun peeks out behind a cloud at the lower right.
  'cloud-sun': {
    o: `<circle cx="8.75" cy="9" r="3"/><path d="M8.75 3.25v1M3 9h1M4.68 4.93l.71.71M12.82 4.93l-.71.71M4.68 13.07l.71-.71"/>${cloudAt(3.75, 4.8, 0.8)}`,
    ocut: cloudClear(3.75, 4.8, 0.8),
    otop: cloudAt(3.75, 4.8, 0.8),
    f: `<circle cx="8.75" cy="9" r="3"/><path d="M8.75 3.25v1M3 9h1M4.68 4.93l.71.71M12.82 4.93l-.71.71M4.68 13.07l.71-.71"/>`,
    cut: cloudClear(3.75, 4.8, 0.8),
    top: cloudAt(3.75, 4.8, 0.8),
  },

  'cloud-rain': {
    o: `${wxCloud()}<path d="M8.5 18l-1 2.75M12.5 18l-1 2.75M16.5 18l-1 2.75"/>`,
    f: `${wxCloud()}<path d="M8.5 18l-1 2.75M12.5 18l-1 2.75M16.5 18l-1 2.75"/>`,
  },

  'cloud-snow': {
    o: `${wxCloud()}<path d="M8 18h.01M12 18h.01M16 18h.01M10 20.75h.01M14 20.75h.01"/>`,
    f: `${wxCloud()}<path d="M8 18h.01M12 18h.01M16 18h.01M10 20.75h.01M14 20.75h.01" stroke-width="2"/>`,
  },

  'cloud-lightning': {
    o: wxCloud(),
    ocut: `<path d="M13.5 11 10.25 16h4l-2.75 4.75" stroke-width="5"/>`,
    otop: `<path d="M13.5 11 10.25 16h4l-2.75 4.75"/>`,
    f: wxCloud(),
    cut: `<path d="M13.5 11 10.25 16h4l-2.75 4.75" stroke-width="5"/>`,
    top: `<path d="M13.5 11 10.25 16h4l-2.75 4.75" fill="none"/>`,
  },

  'cloud-fog': {
    o: `${wxCloud()}<path d="M5 18h14M8 21h8"/>`,
    f: `${wxCloud()}<path d="M5 18h14M8 21h8"/>`,
  },

  wind: {
    o: `<path d="M3.5 8.25h6a2.25 2.25 0 1 0-2.25-2.25M3.5 12.25h13.75a2.75 2.75 0 1 0-2.75-2.75M3.5 16h9.5a2.25 2.25 0 1 1-2.25 2.25"/>`,
    bold: true,
  },

  snowflake: {
    o: [0, 60, 120, 180, 240, 300].map((a) => `<path transform="rotate(${a} 12 12)" d="M12 12V3.5M9.75 5 12 7.25l2.25-2.25"/>`).join(''),
    bold: true,
  },

  umbrella: {
    o: `<path d="${UMBRELLA}"/><path d="M12 12v6.5a2 2 0 0 1-4 0"/>`,
    f: `<path d="${UMBRELLA}"/><path fill="none" d="M12 12v6.5a2 2 0 0 1-4 0"/>`,
  },

  rainbow: {
    o: `<path d="M3.5 16.25a8.5 8.5 0 0 1 17 0M6.5 16.25a5.5 5.5 0 0 1 11 0M9.5 16.25a2.5 2.5 0 0 1 5 0"/>`,
    bold: true,
  },

  droplet: {
    o: `<path d="${DROP}"/><path d="M8.75 14.5a3.25 3.25 0 0 0 3.25 3.25"/>`,
    f: `<path d="${DROP}"/>`,
    cut: `<path d="M8.75 14.5a3.25 3.25 0 0 0 3.25 3.25" stroke-width="1.5"/>`,
  },

  flame: {
    o: `<path d="${FLAME}"/><path d="${FLAME_CORE}"/>`,
    f: `<path d="${FLAME}"/>`,
    cut: `<path d="${FLAME_CORE}" stroke-width="1.5"/>`,
  },

  leaf: {
    o: `<path d="${LEAF}"/><path d="M3.5 20.5c3.5-4.5 7-8 11-11"/>`,
    f: `<path d="${LEAF}"/><path d="M3.5 20.5 6 18"/>`,
    cut: `<path d="M6.5 17.5c2.5-3.25 5-5.75 8-8" stroke-width="1.5"/>`,
  },

  tree: {
    o: `<path d="${TREE}"/><path d="M12 21v-9M12 14.5l-2.5-2.5"/>`,
    f: `<path d="${TREE}"/><path d="M12 21v-4"/>`,
    cut: `<path d="M12 18v-6M12 14.5l-2.5-2.5" stroke-width="1.5"/>`,
  },

  flower: {
    o: `<path d="${FLOWER}"/><circle cx="12" cy="9.25" r="1.25"/><path d="M12 13.5V21M12 20.25c2.5 0 4.25-1.5 4.75-3.75-2.5 0-4.25 1.5-4.75 3.75Z"/>`,
    f: `<path d="${FLOWER}"/><path d="M12 13.5V21M12 20.25c2.5 0 4.25-1.5 4.75-3.75-2.5 0-4.25 1.5-4.75 3.75Z"/>`,
    cut: `<circle cx="12" cy="9.25" r="1.5" fill="#000" stroke="none"/>`,
  },

  sprout: {
    o: `<path d="M12 21v-9M12 12c0-3.75-2.5-6-7-6 0 4 2.5 6.25 7 6ZM12 10c0-3.5 2.5-6 7-6 0 4-2.5 6.25-7 6ZM7.5 21h9"/>`,
    f: `<path d="M12 12c0-3.75-2.5-6-7-6 0 4 2.5 6.25 7 6ZM12 10c0-3.5 2.5-6 7-6 0 4-2.5 6.25-7 6Z"/><path d="M12 21v-9M7.5 21h9"/>`,
  },

  recycle: {
    o: recycle(),
    bold: true,
  },

  // Leaf whose stem loops back on itself.
  eco: {
    o: `<path d="M10 14.5C9 8.5 12.5 4 20 3.5c.5 7.5-3.5 11.5-10 11Z"/><path d="M10 14.5c-1.5 1.5-3.5 1.75-4.5.75s-.5-2.75 1-2.75 2.25 2 1.5 4.25L6.5 20.5M10 14.5 15 9"/>`,
    f: `<path d="M10 14.5C9 8.5 12.5 4 20 3.5c.5 7.5-3.5 11.5-10 11Z"/><path fill="none" d="M10 14.5c-1.5 1.5-3.5 1.75-4.5.75s-.5-2.75 1-2.75 2.25 2 1.5 4.25L6.5 20.5"/>`,
    cut: `<path d="M11.5 13 15.5 8.75" stroke-width="1.5"/>`,
  },

  planet: {
    o: `<circle cx="12" cy="12" r="5.5"/><path d="${RING_BACK}"/>`,
    ocut: `<circle cx="12" cy="12" r="4.6" fill="#000" stroke="none"/><path d="${RING_FRONT}" stroke-width="4.5"/>`,
    otop: `<path d="${RING_FRONT}"/>`,
    f: `<circle cx="12" cy="12" r="5.5"/><path fill="none" d="${RING_BACK}"/>`,
    cut: `<path d="${RING_FRONT}" stroke-width="4.5"/>`,
    top: `<path fill="none" d="${RING_FRONT}"/>`,
  },

  'star-shooting': {
    o: `<path d="${starPoly(15.25, 9, 5.75, 2.6)}"/><path d="M9.25 15.25 3.5 21M6 12.5l-3 3M12.5 18l-3 3"/>`,
    f: `<path d="${starPoly(15.25, 9, 5.75, 2.6)}"/><path d="M9.25 15.25 3.5 21M6 12.5l-3 3M12.5 18l-3 3"/>`,
  },

  paw: {
    o: `<path d="${PAW_PAD}"/>${PAW_TOES}`,
    f: `<path d="${PAW_PAD}"/>${PAW_TOES}`,
  },

  // Songbird in profile: head, beak, wing, tail and legs.
  bird: {
    o: `<path d="${BIRD}"/><path d="M18.5 8.5 21 9.25 18.5 10M15.5 8h.01M8 17.5c3-1 5-3.5 5.5-6.5M10 17.5v3M13.5 17.25v3.25"/>`,
    f: `<path d="${BIRD_FILL}"/><path d="M18.5 8.5 21 9.25 18.5 10Z"/><path fill="none" d="M10 17.5v3M13.5 17.25v3.25"/>`,
    cut: `<path d="M15.5 8h.01" stroke-width="2"/><path d="M8.5 16c2.75-1 4.5-3.25 5-6" stroke-width="1.5"/>`,
  },

  fish: {
    o: `<path d="${FISH}"/><path d="M7 11.25h.01M11.5 9.25c.75 1.75.75 3.75 0 5.5"/>`,
    f: `<path d="${FISH}"/>`,
    cut: `<path d="M7 11.25h.01" stroke-width="2.25"/><path d="M11.5 9.25c.75 1.75.75 3.75 0 5.5" stroke-width="1.5"/>`,
  },

  // Ladybug.
  'bug-insect': {
    o: `<circle cx="12" cy="14" r="6.75"/><path d="M8.75 8.25a3.25 3.25 0 0 1 6.5 0M12 7.25v13.5M10 5.25 8.5 3M14 5.25 15.5 3M9 12.5h.01M15 12.5h.01M9 16.5h.01M15 16.5h.01"/>`,
    f: `<circle cx="12" cy="14" r="6.75"/><path d="M8.75 8.25a3.25 3.25 0 0 1 6.5 0Z"/><path d="M10 5.25 8.5 3M14 5.25 15.5 3"/>`,
    cut: `<path d="M12 8v13M7.5 8.5h9" stroke-width="1.5"/><path d="M9 12.5h.01M15 12.5h.01M9 16.5h.01M15 16.5h.01" stroke-width="2.25"/>`,
  },
};
