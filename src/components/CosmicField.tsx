import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

/**
 * The shared cosmic base field — the indigo→navy vertical gradient that sits
 * behind Home and the module detail screen. Rendered ONCE at the root (behind
 * the navigator) so it is always painted and never re-mounts; screens that want
 * to show it keep a transparent container. This is what prevents the dark
 * (`#07091A`) base from flashing through during a stack transition while a
 * screen's own gradient/bloom/content commit a frame late.
 *
 * Pixel-identical to the gradient Home/module rendered inline before — same
 * colors and locations, just hoisted to the root.
 */
const CosmicField = memo(function CosmicField() {
  return (
    <LinearGradient
      colors={['#181430', '#0E0B22', '#08061A']}
      locations={[0, 0.5, 1]}
      style={StyleSheet.absoluteFill}
      pointerEvents="none"
    />
  );
});

export default CosmicField;
