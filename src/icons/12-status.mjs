import { star, BELL, BELL_CLAPPER, SLASH, SLASH_CLEAR, BADGE, BADGE_CLEAR, BUBBLE } from '../shapes.mjs';
import { poly, gear } from '../helpers.mjs';

// ── local helpers ────────────────────────────────────────────────────────────
const n = (v) => +v.toFixed(2);
const hole = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#000" stroke="none"/>`;
const K = (d, w = 1.75) => `<path d="${d}" stroke-width="${w}"/>`; // knockout line(s)
const pol = (cx, cy, r, deg) => {
  const t = (deg * Math.PI) / 180;
  return [n(cx + r * Math.cos(t)), n(cy + r * Math.sin(t))];
};
/** Clockwise arc on a circle from angle a0 to a1 (degrees). */
const arc = (cx, cy, r, a0, a1) => {
  const [x0, y0] = pol(cx, cy, r, a0);
  const [x1, y1] = pol(cx, cy, r, a1);
  return `M${x0} ${y0}A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1}`;
};

const CIRCLE = '<circle cx="12" cy="12" r="9"/>';
/** Circle with an interior glyph: stroked in outline, knocked out of the disc in filled. */
const circ = (d) => ({ o: `${CIRCLE}<path d="${d}"/>`, f: CIRCLE, cut: K(d) });

const TRIANGLE = 'M10.27 5.25a2 2 0 0 1 3.46 0l7 12.25A2 2 0 0 1 19 20.5H5a2 2 0 0 1-1.73-3Z';
const DIAMOND = '<rect x="5.5" y="5.5" width="13" height="13" rx="2.5" transform="rotate(45 12 12)"/>';
const OCTAGON = poly(12, 12, 9.25, 8, 22.5);

// Bells: same as `bell` (accent spark) plus the modifier.
const BELL_O = `<path d="${BELL}"/><path d="${BELL_CLAPPER}"/><path d="${star(12, 10.5, 2.75)}"/>`;
const BELL_F = `<path d="${BELL}"/><path d="${BELL_CLAPPER}Z"/>`;
const BELL_CUT = `<path d="${star(12, 10.5, 3)}" fill="#000" stroke-width="1"/>`;
const RING_WAVES = 'M3 8.5c0-2 .6-3.75 1.75-5.25M21 8.5c0-2-.6-3.75-1.75-5.25';
const DOT_CLEAR = '<circle cx="18" cy="5.5" r="2.25" fill="#000" stroke-width="4.25"/>';

// notification-badge: frame opened around a corner dot.
const NB_FRAME = 'M12.5 3.5H6A2.5 2.5 0 0 0 3.5 6v12A2.5 2.5 0 0 0 6 20.5h12a2.5 2.5 0 0 0 2.5-2.5v-6.5';
const NB_FRAME_F = `${NB_FRAME}A6.04 6.04 0 0 1 12.5 3.5Z`;

const LOADER = [0, 45, 90, 135, 180, 225, 270, 315]
  .map((a) => { const [x0, y0] = pol(12, 12, 4.5, a); const [x1, y1] = pol(12, 12, 8.5, a); return `M${x0} ${y0}L${x1} ${y1}`; })
  .join('');

const HOURGLASS = 'M7.5 3v2.5c0 2.5 2 4 4.5 6.5 2.5-2.5 4.5-4 4.5-6.5V3M7.5 21v-2.5c0-2.5 2-4 4.5-6.5 2.5 2.5 4.5 4 4.5 6.5V21';

/** Dashed ring: 8 arc segments of `span` degrees, gaps centred top/bottom/sides. */
const dashRing = (span) => [0, 45, 90, 135, 180, 225, 270, 315].map((a) => arc(12, 12, 9, a + 22.5 - span / 2, a + 22.5 + span / 2)).join('');

