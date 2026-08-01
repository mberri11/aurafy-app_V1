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

// ─────────────────────────────────────────────────────────────────────────────
// CONSENT REVOCATION — the persistent re-entry point AdMob requires.
//
// The startup flow above handles the FIRST consent decision only. A European
// regulations message published with ad-unit deployment obliges the app to also
// expose a way to REOPEN that choice later, which is what these two provide.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * TRUE only when Google says this user must be offered a persistent way to revisit
 * their consent choice (EEA/UK/CH). Never throws: a missing native module (Expo Go),
 * or consent info that was never requested, resolves FALSE so the caller simply
 * hides the entry point rather than showing a row that opens nothing.
 */
export async function isPrivacyOptionsRequired(): Promise<boolean> {
  if (!ADS_AVAILABLE) return false;
  try {
    const { AdsConsent } = require('react-native-google-mobile-ads');
    const info = await AdsConsent.getConsentInfo();
    // Widened to string for the same reason as resolveNpaOnly: importing
    // AdsConsentPrivacyOptionsRequirementStatus as a VALUE would pull the native
    // module in at import time and crash Expo Go.
    const requirement: string = info.privacyOptionsRequirementStatus;
    return requirement === 'REQUIRED';
  } catch (err) {
    logger.error('Privacy options requirement check failed:', err);
    return false;
  }
}

/**
 * Reopen the UMP privacy options form so the user can CHANGE a choice already made.
 *
 * Re-resolving npaOnly afterwards is the whole point: without it the session would
 * keep serving ads under the value read at STARTUP, so a user who just withdrew
 * personalization would still receive personalized ads until the next cold start.
 * Never throws to the caller.
 */
export async function openPrivacyOptionsForm(): Promise<void> {
  if (!ADS_AVAILABLE) return;
  try {
    const { AdsConsent } = require('react-native-google-mobile-ads');
    await AdsConsent.showPrivacyOptionsForm();
    try {
      setNpaOnly(await resolveNpaOnly(AdsConsent));
    } catch (err) {
      // The form COMPLETED, so the choice may have just changed and we can no longer
      // read which way — fail closed, matching the startup flow's discipline.
      logger.error('Re-reading consent after privacy options failed (assuming non-personalized):', err);
      setNpaOnly(true);
    }
  } catch (err) {
    // The form never opened, so nothing was changed — leave the existing stance
    // alone rather than penalising a user who had validly consented.
    logger.error('Privacy options form failed to open:', err);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// UMP DEBUG HARNESS — drives the dev panel's CONSENT section.
//
// From Morocco the real geography resolves to NOT_REQUIRED, so neither the consent
// form nor the Settings "Privacy options" row can ever appear on device. Google's
// debugGeography override is the only way to rehearse the EEA flow — and it is a
// PARAMETER to requestInfoUpdate, not an AdMob console setting.
// ─────────────────────────────────────────────────────────────────────────────

// DEV ONLY — force the Settings "Privacy options" row visible without an EEA test
// device, so its rendering, placement in LEGAL and four translations (incl. AR RTL)
// can be checked. This does NOT fake the consent state: tapping the row still calls
// the real form, which outside the EEA rejects with "not required". It proves the UI,
// never the requirement check. Same external-store shape as the npaOnly flag above,
// so Settings re-renders the moment the dev panel toggles it.
let devForceRow = false;
const devForceRowListeners = new Set<() => void>();

function getDevForcePrivacyRow(): boolean {
  return devForceRow;
}

/** No-ops outside __DEV__ — a production build can never flip this on. */
export function setDevForcePrivacyRow(next: boolean): void {
  if (!__DEV__ || devForceRow === next) return;
  devForceRow = next;
  devForceRowListeners.forEach((listener) => {
    try {
      listener();
    } catch {
      /* one dead subscriber must not stop the rest */
    }
  });
}

function subscribeDevForcePrivacyRow(listener: () => void): () => void {
  devForceRowListeners.add(listener);
  return () => {
    devForceRowListeners.delete(listener);
  };
}

export function useDevForcePrivacyRow(): boolean {
  return useSyncExternalStore(
    subscribeDevForcePrivacyRow,
    getDevForcePrivacyRow,
    getDevForcePrivacyRow,
  );
}

export interface ConsentDebugSnapshot {
  status: string;
  privacyOptionsRequirementStatus: string;
  isConsentFormAvailable: boolean;
  /** The live ad-personalization stance this consent state produced. */
  npaOnly: boolean;
}

/** Read-only view of the SDK's current consent state. Null when unreadable. */
export async function getConsentDebugSnapshot(): Promise<ConsentDebugSnapshot | null> {
  if (!ADS_AVAILABLE) return null;
  try {
    const { AdsConsent } = require('react-native-google-mobile-ads');
    const info = await AdsConsent.getConsentInfo();
    return {
      status: String(info.status),
      privacyOptionsRequirementStatus: String(info.privacyOptionsRequirementStatus),
      isConsentFormAvailable: info.isConsentFormAvailable === true,
      npaOnly,
    };
  } catch (err) {
    logger.error('Consent snapshot failed:', err);
    return null;
  }
}

/**
 * DEV ONLY — wipe the stored consent state and re-request it as if the device sat in
 * the EEA, then show the first-consent form. Returns a short line for the dev panel.
 *
 * Google honours `debugGeography` **only on registered test devices**, so `testDeviceIds`
 * must carry this device's hashed id. That id is printed by the NATIVE SDK to logcat
 * (never Metro) as `addTestDeviceHashedId("…")` the first time an unregistered device
 * requests consent — so run this once with the field empty, read the id out of
 * `adb logcat`, paste it in, and run it again.
 *
 * Hard-gated on __DEV__: AdsConsent.reset() would destroy a real user's recorded consent,
 * and this route file is registered in production builds too.
 */
export async function debugForceEeaConsent(testDeviceIds: string[]): Promise<string> {
  if (!__DEV__) return 'Disabled outside __DEV__.';
  if (!ADS_AVAILABLE) return 'Needs a dev/EAS build — no native module in Expo Go.';
  try {
    const { AdsConsent, AdsConsentDebugGeography } = require('react-native-google-mobile-ads');
    AdsConsent.reset();
    await AdsConsent.requestInfoUpdate({
      debugGeography: AdsConsentDebugGeography.EEA,
      testDeviceIdentifiers: testDeviceIds,
    });
    await AdsConsent.loadAndShowConsentFormIfRequired();
    try {
      setNpaOnly(await resolveNpaOnly(AdsConsent));
    } catch (err) {
      logger.error('Re-reading consent after force-EEA failed (assuming non-personalized):', err);
      setNpaOnly(true);
    }
    const info = await AdsConsent.getConsentInfo();
    return `${info.status} · privacyOptions ${info.privacyOptionsRequirementStatus}`;
  } catch (err) {
    // The usual cause is an unregistered device: the override is ignored and the form
    // never shows. Check logcat for the hashed id line.
    logger.error('Force-EEA consent failed:', err);
    return `Failed: ${err instanceof Error ? err.message : String(err)}`;
  }
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
