// ─────────────────────────────────────────────────────────────────────────────
// ArticleCard — a row in the "LATEST" feed list (10-Insight-1 / 10-Insight-2).
// Left orbit thumbnail + title + category tag + "N min" + unread dot.
// When `article.sponsored`, renders the "SPONSORED" native-ad variant instead
// (label + brand pill + "Open ›") — placeholder until real AdMob native (Phase 4).
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppText as Text } from '@/src/components/AppText';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@/src/themes/ThemeProvider';
import GlassCard from '@/src/components/GlassCard';
import { type Article, type ArticleContent, CATEGORY_COLORS } from '@/src/content/articles';
import { rs } from '@/src/utils/responsive';
import OrbitArt from './OrbitArt';

export interface ArticleCardProps {
  article: Article;
  /** Localized content; optional for the sponsored placeholder. */
  content?: ArticleContent;
  /** Filled dot when the article hasn't been read yet. */
  unread?: boolean;
  /** Omitted for the sponsored placeholder — that card is not tappable until a
   *  real AdMob native ad backs it (Phase 4). */
  onPress?: () => void;
}

const THUMB_BG = '#1B1330';

export default function ArticleCard({ article, content, unread, onPress }: ArticleCardProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const accent = CATEGORY_COLORS[article.category];

  // ── Sponsored native-ad variant ──────────────────────────────────────────
  // Deliberately NOT tappable: the placeholder has nothing to open, and a dead
  // press reads as broken. Phase 4 wraps this in the real native-ad touchable.
  if (article.sponsored) {
    return (
      <GlassCard glowColor={`${accent}40`} style={styles.card} contentStyle={styles.cardContent}>
        <View style={[styles.thumb, { backgroundColor: THUMB_BG }]}>
          <OrbitArt size={rs(46)} accent={accent} />
        </View>
        <View style={styles.body}>
          <Text style={[styles.sponsoredLabel, { color: theme.textDim }]}>
            {t('insights.sponsored')}
          </Text>
          <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
            {t('insights.sponsoredTitle')}
          </Text>
          {/* No "Open ›" until Phase 4 backs this with a real native ad — the card
              is inert, so nothing may promise an action. The row keeps the same
              height via the brand pill, so the live ad won't cause a layout jump. */}
          <View style={styles.metaRow}>
            <View style={[styles.brandPill, { borderColor: theme.surfaceBorder }]}>
              <Text style={[styles.brandText, { color: theme.textMuted }]}>
                {t('insights.sponsoredBrand')}
              </Text>
            </View>
          </View>
        </View>
      </GlassCard>
    );
  }

  // ── Standard article row ──────────────────────────────────────────────────
  const catLabel = t(`insights.categories.${article.category}`).toUpperCase();
  const minLabel = t('insights.min', { n: article.readMinutes });

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} accessibilityRole="button">
      <GlassCard glowColor={`${accent}33`} style={styles.card} contentStyle={styles.cardContent}>
        {/* per-category accent line on the leading edge */}
        <View style={[styles.accent, { backgroundColor: accent }]} />
        <View style={[styles.thumb, { backgroundColor: THUMB_BG }]}>
          <OrbitArt size={rs(48)} accent={accent} />
        </View>
        <View style={styles.body}>
          <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
            {content?.title ?? article.id}
          </Text>
          <View style={styles.metaRow}>
            <View style={[styles.dot, { backgroundColor: accent }]} />
            <Text style={[styles.tagText, { color: accent }]}>{catLabel}</Text>
            <Feather name="clock" size={rs(11)} color={theme.textMuted} style={styles.clock} />
            <Text style={[styles.readText, { color: theme.textMuted }]}>{minLabel}</Text>
          </View>
        </View>
        {unread ? <View style={[styles.unreadDot, { backgroundColor: accent }]} /> : null}
      </GlassCard>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Outer chrome vs content: the row layout must ride GlassCard's contentStyle —
  // on `style` it lands on the outer chrome View and never reaches the children
  // (the thumbnail stacked above the title instead of beside it).
  card: { marginBottom: rs(12) },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(12),
    padding: rs(12),
  },
  accent: {
    position: 'absolute',
    start: 0,
    top: 0,
    bottom: 0,
    width: rs(3),
    borderTopEndRadius: rs(3),
    borderBottomEndRadius: rs(3),
  },
  thumb: {
    width: rs(64),
    height: rs(64),
    borderRadius: rs(14),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  body: { flex: 1, gap: rs(7) },
  title: {
    fontSize: rs(15),
    lineHeight: rs(19),
    fontFamily: 'PlayfairDisplay_700Bold',
  },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: rs(5) },
  dot: { width: rs(6), height: rs(6), borderRadius: 999 },
  tagText: { fontSize: rs(10), fontFamily: 'HankenGrotesk_700Bold', letterSpacing: 0.6 },
  clock: { marginStart: rs(6) },
  readText: { fontSize: rs(11), fontFamily: 'HankenGrotesk_500Medium' },
  unreadDot: {
    position: 'absolute',
    top: rs(12),
    end: rs(12),
    width: rs(8),
    height: rs(8),
    borderRadius: 999,
  },

  /* sponsored */
  sponsoredLabel: { fontSize: rs(9), fontFamily: 'HankenGrotesk_700Bold', letterSpacing: 1 },
  brandPill: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: rs(8),
    paddingVertical: rs(2),
  },
  brandText: { fontSize: rs(10.5), fontFamily: 'HankenGrotesk_500Medium' },
});
