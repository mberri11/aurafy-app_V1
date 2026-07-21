// ─────────────────────────────────────────────────────────────────────────────
// FeaturedInsightCard — the big "TONIGHT'S READ" card.
//   • default  → tall hero used at the top of the Insights feed (10-Insight-1.png)
//   • compact  → horizontal card used as the Home "Tonight's Read" hook (10-Insight.png)
// Shows orbit art, category tag, "N min read", title, the subtitle hook, and the
// gold "+1 ✦ today" reward pill when this is today's unclaimed daily insight.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppText as Text } from '@/src/components/AppText';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@/src/themes/ThemeProvider';
import GlassCard from '@/src/components/GlassCard';
import { type Article, type ArticleContent, CATEGORY_COLORS } from '@/src/content/articles';
import { rs } from '@/src/utils/responsive';
import { useIsRTL } from '@/src/utils/rtl';
import OrbitArt from './OrbitArt';

export interface FeaturedInsightCardProps {
  article: Article;
  content: ArticleContent;
  /** Show the "+1 ✦ today" reward pill (today's featured + not yet claimed). */
  rewardAvailable?: boolean;
  /** Horizontal Home-hook layout instead of the tall feed hero. */
  compact?: boolean;
  /** Home ritual hero: compact atom banner + 1-line lead + slim gold "Begin tonight's read" CTA. */
  ritual?: boolean;
  onPress: () => void;
}

const HERO_ART_BG = '#241733';
// Premium soft-gold gradient (lighter sheen on top) for the ritual CTA.
const GOLD_GRADIENT = ['#FBE08F', '#F5C542', '#E7AE2C'] as const;

