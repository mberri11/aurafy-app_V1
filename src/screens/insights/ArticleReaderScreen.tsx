// ─────────────────────────────────────────────────────────────────────────────
// INSIGHTS — article reader screen.
// Route: app/article/[id].tsx (root Stack) re-exports this.
// Design: design-reference/screenshots/10-Insight-3.png / 10-Insight-4.png
//
// Top reading-progress bar (scroll-driven, UI thread) + glass back/share, orbit
// hero, category tag, Playfair title, structured ArticleBlocks (scroll-reveal),
// end-of-article cross-sell CTA → relatedModule, Share, and the daily "Claim +1 ✦"
// reward. markRead() fires on open so the reward gate + History pick it up.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useCallback, useEffect } from 'react';
import { Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import { useTheme } from '@/src/themes/ThemeProvider';
import { useUserStore } from '@/src/store/userStore';
import GradientButton from '@/src/components/GradientButton';
import {
  getArticle,
  getArticleContent,
  CATEGORY_COLORS,
  type Language,
} from '@/src/content/articles';
import { getDailyInsightId, localDateKey } from '@/src/content/articles/dailyInsight';
import { rs } from '@/src/utils/responsive';
import ReadingProgressBar from './components/ReadingProgressBar';
import ArticleBlocks from './components/ArticleBlocks';
import OrbitArt from './components/OrbitArt';

const HERO_BG = '#241733';

export default function ArticleReaderScreen() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const lang = i18n.language as Language;
  const { id } = useLocalSearchParams<{ id: string }>();

  const article = id ? getArticle(id) : undefined;
  const content = id ? getArticleContent(id, lang) : undefined;

  const markRead = useUserStore((s) => s.markRead);
  const claimDailyInsightBonus = useUserStore((s) => s.claimDailyInsightBonus);
  const lastDailyBonusDate = useUserStore((s) => s.lastDailyBonusDate);

  // Mark read on open (drives the reward gate + History).
  useEffect(() => {
    if (article) markRead(article.id);
  }, [article, markRead]);

  const progress = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    const max = e.contentSize.height - e.layoutMeasurement.height;
    progress.value = max > 0 ? e.contentOffset.y / max : 0;
  });

  const onShare = useCallback(() => {
    if (!content) return;
    Share.share({ message: `${content.title} — Aurafy` }).catch(() => {});
  }, [content]);

  const onClaim = useCallback(() => {
    if (article) claimDailyInsightBonus(article.id);
  }, [article, claimDailyInsightBonus]);

  const openModule = useCallback(() => {
    if (article) router.push({ pathname: '/module/[id]', params: { id: article.relatedModuleId } });
  }, [article]);

  if (!article || !content) {
    return (
      <View style={[styles.container, styles.center, { backgroundColor: theme.background }]}>
        <Text style={[styles.notFound, { color: theme.textMuted }]}>{t('insights.empty')}</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.backLink, { color: theme.gradient[0] }]}>{t('common.back')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const accent = CATEGORY_COLORS[article.category];
  const catLabel = t(`insights.categories.${article.category}`).toUpperCase();
  const readLabel = t('insights.minRead', { n: article.readMinutes });
  const isDaily = article.id === getDailyInsightId();
  const claimedToday = lastDailyBonusDate === localDateKey();
  const moduleTitle = t(`modules.${article.relatedModuleId}.title`);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Scroll-driven progress bar pinned to the very top */}
      <View style={[styles.progressWrap, { top: 0 }]}>
        <ReadingProgressBar progress={progress} />
      </View>

      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + rs(8),
          paddingHorizontal: rs(20),
          paddingBottom: insets.bottom + rs(40),
        }}
      >
        {/* Back + Share */}
        <View style={styles.topRow}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={[styles.circleBtn, { backgroundColor: theme.surface, borderColor: theme.surfaceBorder }]}
            accessibilityLabel={t('common.back')}
            accessibilityRole="button"
          >
            <Feather name="chevron-left" size={rs(20)} color={theme.text} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onShare}
            style={[styles.circleBtn, { backgroundColor: theme.surface, borderColor: theme.surfaceBorder }]}
            accessibilityLabel={t('common.share')}
            accessibilityRole="button"
          >
            <Feather name="share-2" size={rs(17)} color={theme.text} />
          </TouchableOpacity>
        </View>

        {/* Orbit hero */}
        <View style={[styles.hero, { backgroundColor: HERO_BG }]}>
          <Svg style={StyleSheet.absoluteFill} width="100%" height="100%" pointerEvents="none">
            <Defs>
              <RadialGradient id="ar_bloom" cx="50%" cy="45%" r="60%">
                <Stop offset="0%" stopColor={accent} stopOpacity={0.5} />
                <Stop offset="55%" stopColor={accent} stopOpacity={0.12} />
                <Stop offset="100%" stopColor={HERO_BG} stopOpacity={0} />
              </RadialGradient>
            </Defs>
            <Rect x="0" y="0" width="100%" height="100%" fill="url(#ar_bloom)" />
          </Svg>
          <OrbitArt size={rs(130)} accent={accent} />
        </View>

        {/* Meta + title */}
        <View style={styles.metaRow}>
          <View style={[styles.dot, { backgroundColor: accent }]} />
          <Text style={[styles.tagText, { color: accent }]}>{catLabel}</Text>
          <Feather name="clock" size={rs(12)} color={theme.textMuted} style={styles.clock} />
          <Text style={[styles.readText, { color: theme.textMuted }]}>{readLabel}</Text>
        </View>
        <Text style={[styles.title, { color: theme.text }]}>{content.title}</Text>

        {/* Body */}
        <ArticleBlocks blocks={content.blocks} accent={accent} />

        {/* End-of-article cross-sell + reward */}
        <View style={[styles.endDivider, { backgroundColor: theme.surfaceBorder }]} />

        <View style={styles.ctaRow}>
          <GradientButton
            label={t('insights.takeReading', { module: moduleTitle })}
            onPress={openModule}
            labelColor="#0B0E25"
            bold
            glow
            trailingIcon="arrow-right"
            style={styles.ctaButton}
          />
          <TouchableOpacity
            onPress={onShare}
            style={[styles.circleBtn, styles.ctaShare, { backgroundColor: theme.surface, borderColor: theme.surfaceBorder }]}
            accessibilityLabel={t('common.share')}
            accessibilityRole="button"
          >
            <Feather name="share-2" size={rs(17)} color={theme.text} />
          </TouchableOpacity>
        </View>

        {isDaily ? (
          <View style={styles.rewardWrap}>
            <TouchableOpacity
              onPress={onClaim}
              disabled={claimedToday}
              activeOpacity={0.85}
              style={[
                styles.claimBtn,
                {
                  borderColor: claimedToday ? theme.surfaceBorder : `${theme.gold}88`,
                  backgroundColor: claimedToday ? theme.surface : `${theme.gold}14`,
                },
              ]}
              accessibilityRole="button"
            >
              <MaterialCommunityIcons
                name="star"
                size={rs(18)}
                color={claimedToday ? theme.textDim : theme.gold}
              />
              <Text
                style={[
                  styles.claimText,
                  { color: claimedToday ? theme.textDim : theme.gold },
                ]}
              >
                {claimedToday ? t('insights.claimed') : t('insights.claimReward')}
              </Text>
            </TouchableOpacity>
            <Text style={[styles.rewardCaption, { color: theme.textDim }]}>
              {t('insights.todaysReward')}
            </Text>
          </View>
        ) : null}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { alignItems: 'center', justifyContent: 'center', gap: rs(12) },
  notFound: { fontSize: rs(15), fontFamily: 'Inter_400Regular' },
  backLink: { fontSize: rs(15), fontFamily: 'Inter_600SemiBold' },

  progressWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: rs(16),
  },
  circleBtn: {
    width: rs(40),
    height: rs(40),
    borderRadius: 999,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  hero: {
    height: rs(150),
    borderRadius: rs(16),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: rs(18),
  },

  metaRow: { flexDirection: 'row', alignItems: 'center', gap: rs(5), marginBottom: rs(10) },
  dot: { width: rs(6), height: rs(6), borderRadius: 999 },
  tagText: { fontSize: rs(11), fontFamily: 'Inter_700Bold', letterSpacing: 0.6 },
  clock: { marginLeft: rs(6) },
  readText: { fontSize: rs(12), fontFamily: 'Inter_500Medium' },
  title: {
    fontSize: rs(27),
    lineHeight: rs(33),
    fontFamily: 'PlayfairDisplay_700Bold',
    letterSpacing: -0.4,
    marginBottom: rs(8),
  },

  endDivider: { height: StyleSheet.hairlineWidth, marginTop: rs(24), marginBottom: rs(22) },

  ctaRow: { flexDirection: 'row', alignItems: 'center', gap: rs(12) },
  ctaButton: { flex: 1 },
  ctaShare: { width: rs(56), height: rs(56) },

  rewardWrap: { alignItems: 'center', marginTop: rs(16), gap: rs(8) },
  claimBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: rs(8),
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: rs(15),
    paddingHorizontal: rs(24),
    alignSelf: 'stretch',
  },
  claimText: { fontSize: rs(16), fontFamily: 'Inter_700Bold' },
  rewardCaption: { fontSize: rs(12), fontFamily: 'Inter_400Regular' },
});
