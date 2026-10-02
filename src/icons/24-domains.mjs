import { star, PAGE, PAGE_FOLD, PAGE_FOLD_CUT, HOUSE, BUBBLE, SHIELD, HEAD, BODY, GEAR, BADGE_CLEAR } from '../shapes.mjs';

// Domains & use cases: topic tiles in an AI app ("What do you want help with?").
// Warm, characterful objects. Accent sparks only where a natural detail allows (learn, storytelling, marketing, brainstorm).

const n2 = (v) => +v.toFixed(2);

// Heart from 04-actions (full size) and a small heart for use inside other objects.
const HEART = 'M12 20S3 14.5 3 8.8a4.8 4.8 0 0 1 9-2.3 4.8 4.8 0 0 1 9 2.3C21 14.5 12 20 12 20Z';
const smallHeart = (cx, cy) =>
  `M${cx} ${n2(cy + 3.25)}s-3.5-2-3.5-4.5a1.9 1.9 0 0 1 3.5-1 1.9 1.9 0 0 1 3.5 1c0 2.5-3.5 4.5-3.5 4.5Z`;

// Head in profile, facing right (mental-health, philosophy).
const PROFILE = 'M8.5 21v-3.25C5.8 16.4 4 13.6 4 10.5 4 6.4 7.4 3 11.75 3 15.9 3 19 6 19 9.75l1.6 3c.3.6-.1 1.25-.75 1.25H19v2.25a2 2 0 0 1-2 2h-2.25V21';
const PROFILE_FILL = `${PROFILE}Z`;

const BOOK_OPEN = 'M12 7c-1.5-1.5-4-2.5-9-2.5v13c5 0 7.5 1 9 2.5 1.5-1.5 4-2.5 9-2.5v-13c-5 0-7.5 1-9 2.5Z';
const BOOK = 'M5 18.5v-13A2.5 2.5 0 0 1 7.5 3H19v18H7.5a2.5 2.5 0 0 1 0-5H19';
const BOOK_FILL = 'M5 18.5v-13A2.5 2.5 0 0 1 7.5 3H19v18H7.5A2.5 2.5 0 0 1 5 18.5Z';

const CAP = 'M12 5.5l9 4.5-9 4.5-9-4.5Z';
const CAP_BAND = 'M6.5 12.25V16c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3v-3.75';

const CARD_BACK = 'M7 8.5V6a2.5 2.5 0 0 1 2.5-2.5h9A2.5 2.5 0 0 1 21 6v8a2.5 2.5 0 0 1-2.5 2.5H17';
const CARD_FRONT = '<rect x="3" y="8.5" width="14" height="12" rx="2.5"/>';

// Microscope: base, stage, arm and a tilted tube.
const SCOPE_LINES = 'M4 21h16M6 16.5h6.5M14.5 20.5a5.5 5.5 0 0 0-.75-10.95M11.6 12.9l.9 1.6';
const SCOPE_TUBE = '<rect x="8.25" y="3.4" width="4" height="9" rx="1.25" transform="rotate(-28 10.25 7.9)"/>';

const BEAKER = 'M5.5 3.5h13M7 3.5v15A2.5 2.5 0 0 0 9.5 21h5a2.5 2.5 0 0 0 2.5-2.5v-15';
const BEAKER_FILL = 'M7 3.5v15A2.5 2.5 0 0 0 9.5 21h5a2.5 2.5 0 0 0 2.5-2.5v-15Z';

const STETHO = 'M5.5 3H5a1.5 1.5 0 0 0-1.5 1.5V9a5 5 0 0 0 10 0V4.5A1.5 1.5 0 0 0 12 3h-.5M8.5 14v1.5a5.13 5.13 0 0 0 10.25 0V13';

const CAPSULE = 'M8.25 6.75a3.75 3.75 0 0 1 7.5 0v10.5a3.75 3.75 0 0 1-7.5 0Z';
const CAPSULE_HALF = 'M8.25 12V6.75a3.75 3.75 0 0 1 7.5 0V12Z';

const DUMBBELL = '<rect x="5.5" y="6.5" width="3" height="11" rx="1.25"/><rect x="15.5" y="6.5" width="3" height="11" rx="1.25"/><rect x="3" y="9" width="2.5" height="6" rx="1"/><rect x="18.5" y="9" width="2.5" height="6" rx="1"/>';

const APPLE = 'M12 7.5c-1.5-1-3.5-1.25-5-.5-2.5 1.25-3 4-2.5 6.75.5 3 2.5 6.75 5 6.75 1 0 1.5-.5 2.5-.5s1.5.5 2.5.5c2.5 0 4.5-3.75 5-6.75.5-2.75 0-5.5-2.5-6.75-1.5-.75-3.5-.5-5 .5Z';

const GAVEL_HEAD = '<rect x="8.25" y="6.5" width="11" height="5" rx="1.5" transform="rotate(45 13.75 9)"/>';

const MEGAPHONE = 'M5 8.5h2l6-3.75v14L7 15H5a1.5 1.5 0 0 1-1.5-1.5V10A1.5 1.5 0 0 1 5 8.5Z';

