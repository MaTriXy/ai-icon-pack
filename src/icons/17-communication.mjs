import { star, ENVELOPE, ENVELOPE_FLAP, MONITOR, MONITOR_STAND, BADGE, BADGE_CLEAR } from '../shapes.mjs';

// ── local shapes ─────────────────────────────────────────────────────────────
// Telephone handset (earpiece top-left, mouthpiece bottom-right); top-right stays free for call modifiers.
const HANDSET = 'M5 3.5h3l1.75 4.5-2.25 1.5a11 11 0 0 0 7 7l1.5-2.25 4.5 1.75v3a2 2 0 0 1-2 2A16 16 0 0 1 3 5.5a2 2 0 0 1 2-2Z';
const MAIL_O = `${ENVELOPE}<path d="${ENVELOPE_FLAP}"/>`;
const MAIL_F = ENVELOPE;
const MAIL_CUT = `<path d="${ENVELOPE_FLAP}" stroke-width="1.5"/>`;
const ENVELOPE_OPEN = 'M3 10.5a2 2 0 0 1 .9-1.67L12 3.5l8.1 5.33a2 2 0 0 1 .9 1.67v8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5Z';
const ENVELOPE_OPEN_FOLD = 'm3.5 10.75 8.5 5.5 8.5-5.5';
// Small envelope for a bottom-right badge slot.
const MAIL_BADGE = '<rect x="14.5" y="15.25" width="7" height="5.5" rx="1.25" fill="none"/><path d="m15.25 16.5 2.75 2 2.75-2" fill="none"/>';
// The handset lies along the standard 3,3→21,21 diagonal, so phone-off uses the mirrored slash.
const SLASH_R = '<path d="M21 3 3 21"/>';
const SLASH_R_CLEAR = '<path d="M21 3 3 21" stroke-width="5"/>';
const SEND_BADGE = 'M15 18h6m-2.5-2.5L21 18l-2.5 2.5';

// Two-envelope stack (front + back corner).
const MAILS_FRONT = '<rect x="3" y="8.5" width="15" height="11.5" rx="2.5"/>';
const MAILS_FRONT_FLAP = 'm3.5 10.5 7 5 7-5';
const MAILS_BACK = 'M6.5 5.5H18.5A2.5 2.5 0 0 1 21 8v8.5';

const COMMENT = 'M7.5 17.5 4 20.5v-14A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5V15a2.5 2.5 0 0 1-2.5 2.5Z';
const COMMENTS_BACK = 'M8 6a2.5 2.5 0 0 1 2.5-2.5h8A2.5 2.5 0 0 1 21 6v10.5L18.5 14h-8A2.5 2.5 0 0 1 8 11.5Z';
const COMMENTS_FRONT = 'M3 11.5A2.5 2.5 0 0 1 5.5 9h8a2.5 2.5 0 0 1 2.5 2.5V16a2.5 2.5 0 0 1-2.5 2.5h-8L3 21Z';

const CAMERA_BODY = '<rect x="3" y="5.5" width="12" height="13" rx="2.5"/>';
const CAMERA_LENS = 'M15 10.5l4.4-2.75a1 1 0 0 1 1.6.85v6.8a1 1 0 0 1-1.6.85L15 13.5';

const MEGAPHONE = 'M10.5 7.5c3.5 0 6.25-1.25 8.25-3a1 1 0 0 1 1.75.75v11a1 1 0 0 1-1.75.75c-2-1.75-4.75-3-8.25-3h-5A2.5 2.5 0 0 1 3 11.5V10a2.5 2.5 0 0 1 2.5-2.5Z';
const MEGAPHONE_HANDLE = 'M6.5 14l1.25 5.5a1.25 1.25 0 0 0 1.22 1h.56a1 1 0 0 0 .98-1.2L9.5 14';

const SPEAKER = 'M3.5 9.5a1 1 0 0 1 1-1H7l4.4-3.7a1 1 0 0 1 1.6.8v12.8a1 1 0 0 1-1.6.8L7 15.5H4.5a1 1 0 0 1-1-1Z';

const HEADSET_BAND = 'M4.5 11v-.5a7.5 7.5 0 0 1 15 0v.5';
const HEADSET_CUPS = '<rect x="3" y="11" width="3" height="6.5" rx="1.5"/><rect x="18" y="11" width="3" height="6.5" rx="1.5"/>';
const HEADSET_MIC = 'M19.5 17.5v.5a3 3 0 0 1-3 3H14';
const MINI_BUBBLE = 'M12 8.75c1.8 0 3 1.1 3 2.6s-1.2 2.6-3 2.6c-.35 0-.7-.04-1-.12L9.25 15l.4-1.6A2.5 2.5 0 0 1 9 11.35c0-1.5 1.2-2.6 3-2.6Z';

