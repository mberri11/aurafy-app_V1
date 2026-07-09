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
const PROD = {
  android: {
    banner: 'REPLACE_WITH_REAL_ANDROID_BANNER_ID',
    interstitial: 'REPLACE_WITH_REAL_ANDROID_INTERSTITIAL_ID',
    rewarded: 'REPLACE_WITH_REAL_ANDROID_REWARDED_ID',
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

export type AdUnitKey = keyof typeof AD_UNIT_IDS;
