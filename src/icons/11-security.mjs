import {
  star, SHIELD, LOCK_BODY, LOCK_SHACKLE, PAGE, PAGE_FOLD, PAGE_FOLD_CUT, PHONE,
  ENVELOPE, ENVELOPE_FLAP, BADGE, BADGE_CLEAR, SLASH, SLASH_CLEAR,
} from '../shapes.mjs';

// ── local helpers ────────────────────────────────────────────────────────────
const n = (v) => +v.toFixed(2);
const hole = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#000" stroke="none"/>`;
const K = (d, w = 1.75) => `<path d="${d}" stroke-width="${w}"/>`; // knockout line(s)
const pol = (cx, cy, r, deg) => {
  const t = (deg * Math.PI) / 180;
  return [n(cx + r * Math.cos(t)), n(cy + r * Math.sin(t))];
};

/** Shield with interior detail: outline strokes it, filled knocks it out. */
const shieldWith = (detailO, detailCut = detailO) => ({
  o: `<path d="${SHIELD}"/>${detailO}`,
  f: `<path d="${SHIELD}"/>`,
  cut: detailCut,
});

// Small lock that sits inside shields and chips.
const MINI_LOCK_BODY = '<rect x="9" y="11.5" width="6" height="4.5" rx="1.25"/>';
const MINI_LOCK_SHACKLE = 'M10.5 11.5v-1a1.5 1.5 0 0 1 3 0v1';
const MINI_LOCK_O = `${MINI_LOCK_BODY}<path d="${MINI_LOCK_SHACKLE}"/>`;
const MINI_LOCK_CUT = `<rect x="9" y="11.5" width="6" height="4.5" rx="1.25" fill="#000" stroke-width="1"/><path d="${MINI_LOCK_SHACKLE}" stroke-width="1.5"/>`;

// Lock badge for the bottom-right slot (same geometry as cloud-lock / globe-lock).
const LOCK_BADGE_BODY = '<rect x="15" y="17.25" width="6" height="4.25" rx="1.25"/>';
const LOCK_BADGE_SHACKLE = 'M16.5 17.25V16a1.5 1.5 0 0 1 3 0v1.25';

// Keys
const KEY_RING = '<circle cx="8" cy="16" r="4.25"/>';
const KEY_SHAFT = 'M11 13 20 4m-3.5 3.5 2.5 2.5m-.25-4.75 1.75 1.75';
// Upright key used next to a person / door.
const VKEY_RING = '<circle cx="18.25" cy="7" r="2.75"/>';
const VKEY_SHAFT = 'M18.25 9.75V20.5M18.25 15.75h2.5M18.25 18.75h1.75';

// keys: two upright keys side by side, teeth facing out.
const KEYS_RINGS = '<circle cx="7.5" cy="6.25" r="2.75"/><circle cx="16.5" cy="6.25" r="2.75"/>';
const KEYS_SHAFTS = 'M7.5 9v11.5M7.5 15.5H5M7.5 18.5H5.75M16.5 9v11.5M16.5 15.5H19M16.5 18.5h1.75';

const PERSON_HEAD = '<circle cx="9" cy="8" r="3.5"/>';
const PERSON_BODY = 'M3 21c0-3.6 2.7-6.25 6-6.25s6 2.65 6 6.25';

// password / mask-data: asterisks (vertical arm + two arms at ±30°).
const ast = (x, y, r = 1.5) => {
  const dx = n(r * 0.866), dy = n(r / 2);
  return `M${x} ${n(y - r)}v${2 * r}M${n(x - dx)} ${n(y - dy)}l${2 * dx} ${2 * dy}M${n(x - dx)} ${n(y + dy)}l${2 * dx} ${-2 * dy}`;
};
const FIELD = '<rect x="3" y="6.5" width="18" height="11" rx="2.5"/>';
const PW = `${ast(7.5, 12)}${ast(13, 12)}M17.5 9.5v5`;

// fingerprint: nested arches around (12,13).
const FP = 'M3.84 9.2A9 9 0 0 1 20.16 9.2M6 18v-5a6 6 0 0 1 12 0v3M9 21v-8a3 3 0 0 1 6 0v6.5M12 13v4.5';

