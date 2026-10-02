import { FRAME, HILL, MONITOR, MONITOR_STAND, BADGE, BADGE_CLEAR, SLASH, SLASH_CLEAR } from '../shapes.mjs';

// ── Local helpers ─────────────────────────────────────────────────────────────
const n = (v) => +v.toFixed(2);

/** Polygon with every corner rounded by a quadratic curve that starts `r` units before the vertex. */
function rpoly(pts, r) {
  const len = pts.length;
  const corners = pts.map((p, i) => {
    const toward = (q) => {
      const dx = q[0] - p[0], dy = q[1] - p[1], d = Math.hypot(dx, dy);
      return [n(p[0] + (dx / d) * r), n(p[1] + (dy / d) * r)];
    };
    return { a: toward(pts[(i - 1 + len) % len]), b: toward(pts[(i + 1) % len]), v: p };
  });
  let d = `M${corners[0].b.join(' ')}`;
  for (let i = 1; i <= len; i++) {
    const c = corners[i % len];
    d += `L${c.a.join(' ')}Q${c.v.join(' ')} ${c.b.join(' ')}`;
  }
  return d + 'Z';
}

/** Adds the "-off" slash to an icon whose filled extras all live in `f` (so the slash clear reaches them). */
const off = (ic) => ({ o: ic.o, ocut: SLASH_CLEAR, otop: SLASH, f: ic.f, cut: (ic.cut || '') + SLASH_CLEAR, top: SLASH });

// ── Shapes ────────────────────────────────────────────────────────────────────
const SUN = '<circle cx="8.5" cy="8.5" r="1.5"/>';
const SUN_KNOCK = '<circle cx="8.5" cy="8.5" r="1.75" fill="#000" stroke="none"/>';
const IMAGE = {
  o: `${FRAME}${SUN}<path d="${HILL}"/>`,
  f: FRAME,
  cut: `${SUN_KNOCK}<path stroke-width="1.5" d="${HILL}"/>`,
};
const IMAGES_T = 'translate(4.2 4.2) scale(.8)';
const IMAGES_BACK = 'M3 17V5.5A2.5 2.5 0 0 1 5.5 3H17';

const CAMERA = 'M3 9.5A2.5 2.5 0 0 1 5.5 7h2.1l1.3-1.95a1.5 1.5 0 0 1 1.25-.55h3.7a1.5 1.5 0 0 1 1.25.55L16.4 7h2.1A2.5 2.5 0 0 1 21 9.5v8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5Z';
const CAMERA_IC = {
  o: `<path d="${CAMERA}"/><circle cx="12" cy="13.25" r="3.25"/>`,
  f: `<path d="${CAMERA}"/>`,
  cut: `<circle cx="12" cy="13.25" r="3.25" stroke-width="1.5"/>`,
};
const VIDEO_BODY = '<rect x="3" y="6" width="12.5" height="12" rx="2.5"/>';
const VIDEO_LENS = 'M15.5 10.5l4.2-2.6A.85.85 0 0 1 21 8.6v6.8a.85.85 0 0 1-1.3.72L15.5 13.5';
const VIDEO_IC = { o: `${VIDEO_BODY}<path d="${VIDEO_LENS}"/>`, f: `${VIDEO_BODY}<path d="${VIDEO_LENS}Z"/>` };
const FILM_LINES = 'M7.5 3v18M16.5 3v18M3 7.5h4.5M3 12h18M3 16.5h4.5M16.5 7.5H21M16.5 16.5H21';
const CLAP_BODY = 'M3 11h18v7.5a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5Z';
const CLAP_T = 'rotate(-10 3 9.5)';
const CLAP_STRIPES = 'M9 6 7.5 9.5M14.5 6 13 9.5';

// Transport glyphs: one 15-unit height, solid triangles with soft corners.
const PLAY = rpoly([[8, 4.5], [8, 19.5], [20.5, 12]], 2);
const PLAY_SMALL = rpoly([[10, 8.5], [10, 15.5], [16, 12]], 1);
const SKIP_F = rpoly([[5, 5], [5, 19], [15.5, 12]], 1.75);
const SKIP_B = rpoly([[19, 5], [19, 19], [8.5, 12]], 1.75);
const FF = rpoly([[3.5, 5.5], [3.5, 18.5], [12, 12]], 1.5) + rpoly([[12, 5.5], [12, 18.5], [20.5, 12]], 1.5);
const RW = rpoly([[20.5, 5.5], [20.5, 18.5], [12, 12]], 1.5) + rpoly([[12, 5.5], [12, 18.5], [3.5, 12]], 1.5);
const CIRCLE9 = '<circle cx="12" cy="12" r="9"/>';
const REPLAY_ARROW = 'M3.5 12a8.5 8.5 0 1 0 8.5-8.5 9.2 9.2 0 0 0-6.36 2.59L3.5 8.25M3.5 3.5v4.75h4.75';
const REPLAY_PLAY = rpoly([[10.25, 9], [10.25, 15], [15.25, 12]], 0.75);
const LOOP = 'm17 3.5 3.5 3.5-3.5 3.5M3.5 11.5v-1A3.5 3.5 0 0 1 7 7h13.5M7 20.5 3.5 17 7 13.5M20.5 12.5v1A3.5 3.5 0 0 1 17 17H3.5';

