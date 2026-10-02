import { star, PAGE, PAGE_FOLD, PAGE_FOLD_CUT } from '../shapes.mjs';
import { poly } from '../helpers.mjs';

// ── local geometry helpers ───────────────────────────────────────────────────
const n = (v) => +v.toFixed(2);
const pt = (cx, cy, r, deg) => [n(cx + r * Math.cos((deg * Math.PI) / 180)), n(cy + r * Math.sin((deg * Math.PI) / 180))];
/** Arc from a0 to a1 (degrees; clockwise if a1 > a0, else counter-clockwise) with an arrowhead at a1. */
function arcArrow(cx, cy, r, a0, a1, head) {
  const [x0, y0] = pt(cx, cy, r, a0);
  const [x1, y1] = pt(cx, cy, r, a1);
  const cw = a1 > a0;
  const t = ((a1 + (cw ? 90 : -90)) * Math.PI) / 180;
  const back = (s) => `${n(x1 - head * Math.cos(t + s))} ${n(y1 - head * Math.sin(t + s))}`;
  return `M${x0} ${y0}A${r} ${r} 0 ${Math.abs(a1 - a0) > 180 ? 1 : 0} ${cw ? 1 : 0} ${x1} ${y1}M${back(Math.PI / 4)}L${x1} ${y1}L${back(-Math.PI / 4)}`;
}
const solid = (markup) => markup.replace('/>', ' fill="none"/>');

// ── shared local shapes ──────────────────────────────────────────────────────
// Shopping cart: handle + basket (open path), wheels.
const CART = 'M3 3.5h1.65a1 1 0 0 1 .98.8l2 9.9a1.5 1.5 0 0 0 1.47 1.3h8.25a1.5 1.5 0 0 0 1.46-1.15L20.5 6.5H6.07';
const CART_BASKET = 'M6.07 6.5H20.5l-1.69 7.35a1.5 1.5 0 0 1-1.46 1.15H9.1a1.5 1.5 0 0 1-1.47-1.3Z';
const CART_HANDLE = 'M3 3.5h1.65a1 1 0 0 1 .98.8l.44 2.2';
const WHEELS = '<circle cx="9.5" cy="19.5" r="1.25"/><circle cx="17" cy="19.5" r="1.25"/>';

const CARD = '<rect x="3" y="5" width="18" height="14" rx="2.5"/>';
const CARD_STRIPE = 'M3 9.5h18';

// Price tag (hole top-left).
const TAG = 'M3 4.5v6.1a2 2 0 0 0 .59 1.41l8.4 8.4a2 2 0 0 0 2.82 0l6.1-6.1a2 2 0 0 0 0-2.82l-8.4-8.4A2 2 0 0 0 11.1 3H4.5A1.5 1.5 0 0 0 3 4.5Z';
const TAG_HOLE = '<circle cx="7.5" cy="7.5" r="1.5"/>';
const TAG_HOLE_CUT = '<circle cx="7.5" cy="7.5" r="1.75" fill="#000" stroke="none"/>';

const COIN_R = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}"/>`;

const DOLLAR_S = 'M16.5 7.25C16 5.85 14.3 5 12 5 9.4 5 7.5 6.3 7.5 8.25c0 4.5 9 2.75 9 7.5 0 1.95-1.9 3.25-4.5 3.25-2.3 0-4-.85-4.5-2.25';
// Small dollar for inside a page.
const DOLLAR_MINI = 'M12 10.25v7.5M14 11.75c-.25-.6-1-1-2-1-1.2 0-2 .6-2 1.5 0 2.2 4 1.1 4 3.2 0 .9-.9 1.5-2 1.5-1 0-1.75-.4-2-1';

const BOX_LID = '<rect x="3" y="3.5" width="18" height="4.5" rx="1.5"/>';
const BOX_BODY = 'M4.5 8v10.5A2.5 2.5 0 0 0 7 21h10a2.5 2.5 0 0 0 2.5-2.5V8';

