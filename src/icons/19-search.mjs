import { star, LENS, LENS_HANDLE, PAGE, PAGE_FOLD, PAGE_FOLD_CUT, FRAME, HILL, HEAD, BODY, BADGE_CLEAR } from '../shapes.mjs';

const n = (v) => +v.toFixed(2);

// Lens content sits inside LENS (centre 11,11, r 7).
const lensIcon = (inner) => ({
  o: `${LENS}<path d="${LENS_HANDLE}"/><path d="${inner}"/>`,
  bold: true,
});

// Small magnifier glyph for the bottom-right badge slot (same as 10-users).
const MAG_BADGE = '<circle cx="17.25" cy="17.25" r="2.25"/><path d="m18.9 18.9 2.1 2.1"/>';
const MAG_BADGE_F = '<circle cx="17.25" cy="17.25" r="2.25" fill="none"/><path d="m18.9 18.9 2.1 2.1"/>';
const magBadge = (o, f, cut = '') => ({
  o,
  ocut: BADGE_CLEAR,
  otop: MAG_BADGE,
  f,
  cut: cut + BADGE_CLEAR,
  top: MAG_BADGE_F,
});

// 5-point star (centre, outer r, inner r).
function star5(cx, cy, ro, ri) {
  const p = [];
  for (let i = 0; i < 10; i++) {
    const a = ((-90 + 36 * i) * Math.PI) / 180;
    const r = i % 2 ? ri : ro;
    p.push(`${n(cx + r * Math.cos(a))} ${n(cy + r * Math.sin(a))}`);
  }
  return `M${p.join('L')}Z`;
}

const STAR5 = star5(10.25, 13.25, 7.75, 3.6);
const HEART = 'M12 20c-.5 0-8.5-4.75-8.5-10.75A4.5 4.5 0 0 1 12 6.75a4.5 4.5 0 0 1 8.5 2.5C20.5 15.25 12.5 20 12 20Z';
const FLAME = 'M12 21c-3.9 0-6.5-2.6-6.5-6 0-3.4 2.5-5.1 3.25-8 1.25 1.25 2 2.5 2.1 4C12 9 13 6 12.75 3c3.5 2 5.75 6.75 5.75 12 0 3.4-2.6 6-6.5 6Z';
const FUNNEL = 'M3 4h14l-5.25 6.75v7l-3.5 2.5v-9.5Z';
const MAP = 'M3 6l6-2.5 6 2.5 6-2.5V18l-6 2.5L9 18l-6 2.5Z';
const MAP_FOLDS = 'M9 3.5V18M15 6v14.5';
const MIC_BODY = '<rect x="9" y="3" width="6" height="11.5" rx="3"/>';
const MIC_STAND = 'M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5v4';
const CAMERA = 'M3 8.5A2.5 2.5 0 0 1 5.5 6h2L9 4h6l1.5 2h2A2.5 2.5 0 0 1 21 8.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5Z';
const TUBE = '<rect x="4.5" y="6.25" width="15" height="4.5" rx="1.5" transform="rotate(-25 12 8.5)"/>';

