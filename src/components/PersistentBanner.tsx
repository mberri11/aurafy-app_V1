// ─────────────────────────────────────────────────────────────────────────────
// PersistentBanner — the ONE banner ad of the tab shell. Mounted a single time in
// app/(tabs)/_layout.tsx and floated directly on top of the tab bar, so it shows on
// every tab screen (Home / Insights / Stars / History / Settings) and is NOT remounted
// when the user switches tabs (a remount would fire a fresh ad request each time).
//
// Tab screens no longer render their own bottom banner; they only add
// PERSISTENT_BANNER_RESERVE to their scroll padding so the last row clears the strip.
//
// Same Expo Go discipline as src/ads/AdBanner.tsx: react-native-google-mobile-ads is
// require()d lazily, ONLY past the ADS_AVAILABLE guard. A top-level import would run
// TurboModuleRegistry.getEnforcing() at module load and crash Expo Go.
// ─────────────────────────────────────────────────────────────────────────────

import React, { memo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ADS_AVAILABLE } from '@/src/ads/adsRuntime';
import { AD_UNIT_IDS } from '@/src/config/ads';
import { useTheme } from '@/src/themes/ThemeProvider';
import { logger } from '@/src/utils/logger';
import { rs } from '@/src/utils/responsive';

/**
 * Bottom padding a tab screen must add so its last row can scroll clear of the
 * persistent banner. An anchored adaptive banner is ~50dp on a phone; 60 leaves a
 * little breathing room. 0 in Expo Go, where the banner never renders at all.
 */
export const PERSISTENT_BANNER_RESERVE = ADS_AVAILABLE ? rs(60) : 0;

const PersistentBanner = memo(function PersistentBanner() {
  const theme = useTheme();
  const [failed, setFailed] = useState(false);

  // Collapse to nothing in Expo Go or after a load failure. This early return also
  // ensures the native module is never require()d in Expo Go.
  if (!ADS_AVAILABLE || failed) return null;

  // Lazy require — safe here because we're past the ADS_AVAILABLE guard (real build).
  const { BannerAd, BannerAdSize } = require('react-native-google-mobile-ads');

  return (
    // No fixed height: the strip hugs the ad, so it stays zero-height until a fill
    // arrives and the tab bar never jumps. bg2 is the tab bar's own Android colour, so
    // the strip reads as an extension of the bar rather than a card glued on top.
    <View style={[styles.strip, { backgroundColor: theme.bg2 }]}>
      <BannerAd
        unitId={AD_UNIT_IDS.banner}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{ requestNonPersonalizedAdsOnly: true }}
        onAdFailedToLoad={(err: unknown) => {
          logger.error('Persistent banner failed to load:', err);
          setFailed(true);
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  strip: { alignItems: 'center', overflow: 'hidden' },
});

export default PersistentBanner;
