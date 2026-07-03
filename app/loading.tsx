import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppText as Text } from '@/src/components/AppText';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Defs, Polygon, RadialGradient, Rect, Stop } from 'react-native-svg';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '@/src/themes/ThemeProvider';
import { categoryForModule, moduleTheme } from '@/src/themes/categoryTheme';
import { useReadingStore } from '@/src/store/readingStore';
import { useUserStore } from '@/src/store/userStore';
import { useSettingsStore } from '@/src/store/settingsStore';
import { MODULES } from '@/src/data/modules';
import { scoreReading } from '@/src/engine/scoringEngine';
import { generateMultiResult, generateSoloResult } from '@/src/engine/resultGenerator';
import { AdMobManager } from '@/src/ads/AdMobManager';
import GradientButton from '@/src/components/GradientButton';
import AurafyLogo from '@/src/components/AurafyLogo';
import { ResultData, ReadingMode } from '@/src/types';
import { rs } from '@/src/utils/responsive';
import { lightTap } from '@/src/utils/haptics';

// Map moduleId → results
import { whoLovesMeResults } from '@/src/data/results/whoLovesMeResults';
import { whoHatesMeResults } from '@/src/data/results/whoHatesMeResults';
import { whoJealousResults } from '@/src/data/results/whoJealousResults';
import { whoSoulmateResults } from '@/src/data/results/whoSoulmateResults';
import { whoAdmiresResults } from '@/src/data/results/whoAdmiresResults';
import { energyReadingResults } from '@/src/data/results/energyReadingResults';
import { attachmentStyleResults } from '@/src/data/results/attachmentStyleResults';
import { amITheProblemResults } from '@/src/data/results/amITheProblemResults';
import { whoCutOffResults } from '@/src/data/results/whoCutOffResults';
import { MultiResults, SoloResults } from '@/src/types';

import { whoLovesMeQuestions } from '@/src/data/questions/whoLovesMe';
import { whoHatesMeQuestions } from '@/src/data/questions/whoHatesMe';
import { whoJealousQuestions } from '@/src/data/questions/whoJealous';
import { whoSoulmateQuestions } from '@/src/data/questions/whoSoulmate';
import { whoAdmiresQuestions } from '@/src/data/questions/whoAdmires';
import { energyReadingQuestions } from '@/src/data/questions/energyReading';
import { attachmentStyleQuestions } from '@/src/data/questions/attachmentStyle';
import { amITheProblemQuestions } from '@/src/data/questions/amITheProblem';
import { whoCutOffQuestions } from '@/src/data/questions/whoCutOff';
import { Question } from '@/src/types';

const QUESTIONS_MAP: Record<string, Question[]> = {
  who_loves_me: whoLovesMeQuestions,
  who_hates_me: whoHatesMeQuestions,
  who_jealous: whoJealousQuestions,
  who_soulmate: whoSoulmateQuestions,
  who_admires: whoAdmiresQuestions,
  energy_reading: energyReadingQuestions,
  attachment_style: attachmentStyleQuestions,
  am_i_problem: amITheProblemQuestions,
  who_cut_off: whoCutOffQuestions,
};

const MULTI_RESULTS_MAP: Record<string, MultiResults> = {
  who_loves_me: whoLovesMeResults,
  who_hates_me: whoHatesMeResults,
  who_jealous: whoJealousResults,
  who_soulmate: whoSoulmateResults,
  who_admires: whoAdmiresResults,
  energy_reading: energyReadingResults,
  who_cut_off: whoCutOffResults,
};

const SOLO_RESULTS_MAP: Record<string, SoloResults> = {
  attachment_style: attachmentStyleResults,
  am_i_problem: amITheProblemResults,
};

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Loader geometry (design 09-Loading_result*.png): a small atom centered inside a
// hexagon of 6 module-coloured dots, joined by a faint outline.
const LOADER_SIZE = rs(220);
const HEX_R = rs(64);
const DOT_SIZE = rs(9);
const ATOM_SIZE = rs(64);
const ATOM_GLOW = rs(120); // breathing accent bloom BEHIND the atom

