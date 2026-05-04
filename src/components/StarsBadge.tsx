import React, { memo, useEffect, useRef } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../themes/ThemeProvider';

interface StarsBadgeProps {
  balance: number;
  onPress?: () => void;
}

const StarsBadge = memo(function StarsBadge({ balance, onPress }: StarsBadgeProps) {
  const theme = useTheme();
  const scale = useSharedValue(1);
  const prev = useRef(balance);

  useEffect(() => {
    if (balance !== prev.current) {
      scale.value = withSequence(
        withSpring(1.12, { stiffness: 400, damping: 10 }),
        withSpring(1, { stiffness: 300, damping: 12 }),
      );
      prev.current = balance;
    }
  }, [balance, scale]);

  const animated = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const inner = (
    <Animated.View style={animated}>
      <View
        style={[
          styles.pill,
          {
            backgroundColor: theme.surface,
            borderColor: `${theme.gold}33`,
            // soft gold halo per design tokens (matches the
            // box-shadow: 0 0 16px rgba(245,197,66,0.25) recipe)
            shadowColor: theme.gold,
            shadowOpacity: Platform.OS === 'ios' ? 0.45 : 0.25,
            shadowRadius: 16,
            shadowOffset: { width: 0, height: 0 },
            elevation: 6,
          },
        ]}
      >
        <MaterialCommunityIcons name="star" size={16} color={theme.gold} />
        <Text style={[styles.text, { color: theme.gold }]}>{balance}</Text>
      </View>
    </Animated.View>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        accessibilityLabel={`${balance} stars`}
        accessibilityRole="button"
        activeOpacity={0.8}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        {inner}
      </TouchableOpacity>
    );
  }
  return inner;
});

export default StarsBadge;

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
  },
});