const TAG_BADGE = 'M14.75 15.6v2.1l3 3a.75.75 0 0 0 1.06 0l1.94-1.94a.75.75 0 0 0 0-1.06l-3-3h-2.1a.9.9 0 0 0-.9.9Z';
const PENCIL_BADGE = 'M14.75 21v-2l3.6-3.6a1.41 1.41 0 0 1 2 2L16.75 21Z';
const MAGNIFIER_BADGE = '<circle cx="17.25" cy="17.25" r="2.5"/><path d="m19.1 19.1 1.9 1.9"/>';
const CURSOR_BADGE = 'M15 15l5.75 2.25-2.5 1-1 2.5Z';
const ARROW_BADGE = 'M15.5 20.5l5-5M17 15.5h3.5V19';

const CAMERA_BODY = 'M5.5 6.5h2.75l1.2-1.95a1 1 0 0 1 .85-.55h3.4a1 1 0 0 1 .85.55l1.2 1.95h2.75A2.5 2.5 0 0 1 21 9v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18V9a2.5 2.5 0 0 1 2.5-2.5Z';

const CONTROLLER = 'M8 6.5h8a3.75 3.75 0 0 1 3.65 2.9l.95 4.4a2.6 2.6 0 0 1-4.45 2.3l-1.4-1.35h-5.5l-1.4 1.35a2.6 2.6 0 0 1-4.45-2.3l.95-4.4A3.75 3.75 0 0 1 8 6.5Z';

// Chef hat: three puffs (circles at (7.25,10.25) r3.75, (12,7.5) r4.25, (16.75,10.25) r3.75) over a band.
const CHEF_HAT = 'M7.25 14A3.75 3.75 0 0 1 7.86 6.55A4.25 4.25 0 0 1 16.14 6.55A3.75 3.75 0 0 1 16.75 14v4.5a2.5 2.5 0 0 1-2.5 2.5h-4.5a2.5 2.5 0 0 1-2.5-2.5Z';

const MUG = 'M4 9h12v6.5a4.5 4.5 0 0 1-4.5 4.5h-3A4.5 4.5 0 0 1 4 15.5Z';

const SUITCASE = '<rect x="3" y="8" width="18" height="12.5" rx="2.5"/>';

// Cosy cottage with chimney (distinct from the plain HOUSE used by `home`).
const COTTAGE = 'M3 11.5 12 4l9 7.5M5.5 9.4V19a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V9.4M15.5 6.9V4.75a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75V9.4';
const COTTAGE_FILL = 'M3 11.5 12 4l3.5 2.92V4.75a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v4.67L21 11.5l-2.5-2.08V19a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2V9.42Z';

const CAT = 'M4.5 13.5c0-1.9.5-3.4 1.4-4.6L5.5 4.5l4 2.4a8.5 8.5 0 0 1 5 0l4-2.4-.4 4.4c.9 1.2 1.4 2.7 1.4 4.6 0 4.1-3.4 6.5-7.5 6.5s-7.5-2.4-7.5-6.5Z';

const HANGER = 'M10 6.5a2 2 0 1 1 2 2V10M12 10 3.6 16.4c-.9.7-.4 2.1.75 2.1h15.3c1.15 0 1.65-1.4.75-2.1L12 10';

const PALETTE = 'M12 3a9 9 0 0 0 0 18c1.1 0 1.75-.75 1.75-1.75 0-.5-.2-.9-.5-1.25s-.5-.75-.5-1.25c0-1 .75-1.75 1.75-1.75h2A4.5 4.5 0 0 0 21 11.5C21 6.8 17 3 12 3Z';
const PALETTE_DOTS = 'M7.5 12h.01M9 7.75h.01M13.75 6.75h.01M17.25 9.5h.01';

const FLAME_SMALL = 'M12 3c1.5 1.6 2.25 2.75 2.25 3.9a2.25 2.25 0 0 1-4.5 0C9.75 5.75 10.5 4.6 12 3Z';

const BULB = 'M9.5 17.5v-1c0-1.1-.6-2.1-1.4-2.9a5.25 5.25 0 1 1 7.8 0c-.8.8-1.4 1.8-1.4 2.9v1Z';

const KNIGHT = 'M7.5 18c0-3 1.5-4.75 3.5-7.25l-3.6 1.4a1.3 1.3 0 0 1-1.6-1.8L8 7.5C9 5.25 11 3.75 13.5 3.75c3 0 5 2.75 5 6.75V18';

const BAG = 'M5 8h14l-.9 10.6a2.5 2.5 0 0 1-2.5 2.4H8.4a2.5 2.5 0 0 1-2.5-2.4Z';

const HEADSET = 'M4 12a8 8 0 0 1 16 0M4 12h2a2 2 0 0 1 2 2v2.5a2 2 0 0 1-2 2h-.5A1.5 1.5 0 0 1 4 17Zm16 0h-2a2 2 0 0 0-2 2v2.5a2 2 0 0 0 2 2h.5A1.5 1.5 0 0 0 20 17Zm0 5v.5a3 3 0 0 1-3 3h-3.5';

// Gear scaled down for `engineering`.
const GS = 0.6, GX = 12, GY = 8.75;
const smallGear = (attrs = '', w = 1.75) =>
  `<path transform="translate(${n2(GX - 12 * GS)} ${n2(GY - 12 * GS)}) scale(${GS})" stroke-width="${n2(w / GS)}" d="${GEAR}"${attrs}/>`;
