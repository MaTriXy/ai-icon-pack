import { star, GEAR, BELL, BELL_CLAPPER, HEAD, BODY, SHIELD, DATABASE, BADGE_CLEAR, SLASH, SLASH_CLEAR } from '../shapes.mjs';

const n = (v) => +v.toFixed(2);
const K = (d, w = 1.5) => `<path d="${d}" stroke-width="${w}"/>`; // knockout line(s)

// ── Mini gear badge (GEAR scaled into the bottom-right corner) ─────────────────
// Pairs a base object with GEAR: clear the base with GEAR_CLEAR in `ocut`/`cut`,
// then draw GEAR_O in `otop` (outline) or GEAR_F in `top` (filled, with an axle hole).
const GS = 0.42, GX = 17, GY = 17;
const GT = `translate(${GX} ${GY}) scale(${GS}) translate(-12 -12)`;
const HOLE = n(1.875 / GS); // visible axle hole ≈ r1 after the 1.75 stroke
const GEAR_O = `<path transform="${GT}" stroke-width="${n(1.75 / GS)}" d="${GEAR}"/><path d="M${GX} ${GY}h.01"/>`;
const GEAR_CLEAR = `<path transform="${GT}" fill="#000" stroke-width="${n(4.25 / GS)}" d="${GEAR}"/>`;
const GEAR_F = `<path transform="${GT}" stroke-width="${n(1.75 / GS)}" fill-rule="evenodd" d="${GEAR}M${n(12 - HOLE)} 12a${HOLE} ${HOLE} 0 1 0 ${n(2 * HOLE)} 0a${HOLE} ${HOLE} 0 1 0 ${n(-2 * HOLE)} 0Z"/>`;
/** Base (outline markup, filled markup, filled cut-outs) with the mini gear badge. */
const withGear = (o, f, cut = '') => ({ o, ocut: GEAR_CLEAR, otop: GEAR_O, f, cut: cut + GEAR_CLEAR, top: GEAR_F });

