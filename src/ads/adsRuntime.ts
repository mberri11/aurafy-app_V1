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
  try {
    // Lazy require so the native module is never touched at import time (belt-and-
    // suspenders for Expo Go — this file is loaded during app bootstrap).
    const mobileAds = require('react-native-google-mobile-ads').default;
    mobileAds()
      .initialize()
      .then(() => {
        logger.log('AdMob initialized');
        // Preload the imperative rewarded/interstitial units now that the SDK is
        // ready. Lazy require avoids a static import cycle (AdMobManager imports
        // ADS_AVAILABLE from this module).
        try {
          require('@/src/ads/AdMobManager').AdMobManager.initialize();
        } catch (err) {
          logger.error('Ad preload failed:', err);
        }
      })
      .catch((err: unknown) => logger.error('AdMob init failed:', err));
  } catch (err) {
    // Native module missing (e.g. an old dev client built before ads were added).
    logger.error('AdMob module unavailable:', err);
  }
}
