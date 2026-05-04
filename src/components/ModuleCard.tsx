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
  starsCost: number;
  onPress: () => void;
  locked?: boolean;
}

const ModuleCard = memo(function ModuleCard({
  module,
  title,
  subtitle,
  starsCost,
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
          {/* Radial color halo behind everything — matches the design's
              "radial-gradient(circle, <color> 0%, transparent 70%)" recipe. */}
          <LinearGradient
            pointerEvents="none"
            colors={[`${module.color}55`, `${module.color}1A`, 'transparent']}
            start={{ x: 0.5, y: 0.2 }}
            end={{ x: 0.5, y: 1 }}
            style={StyleSheet.absoluteFill}
          />

          {/* Square tinted icon tile — uses module.icon emoji as content
              (data-driven content emoji, not a UI affordance icon). */}
          <View
            style={[
              styles.iconTile,
              { backgroundColor: `${module.color}33`, borderColor: `${module.color}66` },
            ]}
          >
            <Text style={styles.iconChar}>{module.icon}</Text>
          </View>

          <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
            {title}
          </Text>
          <Text style={[styles.subtitle, { color: theme.textMuted }]} numberOfLines={2}>
            {subtitle}
          </Text>

          <View style={styles.footerRow}>
            <View style={[styles.accentLine, { backgroundColor: module.color }]} />
            <View
              style={[
                styles.costChip,
                {
                  backgroundColor: `${theme.gold}1F`,
                  borderColor: `${theme.gold}55`,
                },
              ]}
            >
              <Text style={[styles.costText, { color: theme.gold }]}>{starsCost} ★</Text>
            </View>
          </View>

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
    minHeight: 142,
    gap: 8,
  },
  iconTile: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  iconChar: { fontSize: 22 },
  title: {
    fontSize: 15,
    fontFamily: 'Fraunces_600SemiBold',
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Inter_400Regular',
  },
  footerRow: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  accentLine: {
    flex: 1,
    height: 2,
    borderRadius: 999,
  },
  costChip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  costText: {
    fontSize: 11,
    fontFamily: 'Inter_700Bold',
  },
  lockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
