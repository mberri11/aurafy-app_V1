import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/src/themes/ThemeProvider';
import { useSettingsStore } from '@/src/store/settingsStore';
import { useUserStore } from '@/src/store/userStore';
import { ThemeId } from '@/src/types';
import { cosmicTheme } from '@/src/themes/cosmic';
import { desertOracleTheme } from '@/src/themes/desertOracle';
import StarsBadge from '@/src/components/StarsBadge';
import ThemeUnlockDialog from '@/src/components/ThemeUnlockDialog';
import { rs, screenWidth } from '@/src/utils/responsive';

const GUTTER = rs(20);
const GAP = rs(14);
const CARD_W = (screenWidth - GUTTER * 2 - GAP) / 2;

interface ThemeEntry {
  id: ThemeId;
  gradient: [string, string, string];
  cost: number;
}

const THEMES: ThemeEntry[] = [
  { id: 'cosmic', gradient: cosmicTheme.gradient, cost: 0 },
  { id: 'desertOracle', gradient: desertOracleTheme.gradient, cost: 50 },
];

// Placeholder themes — locked, "Soon". Subtle 2-stops sampled around the design's
// muted swatch centres (14-settings_themes.png); Ember is warm plum, NOT navy.
const SOON: { key: string; gradient: [string, string] }[] = [
  { key: 'midnightVeil', gradient: ['#151A30', '#232C49'] },
  { key: 'deepOcean', gradient: ['#0C1E31', '#114254'] },
  { key: 'roseQuartz', gradient: ['#201631', '#352440'] },
  { key: 'ember', gradient: ['#1E151B', '#3A2A2B'] },
];

type UnlockTarget = {
  id: ThemeId;
  gradient: [string, string, string];
  cost: number;
};