// Status dots share a r8 disc.
const STATUS = '<circle cx="12" cy="12" r="8"/>';
const GLOW = (() => {
  const w = (r, h) => {
    const [lx1, ly1] = pol(12, 12, r, 180 + h), [lx2, ly2] = pol(12, 12, r, 180 - h);
    const [rx1, ry1] = pol(12, 12, r, -h), [rx2, ry2] = pol(12, 12, r, h);
    return `M${lx1} ${ly1}A${r} ${r} 0 0 0 ${lx2} ${ly2}M${rx1} ${ry1}A${r} ${r} 0 0 1 ${rx2} ${ry2}`;
  };
  return w(7, 45);
})();
const MOON ='M11.62 4.01A8 8 0 1 0 19.99 12.38A6 6 0 0 1 11.62 4.01Z';

// new-badge: 12-point burst.
const BURST = (() => {
  let d = '';
  for (let i = 0; i < 24; i++) {
    const [x, y] = pol(12, 12, i % 2 ? 7.25 : 9, -90 + i * 15);
    d += `${i ? 'L' : 'M'}${x} ${y}`;
  }
  return d + 'Z';
})();

// beta-badge: tag with a flask.
const TAG = 'M3.5 12 7.25 5.75A2 2 0 0 1 8.9 5h9.6A2.5 2.5 0 0 1 21 7.5v9a2.5 2.5 0 0 1-2.5 2.5H8.9a2 2 0 0 1-1.65-.75Z';
const FLASK = 'M12.5 8.25v2.5L10 14.5a.75.75 0 0 0 .62 1.17h6.76a.75.75 0 0 0 .62-1.17l-2.5-3.75v-2.5M11.75 8.25h4.5';

const BOLT = 'M13.5 3 4.75 13.5h6.75l-1 7.5 8.75-10.75H12.5Z';
const FLAME = 'M12 21c-3.9 0-7-2.8-7-6.75 0-2.8 1.6-4.6 3-6 .3 1.7 1.2 2.75 2.5 3.25-.4-3.5 1.1-6.5 4-8.5.3 2.9 1.5 4.4 3 6 1.2 1.3 1.5 3 1.5 5.25 0 3.95-3.1 6.75-7 6.75Z';

// rocket (drawn upright, tilted 45°)
const ROCKET_T = 'translate(1.15 -1.15) rotate(45 12 12)';
const ROCKET_BODY = 'M12 2.75c2.75 1.85 4.5 4.75 4.5 8.5v4.25h-9v-4.25c0-3.75 1.75-6.65 4.5-8.5Z';
const ROCKET_FINS = 'M7.5 12 5 14.5V18l2.5-2.5M16.5 12l2.5 2.5V18l-2.5-2.5';
const ROCKET_FLAME = 'M10.5 18.5 12 21l1.5-2.5';

const CUP = 'M7 3.5h10v6a5 5 0 0 1-10 0Z';
const HANDLES = 'M7 5.5H5.25A1.75 1.75 0 0 0 3.5 7.25c0 2 1.5 3.75 3.75 4M17 5.5h1.75a1.75 1.75 0 0 1 1.75 1.75c0 2-1.5 3.75-3.75 4';
const TROPHY_BASE = 'M12 14.5v6M7.5 20.5h9';

/** Five-point star, point up. */
const star5 = (cx, cy, R, r = R * 0.5) => {
  let d = '';
  for (let i = 0; i < 10; i++) {
    const [x, y] = pol(cx, cy, i % 2 ? r : R, -90 + i * 36);
    d += `${i ? 'L' : 'M'}${x} ${y}`;
  }
  return d + 'Z';
};
const MEDAL_STRAPS = 'M7.5 3l3.25 6.5M16.5 3l-3.25 6.5';
const MEDAL_STAR = star5(12, 15, 2.5);
const AWARD_TAILS = 'M8.5 13.9 7.5 21l4.5-2.5 4.5 2.5-1-7.1';

const CONE = 'M3.5 20.5 7.75 9 15 16.25Z';
const POP_BITS = 'M10 5.5c.5-1 1.5-1.75 2.75-2M15 9l3-3M17.5 13.5c1-.5 2.25-.5 3.25 0M20 3.5h.01';