// face-id
const CORNERS = 'M3 7.5v-2A2.5 2.5 0 0 1 5.5 3h2M16.5 3h2A2.5 2.5 0 0 1 21 5.5v2M21 16.5v2a2.5 2.5 0 0 1-2.5 2.5h-2M7.5 21h-2A2.5 2.5 0 0 1 3 18.5v-2';
const FACE_ID = 'M9 9v1.5M15 9v1.5M9 15c.8.8 1.85 1.25 3 1.25s2.2-.45 3-1.25';

// otp: segmented code field.
const OTP_FIELD = '<rect x="3" y="7.5" width="18" height="9" rx="2.5"/>';
const OTP_DIV = 'M9 7.5v9M15 7.5v9';
const OTP_DOTS = 'M6 12h.01M12 12h.01M18 12h.01';

// Locks
const OPEN_SHACKLE = 'M7.5 11V7.5a4.5 4.5 0 0 1 8.4-2.25';
const KEYHOLE = '<circle cx="12" cy="15.25" r="1.25"/><path d="M12 16.5v1.75"/>';
const KEYHOLE_CUT = `${hole(12, 15.25, 1.75)}<path d="M12 16v2.5"/>`;
const BINARY = '<path d="M7.5 14v4M16.5 14v4"/><rect x="10.5" y="14" width="3" height="4" rx="1.5"/>';
const BINARY_CUT = '<path d="M7.5 14v4M16.5 14v4" stroke-width="1.5"/><rect x="10.5" y="14" width="3" height="4" rx="1.5" stroke-width="1.5"/>';

// safe
const SAFE_BOX = '<rect x="3" y="3" width="18" height="16" rx="2.5"/>';
const SAFE_FEET = 'M7 19v2M17 19v2';

// privacy: eye inside shield
const EYE = 'M7.5 12c1.2-2 2.75-3 4.5-3s3.3 1 4.5 3c-1.2 2-2.75 3-4.5 3s-3.3-1-4.5-3Z';

// incognito
const HAT = 'M5.5 11 7.25 5.25a1.5 1.5 0 0 1 1.95-1L12 5.25l2.8-1a1.5 1.5 0 0 1 1.95 1L18.5 11';
const GLASSES = '<circle cx="7" cy="17.25" r="3"/><circle cx="17" cy="17.25" r="3"/>';
const BRIDGE = 'M10 17.25c1.25-1 2.75-1 4 0';

// documents
const PAGE_O = `<path d="${PAGE}"/><path d="${PAGE_FOLD}"/>`;
const PAGE_CUT = `<path d="${PAGE_FOLD_CUT}" stroke-width="1.5"/>`;
const MINI_SHIELD = 'M12 10.25l3.25 1.25v2.25c0 2-1.35 3.4-3.25 4-1.9-.6-3.25-2-3.25-4V11.5Z';

// gdpr-like: ring of dots around a lock (generic, 8 dots).
const RING_DOTS = [0, 45, 90, 135, 180, 225, 270, 315].map((a) => { const [x, y] = pol(12, 12, 8.25, a); return `M${x} ${y}h.01`; }).join('');
const G_LOCK_BODY = '<rect x="8.5" y="11.5" width="7" height="5.5" rx="1.5"/>';
const G_LOCK_SHACKLE = 'M10 11.5V10a2 2 0 0 1 4 0v1.5';

// door
const DOOR = 'M3.5 21V5.5A2.5 2.5 0 0 1 6 3h4a2.5 2.5 0 0 1 2.5 2.5V21';

// verified: 8-lobed seal.
const SEAL = (() => {
  const R = 7.5, ra = 3.25;
  let d = '';
  for (let i = 0; i <= 8; i++) {
    const [x, y] = pol(12, 12, R, -90 + i * 45);
    d += i === 0 ? `M${x} ${y}` : `A${ra} ${ra} 0 0 1 ${x} ${y}`;
  }
  return d + 'Z';
})();

// certificate
const CERT = '<rect x="3" y="4" width="18" height="13" rx="2.5"/>';
const CERT_LINES = 'M7 8.5h10M7 12h4.5';
const SEAL_C = '<circle cx="16.5" cy="15.5" r="2.5"/>';
const RIBBON = 'M15.25 17.75 14.75 21l1.75-1 1.75 1-.5-3.25';
const CERT_CLEAR = `<circle cx="16.5" cy="15.5" r="2.5" fill="#000" stroke-width="4.25"/><path d="${RIBBON}" fill="#000" stroke-width="4.25"/>`;

