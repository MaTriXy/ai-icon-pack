import { HEAD, BODY, BADGE, BADGE_CLEAR } from '../shapes.mjs';

// ── local helpers ────────────────────────────────────────────────────────────
const n = (v) => +v.toFixed(2);
/** Solid hole for `cut` / `ocut`. */
const hole = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#000" stroke="none"/>`;

const USER_O = `${HEAD}<path d="${BODY}"/>`;
const USER_F = `${HEAD}<path d="${BODY}Z"/>`;

/** User + bottom-right badge glyph (open-path glyphs get fill="none" in the filled style). */
const userBadge = (glyphO, glyphF = glyphO) => ({
  o: USER_O,
  ocut: BADGE_CLEAR,
  otop: glyphO,
  f: USER_F,
  cut: BADGE_CLEAR,
  top: glyphF,
});
const glyph = (d) => `<path d="${d}"/>`;
const glyphOpen = (d) => `<path d="${d}" fill="none"/>`;

// Small badge glyphs (fit 14.5–21.5).
const MAG_BADGE = '<circle cx="17.25" cy="17.25" r="2.25"/><path d="m18.9 18.9 2.1 2.1"/>';
const PENCIL_BADGE = 'M14.5 21v-1.75l4.5-4.5a1.24 1.24 0 0 1 1.75 1.75l-4.5 4.5Z';
const LOCK_BADGE_BODY = '<rect x="15" y="17.25" width="6" height="4.25" rx="1.25"/>';
const LOCK_BADGE_SHACKLE = 'M16.5 17.25V16a1.5 1.5 0 0 1 3 0v1.25';
const COG_TEETH = [30, 90, 150, 210, 270, 330]
  .map((a) => {
    const t = (a * Math.PI) / 180;
    return `M${n(18 + 2.6 * Math.cos(t))} ${n(18 + 2.6 * Math.sin(t))}L${n(18 + 3 * Math.cos(t))} ${n(18 + 3 * Math.sin(t))}`;
  })
  .join('');
const COG_BADGE = `<circle cx="18" cy="18" r="1.6"/><path d="${COG_TEETH}"/>`;

// ── people inside frames ─────────────────────────────────────────────────────
const UC_SHOULDERS = 'M6.25 18.75c1.25-2 3.4-3.25 5.75-3.25s4.5 1.25 5.75 3.25';
const UC_SHOULDERS_HOLE = 'M7.28 17.5C8.4 16.1 10.1 15.25 12 15.25s3.6.85 4.72 2.25A7.25 7.25 0 0 1 7.28 17.5Z';
const US_SHOULDERS = 'M6.5 21c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5';
const US_SHOULDERS_HOLE = 'M6.75 19.25c0-2.1 2.35-3.75 5.25-3.75s5.25 1.65 5.25 3.75a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75Z';

// ── groups (front person occludes the ones behind) ───────────────────────────
// users: front person left, second person behind on the right.
const U2_FRONT_HEAD = '<circle cx="9" cy="8" r="3.5"/>';
const U2_FRONT_BODY = 'M3 21c0-3.6 2.7-6.25 6-6.25s6 2.65 6 6.25';
const U2_BACK_HEAD = '<circle cx="15.5" cy="7.5" r="3.5"/>';
const U2_BACK_BODY = 'M10 21c0-3.6 2.5-6.5 5.5-6.5S21 17.4 21 21';
const U2_CLEAR = `<circle cx="9" cy="8" r="3.5" fill="#000" stroke-width="4.25"/><path d="${U2_FRONT_BODY}Z" fill="#000" stroke-width="4.25"/>`;

// user-group: one person in front, two behind at the sides.
const G_FRONT_HEAD = '<circle cx="12" cy="7.5" r="3.25"/>';
const G_FRONT_BODY = 'M5.75 21c0-3.45 2.8-6.25 6.25-6.25s6.25 2.8 6.25 6.25';
const G_SIDES_HEADS = '<circle cx="6" cy="10.25" r="2.25"/><circle cx="18" cy="10.25" r="2.25"/>';
const G_SIDES_BODIES = 'M3 21c0-2.8 1.3-5.5 3.25-5.5 1.25 0 2.35.75 3 2M21 21c0-2.8-1.3-5.5-3.25-5.5-1.25 0-2.35.75-3 2';
const G_SIDES_BODIES_F = 'M3 21c0-2.8 1.3-5.5 3.25-5.5 1.25 0 2.35.75 3 2L9.25 21ZM21 21c0-2.8-1.3-5.5-3.25-5.5-1.25 0-2.35.75-3 2L14.75 21Z';
const G_CLEAR = `<circle cx="12" cy="7.5" r="3.25" fill="#000" stroke-width="4.25"/><path d="${G_FRONT_BODY}Z" fill="#000" stroke-width="4.25"/>`;

