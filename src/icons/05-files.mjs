import { star, PAGE, PAGE_FOLD, PAGE_FOLD_CUT, FOLDER, DATABASE, BADGE, BADGE_CLEAR } from '../shapes.mjs';

// ── Local helpers ─────────────────────────────────────────────────────────────
const n = (v) => +v.toFixed(2);

/** Polygon with every corner rounded by a quadratic curve that starts `r` units before the vertex. */
function rpoly(pts, r) {
  const len = pts.length;
  const cornerPts = pts.map((p, i) => {
    const prev = pts[(i - 1 + len) % len], next = pts[(i + 1) % len];
    const toward = (q) => {
      const dx = q[0] - p[0], dy = q[1] - p[1], d = Math.hypot(dx, dy);
      return [n(p[0] + (dx / d) * r), n(p[1] + (dy / d) * r)];
    };
    return { a: toward(prev), b: toward(next), v: p };
  });
  let d = `M${cornerPts[0].b.join(' ')}`;
  for (let i = 1; i <= len; i++) {
    const c = cornerPts[i % len];
    d += `L${c.a.join(' ')}Q${c.v.join(' ')} ${c.b.join(' ')}`;
  }
  return d + 'Z';
}

// The plain file, used by every badge variant.
const FILE = {
  o: `<path d="${PAGE}"/><path d="${PAGE_FOLD}"/>`,
  f: `<path d="${PAGE}"/>`,
  cut: `<path d="${PAGE_FOLD_CUT}" stroke-width="1.5"/>`,
};
const FOLDER_BASE = { o: `<path d="${FOLDER}"/>`, f: `<path d="${FOLDER}"/>`, cut: '' };

// Badge glyphs (outline markup, filled markup). Open paths carry fill="none" so the filled root can't fill them.
const G = {
  minus: [`<path d="${BADGE.minus}"/>`],
  check: [`<path fill="none" d="${BADGE.check}"/>`],
  x: [`<path d="${BADGE.x}"/>`],
  question: [`<path fill="none" d="${BADGE.question}"/>`],
  up: [`<path fill="none" d="${BADGE.arrowUp}"/>`],
  down: [`<path fill="none" d="${BADGE.arrowDown}"/>`],
  search: [`<circle fill="none" cx="17.25" cy="17.25" r="2.25"/><path d="m19 19 2.25 2.25"/>`],
  edit: [`<path d="M15 21v-2l4.5-4.5a1.41 1.41 0 0 1 2 2L17 21Z"/>`, `<path d="M15 21v-2l4.5-4.5a1.41 1.41 0 0 1 2 2L17 21Z"/>`],
  lock: [
    `<rect x="15" y="17.25" width="6" height="4.25" rx="1"/><path d="M16.5 17.25V16a1.5 1.5 0 0 1 3 0v1.25"/>`,
    `<rect x="15" y="17.25" width="6" height="4.25" rx="1"/><path fill="none" d="M16.5 17.25V16a1.5 1.5 0 0 1 3 0v1.25"/>`,
  ],
};

/** Base object + bottom-right badge (see file-plus). */
const badge = (base, [go, gf = go]) => ({
  o: base.o,
  ocut: BADGE_CLEAR,
  otop: go,
  f: base.f,
  cut: base.cut + BADGE_CLEAR,
  top: gf,
});

/** File with a type glyph inside the page. `knock` is the glyph as it is cut out of the filled page. */
const typed = (glyph, knock) => ({
  o: FILE.o + glyph,
  f: FILE.f,
  cut: FILE.cut + knock,
});

