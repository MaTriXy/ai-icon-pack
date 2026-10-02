// Transport & travel. No sparks: these are plain objects.

// Airliner seen from above, nose up, centred on (12,12). Rotate/scale it per icon.
const AIRPLANE = 'M12 3c1.1 0 2 1.2 2 2.75V9.5l6.5 3.75v2.25L14 13.75v3.5l2 1.75V21l-4-1-4 1v-2l2-1.75v-3.5L3.5 15.5v-2.25L10 9.5V5.75C10 4.2 10.9 3 12 3Z';
// Place AIRPLANE at (x,y), rotated `deg`, scaled `s` with the stroke compensated.
const plane = (x, y, deg, s, extra = '') =>
  `<path transform="translate(${x} ${y}) rotate(${deg}) scale(${s}) translate(-12 -12)" stroke-width="${+(1.75 / s).toFixed(2)}" d="${AIRPLANE}"${extra}/>`;

// Ticket with side notches.
const TICKET = 'M3 7.5A2.5 2.5 0 0 1 5.5 5h13A2.5 2.5 0 0 1 21 7.5v2a2.5 2.5 0 0 0 0 5v2a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 16.5v-2a2.5 2.5 0 0 0 0-5Z';

const TRUCK_BOX = 'M14 17V6.5A1.5 1.5 0 0 0 12.5 5h-8A1.5 1.5 0 0 0 3 6.5V16a1 1 0 0 0 1 1h1.25M9.25 17h5.5M18.75 17H20a1 1 0 0 0 1-1v-3.4a1 1 0 0 0-.2-.6l-2.6-3.4a1 1 0 0 0-.8-.4H14';
const TRUCK_FILL = 'M14 17V6.5A1.5 1.5 0 0 0 12.5 5h-8A1.5 1.5 0 0 0 3 6.5V16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3.4a1 1 0 0 0-.2-.6l-2.6-3.4a1 1 0 0 0-.8-.4H14Z';
const TRUCK_WHEELS = '<circle cx="7.25" cy="17" r="2"/><circle cx="16.75" cy="17" r="2"/>';

// Scalloped umbrella canopy (r7) and its tilt for `beach`.
const BEACH_CANOPY = 'M5 11a7 7 0 0 1 14 0c-1.2-1.05-2.3-1.05-3.5 0-1.2-1.05-2.3-1.05-3.5 0-1.2-1.05-2.3-1.05-3.5 0-1.2-1.05-2.3-1.05-3.5 0Z';
const BEACH_T = 'translate(2.25 0) rotate(-20 12 20)';
const SAND = 'M3 19.75c3-1.25 6-1.25 9 0s6 1.25 9 0';