// radar inside shield
const RADAR = 'M12 7.5a4 4 0 1 1-4 4M12 11.5 9.75 9.25';

// virus
const VIRUS_SPIKES = [0, 45, 90, 135, 180, 225, 270, 315]
  .map((a) => { const [x0, y0] = pol(12, 12, 4.75, a); const [x1, y1] = pol(12, 12, 7, a); return `M${x0} ${y0}L${x1} ${y1}`; })
  .join('');
const VIRUS_KNOBS = [0, 45, 90, 135, 180, 225, 270, 315]
  .map((a) => { const [x, y] = pol(12, 12, 8, a); return `<circle cx="${x}" cy="${y}" r="1"/>`; })
  .join('');

// bug (shared with 12-status bug-report)
const BUG_BODY = 'M12 20.75c-2.9 0-5.25-2.35-5.25-5.25v-3.25A3.5 3.5 0 0 1 10.25 8.75h3.5a3.5 3.5 0 0 1 3.5 3.5v3.25c0 2.9-2.35 5.25-5.25 5.25Z';
const BUG_HEAD = 'M9.25 8.75V8a2.75 2.75 0 0 1 5.5 0v.75';
const BUG_LEGS = 'M10.42 5.75 9 3.75M13.58 5.75 15 3.75M6.75 13H3.5M17.25 13h3.25M6.75 17l-3 1.5M17.25 17l3 1.5M7.25 10.25 5 8M16.75 10.25 19 8';
const SKULL = 'M10 13.5h.01M14 13.5h.01';

// siren
const DOME = 'M7 18v-5a5 5 0 0 1 10 0v5';
const SIREN_BASE = '<rect x="4.5" y="18" width="15" height="3" rx="1"/>';
const RAYS = 'M12 3v1.75M4.5 6.25l1.25 1.25M19.5 6.25l-1.25 1.25';

// alarm: alert disc sounding off
const pair = (cx, cy, r, h) => {
  const [lx1, ly1] = pol(cx, cy, r, 180 + h), [lx2, ly2] = pol(cx, cy, r, 180 - h);
  const [rx1, ry1] = pol(cx, cy, r, -h), [rx2, ry2] = pol(cx, cy, r, h);
  return `M${lx1} ${ly1}A${r} ${r} 0 0 0 ${lx2} ${ly2}M${rx1} ${ry1}A${r} ${r} 0 0 1 ${rx2} ${ry2}`;
};
const ALARM_WAVES = pair(12, 12, 8.5, 35);

// cctv
const CAM = '<rect x="5.5" y="5.5" width="13" height="6" rx="2" transform="rotate(20 12 8.5)"/>';
const CAM_MOUNT = 'M8.5 10.75V15.5H4M4 12.75v5.5';

// chip
const CHIP = '<rect x="5" y="5" width="14" height="14" rx="2.5"/>';
const PINS = 'M9.5 3v2M14.5 3v2M9.5 19v2M14.5 19v2M3 9.5h2M3 14.5h2M19 9.5h2M19 14.5h2';

// vpn: globe inside shield
const VPN_GLOBE = '<circle cx="12" cy="11.75" r="4.75"/><ellipse cx="12" cy="11.75" rx="1.75" ry="4.75"/><path d="M7.25 11.75h9.5"/>';
const VPN_GLOBE_CUT = '<circle cx="12" cy="11.75" r="4.75" stroke-width="1.5"/><ellipse cx="12" cy="11.75" rx="1.75" ry="4.75" stroke-width="1.5"/><path d="M7.25 11.75h9.5" stroke-width="1.5"/>';

