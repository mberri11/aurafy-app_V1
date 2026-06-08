import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';

/**
 * Module glyph. The design reference uses the platform's glossy 3D emoji art
 * (e.g. 🔮 for who_loves_me), which matches the reference 1:1 on device, so we
 * render the emoji directly. The earlier hand-authored crystal-ball SVG read as
 * a flat violet sphere and did NOT match — see git history if a bespoke,
 * per-module SVG glyph is ever needed for a device that renders an emoji poorly.
 */
interface ModuleIconProps {
  id: string;
  emoji: string;
  size?: number;
}

const ModuleIcon = memo(function ModuleIcon({ emoji, size = 64 }: ModuleIconProps) {
  return <Text style={[styles.emoji, { fontSize: size * 0.62 }]}>{emoji}</Text>;
});

export default ModuleIcon;

const styles = StyleSheet.create({
  emoji: { textAlign: 'center' },
});
