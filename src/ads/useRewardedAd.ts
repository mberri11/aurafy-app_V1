// ─────────────────────────────────────────────────────────────────────────────
// useRewardedAd — preloads a rewarded ad on mount and exposes showAd(onReward).
//
// onReward fires ONLY after the ad is fully watched (reward earned + closed), so it
// is safe to credit Stars in the callback. Auto-reloads the next ad after each close.
// Retries a failed load once. In Expo Go (no native module) it returns an inert stub.
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback, useEffect, useRef } from 'react';

import { AD_UNIT_IDS } from '@/src/config/ads';
import { ADS_AVAILABLE } from '@/src/ads/adsRuntime';

export type AdReward = { type: string; amount: number } | null;
type RewardCb = (reward: AdReward) => void;

export interface UseRewardedAd {
  /** Show the ad if loaded; returns false (and keeps loading) if it wasn't ready. */
  showAd: (onReward?: RewardCb) => boolean;
  isLoaded: boolean;
  error: Error | null;
}

const DISABLED: UseRewardedAd = { showAd: () => false, isLoaded: false, error: null };

function useRewardedAdImpl(): UseRewardedAd {
  // Lazy require — only reached from a real build (see the ADS_AVAILABLE guard in the
  // exported hook). The module is cached, so useLibRewardedAd is a stable reference and
  // calling it here keeps hook order consistent.
  const { useRewardedAd: useLibRewardedAd } = require('react-native-google-mobile-ads');
  const { isLoaded, isClosed, isEarnedReward, reward, error, load, show } = useLibRewardedAd(
    AD_UNIT_IDS.rewarded,
    { requestNonPersonalizedAdsOnly: true },
  );

  const onRewardRef = useRef<RewardCb | null>(null);
  const earnedRef = useRef(false);
  const retriedRef = useRef(false);

  // Preload on mount.
  useEffect(() => {
    load();
  }, [load]);

  // Latch "earned" so we credit only a fully-watched ad, then fire on close.
  useEffect(() => {
    if (isEarnedReward) earnedRef.current = true;
  }, [isEarnedReward]);

  useEffect(() => {
    if (!isClosed) return;
    if (earnedRef.current) onRewardRef.current?.((reward as AdReward) ?? null);
    earnedRef.current = false;
    onRewardRef.current = null;
    retriedRef.current = false;
    load(); // preload the next one
  }, [isClosed, reward, load]);

  // Retry a failed load exactly once.
  useEffect(() => {
    if (!error || retriedRef.current) return;
    retriedRef.current = true;
    const t = setTimeout(() => load(), 1500);
    return () => clearTimeout(t);
  }, [error, load]);

  const showAd = useCallback(
    (onReward?: RewardCb): boolean => {
      if (!isLoaded) {
        load(); // not ready — skip silently and keep loading for next time
        return false;
      }
      onRewardRef.current = onReward ?? null;
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
export function useRewardedAd(): UseRewardedAd {
  if (!ADS_AVAILABLE) return DISABLED;
  return useRewardedAdImpl();
}
