import { star, CALENDAR, CALENDAR_RINGS, CALENDAR_RULE, BELL, BELL_CLAPPER, BADGE, BADGE_CLEAR, SLASH, SLASH_CLEAR } from '../shapes.mjs';

const DAYS = 'M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01';

// ── local geometry helpers ───────────────────────────────────────────────────
const n = (v) => +v.toFixed(2);
const pt = (cx, cy, r, deg) => [n(cx + r * Math.cos((deg * Math.PI) / 180)), n(cy + r * Math.sin((deg * Math.PI) / 180))];
/** Clockwise arc (screen coords) from a0 to a1 (degrees) with an arrowhead at a1. */
function arcArrow(cx, cy, r, a0, a1, head) {
  const [x0, y0] = pt(cx, cy, r, a0);
  const [x1, y1] = pt(cx, cy, r, a1);
  const t = ((a1 + 90) * Math.PI) / 180;
  const back = (s) => `${n(x1 - head * Math.cos(t + s))} ${n(y1 - head * Math.sin(t + s))}`;
  return `M${x0} ${y0}A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1}M${back(Math.PI / 4)}L${x1} ${y1}L${back(-Math.PI / 4)}`;
}
/** Radial ray segments around (cx,cy) from r1 to r2 at the given angles. */
const rays = (cx, cy, r1, r2, angles) => angles.map((a) => `M${pt(cx, cy, r1, a).join(' ')}L${pt(cx, cy, r2, a).join(' ')}`).join('');

// ── calendar family (shared CALENDAR shape) ──────────────────────────────────
const CAL_O = `${CALENDAR}<path d="${CALENDAR_RINGS}"/><path d="${CALENDAR_RULE}"/>`;
const CAL_F = `${CALENDAR}<path d="${CALENDAR_RINGS}"/>`;
const CAL_CUT = `<path d="${CALENDAR_RULE}" stroke-width="1.5"/>`;
const calBadge = (glyphO, glyphF = glyphO) => ({
  o: CAL_O,
  ocut: BADGE_CLEAR,
  otop: glyphO,
  f: CAL_F,
  cut: CAL_CUT + BADGE_CLEAR,
  top: glyphF,
});

// Clock badge glyph (bottom-right).
const CLOCK_BADGE = `<circle cx="18" cy="18" r="3.5"/><path d="${BADGE.clock}"/>`;
const CLOCK_BADGE_F = `<circle cx="18" cy="18" r="3.5" fill="none"/><path d="${BADGE.clock}" fill="none"/>`;

const CLOCK_HANDS = 'M12 7v5l3 2';
const RECUR = arcArrow(12, 14.25, 3.5, -40, 245, 2.25);

const GLOBE_O = '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="3.75" ry="9"/><path d="M3 12h18"/>';
const GLOBE_CUT = '<ellipse cx="12" cy="12" rx="3.75" ry="9" stroke-width="1.5"/><path d="M3 12h18" stroke-width="1.5"/>';

const HOURGLASS_GLASS =
  'M7.5 3v3.25a4 4 0 0 0 1.4 3.05L12 12l3.1-2.7a4 4 0 0 0 1.4-3.05V3M7.5 21v-3.25a4 4 0 0 1 1.4-3.05L12 12l3.1 2.7a4 4 0 0 1 1.4 3.05V21';
const HOURGLASS_SOLID = 'M7.5 3h9v3.25a4 4 0 0 1-1.4 3.05L12 12l3.1 2.7a4 4 0 0 1 1.4 3.05V21h-9v-3.25a4 4 0 0 1 1.4-3.05L12 12 8.9 9.3a4 4 0 0 1-1.4-3.05Z';
// Empty glass in the filled style (sand stays solid).
const HOURGLASS_EMPTY = 'M9.25 5.5h5.5v.75a2 2 0 0 1-.5 1.3H9.75a2 2 0 0 1-.5-1.3ZM12 14.25l1.9 1.65c.3.27.55.6.7.95H9.4c.15-.35.4-.68.7-.95Z';
const HOURGLASS_SAND = 'M10 7h4c-.4.7-1.15 1.4-2 2.1-.85-.7-1.6-1.4-2-2.1ZM9.75 19c.3-1.4 1.1-2.3 2.25-2.9 1.15.6 1.95 1.5 2.25 2.9Z';

const FLAG = 'M5 4h12.5l-3 4 3 4H5';

const SUN_RAYS_HALF = rays(12, 19.5, 6.75, 8.75, [-150, -30]);
const HORIZON = 'M3 19.5h18';
const HALF_SUN = 'M7 19.5a5 5 0 0 1 10 0';

const MOON = 'M19.5 14.25A8 8 0 1 1 9.75 4.5a6.25 6.25 0 0 0 9.75 9.75Z';