// Type glyphs (inside the page, below the fold: x 8–16, y 10.5–18).
const TRI_PLAY = rpoly([[10.5, 11], [10.5, 17], [15.5, 14]], 1);
const CODE = 'M10.25 11.5 8 14l2.25 2.5M13.75 11.5 16 14l-2.25 2.5';
const IMG_HILL = 'm19 16.5-2.4-2.4a1.5 1.5 0 0 0-2.12 0L8 21';
const NOTE_STEM = 'M12.75 16.25V10.5l3 1.5';
const W = 'm8.25 11 1.5 6.5L12 12.5l2.25 5 1.5-6.5';
const GRID = 'M8 14.5h8M12 11v7';
const ZIP_TEETH = 'M8.75 6h1.75M10.5 9h1.75M8.75 12h1.75';
const BRACES =
  'M10.5 10.5c-1 0-1.5.5-1.5 1.5v.75c0 .75-.5 1.25-1 1.25.5 0 1 .5 1 1.25v.75c0 1 .5 1.5 1.5 1.5' +
  'M13.5 10.5c1 0 1.5.5 1.5 1.5v.75c0 .75.5 1.25 1 1.25-.5 0-1 .5-1 1.25v.75c0 1-.5 1.5-1.5 1.5';
const CSV = 'M8 11.5h2.5M13.5 11.5H16M8 14.5h2.5M13.5 14.5H16M8 17.5h2.5M13.5 17.5H16';
const MD = 'M8 17v-6l1.5 2.5L11 11v6M15 11v6M13.75 15.75 15 17l1.25-1.25';
// Solid label bar (outer edge = a stroked 3,12 11×5.5 rect): the letters reduced to a label shape.
const PDF_BAR = '<path stroke="none" fill="currentColor" fill-rule="evenodd" d="M4.5 11.25h8a2.25 2.25 0 0 1 2.25 2.25v2.5a2.25 2.25 0 0 1-2.25 2.25h-8A2.25 2.25 0 0 1 2.25 16v-2.5a2.25 2.25 0 0 1 2.25-2.25Z"/>';

// Stacks: front object scaled down, back object reduced to a bracket.
const FILES_FRONT = `<g transform="translate(4.35 .45) scale(.85)" stroke-width="2.06"><path d="${PAGE}"/><path d="${PAGE_FOLD}"/></g>`;
const FILES_BACK = 'M5.5 7v11.5A2.5 2.5 0 0 0 8 21h8.5';
const FOLDERS_T = 'translate(3.9 .8) scale(.8)';
const FOLDERS_BACK = 'M3 8.5v9A2.5 2.5 0 0 0 5.5 20H18';

// Open folder: the back FOLDER loses its lower-right; a slanted front flap sits on top.
const FLAP = 'M4.5 20 7.25 13.3A2 2 0 0 1 9.1 12h10.65a1.25 1.25 0 0 1 1.2 1.6l-1.6 5.3A1.5 1.5 0 0 1 17.9 20Z';
const FLAP_CLEAR = '<path d="M19 9.5h5V24h-6.5v-9H19Z" fill="#000" stroke="none"/>';

// Small person for folder-shared.
const SHARED_HEAD = '<circle cx="12" cy="11.75" r="1.75"/>';
const SHARED_BODY = 'M8 20a4 3.5 0 0 1 8 0';