export default function ThemeGalleryScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { themeId, unlockedThemes, setTheme, unlockTheme } = useSettingsStore();
  const { stars, spendStars } = useUserStore();
  const [unlock, setUnlock] = useState<UnlockTarget | null>(null);

  const handleSelect = useCallback(
    (id: ThemeId, gradient: [string, string, string], cost: number) => {
      if (unlockedThemes.includes(id)) {
        setTheme(id);
        return;
      }
      setUnlock({ id, gradient, cost });
    },
    [unlockedThemes, setTheme],
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Cosmic depth base + violet bloom (stack-screen chrome) */}
      <LinearGradient colors={['#181430', '#0E0B22', '#08061A']} locations={[0, 0.5, 1]} style={StyleSheet.absoluteFill} />
      <Svg style={StyleSheet.absoluteFill} width="100%" height="100%" pointerEvents="none">
        <Defs>
          <RadialGradient id="themes_glow" cx="50%" cy="16%" r="60%">
            <Stop offset="0%" stopColor={theme.primary} stopOpacity={0.22} />
            <Stop offset="55%" stopColor="#A855F7" stopOpacity={0.07} />
            <Stop offset="100%" stopColor={theme.background} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#themes_glow)" />
      </Svg>

      {/* Header: back (left) + stars badge (right) */}
      <View style={[styles.header, { paddingTop: insets.top + rs(12) }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          accessibilityLabel={t('common.back')}
          accessibilityRole="button"
          activeOpacity={0.8}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={[styles.backBtn, { backgroundColor: theme.surface, borderColor: theme.surfaceBorder }]}
        >
          <Feather name="chevron-left" size={rs(20)} color={theme.text} />
        </TouchableOpacity>
        <StarsBadge balance={stars} onPress={() => router.push('/(tabs)/stars')} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + rs(40) }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.title, { color: theme.text }]}>{t('themeGallery.title')}</Text>

        <View style={styles.grid}>
          {THEMES.map(({ id, gradient, cost }) => {
            const isActive = themeId === id;
            const isUnlocked = unlockedThemes.includes(id);
            return (
              <TouchableOpacity
                key={id}
                style={styles.cell}
                onPress={() => handleSelect(id, gradient, cost)}
                activeOpacity={0.85}
                accessibilityLabel={t(`themeGallery.${id}`)}
              >
                <LinearGradient
                  colors={gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[
                    styles.tile,
                    isActive && { borderColor: theme.gradient[0], borderWidth: 1.5 },
                  ]}
                >
                  {!isUnlocked && cost > 0 && (
                    <View style={styles.costPill}>
                      <Text style={styles.costText}>{cost}</Text>
                      <MaterialCommunityIcons name="star-four-points" size={rs(11)} color="#FFFFFF" />
                    </View>
                  )}
                </LinearGradient>
                <View style={styles.labelRow}>
                  <Text style={[styles.name, { color: theme.text }]} numberOfLines={1}>
                    {t(`themeGallery.${id}`)}
                  </Text>
                  {isActive && (
                    <Text style={[styles.active, { color: theme.gradient[0] }]}>
                      {t('themeGallery.active').toUpperCase()}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}

          {SOON.map(({ key, gradient }) => (
            // Whole locked cell faded (tile + name + Soon) so it recedes like the
            // design — not just the icon/title.
            <View key={key} style={[styles.cell, styles.cellLocked]}>
              {/* Locked tile: muted gradient + a frosted BlurView so it reads softer
                  than the crisp available themes. */}
              <View style={[styles.tile, styles.tileLocked, styles.tileFrostWrap, { borderColor: theme.surfaceBorder }]}>
                <LinearGradient
                  colors={gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={StyleSheet.absoluteFill}
                />
                <BlurView
                  intensity={18}
                  tint="dark"
                  experimentalBlurMethod="dimezisBlurView"
                  style={StyleSheet.absoluteFill}
                  pointerEvents="none"
                />
                <Feather name="lock" size={rs(22)} color={theme.textMuted} />
              </View>
              <View style={styles.labelRow}>
                <Text style={[styles.name, { color: theme.textMuted }]} numberOfLines={1}>
                  {t(`themeGallery.${key}`)}
                </Text>
                <Text style={[styles.soon, { color: theme.textDim }]}>{t('themeGallery.soon')}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <ThemeUnlockDialog
        visible={unlock !== null}
        themeName={unlock ? t(`themeGallery.${unlock.id}`) : ''}
        gradient={unlock?.gradient ?? theme.gradient}
        cost={unlock?.cost ?? 0}
        balance={stars}
        onConfirm={() => {
          if (unlock && spendStars(unlock.cost)) {
            unlockTheme(unlock.id);
            setTheme(unlock.id);
          }
          setUnlock(null);
        }}
        onNeedMore={() => {
          setUnlock(null);
          router.push('/(tabs)/stars');
        }}
        onClose={() => setUnlock(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: GUTTER,
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
  content: { paddingHorizontal: GUTTER, paddingTop: rs(8) },
  title: { fontSize: rs(32), fontFamily: 'PlayfairDisplay_400Regular', marginBottom: rs(20) },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: GAP },
  cell: { width: CARD_W },
  cellLocked: { opacity: 0.6 },
  tile: {
    width: '100%',
    aspectRatio: 1.62,
    borderRadius: rs(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileLocked: { borderWidth: 1 },
  tileFrostWrap: { overflow: 'hidden' },
  costPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(4),
    backgroundColor: 'rgba(20,12,30,0.6)',
    borderRadius: 999,
    paddingHorizontal: rs(12),
    paddingVertical: rs(6),
  },
  costText: { color: '#FFFFFF', fontSize: rs(13), fontFamily: 'Inter_700Bold' },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: rs(8),
    gap: rs(6),
  },
  name: { fontSize: rs(15), fontFamily: 'Inter_600SemiBold', flexShrink: 1 },
  active: { fontSize: rs(11), fontFamily: 'Inter_700Bold', letterSpacing: 0.5 },
  soon: { fontSize: rs(12), fontFamily: 'Inter_400Regular' },
});
