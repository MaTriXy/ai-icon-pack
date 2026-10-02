import { star, MONITOR, MONITOR_STAND, PHONE, HOUSE, SLASH, SLASH_CLEAR } from '../shapes.mjs';

const K = (d, w = 1.5) => `<path d="${d}" stroke-width="${w}"/>`; // knockout line(s)

// ── Local shapes ──────────────────────────────────────────────────────────────
const PHONE_SPEAKER = 'M10.5 5.5h3';
const WATCH_STRAPS = 'M9 6.5l.5-3.5h5l.5 3.5M9 17.5l.5 3.5h5l.5-3.5';
const PRINTER_TOP = 'M7 8V4.5A1.5 1.5 0 0 1 8.5 3h7A1.5 1.5 0 0 1 17 4.5V8';
const PRINTER_PAPER = '<rect x="7" y="13.5" width="10" height="7.5" rx="1.5"/>';
const SPEAKER_BODY = '<rect x="6.5" y="3" width="11" height="18" rx="3.5"/>';
// Earbud: round head with a stem; the right one is mirrored.
const BUD = 'M5.25 10.38A3.25 3.25 0 1 1 8.25 10.38V18.5a1.5 1.5 0 0 1-3 0Z';
const BUDS = `<path d="${BUD}"/><path transform="matrix(-1 0 0 1 24 0)" d="${BUD}"/>`;
const USB_HEAD = 'M8.5 9.5V4a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5.5';
const USB_BODY = '<rect x="6.5" y="9.5" width="11" height="11.5" rx="2.5"/>';
const SD = 'M9.5 3h7A2.5 2.5 0 0 1 19 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 5 18.5V7.5Z';
const SD_PINS = 'M9.5 7.5V10M12.5 7.5V10M15.5 7.5V10';
// Generic rune (a plain berkanan-style ᛒ, not the trademarked bind-rune).
const RUNE = 'M8.5 3v18M8.5 3l7 4.5-7 4.5 7 4.5-7 4.5';
/** Contactless arcs: arc i starts at x, height h, radius 0.8h. */
const arcs = (list) => list.map(([x, h]) => `M${x} ${12 - h / 2}a${0.8 * h} ${0.8 * h} 0 0 1 0 ${h}`).join('');
const NFC = arcs([[4.5, 6], [8.5, 10], [12.5, 14], [16.5, 18]]);
const FINDER = (x, y) => `<rect x="${x}" y="${y}" width="7" height="7" rx="1.5"/>`;
const FINDERS = FINDER(3, 3) + FINDER(14, 3) + FINDER(3, 14);
const FINDER_DOTS = 'M6.5 6.5h.01M17.5 6.5h.01M6.5 17.5h.01';
const QR_BITS = 'M14.5 14.5h3M20.5 14.5v3M14.5 18v2.5M17.5 20.5h3M17.5 17.5h.01';
const SCAN_CORNERS = 'M3 7.5v-2A2.5 2.5 0 0 1 5.5 3h2M16.5 3h2A2.5 2.5 0 0 1 21 5.5v2M21 16.5v2a2.5 2.5 0 0 1-2.5 2.5h-2M7.5 21h-2A2.5 2.5 0 0 1 3 18.5v-2';
const MINI_QR = '<rect x="7" y="7" width="3.5" height="3.5" rx=".75"/><rect x="13.5" y="7" width="3.5" height="3.5" rx=".75"/><rect x="7" y="13.5" width="3.5" height="3.5" rx=".75"/>';
const JOY_BASE = '<rect x="3.5" y="16.5" width="17" height="4.5" rx="1.5"/>';
const JOY_BUTTON = 'M16 16.5V15a.75.75 0 0 1 .75-.75h1.5A.75.75 0 0 1 19 15v1.5';
const ROTORS = '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="18" r="2.5"/>';
const DRONE_ARMS = 'M7.77 7.77l2.11 2.11M16.23 7.77l-2.11 2.11M7.77 16.23l2.11-2.11M16.23 16.23l-2.11-2.11';
const ARM_LINES = 'M8.5 16.75v1.75M9.39 13.49l3.22-5.48M15 7.4l3.5 2.1';
const ARM_JOINTS = '<circle cx="8.5" cy="15" r="1.75"/><circle cx="13.5" cy="6.5" r="1.75"/>';
const ARM_BASE = '<rect x="4.5" y="18.5" width="8" height="2.5" rx="1"/>';
const GRIPPER = 'M16.75 12.5 18.5 9.5l1.75 3';
// Satellite: two solar panels on a body with an antenna (lowered 1.25 where used).
const SAT = '<rect x="3" y="8" width="5" height="9" rx="1"/><rect x="10" y="8.5" width="4" height="8" rx="1.5"/><rect x="16" y="8" width="5" height="9" rx="1"/>';
const SAT_LINES = 'M3 12.5h7M14 12.5h7M12 8.5V4.5';
const WIFI = 'M9.88 15.38a3 3 0 0 1 4.24 0M7.76 13.26a6 6 0 0 1 8.48 0';
const BULB = 'M9.5 17c0-1.5-.5-2.4-1.5-3.3a6 6 0 1 1 8 0c-1 .9-1.5 1.8-1.5 3.3Z';
const TORCH_HEAD = 'M6.5 3.5h11V6L15 9H9L6.5 6Z';
const TORCH_BODY = 'M9 9v10.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V9';
const DIAL = 'M8.46 15.54A5 5 0 1 1 15.54 15.54M12 12l1.75-1.75';
// Car, side view (translated up 1 where used).
const CAR = 'M5 17H4a1 1 0 0 1-1-1v-2.5a2 2 0 0 1 1.5-1.94L7 11l2-3.4a2 2 0 0 1 1.73-1h3.04a2 2 0 0 1 1.6.8L18 11l1.6.55A2 2 0 0 1 21 13.45V16a1 1 0 0 1-1 1h-1M9 17h6';
const CAR_F = 'M4 17a1 1 0 0 1-1-1v-2.5a2 2 0 0 1 1.5-1.94L7 11l2-3.4a2 2 0 0 1 1.73-1h3.04a2 2 0 0 1 1.6.8L18 11l1.6.55A2 2 0 0 1 21 13.45V16a1 1 0 0 1-1 1Z';
const WHEELS = '<circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>';
const STATION = '<rect x="3.5" y="3" width="10.5" height="18" rx="2.5"/>';
const STATION_BOLT = 'M9.75 7l-2.5 4h3.5l-2.5 4';
const HOSE = 'M14 10.5h1.5A1.5 1.5 0 0 1 17 12v5a1.5 1.5 0 0 0 3 0V8.5L17.5 6';

