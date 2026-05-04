import React, { useCallback, useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '@/src/themes/ThemeProvider';
import { useUserStore } from '@/src/store/userStore';
import { useSettingsStore } from '@/src/store/settingsStore';
import { dailyQuestions } from '@/src/data/dailyQuestions';
import GlassCard from '@/src/components/GlassCard';
import GradientButton from '@/src/components/GradientButton';
import { lightTap } from '@/src/utils/haptics';

dayjs.extend(dayOfYear);
dayjs.extend(isSameOrBefore);

export default function DailyReadingScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const language = useSettingsStore((s) => s.language);
  const { lastDailyQuestion, claimDailyBonus } = useUserStore();
  const setLastDailyQuestion = useUserStore.getState;

  const today = dayjs();
  const questionIndex = today.dayOfYear() % dailyQuestions.length;
  const question = dailyQuestions[questionIndex];

  // Check if already answered today
  const alreadyAnswered = useMemo(() => {
    if (!lastDailyQuestion) return false;
    return dayjs(lastDailyQuestion).isSame(today, 'day');
  }, [lastDailyQuestion, today]);

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [bonusClaimed, setBonusClaimed] = useState(false);

  const insightY = useSharedValue(40);
  const insightOpacity = useSharedValue(0);

  const insightStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: insightY.value }],
    opacity: insightOpacity.value,
  }));

  const handleAnswerSelect = useCallback(
    (idx: number) => {
      if (selectedAnswer !== null || alreadyAnswered) return;
      lightTap();
      setSelectedAnswer(idx);

      // Update last daily question timestamp
      useUserStore.setState({ lastDailyQuestion: Date.now() });

      // Animate insight card
      insightY.value = 40;
      insightOpacity.value = 0;
      insightY.value = withSpring(0, { stiffness: 200, damping: 20 });
      insightOpacity.value = withSpring(1, { stiffness: 200, damping: 20 });

      // Claim daily bonus if not already claimed
      const claimed = claimDailyBonus();
      if (claimed) setBonusClaimed(true);
    },
    [selectedAnswer, alreadyAnswered, insightY, insightOpacity, claimDailyBonus],
  );

  const handleDone = useCallback(() => {
    router.back();
  }, []);

  if (!question) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text }}>No daily question available</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 40 },
      ]}
    >
      <Text style={[styles.header, { color: theme.textMuted }]}>
        🌙 {t('daily.title')} · {today.format('MMM D')}
      </Text>

      <Text style={[styles.question, { color: theme.text, fontFamily: 'Fraunces_400Regular' }]}>
        {question.text[language] ?? question.text.en}
      </Text>

      {/* Answers */}
      <View style={styles.answersContainer}>
        {alreadyAnswered ? (
          <GlassCard style={styles.alreadyAnswered}>
            <Text style={[styles.alreadyTitle, { color: theme.text }]}>
              {t('daily.alreadyAnsweredTitle')}
            </Text>
            <Text style={[styles.alreadyMsg, { color: theme.textMuted }]}>
              {t('daily.alreadyAnsweredMessage')}
            </Text>
          </GlassCard>
        ) : (
          question.answers.map((answer, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => handleAnswerSelect(idx)}
              disabled={selectedAnswer !== null}
              accessibilityLabel={answer.label[language] ?? answer.label.en}
              activeOpacity={0.8}
            >
              <GlassCard
                style={[
                  styles.answerCard,
                  selectedAnswer === idx && { borderColor: theme.primary, borderWidth: 2 },
                  selectedAnswer !== null && selectedAnswer !== idx && { opacity: 0.4 },
                ]}
              >
                <Text style={[styles.answerText, { color: theme.text }]}>
                  {answer.label[language] ?? answer.label.en}
                </Text>
              </GlassCard>
            </TouchableOpacity>
          ))
        )}
      </View>

      {/* Insight card — slides up after answer */}
      {selectedAnswer !== null && (
        <Animated.View style={insightStyle}>
          <GlassCard glowColor={`${theme.primary}40`} style={styles.insightCard}>
            {bonusClaimed && (
              <Text style={[styles.bonusClaimed, { color: theme.gold }]}>
                {t('daily.bonusClaimed')}
              </Text>
            )}
            <Text style={[styles.insightText, { color: theme.text }]}>
              {question.answers[selectedAnswer].insight[language] ??
                question.answers[selectedAnswer].insight.en}
            </Text>
          </GlassCard>
        </Animated.View>
      )}

      {(selectedAnswer !== null || alreadyAnswered) && (
        <GradientButton label={t('daily.doneButton')} onPress={handleDone} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 20, gap: 20 },
  header: { fontSize: 14, fontFamily: 'Inter_400Regular', letterSpacing: 0.5 },
  question: { fontSize: 26, lineHeight: 36 },
  answersContainer: { gap: 12 },
  answerCard: { padding: 18 },
  answerText: { fontSize: 15, lineHeight: 22, fontFamily: 'Inter_400Regular' },
  insightCard: { padding: 20, gap: 10 },
  bonusClaimed: { fontSize: 15, fontWeight: '700', fontFamily: 'Inter_700Bold' },
  insightText: { fontSize: 15, lineHeight: 24, fontFamily: 'Inter_400Regular' },
  alreadyAnswered: { padding: 24, alignItems: 'center', gap: 8 },
  alreadyTitle: { fontSize: 17, fontWeight: '600', fontFamily: 'Inter_600SemiBold', textAlign: 'center' },
  alreadyMsg: { fontSize: 14, fontFamily: 'Inter_400Regular', textAlign: 'center' },
});