const TRUCK =
  'M5 17h-.5A1.5 1.5 0 0 1 3 15.5V7a1.5 1.5 0 0 1 1.5-1.5h8A1.5 1.5 0 0 1 14 7v10M9 17h6M19 17h1a1 1 0 0 0 1-1v-2.3a1 1 0 0 0-.2-.6l-2.4-3.2a1 1 0 0 0-.8-.4H14';
const TRUCK_F = 'M3 7a1.5 1.5 0 0 1 1.5-1.5h8A1.5 1.5 0 0 1 14 7v2.5h3.6a1 1 0 0 1 .8.4l2.4 3.2a1 1 0 0 1 .2.6V16a1 1 0 0 1-1 1H4.5A1.5 1.5 0 0 1 3 15.5Z';
const TRUCK_WHEELS = '<circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>';

const PIGGY =
  'M10.5 6h3.25c.9-1.4 2.5-2.25 4.25-2.25V7.3c.95.7 1.65 1.7 2 2.7h.25a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75H20c-.45 1.1-1.1 1.9-2 2.5V19a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-1.25h-3.5V19a1 1 0 0 1-1 1H8.5a1 1 0 0 1-1-1v-2.6a5.75 5.75 0 0 1-2.75-4.65A5.75 5.75 0 0 1 10.5 6Z';

const HAND = 'M3 14h2.75l3-1.5a2 2 0 0 1 1.4-.15l4.1 1.15a1.4 1.4 0 0 1-.55 2.75H10.5M14.25 16.1l4.5-2.15a1.5 1.5 0 0 1 1.65 2.45l-4.6 3.55a2.5 2.5 0 0 1-1.55.55H3';
const HAND_F = 'M3 14h2.75l3-1.5a2 2 0 0 1 1.4-.15l4.1 1.15c.2.06.4.2.55.35l3.95-1.9a1.5 1.5 0 0 1 1.65 2.45l-4.6 3.55a2.5 2.5 0 0 1-1.55.55H3Z';

const REFUND_ARROW = arcArrow(12, 12, 8.5, 170, -120, 2.5);
const SUB_ARROW = arcArrow(18, 18, 3, -40, 225, 2);

const GEM = 'M7 4h10l4 5.5-9 10.5L3 9.5Z';
const STAR5 = (() => {
  const p = [];
  for (let i = 0; i < 10; i++) {
    const a = ((-90 + 36 * i) * Math.PI) / 180;
    const r = i % 2 ? 3.6 : 7.75;
    p.push(`${n(10.25 + r * Math.cos(a))} ${n(13.25 + r * Math.sin(a))}`);
  }
  return `M${p.join('L')}Z`;
})();

