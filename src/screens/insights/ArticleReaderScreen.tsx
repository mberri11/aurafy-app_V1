// ─────────────────────────────────────────────────────────────────────────────
// INSIGHTS — article reader screen.
// Route: app/article/[id].tsx (root Stack) re-exports this.
// Design: design-reference/screenshots/10-Insight-3.png / 10-Insight-4.png
//
// Top reading-progress bar (scroll-driven, UI thread) + glass back button, orbit
// hero, category tag, Playfair title, structured ArticleBlocks (scroll-reveal) and
// the end-of-article cross-sell CTA → relatedModule. markRead() fires on open so the
// feed's unread dot picks it up.
//
// PURE READER since 2026-07-25: the daily ritual (question, +1★, streak, day-7 reveal)
// moved out to the Daily Quote screen (src/screens/quotes/DailyQuoteScreen.tsx).
// Articles are now purely browsable editorial content — nothing here touches the economy.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useCallback, useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppText as Text } from '@/src/components/AppText';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

import { useTheme } from '@/src/themes/ThemeProvider';
import { useUserStore } from '@/src/store/userStore';
import GradientButton from '@/src/components/GradientButton';
import {
  getArticle,
  getArticleContent,
  CATEGORY_COLORS,
  type Language,
} from '@/src/content/articles';
import { rs } from '@/src/utils/responsive';
import { useIsRTL } from '@/src/utils/rtl';
import { maybeShowInterstitial } from '@/src/ads/interstitialGate';
import ReadingProgressBar from './components/ReadingProgressBar';
import ArticleBlocks from './components/ArticleBlocks';
import OrbitArt from './components/OrbitArt';

const HERO_BG = '#241733';

export default function ArticleReaderScreen() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isRTL = useIsRTL();
  const insets = useSafeAreaInsets();
  const lang = i18n.language as Language;
  const { id } = useLocalSearchParams<{ id: string }>();

  const article = id ? getArticle(id) : undefined;
  const content = id ? getArticleContent(id, lang) : undefined;

  const markRead = useUserStore((s) => s.markRead);
  const readingCount = useUserStore((s) => s.readingCount);

  // Leaving the reader back to the feed is a natural transition — fire the frequency-
  // capped interstitial here (milestone spot, ignores the onboarding min-readings floor;
  // the shared cooldown still prevents it firing on every daily read). Fire-and-forget.
  const handleBack = useCallback(() => {
    void maybeShowInterstitial(readingCount, { ignoreMinReadings: true });
    router.back();
  }, [readingCount]);

  // Mark read on open (drives the feed's unread dot).
  useEffect(() => {
    if (article) markRead(article.id);
  }, [article, markRead]);

  const progress = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    const max = e.contentSize.height - e.layoutMeasurement.height;
    progress.value = max > 0 ? e.contentOffset.y / max : 0;
  });

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
  // Articles with relatedModuleId '' have no cross-sell (C-10 brief) — don't resolve a
  // broken i18n key for them; the CTA below is hidden entirely.
  const moduleTitle = article.relatedModuleId ? t(`modules.${article.relatedModuleId}.title`) : '';

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
        {/* Back only — the reader has no share action (Simo 2026-07-11). */}
        <View style={styles.topRow}>
          <TouchableOpacity
            onPress={handleBack}
            style={[styles.circleBtn, { backgroundColor: theme.surface, borderColor: theme.surfaceBorder }]}
            accessibilityLabel={t('common.back')}
            accessibilityRole="button"
          >
            <Feather name={isRTL ? 'chevron-right' : 'chevron-left'} size={rs(20)} color={theme.text} />
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

        {/* End-of-article cross-sell — full-width, module contextual via relatedModuleId.
            Hidden when the article has no linked module (relatedModuleId ''). */}
        {article.relatedModuleId ? (
          <>
            <View style={[styles.endDivider, { backgroundColor: theme.surfaceBorder }]} />
            <GradientButton
              label={t('insights.takeReading', { module: moduleTitle })}
              onPress={openModule}
              labelColor={theme.bg2}
              bold
              trailingIcon={isRTL ? 'arrow-left' : 'arrow-right'}
            />
          </>
        ) : null}


      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { alignItems: 'center', justifyContent: 'center', gap: rs(12) },
  notFound: { fontSize: rs(15), fontFamily: 'HankenGrotesk_400Regular' },
  backLink: { fontSize: rs(15), fontFamily: 'HankenGrotesk_600SemiBold' },

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
  tagText: { fontSize: rs(11), fontFamily: 'HankenGrotesk_700Bold', letterSpacing: 0.6 },
  clock: { marginStart: rs(6) },
  readText: { fontSize: rs(12), fontFamily: 'HankenGrotesk_500Medium' },
  title: {
    fontSize: rs(27),
    lineHeight: rs(33),
    fontFamily: 'PlayfairDisplay_700Bold',
    letterSpacing: -0.4,
    marginBottom: rs(8),
  },

  endDivider: { height: StyleSheet.hairlineWidth, marginTop: rs(24), marginBottom: rs(22) },

});
