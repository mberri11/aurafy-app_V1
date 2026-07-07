// ─────────────────────────────────────────────────────────────────────────────
// C-10 — WEEKLY RESULT REVEAL (the 7-day payoff).
// Design: Screenshots_new/7-DayPayoff.png (+ _animationStar* frames).
//
// Full-screen ceremony shown when a week's 7 covered rituals resolve into one
// outcome. Category-themed (accent from the week's category). Mounting the reveal
// is what PAYS the +5 — claimWeeklyResult() runs in an effect, so the bonus is
// never credited before the reveal is on screen (the STRICT ORDER from the brief).
// Content comes from getWeekById(weeklyResult.weekId) → the matching outcome.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, Share, StyleSheet, TouchableOpacity, View } from 'react-native';
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
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import { useTheme } from '@/src/themes/ThemeProvider';
import { useUserStore } from '@/src/store/userStore';
import { getWeekById } from '@/src/data/weeks';
import { CATEGORY_COLORS } from '@/src/content/articles';
import type { Language, LocalizedString } from '@/src/types';
import OrbitArt from '@/src/screens/insights/components/OrbitArt';
import ShareCard, { SHARE_CARD_H, SHARE_CARD_W } from '@/src/components/ShareCard';
import { captureRef } from 'react-native-view-shot';
import { saveImageToGallery, shareImage } from '@/src/utils/share';
import { successNotification, lightTap } from '@/src/utils/haptics';
import { playEffect } from '@/src/utils/sound';
import { rs } from '@/src/utils/responsive';

const STREAK_BONUS = 5; // mirrors STREAK_BONUS_REWARD in userStore

