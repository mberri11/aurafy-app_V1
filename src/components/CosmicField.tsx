import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../themes/ThemeProvider';

/**
 * The shared ambient base field — the theme's vertical field gradient that sits
 * behind Home and the module detail screen. Rendered ONCE at the root (behind
 * the navigator) so it is always painted and never re-mounts; screens that want
 * to show it keep a transparent container. This is what prevents the dark
 * `theme.background` base from flashing through during a stack transition while
 * a screen's own gradient/bloom/content commit a frame late.
 *
 * Colors come from `theme.fieldGradient` (cosmic: indigo→navy, desert: ember→
 * near-black) — pixel-identical under Cosmic to the values it hardcoded before.
 */
const CosmicField = memo(function CosmicField() {
  const theme = useTheme();
  return (
    <LinearGradient
      colors={theme.fieldGradient}
      locations={[0, 0.5, 1]}
      style={StyleSheet.absoluteFill}
      pointerEvents="none"
    />
  );
});

export default CosmicField;