// ── Local shapes ──────────────────────────────────────────────────────────────
// Wrench drawn upright (open jaw at the top), rotated into place.
const WRENCH = 'M10.5 2.26V6.5a1.5 1.5 0 0 0 3 0V2.26A4.5 4.5 0 0 1 14 10.53V19a2 2 0 0 1-4 0v-8.47A4.5 4.5 0 0 1 10.5 2.26Z';
const SCREWDRIVER_SHAFT = 'M12 2v7.5';
const SCREWDRIVER_GRIP = '<rect x="9.25" y="9.5" width="5.5" height="11" rx="2"/>';
// Screwdriver pushed down its own axis so the grip clears the wrench; only the shaft crosses it.
const TOOLS_SD = 'translate(1.75 1.75) rotate(-45 12 12)';
const TOOLS_SHAFT = 'M12 1v13.5';
const TOOLS_GRIP = '<rect x="10" y="14.5" width="4" height="5" rx="1.5"/>';
const PANEL_MARKS = 'M9 12l2.1-2.1M16.5 7.5v9M15 10.5h3';
const CMD = 'M10 10V8.5a1.5 1.5 0 1 0-1.5 1.5h7a1.5 1.5 0 1 0-1.5-1.5v7a1.5 1.5 0 1 0 1.5-1.5h-7a1.5 1.5 0 1 0 1.5 1.5Z';
const HAMMER_HEAD = '<rect x="6.5" y="5.5" width="11" height="4.5" rx="1.25"/>';
const HAMMER_HANDLE = 'M10.75 10v9.25a1.25 1.25 0 0 0 2.5 0V10';
const EYE = 'M3 12c2-4.25 5.1-6.5 9-6.5s7 2.25 9 6.5c-2 4.25-5.1 6.5-9 6.5S5 16.25 3 12Z'; // = eye (04-actions)
const HEART = 'M12 20S3 14.5 3 8.8a4.8 4.8 0 0 1 9-2.3 4.8 4.8 0 0 1 9 2.3C21 14.5 12 20 12 20Z'; // = heart (04-actions)
const TRASH_O = '<path d="M3 6.5h18"/><path d="M9 6.5v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/><path d="M5 6.5 6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12.5"/><path d="M10 11v6"/>'; // = trash (04-actions) minus the right slat, which the gear badge covers
const GLOBE_O = '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="3.75" ry="9"/><path d="M3 12h18"/>'; // = globe (16-cloud)
const GLOBE_CUT = '<ellipse cx="12" cy="12" rx="3.75" ry="9" stroke-width="1.5"/><path d="M3 12h18" stroke-width="1.5"/>';
const REGION_PIN = 'M18 21.25c-.5-.5-2.75-2.75-2.75-4.75a2.75 2.75 0 0 1 5.5 0c0 2-2.25 4.25-2.75 4.75Z';
const POWER_ARC ='M17.14 6.37a8 8 0 1 1-10.28 0'; // = power (04-actions)
const SYNC = 'M4 12a8 8 0 0 1 13.4-5.9L20 8.5M20 4v4.5h-4.5M20 12a8 8 0 0 1-13.4 5.9L4 15.5M4 20v-4.5h4.5'; // = sync (16-cloud)
const BATTERY = 'M5.5 6.5h10.5a2.5 2.5 0 0 1 2.5 2.5v1h1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-1v1a2.5 2.5 0 0 1-2.5 2.5H5.5A2.5 2.5 0 0 1 3 15V9a2.5 2.5 0 0 1 2.5-2.5Z';
const BATTERY_HOLE = '<rect x="4.25" y="7.75" width="13" height="8.5" rx="1.25" fill="#000" stroke="none"/>';
const level = (w) => `<rect x="5.25" y="8.75" width="${w}" height="6.5" rx="1" fill="currentColor" stroke="none"/>`;
const battery = (w) => ({ o: `<path d="${BATTERY}"/>${level(w)}`, f: `<path d="${BATTERY}"/>`, cut: BATTERY_HOLE, top: `<rect x="5.5" y="9" width="${w - 0.5}" height="6" rx=".75" stroke="none"/>` });
const BOLT = 'M11.5 9.5l-2 2.5h3.5l-2 2.5';
// Package: lid plus box body.
const LID = '<rect x="3" y="3" width="18" height="4.5" rx="1.5"/>';
const BOX = 'M4.5 7.5v11A2.5 2.5 0 0 0 7 21h10a2.5 2.5 0 0 0 2.5-2.5v-11';
const PUZZLE = 'M6.5 9.5A2.5 2.5 0 0 1 9 7h2.5a2 2 0 1 1 4 0H18a2.5 2.5 0 0 1 2.5 2.5v9A2.5 2.5 0 0 1 18 21H9a2.5 2.5 0 0 1-2.5-2.5V16a2 2 0 1 1 0-4Z';
const GAMEPAD = 'M8 6.5h8a4 4 0 0 1 3.9 3.1l.85 3.9a2.5 2.5 0 0 1-4.15 2.35L15 14H9l-1.6 1.85a2.5 2.5 0 0 1-4.15-2.35l.85-3.9A4 4 0 0 1 8 6.5Z';
const GAMEPAD_KEYS = 'M8 9.75v2.5M6.75 11h2.5M15.25 9.75h.01M17.25 12.25h.01';
const SCROLL = 'M7.5 7.5h-3a1 1 0 0 1-1-1v-1a2 2 0 0 1 4 0v13a2.5 2.5 0 0 0 5 0v-1a1 1 0 0 1 1-1H20a1 1 0 0 1 1 1v1a2.5 2.5 0 0 1-2.5 2.5H10';
const SCROLL_SHEET = 'M5.5 3.5H16a2.5 2.5 0 0 1 2.5 2.5v10.5';
const SCROLL_F = 'M5.5 3.5H16a2.5 2.5 0 0 1 2.5 2.5v10.5H20a1 1 0 0 1 1 1v1a2.5 2.5 0 0 1-2.5 2.5H10a2.5 2.5 0 0 1-2.5-2.5V7.5h-3a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2Z';
const STETHOSCOPE = 'M5 3.5V8a4 4 0 0 0 8 0V3.5M4 3.5h2M12 3.5h2M9 12v3a4.25 4.25 0 0 0 8.5 0';
const GAUGE = 'M4.64 18.25A8.5 8.5 0 1 1 19.36 18.25';
const THERMO = 'M6.25 13.75V5.25a1.75 1.75 0 0 1 3.5 0v8.5a3.5 3.5 0 1 1-3.5 0Z';
const RAM_PINS = 'M6 15v3M9 15v3M12 15v3M15 15v3M18 15v3';
// Fan blade (pointing up, swept clockwise), repeated at 120°.
const BLADE = 'M12 10C10.75 7.25 11.5 4.5 14 4c2.25-.4 3.4 1.6 2.5 3.5-.6 1.3-1.6 2.4-2.77 3.5Z';
const BLADES = [0, 120, 240].map((a) => `<path transform="rotate(${a} 12 12)" d="${BLADE}"/>`).join('');

