import React, { memo, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import { useTheme } from '../themes/ThemeProvider';
import GlassCard from './GlassCard';
import { Module } from '../types';
import { rs } from '../utils/responsive';

interface ModuleCardProps {
  module: Module;
  title: string;
  subtitle: string;
  onPress: () => void;
  locked?: boolean;
  /** Dimmed, non-interactive "Coming soon" placeholder card (per the Home design). */
  comingSoon?: boolean;
  /** Shows the gold "Try free ✦" pill in the top-right (the free module). */
  freeTrial?: boolean;
}

const ModuleCard = memo(function ModuleCard({
  module,
  title,
  subtitle,
  onPress,
  locked = false,
  comingSoon = false,
  freeTrial = false,
}: ModuleCardProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const scale = useSharedValue(1);

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.97, { stiffness: 300, damping: 20 });
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, { stiffness: 300, damping: 20 });
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  // Locked "Coming soon" placeholder: faint dashed panel, dim lock tile, no bloom,
  // not interactive. Matches the Birth Chart / Am I Healing cards in the design.
  if (comingSoon) {
    return (
      <View
        style={[
          styles.card,
          styles.comingSoonCard,
          { borderColor: theme.surfaceBorder },
        ]}
        accessibilityLabel={`${title}, coming soon`}
        accessibilityRole="text"
      >
        <View style={styles.topRow}>
          <View
            style={[
              styles.iconTile,
              { backgroundColor: `${theme.textDim}14`, borderColor: `${theme.textDim}40` },
            ]}
          >
            <MaterialCommunityIcons name="lock-outline" size={rs(20)} color={theme.textDim} />
          </View>
        </View>

        <View style={styles.spacer} />

        <Text style={[styles.title, { color: theme.textDim }]} numberOfLines={2}>
          {title}
        </Text>
        <Text style={[styles.subtitle, { color: theme.textDim }]} numberOfLines={1}>
          {subtitle}
        </Text>
      </View>
    );
  }

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
          {/* soft color bloom emanating from the top-right corner; the card's
              overflow:hidden clips the oversized radial to the card edges */}
          <Svg width={300} height={300} style={styles.bloom} pointerEvents="none">
            <Defs>
              <RadialGradient id={`mc-${module.id}`} cx="50%" cy="50%" r="50%">
                <Stop offset="0%" stopColor={module.color} stopOpacity={0.32} />
                <Stop offset="50%" stopColor={module.color} stopOpacity={0.09} />
                <Stop offset="100%" stopColor={module.color} stopOpacity={0} />
              </RadialGradient>
            </Defs>
            <Rect x={0} y={0} width={300} height={300} fill={`url(#mc-${module.id})`} />
          </Svg>

          <View style={styles.topRow}>
            <View
              style={[
                styles.iconTile,
                { backgroundColor: `${module.color}33`, borderColor: `${module.color}66` },
              ]}
            >
              <Text style={styles.iconChar}>{module.icon}</Text>
            </View>

            {freeTrial ? (
              <View style={[styles.tryFreePill, { borderColor: `${theme.gold}66`, backgroundColor: `${theme.gold}14` }]}>
                <Text style={[styles.tryFreeText, { color: theme.gold }]}>{t('home.tryFree')}</Text>
                <MaterialCommunityIcons name="star-four-points" size={rs(10)} color={theme.gold} />
              </View>
            ) : null}
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
              <MaterialCommunityIcons name="lock" size={rs(22)} color={theme.textMuted} />
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
    padding: rs(14),
    minHeight: rs(148),
  },
  comingSoonCard: {
    borderRadius: rs(20),
    borderWidth: 1,
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  bloom: {
    position: 'absolute',
    top: -95,
    right: -95,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  iconTile: {
    width: rs(40),
    height: rs(40),
    borderRadius: rs(11),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconChar: { fontSize: rs(20) },
  tryFreePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(3),
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: rs(8),
    paddingVertical: rs(3),
  },
  tryFreeText: { fontSize: rs(11), fontFamily: 'Inter_600SemiBold' },
  spacer: { flex: 1, minHeight: rs(14) },
  title: {
    fontSize: rs(16),
    lineHeight: rs(20),
    fontFamily: 'PlayfairDisplay_700Bold',
    marginBottom: rs(3),
  },
  subtitle: {
    fontSize: rs(11),
    lineHeight: rs(15),
    fontFamily: 'Inter_400Regular',
  },
  lockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: rs(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