// Speaker family: the speaker stays put, waves / x are added to its right.
const SPEAKER = 'M12.5 5.2a.75.75 0 0 0-1.28-.53L7.5 8.4A2 2 0 0 1 6.09 9H4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h2.09a2 2 0 0 1 1.41.6l3.72 3.73a.75.75 0 0 0 1.28-.53Z';
const WAVE1 = 'M15.5 9a4.5 4.5 0 0 1 0 6';
const WAVE2 = 'M18.5 6a8.5 8.5 0 0 1 0 12';
const vol = (extra) => ({
  o: `<path d="${SPEAKER}"/>${extra ? `<path d="${extra}"/>` : ''}`,
  f: `<path d="${SPEAKER}"/>${extra ? `<path fill="none" d="${extra}"/>` : ''}`,
});

// Microphone (same geometry as `microphone`), with all filled parts in `f` for the -off variant.
const MIC_BODY = '<rect x="9" y="3" width="6" height="11.5" rx="3"/>';
const MIC_STAND = '<path d="M5.5 11a6.5 6.5 0 0 0 13 0"/><path d="M12 17.5v4"/>';

// Audio devices.
const HP_BAND = 'M3.5 15v-2.5a8.5 8.5 0 0 1 17 0V15';
const HP_CUPS = '<rect x="3.5" y="13" width="4.5" height="7.5" rx="2"/><rect x="16" y="13" width="4.5" height="7.5" rx="2"/>';
const SPEAKER_BOX = '<rect x="5" y="3" width="14" height="18" rx="2.5"/>';
const NOTES = 'M9 17.5V5.5l11-2v12';
const NOTE_HEADS = '<circle cx="6.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="15.5" r="2.5"/>';
const LIST_LINES = 'M3.5 6h12.5M3.5 11.5h8M3.5 17h8M20 17V6';
const RADIO_BODY = '<rect x="3" y="8" width="18" height="12.5" rx="2.5"/>';
const RADIO_DIAL = 'M14.5 12.5h3M14.5 16h3';
const PODCAST_ARCS = 'M8.17 14.71a5 5 0 1 1 7.66 0M5.99 17.51a8.5 8.5 0 1 1 12.02 0M12 16.5V21';

