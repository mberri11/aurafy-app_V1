// ─────────────────────────────────────────────────────────────────────────────
// QUOTE SHARE CARD — the 1080×1350 (4:5) image behind the daily quote's Share
// button. 4:5 is the largest ratio both Instagram and TikTok accept uncropped.
//
// Rendered OFF-SCREEN on a fixed 360×450 logical canvas in RAW px — deliberately
// NOT rs(): the exported image must be byte-identical on every device, so it must
// not scale with the viewport. Captured at 3× by react-native-view-shot.
//
// Shares the result ShareCard's visual language (deep themed base + wash + deterministic
// star field + hairline + quiet brand footer + signature frame), but is quote-specific:
// the wash is driven ENTIRELY by TODAY'S accent (see `base`/`halo`/`deep` below), while
// the active theme owns the base plate and the type. So an unlocked theme shows up in the
// share, and so does the day — the two no longer fight for the same pixels.
//
// RTL: native forceRTL does all the mirroring. No `row-reverse`, no
// `textAlign: 'right'`. The brand footer uses the logical `end` edge so it mirrors
// natively. The only language branch is a LINE-HEIGHT boost for Arabic (Naskh
// needs more leading for its diacritics) — that is typography, not a layout flip.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Svg, { Circle, Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppText as Text } from '@/src/components/AppText';
import AurafyLogo from '@/src/components/AurafyLogo';
import { useTheme } from '@/src/themes/ThemeProvider';
import { darkenHex, lightenHex } from '@/src/themes/categoryTheme';

/** Logical canvas — capture with { width: 1080, height: 1350 } for the export (3×). */
export const QUOTE_CARD_W = 360;
export const QUOTE_CARD_H = 450;

export interface QuoteShareCardProps {
  /** The quote line itself (already localized). */
  text: string;
  /** Resolved display name — the author, or "Aurafy" for original lines. Never empty. */
  attribution: string;
  /**
   * TODAY'S colour — `theme.dailyAccents[getDailyAccentIndex(anchor)]`, passed in so the
   * exported image matches the screen the user just read. Omit and the card falls back to
   * the theme's middle prism stop.
   */
  accent?: string;
}

/**
 * Stepped type scale. A deterministic step function, NOT `adjustsFontSizeToFit`:
 * that prop is unreliable inside a view-shot capture on Android (it measures after
 * layout and the snapshot can race it), which produced clipped exports.
 *
 * Calibrated against the real content — longest EN line is 93 chars (q_014) and the
 * longest AR line is 59 (q_006). Both land in a step that wraps to ≤4 lines inside
 * the 270px (75%) text column with room to spare.
 */
function typeScale(len: number): { fontSize: number; lineHeight: number } {
  if (len <= 45) return { fontSize: 30, lineHeight: 42 };
  if (len <= 70) return { fontSize: 26, lineHeight: 37 };
  if (len <= 100) return { fontSize: 22, lineHeight: 32 };
  return { fontSize: 19, lineHeight: 28 };
}

/** Deterministic star field — hand-placed so every export looks identical. */
const STARS: { x: number; y: number; r: number; o: number }[] = [
  { x: 30, y: 64, r: 1.4, o: 0.8 },
  { x: 322, y: 48, r: 1.1, o: 0.55 },
  { x: 128, y: 42, r: 0.9, o: 0.45 },
  { x: 226, y: 30, r: 1.0, o: 0.5 },
  { x: 60, y: 128, r: 1.0, o: 0.4 },
  { x: 300, y: 108, r: 1.3, o: 0.6 },
  { x: 258, y: 70, r: 1.0, o: 0.5 },
  { x: 90, y: 88, r: 0.8, o: 0.35 },
  { x: 340, y: 152, r: 0.9, o: 0.4 },
  { x: 20, y: 176, r: 0.9, o: 0.35 },
  { x: 36, y: 236, r: 1.2, o: 0.5 },
  { x: 326, y: 220, r: 1.0, o: 0.45 },
  { x: 48, y: 336, r: 1.1, o: 0.5 },
  { x: 310, y: 322, r: 1.3, o: 0.55 },
  { x: 96, y: 386, r: 0.9, o: 0.35 },
  { x: 276, y: 398, r: 1.0, o: 0.4 },
  { x: 160, y: 358, r: 0.8, o: 0.3 },
  { x: 180, y: 68, r: 0.8, o: 0.3 },
];

