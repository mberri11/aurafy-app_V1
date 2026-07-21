import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import CategoryMotif from '@/src/components/CategoryMotif';
import { FLAG_DUO, isDualFlagModule, moduleTheme } from '@/src/themes/categoryTheme';

/**
 * Module glyph. The design reference uses the platform's glossy 3D emoji art
 * (e.g. 🔮 for who_loves_me), which matches the reference 1:1 on device, so we
 * render the emoji directly. The earlier hand-authored crystal-ball SVG read as
 * a flat violet sphere and did NOT match — see git history if a bespoke,
 * per-module SVG glyph is ever needed for a device that renders an emoji poorly.
 * Exceptions:
 *  • modules whose spine motif is the colour wheel (aura_color) render the
 *    CategoryMotif disc so Home / detail / History all show the same glyph;
 *  • red_green_flag renders a bespoke DUAL-FLAG SVG (red + green pennants) —
 *    no green-flag emoji exists, and the module's identity is both poles.
 */
interface ModuleIconProps {
  id: string;
  emoji: string;
  size?: number;
}

/** The module's classic waving-flag glyph (MCI `flag-variant` — the same mark the
 *  History motif uses) twice at IDENTICAL size: red left, green right, the green
 *  one mirrored so the two flags FACE EACH OTHER (Simo, 2026-07-19). */
function DualFlagGlyph({ size }: { size: number }) {
  const s = Math.round(size * 0.56);
  return (
    <View style={styles.dualRow}>
      <MaterialCommunityIcons name="flag-variant" size={s} color={FLAG_DUO.red} />
      <MaterialCommunityIcons
        name="flag-variant"
        size={s}
        color={FLAG_DUO.green}
        style={[styles.dualMirror, { marginStart: -s * 0.22 }]}
      />
    </View>
  );
}

const ModuleIcon = memo(function ModuleIcon({ id, emoji, size = 64 }: ModuleIconProps) {
  if (isDualFlagModule(id)) {
    return <DualFlagGlyph size={size} />;
  }
  if (moduleTheme(id).motif.kind === 'wheel') {
    return <CategoryMotif moduleId={id} size={size * 0.62} />;
  }
  return <Text style={[styles.emoji, { fontSize: size * 0.62 }]}>{emoji}</Text>;
});

export default ModuleIcon;

const styles = StyleSheet.create({
  emoji: { textAlign: 'center' },
  dualRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  // Mirror the green flag so its pennant points back at the red one.
  dualMirror: { transform: [{ scaleX: -1 }] },
});
