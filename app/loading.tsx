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
import Svg, { Defs, Polygon, RadialGradient, Rect, Stop } from 'react-native-svg';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '@/src/themes/ThemeProvider';
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
const ATOM_SIZE = rs(50);

const READY_DELAY = 4500; // show the ad-gate after a short faux "computing" beat
const TEXT_INTERVAL = 1600;
const PHRASE_KEYS = ['energy', 'patterns', 'connections', 'almost'] as const;

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

/** The full loader: module-tinted bloom + faint hexagon outline + 6 chasing dots +
 *  the centered atom mark. Keeps animating even while the ad-gate sheet is up. */
const HexLoader = memo(function HexLoader({ accent }: { accent: string }) {
  const animationsEnabled = useSettingsStore((s) => s.animationsEnabled);
  const phase = useSharedValue(0);

  useEffect(() => {
    if (!animationsEnabled) return;
    phase.value = withRepeat(withTiming(1, { duration: 3600, easing: Easing.linear }), -1, false);
  }, [animationsEnabled, phase]);

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

      <AurafyLogo size={ATOM_SIZE} />
    </View>
  );
});

export default function LoadingScreen() {
  const { moduleId, mode } = useLocalSearchParams<{ moduleId: string; mode: ReadingMode }>();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { currentPersons, currentAnswers, setResult } = useReadingStore();
  const { earnStars, spendStars, stars } = useUserStore();

  const module = useMemo(() => MODULES.find((m) => m.id === moduleId), [moduleId]);
  const accent = module?.color ?? theme.primary;
  const gateEmoji = module?.icon ?? '🔮';

  const [loadingTextIdx, setLoadingTextIdx] = useState(0);
  const [showAdGate, setShowAdGate] = useState(false);
  const [adGateState, setAdGateState] = useState<'initial' | 'adFailed'>('initial');
  const resultRef = useRef<ResultData | null>(null);

  const sheetY = useSharedValue(SCREEN_HEIGHT);
  const scrimOpacity = useSharedValue(0);
  const loaderDim = useSharedValue(1);

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

  // Cycle loading text
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingTextIdx((i) => (i + 1) % PHRASE_KEYS.length);
    }, TEXT_INTERVAL);
    return () => clearInterval(interval);
  }, []);

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
    loaderDim.value = withTiming(0.4, { duration: 400, easing: Easing.out(Easing.cubic) });
  }, [showAdGate, sheetY, scrimOpacity, loaderDim]);

  const sheetStyle = useAnimatedStyle(() => ({ transform: [{ translateY: sheetY.value }] }));
  const scrimStyle = useAnimatedStyle(() => ({ opacity: scrimOpacity.value }));
  const loaderStyle = useAnimatedStyle(() => ({ opacity: loaderDim.value }));

  const navigateToResult = useCallback(() => {
    router.replace({ pathname: '/result' });
  }, []);

  const handleWatchAd = useCallback(async () => {
    const watched = await AdMobManager.showRewarded();
    if (watched) {
      earnStars(1, 'rewarded_ad');
      navigateToResult();
    } else {
      setAdGateState('adFailed');
    }
  }, [earnStars, navigateToResult]);

  const handleSkipWithStar = useCallback(() => {
    lightTap();
    if (spendStars(1)) navigateToResult();
  }, [spendStars, navigateToResult]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Cosmic depth base (mirrors quiz / reading-mode) */}
      <LinearGradient
        colors={['#181430', '#0E0B22', '#08061A']}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />
      {/* Module-tinted upper-left bloom — gives each module its own loading mood */}
      <Svg style={StyleSheet.absoluteFill} width="100%" height="100%" pointerEvents="none">
        <Defs>
          <RadialGradient id="load_bloom" cx="26%" cy="20%" r="65%">
            <Stop offset="0%" stopColor={accent} stopOpacity={0.18} />
            <Stop offset="60%" stopColor={accent} stopOpacity={0.05} />
            <Stop offset="100%" stopColor={theme.background} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#load_bloom)" />
      </Svg>

      {/* Loader + cycling text (ghosts back behind the ad-gate sheet) */}
      <Animated.View
        style={[styles.center, { paddingTop: insets.top, paddingBottom: insets.bottom }, loaderStyle]}
      >
        <HexLoader accent={accent} />
        <Text style={[styles.loadingText, { color: theme.textMuted }]}>
          {t(`loading.phrases.${PHRASE_KEYS[loadingTextIdx]}`)}
        </Text>
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
            <View style={[styles.handle, { backgroundColor: theme.borderStrong }]} />

            <View style={styles.titleRow}>
              <Text style={styles.gateEmoji}>{gateEmoji}</Text>
              <Text
                style={[
                  styles.sheetTitle,
                  { color: theme.text, fontFamily: 'PlayfairDisplay_600SemiBold' },
                ]}
              >
                {t('loading.ready')}
              </Text>
            </View>
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

            <TouchableOpacity
              onPress={handleSkipWithStar}
              disabled={stars === 0}
              accessibilityRole="button"
              accessibilityLabel={`${t('loading.skip')} 1`}
              style={[styles.skipBtn, stars === 0 && styles.skipDisabled]}
            >
              <Text style={[styles.skipText, { color: theme.textMuted }]}>
                {t('loading.skip')} (1{' '}
              </Text>
              <MaterialCommunityIcons name="star-four-points" size={rs(12)} color={theme.gold} />
              <Text style={[styles.skipText, { color: theme.textMuted }]}>)</Text>
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
  loadingText: { fontSize: rs(16), fontFamily: 'Inter_400Regular', textAlign: 'center' },

  // Ad-gate bottom sheet
  scrim: { backgroundColor: 'rgba(7,9,26,0.4)' },
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
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: rs(8),
    marginTop: rs(14),
  },
  handle: {
    width: rs(40),
    height: rs(4),
    borderRadius: rs(2),
    marginTop: rs(4),
    marginBottom: rs(6),
  },
  gateEmoji: { fontSize: rs(19) },
  sheetTitle: { fontSize: rs(20), textAlign: 'center' },
  sheetSubtitle: {
    fontSize: rs(12.5),
    lineHeight: rs(18),
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
    marginTop: rs(8),
  },
  sheetBtn: { width: '100%', marginTop: rs(20) },
  adFailed: { fontSize: rs(12.5), textAlign: 'center', fontFamily: 'Inter_400Regular', marginTop: rs(10) },
  skipBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: rs(44),
    marginTop: rs(8),
  },
  skipDisabled: { opacity: 0.35 },
  skipText: { fontSize: rs(13), fontFamily: 'Inter_400Regular' },
});
