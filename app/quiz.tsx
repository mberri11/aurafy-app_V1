import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  cancelAnimation,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { useTheme } from '@/src/themes/ThemeProvider';
import { useReadingStore } from '@/src/store/readingStore';
import { useSettingsStore } from '@/src/store/settingsStore';
import { Question, ReadingMode, Language } from '@/src/types';
import { MODULES } from '@/src/data/modules';
import { localizeTemplate } from '@/src/engine/scoringEngine';
import AurafyLogo from '@/src/components/AurafyLogo';
import ProgressBar from '@/src/components/ProgressBar';
import { rs } from '@/src/utils/responsive';
import { lightTap } from '@/src/utils/haptics';

// Map moduleId → questions
import { whoLovesMeQuestions } from '@/src/data/questions/whoLovesMe';
import { whoHatesMeQuestions } from '@/src/data/questions/whoHatesMe';
import { whoJealousQuestions } from '@/src/data/questions/whoJealous';
import { whoSoulmateQuestions } from '@/src/data/questions/whoSoulmate';
import { whoAdmiresQuestions } from '@/src/data/questions/whoAdmires';
import { energyReadingQuestions } from '@/src/data/questions/energyReading';
import { attachmentStyleQuestions } from '@/src/data/questions/attachmentStyle';
import { amITheProblemQuestions } from '@/src/data/questions/amITheProblem';
import { whoCutOffQuestions } from '@/src/data/questions/whoCutOff';

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

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Generic frequency scale shown when a relationship (multi) module is read in
// solo mode (design 08-solo_quiz.png). Always/Often count toward the person,
// Sometimes/Rarely record a sentinel that scoreMulti safely ignores — so the
// result's confidence reflects how consistently the person shows the behaviour.
const SOLO_FREQUENCY = [
  { key: 'always', countsTowardPerson: true },
  { key: 'often', countsTowardPerson: true },
  { key: 'sometimes', countsTowardPerson: false },
  { key: 'rarely', countsTowardPerson: false },
] as const;

