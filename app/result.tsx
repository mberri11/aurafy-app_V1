import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppText as Text } from '@/src/components/AppText';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/src/themes/ThemeProvider';
import { darkenHex, moduleTheme } from '@/src/themes/categoryTheme';
import CategoryMotif from '@/src/components/CategoryMotif';
import { useReadingStore } from '@/src/store/readingStore';
import { useUserStore } from '@/src/store/userStore';
import { AdMobManager } from '@/src/ads/AdMobManager';
import { captureRef } from 'react-native-view-shot';
import GlassCard from '@/src/components/GlassCard';
import GradientButton from '@/src/components/GradientButton';
import ShareCard, { SHARE_CARD_H, SHARE_CARD_W } from '@/src/components/ShareCard';
import { saveImageToGallery, shareImage, shareResult } from '@/src/utils/share';
import { successNotification, lightTap } from '@/src/utils/haptics';
import { MODULES } from '@/src/data/modules';
import { Reading, Language, SoloResults } from '@/src/types';
import { attachmentStyleResults } from '@/src/data/results/attachmentStyleResults';
import { amITheProblemResults } from '@/src/data/results/amITheProblemResults';
import { rs } from '@/src/utils/responsive';
import { useIsRTL } from '@/src/utils/rtl';

const SOLO_RESULTS: Record<string, SoloResults> = {
  attachment_style: attachmentStyleResults,
  am_i_problem: amITheProblemResults,
};

function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

