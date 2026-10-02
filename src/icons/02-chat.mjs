import { star, BUBBLE, BUBBLE_CENTER, PLANE, BADGE, BADGE_CLEAR, SLASH, SLASH_CLEAR, FRAME, HEAD, BODY } from '../shapes.mjs';

const HAND = 'M7 10l3.6-5.9a1.8 1.8 0 0 1 3.3 1.3L13.2 10h5.1a2 2 0 0 1 1.95 2.45l-1.5 6.6a2 2 0 0 1-1.95 1.55H7Z';
const CUFF = 'M7 10H4a1 1 0 0 0-1 1v8.6a1 1 0 0 0 1 1h3';

const [CX, CY] = BUBBLE_CENTER;
const B = `<path d="${BUBBLE}"/>`;

// Bubble + content: outline draws the content, filled knocks it out of the solid bubble.
const inBubble = (content, knockout = content) => ({ o: B + content, f: B, cut: knockout });

// Bubble + bottom-right badge (see file-plus).
const badged = (glyph, fillGlyph = glyph) => ({
  o: B,
  ocut: BADGE_CLEAR,
  otop: glyph,
  f: B,
  cut: BADGE_CLEAR,
  top: fillGlyph,
});

// The shared BUBBLE at another scale / position. Stroke is compensated so it still reads as 1.75.
const sw = (s) => +(1.75 / s).toFixed(2);
// `clear` makes it a solid knockout with a wide margin (overlap pattern, see `copy`).
const bubbleAt = (tx, ty, s, flip = false, clear = false) =>
  `<path transform="translate(${tx} ${ty}) scale(${flip ? -s : s} ${s})" d="${BUBBLE}" ` +
  (clear ? `fill="#000" stroke-width="${sw(s * 0.4)}"/>` : `stroke-width="${sw(s)}"/>`);

// Bubble placed by its left/top edge (tail bottom-left) or mirrored by its right/top edge (tail bottom-right).
const bubL = (left, top, s, clear) => bubbleAt(+(left - 3.5 * s).toFixed(2), +(top - 3.5 * s).toFixed(2), s, false, clear);
const bubR = (right, top, s, clear) => bubbleAt(+(right + 3.5 * s).toFixed(2), +(top - 3.5 * s).toFixed(2), s, true, clear);

// Shared HEAD + BODY (the `user` bust, bbox x 4–20, y 3.5–21), placed by left / bottom edge.
// mode: 'o' outline, 'f' filled, 'clear' solid knockout with margin.
const person = (left, bottom, s, mode = 'o') => {
  const t = `translate(${+(left - 4 * s).toFixed(2)} ${+(bottom - 21 * s).toFixed(2)}) scale(${s})`;
  if (mode === 'clear') return `<g transform="${t}" fill="#000" stroke-width="${sw(s * 0.4)}">${HEAD}<path d="${BODY}Z"/></g>`;
  return `<g transform="${t}" stroke-width="${sw(s)}">${HEAD}<path d="${BODY}${mode === 'f' ? 'Z' : ''}"/></g>`;
};
const people = (list, mode) => list.map(([l, b, s]) => person(l, b, s, mode)).join('');
// Back layer, then front layer cleared out of it (overlap pattern).
const layered = (back, front, frontFilled = front, clear) => ({ o: back.o, ocut: clear, otop: front, f: back.f, cut: clear, top: frontFilled });

const dot = (x, y, r, attrs = 'fill="currentColor"') => `<circle cx="${x}" cy="${y}" r="${r}" ${attrs}/>`;
const hole = (x, y, r) => dot(x, y, r, 'fill="#000" stroke="none"');

// Same heart as `heart` (04-actions), scaled down to sit inside the bubble.
const HEART = 'M12 20S3 14.5 3 8.8a4.8 4.8 0 0 1 9-2.3 4.8 4.8 0 0 1 9 2.3C21 14.5 12 20 12 20Z';
const HEART_IN = (extra = '') => `<path transform="translate(${CX} ${CY + 0.25}) scale(.42) translate(-12 -12)" stroke-width="${sw(0.42)}" d="${HEART}"${extra}/>`;

/** Five-point star with rounded joins (feedback / rating). */
function star5(cx, cy, R, r) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const a = (-90 + i * 36) * (Math.PI / 180);
    const rr = i % 2 ? r : R;
    pts.push(`${+(cx + rr * Math.cos(a)).toFixed(2)} ${+(cy + rr * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join('L')}Z`;
}
const STAR5 = star5(CX, CY + 0.4, 4.25, 1.9);