// team: two people in front side by side, a third peeking from behind.
const T_FRONT_HEADS = '<circle cx="7.5" cy="10.75" r="2.75"/><circle cx="16.5" cy="10.75" r="2.75"/>';
const T_FRONT_BODIES = 'M3 21c0-3 2-5.25 4.5-5.25S12 18 12 21M12 21c0-3 2-5.25 4.5-5.25S21 18 21 21';
const T_BACK_HEAD = '<circle cx="12" cy="5.25" r="2.25"/>';
const T_CLEAR = `<circle cx="7.5" cy="10.75" r="2.75" fill="#000" stroke-width="4.25"/><circle cx="16.5" cy="10.75" r="2.75" fill="#000" stroke-width="4.25"/>`;

// ── cards & books ────────────────────────────────────────────────────────────
const CONTACT_CARD = '<rect x="4" y="5" width="16" height="16" rx="2.5"/>';
const CONTACT_RINGS = 'M8.5 3v3.5M15.5 3v3.5';
const CONTACT_SHOULDERS = 'M7.5 21c0-2.5 2-4.25 4.5-4.25s4.5 1.75 4.5 4.25';

const BOOK = '<rect x="6" y="3" width="14" height="18" rx="2.5"/>';
const BOOK_TABS = 'M3.5 7.5H6M3.5 12H6M3.5 16.5H6';
const BOOK_SHOULDERS = 'M9 17.75c.7-1.9 2.2-3 4-3s3.3 1.1 4 3Z';

const ID_CARD = '<rect x="3" y="5" width="18" height="14" rx="2.5"/>';
const ID_SHOULDERS = 'M5 19c0-2.2 1.6-4 3.5-4s3.5 1.8 3.5 4';
const ID_LINES = 'M15 10h3M15 14h3';

const BADGE_CARD = '<rect x="5" y="5" width="14" height="16" rx="2.5"/>';
const BADGE_CLIP = 'M9.5 5v-.75A1.25 1.25 0 0 1 10.75 3h2.5a1.25 1.25 0 0 1 1.25 1.25V5';
const BADGE_SHOULDERS = 'M8.25 18c.6-1.8 2-3 3.75-3s3.15 1.2 3.75 3Z';

const PROFILE_CARD = '<rect x="4" y="3" width="16" height="18" rx="2.5"/>';
const PROFILE_SHOULDERS = 'M8.75 15c.5-1.25 1.75-2 3.25-2s2.75.75 3.25 2Z';

// ── faces ────────────────────────────────────────────────────────────────────
const FACE = '<circle cx="12" cy="12" r="9"/>';
const EYES = 'M9 9.75h.01M15 9.75h.01';
const EYE_HOLES = hole(9, 9.75, 1.25) + hole(15, 9.75, 1.25);
const face = (detailO, detailCut = detailO) => ({
  o: `${FACE}${detailO}`,
  f: FACE,
  cut: detailCut,
});
const eyes = `<path d="${EYES}" stroke-width="2.25"/>`;

// ── misc ─────────────────────────────────────────────────────────────────────
const CROWN = 'M3.5 7.5 7.5 11 12 4.5l4.5 6.5 4-3.5-1.75 9.5H5.25Z';
const SHIELD_BADGE = 'M18 14.75l2.75 1v2c0 1.85-1.15 3.1-2.75 3.75-1.6-.65-2.75-1.9-2.75-3.75v-2Z';
const ENV_BADGE = '<rect x="14.75" y="15.5" width="6.5" height="5" rx="1.25"/>';
const ENV_BADGE_FLAP = 'm15.5 16.5 2.5 1.75 2.5-1.75';

// guest: user drawn with a dashed stroke.
const DASH_HEAD = (w, da) => `<circle cx="12" cy="7.5" r="4" pathLength="24" stroke-dasharray="${da}" stroke-dashoffset="1.25" stroke-width="${w}" fill="none"/>`;
const DASH_BODY = (w, da) => `<path d="${BODY}" pathLength="20.5" stroke-dasharray="${da}" stroke-width="${w}" fill="none"/>`;

