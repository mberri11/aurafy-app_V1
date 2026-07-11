import React, { useState, useMemo, useCallback } from 'react';
import {
  ScrollView,
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
import { useUserStore } from '@/src/store/userStore';
import { useSettingsStore } from '@/src/store/settingsStore';
import { MODULES, FREE_TRIAL_MODULE_ID } from '@/src/data/modules';
import { ReadingMode } from '@/src/types';
import GlassCard from '@/src/components/GlassCard';
import GradientButton from '@/src/components/GradientButton';
import StarsBadge from '@/src/components/StarsBadge';
import { rs } from '@/src/utils/responsive';
import { useIsRTL } from '@/src/utils/rtl';

// Solo/Compare use filled person glyphs tinted blue; Triangle/Circle are light
// outline shapes — matches the icon tiles in 06-mode-select.png.
const ICON_BLUE = '#4F8EF7';
type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];
const MODES: { mode: ReadingMode; icon: IconName; tone: 'person' | 'shape' }[] = [
  { mode: 'solo', icon: 'account', tone: 'person' },
  { mode: 'compare', icon: 'account-multiple', tone: 'person' },
  { mode: 'triangle', icon: 'triangle-outline', tone: 'shape' },
  { mode: 'circle', icon: 'circle-outline', tone: 'shape' },
];

