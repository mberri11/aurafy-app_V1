// ─────────────────────────────────────────────────────────────────────────────
// ReadingProgressBar — thin gradient bar pinned to the top of the reader that
// fills 0→1 as the user scrolls (10-Insight-3 / -4 top edge). Driven by a
// Reanimated shared value so the fill animates on the UI thread.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  type SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { useTheme } from '@/src/themes/ThemeProvider';

export interface ReadingProgressBarProps {
  /** 0–1 scroll progress (shared value). */
  progress: SharedValue<number>;
}

export default function ReadingProgressBar({ progress }: ReadingProgressBarProps) {
  const theme = useTheme();
  const fillStyle = useAnimatedStyle(() => ({
    width: `${Math.max(0, Math.min(1, progress.value)) * 100}%`,
  }));

  return (
    <View style={[styles.track, { backgroundColor: theme.surfaceBorder }]}>
      <Animated.View style={[styles.fill, { backgroundColor: theme.gradient[0] }, fillStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { height: 2.5, width: '100%' },
  fill: { height: 2.5 },
});
