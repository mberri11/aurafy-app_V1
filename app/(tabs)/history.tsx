// ─────────────────────────────────────────────────────────────────────────────
// History ("Your Readings") — DESIGN-SPEC §7 + Screenshots_new/HIstory_*.png.
// Category-themed reading cards (accent + motif from the category spine), a
// distinct cyan "Weekly reading" entry, a sponsored placeholder, and an atom-mark
// empty state. Reading + weekly entries merge into one date-sorted timeline.
// ─────────────────────────────────────────────────────────────────────────────

import React, { memo, useCallback, useMemo } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppText as Text } from '@/src/components/AppText';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

import { useUserStore, WeeklyHistoryEntry } from '@/src/store/userStore';
import { useReadingStore } from '@/src/store/readingStore';
import { useTheme } from '@/src/themes/ThemeProvider';
import { moduleTheme } from '@/src/themes/categoryTheme';
import { readingDisplayName } from '@/src/utils/readingDisplay';
import { getWeekById } from '@/src/data/weeks';
import { Language, Reading } from '@/src/types';
import GradientButton from '@/src/components/GradientButton';
import CategoryMotif from '@/src/components/CategoryMotif';
import CosmicBloom from '@/src/components/CosmicBloom';
import AurafyLogo from '@/src/components/AurafyLogo';
import { rs } from '@/src/utils/responsive';

const WEEKLY_CYAN = '#22D3EE'; // weekly entries use a constant brand-cyan treatment (spec §7)

// ── Reading card (category-themed) ───────────────────────────────────────────
const ReadingHistoryCard = memo(function ReadingHistoryCard({
  reading,
  gid,
  onPress,
}: {
  reading: Reading;
  gid: string;
  onPress: () => void;
}) {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Language;

  // Per-MODULE theme — two modules in the same category still read distinct.
  const { accent } = moduleTheme(reading.moduleId);
  const name = readingDisplayName(reading, lang);
  const moduleLabel = (t(`modules.${reading.moduleId}.title`) || reading.moduleId).toUpperCase();
  const modeLabel = t(`readingModes.${reading.mode}.title`);
  const confLine = t('history.confidenceLine', { pct: reading.result.confidence });
  const date = dayjs(reading.createdAt).format('MMM D, YYYY');

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${name} — ${moduleLabel}, ${date}`}
    >
      <View style={[styles.card, { borderColor: `${accent}33`, backgroundColor: theme.surface }]}>
        {/* Soft category bloom rising from behind the icon. */}
        <Svg pointerEvents="none" style={StyleSheet.absoluteFill} width="100%" height="100%">
          <Defs>
            <RadialGradient id={gid} cx="13%" cy="50%" r="58%">
              <Stop offset="0%" stopColor={accent} stopOpacity={0.2} />
              <Stop offset="100%" stopColor={accent} stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill={`url(#${gid})`} />
        </Svg>
        {/* Glowing left-edge accent bar. */}
        <View style={[styles.leftBar, { backgroundColor: accent }]} />

        <View style={styles.cardRow}>
          <View style={[styles.tile, { backgroundColor: `${accent}1A`, borderColor: `${accent}40` }]}>
            <CategoryMotif moduleId={reading.moduleId} size={rs(26)} />
          </View>
          <View style={styles.cardContent}>
            <View style={styles.eyebrowRow}>
              <View style={[styles.dot, { backgroundColor: accent }]} />
              <Text style={[styles.eyebrow, { color: theme.textMuted }]} numberOfLines={1}>
                {moduleLabel}
              </Text>
            </View>
            <Text style={styles.titleLine} numberOfLines={1}>
              <Text style={[styles.name, { color: theme.text }]}>{name}</Text>
              <Text style={[styles.conf, { color: theme.textMuted }]}>{` — ${confLine}`}</Text>
            </Text>
            <View style={styles.metaRow}>
              <View style={[styles.modePill, { borderColor: theme.surfaceBorder }]}>
                <Text style={[styles.modeText, { color: theme.textMuted }]}>{modeLabel}</Text>
              </View>
              <Text style={[styles.date, { color: theme.textDim }]}>{date}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});

// ── Weekly card (distinct cyan/brand treatment) ──────────────────────────────
const WeeklyHistoryCard = memo(function WeeklyHistoryCard({
  entry,
  gid,
}: {
  entry: WeeklyHistoryEntry;
  gid: string;
}) {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Language;

  const week = getWeekById(entry.weekId);
  const outcome = week?.outcomes.find((o) => o.key === entry.outcomeKey);
  const title = outcome ? outcome.title[lang] ?? outcome.title.en : '';
  const meta = t('history.nights', { count: 7, date: dayjs(entry.rangeEnd).format('MMM D, YYYY') });

  return (
    <View style={[styles.card, { borderColor: `${WEEKLY_CYAN}40`, backgroundColor: theme.surface }]}>
      <Svg pointerEvents="none" style={StyleSheet.absoluteFill} width="100%" height="100%">
        <Defs>
          <RadialGradient id={gid} cx="22%" cy="0%" r="75%">
            <Stop offset="0%" stopColor={WEEKLY_CYAN} stopOpacity={0.18} />
            <Stop offset="100%" stopColor={WEEKLY_CYAN} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill={`url(#${gid})`} />
      </Svg>
      <View style={[styles.leftBar, { backgroundColor: WEEKLY_CYAN }]} />

      {/* 7-DAY badge, pinned top-right. */}
      <View style={[styles.badge, { borderColor: `${WEEKLY_CYAN}80` }]}>
        <Text style={[styles.badgeText, { color: WEEKLY_CYAN }]}>{t('history.sevenDayBadge').toUpperCase()}</Text>
      </View>

      <View style={styles.cardRow}>
        <View style={[styles.tile, { backgroundColor: `${WEEKLY_CYAN}1A`, borderColor: `${WEEKLY_CYAN}55` }]}>
          <MaterialCommunityIcons name="orbit" size={rs(26)} color={WEEKLY_CYAN} />
        </View>
        <View style={styles.cardContent}>
          <Text style={[styles.eyebrow, { color: WEEKLY_CYAN }]} numberOfLines={1}>
            {t('history.weeklyEyebrow').toUpperCase()}
          </Text>
          <Text style={[styles.name, { color: theme.text }]} numberOfLines={1}>
            {title}
          </Text>
          <Text style={[styles.date, { color: theme.textMuted, marginTop: rs(3) }]} numberOfLines={1}>
            {meta}
          </Text>
        </View>
      </View>
    </View>
  );
});

// ── Sponsored placeholder (online-only native ad slot) ───────────────────────
function SponsoredCard() {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <View style={[styles.sponsored, { borderColor: theme.surfaceBorder }]}>
      <View style={[styles.adChip, { borderColor: theme.surfaceBorder }]}>
        <Text style={[styles.adChipText, { color: theme.textDim }]}>AD</Text>
      </View>
      <Text style={[styles.sponsoredText, { color: theme.textDim }]}>{t('history.sponsored')}</Text>
    </View>
  );
}