export default {
  // Accent spark replaces the axle hole.
  settings: {
    o: `<path d="${GEAR}"/><path d="${star(12, 12, 3.25)}"/>`,
    f: `<path d="${GEAR}"/>`,
    cut: `<path d="${star(12, 12, 3.5)}" fill="#000" stroke-width="1"/>`,
  },

  // Plain gear (no spark), axle hole.
  cog: {
    o: `<path d="${GEAR}"/><circle cx="12" cy="12" r="3.25"/>`,
    f: `<path d="${GEAR}"/>`,
    cut: `<circle cx="12" cy="12" r="3.25" fill="#000" stroke-width="1"/>`,
  },

  'settings-sliders': {
    o: `<path d="M3 6h10M17 6h4M3 12h3M10 12h11M3 18h8M15 18h6"/><circle cx="15" cy="6" r="2"/><circle cx="8" cy="12" r="2"/><circle cx="13" cy="18" r="2"/>`,
    f: `<path d="M3 6h10M17 6h4M3 12h3M10 12h11M3 18h8M15 18h6"/><circle cx="15" cy="6" r="2"/><circle cx="8" cy="12" r="2"/><circle cx="13" cy="18" r="2"/>`,
  },

  // ── Tools ────────────────────────────────────────────────────────────────────
  wrench: {
    o: `<path transform="rotate(45 12 12)" d="${WRENCH}"/>`,
    f: `<path transform="rotate(45 12 12)" d="${WRENCH}"/>`,
  },
  // Wrench (head top-right) crossed by a screwdriver (grip bottom-right).
  tools: {
    o: `<path transform="rotate(45 12 12)" d="${WRENCH}"/>`,
    ocut: `<path transform="${TOOLS_SD}" fill="#000" stroke-width="4.25" d="${TOOLS_SHAFT}"/>`,
    otop: `<g transform="${TOOLS_SD}"><path d="${TOOLS_SHAFT}"/>${TOOLS_GRIP}</g>`,
    f: `<path transform="rotate(45 12 12)" d="${WRENCH}"/>`,
    cut: `<path transform="${TOOLS_SD}" fill="#000" stroke-width="4.25" d="${TOOLS_SHAFT}"/>`,
    top: `<g transform="${TOOLS_SD}"><path d="${TOOLS_SHAFT}"/>${TOOLS_GRIP}</g>`,
  },
  hammer: {
    o: `<g transform="translate(-.75 .75) rotate(45 12 12)">${HAMMER_HEAD}<path d="${HAMMER_HANDLE}"/></g>`,
    f: `<g transform="translate(-.75 .75) rotate(45 12 12)">${HAMMER_HEAD}<path d="${HAMMER_HANDLE}Z"/></g>`,
  },
  screwdriver: {
    o: `<g transform="rotate(-45 12 12)"><path d="${SCREWDRIVER_SHAFT}"/>${SCREWDRIVER_GRIP}</g>`,
    f: `<g transform="rotate(-45 12 12)"><path d="${SCREWDRIVER_SHAFT}"/>${SCREWDRIVER_GRIP}</g>`,
    cut: `<path transform="rotate(-45 12 12)" d="M12 13v4" stroke-width="1.5"/>`,
  },

  // ── Gear-paired settings ────────────────────────────────────────────────────
  preferences: withGear(`${HEAD}<path d="${BODY}"/>`, `${HEAD}<path d="${BODY}Z"/>`),
  'accessibility-settings': withGear(
    `<circle cx="9.5" cy="4.75" r="1.75"/><path d="M3.5 8.5h12M9.5 8.5V14M9.5 14 7 20.5M9.5 14l2.5 6.5"/>`,
    `<circle cx="9.5" cy="4.75" r="1.75"/><path d="M3.5 8.5h12M9.5 8.5V14M9.5 14 7 20.5M9.5 14l2.5 6.5"/>`,
  ),
  'notification-settings': withGear(`<path d="${BELL}"/><path d="${BELL_CLAPPER}"/>`, `<path d="${BELL}"/><path d="${BELL_CLAPPER}Z"/>`),
  'privacy-settings': withGear(
    `<path d="${EYE}"/><circle cx="12" cy="12" r="3"/>`,
    `<path d="${EYE}"/>`,
    `<circle cx="12" cy="12" r="3.25" stroke-width="1.5"/>`,
  ),
  'storage-settings': withGear(
    DATABASE,
    `<path d="M4.5 5.5v13c0 1.5 3.4 2.75 7.5 2.75s7.5-1.25 7.5-2.75v-13c0-1.5-3.4-2.75-7.5-2.75S4.5 4 4.5 5.5Z"/>`,
    `<path d="M4.5 5.5c0 1.5 3.4 2.75 7.5 2.75s7.5-1.25 7.5-2.75M4.5 12c0 1.5 3.4 2.75 7.5 2.75s7.5-1.25 7.5-2.75" stroke-width="1.5"/>`,
  ),
  'trash-settings': withGear(
    TRASH_O,
    `<path d="M5.2 9 6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l.8-10Z"/><path d="M3 6.5h18"/><path fill="none" d="M9 6.5v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>`,
    `<path d="M10 12v5" stroke-width="1.5"/>`,
  ),
  admin: {
    o: `<path d="${SHIELD}"/><circle cx="12" cy="8.25" r="2"/><path d="M9 17a3 3 0 0 1 6 0"/>`,
    f: `<path d="${SHIELD}"/>`,
    cut: `<circle cx="12" cy="8.25" r="2" fill="#000"/><path d="M9 17a3 3 0 0 1 6 0Z" fill="#000"/>`,
  },

  // ── Controls & input devices ────────────────────────────────────────────────
  // Panel with a dial and a fader.
  'control-panel': {
    o: `<rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="9" cy="12" r="3"/><path d="${PANEL_MARKS}"/>`,
    f: `<rect x="3" y="4" width="18" height="16" rx="2.5"/>`,
    cut: `<circle cx="9" cy="12" r="3" stroke-width="1.5"/><path d="${PANEL_MARKS}" stroke-width="1.5"/>`,
  },
  // Switch: large knob on a slim track.
  toggle: {
    o: `<rect x="3" y="8.5" width="18" height="7" rx="3.5"/>`,
    ocut: `<circle cx="16" cy="12" r="5" fill="#000" stroke="none"/>`,
    otop: `<circle cx="16" cy="12" r="5"/>`,
    f: `<rect x="3" y="8.5" width="18" height="7" rx="3.5"/><circle cx="16" cy="12" r="5"/>`,
    cut: `<circle cx="16" cy="12" r="6.5" stroke-width="1.25"/>`,
  },
  keyboard: {
    o: `<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M7.5 9h.01M10.5 9h.01M13.5 9h.01M16.5 9h.01M9 12h.01M12 12h.01M15 12h.01M9 15h6"/>`,
    f: `<rect x="3" y="5.5" width="18" height="13" rx="2.5"/>`,
    cut: `<path d="M7.5 9h.01M10.5 9h.01M13.5 9h.01M16.5 9h.01M9 12h.01M12 12h.01M15 12h.01" stroke-width="2"/>${K('M9 15h6')}`,
  },
  // Keycap with a command-loop glyph.
  'keyboard-shortcut': {
    o: `<rect x="3.5" y="3.5" width="17" height="17" rx="3"/><path d="${CMD}"/>`,
    f: `<rect x="3.5" y="3.5" width="17" height="17" rx="3"/>`,
    cut: K(CMD),
  },
  mouse: {
    o: `<rect x="6" y="3" width="12" height="18" rx="6"/><path d="M12 7v3"/>`,
    f: `<rect x="6" y="3" width="12" height="18" rx="6"/>`,
    cut: K('M12 7v3', 2),
  },
  gamepad: {
    o: `<g transform="translate(0 .75)"><path d="${GAMEPAD}"/><path d="${GAMEPAD_KEYS}"/></g>`,
    f: `<path transform="translate(0 .75)" d="${GAMEPAD}"/>`,
    cut: `<path transform="translate(0 .75)" d="M8 9.75v2.5M6.75 11h2.5" stroke-width="1.5"/><path transform="translate(0 .75)" d="M15.25 9.75h.01M17.25 12.25h.01" stroke-width="2"/>`,
  },

  // ── Power ───────────────────────────────────────────────────────────────────
  battery: battery(5.5),
  'battery-low': battery(2.5),
  'battery-full': battery(11),
  'battery-charging': {
    o: `<path d="${BATTERY}"/><path d="${BOLT}"/>`,
    f: `<path d="${BATTERY}"/>`,
    cut: K(BOLT, 1.75),
  },
  plug: {
    o: `<path d="M6 8a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2.5a6 6 0 0 1-12 0Z"/><path d="M9 3v4M15 3v4M12 16.5V21"/>`,
    f: `<path d="M6 8a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2.5a6 6 0 0 1-12 0Z"/><path d="M9 3v4M15 3v4M12 16.5V21"/>`,
  },
  'power-off': {
    o: `<path d="M12 3v8"/><path d="${POWER_ARC}"/>`,
    ocut: SLASH_CLEAR,
    otop: SLASH,
    bold: true,
  },
  // Power symbol whose arc ends in an arrowhead.
  restart: {
    o: `<path d="M12 3v8"/><path d="${POWER_ARC}"/><path d="M3.87 6.11 6.86 6.37 6.6 9.36"/>`,
    bold: true,
  },
  sleep: {
    o: `<path d="M4 12h7l-7 7.5h7M14 4.5h6l-6 6.5h6"/>`,
    bold: true,
  },
  update: {
    o: `<path d="${SYNC}"/><path d="M12 8.5V15M9.25 12.25 12 15l2.75-2.75"/>`,
    bold: true,
  },
  install: {
    o: `${LID}<path d="${BOX}"/><path d="M12 10.5V17M9.25 14.25 12 17l2.75-2.75"/>`,
    f: `${LID}<path d="${BOX}Z"/>`,
    cut: `${K('M1 7.5h22')}${K('M12 10.5V17M9.25 14.25 12 17l2.75-2.75', 1.75)}`,
  },
  uninstall: {
    o: `${LID}<path d="${BOX}"/><path d="m9.75 11.75 4.5 4.5m0-4.5-4.5 4.5"/>`,
    f: `${LID}<path d="${BOX}Z"/>`,
    cut: `${K('M1 7.5h22')}${K('m9.75 11.75 4.5 4.5m0-4.5-4.5 4.5', 1.75)}`,
  },
  // Puzzle piece with a plus badge.
  extension: {
    o: `<path d="${PUZZLE}"/>`,
    ocut: BADGE_CLEAR,
    otop: `<path d="M18 15v6M15 18h6"/>`,
    f: `<path d="${PUZZLE}"/>`,
    cut: BADGE_CLEAR,
    top: `<path d="M18 15v6M15 18h6"/>`,
  },
  // Globe with an "A" badge.
  language: {
    o: GLOBE_O,
    ocut: BADGE_CLEAR,
    otop: `<path d="M15 21.25 18 14.5l3 6.75M16.2 18.75h3.6"/>`,
    f: `<circle cx="12" cy="12" r="9"/>`,
    cut: GLOBE_CUT + BADGE_CLEAR,
    top: `<path fill="none" d="M15 21.25 18 14.5l3 6.75M16.2 18.75h3.6"/>`,
  },
  // Globe with a pin badge.
  region: {
    o: GLOBE_O,
    ocut: BADGE_CLEAR,
    otop: `<path d="${REGION_PIN}"/>`,
    f: `<circle cx="12" cy="12" r="9"/>`,
    cut: GLOBE_CUT + BADGE_CLEAR,
    top: `<path d="${REGION_PIN}"/>`,
  },

  // ── System health ───────────────────────────────────────────────────────────
  logs: {
    o: `<path d="${SCROLL}"/><path d="${SCROLL_SHEET}"/><path d="M10.5 8h5M10.5 12h5"/>`,
    f: `<path d="${SCROLL_F}"/>`,
    cut: K('M7.5 5.5v2M12.5 18.5v-1a1 1 0 0 1 1-1H19M10.5 8h5M10.5 12h5'),
  },
  diagnostics: {
    o: `<g transform="translate(0 .5)"><path d="${STETHOSCOPE}"/><circle cx="17.5" cy="12.75" r="2.25"/></g>`,
    bold: true,
  },
  'health-check': {
    o: `<path d="${HEART}"/><path d="M7 12h2l1.5-2.5 2.5 5 1.5-2.5H17"/>`,
    f: `<path d="${HEART}"/>`,
    cut: K('M7 12h2l1.5-2.5 2.5 5 1.5-2.5H17'),
  },
  uptime: {
    o: `<path d="M3 13h2.5L7 10l2.5 6 1.5-3h2.5M17.5 20V4.5M14.5 7.5l3-3 3 3"/>`,
    bold: true,
  },
  // Speedometer.
  performance: {
    o: `<path d="${GAUGE}"/><path d="m12 14 3.5-3.5"/><circle cx="12" cy="14" r="1.5" fill="currentColor"/>`,
    f: `<path d="${GAUGE}Z"/>`,
    cut: `<path d="m12 14 3.5-3.5" stroke-width="1.5"/><circle cx="12" cy="14" r="1.75" fill="#000" stroke="none"/>`,
  },
  // RAM stick.
  'memory-chip': {
    o: `<rect x="3" y="6" width="18" height="9" rx="1.5"/><rect x="6" y="9" width="4" height="3" rx=".75"/><rect x="14" y="9" width="4" height="3" rx=".75"/><path d="${RAM_PINS}"/>`,
    f: `<rect x="3" y="6" width="18" height="9" rx="1.5"/><path d="${RAM_PINS}"/>`,
    cut: `<rect x="6" y="9" width="4" height="3" rx=".75" stroke-width="1.5"/><rect x="14" y="9" width="4" height="3" rx=".75" stroke-width="1.5"/>`,
  },
  'temperature-system': {
    o: `<path d="${THERMO}"/><circle cx="8" cy="16.78" r="1.25" fill="currentColor" stroke="none"/><rect x="13.5" y="8.5" width="7" height="7" rx="1.5"/><path d="M15.5 6v2.5M18.5 6v2.5M15.5 15.5V18M18.5 15.5V18"/>`,
    f: `<path d="${THERMO}"/><rect x="13.5" y="8.5" width="7" height="7" rx="1.5"/><path d="M15.5 6v2.5M18.5 6v2.5M15.5 15.5V18M18.5 15.5V18"/>`,
    cut: `<circle cx="8" cy="16.78" r="1.25" fill="#000" stroke="none"/><rect x="15.75" y="10.75" width="2.5" height="2.5" rx=".5" fill="#000" stroke="none"/>`,
  },
  fan: {
    o: `${BLADES}<circle cx="12" cy="12" r="2"/>`,
    f: `${BLADES}<circle cx="12" cy="12" r="2"/>`,
    cut: `<circle cx="12" cy="12" r=".75" fill="#000" stroke="none"/>`,
  },
};