/** Gold "Begin tonight's read" button with a gentle breathing sheen (UI-thread opacity). */
function RitualGoldCTA({ label, isRTL, gold }: { label: string; isRTL: boolean; gold: string }) {
  const theme = useTheme();
  const glow = useSharedValue(0);
  useEffect(() => {
    glow.value = withRepeat(withTiming(1, { duration: 1800, easing: Easing.inOut(Easing.quad) }), -1, true);
  }, [glow]);
  const sheenStyle = useAnimatedStyle(() => ({ opacity: 0.16 + glow.value * 0.34 }));
  return (
    <View style={[styles.ctaWrap, { shadowColor: gold }]}>
      <LinearGradient colors={GOLD_GRADIENT} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={styles.ctaGradient}>
        <Animated.View style={[styles.ctaSheen, sheenStyle]} pointerEvents="none">
          <LinearGradient
            colors={['rgba(255,255,255,0.85)', 'rgba(255,255,255,0)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
        <Text style={[styles.ctaText, { color: theme.bg2 }]}>{label}</Text>
        <Feather name={isRTL ? 'arrow-left' : 'arrow-right'} size={rs(16)} color={theme.bg2} />
      </LinearGradient>
    </View>
  );
}

export default function FeaturedInsightCard({
  article,
  content,
  rewardAvailable = false,
  compact = false,
  ritual = false,
  onPress,
}: FeaturedInsightCardProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const isRTL = useIsRTL();
  const accent = CATEGORY_COLORS[article.category];
  const catLabel = t(`insights.categories.${article.category}`).toUpperCase();
  const readLabel = t('insights.minRead', { n: article.readMinutes });

  const tag = (
    <View style={styles.metaRow}>
      <View style={[styles.dot, { backgroundColor: accent }]} />
      <Text style={[styles.tagText, { color: accent }]}>{catLabel}</Text>
      <Feather name="clock" size={rs(11)} color={theme.textMuted} style={styles.clock} />
      <Text style={[styles.readText, { color: theme.textMuted }]}>{readLabel}</Text>
    </View>
  );

  const rewardPill = rewardAvailable ? (
    <View style={[styles.rewardPill, { backgroundColor: `${theme.gold}1F`, borderColor: `${theme.gold}66` }]}>
      <Text style={[styles.rewardText, { color: theme.gold }]}>{t('insights.rewardToday')}</Text>
    </View>
  ) : null;

  // ── Ritual hero (Home — single ritual entry) ─────────────────────────────
  if (ritual) {
    // Once today's ritual is done the card is no longer actionable: dim + non-clickable.
    const done = !rewardAvailable;
    const card = (
      <GlassCard glowColor={done ? 'transparent' : `${accent}59`} style={done ? [styles.heroCard, styles.heroCardDone] : styles.heroCard}>
        <View style={[styles.ritualArt, { backgroundColor: HERO_ART_BG }]}>
          <Svg style={StyleSheet.absoluteFill} width="100%" height="100%" pointerEvents="none">
            <Defs>
              <RadialGradient id="fic_ritual_bloom" cx="50%" cy="50%" r="62%">
                <Stop offset="0%" stopColor={accent} stopOpacity={0.5} />
                <Stop offset="55%" stopColor={accent} stopOpacity={0.12} />
                <Stop offset="100%" stopColor={HERO_ART_BG} stopOpacity={0} />
              </RadialGradient>
            </Defs>
            <Rect x="0" y="0" width="100%" height="100%" fill="url(#fic_ritual_bloom)" />
          </Svg>

          <View style={styles.ritualArtTop}>
            <View style={styles.catTag}>
              <View style={[styles.dot, { backgroundColor: accent }]} />
              <Text style={[styles.tagText, { color: accent }]}>{catLabel}</Text>
            </View>
            {rewardPill}
          </View>

          <OrbitArt size={rs(66)} accent={accent} />
        </View>

        <View style={styles.ritualPanel}>
          {/* 1 Read · 2 Answer · ✦ Earn */}
          <View style={styles.stepper}>
            <View style={styles.stepItem}>
              <View style={[styles.stepBadge, { borderColor: theme.borderStrong }]}>
                <Text style={[styles.stepBadgeText, { color: theme.textDim }]}>1</Text>
              </View>
              <Text style={[styles.stepLabel, { color: theme.textDim }]}>{t('insights.stepRead')}</Text>
            </View>
            <View style={[styles.stepSep, { backgroundColor: theme.borderStrong }]} />
            <View style={styles.stepItem}>
              <View style={[styles.stepBadge, { borderColor: theme.borderStrong }]}>
                <Text style={[styles.stepBadgeText, { color: theme.textDim }]}>2</Text>
              </View>
              <Text style={[styles.stepLabel, { color: theme.textDim }]}>{t('insights.stepAnswer')}</Text>
            </View>
            <View style={[styles.stepSep, { backgroundColor: theme.borderStrong }]} />
            <View style={styles.stepItem}>
              <View style={[styles.stepBadge, { borderColor: `${theme.gold}66` }]}>
                <MaterialCommunityIcons name="star" size={rs(9)} color={theme.gold} />
              </View>
              <Text style={[styles.stepLabel, { color: theme.gold }]}>{t('insights.stepEarn')}</Text>
            </View>
          </View>

          <Text style={[styles.ritualTitle, { color: theme.text }]} numberOfLines={2}>
            {content.title}
          </Text>

          {done ? (
            <View style={[styles.doneCta, { backgroundColor: theme.surface, borderColor: theme.surfaceBorder }]}>
              <Feather name="check" size={rs(14)} color={theme.textMuted} />
              <Text style={[styles.doneCtaText, { color: theme.textMuted }]}>{t('insights.ritualDone')}</Text>
            </View>
          ) : (
            <RitualGoldCTA label={t('insights.beginRead')} isRTL={isRTL} gold={theme.gold} />
          )}
        </View>
      </GlassCard>
    );

    // Always tappable — even once done, so the user can re-open the article to review
    // their locked answer. The done card just reads as muted (heroCardDone opacity).
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={done ? 0.7 : 0.9}
        accessibilityRole="button"
        accessibilityLabel={content.title}
      >
        {card}
      </TouchableOpacity>
    );
  }

  // ── Compact (Home hook) ──────────────────────────────────────────────────
  if (compact) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.85} accessibilityRole="button">
        <GlassCard glowColor={`${accent}66`} style={styles.compactCard}>
          <View style={[styles.compactAccent, { backgroundColor: accent }]} />
          <View style={styles.compactRow}>
            <View style={[styles.compactArt, { backgroundColor: HERO_ART_BG }]}>
              <OrbitArt size={rs(58)} accent={accent} />
            </View>
            <View style={styles.compactBody}>
              <View style={styles.compactTopRow}>
                {tag}
                {rewardPill}
              </View>
              <Text style={[styles.compactTitle, { color: theme.text }]} numberOfLines={2}>
                {content.title}
              </Text>
            </View>
          </View>
        </GlassCard>
      </TouchableOpacity>
    );
  }

  // ── Default (feed hero) ──────────────────────────────────────────────────
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} accessibilityRole="button">
      <GlassCard glowColor={`${accent}59`} style={styles.heroCard}>
        <View style={[styles.heroArt, { backgroundColor: HERO_ART_BG }]}>
          <Svg style={StyleSheet.absoluteFill} width="100%" height="100%" pointerEvents="none">
            <Defs>
              <RadialGradient id="fic_bloom" cx="50%" cy="42%" r="60%">
                <Stop offset="0%" stopColor={accent} stopOpacity={0.55} />
                <Stop offset="55%" stopColor={accent} stopOpacity={0.12} />
                <Stop offset="100%" stopColor={HERO_ART_BG} stopOpacity={0} />
              </RadialGradient>
            </Defs>
            <Rect x="0" y="0" width="100%" height="100%" fill="url(#fic_bloom)" />
          </Svg>

          <View style={styles.heroArtCenter}>
            <OrbitArt size={rs(118)} accent={accent} />
          </View>

          {/* Persistent "Daily ★" badge — identifies this hero as the day's featured pick. */}
          <View
            style={[
              styles.heroDailyBadge,
              { backgroundColor: `${theme.gold}1F`, borderColor: `${theme.gold}66` },
            ]}
          >
            <MaterialCommunityIcons name="star" size={rs(11)} color={theme.gold} />
            <Text style={[styles.heroDailyBadgeText, { color: theme.gold }]}>
              {t('insights.dailyBadge')}
            </Text>
          </View>

          {rewardAvailable ? <View style={styles.heroReward}>{rewardPill}</View> : null}

          {content.subtitle ? (
            <Text style={[styles.heroSubtitle, { color: theme.text }]} numberOfLines={1}>
              {content.subtitle}
            </Text>
          ) : null}
        </View>

        <View style={styles.heroPanel}>
          {tag}
          <Text style={[styles.heroTitle, { color: theme.text }]} numberOfLines={2}>
            {content.title}
          </Text>
          {/* Claimed state — today's daily reward is done; nudge back tomorrow. */}
          {!rewardAvailable ? (
            <View style={styles.heroClaimedRow}>
              <Feather name="check" size={rs(13)} color={theme.textMuted} />
              <Text style={[styles.heroClaimedText, { color: theme.textMuted }]}>
                {t('insights.comeBackTomorrow')}
              </Text>
            </View>
          ) : null}
        </View>
      </GlassCard>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  /* shared meta row */
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: rs(5) },
  dot: { width: rs(6), height: rs(6), borderRadius: 999 },
  tagText: { fontSize: rs(10.5), fontFamily: 'HankenGrotesk_700Bold', letterSpacing: 0.6 },
  clock: { marginStart: rs(6) },
  readText: { fontSize: rs(11), fontFamily: 'HankenGrotesk_500Medium' },

  rewardPill: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: rs(9),
    paddingVertical: rs(3),
  },
  rewardText: { fontSize: rs(11), fontFamily: 'HankenGrotesk_700Bold' },

  /* hero (feed) */
  heroCard: { padding: 0 },
  heroArt: {
    height: rs(132),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroArtCenter: { alignItems: 'center', justifyContent: 'center' },
  heroReward: { position: 'absolute', top: rs(12), end: rs(12) },
  heroDailyBadge: {
    position: 'absolute',
    top: rs(12),
    start: rs(12),
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(4),
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: rs(9),
    paddingVertical: rs(3),
  },
  heroDailyBadgeText: {
    fontSize: rs(10.5),
    fontFamily: 'HankenGrotesk_700Bold',
    letterSpacing: 0.6,
  },
  heroClaimedRow: { flexDirection: 'row', alignItems: 'center', gap: rs(6) },
  heroClaimedText: { fontSize: rs(12.5), fontFamily: 'HankenGrotesk_500Medium' },
  heroSubtitle: {
    position: 'absolute',
    start: rs(16),
    bottom: rs(12),
    fontSize: rs(13),
    fontFamily: 'HankenGrotesk_500Medium',
  },
  heroPanel: { padding: rs(16), gap: rs(10) },
  heroTitle: {
    fontSize: rs(22),
    lineHeight: rs(27),
    fontFamily: 'PlayfairDisplay_700Bold',
    letterSpacing: -0.3,
  },

  /* ritual hero (Home) */
  heroCardDone: { opacity: 0.5 },
  ritualArt: {
    height: rs(86),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ritualArtTop: {
    position: 'absolute',
    top: rs(10),
    start: rs(12),
    end: rs(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  catTag: { flexDirection: 'row', alignItems: 'center', gap: rs(5) },
  ritualPanel: { paddingHorizontal: rs(16), paddingTop: rs(11), paddingBottom: rs(13), gap: rs(8) },

  /* stepper (1 Read · 2 Answer · ✦ Earn) */
  stepper: { flexDirection: 'row', alignItems: 'center', gap: rs(7) },
  stepItem: { flexDirection: 'row', alignItems: 'center', gap: rs(5) },
  stepBadge: {
    width: rs(17),
    height: rs(17),
    borderRadius: rs(9),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBadgeText: { fontSize: rs(9.5), fontFamily: 'HankenGrotesk_700Bold' },
  stepLabel: { fontSize: rs(11), fontFamily: 'HankenGrotesk_600SemiBold', letterSpacing: 0.3 },
  stepSep: { width: rs(8), height: 1 },

  ritualTitle: {
    fontSize: rs(19),
    lineHeight: rs(24),
    fontFamily: 'PlayfairDisplay_700Bold',
    letterSpacing: -0.3,
  },

  /* gold CTA */
  ctaWrap: {
    marginTop: rs(4),
    borderRadius: 999,
    shadowOpacity: 0.5,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(2) },
    elevation: 6,
  },
  ctaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: rs(8),
    height: rs(46),
    borderRadius: 999,
    overflow: 'hidden',
  },
  ctaSheen: { position: 'absolute', top: 0, left: 0, right: 0, height: '55%' },
  ctaText: { fontSize: rs(14.5), fontFamily: 'HankenGrotesk_700Bold' },

  /* done state */
  doneCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: rs(6),
    height: rs(42),
    borderRadius: 999,
    borderWidth: 1,
    marginTop: rs(4),
  },
  doneCtaText: { fontSize: rs(13.5), fontFamily: 'HankenGrotesk_600SemiBold' },

  /* compact (Home) */
  compactCard: { padding: 0 },
  compactAccent: {
    position: 'absolute',
    start: 0,
    top: 0,
    bottom: 0,
    width: rs(3),
    borderTopEndRadius: rs(3),
    borderBottomEndRadius: rs(3),
    zIndex: 2,
  },
  compactRow: { flexDirection: 'row', alignItems: 'center', gap: rs(12), padding: rs(12) },
  compactArt: {
    width: rs(72),
    height: rs(72),
    borderRadius: rs(14),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  compactBody: { flex: 1, gap: rs(7) },
  compactTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: rs(8),
  },
  compactTitle: {
    fontSize: rs(16),
    lineHeight: rs(20),
    fontFamily: 'PlayfairDisplay_700Bold',
  },
});
