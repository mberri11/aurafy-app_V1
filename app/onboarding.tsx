import React, { useCallback, useState } from 'react';
import {
  I18nManager,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import i18n from '../src/i18n';
import { useUserStore } from '@/src/store/userStore';
import { useSettingsStore } from '@/src/store/settingsStore';
import { useTheme } from '@/src/themes/ThemeProvider';
import GradientButton from '@/src/components/GradientButton';
import { Language } from '@/src/types';

type LanguagePill = { code: Language; label: string; flag: string };
const LANGUAGES: LanguagePill[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'ar', label: 'العربية', flag: '🇲🇦' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
];

/* -------------------------------------------------------------------------- */
/*               Slide 1 hero — three person silhouettes                      */
/* -------------------------------------------------------------------------- */

type Silhouette = {
  colors: [string, string];
  headSize: number;
  bodyWidth: number;
  bodyHeight: number;
};

const SILHOUETTES: Silhouette[] = [
  { colors: ['#F472B6', '#E05FA0'], headSize: 40, bodyWidth: 64, bodyHeight: 48 },
  { colors: ['#A78BFA', '#7C5FCF'], headSize: 52, bodyWidth: 80, bodyHeight: 60 },
  { colors: ['#34D399', '#2FEAAC'], headSize: 40, bodyWidth: 64, bodyHeight: 48 },
];

function HeroAvatars() {
  return (
    <View style={heroStyles.row}>
      {SILHOUETTES.map((s, i) => (
        <View key={i} style={heroStyles.figure}>
          <View
            style={{
              width: s.headSize,
              height: s.headSize,
              borderRadius: s.headSize / 2,
              overflow: 'hidden',
              marginBottom: 4,
            }}
          >
            <LinearGradient
              colors={s.colors}
              start={{ x: 0.2, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
          </View>
          <View
            style={{
              width: s.bodyWidth,
              height: s.bodyHeight,
              borderTopLeftRadius: s.bodyWidth / 2,
              borderTopRightRadius: s.bodyWidth / 2,
              overflow: 'hidden',
            }}
          >
            <LinearGradient
              colors={s.colors}
              start={{ x: 0.2, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
          </View>
        </View>
      ))}
    </View>
  );
}

const heroStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 14,
  },
  figure: { alignItems: 'center' },
});

/* -------------------------------------------------------------------------- */
/*           Slide 2 hero — gold star inside solid dark filled circle         */
/*           No halo / no border — flat filled disc only.                     */
/* -------------------------------------------------------------------------- */

function HeroStar() {
  const theme = useTheme();
  return (
    <View style={starStyles.wrap}>
      <View style={[starStyles.plate, { backgroundColor: theme.bg2 }]} />
      <MaterialCommunityIcons name="star" size={64} color={theme.gold} />
    </View>
  );
}

const starStyles = StyleSheet.create({
  wrap: { width: 140, height: 140, alignItems: 'center', justifyContent: 'center' },
  plate: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
  },
});

/* -------------------------------------------------------------------------- */
/*                     Slide 2 — three "earn" mini-cards                      */
/* -------------------------------------------------------------------------- */

type EarnTile = {
  renderIcon: (color: string) => React.ReactNode;
  tint: string;
  label: string;
  amount: string;
};

function EarnCardsRow() {
  const theme = useTheme();
  const iconOnTint = '#0B0E25';

  const tiles: EarnTile[] = [
    {
      renderIcon: (c) => (
        <MaterialCommunityIcons name="hand-coin-outline" size={20} color={c} />
      ),
      tint: theme.gold,
      label: 'Use ✦',
      amount: 'Spend to read',
    },
    {
      renderIcon: (c) => <Feather name="calendar" size={20} color={c} />,
      tint: theme.primary,
      label: 'Daily',
      amount: '+2 daily',
    },
    {
      renderIcon: (c) => <Feather name="play" size={20} color={c} />,
      tint: theme.gradient[2],
      label: 'Watch',
      amount: '+1 per ad',
    },
  ];

  return (
    <View style={cardsStyles.row}>
      {tiles.map((tile, i) => (
        <View
          key={i}
          style={[
            cardsStyles.card,
            { borderColor: theme.surfaceBorder, backgroundColor: theme.surface },
          ]}
        >
          <View style={[cardsStyles.iconCircle, { backgroundColor: tile.tint }]}>
            {tile.renderIcon(iconOnTint)}
          </View>
          <Text style={[cardsStyles.label, { color: tile.tint }]}>{tile.label}</Text>
          <Text style={[cardsStyles.amount, { color: theme.textMuted }]}>{tile.amount}</Text>
        </View>
      ))}
    </View>
  );
}

const cardsStyles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 10, width: '100%' },
  card: {
    flex: 1,
    borderRadius: 18,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
    gap: 6,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
  },
  amount: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },
});

/* -------------------------------------------------------------------------- */
/*                                Onboarding                                  */
/* -------------------------------------------------------------------------- */

