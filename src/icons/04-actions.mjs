import { star, LOCK_BODY, LOCK_SHACKLE, FRAME, BADGE, BADGE_CLEAR, SLASH, SLASH_CLEAR, LENS, LENS_HANDLE } from '../shapes.mjs';

const PENCIL = 'M9.5 17V4.5A1.5 1.5 0 0 1 11 3h2a1.5 1.5 0 0 1 1.5 1.5V17L12 21.5Z';
const HEART = 'M12 20S3 14.5 3 8.8a4.8 4.8 0 0 1 9-2.3 4.8 4.8 0 0 1 9 2.3C21 14.5 12 20 12 20Z';

// ── Glyph family: full-size glyphs, and the smaller ones used inside the circle and square.
const G = {
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  x: 'M6.5 6.5l11 11M17.5 6.5l-11 11',
  check: 'M4.5 12.5l5 5 10-10',
};
const S = {
  plus: 'M12 8v8M8 12h8',
  minus: 'M8 12h8',
  x: 'M9.25 9.25l5.5 5.5M14.75 9.25l-5.5 5.5',
  check: 'M8 12.25l2.75 2.75 5.25-5.5',
};
const RING = '<circle cx="12" cy="12" r="9"/>';
const RING_F = '<circle cx="12" cy="12" r="9"/>';
const inCircle = (g) => ({ o: `${RING}<path d="${g}"/>`, f: RING_F, cut: `<path d="${g}"/>` });
const inSquare = (g) => ({ o: `${FRAME}<path d="${g}"/>`, f: FRAME, cut: `<path d="${g}"/>` });

// FRAME opened at the top-right for a pencil (same corners and radius as FRAME).
const FRAME_OPEN = 'M12 3H5.5A2.5 2.5 0 0 0 3 5.5v13A2.5 2.5 0 0 0 5.5 21h13a2.5 2.5 0 0 0 2.5-2.5V12';
const SM_PENCIL = 'M12 14.5V4.5a1 1 0 0 1 1-1h1.5a1 1 0 0 1 1 1v10L13.75 17Z';
const SM_PENCIL_T = 'rotate(45 13.75 10.25)';

const NIB = 'M12 21 7.5 13.5C7.5 11 8.5 9 9.5 8h5c1 1 2 3 2 5.5Z';
const NIB_HOLDER = 'M9.5 8V4.5A1.5 1.5 0 0 1 11 3h2a1.5 1.5 0 0 1 1.5 1.5V8';
const NIB_T = 'translate(-.9 .9) rotate(45 12 12)';

const TRASH_LID = 'M3 6.5h18';
const TRASH_HANDLE = 'M9 6.5v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2';
const TRASH_CAN = 'M5 6.5 6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12.5';
const UP = 'M12 17.5v-6M9.5 14l2.5-2.5 2.5 2.5';

const CLIPBOARD = 'M15.5 4.75h1A2.5 2.5 0 0 1 19 7.25v11.25a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 5 18.5V7.25a2.5 2.5 0 0 1 2.5-2.5h1';
const CLIP = '<rect x="8.5" y="3" width="7" height="3.5" rx="1"/>';

// Same back/front squares as `copy`.
const COPY_BACK = 'M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3';
const COPY_FRONT = '<rect x="8" y="8" width="13" height="13" rx="2"/>';

const FLOPPY = 'M5.5 3h10.25a2 2 0 0 1 1.4.6l3.25 3.25a2 2 0 0 1 .6 1.4v10.25a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5v-13A2.5 2.5 0 0 1 5.5 3Z';
const FLOPPY_LABEL = 'M7 21v-6.5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1V21';
const FLOPPY_SHUTTER = 'M7.5 3v3.5a1 1 0 0 0 1 1h5.5';

const TRAY = 'M3.5 14v3.5A2.5 2.5 0 0 0 6 20h12a2.5 2.5 0 0 0 2.5-2.5V14';
const BASE = 'M5 20.5h14';

const LINK_L = 'M9.5 16.5h-2a4.5 4.5 0 0 1 0-9h2';
const LINK_R = 'M14.5 7.5h2a4.5 4.5 0 0 1 0 9h-2';

const BOOKMARK = 'M6 5.5A2.5 2.5 0 0 1 8.5 3h7A2.5 2.5 0 0 1 18 5.5V20.25l-6-4-6 4Z';

