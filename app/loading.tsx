import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/src/themes/ThemeProvider';
import { useReadingStore } from '@/src/store/readingStore';
import { useUserStore } from '@/src/store/userStore';
import { MODULES } from '@/src/data/modules';
import { scoreReading } from '@/src/engine/scoringEngine';
import { generateMultiResult, generateSoloResult } from '@/src/engine/resultGenerator';
import { AdMobManager } from '@/src/ads/AdMobManager';
import ConstellationLoader from '@/src/components/ConstellationLoader';
import GlassCard from '@/src/components/GlassCard';
import GradientButton from '@/src/components/GradientButton';
import { ResultData, ReadingMode } from '@/src/types';
import { ReadingMode as RM } from '@/src/types';

// Map moduleId → results
import { whoLovesMeResults } from '@/src/data/results/whoLovesMeResults';
import { whoHatesMeResults } from '@/src/data/results/whoHatesMeResults';
import { whoJealousResults } from '@/src/data/results/whoJealousResults';
import { whoCutOffResults } from '@/src/data/results/whoCutOffResults';
import { energyReadingResults } from '@/src/data/results/energyReadingResults';
import { attachmentStyleResults } from '@/src/data/results/attachmentStyleResults';
import { amITheProblemResults } from '@/src/data/results/amITheProblemResults';
import { MultiResults, SoloResults } from '@/src/types';

import { whoLovesMeQuestions } from '@/src/data/questions/whoLovesMe';
import { whoHatesMeQuestions } from '@/src/data/questions/whoHatesMe';
import { whoJealousQuestions } from '@/src/data/questions/whoJealous';
import { whoCutOffQuestions } from '@/src/data/questions/whoCutOff';
import { energyReadingQuestions } from '@/src/data/questions/energyReading';
import { attachmentStyleQuestions } from '@/src/data/questions/attachmentStyle';
import { amITheProblemQuestions } from '@/src/data/questions/amITheProblem';
import { Question } from '@/src/types';

const QUESTIONS_MAP: Record<string, Question[]> = {
  who_loves_me: whoLovesMeQuestions,
  who_hates_me: whoHatesMeQuestions,
  who_jealous: whoJealousQuestions,
  who_cut_off: whoCutOffQuestions,
  energy_reading: energyReadingQuestions,
  attachment_style: attachmentStyleQuestions,
  am_i_problem: amITheProblemQuestions,
};

const MULTI_RESULTS_MAP: Record<string, MultiResults> = {
  who_loves_me: whoLovesMeResults,
  who_hates_me: whoHatesMeResults,
  who_jealous: whoJealousResults,
  who_cut_off: whoCutOffResults,
  energy_reading: energyReadingResults,
};

const SOLO_RESULTS_MAP: Record<string, SoloResults> = {
  attachment_style: attachmentStyleResults,
  am_i_problem: amITheProblemResults,
};

const LOADING_TEXTS = [
  'Reading the energy...',
  'Decoding patterns...',
  'Mapping the connections...',
  'Your reading is almost ready...',
];

export default function LoadingScreen() {
  const { moduleId, mode } = useLocalSearchParams<{ moduleId: string; mode: ReadingMode }>();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { currentPersons, currentAnswers, setResult } = useReadingStore();
  const { earnStars, spendStars, stars } = useUserStore();

  const [loadingTextIdx, setLoadingTextIdx] = useState(0);
  const [showAdGate, setShowAdGate] = useState(false);
  const [adGateState, setAdGateState] = useState<'initial' | 'adFailed'>('initial');
  const resultRef = useRef<ResultData | null>(null);

  // Compute result immediately on mount
  useEffect(() => {
    const questions = QUESTIONS_MAP[moduleId ?? ''] ?? [];
    const module = MODULES.find((m) => m.id === moduleId);
    const moduleType = module?.type ?? 'multi';

    const rawResult = scoreReading(
      questions,
      currentAnswers,
      currentPersons,
      (mode as ReadingMode) ?? 'solo',
      moduleId ?? '',
      moduleType,
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
  }, [moduleId, mode, currentAnswers, currentPersons, setResult]);

  // Cycle loading text
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingTextIdx((i) => (i + 1) % LOADING_TEXTS.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Show ad gate after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAdGate(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

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
    const success = spendStars(1);
    if (success) {
      navigateToResult();
    }
  }, [spendStars, navigateToResult]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.background, paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      {/* Main loading UI */}
      <View style={styles.centerContent}>
        <ConstellationLoader />
        <Text style={[styles.loadingText, { color: theme.textMuted }]}>
          {LOADING_TEXTS[loadingTextIdx]}
        </Text>
      </View>

      {/* Rewarded Ad Gate Modal */}
      {showAdGate && (
        <View style={styles.adGateBackdrop}>
          <GlassCard intensity="high" style={styles.adGateCard}>
            <Text style={[styles.adGateTitle, { color: theme.text, fontFamily: 'Fraunces_400Regular' }]}>
              🔮 Your reading is ready
            </Text>
            <Text style={[styles.adGateSubtitle, { color: theme.textMuted }]}>
              Watch a short video to unlock your full result
            </Text>

            <GradientButton
              label="Watch Now"
              onPress={handleWatchAd}
              style={styles.adGateBtn}
            />

            {adGateState === 'adFailed' ? (
              <Text style={[styles.adFailedText, { color: theme.textMuted }]}>
                Ad unavailable — Skip for 1 ✨
              </Text>
            ) : null}

            <TouchableOpacity
              onPress={handleSkipWithStar}
              disabled={stars === 0}
              accessibilityLabel="Skip for 1 star"
              style={[styles.skipBtn, stars === 0 && styles.skipDisabled]}
            >
              <Text style={[styles.skipText, { color: stars > 0 ? theme.textMuted : theme.surface }]}>
                Skip (1 ✨)
              </Text>
            </TouchableOpacity>
          </GlassCard>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  centerContent: { alignItems: 'center', gap: 32 },
  loadingText: { fontSize: 16, fontFamily: 'Inter_400Regular', textAlign: 'center' },
  adGateBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7,9,26,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  adGateCard: { width: '100%', padding: 28, alignItems: 'center', gap: 16 },
  adGateTitle: { fontSize: 24, textAlign: 'center' },
  adGateSubtitle: { fontSize: 15, textAlign: 'center', fontFamily: 'Inter_400Regular', lineHeight: 22 },
  adGateBtn: { width: '100%' },
  adFailedText: { fontSize: 13, textAlign: 'center', fontFamily: 'Inter_400Regular' },
  skipBtn: { paddingVertical: 12, minHeight: 44, alignItems: 'center' },
  skipDisabled: { opacity: 0.3 },
  skipText: { fontSize: 14, fontFamily: 'Inter_400Regular' },
});