export default function OnboardingScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const setOnboarded = useUserStore((s) => s.setOnboarded);
  const { language, setLanguage } = useSettingsStore();
  const [activeSlide, setActiveSlide] = useState<0 | 1>(0);

  const handleLanguageChange = useCallback(
    (lang: Language) => {
      setLanguage(lang);
      i18n.changeLanguage(lang);
      I18nManager.forceRTL(lang === 'ar');
    },
    [setLanguage],
  );

  const handleSkip = useCallback(() => {
    setOnboarded();
    router.replace('/(tabs)');
  }, [setOnboarded]);

  const handleBegin = useCallback(() => {
    setOnboarded();
    router.replace('/(tabs)');
  }, [setOnboarded]);

  const titleKey = activeSlide === 0 ? 'onboarding.slide1Title' : 'onboarding.slide2Title';
  const bodyKey = activeSlide === 0 ? 'onboarding.slide1Subtitle' : 'onboarding.slide2Subtitle';
  const titleText = activeSlide === 0 ? t(titleKey) : `${t(titleKey)} ✨`;

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      {/* Diagonal aurora — matches splash */}
      <LinearGradient
        colors={[theme.bg2, theme.background, theme.background]}
        locations={[0, 0.55, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={['rgba(139,92,246,0.08)', 'transparent', 'rgba(47,234,172,0.05)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />

      {/* Skip — absolute top-right so it doesn't take vertical space in the flex column */}
      <View style={[styles.skipBar, { top: insets.top + 8 }]}>
        <Pressable
          onPress={handleSkip}
          accessibilityLabel="Skip onboarding"
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          style={({ pressed }) => [styles.skipBtn, pressed && { opacity: 0.6 }]}
        >
          <Text style={[styles.skipText, { color: theme.textMuted }]}>Skip</Text>
        </Pressable>
      </View>

      {/* Single flex column — everything sized to fit on a 6.5" screen */}
      <View
        style={[
          styles.column,
          { paddingTop: insets.top + 56, paddingBottom: insets.bottom + 16 },
        ]}
      >
        {/* Hero — fixed height */}
        <View style={styles.heroSlot}>
          {activeSlide === 0 ? <HeroAvatars /> : <HeroStar />}
        </View>

        {/* Title + subtitle — bound to ≤2 lines + body */}
        <View style={styles.textBlock}>
          <Text
            numberOfLines={2}
            style={[
              styles.h1,
              { color: theme.text, fontFamily: 'Fraunces_700Bold' },
            ]}
          >
            {titleText}
          </Text>
          <Text style={[styles.body, { color: theme.textMuted }]}>
            {t(bodyKey)}
          </Text>
        </View>

        {/* Flexible gap between text and bottom group */}
        <View style={styles.flexSpacer} />

        {/* Slide-specific extras: language pills (slide 1) OR earn cards (slide 2) */}
        {activeSlide === 0 ? (
          <View style={styles.langGrid}>
            {LANGUAGES.map((l) => {
              const active = language === l.code;
              return (
                <Pressable
                  key={l.code}
                  onPress={() => handleLanguageChange(l.code)}
                  accessibilityLabel={`Select ${l.label}`}
                  style={({ pressed }) => [
                    styles.langTile,
                    {
                      backgroundColor: active ? theme.surface : 'rgba(255,255,255,0.02)',
                      borderColor: active ? theme.text : theme.surfaceBorder,
                      borderWidth: active ? 1.5 : 1,
                    },
                    pressed && { opacity: 0.85 },
                  ]}
                >
                  <Text style={styles.langFlag}>{l.flag}</Text>
                  <Text
                    style={[
                      styles.langLabel,
                      { color: active ? theme.text : theme.textMuted },
                    ]}
                  >
                    {l.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ) : (
          <EarnCardsRow />
        )}

        {/* Dots */}
        <View style={styles.dotsRow}>
          {[0, 1].map((i) => {
            const active = activeSlide === i;
            return active ? (
              <LinearGradient
                key={i}
                colors={theme.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.dot, styles.dotActive]}
              />
            ) : (
              <View
                key={i}
                style={[
                  styles.dot,
                  styles.dotInactive,
                  { backgroundColor: theme.surfaceBorder },
                ]}
              />
            );
          })}
        </View>

        {/* Primary CTA */}
        <GradientButton
          label={activeSlide === 0 ? t('common.continue') : t('onboarding.beginButton')}
          onPress={() => (activeSlide === 0 ? setActiveSlide(1) : handleBegin())}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },

  skipBar: {
    position: 'absolute',
    right: 24,
    zIndex: 10,
  },
  skipBtn: { paddingHorizontal: 8, paddingVertical: 6 },
  skipText: { fontSize: 15, fontFamily: 'Inter_500Medium' },

  column: {
    flex: 1,
    paddingHorizontal: 28,
  },

  heroSlot: {
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },

  textBlock: {
    gap: 8,
    marginTop: 24,
  },

  h1: {
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: -0.4,
    textAlign: 'left',
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Inter_400Regular',
    textAlign: 'left',
  },

  flexSpacer: { flex: 1, minHeight: 16 },

  langGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  langTile: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 4,
    minHeight: 60,
  },
  langFlag: { fontSize: 20 },
  langLabel: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },

  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
    marginBottom: 16,
  },
  dot: { height: 8, borderRadius: 4 },
  dotActive: { width: 22, borderRadius: 999 },
  dotInactive: { width: 8, borderRadius: 4 },
});
