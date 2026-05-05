import React, { memo, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useTheme } from '../themes/ThemeProvider';
import GlassCard from './GlassCard';
import { Module } from '../types';

interface ModuleCardProps {
  module: Module;
  title: string;
  subtitle: string;
  onPress: () => void;
  locked?: boolean;
}

const ModuleCard = memo(function ModuleCard({
  module,
  title,
  subtitle,
  onPress,
  locked = false,
}: ModuleCardProps) {
  const theme = useTheme();
  const scale = useSharedValue(1);

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.97, { stiffness: 300, damping: 20 });
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, { stiffness: 300, damping: 20 });
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        onPress={locked ? undefined : onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessibilityLabel={`${title} module${locked ? ', locked' : ''}`}
        accessibilityRole="button"
        activeOpacity={1}
      >
        <GlassCard glowColor={`${module.color}66`} style={styles.card}>
          <LinearGradient
            pointerEvents="none"
            colors={[`${module.color}55`, `${module.color}1A`, 'transparent']}
            start={{ x: 0.5, y: 0.2 }}
            end={{ x: 0.5, y: 1 }}
            style={StyleSheet.absoluteFill}
          />

          <View
            style={[
              styles.iconTile,
              { backgroundColor: `${module.color}33`, borderColor: `${module.color}66` },
            ]}
          >
            <Text style={styles.iconChar}>{module.icon}</Text>
          </View>

          <View style={styles.spacer} />

          <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
            {title}
          </Text>
          <Text style={[styles.subtitle, { color: theme.textMuted }]} numberOfLines={2}>
            {subtitle}
          </Text>

          {locked ? (
            <View
              pointerEvents="none"
              style={[styles.lockedOverlay, { backgroundColor: `${theme.background}CC` }]}
            >
              <MaterialCommunityIcons name="lock" size={22} color={theme.textMuted} />
            </View>
          ) : null}
        </GlassCard>
      </TouchableOpacity>
    </Animated.View>
  );
});

export default ModuleCard;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    minHeight: 180,
  },
  iconTile: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconChar: { fontSize: 22 },
  spacer: { flex: 1, minHeight: 24 },
  title: {
    fontSize: 16,
    fontFamily: 'Fraunces_700Bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Inter_400Regular',
  },
  lockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});