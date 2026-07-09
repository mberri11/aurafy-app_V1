// ─────────────────────────────────────────────────────────────────────────────
// C-10 DEV PANEL — TEST-ONLY (remove before production).
//
// Drives the daily ritual + FORGIVING streak with a SIMULATED clock so the full weekly
// loop can be walked in one sitting without waiting real days. "Advance N days" shifts a
// local sim offset; "Complete ritual" calls completeDailyRitual(answer A, simDate) — both
// the localDateKey gate and the anchor day-count read that simDate, so each simulated day
// is internally consistent and gets its own answer record.
//
// Scenarios to walk: 7 completions → the day-7 reveal (Complete the 7th → weeklyResult goes
// PENDING → Claim / Show reveal). Skip days between completions and confirm the streak HOLDS
// (forgiving — never resets) and still reveals on the 7th answer.
//
// Reached from Settings → Developer (only rendered when __DEV__).
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppText as Text } from '@/src/components/AppText';
import { Redirect, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

import { useUserStore } from '@/src/store/userStore';
import { useTheme } from '@/src/themes/ThemeProvider';
import { localDateKey } from '@/src/content/articles/dailyInsight';
import {
  getDayIndex,
  getDaysSinceAnchor,
  getActiveWeek,
  getActiveWeekIndex,
  getTodayPairing,
  getTodayOutcomeKey,
} from '@/src/data/weeks/walker';
import { sendTestNotification } from '@/src/utils/notifications';
import { rs } from '@/src/utils/responsive';
import { ADS_AVAILABLE } from '@/src/ads/adsRuntime';
import { useInterstitialAd } from '@/src/ads/useInterstitialAd';
import { useRewardedAd } from '@/src/ads/useRewardedAd';
import AdBanner from '@/src/ads/AdBanner';

const DAY_MS = 86_400_000;
const fmtDate = (ms: number | null) => (ms === null ? '—' : new Date(ms).toISOString().slice(0, 10));

export default function DevPanelScreen() {
  // Production guard — expo-router auto-registers this route file in EVERY build
  // (including the aurafy://dev-panel deep link), so the __DEV__-gated Settings row
  // alone is not enough. __DEV__ is a compile-time constant, so this early return
  // is invariant per build and can never reorder the hooks below.
  if (!__DEV__) return <Redirect href="/(tabs)" />;

  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const weekAnchorDate = useUserStore((s) => s.weekAnchorDate);
  const streak = useUserStore((s) => s.streak);
  const stars = useUserStore((s) => s.stars);
  const weeklyResult = useUserStore((s) => s.weeklyResult);
  const dailyAnswers = useUserStore((s) => s.dailyAnswers);
  const completeDailyRitual = useUserStore((s) => s.completeDailyRitual);
  const claimWeeklyResult = useUserStore((s) => s.claimWeeklyResult);

  // Simulated clock: real now + offsetDays. Drives every machine computation below.
  const [offsetDays, setOffsetDays] = useState(0);
  const simDate = new Date(Date.now() + offsetDays * DAY_MS);

  // ── Ad test harness (Step 4) — hooks preload on mount; buttons show on demand. ──
  const interstitial = useInterstitialAd();
  const rewarded = useRewardedAd();
  const [showBanner, setShowBanner] = useState(false);

  const notReadyMsg = ADS_AVAILABLE
    ? 'Not loaded yet — wait a second and try again.'
    : 'Ads need a dev/EAS build — they never load in Expo Go.';

  const onShowInterstitial = () => {
    const shown = interstitial.showAd(() => Alert.alert('Interstitial', 'Ad closed.'));
    if (!shown) Alert.alert('Interstitial', notReadyMsg);
  };
  const onShowRewarded = () => {
    const shown = rewarded.showAd((reward) =>
      Alert.alert(
        'Rewarded',
        `Reward earned${reward ? `: ${reward.amount} ${reward.type}` : ''} — no Stars credited in this test harness.`,
      ),
    );
    if (!shown) Alert.alert('Rewarded', notReadyMsg);
  };

  const daysSince = getDaysSinceAnchor(weekAnchorDate, simDate);
  const dayIndex = getDayIndex(weekAnchorDate, simDate);
  const weekIdx = getActiveWeekIndex(weekAnchorDate, simDate);
  const pairing = getTodayPairing(weekAnchorDate, simDate);
  const todayKey = localDateKey(simDate);
  const doneToday = dailyAnswers.some((a) => a.date === todayKey);

  const onComplete = () => {
    if (!pairing) return;
    const dim = getTodayOutcomeKey(pairing.questionId, 0, weekAnchorDate, simDate) ?? pairing.questionId;
    completeDailyRitual({ questionId: pairing.questionId, answerIndex: 0, dimension: dim }, simDate);
  };

  const resetRitual = () => {
    useUserStore.setState({
      streak: 0,
      dailyAnswers: [],
      weekAnchorDate: null,
      weeklyResult: null,
      lastDailyClaim: null,
      lastDailyQuestion: null,
    });
    setOffsetDays(0);
  };

  const onTestNotification = async () => {
    const res = await sendTestNotification();
    if (res.ok) {
      Alert.alert('Notification scheduled', 'A test notification fires in ~3s. Background the app to see the banner.');
    } else if (res.reason === 'permission-denied') {
      Alert.alert('Permission needed', 'Enable notifications for Aurafy in system settings, then try again.');
    } else {
      Alert.alert(
        'Not available',
        'The expo-notifications native module is missing — rebuild the dev client (EAS) after installing it, then retry.',
      );
    }
  };

  const setStars = (n: number) => useUserStore.setState({ stars: n });

  // Show the reveal on demand: if no result is pending (e.g. you didn't walk a full week),
  // seed one from the active week's first outcome so the screen is viewable immediately.
  const onShowReveal = () => {
    const current = useUserStore.getState().weeklyResult;
    if (!current || current.claimedAt !== 0) {
      const week = getActiveWeek(weekAnchorDate, simDate);
      if (week) {
        useUserStore.setState({
          weeklyResult: { weekId: week.id, outcomeKey: week.outcomes[0]?.key ?? '', claimedAt: 0 },
        });
      }
    }
    router.push('/weekly-result');
  };

  const weeklyStr = !weeklyResult
    ? 'none'
    : weeklyResult.claimedAt === 0
      ? `PENDING · ${weeklyResult.weekId} → ${weeklyResult.outcomeKey}`
      : `claimed · ${weeklyResult.outcomeKey}`;

  const Stat = ({ k, v, accent }: { k: string; v: string; accent?: boolean }) => (
    <View style={[styles.statRow, { borderColor: theme.surfaceBorder }]}>
      <Text style={[styles.statK, { color: theme.textMuted }]}>{k}</Text>
      <Text style={[styles.statV, { color: accent ? theme.gold : theme.text }]}>{v}</Text>
    </View>
  );

  const Btn = ({
    label,
    onPress,
    tone = 'glass',
    disabled,
  }: {
    label: string;
    onPress: () => void;
    tone?: 'glass' | 'gold' | 'rose' | 'cyan';
    disabled?: boolean;
  }) => {
    const bg =
      tone === 'gold' ? `${theme.gold}26` : tone === 'rose' ? `${theme.rose}26` : tone === 'cyan' ? `${theme.primary}26` : theme.surface;
    const bd =
      tone === 'gold' ? `${theme.gold}80` : tone === 'rose' ? `${theme.rose}80` : tone === 'cyan' ? `${theme.primary}80` : theme.surfaceBorder;
    const fg = tone === 'gold' ? theme.gold : tone === 'rose' ? theme.rose : tone === 'cyan' ? theme.primary : theme.text;
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
        style={[styles.btn, { backgroundColor: bg, borderColor: bd, opacity: disabled ? 0.4 : 1 }]}
      >
        <Text style={[styles.btnText, { color: fg }]}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={{ padding: rs(18), paddingTop: insets.top + rs(14), paddingBottom: insets.bottom + rs(40) }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={[styles.circleBtn, { borderColor: theme.surfaceBorder, backgroundColor: theme.surface }]}>
            <Feather name="chevron-left" size={rs(20)} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: theme.text }]}>C-10 Dev Panel</Text>
        </View>
        <Text style={[styles.note, { color: theme.textDim }]}>
          TEST-ONLY · simulated clock · remove before production
        </Text>

        {/* ── Live anchor state ─────────────────────────────────────────── */}
        <Text style={[styles.section, { color: theme.textDim }]}>ANCHOR STATE (at sim day)</Text>
        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.surfaceBorder }]}>
          <Stat k="sim offset" v={`+${offsetDays} day(s)`} accent />
          <Stat k="sim date" v={todayKey} />
          <Stat k="anchor" v={fmtDate(weekAnchorDate)} />
          <Stat k="daysSinceAnchor" v={String(daysSince)} />
          <Stat k="week / dayIndex" v={`${weekIdx < 0 ? '—' : `w${weekIdx}`} · day ${dayIndex} (Day ${dayIndex + 1}/7)`} />
          <Stat k="streak" v={`${streak} / 7`} accent />
          <Stat k="stars" v={String(stars)} accent />
          <Stat k="weeklyResult" v={weeklyStr} accent={!!weeklyResult && weeklyResult.claimedAt === 0} />
          <Stat k="pairing" v={pairing ? `${pairing.articleId} · ${pairing.questionId}` : '—'} />
          <Stat k="done today?" v={doneToday ? 'yes ✓' : 'no'} />
        </View>

        {/* ── Time travel ───────────────────────────────────────────────── */}
        <Text style={[styles.section, { color: theme.textDim }]}>ADVANCE / SKIP DAYS</Text>
        <View style={styles.row}>
          <Btn label="+1 day" onPress={() => setOffsetDays((d) => d + 1)} tone="cyan" />
          <Btn label="+2 days" onPress={() => setOffsetDays((d) => d + 2)} tone="cyan" />
          <Btn label="+3 days" onPress={() => setOffsetDays((d) => d + 3)} tone="cyan" />
          <Btn label="−1 day" onPress={() => setOffsetDays((d) => Math.max(0, d - 1))} />
        </View>

        {/* ── Ritual actions ────────────────────────────────────────────── */}
        <Text style={[styles.section, { color: theme.textDim }]}>RITUAL</Text>
        <View style={styles.row}>
          <Btn label={doneToday ? 'Done ✓' : 'Complete (answer A)'} onPress={onComplete} tone="gold" disabled={doneToday} />
          <Btn
            label="Claim weekly (+5)"
            onPress={claimWeeklyResult}
            tone="gold"
            disabled={!weeklyResult || weeklyResult.claimedAt !== 0}
          />
          <Btn label="Show reveal →" onPress={onShowReveal} tone="cyan" />
        </View>

        {/* ── Notifications (local, offline) ────────────────────────────── */}
        <Text style={[styles.section, { color: theme.textDim }]}>NOTIFICATIONS (local · test)</Text>
        <View style={styles.row}>
          <Btn label="Send test notification" onPress={onTestNotification} tone="cyan" />
        </View>

        {/* ── Ads (test units — verify each format renders) ─────────────── */}
        <Text style={[styles.section, { color: theme.textDim }]}>ADS (Google TEST units)</Text>
        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.surfaceBorder }]}>
          <Stat k="ads available" v={ADS_AVAILABLE ? 'yes ✓ (native build)' : 'no (Expo Go)'} accent={ADS_AVAILABLE} />
          <Stat k="interstitial loaded" v={interstitial.isLoaded ? 'yes ✓' : 'loading…'} />
          <Stat k="rewarded loaded" v={rewarded.isLoaded ? 'yes ✓' : 'loading…'} />
        </View>
        <View style={styles.row}>
          <Btn label="Show interstitial" onPress={onShowInterstitial} tone="cyan" />
          <Btn label="Show rewarded" onPress={onShowRewarded} tone="gold" />
          <Btn label={showBanner ? 'Hide banner' : 'Show banner'} onPress={() => setShowBanner((v) => !v)} />
        </View>

        {/* ── Stars (set balance for testing) ───────────────────────────── */}
        <Text style={[styles.section, { color: theme.textDim }]}>SET STARS</Text>
        <View style={styles.row}>
          <Btn label="★ = 0" onPress={() => setStars(0)} />
          <Btn label="★ = 5" onPress={() => setStars(5)} />
          <Btn label="★ = 50" onPress={() => setStars(50)} />
        </View>

        {/* ── Reset ─────────────────────────────────────────────────────── */}
        <Text style={[styles.section, { color: theme.textDim }]}>RESET</Text>
        <View style={styles.row}>
          <Btn label="Reset ritual state" onPress={resetRitual} tone="rose" />
        </View>

        {/* ── Recorded answers (feed the tally) ─────────────────────────── */}
        <Text style={[styles.section, { color: theme.textDim }]}>RECORDED ANSWERS ({dailyAnswers.length})</Text>
        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.surfaceBorder }]}>
          {dailyAnswers.length === 0 ? (
            <Text style={[styles.statV, { color: theme.textMuted }]}>none</Text>
          ) : (
            dailyAnswers.map((a, i) => (
              <Stat key={i} k={a.date} v={`${a.questionId} · #${a.answerIndex} → ${a.dimension}`} />
            ))
          )}
        </View>
      </ScrollView>

      {/* Test banner — pinned bottom, above the safe-area inset. Collapses on failure. */}
      {showBanner && (
        <AdBanner style={{ position: 'absolute', left: 0, right: 0, bottom: insets.bottom }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', gap: rs(12), marginBottom: rs(4) },
  circleBtn: {
    width: rs(38),
    height: rs(38),
    borderRadius: 999,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: rs(22), fontFamily: 'PlayfairDisplay_700Bold' },
  note: { fontSize: rs(11), fontFamily: 'HankenGrotesk_500Medium', marginBottom: rs(14), marginStart: rs(2) },
  section: {
    fontSize: rs(10.5),
    letterSpacing: 1.2,
    fontFamily: 'HankenGrotesk_700Bold',
    marginTop: rs(18),
    marginBottom: rs(8),
  },
  card: { borderRadius: rs(14), borderWidth: 1, paddingHorizontal: rs(12), paddingVertical: rs(4) },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: rs(8),
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: rs(10),
  },
  statK: { fontSize: rs(12.5), fontFamily: 'HankenGrotesk_500Medium' },
  statV: { fontSize: rs(12.5), fontFamily: 'HankenGrotesk_700Bold', flexShrink: 1, textAlign: 'right' },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: rs(8) },
  btn: {
    paddingHorizontal: rs(14),
    paddingVertical: rs(10),
    borderRadius: rs(10),
    borderWidth: 1,
  },
  btnText: { fontSize: rs(13), fontFamily: 'HankenGrotesk_600SemiBold' },
});