export default function ReadingModeScreen() {
  const { moduleId } = useLocalSearchParams<{ moduleId: string }>();
  const { t } = useTranslation();
  const theme = useTheme();
  const isRTL = useIsRTL();
  const insets = useSafeAreaInsets();
  const stars = useUserStore((s) => s.stars);
  const freeTrialUsed = useUserStore((s) => s.freeTrialUsed);
  const defaultMode = useSettingsStore((s) => s.defaultMode);

  const module = useMemo(() => MODULES.find((m) => m.id === moduleId), [moduleId]);

  // The free-trial module's first reading is free in ANY mode until consumed.
  const isFreeTrial = moduleId === FREE_TRIAL_MODULE_ID && !freeTrialUsed;

  // Pre-select the user's Default mode (Settings → Reading preferences) so every
  // relationship module opens with their preferred mode already highlighted — but
  // only when they can actually afford it (else leave the choice open). Lazy init
  // runs once on mount, so it never overrides a later manual selection.
  const [selectedMode, setSelectedMode] = useState<ReadingMode | null>(() => {
    if (!module) return null;
    const cost = module.starsCost[defaultMode];
    return isFreeTrial || stars >= cost ? defaultMode : null;
  });

  const handleContinue = useCallback(() => {
    if (!selectedMode || !moduleId) return;
    router.push({ pathname: '/person-entry', params: { moduleId, mode: selectedMode } });
  }, [selectedMode, moduleId]);

  const handleStarsPress = useCallback(() => router.push('/(tabs)/stars'), []);

  if (!module) return null;

  // Per-module accent — drives the background bloom, icon tiles and selected glow so
  // each reading-mode reads in its own colour (design 06-mode-select_1/_2.png).
  const accent = module.color;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Ambient depth base (mirrors module detail) */}
      <LinearGradient
        colors={theme.fieldGradient}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />
      {/* Per-module accent bloom behind the title. Full-screen Rect so the radial bleeds. */}
      <Svg style={StyleSheet.absoluteFill} width="100%" height="100%" pointerEvents="none">
        <Defs>
          <RadialGradient id="mode_glow" cx="50%" cy="20%" r="60%">
            <Stop offset="0%" stopColor={accent} stopOpacity={0.22} />
            <Stop offset="55%" stopColor={accent} stopOpacity={0.07} />
            <Stop offset="100%" stopColor={theme.background} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#mode_glow)" />
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
          <Feather name={isRTL ? 'chevron-right' : 'chevron-left'} size={rs(20)} color={theme.text} />
        </TouchableOpacity>
        <StarsBadge balance={stars} onPress={handleStarsPress} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.eyebrow, { color: theme.textMuted }]}>
          {t(`modules.${module.id}.title`).toUpperCase()}
        </Text>
        <Text style={[styles.title, { color: theme.text }]}>{t('readingModes.heading')}</Text>

        <View style={styles.cards}>
          {MODES.map(({ mode, icon, tone }) => {
            const cost = module.starsCost[mode];
            const canAfford = isFreeTrial || stars >= cost;
            const isSelected = selectedMode === mode;

            return (
              <TouchableOpacity
                key={mode}
                onPress={() => canAfford && setSelectedMode(mode)}
                disabled={!canAfford}
                accessibilityLabel={
                  isFreeTrial
                    ? t('readingModes.modeA11yFree', { mode: t(`readingModes.${mode}.title`) })
                    : t('readingModes.modeA11y', { mode: t(`readingModes.${mode}.title`), cost })
                }
                accessibilityRole="button"
                activeOpacity={0.85}
              >
                <GlassCard
                  glowColor={isSelected ? accent : undefined}
                  style={[
                    styles.modeCard,
                    isSelected && {
                      borderColor: accent,
                      borderWidth: 2,
                      shadowOpacity: 0.9,
                      shadowRadius: rs(20),
                      elevation: 14,
                    },
                    !canAfford && { opacity: 0.5 },
                  ]}
                >
                  <View style={styles.modeRow}>
                    <View
                      style={[
                        styles.iconTile,
                        { backgroundColor: `${accent}22`, borderColor: `${accent}40` },
                      ]}
                    >
                      <MaterialCommunityIcons
                        name={icon}
                        size={rs(22)}
                        color={tone === 'person' ? ICON_BLUE : theme.text}
                      />
                    </View>

                    <View style={styles.modeInfo}>
                      <Text style={[styles.modeTitle, { color: theme.text }]}>
                        {t(`readingModes.${mode}.title`)}
                      </Text>
                      <Text style={[styles.modeSubtitle, { color: theme.textMuted }]}>
                        {t(`readingModes.${mode}.subtitle`)} · {t(`readingModes.${mode}.persons`)}
                      </Text>
                    </View>

                    {isFreeTrial ? (
                      <View style={[styles.costBadge, { borderColor: `${accent}66` }]}>
                        <Text style={[styles.costText, { color: accent }]}>
                          {t('readingModes.free')}
                        </Text>
                      </View>
                    ) : (
                      <View style={[styles.costBadge, { borderColor: `${theme.gold}66` }]}>
                        <Text style={[styles.costText, { color: theme.gold }]}>{cost}</Text>
                        <MaterialCommunityIcons name="star-four-points" size={rs(12)} color={theme.gold} />
                      </View>
                    )}
                  </View>

                  {!canAfford && (
                    <TouchableOpacity
                      onPress={handleStarsPress}
                      accessibilityLabel={t('readingModes.earnStars')}
                      style={styles.earnRow}
                    >
                      <Text style={[styles.earnLink, { color: theme.gold }]}>
                        {t('readingModes.earnStars')}
                      </Text>
                      <MaterialCommunityIcons name="star-four-points" size={rs(11)} color={theme.gold} />
                    </TouchableOpacity>
                  )}
                </GlassCard>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Pinned CTA */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + rs(20) }]}>
        <GradientButton
          label={t('common.continue')}
          onPress={handleContinue}
          disabled={!selectedMode}
          labelColor={theme.background}
          bold
          glow
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

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

  /* Scroll body */
  scroll: { flex: 1 },
  content: { paddingHorizontal: rs(28), paddingTop: rs(12) },

  eyebrow: {
    fontSize: rs(11),
    fontFamily: 'HankenGrotesk_600SemiBold',
    letterSpacing: 1.5,
    marginBottom: rs(8),
  },
  title: {
    fontSize: rs(24),
    lineHeight: rs(30),
    fontFamily: 'PlayfairDisplay_400Regular',
    letterSpacing: -0.3,
  },

  /* Cards */
  cards: { gap: rs(11), marginTop: rs(22) },
  // Fixed minHeight so every card is the same height regardless of whether its
  // subtitle wraps to 2 lines (Compare/Circle) — content is vertically centered.
  modeCard: { padding: rs(13), minHeight: rs(82), justifyContent: 'center' },
  modeRow: { flexDirection: 'row', alignItems: 'center', gap: rs(12) },
  iconTile: {
    width: rs(40),
    height: rs(40),
    borderRadius: rs(12),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeInfo: { flex: 1 },
  modeTitle: { fontSize: rs(15), fontFamily: 'HankenGrotesk_700Bold' },
  modeSubtitle: { fontSize: rs(12), lineHeight: rs(16), fontFamily: 'HankenGrotesk_400Regular', marginTop: rs(2) },
  costBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(4),
    paddingHorizontal: rs(10),
    paddingVertical: rs(5),
    borderRadius: 999,
    borderWidth: 1,
  },
  costText: { fontSize: rs(13), fontFamily: 'HankenGrotesk_700Bold' },
  earnRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: rs(4), marginTop: rs(8) },
  earnLink: { fontSize: rs(12), fontFamily: 'HankenGrotesk_600SemiBold' },

  /* Footer */
  footer: { paddingHorizontal: rs(28), paddingTop: rs(8) },
});
