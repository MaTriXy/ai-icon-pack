import { star, CLOUD, BADGE, BADGE_CLEAR, SLASH, SLASH_CLEAR } from '../shapes.mjs';

const UP_ARROW = 'M12 21v-8.5M8.5 16l3.5-3.5 3.5 3.5';

// ── local geometry helpers ───────────────────────────────────────────────────
const n = (v) => +v.toFixed(2);
const pt = (cx, cy, r, deg) => [n(cx + r * Math.cos((deg * Math.PI) / 180)), n(cy + r * Math.sin((deg * Math.PI) / 180))];
/** Clockwise arc (screen coords) from angle a0 to a1 (degrees), optional arrowhead at a1. */
function arcArrow(cx, cy, r, a0, a1, head = 0) {
  const [x0, y0] = pt(cx, cy, r, a0);
  const [x1, y1] = pt(cx, cy, r, a1);
  const large = a1 - a0 > 180 ? 1 : 0;
  let d = `M${x0} ${y0}A${r} ${r} 0 ${large} 1 ${x1} ${y1}`;
  if (head) {
    const t = ((a1 + 90) * Math.PI) / 180; // tangent direction of travel
    const back = (s) => [n(x1 - head * Math.cos(t + s)), n(y1 - head * Math.sin(t + s))];
    const [ax, ay] = back(Math.PI / 4);
    const [bx, by] = back(-Math.PI / 4);
    d += `M${ax} ${ay}L${x1} ${y1}L${bx} ${by}`;
  }
  return d;
}
/** Symmetric pair of arcs around (cx,cy) facing left and right, half-angle `h` degrees. */
function waves(cx, cy, r, h) {
  const [lx1, ly1] = pt(cx, cy, r, 180 + h);
  const [lx2, ly2] = pt(cx, cy, r, 180 - h);
  const [rx1, ry1] = pt(cx, cy, r, -h);
  const [rx2, ry2] = pt(cx, cy, r, h);
  return `M${lx1} ${ly1}A${r} ${r} 0 0 0 ${lx2} ${ly2}M${rx1} ${ry1}A${r} ${r} 0 0 1 ${rx2} ${ry2}`;
}
/** Wi-Fi arc centred on (cx,cy) opening upward, half-angle 45°. */
function wifiArc(cx, cy, r) {
  const [x1, y1] = pt(cx, cy, r, -135);
  const [x2, y2] = pt(cx, cy, r, -45);
  return `M${x1} ${y1}A${r} ${r} 0 0 1 ${x2} ${y2}`;
}

// Small lock glyph for the bottom-right badge slot (fits 14.5–21.5).
const LOCK_BADGE_BODY = '<rect x="15" y="17.25" width="6" height="4.25" rx="1.25"/>';
const LOCK_BADGE_SHACKLE = 'M16.5 17.25V16a1.5 1.5 0 0 1 3 0v1.25';
const LOCK_BADGE_O = `${LOCK_BADGE_BODY}<path d="${LOCK_BADGE_SHACKLE}"/>`;
const LOCK_BADGE_F = `${LOCK_BADGE_BODY}<path d="${LOCK_BADGE_SHACKLE}" fill="none"/>`;

// Content inside CLOUD sits around (12, 13): the shape pinches at (5.5,10.1) and (17.5,10).
const DOWN_ARROW_O = 'M12 9.5V16m-2.75-2.75L12 16l2.75-2.75';
const DOWN_ARROW_F = 'M12 11.5v6M9 14.5l3 3 3-3';
const SYNC_MINI = arcArrow(12, 13.25, 3.25, 190, 320, 2) + arcArrow(12, 13.25, 3.25, 10, 140, 2);
const REFRESH_MINI = arcArrow(12, 13.25, 3.25, -20, 255, 2.25);