const FORM = '<rect x="3.5" y="3" width="15" height="17.5" rx="2.5"/>';
const FORM_LINES = 'M7 8h8M7 11.5h8M7 15h3';

const MAILBOX = 'M3.5 8a4 4 0 0 1 4-4h9a4 4 0 0 1 4 4v6.5a2 2 0 0 1-2 2h-15Z';
const MAILBOX_DOOR = 'M7.5 4a4 4 0 0 1 4 4v8.5';

const STAMP_KNOB = 'M12 3a3 3 0 0 0-3 3c0 1.6.8 2.5 1 3.75l.5 2.75h3l.5-2.75c.2-1.25 1-2.15 1-3.75a3 3 0 0 0-3-3Z';
const STAMP_BASE = '<rect x="4" y="12.5" width="16" height="4.5" rx="1.5"/>';

export default {
  mail: {
    o: MAIL_O,
    f: MAIL_F,
    cut: MAIL_CUT,
  },

  'mail-open': {
    o: `<path d="${ENVELOPE_OPEN}"/><path d="${ENVELOPE_OPEN_FOLD}"/>`,
    f: `<path d="${ENVELOPE_OPEN}"/>`,
    cut: `<path d="${ENVELOPE_OPEN_FOLD}" stroke-width="1.5"/>`,
  },

  'mail-plus': {
    o: MAIL_O,
    ocut: BADGE_CLEAR,
    otop: `<path d="${BADGE.plus}"/>`,
    f: MAIL_F,
    cut: MAIL_CUT + BADGE_CLEAR,
    top: `<path d="${BADGE.plus}"/>`,
  },

  'mail-check': {
    o: MAIL_O,
    ocut: BADGE_CLEAR,
    otop: `<path d="${BADGE.check}"/>`,
    f: MAIL_F,
    cut: MAIL_CUT + BADGE_CLEAR,
    top: `<path d="${BADGE.check}" fill="none"/>`,
  },

  // Hero spark in the badge slot (the flap is what makes it mail, so it stays).
  'mail-sparkle': {
    o: MAIL_O,
    ocut: BADGE_CLEAR,
    otop: `<path d="${BADGE.spark}"/>`,
    f: MAIL_F,
    cut: MAIL_CUT + BADGE_CLEAR,
    top: `<path d="${BADGE.spark}"/>`,
  },

  mails: {
    o: `<path d="${MAILS_BACK}"/>${MAILS_FRONT}<path d="${MAILS_FRONT_FLAP}"/>`,
    f: `<path d="${MAILS_BACK}" fill="none"/>${MAILS_FRONT}`,
    cut: `<path d="${MAILS_FRONT_FLAP}" stroke-width="1.5"/>`,
  },

  'envelope-send': {
    o: MAIL_O,
    ocut: BADGE_CLEAR,
    otop: `<path d="${SEND_BADGE}"/>`,
    f: MAIL_F,
    cut: MAIL_CUT + BADGE_CLEAR,
    top: `<path d="${SEND_BADGE}" fill="none"/>`,
  },

  phone: {
    o: `<path d="${HANDSET}"/>`,
    f: `<path d="${HANDSET}"/>`,
  },

  'phone-call': {
    o: `<path d="${HANDSET}"/><path d="M13 3a8 8 0 0 1 8 8M13 6.5a4.5 4.5 0 0 1 4.5 4.5"/>`,
    f: `<path d="${HANDSET}"/><path d="M13 3a8 8 0 0 1 8 8M13 6.5a4.5 4.5 0 0 1 4.5 4.5" fill="none"/>`,
  },

  'phone-incoming': {
    o: `<path d="${HANDSET}"/><path d="M20.5 3.5l-6 6M14.5 4.5v5h5"/>`,
    f: `<path d="${HANDSET}"/><path d="M20.5 3.5l-6 6M14.5 4.5v5h5" fill="none"/>`,
  },

  'phone-outgoing': {
    o: `<path d="${HANDSET}"/><path d="M14.5 9.5l6-6M15.5 3.5h5v5"/>`,
    f: `<path d="${HANDSET}"/><path d="M14.5 9.5l6-6M15.5 3.5h5v5" fill="none"/>`,
  },

  'phone-missed': {
    o: `<path d="${HANDSET}"/><path d="m15 3.5 5 5m0-5-5 5"/>`,
    f: `<path d="${HANDSET}"/><path d="m15 3.5 5 5m0-5-5 5" fill="none"/>`,
  },

  'phone-off': {
    o: `<path d="${HANDSET}"/>`,
    ocut: SLASH_R_CLEAR,
    otop: SLASH_R,
    f: `<path d="${HANDSET}"/>`,
    cut: SLASH_R_CLEAR,
    top: SLASH_R,
  },

  // Video camera with a person on screen.
  'video-call': {
    o: `${CAMERA_BODY}<path d="${CAMERA_LENS}"/><circle cx="9" cy="10.5" r="1.75"/><path d="M5.75 18.5a3.25 3.25 0 0 1 6.5 0"/>`,
    f: `${CAMERA_BODY}<path d="${CAMERA_LENS}Z"/>`,
    cut: `<circle cx="9" cy="10.5" r="2.25" fill="#000" stroke="none"/><path d="M5.5 19.5v-1a3.5 3.5 0 0 1 7 0v1Z" fill="#000" stroke="none"/>`,
  },

  voicemail: {
    o: `<circle cx="6.5" cy="12" r="3.5"/><circle cx="17.5" cy="12" r="3.5"/><path d="M6.5 15.5h11"/>`,
    bold: true,
  },

  // Handset on the left, body with paper and keys on the right.
  fax: {
    o: `<rect x="3" y="5" width="4.5" height="16" rx="2.25"/><rect x="10.5" y="9.5" width="10.5" height="11.5" rx="2.5"/>
        <path d="M13 9.5V3.5h5.5v6"/><path d="M14 14h.01M17.5 14h.01M14 17.5h.01M17.5 17.5h.01"/>`,
    f: `<rect x="3" y="5" width="4.5" height="16" rx="2.25"/><rect x="10.5" y="9.5" width="10.5" height="11.5" rx="2.5"/><path d="M13 9.5V3.5h5.5v6Z"/>`,
    cut: `<path d="M11.5 9.5h8.5" stroke-width="1.25"/><path d="M14 14h.01M17.5 14h.01M14 17.5h.01M17.5 17.5h.01" stroke-width="2.25"/>`,
  },

  // Two people behind a table.
  meeting: {
    o: `<circle cx="7" cy="6.5" r="2"/><circle cx="17" cy="6.5" r="2"/><path d="M3.5 15a3.5 3.5 0 0 1 7 0M13.5 15a3.5 3.5 0 0 1 7 0"/><path d="M3 15h18M6.5 15v5.5M17.5 15v5.5"/>`,
    f: `<circle cx="7" cy="6.5" r="2"/><circle cx="17" cy="6.5" r="2"/><path d="M3.5 15a3.5 3.5 0 0 1 7 0ZM13.5 15a3.5 3.5 0 0 1 7 0Z"/><path d="M3 15h18M6.5 15v5.5M17.5 15v5.5" fill="none"/>`,
  },

  // Board on a stand with a rising chart.
  presentation: {
    o: `<rect x="3" y="3.5" width="18" height="12" rx="2.5"/><path d="M12 15.5V18M8 21l4-3 4 3"/><path d="m7.5 11.5 3-3 2.5 2 3.5-3.5"/>`,
    f: `<rect x="3" y="3.5" width="18" height="12" rx="2.5"/><path d="M12 15.5V18M8 21l4-3 4 3" fill="none"/>`,
    cut: `<path d="m7.5 11.5 3-3 2.5 2 3.5-3.5" stroke-width="1.5"/>`,
  },

  'screen-share': {
    o: `${MONITOR}<path d="${MONITOR_STAND}"/><path d="M12 13.5V7.5m-2.75 2.75L12 7.5l2.75 2.75"/>`,
    f: `${MONITOR}<path d="${MONITOR_STAND}" fill="none"/>`,
    cut: `<path d="M12 13.5V7.5m-2.75 2.75L12 7.5l2.75 2.75"/>`,
  },

  megaphone: {
    o: `<path d="${MEGAPHONE}"/><path d="${MEGAPHONE_HANDLE}"/><path d="M10.5 7.5V14"/>`,
    f: `<path d="${MEGAPHONE}"/><path d="${MEGAPHONE_HANDLE}"/>`,
    cut: `<path d="M10.5 8.25v5" stroke-width="1.5"/>`,
  },

  // Speaker with radiating lines.
  announcement: {
    o: `<path d="${SPEAKER}"/><path d="M16.5 12h4M16.5 7.75l2.75-2M16.5 16.25l2.75 2"/>`,
    f: `<path d="${SPEAKER}"/><path d="M16.5 12h4M16.5 7.75l2.75-2M16.5 16.25l2.75 2" fill="none"/>`,
  },

  newsletter: {
    o: `<rect x="3" y="4" width="18" height="16" rx="2.5"/><rect x="6.5" y="7.5" width="5" height="4.5" rx="1"/><path d="M14.5 8.25h3M14.5 11.25h3M6.5 15.75h11"/>`,
    f: `<rect x="3" y="4" width="18" height="16" rx="2.5"/>`,
    cut: `<rect x="6.5" y="7.5" width="5" height="4.5" rx="1" fill="#000" stroke-width="1.25"/><path d="M14.5 8.25h3M14.5 11.25h3M6.5 15.75h11" stroke-width="1.5"/>`,
  },

  comment: {
    o: `<path d="${COMMENT}"/><path d="M8 9h8M8 12.5h5"/>`,
    f: `<path d="${COMMENT}"/>`,
    cut: `<path d="M8 9h8M8 12.5h5" stroke-width="1.5"/>`,
  },

  // Overlap pattern: the front bubble clears a gap in the back one.
  comments: {
    o: `<path d="${COMMENTS_BACK}"/>`,
    ocut: `<path d="${COMMENTS_FRONT}" fill="#000" stroke-width="4.5"/>`,
    otop: `<path d="${COMMENTS_FRONT}"/>`,
    f: `<path d="${COMMENTS_BACK}"/>`,
    cut: `<path d="${COMMENTS_FRONT}" fill="#000" stroke-width="4.5"/>`,
    top: `<path d="${COMMENTS_FRONT}"/>`,
  },

  // Headset around a small speech bubble.
  'chat-support': {
    o: `<path d="${HEADSET_BAND}"/>${HEADSET_CUPS}<path d="${HEADSET_MIC}"/><path d="${MINI_BUBBLE}"/>`,
    f: `<path d="${HEADSET_BAND}${HEADSET_MIC}" fill="none"/>${HEADSET_CUPS}<path d="${MINI_BUBBLE}"/>`,
  },

  // Person wearing a headset.
  'call-center': {
    o: `<circle cx="12" cy="9" r="2.75"/><path d="M5.25 11.5V9a6.75 6.75 0 0 1 13.5 0v2.5"/>
        <rect x="3.75" y="8.5" width="3" height="4.5" rx="1.5"/><rect x="17.25" y="8.5" width="3" height="4.5" rx="1.5"/>
        <path d="M18.75 13v.25a2 2 0 0 1-2 2H15"/><path d="M5.5 21c0-2.5 2.9-4.25 6.5-4.25s6.5 1.75 6.5 4.25"/>`,
    f: `<circle cx="12" cy="9" r="2.75"/><path d="M5.25 11.5V9a6.75 6.75 0 0 1 13.5 0v2.5M18.75 13v.25a2 2 0 0 1-2 2H15" fill="none"/>
        <rect x="3.75" y="8.5" width="3" height="4.5" rx="1.5"/><rect x="17.25" y="8.5" width="3" height="4.5" rx="1.5"/>
        <path d="M5.5 21c0-2.5 2.9-4.25 6.5-4.25s6.5 1.75 6.5 4.25Z"/>`,
  },

  'contact-form': {
    o: `${FORM}<path d="${FORM_LINES}"/>`,
    ocut: BADGE_CLEAR,
    otop: MAIL_BADGE,
    f: FORM,
    cut: `<path d="${FORM_LINES}" stroke-width="1.5"/>${BADGE_CLEAR}`,
    top: MAIL_BADGE,
  },

  signature: {
    o: `<path d="M3.5 15.5c1.5-1 3.5-4.5 3.5-7 0-1.5-.75-2.5-1.75-2.5C4 6 3.5 8 4.25 10.5c.8 2.7 2.5 5 4.25 5 1.5 0 1.75-2.5 3.25-2.5s1.5 2 3 2 1.75-1.5 3-1.5h2.75"/><path d="M3 19.5h18"/>`,
    bold: true,
  },

  stamp: {
    o: `<path d="${STAMP_KNOB}"/>${STAMP_BASE}<path d="M5.5 20.5h13"/>`,
    f: `<path d="${STAMP_KNOB}"/>${STAMP_BASE}<path d="M5.5 20.5h13" fill="none"/>`,
  },

  // Mailbox on a post, flag up.
  post: {
    o: `<path d="${MAILBOX}"/><path d="${MAILBOX_DOOR}"/><path d="M16.5 12V7.25M11.5 16.5V21"/><path d="M16.5 7.25h-2.25v2h2.25Z" fill="currentColor"/>`,
    f: `<path d="${MAILBOX}"/><path d="M11.5 16.5V21" fill="none"/>`,
    cut: `<path d="M11.5 8.5v7.5M16.5 12V7.25" stroke-width="1.5"/><path d="M16.5 7.25h-2.25v2h2.25Z" fill="#000" stroke-width="1.5"/>`,
  },
};
