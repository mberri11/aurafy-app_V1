// ─────────────────────────────────────────────────────────────────────────────
// INSIGHTS — feed screen.
// Route: app/(tabs)/insights.tsx (5th bottom-nav tab) re-exports this.
// Design: design-reference/screenshots/10-Insight-1.png / 10-Insight-2.png
//
// Layout: fixed header (EDITORIAL / Insights / StarsBadge) over a FlatList whose
// header holds the daily FeaturedInsightCard + category chips + "LATEST" label;
// the list rows are ArticleCards (with the SPONSORED native-ad card spliced in).
// ─────────────────────────────────────────────────────────────────────────────

import React, { useCallback, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppText as Text } from '@/src/components/AppText';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useUserStore } from '@/src/store/userStore';
import { useTheme } from '@/src/themes/ThemeProvider';
import StarsBadge from '@/src/components/StarsBadge';
import CosmicBloom from '@/src/components/CosmicBloom';
import AdBanner from '@/src/ads/AdBanner';
import {
  ARTICLES,
  CATEGORY_ORDER,
  getArticleContent,
  type Article,
  type ArticleCategory,
  type Language,
} from '@/src/content/articles';
import { getDailyInsightId, localDateKey } from '@/src/content/articles/dailyInsight';
import { WEEKLY_CURRICULUM_ENABLED } from '@/src/config/flags';
import { getArticleRevealDay } from '@/src/data/weeks';
import { getDaysSinceAnchor } from '@/src/data/weeks/walker';
import { rs } from '@/src/utils/responsive';
import FeaturedInsightCard from './components/FeaturedInsightCard';
import ArticleCard from './components/ArticleCard';

type ChipKey = ArticleCategory | 'all';
const SPONSORED_SLOT = 3; // position the native-ad card lands at in the "all" feed

