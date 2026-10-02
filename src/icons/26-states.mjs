// Static resting frames of the morphing AI states. Geometry lives in src/states/ai-state.js (single source of truth).
import { STATE_NAMES, stateMarkup } from '../states/ai-state.js';

export default Object.fromEntries(STATE_NAMES.map((s) => [`state-${s}`, { o: stateMarkup(s), f: stateMarkup(s) }]));