// Paper.
const DOC_LINES = 'M8.5 7.5h7M8.5 11h7M8.5 14.5h7M8.5 18h4';
const NOTE = 'M3.5 6A2.5 2.5 0 0 1 6 3.5h12A2.5 2.5 0 0 1 20.5 6v8.5l-6 6H6A2.5 2.5 0 0 1 3.5 18Z';
const NOTE_FOLD = 'M20.5 14.5H16a1.5 1.5 0 0 0-1.5 1.5v4.5';
const NOTES_FRONT = 'M7.75 9.25a2.5 2.5 0 0 1 2.5-2.5h8a2.5 2.5 0 0 1 2.5 2.5v6l-5 5h-5.5a2.5 2.5 0 0 1-2.5-2.5Z';
const NOTES_FOLD = 'M20.75 15.25h-3.5a1.5 1.5 0 0 0-1.5 1.5v3.5';
const NOTES_BACK = 'M4.25 16V6.25a2.5 2.5 0 0 1 2.5-2.5h9.75';
const BOARD = 'M15 4.5h2A2.5 2.5 0 0 1 19.5 7v11.5A2.5 2.5 0 0 1 17 21H7a2.5 2.5 0 0 1-2.5-2.5V7A2.5 2.5 0 0 1 7 4.5h2';
const CLIP = '<rect x="9" y="3" width="6" height="3.5" rx="1"/>';
const CLIP_GAP = '<rect x="9" y="3" width="6" height="3.5" rx="1" fill="#000" stroke-width="4"/>';
/** Clipboard with optional content (outline markup, knockout markup). */
const clipboard = (content = '', knock = '') => ({
  o: `<path d="${BOARD}"/>${CLIP}${content}`,
  f: `<path d="${BOARD}Z"/>`,
  cut: CLIP_GAP + knock,
  top: CLIP,
});
const BOOK = 'M5 18.5v-13A2.5 2.5 0 0 1 7.5 3H17a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7.5a2.5 2.5 0 0 1 0-5H19';
const BOOK_FILL = 'M5 18.5v-13A2.5 2.5 0 0 1 7.5 3H17a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7.5A2.5 2.5 0 0 1 5 18.5Z';
const BOOK_OPEN = 'M4 18a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1h4.5A3.5 3.5 0 0 1 12 7a3.5 3.5 0 0 1 3.5-3.5H20a1 1 0 0 1 1 1V17a1 1 0 0 1-1 1h-5.5A2.5 2.5 0 0 0 12 20.5 2.5 2.5 0 0 0 9.5 18Z';
const SHELF_BOOKS = 'M3 20.5V4.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v16M10 20.5v-13a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v13M17 20.5v-15a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v15';
const NEWS_LINES = 'M14.5 8.25h3M14.5 11.25h3M6.5 16h11';
const SCROLL_TOP = 'M5.5 3H16a2.5 2.5 0 0 1 2.5 2.5v11';
const SCROLL_ROLLS = 'M10.5 21h8a2.5 2.5 0 0 0 2.5-2.5v-.75a1.25 1.25 0 0 0-1.25-1.25h-5.5A1.25 1.25 0 0 0 13 17.75v.75a2.5 2.5 0 0 1-5 0V5.5a2.5 2.5 0 0 0-5 0V7a1 1 0 0 0 1 1h4';
const SCROLL_FILL = 'M5.5 3H16a2.5 2.5 0 0 1 2.5 2.5v11h1.25A1.25 1.25 0 0 1 21 17.75v.75a2.5 2.5 0 0 1-2.5 2.5h-8A2.5 2.5 0 0 1 8 18.5V8H4a1 1 0 0 1-1-1V5.5A2.5 2.5 0 0 1 5.5 3Z';
const SCROLL_LINES = 'M11.5 8h4M11.5 11.5h4';
const BREAK_TOP = 'M5 9V5.5A2.5 2.5 0 0 1 7.5 3h9A2.5 2.5 0 0 1 19 5.5V9';
const BREAK_BOTTOM = 'M5 15v3.5A2.5 2.5 0 0 0 7.5 21h9a2.5 2.5 0 0 0 2.5-2.5V15';
const BREAK_DASH = 'M3 12h1.5M7.5 12h3M13.5 12h3M19.5 12H21';
const TPL_LINES = 'M14.5 13.25h2M14.5 17.25h2';
const CLIP_PATH = 'M15 11.5v3a3 3 0 0 1-6 0V11a1.5 1.5 0 0 1 3 0v3.5';

// Trays & storage.
const TRAY_RIM = 'M3 12.5 5.6 5.8A2 2 0 0 1 7.5 4.5h9a2 2 0 0 1 1.9 1.3L21 12.5';
const TRAY_BASE = 'M3 12.5v5A2.5 2.5 0 0 0 5.5 20h13a2.5 2.5 0 0 0 2.5-2.5v-5';
const TRAY_SLOT = 'M3 12.5h3.75a1 1 0 0 1 .9.55l.7 1.4a1 1 0 0 0 .9.55h5.5a1 1 0 0 0 .9-.55l.7-1.4a1 1 0 0 1 .9-.55H21';
const TRAY_FRONT = `${TRAY_BASE}h-3.75a1 1 0 0 0-.9.55l-.7 1.4a1 1 0 0 1-.9.55h-5.5a1 1 0 0 1-.9-.55l-.7-1.4a1 1 0 0 0-.9-.55Z`;
const OUT_WALLS = 'M4.35 9 3 12.5M21 12.5 19.65 9';
const OUT_ARROW = 'M12 12V3.5M8.75 6.75 12 3.5l3.25 3.25';
const DRIVE = 'M3 13.5 5.6 6.3A2 2 0 0 1 7.5 5h9a2 2 0 0 1 1.9 1.3L21 13.5v4a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5Z';
const DB_FILL = 'M4.5 5.5v13c0 1.5 3.4 2.75 7.5 2.75s7.5-1.25 7.5-2.75v-13c0-1.5-3.4-2.75-7.5-2.75S4.5 4 4.5 5.5Z';
const DB_KNOCK = 'M5.75 7Q12 9.5 18.25 7M5.75 13.5Q12 16 18.25 13.5';
const BACKUP_ARROW = 'M15.25 18.5a2.75 2.75 0 1 0 2.75-2.75';
const BACKUP_HEAD = '<path stroke-width="1.25" d="M16.75 15.75 18.75 14.5v2.5Z"/>';

