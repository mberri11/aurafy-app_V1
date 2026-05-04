import React, { useCallback } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUserStore } from '@/src/store/userStore';
import { useReadingStore } from '@/src/store/readingStore';
import { useTheme } from '@/src/themes/ThemeProvider';
import { MODULES } from '@/src/data/modules';
import { Reading } from '@/src/types';
import GlassCard from '@/src/components/GlassCard';
import GradientButton from '@/src/components/GradientButton';
import BannerAdSlot from '@/src/components/BannerAdSlot';

function EmptyState() {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyTitle, { color: theme.text }]}>{t('history.emptyTitle')}</Text>
      <Text style={[styles.emptyMessage, { color: theme.textMuted }]}>{t('history.emptyMessage')}</Text>
      <GradientButton
        label={t('history.ctaButton')}
        onPress={() => router.push('/(tabs)')}
        style={styles.emptyCta}
      />
    </View>
  );
}

export default function HistoryScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const history = useUserStore((s) => s.history);
  const setViewOnlyResult = useReadingStore((s) => s.setViewOnlyResult);

  const handleReadingPress = useCallback(
    (reading: Reading) => {
      setViewOnlyResult(reading.result);
      router.push({ pathname: '/result', params: { viewOnly: '1' } });
    },
    [setViewOnlyResult],
  );

  const renderItem = useCallback(
    ({ item }: { item: Reading }) => {
      const module = MODULES.find((m) => m.id === item.moduleId);
      const icon = module?.icon ?? '🔮';
      const resultPreview =
        item.result.winner?.name
          ? `${item.result.winner.name} — ${item.result.confidence}% confidence`
          : item.result.verdict
          ? `${item.result.verdict} — ${item.result.confidence}% confidence`
          : '';

      return (
        <TouchableOpacity
          onPress={() => handleReadingPress(item)}
          accessibilityLabel={`Reading from ${dayjs(item.createdAt).format('MMM D')}`}
          activeOpacity={0.85}
        >
          <GlassCard style={styles.itemCard}>
            <View style={styles.itemRow}>
              <View style={[styles.iconCircle, { backgroundColor: `${module?.color ?? theme.primary}20` }]}>
                <Text style={styles.itemIcon}>{icon}</Text>
              </View>
              <View style={styles.itemContent}>
                <Text style={[styles.itemTitle, { color: theme.text }]}>
                  {t(`modules.${item.moduleId}.title`)}
                </Text>
                {resultPreview ? (
                  <Text style={[styles.itemPreview, { color: theme.textMuted }]} numberOfLines={1}>
                    {resultPreview}
                  </Text>
                ) : null}
                <View style={styles.itemMeta}>
                  <View style={[styles.modeBadge, { backgroundColor: theme.surface }]}>
                    <Text style={[styles.modeText, { color: theme.textMuted }]}>{item.mode}</Text>
                  </View>
                  <Text style={[styles.dateText, { color: theme.textMuted }]}>
                    {dayjs(item.createdAt).format('MMM D, YYYY')}
                  </Text>
                </View>
              </View>
            </View>
          </GlassCard>
        </TouchableOpacity>
      );
    },
    [handleReadingPress, theme, t],
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.list,
          { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 100 },
        ]}
        ListHeaderComponent={
          <Text style={[styles.screenTitle, { color: theme.text, fontFamily: 'Fraunces_400Regular' }]}>
            {t('history.title')}
          </Text>
        }
        ListEmptyComponent={<EmptyState />}
        ListFooterComponent={history.length > 0 ? <BannerAdSlot /> : null}
        showsVerticalScrollIndicator={false}
        scrollEnabled={history.length > 0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { paddingHorizontal: 20, gap: 12 },
  screenTitle: { fontSize: 30, marginBottom: 16 },
  itemCard: { padding: 16 },
  itemRow: { flexDirection: 'row', gap: 14 },
  iconCircle: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  itemIcon: { fontSize: 22 },
  itemContent: { flex: 1, gap: 4 },
  itemTitle: { fontSize: 15, fontWeight: '600', fontFamily: 'Inter_600SemiBold' },
  itemPreview: { fontSize: 13, fontFamily: 'Inter_400Regular' },
  itemMeta: { flexDirection: 'row', gap: 8, alignItems: 'center', marginTop: 4 },
  modeBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  modeText: { fontSize: 11, fontFamily: 'Inter_400Regular', textTransform: 'capitalize' },
  dateText: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', paddingTop: 80, gap: 12 },
  emptyTitle: { fontSize: 20, fontWeight: '600', fontFamily: 'Inter_600SemiBold', textAlign: 'center' },
  emptyMessage: { fontSize: 15, fontFamily: 'Inter_400Regular', textAlign: 'center' },
  emptyCta: { marginTop: 8, width: 220 },
});
