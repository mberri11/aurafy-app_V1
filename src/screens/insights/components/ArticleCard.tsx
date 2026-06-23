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
import { useIsRTL } from '@/src/utils/rtl';
import OrbitArt from './OrbitArt';

export interface ArticleCardProps {
  article: Article;
  /** Localized content; optional for the sponsored placeholder. */
  content?: ArticleContent;
  /** Filled dot when the article hasn't been read yet. */
  unread?: boolean;
  onPress: () => void;
}

const THUMB_BG = '#1B1330';

export default function ArticleCard({ article, content, unread, onPress }: ArticleCardProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const isRTL = useIsRTL();
  const accent = CATEGORY_COLORS[article.category];

  // ── Sponsored native-ad variant ──────────────────────────────────────────
  if (article.sponsored) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.85} accessibilityRole="button">
        <GlassCard glowColor={`${accent}40`} style={styles.card}>
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
            <View style={styles.metaRow}>
              <View style={[styles.brandPill, { borderColor: theme.surfaceBorder }]}>
                <Text style={[styles.brandText, { color: theme.textMuted }]}>
                  {t('insights.sponsoredBrand')}
                </Text>
              </View>
              <View style={styles.openRow}>
                <Text style={[styles.openText, { color: theme.text }]}>{t('insights.open')}</Text>
                <Feather name={isRTL ? 'chevron-left' : 'chevron-right'} size={rs(13)} color={theme.text} />
              </View>
            </View>
          </View>
        </GlassCard>
      </TouchableOpacity>
    );
  }

  // ── Standard article row ──────────────────────────────────────────────────
  const catLabel = t(`insights.categories.${article.category}`).toUpperCase();
  const minLabel = t('insights.min', { n: article.readMinutes });

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} accessibilityRole="button">
      <GlassCard glowColor={`${accent}33`} style={styles.card}>
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(12),
    padding: rs(12),
    marginBottom: rs(12),
    overflow: 'hidden',
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
  tagText: { fontSize: rs(10), fontFamily: 'Inter_700Bold', letterSpacing: 0.6 },
  clock: { marginStart: rs(6) },
  readText: { fontSize: rs(11), fontFamily: 'Inter_500Medium' },
  unreadDot: {
    position: 'absolute',
    top: rs(12),
    end: rs(12),
    width: rs(8),
    height: rs(8),
    borderRadius: 999,
  },

  /* sponsored */
  sponsoredLabel: { fontSize: rs(9), fontFamily: 'Inter_700Bold', letterSpacing: 1 },
  brandPill: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: rs(8),
    paddingVertical: rs(2),
  },
  brandText: { fontSize: rs(10.5), fontFamily: 'Inter_500Medium' },
  openRow: { flexDirection: 'row', alignItems: 'center', gap: rs(1) },
  openText: { fontSize: rs(12), fontFamily: 'Inter_600SemiBold' },
});