const READY_DELAY = 4500; // show the ad-gate after a short faux "computing" beat
const TEXT_INTERVAL = 2000; // spec §5: rotating copy, fading ~every 2s
const POOL_SIZE = 3; // per-category copy pool (i18n loading.pool.<category>1..3)
const TEXT_FADE = 300;

// Ad-gate orb geometry (ad_gate.png + _animation frames).
const ORB_SIZE = rs(56);
const RING_SIZE = rs(96);

// Pointy-top hexagon vertices, clockwise from the top, so the chase travels around.
const HEX_ANGLES = [-90, -30, 30, 90, 150, 210];
const HEX_POINTS = HEX_ANGLES.map((deg) => {
  const r = (deg * Math.PI) / 180;
  return { x: HEX_R * Math.cos(r), y: HEX_R * Math.sin(r) };
});

/** One hexagon vertex dot. A single shared `phase` (0→1) sweeps around the ring;
 *  each dot peaks (brightens + swells) as the phase passes its slot, so the light
 *  "turns on and off in order" around the hexagon. */
const HexDot = memo(function HexDot({
  x,
  y,
  color,
  index,
  total,
  phase,
  enabled,
}: {
  x: number;
  y: number;
  color: string;
  index: number;
  total: number;
  phase: SharedValue<number>;
  enabled: boolean;
}) {
  const style = useAnimatedStyle(() => {
    if (!enabled) return { opacity: 0.6, transform: [{ scale: 1 }] };
    let d = (phase.value - index / total) % 1;
    if (d < 0) d += 1;
    const circ = Math.min(d, 1 - d); // circular distance, 0 = exactly at peak
    const tt = Math.max(0, 1 - circ * total); // 1 at peak → 0 at the slot edge
    const e = tt * tt * (3 - 2 * tt); // smoothstep
    return { opacity: 0.28 + 0.72 * e, transform: [{ scale: 1 + 0.45 * e }] };
  });

  return (
    <Animated.View
      style={[
        styles.hexDot,
        {
          width: DOT_SIZE,
          height: DOT_SIZE,
          borderRadius: DOT_SIZE / 2,
          backgroundColor: color,
          shadowColor: color,
          left: LOADER_SIZE / 2 + x - DOT_SIZE / 2,
          top: LOADER_SIZE / 2 + y - DOT_SIZE / 2,
        },
        style,
      ]}
    />
  );
});

/** The full loader: category-tinted bloom + faint hexagon outline + 6 chasing dots +
 *  the centered atom mark — which itself ROTATES slowly while its core breathes
 *  (spec §5: the logo moves, not just the dots). Keeps animating behind the ad-gate. */
