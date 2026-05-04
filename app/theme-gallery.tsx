import React, { useCallback } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/src/themes/ThemeProvider';
import { useSettingsStore } from '@/src/store/settingsStore';
import { useUserStore } from '@/src/store/userStore';
import { ThemeId } from '@/src/types';
import { cosmicTheme } from '@/src/themes/cosmic';
import { desertOracleTheme } from '@/src/themes/desertOracle';
import GlassCard from '@/src/components/GlassCard';
import { LinearGradient } from 'expo-linear-gradient';

const THEMES = [
  { id: 'cosmic' as ThemeId, theme: cosmicTheme, cost: 0, name: 'Cosmic' },
  { id: 'desertOracle' as ThemeId, theme: desertOracleTheme, cost: 50, name: 'Desert Oracle' },
];

const COMING_SOON = [
  { name: 'Lunar Tide', color: '#60A5FA' },
  { name: 'Ember Veil', color: '#FB923C' },
];

export default function ThemeGalleryScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { themeId, unlockedThemes, setTheme, unlockTheme } = useSettingsStore();
  const { stars, spendStars } = useUserStore();

  const handleSelectTheme = useCallback(
    (id: ThemeId, cost: number, name: string) => {
      if (unlockedThemes.includes(id)) {
        setTheme(id);
        return;
      }
      Alert.alert(`Unlock ${name}?`, `Unlock ${name} for ${cost} ✨?`, [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: 'Unlock',
          onPress: () => {
            const success = spendStars(cost);
            if (success) {
              unlockTheme(id);
              setTheme(id);
            } else {
              Alert.alert('Not enough stars', t('errors.notEnoughStars'));
            }
          },
        },
      ]);
    },
    [unlockedThemes, setTheme, unlockTheme, spendStars, t],
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 40 }]}
    >
      <Text style={[styles.title, { color: theme.text, fontFamily: 'Fraunces_400Regular' }]}>
        Themes
      </Text>

      <View style={styles.grid}>
        {THEMES.map(({ id, theme: t2, cost, name }) => {
          const isActive = themeId === id;
          const isUnlocked = unlockedThemes.includes(id);

          return (
            <TouchableOpacity
              key={id}
              onPress={() => handleSelectTheme(id, cost, name)}
              accessibilityLabel={`${name} theme${isActive ? ', active' : ''}`}
              activeOpacity={0.85}
            >
              <GlassCard
                style={[
                  styles.themeCard,
                  isActive && { borderColor: t2.primary, borderWidth: 2 },
                ]}
              >
                {/* Preview gradient */}
                <LinearGradient
                  colors={t2.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.themePreview}
                />
                <Text style={[styles.themeName, { color: theme.text }]}>{name}</Text>
                {isActive ? (
                  <View style={[styles.activeBadge, { backgroundColor: `${t2.primary}20` }]}>
                    <Text style={[styles.badgeText, { color: t2.primary }]}>Active ✦</Text>
                  </View>
                ) : isUnlocked ? (
                  <Text style={[styles.unlockedText, { color: theme.textMuted }]}>Unlocked</Text>
                ) : (
                  <View style={[styles.costBadge, { backgroundColor: `${theme.gold}20` }]}>
                    <Text style={[styles.badgeText, { color: theme.gold }]}>{cost} ✨</Text>
                  </View>
                )}
              </GlassCard>
            </TouchableOpacity>
          );
        })}

        {COMING_SOON.map((t2) => (
          <GlassCard key={t2.name} style={[styles.themeCard, { opacity: 0.4 }]}>
            <LinearGradient
              colors={[t2.color, theme.background]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.themePreview}
            />
            <Text style={[styles.themeName, { color: theme.textMuted }]}>{t2.name}</Text>
            <Text style={[styles.comingSoon, { color: theme.textMuted }]}>🔒 Coming soon</Text>
          </GlassCard>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 20, gap: 20 },
  title: { fontSize: 30, marginBottom: 4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14 },
  themeCard: { width: 155, padding: 14, gap: 10, alignItems: 'center' },
  themePreview: { width: '100%', height: 90, borderRadius: 12 },
  themeName: { fontSize: 15, fontWeight: '600', fontFamily: 'Inter_600SemiBold', textAlign: 'center' },
  activeBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  costBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  badgeText: { fontSize: 12, fontWeight: '600', fontFamily: 'Inter_600SemiBold' },
  unlockedText: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  comingSoon: { fontSize: 12, fontFamily: 'Inter_400Regular' },
});
