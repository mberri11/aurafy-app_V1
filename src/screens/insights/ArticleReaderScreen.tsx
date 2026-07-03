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

import React, { useCallback, useEffect, useState } from 'react';
import {
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppText as Text } from '@/src/components/AppText';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
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
import { getDailyQuestion, getDailyAnswerDimension } from '@/src/data/dailyQuestions';
import { getTodayOutcomeKey } from '@/src/data/weeks/walker';
import { rs } from '@/src/utils/responsive';
import { useIsRTL } from '@/src/utils/rtl';
import { lightTap } from '@/src/utils/haptics';
import ReadingProgressBar from './components/ReadingProgressBar';
import ArticleBlocks from './components/ArticleBlocks';
import OrbitArt from './components/OrbitArt';

const HERO_BG = '#241733';
const STREAK_DAYS = 7; // one full streak cycle (mirrors STREAK_LENGTH in userStore)

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
  const completeDailyRitual = useUserStore((s) => s.completeDailyRitual);
  const dailyAnswers = useUserStore((s) => s.dailyAnswers);
  const stars = useUserStore((s) => s.stars);
  const weekAnchorDate = useUserStore((s) => s.weekAnchorDate);
  const streak = useUserStore((s) => s.streak);

  // Daily ritual question — answered at the foot of the daily article. Picking an answer
  // claims the +1★ ritual reward + advances the streak via completeDailyRitual. The answer
  // feeds the WEEKLY report only — there is deliberately NO per-day reading/interpretation.
  const todayAnswer = dailyAnswers.find((a) => a.date === localDateKey());
  const [picked, setPicked] = useState<number | null>(null);
  // Resolve the selected answer from this session OR a ritual already done earlier today
  // (so re-opening the article lands in the "answered" state, not a fresh question).
  const answeredIdx = picked ?? todayAnswer?.answerIndex ?? null;
  const answered = answeredIdx !== null;
  // "Prior-locked" = the ritual was completed on an earlier visit today (not this session).
  // Re-entering should read as already-done: the whole question block is muted + frozen on
  // the submitted answer. A fresh in-session answer (picked != null) stays vivid instead.
  const priorLocked = answered && picked === null;
  // The star-earned reveal starts already-visible when the ritual was done earlier today
  // (no slide-in), and slides up on a fresh answer.
  const revealY = useSharedValue(todayAnswer ? 0 : rs(24));
  const revealOpacity = useSharedValue(todayAnswer ? 1 : 0);
  const revealStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: revealY.value }],
    opacity: revealOpacity.value,
  }));

  // Mark read on open (drives the streak surface + History).
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

  const onAnswer = useCallback(
    (idx: number, questionId: string) => {
      if (answered) return;
      lightTap();
      setPicked(idx);
      revealY.value = rs(24);
      revealOpacity.value = 0;
      revealY.value = withSpring(0, { stiffness: 200, damping: 20 });
      revealOpacity.value = withSpring(1, { stiffness: 200, damping: 20 });
      // C-10: record the WEEK-LOCAL outcome key (the day-7 tally reads these). Falls
      // back to the legacy lean axis when the curriculum is off/empty.
      const dimension = getTodayOutcomeKey(questionId, idx, weekAnchorDate) ?? getDailyAnswerDimension(questionId, idx);
      completeDailyRitual({ questionId, answerIndex: idx, dimension });
      // C-10: completing the 7th ritual (forgiving streak) stages a PENDING weekly result —
      // reveal it (after a beat so the star-earned confirmation registers first). The reveal
      // pays the +5 on mount, enforcing reveal-before-bonus.
      const wr = useUserStore.getState().weeklyResult;
      if (wr && wr.claimedAt === 0) {
        setTimeout(() => router.push('/weekly-result'), 700);
      }
    },
    [answered, revealY, revealOpacity, completeDailyRitual, weekAnchorDate],
  );

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
  const isDaily = article.id === getDailyInsightId(weekAnchorDate);
  const dailyQuestion = isDaily ? getDailyQuestion(weekAnchorDate) : undefined;
  // "Day X of 7" tracks the FORGIVING streak (rituals completed this cycle) — the SAME counter
  // the day-7 reveal fires on — so the dots and the reveal stay in lockstep even when a day is
  // skipped (skips hold the streak, they don't advance it). The anchor's calendar dayIndex still
  // picks WHICH article shows each day; it no longer drives this progress meter.
  const day = Math.min(streak, STREAK_DAYS);
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
            <Feather name={isRTL ? 'chevron-right' : 'chevron-left'} size={rs(20)} color={theme.text} />
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

        {/* Daily ritual — today's question on a celestial "moon" panel so it reads as a
            distinct moment (the gradient fade in from the article body is the texture shift). */}
        {isDaily && dailyQuestion ? (
          <View style={styles.ritualWrap}>
            {/* celestial backdrop: violet fade + soft top glow + faint stars */}
            <LinearGradient
              colors={['rgba(36,23,51,0)', 'rgba(46,28,66,0.55)', 'rgba(26,17,42,0.92)']}
              locations={[0, 0.42, 1]}
              style={StyleSheet.absoluteFill}
            />
            <Svg style={StyleSheet.absoluteFill} width="100%" height="100%" pointerEvents="none">
              <Defs>
                <RadialGradient id="ritual_glow" cx="50%" cy="12%" r="58%">
                  <Stop offset="0%" stopColor={theme.primary} stopOpacity={0.3} />
                  <Stop offset="55%" stopColor={theme.primary} stopOpacity={0.06} />
                  <Stop offset="100%" stopColor={theme.primary} stopOpacity={0} />
                </RadialGradient>
              </Defs>
              <Rect x="0" y="0" width="100%" height="100%" fill="url(#ritual_glow)" />
            </Svg>
            <View style={[styles.star, { top: rs(22), start: rs(56) }]} />
            <View style={[styles.star, styles.starSm, { top: rs(58), end: rs(70) }]} />
            <View style={[styles.star, styles.starSm, { top: rs(104), start: '76%' }]} />

            <View style={styles.ritualContent}>
              <View style={styles.ritualHeader}>
                <MaterialCommunityIcons name="star-four-points" size={rs(14)} color={`${theme.gold}AA`} />
                <View style={styles.ritualEyebrowRow}>
                  <MaterialCommunityIcons name="moon-waning-crescent" size={rs(14)} color={theme.gold} />
                  <Text style={[styles.ritualEyebrow, { color: theme.gold }]}>{t('daily.title').toUpperCase()}</Text>
                </View>
              </View>
              <Text style={[styles.ritualQuestion, { color: theme.text }, priorLocked && styles.lockedText]}>
                {dailyQuestion.text[lang] ?? dailyQuestion.text.en}
              </Text>

              <View
                style={[styles.ritualAnswers, priorLocked && styles.lockedBlock]}
                pointerEvents={priorLocked ? 'none' : 'auto'}
              >
                {dailyQuestion.answers.map((a, idx) => {
                  const active = answeredIdx === idx;
                  const dim = answered && !active;
                  const letter = String.fromCharCode(65 + idx);
                  return (
                    <TouchableOpacity
                      key={idx}
                      onPress={() => onAnswer(idx, dailyQuestion.id)}
                      disabled={answered}
                      activeOpacity={0.85}
                      accessibilityRole="button"
                      accessibilityLabel={a.label[lang] ?? a.label.en}
                    >
                      <View
                        style={[
                          styles.ritualAnswer,
                          {
                            backgroundColor: active ? `${theme.gold}14` : theme.surface,
                            borderColor: active ? theme.gold : theme.borderStrong,
                            borderWidth: active ? 1.5 : 1,
                          },
                          dim && styles.ritualAnswerDim,
                        ]}
                      >
                        <View
                          style={[
                            styles.letterBadge,
                            {
                              borderColor: active ? theme.gold : theme.borderStrong,
                              backgroundColor: active ? `${theme.gold}26` : 'transparent',
                            },
                          ]}
                        >
                          <Text style={[styles.letterText, { color: active ? theme.gold : theme.textMuted }]}>
                            {letter}
                          </Text>
                        </View>
                        <Text style={[styles.ritualAnswerText, { color: theme.text }]}>
                          {a.label[lang] ?? a.label.en}
                        </Text>
                        {active ? (
                          <MaterialCommunityIcons name="star" size={rs(16)} color={theme.gold} style={styles.answerStar} />
                        ) : null}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Post-answer payoff: star-earned confirmation + streak progress. NO per-day
                  reading — the answer only feeds the weekly report. Stays locked all day. */}
              {answered ? (
                <Animated.View style={[styles.revealCol, revealStyle]}>
                  <View style={[styles.starCard, { borderColor: `${theme.gold}45` }]}>
                    <LinearGradient
                      colors={[`${theme.gold}24`, `${theme.gold}08`]}
                      style={StyleSheet.absoluteFill}
                    />
                    <View style={styles.starBadgeWrap}>
                      <View style={[styles.starHalo, { backgroundColor: `${theme.gold}1F` }]} pointerEvents="none" />
                      <View style={[styles.starGlow, { backgroundColor: `${theme.gold}2E`, borderColor: `${theme.gold}80` }]}>
                        <MaterialCommunityIcons name="star" size={rs(24)} color={theme.gold} />
                      </View>
                    </View>
                    <View style={styles.starTextCol}>
                      <Text style={[styles.starTitle, { color: theme.gold }]}>{t('daily.starEarned')}</Text>
                      <Text style={[styles.starBalance, { color: theme.text }]}>
                        {t('daily.balanceNow', { balance: stars })}
                      </Text>
                      <Text style={[styles.starHint, { color: theme.textDim }]}>{t('daily.comeBackTomorrow')}</Text>
                    </View>
                  </View>

                  <View style={[styles.progressField, { borderColor: theme.surfaceBorder, backgroundColor: theme.surface }]}>
                    <View style={styles.dotsRow}>
                      {Array.from({ length: STREAK_DAYS }).map((_, i) => (
                        <View
                          key={i}
                          style={[
                            styles.progressDot,
                            { backgroundColor: i < day ? theme.gold : theme.borderStrong },
                            i < day && {
                              shadowColor: theme.gold,
                              shadowOpacity: 0.6,
                              shadowRadius: rs(3),
                              shadowOffset: { width: 0, height: 0 },
                              elevation: 2,
                            },
                          ]}
                        />
                      ))}
                    </View>
                    <Text style={[styles.progressLabel, { color: theme.text }]}>{t('daily.dayOf', { day })}</Text>
                    <Text style={[styles.progressCaption, { color: theme.textDim }]}>{t('daily.weekCaption')}</Text>
                  </View>
                </Animated.View>
              ) : null}
            </View>
          </View>
        ) : null}

        {/* End-of-article cross-sell — full-width, module contextual via relatedModuleId */}
        <View style={[styles.endDivider, { backgroundColor: theme.surfaceBorder }]} />
        <GradientButton
          label={t('insights.takeReading', { module: moduleTitle })}
          onPress={openModule}
          labelColor="#0B0E25"
          bold
          trailingIcon={isRTL ? 'arrow-left' : 'arrow-right'}
        />

        {/* Done — return Home after completing the ritual. Faint-gold "completed" pill with a
            circular check, echoing the star-earned reward so it reads as a satisfying close. */}
        {isDaily && answered ? (
          <TouchableOpacity
            onPress={() => router.back()}
            style={[styles.doneBtn, { borderColor: `${theme.gold}3D`, backgroundColor: `${theme.gold}0F` }]}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel={t('common.done')}
          >
            <View style={[styles.doneCheck, { borderColor: `${theme.gold}66`, backgroundColor: `${theme.gold}1F` }]}>
              <Feather name="check" size={rs(12)} color={theme.gold} />
            </View>
            <Text style={[styles.doneText, { color: theme.text }]}>{t('common.done')}</Text>
          </TouchableOpacity>
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

  /* daily ritual — full-bleed celestial panel */
  ritualWrap: {
    marginHorizontal: -rs(20),
    marginTop: rs(20),
    paddingVertical: rs(28),
    overflow: 'hidden',
  },
  ritualContent: { paddingHorizontal: rs(20), gap: rs(14) },
  star: {
    position: 'absolute',
    width: rs(4),
    height: rs(4),
    borderRadius: rs(2),
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  starSm: { width: rs(2.5), height: rs(2.5), borderRadius: rs(1.5), backgroundColor: 'rgba(255,255,255,0.45)' },
  ritualHeader: { alignItems: 'center', gap: rs(6) },
  ritualEyebrowRow: { flexDirection: 'row', alignItems: 'center', gap: rs(6) },
  ritualEyebrow: { fontSize: rs(11), fontFamily: 'HankenGrotesk_700Bold', letterSpacing: 1 },
  ritualQuestion: {
    fontSize: rs(22),
    lineHeight: rs(29),
    fontFamily: 'PlayfairDisplay_600SemiBold',
    letterSpacing: -0.3,
    textAlign: 'center',
  },
  ritualAnswers: { gap: rs(10), marginTop: rs(2) },
  /* re-entry (prior-locked) — the question reads as already-done: muted + frozen */
  lockedText: { opacity: 0.7 },
  lockedBlock: { opacity: 0.6 },
  ritualAnswer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(12),
    borderRadius: rs(14),
    paddingVertical: rs(14),
    paddingHorizontal: rs(14),
  },
  ritualAnswerDim: { opacity: 0.45 },
  letterBadge: {
    width: rs(26),
    height: rs(26),
    borderRadius: rs(13),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterText: { fontSize: rs(12), fontFamily: 'HankenGrotesk_700Bold' },
  ritualAnswerText: { flex: 1, fontSize: rs(14.5), lineHeight: rs(20), fontFamily: 'HankenGrotesk_500Medium' },
  answerStar: { marginStart: rs(4) },

  /* post-answer star-earned + streak progress */
  revealCol: { gap: rs(12), marginTop: rs(4) },
  starCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(14),
    borderRadius: rs(16),
    borderWidth: 1,
    padding: rs(16),
    overflow: 'hidden',
  },
  // Centered wrapper so the soft halo can sit behind the badge without an Android
  // elevation shadow (which rendered as a dark box behind the star).
  starBadgeWrap: { width: rs(46), height: rs(46), alignItems: 'center', justifyContent: 'center' },
  starHalo: {
    position: 'absolute',
    width: rs(58),
    height: rs(58),
    borderRadius: rs(29),
  },
  starGlow: {
    width: rs(46),
    height: rs(46),
    borderRadius: rs(23),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  starTextCol: { flex: 1, gap: rs(2) },
  starTitle: { fontSize: rs(16), fontFamily: 'HankenGrotesk_700Bold' },
  starBalance: { fontSize: rs(13.5), lineHeight: rs(18), fontFamily: 'HankenGrotesk_600SemiBold' },
  starHint: { fontSize: rs(12), lineHeight: rs(16), fontFamily: 'HankenGrotesk_400Regular', marginTop: rs(2) },
  progressField: {
    borderRadius: rs(14),
    borderWidth: 1,
    paddingVertical: rs(14),
    paddingHorizontal: rs(16),
    alignItems: 'center',
    gap: rs(8),
  },
  dotsRow: { flexDirection: 'row', gap: rs(7), alignItems: 'center' },
  progressDot: { width: rs(8), height: rs(8), borderRadius: rs(4) },
  progressLabel: { fontSize: rs(13.5), fontFamily: 'HankenGrotesk_700Bold' },
  progressCaption: { fontSize: rs(12.5), lineHeight: rs(18), fontFamily: 'HankenGrotesk_400Regular', textAlign: 'center' },

  doneBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: rs(9),
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: rs(11),
    paddingStart: rs(14),
    paddingEnd: rs(24),
    marginTop: rs(16),
  },
  doneCheck: {
    width: rs(22),
    height: rs(22),
    borderRadius: rs(11),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneText: { fontSize: rs(14.5), fontFamily: 'HankenGrotesk_600SemiBold', letterSpacing: 0.3 },
});
