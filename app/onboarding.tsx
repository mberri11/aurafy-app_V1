import React, { useCallback, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { AppText as Text } from '@/src/components/AppText';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, {
  Circle,
  Defs,
  Ellipse,
  LinearGradient as SvgLinearGradient,
  Path,
  RadialGradient,
  Rect,
  Stop,
} from 'react-native-svg';

import { useUserStore } from '@/src/store/userStore';
import { useTransitionStore } from '@/src/store/transitionStore';
import { useTheme } from '@/src/themes/ThemeProvider';
import GradientButton from '@/src/components/GradientButton';
import { rs } from '@/src/utils/responsive';
import { useIsRTL } from '@/src/utils/rtl';

/** Design cyan used for the sample-card eyebrow labels — no exact theme token. */
const CARD_CYAN = '#22D3EE';
const TOTAL_SLIDES = 3;

/* -------------------------------------------------------------------------- */
/*        Slide 1 hero — three glowing person glyphs (teal/violet/emerald)    */
/* -------------------------------------------------------------------------- */

type Glyph = { id: string; width: number; light: string; dark: string; glow: string };

const GLYPHS: Glyph[] = [
  { id: 'teal', width: rs(84), light: '#67E8F9', dark: '#0E7490', glow: '#22D3EE' },
  { id: 'violet', width: rs(112), light: '#C4B5FD', dark: '#7C3AED', glow: '#A78BFA' },
  { id: 'emerald', width: rs(84), light: '#6EE7B7', dark: '#059669', glow: '#10B981' },
];

function PersonGlyph({ id, width, light, dark, glow }: Glyph) {
  const height = width * (138 / 84);
  // Halo canvas is much larger than the figure so the glow can bleed softly on
  // every side (react-native-svg clips to the element box, so the figure can't
  // hold a glow that extends past its own silhouette — a separate layer can).
  const glowSize = width * 2.05;
  return (
    <View style={[heroStyles.glyphWrap, { width, height }]}>
      {/* soft luminous halo — overflows the figure box, sits behind it */}
      <Svg
        width={glowSize}
        height={glowSize}
        pointerEvents="none"
        style={[
          heroStyles.halo,
          { left: (width - glowSize) / 2, top: height * 0.32 - glowSize / 2 },
        ]}
      >
        <Defs>
          <RadialGradient id={`glow-${id}`} cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor={glow} stopOpacity={0.66} />
            <Stop offset="38%" stopColor={glow} stopOpacity={0.24} />
            <Stop offset="100%" stopColor={glow} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Circle cx={glowSize / 2} cy={glowSize / 2} r={glowSize / 2} fill={`url(#glow-${id})`} />
      </Svg>

      {/* the figure */}
      <Svg width={width} height={height} viewBox="0 0 84 138">
        <Defs>
          <SvgLinearGradient id={`fill-${id}`} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={light} />
            <Stop offset="100%" stopColor={dark} />
          </SvgLinearGradient>
        </Defs>
        {/* head */}
        <Circle cx="42" cy="32" r="21" fill={`url(#fill-${id})`} />
        {/* dome-shouldered body */}
        <Path d="M12 138 L12 86 Q12 58 42 58 Q72 58 72 86 L72 138 Z" fill={`url(#fill-${id})`} />
      </Svg>
    </View>
  );
}

function HeroPeople() {
  return (
    <View style={heroStyles.peopleRow}>
      {GLYPHS.map((g) => (
        <PersonGlyph key={g.id} {...g} />
      ))}
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/*        Background — soft violet bloom in the upper field (all slides)       */
/* -------------------------------------------------------------------------- */

/**
 * Concentrated violet bloom behind the content. The flat LinearGradient tints alone
 * read darker/flatter than the design, which shows a soft glow in the upper area
 * (upper-center on slide 1, upper-left on slide 3). A radial gradient gives that bloom.
 */
function BackgroundGlow() {
  const theme = useTheme();
  const { width, height } = useWindowDimensions();
  return (
    <Svg width={width} height={height} style={StyleSheet.absoluteFill} pointerEvents="none">
      <Defs>
        <RadialGradient
          id="bgGlow"
          cx={width * 0.44}
          cy={height * 0.22}
          r={width * 1.05}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0%" stopColor={theme.primary} stopOpacity={0.24} />
          <Stop offset="42%" stopColor={theme.primary} stopOpacity={0.09} />
          <Stop offset="100%" stopColor={theme.primary} stopOpacity={0} />
        </RadialGradient>
      </Defs>
      <Rect x={0} y={0} width={width} height={height} fill="url(#bgGlow)" />
    </Svg>
  );
}

/* -------------------------------------------------------------------------- */
/*           Slide 2 hero — fanned stack of glass question cards              */
/* -------------------------------------------------------------------------- */

/**
 * Translucent "frosted glass" sample card. We deliberately do NOT use GlassCard
 * here — on Android (Expo Go) it falls back to an opaque `bg2` fill and reads as
 * a solid black card. The design wants cards you can see the background through,
 * so we layer a faint white sheen over a transparent fill with a light border.
 */
function SampleCard({
  tag,
  question,
  textColor,
  opaque = false,
}: {
  tag: string;
  question: string;
  textColor: string;
  /** Front card: near-opaque frosted fill so the cards behind it don't bleed text through. */
  opaque?: boolean;
}) {
  return (
    <View style={[cardStyles.card, opaque && cardStyles.cardOpaque]}>
      <LinearGradient
        colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.01)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      <Text style={cardStyles.tag}>{tag.toUpperCase()}</Text>
      <Text style={[cardStyles.question, { color: textColor }]}>{question}</Text>
    </View>
  );
}

function HeroCards() {
  const theme = useTheme();
  const { t } = useTranslation();
  const isRTL = useIsRTL();
  // Mirror the fanned card stack in RTL by negating both the tilt and the X offset
  // (transforms aren't auto-mirrored), so the fan opens the other way.
  const fan = (deg: number, x: number, y: number) => ({
    transform: [
      { rotate: `${isRTL ? -deg : deg}deg` },
      { translateX: rs(isRTL ? -x : x) },
      { translateY: rs(y) },
    ],
  });
  return (
    <View style={cardStyles.stack}>
      {/* third card — peeks out to the leading side, furthest back */}
      <View style={[cardStyles.cardSlot, cardStyles.thirdCard, fan(9, 60, -6)]}>
        <SampleCard
          tag={t('onboarding.cardLoveTag')}
          question={t('onboarding.cardLoveQuestion')}
          textColor={theme.textDim}
        />
      </View>
      {/* back card — peeks out to the other side, tilted */}
      <View style={[cardStyles.cardSlot, cardStyles.backCard, fan(-10, -48, -4)]}>
        <SampleCard
          tag={t('onboarding.cardSociometryTag')}
          question={t('onboarding.cardSociometryQuestion')}
          textColor={theme.textMuted}
        />
      </View>
      {/* front card — tilted the other way, on top; opaque so backs don't bleed through */}
      <View style={[cardStyles.cardSlot, cardStyles.frontCard, fan(3, 6, -14)]}>
        <SampleCard
          tag={t('onboarding.cardAttachmentTag')}
          question={t('onboarding.cardAttachmentQuestion')}
          textColor={theme.text}
          opaque
        />
      </View>
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/*        Slide 3 hero — gold star + three "earn" mini-cards                  */
/* -------------------------------------------------------------------------- */

function HeroStar() {
  const theme = useTheme();
  return (
    <View style={starStyles.wrap}>
      <Svg width={rs(170)} height={rs(170)} style={StyleSheet.absoluteFill} pointerEvents="none">
        <Defs>
          <RadialGradient id="starglow" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor={theme.gold} stopOpacity={0.38} />
            <Stop offset="45%" stopColor={theme.gold} stopOpacity={0.12} />
            <Stop offset="100%" stopColor={theme.gold} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Ellipse cx={rs(85)} cy={rs(85)} rx={rs(85)} ry={rs(85)} fill="url(#starglow)" />
      </Svg>
      <MaterialCommunityIcons name="star" size={rs(88)} color={theme.gold} />
    </View>
  );
}

function EarnCardsRow() {
  const theme = useTheme();
  const { t } = useTranslation();

  const tiles = [
    {
      renderIcon: (c: string) => (
        <MaterialCommunityIcons name="hand-coin-outline" size={rs(18)} color={c} />
      ),
      tint: theme.gold,
      label: `${t('onboarding.earnUseLabel')} ✦`,
      amount: t('onboarding.earnUseAmount'),
    },
    {
      renderIcon: (c: string) => <Feather name="calendar" size={rs(18)} color={c} />,
      tint: theme.primary,
      label: t('onboarding.earnDailyLabel'),
      amount: t('onboarding.earnDailyAmount'),
    },
    {
      renderIcon: (c: string) => <Feather name="play" size={rs(18)} color={c} />,
      tint: theme.gradient[2],
      label: t('onboarding.earnWatchLabel'),
      amount: t('onboarding.earnWatchAmount'),
    },
  ];

  return (
    <View style={earnStyles.row}>
      {tiles.map((tile, i) => (
        <View
          key={i}
          style={[
            earnStyles.card,
            { borderColor: theme.surfaceBorder, backgroundColor: theme.surface },
          ]}
        >
          <View style={[earnStyles.iconRing, { borderColor: tile.tint }]}>
            {tile.renderIcon(tile.tint)}
          </View>
          <Text style={[earnStyles.label, { color: tile.tint }]}>{tile.label}</Text>
          <Text style={[earnStyles.amount, { color: theme.textMuted }]}>{tile.amount}</Text>
        </View>
      ))}
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Onboarding                                  */
/* -------------------------------------------------------------------------- */

export default function OnboardingScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const setOnboarded = useUserStore((s) => s.setOnboarded);
  const [slide, setSlide] = useState(0);

  // Skip — same as Begin: flag Home to play the cosmic intro overlay, then enter the app.
  const finish = useCallback(() => {
    setOnboarded();
    useTransitionStore.getState().requestIntro();
    router.replace('/(tabs)');
  }, [setOnboarded]);

  // Begin — go straight to Home and flag it to play the cosmic intro overlay (no
  // separate route, so there is no transition gap before Home).
  const begin = useCallback(() => {
    setOnboarded();
    useTransitionStore.getState().requestIntro();
    router.replace('/(tabs)');
  }, [setOnboarded]);

  const handleNext = useCallback(() => {
    setSlide((s) => (s < TOTAL_SLIDES - 1 ? s + 1 : s));
  }, []);

  const isLast = slide === TOTAL_SLIDES - 1;

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      {/* Background — same field as splash */}
      <LinearGradient
        colors={[theme.bg2, theme.background, theme.background]}
        locations={[0, 0.55, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={[`${theme.primary}24`, 'transparent', `${theme.gradient[2]}10`]}
        locations={[0, 0.5, 1]}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      <BackgroundGlow />

      {/* Skip — absolute top-right */}
      <View style={[styles.skipBar, { top: insets.top + rs(8) }]}>
        <Pressable
          onPress={finish}
          accessibilityLabel={t('common.skip')}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          style={({ pressed }) => pressed && { opacity: 0.6 }}
        >
          <Text style={[styles.skipText, { color: theme.textMuted }]}>{t('common.skip')}</Text>
        </Pressable>
      </View>

      <View
        style={[
          styles.column,
          { paddingTop: insets.top + rs(16), paddingBottom: insets.bottom + rs(16) },
        ]}
      >
        {/* ── Slide-specific content region ─────────────────────────────── */}
        <View style={styles.content}>
          {slide === 0 && (
            <>
              <View style={styles.spacerTop} />
              <HeroPeople />
              <View style={{ height: rs(36) }} />
              <SlideText
                title={t('onboarding.slide1Title')}
                subtitle={t('onboarding.slide1Subtitle')}
              />
              <View style={styles.spacerBottom} />
            </>
          )}

          {slide === 1 && (
            <>
              <View style={styles.spacerTop} />
              <HeroCards />
              <View style={{ flex: 1.1 }} />
              <SlideText
                title={t('onboarding.slide2Title')}
                subtitle={t('onboarding.slide2Subtitle')}
              />
              <View style={{ flex: 1 }} />
            </>
          )}

          {slide === 2 && (
            <>
              <View style={styles.spacerTop} />
              <HeroStar />
              <View style={{ height: rs(24) }} />
              <EarnCardsRow />
              <View style={{ height: rs(28) }} />
              <SlideText
                title={t('onboarding.slide3Title')}
                subtitle={t('onboarding.slide3Subtitle')}
                titleIcon={
                  <MaterialCommunityIcons
                    name="star-four-points"
                    size={rs(30)}
                    color={theme.gold}
                  />
                }
              />
              <View style={styles.spacerBottom} />
            </>
          )}
        </View>

        {/* ── Pagination dots ───────────────────────────────────────────── */}
        <View style={styles.dotsRow}>
          {Array.from({ length: TOTAL_SLIDES }).map((_, i) =>
            i === slide ? (
              <LinearGradient
                key={i}
                // Shorter cyan→violet sweep — intentionally NOT the full
                // cyan→violet→mint button gradient, per the design dots.
                colors={[theme.gradient[0], theme.gradient[1]]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.dot, styles.dotActive]}
              />
            ) : (
              <View
                key={i}
                style={[styles.dot, styles.dotInactive, { backgroundColor: theme.surfaceBorder }]}
              />
            ),
          )}
        </View>

        {/* ── Primary CTA ───────────────────────────────────────────────── */}
        <GradientButton
          label={isLast ? t('common.begin') : t('common.continue')}
          onPress={isLast ? begin : handleNext}
          labelColor="#0A0B1A"
        />
      </View>
    </View>
  );
}

/** Centered title (Playfair) + subtitle (Inter) block, shared by all slides. */
function SlideText({
  title,
  subtitle,
  titleIcon,
}: {
  title: string;
  subtitle: string;
  titleIcon?: React.ReactNode;
}) {
  const theme = useTheme();
  return (
    <View style={styles.textBlock}>
      {titleIcon ? (
        // Single-line title with a trailing accent glyph (e.g. the gold sparkle on
        // the Stars slide), kept on the text baseline row.
        <View style={styles.titleRow}>
          <Text style={[styles.h1, { color: theme.text }]}>{title}</Text>
          <View style={styles.titleIcon}>{titleIcon}</View>
        </View>
      ) : (
        <Text style={[styles.h1, { color: theme.text }]}>{title}</Text>
      )}
      <Text style={[styles.body, { color: theme.textMuted }]}>{subtitle}</Text>
    </View>
  );
}

/* -------------------------------------------------------------------------- */

const heroStyles = StyleSheet.create({
  peopleRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  glyphWrap: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: rs(-6),
  },
  halo: { position: 'absolute' },
});

const cardStyles = StyleSheet.create({
  stack: {
    height: rs(240),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardSlot: {
    position: 'absolute',
    // Wide enough to keep "ATTACHMENT THEORY" on one line and the question on its
    // 3-line wrap, while the front card covers most of the cards behind it.
    width: rs(228),
  },
  // furthest back — only its right edge peeks out from behind the front card
  // transforms applied inline (RTL-mirrored) in HeroCards via fan()
  thirdCard: {
    opacity: 0.22,
  },
  backCard: {
    opacity: 0.36,
  },
  frontCard: {
    zIndex: 3,
  },
  card: {
    borderRadius: rs(22),
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    // Dark frosted glass — the design's cards are subdued dark-navy panels where only
    // the text pops and the bg shows faintly through, NOT bright blocks. A dark fill
    // also occludes the lighter text on the cards behind it (residual bleed reads as a
    // faint dark ghost rather than a bright smear).
    backgroundColor: 'rgba(28,33,56,0.5)',
    overflow: 'hidden',
    paddingVertical: rs(20),
    paddingHorizontal: rs(22),
    gap: rs(10),
  },
  // Front card: dark-navy frost, opaque enough to fully occlude the two cards behind it.
  cardOpaque: {
    backgroundColor: 'rgba(24,29,52,0.93)',
  },
  tag: {
    fontSize: rs(12),
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1.4,
    color: CARD_CYAN,
  },
  question: {
    fontSize: rs(22),
    lineHeight: rs(30),
    fontFamily: 'PlayfairDisplay_600SemiBold',
  },
});

const starStyles = StyleSheet.create({
  wrap: { width: rs(170), height: rs(170), alignItems: 'center', justifyContent: 'center' },
});

const earnStyles = StyleSheet.create({
  row: { flexDirection: 'row', gap: rs(8), width: '100%' },
  card: {
    flex: 1,
    borderRadius: rs(18),
    borderWidth: 1,
    paddingVertical: rs(12),
    paddingHorizontal: rs(8),
    alignItems: 'center',
    gap: rs(6),
  },
  iconRing: {
    width: rs(40),
    height: rs(40),
    borderRadius: rs(20),
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { fontSize: rs(13), fontFamily: 'Inter_600SemiBold' },
  amount: { fontSize: rs(11), fontFamily: 'Inter_400Regular', textAlign: 'center' },
});

const styles = StyleSheet.create({
  root: { flex: 1 },
  skipBar: { position: 'absolute', end: rs(24), zIndex: 10 },
  skipText: { fontSize: rs(15), fontFamily: 'Inter_500Medium' },

  column: { flex: 1, paddingHorizontal: rs(24) },
  content: { flex: 1, alignItems: 'center' },

  spacerTop: { flex: 0.9, minHeight: rs(24) },
  spacerBottom: { flex: 1.5, minHeight: rs(24) },

  textBlock: { alignItems: 'center', gap: rs(12) },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  titleIcon: { marginStart: rs(10) },
  h1: {
    fontSize: rs(32),
    lineHeight: rs(40),
    letterSpacing: -0.4,
    fontFamily: 'PlayfairDisplay_700Bold',
    textAlign: 'center',
  },
  body: {
    fontSize: rs(14),
    lineHeight: rs(20),
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },

  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: rs(8),
    marginTop: rs(12),
    marginBottom: rs(20),
  },
  dot: { height: rs(8), borderRadius: rs(4) },
  dotActive: { width: rs(22), borderRadius: 999 },
  dotInactive: { width: rs(8), borderRadius: rs(4) },
});
