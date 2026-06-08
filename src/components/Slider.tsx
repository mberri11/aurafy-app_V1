import React, { memo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useTheme } from '../themes/ThemeProvider';
import { rs } from '../utils/responsive';

interface SliderProps {
  value: number; // 0–1
  onChange: (v: number) => void;
  /** Greyed-out + inert (gestures disabled). Parent handles the dim. */
  disabled?: boolean;
}

const THUMB = rs(18);
const TRACK_H = rs(4);

/**
 * Minimal horizontal slider (no native lib). Tap anywhere to set, or drag the
 * thumb to your finger — both are absolute (the thumb jumps to the touch x), so
 * it tracks the finger precisely. A Tap+Pan race lets vertical list scrolling
 * still win when the gesture is mostly vertical (`activeOffsetX` on the pan).
 * Runs on the UI thread; commits the final value to JS via runOnJS.
 */
const Slider = memo(function Slider({ value, onChange, disabled = false }: SliderProps) {
  const theme = useTheme();
  const [width, setWidth] = useState(0);
  const usable = Math.max(0, width - THUMB);
  const pos = useSharedValue(value * usable);
  const dragging = React.useRef(false);

  // Keep the thumb in sync when the track width or external value changes —
  // but NOT mid-drag, or the committed-value round-trip fights the gesture and
  // the thumb stutters / jumps away from the finger.
  React.useEffect(() => {
    if (dragging.current) return;
    pos.value = value * usable;
  }, [value, usable, pos]);

  const setDragging = (v: boolean) => {
    dragging.current = v;
  };

  const commit = (px: number) => {
    if (usable <= 0) return;
    onChange(Math.max(0, Math.min(1, px / usable)));
  };

  const setFromX = (x: number) => {
    'worklet';
    const next = Math.max(0, Math.min(usable, x - THUMB / 2));
    pos.value = next;
    runOnJS(commit)(next);
  };

  // Tap-to-set (no movement → won't fight a vertical scroll) raced with a
  // horizontal drag that only activates past 8px so the list can still scroll.
  const tap = Gesture.Tap()
    .enabled(!disabled)
    .maxDuration(300)
    .onEnd((e) => setFromX(e.x));

  const pan = Gesture.Pan()
    .enabled(!disabled)
    .activeOffsetX([-8, 8])
    .onBegin(() => runOnJS(setDragging)(true))
    .onUpdate((e) => setFromX(e.x))
    .onFinalize(() => runOnJS(setDragging)(false));

  const gesture = Gesture.Race(pan, tap);

  const fillStyle = useAnimatedStyle(() => ({ width: pos.value + THUMB / 2 }));
  const thumbStyle = useAnimatedStyle(() => ({ transform: [{ translateX: pos.value }] }));

  return (
    <GestureDetector gesture={gesture}>
      <View
        style={styles.hitArea}
        onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      >
        <View style={[styles.track, { backgroundColor: theme.borderStrong }]} />
        <Animated.View style={[styles.fill, { backgroundColor: theme.gradient[0] }, fillStyle]} />
        <Animated.View
          style={[styles.thumb, { backgroundColor: '#FFFFFF' }, thumbStyle]}
        />
      </View>
    </GestureDetector>
  );
});

export default Slider;

const styles = StyleSheet.create({
  hitArea: { height: rs(28), justifyContent: 'center' },
  track: {
    height: TRACK_H,
    borderRadius: TRACK_H / 2,
    width: '100%',
    position: 'absolute',
  },
  fill: {
    height: TRACK_H,
    borderRadius: TRACK_H / 2,
    position: 'absolute',
    left: 0,
  },
  thumb: {
    width: THUMB,
    height: THUMB,
    borderRadius: THUMB / 2,
    position: 'absolute',
    left: 0,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 3,
  },
});
