import React, { useCallback } from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import { useUserStore } from '@/src/store/userStore';
import { useTheme } from '@/src/themes/ThemeProvider';
import { MODULES, FREE_TRIAL_MODULE_ID } from '@/src/data/modules';
import ModuleCard from '@/src/components/ModuleCard';
import StarsBadge from '@/src/components/StarsBadge';
import GlassCard from '@/src/components/GlassCard';
import AurafyLogo from '@/src/components/AurafyLogo';
import CosmicBloom from '@/src/components/CosmicBloom';
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
  const streak = useUserStore((s) => s.streak);
  const freeTrialUsed = useUserStore((s) => s.freeTrialUsed);
  const lastDailyBonusDate = useUserStore((s) => s.lastDailyBonusDate);

  // "Tonight's Read" hook — today's deterministic daily insight (see 10-Insight-1).
  const lang = i18n.language as Language;
  const dailyInsightId = getDailyInsightId();
  const dailyInsight = getArticle(dailyInsightId);
  const dailyInsightContent = getArticleContent(dailyInsightId, lang);
  const insightRewardAvailable = lastDailyBonusDate !== localDateKey();

  const handleModulePress = useCallback((moduleId: string) => {
    router.push({ pathname: '/module/[id]', params: { id: moduleId } });
  }, []);

  const handleStarsPress = useCallback(() => {
    router.push('/(tabs)/stars');
  }, []);

  const handleDailyPress = useCallback(() => {
    router.push('/daily-reading');
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
        ListHeaderComponent={
          <>
            {/* Hero question */}
            <View style={styles.hero}>
              <Text style={[styles.heroEyebrow, { color: theme.textDim }]}>
                {t('home.heroEyebrow')}
              </Text>
              <Text style={[styles.heroTitle, { color: theme.text }]}>{t('home.heroTitle')}</Text>
            </View>

            {/* Daily Question banner */}
            <TouchableOpacity
              onPress={handleDailyPress}
              activeOpacity={0.85}
              accessibilityLabel="Open daily question"
              accessibilityRole="button"
            >
              <GlassCard glowColor={`${theme.gold}66`} style={styles.dailyCard}>
                {/* gold left accent bar flush to the card edge */}
                <View style={[styles.dailyAccent, { backgroundColor: theme.gold }]} />
                <View style={styles.dailyRow}>
                  <View
                    style={[
                      styles.dailyIconTile,
                      { backgroundColor: `${theme.gold}1F`, borderColor: `${theme.gold}55` },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="moon-waning-crescent"
                      size={rs(20)}
                      color={theme.gold}
                    />
                  </View>
                  <View style={styles.dailyText}>
                    <Text style={[styles.dailyTitle, { color: theme.text }]}>{t('daily.title')}</Text>
                    <Text style={[styles.dailySub, { color: theme.textMuted }]} numberOfLines={2}>
                      {t('home.dailyReady')}
                    </Text>
                  </View>
                  <View style={styles.dailyRight}>
                    {streak > 0 ? (
                      <View
                        style={[
                          styles.streakChip,
                          { backgroundColor: `${theme.rose}26`, borderColor: `${theme.rose}40` },
                        ]}
                      >
                        <MaterialCommunityIcons name="fire" size={rs(12)} color={theme.rose} />
                        <Text style={[styles.streakText, { color: theme.rose }]}>{streak}</Text>
                      </View>
                    ) : null}
                    <View style={styles.dailyTap}>
                      <Text style={[styles.dailyTapLabel, { color: theme.gold }]}>
                        {t('common.tap')}
                      </Text>
                      <Feather name="chevron-right" size={rs(16)} color={theme.gold} />
                    </View>
                  </View>
                </View>
              </GlassCard>
            </TouchableOpacity>

            {/* Tonight's Read — daily insight hook (10-Insight-1.png) */}
            {dailyInsight && dailyInsightContent ? (
              <View style={styles.insightCard}>
                <FeaturedInsightCard
                  compact
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
    fontFamily: 'Inter_600SemiBold',
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

  /* Daily Question banner */
  dailyCard: {
    padding: 0,
    marginBottom: rs(12),
  },
  /* Tonight's Read insight card spacing before the first section */
  insightCard: {
    marginBottom: rs(24),
  },
  dailyAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: rs(4),
    borderTopRightRadius: rs(4),
    borderBottomRightRadius: rs(4),
  },
  dailyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(12),
    paddingVertical: rs(14),
    paddingLeft: rs(20),
    paddingRight: rs(14),
  },
  dailyIconTile: {
    width: rs(40),
    height: rs(40),
    borderRadius: rs(12),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dailyText: { flex: 1, gap: rs(3) },
  dailyTitle: {
    fontSize: rs(15),
    fontFamily: 'Inter_600SemiBold',
  },
  dailySub: {
    fontSize: rs(13),
    lineHeight: rs(18),
    fontFamily: 'Inter_400Regular',
  },
  dailyRight: { flexDirection: 'row', alignItems: 'center', gap: rs(8) },
  streakChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(3),
    paddingHorizontal: rs(8),
    paddingVertical: rs(3),
    borderRadius: 999,
    borderWidth: 1,
  },
  streakText: { fontSize: rs(11), fontFamily: 'Inter_700Bold' },
  dailyTap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(2),
  },
  dailyTapLabel: { fontSize: rs(12), fontFamily: 'Inter_600SemiBold' },

  /* Section heading */
  sectionLabel: {
    fontSize: rs(12),
    fontFamily: 'Inter_600SemiBold',
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
});
