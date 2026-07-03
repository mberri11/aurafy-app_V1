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
import {
  ARTICLES,
  CATEGORY_ORDER,
  getArticleContent,
  type Article,
  type ArticleCategory,
  type Language,
} from '@/src/content/articles';
import { getDailyInsightId, localDateKey } from '@/src/content/articles/dailyInsight';
import { rs } from '@/src/utils/responsive';
import FeaturedInsightCard from './components/FeaturedInsightCard';
import ArticleCard from './components/ArticleCard';

type ChipKey = ArticleCategory | 'all';
const CHIPS: ChipKey[] = ['all', ...CATEGORY_ORDER];
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

  // Build the LATEST list: non-featured, non-sponsored, newest-first, filtered
  // by the active chip; the sponsored card is spliced in only in the "all" view.
  const sponsored = ARTICLES.find((a) => a.sponsored);
  const normal = ARTICLES.filter((a) => !a.sponsored && a.id !== dailyId).sort((a, b) =>
    (b.publishedAt ?? '').localeCompare(a.publishedAt ?? ''),
  );
  const filtered = activeChip === 'all' ? normal : normal.filter((a) => a.category === activeChip);
  const listData: Article[] = [...filtered];
  if (activeChip === 'all' && sponsored) {
    listData.splice(Math.min(SPONSORED_SLOT, listData.length), 0, sponsored);
  }

  const renderItem: ListRenderItem<Article> = ({ item }) => (
    <ArticleCard
      article={item}
      content={getArticleContent(item.id, lang)}
      unread={!item.sponsored && !readArticleIds.includes(item.id)}
      onPress={() => (item.sponsored ? undefined : openArticle(item.id))}
    />
  );

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
              {CHIPS.map((chip) => {
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
});