// 5-point favourite star (rounded by the round joins).
const n2 = (v) => +v.toFixed(2);
function starPts(cx, cy, R, r) {
  const p = [];
  for (let i = 0; i < 10; i++) {
    const a = ((-90 + 36 * i) * Math.PI) / 180, rr = i % 2 ? r : R;
    p.push(`${n2(cx + rr * Math.cos(a))} ${n2(cy + rr * Math.sin(a))}`);
  }
  return p;
}
const SP = starPts(12, 12.6, 9.25, 4.5);
const STAR5 = `M${SP.join('L')}Z`;
// Same hand as `thumbs-up` (02-chat).
const HAND = 'M7 10l3.6-5.9a1.8 1.8 0 0 1 3.3 1.3L13.2 10h5.1a2 2 0 0 1 1.95 2.45l-1.5 6.6a2 2 0 0 1-1.95 1.55H7Z';
const CUFF = 'M7 10H4a1 1 0 0 0-1 1v8.6a1 1 0 0 0 1 1h3';

const ARCH_LID = '<rect x="3" y="3.5" width="18" height="4.5" rx="1.5"/>';
const ARCH_BOX = 'M4.75 8v10.5A2.5 2.5 0 0 0 7.25 21h9.5a2.5 2.5 0 0 0 2.5-2.5V8';
const ARCH_UP = 'M12 17.75v-6.25M9.5 14 12 11.5l2.5 2.5';

const PRINTER = 'M6.5 17H5.5A2.5 2.5 0 0 1 3 14.5V11a2.5 2.5 0 0 1 2.5-2.5h13A2.5 2.5 0 0 1 21 11v3.5a2.5 2.5 0 0 1-2.5 2.5h-1';
const PRINTER_IN = 'M6.5 8.5V4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v4.5';
const PRINTER_OUT = '<rect x="6.5" y="13.5" width="11" height="7.5" rx="1"/>';

const EYE = 'M3 12c2-4.25 5.1-6.5 9-6.5s7 2.25 9 6.5c-2 4.25-5.1 6.5-9 6.5S5 16.25 3 12Z';
const FUNNEL = 'M4.75 3.25h14.5a1 1 0 0 1 .77 1.64L14 12.25v6.5l-4 2v-8.5L3.98 4.89A1 1 0 0 1 4.75 3.25Z';

// Mouse pointer: tip (x,y) pointing up-left, size s.
const cursor = (x, y, s) => `M${x} ${y}l${s} ${n2(0.4 * s)}-${n2(0.42 * s)} ${n2(0.18 * s)}-${n2(0.18 * s)} ${n2(0.42 * s)}Z`;
// Dashed selection box 3..21: corners + mid-side dashes.
const DASH = {
  tl: 'M3 6V5a2 2 0 0 1 2-2h1', tr: 'M18 3h1a2 2 0 0 1 2 2v1', bl: 'M3 18v1a2 2 0 0 0 2 2h1', br: 'M21 18v1a2 2 0 0 1-2 2h-1',
  t: 'M10.5 3h3', l: 'M3 10.5v3', r: 'M21 10.5v3', b: 'M10.5 21h3',
};
const LASSO_LOOP = 'M7.25 12.6C5.25 11.6 4.5 10.25 4.5 8.75 4.5 5.75 8.5 3.5 13 3.5s8 2.25 8 5.25-3.75 5.5-8.25 5.5c-1.25 0-2.5-.15-3.5-.5';
const LASSO_TAIL = 'M7.5 16.5c-.75 1.5-2.5 1.5-3.25 2.75-.4.65-.25 1.25.25 1.75';

const CCW = 'M4 12a8 8 0 1 0 2.6-5.9L4 8.5';
const CCW_HEAD = 'M4 4v4.5h4.5';
const CW = 'M20 12a8 8 0 1 1-2.6-5.9L20 8.5'; // same as `regenerate`
const CW_HEAD = 'M20 4v4.5h-4.5';
const HANDS = 'M12 7.75V12l2.75 1.75';

const TAG = 'M12.53 3.53A1.8 1.8 0 0 0 11.25 3H4.8A1.8 1.8 0 0 0 3 4.8v6.45a1.8 1.8 0 0 0 .53 1.28l7.83 7.83a2.18 2.18 0 0 0 3.08 0l5.92-5.92a2.18 2.18 0 0 0 0-3.08Z';
const TAG_FRONT = 'M13.05 3a1.8 1.8 0 0 1 1.28.53l6.04 6.04a2.16 2.16 0 0 1 0 3.07l-4.13 4.13a2.16 2.16 0 0 1-3.07 0l-6.04-6.04a1.8 1.8 0 0 1-.53-1.28V4.5A1.5 1.5 0 0 1 8.1 3Z';
const TAG_BACK = 'M3 7.5v5.55a1.8 1.8 0 0 0 .53 1.28l6.04 6.04a2.16 2.16 0 0 0 2.87.17';