export default {
  // ── Screens ──────────────────────────────────────────────────────────────────
  monitor: {
    o: `${MONITOR}<path d="${MONITOR_STAND}"/>`,
    f: `${MONITOR}<path d="${MONITOR_STAND}"/>`,
  },
  laptop: {
    o: `<rect x="4.5" y="4.5" width="15" height="11" rx="2"/><path d="M3 19h18"/>`,
    f: `<rect x="4.5" y="4.5" width="15" height="11" rx="2"/><path d="M3 19h18"/>`,
  },
  // Monitor beside a tower.
  desktop: {
    o: `<rect x="3" y="4.5" width="11" height="10" rx="2"/><path d="M8.5 14.5v4M6 18.5h5"/><rect x="17" y="3.5" width="4" height="17" rx="1.5"/>`,
    f: `<rect x="3" y="4.5" width="11" height="10" rx="2"/><path d="M8.5 14.5v4M6 18.5h5"/><rect x="17" y="3.5" width="4" height="17" rx="1.5"/>`,
  },
  tablet: {
    o: `<rect x="4.5" y="2.5" width="15" height="19" rx="2.5"/><path d="M10.5 18.5h3"/>`,
    f: `<rect x="4.5" y="2.5" width="15" height="19" rx="2.5"/>`,
    cut: K('M10.5 18.5h3'),
  },
  smartphone: {
    o: `${PHONE}<path d="${PHONE_SPEAKER}"/>`,
    f: PHONE,
    cut: K(PHONE_SPEAKER),
  },
  smartwatch: {
    o: `<rect x="6.5" y="6.5" width="11" height="11" rx="3"/><path d="${WATCH_STRAPS}"/><path d="M12 9.5V12l1.75 1.25"/>`,
    f: `<rect x="6.5" y="6.5" width="11" height="11" rx="3"/><path d="${WATCH_STRAPS.replace('M9 17.5', 'ZM9 17.5')}Z"/>`,
    cut: K('M12 9.5V12l1.75 1.25'),
  },
  // MONITOR lowered under a rabbit-ear antenna.
  tv: {
    o: `<g transform="translate(0 3)">${MONITOR}</g><path d="M8 3l4 4 4-4"/>`,
    f: `<g transform="translate(0 3)">${MONITOR}</g><path fill="none" d="M8 3l4 4 4-4"/>`,
  },

  // ── Peripherals ─────────────────────────────────────────────────────────────
  printer: {
    o: `<rect x="3" y="8" width="18" height="8.5" rx="2.5"/><path d="${PRINTER_TOP}"/>`,
    ocut: `<rect x="7" y="13.5" width="10" height="7.5" rx="1.5" fill="#000" stroke-width="4.25"/>`,
    otop: PRINTER_PAPER,
    f: `<rect x="3" y="8" width="18" height="8.5" rx="2.5"/>`,
    cut: `<rect x="7" y="13.5" width="10" height="7.5" rx="1.5" fill="#000" stroke-width="4.25"/>`,
    top: `<path fill="none" d="${PRINTER_TOP}"/>${PRINTER_PAPER}`,
  },
  // Flatbed with the lid raised.
  scanner: {
    o: `<rect x="3" y="10" width="18" height="9" rx="2.5"/><path d="M3 13.5h18M6.5 16.5h7M5 7l14-3"/>`,
    f: `<rect x="3" y="10" width="18" height="9" rx="2.5"/><path d="M5 7l14-3"/>`,
    cut: K('M1 13.5h22M6.5 16.5h7'),
  },
  webcam: {
    o: `<circle cx="12" cy="10" r="7"/><circle cx="12" cy="10" r="2.5"/><path d="${MONITOR_STAND}"/>`,
    f: `<circle cx="12" cy="10" r="7"/><path d="${MONITOR_STAND}"/>`,
    cut: `<circle cx="12" cy="10" r="2.5" stroke-width="1.5"/>`,
  },
  // Smart speaker: light ring on top, driver below.
  'speaker-device': {
    o: `${SPEAKER_BODY}<path d="M6.5 7h11"/><circle cx="12" cy="14" r="2.5"/>`,
    f: SPEAKER_BODY,
    cut: `${K('M5 7h14')}<circle cx="12" cy="14" r="2.5" stroke-width="1.5"/>`,
  },
  earbuds: {
    o: BUDS,
    f: BUDS,
  },
  router: {
    o: `<rect x="3" y="12" width="18" height="8" rx="2.5"/><path d="M6.5 12V4.5M17.5 12V4.5"/><path d="M7 16h.01M10 16h.01M13 16h.01"/>`,
    f: `<rect x="3" y="12" width="18" height="8" rx="2.5"/><path d="M6.5 12V4.5M17.5 12V4.5"/>`,
    cut: `<path d="M7 16h.01M10 16h.01M13 16h.01" stroke-width="2"/>`,
  },
  // USB plug (connector), not the trident logo.
  usb: {
    o: `<path d="${USB_HEAD}"/>${USB_BODY}<path d="M10.5 6h3"/>`,
    f: `<path d="${USB_HEAD}Z"/>${USB_BODY}`,
    cut: `${K('M1 9.5h22')}${K('M10.5 6h3')}`,
  },
  'hard-drive': {
    o: `<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M3 12.5h18M7 15.5h.01M10 15.5h.01"/>`,
    f: `<rect x="3" y="5.5" width="18" height="13" rx="2.5"/>`,
    cut: `${K('M1 12.5h22')}<path d="M7 15.5h.01M10 15.5h.01" stroke-width="2"/>`,
  },
  'sd-card': {
    o: `<path d="${SD}"/><path d="${SD_PINS}"/>`,
    f: `<path d="${SD}"/>`,
    cut: K(SD_PINS),
  },

  // ── Wireless & codes ────────────────────────────────────────────────────────
  bluetooth: {
    o: `<path d="${RUNE}"/>`,
    bold: true,
  },
  // Generic contactless arcs (no NFC Forum mark).
  nfc: {
    o: `<path d="${NFC}"/>`,
    bold: true,
  },
  'qr-code': {
    o: `${FINDERS}<path d="${FINDER_DOTS}"/><path d="${QR_BITS}"/>`,
    f: `${FINDERS}<path d="${QR_BITS}"/>`,
    cut: `<rect x="4.75" y="4.75" width="3.5" height="3.5" rx=".5" stroke-width="1.25"/><rect x="15.75" y="4.75" width="3.5" height="3.5" rx=".5" stroke-width="1.25"/><rect x="4.75" y="15.75" width="3.5" height="3.5" rx=".5" stroke-width="1.25"/>`,
  },
  barcode: {
    o: `<path d="M4 5v14M7 5v14M10 5v14M14 5v14M17 5v14M20 5v14"/>`,
    f: `<path d="M4 5v14M7 5v14M14 5v14M20 5v14"/><path d="M10 5v14M17 5v14" stroke-width="2.25"/>`,
  },
  'scan-qr': {
    o: `<path d="${SCAN_CORNERS}"/>${MINI_QR.replaceAll('/>', ' fill="currentColor"/>')}<path d="M15.25 15.25h.01"/>`,
    f: `<path fill="none" d="${SCAN_CORNERS}"/>${MINI_QR}<path d="M15.25 15.25h.01" stroke-width="2.5"/>`,
  },

  // ── Gadgets & robotics ──────────────────────────────────────────────────────
  joystick: {
    o: `${JOY_BASE}<path d="M12 16.5V10"/><circle cx="12" cy="6.5" r="3.5"/><path d="${JOY_BUTTON}"/>`,
    f: `${JOY_BASE}<path d="M12 16.5V10"/><circle cx="12" cy="6.5" r="3.5"/><path d="${JOY_BUTTON}"/>`,
  },
  drone: {
    o: `${ROTORS}<circle cx="12" cy="12" r="3"/><path d="${DRONE_ARMS}"/>`,
    f: `${ROTORS}<circle cx="12" cy="12" r="3"/><path d="${DRONE_ARMS}"/>`,
  },
  'robot-arm': {
    o: `${ARM_BASE}${ARM_JOINTS}<path d="${ARM_LINES}"/><path d="${GRIPPER}"/>`,
    f: `${ARM_BASE}${ARM_JOINTS}<path d="${ARM_LINES}"/><path fill="none" d="${GRIPPER}"/>`,
  },
  satellite: {
    o: `<g transform="translate(0 1.25)">${SAT}<path d="${SAT_LINES}"/></g>`,
    f: `<g transform="translate(0 1.25)">${SAT}<path d="M8 12.5h2M14 12.5h2M12 8.5V4.5"/></g>`,
    cut: `<path transform="translate(0 1.25)" d="M1 12.5h7M16 12.5h7" stroke-width="1.5"/>`,
  },
  // IoT board: chip and a header row.
  'chip-device': {
    o: `<rect x="3" y="4" width="18" height="16" rx="2.5"/><rect x="6.5" y="7.5" width="6" height="6" rx="1"/><path d="M7.5 17h.01M10.5 17h.01M13.5 17h.01M16.5 17h.01"/>`,
    f: `<rect x="3" y="4" width="18" height="16" rx="2.5"/>`,
    cut: `<rect x="6.5" y="7.5" width="6" height="6" rx="1" stroke-width="1.5"/><path d="M7.5 17h.01M10.5 17h.01M13.5 17h.01M16.5 17h.01" stroke-width="2"/>`,
  },
  'smart-home': {
    o: `<path d="${HOUSE}"/><path d="${WIFI}"/><path d="M12 17.5h.01"/>`,
    f: `<path d="${HOUSE}"/>`,
    cut: `${K(WIFI)}<circle cx="12" cy="17.5" r="1" fill="#000" stroke="none"/>`,
  },

  // ── Home & lighting ─────────────────────────────────────────────────────────
  // Accent spark is the filament.
  lightbulb: {
    o: `<path d="${BULB}"/><path d="M10 20h4"/><path d="${star(12, 9.25, 2.5)}"/>`,
    f: `<path d="${BULB}"/><path d="M10 20h4"/>`,
    cut: `<path d="${star(12, 9.25, 2.75)}" fill="#000" stroke-width="1"/>`,
  },
  'lightbulb-off': {
    o: `<path d="${BULB}"/><path d="M10 20h4"/>`,
    ocut: SLASH_CLEAR,
    otop: SLASH,
    f: `<path d="${BULB}"/><path d="M10 20h4"/>`,
    cut: SLASH_CLEAR,
    top: SLASH,
  },
  flashlight: {
    o: `<path d="${TORCH_HEAD}"/><path d="${TORCH_BODY}"/><path d="M12 12.5v2"/>`,
    f: `<path d="${TORCH_HEAD}"/><path d="${TORCH_BODY}Z"/>`,
    cut: `${K('M1 9h22')}${K('M12 12.5v2', 1.75)}`,
  },
  thermostat: {
    o: `<circle cx="12" cy="12" r="8.5"/><path d="${DIAL}"/>`,
    f: `<circle cx="12" cy="12" r="8.5"/>`,
    cut: K(DIAL),
  },
  car: {
    o: `<g transform="translate(0 -1)"><path d="${CAR}"/>${WHEELS}<path d="M7 11h11M12.5 6.6V11"/></g>`,
    f: `<g transform="translate(0 -1)"><path d="${CAR_F}"/>${WHEELS}</g>`,
    cut: `<g transform="translate(0 -1)"><circle cx="7" cy="17" r="3.5" stroke-width="1.25"/><circle cx="17" cy="17" r="3.5" stroke-width="1.25"/><path d="M7 11h11M12.5 6.6V11" stroke-width="1.5"/></g>`,
    top: `<g transform="translate(0 -1)">${WHEELS}</g>`,
  },
  'ev-charger': {
    o: `${STATION}<path d="${STATION_BOLT}"/><path d="${HOSE}"/>`,
    f: STATION,
    cut: K(STATION_BOLT, 1.75),
    top: `<path fill="none" d="${HOSE}"/>`,
  },
};