export default {
  shield: {
    o: `<path d="${SHIELD}"/>`,
    f: `<path d="${SHIELD}"/>`,
  },

  'shield-check': {
    o: `<path d="${SHIELD}"/><path d="m8.5 12 2.5 2.5 4.5-5"/>`,
    f: `<path d="${SHIELD}"/>`,
    cut: `<path d="m8.5 12 2.5 2.5 4.5-5"/>`,
  },

  'shield-x': shieldWith('<path d="m9.5 9.5 5 5m0-5-5 5"/>'),
  'shield-alert': shieldWith('<path d="M12 8v4.5M12 15.75h.01"/>'),
  'shield-lock': shieldWith(MINI_LOCK_O, MINI_LOCK_CUT),

  // AI: hero spark is the shield's content.
  'shield-sparkle': shieldWith(`<path d="${star(12, 11.75, 4.25)}"/>`, `<path d="${star(12, 11.75, 4.25)}" fill="#000" stroke-width="1"/>`),

  'shield-off': {
    o: `<path d="${SHIELD}"/>`,
    ocut: SLASH_CLEAR,
    otop: SLASH,
    f: `<path d="${SHIELD}"/>`,
    cut: SLASH_CLEAR,
    top: SLASH,
  },

  key: {
    o: `${KEY_RING}<path d="${KEY_SHAFT}"/>`,
    f: `${KEY_RING}<path d="${KEY_SHAFT}" fill="none"/>`,
    cut: hole(8, 16, 1.75),
  },

  keys: {
    o: `${KEYS_RINGS}<path d="${KEYS_SHAFTS}"/>`,
    f: `${KEYS_RINGS}<path d="${KEYS_SHAFTS}" fill="none"/>`,
    cut: `${hole(7.5, 6.25, 1)}${hole(16.5, 6.25, 1)}`,
  },

  // Person with a key.
  passkey: {
    o: `${PERSON_HEAD}<path d="${PERSON_BODY}"/>${VKEY_RING}<path d="${VKEY_SHAFT}"/>`,
    f: `${PERSON_HEAD}<path d="${PERSON_BODY}Z"/>${VKEY_RING}<path d="${VKEY_SHAFT}" fill="none"/>`,
    cut: hole(18.25, 7, 1),
  },

  password: {
    o: `${FIELD}<path d="${PW}"/>`,
    f: FIELD,
    cut: K(PW),
  },

  fingerprint: {
    o: `<path d="${FP}"/>`,
    bold: true,
  },

  'face-id': {
    o: `<path d="${CORNERS}"/><path d="${FACE_ID}"/>`,
    bold: true,
  },

  // Phone with a check.
  'two-factor': {
    o: `${PHONE}<path d="M10.5 5.5h3"/><path d="m9.25 12.5 2 2 3.5-3.5"/>`,
    f: PHONE,
    cut: K('M10.5 5.5h3', 1.5) + K('m9.25 12.5 2 2 3.5-3.5'),
  },

  otp: {
    o: `${OTP_FIELD}<path d="${OTP_DIV}"/><path d="${OTP_DOTS}" stroke-width="2.5"/>`,
    f: OTP_FIELD,
    cut: `${K(OTP_DIV, 1.5)}${hole(6, 12, 1.25)}${hole(12, 12, 1.25)}${hole(18, 12, 1.25)}`,
  },

  'lock-keyhole': {
    o: `${LOCK_BODY}<path d="${LOCK_SHACKLE}"/>${KEYHOLE}`,
    f: LOCK_BODY,
    cut: KEYHOLE_CUT,
    top: `<path fill="none" d="${LOCK_SHACKLE}"/>`,
  },

  // Same as `lock` with the shackle swung open.
  'lock-open': {
    o: `${LOCK_BODY}<path d="${OPEN_SHACKLE}"/><path d="${star(12, 16, 2.75)}"/>`,
    f: LOCK_BODY,
    cut: `<path d="${star(12, 16, 3)}" fill="#000" stroke-width="1"/>`,
    top: `<path fill="none" d="${OPEN_SHACKLE}"/>`,
  },

  safe: {
    o: `${SAFE_BOX}<path d="${SAFE_FEET}"/><circle cx="11" cy="11" r="3.5"/><path d="M11 11h.01M17.75 9v4"/>`,
    f: `${SAFE_BOX}<path d="${SAFE_FEET}"/>`,
    cut: `<circle cx="11" cy="11" r="3.5" stroke-width="1.5"/>${hole(11, 11, 1)}${K('M17.75 9v4')}`,
  },

  // Lock with binary digits.
  encrypted: {
    o: `${LOCK_BODY}<path d="${LOCK_SHACKLE}"/>${BINARY}`,
    f: LOCK_BODY,
    cut: BINARY_CUT,
    top: `<path fill="none" d="${LOCK_SHACKLE}"/>`,
  },

  decrypt: {
    o: `${LOCK_BODY}<path d="${OPEN_SHACKLE}"/>${BINARY}`,
    f: LOCK_BODY,
    cut: BINARY_CUT,
    top: `<path fill="none" d="${OPEN_SHACKLE}"/>`,
  },

  privacy: {
    o: `<path d="${SHIELD}"/><path d="${EYE}"/><path d="M12 12h.01" stroke-width="2.5"/>`,
    f: `<path d="${SHIELD}"/>`,
    cut: `<path d="${EYE}" fill="#000" stroke-width="1"/>`,
    top: '<circle cx="12" cy="12" r="1.25" stroke="none"/>',
  },

  incognito: {
    o: `<path d="${HAT}"/><path d="M3 11h18"/>${GLASSES}<path d="${BRIDGE}"/>`,
    f: `<path d="${HAT}Z"/><path d="M3 11h18"/>${GLASSES}<path d="${BRIDGE}" fill="none"/>`,
  },

  // Text line, a masked row, a short line.
  'mask-data': {
    o: `<path d="M4 6.5h16M4 17.5h10${ast(6.5, 12)}${ast(12, 12)}${ast(17.5, 12)}"/>`,
    bold: true,
  },

  redact: {
    o: `<path d="M3.5 6h17M17.5 12h3M3.5 18h12"/><rect x="3.5" y="10" width="11" height="4" rx="1.5" fill="currentColor"/>`,
    bold: true,
  },

  consent: {
    o: `${PAGE_O}<path d="m9 14.5 2 2 4-4"/>`,
    f: `<path d="${PAGE}"/>`,
    cut: `${PAGE_CUT}${K('m9 14.5 2 2 4-4')}`,
  },

  policy: {
    o: `${PAGE_O}<path d="${MINI_SHIELD}"/>`,
    f: `<path d="${PAGE}"/>`,
    cut: `${PAGE_CUT}<path d="${MINI_SHIELD}" fill="#000" stroke-width="1"/>`,
  },

  'gdpr-like': {
    o: `<path d="${RING_DOTS}" stroke-width="2.25"/>${G_LOCK_BODY}<path d="${G_LOCK_SHACKLE}"/>`,
    f: `<path d="${RING_DOTS}" stroke-width="2.5"/>${G_LOCK_BODY}<path d="${G_LOCK_SHACKLE}" fill="none"/>`,
  },

  // List with a magnifier.
  'audit-log': {
    o: `<path d="M4 5.5h12M4 10.5h5M4 15.5h4"/><circle cx="15.5" cy="15" r="3.5"/><path d="m18 17.5 3 3"/>`,
    bold: true,
  },

  // Door with a key.
  'access-control': {
    o: `<path d="${DOOR}"/><path d="M9.75 12.5h.01" stroke-width="2.25"/>${VKEY_RING}<path d="${VKEY_SHAFT}"/>`,
    f: `<path d="${DOOR}Z"/>${VKEY_RING}<path d="${VKEY_SHAFT}" fill="none"/>`,
    cut: `${hole(9.75, 12.5, 1.1)}${hole(18.25, 7, 1)}`,
  },

  // Checklist with a lock badge.
  permissions: {
    o: `<path d="m3.5 6 1.5 1.5 3-3M11 6h9m-16.5 6 1.5 1.5 3-3M11 12h4m-11.5 6 1.5 1.5 3-3M11 18h1"/>${LOCK_BADGE_BODY}<path d="${LOCK_BADGE_SHACKLE}"/>`,
    f: `<path d="m3.5 6 1.5 1.5 3-3M11 6h9m-16.5 6 1.5 1.5 3-3M11 12h4m-11.5 6 1.5 1.5 3-3M11 18h1" fill="none" stroke-width="2.5"/>${LOCK_BADGE_BODY}<path d="${LOCK_BADGE_SHACKLE}" fill="none"/>`,
  },

  // Scalloped seal with a check.
  verified: {
    o: `<path d="${SEAL}"/><path d="m8.5 12.25 2.5 2.5 4.75-5"/>`,
    f: `<path d="${SEAL}"/>`,
    cut: K('m8.5 12.25 2.5 2.5 4.75-5'),
  },

  certificate: {
    o: `${CERT}<path d="${CERT_LINES}"/>`,
    ocut: CERT_CLEAR,
    otop: `${SEAL_C}<path d="${RIBBON}"/>`,
    f: CERT,
    cut: `${K(CERT_LINES, 1.5)}${CERT_CLEAR}`,
    top: `${SEAL_C}<path d="${RIBBON}Z"/>`,
  },

  // Shield with a radar sweep.
  'scan-security': shieldWith(`<path d="${RADAR}"/>`, K(RADAR, 1.5)),

  virus: {
    o: `<circle cx="12" cy="12" r="4.75"/><path d="${VIRUS_SPIKES}"/>${VIRUS_KNOBS}<path d="M10.5 11h.01M13.25 13.25h.01" stroke-width="2"/>`,
    f: `<circle cx="12" cy="12" r="4.75"/><path d="${VIRUS_SPIKES}"/>${VIRUS_KNOBS}`,
    cut: `${hole(10.5, 11, 1)}${hole(13.25, 13.25, 1)}`,
  },

  // Bug with skull eyes.
  malware: {
    o: `<path d="${BUG_BODY}"/><path d="${BUG_HEAD}"/><path d="${BUG_LEGS}"/><path d="${SKULL}" stroke-width="2.5"/><path d="M10.5 17.25h3"/>`,
    f: `<path d="${BUG_BODY}"/><path d="${BUG_HEAD}"/><path d="${BUG_LEGS}" fill="none"/>`,
    cut: `${hole(10, 13.5, 1.25)}${hole(14, 13.5, 1.25)}${K('M10.5 17.25h3', 1.5)}`,
  },

  // Junk mail.
  spam: {
    o: `${ENVELOPE}<path d="${ENVELOPE_FLAP}"/>`,
    ocut: BADGE_CLEAR,
    otop: `<path d="${BADGE.alert}"/>`,
    f: ENVELOPE,
    cut: `${K(ENVELOPE_FLAP, 1.5)}${BADGE_CLEAR}`,
    top: `<path d="${BADGE.alert}"/>`,
  },

  // No-entry sign.
  block: {
    o: `<circle cx="12" cy="12" r="9"/><rect x="6.5" y="10.25" width="11" height="3.5" rx="1.75"/>`,
    f: `<circle cx="12" cy="12" r="9"/>`,
    cut: '<rect x="6.5" y="10.25" width="11" height="3.5" rx="1.75" fill="#000" stroke-width=".5"/>',
  },

  ban: {
    o: `<circle cx="12" cy="12" r="9"/><path d="m5.64 5.64 12.72 12.72"/>`,
    bold: true,
  },

  'warning-shield': {
    o: `<path d="${SHIELD}"/>`,
    ocut: BADGE_CLEAR,
    otop: `<path d="${BADGE.alert}"/>`,
    f: `<path d="${SHIELD}"/>`,
    cut: BADGE_CLEAR,
    top: `<path d="${BADGE.alert}"/>`,
  },

  siren: {
    o: `<path d="${DOME}"/>${SIREN_BASE}<path d="${RAYS}"/><path d="M10 13a2 2 0 0 1 2-2"/>`,
    f: `<path d="${DOME}Z"/>${SIREN_BASE}<path d="${RAYS}" fill="none"/>`,
    cut: K('M10 13a2 2 0 0 1 2-2', 1.5),
  },

  // Alert disc sounding off.
  alarm: {
    o: `<circle cx="12" cy="12" r="5"/><path d="M12 9.5v2.75M12 14.75h.01"/><path d="${ALARM_WAVES}"/>`,
    f: `<circle cx="12" cy="12" r="5"/><path d="${ALARM_WAVES}" fill="none"/>`,
    cut: K('M12 9.5v2.5M12 14.75h.01'),
  },

  cctv: {
    o: `${CAM}<path d="${CAM_MOUNT}"/>`,
    f: `${CAM}<path d="${CAM_MOUNT}" fill="none"/>`,
  },

  // Chip with a lock.
  'token-secure': {
    o: `${CHIP}<path d="${PINS}"/>${MINI_LOCK_O}`,
    f: `${CHIP}<path d="${PINS}"/>`,
    cut: MINI_LOCK_CUT,
  },

  // Globe inside a shield.
  vpn: shieldWith(VPN_GLOBE, VPN_GLOBE_CUT),
};