// Wi-Fi: concentric arcs around (12,18).
const WIFI_1 = wifiArc(12, 18, 4);
const WIFI_2 = wifiArc(12, 18, 8);
const WIFI_3 = wifiArc(12, 18, 12);
const WIFI_DOT = 'M12 18h.01';

const GLOBE_O = '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="3.75" ry="9"/><path d="M3 12h18"/>';
const GLOBE_CUT = '<ellipse cx="12" cy="12" rx="3.75" ry="9" stroke-width="1.5"/><path d="M3 12h18" stroke-width="1.5"/>';

const SYNC = 'M4 12a8 8 0 0 1 13.4-5.9L20 8.5M20 4v4.5h-4.5M20 12a8 8 0 0 1-13.4 5.9L4 15.5M4 20v-4.5h4.5';

// Pin (map marker) used by ip-address.
const PIN = 'M12 21c-1.5-1.25-7-6-7-11a7 7 0 0 1 14 0c0 5-5.5 9.75-7 11Z';

const PLANE_TOP =
  'M12 3c1.1 0 2 1 2 2.25V9.5l6.5 4v2L14 13.5v4l2.25 1.75V21L12 20l-4.25 1v-1.75L10 17.5v-4l-6.5 2v-2l6.5-4V5.25C10 4 10.9 3 12 3Z';

