// ─────────────────────────────────────────────────────────────────────────────
// ADS RUNTIME — availability guard + one-time SDK init.
//
// react-native-google-mobile-ads is a NATIVE module: it only exists in a dev-client
// / EAS build, NOT in Expo Go. Everything ad-related must funnel through ADS_AVAILABLE
// so opening the app in Expo Go never crashes (same discipline as src/utils/sound.ts
// for expo-audio). In Expo Go all ad UI renders nothing and all ad calls no-op.
// ─────────────────────────────────────────────────────────────────────────────

import Constants, { ExecutionEnvironment } from 'expo-constants';
import { logger } from '@/src/utils/logger';

/**
 * TRUE only when the native AdMob module can exist (a real build). Expo Go runs as
 * `StoreClient`, where the module is absent. This is a runtime CONSTANT — it never
 * changes during a session — so guarding hooks on it is safe (hook order is stable).
 */
export const ADS_AVAILABLE =
  Constants.executionEnvironment !== ExecutionEnvironment.StoreClient;

let initStarted = false;

/**
 * Initialize the Mobile Ads SDK exactly once. Safe to call on every app start —
 * no-ops in Expo Go and no-ops on repeat calls. Fire-and-forget: never blocks or
 * throws into startup.
 */
export function initAds(): void {
  if (!ADS_AVAILABLE || initStarted) return;
  initStarted = true;
  // Lazy require so the native module is never touched at import time (belt-and-
  // suspenders for Expo Go — this file is loaded during app bootstrap). Wrapped in
  // an async IIFE (not `async function initAds`) so the public signature stays a
  // fire-and-forget `void` call — ad init must never be awaited by app startup.
  (async () => {
    try {
      const rnGoogleMobileAds = require('react-native-google-mobile-ads');
      const mobileAds = rnGoogleMobileAds.default;
      const { AdsConsent } = rnGoogleMobileAds;

      // UMP consent — Google geotargets the form to EEA/UK only, so Morocco/US
      // users never see it. Must never block or fail startup: any consent error
      // is logged and swallowed, then we proceed to initialize() regardless.
      try {
        await AdsConsent.requestInfoUpdate();
        await AdsConsent.loadAndShowConsentFormIfRequired();
      } catch (err) {
        logger.error('UMP consent flow failed (continuing to init ads):', err);
      }

      await mobileAds().initialize();
      // 16+ content rating — matches the app's store listing.
      mobileAds().setRequestConfiguration({ maxAdContentRating: 'T' });
      logger.log('AdMob initialized');
      // Preload the imperative rewarded/interstitial units now that the SDK is
      // ready. Lazy require avoids a static import cycle (AdMobManager imports
      // ADS_AVAILABLE from this module).
      try {
        require('@/src/ads/AdMobManager').AdMobManager.initialize();
      } catch (err) {
        logger.error('Ad preload failed:', err);
      }
    } catch (err) {
      // Native module missing (e.g. an old dev client built before ads were added)
      // or SDK initialize() itself rejected.
      logger.error('AdMob init failed:', err);
    }
  })();
}