export default {
  file: {
    o: `<path d="${PAGE}"/><path d="${PAGE_FOLD}"/>`,
    f: `<path d="${PAGE}"/>`,
    cut: `<path d="${PAGE_FOLD_CUT}" stroke-width="1.5"/>`,
  },

  'file-text': {
    o: `<path d="${PAGE}"/><path d="${PAGE_FOLD}"/><path d="M9 13h6M9 17h6M9 9h2"/>`,
    f: `<path d="${PAGE}"/>`,
    cut: `<path stroke-width="1.5" d="${PAGE_FOLD_CUT}M9 13h6M9 17h6M9 9h2"/>`,
  },

  // Modifier badge pattern: clear a circle at (18,18), draw the glyph on top.
  'file-plus': {
    o: `<path d="${PAGE}"/><path d="${PAGE_FOLD}"/>`,
    ocut: BADGE_CLEAR,
    otop: `<path d="${BADGE.plus}"/>`,
    f: `<path d="${PAGE}"/>`,
    cut: `<path d="${PAGE_FOLD_CUT}" stroke-width="1.5"/>${BADGE_CLEAR}`,
    top: `<path d="${BADGE.plus}"/>`,
  },

  // AI variant pattern: hero spark replaces the content.
  'file-sparkle': {
    o: `<path d="${PAGE}"/><path d="${PAGE_FOLD}"/><path d="${star(12, 13.75, 4)}"/>`,
    f: `<path d="${PAGE}"/>`,
    cut: `<path d="${PAGE_FOLD_CUT}" stroke-width="1.5"/><path d="${star(12, 13.75, 4)}" fill="#000" stroke-width="1"/>`,
  },

  folder: {
    o: `<path d="${FOLDER}"/>`,
    f: `<path d="${FOLDER}"/>`,
  },

  // ── File modifiers (badge) ──────────────────────────────────────────────────
  'file-minus': badge(FILE, G.minus),
  'file-check': badge(FILE, G.check),
  'file-x': badge(FILE, G.x),
  'file-search': badge(FILE, G.search),
  'file-edit': badge(FILE, G.edit),
  'file-lock': badge(FILE, G.lock),
  'file-upload': badge(FILE, G.up),
  'file-download': badge(FILE, G.down),
  'file-question': badge(FILE, G.question),

  // ── File types (glyph inside the page) ──────────────────────────────────────
  'file-code': typed(`<path d="${CODE}"/>`, `<path stroke-width="1.5" d="${CODE}"/>`),
  'file-image': typed(
    `<circle cx="9.5" cy="12" r="1.5"/><path d="${IMG_HILL}"/>`,
    `<circle cx="9.5" cy="12" r="1.75" fill="#000" stroke="none"/><path stroke-width="1.5" d="${IMG_HILL}"/>`,
  ),
  'file-video': typed(`<path d="${TRI_PLAY}"/>`, `<path d="${TRI_PLAY}" fill="#000" stroke-width="1"/>`),
  'file-audio': typed(
    `<circle cx="11" cy="16.25" r="1.75"/><path d="${NOTE_STEM}"/>`,
    `<circle cx="11" cy="16.25" r="2.25" fill="#000" stroke="none"/><path stroke-width="1.5" d="${NOTE_STEM}"/>`,
  ),
  // Label bar sticking out of the page; the page edge is opened around it.
  'file-pdf': {
    o: FILE.o,
    ocut: `<rect x="3" y="12" width="11" height="5.5" rx="1.5" fill="#000" stroke-width="3.5"/>`,
    otop: PDF_BAR,
    f: FILE.f,
    cut: `${FILE.cut}<rect x="3" y="12" width="11" height="5.5" rx="1.5" fill="#000" stroke-width="3.5"/>`,
    top: PDF_BAR,
  },
  'file-doc': typed(`<path d="${W}"/>`, `<path stroke-width="1.5" d="${W}"/>`),
  'file-spreadsheet': typed(
    `<rect x="8" y="11" width="8" height="7" rx="1"/><path d="${GRID}"/>`,
    `<rect x="8" y="11" width="8" height="7" rx="1" stroke-width="1.5"/><path stroke-width="1.5" d="${GRID}"/>`,
  ),
  'file-presentation': typed(
    `<rect x="8" y="10.75" width="8" height="4.75" rx="1"/><path d="M12 15.5V18M10 18h4"/>`,
    `<rect x="7.75" y="10.5" width="8.5" height="5.25" rx="1.25" fill="#000" stroke="none"/><path stroke-width="1.5" d="M12 15.5V18M10 18h4"/>`,
  ),
  'file-zip': typed(
    `<path d="${ZIP_TEETH}"/><rect x="8.75" y="14.75" width="3.5" height="3.5" rx="1.25"/>`,
    `<path stroke-width="1.5" d="${ZIP_TEETH}"/><rect x="8.5" y="14.5" width="4" height="4" rx="1.5" fill="#000" stroke="none"/>`,
  ),
  'file-json': typed(`<path d="${BRACES}"/>`, `<path stroke-width="1.5" d="${BRACES}"/>`),
  'file-csv': typed(`<path d="${CSV}"/>`, `<path stroke-width="1.5" d="${CSV}"/>`),
  'file-markdown': typed(`<path d="${MD}"/>`, `<path stroke-width="1.5" d="${MD}"/>`),

  files: {
    o: `${FILES_FRONT}<path d="${FILES_BACK}"/>`,
    f: `<path transform="translate(4.35 .45) scale(.85)" stroke-width="2.06" d="${PAGE}"/>`,
    cut: `<path transform="translate(4.35 .45) scale(.85)" stroke-width="1.76" d="${PAGE_FOLD_CUT}"/>`,
    top: `<path fill="none" d="${FILES_BACK}"/>`,
  },

  // ── Folders ────────────────────────────────────────────────────────────────
  'folder-open': {
    o: `<path d="${FOLDER}"/>`,
    ocut: FLAP_CLEAR,
    otop: `<path d="${FLAP}"/>`,
    f: `<path d="${FOLDER}"/>`,
    cut: `${FLAP_CLEAR}<path d="${FLAP}" fill="#000" stroke-width="4"/>`,
    top: `<path d="${FLAP}"/>`,
  },
  'folder-plus': badge(FOLDER_BASE, [`<path d="${BADGE.plus}"/>`]),
  'folder-minus': badge(FOLDER_BASE, G.minus),
  'folder-lock': badge(FOLDER_BASE, G.lock),
  'folder-upload': badge(FOLDER_BASE, G.up),
  'folder-download': badge(FOLDER_BASE, G.down),
  'folder-sparkle': {
    o: `<path d="${FOLDER}"/><path d="${star(12, 13.5, 4)}"/>`,
    f: `<path d="${FOLDER}"/>`,
    cut: `<path d="${star(12, 13.5, 4)}" fill="#000" stroke-width="1"/>`,
  },
  'folder-shared': {
    o: `<path d="${FOLDER}"/>${SHARED_HEAD}<path d="${SHARED_BODY}"/>`,
    f: `<path d="${FOLDER}"/>`,
    cut: `<circle cx="12" cy="11.75" r="2.5" fill="#000" stroke="none"/><path d="M7.75 18.5a4.25 3.5 0 0 1 8.5 0Z" fill="#000" stroke="none"/>`,
  },
  folders: {
    o: `<path transform="${FOLDERS_T}" stroke-width="2.19" d="${FOLDER}"/><path d="${FOLDERS_BACK}"/>`,
    f: `<path transform="${FOLDERS_T}" stroke-width="2.19" d="${FOLDER}"/>`,
    top: `<path fill="none" d="${FOLDERS_BACK}"/>`,
  },

  // ── Paper ──────────────────────────────────────────────────────────────────
  document: {
    o: `<rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="${DOC_LINES}"/>`,
    f: `<rect x="5" y="3" width="14" height="18" rx="2.5"/>`,
    cut: `<path stroke-width="1.5" d="${DOC_LINES}"/>`,
  },
  notebook: {
    o: `<rect x="6.25" y="3" width="13.25" height="18" rx="2.5"/><path d="M10.75 3v18M3.75 7h4M3.75 12h4M3.75 17h4"/>`,
    f: `<rect x="6.25" y="3" width="13.25" height="18" rx="2.5"/>`,
    cut: `<path stroke-width="1.5" d="M10.75 3.5v17M7 7h1M7 12h1M7 17h1"/>`,
    top: `<path d="M3.75 7h2.5M3.75 12h2.5M3.75 17h2.5"/>`,
  },
  note: {
    o: `<path d="${NOTE}"/><path d="${NOTE_FOLD}"/>`,
    f: `<path d="${NOTE}"/>`,
    cut: `<path stroke-width="1.5" d="M20 14.5h-4a1.5 1.5 0 0 0-1.5 1.5v4"/>`,
  },
  notes: {
    o: `<path d="${NOTES_FRONT}"/><path d="${NOTES_FOLD}"/><path d="${NOTES_BACK}"/>`,
    f: `<path d="${NOTES_FRONT}"/>`,
    cut: `<path stroke-width="1.5" d="M20.25 15.25h-3a1.5 1.5 0 0 0-1.5 1.5v3"/>`,
    top: `<path fill="none" d="${NOTES_BACK}"/>`,
  },
  clipboard: clipboard(),
  'clipboard-check': clipboard(`<path d="m9 13.75 2.25 2.25 4.25-4.25"/>`, `<path stroke-width="1.5" d="m9 13.75 2.25 2.25 4.25-4.25"/>`),
  'clipboard-list': clipboard(
    `<path d="M8.25 10h.01M8.25 13.5h.01M8.25 17h.01M11.25 10h4.5M11.25 13.5h4.5M11.25 17h4.5"/>`,
    `<path stroke-width="1.5" d="M11.25 10h4.5M11.25 13.5h4.5M11.25 17h4.5"/><path stroke-width="2" d="M8.25 10h.01M8.25 13.5h.01M8.25 17h.01"/>`,
  ),
  book: {
    o: `<path d="${BOOK}"/>`,
    f: `<path d="${BOOK_FILL}"/>`,
    cut: `<path stroke-width="1.5" d="M7.75 18.5h10.5"/>`,
  },
  'book-open': {
    o: `<path d="${BOOK_OPEN}"/><path d="M12 7v13.5"/>`,
    f: `<path d="${BOOK_OPEN}"/>`,
    cut: `<path stroke-width="1.5" d="M12 7.5v12"/>`,
  },
  library: {
    o: `<path d="${SHELF_BOOKS}"/><path d="M3 20.5h18"/>`,
    f: `<path d="M3 20.5V4.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v16ZM10 20.5v-13a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v13ZM17 20.5v-15a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v15Z"/>`,
    top: `<path d="M3 20.5h18"/>`,
  },
  newspaper: {
    o: `<rect x="3" y="4" width="18" height="16" rx="2.5"/><rect x="6.5" y="7.5" width="5" height="4.5" rx="1"/><path d="${NEWS_LINES}"/>`,
    f: `<rect x="3" y="4" width="18" height="16" rx="2.5"/>`,
    cut: `<rect x="6.25" y="7.25" width="5.5" height="5" rx="1.25" fill="#000" stroke="none"/><path stroke-width="1.5" d="${NEWS_LINES}"/>`,
  },
  scroll: {
    o: `<path d="${SCROLL_TOP}"/><path d="${SCROLL_ROLLS}"/><path d="${SCROLL_LINES}"/>`,
    f: `<path d="${SCROLL_FILL}"/>`,
    cut: `<path stroke-width="1.5" d="M8 8.25V5.5M13 17.75v.75a2.5 2.5 0 0 1-2.5 2.5${SCROLL_LINES}"/>`,
  },
  'page-break': {
    o: `<path d="${BREAK_TOP}"/><path d="${BREAK_BOTTOM}"/><path d="${BREAK_DASH}"/>`,
    f: `<path d="${BREAK_TOP}Z"/><path d="${BREAK_BOTTOM}Z"/>`,
    top: `<path d="${BREAK_DASH}"/>`,
  },
  template: {
    o: `<rect x="4.5" y="3" width="15" height="18" rx="2.5"/><rect x="7.5" y="6.5" width="9" height="3" rx="1"/><rect x="7.5" y="12.5" width="4" height="5.5" rx="1"/><path d="${TPL_LINES}"/>`,
    f: `<rect x="4.5" y="3" width="15" height="18" rx="2.5"/>`,
    cut: `<rect x="7.25" y="6.25" width="9.5" height="3.5" rx="1.25" fill="#000" stroke="none"/><rect x="7.25" y="12.25" width="4.5" height="6" rx="1.25" fill="#000" stroke="none"/><path stroke-width="1.5" d="${TPL_LINES}"/>`,
  },
  attachment: typed(
    `<path transform="rotate(40 12 14)" d="${CLIP_PATH}"/>`,
    `<path transform="rotate(40 12 14)" stroke-width="1.5" d="${CLIP_PATH}"/>`,
  ),

  // ── Trays & storage ────────────────────────────────────────────────────────
  inbox: {
    o: `<path d="${TRAY_RIM}${TRAY_BASE}"/><path d="${TRAY_SLOT}"/>`,
    f: `<path d="${TRAY_FRONT}"/>`,
    top: `<path fill="none" d="${TRAY_RIM}"/>`,
  },
  outbox: {
    o: `<path d="${OUT_WALLS}${TRAY_BASE}"/><path d="${TRAY_SLOT}"/><path d="${OUT_ARROW}"/>`,
    f: `<path d="${TRAY_FRONT}"/>`,
    top: `<path fill="none" d="${OUT_WALLS}${OUT_ARROW}"/>`,
  },
  drive: {
    o: `<path d="${DRIVE}"/><path d="M3 13.5h18M7 16.75h.01M10 16.75h.01"/>`,
    f: `<path d="${DRIVE}"/>`,
    cut: `<path stroke-width="1.5" d="M4 13.5h16"/><circle cx="7" cy="16.75" r="1" fill="#000" stroke="none"/><circle cx="10" cy="16.75" r="1" fill="#000" stroke="none"/>`,
  },
  storage: {
    o: `<rect x="3" y="3.5" width="18" height="7" rx="2.5"/><rect x="3" y="13.5" width="18" height="7" rx="2.5"/><path d="M7 7h.01M10 7h.01M7 17h.01M10 17h.01"/>`,
    f: `<rect x="3" y="3.5" width="18" height="7" rx="2.5"/><rect x="3" y="13.5" width="18" height="7" rx="2.5"/>`,
    cut: `<path stroke-width="2.25" d="M7 7h.01M10 7h.01M7 17h.01M10 17h.01"/>`,
  },
  database: {
    o: DATABASE,
    f: `<path d="${DB_FILL}"/>`,
    cut: `<path stroke-width="1.5" d="${DB_KNOCK}"/>`,
  },
  backup: {
    o: DATABASE,
    ocut: BADGE_CLEAR,
    otop: `<path d="${BACKUP_ARROW}"/>${BACKUP_HEAD.replace("<path ", "<path fill=\"currentColor\" ")}`,
    f: `<path d="${DB_FILL}"/>`,
    cut: `<path stroke-width="1.5" d="${DB_KNOCK}"/>${BADGE_CLEAR}`,
    top: `<path fill="none" d="${BACKUP_ARROW}"/>${BACKUP_HEAD}`,
  },
};