// ── Empty state (atom mark + bloom + CTA) ────────────────────────────────────
function EmptyState() {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <View style={styles.emptyContainer}>
      <View style={styles.atomWrap}>
        <Svg pointerEvents="none" style={StyleSheet.absoluteFill} width="100%" height="100%">
          <Defs>
            <RadialGradient id="hist_empty_bloom" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="#A855F7" stopOpacity={0.28} />
              <Stop offset="55%" stopColor="#22D3EE" stopOpacity={0.08} />
              <Stop offset="100%" stopColor="#22D3EE" stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#hist_empty_bloom)" />
        </Svg>
        <AurafyLogo size={rs(116)} />
      </View>
      <Text style={[styles.emptyTitle, { color: theme.text }]}>{t('history.emptyTitle')}</Text>
      <Text style={[styles.emptyMessage, { color: theme.textMuted }]}>{t('history.emptyMessage')}</Text>
      <GradientButton label={t('history.ctaButton')} onPress={() => router.push('/(tabs)')} style={styles.emptyCta} />
    </View>
  );
}

// ── Screen ───────────────────────────────────────────────────────────────────
type Row =
  | { kind: 'reading'; createdAt: number; reading: Reading }
  | { kind: 'weekly'; createdAt: number; entry: WeeklyHistoryEntry };

