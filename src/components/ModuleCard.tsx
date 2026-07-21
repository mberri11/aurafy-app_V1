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
import { resolveModuleCardStyle } from '../themes/moduleCardStyle';
import { AURA_V2, AURA_SPECTRUM_STOPS, FLAG_DUO, isDualFlagModule, isPrismModule } from '../themes/categoryTheme';
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

/** AURA_PRISM_V2: wraps the obsidian home card in a thin full-perimeter spectrum border
 *  (a diagonal 6-stop gradient behind the card, showing through ~1.5px of padding). */
function PrismBorder({ enabled, children }: { enabled: boolean; children: React.ReactNode }) {
  if (!enabled) return <>{children}</>;
  return (
    <LinearGradient
      colors={AURA_SPECTRUM_STOPS}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.prismBorder}
    >
      {children}
    </LinearGradient>
  );
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
  // The active theme's module-card skin, resolved for this module's accent. ALL
  // card colors (glow, bloom, icon tile, locked/coming-soon) flow through this —
  // never derive from module.color inline (themes may override the derivation).
  const mc = resolveModuleCardStyle(theme, module.color);
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
  // AURA_PRISM_V2: the aura card is flat obsidian with a spectrum hairline on its top
  // edge and the neutral Prism Orb in the tile — no coloured bloom, no gradient fill.
  const prism = isPrismModule(module.id);
  // RED/GREEN dual identity: red stays the base accent (module.color); a green
  // counter-bloom rises from the opposite corner so the card reads "both poles".
  const dual = isDualFlagModule(module.id);

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
          { borderColor: mc.comingSoonBorder },
        ]}
        accessibilityLabel={`${title}, coming soon`}
        accessibilityRole="text"
      >
        <View style={styles.topRow}>
          <View
            style={[
              styles.iconTile,
              { backgroundColor: mc.comingSoonIconBg, borderColor: mc.comingSoonIconBorder },
            ]}
          >
            <MaterialCommunityIcons name="lock-outline" size={rs(20)} color={mc.comingSoonTint} />
          </View>
        </View>

        <View style={styles.spacer} />

        <Text style={[styles.title, { color: mc.comingSoonTint }]} numberOfLines={2}>
          {title}
        </Text>
        <Text style={[styles.subtitle, { color: mc.comingSoonTint }]} numberOfLines={1}>
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
        <PrismBorder enabled={prism}>
        <GlassCard
          glowColor={prism ? 'rgba(0,0,0,0)' : mc.glow}
          style={
            prism
              ? [styles.card, styles.prismCard]
              : [
                  styles.card,
                  // Theme fill/border overrides — null keeps GlassCard's defaults.
                  mc.background != null && { backgroundColor: mc.background },
                  mc.border != null && { borderColor: mc.border },
                ]
          }
        >
          <View style={prism ? styles.inner : undefined}>
          {/* Theme wash — optional top→bottom gradient over the glass fill. */}
          {!prism && mc.gradient != null ? (
            <LinearGradient
              colors={mc.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={StyleSheet.absoluteFill}
              pointerEvents="none"
            />
          ) : null}
          {prism ? null : (
            // soft color bloom emanating from the top-right corner; the card's
            // overflow:hidden clips the oversized radial to the card edges
            <Svg width={300} height={300} style={styles.bloom} pointerEvents="none">
              <Defs>
                <RadialGradient id={`mc-${module.id}`} cx="50%" cy="50%" r="50%">
                  <Stop offset="0%" stopColor={mc.bloom} stopOpacity={mc.bloomOpacity[0]} />
                  <Stop offset="50%" stopColor={mc.bloom} stopOpacity={mc.bloomOpacity[1]} />
                  <Stop offset="100%" stopColor={mc.bloom} stopOpacity={0} />
                </RadialGradient>
              </Defs>
              <Rect x={0} y={0} width={300} height={300} fill={`url(#mc-${module.id})`} />
            </Svg>
          )}
          {/* Dual identity: green counter-bloom from the opposite (bottom-start) corner. */}
          {dual ? (
            <Svg width={300} height={300} style={styles.bloomDual} pointerEvents="none">
              <Defs>
                <RadialGradient id={`mc-dual-${module.id}`} cx="50%" cy="50%" r="50%">
                  <Stop offset="0%" stopColor={FLAG_DUO.green} stopOpacity={0.26} />
                  <Stop offset="50%" stopColor={FLAG_DUO.green} stopOpacity={0.07} />
                  <Stop offset="100%" stopColor={FLAG_DUO.green} stopOpacity={0} />
                </RadialGradient>
              </Defs>
              <Rect x={0} y={0} width={300} height={300} fill={`url(#mc-dual-${module.id})`} />
            </Svg>
          ) : null}

          <View style={styles.topRow}>
            <View
              style={[
                styles.iconTile,
                prism
                  ? styles.iconTilePrism
                  : { backgroundColor: mc.iconBg, borderColor: mc.iconBorder },
              ]}
            >
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
              style={[styles.lockedOverlay, { backgroundColor: mc.lockedOverlay }]}
            >
              <MaterialCommunityIcons name="lock" size={rs(22)} color={mc.lockedTint} />
            </View>
          ) : null}
          </View>
        </GlassCard>
        </PrismBorder>
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
  // AURA_PRISM_V2: flat obsidian card surface (opaque → the glass blur reads as solid).
  prismCard: { backgroundColor: AURA_V2.obsidian },
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
  // Green counter-bloom (dual identity) — mirrored to the bottom-start corner.
  bloomDual: {
    position: 'absolute',
    bottom: -95,
    start: -95,
  },
  // Full-perimeter spectrum border: 1.5px of padding lets the gradient show as a thin
  // rule around the whole obsidian card. Radius = card radius + padding.
  prismBorder: {
    borderRadius: rs(21.5),
    padding: 1.5,
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
    backgroundColor: AURA_V2.obsidian,
    borderColor: 'rgba(155,153,168,0.45)', // silver hairline
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
