import { FRAME, BADGE, BADGE_CLEAR } from '../shapes.mjs';

// Layout wireframes are pure glyphs (no spark) and share FRAME.
// Filled style: FRAME solid, divider lines knocked out right through the shape (stroke 1.5),
// so the regions read as separate tiles.
const K = (d, w = 1.5) => `<path d="${d}" stroke-width="${w}"/>`; // knockout line(s)
/** Gap ring around a front shape that overlaps a back shape (filled style): 1.25 visible gap. */
const ring = (x, y, w, h, rx) =>
  `<rect x="${x - 1.5}" y="${y - 1.5}" width="${w + 3}" height="${h + 3}" rx="${rx + 1.5}" stroke-width="1.25"/>`;
const POPOVER = 'M5.5 7H9l3-3.5L15 7h3.5A2.5 2.5 0 0 1 21 9.5V18a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18V9.5A2.5 2.5 0 0 1 5.5 7Z';
const TOOLTIP = 'M5.5 4.5h13A2.5 2.5 0 0 1 21 7v6.5a2.5 2.5 0 0 1-2.5 2.5H15l-3 3.5L9 16H5.5A2.5 2.5 0 0 1 3 13.5V7a2.5 2.5 0 0 1 2.5-2.5Z';
const PILL = '<rect x="3" y="6.5" width="18" height="11" rx="5.5"/>';
const BOX = '<rect x="3.5" y="3.5" width="17" height="17" rx="3"/>';
const CHECK = 'm7.75 12.25 3 3 5.5-6';
const IBEAM = 'M7 9.5h2M8 9.5v5M7 14.5h2';
const CURSOR = 'M11 11l3.25 8.5 1.25-3.75 3.75-1.25Z'; // pointer arrow, tip top-left
const FORM = '<rect x="3" y="3" width="18" height="4.5" rx="1.5"/><rect x="3" y="10.5" width="18" height="4.5" rx="1.5"/><rect x="13" y="18" width="8" height="3" rx="1.5"/>';
const RIBBON = 'M3 7h18l-2.5 5 2.5 5H3l2.5-5Z';
const RULER_TICKS = 'M7 9v2.5M10.5 9v3.5M14 9v2.5M17.5 9v3.5';
const MOON = 'M12 3a6.5 6.5 0 0 0 9 9 9 9 0 1 1-9-9Z';
const SUN_RAYS = 'M12 3.25v2M12 18.75v2M3.25 12h2M18.75 12h2M5.81 5.81l1.42 1.42M16.77 16.77l1.42 1.42M5.81 18.19l1.42-1.42M16.77 7.23l1.42-1.42';
const ROLLER_ARM = 'M18 5.75h1.5A1.5 1.5 0 0 1 21 7.25V10a1.5 1.5 0 0 1-1.5 1.5h-6A1.5 1.5 0 0 0 12 13v2';
const WIDGET = '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="15" y="4" width="5" height="5" rx="1" transform="rotate(45 17.5 6.5)"/>';
const KANBAN = [[3, [3, 10, 17]], [10, [3, 10]], [17, [3]]]
  .map(([x, ys]) => ys.map((y) => `<rect x="${x}" y="${y}" width="4" height="4" rx="1"/>`).join(''))
  .join('');
const tile = (d, cut = d) => ({ o: `${FRAME}<path d="${d}"/>`, f: FRAME, cut: K(cut) });

