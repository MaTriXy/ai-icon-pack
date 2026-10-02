import { FRAME, PAGE, PAGE_FOLD, PAGE_FOLD_CUT, LENS, LENS_HANDLE } from '../shapes.mjs';

const BARS = `<rect x="3.5" y="12" width="3.5" height="8" rx="1"/><rect x="10.25" y="7" width="3.5" height="13" rx="1"/><rect x="17" y="4" width="3.5" height="16" rx="1"/>`;

// ── Local helpers ─────────────────────────────────────────────────────────────
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

/** Pointy-top hexagon-like polygon with a radius per vertex (radar charts). */
const radial = (radii, r = 1) =>
  rp(radii.map((rad, i) => {
    const a = ((-90 + 60 * i) * Math.PI) / 180;
    return [12 + rad * Math.cos(a), 12 + rad * Math.sin(a)];
  }), r);

// Chart axes shared by line / area / scatter / bubble / forecast / anomaly.
const AXES = 'M3.5 3.5V18a2.5 2.5 0 0 0 2.5 2.5h14.5';

// Horizontal bars: same 3.5 thickness and rx 1 as chart-bar.
const HBAR = (x, y, w) => `<rect x="${x}" y="${y}" width="${w}" height="3.5" rx="1"/>`;

const STACK_SPLITS = 'M3.5 16H7M10.25 13.5h3.5M17 11h3.5';
const STACK_LOWER = '<path d="M3.5 16H7v3a1 1 0 0 1-1 1H4.5a1 1 0 0 1-1-1ZM10.25 13.5h3.5V19a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1ZM17 11h3.5v8a1 1 0 0 1-1 1H18a1 1 0 0 1-1-1Z" fill="currentColor" stroke="none"/>';

