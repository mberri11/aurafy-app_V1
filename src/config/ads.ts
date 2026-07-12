// ─────────────────────────────────────────────────────────────────────────────
// ADMOB CONFIG — the ONE file to edit when going to production.
//
// Right now every placement serves Google's official TEST ads (safe, unlimited,
// clearly labelled "Test Ad"). To ship real ads:
//   1. Fill in the PROD_* unit IDs below from your AdMob console.
//   2. Update the App IDs in app.json (`react-native-google-mobile-ads` plugin).
//   3. Set USE_TEST_ADS to `false` (or leave it `__DEV__` — see below).
//
// Kept dependency-light on purpose (no react-native-google-mobile-ads import), so
// this module is safe to import from anywhere, including Expo Go / pure logic.
// ─────────────────────────────────────────────────────────────────────────────

import { Platform } from 'react-native';

/**
 * When TRUE, all placements use Google's TEST unit IDs regardless of build.
 *
 * Default = `__DEV__`: test ads in development, real ads in a production build.
 * While you are still verifying on device with a *production* build, you can
 * force test ads by hardcoding `true` here — NEVER ship with real IDs until
 * you've confirmed test ads render, or your AdMob account can be flagged for
 * clicking your own live ads.
 */
export const USE_TEST_ADS = __DEV__;

// ── Google's official TEST unit IDs (identical to the ones in the AdMob docs) ──
// Android values match exactly what you provided.
const TEST = {
  android: {
    appId: 'ca-app-pub-3940256099942544~3347511713',
    banner: 'ca-app-pub-3940256099942544/6300978111',
    interstitial: 'ca-app-pub-3940256099942544/1033173712',
    rewarded: 'ca-app-pub-3940256099942544/5224354917',
  },
  ios: {
    appId: 'ca-app-pub-3940256099942544~1458002511',
    banner: 'ca-app-pub-3940256099942544/2934735716',
    interstitial: 'ca-app-pub-3940256099942544/4411468910',
    rewarded: 'ca-app-pub-3940256099942544/1712485313',
  },
} as const;

// ── PRODUCTION unit IDs — paste your real AdMob units here, then flip USE_TEST_ADS. ──
// (Aurafy ships to Google Play only, so Android is what matters; iOS kept for symmetry.)
//
// LIVE IDS — never run a production build against these while clicking ads yourself.
// Tapping/clicking your own live ads (even "just testing") is invalid traffic under
// AdMob policy and can get the account suspended. Verify with USE_TEST_ADS forced to
// `true` on a production build first; only rely on real ad delivery, never manual taps.
const PROD = {
  android: {
    banner: 'ca-app-pub-7799898340675704/2580676271',
    interstitial: 'ca-app-pub-7799898340675704/7599857214',
    rewarded: 'ca-app-pub-7799898340675704/4398978808',
  },
  ios: {
    banner: 'REPLACE_WITH_REAL_IOS_BANNER_ID',
    interstitial: 'REPLACE_WITH_REAL_IOS_INTERSTITIAL_ID',
    rewarded: 'REPLACE_WITH_REAL_IOS_REWARDED_ID',
  },
} as const;

const platform = Platform.OS === 'ios' ? 'ios' : 'android';
const source = USE_TEST_ADS ? TEST[platform] : PROD[platform];

/**
 * The three ad-unit IDs the app should use, already resolved for this platform +
 * test/prod mode. Import THIS everywhere — never the raw TEST/PROD tables.
 */
export const AD_UNIT_IDS = {
  banner: source.banner,
  interstitial: source.interstitial,
  rewarded: source.rewarded,
} as const;

// ── Frequency-capped interstitial (Phase 4) ──────────────────────────────────
// Tuning knobs for the "leaving the result screen" interstitial. Kept here (this
// module is dependency-light) so production tuning happens in ONE file.
export const INTERSTITIAL = {
  /** Probability an eligible exit shows the ad. 0.15 = launch value; a raise to
   *  0.20+ is a v1.0.1 decision gated on retention data. */
  CHANCE: 0.15,
  /** Never show before the user has this many completed readings (protect onboarding). */
  MIN_READINGS_BEFORE: 3,
  /** Hard floor between two interstitials, ms. */
  COOLDOWN_MS: 3 * 60_000,
  /** Never show within this window after ANY rewarded ad completed, ms. */
  SUPPRESS_AFTER_REWARDED_MS: 90_000,
} as const;