// Pure line glyph: filled style is the outline at stroke 2.5.
const line = (d, extra = '', raw = false) => ({ o: (raw ? d : `<path d="${d}"/>`) + extra, bold: true });

const QUOTE_BODY = '<rect x="4" y="6" width="6.5" height="6" rx="2"/><rect x="13.5" y="6" width="6.5" height="6" rx="2"/>';
const QUOTE_TAIL = 'M10.5 9v2.5c0 3-1.75 5.5-4.5 6.5M20 9v2.5c0 3-1.75 5.5-4.5 6.5';
const CHANNEL_HASH = 'M7.5 9.5h9M7.5 14.5h9M10.75 6.5l-1 11M14.75 6.5l-1 11';

const FACE = '<circle cx="12" cy="12" r="9"/>';
const FACE_EYES = 'M9 9v1.5M15 9v1.5';
const FACE_SMILE = 'M8.5 14.5c.9 1.2 2.1 1.75 3.5 1.75s2.6-.55 3.5-1.75';
const FACE_CUT = `<path d="${FACE_EYES}" stroke-width="2"/><path d="${FACE_SMILE}"/>`;
const FACE_SMALL = 'translate(3 3) scale(.85) translate(-3 -3)';

const PLANE_H = 'M4 4 20.5 12 4 20l3-8Z';
const CLIP = 'M17.25 9.5v4.25a5.25 5.25 0 0 1-10.5 0V8.5a3.5 3.5 0 0 1 7 0V13a1.75 1.75 0 0 1-3.5 0V10';
const PIN =
  'M9 3.5h6a1 1 0 0 1 0 2h-.5v4.25l3 3.25a1.5 1.5 0 0 1 .5 1.1v.4a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-.4a1.5 1.5 0 0 1 .5-1.1l3-3.25V5.5H9a1 1 0 0 1 0-2Z';
const FLAG =
  'M4.5 4.5c1-.7 2.3-1 3.75-1 3 0 4.5 2 7.5 2 1.4 0 2.6-.3 3.75-1V14c-1.15.7-2.35 1-3.75 1-3 0-4.5-2-7.5-2-1.45 0-2.75.3-3.75 1Z';
const MEGA = 'M4.5 10.5A1.5 1.5 0 0 1 6 9h3l10.5-5v16L9 15H6a1.5 1.5 0 0 1-1.5-1.5Z';
const MEGA_HANDLE = 'M9 15.25V19a1.75 1.75 0 0 0 3.5 0v-2.25';

const THREAD = 'M9.5 16.5a3 3 0 0 0 3 3h8M15.5 15.5h5';
const TEXT_LINES = 'M8 9h8M8 12.5h5';
const WAVE = 'M7.5 9.5v2.5M10.5 7.5v6.5M13.5 8.5v4.5M16.5 9.75v2';
const PENCIL_BADGE = 'M15 21l.5-2.25 4-4a1.06 1.06 0 0 1 1.5 0l.25.25a1.06 1.06 0 0 1 0 1.5l-4 4Z';
const SHARE_BADGE = 'M15.5 20.5l5-5M16.5 15.5h4v4';
const CLOCK_BADGE = `<circle cx="18" cy="18" r="3.5"/><path d="${BADGE.clock}"/>`;