export default function QuizScreen() {
  const { moduleId, mode } = useLocalSearchParams<{ moduleId: string; mode: ReadingMode }>();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { t, i18n } = useTranslation();
  const language = i18n.language as Language;
  const { currentPersons, recordAnswer } = useReadingStore();
  const showFrameworkTags = useSettingsStore((s) => s.showFrameworkTags);

  const module = useMemo(() => MODULES.find((m) => m.id === moduleId), [moduleId]);
  const questions = useMemo(() => QUESTIONS_MAP[moduleId ?? ''] ?? [], [moduleId]);
  const [phase, setPhase] = useState<'breath' | 'quiz'>('breath');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  // Breath interstitial: screen fade, gentle text float, halo "breathing".
  const breathOpacity = useSharedValue(0);
  const bobY = useSharedValue(-6);
  const haloPulse = useSharedValue(0.8);
  const breathDone = useRef(false);

  const accent = module?.color ?? theme.primary;
  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  // A relationship module read in solo mode: statement about the one person,
  // answered on the generic frequency scale.
  const soloPerson = currentPersons[0];
  const isSoloRelationship = mode === 'solo' && module?.type === 'multi';
  const isCompactList = currentPersons.length > 5;

  // Tag shows the module-level framework (constant across the reading, per the
  // design refs); self-discovery modules with the generic 'mixed' framework
  // read "Self-Psychology" instead.
  const frameworkKey =
    module?.type === 'solo' && module.framework === 'mixed'
      ? 'selfPsychology'
      : (module?.framework ?? currentQuestion?.framework ?? 'mixed');

  const advanceQuestion = useCallback(
    (newIndex: number) => {
      // Slide in from right
      translateX.value = SCREEN_WIDTH;
      opacity.value = 0;
      translateX.value = withTiming(0, { duration: 250 });
      opacity.value = withTiming(1, { duration: 250 });
      setIsAnimating(false);
      setCurrentIndex(newIndex);
    },
    [translateX, opacity],
  );

  const enterQuiz = useCallback(() => {
    setPhase('quiz');
    advanceQuestion(0);
  }, [advanceQuestion]);

  // Tap-anywhere AND the 3s auto-advance funnel through here; the ref guards
  // the race so the fade-out only runs once.
  const dismissBreath = useCallback(() => {
    if (breathDone.current) return;
    breathDone.current = true;
    lightTap();
    cancelAnimation(bobY);
    cancelAnimation(haloPulse);
    breathOpacity.value = withTiming(0, { duration: 300 }, (finished) => {
      if (finished) runOnJS(enterQuiz)();
    });
  }, [bobY, haloPulse, breathOpacity, enterQuiz]);

  useEffect(() => {
    if (phase !== 'breath') return;
    // Fade the interstitial in, float the text, breathe the halo.
    breathOpacity.value = withTiming(1, { duration: 400 });
    bobY.value = withRepeat(
      withTiming(6, { duration: 800, easing: Easing.inOut(Easing.quad) }),
      -1,
      true,
    );
    haloPulse.value = withRepeat(
      withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.quad) }),
      -1,
      true,
    );
    const timer = setTimeout(dismissBreath, 4500);
    return () => clearTimeout(timer);
  }, [phase, breathOpacity, bobY, haloPulse, dismissBreath]);

  const handleAnswer = useCallback(
    (answerValue: string) => {
      if (isAnimating || !currentQuestion) return;
      lightTap();
      recordAnswer(currentQuestion.id, answerValue);
      setIsAnimating(true);

      // Slide out to left
      translateX.value = withTiming(-SCREEN_WIDTH, { duration: 250 });
      opacity.value = withTiming(0, { duration: 250 }, (finished) => {
        if (finished) {
          if (isLastQuestion) {
            runOnJS(router.push)({
              pathname: '/loading',
              params: { moduleId: moduleId ?? '', mode: mode ?? 'solo' },
            } as Parameters<typeof router.push>[0]);
          } else {
            runOnJS(advanceQuestion)(currentIndex + 1);
          }
        }
      });
    },
    [
      isAnimating,
      currentQuestion,
      translateX,
      opacity,
      isLastQuestion,
      moduleId,
      mode,
      currentIndex,
      advanceQuestion,
      recordAnswer,
    ],
  );

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));
  const breathStyle = useAnimatedStyle(() => ({ opacity: breathOpacity.value }));
  const bobStyle = useAnimatedStyle(() => ({ transform: [{ translateY: bobY.value }] }));
  const haloStyle = useAnimatedStyle(() => ({ opacity: haloPulse.value }));

  if (!currentQuestion) {
    return (
      <View style={[styles.container, styles.center, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text }}>No questions available</Text>
      </View>
    );
  }

  const questionSource =
    isSoloRelationship && currentQuestion.soloText && soloPerson
      ? localizeTemplate(currentQuestion.soloText, soloPerson.name)
      : currentQuestion.text;
  const questionText = questionSource[language] ?? questionSource.en;

  // Solo-relationship questions name the one person; we render that name in the
  // module accent so it reads as "special" (design 08-solo_quiz.png). Keep the
  // raw {name} template so we can split around the placeholder ourselves.
  const soloRawTemplate =
    isSoloRelationship && currentQuestion.soloText && soloPerson
      ? (currentQuestion.soloText[language] ?? currentQuestion.soloText.en)
      : null;

  // Breath copy depends on what the reading is about: yourself (self modules),
  // one named person (relationship module in solo mode), or several (multi).
  const breathText =
    isSoloRelationship && soloPerson
      ? t('quiz.breath.soloPerson', { name: soloPerson.name })
      : module?.type === 'solo'
        ? t('quiz.breath.solo')
        : t('quiz.breath.multi');

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Cosmic depth base (mirrors module detail / reading mode) */}
      <LinearGradient
        colors={['#181430', '#0E0B22', '#08061A']}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />
      {/* Violet bloom behind the question (upper-left) + faint teal corner (lower-right) */}
      <Svg style={StyleSheet.absoluteFill} width="100%" height="100%" pointerEvents="none">
        <Defs>
          <RadialGradient id="quiz_bloom" cx="28%" cy="16%" r="62%">
            <Stop offset="0%" stopColor={accent} stopOpacity={0.24} />
            <Stop offset="55%" stopColor={accent} stopOpacity={0.08} />
            <Stop offset="100%" stopColor={theme.background} stopOpacity={0} />
          </RadialGradient>
          <RadialGradient id="quiz_teal" cx="88%" cy="90%" r="50%">
            <Stop offset="0%" stopColor={theme.gradient[0]} stopOpacity={0.09} />
            <Stop offset="100%" stopColor={theme.background} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#quiz_bloom)" />
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#quiz_teal)" />
      </Svg>

      {phase === 'breath' ? (
        // ── Pre-quiz breath interstitial (08-multiQuiz_Loading / 08-selfQuiz_loading) ──
        <Animated.View style={[styles.breathScreen, breathStyle]}>
          <Pressable
            style={styles.breathScreen}
            onPress={dismissBreath}
            accessibilityRole="button"
            accessibilityLabel={t('quiz.breath.tap')}
          >
            <View style={styles.breathCenter}>
              <View style={styles.haloWrap}>
                <Animated.View style={[StyleSheet.absoluteFill, haloStyle]}>
                  <Svg style={StyleSheet.absoluteFill} width="100%" height="100%">
                    <Defs>
                      <RadialGradient id="breath_halo" cx="50%" cy="50%" r="50%">
                        <Stop offset="0%" stopColor={accent} stopOpacity={0.45} />
                        <Stop offset="60%" stopColor={accent} stopOpacity={0.16} />
                        <Stop offset="100%" stopColor={theme.background} stopOpacity={0} />
                      </RadialGradient>
                    </Defs>
                    <Circle cx="50%" cy="50%" r="50%" fill="url(#breath_halo)" />
                  </Svg>
                </Animated.View>
                <AurafyLogo size={rs(60)} />
              </View>
              <Animated.View style={bobStyle}>
                <Text style={[styles.breathText, { color: theme.text }]}>
                  {breathText}
                </Text>
              </Animated.View>
            </View>
            <Text
              style={[
                styles.tapHint,
                { color: theme.textDim, bottom: insets.bottom + rs(40) },
              ]}
            >
              {t('quiz.breath.tap')}
            </Text>
          </Pressable>
        </Animated.View>
      ) : (
        // ── Question phase ──
        <>
          <View style={[styles.header, { paddingTop: insets.top + rs(12) }]}>
            <ProgressBar
              current={currentIndex + 1}
              total={questions.length}
              accentColor={accent}
            />
          </View>

          <Animated.View style={[styles.quizBody, cardStyle]}>
            {showFrameworkTags && (
              <View
                style={[
                  styles.frameworkTag,
                  { backgroundColor: `${accent}14`, borderColor: `${accent}66` },
                ]}
              >
                <View style={[styles.frameworkDot, { backgroundColor: accent }]} />
                <Text style={[styles.frameworkText, { color: accent }]}>
                  {t(`quiz.frameworks.${frameworkKey}`).toUpperCase()}
                </Text>
              </View>
            )}

            <Text
              style={[
                styles.questionText,
                { color: theme.text, fontFamily: 'PlayfairDisplay_400Regular' },
              ]}
            >
              {soloRawTemplate && soloPerson
                ? soloRawTemplate.split('{name}').map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <Text style={{ color: accent }}>{soloPerson.name}</Text>
                      )}
                    </React.Fragment>
                  ))
                : questionText}
            </Text>

            <ScrollView
              style={styles.answersScroll}
              contentContainerStyle={[
                styles.answersContent,
                { paddingBottom: insets.bottom + rs(16), gap: rs(isCompactList ? 10 : 12) },
              ]}
              showsVerticalScrollIndicator={false}
            >
              {currentQuestion.soloAnswers ? (
                // Self-discovery solo — 4 answer cards from the question data
                currentQuestion.soloAnswers.map((answer, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => handleAnswer(String(idx))}
                    accessibilityLabel={answer.label[language] ?? answer.label.en}
                    accessibilityRole="button"
                    activeOpacity={0.8}
                    style={[
                      styles.answerCard,
                      { backgroundColor: theme.surface, borderColor: theme.borderStrong },
                    ]}
                  >
                    <LinearGradient
                      colors={[`${accent}1F`, 'rgba(255,255,255,0.02)']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={StyleSheet.absoluteFill}
                    />
                    <Text style={[styles.answerText, { color: theme.text }]}>
                      {answer.label[language] ?? answer.label.en}
                    </Text>
                  </TouchableOpacity>
                ))
              ) : isSoloRelationship ? (
                // Relationship module in solo mode — generic frequency scale
                SOLO_FREQUENCY.map(({ key, countsTowardPerson }) => (
                  <TouchableOpacity
                    key={key}
                    onPress={() =>
                      handleAnswer(countsTowardPerson && soloPerson ? soloPerson.id : 'none')
                    }
                    accessibilityLabel={t(`quiz.soloFrequency.${key}`)}
                    accessibilityRole="button"
                    activeOpacity={0.8}
                    style={[
                      styles.answerCard,
                      { backgroundColor: theme.surface, borderColor: theme.borderStrong },
                    ]}
                  >
                    <LinearGradient
                      colors={[`${accent}1F`, 'rgba(255,255,255,0.02)']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={StyleSheet.absoluteFill}
                    />
                    <Text style={[styles.answerText, { color: theme.text }]}>
                      {t(`quiz.soloFrequency.${key}`)}
                    </Text>
                  </TouchableOpacity>
                ))
              ) : (
                // Multi-person mode — one card per person
                currentPersons.map((person) => (
                  <TouchableOpacity
                    key={person.id}
                    onPress={() => handleAnswer(person.id)}
                    accessibilityLabel={person.name}
                    accessibilityRole="button"
                    activeOpacity={0.8}
                    style={[
                      styles.personCard,
                      isCompactList && styles.personCardCompact,
                      { backgroundColor: theme.surface, borderColor: theme.borderStrong },
                    ]}
                  >
                    {/* Glass sheen, then a straight accent bar clipped by the card
                        radius (a border-start would curve around the rounded corners). */}
                    <LinearGradient
                      colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.02)']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={StyleSheet.absoluteFill}
                    />
                    <View style={[styles.personAccent, { backgroundColor: person.color }]} />
                    <View
                      style={[
                        styles.personAvatar,
                        isCompactList && styles.personAvatarCompact,
                        { backgroundColor: person.color },
                      ]}
                    >
                      <Text style={[styles.personAvatarText, { color: theme.background }]}>
                        {person.name[0]?.toUpperCase() ?? '?'}
                      </Text>
                    </View>
                    <Text style={[styles.personName, { color: theme.text }]} numberOfLines={1}>
                      {person.name}
                    </Text>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
          </Animated.View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { alignItems: 'center', justifyContent: 'center' },

  // Breath interstitial
  breathScreen: { flex: 1 },
  breathCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rs(32),
  },
  haloWrap: {
    width: rs(130),
    height: rs(130),
    alignItems: 'center',
    justifyContent: 'center',
  },
  breathText: {
    fontSize: rs(15),
    lineHeight: rs(22),
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    opacity: 0.85,
    marginTop: rs(20),
    maxWidth: rs(280),
  },
  tapHint: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: rs(12),
    fontFamily: 'Inter_400Regular',
  },

  // Question phase
  header: { paddingHorizontal: rs(20), marginBottom: rs(14) },
  quizBody: { flex: 1, paddingHorizontal: rs(20) },
  frameworkTag: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(6),
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: rs(10),
    paddingVertical: rs(4.5),
  },
  frameworkDot: { width: rs(5), height: rs(5), borderRadius: rs(3) },
  frameworkText: {
    fontSize: rs(10.5),
    fontFamily: 'Inter_700Bold',
    letterSpacing: rs(0.8),
  },
  questionText: { fontSize: rs(23), lineHeight: rs(30), marginTop: rs(44) },
  answersScroll: { flex: 1, marginTop: rs(16) },
  answersContent: { flexGrow: 1, justifyContent: 'center' },

  // Solo answer cards (self + frequency)
  answerCard: {
    minHeight: rs(54),
    borderRadius: rs(16),
    borderWidth: 1,
    paddingHorizontal: rs(18),
    paddingVertical: rs(15),
    justifyContent: 'center',
    overflow: 'hidden',
  },
  answerText: { fontSize: rs(15), lineHeight: rs(21), fontFamily: 'Inter_500Medium' },

  // Multi person cards
  personCard: {
    minHeight: rs(60),
    borderRadius: rs(16),
    borderWidth: 1,
    paddingHorizontal: rs(14),
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(13),
    overflow: 'hidden',
  },
  personCardCompact: { minHeight: rs(52) },
  personAccent: {
    position: 'absolute',
    start: 0,
    top: 0,
    bottom: 0,
    width: rs(3.5),
  },
  personAvatar: {
    width: rs(34),
    height: rs(34),
    borderRadius: rs(17),
    alignItems: 'center',
    justifyContent: 'center',
  },
  personAvatarCompact: { width: rs(30), height: rs(30), borderRadius: rs(15) },
  personAvatarText: { fontSize: rs(14.5), fontFamily: 'Inter_700Bold' },
  personName: { flex: 1, fontSize: rs(15.5), fontFamily: 'Inter_600SemiBold' },
});
