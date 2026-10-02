import { star, HOUSE, FRAME } from '../shapes.mjs';

// ── Arrow family ──────────────────────────────────────────────────────────────
// Single arrows: 15-unit shaft, 90° head with 6-unit legs (same as chevrons).
// Compound arrows (two or more heads, arrows inside a frame): 4-unit legs.
const line = (d) => ({ o: `<path d="${d}"/>`, bold: true });
const CARET = (d) => ({ o: `<path d="${d}"/>`, f: `<path d="${d}"/>` });
const CIRCLE = '<circle cx="12" cy="12" r="9"/>';
// Arrow inside a circle: filled style knocks the arrow out of a solid disc.
const inCircle = (d) => ({ o: `${CIRCLE}<path d="${d}"/>`, f: CIRCLE, cut: `<path d="${d}" stroke-width="2"/>` });
// Solid dots (menu, breadcrumb). Same size as the chat typing dots.
const dots = (...pts) => pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1" fill="currentColor"/>`).join('');

const BACK = 'M11.5 4.5 4 12l7.5 7.5v-4h7a1.5 1.5 0 0 0 1.5-1.5v-4A1.5 1.5 0 0 0 18.5 8.5h-7Z';
const NEEDLE = 'M15.5 8.5 13.5 13.5 8.5 15.5 10.5 10.5Z';
const POINTER = 'M3.5 10.5 20.5 3.5 13.5 20.5 11 13Z';
const SIGN = 'M6 6h11.5l3 4-3 4H6a1.5 1.5 0 0 1-1.5-1.5v-5A1.5 1.5 0 0 1 6 6Z';

// Window with a side panel + chevron. Filled style: frame stays a line, panel is solid.
const SIDE_LEFT = 'M9 3H5.5A2.5 2.5 0 0 0 3 5.5v13A2.5 2.5 0 0 0 5.5 21H9Z';
const SIDE_RIGHT = 'M15 3h3.5A2.5 2.5 0 0 1 21 5.5v13a2.5 2.5 0 0 1-2.5 2.5H15Z';
const SIDE_BOTTOM = 'M3 15v3.5A2.5 2.5 0 0 0 5.5 21h13a2.5 2.5 0 0 0 2.5-2.5V15Z';
const panel = (side, divider, chev) => ({
  o: `${FRAME}<path d="${divider}"/><path d="${chev}"/>`,
  f: `<g fill="none">${FRAME}<path d="${chev}"/></g><path d="${side}"/>`,
});

