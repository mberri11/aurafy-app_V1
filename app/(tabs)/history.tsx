// ─────────────────────────────────────────────────────────────────────────────
// History ("Your Readings") — DESIGN-SPEC §7 + Screenshots_new/HIstory_*.png.
// Category-themed reading cards (accent + motif from the category spine), a
// distinct cyan "Weekly reading" entry, and an atom-mark empty state. Reading +
// weekly entries merge into one date-sorted timeline. The screen carries NO banner
// of its own — the app's one banner is persistent above the tab bar.
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
import { auraOutcomeTheme, moduleTheme } from '@/src/themes/categoryTheme';
import { readingDisplayName } from '@/src/utils/readingDisplay';
import { getWeekById } from '@/src/data/weeks';
import { Language, Reading } from '@/src/types';
import GradientButton from '@/src/components/GradientButton';
import CategoryMotif from '@/src/components/CategoryMotif';
import CosmicBloom from '@/src/components/CosmicBloom';
import AurafyLogo from '@/src/components/AurafyLogo';
import { PERSISTENT_BANNER_RESERVE } from '@/src/components/PersistentBanner';
import { useIsRTL } from '@/src/utils/rtl';
import { rs } from '@/src/utils/responsive';

const WEEKLY_CYAN = '#22D3EE'; // weekly entries use a constant brand-cyan treatment (spec §7)

