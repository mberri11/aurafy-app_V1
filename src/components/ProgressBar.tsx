import React, { memo, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../themes/ThemeProvider';
import { useTranslation } from 'react-i18next';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar = memo(function ProgressBar({ current, total }: ProgressBarProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const progress = useSharedValue(0);

  useEffect(() => {
    const ratio = total > 0 ? current / total : 0;
    progress.value = withTiming(ratio, { duration: 300 });
  }, [current, total, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%` as `${number}%`,
  }));

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, { color: theme.textMuted }]}>
        {t('quiz.progressLabel', { current, total })}
      </Text>
      <View style={[styles.track, { backgroundColor: theme.surface }]}>
        <Animated.View style={[styles.fillWrapper, animatedStyle]}>
          <LinearGradient
            colors={[theme.gradient[0], theme.gradient[2]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[StyleSheet.absoluteFill, { shadowColor: theme.glow, shadowOpacity: 0.6, shadowRadius: 6, shadowOffset: { width: 0, height: 0 } }]}
          />
        </Animated.View>
      </View>
    </View>
  );
});

export default ProgressBar;

const styles = StyleSheet.create({
  wrapper: { width: '100%', gap: 6 },
  label: { fontSize: 13, textAlign: 'right', fontFamily: 'Inter_400Regular' },
  track: { height: 4, borderRadius: 4, width: '100%', overflow: 'hidden' },
  fillWrapper: { height: 4, borderRadius: 4, overflow: 'hidden' },
});
