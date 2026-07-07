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
const LOOP_SOURCE: number = require('../../assets/sounds/Loading.mp3');

// Base mix levels (brief: pad ~0.4, one-shots ~0.6). Each is scaled by the user's
// master Volume setting so the Settings slider stays meaningful.
const LOOP_BASE = 0.4;
const EFFECT_BASE = 0.6;
const FADE_IN_MS = 600;
const FADE_OUT_MS = 300;
const FADE_STEP_MS = 50;

let configured = false;
let loopPlayer: AudioPlayer | null = null;
let loopActive = false;
let loopFadeTimer: ReturnType<typeof setInterval> | null = null;
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

function getLoop(): AudioPlayer | null {
  if (!loopPlayer) {
    const a = audio();
    if (!a) return null;
    try {
      loopPlayer = a.createAudioPlayer(LOOP_SOURCE);
      loopPlayer.loop = true;
    } catch {
      loopPlayer = null;
    }
  }
  return loopPlayer;
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

// Ramp the LOOP player's volume on the JS thread (expo-audio has no built-in
// fade). Never touches the UI thread / Reanimated, so it can't stutter animation.
function fadeLoop(player: AudioPlayer, to: number, ms: number, onDone?: () => void): void {
  if (loopFadeTimer) {
    clearInterval(loopFadeTimer);
    loopFadeTimer = null;
  }
  let from = 0;
  try {
    from = player.volume ?? 0;
  } catch {
    from = 0;
  }
  const steps = Math.max(1, Math.round(ms / FADE_STEP_MS));
  let i = 0;
  loopFadeTimer = setInterval(() => {
    i += 1;
    const v = from + (to - from) * (i / steps);
    try {
      player.volume = clamp01(v);
    } catch {
      // player gone — stop ramping
    }
    if (i >= steps) {
      if (loopFadeTimer) {
        clearInterval(loopFadeTimer);
        loopFadeTimer = null;
      }
      try {
        onDone?.();
      } catch {
        // ignore
      }
    }
  }, FADE_STEP_MS);
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
    getLoop();
    (Object.keys(EFFECT_SOURCES) as EffectKey[]).forEach((k) => getEffect(k));
  } catch {
    // ignore — playback will lazily retry
  }
}

/** Start the ambient loading pad (looping, ~0.4 vol, fade-in). No-op when ambient is off. */
export function playLoop(): void {
  if (!isAmbientOn()) return;
  ensureConfigured();
  const p = getLoop();
  if (!p) return;
  if (loopActive) return; // guard double-start (re-render / re-entry)
  loopActive = true;
  try {
    p.loop = true;
    p.volume = 0;
    p.seekTo(0).catch(() => {});
    p.play();
    fadeLoop(p, LOOP_BASE * masterVolume(), FADE_IN_MS);
  } catch {
    loopActive = false;
  }
}

/** Fade the loading pad out (~300ms) then pause — never a hard cut. Safe anytime. */
export function stopLoop(): void {
  loopActive = false;
  const p = loopPlayer;
  if (!p) return;
  try {
    fadeLoop(p, 0, FADE_OUT_MS, () => {
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
