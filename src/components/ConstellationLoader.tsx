import React, { memo, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  withRepeat,
  Easing,
} from 'react-native-reanimated';
import { useTheme } from '../themes/ThemeProvider';

/** 6 dots in hexagonal constellation pattern */
const DOT_COUNT = 6;
const RADIUS = 60;

function getDotPositions(): { x: number; y: number }[] {
  const positions: { x: number; y: number }[] = [];
  for (let i = 0; i < DOT_COUNT; i++) {
    const angle = (i * 360) / DOT_COUNT - 90; // start from top
    const rad = (angle * Math.PI) / 180;
    positions.push({ x: RADIUS * Math.cos(rad), y: RADIUS * Math.sin(rad) });
  }
  return positions;
}

const DOT_POSITIONS = getDotPositions();

interface DotProps {
  x: number;
  y: number;
  color: string;
  delay: number;
}

const Dot = memo(function Dot({ x, y, color, delay }: DotProps) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withDelay(delay, withTiming(1, { duration: 400, easing: Easing.out(Easing.ease) })),
        withDelay(DOT_COUNT * 300 + 1500, withTiming(0, { duration: 200 })),
        withDelay(200, withTiming(0, { duration: 0 })),
      ),
      -1,
      false,
    );
  }, [opacity, delay]);

  const style = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      style={[
        styles.dot,
        { backgroundColor: color, left: x + RADIUS - 4, top: y + RADIUS - 4 },
        style,
      ]}
    />
  );
});

const ConstellationLoader = memo(function ConstellationLoader() {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {DOT_POSITIONS.map((pos, i) => (
        <Dot
          key={i}
          x={pos.x}
          y={pos.y}
          color={theme.primary}
          delay={i * 300}
        />
      ))}
    </View>
  );
});

export default ConstellationLoader;

const styles = StyleSheet.create({
  container: {
    width: RADIUS * 2 + 8,
    height: RADIUS * 2 + 8,
    position: 'relative',
  },
  dot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
