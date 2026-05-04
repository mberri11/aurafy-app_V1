import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withSequence, withDelay, withTiming } from 'react-native-reanimated';
import { useTheme } from '@/src/themes/ThemeProvider';
import { useReadingStore } from '@/src/store/readingStore';
import { useUserStore } from '@/src/store/userStore';
import { useSettingsStore } from '@/src/store/settingsStore';
import { AdMobManager } from '@/src/ads/AdMobManager';
import GlassCard from '@/src/components/GlassCard';
import GradientButton from '@/src/components/GradientButton';
import { shareResult } from '@/src/utils/share';
import { successNotification } from '@/src/utils/haptics';
import { MODULES } from '@/src/data/modules';
import { Reading } from '@/src/types';
import { attachmentStyleResults } from '@/src/data/results/attachmentStyleResults';
import { amITheProblemResults } from '@/src/data/results/amITheProblemResults';

function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

export default function ResultScreen() {
  const { viewOnly } = useLocalSearchParams<{ viewOnly?: string }>();
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const language = useSettingsStore((s) => s.language);
  const { currentResult, currentPersons, currentAnswers, currentModuleId, currentMode, viewOnlyResult } = useReadingStore();
  const { addReading, incrementReadingCount, readingCount } = useUserStore();

  const isViewOnly = viewOnly === '1';
  const result = isViewOnly ? viewOnlyResult : currentResult;

  // Reveal animation for winner name
  const winnerScale = useSharedValue(0.8);
  const winnerOpacity = useSharedValue(0);

  useEffect(() => {
    if (!result || isViewOnly) return;

    // Save to history on mount
    const reading: Reading = {
      id: generateId(),
      moduleId: currentModuleId,
      mode: currentMode,
      persons: currentPersons,
      answers: currentAnswers,
      result,
      createdAt: Date.now(),
    };
    addReading(reading);
    incrementReadingCount();

    // Show interstitial every 3rd reading
    if ((readingCount + 1) % 3 === 0) {
      AdMobManager.showInterstitial();
    }

    successNotification();
  }, []);

  useEffect(() => {
    winnerScale.value = withDelay(300, withSpring(1, { stiffness: 200, damping: 15 }));
    winnerOpacity.value = withDelay(300, withTiming(1, { duration: 500 }));
  }, [winnerScale, winnerOpacity]);

  const winnerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: winnerScale.value }],
    opacity: winnerOpacity.value,
  }));

  const handleShare = useCallback(async () => {
    if (!result) return;
    const insights = result.insights.map((i) => i[language] ?? i.en).join('\n\n');
    const text = `My Aurafy reading:\n\n${insights}\n\n— ${result.confidence}% confidence`;
    await shareResult(text);
  }, [result, language]);

  const handleTryAnother = useCallback(() => {
    router.replace('/(tabs)');
  }, []);

  const handleSaveExit = useCallback(() => {
    router.replace('/(tabs)/history');
  }, []);

  const module = result ? MODULES.find((m) => m.id === result.moduleId) : undefined;
  const isMulti = module?.type === 'multi';

  // Get "what this means" paragraph for solo. Hook must run on every render —
  // do NOT place after the early null-result return below.
  const whatThisMeans = useMemo(() => {
    if (!result || isMulti || !result.verdict) return null;
    if (result.moduleId === 'attachment_style') return attachmentStyleResults.whatThisMeans[result.verdict];
    if (result.moduleId === 'am_i_problem') return amITheProblemResults.whatThisMeans[result.verdict];
    return null;
  }, [result, isMulti]);

  if (!result) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text }}>No result found.</Text>
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
      showsVerticalScrollIndicator={false}
    >
      {isMulti && result.winner ? (
        // Multi-person result
        <>
          <Animated.View style={[styles.winnerContainer, winnerStyle]}>
            <Text
              style={[
                styles.winnerName,
                {
                  color: result.winner.color,
                  fontFamily: 'Fraunces_400Regular',
                  textShadowColor: result.winner.color,
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 20,
                },
              ]}
            >
              {result.winner.name}
            </Text>
            {result.insights[0] && (
              <Text style={[styles.verdictLine, { color: theme.text }]}>
                {(() => {
                  const s = result.insights[0][language] ?? result.insights[0].en;
                  // Strip winner name prefix if present
                  return s.replace(`${result.winner?.name ?? ''} `, '');
                })()}
              </Text>
            )}
          </Animated.View>

          {/* Confidence */}
          <GlassCard style={styles.confidenceCard}>
            <Text style={[styles.confidenceText, { color: theme.textMuted }]}>
              {t('result.confidenceLabel', { confidence: result.confidence })}
            </Text>
            <View style={[styles.confidenceTrack, { backgroundColor: theme.surface }]}>
              <View style={[styles.confidenceFill, { width: `${result.confidence}%`, backgroundColor: result.winner.color }]} />
            </View>
          </GlassCard>

          {/* Comparison bars */}
          {Object.keys(result.scores).length > 1 && (
            <GlassCard style={styles.compCard}>
              <Text style={[styles.compTitle, { color: theme.textMuted }]}>{t('result.comparison')}</Text>
              {currentPersons.map((p) => {
                const score = result.scores[p.id] ?? 0;
                const maxScore = Math.max(...Object.values(result.scores), 1);
                const pct = (score / maxScore) * 100;
                return (
                  <View key={p.id} style={styles.compRow}>
                    <Text style={[styles.compName, { color: theme.text }]}>{p.name}</Text>
                    <View style={[styles.compTrack, { backgroundColor: theme.surface }]}>
                      <View style={[styles.compFill, { width: `${pct}%`, backgroundColor: p.color }]} />
                    </View>
                    <Text style={[styles.compPct, { color: theme.textMuted }]}>{Math.round(pct)}%</Text>
                  </View>
                );
              })}
            </GlassCard>
          )}
        </>
      ) : (
        // Solo result
        <>
          <Animated.View style={[styles.verdictContainer, winnerStyle]}>
            <Text style={[styles.soloVerdict, { color: theme.text, fontFamily: 'Fraunces_400Regular' }]}>
              {result.insights[0]?.[language] ?? result.insights[0]?.en ?? ''}
            </Text>
          </Animated.View>

          {/* Confidence */}
          <GlassCard style={styles.confidenceCard}>
            <Text style={[styles.confidenceText, { color: theme.textMuted }]}>
              {t('result.confidenceLabel', { confidence: result.confidence })}
            </Text>
            <View style={[styles.confidenceTrack, { backgroundColor: theme.surface }]}>
              <View style={[styles.confidenceFill, { width: `${result.confidence}%`, backgroundColor: theme.primary }]} />
            </View>
          </GlassCard>

          {/* What this means */}
          {whatThisMeans && (
            <GlassCard style={styles.meaningCard}>
              <Text style={[styles.meaningTitle, { color: theme.textMuted }]}>
                {t('result.whatThisMeans')}
              </Text>
              <Text style={[styles.meaningText, { color: theme.text }]}>
                {whatThisMeans[language] ?? whatThisMeans.en}
              </Text>
            </GlassCard>
          )}
        </>
      )}

      {/* Insights */}
      <GlassCard style={styles.insightsCard}>
        {result.insights.slice(isMulti ? 1 : 1).map((insight, i) => (
          <View key={i} style={styles.insightRow}>
            <Text style={[styles.insightPrefix, { color: theme.primary }]}>{t('result.insightPrefix')}</Text>
            <Text style={[styles.insightText, { color: theme.text }]}>
              {insight[language] ?? insight.en}
            </Text>
          </View>
        ))}
      </GlassCard>

      {/* Disclaimer */}
      <Text style={[styles.disclaimer, { color: theme.textMuted }]}>{t('result.disclaimer')}</Text>

      {/* Actions */}
      {!isViewOnly && (
        <View style={styles.actions}>
          <GradientButton label={t('result.shareButton')} onPress={handleShare} />
          <GradientButton label={t('result.retryButton')} onPress={handleTryAnother} variant="outline" />
          <Text
            onPress={handleSaveExit}
            style={[styles.saveText, { color: theme.textMuted }]}
            accessibilityRole="button"
          >
            {t('result.saveButton')}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 20, gap: 16 },
  winnerContainer: { alignItems: 'center', gap: 8, paddingVertical: 12 },
  winnerName: { fontSize: 44, textAlign: 'center' },
  verdictLine: { fontSize: 18, textAlign: 'center', fontFamily: 'Inter_400Regular' },
  verdictContainer: { alignItems: 'center', paddingVertical: 12 },
  soloVerdict: { fontSize: 28, textAlign: 'center', lineHeight: 38 },
  confidenceCard: { padding: 16, gap: 10 },
  confidenceText: { fontSize: 13, fontFamily: 'Inter_400Regular' },
  confidenceTrack: { height: 6, borderRadius: 3, overflow: 'hidden' },
  confidenceFill: { height: 6, borderRadius: 3 },
  compCard: { padding: 16, gap: 12 },
  compTitle: { fontSize: 12, fontWeight: '600', letterSpacing: 1.2, textTransform: 'uppercase', fontFamily: 'Inter_600SemiBold' },
  compRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  compName: { width: 80, fontSize: 13, fontFamily: 'Inter_400Regular' },
  compTrack: { flex: 1, height: 8, borderRadius: 4, overflow: 'hidden' },
  compFill: { height: 8, borderRadius: 4 },
  compPct: { width: 36, fontSize: 12, textAlign: 'right', fontFamily: 'Inter_400Regular' },
  meaningCard: { padding: 16, gap: 10 },
  meaningTitle: { fontSize: 12, fontWeight: '600', letterSpacing: 1.2, textTransform: 'uppercase', fontFamily: 'Inter_600SemiBold' },
  meaningText: { fontSize: 15, lineHeight: 24, fontFamily: 'Inter_400Regular' },
  insightsCard: { padding: 20, gap: 16 },
  insightRow: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  insightPrefix: { fontSize: 16, fontWeight: '700', marginTop: 1 },
  insightText: { flex: 1, fontSize: 15, lineHeight: 23, fontFamily: 'Inter_400Regular' },
  disclaimer: { fontSize: 12, textAlign: 'center', fontFamily: 'Inter_400Regular', paddingHorizontal: 16 },
  actions: { gap: 12, marginTop: 4 },
  saveText: { textAlign: 'center', fontSize: 15, paddingVertical: 12, fontFamily: 'Inter_400Regular' },
});
