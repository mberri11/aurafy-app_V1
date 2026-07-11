// ─────────────────────────────────────────────────────────────────────────────
// interstitialGate — session-scoped frequency controller for the interstitial ad.
//
// The interstitial is the ONE placement that fires opportunistically (leaving the
// result screen), so it needs a gate that the rewarded/banner placements don't. All
// state is module-level and session-scoped on purpose: a fresh app launch SHOULD be
// allowed to show one (no persistence needed), and the cooldown only needs to hold
// within a session. Never stacks with the rewarded result-unlock gate — the
// SUPPRESS_AFTER_REWARDED window enforces that.
// ─────────────────────────────────────────────────────────────────────────────

import { ADS_AVAILABLE } from '@/src/ads/adsRuntime';
import { AdMobManager } from '@/src/ads/AdMobManager';
import { INTERSTITIAL } from '@/src/config/ads';

let lastInterstitialAt = 0;
let lastRewardedAt = 0;

/** Call whenever a rewarded ad has completed (reward earned) — suppresses the next
 *  interstitial for SUPPRESS_AFTER_REWARDED_MS so the two never stack in one flow. */
export function noteRewardedShown(): void {
  lastRewardedAt = Date.now();
}

/**
 * Show an interstitial IFF every gate passes; otherwise resolve false without ever
 * touching the SDK. When shown and closed, records the timestamp for the cooldown.
 *
 * All placements share the SAME module-level cooldown + rewarded-suppression window, so
 * two interstitials (or an interstitial and a rewarded ad) can never stack across the
 * result-exit, weekly-reveal and article-exit spots.
 *
 * `ignoreMinReadings` skips the onboarding-protection floor for MILESTONE transitions
 * (the weekly reveal, closing an article) — those already imply an engaged user, and the
 * module-reading count doesn't reflect their engagement. The result-exit placement keeps
 * the floor (it's the flow the floor was designed to protect).
 */
export async function maybeShowInterstitial(
  readingCount: number,
  opts: { ignoreMinReadings?: boolean } = {},
): Promise<boolean> {
  const now = Date.now();
  if (
    !ADS_AVAILABLE ||
    (!opts.ignoreMinReadings && readingCount < INTERSTITIAL.MIN_READINGS_BEFORE) ||
    now - lastInterstitialAt < INTERSTITIAL.COOLDOWN_MS ||
    now - lastRewardedAt < INTERSTITIAL.SUPPRESS_AFTER_REWARDED_MS ||
    Math.random() >= INTERSTITIAL.CHANCE
  ) {
    return false;
  }
  const shown = await AdMobManager.showInterstitial();
  if (shown) lastInterstitialAt = Date.now();
  return shown;
}

// ── Dev-panel introspection (safe to import anywhere) ────────────────────────
/** ms since the last interstitial was shown (large on a fresh session). */
export function msSinceLastInterstitial(): number {
  return Date.now() - lastInterstitialAt;
}

/** DEV ONLY — zero the cooldown + rewarded-suppression timestamps so the next
 *  eligible exit can roll the CHANCE dice immediately. */
export function forceEligible(): void {
  lastInterstitialAt = 0;
  lastRewardedAt = 0;
}
