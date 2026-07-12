import type {
  RewardedAd as RewardedAdT,
  InterstitialAd as InterstitialAdT,
} from 'react-native-google-mobile-ads';

import { AD_UNIT_IDS } from '@/src/config/ads';
import { ADS_AVAILABLE } from '@/src/ads/adsRuntime';
import { logger } from '../utils/logger';

/**
 * AdMob singleton — imperative rewarded + interstitial ads.
 *
 * Kept as an imperative service (not a hook) because the existing gates
 * (loading.tsx, result.tsx) `await showRewarded()` inside callbacks and branch on
 * the boolean. showRewarded() resolves `true` ONLY when the ad was fully watched.
 *
 * The native module only exists in a dev-client / EAS build. In Expo Go, ADS_AVAILABLE
 * is false and every method no-ops (showRewarded → false, so callers fall back to the
 * 1★ path). Declarative surfaces (banner, dev-panel test buttons) use the hooks instead.
 */

const REQUEST_OPTS = { requestNonPersonalizedAdsOnly: true };

// Lazy accessor for the native library — never touched at import time (Expo Go safe).
function lib() {
  return require('react-native-google-mobile-ads');
}

class AdMobManagerClass {
  private static instance: AdMobManagerClass;
  private rewarded: RewardedAdT | null = null;
  private rewardedLoaded = false;
  private interstitial: InterstitialAdT | null = null;
  private interstitialLoaded = false;

  static getInstance(): AdMobManagerClass {
    if (!AdMobManagerClass.instance) {
      AdMobManagerClass.instance = new AdMobManagerClass();
    }
    return AdMobManagerClass.instance;
  }

  /** Preload both formats. Called once after the SDK finishes initializing. */
  initialize(): void {
    if (!ADS_AVAILABLE) return;
    this.preloadRewarded();
    this.preloadInterstitial();
  }

  // ── Rewarded ──────────────────────────────────────────────────────────────
  preloadRewarded(): void {
    if (!ADS_AVAILABLE) return;
    try {
      const { RewardedAd, RewardedAdEventType, AdEventType } = lib();
      const ad: RewardedAdT = RewardedAd.createForAdRequest(AD_UNIT_IDS.rewarded, REQUEST_OPTS);
      this.rewarded = ad;
      this.rewardedLoaded = false;
      ad.addAdEventListener(RewardedAdEventType.LOADED, () => {
        this.rewardedLoaded = true;
      });
      ad.addAdEventListener(AdEventType.ERROR, (err: unknown) => {
        // A failed LOAD (no fill / offline / network blip) is expected and already
        // handled gracefully: `rewardedLoaded` stays false, showRewarded() returns false
        // and callers fall back to the 1★ path. So it's a WARN, not an error — don't
        // spam a red log / LogBox for a normal operational condition.
        logger.warn('Rewarded load unavailable (will retry):', err);
        this.rewardedLoaded = false;
      });
      ad.load();
    } catch (err) {
      logger.error('preloadRewarded failed:', err);
    }
  }

  /** Show rewarded ad. Resolves true only if fully watched (reward earned). */
  showRewarded(): Promise<boolean> {
    if (!ADS_AVAILABLE) return Promise.resolve(false);
    const ad = this.rewarded;
    if (!ad || !this.rewardedLoaded) {
      this.preloadRewarded(); // not ready — will be there next time
      return Promise.resolve(false);
    }
    return new Promise<boolean>((resolve) => {
      try {
        const { RewardedAdEventType, AdEventType } = lib();
        let earned = false;
        let settled = false;
        const subs: Array<() => void> = [];
        const finish = (result: boolean) => {
          if (settled) return;
          settled = true;
          subs.forEach((u) => {
            try {
              u();
            } catch {
              /* listener already gone */
            }
          });
          this.rewardedLoaded = false;
          this.preloadRewarded(); // queue the next one
          resolve(result);
        };
        subs.push(ad.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {
          earned = true;
          // Suppress the frequency-capped interstitial so it never stacks with this
          // rewarded ad in the same transition. Lazy require: interstitialGate imports
          // AdMobManager (to show the ad), so a static import here closes a require
          // cycle (Metro WARN, risk of uninitialized values) — same discipline as lib().
          const { noteRewardedShown } =
            require('@/src/ads/interstitialGate') as typeof import('@/src/ads/interstitialGate');
          noteRewardedShown();
        }));
        subs.push(ad.addAdEventListener(AdEventType.CLOSED, () => finish(earned)));
        subs.push(ad.addAdEventListener(AdEventType.ERROR, (err: unknown) => {
          logger.error('Rewarded show failed:', err);
          finish(false);
        }));
        ad.show();
      } catch (err) {
        logger.error('showRewarded failed:', err);
        resolve(false);
      }
    });
  }

  // ── Interstitial ──────────────────────────────────────────────────────────
  preloadInterstitial(): void {
    if (!ADS_AVAILABLE) return;
    try {
      const { InterstitialAd, AdEventType } = lib();
      const ad: InterstitialAdT = InterstitialAd.createForAdRequest(
        AD_UNIT_IDS.interstitial,
        REQUEST_OPTS,
      );
      this.interstitial = ad;
      this.interstitialLoaded = false;
      ad.addAdEventListener(AdEventType.LOADED, () => {
        this.interstitialLoaded = true;
      });
      ad.addAdEventListener(AdEventType.ERROR, (err: unknown) => {
        // Same as rewarded: a failed load is expected/transient (no fill, offline). The
        // interstitial simply won't show this cycle; showInterstitial() returns false and
        // the flow continues. WARN, not error.
        logger.warn('Interstitial load unavailable (will retry):', err);
        this.interstitialLoaded = false;
      });
      ad.load();
    } catch (err) {
      logger.error('preloadInterstitial failed:', err);
    }
  }

  /** Show interstitial if loaded. Resolves true once the ad was shown and closed. */
  showInterstitial(): Promise<boolean> {
    if (!ADS_AVAILABLE) return Promise.resolve(false);
    const ad = this.interstitial;
    if (!ad || !this.interstitialLoaded) {
      this.preloadInterstitial();
      return Promise.resolve(false);
    }
    return new Promise<boolean>((resolve) => {
      try {
        const { AdEventType } = lib();
        let settled = false;
        const subs: Array<() => void> = [];
        const finish = (result: boolean) => {
          if (settled) return;
          settled = true;
          subs.forEach((u) => {
            try {
              u();
            } catch {
              /* listener already gone */
            }
          });
          this.interstitialLoaded = false;
          this.preloadInterstitial();
          resolve(result);
        };
        subs.push(ad.addAdEventListener(AdEventType.CLOSED, () => finish(true)));
        subs.push(ad.addAdEventListener(AdEventType.ERROR, (err: unknown) => {
          logger.error('Interstitial show failed:', err);
          finish(false);
        }));
        ad.show();
      } catch (err) {
        logger.error('showInterstitial failed:', err);
        resolve(false);
      }
    });
  }
}

export const AdMobManager = AdMobManagerClass.getInstance();
