import { FRAME, SLASH, SLASH_CLEAR } from '../shapes.mjs';

// Text & formatting: pure glyphs, no sparks. Letters are stroked letterforms, never <text>.

const T = 'M4.5 7.5V5.5a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1v2M12 4.5v15M9 19.5h6';
const H = (x1, x2, y1, y2) => `M${x1} ${y1}V${y2}M${x2} ${y1}V${y2}M${x1} ${(y1 + y2) / 2}H${x2}`;
const H_SMALL = H(3.5, 11.5, 5.5, 18.5); // H beside a digit (heading-1/2/3)

// Small "2" (5 wide, 7.5 tall) with its top-left at (x, y).
const two = (x, y) => `M${x} ${y + 2.25}a2.5 2.5 0 0 1 5 .25c0 2.25-5 3-5 5h5`;
const X_GLYPH = (y) => `M3.5 ${y}l8.5 8.5M12 ${y}l-8.5 8.5`;

const CODE_LINES = 'M7 8h6M9.5 12h7.5M7 16h4';
const TABLE_LINES = 'M3 9h18M3 15h18M12 3v18';
const WC_TWO = 'M9.25 5.5a2.1 2.1 0 0 1 4 .5c0 1.75-4 2.5-4 4.5h4.25';
const WC_THREE = 'M16.25 4.75A2 2 0 0 1 20 5.5c0 1-.9 1.75-2 1.75 1.25 0 2.25.75 2.25 1.75a2 2 0 0 1-4 .75';

const A_TEXT ='M6.75 15 12 3.25 17.25 15M8.55 11h6.9';

