import React, { useCallback, useMemo } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppText as Text } from '@/src/components/AppText';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import { useTheme } from '@/src/themes/ThemeProvider';
import { isPrismModule } from '@/src/themes/categoryTheme';
import { useUserStore } from '@/src/store/userStore';
import { MODULES } from '@/src/data/modules';
import GradientButton from '@/src/components/GradientButton';
import GlassCard from '@/src/components/GlassCard';
import StarsBadge from '@/src/components/StarsBadge';
import ModuleIcon from '@/src/components/ModuleIcon';
import { rs } from '@/src/utils/responsive';
import { useIsRTL } from '@/src/utils/rtl';

export default function ModuleDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const theme = useTheme();
  const isRTL = useIsRTL();
  const insets = useSafeAreaInsets();
  const stars = useUserStore((s) => s.stars);

  const module = useMemo(() => MODULES.find((m) => m.id === id), [id]);

  const handleStarsPress = useCallback(() => {
    router.push('/(tabs)/stars');
  }, []);

  const handleBeginReading = useCallback(() => {
    if (!module) return;
    if (module.type === 'solo') {
      // Skip reading mode for solo modules — go directly to person entry
      router.push({ pathname: '/person-entry', params: { moduleId: module.id, mode: 'solo' } });
    } else {
      router.push({ pathname: '/reading-mode', params: { moduleId: module.id } });
    }
  }, [module]);

  if (!module) {
    // Bad/stale module id (e.g. a deep link) — offer a way out instead of a dead end.
    // With no stack beneath (cold deep link), back falls through to Home.
    return (
      <View
        style={[styles.container, styles.center, { backgroundColor: theme.background, gap: rs(16) }]}
      >
        <Text style={{ color: theme.text }}>{t('moduleDetail.notFound')}</Text>
        <TouchableOpacity
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/(tabs)'))}
          accessibilityLabel={t('common.back')}
          accessibilityRole="button"
          activeOpacity={0.8}
          style={[styles.backBtn, { backgroundColor: theme.surface, borderColor: theme.surfaceBorder }]}
        >
          <Feather name={isRTL ? 'chevron-right' : 'chevron-left'} size={20} color={theme.text} />
        </TouchableOpacity>
      </View>
    );
  }

  // Per-module accent — drives the glow, tag, icon circle and title so each
  // module's detail reads in its own colour (design 05-module-detail_1/_2.png).
  // Aura Color is prismatic instead: brand-gradient bloom/ring/tag, white ink.
  const accent = module.color;
  const prism = isPrismModule(module.id);
  const g = theme.gradient;

  const costs = Object.values(module.starsCost);
  const cheapestCost = Math.min(...costs);
  // Only tiered modules (varying mode prices) show the "from" prefix; fixed-price
  // modules show the bare number, per the design (Attachment "1", Energy "from 1").
  const tieredCost = Math.max(...costs) !== cheapestCost;
  const costLabel = tieredCost
    ? t('moduleDetail.fromCost', { cost: cheapestCost })
    : String(cheapestCost);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Ambient depth field (mirrors Home) */}
      <LinearGradient
        colors={theme.fieldGradient}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Per-module accent bloom centered behind the icon/title. Full-screen Rect
          so the radial bleeds (rn-svg clips a radial to its own box). */}
      <Svg style={StyleSheet.absoluteFill} width="100%" height="100%" pointerEvents="none">
        <Defs>
          <RadialGradient id="module_glow" cx="50%" cy="20%" r="60%">
            {prism
              ? [
                  <Stop key="p0" offset="0%" stopColor={g[1]} stopOpacity={0.22} />,
                  <Stop key="p1" offset="45%" stopColor={g[0]} stopOpacity={0.09} />,
                  <Stop key="p2" offset="80%" stopColor={g[2]} stopOpacity={0.04} />,
                  <Stop key="p3" offset="100%" stopColor={theme.background} stopOpacity={0} />,
                ]
              : [
                  <Stop key="s0" offset="0%" stopColor={accent} stopOpacity={0.22} />,
                  <Stop key="s1" offset="55%" stopColor={accent} stopOpacity={0.07} />,
                  <Stop key="s2" offset="100%" stopColor={theme.background} stopOpacity={0} />,
                ]}
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#module_glow)" />
      </Svg>

      {/* Header: back button (left) + stars badge (right) */}
      <View style={[styles.header, { paddingTop: insets.top + rs(12) }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          accessibilityLabel={t('common.back')}
          accessibilityRole="button"
          activeOpacity={0.8}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={[styles.backBtn, { backgroundColor: theme.surface, borderColor: theme.surfaceBorder }]}
        >
          <Feather name={isRTL ? 'chevron-right' : 'chevron-left'} size={20} color={theme.text} />
        </TouchableOpacity>
        <StarsBadge balance={stars} onPress={handleStarsPress} />
      </View>

      {/* Content block (upper portion) */}
      <View style={styles.content}>
        {/* Module icon — prism gets a gradient ring around a dark disc */}
        {prism ? (
          <LinearGradient
            colors={g}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconRingPrism}
          >
            <View style={[styles.iconCircleInner, { backgroundColor: theme.bg2 }]}>
              <ModuleIcon id={module.id} emoji={module.icon} size={rs(90)} />
            </View>
          </LinearGradient>
        ) : (
          <View
            style={[
              styles.iconCircle,
              {
                backgroundColor: `${accent}2E`,
                borderColor: `${accent}66`,
              },
            ]}
          >
            <ModuleIcon id={module.id} emoji={module.icon} size={rs(90)} />
          </View>
        )}

        {/* Title — per-module accent; prism stays white ink + violet glow */}
        <Text
          style={[
            styles.title,
            prism
              ? {
                  color: theme.text,
                  textShadowColor: `${g[1]}B3`,
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 16,
                }
              : { color: accent },
          ]}
        >
          {t(`modules.${module.id}.title`)}
        </Text>

        {/* Framework tag — per-module accent; prism gets a gradient border */}
        {prism ? (
          <LinearGradient
            colors={g}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.tagRingPrism}
          >
            <View style={[styles.tagInnerPrism, { backgroundColor: theme.bg2 }]}>
              <View style={[styles.tagDot, { backgroundColor: theme.text }]} />
              <Text style={[styles.tagText, { color: theme.text }]}>
                {t(`quiz.frameworks.${module.framework}`)}
              </Text>
            </View>
          </LinearGradient>
        ) : (
          <View
            style={[
              styles.tag,
              { backgroundColor: `${accent}1F`, borderColor: `${accent}59` },
            ]}
          >
            <View style={[styles.tagDot, { backgroundColor: accent }]} />
            <Text style={[styles.tagText, { color: accent }]}>
              {t(`quiz.frameworks.${module.framework}`)}
            </Text>
          </View>
        )}

        {/* Description */}
        <Text style={[styles.description, { color: theme.textMuted }]}>
          {t(`modules.${module.id}.description`)}
        </Text>

        {/* Info card: questions / minutes / cost */}
        <GlassCard style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={[styles.infoValue, { color: theme.text }]} numberOfLines={1}>
                20
              </Text>
              <Text style={[styles.infoLabel, { color: theme.textMuted }]}>
                {t('moduleDetail.questions')}
              </Text>
            </View>

            <View style={[styles.infoDivider, { backgroundColor: theme.surfaceBorder }]} />

            <View style={styles.infoItem}>
              <Text style={[styles.infoValue, { color: theme.text }]} numberOfLines={1}>
                ~5
              </Text>
              <Text style={[styles.infoLabel, { color: theme.textMuted }]}>
                {t('moduleDetail.minutes')}
              </Text>
            </View>

            <View style={[styles.infoDivider, { backgroundColor: theme.surfaceBorder }]} />

            <View style={styles.infoItem}>
              <View style={styles.infoValueRow}>
                <Text style={[styles.infoValue, { color: theme.text }]} numberOfLines={1}>
                  {costLabel}
                </Text>
                <MaterialCommunityIcons name="star-four-points" size={rs(11)} color={theme.text} />
              </View>
              <Text style={[styles.infoLabel, { color: theme.textMuted }]}>
                {t('moduleDetail.toRead')}
              </Text>
            </View>
          </View>
        </GlassCard>
      </View>

      {/* Begin button pinned to the bottom */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + rs(16) }]}>
        <GradientButton
          label={t('moduleDetail.beginReading')}
          onPress={handleBeginReading}
          labelColor={theme.background}
          bold
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { alignItems: 'center', justifyContent: 'center' },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rs(20),
    paddingBottom: rs(8),
  },
  backBtn: {
    width: rs(44),
    height: rs(44),
    borderRadius: rs(22),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Content */
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: rs(28),
    paddingTop: rs(28),
  },
  iconCircle: {
    width: rs(116),
    height: rs(116),
    borderRadius: rs(58),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: rs(24),
  },
  iconRingPrism: {
    width: rs(116),
    height: rs(116),
    borderRadius: rs(58),
    padding: rs(1.5),
    marginBottom: rs(24),
  },
  iconCircleInner: {
    flex: 1,
    borderRadius: rs(57),
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: rs(29),
    lineHeight: rs(36),
    textAlign: 'center',
    fontFamily: 'PlayfairDisplay_400Regular',
    letterSpacing: -0.3,
  },

  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(8),
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: rs(14),
    paddingVertical: rs(7),
    marginTop: rs(16),
  },
  tagRingPrism: {
    borderRadius: 999,
    padding: 1,
    marginTop: rs(16),
  },
  tagInnerPrism: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(8),
    borderRadius: 999,
    paddingHorizontal: rs(14),
    paddingVertical: rs(7),
  },
  tagDot: { width: rs(6), height: rs(6), borderRadius: rs(3) },
  tagText: {
    fontSize: rs(10.5),
    fontFamily: 'HankenGrotesk_700Bold',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  description: {
    fontSize: rs(13.5),
    lineHeight: rs(21),
    textAlign: 'center',
    fontFamily: 'HankenGrotesk_400Regular',
    marginTop: rs(24),
  },

  /* Info card */
  infoCard: { width: '100%', padding: rs(16), marginTop: rs(26) },
  infoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
  infoItem: { flex: 1, alignItems: 'center', gap: rs(4) },
  infoValueRow: { flexDirection: 'row', alignItems: 'center', gap: rs(3) },
  infoValue: {
    fontSize: rs(18),
    fontFamily: 'PlayfairDisplay_700Bold',
    fontVariant: ['lining-nums'],
  },
  infoLabel: { fontSize: rs(11.5), fontFamily: 'HankenGrotesk_400Regular' },
  infoDivider: { width: 1, height: rs(32) },

  /* Footer */
  footer: {
    paddingHorizontal: rs(28),
    paddingTop: rs(8),
  },
});
