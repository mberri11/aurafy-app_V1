import { logger } from '../utils/logger';

/**
 * AdMob singleton manager.
 * NOTE: react-native-google-mobile-ads requires a native build (EAS Build / Expo Launch).
 * In Expo Go / web, all ad methods return false gracefully.
 * TODO: Install react-native-google-mobile-ads and wire real ad units for production.
 */
class AdMobManagerClass {
  private static instance: AdMobManagerClass;
  private interstitialLoaded = false;
  private rewardedLoaded = false;

  static getInstance(): AdMobManagerClass {
    if (!AdMobManagerClass.instance) {
      AdMobManagerClass.instance = new AdMobManagerClass();
    }
    return AdMobManagerClass.instance;
  }

  initialize(): void {
    try {
      logger.log('AdMobManager initialized (stub mode)');
      // TODO: MobileAds().initialize() when react-native-google-mobile-ads is installed
    } catch (err) {
      logger.error('AdMob init failed:', err);
    }
  }

  preloadInterstitial(): void {
    try {
      // TODO: InterstitialAd.createForAdRequest(AD_UNIT_IDS.interstitial)
      logger.log('Preloading interstitial (stub)');
      this.interstitialLoaded = false;
    } catch (err) {
      logger.error('Preload interstitial failed:', err);
    }
  }

  /** Show interstitial if loaded, return true on success. */
  async showInterstitial(): Promise<boolean> {
    try {
      if (!this.interstitialLoaded) {
        logger.log('Interstitial not loaded, skipping');
        return false;
      }
      // TODO: interstitial.show()
      this.interstitialLoaded = false;
      this.preloadInterstitial();
      return true;
    } catch (err) {
      logger.error('Show interstitial failed:', err);
      return false;
    }
  }

  /**
   * Show rewarded ad.
   * Returns true only if fully watched.
   * Returns false if closed early or not loaded.
   */
  async showRewarded(): Promise<boolean> {
    try {
      if (!this.rewardedLoaded) {
        logger.log('Rewarded not loaded, skipping');
        return false;
      }
      // TODO: rewarded.show() + listen for reward event
      this.rewardedLoaded = false;
      return false; // stub: always return false (not watched)
    } catch (err) {
      logger.error('Show rewarded failed:', err);
      return false;
    }
  }
}

export const AdMobManager = AdMobManagerClass.getInstance();
