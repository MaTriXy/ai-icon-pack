// Shared base silhouettes. Every icon built on one of these objects MUST import it from here
// (e.g. file-plus, file-sparkle, file-lock all use PAGE), so variants line up exactly across categories.
// Paths are closed so they work for both outline (`o`) and filled (`f`).
import { star, gear } from './helpers.mjs';

export { star };

// ── Modifier badge (bottom-right) ─────────────────────────────────────────────
// Badge glyphs sit in a cleared circle at (18,18). Knock the base out with BADGE_CLEAR
// (in `ocut` for outline and `cut` for filled), then draw the glyph in `otop` / `top`.
export const BADGE_CLEAR = '<circle cx="18" cy="18" r="5.25" fill="#000" stroke="none"/>';
export const BADGE = {
  plus: 'M18 15v6M15 18h6',
  minus: 'M15 18h6',
  x: 'm15.75 15.75 4.5 4.5m0-4.5-4.5 4.5',
  check: 'm15 18 2 2 4-4',
  spark: star(18, 18, 3.5),
  alert: 'M18 15v3.25M18 21h.01',
  question: 'M16.25 16.25a1.85 1.85 0 0 1 3.5.75c0 1.25-1.75 1.5-1.75 2.5M18 21h.01',
  arrowUp: 'M18 21v-6m-2.5 2.5L18 15l2.5 2.5',
  arrowDown: 'M18 15v6m-2.5-2.5L18 21l2.5-2.5',
  clock: 'M18 16v2l1.25 1.25', // pair with a circle r3.5 at (18,18)
};

// ── "-off" slash ──────────────────────────────────────────────────────────────
// ocut/cut: SLASH_CLEAR, then otop/top: SLASH.
export const SLASH = '<path d="M3 3 21 21"/>';
export const SLASH_CLEAR = '<path d="M3 3 21 21" stroke-width="5"/>';

// ── Communication ─────────────────────────────────────────────────────────────
export const BUBBLE = 'M12 3.5c5 0 8.5 3 8.5 7.5S17 18 12 18c-1 0-2-.1-2.9-.4L4.5 20l1-3.8C4.2 14.8 3.5 12.9 3.5 11 3.5 6.5 7 3.5 12 3.5Z';
export const BUBBLE_CENTER = [12, 10.75]; // optical centre of BUBBLE's body
export const ENVELOPE = '<rect x="3" y="5" width="18" height="14" rx="2.5"/>';
export const ENVELOPE_FLAP = 'm3.5 7 8.5 6 8.5-6';
export const PLANE = 'M21 3 7.5 8.5l5 3 3 5Z'; // send; crease: M12.5 11.5 21 3

// ── Documents & storage ───────────────────────────────────────────────────────
export const PAGE = 'M14 3H7.5A2.5 2.5 0 0 0 5 5.5v13A2.5 2.5 0 0 0 7.5 21h9a2.5 2.5 0 0 0 2.5-2.5V8Z';
export const PAGE_FOLD = 'M14 3v4a1 1 0 0 0 1 1h4';
export const PAGE_FOLD_CUT = 'M14 3.5V7a1 1 0 0 0 1 1h3.5'; // fold as a knockout in filled style (stroke-width 1.5)
export const FOLDER = 'M4.5 20h15a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-7l-1.9-2.1A2 2 0 0 0 8.9 4H4.5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z';
export const CLOUD = 'M6.5 19a4.5 4.5 0 0 1-1-8.89A6 6 0 0 1 17.5 10.03 4.5 4.5 0 0 1 17 19Z';
export const DATABASE = '<ellipse cx="12" cy="5.5" rx="7.5" ry="2.75"/><path d="M4.5 5.5v13c0 1.5 3.4 2.75 7.5 2.75s7.5-1.25 7.5-2.75v-13"/><path d="M4.5 12c0 1.5 3.4 2.75 7.5 2.75s7.5-1.25 7.5-2.75"/>';

// ── Places, security, status ──────────────────────────────────────────────────
export const HOUSE = 'M4 10.5 12 4l8 6.5v8a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 18.5Z';
export const SHIELD = 'M12 21.5C7.5 20 4 16.5 4 11.5v-6l8-3 8 3v6c0 5-3.5 8.5-8 10Z';
export const LOCK_BODY = '<rect x="4" y="11" width="16" height="10" rx="2.5"/>';
export const LOCK_SHACKLE = 'M7.5 11V7.5a4.5 4.5 0 0 1 9 0V11';
export const BELL = 'M6.5 8.5a5.5 5.5 0 0 1 11 0c0 5.5 2.5 7.5 3 8H3.5c.5-.5 3-2.5 3-8Z';
export const BELL_CLAPPER = 'M10 19.5a2 2 0 0 0 4 0'; // close with Z for filled

// ── People ────────────────────────────────────────────────────────────────────
export const HEAD = '<circle cx="12" cy="7.5" r="4"/>';
export const BODY = 'M4 21c0-3.9 3.6-7 8-7s8 3.1 8 7'; // add Z for filled

// ── Screens & media ───────────────────────────────────────────────────────────
export const MONITOR = '<rect x="2.5" y="4" width="19" height="13" rx="2.5"/>';
export const MONITOR_STAND = 'M8 21h8M12 17v4';
export const PHONE = '<rect x="6" y="2.5" width="12" height="19" rx="3"/>'; // speaker: M10.5 5.5h3
export const FRAME = '<rect x="3" y="3" width="18" height="18" rx="2.5"/>'; // image/window frame
export const HILL = 'm21 16-3.4-3.4a1.75 1.75 0 0 0-2.45 0L5.5 21'; // image landscape line inside FRAME
export const CALENDAR = '<rect x="3" y="5" width="18" height="16" rx="2.5"/>';
export const CALENDAR_RINGS = 'M8 3v4M16 3v4';
export const CALENDAR_RULE = 'M3 10h18';

// ── Search & settings ─────────────────────────────────────────────────────────
export const LENS = '<circle cx="11" cy="11" r="7"/>';
export const LENS_HANDLE = 'm21 21-5-5';
export const GEAR = gear(12, 12, 8, 9.5, 7, 0.13, 0.2); // spark or circle r3.25 at centre
