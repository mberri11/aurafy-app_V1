import React, { memo, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../themes/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { rs } from '../utils/responsive';

interface ProgressBarProps {
  current: number;
  total: number;
  /** Solid fill colour — the module accent. Defaults to theme.primary. */
  accentColor?: string;
}

// Single-row layout per the quiz design (08-*_quiz.png): rounded track on the
// left, "1 / 20" counter right-aligned on the same baseline, solid accent fill.
const ProgressBar = memo(function ProgressBar({ current, total, accentColor }: ProgressBarProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const progress = useSharedValue(0);
  const fill = accentColor ?? theme.primary;

  useEffect(() => {
    const ratio = total > 0 ? current / total : 0;
    progress.value = withTiming(ratio, { duration: 300 });
  }, [current, total, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%` as `${number}%`,
  }));

  return (
    <View style={styles.row}>
      <View style={[styles.track, { backgroundColor: theme.surfaceBorder }]}>
        <Animated.View
          style={[
            styles.fill,
            animatedStyle,
            {
              backgroundColor: fill,
              shadowColor: fill,
              shadowOpacity: 0.6,
              shadowRadius: rs(6),
              shadowOffset: { width: 0, height: 0 },
            },
          ]}
        />
      </View>
      <Text style={[styles.label, { color: theme.textMuted }]}>
        {t('quiz.progressLabel', { current, total })}
      </Text>
    </View>
  );
});

export default ProgressBar;

const styles = StyleSheet.create({
  row: { width: '100%', flexDirection: 'row', alignItems: 'center', gap: rs(12) },
  track: { flex: 1, height: rs(5), borderRadius: rs(5), overflow: 'hidden' },
  fill: { height: '100%', borderRadius: rs(5) },
  label: {
    fontSize: rs(12),
    fontFamily: 'Inter_500Medium',
    fontVariant: ['lining-nums'],
  },
});