export default {
  chat: {
    o: `<path d="${BUBBLE}"/>`,
    f: `<path d="${BUBBLE}"/>`,
  },

  'chat-sparkle': {
    o: `<path d="${BUBBLE}"/><path d="${star(12, 10.75, 3.75)}"/>`,
    f: `<path d="${BUBBLE}"/>`,
    cut: `<path d="${star(12, 10.75, 3.75)}" fill="#000" stroke-width="1"/>`,
  },

  send: {
    o: `<path d="${PLANE}"/><path d="M12.5 11.5 21 3"/><path d="${star(6.5, 17.5, 3.25)}"/>`,
    f: `<path d="${PLANE}"/><path d="${star(6.5, 17.5, 3.25)}"/>`,
    cut: `<path d="M12.5 11.5 19 5" stroke-width="1.5"/>`,
  },

  'thumbs-up': {
    o: `<path d="${HAND}"/><path d="${CUFF}"/>`,
    f: `<path d="${HAND}"/><path d="${CUFF}Z"/>`,
    cut: `<path d="M7 9.5V21.5" stroke-width="1.5"/>`,
  },

  // ── Bubble + content ───────────────────────────────────────────────────────
  'chat-dots': inBubble(
    dot(7.75, CY, 0.5) + dot(CX, CY, 0.5) + dot(16.25, CY, 0.5),
    hole(7.75, CY, 1.25) + hole(CX, CY, 1.25) + hole(16.25, CY, 1.25),
  ),
  'chat-text': inBubble(`<path d="${TEXT_LINES}"/>`, `<path d="${TEXT_LINES}" stroke-width="1.5"/>`),
  reaction: inBubble(HEART_IN(), HEART_IN(' fill="#000"')),
  'voice-message': inBubble(`<path d="${WAVE}"/>`, `<path d="${WAVE}" stroke-width="1.5"/>`),
  feedback: inBubble(`<path d="${STAR5}"/>`, `<path d="${STAR5}" fill="#000" stroke-width="1"/>`),

  // ── Bubble + badge ─────────────────────────────────────────────────────────
  'chat-new': badged(`<path d="${BADGE.plus}"/>`),
  'chat-delete': badged(`<path d="${BADGE.x}"/>`),
  'chat-check': badged(`<path d="${BADGE.check}"/>`),
  'chat-question': badged(`<path d="${BADGE.question}"/>`),
  'chat-alert': badged(`<path d="${BADGE.alert}"/>`),
  'chat-history': badged(CLOCK_BADGE, `<g fill="none">${CLOCK_BADGE}</g>`),
  'edit-message': badged(`<path d="${PENCIL_BADGE}"/>`),
  'share-chat': badged(`<path d="${SHARE_BADGE}"/>`),
  'export-chat': badged(`<path d="${BADGE.arrowDown}"/>`),

  'chat-off': { o: B, ocut: SLASH_CLEAR, otop: SLASH, f: B, cut: SLASH_CLEAR, top: SLASH },

  // Notification dot top-right; the bubble is opened around it.
  unread: {
    o: B,
    ocut: hole(18.5, 5.5, 4.5),
    otop: dot(18.5, 5.5, 2.25),
    f: B,
    cut: hole(18.5, 5.5, 4.5),
    top: dot(18.5, 5.5, 2.25),
  },

  // Typing indicator: a pill with three dots (distinct from menu-dots).
  typing: {
    o: `<rect x="3" y="7" width="18" height="10" rx="5"/>${dot(7.5, 12, 0.75)}${dot(12, 12, 0.75)}${dot(16.5, 12, 0.75)}`,
    f: `<rect x="3" y="7" width="18" height="10" rx="5"/>`,
    cut: hole(7.5, 12, 1.5) + hole(12, 12, 1.5) + hole(16.5, 12, 1.5),
  },

  'thumbs-down': {
    o: `<g transform="rotate(180 12 12)"><path d="${HAND}"/><path d="${CUFF}"/></g>`,
    f: `<g transform="rotate(180 12 12)"><path d="${HAND}"/><path d="${CUFF}Z"/></g>`,
    cut: `<path transform="rotate(180 12 12)" d="M7 9.5V21.5" stroke-width="1.5"/>`,
  },

  // Two overlapping bubbles: back bubble mirrored top-right, front bubble bottom-left.
  chats: {
    o: bubbleAt(23.45, 0.55, 0.7, true),
    ocut: bubbleAt(0.38, 5.75, 0.75, false, true),
    otop: bubbleAt(0.38, 5.75, 0.75),
    f: bubbleAt(23.45, 0.55, 0.7, true),
    cut: bubbleAt(0.38, 5.75, 0.75, false, true),
    top: bubbleAt(0.38, 5.75, 0.75),
  },

  // ── Reply arrows: shared 4.5-leg head and r8.5 sweep ───────────────────────
  reply: line('M4 10h7.5a8.5 8.5 0 0 1 8.5 8.5M8.5 5.5 4 10l4.5 4.5'),
  'reply-all': line('M8 10h4a8.5 8.5 0 0 1 8.5 8.5M8 5.5 3.5 10 8 14.5M12.5 5.5 8 10l4.5 4.5'),
  forward: line('M20 10h-7.5A8.5 8.5 0 0 0 4 18.5M15.5 5.5 20 10l-4.5 4.5'),

  quote: {
    o: QUOTE_BODY + `<path d="${QUOTE_TAIL}"/>`,
    f: QUOTE_BODY + `<path fill="none" d="${QUOTE_TAIL}"/>`,
  },
  mention: line('M15.75 8.25v4.5a2.5 2.5 0 0 0 5 0V12a8.75 8.75 0 1 0-3.5 7', '<circle cx="12" cy="12" r="3.75"/>'),
  hashtag: line('M4 9h16M4 15h16M10.5 3.5l-2 17M15.5 3.5l-2 17'),
  channel: {
    o: `${FRAME}<path d="${CHANNEL_HASH}"/>`,
    f: FRAME,
    cut: `<path d="${CHANNEL_HASH}" stroke-width="1.75"/>`,
  },

  emoji: {
    o: FACE + `<path d="${FACE_EYES}${FACE_SMILE}"/>`,
    f: FACE,
    cut: FACE_CUT,
  },
  // The badge would cut the smile, so the same face is drawn at 85% towards the top-left.
  'emoji-add': {
    o: `<g transform="${FACE_SMALL}" stroke-width="${sw(0.85)}">${FACE}<path d="${FACE_EYES}${FACE_SMILE}"/></g>`,
    ocut: BADGE_CLEAR,
    otop: `<path d="${BADGE.plus}"/>`,
    f: `<g transform="${FACE_SMALL}" stroke-width="${sw(0.85)}">${FACE}</g>`,
    cut: `<g transform="${FACE_SMALL}">${FACE_CUT}</g>${BADGE_CLEAR}`,
    top: `<path d="${BADGE.plus}"/>`,
  },

  'send-horizontal': {
    o: `<path d="${PLANE_H}"/><path d="M7 12h6"/>`,
    f: `<path d="${PLANE_H}"/>`,
    cut: `<path d="M7.5 12h5" stroke-width="1.5"/>`,
  },
  attach: line(`<path transform="rotate(45 12 12)" d="${CLIP}"/>`, '', true),
  'read-receipt': line('M3 12l4.5 4.5 8.5-8.5M21 9l-7.5 7.5-1-1'),

  pin: {
    o: `<path d="${PIN}"/><path d="M12 15.5V21"/>`,
    f: `<path d="${PIN}"/><path d="M12 15.5V21"/>`,
  },
  'pin-off': {
    o: `<path d="${PIN}"/><path d="M12 15.5V21"/>`,
    ocut: SLASH_CLEAR,
    otop: SLASH,
    f: `<path d="${PIN}"/><path d="M12 15.5V21"/>`,
    cut: SLASH_CLEAR,
    top: SLASH,
  },

  report: {
    o: `<path d="${FLAG}"/><path d="M4.5 4.5V21"/>`,
    f: `<path d="${FLAG}"/><path d="M4.5 4.5V21"/>`,
  },
  // ── Bubbles with people (shared BUBBLE + user bust, scaled) ────────────────
  'direct-message': layered(
    { o: person(2.75, 21, 0.65), f: person(2.75, 21, 0.65, 'f') },
    bubR(21, 3, 0.6),
    bubR(21, 3, 0.6),
    bubR(21, 3, 0.6, true),
  ),
  conversation: layered(
    { o: people([[3, 21, 0.47], [13.48, 21, 0.47]]), f: people([[3, 21, 0.47], [13.48, 21, 0.47]], 'f') },
    bubL(3, 3, 0.45) + bubR(21, 3, 0.45),
    bubL(3, 3, 0.45) + bubR(21, 3, 0.45),
    bubL(3, 3, 0.45, true) + bubR(21, 3, 0.45, true),
  ),
  'group-chat': layered(
    { o: people([[2.5, 21, 0.42], [14.28, 21, 0.42]]), f: people([[2.5, 21, 0.42], [14.28, 21, 0.42]], 'f') },
    person(7.6, 21.25, 0.55) + bubL(7.75, 3, 0.4),
    person(7.6, 21.25, 0.55, 'f') + bubL(7.75, 3, 0.4),
    person(7.6, 21.25, 0.55, 'clear') + bubL(7.75, 3, 0.4, true),
  ),
  // Bubble with a reply thread branching below it.
  thread: {
    o: bubL(3, 3, 0.7) + `<path d="${THREAD}"/>`,
    f: bubL(3, 3, 0.7) + `<path fill="none" d="${THREAD}"/>`,
  },

  broadcast: {
    o: `<path d="${MEGA}"/><path d="${MEGA_HANDLE}"/>`,
    f: `<path d="${MEGA}"/><path fill="none" d="${MEGA_HANDLE}"/>`,
  },
};