export default {
  plane: {
    o: plane(13.25, 11, 45, 1),
    f: plane(13.25, 11, 45, 1),
  },

  'plane-takeoff': {
    o: `${plane(12.25, 10.25, 60, 0.76)}<path d="M3 20.5h18"/>`,
    f: `${plane(12.25, 10.25, 60, 0.76)}<path d="M3 20.5h18"/>`,
  },

  'plane-landing': {
    o: `${plane(11.75, 10.75, 120, 0.76)}<path d="M3 20.5h18"/>`,
    f: `${plane(11.75, 10.75, 120, 0.76)}<path d="M3 20.5h18"/>`,
  },

  // Front view, rounded nose, angled rails.
  train: {
    o: `<path d="M8 18a2 2 0 0 1-2-2V8.5A5.5 5.5 0 0 1 11.5 3h1A5.5 5.5 0 0 1 18 8.5V16a2 2 0 0 1-2 2Z"/><path d="M6 10.5h12M9 14.25h.01M15 14.25h.01M9 18l-1.75 3M15 18l1.75 3"/>`,
    f: `<path d="M8 18a2 2 0 0 1-2-2V8.5A5.5 5.5 0 0 1 11.5 3h1A5.5 5.5 0 0 1 18 8.5V16a2 2 0 0 1-2 2Z"/>`,
    cut: `<path d="M5 10.5h14" stroke-width="1.5"/><path d="M9 14.25h.01M15 14.25h.01" stroke-width="2"/>`,
    top: `<path d="M9 18l-1.75 3M15 18l1.75 3"/>`,
  },

  // Front view, boxy body, mirrors and wheels.
  bus: {
    o: `<rect x="5" y="3" width="14" height="15" rx="2.5"/><path d="M5 10.5h14M9.75 6h4.5M8.5 14.25h.01M15.5 14.25h.01M8 18v2.5M16 18v2.5M3 10V7.75h2M21 10V7.75h-2"/>`,
    f: `<rect x="5" y="3" width="14" height="15" rx="2.5"/>`,
    cut: `<path d="M4 10.5h16M9.75 6h4.5" stroke-width="1.5"/><path d="M8.5 14.25h.01M15.5 14.25h.01" stroke-width="2"/>`,
    top: `<path fill="none" d="M8 18v2.5M16 18v2.5M3 10V7.75h2M21 10V7.75h-2"/>`,
  },

  bike: {
    o: `<circle cx="6.25" cy="16" r="3.25"/><circle cx="17.75" cy="16" r="3.25"/><path d="M6.25 16 9.5 9.5h6M9.5 9.5l3 6.5 3-6.5M17.75 16l-3.25-9.5H12.5M8 7.5h3"/>`,
    f: `<circle cx="6.25" cy="16" r="3.25"/><circle cx="17.75" cy="16" r="3.25"/><path fill="none" d="M6.25 16 9.5 9.5h6M9.5 9.5l3 6.5 3-6.5M17.75 16l-3.25-9.5H12.5M8 7.5h3"/>`,
    cut: `<circle cx="6.25" cy="16" r="1.25" fill="#000" stroke="none"/><circle cx="17.75" cy="16" r="1.25" fill="#000" stroke="none"/>`,
  },

  // Kick scooter.
  scooter: {
    o: `<circle cx="5.5" cy="18" r="2.25"/><circle cx="18.5" cy="18" r="2.25"/><path d="M7.75 18h6.5c1.5 0 2.25-.75 2.5-2L15.5 4.5M13.5 4h4"/>`,
    f: `<circle cx="5.5" cy="18" r="2.25"/><circle cx="18.5" cy="18" r="2.25"/><path fill="none" d="M7.75 18h6.5c1.5 0 2.25-.75 2.5-2L15.5 4.5M13.5 4h4"/>`,
  },

  ship: {
    o: `<path d="M3 13.5h18l-2.4 4.8a2 2 0 0 1-1.8 1.2H7.2a2 2 0 0 1-1.8-1.2Z"/><path d="M6.5 13.5V10a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v3.5M10.5 9V5.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1V9"/>`,
    f: `<path d="M3 13.5h18l-2.4 4.8a2 2 0 0 1-1.8 1.2H7.2a2 2 0 0 1-1.8-1.2Z"/><path d="M6.5 13.5V10a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v3.5ZM10.5 9V5.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1V9Z"/>`,
    cut: `<path d="M3 13.5h18" stroke-width="1.5"/>`,
  },

  // Car front with roof sign.
  taxi: {
    o: `<rect x="9.5" y="4" width="5" height="3.5" rx="1"/><path d="M5.5 11 6.9 8.3a1.5 1.5 0 0 1 1.3-.8h7.6a1.5 1.5 0 0 1 1.3.8L18.5 11"/><rect x="3.5" y="11" width="17" height="6.5" rx="2"/><path d="M7 14.25h.01M17 14.25h.01M6.5 17.5V20M17.5 17.5V20"/>`,
    f: `<rect x="9.5" y="4" width="5" height="3.5" rx="1"/><path d="M5.5 11 6.9 8.3a1.5 1.5 0 0 1 1.3-.8h7.6a1.5 1.5 0 0 1 1.3.8L18.5 11Z"/><rect x="3.5" y="11" width="17" height="6.5" rx="2"/><path d="M6.5 17.5V20M17.5 17.5V20"/>`,
    cut: `<path d="M7 14.25h.01M17 14.25h.01" stroke-width="2.25"/><path d="M3 11h18M9 7.5h6" stroke-width="1.5"/>`,
  },

  truck: {
    o: `<path d="${TRUCK_BOX}"/>${TRUCK_WHEELS}`,
    f: `<path d="${TRUCK_FILL}"/>`,
    cut: `<circle cx="7.25" cy="17" r="2" fill="#000" stroke-width="4.25"/><circle cx="16.75" cy="17" r="2" fill="#000" stroke-width="4.25"/><path d="M14 9v7" stroke-width="1.5"/>`,
    top: TRUCK_WHEELS,
  },

  // Fuel pump with hose and nozzle.
  fuel: {
    o: `<path d="M4.5 21V5a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v16M3 21h12M4.5 9.5h9M13.5 12h1.5a1.5 1.5 0 0 1 1.5 1.5V16a1.75 1.75 0 0 0 3.5 0V8.25L17.5 5.75"/>`,
    f: `<path d="M4.5 21V5a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v16Z"/><path fill="none" d="M3 21h12M13.5 12h1.5a1.5 1.5 0 0 1 1.5 1.5V16a1.75 1.75 0 0 0 3.5 0V8.25L17.5 5.75"/>`,
    cut: `<path d="M4 9.5h10" stroke-width="1.5"/>`,
  },

  // Rolling carry-on with telescopic handle.
  luggage: {
    o: `<rect x="6" y="7" width="12" height="12" rx="2.5"/><path d="M9.5 7V4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3M10 10.5v5M14 10.5v5M8.5 19v2M15.5 19v2"/>`,
    f: `<rect x="6" y="7" width="12" height="12" rx="2.5"/>`,
    cut: `<path d="M10 10.5v5M14 10.5v5" stroke-width="1.5"/>`,
    top: `<path fill="none" d="M9.5 7V4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3M8.5 19v2M15.5 19v2"/>`,
  },

  passport: {
    o: `<rect x="5" y="3" width="14" height="18" rx="2.5"/><circle cx="12" cy="10" r="3.5"/><path d="M8.5 10h7M9.5 16.5h5"/>`,
    f: `<rect x="5" y="3" width="14" height="18" rx="2.5"/>`,
    cut: `<circle cx="12" cy="10" r="3.5" stroke-width="1.5"/><path d="M8.5 10h7M9.5 16.5h5" stroke-width="1.5"/>`,
  },

  // Boarding pass: plane on the main part, perforation before the stub.
  'ticket-travel': {
    o: `<path d="${TICKET}"/><path d="M15.5 7.5v1M15.5 11.5v1M15.5 15.5v1"/>${plane(9.25, 12, 90, 0.42, ' fill="currentColor"')}`,
    f: `<path d="${TICKET}"/>`,
    cut: `<path d="M15.5 7.5v1M15.5 11.5v1M15.5 15.5v1" stroke-width="1.5"/>${plane(9.25, 12, 90, 0.42, ' fill="#000"')}`,
  },

  // Bed: headboard, pillow, blanket.
  hotel: {
    o: `<path d="M3.5 5v15M3.5 16.5h17M3.5 13.5h17V20M6.5 13.5V12a1.5 1.5 0 0 1 1.5-1.5h1A1.5 1.5 0 0 1 10.5 12v1.5M13.5 13.5V12a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5"/>`,
    f: `<path d="M3.5 5v15M20.5 16.5V20"/><path d="M3.5 13.5h17v3h-17ZM6.5 13.5V12a1.5 1.5 0 0 1 1.5-1.5h1A1.5 1.5 0 0 1 10.5 12v1.5ZM13.5 13.5V12a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5Z"/>`,
  },

  tent: {
    o: `<path d="M3 20h18M4.5 20 12 6l7.5 14M12 6 10.25 3M12 6l1.75-3M9 20l3-5.5 3 5.5"/>`,
    f: `<path d="M4.5 20 12 6l7.5 14Z"/><path fill="none" d="M3 20h18M12 6 10.25 3M12 6l1.75-3"/>`,
    cut: `<path d="M9 21l3-6.5 3 6.5Z" fill="#000" stroke-width="1"/>`,
  },

  mountain: {
    o: `<path d="M3 19 8.5 10.5l2.75 4.25L15 6.5 21 19Z"/><path d="M12.9 11.1 14.25 12l1.5-1.25 1.25.75"/>`,
    f: `<path d="M3 19 8.5 10.5l2.75 4.25L15 6.5 21 19Z"/>`,
    cut: `<path d="M12.9 11.1 14.25 12l1.5-1.25 1.25.75" stroke-width="1.5"/>`,
  },

  // Tilted beach umbrella over a sand dune.
  beach: {
    o: `<g transform="${BEACH_T}"><path d="${BEACH_CANOPY}"/><path d="M12 11v9"/></g><path d="${SAND}"/>`,
    f: `<g transform="${BEACH_T}"><path d="${BEACH_CANOPY}"/><path d="M12 11v9"/></g><path fill="none" d="${SAND}"/>`,
  },
};
