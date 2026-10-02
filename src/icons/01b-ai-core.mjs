import { star, LENS, LENS_HANDLE, MONITOR, MONITOR_STAND, FRAME, HILL, BUBBLE, PAGE, PAGE_FOLD, PAGE_FOLD_CUT } from '../shapes.mjs';

// ── Local shared shapes ───────────────────────────────────────────────────────
// Rounded scan corners (scan, ocr, face-detect).
const CORNERS3 = 'M3 8V5.5A2.5 2.5 0 0 1 5.5 3H8M21 16v2.5a2.5 2.5 0 0 1-2.5 2.5H16M8 21H5.5A2.5 2.5 0 0 1 3 18.5V16'; // top-right left for a spark
const CORNERS = `${CORNERS3}M16 3h2.5A2.5 2.5 0 0 1 21 5.5V8`;
// Class label filling the top-left corner of FRAME (object-detect).
const LABEL = 'M3 8V5.5A2.5 2.5 0 0 1 5.5 3H11v3.5A1.5 1.5 0 0 1 9.5 8Z';
// Pointer cursor, tip at the origin of the relative path.
const cursor = (x, y, s = 1) => {
  const n = (v) => +(v * s).toFixed(2);
  return `M${x} ${y}l${n(7.5)} ${n(2.75)}-${n(3.25)} ${n(1.5)}-${n(1.5)} ${n(3.25)}Z`;
};
// Lightbulb, centre of the glass at (12,10), r 6.75.
const BULB = 'M9 17.25v-.5c0-.6-1.02-1.12-2.03-2.25A6.75 6.75 0 1 1 17.03 14.5c-1.01 1.13-2.03 1.65-2.03 2.25v.5Z';
const BULB_BASE = 'M9.5 20.5h5';
// Transparency checkerboard (3-unit cells over the 3..21 square), and a person bust (remove-background).
const CHECKER = 'M3 6V5.5A2.5 2.5 0 0 1 5.5 3H6v3ZM9 3h3v3h-3ZM15 3h3v3h-3ZM6 6h3v3h-3ZM12 6h3v3h-3ZM18 6h3v3h-3ZM3 9h3v3h-3ZM9 9h3v3h-3ZM15 9h3v3h-3ZM6 12h3v3h-3ZM12 12h3v3h-3ZM18 12h3v3h-3ZM3 15h3v3h-3ZM9 15h3v3h-3ZM15 15h3v3h-3ZM6 18h3v3h-3ZM12 18h3v3h-3ZM18 21h.5a2.5 2.5 0 0 0 2.5-2.5V18h-3Z';
// Organic mask contour (segmentation).
const BLOB = 'M12 3.25c4.75 0 8.5 3.25 8.5 8.25 0 5.25-3.5 9.25-8.75 9.25-4.75 0-8.25-3.75-8.25-8.75S7.25 3.25 12 3.25Z';
const BUST = 'M5.5 21c0-3.3 2.9-5.5 6.5-5.5s6.5 2.2 6.5 5.5';
// Paintbrush head, drawn upright and rotated into place (style-transfer).
const BRUSH_TIP = 'M9 12h6v2.5c0 3-1.5 5.25-3 6.5-1.5-1.25-3-3.5-3-6.5Z';
// Content frame of the -generate family; its top-right corner gives way to the spark at (17.5,6.5).
const GEN_FRAME = '<rect x="3" y="6" width="15" height="15" rx="2.5"/>';
const AUDIO_BARS = 'M3.5 12v3M7 7.5v12M10.5 10v7M14 11.5v4M17.5 13.5v1';
// Speaking person (voice-clone).
const SPEAKER = 'M4.5 21c0-3.3 2.35-5.75 5.25-5.75S15 17.7 15 21';
const VOICE_WAVES = 'M14.55 5a6.25 6.25 0 0 1 0 8M17.5 3.55a9.5 9.5 0 0 1 0 10.9';
// Sound waves for text-to-speech, mirrored for speech-to-text.
const TTS_WAVES = 'M15 8.5a5 5 0 0 1 0 7M17.5 6a8.5 8.5 0 0 1 0 12';
const STT_WAVES = 'M9 8.5a5 5 0 0 0 0 7M6.5 6a8.5 8.5 0 0 0 0 12';
// Short pencil drawn upright around (12,12), rotated into place (rewrite).
const SMALL_PENCIL = 'M10.25 14V8.25a1 1 0 0 1 1-1h1.5a1 1 0 0 1 1 1V14L12 16.75Z';
const TEXT3 = 'M3 6h8M3 12h8M3 18h8';
const QMARK = 'M10 8.5a2 2 0 1 1 3 1.73c-.6.35-1 .77-1 1.52v.25';
// Tone dial (change-tone).
const DIAL = 'M7 14a5 5 0 0 1 10 0M12 14l1.5-1.75';
// Polygon with rounded corners (radius per corner, or one radius for all).
function roundPoly(pts, radii) {
  const n = (v) => +v.toFixed(2);
  let d = '';
  pts.forEach((P, i) => {
    const A = pts[(i + pts.length - 1) % pts.length], B = pts[(i + 1) % pts.length];
    const r = Array.isArray(radii) ? radii[i] : radii;
    const u = [A[0] - P[0], A[1] - P[1]], v = [B[0] - P[0], B[1] - P[1]];
    const lu = Math.hypot(...u), lv = Math.hypot(...v);
    const ang = Math.acos((u[0] * v[0] + u[1] * v[1]) / (lu * lv));
    const t = r / Math.tan(ang / 2);
    const T1 = [P[0] + (u[0] / lu) * t, P[1] + (u[1] / lu) * t], T2 = [P[0] + (v[0] / lv) * t, P[1] + (v[1] / lv) * t];
    const z = (P[0] - A[0]) * (B[1] - P[1]) - (P[1] - A[1]) * (B[0] - P[0]);
    d += `${i ? 'L' : 'M'}${n(T1[0])} ${n(T1[1])}A${r} ${r} 0 0 ${z > 0 ? 1 : 0} ${n(T2[0])} ${n(T2[1])}`;
  });
  return d + 'Z';
}
const TRIANGLE = roundPoly([[6.75, 3], [10.5, 10.25], [3, 10.25]], 1.25);
// Comedy mask (persona).
const MASK = 'M4 5.5c2.5-1.75 5.25-2.5 8-2.5s5.5.75 8 2.5V11c0 5.5-3.5 10-8 10s-8-4.5-8-10Z';
const MASK_FACE = 'M7 10.5c1-1.25 2.5-1.25 3.5 0M13.5 10.5c1-1.25 2.5-1.25 3.5 0M8.5 14.5c1.75 2 5.25 2 7 0';
// Head in profile, facing right (digital-human).
const PROFILE = 'M7.5 21v-3.25C5 16.25 3.5 13.75 3.5 10.75 3.5 6.5 7 3 11.5 3c4.25 0 7.25 3 7.5 6.75l1.5 3.25c.25.5-.1 1-.6 1h-1.4v2.5a2 2 0 0 1-2 2H14V21';
const LIPS = 'M6.5 12c1.5-2 3-3 4.25-3 .6 0 1 .25 1.25.5.25-.25.65-.5 1.25-.5 1.25 0 2.75 1 4.25 3-1.5 2.25-3.25 3.5-5.5 3.5S8 14.25 6.5 12Z';
// Price/label tag, hole corner at top-left (ai-generated-label).
const TAG = roundPoly([[3.75, 3.75], [12.25, 3.75], [21.25, 12.75], [12.75, 21.25], [3.75, 12.25]], [2.5, 2, 2, 2, 2]);
const BRACES = 'M7 4h-.5C5.5 4 5 4.5 5 5.5V10c0 1-.75 2-2 2 1.25 0 2 1 2 2v4.5c0 1 .5 1.5 1.5 1.5H7M17 4h.5c1 0 1.5.5 1.5 1.5V10c0 1 .75 2 2 2-1.25 0-2 1-2 2v4.5c0 1-.5 1.5-1.5 1.5H17';
const METER_FILL = 'M5.75 14.5H13.5V20H5.75a2.75 2.75 0 0 1 0-5.5Z'; // usage: 60% of the track
const BOLT ='M12.75 9.25 9.75 13.75H12l-.75 4 3-4.5H12Z';
// Box starting at top-centre so the dash pattern is symmetric (sandbox).
const BOX = 'M12 3h6.5A2.5 2.5 0 0 1 21 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5v-13A2.5 2.5 0 0 1 5.5 3Z';
// Spark knocked out of a filled shape (hole slightly larger than the outline spark).
const sparkCut = (cx, cy, r) => `<path d="${star(cx, cy, r)}" fill="#000" stroke-width="1"/>`;
// Clearance around a spark that overlaps another shape.
const sparkClear = (cx, cy, r) => `<path d="${star(cx, cy, r)}" fill="#000" stroke-width="4.5"/>`;
const sp = (cx, cy, r) => `<path d="${star(cx, cy, r)}"/>`;

