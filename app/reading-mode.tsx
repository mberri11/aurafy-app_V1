import React, { useState, useMemo, useCallback } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/src/themes/ThemeProvider';
import { useUserStore } from '@/src/store/userStore';
import { MODULES } from '@/src/data/modules';
import { ReadingMode } from '@/src/types';
import GlassCard from '@/src/components/GlassCard';
import GradientButton from '@/src/components/GradientButton';

const MODES: { mode: ReadingMode; icon: string }[] = [
  { mode: 'solo', icon: '👤' },
  { mode: 'compare', icon: '👥' },
  { mode: 'triangle', icon: '△' },
  { mode: 'circle', icon: '◯' },
];

export default function ReadingModeScreen() {
  const { moduleId } = useLocalSearchParams<{ moduleId: string }>();
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const stars = useUserStore((s) => s.stars);
  const [selectedMode, setSelectedMode] = useState<ReadingMode | null>(null);

  const module = useMemo(() => MODULES.find((m) => m.id === moduleId), [moduleId]);

  const handleContinue = useCallback(() => {
    if (!selectedMode || !moduleId) return;
    router.push({ pathname: '/person-entry', params: { moduleId, mode: selectedMode } });
  }, [selectedMode, moduleId]);

  if (!module) return null;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 40 },
      ]}
    >
      <Text style={[styles.title, { color: theme.text, fontFamily: 'Fraunces_400Regular' }]}>
        Choose your reading
      </Text>
      <Text style={[styles.subtitle, { color: theme.textMuted }]}>
        Select how many people you want to read
      </Text>

      {MODES.map(({ mode, icon }) => {
        const cost = module.starsCost[mode];
        const canAfford = stars >= cost;
        const isSelected = selectedMode === mode;

        return (
          <TouchableOpacity
            key={mode}
            onPress={() => canAfford && setSelectedMode(mode)}
            disabled={!canAfford}
            accessibilityLabel={`${t(`readingModes.${mode}.title`)} mode, costs ${cost} stars`}
            activeOpacity={0.8}
          >
            <GlassCard
              style={[
                styles.modeCard,
                isSelected && { borderColor: theme.primary, borderWidth: 2 },
                !canAfford && { opacity: 0.5 },
              ]}
            >
              <View style={styles.modeRow}>
                <Text style={styles.modeIcon}>{icon}</Text>
                <View style={styles.modeInfo}>
                  <Text style={[styles.modeTitle, { color: theme.text }]}>
                    {t(`readingModes.${mode}.title`)}
                  </Text>
                  <Text style={[styles.modeSubtitle, { color: theme.textMuted }]}>
                    {t(`readingModes.${mode}.subtitle`)} · {t(`readingModes.${mode}.persons`)}
                  </Text>
                </View>
                <View style={[styles.costBadge, { backgroundColor: canAfford ? `${theme.primary}20` : `${theme.rose}20` }]}>
                  <Text style={[styles.costText, { color: canAfford ? theme.primary : theme.rose }]}>
                    {cost} ✨
                  </Text>
                </View>
              </View>

              {!canAfford && (
                <TouchableOpacity
                  onPress={() => router.push('/(tabs)/stars')}
                  accessibilityLabel="Earn more stars"
                >
                  <Text style={[styles.earnLink, { color: theme.primary }]}>Earn ✨ →</Text>
                </TouchableOpacity>
              )}
            </GlassCard>
          </TouchableOpacity>
        );
      })}

      <GradientButton
        label={t('common.continue')}
        onPress={handleContinue}
        disabled={!selectedMode}
        style={styles.button}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 20, gap: 14 },
  title: { fontSize: 28, marginBottom: 4 },
  subtitle: { fontSize: 15, fontFamily: 'Inter_400Regular', marginBottom: 8 },
  modeCard: { padding: 18 },
  modeRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  modeIcon: { fontSize: 28, width: 40, textAlign: 'center' },
  modeInfo: { flex: 1 },
  modeTitle: { fontSize: 17, fontWeight: '600', fontFamily: 'Inter_600SemiBold' },
  modeSubtitle: { fontSize: 13, fontFamily: 'Inter_400Regular', marginTop: 2 },
  costBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999 },
  costText: { fontSize: 14, fontWeight: '700', fontFamily: 'Inter_700Bold' },
  earnLink: { fontSize: 13, fontFamily: 'Inter_400Regular', marginTop: 8, textAlign: 'right' },
  button: { marginTop: 8 },
});