// organization: building with a person in front.
const BUILDING = '<rect x="3" y="3" width="11" height="18" rx="2"/>';
const WINDOWS = 'M6.5 7h.01M10.5 7h.01M6.5 11h.01M10.5 11h.01M6.5 15h.01';
const ORG_HEAD = '<circle cx="17" cy="11" r="2.25"/>';
const ORG_BODY = 'M13 21c0-2.6 1.8-4.75 4-4.75s4 2.15 4 4.75';
const ORG_CLEAR = `<circle cx="17" cy="11" r="2.25" fill="#000" stroke-width="4.25"/><path d="${ORG_BODY}Z" fill="#000" stroke-width="4.25"/>`;

// handshake
const HS_CUFFS = 'M3 8v8M21 8v8';
const HS_TOP = 'M21 9.5h-3.25l-3.4-2.1a2 2 0 0 0-2.1 0L8.6 9.75a1.4 1.4 0 0 0 1.5 2.35l2.9-1.6 4.5 4.25H21';
const HS_BOTTOM = 'M3 14.5h2.75l4 3.75a1.3 1.3 0 0 0 1.85-1.85M9.6 15.4l2.65 2.5a1.3 1.3 0 0 0 1.85-1.85l-.75-.7M12.1 14.25l2.2 2.05a1.3 1.3 0 0 0 1.85-1.85M3 9.5h3.5l2.5-1.5';

// wave: open hand, tilted, with motion lines.
const HAND =
  'M7 13.5V7a1.5 1.5 0 0 1 3 0V5a1.5 1.5 0 0 1 3 0v1a1.5 1.5 0 0 1 3 0v2.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7h-.5a6 6 0 0 1-4.6-2.15L3.8 15.25a1.6 1.6 0 0 1 2.4-2.1L7 14Z';
const HAND_FINGERS = 'M10 7v4.5M13 6v5M16 8.5v3.5';

// follow: person on the left, check mark on the right.
const F_HEAD = '<circle cx="9" cy="8" r="3.5"/>';
const F_BODY = 'M3 21c0-3.6 2.7-6.25 6-6.25s6 2.65 6 6.25';
const F_CHECK = 'm15 10.5 2 2 3.75-3.75';

// community: three people seen from above, around a circle.
const pol = (r, deg) => {
  const t = (deg * Math.PI) / 180;
  return [n(12 + r * Math.cos(t)), n(12 + r * Math.sin(t))];
};
const COMM_HEADS = [-90, 30, 150].map((a) => { const [x, y] = pol(3.75, a); return `<circle cx="${x}" cy="${y}" r="1.75"/>`; }).join('');
const COMM_ARCS = [-90, 30, 150]
  .map((a) => {
    const [hx, hy] = pol(3.75, a);
    const p = (d) => { const t = (d * Math.PI) / 180; return `${n(hx + 4.5 * Math.cos(t))} ${n(hy + 4.5 * Math.sin(t))}`; };
    return `M${p(a - 60)}A4.5 4.5 0 0 1 ${p(a + 60)}`;
  })
  .join('');

// figures (stick people)
const figure = (head, limbs) => ({
  o: `${head}<path d="${limbs}"/>`,
  f: `${head}<path d="${limbs}" fill="none" stroke-width="2.5"/>`,
});