export default {
  // 2×2 grid: the fourth variation is the spark.
  variations: {
    o: `<rect x="3" y="3" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2"/>${sp(17.25, 17.25, 3.75)}`,
    f: `<rect x="3" y="3" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2"/>${sp(17.25, 17.25, 3.75)}`,
  },

  // Wand (same build as wand-sparkles) conjuring over two text lines.
  improve: {
    o: `<g transform="rotate(-45 8 16)"><rect x="2.375" y="14.75" width="11.25" height="2.5" rx="1"/><path d="M10.5 14.75v2.5"/></g>
        ${sp(16.75, 7.25, 4)}<path d="M14.5 15.5h6.5M10 20h11"/>`,
    f: `<rect transform="rotate(-45 8 16)" x="2.375" y="14.75" width="11.25" height="2.5" rx="1"/>${sp(16.75, 7.25, 4)}
        <path stroke-width="2.25" d="M14.5 15.5h6.5M10 20h11"/>`,
    cut: `<path transform="rotate(-45 8 16)" d="M10.5 13.5v5" stroke-width="1.25"/>`,
  },

  // Typed text, then a dotted ghost continuation.
  autocomplete: {
    o: `<path d="M3 6.75h7.5M3 13.75h15M3 19.75h7"/><path d="M13.75 19.75h.01M17.25 19.75h.01M20.75 19.75h.01"/>${sp(17.25, 6.75, 3.75)}`,
    f: `<path stroke-width="2.25" d="M3 6.75h7.5M3 13.75h15M3 19.75h7M13.75 19.75h.01M17.25 19.75h.01M20.75 19.75h.01"/>${sp(17.25, 6.75, 3.75)}`,
  },

  // Spark as the filament.
  suggestion: {
    o: `<path d="${BULB}"/><path d="${BULB_BASE}"/>${sp(12, 10, 3.5)}`,
    f: `<path d="${BULB}"/><path d="${BULB_BASE}"/>`,
    cut: sparkCut(12, 10, 3.5),
  },

  'ai-search': {
    o: `${LENS}<path d="${LENS_HANDLE}"/>${sp(11, 11, 3.75)}`,
    f: `${LENS}<path d="${LENS_HANDLE}" stroke-width="2.5"/>`,
    cut: sparkCut(11, 11, 3.75),
  },

  // Lens in front of a second lens: searching several layers deep.
  'deep-research': {
    o: `<circle cx="9.5" cy="9.5" r="6.5"/>`,
    ocut: `<circle cx="12.75" cy="12.75" r="6.5" fill="#000" stroke-width="4.5"/>`,
    otop: `<circle cx="12.75" cy="12.75" r="6.5"/><path d="m17.5 17.5 3.5 3.5"/>${sp(12.75, 12.75, 3.5)}`,
    f: `<circle cx="9.5" cy="9.5" r="6.5"/><circle cx="12.75" cy="12.75" r="6.5"/>`,
    cut: `<circle cx="12.75" cy="12.75" r="8" stroke-width="1.25"/>${sparkCut(12.75, 12.75, 3.5)}`,
    top: `<path d="m17.5 17.5 3.5 3.5" stroke-width="2.5"/>`,
  },

  // Globe with the agent's pointer.
  'web-browse': {
    o: `<circle cx="10.5" cy="10.5" r="7.5"/><path d="M10.5 3c-2 2-3 4.5-3 7.5s1 5.5 3 7.5M10.5 3c2 2 3 4.5 3 7.5s-1 5.5-3 7.5M3 10.5h15"/>`,
    ocut: `<path d="${cursor(13.5, 13.5)}" fill="#000" stroke-width="4.5"/>`,
    otop: `<path d="${cursor(13.5, 13.5)}"/>`,
    f: `<circle cx="10.5" cy="10.5" r="7.5"/>`,
    cut: `<path stroke-width="1.5" d="M10.5 3c-2 2-3 4.5-3 7.5s1 5.5 3 7.5M10.5 3c2 2 3 4.5 3 7.5s-1 5.5-3 7.5M3 10.5h15"/><path d="${cursor(13.5, 13.5)}" fill="#000" stroke-width="4.5"/>`,
    top: `<path d="${cursor(13.5, 13.5)}"/>`,
  },

  'computer-use': {
    o: `${MONITOR}<path d="${MONITOR_STAND}"/>${sp(8.25, 10.5, 3.5)}<path d="${cursor(14.5, 9, 0.6)}"/>`,
    f: `${MONITOR}<path d="${MONITOR_STAND}"/>`,
    cut: `${sparkCut(8.25, 10.5, 3.5)}<path d="${cursor(14.5, 9, 0.6)}" fill="#000" stroke-width="1"/>`,
  },

  // Terminal prompt whose output is the spark.
  'code-interpreter': {
    o: `<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="m6 9.5 2.5 2.5L6 14.5"/>${sp(14.75, 12, 3.5)}`,
    f: `<rect x="3" y="4" width="18" height="16" rx="2.5"/>`,
    cut: `<path d="m6 9.5 2.5 2.5L6 14.5" stroke-width="1.75"/>${sparkCut(14.75, 12, 3.5)}`,
  },

  // Text, image and sound cells, the fourth is the spark.
  multimodal: {
    o: `<path d="M3.5 4h6.5M6.75 4v6.5"/><g transform="translate(12.3 1.9) scale(.4)" stroke-width="4.375">${FRAME}<path d="${HILL}"/></g><path d="M3 17.25h1.25l1.5-3 2 6 1.5-3h1.25"/>${sp(17.25, 17.25, 3.75)}`,
    f: `<path stroke-width="2.25" d="M3.5 4h6.5M6.75 4v6.5"/><g transform="translate(12.3 1.9) scale(.4)" stroke-width="4.375">${FRAME}</g><path fill="none" stroke-width="2.25" d="M3 17.25h1.25l1.5-3 2 6 1.5-3h1.25"/>${sp(17.25, 17.25, 3.75)}`,
    cut: `<path transform="translate(12.3 1.9) scale(.4)" d="${HILL}" stroke-width="3.75"/>`,
  },

  // Eye whose pupil is the spark.
  vision: {
    o: `<path d="M3 12a9.5 9.5 0 0 1 18 0 9.5 9.5 0 0 1-18 0Z"/>${sp(12, 12, 3.5)}`,
    f: `<path d="M3 12a9.5 9.5 0 0 1 18 0 9.5 9.5 0 0 1-18 0Z"/>`,
    cut: sparkCut(12, 12, 3.5),
  },

  scan: {
    o: `<path d="${CORNERS}"/>${sp(12, 12, 4.5)}`,
    f: `<path fill="none" stroke-width="2.25" d="${CORNERS}"/>${sp(12, 12, 4.5)}`,
  },

  ocr: {
    o: `<path d="${CORNERS}"/><path d="M6 8h6M9 8v8.5"/>${sp(16, 12.5, 3.5)}`,
    f: `<path fill="none" stroke-width="2.25" d="${CORNERS}M6 8h6M9 8v8.5"/>${sp(16, 12.5, 3.5)}`,
  },

  // Face-ID style face; the spark takes the top-right corner.
  'face-detect': {
    o: `<path d="${CORNERS3}"/><path d="M9 11v1.5M15 11v1.5M9 15.75a4 4 0 0 0 6 0"/>${sp(17.5, 6.5, 3.5)}`,
    f: `<path fill="none" stroke-width="2.25" d="${CORNERS3}M9 11v1.5M15 11v1.5M9 15.75a4 4 0 0 0 6 0"/>${sp(17.5, 6.5, 3.5)}`,
  },

  // Bounding box with its class label in the corner; the detected object is the spark.
  'object-detect': {
    o: `${FRAME}<path d="${LABEL}" fill="currentColor"/>${sp(13.25, 14, 3.75)}`,
    f: FRAME,
    cut: `<path d="M3 8h6.5A1.5 1.5 0 0 0 11 6.5V3" stroke-width="1.5"/>${sparkCut(13.25, 14, 3.75)}`,
  },

  // Dashed mask contour hugging the segmented object (the spark).
  segmentation: {
    o: `<path d="${BLOB}" stroke-dasharray="1.25 3.25"/>${sp(12, 12, 4)}`,
    f: `<path d="${BLOB}" fill="none" stroke-dasharray="1.25 3.25"/>${sp(12, 12, 4)}`,
  },

  // Skeleton with joint dots.
  'pose-detect': {
    o: `<circle cx="12" cy="5" r="2"/><path d="M5 8l3 3.5 4-1.5 4 1.5 3-3.5M12 10v4.5l-2.5 3L8 21M12 14.5l2.5 3L16 21"/>
        <path stroke-width="3" d="M8 11.5h.01M16 11.5h.01M12 14.5h.01M9.5 17.5h.01M14.5 17.5h.01"/>`,
    f: `<circle cx="12" cy="5" r="2"/><path fill="none" stroke-width="2.25" d="M5 8l3 3.5 4-1.5 4 1.5 3-3.5M12 10v4.5l-2.5 3L8 21M12 14.5l2.5 3L16 21"/>
        <path stroke-width="3.5" d="M8 11.5h.01M16 11.5h.01M12 14.5h.01M9.5 17.5h.01M14.5 17.5h.01"/>`,
  },

  // Small spark grows to the full frame.
  upscale: {
    o: `${FRAME}${sp(9.5, 14.5, 3.5)}<path d="m14 10 3.5-3.5M13.5 6.5h4v4"/>`,
    f: FRAME,
    cut: `${sparkCut(9.5, 14.5, 3.5)}<path d="m14 10 3.5-3.5M13.5 6.5h4v4"/>`,
  },

  // Masked area inside the image, being refilled by the spark.
  inpaint: {
    o: `${FRAME}<path stroke-dasharray="1.25 2.75" d="M11 10H7.5a1 1 0 0 0-1 1v5.5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V13"/>${sp(14.5, 9.5, 3.5)}`,
    f: FRAME,
    cut: `<path stroke-width="1.5" stroke-dasharray="1.25 2.75" d="M11 10H7.5a1 1 0 0 0-1 1v5.5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V13"/>${sparkCut(14.5, 9.5, 3.5)}`,
  },

  // Image in the corner, dashed canvas grown around it, spark fills the new area.
  outpaint: {
    o: `<rect x="3" y="10.5" width="10.5" height="10.5" rx="2.5"/><path stroke-dasharray="1.25 2.75" d="M3 7.5V5.5A2.5 2.5 0 0 1 5.5 3H11M16 21h2.5a2.5 2.5 0 0 0 2.5-2.5V13"/>${sp(17.5, 6.5, 3.5)}`,
    f: `<rect x="3" y="10.5" width="10.5" height="10.5" rx="2.5"/><path fill="none" stroke-dasharray="1.25 2.75" d="M3 7.5V5.5A2.5 2.5 0 0 1 5.5 3H11M16 21h2.5a2.5 2.5 0 0 0 2.5-2.5V13"/>${sp(17.5, 6.5, 3.5)}`,
  },

  // Person cut out in front of a transparency checkerboard.
  'remove-background': {
    o: `<path d="${CHECKER}" fill="currentColor" stroke="none"/>`,
    ocut: `<circle cx="12" cy="9.5" r="3" fill="#000" stroke-width="4.5"/><path d="${BUST}" fill="#000" stroke-width="4.5"/>`,
    otop: `<circle cx="12" cy="9.5" r="3"/><path d="${BUST}"/>`,
    f: `<path d="${CHECKER}" stroke="none"/>`,
    cut: `<circle cx="12" cy="9.5" r="3" fill="#000" stroke-width="4.5"/><path d="${BUST}" fill="#000" stroke-width="4.5"/>`,
    top: `<circle cx="12" cy="9.5" r="3"/><path d="${BUST}"/>`,
  },

  // Paintbrush carrying a style, with the spark.
  'style-transfer': {
    o: `<g transform="translate(1 1) rotate(45 12 12)"><rect x="10.5" y="2.5" width="3" height="9.5" rx="1.5"/><path d="${BRUSH_TIP}"/></g>${sp(7.5, 7.5, 3.5)}`,
    f: `<g transform="translate(1 1) rotate(45 12 12)"><rect x="10.5" y="2.5" width="3" height="9.5" rx="1.5"/><path d="${BRUSH_TIP}"/></g>${sp(7.5, 7.5, 3.5)}`,
    cut: `<path transform="translate(1 1) rotate(45 12 12)" d="M8.5 12h7" stroke-width="1.25"/>`,
  },

  // -generate family: subject with a hero spark at the top-right.
  'video-generate': {
    o: `${GEN_FRAME}<path d="M9 10.5v6l4.5-3Z"/>`,
    ocut: sparkClear(17.5, 6.5, 3.5),
    otop: sp(17.5, 6.5, 3.5),
    f: GEN_FRAME,
    cut: `${sparkClear(17.5, 6.5, 3.5)}<path d="M9 10.5v6l4.5-3Z" fill="#000"/>`,
    top: sp(17.5, 6.5, 3.5),
  },

  'audio-generate': {
    o: `<path d="${AUDIO_BARS}"/>${sp(17.5, 6.5, 3.5)}`,
    f: `<path stroke-width="2.25" d="${AUDIO_BARS}"/>${sp(17.5, 6.5, 3.5)}`,
  },

  'music-generate': {
    o: `<circle cx="7" cy="17.75" r="2.75"/><path d="M9.75 17.75V4q0 2.5 3.5 3.75"/>${sp(16.5, 14.5, 3.5)}`,
    f: `<circle cx="7" cy="17.75" r="2.75"/><path fill="none" d="M9.75 17.75V4q0 2.5 3.5 3.75"/>${sp(16.5, 14.5, 3.5)}`,
  },

  '3d-generate': {
    o: `<path d="M9 8.5 14.2 11.5V17.5L9 20.5 3.8 17.5V11.5Z"/><path d="M3.8 11.5 9 14.5l5.2-3M9 14.5v6"/>${sp(17, 6.5, 3.5)}`,
    f: `<path d="M9 8.5 14.2 11.5V17.5L9 20.5 3.8 17.5V11.5Z"/>${sp(17, 6.5, 3.5)}`,
    cut: `<path stroke-width="1.5" d="M3.8 11.5 9 14.5l5.2-3M9 14.5v6"/>`,
  },

  // The spark takes the place of the slash in </>.
  'code-generate': {
    o: `<path d="M7.5 7 3 12l4.5 5M16.5 7l4.5 5-4.5 5"/>${sp(12, 12, 3.5)}`,
    f: `<path fill="none" stroke-width="2.5" d="M7.5 7 3 12l4.5 5M16.5 7l4.5 5-4.5 5"/>${sp(12, 12, 3.5)}`,
  },

  // Lines being written, ending in the spark.
  'text-generate': {
    o: `<path d="M3 4.5h18M3 10h12M3 15.5h7"/>${sp(17, 16.5, 4)}`,
    f: `<path stroke-width="2.25" d="M3 4.5h18M3 10h12M3 15.5h7"/>${sp(17, 16.5, 4)}`,
  },

  // A person and the voice that gets cloned.
  'voice-clone': {
    o: `<circle cx="9.75" cy="9" r="3.25"/><path d="${SPEAKER}"/><path d="${VOICE_WAVES}"/>`,
    f: `<circle cx="9.75" cy="9" r="3.25"/><path d="${SPEAKER}Z"/><path fill="none" stroke-width="2.25" d="${VOICE_WAVES}"/>`,
  },

  'text-to-speech': {
    o: `<path d="M3.5 6H12M7.75 6v12"/><path d="${TTS_WAVES}"/>`,
    bold: true,
  },

  'speech-to-text': {
    o: `<path d="M20.5 6H12M16.25 6v12"/><path d="${STT_WAVES}"/>`,
    bold: true,
  },

  // Microphone and the lines it writes.
  transcribe: {
    o: `<rect x="6" y="3" width="4" height="8.5" rx="2"/><path d="M3 9.5a5 5 0 0 0 10 0M8 14.5V20M16 7h5M16 12h5M16 17h3"/>`,
    f: `<rect x="6" y="3" width="4" height="8.5" rx="2"/><path fill="none" d="M3 9.5a5 5 0 0 0 10 0"/><path stroke-width="2.25" d="M8 14.5V20M16 7h5M16 12h5M16 17h3"/>`,
  },

  translate: {
    o: `<path d="M3 5.5h9M7.5 3v2.5M4.5 8c1.5 3.25 3.75 5.25 7 6.25M10.5 8c-1.25 3.5-3.5 5.75-7 6.75M13 21l4-9.5 4 9.5M14.25 18h5.5"/>`,
    bold: true,
  },

  // Two long lines pass through the spark and come out as one short line.
  summarize: {
    o: `<path d="M3 3.5h18M3 7.5h18M8.5 20.5h7"/>${sp(12, 14, 3.5)}`,
    f: `<path stroke-width="2.25" d="M3 3.5h18M3 7.5h18M8.5 20.5h7"/>${sp(12, 14, 3.5)}`,
  },

  // Pencil inside the regenerate loop.
  rewrite: {
    o: `<path d="M20 12a8 8 0 1 1-2.6-5.9L20 8.5"/><path d="M20 4v4.5h-4.5"/><g transform="rotate(45 12 12)"><path d="${SMALL_PENCIL}"/><path d="M10.25 9.5h3.5"/></g>`,
    f: `<path fill="none" stroke-width="2.25" d="M20 12a8 8 0 1 1-2.6-5.9L20 8.5"/><path fill="none" stroke-width="2.25" d="M20 4v4.5h-4.5"/><path transform="rotate(45 12 12)" d="${SMALL_PENCIL}"/>`,
    cut: `<path transform="rotate(45 12 12)" d="M9.5 9.5h5" stroke-width="1.25"/>`,
  },

  'expand-text': {
    o: `<path d="${TEXT3}"/><path d="M15 5.5 17.5 3 20 5.5M15 18.5l2.5 2.5 2.5-2.5"/>${sp(17.5, 12, 3.5)}`,
    f: `<path fill="none" stroke-width="2.25" d="${TEXT3}M15 5.5 17.5 3 20 5.5M15 18.5l2.5 2.5 2.5-2.5"/>${sp(17.5, 12, 3.5)}`,
  },

  'shorten-text': {
    o: `<path d="${TEXT3}"/><path d="m15 3 2.5 2.5L20 3M15 21l2.5-2.5L20 21"/>${sp(17.5, 12, 3.5)}`,
    f: `<path fill="none" stroke-width="2.25" d="${TEXT3}M15 3l2.5 2.5L20 3M15 21l2.5-2.5L20 21"/>${sp(17.5, 12, 3.5)}`,
  },

  // Chat bubble holding a tone dial.
  'change-tone': {
    o: `<path d="${BUBBLE}"/><path d="${DIAL}"/>`,
    f: `<path d="${BUBBLE}"/>`,
    cut: `<path d="${DIAL}"/>`,
  },

  // Lightbulb with a question mark.
  explain: {
    o: `<path d="${BULB}"/><path d="${BULB_BASE}"/><path d="${QMARK}"/><path stroke-width="2.25" d="M12 14.25h.01"/>`,
    f: `<path d="${BULB}"/><path d="${BULB_BASE}"/>`,
    cut: `<path d="${QMARK}" stroke-width="1.75"/><path stroke-width="2.25" d="M12 14.25h.01"/>`,
  },

  // Shapes grouped by kind; the fourth kind is the spark.
  classify: {
    o: `<path d="${TRIANGLE}"/><circle cx="17.25" cy="6.75" r="3.75"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5"/>${sp(17.25, 17.25, 3.75)}`,
    f: `<path d="${TRIANGLE}"/><circle cx="17.25" cy="6.75" r="3.75"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5"/>${sp(17.25, 17.25, 3.75)}`,
  },

  // A spark of insight pulled out of the document.
  extract: {
    o: `<path transform="translate(-2 0)" d="${PAGE}"/><path transform="translate(-2 0)" d="${PAGE_FOLD}"/>${sp(9.5, 10.5, 3.5)}`,
    ocut: `<path d="M10 17h10.5M18 14l3 3-3 3" stroke-width="4.5"/>`,
    otop: `<path d="M10 17h10.5M18 14l3 3-3 3"/>`,
    f: `<path transform="translate(-2 0)" d="${PAGE}"/>`,
    cut: `<path transform="translate(-2 0)" d="${PAGE_FOLD_CUT}" stroke-width="1.5"/>${sparkCut(9.5, 10.5, 3.5)}<path d="M10 17h10.5M18 14l3 3-3 3" stroke-width="4.5"/>`,
    top: `<path d="M10 17h10.5M18 14l3 3-3 3"/>`,
  },

  // Face split down the middle: smiling half, frowning half.
  sentiment: {
    o: `<circle cx="12" cy="12" r="9"/><path d="M12 3v18M8.25 9.5h.01M15.75 9.5h.01M6.5 14.5c.75 1.25 2.5 2.25 4 2.25M17.5 16.75c-.75-1.25-2.5-2.25-4-2.25"/>`,
    f: `<circle cx="12" cy="12" r="9"/>`,
    cut: `<path d="M12 2.5v19" stroke-width="1.5"/><path stroke-width="2.25" d="M8.25 9.5h.01M15.75 9.5h.01"/><path d="M6.5 14.5c.75 1.25 2.5 2.25 4 2.25M17.5 16.75c-.75-1.25-2.5-2.25-4-2.25"/>`,
  },

  // Portrait in the -generate frame.
  'ai-avatar': {
    o: `${GEN_FRAME}<circle cx="10.5" cy="11.5" r="2.5"/><path d="M6 21c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4"/>`,
    ocut: sparkClear(17.5, 6.5, 3.5),
    otop: sp(17.5, 6.5, 3.5),
    f: GEN_FRAME,
    cut: `${sparkClear(17.5, 6.5, 3.5)}<circle cx="10.5" cy="11.5" r="2.5" fill="#000"/><path d="M6 21c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4Z" fill="#000"/>`,
    top: sp(17.5, 6.5, 3.5),
  },

  // Comedy mask.
  persona: {
    o: `<path d="${MASK}"/><path d="${MASK_FACE}"/>`,
    f: `<path d="${MASK}"/>`,
    cut: `<path d="${MASK_FACE}"/>`,
  },

  // Head in profile with a spark for a mind.
  'digital-human': {
    o: `<path d="${PROFILE}"/>${sp(10.5, 10.5, 3.5)}`,
    f: `<path d="${PROFILE}"/>`,
    cut: sparkCut(10.5, 10.5, 3.5),
  },

  // Lips between sound waves.
  'lip-sync': {
    o: `<path d="${LIPS}"/><path d="M6.5 12h11M4 8.5a8 8 0 0 0 0 7M20 8.5a8 8 0 0 1 0 7"/>`,
    f: `<path d="${LIPS}"/><path fill="none" stroke-width="2.25" d="M4 8.5a8 8 0 0 0 0 7M20 8.5a8 8 0 0 1 0 7"/>`,
    cut: `<path d="M7.5 12h9" stroke-width="1.5"/>`,
  },

  // Content-credentials tag: the spark is the label.
  'ai-generated-label': {
    o: `<path d="${TAG}"/>${sp(10.75, 10.75, 4)}`,
    f: `<path d="${TAG}"/>`,
    cut: sparkCut(10.75, 10.75, 4),
  },

  // Key with a spark bow, inside braces.
  'api-key': {
    o: `<path d="${BRACES}"/>${sp(12, 7.5, 3.5)}<path d="M12 11v9M12 15.5h2.25M12 18.5h2.25"/>`,
    f: `<path fill="none" stroke-width="2.25" d="${BRACES}M12 11v9M12 15.5h2.25M12 18.5h2.25"/>${sp(12, 7.5, 3.5)}`,
  },

  // Gauge pinned in the red zone.
  'rate-limit': {
    o: `<path d="M4 15a8 8 0 0 1 16 0"/><path stroke-width="3.5" d="M18.13 9.86A8 8 0 0 1 20 15"/><path d="m12 15 4.5-2.1"/><circle cx="12" cy="15" r="1.5"/>`,
    f: `<path fill="none" stroke-width="2.25" d="M4 15a8 8 0 0 1 16 0"/><path fill="none" stroke-width="3.75" d="M18.13 9.86A8 8 0 0 1 20 15"/><path stroke-width="2.25" d="m12 15 4.5-2.1"/><circle cx="12" cy="15" r="1.75"/>`,
  },

  // AI usage: labelled meter.
  usage: {
    o: `${sp(6.75, 6.75, 3.75)}<path d="M13.5 6.75H21"/><rect x="3" y="14.5" width="18" height="5.5" rx="2.75"/><path d="${METER_FILL}" fill="currentColor"/>`,
    f: `${sp(6.75, 6.75, 3.75)}<path stroke-width="2.25" d="M13.5 6.75H21"/><rect x="3" y="14.5" width="18" height="5.5" rx="2.75" fill="none"/><path d="${METER_FILL}"/>`,
  },

  // A spark coin on a stack.
  credits: {
    o: `<circle cx="13.75" cy="13.75" r="7"/>`,
    ocut: `<circle cx="10.25" cy="10.25" r="7" fill="#000" stroke-width="4.5"/>`,
    otop: `<circle cx="10.25" cy="10.25" r="7"/>${sp(10.25, 10.25, 3.75)}`,
    f: `<circle cx="13.75" cy="13.75" r="7"/><circle cx="10.25" cy="10.25" r="7"/>`,
    cut: `<circle cx="10.25" cy="10.25" r="8.5" stroke-width="1.25"/>${sparkCut(10.25, 10.25, 3.75)}`,
  },

  // Stopwatch with a bolt.
  latency: {
    o: `<circle cx="12" cy="13.5" r="7.5"/><path d="M10 3h4M12 3v3M18 7.5l1.5-1.5"/><path d="${BOLT}"/>`,
    f: `<circle cx="12" cy="13.5" r="7.5"/><path d="M10 3h4M12 3v3M18 7.5l1.5-1.5"/>`,
    cut: `<path d="${BOLT}" fill="#000" stroke-width="1"/>`,
  },

  // Tokens arriving word by word, cursor at the end.
  streaming: {
    o: `<path d="M3 5h7M13 5h8M3 10.5h4.5M10.5 10.5h6M3 16h5M11 13.5v5"/>`,
    bold: true,
  },

  'continue-generating': {
    o: `<path d="M4 12h.01M7.5 12h.01" stroke-width="2.25"/><path d="M11.5 6.5v11l8.5-5.5Z"/>`,
    f: `<path d="M4 12h.01M7.5 12h.01" stroke-width="2.5"/><path d="M11.5 6.5v11l8.5-5.5Z"/>`,
  },

  // Two chat branches merging into one thread.
  'branch-conversation': {
    o: `<g stroke-width="4.375"><path transform="translate(1.6 1.6) scale(.4)" d="${BUBBLE}"/><path transform="translate(12.8 1.6) scale(.4)" d="${BUBBLE}"/></g><path d="M6.4 12.5v8.5M17.6 12.5v.5a4 4 0 0 1-4 4h-3.2a4 4 0 0 0-4 4"/>`,
    f: `<g stroke-width="4.375"><path transform="translate(1.6 1.6) scale(.4)" d="${BUBBLE}"/><path transform="translate(12.8 1.6) scale(.4)" d="${BUBBLE}"/></g><path fill="none" stroke-width="2.25" d="M6.4 12.5v8.5M17.6 12.5v.5a4 4 0 0 1-4 4h-3.2a4 4 0 0 0-4 4"/>`,
  },

  // Slide with the spark for a sun.
  playground: {
    o: `<path d="M3.75 21V7.5h4V21M3.75 12h4M3.75 16.5h4M7.75 7.5c3 0 4.75 1.75 6 5.25s2.75 7.25 6 7.75"/>${sp(16.75, 6.5, 3.5)}`,
    f: `<path fill="none" stroke-width="2.25" d="M3.75 21V7.5h4V21M3.75 12h4M3.75 16.5h4M7.75 7.5c3 0 4.75 1.75 6 5.25s2.75 7.25 6 7.75"/>${sp(16.75, 6.5, 3.5)}`,
  },

  // Spark inside a box with dashed walls.
  sandbox: {
    o: `<path d="${BOX}" stroke-dasharray="1.25 3.26"/>${sp(12, 12, 4.5)}`,
    f: `<path d="${BOX}" fill="none" stroke-width="2.25" stroke-dasharray="1.25 3.26"/>${sp(12, 12, 4.5)}`,
  },
};