export default {
  type: { o: `<path d="${T}"/>`, bold: true },
  heading: { o: `<path d="${H(6, 18, 4.5, 19.5)}"/>`, bold: true },
  'heading-1': { o: `<path d="${H_SMALL}"/><path d="M16 10.5l3-2v10"/>`, bold: true },
  'heading-2': { o: `<path d="${H_SMALL}"/><path d="M15.5 11.25a2.75 2.75 0 0 1 5.25-.25c.5 2.75-5.25 4.75-5.25 7.5h5.25"/>`, bold: true },
  'heading-3': {
    o: `<path d="${H_SMALL}"/><path d="M15.75 9.5a2.6 2.6 0 0 1 4.75 1.25c0 1.5-1.25 2.5-2.75 2.5 1.75 0 3 1 3 2.6a2.75 2.75 0 0 1-5.25 1.15"/>`,
    bold: true,
  },

  bold: {
    o: `<path d="M6.5 4.5h6.25a3.75 3.75 0 0 1 0 7.5H6.5ZM6.5 12h7.25a3.75 3.75 0 0 1 0 7.5H6.5Z"/>`,
    bold: true,
  },
  italic: { o: `<path d="M10 4.5h8M6 19.5h8M15 4.5 9 19.5"/>`, bold: true },
  underline: { o: `<path d="M6.5 4v6.5a5.5 5.5 0 0 0 11 0V4"/><path d="M5 20.5h14"/>`, bold: true },
  strikethrough: {
    o: `<path d="M16.5 4.5H9.5a3 3 0 0 0-2.6 4.5"/><path d="M14.25 12a3.75 3.75 0 0 1 0 7.5H6.5"/><path d="M4 12h16"/>`,
    bold: true,
  },
  subscript: { o: `<path d="${X_GLYPH(5)}"/><path d="${two(15.5, 13)}"/>`, bold: true },
  superscript: { o: `<path d="${X_GLYPH(10.5)}"/><path d="${two(15.5, 3.5)}"/>`, bold: true },

  highlight: {
    o: `<g transform="translate(1.25 -.25)"><g transform="rotate(45 12 10)"><rect x="9" y="3.5" width="6" height="9" rx="1.5"/><path d="M10 12.5V16l4 1.5v-5"/></g><path d="M3.5 20.75h8"/></g>`,
    f: `<g transform="translate(1.25 -.25)"><g transform="rotate(45 12 10)"><rect x="9" y="3.5" width="6" height="9" rx="1.5"/><path d="M10 12.5V16l4 1.5v-5Z"/></g><path d="M3.5 20.75h8"/></g>`,
    cut: `<path transform="translate(1.25 -.25) rotate(45 12 10)" d="M8 12.5h8" stroke-width="1.5"/>`,
  },

  'text-color': {
    o: `<path d="${A_TEXT}"/><rect x="4" y="18.5" width="16" height="2.25" rx="1" fill="currentColor"/>`,
    bold: true,
  },
  'font-size': {
    o: `<path d="M3 18.75 7.75 5.25l4.75 13.5M4.6 14.25h6.3"/><path d="M15.5 18.75l2.75-7 2.75 7M16.5 16.25h3.5"/>`,
    bold: true,
  },
  font: {
    o: `<path d="M3.25 18.5 8 5l4.75 13.5M4.85 14h6.3"/><circle cx="17" cy="15.25" r="3.25"/><path d="M20.25 12v6.5"/>`,
    bold: true,
  },

  'list-bullet': {
    o: `<path d="M4.5 6h.01M4.5 12h.01M4.5 18h.01" stroke-width="2.75"/><path d="M9 6h11.5M9 12h11.5M9 18h11.5"/>`,
    bold: true,
  },
  'list-numbered': {
    o: `<path d="M4 5.25 5.5 4v5"/><path d="M3.75 15.5a1.6 1.6 0 0 1 3.1.4c0 1.5-3.1 1.75-3.1 3.6h3.25"/><path d="M10.5 6.5h10M10.5 12h10M10.5 17.5h10"/>`,
    bold: true,
  },
  'list-check': {
    o: `<path d="m3.5 6.5 1.75 1.75L8.75 4.75M3.5 16.5l1.75 1.75 3.5-3.5"/><path d="M12.5 6.5h8M12.5 12h8M12.5 17.5h8"/>`,
    bold: true,
  },
  'list-tree': {
    o: `<path d="M8 5.5h12.5M13 12h7.5M13 18.5h7.5"/><path d="M4 5.5V10a2 2 0 0 0 2 2h3.5M4 10v6.5a2 2 0 0 0 2 2h3.5"/>`,
    bold: true,
  },

  indent: { o: `<path d="M3 4.5h18M11 9.5h10M11 14.5h10M3 19.5h18"/><path d="m3.5 9 3 3-3 3"/>`, bold: true },
  outdent: { o: `<path d="M3 4.5h18M11 9.5h10M11 14.5h10M3 19.5h18"/><path d="m6.5 9-3 3 3 3"/>`, bold: true },
  'line-height': {
    o: `<path d="M5.5 4v16M3 6.5 5.5 4 8 6.5M3 17.5 5.5 20 8 17.5"/><path d="M11.5 6h9M11.5 12h9M11.5 18h9"/>`,
    bold: true,
  },
  'letter-spacing': {
    o: `<path d="M7.5 13.5 12 3.5l4.5 10M9.1 10h5.8"/><path d="M4 18.5h16M6.25 16.25 4 18.5l2.25 2.25M17.75 16.25 20 18.5l-2.25 2.25"/>`,
    bold: true,
  },

  paragraph: {
    o: `<path d="M13 4.5v15M17 4.5v15M19 4.5H9.5a4.25 4.25 0 0 0 0 8.5H13"/>`,
    f: `<path d="M13 4.5H9.5a4.25 4.25 0 0 0 0 8.5H13Z"/><path d="M13 4.5v15M17 4.5v15M19 4.5h-6"/>`,
  },

  'quote-block': { o: `<path d="M4 5v14"/><path d="M8.5 6.5h12M8.5 12h12M8.5 17.5h8"/>`, bold: true },

  'code-inline': {
    o: `<rect x="3" y="6" width="18" height="12" rx="3.5"/><path d="M10 9.5 7.5 12l2.5 2.5M14 9.5l2.5 2.5-2.5 2.5"/>`,
    f: `<rect x="3" y="6" width="18" height="12" rx="3.5"/>`,
    cut: `<path d="M10 9.5 7.5 12l2.5 2.5M14 9.5l2.5 2.5-2.5 2.5"/>`,
  },
  'code-block': {
    o: `${FRAME}<path d="${CODE_LINES}"/>`,
    f: FRAME,
    cut: `<path d="${CODE_LINES}"/>`,
  },

  divider: { o: `<path d="M3 12h18M8.5 7.5 12 4l3.5 3.5M15.5 16.5 12 20l-3.5-3.5"/>`, bold: true },

  table: {
    o: `${FRAME}<path d="${TABLE_LINES}"/>`,
    f: FRAME,
    cut: `<path d="${TABLE_LINES}" stroke-width="1.5"/>`,
  },
  'table-add-row': {
    o: `<rect x="3" y="3" width="18" height="10.5" rx="2.5"/><path d="M3 8.25h18M12 3v10.5"/><path d="M12 16.5V21M9.75 18.75h4.5"/>`,
    f: `<rect x="3" y="3" width="18" height="10.5" rx="2.5"/><path d="M12 16.5V21M9.75 18.75h4.5"/>`,
    cut: `<path d="M3 8.25h18M12 3v10.5" stroke-width="1.5"/>`,
  },
  'table-add-column': {
    o: `<rect x="3" y="3" width="10.5" height="18" rx="2.5"/><path d="M8.25 3v18M3 12h10.5"/><path d="M16.5 12H21M18.75 9.75v4.5"/>`,
    f: `<rect x="3" y="3" width="10.5" height="18" rx="2.5"/><path d="M16.5 12H21M18.75 9.75v4.5"/>`,
    cut: `<path d="M8.25 3v18M3 12h10.5" stroke-width="1.5"/>`,
  },
  columns: { o: `<path d="M3 5h7M3 9.5h7M3 14h7M3 18.5h5M14 5h7M14 9.5h7M14 14h7M14 18.5h5"/>`, bold: true },

  'text-wrap': {
    o: `<path d="M3 4.75h18M3 11.25h14.5a3.25 3.25 0 0 1 0 6.5h-4M3 17.75h6.5"/><path d="M15.75 15.5 13.5 17.75 15.75 20"/>`,
    bold: true,
  },
  'text-cursor': {
    o: `<path d="M16 21h-.5a3.5 3.5 0 0 1-3.5-3.5v-11A3.5 3.5 0 0 1 15.5 3h.5M8 21h.5a3.5 3.5 0 0 0 3.5-3.5M8 3h.5A3.5 3.5 0 0 1 12 6.5"/>`,
    bold: true,
  },
  'spell-check': {
    o: `<path d="M4 14.5 9 3.5l5 11M5.6 11h6.8"/><path d="m13 18 2.5 2.5 5-5"/>`,
    bold: true,
  },
  'word-count': {
    o: `<path d="M3.5 5 5.5 3.5v7"/><path d="${WC_TWO}"/><path d="${WC_THREE}"/><path d="M3.5 15h17M3.5 19.5h11"/>`,
    bold: true,
  },
  'clear-formatting': {
    o: `<path d="${T}"/>`,
    ocut: SLASH_CLEAR,
    otop: SLASH,
    bold: true,
  },
  'link-text': {
    o: `<path d="M9.5 12.5h-2a4 4 0 0 1 0-8h2M14.5 4.5h2a4 4 0 0 1 0 8h-2M9 8.5h6"/><path d="M4 18.5h16"/>`,
    bold: true,
  },
  footnote: {
    o: `<path d="M3 5.5h12M3 11h18M3 16h6M3 20h11"/><path d="M18 4.5 19.5 3.5v5"/>`,
    bold: true,
  },
  'emoji-text': {
    o: `<circle cx="8.25" cy="12" r="5.25"/><path d="M6.5 10.5h.01M10 10.5h.01" stroke-width="2"/><path d="M6.25 13.75a2.75 2.75 0 0 0 4 0"/><path d="M16.5 9.5h4.5M16.5 14.5h4.5"/>`,
    f: `<circle cx="8.25" cy="12" r="5.25"/><path d="M16.5 9.5h4.5M16.5 14.5h4.5"/>`,
    cut: `<path d="M6.5 10.5h.01M10 10.5h.01" stroke-width="2"/><path d="M6.25 13.75a2.75 2.75 0 0 0 4 0" stroke-width="1.5"/>`,
  },

  math: { o: `<path d="M3 13h2.5l3 6.5L13 4.5h8"/><path d="M14.5 9.5l5 5M19.5 9.5l-5 5"/>`, bold: true },
  sigma: { o: `<path d="M17.5 7V5.5a1 1 0 0 0-1-1h-10L12 12l-5.5 7.5h10a1 1 0 0 0 1-1V17"/>`, bold: true },
  function: { o: `<path d="M16.5 4.5H15a3 3 0 0 0-3 3v9a3 3 0 0 1-3 3H7.5M8.5 10.5h7"/>`, bold: true },
  pi: { o: `<path d="M4 7.5c1-1.5 2.5-2 4.5-2H20M9.5 5.5c0 5-.5 9.5-2.5 13.5M15.5 5.5V16a2.5 2.5 0 0 0 2.5 2.5h.5"/>`, bold: true },
  infinity: { o: `<path d="M7 16c4.5 0 5.5-8 10-8a4 4 0 0 1 0 8c-4.5 0-5.5-8-10-8a4 4 0 1 0 0 8"/>`, bold: true },
  percent: { o: `<path d="M19 5 5 19"/><circle cx="7" cy="7" r="2.25"/><circle cx="17" cy="17" r="2.25"/>`, bold: true },
  equal: { o: `<path d="M5 9h14M5 15h14"/>`, bold: true },
  'not-equal': { o: `<path d="M5 9h14M5 15h14M16.5 4.5l-9 15"/>`, bold: true },
  divide: { o: `<path d="M5 12h14"/><path d="M12 6.5h.01M12 17.5h.01" stroke-width="2.75"/>`, bold: true },
  multiply: { o: `<path d="M7 7l10 10M17 7 7 17"/>`, bold: true },
};