const GIFT_LID = '<rect x="3.5" y="7.5" width="17" height="4" rx="1.5"/>';
const GIFT_BOX = 'M5 11.5v7a2.5 2.5 0 0 0 2.5 2.5h9a2.5 2.5 0 0 0 2.5-2.5v-7';
const GIFT_BOW = 'M12 7.5c-1.5 0-4.25-.6-4.25-2.5a1.75 1.75 0 0 1 3.1-1.1C11.6 4.8 12 6.1 12 7.5c0-1.4.4-2.7 1.15-3.6a1.75 1.75 0 0 1 3.1 1.1c0 1.9-2.75 2.5-4.25 2.5';

const CONFETTI = 'M3.5 7.5c1.5 0 1.5-2 3-2s1.5-2 3-2M14.5 4.5h.01M18 3.5l2.5 2.5M10.5 12l2-2M14 20c0-1.5 2-1.5 2-3s2-1.5 2-3M20.5 10.5h.01M8.5 20h.01';

// thumbs-up from 02-chat, scaled into a circle.
const HAND = 'M7 10l3.6-5.9a1.8 1.8 0 0 1 3.3 1.3L13.2 10h5.1a2 2 0 0 1 1.95 2.45l-1.5 6.6a2 2 0 0 1-1.95 1.55H7Z';
const CUFF = 'M7 10H4a1 1 0 0 0-1 1v8.6a1 1 0 0 0 1 1h3';
const THUMB_T = 'translate(12 12) scale(.55) translate(-11.65 -12.1)';

const QMARK = 'M9.75 8.5a2.3 2.3 0 0 1 4.5.65c0 1.4-2.25 1.75-2.25 3.1M12 15h.01';

const BUOY_BANDS = [45, 135, 225, 315].map((a) => { const [x0, y0] = pol(12, 12, 4, a); const [x1, y1] = pol(12, 12, 9, a); return `M${x0} ${y0}L${x1} ${y1}`; }).join('');

// bug (same geometry as malware in 11-security)
const BUG_BODY = 'M12 20.75c-2.9 0-5.25-2.35-5.25-5.25v-3.25A3.5 3.5 0 0 1 10.25 8.75h3.5a3.5 3.5 0 0 1 3.5 3.5v3.25c0 2.9-2.35 5.25-5.25 5.25Z';
const BUG_HEAD = 'M9.25 8.75V8a2.75 2.75 0 0 1 5.5 0v.75';
const BUG_LEGS = 'M10.42 5.75 9 3.75M13.58 5.75 15 3.75M6.75 13H3.5M17.25 13h3.25M6.75 17l-3 1.5M17.25 17l3 1.5M7.25 10.25 5 8M16.75 10.25 19 8';
const FLAG_BADGE = 'M15.5 21.5v-6.75M15.5 14.75h5l-1 2 1 2h-5Z';

const RATING = `${star5(12, 9.5, 4.5)}${star5(6, 17, 3)}${star5(18, 17, 3)}`;
const POLL_BARS = 'M9 13.25v-2.5M12 13.25v-5M15 13.25v-3.5';

const BOARD = 'M8.5 4.5H7A2.5 2.5 0 0 0 4.5 7v11.5A2.5 2.5 0 0 0 7 21h10a2.5 2.5 0 0 0 2.5-2.5V7A2.5 2.5 0 0 0 17 4.5h-1.5';
const CLIP = '<rect x="8.5" y="3" width="7" height="3" rx="1"/>';
const RADIOS = '<circle cx="9" cy="10.5" r="1.5"/><circle cx="9" cy="16.5" r="1.5"/>';
const SURVEY_LINES = 'M13.5 10.5h3M13.5 16.5h3';

