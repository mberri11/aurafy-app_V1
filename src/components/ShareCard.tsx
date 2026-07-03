// ─────────────────────────────────────────────────────────────────────────────
// SHARE CARD (design: Screenshots_new/share_card.png) — the 1080×1920 story
// image behind the result + weekly Share buttons. Rendered OFF-SCREEN on a fixed
// 360×640 logical canvas — raw px, deliberately NOT rs(): the export must look
// identical on every device — and captured at 3× by react-native-view-shot.
//
// Reading variant = per-module spine colors (NOTE: the design PNG still shows
// Who Loves Me in its pre-2026-07-03 pink; per the COLOR RULE the card renders
// the CURRENT module accent — violet — PNG re-export pending). Weekly variant =
// the constant weekly-cyan identity (same as the History weekly card).
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Svg, { Circle, Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppText as Text } from '@/src/components/AppText';
import AurafyLogo from '@/src/components/AurafyLogo';

/** Logical canvas — capture with { width: 1080, height: 1920 } for the export. */
export const SHARE_CARD_W = 360;
export const SHARE_CARD_H = 640;

// Weekly identity — constant cyan, matching History's weekly card treatment.
const WEEKLY_ACCENT = '#22D3EE';
const WEEKLY_SOFT = '#67E8F9';

type ShareCardProps =
  | {
      variant: 'reading';
      accent: string;
      accentSoft: string;
      /** Module subtitle, uppercase (e.g. "WHO TRULY HAS YOUR BACK"). */
      eyebrow: string;
      /** Winner name (multi) or the verdict word (solo). */
      name: string;
      /** Winner template minus the name ("loves you the most.") / solo verdict sentence. */
      verdictLine: string;
      quote: string;
    }
  | {
      variant: 'weekly';
      /** Localized WeekOutcome title (e.g. "The Anchor Seeker"). */
      title: string;
      quote: string;
    };

/** Deterministic star field — hand-placed so every export looks identical. */
const STARS: { x: number; y: number; r: number; o: number }[] = [
  { x: 30, y: 88, r: 1.4, o: 0.8 },
  { x: 322, y: 64, r: 1.1, o: 0.55 },
  { x: 128, y: 58, r: 0.9, o: 0.45 },
  { x: 226, y: 40, r: 1.0, o: 0.5 },
  { x: 60, y: 176, r: 1.0, o: 0.4 },
  { x: 300, y: 150, r: 1.3, o: 0.6 },
  { x: 258, y: 96, r: 1.0, o: 0.5 },
  { x: 90, y: 120, r: 0.8, o: 0.35 },
  { x: 340, y: 208, r: 0.9, o: 0.4 },
  { x: 20, y: 240, r: 0.9, o: 0.35 },
  { x: 36, y: 320, r: 1.2, o: 0.5 },
  { x: 326, y: 300, r: 1.0, o: 0.45 },
  { x: 48, y: 470, r: 1.1, o: 0.5 },
  { x: 310, y: 452, r: 1.3, o: 0.55 },
  { x: 96, y: 540, r: 0.9, o: 0.35 },
  { x: 276, y: 560, r: 1.0, o: 0.4 },
  { x: 160, y: 500, r: 0.8, o: 0.3 },
  { x: 180, y: 92, r: 0.8, o: 0.3 },
];