export default {
  // Accent spark replaces the door.
  home: {
    o: `<path d="${HOUSE}"/><path d="${star(12, 15, 3)}"/>`,
    f: `<path d="${HOUSE}"/>`,
    cut: `<path d="${star(12, 15, 3.25)}" fill="#000" stroke-width="1"/>`,
  },

  'arrow-up': line('M12 19.5v-15M6 10.5l6-6 6 6'),
  'arrow-down': line('M12 4.5v15M6 13.5l6 6 6-6'),
  'arrow-left': line('M19.5 12h-15M10.5 6l-6 6 6 6'),
  'arrow-right': line('M4.5 12h15M13.5 6l6 6-6 6'),
  'arrow-up-right': line('M6 18 18 6M9.5 6H18v8.5'),
  'arrow-up-left': line('M18 18 6 6M14.5 6H6v8.5'),
  'arrow-down-right': line('M6 6l12 12M18 9.5V18H9.5'),
  'arrow-down-left': line('M18 6 6 18M6 9.5V18h8.5'),

  'chevron-up': line('M6 15l6-6 6 6'),
  'chevron-down': line('M6 9l6 6 6-6'),
  'chevron-left': line('M15 6l-6 6 6 6'),
  'chevron-right': line('M9 6l6 6-6 6'),
  'chevrons-up': line('M6 12l6-6 6 6M6 18l6-6 6 6'),
  'chevrons-down': line('M6 6l6 6 6-6M6 12l6 6 6-6'),
  'chevrons-left': line('M12 6l-6 6 6 6M18 6l-6 6 6 6'),
  'chevrons-right': line('M6 6l6 6-6 6M12 6l6 6-6 6'),
  'chevrons-up-down': line('M7 9.5l5-5 5 5M7 14.5l5 5 5-5'),

  'caret-up': CARET('M6 15h12l-6-6Z'),
  'caret-down': CARET('M6 9h12l-6 6Z'),
  'caret-left': CARET('M15 6v12l-6-6Z'),
  'caret-right': CARET('M9 6v12l6-6Z'),

  'arrow-circle-up': inCircle('M12 16.5v-9M8 11.5l4-4 4 4'),
  'arrow-circle-down': inCircle('M12 7.5v9M8 12.5l4 4 4-4'),
  'arrow-circle-left': inCircle('M16.5 12h-9M11.5 8l-4 4 4 4'),
  'arrow-circle-right': inCircle('M7.5 12h9M12.5 8l4 4-4 4'),

  'arrow-up-down': line('M12 3.5v17M7 8.5l5-5 5 5M7 15.5l5 5 5-5'),
  'arrow-left-right': line('M3.5 12h17M8.5 7l-5 5 5 5M15.5 7l5 5-5 5'),
  swap: line('M4 7.5h15.5M15.5 3.5l4 4-4 4M20 16.5H4.5M8.5 12.5l-4 4 4 4'),
  'swap-vertical': line('M7.5 20V4.5M3.5 8.5l4-4 4 4M16.5 4v15.5M12.5 15.5l4 4 4-4'),

  undo: line('M4 8.5h10.5a5.5 5.5 0 0 1 0 11H10M8 4.5l-4 4 4 4'),
  redo: line('M20 8.5H9.5a5.5 5.5 0 0 0 0 11H14M16 4.5l4 4-4 4'),
  // Same arc and head as `regenerate` (01-ai-core), without the spark.
  refresh: line('M4 12a8 8 0 0 1 13.4-5.9L20 8.5M20 4v4.5h-4.5M20 12a8 8 0 0 1-13.4 5.9L4 15.5M4 20v-4.5h4.5'),
  'rotate-cw': line('M20 12a8 8 0 1 1-2.6-5.9L20 8.5M20 4v4.5h-4.5'),
  'rotate-ccw': line('M4 12a8 8 0 1 0 2.6-5.9L4 8.5M4 4v4.5h4.5'),
  repeat: line('M4 12v-1a4 4 0 0 1 4-4h12M16 3l4 4-4 4M20 12v1a4 4 0 0 1-4 4H4M8 13l-4 4 4 4'),
  shuffle: line(
    'M3.5 17.5H5c1.3 0 2.5-.6 3.3-1.7l5.5-7.6c.8-1.1 2-1.7 3.3-1.7h3.4M3.5 6.5H5c1.3 0 2.5.6 3.3 1.7l.8 1.1' +
      'M13 14.7l.8 1.1c.8 1.1 2 1.7 3.3 1.7h3.4M17 3l3.5 3.5L17 10M17 14l3.5 3.5L17 21',
  ),

  'corner-up-left': line('M19.5 19.5v-6A4.5 4.5 0 0 0 15 9H4M8 5 4 9l4 4'),
  'corner-up-right': line('M4.5 19.5v-6A4.5 4.5 0 0 1 9 9h11M16 5l4 4-4 4'),
  'corner-down-left': line('M19.5 4.5v6A4.5 4.5 0 0 1 15 15H4M8 11l-4 4 4 4'),
  'corner-down-right': line('M4.5 4.5v6A4.5 4.5 0 0 0 9 15h11M16 11l4 4-4 4'),

  // Four heads need shorter legs (3) so neighbouring heads keep their clearance.
  move: line('M12 3v18M3 12h18M9 6l3-3 3 3M9 18l3 3 3-3M6 9l-3 3 3 3M18 9l3 3-3 3'),
  expand: line('M14 10l6-6M14.5 4H20v5.5M10 14l-6 6M4 14.5V20h5.5'),
  collapse: line('M20 4l-6.5 6.5M13.5 5v5.5H19M4 20l6.5-6.5M5 13.5h5.5V19'),
  maximize: line(
    'M3.5 9V6A2.5 2.5 0 0 1 6 3.5h3M15 3.5h3A2.5 2.5 0 0 1 20.5 6v3M20.5 15v3a2.5 2.5 0 0 1-2.5 2.5h-3M9 20.5H6A2.5 2.5 0 0 1 3.5 18v-3',
  ),
  minimize: line(
    'M9 3.5v3A2.5 2.5 0 0 1 6.5 9h-3M15 3.5v3A2.5 2.5 0 0 0 17.5 9h3M20.5 15h-3a2.5 2.5 0 0 0-2.5 2.5v3M3.5 15h3A2.5 2.5 0 0 1 9 17.5v3',
  ),
  'external-link': line('M10.5 4.5h-4A2.5 2.5 0 0 0 4 7v10.5A2.5 2.5 0 0 0 6.5 20H17a2.5 2.5 0 0 0 2.5-2.5v-4M11 13l9-9M14.5 4H20v5.5'),
  // Block arrow: a "go back" button, distinct from arrow-left / undo.
  back: {
    o: `<path d="${BACK}"/>`,
    f: `<path d="${BACK}"/>`,
  },

  menu: line('M4 6.5h16M4 12h16M4 17.5h16'),
  'menu-dots': { o: dots([5, 12], [12, 12], [19, 12]), bold: true },
  'menu-dots-vertical': { o: dots([12, 5], [12, 12], [12, 19]), bold: true },
  'grid-menu': {
    o: dots([5, 5], [12, 5], [19, 5], [5, 12], [12, 12], [19, 12], [5, 19], [12, 19], [19, 19]),
    bold: true,
  },

  // Panels follow layout-sidebar-left (13-layout): filled style fills the panel.
  'sidebar-open': panel(SIDE_LEFT, 'M9 3v18', 'M13.5 9l3 3-3 3'),
  'sidebar-close': panel(SIDE_LEFT, 'M9 3v18', 'M16.5 9l-3 3 3 3'),
  'panel-right-open': panel(SIDE_RIGHT, 'M15 3v18', 'M10.5 9l-3 3 3 3'),
  'panel-right-close': panel(SIDE_RIGHT, 'M15 3v18', 'M7.5 9l3 3-3 3'),
  'panel-bottom-open': panel(SIDE_BOTTOM, 'M3 15h18', 'M9 10.5l3-3 3 3'),

  breadcrumb: {
    o: `${dots([4.75, 12], [19.25, 12])}<path d="M9.75 7.5l4.5 4.5-4.5 4.5"/>`,
    bold: true,
  },
  compass: {
    o: `${CIRCLE}<path d="${NEEDLE}"/>`,
    f: CIRCLE,
    cut: `<path d="${NEEDLE}" fill="#000"/>`,
  },
  navigation: {
    o: `<path d="${POINTER}"/>`,
    f: `<path d="${POINTER}"/>`,
  },
  'sign-post': {
    o: `<path d="${SIGN}"/><path d="M12 3v3M12 14v7"/>`,
    f: `<path d="${SIGN}"/>`,
    top: `<path d="M12 3v3M12 14v7"/>`,
  },
  'log-in': line('M14.5 3.5H18A2.5 2.5 0 0 1 20.5 6v12a2.5 2.5 0 0 1-2.5 2.5h-3.5M3.5 12h11M10.5 8l4 4-4 4'),
  'log-out': line('M9.5 3.5H6A2.5 2.5 0 0 0 3.5 6v12A2.5 2.5 0 0 0 6 20.5h3.5M9.5 12h11M16.5 8l4 4-4 4'),
  'first-page': line('M7 6v12M17 6l-6 6 6 6'),
  'last-page': line('M17 6v12M7 6l6 6-6 6'),
  'scroll-to-top': line('M5 4h14M12 20.5V8M6 14l6-6 6 6'),
  'scroll-to-bottom': line('M5 20h14M12 3.5V16M6 10l6 6 6-6'),
};