const PALM = 'M7 15V7a1.5 1.5 0 0 1 3 0V5a1.5 1.5 0 0 1 3 0v1a1.5 1.5 0 0 1 3 0v2a1.5 1.5 0 0 1 3 0v6.5a6.5 6.5 0 0 1-6.5 6.5h-1c-2.2 0-3.6-.75-4.8-2l-3-3.25a1.5 1.5 0 0 1 2.2-2.05Z';
const PALM_GAPS = 'M10 7v6M13 6v6.5M16 8v5';
const FINGER = 'M8 15.25V7.75a1.5 1.5 0 0 1 3 0v3.75a1.5 1.5 0 0 1 3 0v.5a1.5 1.5 0 0 1 3 0v1a1.5 1.5 0 0 1 3 0v2.5a5.5 5.5 0 0 1-5.5 5.5h-1.75c-2 0-3.25-.6-4.4-1.75l-2.6-2.6a1.5 1.5 0 0 1 2.1-2.1Z';
const FINGER_GAPS = 'M11 11.5V13.5M14 12v1.5M17 13v1.25';
const RIPPLE = 'M5.27 5.96a4.5 4.5 0 0 1 8.46 0';

// Alignment family: bars are 4.5 wide, 14 (long) and 8 (short) long.
const BAR = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1.5"/>`;
const FLIP = `<path d="M3.5 7v10l5-5Z"/><path d="M20.5 7v10l-5-5Z"/><path d="M12 3.25v.5M12 7.5v.5M12 11.75v.5M12 16v.5M12 20.25v.5"/>`;
const TEXT_LINES = (x2, x4) => `<path d="M3 4.5h18M${x2} 9.5h12M3 14.5h18M${x4} 19.5h12"/>`;
const STAR5_HALF = `M${[SP[0], SP[9], SP[8], SP[7], SP[6], SP[5]].join('L')}Z`; // left half