export default function ShareCard(props: ShareCardProps) {
  const { t } = useTranslation();
  const isReading = props.variant === 'reading';
  const accent = isReading ? props.accent : WEEKLY_ACCENT;
  const soft = isReading ? props.accentSoft : WEEKLY_SOFT;

  return (
    <View style={styles.card}>
      {/* Accent-tinted night sky: top wash + central bloom + stars */}
      <Svg width={SHARE_CARD_W} height={SHARE_CARD_H} style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id="sc_top" cx="50%" cy="0%" r="70%">
            <Stop offset="0%" stopColor={soft} stopOpacity={0.1} />
            <Stop offset="100%" stopColor={soft} stopOpacity={0} />
          </RadialGradient>
          <RadialGradient id="sc_bloom" cx="50%" cy="44%" r="46%">
            <Stop offset="0%" stopColor={soft} stopOpacity={0.38} />
            <Stop offset="45%" stopColor={accent} stopOpacity={0.14} />
            <Stop offset="100%" stopColor={accent} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="#07091A" />
        <Rect width="100%" height="100%" fill="url(#sc_top)" />
        <Rect width="100%" height="100%" fill="url(#sc_bloom)" />
        {/* Faint planet rim on the bloom's lower right (reading design detail) */}
        {isReading && (
          <Circle
            cx={208}
            cy={296}
            r={104}
            stroke="rgba(255,255,255,0.04)"
            strokeWidth={1.5}
            fill="none"
          />
        )}
        {STARS.map((s, i) => (
          <Circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#FFFFFF" opacity={s.o} />
        ))}
      </Svg>

      {/* ✦ sparkles (icon font renders fine in the snapshot) */}
      <MaterialCommunityIcons
        name="star-four-points"
        size={10}
        color={accent}
        style={[styles.sparkle, { top: 150, left: 56, opacity: 0.8 }]}
      />
      <MaterialCommunityIcons
        name="star-four-points"
        size={7}
        color={soft}
        style={[styles.sparkle, { top: 96, right: 84, opacity: 0.5 }]}
      />
      <MaterialCommunityIcons
        name="star-four-points"
        size={8}
        color={soft}
        style={[styles.sparkle, { bottom: 200, left: 40, opacity: 0.45 }]}
      />

      {/* Header: atom mark + wordmark */}
      <View style={styles.header}>
        <AurafyLogo size={32} />
        <Text latin style={styles.wordmark}>
          Aurafy
        </Text>
      </View>

      {/* Center block */}
      <View style={[styles.center, { top: isReading ? 250 : 162 }]}>
        {!isReading && (
          <Svg width={150} height={92} style={styles.venn}>
            <Circle cx={56} cy={46} r={42} stroke={accent} strokeWidth={1.2} fill="none" opacity={0.85} />
            <Circle cx={94} cy={46} r={42} stroke={accent} strokeWidth={1.2} fill="none" opacity={0.85} />
            <Circle cx={75} cy={46} r={9} fill={soft} opacity={0.35} />
            <Circle cx={75} cy={46} r={4.5} fill="#FFFFFF" />
          </Svg>
        )}
        <View style={styles.eyebrowRow}>
          {isReading && (
            <MaterialCommunityIcons name="star-four-points" size={9} color={accent} style={styles.eyebrowStar} />
          )}
          <Text style={[styles.eyebrow, { color: isReading ? soft : accent }]}>
            {isReading ? props.eyebrow : t('shareCard.weekEyebrow')}
          </Text>
        </View>
        <Text
          style={[
            isReading ? styles.name : styles.weeklyTitle,
            { textShadowColor: accent },
          ]}
          numberOfLines={isReading ? 1 : 2}
          adjustsFontSizeToFit
        >
          {isReading ? props.name : props.title}
        </Text>
        {isReading && !!props.verdictLine && (
          <Text style={styles.verdict}>{props.verdictLine}</Text>
        )}
      </View>

      {/* Pull-quote (readings saved before shareLines shipped have none — hide) */}
      {!!props.quote && (
        <Text style={[styles.quote, { color: soft }]}>{`“${props.quote}”`}</Text>
      )}

      {/* CTA pill + watermark */}
      <View style={styles.ctaWrap}>
        <View style={styles.cta}>
          <Text style={styles.ctaText}>
            {isReading ? t('shareCard.ctaReading') : t('shareCard.ctaWeekly')}
          </Text>
        </View>
      </View>
      <Text latin style={styles.watermark}>
        {t('shareCard.watermark')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: SHARE_CARD_W,
    height: SHARE_CARD_H,
    backgroundColor: '#07091A',
    overflow: 'hidden',
  },
  sparkle: { position: 'absolute' },

  header: { position: 'absolute', top: 38, left: 0, right: 0, alignItems: 'center' },
  wordmark: {
    marginTop: 6,
    fontSize: 17,
    fontFamily: 'PlayfairDisplay_600SemiBold',
    color: '#FFFFFF',
  },

  center: { position: 'absolute', left: 0, right: 0, alignItems: 'center', paddingHorizontal: 24 },
  venn: { marginBottom: 16 },
  eyebrowRow: { flexDirection: 'row', alignItems: 'center' },
  eyebrowStar: { marginEnd: 6 },
  eyebrow: {
    fontSize: 10,
    fontFamily: 'HankenGrotesk_600SemiBold',
    letterSpacing: 2.4,
    textTransform: 'uppercase',
  },
  name: {
    marginTop: 10,
    fontSize: 60,
    lineHeight: 72,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    maxWidth: SHARE_CARD_W - 48,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 14,
  },
  weeklyTitle: {
    marginTop: 8,
    fontSize: 38,
    lineHeight: 46,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    maxWidth: SHARE_CARD_W - 48,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  verdict: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'HankenGrotesk_400Regular',
    color: 'rgba(255,255,255,0.95)',
    textAlign: 'center',
    maxWidth: SHARE_CARD_W - 64,
  },

  quote: {
    position: 'absolute',
    top: 486,
    left: 40,
    right: 40,
    fontSize: 16,
    lineHeight: 23,
    fontFamily: 'PlayfairDisplay_400Regular_Italic',
    textAlign: 'center',
    opacity: 0.92,
  },

  ctaWrap: { position: 'absolute', top: 554, left: 0, right: 0, alignItems: 'center' },
  cta: {
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    backgroundColor: 'rgba(255,255,255,0.07)',
  },
  ctaText: { fontSize: 13, fontFamily: 'HankenGrotesk_600SemiBold', color: '#FFFFFF' },
  watermark: {
    position: 'absolute',
    top: 601,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 11,
    fontFamily: 'HankenGrotesk_500Medium',
    color: 'rgba(255,255,255,0.45)',
  },
});