export default function InsightsScreen() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const lang = i18n.language as Language;

  const stars = useUserStore((s) => s.stars);
  const readArticleIds = useUserStore((s) => s.readArticleIds);
  const dailyAnswers = useUserStore((s) => s.dailyAnswers);
  const weekAnchorDate = useUserStore((s) => s.weekAnchorDate);

  const [activeChip, setActiveChip] = useState<ChipKey>('all');

  const dailyId = getDailyInsightId(weekAnchorDate);
  const dailyArticle = ARTICLES.find((a) => a.id === dailyId);
  const dailyContent = getArticleContent(dailyId, lang);
  // Reward pill shows until today's daily ritual (article + question) is completed.
  const rewardAvailable = !dailyAnswers.some((a) => a.date === localDateKey());

  const openArticle = useCallback((id: string) => {
    router.push({ pathname: '/article/[id]', params: { id } });
  }, []);

  const handleStarsPress = useCallback(() => router.push('/(tabs)/stars'), []);

  // Reveal gate (2026-07-12): a curriculum article appears in the feed only once its
  // day has ARRIVED — i.e. the day the walker actually serves it as the daily pick,
  // day-granular off the user's anchor. So an UPCOMING daily pick (tomorrow's, etc.)
  // stays hidden until its day; past dailies fall back into the feed; today's daily is
  // in "Tonight's Read". Editorial (non-curriculum) articles are always browsable. With
  // the curriculum flag off there is no pacing, so everything shows.
  const daysSinceAnchor = getDaysSinceAnchor(weekAnchorDate);
  const isRevealed = (a: Article) => {
    const revealDay = getArticleRevealDay(a.id);
    if (revealDay === undefined || !WEEKLY_CURRICULUM_ENABLED) return true;
    return daysSinceAnchor >= revealDay;
  };

  // Build the LATEST list: non-sponsored, revealed, newest-first, filtered by the active
  // chip; the sponsored card is spliced in only in the "all" view.
  const sponsored = ARTICLES.find((a) => a.sponsored);
  const normal = ARTICLES.filter((a) => !a.sponsored && a.id !== dailyId && isRevealed(a)).sort(
    (a, b) => (b.publishedAt ?? '').localeCompare(a.publishedAt ?? ''),
  );
  const filtered = activeChip === 'all' ? normal : normal.filter((a) => a.category === activeChip);
  const listData: Article[] = [...filtered];
  if (activeChip === 'all' && sponsored) {
    listData.splice(Math.min(SPONSORED_SLOT, listData.length), 0, sponsored);
  }

  // Only offer chips whose category actually has a visible article (hides the
  // zodiac chip until zodiac weeks come into reach — no guaranteed-empty filters).
  const liveCategories = new Set(normal.map((a) => a.category));
  const chips: ChipKey[] = ['all', ...CATEGORY_ORDER.filter((c) => liveCategories.has(c))];

  const renderItem: ListRenderItem<Article> = ({ item }) => {
    // The in-feed ad slot is a real banner ad, not a faux "SPONSORED" article card:
    // the old card carried a headline + fake source ("Astra · مواعدة") that read like
    // a genuine article and pointed nowhere. A banner is honest and self-collapses in
    // Expo Go / on load failure, so the slot simply vanishes when there's no ad.
    if (item.sponsored) return <AdBanner style={styles.inlineBanner} />;
    return (
      <ArticleCard
        article={item}
        content={getArticleContent(item.id, lang)}
        unread={!readArticleIds.includes(item.id)}
        onPress={() => openArticle(item.id)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <CosmicBloom cx="50%" cy="2%" r="58%" />

      {/* Fixed header */}
      <View style={[styles.header, { paddingTop: insets.top + rs(12) }]}>
        <View>
          <Text style={[styles.editorial, { color: theme.textDim }]}>{t('insights.editorial')}</Text>
          <Text style={[styles.title, { color: theme.text }]}>{t('insights.title')}</Text>
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
            {dailyArticle && dailyContent ? (
              <>
                <Text style={[styles.eyebrow, { color: theme.textDim }]}>
                  {t('insights.tonightsRead')}
                </Text>
                <FeaturedInsightCard
                  article={dailyArticle}
                  content={dailyContent}
                  rewardAvailable={rewardAvailable}
                  onPress={() => openArticle(dailyArticle.id)}
                />
              </>
            ) : null}

            {/* Category chips */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipsRow}
              style={styles.chipsScroll}
            >
              {chips.map((chip) => {
                const active = chip === activeChip;
                return (
                  <TouchableOpacity
                    key={chip}
                    onPress={() => setActiveChip(chip)}
                    activeOpacity={0.8}
                    style={[
                      styles.chip,
                      {
                        borderColor: active ? theme.primary : theme.surfaceBorder,
                        backgroundColor: active ? `${theme.primary}26` : theme.surface,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        { color: active ? theme.text : theme.textMuted },
                      ]}
                    >
                      {t(`insights.categories.${chip}`)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <Text style={[styles.eyebrow, styles.latestLabel, { color: theme.textDim }]}>
              {t('insights.latest')}
            </Text>
          </>
        }
        ListEmptyComponent={
          <Text style={[styles.empty, { color: theme.textDim }]}>{t('insights.empty')}</Text>
        }
        ListFooterComponent={
          // Anchored banner at the feed footer (design note: "banner may sit at the
          // feed footer"). Only under real rows; self-collapses in Expo Go / on failure.
          listData.length > 0 ? <AdBanner style={styles.banner} /> : null
        }
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
    paddingHorizontal: rs(20),
    paddingBottom: rs(8),
  },
  editorial: {
    fontSize: rs(11),
    fontFamily: 'HankenGrotesk_600SemiBold',
    letterSpacing: 1.8,
    marginBottom: rs(2),
  },
  title: { fontSize: rs(28), fontFamily: 'PlayfairDisplay_700Bold', letterSpacing: -0.4 },

  scroll: { paddingHorizontal: rs(16), paddingTop: rs(8) },

  eyebrow: {
    fontSize: rs(11),
    fontFamily: 'HankenGrotesk_600SemiBold',
    letterSpacing: 1.8,
    marginBottom: rs(10),
    paddingHorizontal: rs(4),
  },
  latestLabel: { marginTop: rs(4) },

  chipsScroll: { marginTop: rs(16), marginBottom: rs(18) },
  chipsRow: { gap: rs(8), paddingHorizontal: rs(2), paddingEnd: rs(16) },
  chip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: rs(16),
    paddingVertical: rs(8),
  },
  chipText: { fontSize: rs(13), fontFamily: 'HankenGrotesk_600SemiBold' },

  empty: {
    fontSize: rs(13),
    fontFamily: 'HankenGrotesk_400Regular',
    textAlign: 'center',
    marginTop: rs(40),
  },
  banner: { marginTop: rs(16) },
  // In-feed banner occupies the old SPONSORED slot; match the article-card rhythm.
  inlineBanner: { marginBottom: rs(12) },
});
