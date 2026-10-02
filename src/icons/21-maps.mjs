import { FRAME, BADGE, BADGE_CLEAR, SLASH, SLASH_CLEAR } from '../shapes.mjs';

// ── Local shared shapes ───────────────────────────────────────────────────────
// Map pin: head centre (12,10) r7, tip (12,21). Dot hole r2.5.
const PIN = 'M12 21c-1-.9-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-6 10.1-7 11Z';
const PIN_DOT = '<circle cx="12" cy="10" r="2.5"/>';
const PIN_DOT_CUT = '<circle cx="12" cy="10" r="2.75" fill="#000" stroke="none"/>';
// Folded paper map, three panels.
const MAP = 'M3 6.5 9 4l6 2.5L21 4v13.5L15 20l-6-2.5L3 20Z';
const MAP_FOLDS = 'M9 4v13.5M15 6.5V20';
// Crosshair (location).
const CROSS_RING = '<circle cx="12" cy="12" r="6.5"/>';
const CROSS_TICKS = 'M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21';

export default {
  map: {
    o: `<path d="${MAP}"/><path d="${MAP_FOLDS}"/>`,
    f: `<path d="${MAP}"/>`,
    cut: `<path d="M9 5v12M15 7.5v11.5" stroke-width="1.5"/>`,
  },

  'map-pin': {
    o: `<path d="${PIN}"/>${PIN_DOT}`,
    f: `<path d="${PIN}"/>`,
    cut: PIN_DOT_CUT,
  },

  'map-pin-plus': {
    o: `<path d="${PIN}"/>${PIN_DOT}`,
    ocut: BADGE_CLEAR,
    otop: `<path d="${BADGE.plus}"/>`,
    f: `<path d="${PIN}"/>`,
    cut: `${PIN_DOT_CUT}${BADGE_CLEAR}`,
    top: `<path d="${BADGE.plus}"/>`,
  },

  'map-pin-off': {
    o: `<path d="${PIN}"/>${PIN_DOT}`,
    ocut: SLASH_CLEAR,
    otop: SLASH,
    f: `<path d="${PIN}"/>`,
    cut: `${PIN_DOT_CUT}${SLASH_CLEAR}`,
    top: SLASH,
  },

  // Small pin dropped onto a ground line.
  'pin-drop': {
    o: `<path d="M12 17.5c-.8-.7-5.5-4.9-5.5-9a5.5 5.5 0 0 1 11 0c0 4.1-4.7 8.3-5.5 9Z"/><circle cx="12" cy="8.5" r="2"/><path d="M5.5 20.75h13"/>`,
    f: `<path d="M12 17.5c-.8-.7-5.5-4.9-5.5-9a5.5 5.5 0 0 1 11 0c0 4.1-4.7 8.3-5.5 9Z"/>`,
    cut: `<circle cx="12" cy="8.5" r="2.25" fill="#000" stroke="none"/>`,
    top: `<path d="M5.5 20.75h13"/>`,
  },

  location: {
    o: `${CROSS_RING}<path d="${CROSS_TICKS}"/><circle cx="12" cy="12" r="2.5"/>`,
    f: `${CROSS_RING}<path d="${CROSS_TICKS}"/>`,
    cut: `<circle cx="12" cy="12" r="4.25" stroke-width="1.5"/>`,
  },

  'location-off': {
    o: `${CROSS_RING}<path d="${CROSS_TICKS}"/><circle cx="12" cy="12" r="2.5"/>`,
    ocut: SLASH_CLEAR,
    otop: SLASH,
    f: `${CROSS_RING}<path d="${CROSS_TICKS}"/>`,
    cut: `<circle cx="12" cy="12" r="4.25" stroke-width="1.5"/>${SLASH_CLEAR}`,
    top: SLASH,
  },

  route: {
    o: `<circle cx="6" cy="18.5" r="2.25"/><circle cx="18" cy="5.5" r="2.25"/><path d="M8.25 18.5h7a3.25 3.25 0 0 0 0-6.5h-7a3.25 3.25 0 0 1 0-6.5h7.5"/>`,
    f: `<circle cx="6" cy="18.5" r="2.25"/><circle cx="18" cy="5.5" r="2.25"/><path fill="none" d="M8.25 18.5h7a3.25 3.25 0 0 0 0-6.5h-7a3.25 3.25 0 0 1 0-6.5h7.5"/>`,
  },

  // Signpost: one sign points right, one left.
  directions: {
    o: `<path d="M7 3.5h10l2.5 2.75L17 9H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z"/><path d="M17 12H7l-2.5 2.75L7 17.5h10a1 1 0 0 0 1-1V13a1 1 0 0 0-1-1Z"/><path d="M12 9v3M12 17.5V21"/>`,
    f: `<path d="M7 3.5h10l2.5 2.75L17 9H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z"/><path d="M17 12H7l-2.5 2.75L7 17.5h10a1 1 0 0 0 1-1V13a1 1 0 0 0-1-1Z"/><path d="M12 9v3M12 17.5V21"/>`,
  },

  // Globe with a pin standing on its upper right.
  'globe-pin': {
    o: `<circle cx="10.5" cy="13" r="7.5"/><path d="M3 13h15M10.5 5.5c-2 2-3 4.5-3 7.5s1 5.5 3 7.5c2-2 3-4.5 3-7.5"/>`,
    ocut: `<path d="M17.5 14c-.5-.6-3.5-3.6-3.5-7a3.5 3.5 0 0 1 7 0c0 3.4-3 6.4-3.5 7Z" fill="#000" stroke-width="4"/>`,
    otop: `<path d="M17.5 14c-.5-.6-3.5-3.6-3.5-7a3.5 3.5 0 0 1 7 0c0 3.4-3 6.4-3.5 7Z"/><circle cx="17.5" cy="7" r="1"/>`,
    f: `<circle cx="10.5" cy="13" r="7.5"/>`,
    cut: `<path stroke-width="1.5" d="M3 13h15M10.5 5.5c-2 2-3 4.5-3 7.5s1 5.5 3 7.5c2-2 3-4.5 3-7.5"/><path d="M17.5 14c-.5-.6-3.5-3.6-3.5-7a3.5 3.5 0 0 1 7 0c0 3.4-3 6.4-3.5 7Z" fill="#000" stroke-width="4"/>`,
    top: `<path d="M17.5 14c-.5-.6-3.5-3.6-3.5-7a3.5 3.5 0 0 1 7 0c0 3.4-3 6.4-3.5 7Z"/>`,
  },

  // Globe with continent coastlines (distinct from the gridded `globe`).
  earth: {
    o: `<circle cx="12" cy="12" r="9"/><path d="M7.5 4.25V5.5A2.5 2.5 0 0 0 10 8a2 2 0 0 1 2 2 2 2 0 0 0 4 0 2 2 0 0 1 2-2h2.05M3.1 11.25H5a2 2 0 0 1 2 2v.25a2 2 0 0 0 2 2 2 2 0 0 1 2 2v3.4M20.5 15H17.5a2 2 0 0 0-2 2v3.25"/>`,
    f: `<circle cx="12" cy="12" r="9"/>`,
    cut: `<path stroke-width="1.5" d="M7.5 3.5V5.5A2.5 2.5 0 0 0 10 8a2 2 0 0 1 2 2 2 2 0 0 0 4 0 2 2 0 0 1 2-2h3M2.5 11.25H5a2 2 0 0 1 2 2v.25a2 2 0 0 0 2 2 2 2 0 0 1 2 2v4M21.5 15H17.5a2 2 0 0 0-2 2v4"/>`,
  },

  building: {
    o: `<rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M9.5 7h.01M14.5 7h.01M9.5 10.5h.01M14.5 10.5h.01M9.5 14h.01M14.5 14h.01M10 21v-2.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1V21"/>`,
    f: `<rect x="5" y="3" width="14" height="18" rx="2.5"/>`,
    cut: `<path stroke-width="2" d="M9.5 7h.01M14.5 7h.01M9.5 10.5h.01M14.5 10.5h.01M9.5 14h.01M14.5 14h.01"/><path d="M10 22v-3.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1V22Z" fill="#000" stroke="none"/>`,
  },

  // Tall block and a lower neighbour.
  buildings: {
    o: `<path d="M13.5 21V5.5A2.5 2.5 0 0 0 11 3H6a2.5 2.5 0 0 0-2.5 2.5v13A2.5 2.5 0 0 0 6 21h12.5a2 2 0 0 0 2-2v-7.5a2 2 0 0 0-2-2h-5"/><path d="M7 7h.01M10 7h.01M7 10.5h.01M10 10.5h.01M7 14h.01M10 14h.01M17 13.5h.01M17 17h.01"/>`,
    f: `<path d="M13.5 21V5.5A2.5 2.5 0 0 0 11 3H6a2.5 2.5 0 0 0-2.5 2.5v13A2.5 2.5 0 0 0 6 21h12.5a2 2 0 0 0 2-2v-7.5a2 2 0 0 0-2-2h-5Z"/>`,
    cut: `<path stroke-width="2" d="M7 7h.01M10 7h.01M7 10.5h.01M10 10.5h.01M7 14h.01M10 14h.01M17 13.5h.01M17 17h.01"/><path d="M13.5 10.5V21" stroke-width="1.5"/>`,
  },

  // Glass office block: window bands and an entrance.
  office: {
    o: `<rect x="4" y="3" width="16" height="18" rx="2.5"/><path d="M8 7.5h8M8 11h8M8 14.5h8M10.5 21v-2.5h3V21"/>`,
    f: `<rect x="4" y="3" width="16" height="18" rx="2.5"/>`,
    cut: `<path stroke-width="1.75" d="M8 7.5h8M8 11h8M8 14.5h8"/><path d="M10.5 22v-3.5h3V22Z" fill="#000" stroke-width="1"/>`,
  },

  factory: {
    o: `<path d="M3.5 18.5v-14A1.5 1.5 0 0 1 5 3h2a1.5 1.5 0 0 1 1.5 1.5V12l6-4v4l6-4v10.5A2.5 2.5 0 0 1 18 21H6a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M7.5 16.5H9M11.25 16.5h1.5M15 16.5h1.5"/>`,
    f: `<path d="M3.5 18.5v-14A1.5 1.5 0 0 1 5 3h2a1.5 1.5 0 0 1 1.5 1.5V12l6-4v4l6-4v10.5A2.5 2.5 0 0 1 18 21H6a2.5 2.5 0 0 1-2.5-2.5Z"/>`,
    cut: `<path d="M7.5 16.5H9M11.25 16.5h1.5M15 16.5h1.5"/>`,
  },

  warehouse: {
    o: `<path d="M3.5 19V9.5L12 4.5l8.5 5V19a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2Z"/><path d="M7.5 21v-8.5h9V21M7.5 15.5h9M7.5 18.5h9"/>`,
    f: `<path d="M3.5 19V9.5L12 4.5l8.5 5V19a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2Z"/>`,
    cut: `<path stroke-width="1.5" d="M7.5 22v-9.5h9V22M7.5 15.5h9M7.5 18.5h9"/>`,
  },

  // Low schoolhouse with a central gable, round window and a pennant.
  school: {
    o: `<path d="M3 19.5V13a1.5 1.5 0 0 1 1.5-1.5H7l5-4.5 5 4.5h2.5A1.5 1.5 0 0 1 21 13v6.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5Z"/><path d="M12 7V3l3.5 1.25L12 5.5"/><circle cx="12" cy="12" r="1.5"/><path d="M10 21v-2.5a2 2 0 0 1 4 0V21"/>`,
    f: `<path d="M3 19.5V13a1.5 1.5 0 0 1 1.5-1.5H7l5-4.5 5 4.5h2.5A1.5 1.5 0 0 1 21 13v6.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5Z"/>`,
    cut: `<circle cx="12" cy="12" r="1.75" fill="#000" stroke="none"/><path d="M10 22v-3.5a2 2 0 0 1 4 0V22Z" fill="#000" stroke="none"/>`,
    top: `<path fill="none" d="M12 7V3"/><path d="M12 3l3.5 1.25L12 5.5Z"/>`,
  },

  hospital: {
    o: `<rect x="4" y="3" width="16" height="18" rx="2.5"/><path d="M12 7v6M9 10h6M10 21v-3.5h4V21"/>`,
    f: `<rect x="4" y="3" width="16" height="18" rx="2.5"/>`,
    cut: `<path d="M12 7v6M9 10h6" stroke-width="2"/><path d="M10 22v-4.5h4V22Z" fill="#000" stroke="none"/>`,
  },

  // Classical facade: pediment, four columns, plinth.
  landmark: {
    o: `<path d="M4.5 8.5 12 3.75l7.5 4.75Z"/><path d="M6.5 11.5v5.5M10.25 11.5v5.5M13.75 11.5v5.5M17.5 11.5v5.5M3.5 20.5h17"/>`,
    f: `<path d="M4.5 8.5 12 3.75l7.5 4.75Z"/><path d="M6.5 11.5v5.5M10.25 11.5v5.5M13.75 11.5v5.5M17.5 11.5v5.5M3.5 20.5h17" stroke-width="2.25"/>`,
  },

  flag: {
    o: `<path d="M5.5 21V4.5M5.5 4.5c2.5-1.75 4.75-1.75 7 0s4.5 1.75 7 0V14c-2.5 1.75-4.5 1.75-7 0s-4.5-1.75-7 0"/>`,
    f: `<path d="M5.5 4.5c2.5-1.75 4.75-1.75 7 0s4.5 1.75 7 0V14c-2.5 1.75-4.5 1.75-7 0s-4.5-1.75-7 0Z"/><path d="M5.5 21V4.5"/>`,
  },

  parking: {
    o: `${FRAME}<path d="M9.5 17V7h3.25a3 3 0 0 1 0 6H9.5"/>`,
    f: FRAME,
    cut: `<path d="M9.5 17V7h3.25a3 3 0 0 1 0 6H9.5" stroke-width="2"/>`,
  },

  // Map sheet with folds lying on a second layer.
  'layers-map': {
    o: `<path d="M12 5l9 5-9 5-9-5Z"/><path d="M7.5 7.5l9 5M3 14.5l9 5 9-5"/>`,
    f: `<path d="M12 5l9 5-9 5-9-5Z"/><path fill="none" d="M3 14.5l9 5 9-5"/>`,
    cut: `<path d="M7.25 7.1l9.5 5.3" stroke-width="1.5"/>`,
  },
};