export default function QuoteShareCard({ text, attribution, accent }: QuoteShareCardProps) {
  const { t, i18n } = useTranslation();
  const theme = useTheme();

  // THE WHOLE WASH IS ACCENT-DERIVED (fix, 2026-07-25). It used to mix today's accent
  // (centre bloom only) with two FIXED theme prism stops for the top and low washes —
  // so five of the eight colour uses ignored the day entirely. On a pale accent like
  // cosmic's day-7 pearl the fixed cyan + mint simply drowned it and every card looked
  // the same. Now every tint is a shade of the day's colour:
  //   halo = lighter, base = the accent, deep = darker.
  // The THEME still owns the card through `background` and `text` — the day owns the
  // light. Do not reintroduce theme.gradient stops here.
  const base = accent ?? theme.gradient[1];
  const halo = lightenHex(base, 0.26);
  const deep = darkenHex(base, 0.34);

  const scale = typeScale(text.length);
  // Naskh carries diacritics above and below the baseline — give Arabic more leading
  // so ascenders/descenders never collide or clip at the capture size.
  const lineHeight =
    i18n.language === 'ar' ? Math.round(scale.lineHeight * 1.18) : scale.lineHeight;

  return (
    <View style={[styles.card, { backgroundColor: theme.background }]}>
      {/* Themed night sky: top wash + centre bloom + low counter-bloom + stars */}
      <Svg width={QUOTE_CARD_W} height={QUOTE_CARD_H} style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id="qc_top" cx="50%" cy="0%" r="72%">
            <Stop offset="0%" stopColor={halo} stopOpacity={0.18} />
            <Stop offset="100%" stopColor={halo} stopOpacity={0} />
          </RadialGradient>
          <RadialGradient id="qc_bloom" cx="50%" cy="42%" r="52%">
            <Stop offset="0%" stopColor={halo} stopOpacity={0.38} />
            <Stop offset="48%" stopColor={base} stopOpacity={0.15} />
            <Stop offset="100%" stopColor={base} stopOpacity={0} />
          </RadialGradient>
          <RadialGradient id="qc_low" cx="78%" cy="96%" r="55%">
            <Stop offset="0%" stopColor={deep} stopOpacity={0.22} />
            <Stop offset="100%" stopColor={deep} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect width="100%" height="100%" fill={theme.background} />
        <Rect width="100%" height="100%" fill="url(#qc_top)" />
        <Rect width="100%" height="100%" fill="url(#qc_bloom)" />
        <Rect width="100%" height="100%" fill="url(#qc_low)" />
        {/* Planet limb — the result card's signature detail, parked LOW so only its top
            arc shows. It used to be centred at (208,206) r104, which put the ring edge
            straight through the quote and the attribution; it read as a stray halo around
            the text rather than a horizon. Top of the arc now sits at y=320, clear of the
            centre band (which bottoms out near y=303 on a 3-line quote). */}
        <Circle
          cx={180}
          cy={470}
          r={150}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={1.5}
          fill="none"
        />
        {STARS.map((s, i) => (
          <Circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#FFFFFF" opacity={s.o} />
        ))}
      </Svg>

      {/* ✦ sparkles */}
      <MaterialCommunityIcons
        name="star-four-points"
        size={10}
        color={base}
        style={[styles.sparkle, styles.sparkleA]}
      />
      <MaterialCommunityIcons
        name="star-four-points"
        size={7}
        color={halo}
        style={[styles.sparkle, styles.sparkleB]}
      />
      <MaterialCommunityIcons
        name="star-four-points"
        size={8}
        color={halo}
        style={[styles.sparkle, styles.sparkleC]}
      />

      {/* Centre group — open quote glyph, the line, hairline, attribution */}
      <View style={styles.center}>
        <MaterialCommunityIcons
          name="format-quote-open"
          size={26}
          color={base}
          style={styles.quoteGlyph}
        />

        <Text
          style={[styles.quote, { color: theme.text, fontSize: scale.fontSize, lineHeight }]}
          numberOfLines={0}
        >
          {text}
        </Text>

        <View style={styles.attributionBlock}>
          <View style={[styles.rule, { backgroundColor: theme.text, opacity: 0.35 }]} />
          <Text style={[styles.attribution, { color: theme.text }]} numberOfLines={0}>
            {attribution}
          </Text>
        </View>
      </View>

      {/* Quiet brand footer — the growth engine. Ships on EVERY card, always present.
          Logical `end` edge so native RTL mirrors it without a manual flip.
          The mark is 20px WITH its halo and sits at full opacity: at 16px flat inside a
          0.75-opacity group it disappeared into the dark plate on the exported PNG — the
          one element that must survive a re-share was the least legible thing on the card. */}
      <View style={styles.brand}>
        <AurafyLogo size={20} />
        <Text latin style={[styles.brandHandle, { color: theme.text }]}>
          {t('shareCard.watermark')}
        </Text>
      </View>

      {/* Signature frame — the same app signature the result cards carry. */}
      <View pointerEvents="none" style={[styles.frame, { borderColor: `${base}77` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: QUOTE_CARD_W,
    height: QUOTE_CARD_H,
    overflow: 'hidden',
  },
  frame: {
    position: 'absolute',
    top: 14,
    left: 14,
    right: 14,
    bottom: 14,
    borderWidth: 1,
    borderRadius: 18,
  },

  sparkle: { position: 'absolute' },
  sparkleA: { top: 104, left: 52, opacity: 0.8 },
  sparkleB: { top: 70, right: 74, opacity: 0.5 },
  sparkleC: { bottom: 128, left: 38, opacity: 0.45 },

  // The centre group fills the band between the top edge and the brand footer, so the
  // quote is optically centred whatever its length.
  center: {
    position: 'absolute',
    top: 56,
    bottom: 84,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    // 45px each side of 360 → a 270px column = 75% max text width.
    paddingHorizontal: 45,
  },
  quoteGlyph: { opacity: 0.75, marginBottom: 10 },
  quote: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    letterSpacing: -0.3,
    textAlign: 'center',
  },

  attributionBlock: { alignItems: 'center', marginTop: 22 },
  rule: {
    width: 34,
    height: StyleSheet.hairlineWidth,
    marginBottom: 12,
  },
  attribution: {
    fontSize: 11,
    lineHeight: 17,
    fontFamily: 'HankenGrotesk_600SemiBold',
    letterSpacing: 2.2,
    textAlign: 'center',
    textTransform: 'uppercase',
    opacity: 0.6,
  },

  brand: {
    position: 'absolute',
    bottom: 30,
    end: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandHandle: {
    fontSize: 11.5,
    fontFamily: 'HankenGrotesk_600SemiBold',
    letterSpacing: 0.4,
    // Only the handle is dimmed — the MARK stays at full strength so it reads.
    opacity: 0.8,
  },
});
