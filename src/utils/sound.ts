// ─────────────────────────────────────────────────────────────────────────────
// SOUND SERVICE — singleton-style module for the reading-experience audio.
//
// ONE MASTER GATE, read LIVE from settingsStore on every call:
//   isEffectsOn()  → settingsStore.soundEnabled   (the single "Sound" switch)
//   isAmbientOn()  → settingsStore.soundEnabled   (same switch — the separate "Ambient
//                    audio" setting was removed; one control now governs BOTH the
//                    one-shots and the ambient loading pad)
// (The store field predates this brief under that name; we wire to it rather than
// duplicate `soundEffectsEnabled`.)
//
// Every function no-ops INSTANTLY and SILENTLY when its gate is off, and nothing
// is instantiated while both gates are off. All native / playback calls are
// fire-and-forget inside try/catch, so a failed or slow load can never block,
// delay, or stutter a navigation or a Reanimated animation.
//
// Uses expo-audio (SDK 54 — expo-av is deprecated). `createAudioPlayer` is the
// imperative (non-hook) constructor, so players live for the app session and are
// reused, never created/destroyed per play.
//
// Circular-dep note: settingsStore imports `stopLoop` from here (its ambient-off
// reaction). To keep that edge one-directional we read settings via a LAZY
// `require('../store/settingsStore')` inside the gates — the exact pattern
// src/utils/haptics.ts uses — so this module never statically imports the store.
// ─────────────────────────────────────────────────────────────────────────────

// TYPE-ONLY import — erased at build time, so it never triggers expo-audio's eager
// `requireNativeModule('ExpoAudio')` (which throws when the native module isn't in the
// runtime, e.g. a dev-client build compiled before expo-audio was added). The module
// itself is pulled in LAZILY via audio() below, wrapped so a missing native module
// degrades to a silent no-op instead of crashing the whole app at startup.
import type { AudioPlayer } from 'expo-audio';

export type EffectKey = 'tap' | 'reveal' | 'revealWeekly' | 'star';

// One-shot sources. NB: `Loading.mp3` is capitalized on disk — Metro's require is
// case-sensitive on Android, so the case here must match the filename exactly.
const EFFECT_SOURCES: Record<EffectKey, number> = {
  tap: require('../../assets/sounds/tap.mp3'),
  reveal: require('../../assets/sounds/reveal.mp3'),
  revealWeekly: require('../../assets/sounds/reveal-weekly.mp3'),
  star: require('../../assets/sounds/star.mp3'),
};
// Named ambient loops. Generalized from the single loading pad so the quiz can play
// its own mood bed under the questions and hand off cleanly into the loading pad.
// NB: `Loading.mp3` is capitalized on disk — Metro's require is case-sensitive on
// Android, so every case here MUST match the filename on disk exactly.
export type LoopKey = 'loading' | 'quizRelationship' | 'quizSelf';
const LOOP_SOURCES: Record<LoopKey, number> = {
  loading: require('../../assets/sounds/Loading.mp3'),
  quizRelationship: require('../../assets/sounds/quiz-relationships.mp3'),
  quizSelf: require('../../assets/sounds/quiz-self.mp3'),
};

// ── VOLUME SAFETY — read before "fixing" these numbers ──────────────────────────
// An app CANNOT lower the device's hardware volume — Android does not permit it, and
// it would be hostile UX. What we control is the MIX LEVEL of our OWN players. That's
// what LOOP_BASE / EFFECT_BASE are: a fraction of whatever the device is set to. On a
// loud device the pad is proportionally loud but STILL recessed behind the taps/chimes,
// because the ratio (0.6 one-shot vs 0.22 pad ≈ a third) is fixed. That is the correct
// and only correct behavior — do NOT attempt any native volume manipulation, and do
// NOT raise the quiz pads above 0.25 (they must sit under the tap, playing while the
// user reads and thinks). Every value below is ALSO scaled by masterVolume() (the
// Settings slider), so the slider stays meaningful.
const LOOP_BASE: Record<LoopKey, number> = {
  loading: 0.4, // unchanged — existing brief value for the loading pad
  quizRelationship: 0.18, // deliberately low — background, never competes with the tap
  quizSelf: 0.18,
};
const EFFECT_BASE = 0.6;
const FADE_IN_MS = 600;
const FADE_OUT_MS = 300;
const FADE_STEP_MS = 50;