// Screens.
const CAST_SCREEN = 'M3 8.5V7a2.5 2.5 0 0 1 2.5-2.5h13A2.5 2.5 0 0 1 21 7v10a2.5 2.5 0 0 1-2.5 2.5h-5';
const CAST_WAVES = 'M3 12a7.5 7.5 0 0 1 7.5 7.5M3 15.75a3.75 3.75 0 0 1 3.75 3.75M3 19.5h.01';
const MIRROR_SCREEN = 'M6.5 16.5h-1A2.5 2.5 0 0 1 3 14V6a2.5 2.5 0 0 1 2.5-2.5h13A2.5 2.5 0 0 1 21 6v8a2.5 2.5 0 0 1-2.5 2.5h-1';
const MIRROR_TRI = rpoly([[12, 14], [16.5, 20.5], [7.5, 20.5]], 1);
const CC_BOX = '<rect x="3" y="5" width="18" height="14" rx="2.5"/>';
const CC = 'M10.59 10.41a2.25 2.25 0 1 0 0 3.18M17.09 10.41a2.25 2.25 0 1 0 0 3.18';
const SUBTITLES = { o: `${CC_BOX}<path d="${CC}"/>`, f: CC_BOX, cut: `<path stroke-width="1.5" d="${CC}"/>` };
const SHOT_CORNERS = 'M3 7V5.5A2.5 2.5 0 0 1 5.5 3H7M17 3h1.5A2.5 2.5 0 0 1 21 5.5V7M21 17v1.5a2.5 2.5 0 0 1-2.5 2.5H17M7 21H5.5A2.5 2.5 0 0 1 3 18.5V17';
const SHOT_CAM = '<rect x="7" y="9" width="10" height="8" rx="2"/><path d="M9.5 9l1-1.5h3l1 1.5"/>';
const GALLERY_MAIN = '<rect x="3" y="3" width="18" height="10.5" rx="2.5"/>';
const GALLERY_HILL = 'm21 10-2.4-2.4a1.5 1.5 0 0 0-2.1 0L10.6 13.5';
const GALLERY_THUMBS = '<rect x="3" y="16.5" width="4" height="4.5" rx="1.25"/><rect x="10" y="16.5" width="4" height="4.5" rx="1.25"/><rect x="17" y="16.5" width="4" height="4.5" rx="1.25"/>';
const SLIDE = '<rect x="3" y="3" width="18" height="13.5" rx="2.5"/>';
const SLIDE_PLAY = rpoly([[10.5, 7.25], [10.5, 12.25], [14.75, 9.75]], 0.75);
const SLIDE_DOTS = 'M9 20h.01M12 20h.01M15 20h.01';
// Colour & creative tools.
const PALETTE = 'M12 3a9 9 0 0 0 0 18c1.1 0 1.75-.75 1.75-1.65 0-.45-.2-.85-.45-1.15-.25-.3-.4-.7-.4-1.1 0-.95.75-1.6 1.65-1.6h2A4.45 4.45 0 0 0 21 11c0-4.4-4-8-9-8Z';
const PALETTE_DOTS = [[7.5, 12], [9.5, 7.75], [14.25, 7.25]];
const BRISTLES = 'M7.05 20.1A3.15 3.15 0 1 0 3.9 16.95a2.36 2.36 0 0 1-.64 1.61A.9.9 0 0 0 3.9 20.1Z';
const BRUSH_HANDLE = 'M10.17 16.53 20.44 6.26a.9.9 0 0 0-2.7-2.7L7.47 13.83';
const BUCKET = 'M18.3 11.1 11.1 3.9l-7.74 7.74a1.8 1.8 0 0 0 0 2.52l4.68 4.68c.72.72 1.8.72 2.52 0Z';
const BUCKET_DROP = 'M20.8 19.2a1.8 1.8 0 1 1-3.6 0c0-1.44 1.53-2.16 1.8-3.6.27 1.44 1.8 2.16 1.8 3.6Z';
const DROPPER_BULB = 'm14.5 6.5 3-3a2 2 0 1 1 2.83 2.83l-3 3 .35.35a2 2 0 1 1-2.83 2.83l-3.54-3.54a2 2 0 1 1 2.83-2.83Z';
const DROPPER_TUBE = 'M4.5 19.5h2.75l7.3-7.3M4.5 19.5v-2.75l7.3-7.3M4.5 19.5l-1 1';
const SWATCH_STRIP = 'M11 17a4 4 0 0 1-8 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2Z';
const SWATCH_CARD = 'M16.7 13H19a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7';
const SWATCH_PETAL = 'm11 8 2.3-2.3a2.4 2.4 0 0 1 3.4 0l1.9 1.9a2.4 2.4 0 0 1 .03 3.43L9.9 19.8';
const GRADIENT_FILL = 'M8.5 3h-3A2.5 2.5 0 0 0 3 5.5v13A2.5 2.5 0 0 0 5.5 21h3Z';
// Dither that thins out from the solid left band: dense column, then sparse column (holes reverse it in filled).
const GRADIENT_DOTS = 'M12.25 6h.01M12.25 9h.01M12.25 12h.01M12.25 15h.01M12.25 18h.01M16.25 7.5h.01M16.25 12h.01M16.25 16.5h.01';
const SUN_RAYS = 'M18.5 12h2.25M16.6 16.6l1.59 1.59M12 18.5v2.25M7.4 16.6l-1.59 1.59M5.5 12H3.25M7.4 7.4 5.81 5.81M12 5.5V3.25M16.6 7.4l1.59-1.59';
const BLUR_DOTS = 'M18.93 14.87h.01M14.87 18.93h.01M9.13 18.93h.01M5.07 14.87h.01M5.07 9.13h.01M9.13 5.07h.01M14.87 5.07h.01M18.93 9.13h.01';
const FILTER_CIRCLES = '<circle cx="12" cy="8.25" r="5"/><circle cx="8.5" cy="14.25" r="5"/><circle cx="15.5" cy="14.25" r="5"/>';
const FILTER_INNER = 'M13.36 13.06A5 5 0 0 1 7.14 9.44M16.86 9.44A5 5 0 0 1 10.64 13.06M7.14 9.44A5 5 0 0 1 13.36 13.06M12 10.68A5 5 0 0 1 12 17.82M10.64 13.06A5 5 0 0 1 16.86 9.44M12 17.82A5 5 0 0 1 12 10.68';
const SLIDER_LINES = 'M5 3.5V12M5 16v4.5M12 3.5v3M12 10.5v10M19 3.5V13M19 17v3.5';
const SLIDER_KNOBS = '<circle cx="5" cy="14" r="2"/><circle cx="12" cy="8.5" r="2"/><circle cx="19" cy="15" r="2"/>';
const SHAPES = `<path d="${rpoly([[12, 3.5], [16.25, 10.25], [7.75, 10.25]], 1)}"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><circle cx="17" cy="17" r="3.5"/>`;
const NIB = 'M9.5 6 7 12.25c1.5 2.5 3.5 5.75 5 8.75 1.5-3 3.5-6.25 5-8.75L14.5 6';
const NIB_HOLDER = '<rect x="9" y="3" width="6" height="3" rx="1"/>';
const BEZ_ANCHORS = '<rect x="10" y="5" width="4" height="4" rx="1"/><rect x="3" y="15" width="4" height="4" rx="1"/><rect x="17" y="15" width="4" height="4" rx="1"/>';
const BEZ_KNOBS = '<circle cx="5" cy="7" r="1.5"/><circle cx="19" cy="7" r="1.5"/>';
const BEZ_LINES = 'M10 7H6.5M14 7h3.5M10 8.5C7.5 9.5 5.5 11.5 5 15M14 8.5c2.5 1 4.5 3 5 6.5';