export default {
  calendar: {
    o: `${CALENDAR}<path d="${CALENDAR_RULE}${CALENDAR_RINGS}"/><path d="${DAYS}"/>`,
    f: `${CALENDAR}<path d="${CALENDAR_RINGS}"/>`,
    cut: `<path d="M3 10h18" stroke-width="1.5"/><path d="${DAYS}" stroke-width="2"/>`,
  },

  'calendar-plus': calBadge(`<path d="${BADGE.plus}"/>`),
  'calendar-minus': calBadge(`<path d="${BADGE.minus}"/>`),
  'calendar-check': calBadge(`<path d="${BADGE.check}"/>`, `<path d="${BADGE.check}" fill="none"/>`),
  'calendar-x': calBadge(`<path d="${BADGE.x}"/>`),
  'calendar-clock': calBadge(CLOCK_BADGE, CLOCK_BADGE_F),

  // Month grid.
  'calendar-days': {
    o: `${CAL_O}<path d="M9 10v11M15 10v11M3 15.5h18"/>`,
    f: CAL_F,
    cut: `<path d="${CALENDAR_RULE}M9 10v11M15 10v11M3 15.5h18" stroke-width="1.5"/>`,
  },

  // Highlighted span of days.
  'calendar-range': {
    o: `${CAL_O}<rect x="6.5" y="13.25" width="11" height="4.5" rx="2.25"/>`,
    f: CAL_F,
    cut: `${CAL_CUT}<rect x="6.5" y="13.25" width="11" height="4.5" rx="2.25" fill="#000" stroke-width="1"/>`,
  },

  // Hero spark replaces the day grid (the rule is dropped to give it room).
  'calendar-sparkle': {
    o: `${CALENDAR}<path d="${CALENDAR_RINGS}"/><path d="${star(12, 14, 4)}"/>`,
    f: CAL_F,
    cut: `<path d="${star(12, 14, 4)}" fill="#000" stroke-width="1"/>`,
  },

  clock: {
    o: `<circle cx="12" cy="12" r="9"/><path d="${CLOCK_HANDS}"/>`,
    f: `<circle cx="12" cy="12" r="9"/>`,
    cut: `<path d="${CLOCK_HANDS}"/>`,
  },

  'clock-alert': {
    o: `<circle cx="12" cy="12" r="9"/><path d="${CLOCK_HANDS}"/>`,
    ocut: BADGE_CLEAR,
    otop: `<path d="${BADGE.alert}"/>`,
    f: `<circle cx="12" cy="12" r="9"/>`,
    cut: `<path d="${CLOCK_HANDS}"/>${BADGE_CLEAR}`,
    top: `<path d="${BADGE.alert}"/>`,
  },

  'alarm-clock': {
    o: `<circle cx="12" cy="13" r="7.5"/><path d="M12 9.5V13l2.25 1.5M3 6.5 6.5 3M21 6.5 17.5 3M6.75 18.5 5 20.5M17.25 18.5 19 20.5"/>`,
    f: `<circle cx="12" cy="13" r="7.5"/><path d="M3 6.5 6.5 3M21 6.5 17.5 3M6.75 18.5 5 20.5M17.25 18.5 19 20.5" fill="none"/>`,
    cut: `<path d="M12 9.5V13l2.25 1.5"/>`,
  },

  stopwatch: {
    o: `<circle cx="12" cy="13.75" r="7.25"/><path d="M10 3h4M12 3v3.5M12 13.75V10M18.25 7.5l1.25-1.25"/>`,
    f: `<circle cx="12" cy="13.75" r="7.25"/><path d="M10 3h4M12 3v3.5M18.25 7.5l1.25-1.25" fill="none"/>`,
    cut: `<path d="M12 13.75V10"/>`,
  },

  // Countdown wedge.
  timer: {
    o: `<circle cx="12" cy="12" r="9"/><path d="M12 12V7a5 5 0 0 1 5 5Z" fill="currentColor"/>`,
    f: `<circle cx="12" cy="12" r="9"/>`,
    cut: `<path d="M12 12V7a5 5 0 0 1 5 5Z" fill="#000"/>`,
  },

  'timer-off': {
    o: `<circle cx="12" cy="12" r="9"/><path d="M12 12V7a5 5 0 0 1 5 5Z" fill="currentColor"/>`,
    ocut: SLASH_CLEAR,
    otop: SLASH,
    f: `<circle cx="12" cy="12" r="9"/>`,
    cut: `<path d="M12 12V7a5 5 0 0 1 5 5Z" fill="#000"/>${SLASH_CLEAR}`,
    top: SLASH,
  },

  'hourglass-half': {
    o: `<path d="M5.5 3h13M5.5 21h13"/><path d="${HOURGLASS_GLASS}"/><path d="${HOURGLASS_SAND}" fill="currentColor" stroke="none"/>`,
    f: `<path d="M5.5 3h13M5.5 21h13"/><path d="${HOURGLASS_SOLID}"/>`,
    cut: `<path d="${HOURGLASS_EMPTY}" fill="#000" stroke-width="1"/>`,
  },

  // Calendar with a list.
  schedule: {
    o: `${CAL_O}<path d="M7 14h10M7 17.5h6"/>`,
    f: CAL_F,
    cut: `<path d="${CALENDAR_RULE}M7 14h10M7 17.5h6" stroke-width="1.5"/>`,
  },

  // Planner with binding tabs.
  agenda: {
    o: `<rect x="5" y="3" width="15" height="18" rx="2.5"/><path d="M3 7.5h4M3 12h4M3 16.5h4"/><path d="M10.5 8h5.5M10.5 12h5.5M10.5 16h3.5"/>`,
    f: `<rect x="5" y="3" width="15" height="18" rx="2.5"/><path d="M3 7.5h4M3 12h4M3 16.5h4" fill="none"/>`,
    cut: `<path d="M10.5 8h5.5M10.5 12h5.5M10.5 16h3.5" stroke-width="1.5"/><path d="M7.5 7.5h.5M7.5 12h.5M7.5 16.5h.5" stroke-width="1.5"/>`,
  },

  // Bell with a clock badge.
  reminder: {
    o: `<path d="${BELL}"/><path d="${BELL_CLAPPER}"/>`,
    ocut: BADGE_CLEAR,
    otop: CLOCK_BADGE,
    f: `<path d="${BELL}"/><path d="${BELL_CLAPPER}Z"/>`,
    cut: BADGE_CLEAR,
    top: CLOCK_BADGE_F,
  },

  // Clock with a Z.
  snooze: {
    o: `<circle cx="10.5" cy="13.5" r="7.5"/><path d="M10.5 10v3.5l2 1.5"/>`,
    ocut: `<path d="M15 3h5l-5 5.5h5" stroke-width="5"/>`,
    otop: `<path d="M15 3h5l-5 5.5h5"/>`,
    f: `<circle cx="10.5" cy="13.5" r="7.5"/>`,
    cut: `<path d="M10.5 10v3.5l2 1.5"/><path d="M15 3h5l-5 5.5h5" stroke-width="5"/>`,
    top: `<path d="M15 3h5l-5 5.5h5" fill="none"/>`,
  },

  // Flag with a clock badge.
  deadline: {
    o: `<path d="M5 21V3.5"/><path d="${FLAG}"/>`,
    ocut: BADGE_CLEAR,
    otop: CLOCK_BADGE,
    f: `<path d="M5 21V3.5" fill="none"/><path d="${FLAG}Z"/>`,
    cut: BADGE_CLEAR,
    top: CLOCK_BADGE_F,
  },

  // Calendar with a repeat arrow (rule dropped, like calendar-sparkle, so the arrow can be legible).
  recurring: {
    o: `${CALENDAR}<path d="${CALENDAR_RINGS}"/><path d="${RECUR}"/>`,
    f: CAL_F,
    cut: `<path d="${RECUR}"/>`,
  },

  // Globe with a clock badge.
  'time-zone': {
    o: GLOBE_O,
    ocut: BADGE_CLEAR,
    otop: CLOCK_BADGE,
    f: `<circle cx="12" cy="12" r="9"/>`,
    cut: GLOBE_CUT + BADGE_CLEAR,
    top: CLOCK_BADGE_F,
  },

  sunrise: {
    o: `<path d="${HALF_SUN}"/><path d="${HORIZON}${SUN_RAYS_HALF}M12 11V5M9.5 7.5 12 5l2.5 2.5"/>`,
    f: `<path d="${HALF_SUN}Z"/><path d="${HORIZON}${SUN_RAYS_HALF}M12 11V5M9.5 7.5 12 5l2.5 2.5" fill="none"/>`,
  },

  sunset: {
    o: `<path d="${HALF_SUN}"/><path d="${HORIZON}${SUN_RAYS_HALF}M12 5v6M9.5 8.5 12 11l2.5-2.5"/>`,
    f: `<path d="${HALF_SUN}Z"/><path d="${HORIZON}${SUN_RAYS_HALF}M12 5v6M9.5 8.5 12 11l2.5-2.5" fill="none"/>`,
  },

  day: {
    o: `<circle cx="12" cy="12" r="4"/><path d="${rays(12, 12, 6.75, 8.75, [0, 45, 90, 135, 180, 225, 270, 315])}"/>`,
    f: `<circle cx="12" cy="12" r="4"/><path d="${rays(12, 12, 6.75, 8.75, [0, 45, 90, 135, 180, 225, 270, 315])}" fill="none"/>`,
  },

  // Crescent moon with small twinkles (crosses, not AI sparks).
  night: {
    o: `<path d="${MOON}"/><path d="M17 3.5v3.5M15.25 5.25h3.5M20.5 9.5h.01"/>`,
    f: `<path d="${MOON}"/><path d="M17 3.5v3.5M15.25 5.25h3.5M20.5 9.5h.01" fill="none"/>`,
  },
};
