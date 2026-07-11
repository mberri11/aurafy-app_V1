import React, { useCallback } from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
} from 'react-native';
import { AppText as Text } from '@/src/components/AppText';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useUserStore } from '@/src/store/userStore';
import { useTheme } from '@/src/themes/ThemeProvider';
import { MODULES, FREE_TRIAL_MODULE_ID } from '@/src/data/modules';
import ModuleCard from '@/src/components/ModuleCard';
import StarsBadge from '@/src/components/StarsBadge';
import AurafyLogo from '@/src/components/AurafyLogo';
import CosmicBloom from '@/src/components/CosmicBloom';
import AdBanner from '@/src/ads/AdBanner';
import FeaturedInsightCard from '@/src/screens/insights/components/FeaturedInsightCard';
import { getArticle, getArticleContent, type Language } from '@/src/content/articles';
import { getDailyInsightId, localDateKey } from '@/src/content/articles/dailyInsight';
import { rs } from '@/src/utils/responsive';

const RELATIONSHIP_MODULES = MODULES.filter((m) => m.type === 'multi');
const SELF_MODULES = MODULES.filter((m) => m.type === 'solo');

type HomeListItem =
  | { id: string; kind: 'section'; label: string }
  | { id: string; kind: 'row'; modules: typeof MODULES };

const makeRows = (modules: typeof MODULES) => {
  const rows: typeof MODULES[] = [];
  for (let i = 0; i < modules.length; i += 2) {
    rows.push(modules.slice(i, i + 2));
  }
  return rows;
};

export default function HomeScreen() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const stars = useUserStore((s) => s.stars);
  const freeTrialUsed = useUserStore((s) => s.freeTrialUsed);
  const dailyAnswers = useUserStore((s) => s.dailyAnswers);
  const weekAnchorDate = useUserStore((s) => s.weekAnchorDate);

  // "Tonight's Read" hook — today's deterministic daily insight (see 10-Insight-1).
  const lang = i18n.language as Language;
  const dailyInsightId = getDailyInsightId(weekAnchorDate);
  const dailyInsight = getArticle(dailyInsightId);
  const dailyInsightContent = getArticleContent(dailyInsightId, lang);
  // Reward pill shows until today's daily ritual (article + question) is completed.
  const insightRewardAvailable = !dailyAnswers.some((a) => a.date === localDateKey());

  const handleModulePress = useCallback((moduleId: string) => {
    router.push({ pathname: '/module/[id]', params: { id: moduleId } });
  }, []);

  const handleStarsPress = useCallback(() => {
    router.push('/(tabs)/stars');
  }, []);

  const handleInsightPress = useCallback((id: string) => {
    router.push({ pathname: '/article/[id]', params: { id } });
  }, []);

  const listData: HomeListItem[] = [
    { id: 'relationships-header', kind: 'section', label: t('home.sectionRelationships') },
    ...makeRows(RELATIONSHIP_MODULES).map((row, index) => ({
      id: `relationships-row-${index}`,
      kind: 'row' as const,
      modules: row,
    })),
    { id: 'self-header', kind: 'section', label: t('home.sectionSelf') },
    ...makeRows(SELF_MODULES).map((row, index) => ({
      id: `self-row-${index}`,
      kind: 'row' as const,
      modules: row,
    })),
  ];

  const renderItem: ListRenderItem<HomeListItem> = ({ item }) => {
    if (item.kind === 'section') {
      return <Text style={[styles.sectionLabel, { color: theme.textDim }]}>{item.label}</Text>;
    }

    return (
      <View style={styles.row}>
        {item.modules.map((module) => (
          <View key={module.id} style={styles.rowItem}>
            <ModuleCard
              module={module}
              title={t(`modules.${module.id}.title`)}
              subtitle={
                module.comingSoon
                  ? t('home.comingSoon')
                  : t(`modules.${module.id}.subtitle`)
              }
              comingSoon={module.comingSoon}
              freeTrial={module.id === FREE_TRIAL_MODULE_ID && !freeTrialUsed}
              onPress={() => handleModulePress(module.id)}
            />
          </View>
        ))}
        {item.modules.length === 1 ? <View style={styles.rowItem} /> : null}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Base indigo→navy field is painted once at the root (CosmicField) behind
          the navigator, so this container stays transparent — that lets the field
          show through during the back-from-module pop instead of a dark flash.
          Only the violet bloom is screen-local (memoized so it doesn't re-create
          on every render). */}
      <CosmicBloom cx="32%" cy="6%" r="62%" />

      {/* Header: logo + wordmark on left, stars badge on right */}
      <View style={[styles.header, { paddingTop: insets.top + rs(12) }]}>
        <View style={styles.brandRow}>
          <AurafyLogo size={rs(24)} withHalo={false} />
          <Text
            latin
            style={[
              styles.wordmark,
              { color: theme.text, fontFamily: 'PlayfairDisplay_400Regular' },
            ]}
          >
            Aurafy
          </Text>
        </View>
        <StarsBadge balance={stars} onPress={handleStarsPress} />
      </View>

      <FlatList
        data={listData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + rs(100) }]}
        ListFooterComponent={
          // Anchored adaptive banner below the self modules — self-collapses in Expo
          // Go and on load failure, so it never reserves dead space. (Phase-4 ads.)
          <AdBanner style={styles.footerBanner} />
        }
        ListHeaderComponent={
          <>
            {/* Hero question */}
            <View style={styles.hero}>
              <Text style={[styles.heroEyebrow, { color: theme.textDim }]}>
                {t('home.heroEyebrow')}
              </Text>
              <Text style={[styles.heroTitle, { color: theme.text }]}>{t('home.heroTitle')}</Text>
            </View>

            {/* Tonight's Read — the single daily-ritual entry point (10-Insight.png).
                Opens the daily article; the daily question lives at its foot. */}
            {dailyInsight && dailyInsightContent ? (
              <View style={styles.insightCard}>
                <FeaturedInsightCard
                  ritual
                  article={dailyInsight}
                  content={dailyInsightContent}
                  rewardAvailable={insightRewardAvailable}
                  onPress={() => handleInsightPress(dailyInsight.id)}
                />
              </View>
            ) : null}
          </>
        }
      />
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
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: rs(8) },
  wordmark: {
    fontSize: rs(26),
    letterSpacing: -0.3,
  },

  /* FlatList contents */
  scroll: { paddingHorizontal: rs(16) },

  /* Hero */
  hero: { paddingHorizontal: rs(4), marginTop: rs(8), marginBottom: rs(18) },
  heroEyebrow: {
    fontSize: rs(12),
    fontFamily: 'HankenGrotesk_600SemiBold',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: rs(8),
  },
  heroTitle: {
    fontSize: rs(28),
    lineHeight: rs(34),
    fontFamily: 'PlayfairDisplay_700Bold',
    letterSpacing: -0.4,
  },

  /* Tonight's Read ritual hero spacing before the first section */
  insightCard: {
    marginBottom: rs(24),
  },

  /* Section heading */
  sectionLabel: {
    fontSize: rs(12),
    fontFamily: 'HankenGrotesk_600SemiBold',
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    marginTop: rs(4),
    marginBottom: rs(12),
    paddingHorizontal: rs(4),
  },

  row: {
    flexDirection: 'row',
    gap: rs(12),
    marginBottom: rs(12),
  },
  rowItem: {
    flex: 1,
  },
  footerBanner: { marginTop: rs(12) },
});