const BOX_BODY = 'M4.5 10v8A2.5 2.5 0 0 0 7 20.5h10a2.5 2.5 0 0 0 2.5-2.5v-8Z';
const BOX_FLAPS = 'M4.5 10 3 5.5h6.5L12 10M19.5 10l1.5-4.5h-6.5L12 10';
const TRAY = 'M3 13v5.5A2.5 2.5 0 0 0 5.5 21h13a2.5 2.5 0 0 0 2.5-2.5V13h-5l-1.5 2.5h-5L8 13Z';

// maintenance: wrench (upright, then tilted) in front of a small gear.
const WRENCH = 'M10.5 2.52V5.25h3V2.52A4.25 4.25 0 0 1 13.5 10.48V19.5a1.5 1.5 0 0 1-3 0V10.48A4.25 4.25 0 0 1 10.5 2.52Z';
const WRENCH_T = 'rotate(45 12 12)';
const SMALL_GEAR = gear(16.5, 16.5, 6, 4.5, 3.25, 0.3, 0.45);
const WRENCH_CLEAR = `<path transform="${WRENCH_T}" d="${WRENCH}" fill="#000" stroke-width="4.25"/>`;

const CONE_TRAFFIC = 'M10.25 3.5h3.5l4.75 17.5h-13Z';
const TICKET = 'M3 9V7.5A2.5 2.5 0 0 1 5.5 5h13A2.5 2.5 0 0 1 21 7.5V9a3 3 0 0 0 0 6v1.5a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 16.5V15a3 3 0 0 0 0-6Z';
const PERF = 'M15 7.5v1M15 11.5v1M15 15.5v1';

