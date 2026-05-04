import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useTheme } from '@/src/themes/ThemeProvider';
import { useReadingStore } from '@/src/store/readingStore';
import { Question, ReadingMode } from '@/src/types';
import { MODULES } from '@/src/data/modules';
import { useSettingsStore } from '@/src/store/settingsStore';
import GlassCard from '@/src/components/GlassCard';
import ProgressBar from '@/src/components/ProgressBar';
import { lightTap } from '@/src/utils/haptics';

// Map moduleId → questions
import { whoLovesMeQuestions } from '@/src/data/questions/whoLovesMe';
import { whoHatesMeQuestions } from '@/src/data/questions/whoHatesMe';
import { whoJealousQuestions } from '@/src/data/questions/whoJealous';
import { whoCutOffQuestions } from '@/src/data/questions/whoCutOff';
import { energyReadingQuestions } from '@/src/data/questions/energyReading';
import { attachmentStyleQuestions } from '@/src/data/questions/attachmentStyle';
import { amITheProblemQuestions } from '@/src/data/questions/amITheProblem';

const QUESTIONS_MAP: Record<string, Question[]> = {
  who_loves_me: whoLovesMeQuestions,
  who_hates_me: whoHatesMeQuestions,
  who_jealous: whoJealousQuestions,
  who_cut_off: whoCutOffQuestions,
  energy_reading: energyReadingQuestions,
  attachment_style: attachmentStyleQuestions,
  am_i_problem: amITheProblemQuestions,
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function QuizScreen() {
  const { moduleId, mode } = useLocalSearchParams<{ moduleId: string; mode: ReadingMode }>();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const language = useSettingsStore((s) => s.language);
  const { currentPersons, recordAnswer } = useReadingStore();

  const questions = useMemo(() => QUESTIONS_MAP[moduleId ?? ''] ?? [], [moduleId]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  const currentQuestion = questions[currentIndex];
  const isSolo = mode === 'solo' || !currentQuestion?.soloAnswers === false;
  const isLastQuestion = currentIndex === questions.length - 1;

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

  const handleAnswer = useCallback(
    (answerId: string) => {
      if (isAnimating || !currentQuestion) return;
      lightTap();
      recordAnswer(currentQuestion.id, answerId);
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

  if (!currentQuestion) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text }}>No questions available</Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.background, paddingTop: insets.top + 16, paddingBottom: insets.bottom + 20 },
      ]}
    >
      <View style={styles.header}>
        <ProgressBar current={currentIndex + 1} total={questions.length} />
      </View>

      <Animated.View style={[styles.questionArea, cardStyle]}>
        {/* Framework tag */}
        <View style={[styles.frameworkTag, { backgroundColor: theme.surface }]}>
          <Text style={[styles.frameworkText, { color: theme.textMuted }]}>
            {currentQuestion.framework}
          </Text>
        </View>

        {/* Question text */}
        <Text style={[styles.questionText, { color: theme.text, fontFamily: 'Fraunces_400Regular' }]}>
          {currentQuestion.text[language] ?? currentQuestion.text.en}
        </Text>
      </Animated.View>

      {/* Answer options */}
      <View style={styles.answersContainer}>
        {currentQuestion.soloAnswers ? (
          // Solo mode — 4 fixed answer cards
          currentQuestion.soloAnswers.map((answer, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => handleAnswer(String(idx))}
              accessibilityLabel={answer.label[language] ?? answer.label.en}
              activeOpacity={0.8}
            >
              <GlassCard style={styles.answerCard}>
                <Text style={[styles.answerText, { color: theme.text }]}>
                  {answer.label[language] ?? answer.label.en}
                </Text>
              </GlassCard>
            </TouchableOpacity>
          ))
        ) : (
          // Multi-person mode — one card per person
          currentPersons.map((person) => (
            <TouchableOpacity
              key={person.id}
              onPress={() => handleAnswer(person.id)}
              accessibilityLabel={person.name}
              activeOpacity={0.8}
            >
              <GlassCard
                glowColor={`${person.color}40`}
                style={[styles.personCard, { borderLeftColor: person.color, borderLeftWidth: 4 }]}
              >
                <View style={styles.personRow}>
                  <View style={[styles.personAvatar, { backgroundColor: person.color }]}>
                    <Text style={styles.personAvatarText}>
                      {person.name[0]?.toUpperCase() ?? '?'}
                    </Text>
                  </View>
                  <Text style={[styles.personName, { color: theme.text }]}>{person.name}</Text>
                </View>
              </GlassCard>
            </TouchableOpacity>
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  header: { marginBottom: 24 },
  questionArea: { flex: 1, justifyContent: 'center', gap: 16 },
  frameworkTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
    marginBottom: 8,
  },
  frameworkText: { fontSize: 12, fontFamily: 'Inter_400Regular', textTransform: 'capitalize' },
  questionText: { fontSize: 24, lineHeight: 34 },
  answersContainer: { gap: 12, paddingBottom: 16 },
  answerCard: { padding: 18 },
  answerText: { fontSize: 15, lineHeight: 22, fontFamily: 'Inter_400Regular' },
  personCard: { padding: 16 },
  personRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  personAvatar: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  personAvatarText: { color: '#fff', fontWeight: '700', fontSize: 16, fontFamily: 'Inter_700Bold' },
  personName: { fontSize: 17, fontWeight: '600', fontFamily: 'Inter_600SemiBold' },
});