export default {
  'layout-sidebar-left': {
    o: `${FRAME}<path d="M9 3v18"/>`,
    f: `<rect x="3" y="3" width="18" height="18" rx="2.5" fill="none"/><path d="M9 3H5.5A2.5 2.5 0 0 0 3 5.5v13A2.5 2.5 0 0 0 5.5 21H9Z"/>`,
  },

  // Header plus sidebar.
  layout: tile('M3 9h18M9 9v12', 'M1 9h22M9 9v14'),
  'layout-grid': tile('M12 3v18M3 12h18', 'M12 1v22M1 12h22'),
  'layout-list': {
    o: `${FRAME}<path d="M7.5 8h.01M7.5 12h.01M7.5 16h.01M11 8h5.5M11 12h5.5M11 16h5.5"/>`,
    f: FRAME,
    cut: `<path d="M7.5 8h.01M7.5 12h.01M7.5 16h.01" stroke-width="2"/>${K('M11 8h5.5M11 12h5.5M11 16h5.5', 1.75)}`,
  },
  'layout-columns': tile('M9 3v18M15 3v18', 'M9 1v22M15 1v22'),
  'layout-rows': tile('M3 9h18M3 15h18', 'M1 9h22M1 15h22'),
  // Mirror of layout-sidebar-left.
  'layout-sidebar-right': {
    o: `${FRAME}<path d="M15 3v18"/>`,
    f: `<rect x="3" y="3" width="18" height="18" rx="2.5" fill="none"/><path d="M15 3h3.5A2.5 2.5 0 0 1 21 5.5v13a2.5 2.5 0 0 1-2.5 2.5H15Z"/>`,
  },
  'layout-dashboard': tile('M10 3v18M3 14h7M10 8.5h11', 'M10 1v22M1 14h9M10 8.5h13'),
  'layout-masonry': tile('M9 3v18M15 3v18M3 12.5h6M9 8.5h6M15 15h6', 'M9 1v22M15 1v22M1 12.5h8M9 8.5h6M15 15h8'),
  'layout-kanban': {
    o: `${FRAME}<path d="M7.5 7.5v9M12 7.5v5M16.5 7.5v7"/>`,
    f: FRAME,
    cut: K('M7.5 7.5v9M12 7.5v5M16.5 7.5v7', 1.75),
  },
  'layout-split': tile('M12 3v18', 'M12 1v22'),
  'layout-split-horizontal': tile('M3 12h18', 'M1 12h22'),

  // ── Windows ──────────────────────────────────────────────────────────────────
  window: tile('M3 9h18', 'M1 9h22'),
  windows: {
    o: `<path d="M7 7V5.5A2.5 2.5 0 0 1 9.5 3h9A2.5 2.5 0 0 1 21 5.5v9a2.5 2.5 0 0 1-2.5 2.5H17"/>
        <rect x="3" y="7" width="14" height="14" rx="2.5"/><path d="M3 11h14"/>`,
    f: `<rect x="7" y="3" width="14" height="14" rx="2.5"/><rect x="3" y="7" width="14" height="14" rx="2.5"/>`,
    cut: `${ring(3, 7, 14, 14, 2.5)}${K('M1 11h17')}`,
  },
  'app-window': {
    o: `${FRAME}<path d="M3 9h18M6.5 6h.01M9.5 6h.01M12.5 6h.01"/>`,
    f: FRAME,
    cut: `${K('M1 9h22')}<circle cx="6.5" cy="6" r="1" fill="#000" stroke="none"/><circle cx="9.5" cy="6" r="1" fill="#000" stroke="none"/><circle cx="12.5" cy="6" r="1" fill="#000" stroke="none"/>`,
  },
  browser: {
    o: `${FRAME}<path d="M3 9h18M6.5 6h.01M9.5 6h8"/>`,
    f: FRAME,
    cut: `${K('M1 9h22')}<circle cx="6.5" cy="6" r="1" fill="#000" stroke="none"/>${K('M9.5 6h8', 1.75)}`,
  },
  modal: {
    o: `${FRAME}<rect x="6.5" y="7" width="11" height="10" rx="2"/><path d="M6.5 10.5h11"/>`,
    f: FRAME,
    cut: `<rect x="6.5" y="7" width="11" height="10" rx="2" stroke-width="1.5"/>${K('M6.5 10.5h11')}`,
  },

  // Browser window whose active tab (left) opens into the page.
  tab: tile('M12 3v6h9', 'M12 1v8h11'),
  tabs: tile('M9 3v6h12M15 3v6', 'M9 1v8h14M15 1v8'),

  // ── Overlays & surfaces ─────────────────────────────────────────────────────
  popover: {
    o: `<path d="${POPOVER}"/><path d="M7.5 12h9M7.5 16h5"/>`,
    f: `<path d="${POPOVER}"/>`,
    cut: K('M7.5 12h9M7.5 16h5'),
  },
  tooltip: {
    o: `<path d="${TOOLTIP}"/><path d="M8 10.25h8"/>`,
    f: `<path d="${TOOLTIP}"/>`,
    cut: K('M8 10.25h8'),
  },
  card: {
    o: `<rect x="4.5" y="3" width="15" height="18" rx="2.5"/><path d="M4.5 11h15M8 14.75h8M8 17.75h5"/>`,
    f: `<rect x="4.5" y="3" width="15" height="18" rx="2.5"/>`,
    cut: K('M2.5 11h19M8 14.75h8M8 17.75h5'),
  },
  cards: {
    o: `<path d="M8.5 6v-.5A2.5 2.5 0 0 1 11 3h7.5A2.5 2.5 0 0 1 21 5.5v10a2.5 2.5 0 0 1-2.5 2.5h-3"/>
        <rect x="3" y="6" width="12.5" height="15" rx="2.5"/><path d="M3 13h12.5M6.5 17h5.5"/>`,
    f: `<rect x="8.5" y="3" width="12.5" height="15" rx="2.5"/><rect x="3" y="6" width="12.5" height="15" rx="2.5"/>`,
    cut: `${ring(3, 6, 12.5, 15, 2.5)}${K('M1 13h15.5M6.5 17h5.5')}`,
  },
  carousel: {
    o: `<rect x="7" y="4.5" width="10" height="15" rx="2"/><path d="M3.5 7v10M20.5 7v10"/>`,
    f: `<rect x="7" y="4.5" width="10" height="15" rx="2"/><path d="M3.5 7v10M20.5 7v10"/>`,
  },
  // Collapsed row, open panel, collapsed row.
  accordion: {
    o: `<rect x="3" y="3" width="18" height="3" rx="1.5"/><rect x="3" y="9" width="18" height="6" rx="2"/><rect x="3" y="18" width="18" height="3" rx="1.5"/><path d="M7 12h10"/>`,
    f: `<rect x="3" y="3" width="18" height="3" rx="1.5"/><rect x="3" y="9" width="18" height="6" rx="2"/><rect x="3" y="18" width="18" height="3" rx="1.5"/>`,
    cut: K('M7 12h10'),
  },

  // ── Controls ────────────────────────────────────────────────────────────────
  'toggle-on': {
    o: `${PILL}<circle cx="15.5" cy="12" r="2.5" fill="currentColor"/>`,
    f: PILL,
    cut: `<circle cx="15.5" cy="12" r="2.5" fill="#000"/>`,
  },
  'toggle-off': {
    o: `${PILL}<circle cx="8.5" cy="12" r="2.5"/>`,
    f: PILL,
    cut: `<circle cx="8.5" cy="12" r="2.5" fill="#000"/>`,
  },
  checkbox: {
    o: BOX,
    f: BOX,
  },
  'checkbox-checked': {
    o: `${BOX}<path d="${CHECK}"/>`,
    f: BOX,
    cut: `<path d="${CHECK}" stroke-width="2"/>`,
  },
  'radio-button': {
    o: `<circle cx="12" cy="12" r="8.5"/>`,
    f: `<circle cx="12" cy="12" r="8.5"/>`,
  },
  'radio-button-checked': {
    o: `<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4" fill="currentColor"/>`,
    f: `<circle cx="12" cy="12" r="8.5"/>`,
    cut: `<circle cx="12" cy="12" r="6.25" stroke-width="1.5"/>`,
  },
  'slider-horizontal': {
    o: `<path d="M3 12h8M17 12h4"/><circle cx="14" cy="12" r="3"/>`,
    f: `<path d="M3 12h8M17 12h4"/><circle cx="14" cy="12" r="3"/>`,
  },
  // Text field with an I-beam cursor.
  input: {
    o: `<rect x="3" y="6" width="18" height="12" rx="2.5"/><path d="${IBEAM}"/>`,
    f: `<rect x="3" y="6" width="18" height="12" rx="2.5"/>`,
    cut: K(IBEAM),
  },
  textarea: {
    o: `${FRAME}<path d="M7 8h10M7 12h6M18 15l-3 3"/>`,
    f: FRAME,
    cut: K('M7 8h10M7 12h6M18 15l-3 3'),
  },
  dropdown: {
    o: `<rect x="3" y="6" width="18" height="12" rx="2.5"/><path d="M7 12h2.5"/><path d="m13.5 10.75 2.25 2.25 2.25-2.25"/>`,
    f: `<rect x="3" y="6" width="18" height="12" rx="2.5"/>`,
    cut: `${K('M7 12h2.5')}${K('m13.5 10.75 2.25 2.25 2.25-2.25', 1.75)}`,
  },
  button: {
    o: `<rect x="3" y="4.5" width="18" height="10" rx="3"/>`,
    ocut: `<path d="${CURSOR}" fill="#000" stroke-width="4.25"/>`,
    otop: `<path d="${CURSOR}"/>`,
    f: `<rect x="3" y="4.5" width="18" height="10" rx="3"/>`,
    cut: `<path d="${CURSOR}" fill="#000" stroke-width="4.25"/>`,
    top: `<path d="${CURSOR}"/>`,
  },
  // Two fields and a submit button.
  form: {
    o: FORM,
    f: FORM,
  },
  stepper: {
    o: `<circle cx="5.25" cy="12" r="2.25" fill="currentColor"/><circle cx="12" cy="12" r="2.25"/><circle cx="18.75" cy="12" r="2.25"/><path d="M7.5 12h2.25M14.25 12h2.25"/>`,
    f: `<circle cx="5.25" cy="12" r="2.25"/><circle cx="12" cy="12" r="2.25"/><circle cx="18.75" cy="12" r="2.25"/><path d="M7.5 12h2.25M14.25 12h2.25"/>`,
  },
  pagination: {
    o: `<path d="M5.5 9 3 12l2.5 3M18.5 9l2.5 3-2.5 3"/><path d="M9 12h.01M12 12h.01M15 12h.01" stroke-width="2"/>`,
    bold: true,
  },
  toast: {
    o: `${FRAME}<rect x="7" y="15" width="10" height="3" rx="1.5" fill="currentColor"/>`,
    f: FRAME,
    cut: `<rect x="7" y="15" width="10" height="3" rx="1.5" fill="#000"/>`,
  },
  // Ribbon banner with swallowtail ends.
  banner: {
    o: `<path d="${RIBBON}"/><path d="M8.5 12h7"/>`,
    f: `<path d="${RIBBON}"/>`,
    cut: K('M8.5 12h7'),
  },
  skeleton: {
    o: `<circle cx="6.5" cy="7" r="3.25"/><path d="M13.5 5.5h7M13.5 9h5"/><rect x="3" y="13.5" width="18" height="7" rx="2"/>`,
    f: `<circle cx="6.5" cy="7" r="3.25"/><path d="M13.5 5.5h7M13.5 9h5" stroke-width="2.5"/><rect x="3" y="13.5" width="18" height="7" rx="2"/>`,
  },

  // ── Design tools ────────────────────────────────────────────────────────────
  spacing: {
    o: `<path d="M4 4h16M4 20h16M12 7.5v9M9.5 10 12 7.5l2.5 2.5M9.5 14l2.5 2.5 2.5-2.5"/>`,
    bold: true,
  },
  padding: {
    o: `${FRAME}<rect x="8" y="8" width="8" height="8" rx="1.5" fill="currentColor"/>`,
    f: FRAME,
    cut: `<rect x="8" y="8" width="8" height="8" rx="1.5" stroke-width="1.5"/>`,
  },
  'border-radius': {
    o: `<path d="M4 20.5v-8A8.5 8.5 0 0 1 12.5 4h8"/><path d="M4 4h.01" stroke-width="2.25"/>`,
    bold: true,
  },
  'grid-lines': {
    o: `<path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>`,
    bold: true,
  },
  ruler: {
    o: `<g transform="rotate(-45 12 12)"><rect x="3.25" y="9" width="17.5" height="6" rx="1.5"/><path d="${RULER_TICKS}"/></g>`,
    f: `<rect transform="rotate(-45 12 12)" x="3.25" y="9" width="17.5" height="6" rx="1.5"/>`,
    cut: `<path transform="rotate(-45 12 12)" d="M7 7.5v4M10.5 7.5v5M14 7.5v4M17.5 7.5v5" stroke-width="1.5"/>`,
  },
  'guide-lines': {
    o: `<path d="M3 6.5h18M6.5 3v18" stroke-dasharray="1.5 3"/><rect x="10" y="10" width="10" height="10" rx="2"/>`,
    f: `<path d="M3 6.5h18M6.5 3v18" stroke-dasharray="1.5 3"/><rect x="10" y="10" width="10" height="10" rx="2"/>`,
  },
  // Desktop monitor with a phone in front.
  responsive: {
    o: `<rect x="3" y="4" width="14" height="10.5" rx="2"/><path d="M8.5 14.5V18M6 18h5"/>`,
    ocut: `<rect x="14" y="8.5" width="7" height="12.5" rx="1.5" fill="#000" stroke-width="4.25"/>`,
    otop: `<rect x="14" y="8.5" width="7" height="12.5" rx="1.5"/><path d="M16.75 11.5h1.5"/>`,
    f: `<rect x="3" y="4" width="14" height="10.5" rx="2"/><path d="M8.5 14.5V18M6 18h5"/><rect x="14" y="8.5" width="7" height="12.5" rx="1.5"/>`,
    cut: `${ring(14, 8.5, 7, 12.5, 1.5)}${K('M16.75 11.5h1.5')}`,
  },
  'dark-mode': {
    o: `<path d="${MOON}"/>`,
    f: `<path d="${MOON}"/>`,
  },
  'light-mode': {
    o: `<circle cx="12" cy="12" r="3.75"/><path d="${SUN_RAYS}"/>`,
    f: `<circle cx="12" cy="12" r="3.75"/><path d="${SUN_RAYS}"/>`,
  },
  // Half light, half dark.
  'system-theme': {
    o: `<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5a8.5 8.5 0 0 1 0 17Z" fill="currentColor"/>`,
    f: `<circle cx="12" cy="12" r="8.5"/>`,
    cut: `<path d="M12 6a6 6 0 0 0 0 12Z" fill="#000" stroke="none"/>`,
  },
  // Paint roller.
  theme: {
    o: `<rect x="3" y="3" width="15" height="5.5" rx="2"/><path d="${ROLLER_ARM}"/><rect x="10.5" y="15" width="3" height="6" rx="1"/>`,
    f: `<rect x="3" y="3" width="15" height="5.5" rx="2"/><rect x="10.5" y="15" width="3" height="6" rx="1"/>`,
    top: `<path fill="none" d="${ROLLER_ARM}"/>`,
  },
  // Four tiles, one rotated.
  widget: {
    o: WIDGET,
    f: WIDGET,
  },
  kanban: {
    o: KANBAN,
    f: KANBAN,
  },
  whiteboard: {
    o: `<rect x="3" y="3.5" width="18" height="12" rx="2.5"/><path d="M7 15.5 5.5 21M17 15.5l1.5 5.5"/><path d="M7.5 11 10 8.5l2.5 2 3.5-3"/>`,
    f: `<rect x="3" y="3.5" width="18" height="12" rx="2.5"/><path d="M7 15.5 5.5 21M17 15.5l1.5 5.5"/>`,
    cut: K('M7.5 11 10 8.5l2.5 2 3.5-3'),
  },
  // Blank canvas on an A-frame easel.
  canvas: {
    o: `<rect x="5.5" y="6.5" width="13" height="9" rx="1.5"/><path d="M12 3v3.5M8.5 15.5 7 21M15.5 15.5 17 21"/>`,
    f: `<rect x="5.5" y="6.5" width="13" height="9" rx="1.5"/><path d="M12 3v3.5M8.5 15.5 7 21M15.5 15.5 17 21"/>`,
  },
  'frame-plus': {
    o: FRAME,
    ocut: BADGE_CLEAR,
    otop: `<path d="${BADGE.plus}"/>`,
    f: FRAME,
    cut: BADGE_CLEAR,
    top: `<path d="${BADGE.plus}"/>`,
  },
};
