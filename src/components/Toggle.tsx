import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../themes/ThemeProvider';
import { useIsRTL } from '../utils/rtl';
import { rs } from '../utils/responsive';

interface ToggleProps {
  value: boolean;
  onValueChange: (next: boolean) => void;
  accessibilityLabel?: string;
}

const TRACK_W = rs(48);
const TRACK_H = rs(28);
const PAD = rs(3);
const THUMB = TRACK_H - PAD * 2;
const TRAVEL = TRACK_W - THUMB - PAD * 2;

/**
 * Custom switch matching the design's ON state: a cyan→violet **gradient** track
 * (RN's <Switch> can only do a flat track color). OFF is a neutral glass track.
 * The white thumb slides on the UI thread.
 */
const Toggle = memo(function Toggle({ value, onValueChange, accessibilityLabel }: ToggleProps) {
  const theme = useTheme();
  const isRTL = useIsRTL();
  // The thumb rests at the leading edge via the LOGICAL `start` inset (auto-mirrors to the
  // right under native RTL — see styles.thumb). The slide is a transform, which is NOT
  // auto-mirrored, so flip its sign for RTL (travel left instead of right).
  const travel = isRTL ? -TRAVEL : TRAVEL;
  const progress = useDerivedValue(() => withTiming(value ? 1 : 0, { duration: 180 }), [value]);

  const gradientStyle = useAnimatedStyle(() => ({ opacity: progress.value }));
  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(progress.value, [0, 1], [0, travel]) }],
  }));

  return (
    <Pressable
      onPress={() => onValueChange(!value)}
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      accessibilityLabel={accessibilityLabel}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <View
        style={[
          styles.track,
          { backgroundColor: theme.surface, borderColor: theme.surfaceBorder },
        ]}
      >
        {/* Gradient fill fades in when ON */}
        <Animated.View style={[StyleSheet.absoluteFill, styles.fill, gradientStyle]}>
          <LinearGradient
            colors={[theme.gradient[0], theme.gradient[1]]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>

        <Animated.View style={[styles.thumb, thumbStyle]} />
      </View>
    </Pressable>
  );
});

export default Toggle;

const styles = StyleSheet.create({
  track: {
    width: TRACK_W,
    height: TRACK_H,
    borderRadius: TRACK_H / 2,
    borderWidth: 1,
    padding: PAD,
    justifyContent: 'center',
  },
  fill: { borderRadius: TRACK_H / 2, overflow: 'hidden' },
  thumb: {
    position: 'absolute',
    top: PAD,
    start: PAD,
    width: THUMB,
    height: THUMB,
    borderRadius: THUMB / 2,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
});
