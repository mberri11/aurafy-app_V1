import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

import { useTheme } from '../themes/ThemeProvider';

interface CosmicBloomProps {
  /** Radial center X (e.g. '32%') and Y (e.g. '6%') and radius (e.g. '62%'). */
  cx: string;
  cy: string;
  r: string;
}

/**
 * Soft violet radial bloom drawn over the cosmic field. Extracted + memoized so
 * it does not re-create its full-screen `react-native-svg` gradient on every
 * parent render (StarsBadge animations, FlatList scrolls), which keeps the
 * screen's re-commit cheap. Uses a full-screen Rect so the radial bleeds past
 * its own box (rn-svg otherwise clips a radial to its element bounds).
 */
const CosmicBloom = memo(function CosmicBloom({ cx, cy, r }: CosmicBloomProps) {
  const theme = useTheme();
  return (
    <Svg style={StyleSheet.absoluteFill} width="100%" height="100%" pointerEvents="none">
      <Defs>
        <RadialGradient id="cosmic_bloom" cx={cx} cy={cy} r={r}>
          <Stop offset="0%" stopColor={theme.primary} stopOpacity={0.22} />
          <Stop offset="55%" stopColor="#A855F7" stopOpacity={0.07} />
          <Stop offset="100%" stopColor={theme.background} stopOpacity={0} />
        </RadialGradient>
      </Defs>
      <Rect x="0" y="0" width="100%" height="100%" fill="url(#cosmic_bloom)" />
    </Svg>
  );
});

export default CosmicBloom;
