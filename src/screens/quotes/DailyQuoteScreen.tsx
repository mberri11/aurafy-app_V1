// ─────────────────────────────────────────────────────────────────────────────
// DAILY QUOTE — the whole daily ritual.
// Route: app/quote.tsx (root Stack). No [id] param — there is only ever TODAY's
// quote, resolved from the user's anchor by getTodayQuote().
//
// Flow: open → read → (tap the card to unfold the reflection) → Done → +1★,
// streak +1 (and +5 when it closes a 7-day cycle). No question, no weekly
// outcome, no article coupling — the Insights feed and every article are
// untouched and stay browsable.
//
// RTL: native forceRTL does ALL the mirroring. There is no `row-reverse` and no
// `textAlign: 'right'` anywhere in this file — that double-flip has broken this
// app before. useIsRTL() is used for ONE thing only, the same as
// ArticleReaderScreen: choosing the back-chevron GLYPH. Positional styles use
// logical props (start/end) so they mirror natively.
//
// ⚠️ GOLDEN LOOP — NOT DESIGN-VERIFIED. There is no design PNG for this screen.
// The layout reuses established tokens (Playfair quote, gold ritual accents, the
// star-earned card the article reader used) but has NOT been through a Stage-1
// SPEC or a device DIFF. Treat as ⚠️ CODED, NOT VERIFIED until Simo screenshots it.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppText as Text } from '@/src/components/AppText';
import Animated, {
  FadeIn,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';

import { useTheme } from '@/src/themes/ThemeProvider';
import { useUserStore, isRitualDoneToday } from '@/src/store/userStore';
import { getTodayQuote, getQuoteContent, getDailyAccentIndex } from '@/src/content/quotes';
import type { Language } from '@/src/types';
import { rs } from '@/src/utils/responsive';
import { useIsRTL } from '@/src/utils/rtl';
import { lightTap } from '@/src/utils/haptics';
import { playEffect } from '@/src/utils/sound';
import { syncReminders } from '@/src/utils/notifications';
import { shareImage } from '@/src/utils/share';
import AdBanner from '@/src/ads/AdBanner';
import { maybeShowInterstitial } from '@/src/ads/interstitialGate';
import { INTERSTITIAL } from '@/src/config/ads';
import QuoteShareCard, { QUOTE_CARD_H, QUOTE_CARD_W } from './QuoteShareCard';

const REVEAL_MS = 250; // reflection unfold — spec'd duration

export default function DailyQuoteScreen() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isRTL = useIsRTL();
  const insets = useSafeAreaInsets();
  const lang = i18n.language as Language;

  const completeDailyRitual = useUserStore((s) => s.completeDailyRitual);
  const lastDailyClaim = useUserStore((s) => s.lastDailyClaim);
  const weekAnchorDate = useUserStore((s) => s.weekAnchorDate);
  const stars = useUserStore((s) => s.stars);
  const readingCount = useUserStore((s) => s.readingCount);

  const quote = getTodayQuote(weekAnchorDate);
  const content = getQuoteContent(quote.id, lang);
  // "Today's colour" — one of the active theme's 7 daily accents, turning over at local
  // midnight with the quote. An unlocked theme recolours the whole cycle.
  const accent = theme.dailyAccents[getDailyAccentIndex(weekAnchorDate)];

  // authorKey null → the line is Aurafy's own. Always resolves to a real string, so
  // "null" or a bare empty attribution line can never render.
  const attribution = quote.authorKey
    ? t(`quotes.authors.${quote.authorKey}`)
    : t('quotes.originalAuthor');

  // Claimed earlier today → land directly in the completed state (no animation).
  const claimedToday = isRitualDoneToday(lastDailyClaim);
  const [justClaimed, setJustClaimed] = useState(false);
  const claimed = claimedToday || justClaimed;

  const [expanded, setExpanded] = useState(false);

  const revealY = useSharedValue(claimedToday ? 0 : rs(16));
  const revealOpacity = useSharedValue(claimedToday ? 1 : 0);
  const revealStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: revealY.value }],
    opacity: revealOpacity.value,
  }));

  // Plain back — NO interstitial here. It used to fire on every exit, which meant simply
  // re-opening today's quote to re-read it could serve an ad even though nothing was
  // earned. The placement moved to onDone (genuine claims only).
  const handleBack = useCallback(() => {
    router.back();
  }, []);

  const toggleReflection = useCallback(() => {
    lightTap();
    setExpanded((v) => !v);
  }, []);

  const onDone = useCallback(() => {
    if (claimed) return;
    lightTap();
    // Captured BEFORE the claim: null anchor = this is the user's first-ever ritual.
    const firstEverRitual = useUserStore.getState().weekAnchorDate === null;
    const earned = completeDailyRitual();
    setJustClaimed(true);
    revealY.value = withSpring(0, { stiffness: 200, damping: 20 });
    revealOpacity.value = withSpring(1, { stiffness: 200, damping: 20 });
    // Re-sync reminders so tonight's 11 PM streak nudge drops now that today is done.
    void syncReminders();
    // Chime only on a genuine credit (0 = repeat same-day tap or a backwards clock).
    if (earned > 0) playEffect('star');

    // ── Interstitial: genuine claims only, ~1 in 2, never over the reward ──
    // `earned > 0` is the whole guard against the case Simo flagged — re-opening an
    // already-read quote returns 0, so browsing back to re-read it never serves an ad.
    // Skipped on the very first ritual: a brand-new user's first +1★ should not be
    // interrupted. The 900ms delay lets the star-earned card land and register first —
    // an ad that covers the reward reads as a punishment for completing the ritual.
    if (earned > 0 && !firstEverRitual) {
      setTimeout(() => {
        void maybeShowInterstitial(readingCount, {
          ignoreMinReadings: true,
          chance: INTERSTITIAL.QUOTE_DONE_CHANCE,
        });
      }, 900);
    }
  }, [claimed, completeDailyRitual, revealY, revealOpacity, readingCount]);

  // ── Share: capture the off-screen 4:5 card and hand the PNG to the share sheet ──
  // Availability is probed ONCE on mount so the button can be disabled up front rather
  // than throwing at press time (e.g. an emulator with no share target).
  const [canShare, setCanShare] = useState(true);
  useEffect(() => {
    let alive = true;
    Sharing.isAvailableAsync()
      .then((ok) => alive && setCanShare(ok))
      .catch(() => alive && setCanShare(false));
    return () => {
      alive = false;
    };
  }, []);

  // Transient one-line notice (share unavailable / capture failed). No Alert — the app
  // replaced every Alert.alert with in-surface messaging.
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flashToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2500);
  }, []);
  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    [],
  );

  const shareCardRef = useRef<View>(null);
  const onShare = useCallback(async () => {
    if (!canShare) {
      flashToast(t('quotes.shareUnavailable'));
      return;
    }
    lightTap();
    try {
      const uri = await captureRef(shareCardRef, {
        format: 'png',
        quality: 1,
        result: 'tmpfile', // cache dir — no storage permission, nothing to clean up
        // See app/result.tsx — without this the share sheet shows the library's
        // "ReactNative-snapshot-image…" default instead of the brand.
        fileName: 'Aurafy_quote_',
        width: 1080,
        height: 1350, // 4:5 — the largest ratio IG and TikTok both accept uncropped
      });
      const ok = await shareImage(uri, t('quotes.shareQuote'));
      if (!ok) flashToast(t('quotes.shareUnavailable'));
    } catch {
      // Capture can fail on an old binary without the native view-shot module.
      flashToast(t('quotes.shareUnavailable'));
    }
  }, [canShare, flashToast, t]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Bloom in TODAY'S colour — the ritual's celestial texture, recoloured daily. */}
      <Svg style={StyleSheet.absoluteFill} width="100%" height="100%" pointerEvents="none">
        <Defs>
          <RadialGradient id="dq_bloom" cx="50%" cy="16%" r="64%">
            <Stop offset="0%" stopColor={accent} stopOpacity={0.3} />
            <Stop offset="55%" stopColor={accent} stopOpacity={0.07} />
            <Stop offset="100%" stopColor={accent} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#dq_bloom)" />
      </Svg>

      <View
        style={[
          styles.page,
          { paddingTop: insets.top + rs(12), paddingBottom: insets.bottom + rs(24) },
        ]}
      >
        {/* Header — back chevron + screen title */}
        <View style={styles.topRow}>
          <TouchableOpacity
            onPress={handleBack}
            style={[styles.circleBtn, { backgroundColor: theme.surface, borderColor: theme.surfaceBorder }]}
            accessibilityLabel={t('common.back')}
            accessibilityRole="button"
          >
            <Feather name={isRTL ? 'chevron-right' : 'chevron-left'} size={rs(20)} color={theme.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.titleRow}>
          <MaterialCommunityIcons name="moon-waning-crescent" size={rs(15)} color={accent} />
          <Text style={[styles.screenTitle, { color: accent }]} numberOfLines={0}>
            {t('quotes.dailyTitle').toUpperCase()}
          </Text>
        </View>

        {/* Quote card — vertically centered, tap to unfold the reflection */}
        <View style={styles.cardWrap}>
          <Animated.View layout={LinearTransition.duration(REVEAL_MS)}>
            <TouchableOpacity
              onPress={toggleReflection}
              activeOpacity={0.9}
              accessibilityRole="button"
              accessibilityLabel={expanded ? content.text : t('quotes.tapToReflect')}
            >
              <Animated.View
                layout={LinearTransition.duration(REVEAL_MS)}
                style={[
                  styles.card,
                  { backgroundColor: theme.surface, borderColor: `${accent}3D` },
                ]}
              >
                <MaterialCommunityIcons
                  name="format-quote-open"
                  size={rs(22)}
                  color={accent}
                />

                <Text style={[styles.quote, { color: theme.text }]} numberOfLines={0}>
                  {content.text}
                </Text>

                <Text style={[styles.attribution, { color: theme.textMuted }]} numberOfLines={0}>
                  {attribution}
                </Text>

                {expanded ? (
                  <Animated.View
                    entering={FadeIn.duration(REVEAL_MS)}
                    layout={LinearTransition.duration(REVEAL_MS)}
                    style={styles.reflectionBlock}
                  >
                    <View style={[styles.divider, { backgroundColor: theme.surfaceBorder }]} />
                    <Text style={[styles.reflection, { color: theme.textMuted }]} numberOfLines={0}>
                      {content.reflection}
                    </Text>
                  </Animated.View>
                ) : (
                  <Animated.View entering={FadeIn.duration(REVEAL_MS)} style={styles.hintRow}>
                    <Text style={[styles.hint, { color: theme.textDim }]} numberOfLines={0}>
                      {t('quotes.tapToReflect')}
                    </Text>
                    <Feather name="chevron-down" size={rs(14)} color={theme.textDim} />
                  </Animated.View>
                )}
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Ritual footer — Done / star-earned, then Share */}
        <Animated.View layout={LinearTransition.duration(REVEAL_MS)} style={styles.footer}>
          {claimed ? (
            <Animated.View style={[styles.revealCol, revealStyle]}>
              <View style={[styles.starCard, { borderColor: `${theme.gold}45` }]}>
                <LinearGradient
                  colors={[`${theme.gold}24`, `${theme.gold}08`]}
                  style={StyleSheet.absoluteFill}
                />
                <View style={styles.starBadgeWrap}>
                  <View
                    style={[styles.starHalo, { backgroundColor: `${theme.gold}1F` }]}
                    pointerEvents="none"
                  />
                  <View
                    style={[
                      styles.starGlow,
                      { backgroundColor: `${theme.gold}2E`, borderColor: `${theme.gold}80` },
                    ]}
                  >
                    <MaterialCommunityIcons name="star" size={rs(22)} color={theme.gold} />
                  </View>
                </View>
                <View style={styles.starTextCol}>
                  <Text style={[styles.starTitle, { color: theme.gold }]} numberOfLines={0}>
                    {t('daily.starEarned')}
                  </Text>
                  <Text style={[styles.starBalance, { color: theme.text }]} numberOfLines={0}>
                    {t('daily.balanceNow', { balance: stars })}
                  </Text>
                  {/* No "Day X of 7" here — the streak lives on the Stars screen (Simo
                      2026-07-25). Repeating it made this card a second scoreboard. */}
                </View>
              </View>

              {/* Nudge back tomorrow — a quiet caption, NOT a second button. It was a
                  full-size pill and read louder than the reward it sits under. */}
              <View style={styles.comeBackRow}>
                <Feather name="check" size={rs(12)} color={theme.textDim} />
                <Text style={[styles.comeBackText, { color: theme.textDim }]} numberOfLines={0}>
                  {t('daily.comeBackTomorrow')}
                </Text>
              </View>
            </Animated.View>
          ) : (
            <TouchableOpacity
              onPress={onDone}
              style={[
                styles.doneBtn,
                { borderColor: `${theme.gold}3D`, backgroundColor: `${theme.gold}0F` },
              ]}
              activeOpacity={0.85}
              accessibilityRole="button"
              accessibilityLabel={t('quotes.done')}
            >
              <View
                style={[
                  styles.doneCheck,
                  { borderColor: `${theme.gold}66`, backgroundColor: `${theme.gold}1F` },
                ]}
              >
                <Feather name="check" size={rs(12)} color={theme.gold} />
              </View>
              <Text style={[styles.doneText, { color: theme.text }]} numberOfLines={0}>
                {t('quotes.done')}
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={onShare}
            disabled={!canShare}
            style={[styles.shareRow, !canShare && styles.shareRowDisabled]}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityState={{ disabled: !canShare }}
            accessibilityLabel={t('quotes.shareCta')}
          >
            <Feather
              name="share-2"
              size={rs(14)}
              color={canShare ? theme.textMuted : theme.textDim}
            />
            <Text
              style={[styles.shareText, { color: canShare ? theme.textMuted : theme.textDim }]}
              numberOfLines={0}
            >
              {t('quotes.shareCta')}
            </Text>
          </TouchableOpacity>

          {toast ? (
            <Animated.View entering={FadeIn.duration(160)}>
              <Text style={[styles.toast, { color: theme.textDim }]} numberOfLines={0}>
                {toast}
              </Text>
            </Animated.View>
          ) : null}
        </Animated.View>

        {/* Bottom banner. This is a ROOT-stack screen, not a tab, so it does NOT double up
            with the persistent banner above the tab bar. AdBanner reserves no height and
            self-collapses to null in Expo Go and on any load failure — including offline —
            so no dead ad space is ever shown. */}
        <AdBanner style={styles.banner} />
      </View>

      {/* Off-screen share card — captured by onShare, never visible in the layout.
          Parked past the leading edge; collapsable={false} so Android keeps the real
          view alive for view-shot instead of flattening it away. */}
      <View ref={shareCardRef} collapsable={false} pointerEvents="none" style={styles.shareCardHost}>
        <QuoteShareCard text={content.text} attribution={attribution} accent={accent} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  page: { flex: 1, paddingHorizontal: rs(20) },

  topRow: { flexDirection: 'row', alignItems: 'center' },
  circleBtn: {
    width: rs(40),
    height: rs(40),
    borderRadius: 999,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: rs(7),
    marginTop: rs(10),
  },
  screenTitle: {
    fontSize: rs(11.5),
    fontFamily: 'HankenGrotesk_700Bold',
    letterSpacing: 1.4,
  },

  /* quote card — vertically centered in the remaining space */
  cardWrap: { flex: 1, justifyContent: 'center' },
  card: {
    borderWidth: 1,
    borderRadius: rs(20),
    paddingVertical: rs(28),
    paddingHorizontal: rs(22),
    alignItems: 'center',
    gap: rs(12),
  },
  quote: {
    fontSize: rs(24),
    lineHeight: rs(34),
    fontFamily: 'PlayfairDisplay_600SemiBold',
    letterSpacing: -0.3,
    textAlign: 'center',
  },
  attribution: {
    fontSize: rs(13),
    lineHeight: rs(19),
    fontFamily: 'HankenGrotesk_500Medium',
    textAlign: 'center',
    opacity: 0.6,
  },

  hintRow: { flexDirection: 'row', alignItems: 'center', gap: rs(5), marginTop: rs(2) },
  hint: { fontSize: rs(12), fontFamily: 'HankenGrotesk_500Medium', letterSpacing: 0.2 },

  reflectionBlock: { alignSelf: 'stretch', alignItems: 'center', gap: rs(14), marginTop: rs(2) },
  divider: { height: StyleSheet.hairlineWidth, alignSelf: 'stretch' },
  reflection: {
    fontSize: rs(14.5),
    lineHeight: rs(23),
    fontFamily: 'HankenGrotesk_400Regular',
    textAlign: 'center',
  },

  /* footer */
  footer: { gap: rs(14) },
  revealCol: { gap: rs(12) },

  starCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(14),
    borderRadius: rs(16),
    borderWidth: 1,
    padding: rs(15),
    overflow: 'hidden',
  },
  // Centered wrapper so the halo sits behind the badge without an Android elevation
  // shadow (which rendered as a dark box behind the star).
  starBadgeWrap: { width: rs(44), height: rs(44), alignItems: 'center', justifyContent: 'center' },
  starHalo: { position: 'absolute', width: rs(56), height: rs(56), borderRadius: rs(28) },
  starGlow: {
    width: rs(44),
    height: rs(44),
    borderRadius: rs(22),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  starTextCol: { flex: 1, gap: rs(2) },
  starTitle: { fontSize: rs(15.5), fontFamily: 'HankenGrotesk_700Bold' },
  starBalance: { fontSize: rs(13.5), lineHeight: rs(18), fontFamily: 'HankenGrotesk_600SemiBold' },

  /* come-back caption — deliberately quiet, no pill, no border */
  comeBackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: rs(6),
    alignSelf: 'center',
    paddingVertical: rs(2),
  },
  comeBackText: {
    flexShrink: 1,
    fontSize: rs(12),
    lineHeight: rs(17),
    fontFamily: 'HankenGrotesk_400Regular',
    textAlign: 'center',
  },

  doneBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: rs(9),
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: rs(13),
    paddingStart: rs(16),
    paddingEnd: rs(26),
  },
  doneBtnDisabled: { opacity: 0.75 },
  doneCheck: {
    width: rs(22),
    height: rs(22),
    borderRadius: rs(11),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneText: {
    flexShrink: 1,
    fontSize: rs(14.5),
    lineHeight: rs(20),
    fontFamily: 'HankenGrotesk_600SemiBold',
    letterSpacing: 0.3,
  },

  shareRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: rs(7),
    alignSelf: 'center',
    paddingVertical: rs(6),
  },
  // Zero-height until a fill arrives, so the footer never jumps on an offline load.
  banner: { marginTop: rs(10) },

  shareRowDisabled: { opacity: 0.5 },
  shareText: { fontSize: rs(13.5), fontFamily: 'HankenGrotesk_600SemiBold' },
  toast: {
    fontSize: rs(12),
    lineHeight: rs(17),
    fontFamily: 'HankenGrotesk_400Regular',
    textAlign: 'center',
  },

  // Parked off-screen in RAW px (the card is a fixed logical canvas, never rs()-scaled).
  shareCardHost: {
    position: 'absolute',
    top: 0,
    left: -QUOTE_CARD_W - 60,
    width: QUOTE_CARD_W,
    height: QUOTE_CARD_H,
  },
});