export default function ResultScreen() {
  const { viewOnly } = useLocalSearchParams<{ viewOnly?: string }>();
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isRTL = useIsRTL();
  const insets = useSafeAreaInsets();
  const language = i18n.language as Language;
  const { currentResult, currentPersons, currentAnswers, currentModuleId, currentMode, viewOnlyResult } =
    useReadingStore();
  const resultUnlocked = useReadingStore((s) => s.resultUnlocked);
  const setResultUnlocked = useReadingStore((s) => s.setResultUnlocked);
  const { addReading, incrementReadingCount, readingCount, spendStars, stars } = useUserStore();

  const isViewOnly = viewOnly === '1';
  const result = isViewOnly ? viewOnlyResult : currentResult;
  // Option C two-tier: minimal (name + verdict + confidence) until unlocked via the
  // gate or the unlock card below. History reopens are always full — already earned.
  const unlocked = isViewOnly || resultUnlocked;
  const [adFailed, setAdFailed] = useState(false);

  // Reveal animation for the eyebrow + big title
  const titleScale = useSharedValue(0.85);
  const titleOpacity = useSharedValue(0);

  // §3 honest confidence line — percentile vs the user's OWN past readings. Captured at
  // render time (refs initialize before effects), so for a fresh reading this snapshot
  // excludes the reading the save-effect below is about to add. Cold start (<5 prior
  // readings) shows no comparison line at all.
  const priorConfidences = useRef(
    useUserStore.getState().history.map((h) => h.result.confidence),
  ).current;

  useEffect(() => {
    if (!result || isViewOnly) return;
    const reading: Reading = {
      id: generateId(),
      moduleId: currentModuleId,
      mode: currentMode,
      persons: currentPersons,
      answers: currentAnswers,
      result,
      createdAt: Date.now(),
    };
    addReading(reading);
    incrementReadingCount();
    if ((readingCount + 1) % 3 === 0) AdMobManager.showInterstitial();
    successNotification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    titleScale.value = withDelay(250, withSpring(1, { stiffness: 200, damping: 16 }));
    titleOpacity.value = withDelay(250, withTiming(1, { duration: 500 }));
  }, [titleScale, titleOpacity]);

  const titleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: titleScale.value }],
    opacity: titleOpacity.value,
  }));

  const module = result ? MODULES.find((m) => m.id === result.moduleId) : undefined;
  const isMulti = module?.type === 'multi';

  // Big-title verdict word for self-discovery modules (e.g. "Secure").
  const verdictWord = useMemo(() => {
    if (!result || isMulti || !result.verdict) return null;
    const sr = SOLO_RESULTS[result.moduleId];
    return sr ? sr.verdictLabel[result.verdict] : null;
  }, [result, isMulti]);

  // Share/Save = the off-screen ShareCard captured at story size (1080×1920); the
  // old text share stays as the Share fallback (web / capture unavailable).
  const shareCardRef = useRef<View>(null);
  const captureCard = useCallback(
    () =>
      captureRef(shareCardRef, {
        format: 'png',
        quality: 1,
        result: 'tmpfile',
        width: 1080,
        height: 1920,
      }),
    [],
  );
  const handleShare = useCallback(async () => {
    if (!result) return;
    try {
      const uri = await captureCard();
      if (await shareImage(uri, t('shareCard.dialogTitle'))) return;
    } catch {
      // capture unavailable — fall through to the text share
    }
    const insights = result.insights.map((i) => i[language] ?? i.en).join('\n\n');
    const text = `My Aurafy reading:\n\n${insights}\n\n— ${result.confidence}% confidence`;
    await shareResult(text);
  }, [result, language, t, captureCard]);

  // Save-to-gallery beside Share, with a transient confirmation line.
  const [savedMsg, setSavedMsg] = useState<string | null>(null);
  const savedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flashSavedMsg = useCallback((msg: string) => {
    setSavedMsg(msg);
    if (savedTimer.current) clearTimeout(savedTimer.current);
    savedTimer.current = setTimeout(() => setSavedMsg(null), 2500);
  }, []);
  useEffect(
    () => () => {
      if (savedTimer.current) clearTimeout(savedTimer.current);
    },
    [],
  );
  const handleSave = useCallback(async () => {
    lightTap();
    try {
      const uri = await captureCard();
      if (await saveImageToGallery(uri)) {
        successNotification();
        flashSavedMsg(t('shareCard.saved'));
        return;
      }
    } catch {
      // capture failed — fall through to the denied/error hint
    }
    flashSavedMsg(t('shareCard.saveDenied'));
  }, [captureCard, flashSavedMsg, t]);

  // Unlock card actions — same fair trade as the gate: a rewarded ad or 1★.
  const handleUnlockWatch = useCallback(async () => {
    const watched = await AdMobManager.showRewarded();
    if (watched) {
      setResultUnlocked(true);
      successNotification();
    } else {
      setAdFailed(true);
    }
  }, [setResultUnlocked]);

  const handleUnlockStar = useCallback(() => {
    lightTap();
    if (spendStars(1)) {
      setResultUnlocked(true);
      successNotification();
    }
  }, [spendStars, setResultUnlocked]);

  const handleTryAnother = useCallback(() => {
    lightTap();
    router.replace('/(tabs)');
  }, []);

  const handleSaveExit = useCallback(() => {
    lightTap();
    router.replace('/(tabs)/history');
  }, []);

  if (!result) {
    return (
      <View style={[styles.container, styles.center, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text }}>No result found.</Text>
      </View>
    );
  }

  // Category spine (DESIGN-SPEC §0, per-MODULE since 2026-07-02): the MODULE's theme
  // drives every accent on this screen — glow, eyebrow, confidence bar, ✦ markers,
  // Share pill — not the winner's avatar colour. Two modules sharing a category
  // (Who Loves Me / Who Admires) still read as two different experiences.
  const { accent, accentSoft } = moduleTheme(result.moduleId);
  const eyebrow = t(`modules.${result.moduleId}.subtitle`, { defaultValue: '' }).toUpperCase();

  const personCount = Object.keys(result.scores).length;
  const showComparison = isMulti && personCount > 1;
  // Verdict line under the reveal name — the winner template minus the name itself
  // ("Simo loves you the most." → "loves you the most.", per the Result PNGs). Shown for
  // EVERY multi reading with a winner, not just single-person ones.
  const winnerSentence = result.insights[0]?.[language] ?? result.insights[0]?.en ?? '';
  const winnerSubtitle =
    isMulti && result.winner
      ? winnerSentence.replace(`${result.winner.name} `, '')
      : null;

  const bigTitle = isMulti
    ? result.winner?.name ?? ''
    : (verdictWord?.[language] ?? verdictWord?.en ?? '');

  const confidence = result.confidence;
  // §3: percentile of this confidence against the user's own past readings (strictly
  // lower count, so a reading never ranks above itself when viewed from History).
  const showPercentile = priorConfidences.length >= 5;
  const percentile = showPercentile
    ? Math.round((priorConfidences.filter((c) => c < confidence).length / priorConfidences.length) * 100)
    : 0;
  const bullets = result.insights.slice(1);
  const maxScore = Math.max(...Object.values(result.scores), 1);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Cosmic base + module-tinted top bloom */}
      <LinearGradient
        colors={['#181430', '#0E0B22', '#08061A']}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />
      <Svg style={StyleSheet.absoluteFill} width="100%" height="100%" pointerEvents="none">
        <Defs>
          {/* Main category-tinted bloom behind the reveal header. */}
          <RadialGradient id="result_bloom" cx="50%" cy="10%" r="58%">
            <Stop offset="0%" stopColor={accentSoft} stopOpacity={0.26} />
            <Stop offset="45%" stopColor={accent} stopOpacity={0.1} />
            <Stop offset="100%" stopColor={theme.background} stopOpacity={0} />
          </RadialGradient>
          {/* Softer offset orb top-end — the warm sphere in the Result PNGs. */}
          <RadialGradient id="result_orb" cx="80%" cy="13%" r="26%">
            <Stop offset="0%" stopColor={accentSoft} stopOpacity={0.34} />
            <Stop offset="70%" stopColor={accentSoft} stopOpacity={0.08} />
            <Stop offset="100%" stopColor={accentSoft} stopOpacity={0} />
          </RadialGradient>
          {/* Floor bloom — fills the minimal tier's short-content bottom void. SOFT tone
              + higher opacity (the accent version was invisible even on gold). */}
          <RadialGradient id="result_floor" cx="50%" cy="112%" r="60%">
            <Stop offset="0%" stopColor={accentSoft} stopOpacity={0.22} />
            <Stop offset="60%" stopColor={accentSoft} stopOpacity={0.06} />
            <Stop offset="100%" stopColor={accentSoft} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#result_bloom)" />
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#result_orb)" />
        {!unlocked && <Rect x="0" y="0" width="100%" height="100%" fill="url(#result_floor)" />}
      </Svg>

      <ScrollView
        style={styles.flex}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + rs(28),
            paddingBottom: isViewOnly ? insets.bottom + rs(124) : insets.bottom + rs(184),
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Eyebrow + luminous reveal name over the faint category motif */}
        <Animated.View style={[styles.header, titleStyle]}>
          {/* Oversized category motif ghosted behind the name (spec §0 secondary accent). */}
          <View pointerEvents="none" style={styles.motifWrap}>
            <CategoryMotif moduleId={result.moduleId} size={rs(150)} color={accent} />
          </View>
          {/* Accent sparkles scattered around the reveal (per the Result PNGs). */}
          <MaterialCommunityIcons
            name="star-four-points"
            size={rs(13)}
            color={accent}
            style={[styles.sparkle, { top: rs(14), start: rs(34), opacity: 0.75 }]}
          />
          <MaterialCommunityIcons
            name="star-four-points"
            size={rs(9)}
            color={accent}
            style={[styles.sparkle, { top: rs(64), end: rs(28), opacity: 0.55 }]}
          />
          <MaterialCommunityIcons
            name="star-four-points"
            size={rs(7)}
            color={accent}
            style={[styles.sparkle, { bottom: rs(6), start: rs(64), opacity: 0.4 }]}
          />

          {!!eyebrow && (
            <Text style={[styles.eyebrow, { color: accent }]}>{eyebrow}</Text>
          )}
          {/* Crisp white reveal name with a single soft accent glow — the stacked
              multi-layer glow read as a blurry doubled name on device. */}
          <Text
            style={[styles.bigTitle, { color: theme.text, textShadowColor: accent }]}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {bigTitle}
          </Text>
          {!!winnerSubtitle && (
            <Text style={[styles.winnerSubtitle, { color: theme.text }]}>{winnerSubtitle}</Text>
          )}
        </Animated.View>

        {/* Confidence */}
        <GlassCard style={styles.card}>
          {(() => {
            const head = t('result.confidenceHeadline', { confidence });
            const token = `${confidence}%`;
            const parts = head.split(token);
            return (
              <Text style={[styles.confHead, { color: theme.text }]}>
                {parts[0]}
                <Text style={{ color: accent, fontFamily: 'HankenGrotesk_700Bold' }}>{token}</Text>
                {parts.slice(1).join(token)}
              </Text>
            );
          })()}
          {showPercentile && (
            <Text style={[styles.confSub, { color: theme.textDim }]}>
              {t('result.confidenceSub', { pct: percentile })}
            </Text>
          )}
          <View style={[styles.bar, { backgroundColor: theme.surface }]}>
            <View style={[styles.barFill, { width: `${confidence}%`, backgroundColor: accent }]} />
          </View>
        </GlassCard>

        {/* Unlock card (minimal tier) — the rest of the reading sits behind Option C. */}
        {!unlocked && (
          <GlassCard style={styles.card}>
            <Text style={[styles.cardTitle, { color: accent }]}>{t('result.lockedEyebrow')}</Text>
            <Text style={[styles.lockedBody, { color: theme.textMuted }]}>
              {t('result.lockedBody')}
            </Text>
            <GradientButton
              label={t('result.unlockWatch')}
              onPress={handleUnlockWatch}
              leadingIcon="play"
              labelColor={theme.background}
              colors={[accent, darkenHex(accent, 0.22)]}
              glowColor={accent}
              bold
            />
            {adFailed && (
              <Text style={[styles.adFailed, { color: theme.textDim }]}>
                {t('loading.adUnavailable')}
              </Text>
            )}
            <TouchableOpacity
              onPress={handleUnlockStar}
              disabled={stars === 0}
              accessibilityRole="button"
              accessibilityLabel={`${t('result.unlockStar')} 1`}
              style={[
                styles.unlockStarBtn,
                { backgroundColor: theme.surface, borderColor: theme.borderStrong },
                stars === 0 && styles.unlockDisabled,
              ]}
            >
              <Text style={[styles.unlockStarText, { color: theme.text }]}>
                {t('result.unlockStar')}
              </Text>
              <View
                style={[
                  styles.costPill,
                  { borderColor: `${theme.gold}66`, backgroundColor: `${theme.gold}14` },
                ]}
              >
                <Text style={[styles.costText, { color: theme.gold }]}>1</Text>
                <MaterialCommunityIcons name="star-four-points" size={rs(11)} color={theme.gold} />
              </View>
            </TouchableOpacity>
          </GlassCard>
        )}

        {/* The full picture (multi, >1 person) */}
        {unlocked && showComparison && (
          <GlassCard style={styles.card}>
            <Text style={[styles.cardTitle, { color: theme.textDim }]}>{t('result.comparison')}</Text>
            {currentPersons.map((p) => {
              const pct = Math.round(((result.scores[p.id] ?? 0) / maxScore) * 100);
              // Bars fill in the CATEGORY accent (winner full-strength, the rest softened)
              // so the card reads in the reading's palette; avatars keep person colours.
              const isWinner = p.id === result.winner?.id;
              return (
                <View key={p.id} style={styles.compRow}>
                  <View style={[styles.avatar, { backgroundColor: p.color }]}>
                    <Text style={[styles.avatarText, { color: theme.background }]}>
                      {p.name[0]?.toUpperCase() ?? '?'}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.compName,
                      { color: isWinner ? accent : theme.text },
                      isWinner && { fontFamily: 'HankenGrotesk_700Bold' },
                    ]}
                    numberOfLines={1}
                  >
                    {p.name}
                  </Text>
                  <View style={[styles.compTrack, { backgroundColor: theme.surface }]}>
                    <View
                      style={[
                        styles.compFill,
                        { width: `${pct}%`, backgroundColor: accent, opacity: isWinner ? 1 : 0.45 },
                      ]}
                    />
                  </View>
                  <Text style={[styles.compPct, { color: theme.textMuted, textAlign: isRTL ? 'left' : 'right' }]}>{pct}%</Text>
                </View>
              );
            })}
          </GlassCard>
        )}

        {/* The read (self-discovery one-liner) */}
        {unlocked && !isMulti && (
          <GlassCard style={styles.card}>
            <Text style={[styles.cardTitle, { color: theme.textDim }]}>{t('result.theRead')}</Text>
            <Text
              style={[styles.theReadText, { color: theme.text, fontFamily: 'PlayfairDisplay_600SemiBold' }]}
            >
              {winnerSentence}
            </Text>
          </GlassCard>
        )}

        {/* What this means */}
        {unlocked && bullets.length > 0 && (
          <GlassCard style={styles.card}>
            <Text style={[styles.cardTitle, { color: theme.textDim }]}>{t('result.whatThisMeans')}</Text>
            {bullets.map((insight, i) => (
              <View key={i}>
                {i > 0 && <View style={[styles.divider, { backgroundColor: theme.surfaceBorder }]} />}
                <View style={styles.bulletRow}>
                  <Text style={[styles.bulletStar, { color: accent }]}>
                    {t('result.insightPrefix')}
                  </Text>
                  <Text style={[styles.bulletText, { color: theme.text }]}>
                    {insight[language] ?? insight.en}
                  </Text>
                </View>
              </View>
            ))}
          </GlassCard>
        )}

        {/* Disclaimer */}
        <Text style={[styles.disclaimer, { color: theme.textDim }]}>{t('result.disclaimer')}</Text>
      </ScrollView>

      {/* Fixed action bar — History reopens (view-only) keep Share + Save; the
          Try-another/Save-&-exit nav row is fresh-reading only. */}
      <View style={[styles.actionBar, { paddingBottom: insets.bottom + rs(12) }]}>
        <LinearGradient
          colors={[`${theme.background}00`, theme.background]}
          locations={[0, 0.5]}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />
        {/* Category-accent pill (accentSoft→accent), per the Result PNGs — NOT the
            3-color brand gradient. Share belongs to the FULL tier (Option C). */}
        {unlocked && (
          <View style={styles.shareRow}>
            <GradientButton
              label={t('result.shareButton')}
              onPress={handleShare}
              leadingIcon="share-variant"
              labelColor={theme.background}
              colors={[accent, darkenHex(accent, 0.22)]}
              glowColor={accent}
              bold
              glow
              style={styles.shareFlex}
            />
            <TouchableOpacity
              onPress={handleSave}
              accessibilityRole="button"
              accessibilityLabel={t('shareCard.save')}
              activeOpacity={0.85}
              style={[styles.saveBtn, { backgroundColor: theme.surface, borderColor: theme.borderStrong }]}
            >
              <MaterialCommunityIcons name="download" size={rs(20)} color={theme.text} />
            </TouchableOpacity>
          </View>
        )}
        {!!savedMsg && (
          <Text style={[styles.savedMsg, { color: theme.textMuted }]}>{savedMsg}</Text>
        )}
        {!isViewOnly && (
          <View style={styles.actionRow}>
            <TouchableOpacity
              onPress={handleTryAnother}
              accessibilityRole="button"
              accessibilityLabel={t('result.retryButton')}
              activeOpacity={0.8}
              style={[styles.pill, { backgroundColor: theme.surface, borderColor: theme.borderStrong }]}
            >
              <Text style={[styles.pillText, { color: theme.text }]}>{t('result.retryButton')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSaveExit}
              accessibilityRole="button"
              accessibilityLabel={t('result.saveButton')}
              activeOpacity={0.8}
              style={[styles.pill, { backgroundColor: theme.surface, borderColor: theme.borderStrong }]}
            >
              <Text style={[styles.pillText, { color: theme.text }]}>{t('result.saveButton')}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Off-screen share card — captured by handleShare, never visible on screen. */}
      {unlocked && (
        <View ref={shareCardRef} collapsable={false} pointerEvents="none" style={styles.shareCardHost}>
          <ShareCard
            variant="reading"
            accent={accent}
            accentSoft={accentSoft}
            eyebrow={eyebrow}
            name={bigTitle}
            verdictLine={winnerSubtitle ?? winnerSentence}
            quote={result.shareLine?.[language] ?? result.shareLine?.en ?? ''}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  flex: { flex: 1 },
  shareRow: { flexDirection: 'row', alignItems: 'center', gap: rs(10) },
  shareFlex: { flex: 1 },
  // Circular so it echoes the pill row instead of adding a fourth rectangle.
  saveBtn: {
    width: rs(52),
    height: rs(52),
    borderRadius: 999,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  savedMsg: {
    fontSize: rs(12),
    fontFamily: 'HankenGrotesk_500Medium',
    textAlign: 'center',
    marginTop: rs(8),
  },
  // Parked past the left edge (raw px on purpose — the card canvas never scales).
  shareCardHost: {
    position: 'absolute',
    top: 0,
    left: -SHARE_CARD_W - 60,
    width: SHARE_CARD_W,
    height: SHARE_CARD_H,
  },
  center: { alignItems: 'center', justifyContent: 'center' },
  content: { paddingHorizontal: rs(20), gap: rs(14) },

  header: { alignItems: 'center', gap: rs(6), paddingVertical: rs(10) },
  motifWrap: {
    position: 'absolute',
    top: -rs(12),
    end: -rs(14),
    opacity: 0.16,
  },
  sparkle: { position: 'absolute' },
  eyebrow: {
    fontSize: rs(11),
    fontFamily: 'HankenGrotesk_700Bold',
    letterSpacing: rs(1.6),
    textAlign: 'center',
  },
  bigTitle: {
    fontSize: rs(38),
    lineHeight: rs(46),
    fontFamily: 'PlayfairDisplay_700Bold',
    letterSpacing: -0.4,
    textAlign: 'center',
    width: '100%',
    marginTop: rs(4),
    marginBottom: rs(4),
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: rs(16),
  },
  winnerSubtitle: {
    fontSize: rs(16),
    lineHeight: rs(22),
    fontFamily: 'HankenGrotesk_400Regular',
    textAlign: 'center',
    marginTop: rs(4),
  },

  // NOTE: no `gap` here — GlassCard wraps children in an inner content View, so a
  // gap on the card style silently never applies. Spacing is explicit margins below.
  card: { padding: rs(16) },
  cardTitle: {
    fontSize: rs(11.5),
    fontFamily: 'HankenGrotesk_700Bold',
    letterSpacing: rs(1.2),
    textTransform: 'uppercase',
    marginBottom: rs(8),
  },

  // Confidence
  confHead: { fontSize: rs(15), fontFamily: 'HankenGrotesk_500Medium', lineHeight: rs(21) },
  confSub: { fontSize: rs(12.5), fontFamily: 'HankenGrotesk_400Regular', marginTop: rs(2) },
  bar: { height: rs(9), borderRadius: rs(5), overflow: 'hidden', marginTop: rs(10) },
  barFill: { height: rs(9), borderRadius: rs(5) },

  // Comparison
  compRow: { flexDirection: 'row', alignItems: 'center', gap: rs(10), paddingVertical: rs(6) },
  avatar: {
    width: rs(30),
    height: rs(30),
    borderRadius: rs(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: rs(13), fontFamily: 'HankenGrotesk_700Bold' },
  compName: { width: rs(64), fontSize: rs(14), fontFamily: 'HankenGrotesk_500Medium' },
  compTrack: { flex: 1, height: rs(8), borderRadius: rs(4), overflow: 'hidden' },
  compFill: { height: rs(8), borderRadius: rs(4) },
  compPct: { width: rs(40), fontSize: rs(13), fontFamily: 'HankenGrotesk_500Medium' },

  // Unlock card (minimal tier) — explicit margins (GlassCard gap is a no-op).
  lockedBody: {
    fontSize: rs(13.5),
    lineHeight: rs(19),
    fontFamily: 'HankenGrotesk_400Regular',
    marginBottom: rs(12),
  },
  adFailed: {
    fontSize: rs(12),
    textAlign: 'center',
    fontFamily: 'HankenGrotesk_400Regular',
    marginTop: rs(8),
  },
  unlockStarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: rs(48),
    borderRadius: 999,
    borderWidth: 1,
    marginTop: rs(10),
  },
  unlockStarText: { fontSize: rs(14.5), fontFamily: 'HankenGrotesk_600SemiBold' },
  unlockDisabled: { opacity: 0.35 },
  costPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(2),
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: rs(8),
    paddingVertical: rs(3),
    marginStart: rs(8),
  },
  costText: { fontSize: rs(12), fontFamily: 'HankenGrotesk_700Bold' },

  // The read
  theReadText: { fontSize: rs(18), lineHeight: rs(26) },

  // What this means
  divider: { height: 1, marginVertical: rs(12) },
  bulletRow: { flexDirection: 'row', gap: rs(12), alignItems: 'flex-start' },
  bulletStar: { fontSize: rs(15), marginTop: rs(2) },
  bulletText: { flex: 1, fontSize: rs(14.5), lineHeight: rs(21), fontFamily: 'HankenGrotesk_400Regular' },

  disclaimer: {
    fontSize: rs(12),
    textAlign: 'center',
    fontFamily: 'HankenGrotesk_400Regular',
    lineHeight: rs(18),
    paddingHorizontal: rs(20),
    marginTop: rs(4),
  },

  // Action bar
  actionBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: rs(20),
    paddingTop: rs(22),
    gap: rs(12),
  },
  actionRow: { flexDirection: 'row', gap: rs(12) },
  pill: {
    flex: 1,
    height: rs(52),
    borderRadius: rs(14),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillText: { fontSize: rs(15), fontFamily: 'HankenGrotesk_600SemiBold' },
});