export default {
  user: {
    o: `<circle cx="12" cy="7.5" r="4"/><path d="M4 21c0-3.9 3.6-7 8-7s8 3.1 8 7"/>`,
    f: `<circle cx="12" cy="7.5" r="4"/><path d="M4 21c0-3.9 3.6-7 8-7s8 3.1 8 7Z"/>`,
  },

  'user-circle': {
    o: `<circle cx="12" cy="12" r="9"/><circle cx="12" cy="9.5" r="3"/><path d="${UC_SHOULDERS}"/>`,
    f: `<circle cx="12" cy="12" r="9"/>`,
    cut: `${hole(12, 9.5, 3.25)}<path d="${UC_SHOULDERS_HOLE}" fill="#000" stroke="none"/>`,
  },

  'user-square': {
    o: `<rect x="3" y="3" width="18" height="18" rx="2.5"/><circle cx="12" cy="9.5" r="3"/><path d="${US_SHOULDERS}"/>`,
    f: `<rect x="3" y="3" width="18" height="18" rx="2.5"/>`,
    cut: `${hole(12, 9.5, 3.25)}<path d="${US_SHOULDERS_HOLE}" fill="#000" stroke="none"/>`,
  },

  users: {
    o: `${U2_BACK_HEAD}<path d="${U2_BACK_BODY}"/>`,
    ocut: U2_CLEAR,
    otop: `${U2_FRONT_HEAD}<path d="${U2_FRONT_BODY}"/>`,
    f: `${U2_BACK_HEAD}<path d="${U2_BACK_BODY}Z"/>`,
    cut: U2_CLEAR,
    top: `${U2_FRONT_HEAD}<path d="${U2_FRONT_BODY}Z"/>`,
  },

  'user-plus': userBadge(glyph(BADGE.plus)),
  'user-minus': userBadge(glyph(BADGE.minus)),
  'user-x': userBadge(glyph(BADGE.x)),
  'user-check': userBadge(glyph(BADGE.check), glyphOpen(BADGE.check)),
  'user-search': userBadge(MAG_BADGE, MAG_BADGE.replace('<circle ', '<circle fill="none" ')),
  'user-edit': userBadge(glyph(PENCIL_BADGE)),
  'user-lock': userBadge(
    `${LOCK_BADGE_BODY}<path d="${LOCK_BADGE_SHACKLE}"/>`,
    `${LOCK_BADGE_BODY}<path d="${LOCK_BADGE_SHACKLE}" fill="none"/>`,
  ),
  'user-cog': userBadge(COG_BADGE, `<circle cx="18" cy="18" r="1.6" fill="none"/><path d="${COG_TEETH}"/>`),

  // AI: hero spark in the badge slot.
  'user-sparkle': userBadge(glyph(BADGE.spark)),

  'user-group': {
    o: `${G_SIDES_HEADS}<path d="${G_SIDES_BODIES}"/>`,
    ocut: G_CLEAR,
    otop: `${G_FRONT_HEAD}<path d="${G_FRONT_BODY}"/>`,
    f: `${G_SIDES_HEADS}<path d="${G_SIDES_BODIES_F}"/>`,
    cut: G_CLEAR,
    top: `${G_FRONT_HEAD}<path d="${G_FRONT_BODY}Z"/>`,
  },

  team: {
    o: `${T_BACK_HEAD}`,
    ocut: T_CLEAR,
    otop: `${T_FRONT_HEADS}<path d="${T_FRONT_BODIES}"/>`,
    f: `${T_BACK_HEAD}`,
    cut: T_CLEAR,
    top: `${T_FRONT_HEADS}<path d="${T_FRONT_BODIES}Z"/>`,
  },

  // Address card on a two-ring rolodex.
  contact: {
    o: `${CONTACT_CARD}<path d="${CONTACT_RINGS}"/><circle cx="12" cy="11.25" r="2.5"/><path d="${CONTACT_SHOULDERS}"/>`,
    f: `${CONTACT_CARD}<path d="${CONTACT_RINGS}"/>`,
    cut: `${hole(12, 11.25, 2.75)}<path d="M7.75 19.5c.3-2 2.1-3.25 4.25-3.25s3.95 1.25 4.25 3.25Z" fill="#000" stroke="none"/>`,
  },

  // Address book with index tabs.
  contacts: {
    o: `${BOOK}<path d="${BOOK_TABS}"/><circle cx="13" cy="9.5" r="2.25"/><path d="${BOOK_SHOULDERS}"/>`,
    f: `${BOOK}<path d="${BOOK_TABS}"/>`,
    cut: `${hole(13, 9.5, 2.5)}<path d="${BOOK_SHOULDERS}" fill="#000" stroke-width="1"/>`,
  },

  'id-card': {
    o: `${ID_CARD}<circle cx="8.5" cy="10" r="2"/><path d="${ID_SHOULDERS}"/><path d="${ID_LINES}"/>`,
    f: ID_CARD,
    cut: `${hole(8.5, 10, 2.25)}<path d="M5.25 17.75c.25-1.6 1.6-2.75 3.25-2.75s3 1.15 3.25 2.75Z" fill="#000" stroke="none"/><path d="${ID_LINES}"/>`,
  },

  // Lanyard badge with a clip.
  badge: {
    o: `${BADGE_CARD}<path d="${BADGE_CLIP}"/><circle cx="12" cy="10" r="2"/><path d="${BADGE_SHOULDERS}"/>`,
    f: `${BADGE_CARD}<path d="${BADGE_CLIP}"/>`,
    cut: `${hole(12, 10, 2.25)}<path d="${BADGE_SHOULDERS}" fill="#000" stroke-width="1"/>`,
  },

  // Circle portrait with a status dot.
  avatar: {
    o: `<circle cx="12" cy="12" r="9"/><circle cx="12" cy="9.5" r="3"/><path d="${UC_SHOULDERS}"/>`,
    ocut: '<circle cx="18.5" cy="18.5" r="2.25" fill="#000" stroke-width="4.25"/>',
    otop: '<circle cx="18.5" cy="18.5" r="2.25"/>',
    f: `<circle cx="12" cy="12" r="9"/>`,
    cut: `${hole(12, 9.5, 3.25)}<path d="${UC_SHOULDERS_HOLE}" fill="#000" stroke="none"/><circle cx="18.5" cy="18.5" r="2.25" fill="#000" stroke-width="4.25"/>`,
    top: '<circle cx="18.5" cy="18.5" r="2.25"/>',
  },

  // Profile page: portrait above a text line.
  profile: {
    o: `${PROFILE_CARD}<circle cx="12" cy="8" r="2"/><path d="${PROFILE_SHOULDERS}"/><path d="M8.5 18h7"/>`,
    f: PROFILE_CARD,
    cut: `${hole(12, 8, 2.25)}<path d="${PROFILE_SHOULDERS}" fill="#000" stroke-width="1"/><path d="M8.5 18h7"/>`,
  },

  'face-smile': face(`${eyes}<path d="M8.5 14.5c.8 1.25 2.1 2 3.5 2s2.7-.75 3.5-2"/>`, `${EYE_HOLES}<path d="M8.5 14.5c.8 1.25 2.1 2 3.5 2s2.7-.75 3.5-2"/>`),
  'face-neutral': face(`${eyes}<path d="M9 15h6"/>`, `${EYE_HOLES}<path d="M9 15h6"/>`),
  'face-sad': face(`${eyes}<path d="M8.5 16.5c.8-1.25 2.1-2 3.5-2s2.7.75 3.5 2"/>`, `${EYE_HOLES}<path d="M8.5 16.5c.8-1.25 2.1-2 3.5-2s2.7.75 3.5 2"/>`),
  'face-angry': face('<path d="m7.75 9 2.75 1.25M16.25 9l-2.75 1.25M8.5 16.5c.8-1.25 2.1-2 3.5-2s2.7.75 3.5 2"/>'),
  'face-surprised': face(`${eyes}<circle cx="12" cy="15.5" r="1.75"/>`, `${EYE_HOLES}<circle cx="12" cy="15.5" r="1.75" fill="#000"/>`),
  'face-wink': face(
    `<path d="M15 9.75h.01" stroke-width="2.25"/><path d="M7.75 10c.6-.65 1.9-.65 2.5 0M8.5 14.5c.8 1.25 2.1 2 3.5 2s2.7-.75 3.5-2"/>`,
    `${hole(15, 9.75, 1.25)}<path d="M7.75 10c.6-.65 1.9-.65 2.5 0M8.5 14.5c.8 1.25 2.1 2 3.5 2s2.7-.75 3.5-2"/>`,
  ),
  'face-thinking': face(`${eyes}<path d="m13.75 6.75 2.5-.75M9.5 15.5h5"/>`, `${EYE_HOLES}<path d="m13.75 6.75 2.5-.75M9.5 15.5h5"/>`),

  crown: {
    o: `<path d="${CROWN}"/><path d="M5.5 20h13"/>`,
    f: `<path d="${CROWN}"/><path d="M5.5 20h13"/>`,
  },

  // Person with a shield badge.
  role: userBadge(glyph(SHIELD_BADGE)),

  guest: {
    o: `${DASH_HEAD(1.75, '2.5 3.5')}${DASH_BODY(1.75, '2.5 3.5')}`,
    f: `${DASH_HEAD(2.5, '2.5 3.5')}${DASH_BODY(2.5, '2.5 3.5')}`,
  },

  organization: {
    o: `${BUILDING}<path d="${WINDOWS}" stroke-width="2"/>`,
    ocut: ORG_CLEAR,
    otop: `${ORG_HEAD}<path d="${ORG_BODY}"/>`,
    f: BUILDING,
    cut: `${ORG_CLEAR}<path d="${WINDOWS}" stroke-width="2"/>`,
    top: `${ORG_HEAD}<path d="${ORG_BODY}Z"/>`,
  },

  handshake: {
    o: `<path d="${HS_CUFFS}"/><path d="${HS_TOP}"/><path d="${HS_BOTTOM}"/>`,
    f: `<path d="${HS_CUFFS}" stroke-width="2.25"/><path d="${HS_TOP}" fill="none" stroke-width="2.25"/><path d="${HS_BOTTOM}" fill="none" stroke-width="2.25"/>`,
  },

  wave: {
    o: `<g transform="rotate(-12 12 12)"><path d="${HAND}"/><path d="${HAND_FINGERS}"/></g><path d="M19.5 3.5c.9.7 1.45 1.6 1.6 2.75M3.5 20.5c-.5-.35-.75-.85-.6-1.5"/>`,
    f: `<path transform="rotate(-12 12 12)" d="${HAND}"/><path d="M19.5 3.5c.9.7 1.45 1.6 1.6 2.75M3.5 20.5c-.5-.35-.75-.85-.6-1.5" fill="none"/>`,
    cut: `<path transform="rotate(-12 12 12)" d="${HAND_FINGERS}" stroke-width="1.5"/>`,
  },

  // Person with a small envelope.
  invite: userBadge(
    `${ENV_BADGE}<path d="${ENV_BADGE_FLAP}"/>`,
    `${ENV_BADGE.replace('<rect ', '<rect fill="none" ')}<path d="${ENV_BADGE_FLAP}" fill="none"/>`,
  ),

  follow: {
    o: `${F_HEAD}<path d="${F_BODY}"/><path d="${F_CHECK}"/>`,
    f: `${F_HEAD}<path d="${F_BODY}Z"/><path d="${F_CHECK}" fill="none"/>`,
  },

  community: {
    o: `${COMM_HEADS}<path d="${COMM_ARCS}"/>`,
    f: `${COMM_HEADS}<path d="${COMM_ARCS}" fill="none" stroke-width="2.5"/>`,
  },

  // Universal access figure.
  accessibility: {
    o: `<circle cx="12" cy="12" r="9"/><circle cx="12" cy="7.25" r="1.25"/><path d="M7.5 10.5 12 11.25l4.5-.75M12 11.25v3.25M10.25 17.75 12 14.5l1.75 3.25"/>`,
    f: `<circle cx="12" cy="12" r="9"/>`,
    cut: `${hole(12, 7.25, 1.75)}<path d="M7.5 10.5 12 11.25l4.5-.75M12 11.25v3.25M10.25 17.75 12 14.5l1.75 3.25"/>`,
  },

  baby: {
    o: `<circle cx="12" cy="13.5" r="7.5"/><path d="M12 6c-1 0-1.75-.65-1.75-1.4s.7-1.35 1.6-1.35"/><path d="M9.25 12.5h.01M14.75 12.5h.01" stroke-width="2.25"/><path d="M10.25 16.25c1 .75 2.5.75 3.5 0"/>`,
    f: `<circle cx="12" cy="13.5" r="7.5"/><path d="M12 6c-1 0-1.75-.65-1.75-1.4s.7-1.35 1.6-1.35" fill="none"/>`,
    cut: `${hole(9.25, 12.5, 1.25)}${hole(14.75, 12.5, 1.25)}<path d="M10.25 16.25c1 .75 2.5.75 3.5 0"/>`,
  },

  // Small figure with arms raised.
  child: figure('<circle cx="12" cy="6.25" r="3"/>', 'M7.25 10.25 12 12.75l4.75-2.5M12 12.75V16M9.75 20.5 12 16l2.25 4.5'),

  'person-standing': figure('<circle cx="12" cy="4.75" r="1.75"/>', 'M7.5 11 12 10l4.5 1M12 10v4.75M9.25 20.75 12 14.75l2.75 6'),
  'person-walking': figure(
    '<circle cx="13.5" cy="4.75" r="1.75"/>',
    'M12.25 9.25 11 14.5l-2.25 3-1.5 3.5M11 14.5l3 2.75.5 3.75M12.25 9.25 9.5 11 8 13.25M12.25 9.25l2.25 2.5 2.5.5',
  ),
  'person-running': figure(
    '<circle cx="15" cy="4.9" r="1.75"/>',
    'M13.25 9.15 11 13.9l3.5 2.25-.75 4.75M11 13.9l-2.25 3.5-4.25.5M13.25 9.15 16 11.65l3-.25M13.25 9.15l-3.5.25-2.25 2.5',
  ),
};