export default function HistoryScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const history = useUserStore((s) => s.history);
  const weeklyHistory = useUserStore((s) => s.weeklyHistory);
  const setViewOnlyResult = useReadingStore((s) => s.setViewOnlyResult);

  const rows = useMemo<Row[]>(() => {
    const readings: Row[] = history.map((reading) => ({ kind: 'reading', createdAt: reading.createdAt, reading }));
    const weeks: Row[] = weeklyHistory.map((entry) => ({ kind: 'weekly', createdAt: entry.createdAt, entry }));
    return [...readings, ...weeks].sort((a, b) => b.createdAt - a.createdAt);
  }, [history, weeklyHistory]);

  const handleReadingPress = useCallback(
    (reading: Reading) => {
      setViewOnlyResult(reading.result);
      router.push({ pathname: '/result', params: { viewOnly: '1' } });
    },
    [setViewOnlyResult],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: Row; index: number }) =>
      item.kind === 'weekly' ? (
        <WeeklyHistoryCard entry={item.entry} gid={`hw${index}`} />
      ) : (
        <ReadingHistoryCard
          reading={item.reading}
          gid={`hr${index}`}
          onPress={() => handleReadingPress(item.reading)}
        />
      ),
    [handleReadingPress],
  );

  return (
    <View style={styles.container}>
      {/* Transparent container + top bloom so the app-root CosmicField (indigo→navy)
          shows through, matching Home/Stars/Settings — not a flat black field. */}
      <CosmicBloom cx="50%" cy="8%" r="62%" />
      <FlatList
        data={rows}
        renderItem={renderItem}
        keyExtractor={(item) => (item.kind === 'weekly' ? item.entry.id : item.reading.id)}
        contentContainerStyle={[
          styles.list,
          { paddingTop: insets.top + rs(12), paddingBottom: insets.bottom + rs(100) },
        ]}
        ListHeaderComponent={<Text style={[styles.screenTitle, { color: theme.text }]}>{t('history.title')}</Text>}
        ListEmptyComponent={<EmptyState />}
        ListFooterComponent={<SponsoredCard />}
        showsVerticalScrollIndicator={false}
        scrollEnabled={rows.length > 0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { paddingHorizontal: rs(20), gap: rs(12), flexGrow: 1 },
  screenTitle: { fontSize: rs(32), fontFamily: 'PlayfairDisplay_700Bold', marginBottom: rs(16) },

  // Cards (shared shell)
  card: {
    borderRadius: rs(18),
    borderWidth: 1,
    padding: rs(14),
    overflow: 'hidden',
  },
  leftBar: { position: 'absolute', left: 0, top: 0, bottom: 0, width: rs(3) },
  cardRow: { flexDirection: 'row', alignItems: 'center', gap: rs(14) },
  tile: {
    width: rs(52),
    height: rs(52),
    borderRadius: rs(14),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: { flex: 1, gap: rs(3) },
  eyebrowRow: { flexDirection: 'row', alignItems: 'center', gap: rs(6) },
  dot: { width: rs(6), height: rs(6), borderRadius: rs(3) },
  eyebrow: { fontSize: rs(10.5), fontFamily: 'HankenGrotesk_700Bold', letterSpacing: 1.2 },
  titleLine: {},
  name: { fontSize: rs(18), fontFamily: 'PlayfairDisplay_700Bold' },
  conf: { fontSize: rs(12.5), fontFamily: 'HankenGrotesk_400Regular' },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: rs(8), marginTop: rs(3) },
  modePill: { paddingHorizontal: rs(8), paddingVertical: rs(3), borderRadius: rs(7), borderWidth: 1 },
  modeText: { fontSize: rs(10.5), fontFamily: 'HankenGrotesk_600SemiBold' },
  date: { fontSize: rs(12), fontFamily: 'HankenGrotesk_400Regular' },

  // Weekly extras
  badge: {
    position: 'absolute',
    top: rs(12),
    right: rs(12),
    paddingHorizontal: rs(8),
    paddingVertical: rs(3),
    borderRadius: 999,
    borderWidth: 1,
  },
  badgeText: { fontSize: rs(9.5), fontFamily: 'HankenGrotesk_700Bold', letterSpacing: 1 },

  // Sponsored
  sponsored: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: rs(8),
    height: rs(56),
    borderRadius: rs(14),
    borderWidth: 1,
    marginTop: rs(4),
  },
  adChip: { paddingHorizontal: rs(6), paddingVertical: rs(2), borderRadius: rs(5), borderWidth: 1 },
  adChipText: { fontSize: rs(9), fontFamily: 'HankenGrotesk_700Bold', letterSpacing: 1 },
  sponsoredText: { fontSize: rs(13), fontFamily: 'HankenGrotesk_400Regular' },

  // Empty state
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: rs(14), paddingBottom: rs(24) },
  atomWrap: { width: rs(160), height: rs(160), alignItems: 'center', justifyContent: 'center', marginBottom: rs(8) },
  emptyTitle: { fontSize: rs(24), fontFamily: 'PlayfairDisplay_700Bold', textAlign: 'center' },
  emptyMessage: {
    fontSize: rs(14),
    fontFamily: 'HankenGrotesk_400Regular',
    textAlign: 'center',
    lineHeight: rs(20),
    paddingHorizontal: rs(16),
  },
  emptyCta: { marginTop: rs(10), minWidth: rs(200) },
});