const RULER = '<rect x="3" y="17.5" width="18" height="3.5" rx="1"/>';
const RULER_TICKS = 'M7 17.5V19M10.5 17.5v2M14 17.5V19M17.5 17.5v2';

export default {
  education: {
    o: `<path d="${CAP}"/><path d="${CAP_BAND}"/><path d="M21 10v5"/>`,
    f: `<path d="${CAP}"/><path d="${CAP_BAND}Z"/>`,
    cut: `<path d="M3 10l9 4.5 9-4.5" stroke-width="1.5"/>`,
    top: `<path d="M21 10v5"/>`,
  },

  // Open book; the spark sits on the right-hand page.
  learn: {
    o: `<path d="${BOOK_OPEN}"/><path d="M12 7v13M6 9.25h3M6 12.75h3"/><path d="${star(16.5, 11.75, 2.5)}"/>`,
    f: `<path d="${BOOK_OPEN}"/>`,
    cut: `<path d="M12 7v13M6 9.25h3M6 12.75h3" stroke-width="1.5"/><path d="${star(16.5, 11.75, 2.75)}" fill="#000" stroke-width="1"/>`,
  },

  quiz: {
    o: `<rect x="4" y="3" width="16" height="18" rx="2.5"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17h.01"/>`,
    f: `<rect x="4" y="3" width="16" height="18" rx="2.5"/>`,
    cut: `<path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6" stroke-width="2"/><path d="M12 17h.01" stroke-width="2.25"/>`,
  },

  flashcards: {
    o: `<path d="${CARD_BACK}"/>${CARD_FRONT}<path d="M7 13h6M7 16.5h3.5"/>`,
    f: `<path d="${CARD_BACK}Z"/>${CARD_FRONT}`,
    cut: `<rect x="3" y="8.5" width="14" height="12" rx="2.5" stroke-width="4.25"/><rect x="3" y="8.5" width="14" height="12" rx="2.5" fill="#fff" stroke="#fff"/><path d="M7 13h6M7 16.5h3.5" stroke-width="1.5"/>`,
  },

  // Microscope.
  research: {
    o: `<path d="${SCOPE_LINES}"/>${SCOPE_TUBE}`,
    f: `<path fill="none" d="${SCOPE_LINES}"/>${SCOPE_TUBE}`,
  },

  // Beaker with bubbling liquid (the atom is the `atom` glyph in Misc).
  science: {
    o: `<path d="${BEAKER}"/><path d="M7 11.5c1.75-1 3.25-1 5 0s3.25 1 5 0"/><circle cx="10.25" cy="16.75" r="1.25"/><path d="M14 14.75h.01"/>`,
    f: `<path fill="none" d="${BEAKER}"/><path d="M7 11.5c1.75-1 3.25-1 5 0s3.25 1 5 0v7a2.5 2.5 0 0 1-2.5 2.5h-5A2.5 2.5 0 0 1 7 18.5Z"/>`,
    cut: `<circle cx="10.25" cy="16.75" r="1.5" fill="#000" stroke="none"/><path d="M14 14.75h.01" stroke-width="2"/>`,
  },

  dna: {
    o: `<path d="M8 3.5c0 4.25 8 4.25 8 8.5s-8 4.25-8 8.5M16 3.5c0 4.25-8 4.25-8 8.5s8 4.25 8 8.5M8.75 5.5h6.5M8 12h8M8.75 18.5h6.5"/>`,
    bold: true,
  },

  health: {
    o: `<path d="${HEART}"/><path d="M12 9.5v4.5M9.75 11.75h4.5"/>`,
    f: `<path d="${HEART}"/>`,
    cut: `<path d="M12 9.25v5M9.5 11.75h5" stroke-width="2"/>`,
  },

  // Stethoscope.
  medical: {
    o: `<path d="${STETHO}"/><circle cx="18.75" cy="11" r="2"/>`,
    f: `<path fill="none" d="${STETHO}"/><circle cx="18.75" cy="11" r="2"/>`,
  },

  pill: {
    o: `<g transform="rotate(45 12 12)"><path d="${CAPSULE}"/><path d="M8.25 12h7.5"/></g>`,
    f: `<g transform="rotate(45 12 12)"><path fill="none" d="${CAPSULE}"/><path d="${CAPSULE_HALF}"/></g>`,
  },

  fitness: {
    o: `${DUMBBELL}<path d="M8.5 12h7"/>`,
    f: `${DUMBBELL}<path d="M8.5 12h7"/>`,
  },

  nutrition: {
    o: `<path d="${APPLE}"/><path d="M12 7.5c0-1.5.5-3 1.5-4M13 6c.5-1.5 1.75-2.5 3.75-2.5 0 1.75-1.5 2.75-3.75 2.5"/>`,
    f: `<path d="${APPLE}"/><path fill="none" d="M12 7.5c0-1.5.5-3 1.5-4"/><path d="M13 6c.5-1.5 1.75-2.5 3.75-2.5 0 1.75-1.5 2.75-3.75 2.5Z"/>`,
    cut: `<path d="M8 10.5c-1 .75-1.5 2-1.25 3.5" stroke-width="1.5"/>`,
  },

  // Head in profile with a heart for a mind.
  'mental-health': {
    o: `<path d="${PROFILE}"/><path d="${smallHeart(11.25, 10)}"/>`,
    f: `<path d="${PROFILE_FILL}"/>`,
    cut: `<path d="${smallHeart(11.25, 10)}" fill="#000" stroke-width="1"/>`,
  },

  // Gavel on a sound block.
  legal: {
    o: `${GAVEL_HEAD}<path d="M11.98 10.77 4.5 18.25"/><rect x="12.5" y="18" width="8.5" height="3" rx="1"/>`,
    f: `${GAVEL_HEAD}<path d="M11.98 10.77 4.5 18.25"/><rect x="12.5" y="18" width="8.5" height="3" rx="1"/>`,
  },

  // Document with a signature.
  contract: {
    o: `<path d="${PAGE}"/><path d="${PAGE_FOLD}"/><path d="M8.5 8.5h2.5M8.5 12h7M8 17.25c.75-1.5 1.5-2.25 2-1.75s-.5 2.25.25 2.25c.75 0 1.25-1.5 2-1.5s.75 1 1.5 1H16"/>`,
    f: `<path d="${PAGE}"/>`,
    cut: `<path stroke-width="1.5" d="${PAGE_FOLD_CUT}M8.5 8.5h2.5M8.5 12h7M8 17.25c.75-1.5 1.5-2.25 2-1.75s-.5 2.25.25 2.25c.75 0 1.25-1.5 2-1.5s.75 1 1.5 1H16"/>`,
  },

  // Piggy bank: warmer than a chart for a "money" tile.
  finance: {
    o: `<ellipse cx="11" cy="12.75" rx="7.5" ry="5.5"/><rect x="18.5" y="11" width="2.5" height="3.5" rx="1"/><path d="M13.5 7.55 15 4.75l1.5 4M7.5 17.5v3M14.5 17.5v3M15.5 11.25h.01M9.5 10.25h3"/>`,
    f: `<ellipse cx="11" cy="12.75" rx="7.5" ry="5.5"/><rect x="18.5" y="11" width="2.5" height="3.5" rx="1"/><path d="M13.5 7.55 15 4.75l1.5 4Z"/><path d="M7.5 17.5v3M14.5 17.5v3"/>`,
    cut: `<path d="M15.5 11.25h.01" stroke-width="2.25"/><path d="M9.5 10.25h3M18.5 11.75v2" stroke-width="1.5"/>`,
  },

  // Megaphone; a spark is the announcement.
  marketing: {
    o: `<path d="${MEGAPHONE}"/><path d="M7.5 15.25 8.5 19.5h2l-.75-3.25"/><path d="${star(18, 11.75, 2.75)}"/>`,
    f: `<path d="${MEGAPHONE}"/><path d="M7.5 15.25 8.5 19.5h2l-.75-3.25Z"/><path d="${star(18, 11.75, 2.75)}"/>`,
  },

  // Price tag with a rising-arrow badge.
  sales: {
    o: `<path d="M3.5 11.4V5a1.5 1.5 0 0 1 1.5-1.5h6.4a1.5 1.5 0 0 1 1.06.44l7.6 7.6a1.5 1.5 0 0 1 0 2.12l-6.4 6.4a1.5 1.5 0 0 1-2.12 0l-7.6-7.6A1.5 1.5 0 0 1 3.5 11.4Z"/><circle cx="8" cy="8" r="1.25"/>`,
    ocut: BADGE_CLEAR,
    otop: `<path d="${ARROW_BADGE}"/>`,
    f: `<path d="M3.5 11.4V5a1.5 1.5 0 0 1 1.5-1.5h6.4a1.5 1.5 0 0 1 1.06.44l7.6 7.6a1.5 1.5 0 0 1 0 2.12l-6.4 6.4a1.5 1.5 0 0 1-2.12 0l-7.6-7.6A1.5 1.5 0 0 1 3.5 11.4Z"/>`,
    cut: `<circle cx="8" cy="8" r="1.5" fill="#000" stroke="none"/>${BADGE_CLEAR}`,
    top: `<path fill="none" d="${ARROW_BADGE}"/>`,
  },

  // Two people with a heart between them.
  hr: {
    o: `<circle cx="6" cy="11.75" r="2.25"/><circle cx="18" cy="11.75" r="2.25"/><path d="M2.9 21v-.5a3.1 3.1 0 0 1 6.2 0v.5M14.9 21v-.5a3.1 3.1 0 0 1 6.2 0v.5M${smallHeart(12, 6.75).slice(1)}"/>`,
    f: `<circle cx="6" cy="11.75" r="2.25"/><circle cx="18" cy="11.75" r="2.25"/><path d="M2.9 21v-.5a3.1 3.1 0 0 1 6.2 0v.5ZM14.9 21v-.5a3.1 3.1 0 0 1 6.2 0v.5ZM${smallHeart(12, 6.75).slice(1)}"/>`,
  },

  // Person with a magnifier badge.
  recruiting: {
    o: `${HEAD}<path d="${BODY}"/>`,
    ocut: BADGE_CLEAR,
    otop: MAGNIFIER_BADGE,
    f: `${HEAD}<path d="${BODY}Z"/>`,
    cut: BADGE_CLEAR,
    top: `<g fill="none">${MAGNIFIER_BADGE}</g>`,
  },

  // Fountain pen writing a line.
  writing: {
    o: `<g transform="rotate(45 12 11)"><path d="M9.5 11V4.5a2.5 2.5 0 0 1 5 0V11M9 11h6l-.5 4-2.5 4.5L9.5 15Z"/><path d="M12 15.5v4"/></g><path d="M11 21h9"/>`,
    f: `<g transform="rotate(45 12 11)"><path d="M9.5 11V4.5a2.5 2.5 0 0 1 5 0V11ZM9 11h6l-.5 4-2.5 4.5L9.5 15Z"/></g><path d="M11 21h9"/>`,
    cut: `<g transform="rotate(45 12 11)"><path d="M12 15v4M8 11h8" stroke-width="1.5"/></g>`,
  },

  // Page with a pencil badge.
  blog: {
    o: `<path d="${PAGE}"/><path d="${PAGE_FOLD}"/><path d="M8.5 9h3M8.5 12.5h7M8.5 16h3"/>`,
    ocut: BADGE_CLEAR,
    otop: `<path d="${PENCIL_BADGE}"/>`,
    f: `<path d="${PAGE}"/>`,
    cut: `<path stroke-width="1.5" d="${PAGE_FOLD_CUT}M8.5 9h3M8.5 12.5h7M8.5 16h3"/>${BADGE_CLEAR}`,
    top: `<path d="${PENCIL_BADGE}"/>`,
  },

  // Closed storybook with a spark on the cover.
  storytelling: {
    o: `<path d="${BOOK}"/><path d="${star(12, 9.5, 3.25)}"/>`,
    f: `<path d="${BOOK_FILL}"/>`,
    cut: `<path d="M19.5 18.5h-12" stroke-width="1.5"/><path d="${star(12, 9.5, 3.5)}" fill="#000" stroke-width="1"/>`,
  },

  // Quill.
  poetry: {
    o: `<path d="M20 3.5c-6.5.5-11 4.5-12 11l-.5 2.5 2.5-.5c3-.5 5-2 6.5-4h-3l4-2c1.5-2 2.25-4.25 2.5-7Z"/><path d="M3.5 20.5l9-9"/>`,
    f: `<path d="M20 3.5c-6.5.5-11 4.5-12 11l-.5 2.5 2.5-.5c3-.5 5-2 6.5-4h-3l4-2c1.5-2 2.25-4.25 2.5-7Z"/><path d="M3.5 20.5l4.5-4.5"/>`,
    cut: `<path d="M8.5 15.5l5.5-5.5" stroke-width="1.5"/>`,
  },

  // Vector pen nib with bezier handles.
  design: {
    o: `<path d="M12 9.5l4.5 4.5-2 4.5h-5l-2-4.5Z"/><path d="M12 9.5v3.75M9.5 21h5"/><circle cx="12" cy="14.5" r="1.25"/><path d="M6.25 6.5h11.5M12 6.5v3"/><rect x="3.25" y="5" width="3" height="3" rx=".75"/><rect x="17.75" y="5" width="3" height="3" rx=".75"/>`,
    f: `<path d="M12 9.5l4.5 4.5-2 4.5h-5l-2-4.5Z"/><path fill="none" d="M6.25 6.5h11.5M12 6.5v3M9.5 21h5"/><rect x="3.25" y="5" width="3" height="3" rx=".75"/><rect x="17.75" y="5" width="3" height="3" rx=".75"/>`,
    cut: `<path d="M12 10.5v3" stroke-width="1.5"/><circle cx="12" cy="14.75" r="1.5" fill="#000" stroke="none"/>`,
  },

  photography: {
    o: `<path d="${CAMERA_BODY}"/><circle cx="12" cy="13.25" r="4"/><path d="M10.25 12.5a2 2 0 0 1 1.5-1.5M18 9.5h.01"/>`,
    f: `<path d="${CAMERA_BODY}"/>`,
    cut: `<circle cx="12" cy="13.25" r="4" stroke-width="1.5"/><path d="M10.25 12.5a2 2 0 0 1 1.5-1.5" stroke-width="1.5"/><path d="M18 9.5h.01" stroke-width="2"/>`,
  },

  // Two mixer faders and a note.
  'music-production': {
    o: `<path d="M5 3.5v5M5 13.5v7M10 3.5v1M10 9.5v11"/><rect x="3.25" y="9.25" width="3.5" height="3.5" rx="1"/><rect x="8.25" y="5.25" width="3.5" height="3.5" rx="1"/><circle cx="16.25" cy="17.75" r="2.5"/><path d="M18.75 17.75V4.5c0 1.75 2.25 2.5 2.25 4.5"/>`,
    f: `<path d="M5 3.5v5M5 13.5v7M10 3.5v1M10 9.5v11"/><rect x="3.25" y="9.25" width="3.5" height="3.5" rx="1"/><rect x="8.25" y="5.25" width="3.5" height="3.5" rx="1"/><circle cx="16.25" cy="17.75" r="2.5"/><path fill="none" d="M18.75 17.75V4.5c0 1.75 2.25 2.5 2.25 4.5"/>`,
  },

  gaming: {
    o: `<path d="${CONTROLLER}"/><path d="M8.25 9.75v3M6.75 11.25h3M15.25 12.25h.01M17 10.25h.01"/>`,
    f: `<path d="${CONTROLLER}"/>`,
    cut: `<path d="M8.25 9.75v3M6.75 11.25h3" stroke-width="1.5"/><path d="M15.25 12.25h.01M17 10.25h.01" stroke-width="2.25"/>`,
  },

  // Chef's toque.
  cooking: {
    o: `<path d="${CHEF_HAT}"/><path d="M7.25 17h9.5M10 14v-2"/>`,
    f: `<path d="${CHEF_HAT}"/>`,
    cut: `<path d="M6.5 17h11" stroke-width="1.5"/>`,
  },

  // Fork and knife.
  food: {
    o: `<path d="M4.5 3v4.5a3 3 0 0 0 6 0V3M7.5 3v18M18.5 13.5V3.5c-2.5 1.5-4 4-4 7v1.5a1.5 1.5 0 0 0 1.5 1.5h2.5V21"/>`,
    f: `<path fill="none" d="M4.5 3v4.5a3 3 0 0 0 6 0V3M7.5 3v18M18.5 13.5V21"/><path d="M18.5 13.5V3.5c-2.5 1.5-4 4-4 7v1.5a1.5 1.5 0 0 0 1.5 1.5Z"/>`,
  },

  coffee: {
    o: `<path d="${MUG}"/><path d="M16 10.5h1.25a2.5 2.5 0 0 1 0 5H16M8 3c.6.5.6 2.5 0 3M12 3c.6.5.6 2.5 0 3"/>`,
    f: `<path d="${MUG}"/><path fill="none" d="M16 10.5h1.25a2.5 2.5 0 0 1 0 5H16M8 3c.6.5.6 2.5 0 3M12 3c.6.5.6 2.5 0 3"/>`,
  },

  // Strapped suitcase.
  travel: {
    o: `${SUITCASE}<path d="M9 8V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V8M7.5 8v12.5M16.5 8v12.5"/>`,
    f: SUITCASE,
    cut: `<path d="M7.5 8v12.5M16.5 8v12.5" stroke-width="1.5"/>`,
    top: `<path fill="none" d="M9 8V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V8"/>`,
  },

  // House with a price-tag badge.
  'real-estate': {
    o: `<path d="${HOUSE}"/>`,
    ocut: BADGE_CLEAR,
    otop: `<path d="${TAG_BADGE}"/>`,
    f: `<path d="${HOUSE}"/>`,
    cut: BADGE_CLEAR,
    top: `<path d="${TAG_BADGE}"/>`,
  },

  // Cottage with chimney and a heart in the middle.
  'home-life': {
    o: `<path d="${COTTAGE}"/><path d="${smallHeart(12, 14.25)}"/>`,
    f: `<path d="${COTTAGE_FILL}"/>`,
    cut: `<path d="${smallHeart(12, 14.25)}" fill="#000" stroke-width="1"/>`,
  },

  // Adult and child.
  parenting: {
    o: `<circle cx="8" cy="6" r="2.5"/><path d="M3.5 21v-5a4.5 4.5 0 0 1 9 0v5"/><circle cx="17.75" cy="12.25" r="2"/><path d="M15 21v-.5a2.75 2.75 0 0 1 5.5 0v.5"/>`,
    f: `<circle cx="8" cy="6" r="2.5"/><path d="M3.5 21v-5a4.5 4.5 0 0 1 9 0v5Z"/><circle cx="17.75" cy="12.25" r="2"/><path d="M15 21v-.5a2.75 2.75 0 0 1 5.5 0v.5Z"/>`,
  },

  // Cat face (the paw lives in Weather & nature).
  pets: {
    o: `<path d="${CAT}"/><path d="M9.5 12.5h.01M14.5 12.5h.01M11.25 15.25h1.5L12 16Z"/>`,
    f: `<path d="${CAT}"/>`,
    cut: `<path d="M9.5 12.5h.01M14.5 12.5h.01" stroke-width="2.25"/><path d="M11.25 15.25h1.5L12 16Z" fill="#000" stroke-width="1"/>`,
  },

  // Basketball.
  sports: {
    o: `<circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18M5.75 5.5c2 2 3 4 3 6.5s-1 4.5-3 6.5M18.25 5.5c-2 2-3 4-3 6.5s1 4.5 3 6.5"/>`,
    f: `<circle cx="12" cy="12" r="9"/>`,
    cut: `<path stroke-width="1.5" d="M12 2v20M2 12h20M5.75 5.5c2 2 3 4 3 6.5s-1 4.5-3 6.5M18.25 5.5c-2 2-3 4-3 6.5s1 4.5 3 6.5"/>`,
  },

  fashion: {
    o: `<path d="${HANGER}"/>`,
    f: `<path fill="none" d="M10 6.5a2 2 0 1 1 2 2V10"/><path d="M12 10 3.6 16.4c-.9.7-.4 2.1.75 2.1h15.3c1.15 0 1.65-1.4.75-2.1Z"/>`,
  },

  // Lipstick.
  beauty: {
    o: `<rect x="7.5" y="13.5" width="9" height="7.5" rx="1.5"/><path d="M9 13.5V11h6v2.5M10 11V6.6a1 1 0 0 1 .5-.87l3-1.73a.5.5 0 0 1 .75.43V11"/>`,
    f: `<rect x="7.5" y="13.5" width="9" height="7.5" rx="1.5"/><path d="M9 13.5V11h6v2.5ZM10 11V6.6a1 1 0 0 1 .5-.87l3-1.73a.5.5 0 0 1 .75.43V11Z"/>`,
    cut: `<path d="M8 13.5h8M9.5 11h5" stroke-width="1.25"/>`,
  },

  art: {
    o: `<path d="${PALETTE}"/><path d="${PALETTE_DOTS}" stroke-width="2.5"/>`,
    f: `<path d="${PALETTE}"/>`,
    cut: `<path d="${PALETTE_DOTS}" stroke-width="2.75"/>`,
  },

  // Fluted column.
  'history-topic': {
    o: `<rect x="4.5" y="3" width="15" height="3" rx="1"/><rect x="4.5" y="18" width="15" height="3" rx="1"/><path d="M7 6v12M17 6v12M10.33 9v6M13.67 9v6"/>`,
    f: `<rect x="4.5" y="3" width="15" height="3" rx="1"/><rect x="4.5" y="18" width="15" height="3" rx="1"/><path d="M7 6h10v12H7Z"/>`,
    cut: `<path d="M10.33 8.5v7M13.67 8.5v7" stroke-width="1.5"/><path d="M5 6h14M5 18h14" stroke-width="1.25"/>`,
  },

  // Pondering head.
  philosophy: {
    o: `<path d="${PROFILE}"/><path d="M9.5 8.5a2 2 0 1 1 2.75 1.85c-.5.2-.75.6-.75 1.15v.5M11.5 14.75h.01"/>`,
    f: `<path d="${PROFILE_FILL}"/>`,
    cut: `<path d="M9.5 8.5a2 2 0 1 1 2.75 1.85c-.5.2-.75.6-.75 1.15v.5" stroke-width="1.75"/><path d="M11.5 14.75h.01" stroke-width="2.25"/>`,
  },

  // Candle with a glowing flame.
  religion: {
    o: `<path d="${FLAME_SMALL}"/><rect x="9" y="11.5" width="6" height="9.5" rx="1.5"/><path d="M12 9.25v2.25M6.5 5.5l1.25.75M17.5 5.5l-1.25.75M6 9.5h1.25M18 9.5h-1.25"/>`,
    f: `<path d="${FLAME_SMALL}"/><rect x="9" y="11.5" width="6" height="9.5" rx="1.5"/><path d="M12 9.25v2.25M6.5 5.5l1.25.75M17.5 5.5l-1.25.75M6 9.5h1.25M18 9.5h-1.25"/>`,
  },

  // Ballot going into a box.
  politics: {
    o: `<rect x="3.5" y="11" width="17" height="10" rx="2.5"/><path d="M8.5 11V4.5a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1V11M10.5 7.25l1.25 1.25 2-2.25"/>`,
    f: `<rect x="3.5" y="11" width="17" height="10" rx="2.5"/><path d="M8.5 11V4.5a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1V11Z"/>`,
    cut: `<path d="M10.5 7.25l1.25 1.25 2-2.25" stroke-width="1.5"/><path d="M3 11h18" stroke-width="1.5"/>`,
  },

  news: {
    o: `<path d="M7 9H4.5A1.5 1.5 0 0 0 3 10.5V19a2 2 0 0 0 4 0V5.5A2.5 2.5 0 0 1 9.5 3h9A2.5 2.5 0 0 1 21 5.5v13a2.5 2.5 0 0 1-2.5 2.5H5"/><rect x="10" y="6.5" width="8" height="3.5" rx=".75"/><path d="M10 13.5h8M10 17h5"/>`,
    f: `<path d="M7 9H4.5A1.5 1.5 0 0 0 3 10.5V19a2 2 0 0 0 2 2h13.5a2.5 2.5 0 0 0 2.5-2.5v-13A2.5 2.5 0 0 0 18.5 3h-9A2.5 2.5 0 0 0 7 5.5Z"/>`,
    cut: `<path d="M7 9v10a2 2 0 0 1-2 2" stroke-width="1.5"/><rect x="10" y="6.5" width="8" height="3.5" rx=".75" fill="#000" stroke-width="1"/><path d="M10 13.5h8M10 17h5" stroke-width="1.5"/>`,
  },

  // Checkbox with a lightning bolt.
  productivity: {
    o: `<rect x="3" y="6" width="15" height="15" rx="2.5"/><path d="M7 13.5l2.5 2.5 4.5-4.5"/>`,
    ocut: `<path d="M19.75 3 16.5 8h4.25l-3.25 5" stroke-width="5"/>`,
    otop: `<path d="M19.75 3 16.5 8h4.25l-3.25 5"/>`,
    f: `<rect x="3" y="6" width="15" height="15" rx="2.5"/>`,
    cut: `<path d="M7 13.5l2.5 2.5 4.5-4.5" stroke-width="2"/><path d="M19.75 3 16.5 8h4.25l-3.25 5" stroke-width="5"/>`,
    top: `<path fill="none" d="M19.75 3 16.5 8h4.25l-3.25 5"/>`,
  },

  // Bulb with a spark filament and bright rays.
  brainstorm: {
    o: `<path d="${BULB}"/><path d="M10 20.75h4M2.9 9.25h1M20.1 9.25h-1M4.25 4.75l1 .6M19.75 4.75l-1 .6"/><path d="${star(12, 9.75, 2.5)}"/>`,
    f: `<path d="${BULB}"/><path d="M10 20.75h4M2.9 9.25h1M20.1 9.25h-1M4.25 4.75l1 .6M19.75 4.75l-1 .6"/>`,
    cut: `<path d="${star(12, 9.75, 2.75)}" fill="#000" stroke-width="1"/>`,
  },

  // Chess knight.
  strategy: {
    o: `<path d="${KNIGHT}"/><rect x="5.5" y="18" width="13" height="3" rx="1"/><path d="M12.5 7.5h.01"/>`,
    f: `<path d="${KNIGHT}Z"/><rect x="5.5" y="18" width="13" height="3" rx="1"/>`,
    cut: `<path d="M12.5 7.5h.01" stroke-width="2"/><path d="M5 18h14" stroke-width="1.25"/>`,
  },

  // A path that forks.
  decision: {
    o: `<path d="M12 20.5v-8L5 5.5M12 12.5l7-7M5 10.5v-5h5M14 5.5h5v5"/>`,
    bold: true,
  },

  'customer-support': {
    o: `<path d="${HEADSET}"/>`,
    f: `<path fill="none" d="M4 12a8 8 0 0 1 16 0M20 17v.5a3 3 0 0 1-3 3h-3.5"/><path d="M4 12h2a2 2 0 0 1 2 2v2.5a2 2 0 0 1-2 2h-.5A1.5 1.5 0 0 1 4 17ZM20 12h-2a2 2 0 0 0-2 2v2.5a2 2 0 0 0 2 2h.5A1.5 1.5 0 0 0 20 17Z"/>`,
  },

  // Gear above a ruler.
  engineering: {
    o: `${smallGear()}<circle cx="${GX}" cy="${GY}" r="2"/>${RULER}<path d="${RULER_TICKS}"/>`,
    f: `${smallGear()}${RULER}`,
    cut: `<circle cx="${GX}" cy="${GY}" r="2.25" fill="#000" stroke="none"/><path d="${RULER_TICKS}" stroke-width="1.5"/>`,
  },

  // Scatter plot with a fitted curve.
  'data-science': {
    o: `<path d="M3.5 3.5V18a2.5 2.5 0 0 0 2.5 2.5h14.5M7.5 16.5c3.5-.5 7-3.5 10.5-10"/><path d="M8.5 11.5h.01M12.5 15.5h.01M13 8.5h.01M18 12.5h.01"/>`,
    f: `<path fill="none" d="M3.5 3.5V18a2.5 2.5 0 0 0 2.5 2.5h14.5M7.5 16.5c3.5-.5 7-3.5 10.5-10"/><path d="M8.5 11.5h.01M12.5 15.5h.01M13 8.5h.01M18 12.5h.01" stroke-width="3"/>`,
  },

  // Shield with a padlock.
  'security-topic': {
    o: `<path d="${SHIELD}"/><rect x="9" y="11" width="6" height="5" rx="1"/><path d="M10.25 11V9.75a1.75 1.75 0 0 1 3.5 0V11"/>`,
    f: `<path d="${SHIELD}"/>`,
    cut: `<rect x="9" y="11" width="6" height="5" rx="1" fill="#000" stroke-width="1"/><path d="M10.25 11V9.75a1.75 1.75 0 0 1 3.5 0V11" stroke-width="1.5"/>`,
  },

  // Shopping bag with a pointer.
  ecommerce: {
    o: `<path d="${BAG}"/><path d="M9 10.5V7a3 3 0 0 1 6 0v3.5"/>`,
    ocut: `<path d="${CURSOR_BADGE}" fill="#000" stroke-width="4.5"/>`,
    otop: `<path d="${CURSOR_BADGE}"/>`,
    f: `<path d="${BAG}"/>`,
    cut: `<path d="M9 10.5V8.5M15 10.5V8.5" stroke-width="1.5"/><path d="${CURSOR_BADGE}" fill="#000" stroke-width="4.5"/>`,
    top: `<path fill="none" d="M9 8V7a3 3 0 0 1 6 0v1"/><path d="${CURSOR_BADGE}"/>`,
  },

  // Speech bubble with a heart: likes and comments.
  'social-media': {
    o: `<path d="${BUBBLE}"/><path d="${smallHeart(12, 10.5)}"/>`,
    f: `<path d="${BUBBLE}"/>`,
    cut: `<path d="${smallHeart(12, 10.5)}" fill="#000" stroke-width="1"/>`,
  },
};
