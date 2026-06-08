// ─────────────────────────────────────────────────────────────────────────────
// FeaturedInsightCard — the big "TONIGHT'S READ" card.
//   • default  → tall hero used at the top of the Insights feed (10-Insight-1.png)
//   • compact  → horizontal card used as the Home "Tonight's Read" hook (10-Insight.png)
// Shows orbit art, category tag, "N min read", title, the subtitle hook, and the
// gold "+1 ✦ today" reward pill when this is today's unclaimed daily insight.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@/src/themes/ThemeProvider';
import GlassCard from '@/src/components/GlassCard';
import { type Article, type ArticleContent, CATEGORY_COLORS } from '@/src/content/articles';
import { rs } from '@/src/utils/responsive';
import OrbitArt from './OrbitArt';

export interface FeaturedInsightCardProps {
  article: Article;
  content: ArticleContent;
  /** Show the "+1 ✦ today" reward pill (today's featured + not yet claimed). */
  rewardAvailable?: boolean;
  /** Horizontal Home-hook layout instead of the tall feed hero. */
  compact?: boolean;
  onPress: () => void;
}

const HERO_ART_BG = '#241733';

export default function FeaturedInsightCard({
  article,
  content,
  rewardAvailable = false,
  compact = false,
  onPress,
}: FeaturedInsightCardProps) {
  const theme = useTheme();
  const { t } = useTranslation();
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
        </View>
      </GlassCard>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  /* shared meta row */
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: rs(5) },
  dot: { width: rs(6), height: rs(6), borderRadius: 999 },
  tagText: { fontSize: rs(10.5), fontFamily: 'Inter_700Bold', letterSpacing: 0.6 },
  clock: { marginLeft: rs(6) },
  readText: { fontSize: rs(11), fontFamily: 'Inter_500Medium' },

  rewardPill: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: rs(9),
    paddingVertical: rs(3),
  },
  rewardText: { fontSize: rs(11), fontFamily: 'Inter_700Bold' },

  /* hero (feed) */
  heroCard: { padding: 0 },
  heroArt: {
    height: rs(132),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroArtCenter: { alignItems: 'center', justifyContent: 'center' },
  heroReward: { position: 'absolute', top: rs(12), right: rs(12) },
  heroSubtitle: {
    position: 'absolute',
    left: rs(16),
    bottom: rs(12),
    fontSize: rs(13),
    fontFamily: 'Inter_500Medium',
  },
  heroPanel: { padding: rs(16), gap: rs(10) },
  heroTitle: {
    fontSize: rs(22),
    lineHeight: rs(27),
    fontFamily: 'PlayfairDisplay_700Bold',
    letterSpacing: -0.3,
  },

  /* compact (Home) */
  compactCard: { padding: 0 },
  compactAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: rs(3),
    borderTopRightRadius: rs(3),
    borderBottomRightRadius: rs(3),
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