// ── Reading card (category-themed) ───────────────────────────────────────────
const ReadingHistoryCard = memo(function ReadingHistoryCard({
  reading,
  onPress,
}: {
  reading: Reading;
  onPress: () => void;
}) {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Language;
  const isRTL = useIsRTL();

  // Per-MODULE theme — two modules in the same category still read distinct.
  // Aura Color alone re-colors per past reading: the accent is the outcome color.
  const { accent } = reading.moduleId === 'aura_color'
    ? auraOutcomeTheme(reading.result.dominantDimension)
    : moduleTheme(reading.moduleId);
  const name = readingDisplayName(reading, lang);
  const moduleLabel = (t(`modules.${reading.moduleId}.title`) || reading.moduleId).toUpperCase();
  const modeLabel = t(`readingModes.${reading.mode}.title`);
  // One localized line ("{name} — {pct}% confidence") so each locale controls the
  // separator and word order (Arabic: "… — ثقة ٪…"). Split on the interpolated name
  // to keep the name emphasized (serif/bright) without any hardcoded " — ".
  // Count readings (a relationship module read solo — signalTotal is set) never claimed
  // confidence-in-a-verdict, so History matches the result screen's "signal" language.
  const isCountReading = reading.result.signalTotal != null;
  const titleLine = t(isCountReading ? 'history.titleLineSignal' : 'history.titleLine', {
    name,
    pct: reading.result.confidence,
  });
  const nameAt = titleLine.indexOf(name);
  const beforeName = nameAt >= 0 ? titleLine.slice(0, nameAt) : '';
  const afterName = nameAt >= 0 ? titleLine.slice(nameAt + name.length) : '';
  const date = dayjs(reading.createdAt).format('ll');

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${name} — ${moduleLabel}, ${date}`}
    >
      <View style={[styles.card, { borderColor: `${accent}59`, backgroundColor: theme.surface }]}>
        {/* ONE flat accent wash over the whole card — a uniform tint on every pixel, so the
            right side and bottom read exactly as coloured as the icon side (no one-sided
            bloom that leaves the far corners dark). */}
        <View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: `${accent}1F` }]} />
        {/* Small soft accent glow hugging the icon side — the little colored halo near the
            module icon (kept from the earlier design), layered gently over the even wash. */}
        <Svg pointerEvents="none" style={StyleSheet.absoluteFill} width="100%" height="100%">
          <Defs>
            <RadialGradient id={`hg-${reading.id}`} cx={isRTL ? '86%' : '14%'} cy="50%" r="30%">
              <Stop offset="0%" stopColor={accent} stopOpacity={0.4} />
              <Stop offset="100%" stopColor={accent} stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill={`url(#hg-${reading.id})`} />
        </Svg>
        {/* Glowing left-edge accent bar. */}
        <View style={[styles.leftBar, { backgroundColor: accent }]} />

        <View style={styles.cardRow}>
          <View style={[styles.tile, { backgroundColor: `${accent}26`, borderColor: `${accent}55` }]}>
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
              <Text style={[styles.conf, { color: theme.textMuted }]}>{beforeName}</Text>
              <Text style={[styles.name, { color: theme.text }]}>{name}</Text>
              <Text style={[styles.conf, { color: theme.textMuted }]}>{afterName}</Text>
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
  onPress,
}: {
  entry: WeeklyHistoryEntry;
  onPress: () => void;
}) {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Language;

  const week = getWeekById(entry.weekId);
  const outcome = week?.outcomes.find((o) => o.key === entry.outcomeKey);
  const title = outcome ? outcome.title[lang] ?? outcome.title.en : '';
  const meta = t('history.nights', { count: 7, date: dayjs(entry.rangeEnd).format('ll') });

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title} — ${t('history.weeklyEyebrow')}`}
    >
      <View style={[styles.card, { borderColor: `${WEEKLY_CYAN}40`, backgroundColor: theme.surface }]}>
        {/* Flat weekly-cyan wash over the whole card — uniform, corner to corner. */}
        <View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: `${WEEKLY_CYAN}1F` }]} />
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
    </TouchableOpacity>
  );
});

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

  // Weekly entries reopen the reveal read-only (no re-claim, no chime) — the
  // outcome re-resolves from the persisted weekId + outcomeKey, so any past
  // entry reopens, not just the latest cycle's.
  const handleWeeklyPress = useCallback((entry: WeeklyHistoryEntry) => {
    router.push({
      pathname: '/weekly-result',
      params: { viewOnly: '1', weekId: entry.weekId, outcomeKey: entry.outcomeKey },
    });
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Row }) =>
      item.kind === 'weekly' ? (
        <WeeklyHistoryCard entry={item.entry} onPress={() => handleWeeklyPress(item.entry)} />
      ) : (
        <ReadingHistoryCard reading={item.reading} onPress={() => handleReadingPress(item.reading)} />
      ),
    [handleReadingPress, handleWeeklyPress],
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
        // No in-list banner any more: the ad is the persistent one above the tab bar
        // (app/(tabs)/_layout.tsx). We only reserve room so the last reading can
        // scroll clear of it.
        contentContainerStyle={[
          styles.list,
          {
            paddingTop: insets.top + rs(12),
            paddingBottom: insets.bottom + rs(100) + PERSISTENT_BANNER_RESERVE,
          },
        ]}
        ListHeaderComponent={<Text style={[styles.screenTitle, { color: theme.text }]}>{t('history.title')}</Text>}
        ListEmptyComponent={<EmptyState />}
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
  // `start` (not `left`) so the accent bar follows the icon side — physical left in
  // LTR, physical right in RTL — auto-mirrored by the native layout.
  leftBar: { position: 'absolute', start: 0, top: 0, bottom: 0, width: rs(4) },
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
  // Explicit lineHeight on EVERY card text line: without it, Arabic (Noto Naskh) uses
  // its tall intrinsic line box (~1.8×) and the whole card grows well past the EN
  // version. Pinning to EN's natural height keeps all four locales the same size.
  eyebrow: { fontSize: rs(10.5), lineHeight: rs(15), fontFamily: 'HankenGrotesk_700Bold', letterSpacing: 1.2 },
  titleLine: { lineHeight: rs(24) },
  name: { fontSize: rs(18), lineHeight: rs(24), fontFamily: 'PlayfairDisplay_700Bold' },
  conf: { fontSize: rs(12.5), lineHeight: rs(24), fontFamily: 'HankenGrotesk_400Regular' },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: rs(8), marginTop: rs(3) },
  modePill: { paddingHorizontal: rs(8), paddingVertical: rs(3), borderRadius: rs(7), borderWidth: 1 },
  modeText: { fontSize: rs(10.5), lineHeight: rs(15), fontFamily: 'HankenGrotesk_600SemiBold' },
  date: { fontSize: rs(12), lineHeight: rs(16), fontFamily: 'HankenGrotesk_400Regular' },

  // Weekly extras
  badge: {
    position: 'absolute',
    top: rs(12),
    // `end` so the 7-DAY badge pins top-right in LTR and top-left in RTL.
    end: rs(12),
    paddingHorizontal: rs(8),
    paddingVertical: rs(3),
    borderRadius: 999,
    borderWidth: 1,
  },
  badgeText: { fontSize: rs(9.5), fontFamily: 'HankenGrotesk_700Bold', letterSpacing: 1 },

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