export default function WeeklyResultScreen() {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Language;
  const insets = useSafeAreaInsets();

  // Read-only reopen from History (`viewOnly: '1'` + the entry's persisted
  // weekId/outcomeKey): render the same ceremony but claim nothing, pay nothing,
  // chime nothing — the payoff already happened when the week completed.
  const params = useLocalSearchParams<{ viewOnly?: string; weekId?: string; outcomeKey?: string }>();
  const isViewOnly = params.viewOnly === '1';

  const weeklyResult = useUserStore((s) => s.weeklyResult);
  const stars = useUserStore((s) => s.stars);
  const claimWeeklyResult = useUserStore((s) => s.claimWeeklyResult);

  // STRICT ORDER: pay the +5 only once the reveal is actually rendered. Idempotent —
  // returns 0 (and re-credits nothing) if this result was already claimed.
  useEffect(() => {
    if (!isViewOnly) claimWeeklyResult();
  }, [claimWeeklyResult, isViewOnly]);

  const weekId = isViewOnly ? params.weekId : weeklyResult?.weekId;
  const outcomeKey = isViewOnly ? params.outcomeKey : weeklyResult?.outcomeKey;
  const week = weekId ? getWeekById(weekId) : undefined;
  const outcome = week?.outcomes.find((o) => o.key === outcomeKey);
  const accent = week ? CATEGORY_COLORS[week.category] : theme.primary;
  const L = (s: LocalizedString) => s[lang] ?? s.en;

  // Reveal entrance (fade + gentle rise) and the tasteful star twinkle on the bonus card.
  const enter = useSharedValue(0);
  const twinkle = useSharedValue(0);
  // rs() is a plain JS fn (NOT a worklet) — resolve the px rise on the JS thread and capture
  // the number in the worklet. Calling rs() inside the useAnimatedStyle worklet crashes on
  // the UI thread (that was the reveal-screen error).
  const risePx = rs(18);
  useEffect(() => {
    enter.value = withTiming(1, { duration: 650, easing: Easing.out(Easing.cubic) });
    twinkle.value = withRepeat(withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.quad) }), -1, true);
    // Weekly reveal chime, synced to the entrance start (immediate — no delay here).
    // Guarded on `outcome` so the empty/error mount stays silent, and on view-only
    // so History reopens stay quiet; fires once (the shared-value deps are stable,
    // so this effect runs a single time on mount).
    if (outcome && !isViewOnly) playEffect('revealWeekly');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enter, twinkle]);
  const colStyle = useAnimatedStyle(() => ({
    opacity: enter.value,
    transform: [{ translateY: (1 - enter.value) * risePx }],
  }));
  const starStyle = useAnimatedStyle(() => ({
    opacity: 0.55 + twinkle.value * 0.45,
    transform: [{ scale: 1 + twinkle.value * 0.12 }],
  }));
  const haloStyle = useAnimatedStyle(() => ({ opacity: 0.18 + twinkle.value * 0.4 }));
  // Breathing bloom behind the atom mark — the pulse the design's _animationStar frames show.
  const orbitGlowStyle = useAnimatedStyle(() => ({
    opacity: 0.3 + twinkle.value * 0.45,
    transform: [{ scale: 0.82 + twinkle.value * 0.26 }],
  }));
  // Luminous title — the accent halo + mid-glow layers breathe with the SAME twinkle as the atom
  // mark; the crisp white core layer never animates, so the letters stay fully readable.
  const titleHaloStyle = useAnimatedStyle(() => ({ opacity: 0.4 + twinkle.value * 0.4 }));
  const titleGlowStyle = useAnimatedStyle(() => ({ opacity: 0.55 + twinkle.value * 0.4 }));

  // Share/Save = the off-screen weekly ShareCard captured at story size; the
  // plain-text share stays as the Share fallback when capture is unavailable.
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
  const onShare = async () => {
    if (!outcome) return;
    try {
      const uri = await captureCard();
      if (await shareImage(uri, t('shareCard.dialogTitle'))) return;
    } catch {
      // capture unavailable — fall through to the text share
    }
    Share.share({ message: `${L(outcome.title)} — ${L(outcome.shareLine)}\nAurafy · @aurafy.app` }).catch(() => {});
  };

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
  const onSave = async () => {
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
  };
  // Fresh-reveal exit only — view-only reopens leave via back (the link is hidden).
  const onClose = () => router.replace('/(tabs)');

  if (!week || !outcome) {
    return (
      <View style={[styles.root, styles.center, { backgroundColor: theme.background }]}>
        <Text style={[styles.empty, { color: theme.textMuted }]}>{t('weekly.empty')}</Text>
        <TouchableOpacity onPress={() => router.back()} style={[styles.circleBtn, { backgroundColor: theme.surface, borderColor: theme.surfaceBorder }]}>
          <Feather name="chevron-left" size={rs(20)} color={theme.text} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      {/* The fresh-reveal ceremony must not be swipe-dismissed mid-claim; view-only
          reopens keep the gesture (their way back to History) — mirrors result.tsx. */}
      <Stack.Screen options={{ gestureEnabled: isViewOnly }} />
      {/* Category-tinted radial bloom behind the reveal. */}
      <Svg style={StyleSheet.absoluteFill} width="100%" height="100%" pointerEvents="none">
        <Defs>
          <RadialGradient id="wr_bloom" cx="50%" cy="30%" r="62%">
            <Stop offset="0%" stopColor={accent} stopOpacity={0.28} />
            <Stop offset="55%" stopColor={accent} stopOpacity={0.06} />
            <Stop offset="100%" stopColor={accent} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#wr_bloom)" />
      </Svg>

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: insets.top + rs(28), paddingBottom: insets.bottom + rs(24) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.col, colStyle]}>
          {/* Brand atom mark, category-tinted, over a breathing category-tinted bloom */}
          <View style={styles.orbitWrap}>
            <Animated.View style={[styles.orbitGlow, orbitGlowStyle]} pointerEvents="none">
              <Svg width="100%" height="100%">
                <Defs>
                  <RadialGradient id="wr_orbit" cx="50%" cy="50%" r="50%">
                    <Stop offset="0%" stopColor={accent} stopOpacity={0.85} />
                    <Stop offset="55%" stopColor={accent} stopOpacity={0.22} />
                    <Stop offset="100%" stopColor={accent} stopOpacity={0} />
                  </RadialGradient>
                </Defs>
                <Rect x="0" y="0" width="100%" height="100%" fill="url(#wr_orbit)" />
              </Svg>
            </Animated.View>
            <OrbitArt size={rs(64)} accent={accent} />
          </View>

          <Text style={[styles.eyebrow, { color: accent }]}>{t('weekly.eyebrow')}</Text>

          {/* Luminous outcome title. RN has no multi-pass text-shadow on a single Text, so the
              glow is built from stacked copies: a wide breathing accent HALO + a tighter accent
              GLOW behind the crisp white CORE (which carries its own tight bright inner glow and
              never animates, so the letters stay fully readable). */}
          <View style={styles.revealWrap}>
            <Animated.Text style={[styles.reveal, styles.revealHalo, { color: accent, textShadowColor: accent }, titleHaloStyle]}>
              {L(outcome.title)}
            </Animated.Text>
            <Animated.Text style={[styles.reveal, styles.revealGlow, { color: accent, textShadowColor: accent }, titleGlowStyle]}>
              {L(outcome.title)}
            </Animated.Text>
            <Text style={[styles.reveal, styles.revealCore, { color: theme.text, textShadowColor: '#FFFFFF' }]}>
              {L(outcome.title)}
            </Text>
          </View>

          <Text style={[styles.body, { color: theme.textMuted }]}>{L(outcome.body)}</Text>

          {/* +5 streak bonus — earned celebration with a tasteful star twinkle (no
              confetti). Fresh reveals only: a History reopen pays nothing, so it
              must not re-celebrate a bonus. */}
          {!isViewOnly && (
            <View style={[styles.bonusCard, { borderColor: `${theme.gold}45`, backgroundColor: `${theme.gold}0F` }]}>
              <View style={styles.starWrap}>
                <Animated.View style={[styles.starHalo, { backgroundColor: `${theme.gold}26` }, haloStyle]} pointerEvents="none" />
                <Animated.View style={starStyle}>
                  <MaterialCommunityIcons name="star" size={rs(30)} color={theme.gold} />
                </Animated.View>
              </View>
              <View style={styles.bonusText}>
                <Text style={[styles.bonusTitle, { color: theme.gold }]}>
                  {t('weekly.bonusTitle', { amount: STREAK_BONUS })}
                </Text>
                <Text style={[styles.bonusSub, { color: theme.textMuted }]}>
                  {t('weekly.bonusSubtitle', { balance: stars })}
                </Text>
              </View>
            </View>
          )}

          {/* Share my week (captured card) + save-to-gallery */}
          <View style={styles.shareRow}>
            <TouchableOpacity onPress={onShare} activeOpacity={0.9} style={styles.shareWrap} accessibilityRole="button">
              <LinearGradient colors={theme.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.shareBtn}>
                <Feather name="share-2" size={rs(17)} color={theme.bg2} />
                <Text style={[styles.shareLabel, { color: theme.bg2 }]}>{t('weekly.share')}</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onSave}
              accessibilityRole="button"
              accessibilityLabel={t('shareCard.save')}
              activeOpacity={0.85}
              style={[styles.saveBtn, { backgroundColor: theme.surface, borderColor: theme.borderStrong }]}
            >
              <MaterialCommunityIcons name="download" size={rs(19)} color={theme.text} />
            </TouchableOpacity>
          </View>
          {!!savedMsg && (
            <Text style={[styles.savedMsg, { color: theme.textMuted }]}>{savedMsg}</Text>
          )}

          {/* "Save to history" only makes sense on the fresh reveal — a History
              reopen IS the saved entry; back (hardware/gesture) returns to History,
              same as view-only readings on result.tsx. */}
          {!isViewOnly && (
            <TouchableOpacity onPress={onClose} activeOpacity={0.7} style={styles.saveLink} accessibilityRole="button">
              <Text style={[styles.saveText, { color: theme.textMuted }]}>{t('weekly.save')}</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      </ScrollView>

      {/* Off-screen share card — captured by onShare, never visible on screen. */}
      <View ref={shareCardRef} collapsable={false} pointerEvents="none" style={styles.shareCardHost}>
        <ShareCard variant="weekly" title={L(outcome.title)} quote={L(outcome.shareLine)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  // Parked past the left edge (raw px on purpose — the card canvas never scales).
  shareCardHost: {
    position: 'absolute',
    top: 0,
    left: -SHARE_CARD_W - 60,
    width: SHARE_CARD_W,
    height: SHARE_CARD_H,
  },
  center: { alignItems: 'center', justifyContent: 'center', gap: rs(16) },
  empty: { fontSize: rs(15), fontFamily: 'HankenGrotesk_500Medium' },
  circleBtn: {
    width: rs(40),
    height: rs(40),
    borderRadius: 999,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  scroll: { flexGrow: 1, paddingHorizontal: rs(24), justifyContent: 'center' },
  col: { alignItems: 'center' },

  orbitWrap: { width: rs(64), height: rs(64), alignItems: 'center', justifyContent: 'center' },
  orbitGlow: { position: 'absolute', width: rs(168), height: rs(168), top: rs(-52), left: rs(-52) },

  eyebrow: {
    fontSize: rs(11),
    fontFamily: 'HankenGrotesk_700Bold',
    letterSpacing: 2.4,
    textTransform: 'uppercase',
    marginTop: rs(18),
    marginBottom: rs(12),
  },
  revealWrap: { width: '100%' },
  // Shared glyph metrics for all three luminous-title layers — identical so the stacked copies
  // wrap + sit pixel-for-pixel on top of each other. Only textShadowRadius differs per layer.
  reveal: {
    fontSize: rs(34),
    lineHeight: rs(40),
    fontFamily: 'PlayfairDisplay_700Bold',
    letterSpacing: -0.4,
    textAlign: 'center',
    width: '100%',
    textShadowOffset: { width: 0, height: 0 },
  },
  revealHalo: { ...StyleSheet.absoluteFillObject, textShadowRadius: rs(22) }, // wide soft accent halo
  revealGlow: { ...StyleSheet.absoluteFillObject, textShadowRadius: rs(11) }, // tighter accent glow
  revealCore: { textShadowRadius: rs(4) }, // crisp white letters + tight bright inner glow
  body: {
    fontSize: rs(15),
    lineHeight: rs(22),
    fontFamily: 'HankenGrotesk_400Regular',
    textAlign: 'center',
    marginTop: rs(16),
    paddingHorizontal: rs(4),
  },

  bonusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(14),
    width: '100%',
    borderRadius: rs(16),
    borderWidth: 1,
    paddingVertical: rs(14),
    paddingHorizontal: rs(16),
    marginTop: rs(26),
    overflow: 'hidden',
  },
  starWrap: { width: rs(44), height: rs(44), alignItems: 'center', justifyContent: 'center' },
  starHalo: { position: 'absolute', width: rs(52), height: rs(52), borderRadius: rs(26) },
  bonusText: { flex: 1, gap: rs(3) },
  bonusTitle: { fontSize: rs(15.5), fontFamily: 'HankenGrotesk_700Bold' },
  bonusSub: { fontSize: rs(12.5), lineHeight: rs(17), fontFamily: 'HankenGrotesk_400Regular' },

  shareRow: {
    width: '100%',
    marginTop: rs(24),
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(10),
  },
  shareWrap: {
    flex: 1,
    borderRadius: 999,
    overflow: 'hidden',
  },
  // Circular so it echoes the share pill instead of adding another rectangle.
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
    marginTop: rs(10),
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: rs(9),
    height: rs(52),
    borderRadius: 999,
  },
  shareLabel: { fontSize: rs(15.5), fontFamily: 'HankenGrotesk_700Bold' },

  saveLink: { marginTop: rs(14), paddingVertical: rs(6) },
  saveText: { fontSize: rs(13.5), fontFamily: 'HankenGrotesk_500Medium' },
});
