// ─────────────────────────────────────────────────────────────────────────────
// SpectrumHairline — the Aura Color module's SIGNATURE MOTIF (AURA_PRISM_V2, locked
// 2026-07-19). A 1–2px horizontal gradient rule running all six spectrum stops in
// canonical order, left→right. It is ONLY ever a thin rule — never a fill, never
// thicker than 2px. Used as: home-card top edge, divider under the category pill,
// quiz/loading progress fill, and the divider beneath a CTA.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AURA_SPECTRUM_STOPS } from '@/src/themes/categoryTheme';

interface SpectrumHairlineProps {
  /** Rule thickness in px. Clamped to ≤2 — this motif is NEVER thicker than 2px. */
  height?: number;
  /** Corner radius (e.g. to round a progress fill). Default 0. */
  radius?: number;
  style?: StyleProp<ViewStyle>;
}

/** The six canonical stops as a fixed tuple for expo-linear-gradient's typing. */
const STOPS = AURA_SPECTRUM_STOPS as unknown as readonly [string, string, ...string[]];

export default function SpectrumHairline({ height = 2, radius = 0, style }: SpectrumHairlineProps) {
  const h = Math.min(height, 2);
  return (
    <View style={[styles.wrap, { height: h, borderRadius: radius }, style]}>
      <LinearGradient
        colors={STOPS}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // Full width by default; callers constrain width via `style`. overflow clips the
  // gradient to the (optionally rounded) rule.
  wrap: { width: '100%', overflow: 'hidden' },
});