// 3D & motion.
const HEX = rpoly([[12, 3], [19.79, 7.5], [19.79, 16.5], [12, 21], [4.21, 16.5], [4.21, 7.5]], 1.5);
const HEX_SMALL = rpoly([[12, 6.75], [16.55, 9.38], [16.55, 14.63], [12, 17.25], [7.45, 14.63], [7.45, 9.38]], 0.75);
const VR = 'M3 9a2.5 2.5 0 0 1 2.5-2.5h13A2.5 2.5 0 0 1 21 9v6a2.5 2.5 0 0 1-2.5 2.5h-3.25a2 2 0 0 1-1.6-.8l-1.25-1.65a.5.5 0 0 0-.8 0l-1.25 1.65a2 2 0 0 1-1.6.8H5.5A2.5 2.5 0 0 1 3 15Z';
const TRAILS = 'M4 8h4M3 12h4.5M4 16h4';
const LANES = '<rect x="3" y="9" width="14" height="4.5" rx="1.5"/><rect x="7" y="16.5" width="14" height="4.5" rx="1.5"/>';
const PLAYHEAD = `<path d="${rpoly([[9.5, 3], [14.5, 3], [12, 6.25]], 0.75)}"/><path d="M12 6.25V21"/>`;
const PLAYHEAD_CLEAR = '<path d="M12 7V21" stroke-width="3.75"/>';
const KEYFRAME = rpoly([[12, 3.5], [20.5, 12], [12, 20.5], [3.5, 12]], 2);
const STRIP = '<rect x="3" y="3" width="6" height="18" rx="1.5"/>';
const RINGS = '<circle cx="18.5" cy="7" r="2.5"/><circle cx="18.5" cy="17" r="2.5"/>';
const BLADES = 'M17.07 9.05 12.5 15.6M17.07 14.95 12.5 8.4';

const RATIO_CORNERS ='M7 11.25V10a1 1 0 0 1 1-1h1.25M17 12.75V14a1 1 0 0 1-1 1h-1.25';