export default {
  copy: {
    o: `<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>`,
    f: `<rect x="3" y="3" width="13" height="13" rx="2"/>`,
    cut: `<rect x="8" y="8" width="13" height="13" rx="2" fill="#000" stroke-width="4.25"/>`,
    top: `<rect x="8" y="8" width="13" height="13" rx="2"/>`,
  },

  trash: {
    o: `<path d="M3 6.5h18"/><path d="M9 6.5v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
        <path d="M5 6.5 6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12.5"/><path d="M10 11v6M14 11v6"/>`,
    f: `<path d="M5.2 9 6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l.8-10Z"/>`,
    cut: `<path d="M10 12v5M14 12v5" stroke-width="1.5"/>`,
    top: `<path d="M3 6.5h18"/><path fill="none" d="M9 6.5v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>`,
  },

  edit: {
    o: `<g transform="rotate(45 12 12)"><path d="${PENCIL}"/><path d="M9.5 6.5h5"/></g>`,
    f: `<path transform="rotate(45 12 12)" d="${PENCIL}"/>`,
    cut: `<path transform="rotate(45 12 12)" d="M8 6.5h8M8 17h8" stroke-width="1.25"/>`,
  },

  // Accent spark replaces the keyhole.
  lock: {
    o: `${LOCK_BODY}<path d="${LOCK_SHACKLE}"/><path d="${star(12, 16, 2.75)}"/>`,
    f: `${LOCK_BODY}`,
    cut: `<path d="${star(12, 16, 3)}" fill="#000" stroke-width="1"/>`,
    top: `<path fill="none" d="${LOCK_SHACKLE}"/>`,
  },

  heart: {
    o: `<path d="${HEART}"/>`,
    f: `<path d="${HEART}"/>`,
  },

  // ── Glyphs ──────────────────────────────────────────────────────────────────
  plus: { o: `<path d="${G.plus}"/>`, bold: true },
  minus: { o: `<path d="${G.minus}"/>`, bold: true },
  x: { o: `<path d="${G.x}"/>`, bold: true },
  check: { o: `<path d="${G.check}"/>`, bold: true },
  'plus-circle': inCircle(S.plus),
  'minus-circle': inCircle(S.minus),
  'x-circle': inCircle(S.x),
  'check-circle': inCircle(S.check),
  'plus-square': inSquare(S.plus),
  'minus-square': inSquare(S.minus),
  'x-square': inSquare(S.x),
  'check-square': inSquare(S.check),

  'edit-square': {
    o: `<path d="${FRAME_OPEN}"/><g transform="${SM_PENCIL_T}"><path d="${SM_PENCIL}"/><path d="M12 6.5h3.5"/></g>`,
    f: `<path d="${FRAME_OPEN}Z"/>`,
    cut: `<path transform="${SM_PENCIL_T}" d="${SM_PENCIL}" fill="#000" stroke-width="4.5"/>`,
    top: `<path transform="${SM_PENCIL_T}" d="${SM_PENCIL}"/>`,
  },

  pen: {
    o: `<g transform="${NIB_T}"><path d="${NIB}"/><path d="${NIB_HOLDER}"/><path d="M12 21v-5"/><circle cx="12" cy="14.5" r="1.25"/></g>`,
    f: `<g transform="${NIB_T}"><path d="${NIB}"/><path d="${NIB_HOLDER}Z"/></g>`,
    cut: `<g transform="${NIB_T}"><path d="M12 21v-5M8 8h8" stroke-width="1.5"/><circle cx="12" cy="14.5" r="1.5" fill="#000" stroke="none"/></g>`,
  },

  eraser: {
    o: `<g transform="rotate(45 12 10.5)"><rect x="8.5" y="3" width="7" height="15" rx="2"/><path d="M8.5 12h7"/></g><path d="M9 20.75h11"/>`,
    f: `<rect transform="rotate(45 12 10.5)" x="8.5" y="3" width="7" height="15" rx="2"/><path d="M9 20.75h11"/>`,
    cut: `<path transform="rotate(45 12 10.5)" d="M7 12h10" stroke-width="1.5"/>`,
  },

  'trash-restore': {
    o: `<path d="${TRASH_LID}"/><path d="${TRASH_HANDLE}"/><path d="${TRASH_CAN}"/><path d="${UP}"/>`,
    f: `<path d="M5.2 9 6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l.8-10Z"/>`,
    cut: `<path d="${UP}" stroke-width="1.5"/>`,
    top: `<path d="${TRASH_LID}"/><path fill="none" d="${TRASH_HANDLE}"/>`,
  },

  paste: {
    o: `<path d="${CLIPBOARD}"/>${CLIP}<path d="M9 12h6M9 16h4"/>`,
    f: `<rect x="5" y="4.75" width="14" height="16.25" rx="2.5"/>`,
    cut: `<rect x="8.5" y="3" width="7" height="3.5" rx="1" fill="#000" stroke-width="4"/><path d="M9 12h6M9 16h4" stroke-width="1.5"/>`,
    top: CLIP,
  },

  cut: {
    o: `<circle cx="7.5" cy="17.75" r="2.75"/><circle cx="16.5" cy="17.75" r="2.75"/><path d="M8.93 15.4 16.5 3.5M15.07 15.4 7.5 3.5"/>`,
    f: `<circle cx="7.5" cy="17.75" r="2.75"/><circle cx="16.5" cy="17.75" r="2.75"/><path d="M8.93 15.4 16.5 3.5M15.07 15.4 7.5 3.5" stroke-width="2.25"/>`,
    cut: `<circle cx="7.5" cy="17.75" r="1" fill="#000" stroke="none"/><circle cx="16.5" cy="17.75" r="1" fill="#000" stroke="none"/>`,
  },

  duplicate: {
    o: `${COPY_FRONT}<path d="${COPY_BACK}"/><path d="M14.5 11.5v6M11.5 14.5h6"/>`,
    f: `<rect x="3" y="3" width="13" height="13" rx="2"/>`,
    cut: `<rect x="8" y="8" width="13" height="13" rx="2" fill="#000" stroke-width="4.25"/>`,
    top: `<mask id="duplicate-front" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#fff" stroke="none"/><path d="M14.5 11.5v6M11.5 14.5h6" stroke="#000" fill="none"/></mask><g mask="url(#duplicate-front)">${COPY_FRONT}</g>`,
  },

  save: {
    o: `<path d="${FLOPPY}"/><path d="${FLOPPY_LABEL}"/><path d="${FLOPPY_SHUTTER}"/>`,
    f: `<path d="${FLOPPY}"/>`,
    cut: `<path d="${FLOPPY_LABEL}" stroke-width="1.5"/><path d="${FLOPPY_SHUTTER}" stroke-width="1.5"/>`,
  },

  download: { o: `<path d="M12 3.5v12M6.5 10l5.5 5.5 5.5-5.5"/><path d="${BASE}"/>`, bold: true },
  upload: { o: `<path d="M12 16V4M6.5 9.5 12 4l5.5 5.5"/><path d="${BASE}"/>`, bold: true },
  import: { o: `<path d="M12 3.5v11M7.5 10l4.5 4.5 4.5-4.5"/><path d="${TRAY}"/>`, bold: true },
  export: { o: `<path d="M12 15V4M7.5 8.5 12 4l4.5 4.5"/><path d="${TRAY}"/>`, bold: true },

  share: {
    o: `<circle cx="18" cy="5.5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="18.5" r="2.5"/><path d="M8.2 10.81 15.8 6.69M8.2 13.19l7.6 4.12"/>`,
    f: `<circle cx="18" cy="5.5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="18.5" r="2.5"/><path d="M8.2 10.81 15.8 6.69M8.2 13.19l7.6 4.12"/>`,
  },

  'share-ios': {
    o: `<path d="M8 9.5H7a2.5 2.5 0 0 0-2.5 2.5v6.5A2.5 2.5 0 0 0 7 21h10a2.5 2.5 0 0 0 2.5-2.5V12A2.5 2.5 0 0 0 17 9.5h-1"/><path d="M12 14.5V3M8.5 6.5 12 3l3.5 3.5"/>`,
    f: `<rect x="4.5" y="9.5" width="15" height="11.5" rx="2.5"/>`,
    cut: `<path d="M12 3v11.5M8.5 6.5 12 3l3.5 3.5" stroke-width="4.5"/>`,
    top: `<path d="M12 14.5V3M8.5 6.5 12 3l3.5 3.5"/>`,
  },

  link: { o: `<path d="${LINK_L}"/><path d="${LINK_R}"/><path d="M8.5 12h7"/>`, bold: true },
  unlink: { o: `<path d="M9 16.5H7.5a4.5 4.5 0 0 1 0-9H9"/><path d="M15 7.5h1.5a4.5 4.5 0 0 1 0 9H15"/><path d="M12 3.5V6M12 18v2.5"/>`, bold: true },

  bookmark: {
    o: `<path d="${BOOKMARK}"/>`,
    f: `<path d="${BOOKMARK}"/>`,
  },
  'bookmark-add': {
    o: `<path d="${BOOKMARK}"/><path d="M12 7v6M9 10h6"/>`,
    f: `<path d="${BOOKMARK}"/>`,
    cut: `<path d="M12 7v6M9 10h6"/>`,
  },
  'bookmark-check': {
    o: `<path d="${BOOKMARK}"/><path d="m9 10.25 2 2 4-4"/>`,
    f: `<path d="${BOOKMARK}"/>`,
    cut: `<path d="m9 10.25 2 2 4-4"/>`,
  },

  star: {
    o: `<path d="${STAR5}"/>`,
    f: `<path d="${STAR5}"/>`,
  },
  // Left half solid, right half open, in both styles.
  'star-half': {
    o: `<path d="${STAR5}"/><path d="${STAR5_HALF}" fill="currentColor"/>`,
    f: `<path d="${STAR5}" fill="none"/><path d="${STAR5_HALF}"/>`,
  },

  'heart-off': {
    o: `<path d="${HEART}"/>`,
    ocut: SLASH_CLEAR,
    otop: SLASH,
    f: `<path d="${HEART}"/>`,
    cut: SLASH_CLEAR,
    top: SLASH,
  },

  like: {
    o: `<path d="${HAND}"/><path d="${CUFF}"/>`,
    f: `<path d="${HAND}"/><path d="${CUFF}Z"/>`,
    cut: `<path d="M7 9.5V21.5" stroke-width="1.5"/>`,
  },

  archive: {
    o: `${ARCH_LID}<path d="${ARCH_BOX}"/><path d="M10 12h4"/>`,
    f: `${ARCH_LID}<path d="${ARCH_BOX}Z"/>`,
    cut: `<path d="M3 8.25h18" stroke-width="1.5"/><path d="M10 12h4"/>`,
  },
  unarchive: {
    o: `${ARCH_LID}<path d="${ARCH_BOX}"/><path d="${ARCH_UP}"/>`,
    f: `${ARCH_LID}<path d="${ARCH_BOX}Z"/>`,
    cut: `<path d="M3 8.25h18" stroke-width="1.5"/><path d="${ARCH_UP}" stroke-width="1.5"/>`,
  },

  print: {
    o: `<path d="${PRINTER}"/><path d="${PRINTER_IN}"/>${PRINTER_OUT}`,
    f: `<rect x="3" y="8.5" width="18" height="8.5" rx="2.5"/><path d="${PRINTER_IN}"/>`,
    cut: `<rect x="6.5" y="13.5" width="11" height="7.5" rx="1" fill="#000" stroke-width="4"/><path d="M5 8.5h14" stroke-width="1.5"/>`,
    top: PRINTER_OUT,
  },

  // Same lock as `lock`, shackle swung open.
  unlock: {
    o: `${LOCK_BODY}<path d="M7.5 11V7.5a4.5 4.5 0 0 1 8.58-1.9"/><path d="${star(12, 16, 2.75)}"/>`,
    f: `${LOCK_BODY}`,
    cut: `<path d="${star(12, 16, 3)}" fill="#000" stroke-width="1"/>`,
    top: `<path fill="none" d="M7.5 11V7.5a4.5 4.5 0 0 1 8.58-1.9"/>`,
  },

  eye: {
    o: `<path d="${EYE}"/><circle cx="12" cy="12" r="3"/>`,
    f: `<path d="${EYE}"/>`,
    cut: `<circle cx="12" cy="12" r="3.25" stroke-width="1.5"/>`,
  },
  'eye-off': {
    o: `<path d="${EYE}"/><circle cx="12" cy="12" r="3"/>`,
    ocut: SLASH_CLEAR,
    otop: SLASH,
    f: `<path d="${EYE}"/>`,
    cut: `<circle cx="12" cy="12" r="3.25" stroke-width="1.5"/>${SLASH_CLEAR}`,
    top: SLASH,
  },

  filter: {
    o: `<path d="${FUNNEL}"/>`,
    f: `<path d="${FUNNEL}"/>`,
  },
  'filter-off': {
    o: `<path d="${FUNNEL}"/>`,
    ocut: SLASH_CLEAR,
    otop: SLASH,
    f: `<path d="${FUNNEL}"/>`,
    cut: SLASH_CLEAR,
    top: SLASH,
  },

  'sort-ascending': { o: `<path d="M7 20V4M3.5 7.5 7 4l3.5 3.5"/><path d="M13.5 5.5h3M13.5 12h5M13.5 18.5h7"/>`, bold: true },
  'sort-descending': { o: `<path d="M7 4v16M3.5 16.5 7 20l3.5-3.5"/><path d="M13.5 5.5h7M13.5 12h5M13.5 18.5h3"/>`, bold: true },
  sort: { o: `<path d="M7.5 4v16M4 16.5 7.5 20l3.5-3.5"/><path d="M16.5 20V4M13 7.5 16.5 4 20 7.5"/>`, bold: true },

  select: {
    o: `<path d="${DASH.tl}${DASH.tr}${DASH.bl}${DASH.t}${DASH.l}M21 9.5v2M9.5 21h2"/><path d="${cursor(12, 12, 9)}"/>`,
    f: `<path fill="none" stroke-width="2.25" d="${DASH.tl}${DASH.tr}${DASH.bl}${DASH.t}${DASH.l}M21 9.5v2M9.5 21h2"/><path d="${cursor(12, 12, 9)}"/>`,
  },
  'select-all': {
    o: `<path d="${Object.values(DASH).join('')}"/><path d="${S.check}"/>`,
    bold: true,
  },

  lasso: {
    o: `<g transform="translate(-.5 0)"><path d="${LASSO_LOOP}"/><circle cx="6.5" cy="15.75" r="1.5"/><path d="${LASSO_TAIL}"/></g>`,
    f: `<g transform="translate(-.5 0)"><path fill="none" stroke-width="2" d="${LASSO_LOOP}"/><circle cx="6.5" cy="15.75" r="1.75"/><path fill="none" stroke-width="2" d="${LASSO_TAIL}"/></g>`,
  },

  resize: {
    o: `<path d="${FRAME_OPEN}"/><path d="M21 3 10.5 13.5M15.5 3H21v5.5M10.5 9v4.5H15"/>`,
    bold: true,
  },

  'flip-horizontal': { o: FLIP, f: FLIP },
  'flip-vertical': { o: `<g transform="rotate(90 12 12)">${FLIP}</g>`, f: `<g transform="rotate(90 12 12)">${FLIP}</g>` },

  'align-left': { o: TEXT_LINES(3, 3), bold: true },
  'align-center': { o: TEXT_LINES(6, 6), bold: true },
  'align-right': { o: TEXT_LINES(9, 9), bold: true },
  'align-justify': { o: `<path d="M3 4.5h18M3 9.5h18M3 14.5h18M3 19.5h18"/>`, bold: true },

  'align-top': {
    o: `<path d="M3 3h18"/>${BAR(6, 6, 4.5, 14)}${BAR(13.5, 6, 4.5, 8)}`,
    f: `<path d="M3 3h18"/>${BAR(6, 6, 4.5, 14)}${BAR(13.5, 6, 4.5, 8)}`,
  },
  'align-middle': {
    o: `<path d="M3 12h3M10.5 12h3M18 12h3"/>${BAR(6, 5, 4.5, 14)}${BAR(13.5, 8, 4.5, 8)}`,
    f: `<path d="M3 12h3M10.5 12h3M18 12h3"/>${BAR(6, 5, 4.5, 14)}${BAR(13.5, 8, 4.5, 8)}`,
  },
  'align-bottom': {
    o: `<path d="M3 21h18"/>${BAR(6, 4, 4.5, 14)}${BAR(13.5, 10, 4.5, 8)}`,
    f: `<path d="M3 21h18"/>${BAR(6, 4, 4.5, 14)}${BAR(13.5, 10, 4.5, 8)}`,
  },
  'distribute-horizontal': {
    o: `<path d="M3 3v18M21 3v18"/>${BAR(6, 5, 4.5, 14)}${BAR(13.5, 8, 4.5, 8)}`,
    f: `<path d="M3 3v18M21 3v18"/>${BAR(6, 5, 4.5, 14)}${BAR(13.5, 8, 4.5, 8)}`,
  },
  'distribute-vertical': {
    o: `<path d="M3 3h18M3 21h18"/>${BAR(5, 6, 14, 4.5)}${BAR(8, 13.5, 8, 4.5)}`,
    f: `<path d="M3 3h18M3 21h18"/>${BAR(5, 6, 14, 4.5)}${BAR(8, 13.5, 8, 4.5)}`,
  },

  group: {
    o: `<path d="${Object.values(DASH).join('')}"/><rect x="6.5" y="6.5" width="4.5" height="4.5" rx="1" fill="currentColor"/><rect x="13" y="13" width="4.5" height="4.5" rx="1" fill="currentColor"/>`,
    f: `<path fill="none" stroke-width="2.25" d="${Object.values(DASH).join('')}"/><rect x="6.5" y="6.5" width="4.5" height="4.5" rx="1"/><rect x="13" y="13" width="4.5" height="4.5" rx="1"/>`,
  },
  ungroup: {
    o: `<rect x="3" y="3.5" width="10" height="7" rx="2"/><rect x="11" y="13.5" width="10" height="7" rx="2"/>`,
    f: `<rect x="3" y="3.5" width="10" height="7" rx="2"/><rect x="11" y="13.5" width="10" height="7" rx="2"/>`,
  },

  layers: {
    o: `<path d="M12 3.25 20.75 8 12 12.75 3.25 8Z"/><path d="m3.25 12 8.75 4.75L20.75 12M3.25 16l8.75 4.75L20.75 16"/>`,
    f: `<path d="M12 3.25 20.75 8 12 12.75 3.25 8Z"/><path fill="none" d="m3.25 12 8.75 4.75L20.75 12M3.25 16l8.75 4.75L20.75 16"/>`,
  },

  // The highlighted (solid) square moves to the front / to the back.
  'bring-forward': {
    o: `<rect x="3" y="3" width="11" height="11" rx="2.5"/>`,
    ocut: `<rect x="10" y="10" width="11" height="11" rx="2.5" fill="#000" stroke-width="4.25"/>`,
    otop: `<rect x="10" y="10" width="11" height="11" rx="2.5" fill="currentColor"/>`,
    f: `<rect x="3" y="3" width="11" height="11" rx="2.5" fill="none"/>`,
    cut: `<rect x="10" y="10" width="11" height="11" rx="2.5" fill="#000" stroke-width="4.25"/>`,
    top: `<rect x="10" y="10" width="11" height="11" rx="2.5"/>`,
  },
  'send-backward': {
    o: `<rect x="3" y="3" width="11" height="11" rx="2.5" fill="currentColor"/>`,
    ocut: `<rect x="10" y="10" width="11" height="11" rx="2.5" fill="#000" stroke-width="4.25"/>`,
    otop: `<rect x="10" y="10" width="11" height="11" rx="2.5"/>`,
    f: `<rect x="3" y="3" width="11" height="11" rx="2.5"/>`,
    cut: `<rect x="10" y="10" width="11" height="11" rx="2.5" fill="#000" stroke-width="4.25"/>`,
    top: `<rect x="10" y="10" width="11" height="11" rx="2.5" fill="none"/>`,
  },

  'drag-handle': {
    o: `<path d="M9 5h.01M15 5h.01M9 12h.01M15 12h.01M9 19h.01M15 19h.01" stroke-width="3"/>`,
    bold: true,
  },
  'drag-handle-horizontal': {
    o: `<path d="M5 9h.01M12 9h.01M19 9h.01M5 15h.01M12 15h.01M19 15h.01" stroke-width="3"/>`,
    bold: true,
  },

  'zoom-in': {
    o: `${LENS}<path d="${LENS_HANDLE}"/><path d="M11 8v6M8 11h6"/>`,
    f: LENS,
    cut: `<path d="M11 8v6M8 11h6"/>`,
    top: `<path d="${LENS_HANDLE}"/>`,
  },
  'zoom-out': {
    o: `${LENS}<path d="${LENS_HANDLE}"/><path d="M8 11h6"/>`,
    f: LENS,
    cut: `<path d="M8 11h6"/>`,
    top: `<path d="${LENS_HANDLE}"/>`,
  },

  fullscreen: {
    o: `<path d="M3 8.5v-3A2.5 2.5 0 0 1 5.5 3h3M15.5 3h3A2.5 2.5 0 0 1 21 5.5v3M21 15.5v3a2.5 2.5 0 0 1-2.5 2.5h-3M8.5 21h-3A2.5 2.5 0 0 1 3 18.5v-3"/>`,
    bold: true,
  },
  'fullscreen-exit': {
    o: `<path d="M8.5 3v3A2.5 2.5 0 0 1 6 8.5H3M21 8.5h-3A2.5 2.5 0 0 1 15.5 6V3M15.5 21v-3a2.5 2.5 0 0 1 2.5-2.5h3M3 15.5h3A2.5 2.5 0 0 1 8.5 18v3"/>`,
    bold: true,
  },

  reset: { o: `<path d="${CCW}"/><path d="${CCW_HEAD}"/><circle cx="12" cy="12" r="1" fill="currentColor"/>`, bold: true },
  history: { o: `<path d="${CCW}"/><path d="${CCW_HEAD}"/><path d="${HANDS}"/>`, bold: true },
  restore: { o: `<path d="${CW}"/><path d="${CW_HEAD}"/><path d="${HANDS}"/>`, bold: true },

  tag: {
    o: `<path d="${TAG}"/><circle cx="7.75" cy="7.75" r="1.25"/>`,
    f: `<path d="${TAG}"/>`,
    cut: `<circle cx="7.75" cy="7.75" r="1.5" fill="#000" stroke="none"/>`,
  },
  tags: {
    o: `<path d="${TAG_FRONT}"/><path d="${TAG_BACK}"/><circle cx="10.5" cy="7.25" r="1"/>`,
    f: `<path d="${TAG_FRONT}"/><path fill="none" d="${TAG_BACK}"/>`,
    cut: `<circle cx="10.5" cy="7.25" r="1.25" fill="#000" stroke="none"/>`,
  },

  hand: {
    o: `<path d="${PALM}"/><path d="${PALM_GAPS}"/>`,
    f: `<path d="${PALM}"/>`,
    cut: `<path d="${PALM_GAPS}" stroke-width="1.5"/>`,
  },
  pointer: {
    o: `<path d="${cursor(4.5, 4.5, 15)}"/>`,
    f: `<path d="${cursor(4.5, 4.5, 15)}"/>`,
  },
  'pointer-click': {
    o: `<path d="${cursor(10, 10, 11)}"/><path d="M10 3.25v2.5M3.25 10h2.5M15 5l-1.75 1.75M5 15l1.75-1.75"/>`,
    f: `<path d="${cursor(10, 10, 11)}"/><path d="M10 3.25v2.5M3.25 10h2.5M15 5l-1.75 1.75M5 15l1.75-1.75"/>`,
  },
  touch: {
    o: `<g transform="translate(-.5 0)"><path d="${FINGER}"/><path d="${FINGER_GAPS}"/><path d="${RIPPLE}"/></g>`,
    f: `<g transform="translate(-.5 0)"><path d="${FINGER}"/><path fill="none" d="${RIPPLE}"/></g>`,
    cut: `<path transform="translate(-.5 0)" d="${FINGER_GAPS}" stroke-width="1.5"/>`,
  },

  power: { o: `<path d="M12 3v8"/><path d="M17.14 6.37a8 8 0 1 1-10.28 0"/>`, bold: true },

  crop: { o: `<path d="M7 3v11.5A2.5 2.5 0 0 0 9.5 17H21"/><path d="M17 21V9.5A2.5 2.5 0 0 0 14.5 7H3"/>`, bold: true },
};
