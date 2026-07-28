// ─────────────────────────────────────────────────────────────────────────────
// ADS RUNTIME — availability guard + one-time SDK init.
//
// react-native-google-mobile-ads is a NATIVE module: it only exists in a dev-client
// / EAS build, NOT in Expo Go. Everything ad-related must funnel through ADS_AVAILABLE
// so opening the app in Expo Go never crashes (same discipline as src/utils/sound.ts
// for expo-audio). In Expo Go all ad UI renders nothing and all ad calls no-op.
// ─────────────────────────────────────────────────────────────────────────────

import { useSyncExternalStore } from 'react';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import type { AdsConsentInterface } from 'react-native-google-mobile-ads';
import { logger } from '@/src/utils/logger';

/**
 * TRUE only when the native AdMob module can exist (a real build). Expo Go runs as
 * `StoreClient`, where the module is absent. This is a runtime CONSTANT — it never
 * changes during a session — so guarding hooks on it is safe (hook order is stable).
 */
export const ADS_AVAILABLE =
  Constants.executionEnvironment !== ExecutionEnvironment.StoreClient;

let initStarted = false;

// ─────────────────────────────────────────────────────────────────────────────
// AD PERSONALIZATION — single source of truth.
//
// Every ad request (banner / interstitial / rewarded) reads this instead of
// hardcoding NPA. Google geotargets the UMP form to EEA/UK, so outside those
// regions the consent state comes back NOT_REQUIRED and personalized ads are
// legally servable — forcing NPA there just burns eCPM.
//
// Starts TRUE and FAILS CLOSED: until initAds() has actually resolved the consent
// state (and on any error, refusal, or partial consent) we request NPA only.
// ─────────────────────────────────────────────────────────────────────────────

let npaOnly = true;
const npaListeners = new Set<() => void>();

/** Current ad-personalization stance. Pure JS — safe to call in Expo Go. */
export function isNonPersonalizedOnly(): boolean {
  return npaOnly;
}

function setNpaOnly(next: boolean): void {
  if (npaOnly === next) return;
  npaOnly = next;
  logger.log(`Ad personalization: ${next ? 'non-personalized only' : 'personalized'}`);
  npaListeners.forEach((listener) => {
    try {
      listener();
    } catch {
      /* one dead subscriber must not stop the rest */
    }
  });
}

function subscribeNpaOnly(listener: () => void): () => void {
  npaListeners.add(listener);
  return () => {
    npaListeners.delete(listener);
  };
}

/**
 * React binding for the flag. The consent flow resolves ASYNCHRONOUSLY during startup,
 * so a surface that mounted first (the persistent banner, a preloading hook) would
 * otherwise stay pinned to the pre-consent default for the whole session. Subscribing
 * re-renders it the moment consent settles, so the ad is re-created with the real value.
 */
export function useNonPersonalizedOnly(): boolean {
  return useSyncExternalStore(subscribeNpaOnly, isNonPersonalizedOnly, isNonPersonalizedOnly);
}

/**
 * Map the resolved UMP consent state onto the NPA flag. Returns TRUE (= non-personalized)
 * for anything that is not an unambiguous yes. Throws are left to the caller, which
 * treats them as a refusal.
 */
async function resolveNpaOnly(AdsConsent: AdsConsentInterface): Promise<boolean> {
  const info = await AdsConsent.getConsentInfo();
  // Widened to string on purpose: comparing the string-enum member to a literal is a
  // TS error, and importing the enum as a VALUE would pull the native module in at
  // import time (crashes Expo Go).
  const status: string = info.status;

  // No consent regime in force here (Morocco, most of the world) — the form was never
  // shown because it was never needed, and personalized ads are servable.
  if (status === 'NOT_REQUIRED') return false;

  // UNKNOWN / REQUIRED — the form never completed. Fail closed.
  if (status !== 'OBTAINED') return true;

  // OBTAINED. Under GDPR that can still be a PARTIAL consent (storage accepted,
  // personalization declined), so the status alone is not enough — read the actual
  // TCF purposes. Outside GDPR (e.g. a regulated US state) there is no TCF string to
  // read and Google applies its own restricted-data-processing signal, so honour the
  // completed consent as-is.
  const gdprApplies = await AdsConsent.getGdprApplies();
  if (!gdprApplies) return false;

  const choices = await AdsConsent.getUserChoices();
  const personalizationAllowed =
    choices.storeAndAccessInformationOnDevice === true &&
    choices.createAPersonalisedAdsProfile === true &&
    choices.selectPersonalisedAds === true;
  return !personalizationAllowed;
}

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
      // The resolved state drives npaOnly; on ANY failure it stays true (closed).
      try {
        await AdsConsent.requestInfoUpdate();
        await AdsConsent.loadAndShowConsentFormIfRequired();
        setNpaOnly(await resolveNpaOnly(AdsConsent));
      } catch (err) {
        logger.error('UMP consent flow failed (continuing with non-personalized ads):', err);
        setNpaOnly(true);
      }

      // 16+ content rating — matches the app's store listing. Google requires the
      // request configuration to be set BEFORE initialize() so the very first ad
      // requests already honor it.
      mobileAds().setRequestConfiguration({ maxAdContentRating: 'T' });
      await mobileAds().initialize();
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