export default {
  cloud: {
    o: `<path d="${CLOUD}"/>`,
    f: `<path d="${CLOUD}"/>`,
  },

  // Outline: cloud is opened around the arrow stem; filled: arrow is knocked out inside the cloud.
  'cloud-upload': {
    o: `<path d="${CLOUD}"/>`,
    ocut: `<path d="M12 22v-4" stroke-width="5"/>`,
    otop: `<path d="${UP_ARROW}"/>`,
    f: `<path d="${CLOUD}"/>`,
    cut: `<path d="M12 17.5v-6M9 14.5l3-3 3 3"/>`,
  },

  'cloud-download': {
    o: `<path d="${CLOUD}"/><path d="${DOWN_ARROW_O}"/>`,
    f: `<path d="${CLOUD}"/>`,
    cut: `<path d="${DOWN_ARROW_F}"/>`,
  },

  'cloud-check': {
    o: `<path d="${CLOUD}"/>`,
    ocut: BADGE_CLEAR,
    otop: `<path d="${BADGE.check}"/>`,
    f: `<path d="${CLOUD}"/>`,
    cut: BADGE_CLEAR,
    top: `<path d="${BADGE.check}" fill="none"/>`,
  },

  'cloud-off': {
    o: `<path d="${CLOUD}"/>`,
    ocut: SLASH_CLEAR,
    otop: SLASH,
    f: `<path d="${CLOUD}"/>`,
    cut: SLASH_CLEAR,
    top: SLASH,
  },

  'cloud-sync': {
    o: `<path d="${CLOUD}"/><path d="${SYNC_MINI}"/>`,
    f: `<path d="${CLOUD}"/>`,
    cut: `<path d="${SYNC_MINI}"/>`,
  },

  // Hero spark replaces the cloud's content.
  'cloud-sparkle': {
    o: `<path d="${CLOUD}"/><path d="${star(11.75, 12.25, 3.75)}"/>`,
    f: `<path d="${CLOUD}"/>`,
    cut: `<path d="${star(11.75, 12.25, 3.75)}" fill="#000" stroke-width="1"/>`,
  },

  'cloud-lock': {
    o: `<path d="${CLOUD}"/>`,
    ocut: BADGE_CLEAR,
    otop: LOCK_BADGE_O,
    f: `<path d="${CLOUD}"/>`,
    cut: BADGE_CLEAR,
    top: LOCK_BADGE_F,
  },

  wifi: {
    o: `<path d="${WIFI_3}${WIFI_2}${WIFI_1}${WIFI_DOT}"/>`,
    bold: true,
  },

  'wifi-off': {
    o: `<path d="${WIFI_3}${WIFI_2}${WIFI_1}${WIFI_DOT}"/>`,
    ocut: SLASH_CLEAR,
    otop: SLASH,
    bold: true,
  },

  'wifi-low': {
    o: `<path d="${WIFI_1}${WIFI_DOT}"/>`,
    bold: true,
  },

  signal: {
    o: `<path d="M4.5 19.5v-3M9.5 19.5v-7M14.5 19.5v-11M19.5 19.5v-15"/>`,
    bold: true,
  },

  // Missing bars collapse to dots on the baseline.
  'signal-low': {
    o: `<path d="M4.5 19.5v-3M9.5 19.5v-7M14.5 19.5h.01M19.5 19.5h.01"/>`,
    bold: true,
  },

  antenna: {
    o: `<circle cx="12" cy="8.5" r="2"/><path d="M12 10.5V21M8.5 21h7"/><path d="${waves(12, 8.5, 5, 40)}"/>`,
    f: `<circle cx="12" cy="8.5" r="2"/><path d="M12 10.5V21M8.5 21h7${waves(12, 8.5, 5, 40)}" fill="none"/>`,
  },

  globe: {
    o: GLOBE_O,
    f: `<circle cx="12" cy="12" r="9"/>`,
    cut: GLOBE_CUT,
  },

  'globe-lock': {
    o: GLOBE_O,
    ocut: BADGE_CLEAR,
    otop: LOCK_BADGE_O,
    f: `<circle cx="12" cy="12" r="9"/>`,
    cut: GLOBE_CUT + BADGE_CLEAR,
    top: LOCK_BADGE_F,
  },

  // Three nodes, all connected.
  network: {
    o: `<circle cx="12" cy="5.5" r="2.5"/><circle cx="5.5" cy="17.5" r="2.5"/><circle cx="18.5" cy="17.5" r="2.5"/>
        <path d="M10.8 7.7 6.7 15.3M13.2 7.7l4.1 7.6M8 17.5h8"/>`,
    f: `<circle cx="12" cy="5.5" r="2.5"/><circle cx="5.5" cy="17.5" r="2.5"/><circle cx="18.5" cy="17.5" r="2.5"/>
        <path d="M10.8 7.7 6.7 15.3M13.2 7.7l4.1 7.6M8 17.5h8" fill="none"/>`,
  },

  'share-network': {
    o: `<circle cx="17.5" cy="5.5" r="2.5"/><circle cx="6.5" cy="12" r="2.5"/><circle cx="17.5" cy="18.5" r="2.5"/>
        <path d="m8.65 10.73 6.7-3.96M8.65 13.27l6.7 3.96"/>`,
    f: `<circle cx="17.5" cy="5.5" r="2.5"/><circle cx="6.5" cy="12" r="2.5"/><circle cx="17.5" cy="18.5" r="2.5"/>
        <path d="m8.65 10.73 6.7-3.96M8.65 13.27l6.7 3.96" fill="none"/>`,
  },

  // Star topology: centre node with four satellites.
  hub: {
    o: `<circle cx="12" cy="12" r="3"/><circle cx="5.5" cy="5.5" r="2"/><circle cx="18.5" cy="5.5" r="2"/><circle cx="5.5" cy="18.5" r="2"/><circle cx="18.5" cy="18.5" r="2"/>
        <path d="m9.88 9.88-2.97-2.97M14.12 9.88l2.97-2.97M9.88 14.12l-2.97 2.97M14.12 14.12l2.97 2.97"/>`,
    f: `<circle cx="12" cy="12" r="3"/><circle cx="5.5" cy="5.5" r="2"/><circle cx="18.5" cy="5.5" r="2"/><circle cx="5.5" cy="18.5" r="2"/><circle cx="18.5" cy="18.5" r="2"/>
        <path d="m9.88 9.88-2.97-2.97M14.12 9.88l2.97-2.97M9.88 14.12l-2.97 2.97M14.12 14.12l2.97 2.97" fill="none"/>`,
  },

  // A single vertex on a chain.
  node: {
    o: `<circle cx="12" cy="12" r="4.5"/><path d="M3 12h4.5M16.5 12H21"/>`,
    f: `<circle cx="12" cy="12" r="4.5"/><path d="M3 12h4.5M16.5 12H21" fill="none"/>`,
    cut: `<circle cx="12" cy="12" r="1.5" fill="#000" stroke="none"/>`,
  },

  sync: {
    o: `<path d="${SYNC}"/>`,
    bold: true,
  },

  'sync-off': {
    o: `<path d="${SYNC}"/>`,
    ocut: SLASH_CLEAR,
    otop: SLASH,
    bold: true,
  },

  'refresh-cloud': {
    o: `<path d="${CLOUD}"/><path d="${REFRESH_MINI}"/>`,
    f: `<path d="${CLOUD}"/>`,
    cut: `<path d="${REFRESH_MINI}"/>`,
  },

  rss: {
    o: `<path d="M4.5 11.5a8 8 0 0 1 8 8M4.5 4.5a15 15 0 0 1 15 15"/><circle cx="5.75" cy="18.25" r="1.25" fill="currentColor"/>`,
    bold: true,
  },

  'broadcast-tower': {
    o: `<circle cx="12" cy="8.5" r="1.5"/><path d="M8.5 21 12 10l3.5 11M9.75 17h4.5"/><path d="${waves(12, 8.5, 4.5, 35)}${waves(12, 8.5, 8, 35)}"/>`,
    bold: true,
  },

  // RJ45 port with contact pins.
  ethernet: {
    o: `<path d="M15 20.5l2.5-3h1a2.5 2.5 0 0 0 2.5-2.5V6.5A2.5 2.5 0 0 0 18.5 4h-13A2.5 2.5 0 0 0 3 6.5V15a2.5 2.5 0 0 0 2.5 2.5h1l2.5 3Z"/>
        <path d="M7.5 8.5V10M10.5 8.5V10M13.5 8.5V10M16.5 8.5V10"/>`,
    f: `<path d="M15 20.5l2.5-3h1a2.5 2.5 0 0 0 2.5-2.5V6.5A2.5 2.5 0 0 0 18.5 4h-13A2.5 2.5 0 0 0 3 6.5V15a2.5 2.5 0 0 0 2.5 2.5h1l2.5 3Z"/>`,
    cut: `<path d="M7.5 8.5V10.5M10.5 8.5V10.5M13.5 8.5V10.5M16.5 8.5V10.5"/>`,
  },

  // Stacked server rows.
  dns: {
    o: `<rect x="3" y="3.5" width="18" height="7" rx="2"/><rect x="3" y="13.5" width="18" height="7" rx="2"/><path d="M7 7h.01M7 17h.01M11 7h6M11 17h6"/>`,
    f: `<rect x="3" y="3.5" width="18" height="7" rx="2"/><rect x="3" y="13.5" width="18" height="7" rx="2"/>`,
    cut: `<path d="M7 7h.01M7 17h.01" stroke-width="2.25"/><path d="M11 7h6M11 17h6" stroke-width="1.5"/>`,
  },

  // Pin with address dots.
  'ip-address': {
    o: `<path d="${PIN}"/><path d="M9 10h.01M12 10h.01M15 10h.01"/>`,
    f: `<path d="${PIN}"/>`,
    cut: `<path d="M9 10h.01M12 10h.01M15 10h.01" stroke-width="2"/>`,
  },

  // Upload and download arrows over level bars.
  bandwidth: {
    o: `<path d="M8 20V4M4.5 7.5 8 4l3.5 3.5M16 4v16M12.5 16.5 16 20l3.5-3.5"/>`,
    bold: true,
  },

  // Airplane mode.
  'offline-mode': {
    o: `<path d="${PLANE_TOP}"/>`,
    f: `<path d="${PLANE_TOP}"/>`,
  },
};
