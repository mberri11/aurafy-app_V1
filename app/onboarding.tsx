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
/*                        Slide 1 hero — three avatars                        */
/* -------------------------------------------------------------------------- */

function HeroAvatars() {
  const theme = useTheme();
  const [g0, g1, g2] = theme.gradient;

  // Three slightly-offset circles, each tinted with a different gradient stop —
  // matches the design's purple/indigo/teal trio at the top of slide 1.
  const variants: { color: string; offsetY: number }[] = [
    { color: g0, offsetY: 8 },
    { color: g1, offsetY: 0 },
    { color: g2, offsetY: 8 },
  ];

  return (
    <View style={heroStyles.row}>
      {variants.map((v, i) => (
        <View key={i} style={[heroStyles.avatar, { transform: [{ translateY: v.offsetY }] }]}>
          <LinearGradient
            colors={[v.color, theme.bg2]}
            start={{ x: 0.3, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        </View>
      ))}
    </View>
  );
}

const heroStyles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 14, marginBottom: 12 },
  avatar: {
    width: 64,
    height: 80,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
  },
});

/* -------------------------------------------------------------------------- */
/*                         Slide 2 hero — big gold star                       */
/* -------------------------------------------------------------------------- */

function HeroStar() {
  const theme = useTheme();
  return (
    <View style={starStyles.wrap}>
      {/* Soft halo */}
      <LinearGradient
        colors={[`${theme.gold}55`, `${theme.gold}00`]}
        style={starStyles.halo}
      />
      <MaterialCommunityIcons name="star" size={92} color={theme.gold} />
    </View>
  );
}

const starStyles = StyleSheet.create({
  wrap: { width: 160, height: 160, alignItems: 'center', justifyContent: 'center' },
  halo: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
  },
});

/* -------------------------------------------------------------------------- */
/*                       Slide 2 — three "earn" mini-cards                    */
/* -------------------------------------------------------------------------- */

type EarnTile = {
  iconNode: React.ReactNode;
  tint: string;
  label: string;
  amount: string;
};

function EarnCardsRow() {
  const theme = useTheme();
  const tiles: EarnTile[] = [
    {
      iconNode: <MaterialCommunityIcons name="hand-coin-outline" size={22} color={theme.gold} />,
      tint: theme.gold,
      label: 'Use ✨',
      amount: 'Spend to read',
    },
    {
      iconNode: <Feather name="calendar" size={22} color={theme.primary} />,
      tint: theme.primary,
      label: 'Daily',
      amount: '+2 daily',
    },
    {
      iconNode: <Feather name="play" size={22} color={theme.gradient[2]} />,
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
          <View
            style={[
              cardsStyles.iconTile,
              { backgroundColor: `${tile.tint}1F`, borderColor: `${tile.tint}33` },
            ]}
          >
            {tile.iconNode}
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
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    gap: 8,
  },
  iconTile: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
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

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* subtle vertical wash */}
      <LinearGradient
        colors={[theme.background, theme.bg2, theme.background]}
        locations={[0, 0.45, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Skip top-right (both slides) */}
      <View style={[styles.topBar, { paddingTop: insets.top + 8 }]}>
        <Pressable
          onPress={handleSkip}
          accessibilityLabel="Skip onboarding"
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          style={({ pressed }) => [styles.skipBtn, pressed && { opacity: 0.6 }]}
        >
          <Text style={[styles.skipText, { color: theme.textMuted }]}>Skip</Text>
        </Pressable>
      </View>

      {activeSlide === 0 ? (
        /* ----------------------------- SLIDE 1 ----------------------------- */
        <View style={styles.slide}>
          <View style={styles.slideHeader}>
            <HeroAvatars />
            <Text
              style={[
                styles.h1,
                { color: theme.text, fontFamily: 'Fraunces_400Regular' },
              ]}
            >
              {t('onboarding.slide1Title')}
            </Text>
            <Text style={[styles.body, { color: theme.textMuted }]}>
              {t('onboarding.slide1Subtitle')}
            </Text>
          </View>

          <View style={styles.langGrid}>
            {LANGUAGES.map((l) => {
              const active = language === l.code;
              return (
                <Pressable
                  key={l.code}
                  onPress={() => handleLanguageChange(l.code)}
                  accessibilityLabel={`Select ${l.label}`}
                  style={({ pressed }) => [
                    styles.langPill,
                    {
                      backgroundColor: active ? theme.surface : 'transparent',
                      borderColor: active ? theme.borderStrong : theme.surfaceBorder,
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
        </View>
      ) : (
        /* ----------------------------- SLIDE 2 ----------------------------- */
        <View style={styles.slide}>
          <View style={styles.slideHeader}>
            <HeroStar />
            <Text
              style={[
                styles.h1,
                { color: theme.text, fontFamily: 'Fraunces_400Regular', textAlign: 'center' },
              ]}
            >
              {t('onboarding.slide2Title')} ✨
            </Text>
            <Text
              style={[
                styles.body,
                { color: theme.textMuted, textAlign: 'center', maxWidth: 320 },
              ]}
            >
              {t('onboarding.slide2Subtitle')}
            </Text>
          </View>

          <EarnCardsRow />
        </View>
      )}

      {/* Footer: dot pagination + primary CTA */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
        <View style={styles.dotsRow}>
          {[0, 1].map((i) => (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  backgroundColor: activeSlide === i ? theme.primary : theme.surfaceBorder,
                  width: activeSlide === i ? 22 : 8,
                },
              ]}
            />
          ))}
        </View>
        <GradientButton
          label={activeSlide === 0 ? t('common.continue') : t('onboarding.beginButton')}
          onPress={() => (activeSlide === 0 ? setActiveSlide(1) : handleBegin())}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 4,
  },
  skipBtn: { paddingHorizontal: 8, paddingVertical: 6 },
  skipText: { fontSize: 15, fontFamily: 'Inter_500Medium' },

  slide: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  slideHeader: { gap: 16, alignItems: 'center', marginTop: 24 },

  h1: {
    fontSize: 30,
    lineHeight: 38,
    letterSpacing: -0.3,
    textAlign: 'center',
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },

  langGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    marginBottom: 12,
  },
  langPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 999,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    minHeight: 44,
  },
  langFlag: { fontSize: 18 },
  langLabel: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },

  footer: {
    paddingHorizontal: 28,
    gap: 16,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  dot: { height: 8, borderRadius: 4 },
});