let configured = false;
// Keyed loop registry: each loop gets its own reused player AND its own fade timer, so
// two loops can ramp INDEPENDENTLY and simultaneously (a crossfade needs both ramping at
// once — a single shared timer would have them cancel each other).
const loopPlayers: Partial<Record<LoopKey, AudioPlayer>> = {};
let activeLoop: LoopKey | null = null;
const loopFadeTimers: Partial<Record<LoopKey, ReturnType<typeof setInterval>>> = {};
const effectPlayers: Partial<Record<EffectKey, AudioPlayer>> = {};

const clamp01 = (v: number): number => Math.max(0, Math.min(1, v));

// Lazy handle to expo-audio. `undefined` = not yet tried, `null` = unavailable (native
// module absent — the app runs, sound just no-ops). Required lazily + caught so the
// eager `requireNativeModule('ExpoAudio')` inside expo-audio can never crash startup.
type ExpoAudio = typeof import('expo-audio');
let mod: ExpoAudio | null | undefined;
function audio(): ExpoAudio | null {
  if (mod === undefined) {
    try {
      // PROBE FIRST, without throwing: requireOptionalNativeModule returns null when
      // the native 'ExpoAudio' module isn't in this runtime — e.g. a dev-client build
      // compiled before expo-audio was added. Only when it IS present do we pull in
      // expo-audio, whose own top-level requireNativeModule('ExpoAudio') WOULD throw
      // and spam the console. So runtimes without it stay silent AND log-clean.
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { requireOptionalNativeModule } = require('expo-modules-core');
      mod = requireOptionalNativeModule('ExpoAudio')
        ? // eslint-disable-next-line @typescript-eslint/no-require-imports
          (require('expo-audio') as ExpoAudio)
        : null;
    } catch {
      mod = null; // any resolution failure → stay silent
    }
  }
  return mod ?? null;
}

// ── gates + master volume (lazy require = the deferred access that keeps the
//    settingsStore ↔ sound cycle inert; default to silence-safe values on error) ──
function settings(): { soundEnabled?: boolean; volume?: number } {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { useSettingsStore } = require('../store/settingsStore');
    return useSettingsStore.getState();
  } catch {
    return {};
  }
}
function isEffectsOn(): boolean {
  return !!settings().soundEnabled;
}
function isAmbientOn(): boolean {
  // The ambient loading pad is now governed by the single Sound switch (the separate
  // "Ambient audio" setting was removed).
  return !!settings().soundEnabled;
}
function masterVolume(): number {
  const v = settings().volume;
  return typeof v === 'number' ? clamp01(v) : 1;
}

// Configure the audio session ONCE (idempotent): respect silent mode, no
// background audio, and MIX with others — `mixWithOthers` requests no audio focus,
// so the user's own music is never ducked or interrupted.
function ensureConfigured(): void {
  if (configured) return;
  const a = audio();
  if (!a) return; // leave `configured` false so it retries if the module appears
  configured = true;
  a.setAudioModeAsync({
    playsInSilentMode: false,
    shouldPlayInBackground: false,
    interruptionMode: 'mixWithOthers',
  }).catch(() => {});
}

function getLoop(key: LoopKey): AudioPlayer | null {
  if (!loopPlayers[key]) {
    const a = audio();
    if (!a) return null;
    try {
      const p = a.createAudioPlayer(LOOP_SOURCES[key]);
      p.loop = true;
      loopPlayers[key] = p;
    } catch {
      return null;
    }
  }
  return loopPlayers[key] ?? null;
}

function getEffect(key: EffectKey): AudioPlayer | null {
  if (!effectPlayers[key]) {
    const a = audio();
    if (!a) return null;
    try {
      effectPlayers[key] = a.createAudioPlayer(EFFECT_SOURCES[key]);
    } catch {
      return null;
    }
  }
  return effectPlayers[key] ?? null;
}