export default {
  microphone: {
    o: `<rect x="9" y="3" width="6" height="11.5" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0"/><path d="M12 17.5v4"/>`,
    f: `<rect x="9" y="3" width="6" height="11.5" rx="3"/>`,
    top: `<path fill="none" d="M5.5 11a6.5 6.5 0 0 0 13 0"/><path d="M12 17.5v4"/>`,
  },

  'microphone-off': off({
    o: MIC_BODY + MIC_STAND,
    f: MIC_BODY + `<path fill="none" d="M5.5 11a6.5 6.5 0 0 0 13 0"/><path d="M12 17.5v4"/>`,
  }),

  // ── Image & camera ─────────────────────────────────────────────────────────
  image: IMAGE,
  images: {
    o: `<g transform="${IMAGES_T}" stroke-width="2.19">${IMAGE.o}</g><path d="${IMAGES_BACK}"/>`,
    f: `<g transform="${IMAGES_T}" stroke-width="2.19">${FRAME}</g>`,
    cut: `<g transform="${IMAGES_T}" stroke-width="2.19"><circle cx="8.5" cy="8.5" r="2" fill="#000" stroke="none"/><path stroke-width="1.75" d="${HILL}"/></g>`,
    top: `<path fill="none" d="${IMAGES_BACK}"/>`,
  },
  'image-plus': {
    ...IMAGE,
    ocut: BADGE_CLEAR,
    otop: `<path d="${BADGE.plus}"/>`,
    cut: IMAGE.cut + BADGE_CLEAR,
    top: `<path d="${BADGE.plus}"/>`,
  },
  'image-off': off(IMAGE),
  camera: CAMERA_IC,
  'camera-off': off(CAMERA_IC),
  video: VIDEO_IC,
  'video-off': off(VIDEO_IC),
  film: {
    o: `${FRAME}<path d="${FILM_LINES}"/>`,
    f: FRAME,
    cut: `<path stroke-width="1.5" d="M7.5 4.25v15.5M16.5 4.25v15.5M4.25 7.5H7.5M4.25 12h15.5M4.25 16.5H7.5M16.5 7.5h3.25M16.5 16.5h3.25"/>`,
  },
  clapperboard: {
    o: `<path d="${CLAP_BODY}"/><g transform="${CLAP_T}"><rect x="3" y="6" width="17.5" height="3.5" rx="1"/><path d="${CLAP_STRIPES}"/></g>`,
    f: `<path d="${CLAP_BODY}"/><rect transform="${CLAP_T}" x="3" y="6" width="17.5" height="3.5" rx="1"/>`,
    cut: `<path transform="${CLAP_T}" stroke-width="1.5" d="${CLAP_STRIPES}"/>`,
  },

  // ── Transport (pure glyphs) ────────────────────────────────────────────────
  play: { o: `<path d="${PLAY}"/>`, f: `<path d="${PLAY}"/>` },
  pause: {
    o: `<rect x="6" y="4.5" width="4" height="15" rx="1.5"/><rect x="14" y="4.5" width="4" height="15" rx="1.5"/>`,
    f: `<rect x="6" y="4.5" width="4" height="15" rx="1.5"/><rect x="14" y="4.5" width="4" height="15" rx="1.5"/>`,
  },
  stop: { o: `<rect x="5" y="5" width="14" height="14" rx="2.5"/>`, f: `<rect x="5" y="5" width="14" height="14" rx="2.5"/>` },
  record: { o: `<circle cx="12" cy="12" r="8"/>`, f: `<circle cx="12" cy="12" r="8"/>` },
  'play-circle': {
    o: `${CIRCLE9}<path d="${PLAY_SMALL}"/>`,
    f: CIRCLE9,
    cut: `<path d="${PLAY_SMALL}" fill="#000" stroke-width="1"/>`,
  },
  'pause-circle': {
    o: `${CIRCLE9}<path d="M10 9v6M14 9v6"/>`,
    f: CIRCLE9,
    cut: `<path stroke-width="2" d="M10 9v6M14 9v6"/>`,
  },
  'stop-circle': {
    o: `${CIRCLE9}<rect x="9" y="9" width="6" height="6" rx="1"/>`,
    f: CIRCLE9,
    cut: `<rect x="8.5" y="8.5" width="7" height="7" rx="1.5" fill="#000" stroke="none"/>`,
  },
  'skip-back': { o: `<path d="${SKIP_B}"/><path d="M5 5v14"/>`, f: `<path d="${SKIP_B}"/><path d="M5 5v14"/>` },
  'skip-forward': { o: `<path d="${SKIP_F}"/><path d="M19 5v14"/>`, f: `<path d="${SKIP_F}"/><path d="M19 5v14"/>` },
  rewind: { o: `<path d="${RW}"/>`, f: `<path d="${RW}"/>` },
  'fast-forward': { o: `<path d="${FF}"/>`, f: `<path d="${FF}"/>` },
  replay: {
    o: `<path d="${REPLAY_ARROW}"/><path d="${REPLAY_PLAY}"/>`,
    f: `<path fill="none" stroke-width="2.25" d="${REPLAY_ARROW}"/><path d="${REPLAY_PLAY}"/>`,
  },
  loop: { o: `<path d="${LOOP}"/>`, bold: true },

  // ── Audio ──────────────────────────────────────────────────────────────────
  volume: vol(),
  'volume-low': vol(WAVE1),
  'volume-high': vol(WAVE1 + WAVE2),
  'volume-mute': vol('m16 9.5 5 5m0-5-5 5'),
  'volume-off': off(vol(WAVE1 + WAVE2)),
  headphones: {
    o: `<path d="${HP_BAND}"/>${HP_CUPS}`,
    f: HP_CUPS,
    top: `<path fill="none" d="${HP_BAND}"/>`,
  },
  speaker: {
    o: `${SPEAKER_BOX}<circle cx="12" cy="14.25" r="3.25"/><path d="M12 7.25h.01"/>`,
    f: SPEAKER_BOX,
    cut: `<circle cx="12" cy="14.25" r="3.25" stroke-width="1.5"/><circle cx="12" cy="7.25" r="1.1" fill="#000" stroke="none"/>`,
  },
  music: {
    o: `<path d="${NOTES}"/>${NOTE_HEADS}`,
    f: NOTE_HEADS,
    top: `<path fill="none" d="${NOTES}"/>`,
  },
  'music-list': {
    o: `<path d="${LIST_LINES}"/><circle cx="17.5" cy="17" r="2.5"/>`,
    f: `<circle cx="17.5" cy="17" r="2.5"/>`,
    top: `<path d="${LIST_LINES}"/>`,
  },
  waveform: { o: `<path d="M4 10v4M8 6.5v11M12 3.5v17M16 8v8M20 10v4"/>`, bold: true },
  'audio-lines': { o: `<path d="M5.25 20v-8M9.75 20V5M14.25 20v-6M18.75 20V9"/>`, bold: true },
  'radio-device': {
    o: `${RADIO_BODY}<path d="M6.5 8 17 3.5"/><circle cx="8.75" cy="14.25" r="2.75"/><path d="${RADIO_DIAL}"/>`,
    f: RADIO_BODY,
    cut: `<circle cx="8.75" cy="14.25" r="2.75" stroke-width="1.5"/><path stroke-width="1.5" d="${RADIO_DIAL}"/>`,
    top: `<path d="M6.5 8 17 3.5"/>`,
  },
  podcast: {
    o: `<circle cx="12" cy="11.5" r="1.75"/><path d="${PODCAST_ARCS}"/>`,
    f: `<circle cx="12" cy="11.5" r="1.75"/>`,
    top: `<path fill="none" d="${PODCAST_ARCS}"/>`,
  },

  // ── Screens & captions ─────────────────────────────────────────────────────
  cast: {
    o: `<path d="${CAST_SCREEN}"/><path d="${CAST_WAVES}"/>`,
    f: `<rect x="3" y="4.5" width="18" height="15" rx="2.5"/>`,
    cut: `<circle cx="3" cy="19.5" r="9.75" fill="#000" stroke="none"/>`,
    top: `<path fill="none" d="${CAST_WAVES}"/>`,
  },
  'airplay-like': {
    o: `<path d="${MIRROR_SCREEN}"/><path d="${MIRROR_TRI}"/>`,
    f: `<rect x="3" y="3.5" width="18" height="13" rx="2.5"/>`,
    cut: `<path d="${MIRROR_TRI}" fill="#000" stroke-width="4"/>`,
    top: `<path d="${MIRROR_TRI}"/>`,
  },
  subtitles: SUBTITLES,
  'captions-off': off(SUBTITLES),
  'screen-record': {
    o: `${MONITOR}<path d="${MONITOR_STAND}"/><circle cx="12" cy="10.5" r="1.75" fill="currentColor"/>`,
    f: MONITOR,
    cut: `<circle cx="12" cy="10.5" r="4" fill="#000" stroke="none"/>`,
    top: `<path d="${MONITOR_STAND}"/><circle cx="12" cy="10.5" r="1.75"/>`,
  },
  screenshot: {
    o: `<path d="${SHOT_CORNERS}"/>${SHOT_CAM}<circle cx="12" cy="13" r="1" fill="currentColor"/>`,
    f: `<rect x="7" y="9" width="10" height="8" rx="2"/><path d="M9.5 9l1-1.5h3l1 1.5Z"/>`,
    cut: `<circle cx="12" cy="13" r="1.6" fill="#000" stroke="none"/>`,
    top: `<path fill="none" d="${SHOT_CORNERS}"/>`,
  },
  gallery: {
    o: `${GALLERY_MAIN}<circle cx="7.25" cy="7.25" r="1.25"/><path d="${GALLERY_HILL}"/>${GALLERY_THUMBS}`,
    f: GALLERY_MAIN + GALLERY_THUMBS,
    cut: `<circle cx="7.25" cy="7.25" r="1.6" fill="#000" stroke="none"/><path stroke-width="1.5" d="${GALLERY_HILL}"/>`,
  },
  slideshow: {
    o: `${SLIDE}<path d="${SLIDE_PLAY}"/><path d="${SLIDE_DOTS}"/>`,
    f: SLIDE,
    cut: `<path d="${SLIDE_PLAY}" fill="#000" stroke-width="1"/>`,
    top: `<path stroke-width="2.25" d="${SLIDE_DOTS}"/>`,
  },
  'aspect-ratio': {
    o: `${CC_BOX}<path d="${RATIO_CORNERS}"/>`,
    f: CC_BOX,
    cut: `<path stroke-width="1.5" d="${RATIO_CORNERS}"/>`,
  },
  frame: { o: `<path d="M3 7h18M3 17h18M7 3v18M17 3v18"/>`, bold: true },

  // ── Colour & creative tools ────────────────────────────────────────────────
  palette: {
    o: `<path d="${PALETTE}"/>${PALETTE_DOTS.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1" fill="currentColor"/>`).join('')}`,
    f: `<path d="${PALETTE}"/>`,
    cut: PALETTE_DOTS.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.4" fill="#000" stroke="none"/>`).join(''),
  },
  brush: {
    o: `<path d="${BRISTLES}"/><path d="${BRUSH_HANDLE}"/><path d="m11.1 10.2 2.7 2.7"/>`,
    f: `<path d="${BRISTLES}"/><path d="${BRUSH_HANDLE}Z"/>`,
    cut: `<path stroke-width="1.5" d="m10.75 9.85 3.4 3.4"/>`,
  },
  'paint-bucket': {
    o: `<g transform="translate(.25 0)"><path d="${BUCKET}"/><path d="M6 3l4.25 4.25M3.5 12.9h12.8"/><path d="${BUCKET_DROP}"/></g>`,
    f: `<g transform="translate(.25 0)"><path d="${BUCKET}"/><path d="${BUCKET_DROP}"/></g>`,
    cut: `<path transform="translate(.25 0)" stroke-width="1.5" d="M4.5 12.9h11"/>`,
    top: `<path transform="translate(.25 0)" d="M6 3l4.25 4.25"/>`,
  },
  eyedropper: {
    o: `<path d="${DROPPER_BULB}"/><path d="${DROPPER_TUBE}"/>`,
    f: `<path d="${DROPPER_BULB}"/><path d="M4.5 19.5h2.75l7.3-7.3-2.75-2.75-7.3 7.3Z"/>`,
    top: `<path d="M4.5 19.5l-1 1"/>`,
  },
  'color-swatch': {
    o: `<path d="${SWATCH_STRIP}"/><path d="${SWATCH_CARD}"/><path d="${SWATCH_PETAL}"/><path d="M7 17h.01"/>`,
    // Filled: one silhouette; the seams between strip, petal and card are knocked out.
    f: `<path d="${SWATCH_STRIP}"/><path d="${SWATCH_PETAL}L11 17Z"/><path d="${SWATCH_CARD}L10 18Z"/>`,
    cut: `<path stroke-width="1.5" d="M11 8.75V17a4 4 0 0 1-1.17 2.83M16.67 13l-5.2 5.2"/><circle cx="7" cy="17" r="1.25" fill="#000" stroke="none"/>`,
  },
  gradient: {
    o: `${FRAME}<path fill="currentColor" d="${GRADIENT_FILL}"/><path d="${GRADIENT_DOTS}"/>`,
    f: FRAME,
    cut: ['12.25 7.5', '12.25 12', '12.25 16.5', '16.25 6', '16.25 9', '16.25 12', '16.25 15', '16.25 18']
      .map((p) => { const [x, y] = p.split(' '); return `<circle cx="${x}" cy="${y}" r="1" fill="#000" stroke="none"/>`; })
      .join(''),
  },
  contrast: {
    o: `${CIRCLE9}<path fill="currentColor" d="M12 3a9 9 0 0 1 0 18Z"/>`,
    f: CIRCLE9,
    cut: `<path d="M11.25 5.75a6.25 6.25 0 0 0 0 12.5Z" fill="#000" stroke="none"/>`,
  },
  brightness: {
    o: `<circle cx="12" cy="12" r="3.5"/><path d="${SUN_RAYS}"/>`,
    f: `<circle cx="12" cy="12" r="3.5"/>`,
    top: `<path d="${SUN_RAYS}"/>`,
  },
  blur: {
    o: `<circle cx="12" cy="12" r="3"/><path d="${BLUR_DOTS}"/>`,
    f: `<circle cx="12" cy="12" r="3"/>`,
    top: `<path stroke-width="2.5" d="${BLUR_DOTS}"/>`,
  },
  'filter-photo': {
    o: FILTER_CIRCLES,
    f: FILTER_CIRCLES,
    cut: `<path stroke-width="1.5" d="${FILTER_INNER}"/>`,
  },
  adjustments: {
    o: `<path d="${SLIDER_LINES}"/>${SLIDER_KNOBS}`,
    f: SLIDER_KNOBS,
    top: `<path d="${SLIDER_LINES}"/>`,
  },
  shapes: { o: SHAPES, f: SHAPES },
  'vector-pen': {
    o: `${NIB_HOLDER}<path d="${NIB}"/><circle cx="12" cy="12.25" r="1.5"/><path d="M12 13.75V21"/>`,
    f: `${NIB_HOLDER}<path d="${NIB}Z"/>`,
    cut: `<path stroke-width="1.25" d="M8.75 6h6.5"/><circle cx="12" cy="12.25" r="1.75" fill="#000" stroke="none"/><path stroke-width="1.5" d="M12 13.5v6.5"/>`,
  },
  bezier: {
    o: `${BEZ_ANCHORS}${BEZ_KNOBS}<path d="${BEZ_LINES}"/>`,
    f: BEZ_ANCHORS + BEZ_KNOBS,
    top: `<path fill="none" d="${BEZ_LINES}"/>`,
  },
  'text-tool': { o: `<path d="M4 4.5h12M10 4.5v15M18.5 9.5v10M16.75 9.5h3.5M16.75 19.5h3.5"/>`, bold: true },

  // ── 3D & motion ────────────────────────────────────────────────────────────
  cube: {
    o: `<path d="${HEX}"/><path d="M4.6 7.75 12 12l7.4-4.25M12 12v8.6"/>`,
    f: `<path d="${HEX}"/>`,
    cut: `<path stroke-width="1.5" d="M5.5 8.25 12 12l6.5-3.75M12 12v7.75"/>`,
  },
  sphere: {
    o: `${CIRCLE9}<path d="M3 12a9 3 0 0 0 18 0"/>`,
    f: CIRCLE9,
    cut: `<path stroke-width="1.5" d="M3.75 13.2A9 3 0 0 0 20.25 13.2"/>`,
  },
  ar: {
    o: `<path d="${SHOT_CORNERS}"/><path d="${HEX_SMALL}"/><path d="M7.75 9.55 12 12l4.25-2.45M12 12v4.9"/>`,
    f: `<path d="${HEX_SMALL}"/>`,
    cut: `<path stroke-width="1.5" d="M8.5 10 12 12l3.5-2M12 12v4.25"/>`,
    top: `<path fill="none" d="${SHOT_CORNERS}"/>`,
  },
  vr: {
    o: `<path d="${VR}"/><circle cx="8" cy="11.5" r="2"/><circle cx="16" cy="11.5" r="2"/>`,
    f: `<path d="${VR}"/>`,
    cut: `<circle cx="8" cy="11.5" r="2.4" fill="#000" stroke="none"/><circle cx="16" cy="11.5" r="2.4" fill="#000" stroke="none"/>`,
  },
  animation: {
    o: `<circle cx="15.5" cy="12" r="5"/><path d="${TRAILS}"/>`,
    f: `<circle cx="15.5" cy="12" r="5"/>`,
    top: `<path d="${TRAILS}"/>`,
  },
  timeline: {
    o: LANES,
    ocut: PLAYHEAD_CLEAR,
    otop: PLAYHEAD,
    f: LANES,
    cut: PLAYHEAD_CLEAR,
    top: PLAYHEAD,
  },
  keyframe: { o: `<path d="${KEYFRAME}"/>`, f: `<path d="${KEYFRAME}"/>` },
  'scissors-film': {
    o: `${STRIP}<path d="M3 9h6M3 15h6"/>${RINGS}<path d="${BLADES}"/>`,
    f: STRIP + RINGS,
    cut: `<path stroke-width="1.5" d="M3.75 9h4.5M3.75 15h4.5"/><circle cx="18.5" cy="7" r="1.1" fill="#000" stroke="none"/><circle cx="18.5" cy="17" r="1.1" fill="#000" stroke="none"/>`,
    top: `<path d="${BLADES}"/>`,
  },
};
