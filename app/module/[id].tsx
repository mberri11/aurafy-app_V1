import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/src/themes/ThemeProvider';
import { MODULES } from '@/src/data/modules';
import GradientButton from '@/src/components/GradientButton';
import GlassCard from '@/src/components/GlassCard';

export default function ModuleDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const module = useMemo(() => MODULES.find((m) => m.id === id), [id]);

  if (!module) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text }}>Module not found</Text>
      </View>
    );
  }

  const cheapestCost = Math.min(...Object.values(module.starsCost));

  const handleBeginReading = () => {
    if (module.type === 'solo') {
      // Skip reading mode for solo modules — go directly to person entry
      router.push({ pathname: '/person-entry', params: { moduleId: module.id, mode: 'solo' } });
    } else {
      router.push({ pathname: '/reading-mode', params: { moduleId: module.id } });
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 40 }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Module icon */}
      <View style={[styles.iconCircle, { backgroundColor: `${module.color}20` }]}>
        <Text style={styles.icon}>{module.icon}</Text>
      </View>

      {/* Title */}
      <Text style={[styles.title, { color: theme.text, fontFamily: 'Fraunces_400Regular' }]}>
        {t(`modules.${module.id}.title`)}
      </Text>

      {/* Description */}
      <Text style={[styles.description, { color: theme.textMuted }]}>
        {t(`modules.${module.id}.description`)}
      </Text>

      {/* Framework tags */}
      <View style={styles.tagsRow}>
        <View style={[styles.tag, { borderColor: theme.surfaceBorder }]}>
          <Text style={[styles.tagText, { color: theme.textMuted }]}>
            {t(`quiz.frameworks.${module.framework}`)}
          </Text>
        </View>
      </View>

      {/* Info row */}
      <GlassCard style={styles.infoCard}>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={[styles.infoValue, { color: theme.text }]}>20</Text>
            <Text style={[styles.infoLabel, { color: theme.textMuted }]}>questions</Text>
          </View>
          <View style={[styles.infoDivider, { backgroundColor: theme.surfaceBorder }]} />
          <View style={styles.infoItem}>
            <Text style={[styles.infoValue, { color: theme.text }]}>~5 min</Text>
            <Text style={[styles.infoLabel, { color: theme.textMuted }]}>duration</Text>
          </View>
          <View style={[styles.infoDivider, { backgroundColor: theme.surfaceBorder }]} />
          <View style={styles.infoItem}>
            <Text style={[styles.infoValue, { color: theme.gold }]}>
              {cheapestCost} ✨
            </Text>
            <Text style={[styles.infoLabel, { color: theme.textMuted }]}>from</Text>
          </View>
        </View>
      </GlassCard>

      <GradientButton
        label={`Begin Reading`}
        onPress={handleBeginReading}
        style={styles.button}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 28, alignItems: 'center', gap: 20 },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  icon: { fontSize: 40 },
  title: { fontSize: 32, textAlign: 'center', lineHeight: 40 },
  description: { fontSize: 15, lineHeight: 24, textAlign: 'center', fontFamily: 'Inter_400Regular' },
  tagsRow: { flexDirection: 'row', gap: 10, flexWrap: 'wrap', justifyContent: 'center' },
  tag: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 6 },
  tagText: { fontSize: 13, fontFamily: 'Inter_400Regular' },
  infoCard: { width: '100%', padding: 20 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  infoItem: { alignItems: 'center', gap: 4, flex: 1 },
  infoValue: { fontSize: 18, fontWeight: '700', fontFamily: 'Inter_700Bold' },
  infoLabel: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  infoDivider: { width: 1, height: 36 },
  button: { width: '100%' },
});