export default {
  search: {
    o: `<circle cx="11" cy="11" r="7"/><path d="m21 21-5-5"/>`,
    bold: true,
  },

  'search-plus': lensIcon('M11 8v6M8 11h6'),
  'search-minus': lensIcon('M8 11h6'),
  'search-x': lensIcon('m8.75 8.75 4.5 4.5m0-4.5-4.5 4.5'),
  'search-check': lensIcon('m8 11 2 2 4-4'),
  'search-code': lensIcon('M9.25 8.5 6.75 11l2.5 2.5M12.75 8.5l2.5 2.5-2.5 2.5'),

  'search-image': magBadge(
    `${FRAME}<circle cx="8.5" cy="8.5" r="1.5"/><path d="${HILL}"/>`,
    FRAME,
    `<circle cx="8.5" cy="8.5" r="1.75" fill="#000" stroke="none"/><path d="${HILL}" stroke-width="1.5"/>`,
  ),

  'search-file': magBadge(`<path d="${PAGE}"/><path d="${PAGE_FOLD}"/>`, `<path d="${PAGE}"/>`, `<path d="${PAGE_FOLD_CUT}" stroke-width="1.5"/>`),

  'search-user': magBadge(`${HEAD}<path d="${BODY}"/>`, `${HEAD}<path d="${BODY}Z"/>`),

  // Magnifier with clock hands.
  'search-history': lensIcon('M11 7.5V11l2.25 1.5'),

  // Small magnifier inside scan corners.
  'scan-search': {
    o: `<path d="M3 7.5v-2A2.5 2.5 0 0 1 5.5 3h2M16.5 3h2A2.5 2.5 0 0 1 21 5.5v2M21 16.5v2a2.5 2.5 0 0 1-2.5 2.5h-2M7.5 21h-2A2.5 2.5 0 0 1 3 18.5v-2"/>
        <circle cx="11.25" cy="11.25" r="3.25"/><path d="m13.6 13.6 2.65 2.65"/>`,
    bold: true,
  },

  // Compass.
  explore: {
    o: `<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5Z"/>`,
    f: `<circle cx="12" cy="12" r="9"/>`,
    cut: `<path d="m15.5 8.5-2 5-5 2 2-5Z" fill="#000" stroke-width="1.25"/>`,
  },

  // Telescope on a tripod.
  discover: {
    o: `${TUBE}<path d="M16.25 4.75 17.9 8.3"/><path d="M12 11 8 21M12 11l4 10"/>`,
    f: `${TUBE}<path d="M12 11 8 21M12 11l4 10" fill="none"/>`,
    cut: `<path d="M16.25 4.75 17.9 8.3" stroke-width="1.5"/>`,
  },

  binoculars: {
    o: `<path d="M3 16.25V9.5A2.5 2.5 0 0 1 5.5 7H8a2.5 2.5 0 0 1 2.5 2.5v6.75M13.5 16.25V9.5A2.5 2.5 0 0 1 16 7h2.5A2.5 2.5 0 0 1 21 9.5v6.75"/>
        <circle cx="6.75" cy="16.25" r="3.75"/><circle cx="17.25" cy="16.25" r="3.75"/><path d="M10.5 11h3M5 7V4.5h3.5V7M15.5 7V4.5H19V7"/>`,
    f: `<path d="M3 16.25V9.5A2.5 2.5 0 0 1 5.5 7H8a2.5 2.5 0 0 1 2.5 2.5v6.75ZM13.5 16.25V9.5A2.5 2.5 0 0 1 16 7h2.5A2.5 2.5 0 0 1 21 9.5v6.75Z"/>
        <circle cx="6.75" cy="16.25" r="3.75"/><circle cx="17.25" cy="16.25" r="3.75"/><path d="M5 7V4.5h3.5V7ZM15.5 7V4.5H19V7Z"/><path d="M10.5 11h3" fill="none"/>`,
    cut: `<circle cx="6.75" cy="16.25" r="1.5" fill="#000" stroke="none"/><circle cx="17.25" cy="16.25" r="1.5" fill="#000" stroke="none"/>`,
  },

  radar: {
    o: `<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/><path d="m12 12 6.36-6.36"/>`,
    f: `<circle cx="12" cy="12" r="9"/>`,
    cut: `<circle cx="12" cy="12" r="4.5" stroke-width="1.5"/><path d="m12 12 6.36-6.36" stroke-width="1.5"/>`,
  },

  'map-search': magBadge(`<path d="${MAP}"/><path d="${MAP_FOLDS}"/>`, `<path d="${MAP}"/>`, `<path d="${MAP_FOLDS}" stroke-width="1.5"/>`),

  // Flame with a rising arrow.
  trending: {
    o: `<path d="${FLAME}"/><path d="M12 18.25v-4.5m-2.25 2.25L12 13.75l2.25 2.25"/>`,
    f: `<path d="${FLAME}"/>`,
    cut: `<path d="M12 18.25v-4.5m-2.25 2.25L12 13.75l2.25 2.25"/>`,
  },

  // Star with an accent spark.
  recommend: {
    o: `<path d="${STAR5}"/><path d="${star(18.5, 5.5, 2.25)}"/>`,
    f: `<path d="${STAR5}"/><path d="${star(18.5, 5.5, 2.25)}"/>`,
  },

  // Heart with an accent spark inside.
  'for-you': {
    o: `<path d="${HEART}"/><path d="${star(12, 12.5, 2.5)}"/>`,
    f: `<path d="${HEART}"/>`,
    cut: `<path d="${star(12, 12.5, 2.75)}" fill="#000" stroke-width="1"/>`,
  },

  'filter-search': magBadge(`<path d="${FUNNEL}"/>`, `<path d="${FUNNEL}"/>`),

  'voice-search': magBadge(`${MIC_BODY}<path d="${MIC_STAND}"/>`, `${MIC_BODY}<path d="${MIC_STAND}" fill="none"/>`),

  'visual-search': magBadge(
    `<path d="${CAMERA}"/><circle cx="10.75" cy="12.25" r="3"/>`,
    `<path d="${CAMERA}"/>`,
    `<circle cx="10.75" cy="12.25" r="3" stroke-width="1.5"/>`,
  ),
};