const HexLoader = memo(function HexLoader({ accent }: { accent: string }) {
  const animationsEnabled = useSettingsStore((s) => s.animationsEnabled);
  const phase = useSharedValue(0);
  const spin = useSharedValue(0);
  const pulse = useSharedValue(0);

  useEffect(() => {
    if (!animationsEnabled) return;
    phase.value = withRepeat(withTiming(1, { duration: 3600, easing: Easing.linear }), -1, false);
    // Slow continuous rotation (~7s per turn) + a gentle core breathe.
    spin.value = withRepeat(withTiming(1, { duration: 7000, easing: Easing.linear }), -1, false);
    pulse.value = withRepeat(
      withTiming(1, { duration: 1400, easing: Easing.inOut(Easing.quad) }),
      -1,
      true,
    );
  }, [animationsEnabled, phase, spin, pulse]);

  const atomStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spin.value * 360}deg` }],
  }));
  // Soft accent bloom breathing BEHIND the atom — the "core pulse" without covering
  // the mark (a white overlay on top hid the logo entirely on device).
  const glowStyle = useAnimatedStyle(() => ({
    opacity: 0.45 + pulse.value * 0.5,
    transform: [{ scale: 0.85 + pulse.value * 0.3 }],
  }));

  const polyPoints = HEX_POINTS.map(
    (p) => `${LOADER_SIZE / 2 + p.x},${LOADER_SIZE / 2 + p.y}`,
  ).join(' ');

  return (
    <View style={styles.loader}>
      <Svg
        width={LOADER_SIZE}
        height={LOADER_SIZE}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      >
        <Defs>
          <RadialGradient id="hex_bloom" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor={accent} stopOpacity={0.16} />
            <Stop offset="55%" stopColor={accent} stopOpacity={0.05} />
            <Stop offset="100%" stopColor={accent} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x={0} y={0} width={LOADER_SIZE} height={LOADER_SIZE} fill="url(#hex_bloom)" />
        <Polygon points={polyPoints} fill="none" stroke={accent} strokeOpacity={0.22} strokeWidth={1} />
      </Svg>

      {HEX_POINTS.map((p, i) => (
        <HexDot
          key={i}
          x={p.x}
          y={p.y}
          color={accent}
          index={i}
          total={HEX_POINTS.length}
          phase={phase}
          enabled={animationsEnabled}
        />
      ))}

      <Animated.View pointerEvents="none" style={[styles.atomGlow, glowStyle]}>
        <Svg width={ATOM_GLOW} height={ATOM_GLOW}>
          <Defs>
            <RadialGradient id="atom_glow" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor={accent} stopOpacity={0.45} />
              <Stop offset="60%" stopColor={accent} stopOpacity={0.12} />
              <Stop offset="100%" stopColor={accent} stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Circle cx={ATOM_GLOW / 2} cy={ATOM_GLOW / 2} r={ATOM_GLOW / 2} fill="url(#atom_glow)" />
        </Svg>
      </Animated.View>
      <Animated.View style={atomStyle}>
        <AurafyLogo size={ATOM_SIZE} />
      </Animated.View>
    </View>
  );
});

export default function LoadingScreen() {
  const { moduleId, mode } = useLocalSearchParams<{ moduleId: string; mode: ReadingMode }>();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { currentPersons, currentAnswers, setResult, setResultUnlocked } = useReadingStore();
  const { spendStars, stars } = useUserStore();

  const module = useMemo(() => MODULES.find((m) => m.id === moduleId), [moduleId]);
  // Per-MODULE theme tints the loader, gate bloom and orb — the same palette the
  // result reveals next (Who Admires ≠ Who Loves Me). The copy pool stays keyed
  // by CATEGORY (the poetic lines suit the whole family).
  const category = categoryForModule(moduleId ?? '');
  const { accent, accentSoft } = moduleTheme(moduleId ?? '');

  const [loadingTextIdx, setLoadingTextIdx] = useState(0);
  const [showAdGate, setShowAdGate] = useState(false);
  const [adGateState, setAdGateState] = useState<'initial' | 'adFailed'>('initial');
  const resultRef = useRef<ResultData | null>(null);

  const sheetY = useSharedValue(SCREEN_HEIGHT);
  const scrimOpacity = useSharedValue(0);
  const loaderDim = useSharedValue(1);
  const textOpacity = useSharedValue(1);
  const ring = useSharedValue(0);

  // Compute result immediately on mount
  useEffect(() => {
    const questions = QUESTIONS_MAP[moduleId ?? ''] ?? [];
    const moduleType = module?.type ?? 'multi';

    const rawResult = scoreReading(
      questions,
      currentAnswers,
      currentPersons,
      (mode as ReadingMode) ?? 'solo',
      moduleId ?? '',
      moduleType,
      module?.resultKind,
    );

    const seed = Date.now();
    let finalResult: ResultData;

    if (moduleType === 'multi') {
      const mr = MULTI_RESULTS_MAP[moduleId ?? ''];
      finalResult = mr ? generateMultiResult(rawResult, mr, seed) : rawResult;
    } else {
      const sr = SOLO_RESULTS_MAP[moduleId ?? ''];
      finalResult = sr ? generateSoloResult(rawResult, sr, seed) : rawResult;
    }

    resultRef.current = finalResult;
    setResult(finalResult);
  }, [moduleId, mode, module, currentAnswers, currentPersons, setResult]);

  // Cycle the category copy pool with a fade (out → swap → in), per spec §5.
  useEffect(() => {
    const interval = setInterval(() => {
      textOpacity.value = withSequence(
        withTiming(0, { duration: TEXT_FADE }),
        withTiming(1, { duration: TEXT_FADE }),
      );
      setTimeout(() => setLoadingTextIdx((i) => (i + 1) % POOL_SIZE), TEXT_FADE);
    }, TEXT_INTERVAL);
    return () => clearInterval(interval);
  }, [textOpacity]);

  // Reveal the ad gate after a beat
  useEffect(() => {
    const timer = setTimeout(() => setShowAdGate(true), READY_DELAY);
    return () => clearTimeout(timer);
  }, []);

  // Slide the sheet up, fade the scrim in, and ghost the loader back once the gate
  // is shown — the hexagon keeps chasing, just faint behind the sheet (per design).
  useEffect(() => {
    if (!showAdGate) return;
    sheetY.value = withTiming(0, { duration: 340, easing: Easing.out(Easing.cubic) });
    scrimOpacity.value = withTiming(1, { duration: 300 });
    loaderDim.value = withTiming(0.3, { duration: 400, easing: Easing.out(Easing.cubic) });
    // Expanding pulse ring around the gate orb (ad_gate_animation frames).
    ring.value = withRepeat(withTiming(1, { duration: 1800, easing: Easing.out(Easing.quad) }), -1, false);
  }, [showAdGate, sheetY, scrimOpacity, loaderDim, ring]);

  const sheetStyle = useAnimatedStyle(() => ({ transform: [{ translateY: sheetY.value }] }));
  const scrimStyle = useAnimatedStyle(() => ({ opacity: scrimOpacity.value }));
  const loaderStyle = useAnimatedStyle(() => ({ opacity: loaderDim.value }));
  const textStyle = useAnimatedStyle(() => ({ opacity: textOpacity.value }));
  const ringStyle = useAnimatedStyle(() => ({
    opacity: 0.55 * (1 - ring.value),
    transform: [{ scale: 0.7 + ring.value * 0.75 }],
  }));

  const navigateToResult = useCallback(() => {
    router.replace({ pathname: '/result' });
  }, []);

  // Option C, two-tier (Simo 2026-07-02): the ad or 1★ buys the FULL reading;
  // skipping is FREE and lands on the minimal result (name + essentials), which
  // carries its own unlock card.
  const handleWatchAd = useCallback(async () => {
    const watched = await AdMobManager.showRewarded();
    if (watched) {
      setResultUnlocked(true);
      navigateToResult();
    } else {
      setAdGateState('adFailed');
    }
  }, [setResultUnlocked, navigateToResult]);

  const handleUnlockWithStar = useCallback(() => {
    lightTap();
    if (spendStars(1)) {
      setResultUnlocked(true);
      navigateToResult();
    }
  }, [spendStars, setResultUnlocked, navigateToResult]);

  const handleSkipFree = useCallback(() => {
    lightTap();
    setResultUnlocked(false);
    navigateToResult();
  }, [setResultUnlocked, navigateToResult]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Cosmic depth base (mirrors quiz / reading-mode) */}
      <LinearGradient
        colors={['#181430', '#0E0B22', '#08061A']}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />
      {/* Module-tinted upper-left bloom — SOFT tone so dark-accent modules (jealous)
          still get a visible wash instead of a black screen. */}
      <Svg style={StyleSheet.absoluteFill} width="100%" height="100%" pointerEvents="none">
        <Defs>
          <RadialGradient id="load_bloom" cx="26%" cy="20%" r="65%">
            <Stop offset="0%" stopColor={accentSoft} stopOpacity={0.18} />
            <Stop offset="60%" stopColor={accentSoft} stopOpacity={0.05} />
            <Stop offset="100%" stopColor={theme.background} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#load_bloom)" />
      </Svg>

      {/* Loader + cycling text (ghosts back behind the ad-gate sheet) */}
      <Animated.View
        style={[styles.center, { paddingTop: insets.top, paddingBottom: insets.bottom }, loaderStyle]}
      >
        {/* Soft tone for the whole loader — dark accents render near-invisible dots. */}
        <HexLoader accent={accentSoft} />
        <Animated.View style={textStyle}>
          <Text style={[styles.loadingText, { color: theme.textMuted }]}>
            {t(`loading.pool.${category}${loadingTextIdx + 1}`)}
          </Text>
        </Animated.View>
      </Animated.View>

      {/* Rewarded-ad gate — bottom sheet; the loader keeps animating behind it */}
      {showAdGate && (
        <>
          <Animated.View
            style={[StyleSheet.absoluteFill, styles.scrim, scrimStyle]}
            pointerEvents="none"
          />
          <Animated.View
            style={[
              styles.sheet,
              {
                paddingBottom: insets.bottom + rs(24),
                backgroundColor: 'rgba(11,14,37,0.90)',
                borderColor: theme.borderStrong,
              },
              sheetStyle,
            ]}
          >
            {/* Category bloom rising behind the orb — soft tone for visibility. */}
            <Svg pointerEvents="none" style={styles.sheetBloom} width="100%" height="100%">
              <Defs>
                <RadialGradient id="gate_bloom" cx="50%" cy="0%" r="65%">
                  <Stop offset="0%" stopColor={accentSoft} stopOpacity={0.26} />
                  <Stop offset="55%" stopColor={accentSoft} stopOpacity={0.07} />
                  <Stop offset="100%" stopColor={accentSoft} stopOpacity={0} />
                </RadialGradient>
              </Defs>
              <Rect x="0" y="0" width="100%" height="100%" fill="url(#gate_bloom)" />
            </Svg>

            <View style={[styles.handle, { backgroundColor: theme.borderStrong }]} />

            {/* Glowing category orb + expanding pulse ring (ad_gate_animation frames). */}
            <View style={styles.orbWrap}>
              <Animated.View style={[styles.orbRing, { borderColor: accent }, ringStyle]} />
              <Svg width={ORB_SIZE} height={ORB_SIZE}>
                <Defs>
                  <RadialGradient id="gate_orb" cx="38%" cy="32%" r="78%">
                    <Stop offset="0%" stopColor={accentSoft} stopOpacity={1} />
                    <Stop offset="55%" stopColor={accent} stopOpacity={0.9} />
                    <Stop offset="100%" stopColor="#07091A" stopOpacity={0.92} />
                  </RadialGradient>
                </Defs>
                <Circle cx={ORB_SIZE / 2} cy={ORB_SIZE / 2} r={ORB_SIZE / 2} fill="url(#gate_orb)" />
                <Circle cx={ORB_SIZE / 2} cy={ORB_SIZE / 2} r={rs(2.6)} fill="#FFFFFF" />
              </Svg>
            </View>

            <Text style={[styles.gateEyebrow, { color: accent }]}>
              {t('loading.ready').toUpperCase()}
            </Text>
            <Text style={[styles.veilTitle, { color: theme.text }]}>{t('loading.veil')}</Text>
            <Text style={[styles.sheetSubtitle, { color: theme.textMuted }]}>
              {t('loading.unlock')}
            </Text>

            <GradientButton
              label={t('loading.watchNow')}
              onPress={handleWatchAd}
              leadingIcon="play"
              labelColor={theme.background}
              bold
              glow
              style={styles.sheetBtn}
            />

            {adGateState === 'adFailed' ? (
              <Text style={[styles.adFailed, { color: theme.textMuted }]}>
                {t('loading.adUnavailable')}
              </Text>
            ) : null}

            {/* Full reading for 1★ — the visible star price (a fair trade, not a wall). */}
            <TouchableOpacity
              onPress={handleUnlockWithStar}
              disabled={stars === 0}
              accessibilityRole="button"
              accessibilityLabel={`${t('loading.fullReading')} 1`}
              style={[
                styles.fullBtn,
                { backgroundColor: theme.surface, borderColor: theme.borderStrong },
                stars === 0 && styles.skipDisabled,
              ]}
            >
              <Text style={[styles.fullText, { color: theme.text }]}>{t('loading.fullReading')}</Text>
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

            {/* Free skip → the minimal result (name + essentials only). */}
            <TouchableOpacity
              onPress={handleSkipFree}
              accessibilityRole="button"
              accessibilityLabel={t('loading.skip')}
              style={styles.skipBtn}
            >
              <Text style={[styles.skipText, { color: theme.textMuted }]}>{t('loading.skip')}</Text>
            </TouchableOpacity>
          </Animated.View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: rs(28) },

  // Hexagon loader
  loader: {
    width: LOADER_SIZE,
    height: LOADER_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hexDot: {
    position: 'absolute',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: rs(9),
    elevation: 6,
  },
  loadingText: { fontSize: rs(16), fontFamily: 'HankenGrotesk_400Regular', textAlign: 'center' },
  // Breathing accent bloom, centered BEHIND the atom mark.
  atomGlow: {
    position: 'absolute',
    left: LOADER_SIZE / 2 - ATOM_GLOW / 2,
    top: LOADER_SIZE / 2 - ATOM_GLOW / 2,
    width: ATOM_GLOW,
    height: ATOM_GLOW,
  },

  // Ad-gate bottom sheet
  scrim: { backgroundColor: 'rgba(7,9,26,0.55)' },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: rs(24),
    borderTopRightRadius: rs(24),
    borderTopWidth: 1,
    borderLeftWidth: 0.3,
    borderRightWidth: 0.3,
    paddingHorizontal: rs(24),
    paddingTop: rs(8),
    alignItems: 'center',
    overflow: 'hidden',
  },
  sheetBloom: { position: 'absolute', top: 0, left: 0, right: 0, height: rs(210) },
  handle: {
    width: rs(40),
    height: rs(4),
    borderRadius: rs(2),
    marginTop: rs(4),
    marginBottom: rs(6),
  },
  orbWrap: {
    width: RING_SIZE,
    height: RING_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(8),
  },
  orbRing: {
    position: 'absolute',
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    borderWidth: 1,
  },
  gateEyebrow: {
    fontSize: rs(11),
    fontFamily: 'HankenGrotesk_700Bold',
    letterSpacing: rs(1.8),
    textAlign: 'center',
    marginTop: rs(10),
  },
  veilTitle: {
    fontSize: rs(26),
    lineHeight: rs(32),
    fontFamily: 'PlayfairDisplay_700Bold',
    textAlign: 'center',
    marginTop: rs(6),
  },
  sheetSubtitle: {
    fontSize: rs(12.5),
    lineHeight: rs(18),
    textAlign: 'center',
    fontFamily: 'HankenGrotesk_400Regular',
    marginTop: rs(8),
    paddingHorizontal: rs(6),
  },
  sheetBtn: { width: '100%', marginTop: rs(20) },
  adFailed: { fontSize: rs(12.5), textAlign: 'center', fontFamily: 'HankenGrotesk_400Regular', marginTop: rs(10) },
  fullBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: rs(50),
    borderRadius: 999,
    borderWidth: 1,
    marginTop: rs(12),
  },
  fullText: { fontSize: rs(15), fontFamily: 'HankenGrotesk_600SemiBold' },
  skipBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: rs(42),
    marginTop: rs(4),
  },
  skipDisabled: { opacity: 0.35 },
  skipText: { fontSize: rs(13.5), fontFamily: 'HankenGrotesk_500Medium' },
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
});