const AREA = 'M7.5 17v-3.5L11 9l3.5 3 5.5-6v11Z';
const PIE = 'M18 13.5A7.5 7.5 0 1 1 10.5 6v7.5Z';
const PIE_SLICE = 'M13.5 10.5V3A7.5 7.5 0 0 1 21 10.5Z';
const SCATTER = [[8, 16], [10.5, 11.5], [14, 14.5], [16, 8.5], [19, 5.5]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1" fill="currentColor"/>`).join('');
const BUBBLES = '<circle cx="9" cy="15.5" r="2"/><circle cx="15" cy="9" r="3.25"/><circle cx="18.5" cy="16" r="1.5"/>';
const CANDLES = '<rect x="3.5" y="8" width="3.5" height="7" rx="1"/><rect x="10.25" y="11" width="3.5" height="6" rx="1"/><rect x="17" y="5" width="3.5" height="7" rx="1"/>';
const WICKS = 'M5.25 4.5V8M5.25 15v3.5M12 7.5V11M12 17v3.5M18.75 3v2M18.75 12v4';
const RADAR = radial([8.5, 8.5, 8.5, 8.5, 8.5, 8.5], 1.25);
const RADAR_DATA = radial([5, 4, 3.5, 2.5, 4.75, 2.75], 0.75);
const HISTO = 'M3.25 20.5V15h3.5v-5h3.5V4.5h3.5v4h3.5V14h3.5v6.5Z';
const HISTO_SPLITS = 'M6.75 15v5.5M10.25 10v10.5M13.75 8.5v12M17.25 14v6.5';
const SANKEY = '<rect x="3.5" y="5.5" width="3" height="13" rx="1"/><path d="M6.5 6c7 0 7-2.5 14-2.5v4c-7 0-7 2.5-14 2.5ZM6.5 18c7 0 7 2.5 14 2.5v-4c-7 0-7-2.5-14-2.5Z"/>';
const TREEMAP_SPLITS = 'M11.5 3v18M11.5 11.5H21M16.25 11.5V21';
const GRID = 'M3 9h18M3 15h18M9 3v18M15 3v18';
const HOT_CELLS = [[9, 3], [9, 9], [15, 9], [3, 15]].map(([x, y]) => `<rect x="${x + 1.75}" y="${y + 1.75}" width="2.5" height="2.5" rx=".75" fill="currentColor" stroke="none"/>`).join('');
const COOL_HOLES = [[3, 3], [15, 3], [3, 9], [9, 15], [15, 15]].map(([x, y]) => `<rect x="${x + 1.75}" y="${y + 1.75}" width="2.5" height="2.5" rx=".75" fill="#000" stroke="none"/>`).join('');
const DASH = '<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>';
const GAUGE ='M4.64 18.25A8.5 8.5 0 1 1 19.36 18.25';
const PULSE_SMALL = 'M6.5 12.5h2l1.75-3.5 3.5 7 1.75-3.5h2';
const HILL = 'M3 20.5c2.5-3.5 5.5-5.5 9-5.5s6.5 2 9 5.5Z';
const GOAL_FLAG = 'M10.5 3.5H17l-1.5 2.75L17 9h-6.5Z';
const REPORT_BARS = 'M9 17.5v-3M12 17.5v-6M15 17.5v-4.5';
const PIVOT_GRID = '<rect x="3.5" y="10.5" width="10" height="10.5" rx="2"/>';
const PIVOT_LINES = 'M3.5 14h10M7 10.5V21';
const PIVOT_ARROW = 'M8 5.5h5.5a5 5 0 0 1 5 5V17M10 3.5l-2 2 2 2M16.5 15l2 2 2-2';
const SIGMA = 'M15.5 7.5h-7l4 4.5-4 4.5h7';
const CALC = '<rect x="4.5" y="2.75" width="15" height="18.5" rx="2.5"/>';
const CALC_SCREEN = '<rect x="7.5" y="5.75" width="9" height="3.5" rx="1"/>';
const CALC_KEYS = 'M8.5 13h.01M12 13h.01M15.5 13h.01M8.5 17h.01M12 17h.01M15.5 17h.01';
const RODS = 'M3 7.75h18M3 12h18M3 16.25h18';
const BEADS = [[7, 7.75], [10.25, 7.75], [12.5, 12], [15.75, 12], [7, 16.25], [10.25, 16.25], [13.5, 16.25]];
const TABLE_LINES = 'M3 9h18M9 3v18';
const TABLE_TREND = 'm12 17.5 2-2.75 2 1.5 2-3.75';
const FUNNEL = 'M4.5 3.5h15a1 1 0 0 1 .8 1.6L14 13v6a1 1 0 0 1-.55.9l-2 1A1 1 0 0 1 10 20V13L3.7 5.1a1 1 0 0 1 .8-1.6Z';
const BELL_CURVE = 'M3 19c3.5 0 5-14 9-14s5.5 14 9 14Z';
const PODIUM = 'M3 20v-8.5A1.5 1.5 0 0 1 4.5 10h4V6.5A1.5 1.5 0 0 1 10 5h4a1.5 1.5 0 0 1 1.5 1.5V13h4a1.5 1.5 0 0 1 1.5 1.5V20Z';
const PODIUM_CUT = 'M8.5 10v10M15.5 13v7';
const ONE = 'M11 9.25 12.25 8v6';

export default {
  'chart-bar': {
    o: BARS,
    f: BARS,
  },

  'chart-bar-horizontal': {
    o: HBAR(4, 3.5, 8) + HBAR(4, 10.25, 13) + HBAR(4, 17, 16),
    f: HBAR(4, 3.5, 8) + HBAR(4, 10.25, 13) + HBAR(4, 17, 16),
  },

  // Outline: lower segments solid. Filled: split lines knocked out.
  'chart-bar-stacked': {
    o: BARS + STACK_LOWER,
    f: BARS,
    cut: `<path d="${STACK_SPLITS}" stroke-width="1.5"/>`,
  },

  'chart-line': {
    o: `<path d="${AXES}"/><path d="m7.5 15 3.5-4.5 3.5 3 5.5-6.5"/>`,
    bold: true,
  },

  'chart-area': {
    o: `<path d="${AXES}"/><path d="${AREA}"/>`,
    f: `<path d="${AXES}" fill="none"/><path d="${AREA}"/>`,
  },

  // Pie with one slice pulled out.
  'chart-pie': {
    o: `<path d="${PIE}"/><path d="${PIE_SLICE}"/>`,
    f: `<path d="${PIE}"/><path d="${PIE_SLICE}"/>`,
  },

  'chart-donut': {
    o: `<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4"/><path d="M12 3.5V8M16 12h4.5"/>`,
    f: `<circle cx="12" cy="12" r="8.5"/>`,
    cut: `<circle cx="12" cy="12" r="4" fill="#000"/><path d="M12 3.5V8M16 12h4.5" stroke-width="1.5"/>`,
  },

  'chart-scatter': {
    o: `<path d="${AXES}"/>${SCATTER}`,
    bold: true,
  },

  'chart-bubble': {
    o: `<path d="${AXES}"/>${BUBBLES}`,
    f: `<path d="${AXES}" fill="none"/>${BUBBLES}`,
  },

  'chart-candlestick': {
    o: `${CANDLES}<path d="${WICKS}"/>`,
    f: `${CANDLES}<path d="${WICKS}"/>`,
  },

  'chart-radar': {
    o: `<path d="${RADAR}"/><path d="${RADAR_DATA}" fill="currentColor"/>`,
    f: `<path d="${RADAR}"/>`,
    cut: `<path d="${RADAR_DATA}" stroke-width="1.5"/>`,
  },

  'chart-funnel': {
    o: HBAR(3.5, 3.75, 17) + HBAR(6.5, 10.25, 11) + HBAR(9.5, 16.75, 5),
    f: HBAR(3.5, 3.75, 17) + HBAR(6.5, 10.25, 11) + HBAR(9.5, 16.75, 5),
  },

  'chart-histogram': {
    o: `<path d="${HISTO}"/><path d="${HISTO_SPLITS}"/>`,
    f: `<path d="${HISTO}"/>`,
    cut: `<path d="${HISTO_SPLITS}" stroke-width="1.5"/>`,
  },

  'chart-gantt': {
    o: HBAR(3.5, 3.75, 9) + HBAR(8, 10.25, 9) + HBAR(13, 16.75, 7.5),
    f: HBAR(3.5, 3.75, 9) + HBAR(8, 10.25, 9) + HBAR(13, 16.75, 7.5),
  },

  // A source node with two bands flowing out.
  'chart-sankey': {
    o: SANKEY,
    f: SANKEY,
    cut: `<path d="M7 4.5v15" stroke-width="1.5"/>`,
  },

  'chart-treemap': {
    o: `${FRAME}<path d="${TREEMAP_SPLITS}"/>`,
    f: FRAME,
    cut: `<path d="${TREEMAP_SPLITS}" stroke-width="1.5"/>`,
  },

  // Grid with hot cells solid; filled style punches the cool cells.
  heatmap: {
    o: `${FRAME}<path d="${GRID}"/>${HOT_CELLS}`,
    f: FRAME,
    cut: `<path d="${GRID}" stroke-width="1.5"/>${COOL_HOLES}`,
  },

  'trending-up': {
    o: `<path d="M3.5 16.5 9 11l4 4 7.5-7.5M14.5 7.5h6v6"/>`,
    bold: true,
  },

  'trending-down': {
    o: `<path d="M3.5 7.5 9 13l4-4 7.5 7.5M14.5 16.5h6v-6"/>`,
    bold: true,
  },

  'trending-flat': {
    o: `<path d="M3.5 15 8 10.5l4.5 3.5 3.5-2h4.5M16.5 8l4 4-4 4"/>`,
    bold: true,
  },

  // Magnifier over a small bar chart.
  analytics: {
    o: `${LENS}<path d="${LENS_HANDLE}"/><path d="M8 13.5v-2M11 13.5V8M14 13.5V10"/>`,
    f: `${LENS}<path d="${LENS_HANDLE}"/>`,
    cut: `<path d="M8 13.5v-2M11 13.5V8M14 13.5V10"/>`,
  },

  dashboard: {
    o: DASH,
    f: DASH,
  },

  gauge: {
    o: `<path d="${GAUGE}"/><path d="m12 14 3.5-3.5"/>`,
    f: `<path d="${GAUGE}Z"/>`,
    cut: `<path d="m12 14 3.5-3.5"/>`,
  },

  // Up arrow next to a big "2".
  kpi: {
    o: `<path d="M6.5 20V4.5M3.5 7.5l3-3 3 3M12.75 7.75a3.75 3.75 0 0 1 7.5 0c0 3-3.25 5.25-7.5 12.25h7.5"/>`,
    bold: true,
  },

  // Pulse inside a metric card.
  metrics: {
    o: `${FRAME}<path d="${PULSE_SMALL}"/>`,
    f: FRAME,
    cut: `<path d="${PULSE_SMALL}"/>`,
  },

  activity: {
    o: `<path d="M3.5 12h3L9 5l5 14 2.5-7h4"/>`,
    bold: true,
  },

  target: {
    o: `<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>`,
    f: `<circle cx="12" cy="12" r="8.5"/>`,
    cut: `<circle cx="12" cy="12" r="5.25" stroke-width="1.5"/><circle cx="12" cy="12" r="2.25" stroke-width="1.5"/>`,
  },

  goal: {
    o: `<path d="${HILL}"/><path d="M10.5 15V3.5"/><path d="${GOAL_FLAG}"/>`,
    f: `<path d="${HILL}"/><path d="M10.5 15V3.5" fill="none"/><path d="${GOAL_FLAG}"/>`,
  },

  'report-chart': {
    o: `<path d="${PAGE}"/><path d="${PAGE_FOLD}"/><path d="${REPORT_BARS}"/>`,
    f: `<path d="${PAGE}"/>`,
    cut: `<path d="${PAGE_FOLD_CUT}" stroke-width="1.5"/><path d="${REPORT_BARS}"/>`,
  },

  // Table with a turn-around arrow.
  pivot: {
    o: `${PIVOT_GRID}<path d="${PIVOT_LINES}"/><path d="${PIVOT_ARROW}"/>`,
    f: `${PIVOT_GRID}<path d="${PIVOT_ARROW}" fill="none"/>`,
    cut: `<path d="${PIVOT_LINES}" stroke-width="1.5"/>`,
  },

  sum: {
    o: `${FRAME}<path d="${SIGMA}"/>`,
    f: FRAME,
    cut: `<path d="${SIGMA}"/>`,
  },

  calculator: {
    o: `${CALC}${CALC_SCREEN}<path d="${CALC_KEYS}"/>`,
    f: CALC,
    cut: `<rect x="7.5" y="5.75" width="9" height="3.5" rx="1" fill="#000" stroke-width="1.25"/><path d="${CALC_KEYS}" stroke-width="2"/>`,
  },

  abacus: {
    o: `${FRAME}<path d="${RODS}"/>${BEADS.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.5" fill="currentColor" stroke="none"/>`).join('')}`,
    f: FRAME,
    cut: `<path d="${RODS}" stroke-width="1.25"/>${BEADS.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.5" fill="#000" stroke="none"/>`).join('')}`,
  },

  'table-chart': {
    o: `${FRAME}<path d="${TABLE_LINES}"/><path d="${TABLE_TREND}"/>`,
    f: FRAME,
    cut: `<path d="${TABLE_LINES}" stroke-width="1.5"/><path d="${TABLE_TREND}"/>`,
  },

  spreadsheet: {
    o: `${FRAME}<path d="${GRID}"/>`,
    f: FRAME,
    cut: `<path d="${GRID}" stroke-width="1.5"/>`,
  },

  'filter-funnel': {
    o: `<path d="${FUNNEL}"/>`,
    f: `<path d="${FUNNEL}"/>`,
  },

  // Solid history, dashed projection.
  forecast: {
    o: `<path d="${AXES}"/><path d="m7.5 16.5 3-4 3 2"/><path d="M13.5 14.5 20.5 7" stroke-dasharray="0 3.4"/>`,
    bold: true,
  },

  // Line chart with a marked spike.
  anomaly: {
    o: `<path d="${AXES}"/><path d="m7.5 15.5 2.5-2 2 1.5 2-7 2 5.5 4-1.5"/><circle cx="14" cy="8" r="1.5" fill="currentColor"/>`,
    bold: true,
  },

  // Two data points linked by a trend.
  correlation: {
    o: `<path d="${AXES}"/><circle cx="9.5" cy="14.5" r="2.5"/><circle cx="17.5" cy="6.5" r="2.5"/><path d="m11.25 12.75 4.5-4.5"/>`,
    f: `<path d="${AXES}M11.25 12.75l4.5-4.5" fill="none"/><circle cx="9.5" cy="14.5" r="2.5"/><circle cx="17.5" cy="6.5" r="2.5"/>`,
  },

  // Bell curve.
  distribution: {
    o: `<path d="${BELL_CURVE}"/>`,
    f: `<path d="${BELL_CURVE}"/>`,
  },

  'percent-circle': {
    o: `<circle cx="12" cy="12" r="8.5"/><path d="m15.5 8.5-7 7"/><circle cx="9" cy="9" r="1.25" fill="currentColor"/><circle cx="15" cy="15" r="1.25" fill="currentColor"/>`,
    f: `<circle cx="12" cy="12" r="8.5"/>`,
    cut: `<path d="m15.5 8.5-7 7"/><circle cx="9" cy="9" r="1.25" fill="#000"/><circle cx="15" cy="15" r="1.25" fill="#000"/>`,
  },

  // Podium with the winner's "1".
  ranking: {
    o: `<path d="${PODIUM}"/><path d="${PODIUM_CUT}"/><path d="${ONE}"/>`,
    f: `<path d="${PODIUM}"/>`,
    cut: `<path d="${PODIUM_CUT}" stroke-width="1.5"/><path d="${ONE}"/>`,
  },
};