export default {
  info: {
    o: `<path d="M10.5 10.5H12V19M10 19h4"/><path d="M12 5.75h.01" stroke-width="2.5"/>`,
    bold: true,
  },

  'info-circle': circ('M12 11v5.5M12 7.75h.01'),
  help: circ('M9.5 9.25a2.6 2.6 0 0 1 5 .9c0 1.75-2.5 2.1-2.5 3.6M12 16.75h.01'),
  'alert-circle': circ('M12 7.5v5M12 16.25h.01'),

  'alert-triangle': {
    o: `<path d="${TRIANGLE}"/><path d="M12 9.75v4M12 17h.01"/>`,
    f: `<path d="${TRIANGLE}"/>`,
    cut: K('M12 9.75v4M12 17h.01'),
  },

  'alert-octagon': {
    o: `<path d="${OCTAGON}"/><path d="M12 7.5v5M12 16.25h.01"/>`,
    f: `<path d="${OCTAGON}"/>`,
    cut: K('M12 7.5v5M12 16.25h.01'),
  },

  error: circ('m9 9 6 6m0-6-6 6'),
  success: circ('m8.25 12.25 2.5 2.5 5-5'),

  // Road-sign diamond.
  warning: {
    o: `${DIAMOND}<path d="M12 8v4.5M12 15.75h.01"/>`,
    f: DIAMOND,
    cut: K('M12 8v4.5M12 15.75h.01'),
  },

  // Accent spark rings inside the bell.
  bell: {
    o: `<path d="${BELL}"/><path d="${BELL_CLAPPER}"/><path d="${star(12, 10.5, 2.75)}"/>`,
    f: `<path d="${BELL}"/><path d="${BELL_CLAPPER}Z"/>`,
    cut: `<path d="${star(12, 10.5, 3)}" fill="#000" stroke-width="1"/>`,
  },

  // "-off" pattern: clear a wide band along the diagonal, draw the slash on top.
  'bell-off': {
    o: `<path d="${BELL}"/><path d="${BELL_CLAPPER}"/>`,
    ocut: SLASH_CLEAR,
    otop: SLASH,
    f: `<path d="${BELL}"/><path d="${BELL_CLAPPER}Z"/>`,
    cut: SLASH_CLEAR,
    top: SLASH,
  },

  'bell-ring': {
    o: `${BELL_O}<path d="${RING_WAVES}"/>`,
    f: `${BELL_F}<path d="${RING_WAVES}" fill="none"/>`,
    cut: BELL_CUT,
  },

  'bell-plus': {
    o: BELL_O,
    ocut: BADGE_CLEAR,
    otop: `<path d="${BADGE.plus}"/>`,
    f: BELL_F,
    cut: `${BELL_CUT}${BADGE_CLEAR}`,
    top: `<path d="${BADGE.plus}"/>`,
  },

  // Unread dot at the top right.
  'bell-dot': {
    o: BELL_O,
    ocut: DOT_CLEAR,
    otop: '<circle cx="18" cy="5.5" r="2.25"/>',
    f: BELL_F,
    cut: `${BELL_CUT}${DOT_CLEAR}`,
    top: '<circle cx="18" cy="5.5" r="2.25"/>',
  },

  'notification-badge': {
    o: `<path d="${NB_FRAME}"/><circle cx="18" cy="6" r="3"/>`,
    f: `<path d="${NB_FRAME_F}"/><circle cx="18" cy="6" r="3"/>`,
  },

  loader: {
    o: `<path d="${LOADER}"/>`,
    bold: true,
  },

  'loader-circle': {
    o: `<path d="M12 3.5a8.5 8.5 0 1 1-8.5 8.5"/>`,
    bold: true,
  },

  hourglass: {
    o: `<path d="M6 3h12M6 21h12"/><path d="${HOURGLASS}"/>`,
    f: `<path d="M6 3h12M6 21h12"/><path d="M7.5 3v2.5c0 2.5 2 4 4.5 6.5 2.5-2.5 4.5-4 4.5-6.5V3ZM7.5 21v-2.5c0-2.5 2-4 4.5-6.5 2.5 2.5 4.5 4 4.5 6.5V21Z"/>`,
  },

  // Clock whose last quarter is still dotted.
  'clock-pending': {
    o: `<path d="M21 12a9 9 0 1 1-9-9M12 7.5V12l3 2"/><path d="M16.5 4.21h.01M19.79 7.5h.01" stroke-width="2.25"/>`,
    bold: true,
  },

  'circle-dashed': {
    o: `<path d="${dashRing(25)}"/>`,
    f: `<path d="${dashRing(20)}" fill="none" stroke-width="2.5"/>`,
  },

  'circle-dot': {
    o: `${CIRCLE}<circle cx="12" cy="12" r="2" fill="currentColor"/>`,
    f: CIRCLE,
    cut: '<circle cx="12" cy="12" r="4.5"/>',
  },

  'circle-half': {
    o: `${CIRCLE}<path d="M12 3a9 9 0 0 1 0 18Z" fill="currentColor"/>`,
    f: CIRCLE,
    cut: '<path d="M12 5.5a6.5 6.5 0 0 0 0 13Z" fill="#000" stroke="none"/>',
  },

  // Progress ring around a check.
  'circle-check-filled-partial': {
    o: `<path d="M12 3a9 9 0 1 1-9 9"/><path d="m8.5 12.25 2.5 2.5 4.75-5"/>`,
    f: `<path d="M12 3a9 9 0 1 1-9 9" fill="none"/><circle cx="12" cy="12" r="5.75"/>`,
    cut: K('m9.5 12.25 1.75 1.75 3.25-3.5', 1.5),
  },

  progress: {
    o: `<rect x="3" y="8.5" width="18" height="7" rx="3.5"/><path d="M6.5 12h6" stroke-width="2.5"/>`,
    f: '<rect x="3" y="8.5" width="18" height="7" rx="3.5"/>',
    cut: K('M15.75 12h1.75', 2.5),
  },

  // Status dots (r8 disc family).
  // Live dot radiating a glow.
  online: {
    o: `<circle cx="12" cy="12" r="3" fill="currentColor"/><path d="${GLOW}"/>`,
    f: `<circle cx="12" cy="12" r="3.75"/><path d="${GLOW}" fill="none" stroke-width="2.25"/>`,
  },

  offline: {
    o: STATUS,
    ocut: SLASH_CLEAR,
    otop: SLASH,
    f: STATUS,
    cut: SLASH_CLEAR,
    top: SLASH,
  },

  away: {
    o: `<path d="${MOON}"/>`,
    f: `<path d="${MOON}"/>`,
  },

  busy: {
    o: `${STATUS}<path d="M8.5 12h7"/>`,
    f: STATUS,
    cut: K('M8.5 12h7', 2),
  },

  'new-badge': {
    o: `<path d="${BURST}"/>`,
    f: `<path d="${BURST}"/>`,
  },

  'beta-badge': {
    o: `<path d="${TAG}"/><path d="${FLASK}"/>`,
    f: `<path d="${TAG}"/>`,
    cut: K(FLASK, 1.5),
  },

  lightning: {
    o: `<path d="${BOLT}"/>`,
    f: `<path d="${BOLT}"/>`,
  },

  fire: {
    o: `<path d="${FLAME}"/>`,
    f: `<path d="${FLAME}"/>`,
  },

  rocket: {
    o: `<g transform="${ROCKET_T}"><path d="${ROCKET_BODY}"/><circle cx="12" cy="10.5" r="1.5"/><path d="${ROCKET_FINS}"/><path d="${ROCKET_FLAME}"/></g>`,
    f: `<g transform="${ROCKET_T}"><path d="${ROCKET_BODY}"/><path d="${ROCKET_FINS}Z" /><path d="${ROCKET_FLAME}" fill="none"/></g>`,
    cut: `<circle transform="${ROCKET_T}" cx="12" cy="10.5" r="1.75" fill="#000" stroke="none"/>`,
  },

  trophy: {
    o: `<path d="${CUP}"/><path d="${HANDLES}"/><path d="${TROPHY_BASE}"/>`,
    f: `<path d="${CUP}"/><path d="${HANDLES}" fill="none"/><path d="${TROPHY_BASE}"/>`,
  },

  medal: {
    o: `<path d="${MEDAL_STRAPS}"/><circle cx="12" cy="15" r="5.5"/><path d="${MEDAL_STAR}"/>`,
    f: `<path d="${MEDAL_STRAPS}"/><circle cx="12" cy="15" r="5.5"/>`,
    cut: `<path d="${MEDAL_STAR}" fill="#000" stroke-width="1"/>`,
  },

  award: {
    o: `<circle cx="12" cy="9" r="6"/><circle cx="12" cy="9" r="2.75"/><path d="${AWARD_TAILS}"/>`,
    f: `<circle cx="12" cy="9" r="6"/><path d="${AWARD_TAILS}Z"/>`,
    cut: '<circle cx="12" cy="9" r="2.75" stroke-width="1.5"/>',
  },

  // Party popper.
  celebrate: {
    o: `<path d="${CONE}"/><path d="${POP_BITS}"/>`,
    f: `<path d="${CONE}"/><path d="${POP_BITS}" fill="none" stroke-width="2"/>`,
  },

  gift: {
    o: `${GIFT_LID}<path d="${GIFT_BOX}"/><path d="M12 7.5V21"/><path d="${GIFT_BOW}"/>`,
    f: `${GIFT_LID}<path d="${GIFT_BOX}Z"/><path d="${GIFT_BOW}" fill="none"/>`,
    cut: K('M1 11.5h22M12 7.5V21', 1.5),
  },

  confetti: {
    o: `<path d="${CONFETTI}"/><circle cx="6.5" cy="14" r="1.5"/>`,
    f: `<path d="${CONFETTI}" fill="none" stroke-width="2.25"/><circle cx="6.5" cy="14" r="1.75"/>`,
  },

  'thumbs-up-circle': {
    o: `${CIRCLE}<g transform="${THUMB_T}" stroke-width="3.18"><path d="${HAND}"/><path d="${CUFF}"/></g>`,
    f: CIRCLE,
    cut: `<g transform="${THUMB_T}" stroke-width="1.82" fill="#000"><path d="${HAND}"/><path d="${CUFF}Z"/></g>`,
    top: `<path transform="${THUMB_T}" d="M7 10.5v9.6" stroke-width="2.7"/>`,
  },

  'question-chat': {
    o: `<path d="${BUBBLE}"/><path d="${QMARK}"/>`,
    f: `<path d="${BUBBLE}"/>`,
    cut: K(QMARK),
  },

  lifebuoy: {
    o: `${CIRCLE}<circle cx="12" cy="12" r="4"/><path d="${BUOY_BANDS}"/>`,
    f: CIRCLE,
    cut: `${hole(12, 12, 3.25)}${K(BUOY_BANDS, 1.5)}`,
  },

  // Bug with a flag badge.
  'bug-report': {
    o: `<path d="${BUG_BODY}"/><path d="${BUG_HEAD}"/><path d="${BUG_LEGS}"/><path d="M12 20.75v-8"/>`,
    ocut: BADGE_CLEAR,
    otop: `<path d="${FLAG_BADGE}"/>`,
    f: `<path d="${BUG_BODY}"/><path d="${BUG_HEAD}"/><path d="${BUG_LEGS}" fill="none"/>`,
    cut: `${K('M12 21v-8.25', 1.5)}${BADGE_CLEAR}`,
    top: `<path d="${FLAG_BADGE}"/>`,
  },

  rating: {
    o: `<path d="${RATING}"/>`,
    f: `<path d="${RATING}"/>`,
  },

  poll: {
    o: `<path d="${BUBBLE}"/><path d="${POLL_BARS}"/>`,
    f: `<path d="${BUBBLE}"/>`,
    cut: K(POLL_BARS),
  },

  // Clipboard with radio options.
  survey: {
    o: `<path d="${BOARD}"/>${CLIP}${RADIOS}<path d="${SURVEY_LINES}"/>`,
    f: `<path d="${BOARD}Z"/>`,
    cut: `<rect x="8.5" y="3" width="7" height="3" rx="1" fill="#000" stroke-width="4.25"/><circle cx="9" cy="10.5" r="1.5" stroke-width="1.5"/><circle cx="9" cy="16.5" r="1.5" stroke-width="1.5"/>${K(SURVEY_LINES)}`,
    top: CLIP,
  },

  // Open, empty box.
  'empty-state': {
    o: `<path d="${BOX_BODY}"/><path d="${BOX_FLAPS}"/>`,
    f: `<path d="${BOX_BODY}"/><path d="${BOX_FLAPS}Z"/>`,
    cut: K('M1 10h22', 1.5),
  },

  'inbox-zero': {
    o: `<path d="${TRAY}"/><path d="m8.5 7 2.75 2.75L16.5 4.5"/>`,
    f: `<path d="${TRAY}"/><path d="m8.5 7 2.75 2.75L16.5 4.5" fill="none"/>`,
  },

  maintenance: {
    o: `<path transform="translate(-1.1 -.4)" d="${SMALL_GEAR}"/>`,
    ocut: `<g transform="translate(-1.1 -.4)">${WRENCH_CLEAR}</g>`,
    otop: `<path transform="translate(-1.1 -.4) ${WRENCH_T}" d="${WRENCH}"/>`,
    f: `<path transform="translate(-1.1 -.4)" d="${SMALL_GEAR}"/>`,
    cut: `<g transform="translate(-1.1 -.4)">${hole(16.5, 16.5, 1.5)}${WRENCH_CLEAR}</g>`,
    top: `<path transform="translate(-1.1 -.4) ${WRENCH_T}" d="${WRENCH}"/>`,
  },

  // Traffic cone.
  construction: {
    o: `<path d="${CONE_TRAFFIC}"/><path d="M3.5 21h17M8.62 9.5h6.76M7.26 14.5h9.48"/>`,
    f: `<path d="${CONE_TRAFFIC}"/><path d="M3.5 21h17"/>`,
    cut: K('M1 9.5h22M1 14.5h22', 1.75),
  },

  ticket: {
    o: `<path d="${TICKET}"/><path d="${PERF}"/>`,
    f: `<path d="${TICKET}"/>`,
    cut: K(PERF),
  },
};
