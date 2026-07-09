// ─────────────────────────────────────────────────────────────────────────────
// useInterstitialAd — preloads an interstitial on mount and exposes showAd(onClosed).
//
// Call showAd() only at natural break points (e.g. after a completed module), never
// mid-flow. onClosed fires when the user dismisses the ad. Auto-reloads the next ad
// after each close and retries a failed load once. Inert stub in Expo Go.
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback, useEffect, useRef } from 'react';

import { AD_UNIT_IDS } from '@/src/config/ads';
import { ADS_AVAILABLE } from '@/src/ads/adsRuntime';

export interface UseInterstitialAd {
  /** Show the ad if loaded; returns false (and keeps loading) if it wasn't ready. */
  showAd: (onClosed?: () => void) => boolean;
  isLoaded: boolean;
  error: Error | null;
}

const DISABLED: UseInterstitialAd = { showAd: () => false, isLoaded: false, error: null };

function useInterstitialAdImpl(): UseInterstitialAd {
  // Lazy require — only reached from a real build (see the ADS_AVAILABLE guard in the
  // exported hook). The module is cached, so useLibInterstitialAd is a stable reference.
  const { useInterstitialAd: useLibInterstitialAd } = require('react-native-google-mobile-ads');
  const { isLoaded, isClosed, error, load, show } = useLibInterstitialAd(
    AD_UNIT_IDS.interstitial,
    { requestNonPersonalizedAdsOnly: true },
  );

  const onClosedRef = useRef<(() => void) | null>(null);
  const retriedRef = useRef(false);

  // Preload on mount.
  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!isClosed) return;
    onClosedRef.current?.();
    onClosedRef.current = null;
    retriedRef.current = false;
    load(); // preload the next one
  }, [isClosed, load]);

  // Retry a failed load exactly once.
  useEffect(() => {
    if (!error || retriedRef.current) return;
    retriedRef.current = true;
    const t = setTimeout(() => load(), 1500);
    return () => clearTimeout(t);
  }, [error, load]);

  const showAd = useCallback(
    (onClosed?: () => void): boolean => {
      if (!isLoaded) {
        load(); // not ready — skip silently and keep loading for next time
        return false;
      }
      onClosedRef.current = onClosed ?? null;
      show();
      return true;
    },
    [isLoaded, show, load],
  );

  return { showAd, isLoaded, error: error ?? null };
}

/**
 * ADS_AVAILABLE is a runtime constant, so this branch is fixed for the whole session
 * and the hook order below it stays stable — safe despite the early return.
 */
export function useInterstitialAd(): UseInterstitialAd {
  if (!ADS_AVAILABLE) return DISABLED;
  return useInterstitialAdImpl();
}
