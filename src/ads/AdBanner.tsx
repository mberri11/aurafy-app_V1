// ─────────────────────────────────────────────────────────────────────────────
// AdBanner — anchored adaptive banner placed INSIDE a screen's content. It sizes itself
// to the screen width and collapses to nothing if the ad fails to load, so layout never
// reserves dead space. Renders nothing in Expo Go (no native module).
//
// Only two callers left: the in-feed SPONSORED slot on Insights and the dev panel. The
// bottom-of-screen banners the tab screens used to carry were replaced by ONE persistent
// banner above the tab bar — src/components/PersistentBanner.tsx. Do not add a new
// bottom banner to a tab screen; it would double up with that one.
//
// IMPORTANT: react-native-google-mobile-ads is require()d lazily, ONLY after the
// ADS_AVAILABLE guard. A top-level import would run TurboModuleRegistry.getEnforcing()
// at module load and CRASH Expo Go (the native module isn't present there).
//
// This is the REAL replacement for the old BannerAdSlot placeholder (deleted).
// ─────────────────────────────────────────────────────────────────────────────

import React, { memo, useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { AD_UNIT_IDS } from '@/src/config/ads';
import { ADS_AVAILABLE } from '@/src/ads/adsRuntime';
import { logger } from '@/src/utils/logger';

interface Props {
  /** Optional wrapper style — e.g. centering, bottom margin above a tab bar. */
  style?: StyleProp<ViewStyle>;
}

const AdBanner = memo(function AdBanner({ style }: Props) {
  const [failed, setFailed] = useState(false);

  // Collapse to nothing in Expo Go or after a load failure. This early return also
  // ensures the native module is never require()d in Expo Go.
  if (!ADS_AVAILABLE || failed) return null;

  // Lazy require — safe here because we're past the ADS_AVAILABLE guard (real build).
  const { BannerAd, BannerAdSize } = require('react-native-google-mobile-ads');

  return (
    <View style={[{ alignItems: 'center' }, style]}>
      <BannerAd
        unitId={AD_UNIT_IDS.banner}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{ requestNonPersonalizedAdsOnly: true }}
        onAdFailedToLoad={(err: unknown) => {
          logger.error('Banner ad failed to load:', err);
          setFailed(true);
        }}
      />
    </View>
  );
});

export default AdBanner;
