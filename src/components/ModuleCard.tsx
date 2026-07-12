import React, { memo, useCallback } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppText as Text } from '@/src/components/AppText';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import { useTheme } from '../themes/ThemeProvider';
import { isPrismModule } from '../themes/categoryTheme';
import GlassCard from './GlassCard';
import ModuleIcon from './ModuleIcon';
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
  /** Set to a module's `unlockCost` when it is LOCKED-BUT-BUYABLE (paid, not yet owned):
   *  full-colour art + a lock glyph on the icon + a ★cost pill. Desirable, not disabled —
   *  the card stays interactive and its press routes into the unlock gate. Omit when the
   *  module is free or already unlocked. */
  unlockCost?: number;
}

const ModuleCard = memo(function ModuleCard({
  module,
  title,
  subtitle,
  onPress,
  locked = false,
  comingSoon = false,
  freeTrial = false,
  unlockCost,
}: ModuleCardProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  // Locked-but-buyable: full-colour card (below) + a lock glyph + a ★cost pill. The
  // comingSoon placeholder above takes precedence (a paid module with no content yet stays
  // "Coming soon" until its content ships and comingSoon is flipped off).
  const buyable = unlockCost != null && !comingSoon;
  const scale = useSharedValue(1);
  // Prismatic identity (aura_color): the detail screen's palette as THREE separate
  // blooms, each hue owning its own region of the card — violet top-right, cyan
  // bottom-left, mint bottom-right (Simo, 2026-07-04). One radial blending the
  // hues failed twice: even mix read as Attachment's cyan, violet-led read as
  // plain violet. Distinct regions are what make it read "mixed".
  const prism = isPrismModule(module.id);
  const g = theme.gradient;

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
        <GlassCard glowColor={`${prism ? g[1] : module.color}66`} style={styles.card}>
          {/* GlassCard's content box only wraps its children — when the card's
              minHeight rules, dead space sits below it that absolute overlays
              (blooms) never reach. On the prism card this wrapper re-creates the
              container's minHeight (148 minus 2×14 padding) so the content box
              fills the card and the bloom bleed lands on the REAL bottom edge.
              Styleless for other modules — their verified layout must not move. */}
          <View style={prism ? styles.inner : undefined}>
          {prism ? (
            // Prism card: three hue regions — violet (top-right), cyan (bottom-left),
            // mint (bottom-right) — mirroring the detail screen's mixed palette.
            // The wrap bleeds past the card padding to the true card edges (the
            // padded content box left a visible seam) and the oversized radii make
            // the regions melt into each other instead of floating as blobs.
            <View pointerEvents="none" style={styles.prismBloomWrap}>
              <Svg width="100%" height="100%">
                <Defs>
                  <RadialGradient id={`mcp-v-${module.id}`} cx="85%" cy="0%" r="90%">
                    <Stop offset="0%" stopColor={g[1]} stopOpacity={0.32} />
                    <Stop offset="55%" stopColor={g[1]} stopOpacity={0.1} />
                    <Stop offset="100%" stopColor={g[1]} stopOpacity={0} />
                  </RadialGradient>
                  <RadialGradient id={`mcp-c-${module.id}`} cx="0%" cy="100%" r="85%">
                    <Stop offset="0%" stopColor={g[0]} stopOpacity={0.26} />
                    <Stop offset="55%" stopColor={g[0]} stopOpacity={0.08} />
                    <Stop offset="100%" stopColor={g[0]} stopOpacity={0} />
                  </RadialGradient>
                  <RadialGradient id={`mcp-m-${module.id}`} cx="95%" cy="100%" r="80%">
                    <Stop offset="0%" stopColor={g[2]} stopOpacity={0.24} />
                    <Stop offset="55%" stopColor={g[2]} stopOpacity={0.07} />
                    <Stop offset="100%" stopColor={g[2]} stopOpacity={0} />
                  </RadialGradient>
                </Defs>
                <Rect x="0" y="0" width="100%" height="100%" fill={`url(#mcp-v-${module.id})`} />
                <Rect x="0" y="0" width="100%" height="100%" fill={`url(#mcp-c-${module.id})`} />
                <Rect x="0" y="0" width="100%" height="100%" fill={`url(#mcp-m-${module.id})`} />
              </Svg>
            </View>
          ) : (
            // soft color bloom emanating from the top-right corner; the card's
            // overflow:hidden clips the oversized radial to the card edges
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
          )}

          <View style={styles.topRow}>
            <View
              style={[
                styles.iconTile,
                prism
                  ? styles.iconTilePrism
                  : { backgroundColor: `${module.color}33`, borderColor: `${module.color}66` },
              ]}
            >
              {prism ? (
                <LinearGradient
                  colors={[`${g[1]}2E`, `${g[2]}2E`, `${g[0]}2E`]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={StyleSheet.absoluteFill}
                />
              ) : null}
              <ModuleIcon id={module.id} emoji={module.icon} size={rs(40)} />

              {/* Locked-but-buyable: a small lock badge on the icon corner (same lock-over-art
                  grammar as the unlock dialog's hero) — signals "unlock to play". */}
              {buyable ? (
                <View
                  style={[styles.iconLockBadge, { backgroundColor: theme.bg2, borderColor: theme.surfaceBorder }]}
                  pointerEvents="none"
                >
                  <MaterialCommunityIcons name="lock" size={rs(10)} color={theme.textMuted} />
                </View>
              ) : null}
            </View>

            {freeTrial ? (
              <View style={[styles.tryFreePill, { borderColor: `${theme.gold}66`, backgroundColor: `${theme.gold}14` }]}>
                <Text style={[styles.tryFreeText, { color: theme.gold }]}>{t('home.tryFree')}</Text>
                <MaterialCommunityIcons name="star-four-points" size={rs(10)} color={theme.gold} />
              </View>
            ) : buyable ? (
              // ★cost pill — StarsBadge grammar (gold star + bold number, gold-tinted glass).
              <View style={[styles.unlockPill, { borderColor: `${theme.gold}66`, backgroundColor: `${theme.gold}14` }]}>
                <MaterialCommunityIcons name="star" size={rs(11)} color={theme.gold} />
                <Text style={[styles.unlockPillText, { color: theme.gold }]}>{unlockCost}</Text>
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
          </View>
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
  // Keep in sync with card: minHeight minus vertical padding.
  inner: { minHeight: rs(120) },
  comingSoonCard: {
    borderRadius: rs(20),
    borderWidth: 1,
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  bloom: {
    position: 'absolute',
    top: -95,
    end: -95,
  },
  // Bleeds the prism blooms past the card padding to the real card edges;
  // GlassCard's overflow:hidden clips it to the rounded corners.
  prismBloomWrap: {
    position: 'absolute',
    top: -rs(14),
    bottom: -rs(14),
    start: -rs(14),
    end: -rs(14),
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
  iconTilePrism: {
    borderColor: 'rgba(255,255,255,0.28)',
    overflow: 'hidden',
  },
  tryFreePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(3),
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: rs(8),
    paddingVertical: rs(3),
  },
  tryFreeText: { fontSize: rs(11), fontFamily: 'HankenGrotesk_600SemiBold' },
  // ★cost pill for a locked-but-buyable module (mirrors tryFreePill's gold glass).
  unlockPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(3),
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: rs(8),
    paddingVertical: rs(3),
  },
  unlockPillText: { fontSize: rs(12), fontFamily: 'HankenGrotesk_700Bold' },
  // Lock badge pinned to the icon tile's outer corner.
  iconLockBadge: {
    position: 'absolute',
    top: -rs(4),
    end: -rs(4),
    width: rs(18),
    height: rs(18),
    borderRadius: 999,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    fontFamily: 'HankenGrotesk_400Regular',
  },
  lockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: rs(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