// Ramp ONE loop player's volume on the JS thread (expo-audio has no built-in fade).
// Never touches the UI thread / Reanimated, so it can't stutter animation. Keyed by
// LoopKey so each loop has an independent timer — this is what lets a crossfade run two
// ramps at once without one clearing the other (the single-timer version was the one
// real bug risk in generalizing this module).
function fadeLoop(
  key: LoopKey,
  player: AudioPlayer,
  to: number,
  ms: number,
  onDone?: () => void,
): void {
  const existing = loopFadeTimers[key];
  if (existing) {
    clearInterval(existing);
    delete loopFadeTimers[key];
  }
  let from = 0;
  try {
    from = player.volume ?? 0;
  } catch {
    from = 0;
  }
  const steps = Math.max(1, Math.round(ms / FADE_STEP_MS));
  let i = 0;
  const timer = setInterval(() => {
    i += 1;
    const v = from + (to - from) * (i / steps);
    try {
      player.volume = clamp01(v);
    } catch {
      // player gone — stop ramping
    }
    if (i >= steps) {
      const t = loopFadeTimers[key];
      if (t) {
        clearInterval(t);
        delete loopFadeTimers[key];
      }
      try {
        onDone?.();
      } catch {
        // ignore
      }
    }
  }, FADE_STEP_MS);
  loopFadeTimers[key] = timer;
}

// ── public API ───────────────────────────────────────────────────────────────

/**
 * Warm all players once (call on first app interaction) so the first pad/chime
 * isn't late. Instantiates NOTHING when both gates are off; if a gate is later
 * flipped on, the play functions lazily create their player on demand.
 */
export function preload(): void {
  if (!isEffectsOn() && !isAmbientOn()) return;
  ensureConfigured();
  try {
    // Warm ONLY the loading pad + the one-shots. The two quiz pads are ~126s of audio
    // combined — the quiz screen warms its own track on demand, so we never decode both
    // eagerly at startup.
    getLoop('loading');
    (Object.keys(EFFECT_SOURCES) as EffectKey[]).forEach((k) => getEffect(k));
  } catch {
    // ignore — playback will lazily retry
  }
}

/**
 * Start (or switch to) a named ambient loop with a fade-in. No-op when ambient is off.
 * If a DIFFERENT loop is already active, this crossfades: the old one fades to 0 and
 * pauses while the new one fades up — both ramps run concurrently (keyed timers).
 * Idempotent: a re-call for the already-active loop is a no-op (re-render safe).
 */
export function playLoop(key: LoopKey): void {
  if (!isAmbientOn()) return;
  ensureConfigured();
  if (activeLoop === key) return; // guard double-start (re-render / re-entry)
  const p = getLoop(key);
  if (!p) return;
  // A different loop is playing → fade it out concurrently (crossfade).
  if (activeLoop && activeLoop !== key) {
    const prevKey = activeLoop;
    const prev = loopPlayers[prevKey];
    if (prev) {
      fadeLoop(prevKey, prev, 0, FADE_OUT_MS, () => {
        try {
          prev.pause();
          prev.seekTo(0).catch(() => {});
        } catch {
          // ignore
        }
      });
    }
  }
  activeLoop = key;
  try {
    p.loop = true;
    p.volume = 0;
    p.seekTo(0).catch(() => {});
    p.play();
    fadeLoop(key, p, LOOP_BASE[key] * masterVolume(), FADE_IN_MS);
  } catch {
    if (activeLoop === key) activeLoop = null;
  }
}

/**
 * Fade a loop out (~300ms) then pause + rewind — never a hard cut. Safe anytime.
 * No arg → stop whatever loop is currently active (preserves the settingsStore
 * sound-off call). With a key → stop that specific loop, and only clear `activeLoop`
 * if it was the one stopped (so stopping a quiz pad never kills a loading pad that has
 * meanwhile become active).
 */
export function stopLoop(key?: LoopKey): void {
  const target = key ?? activeLoop;
  if (!target) return;
  if (activeLoop === target) activeLoop = null;
  const p = loopPlayers[target];
  if (!p) return;
  try {
    fadeLoop(target, p, 0, FADE_OUT_MS, () => {
      try {
        p.pause();
        p.seekTo(0).catch(() => {});
      } catch {
        // ignore
      }
    });
  } catch {
    // ignore
  }
}

/** Play a preloaded one-shot (~0.6 vol). No-op when sound effects are off. */
export function playEffect(key: EffectKey): void {
  if (!isEffectsOn()) return;
  ensureConfigured();
  const p = getEffect(key);
  if (!p) return;
  try {
    p.seekTo(0).catch(() => {});
    p.volume = clamp01(EFFECT_BASE * masterVolume());
    p.play();
  } catch {
    // silent — a failed effect must never surface
  }
}