export default {
  'shopping-cart': {
    o: `<path d="${CART}"/>${WHEELS}`,
    f: `<path d="${CART_BASKET}"/><path d="${CART_HANDLE}" fill="none"/>${WHEELS}`,
  },

  'shopping-bag': {
    o: `<path d="M4.75 8.25A1.25 1.25 0 0 1 6 7h12a1.25 1.25 0 0 1 1.25 1.25l-.75 10.5A2.5 2.5 0 0 1 16 21H8a2.5 2.5 0 0 1-2.5-2.25Z"/><path d="M8.75 7v-.75a3.25 3.25 0 0 1 6.5 0V7"/>`,
    f: `<path d="M4.75 8.25A1.25 1.25 0 0 1 6 7h12a1.25 1.25 0 0 1 1.25 1.25l-.75 10.5A2.5 2.5 0 0 1 16 21H8a2.5 2.5 0 0 1-2.5-2.25Z"/><path d="M8.75 7v-.75a3.25 3.25 0 0 1 6.5 0V7" fill="none"/>`,
    cut: `<path d="M8.75 10.25h.01M15.25 10.25h.01" stroke-width="2"/>`,
  },

  basket: {
    o: `<path d="M3 9.5h18M4.5 9.5l1.6 8.5A2.5 2.5 0 0 0 8.55 20h6.9a2.5 2.5 0 0 0 2.45-2l1.6-8.5M7 9.5a5 5 0 0 1 10 0M9.5 12.75v4M14.5 12.75v4"/>`,
    f: `<path d="M3 9.5h18l-1.5 0-1.6 8.5a2.5 2.5 0 0 1-2.45 2h-6.9a2.5 2.5 0 0 1-2.45-2L4.5 9.5Z"/><path d="M7 9.5a5 5 0 0 1 10 0" fill="none"/>`,
    cut: `<path d="M9.5 12.75v4M14.5 12.75v4" stroke-width="1.5"/>`,
  },

  store: {
    o: `<path d="M4.75 3.5h14.5L21 8.5a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0Z"/><path d="M4.5 11.25V18.5A2.5 2.5 0 0 0 7 21h10a2.5 2.5 0 0 0 2.5-2.5v-7.25M10 21v-4.5h4V21"/>`,
    f: `<path d="M4.75 3.5h14.5L21 8.5a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0Z"/><path d="M4.5 11V18.5A2.5 2.5 0 0 0 7 21h10a2.5 2.5 0 0 0 2.5-2.5V11Z"/>`,
    cut: `<path d="M3 8.5a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" stroke-width="1.5"/><path d="M10 22v-5.5h4V22Z" fill="#000" stroke-width="1"/>`,
  },

  'credit-card': {
    o: `${CARD}<path d="${CARD_STRIPE}M6.5 15h3"/>`,
    f: CARD,
    cut: `<path d="${CARD_STRIPE}" stroke-width="2.25"/><path d="M6.5 15h3" stroke-width="1.5"/>`,
  },

  wallet: {
    o: `<path d="M3 8.5A2.5 2.5 0 0 1 5.5 6h13A2.5 2.5 0 0 1 21 8.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5Z"/><path d="M5.5 6 15.6 3.3a1.5 1.5 0 0 1 1.9 1.45V6M21 10.5h-3.5a2 2 0 0 0 0 4H21M17.5 12.5h.01"/>`,
    f: `<path d="M3 8.5A2.5 2.5 0 0 1 5.5 6h13A2.5 2.5 0 0 1 21 8.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5Z"/><path d="M5.5 6 15.6 3.3a1.5 1.5 0 0 1 1.9 1.45V6Z"/>`,
    cut: `<path d="M5.5 6h12" stroke-width="1.25"/><path d="M22 10.5h-4.5a2 2 0 0 0 0 4H22" stroke-width="1.5"/><path d="M17.5 12.5h.01" stroke-width="2"/>`,
  },

  receipt: {
    o: `<path d="M5 21V4.5A1.5 1.5 0 0 1 6.5 3h11A1.5 1.5 0 0 1 19 4.5V21l-2.33-1.5-2.34 1.5L12 19.5l-2.33 1.5-2.34-1.5Z"/><path d="M8.5 8h7M8.5 11.5h7M8.5 15h4"/>`,
    f: `<path d="M5 21V4.5A1.5 1.5 0 0 1 6.5 3h11A1.5 1.5 0 0 1 19 4.5V21l-2.33-1.5-2.34 1.5L12 19.5l-2.33 1.5-2.34-1.5Z"/>`,
    cut: `<path d="M8.5 8h7M8.5 11.5h7M8.5 15h4" stroke-width="1.5"/>`,
  },

  // Page with a title, a line item and a right-aligned total.
  invoice: {
    o: `<path d="${PAGE}"/><path d="${PAGE_FOLD}"/><path d="M8.5 9.5h3M8.5 13h7M12.5 16.5h3"/>`,
    f: `<path d="${PAGE}"/>`,
    cut: `<path d="${PAGE_FOLD_CUT}" stroke-width="1.5"/><path d="M8.5 9.5h3M8.5 13h7M12.5 16.5h3" stroke-width="1.5"/>`,
  },

  // Overlap pattern: the front coin clears a gap in the back one.
  coins: {
    o: COIN_R(15, 9, 6),
    ocut: `<circle cx="9" cy="15" r="6" fill="#000" stroke-width="4.5"/>`,
    otop: `${COIN_R(9, 15, 6)}<path d="${DOLLAR_MINI}" transform="translate(-3 1)"/>`,
    f: `${COIN_R(15, 9, 6)}${COIN_R(9, 15, 6)}`,
    cut: `<circle cx="9" cy="15" r="7.7" stroke-width="1.5"/><path d="${DOLLAR_MINI}" transform="translate(-3 1)" stroke-width="1.5"/>`,
  },

  // Banknote.
  money: {
    o: `<rect x="3" y="6" width="18" height="12" rx="2.5"/><circle cx="12" cy="12" r="2.5"/><path d="M6.5 12h.01M17.5 12h.01"/>`,
    f: `<rect x="3" y="6" width="18" height="12" rx="2.5"/>`,
    cut: `<circle cx="12" cy="12" r="2.5" stroke-width="1.5"/><path d="M6.5 12h.01M17.5 12h.01" stroke-width="2"/>`,
  },

  dollar: {
    o: `<path d="M12 3v18M${DOLLAR_S.slice(1)}"/>`,
    bold: true,
  },

  euro: {
    o: `<path d="M18.95 7.05A7 7 0 1 0 18.95 16.95M5 10.25h9M5 13.75h9"/>`,
    bold: true,
  },

  pound: {
    o: `<path d="M17 6.75A3.75 3.75 0 0 0 9.75 8v6.5c0 2.75-1 4.75-2.75 6h11M6.75 13h7.5"/>`,
    bold: true,
  },

  yen: {
    o: `<path d="M6.5 3.5 12 11.5l5.5-8M12 11.5v9M8 13h8M8 16.5h8"/>`,
    bold: true,
  },

  // Generic crypto coin: hexagon (block) inside a coin.
  'bitcoin-like': {
    o: `<circle cx="12" cy="12" r="9"/><path d="${poly(12, 12, 4.5, 6, -90)}"/>`,
    f: `<circle cx="12" cy="12" r="9"/>`,
    cut: `<path d="${poly(12, 12, 4.5, 6, -90)}" stroke-width="1.5"/>`,
  },

  bank: {
    o: `<path d="M3.5 8.5 12 3.5l8.5 5Z"/><path d="M6 11.5v6M10 11.5v6M14 11.5v6M18 11.5v6M3 20.5h18"/>`,
    f: `<path d="M3.5 8.5 12 3.5l8.5 5Z"/><path d="M6 11.5v6M10 11.5v6M14 11.5v6M18 11.5v6M3 20.5h18" fill="none"/>`,
  },

  'piggy-bank': {
    o: `<path d="${PIGGY}"/><path d="M16.5 10.25h.01M10 9.25h3.5M4.8 10.75c-1.1 0-1.8-.7-1.8-1.75"/>`,
    f: `<path d="${PIGGY}"/><path d="M4.8 10.75c-1.1 0-1.8-.7-1.8-1.75" fill="none"/>`,
    cut: `<path d="M16.5 10.25h.01" stroke-width="2"/><path d="M10 9.25h3.5" stroke-width="1.5"/>`,
  },

  'cash-register': {
    o: `<rect x="6" y="3" width="8" height="4" rx="1"/><path d="M10 7v2.5"/><path d="M5.5 9.5h13a1 1 0 0 1 1 .9l.75 6.6H3.75l.75-6.6a1 1 0 0 1 1-.9Z"/><rect x="3" y="17" width="18" height="4" rx="1.5"/>
        <path d="M8 13.25h.01M12 13.25h.01M16 13.25h.01"/>`,
    f: `<rect x="6" y="3" width="8" height="4" rx="1"/><path d="M10 7v2.5" fill="none"/><path d="M5.5 9.5h13a1 1 0 0 1 1 .9l.75 6.6H3.75l.75-6.6a1 1 0 0 1 1-.9Z"/><rect x="3" y="17" width="18" height="4" rx="1.5"/>`,
    cut: `<path d="M8 13.25h.01M12 13.25h.01M16 13.25h.01" stroke-width="2.25"/><path d="M3 17h18" stroke-width="1.25"/>`,
  },

  'price-tag': {
    o: `<path d="${TAG}"/>${TAG_HOLE}`,
    f: `<path d="${TAG}"/>`,
    cut: TAG_HOLE_CUT,
  },

  // Tag with a % sign laid along its axis.
  discount: {
    o: `<path d="${TAG}"/>${TAG_HOLE}<path d="m10.5 15.5 5-5M11 11h.01M15 15h.01"/>`,
    f: `<path d="${TAG}"/>`,
    cut: `${TAG_HOLE_CUT}<path d="m10.5 15.5 5-5" stroke-width="1.5"/><path d="M11 11h.01M15 15h.01" stroke-width="2"/>`,
  },

  // Ticket with side notches and a perforation.
  coupon: {
    o: `<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h13A2.5 2.5 0 0 1 21 7.5v2a2.5 2.5 0 0 0 0 5v2a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 16.5v-2a2.5 2.5 0 0 0 0-5Z"/><path d="M15 8.25v1M15 11.5v1M15 14.75v1"/>`,
    f: `<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h13A2.5 2.5 0 0 1 21 7.5v2a2.5 2.5 0 0 0 0 5v2a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 16.5v-2a2.5 2.5 0 0 0 0-5Z"/>`,
    cut: `<path d="M15 8.25v1M15 11.5v1M15 14.75v1" stroke-width="1.75"/>`,
  },

  'gift-card': {
    o: `${CARD}<path d="M9 5v14M3 11h18"/><path d="M9 11C7.5 8.5 5.5 8 5.5 9.5S7.5 11 9 11Zm0 0c1.5-2.5 3.5-3 3.5-1.5S10.5 11 9 11Z"/>`,
    f: CARD,
    cut: `<path d="M9 5v14M3 11h18" stroke-width="1.5"/><path d="M9 11C7.5 8.5 5.5 8 5.5 9.5S7.5 11 9 11Zm0 0c1.5-2.5 3.5-3 3.5-1.5S10.5 11 9 11Z" stroke-width="1.5"/>`,
  },

  // Card with a repeat arrow in the badge slot.
  subscription: {
    o: `${CARD}<path d="${CARD_STRIPE}"/>`,
    ocut: `<circle cx="18" cy="18" r="5.25" fill="#000" stroke="none"/>`,
    otop: `<path d="${SUB_ARROW}"/>`,
    f: CARD,
    cut: `<path d="${CARD_STRIPE}" stroke-width="2.25"/><circle cx="18" cy="18" r="5.25" fill="#000" stroke="none"/>`,
    top: `<path d="${SUB_ARROW}" fill="none"/>`,
  },

  // Pricing tiers, narrow to wide.
  plan: {
    o: `<rect x="8.5" y="3.5" width="7" height="3.5" rx="1.25"/><rect x="6" y="10" width="12" height="3.5" rx="1.25"/><rect x="3.5" y="16.5" width="17" height="3.5" rx="1.25"/>`,
    f: `<rect x="8.5" y="3.5" width="7" height="3.5" rx="1.25"/><rect x="6" y="10" width="12" height="3.5" rx="1.25"/><rect x="3.5" y="16.5" width="17" height="3.5" rx="1.25"/>`,
  },

  // Arrow up in a circle, accent spark.
  upgrade: {
    o: `<circle cx="10.75" cy="13.25" r="7.5"/><path d="M10.75 17V9.5m-3 3 3-3 3 3"/><path d="${star(18.75, 5.25, 2.25)}"/>`,
    f: `<circle cx="10.75" cy="13.25" r="7.5"/><path d="${star(18.75, 5.25, 2.25)}"/>`,
    cut: `<path d="M10.75 17V9.5m-3 3 3-3 3 3"/>`,
  },

  // Gem inside a round badge.
  'pro-badge': {
    o: `<circle cx="12" cy="12" r="9"/><path d="M9.25 8.75h5.5l2.25 3L12 16.5l-5-4.75Z"/>`,
    f: `<circle cx="12" cy="12" r="9"/>`,
    cut: `<path d="M9.25 8.75h5.5l2.25 3L12 16.5l-5-4.75Z" fill="#000" stroke-width="1.25"/>`,
  },

  // Gem with an accent spark in place of the lower facets.
  diamond: {
    o: `<path d="${GEM}"/><path d="M3 9.5h18M8.5 9.5l2-5.5M15.5 9.5l-2-5.5"/><path d="${star(12, 14, 2.25)}"/>`,
    f: `<path d="${GEM}"/>`,
    cut: `<path d="M3 9.5h18M8.5 9.5l2-5.5M15.5 9.5l-2-5.5" stroke-width="1.5"/><path d="${star(12, 14, 2.5)}" fill="#000" stroke-width="1"/>`,
  },

  // Coin with a counter-clockwise (back) arrow around it.
  refund: {
    o: `<circle cx="12" cy="12" r="4.5"/><path d="${REFUND_ARROW}"/>`,
    f: `<circle cx="12" cy="12" r="4.5"/><path d="${REFUND_ARROW}" fill="none"/>`,
  },

  // Coins at opposite corners, arrows between them.
  transfer: {
    o: `<circle cx="6.5" cy="6.5" r="3.5"/><circle cx="17.5" cy="17.5" r="3.5"/><path d="M13 6.5h7.5M18 4l2.5 2.5L18 9M11 17.5H3.5M6 15l-2.5 2.5L6 20"/>`,
    f: `<circle cx="6.5" cy="6.5" r="3.5"/><circle cx="17.5" cy="17.5" r="3.5"/><path d="M13 6.5h7.5M18 4l2.5 2.5L18 9M11 17.5H3.5M6 15l-2.5 2.5L6 20" fill="none"/>`,
  },

  // Open hand with a coin above.
  payout: {
    o: `<circle cx="14" cy="6.5" r="3.25"/><path d="${HAND}"/>`,
    f: `<circle cx="14" cy="6.5" r="3.25"/><path d="${HAND_F}"/>`,
    cut: `<path d="M10.5 16.25h3" stroke-width="1.5"/>`,
  },

  // Document with currency.
  billing: {
    o: `<path d="${PAGE}"/><path d="${PAGE_FOLD}"/><path d="${DOLLAR_MINI}"/>`,
    f: `<path d="${PAGE}"/>`,
    cut: `<path d="${PAGE_FOLD_CUT}" stroke-width="1.5"/><path d="${DOLLAR_MINI}" stroke-width="1.5"/>`,
  },

  // Pie chart with a coin in front.
  budget: {
    o: `<circle cx="10.5" cy="10.5" r="7.5"/><path d="M10.5 3v7.5H18"/>`,
    ocut: `<circle cx="17" cy="17" r="4" fill="#000" stroke-width="4.5"/>`,
    otop: COIN_R(17, 17, 4),
    f: `<circle cx="10.5" cy="10.5" r="7.5"/>`,
    cut: `<path d="M10.5 3v7.5H18" stroke-width="1.5"/><circle cx="17" cy="17" r="4" fill="#000" stroke-width="4.5"/>`,
    top: COIN_R(17, 17, 4),
  },

  // Coin with a rising arrow beside it.
  'trend-money': {
    o: `${COIN_R(9, 13.5, 6)}<path d="${DOLLAR_MINI}" transform="translate(-3 -.5)"/><path d="M18.5 20V5m-3 3 3-3 3 3"/>`,
    f: `${COIN_R(9, 13.5, 6)}<path d="M18.5 20V5m-3 3 3-3 3 3" fill="none"/>`,
    cut: `<path d="${DOLLAR_MINI}" transform="translate(-3 -.5)" stroke-width="1.5"/>`,
  },

  // Candlesticks.
  'stock-chart': {
    o: `<path d="M6 9.5v10M12 4v10M18 6.5v14"/><rect x="4.5" y="12" width="3" height="5" rx=".75"/><rect x="10.5" y="6" width="3" height="5.5" rx=".75"/><rect x="16.5" y="9" width="3" height="8" rx=".75"/>`,
    f: `<path d="M6 9.5v10M12 4v10M18 6.5v14" fill="none"/><rect x="4.5" y="12" width="3" height="5" rx=".75"/><rect x="10.5" y="6" width="3" height="5.5" rx=".75"/><rect x="16.5" y="9" width="3" height="8" rx=".75"/>`,
  },

  // Balance scale with a coin at the pivot.
  'scale-price': {
    o: `<circle cx="12" cy="5.25" r="2"/><path d="M12 7.25V20.5M7.5 20.5h9M5 10.25h14"/><path d="M3.25 16.5 5 10.25l1.75 6.25a1.75 1.75 0 0 1-3.5 0ZM17.25 16.5 19 10.25l1.75 6.25a1.75 1.75 0 0 1-3.5 0Z"/>`,
    f: `<circle cx="12" cy="5.25" r="2"/><path d="M12 7.25V20.5M7.5 20.5h9M5 10.25h14" fill="none"/><path d="M3.25 16.5a1.75 1.75 0 0 0 3.5 0ZM17.25 16.5a1.75 1.75 0 0 0 3.5 0Z"/><path d="M3.25 16.5 5 10.25l1.75 6.25M17.25 16.5 19 10.25l1.75 6.25" fill="none"/>`,
  },

  // Cart with a check in the basket.
  checkout: {
    o: `<path d="${CART}"/>${WHEELS}<path d="m10.75 10.75 1.75 1.75 3.75-3.75"/>`,
    f: `<path d="${CART_BASKET}"/><path d="${CART_HANDLE}" fill="none"/>${WHEELS}`,
    cut: `<path d="m10.75 10.75 1.75 1.75 3.75-3.75"/>`,
  },

  // Box with a checklist on its front.
  order: {
    o: `${BOX_LID}<path d="${BOX_BODY}"/><path d="M7.75 12.5h.01M10.75 12.5h5.5M7.75 16.25h.01M10.75 16.25h5.5"/>`,
    f: `${BOX_LID}<path d="${BOX_BODY}Z"/>`,
    cut: `<path d="M3 8h18" stroke-width="1.25"/><path d="M7.75 12.5h.01M7.75 16.25h.01" stroke-width="2"/><path d="M10.75 12.5h5.5M10.75 16.25h5.5" stroke-width="1.5"/>`,
  },

  // Truck.
  shipping: {
    o: `<path d="${TRUCK}"/>${TRUCK_WHEELS}`,
    f: `<path d="${TRUCK_F}"/>`,
    cut: `<circle cx="7" cy="17" r="2" fill="#000" stroke-width="3.5"/><circle cx="17" cy="17" r="2" fill="#000" stroke-width="3.5"/>`,
    top: TRUCK_WHEELS,
  },

  // Parcel with speed lines.
  delivery: {
    o: `<rect x="9.5" y="6" width="11.5" height="12" rx="2"/><path d="M13.25 6v4h4V6"/><path d="M3 9h3.5M4 12.5h2.5M3 16h3.5"/>`,
    f: `<rect x="9.5" y="6" width="11.5" height="12" rx="2"/><path d="M3 9h3.5M4 12.5h2.5M3 16h3.5" fill="none"/>`,
    cut: `<path d="M13.25 6v4h4V6" stroke-width="1.5"/>`,
  },

  // Parcel with a U-turn arrow.
  'return-box': {
    o: `<rect x="3" y="10" width="13" height="11" rx="2"/><path d="M7.5 10v3.5h4V10"/><path d="M20.5 13V7.5a3 3 0 0 0-3-3h-8M11.75 2.25 9.5 4.5l2.25 2.25"/>`,
    f: `<rect x="3" y="10" width="13" height="11" rx="2"/><path d="M20.5 13V7.5a3 3 0 0 0-3-3h-8M11.75 2.25 9.5 4.5l2.25 2.25" fill="none"/>`,
    cut: `<path d="M7.5 10v3.5h4V10" stroke-width="1.5"/>`,
  },
};
