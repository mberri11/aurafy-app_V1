import React, { useCallback, useEffect, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '@/src/themes/ThemeProvider';
import { useReadingStore } from '@/src/store/readingStore';
import { useUserStore } from '@/src/store/userStore';
import { AdMobManager } from '@/src/ads/AdMobManager';
import GlassCard from '@/src/components/GlassCard';
import GradientButton from '@/src/components/GradientButton';
import { shareResult } from '@/src/utils/share';
import { successNotification, lightTap } from '@/src/utils/haptics';
import { MODULES } from '@/src/data/modules';
import { Reading, Language, SoloResults } from '@/src/types';
import { attachmentStyleResults } from '@/src/data/results/attachmentStyleResults';
import { amITheProblemResults } from '@/src/data/results/amITheProblemResults';
import { rs } from '@/src/utils/responsive';

const SOLO_RESULTS: Record<string, SoloResults> = {
  attachment_style: attachmentStyleResults,
  am_i_problem: amITheProblemResults,
};

function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

export default function ResultScreen() {
  const { viewOnly } = useLocalSearchParams<{ viewOnly?: string }>();
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const language = i18n.language as Language;
  const { currentResult, currentPersons, currentAnswers, currentModuleId, currentMode, viewOnlyResult } =
    useReadingStore();
  const { addReading, incrementReadingCount, readingCount } = useUserStore();

  const isViewOnly = viewOnly === '1';
  const result = isViewOnly ? viewOnlyResult : currentResult;

  // Reveal animation for the eyebrow + big title
  const titleScale = useSharedValue(0.85);
  const titleOpacity = useSharedValue(0);

  useEffect(() => {
    if (!result || isViewOnly) return;
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
    if ((readingCount + 1) % 3 === 0) AdMobManager.showInterstitial();
    successNotification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    titleScale.value = withDelay(250, withSpring(1, { stiffness: 200, damping: 16 }));
    titleOpacity.value = withDelay(250, withTiming(1, { duration: 500 }));
  }, [titleScale, titleOpacity]);

  const titleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: titleScale.value }],
    opacity: titleOpacity.value,
  }));

  const module = result ? MODULES.find((m) => m.id === result.moduleId) : undefined;
  const isMulti = module?.type === 'multi';

  // Big-title verdict word for self-discovery modules (e.g. "Secure").
  const verdictWord = useMemo(() => {
    if (!result || isMulti || !result.verdict) return null;
    const sr = SOLO_RESULTS[result.moduleId];
    return sr ? sr.verdictLabel[result.verdict] : null;
  }, [result, isMulti]);

  const handleShare = useCallback(async () => {
    if (!result) return;
    const insights = result.insights.map((i) => i[language] ?? i.en).join('\n\n');
    const text = `My Aurafy reading:\n\n${insights}\n\n— ${result.confidence}% confidence`;
    await shareResult(text);
  }, [result, language]);

  const handleTryAnother = useCallback(() => {
    lightTap();
    router.replace('/(tabs)');
  }, []);

  const handleSaveExit = useCallback(() => {
    lightTap();
    router.replace('/(tabs)/history');
  }, []);

  if (!result) {
    return (
      <View style={[styles.container, styles.center, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text }}>No result found.</Text>
      </View>
    );
  }

  // accent drives the big title, confidence %/bar — winner colour for multi,
  // module colour for self-discovery (e.g. cyan for attachment).
  const accent = isMulti ? result.winner?.color ?? module?.color ?? theme.primary : module?.color ?? theme.primary;
  const eyebrow = t(`modules.${result.moduleId}.subtitle`, { defaultValue: '' }).toUpperCase();

  const personCount = Object.keys(result.scores).length;
  const showComparison = isMulti && personCount > 1;
  // Solo-relationship (one person) keeps the verdict sentence as a subtitle punchline.
  const winnerSentence = result.insights[0]?.[language] ?? result.insights[0]?.en ?? '';
  const winnerSubtitle =
    isMulti && personCount <= 1 && result.winner
      ? winnerSentence.replace(`${result.winner.name} `, '')
      : null;

  const bigTitle = isMulti
    ? result.winner?.name ?? ''
    : (verdictWord?.[language] ?? verdictWord?.en ?? '');

  const confidence = result.confidence;
  const betterThan = Math.max(50, Math.min(95, confidence - 7));
  const bullets = result.insights.slice(1);
  const maxScore = Math.max(...Object.values(result.scores), 1);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Cosmic base + module-tinted top bloom */}
      <LinearGradient
        colors={['#181430', '#0E0B22', '#08061A']}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />
      <Svg style={StyleSheet.absoluteFill} width="100%" height="100%" pointerEvents="none">
        <Defs>
          <RadialGradient id="result_bloom" cx="28%" cy="12%" r="60%">
            <Stop offset="0%" stopColor={accent} stopOpacity={0.2} />
            <Stop offset="55%" stopColor={accent} stopOpacity={0.06} />
            <Stop offset="100%" stopColor={theme.background} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#result_bloom)" />
      </Svg>

      <ScrollView
        style={styles.flex}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + rs(28),
            paddingBottom: isViewOnly ? insets.bottom + rs(40) : insets.bottom + rs(184),
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Eyebrow + big title */}
        <Animated.View style={[styles.header, titleStyle]}>
          {!!eyebrow && (
            <Text style={[styles.eyebrow, { color: theme.textDim }]}>{eyebrow}</Text>
          )}
          <Text
            style={[
              styles.bigTitle,
              {
                color: accent,
                fontFamily: 'PlayfairDisplay_600SemiBold',
                textShadowColor: accent,
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: 18,
              },
            ]}
          >
            {bigTitle}
          </Text>
          {!!winnerSubtitle && (
            <Text style={[styles.winnerSubtitle, { color: theme.text }]}>{winnerSubtitle}</Text>
          )}
        </Animated.View>

        {/* Confidence */}
        <GlassCard style={styles.card}>
          {(() => {
            const head = t('result.confidenceHeadline', { confidence });
            const token = `${confidence}%`;
            const parts = head.split(token);
            return (
              <Text style={[styles.confHead, { color: theme.text }]}>
                {parts[0]}
                <Text style={{ color: accent, fontFamily: 'Inter_700Bold' }}>{token}</Text>
                {parts.slice(1).join(token)}
              </Text>
            );
          })()}
          <Text style={[styles.confSub, { color: theme.textDim }]}>
            {t('result.confidenceSub', { pct: betterThan })}
          </Text>
          <View style={[styles.bar, { backgroundColor: theme.surface }]}>
            <View style={[styles.barFill, { width: `${confidence}%`, backgroundColor: accent }]} />
          </View>
        </GlassCard>

        {/* The full picture (multi, >1 person) */}
        {showComparison && (
          <GlassCard style={styles.card}>
            <Text style={[styles.cardTitle, { color: theme.textDim }]}>{t('result.comparison')}</Text>
            {currentPersons.map((p) => {
              const pct = Math.round(((result.scores[p.id] ?? 0) / maxScore) * 100);
              return (
                <View key={p.id} style={styles.compRow}>
                  <View style={[styles.avatar, { backgroundColor: p.color }]}>
                    <Text style={[styles.avatarText, { color: theme.background }]}>
                      {p.name[0]?.toUpperCase() ?? '?'}
                    </Text>
                  </View>
                  <Text style={[styles.compName, { color: theme.text }]} numberOfLines={1}>
                    {p.name}
                  </Text>
                  <View style={[styles.compTrack, { backgroundColor: theme.surface }]}>
                    <View style={[styles.compFill, { width: `${pct}%`, backgroundColor: p.color }]} />
                  </View>
                  <Text style={[styles.compPct, { color: theme.textMuted }]}>{pct}%</Text>
                </View>
              );
            })}
          </GlassCard>
        )}

        {/* The read (self-discovery one-liner) */}
        {!isMulti && (
          <GlassCard style={styles.card}>
            <Text style={[styles.cardTitle, { color: theme.textDim }]}>{t('result.theRead')}</Text>
            <Text
              style={[styles.theReadText, { color: theme.text, fontFamily: 'PlayfairDisplay_600SemiBold' }]}
            >
              {winnerSentence}
            </Text>
          </GlassCard>
        )}

        {/* What this means */}
        {bullets.length > 0 && (
          <GlassCard style={styles.card}>
            <Text style={[styles.cardTitle, { color: theme.textDim }]}>{t('result.whatThisMeans')}</Text>
            {bullets.map((insight, i) => (
              <View key={i}>
                {i > 0 && <View style={[styles.divider, { backgroundColor: theme.surfaceBorder }]} />}
                <View style={styles.bulletRow}>
                  <Text style={[styles.bulletStar, { color: theme.gradient[0] }]}>
                    {t('result.insightPrefix')}
                  </Text>
                  <Text style={[styles.bulletText, { color: theme.text }]}>
                    {insight[language] ?? insight.en}
                  </Text>
                </View>
              </View>
            ))}
          </GlassCard>
        )}

        {/* Disclaimer */}
        <Text style={[styles.disclaimer, { color: theme.textDim }]}>{t('result.disclaimer')}</Text>
      </ScrollView>

      {/* Fixed action bar */}
      {!isViewOnly && (
        <View style={[styles.actionBar, { paddingBottom: insets.bottom + rs(12) }]}>
          <LinearGradient
            colors={[`${theme.background}00`, theme.background]}
            locations={[0, 0.5]}
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
          />
          <GradientButton
            label={t('result.shareButton')}
            onPress={handleShare}
            leadingIcon="share-variant"
            labelColor={theme.background}
            bold
            glow
          />
          <View style={styles.actionRow}>
            <TouchableOpacity
              onPress={handleTryAnother}
              accessibilityRole="button"
              accessibilityLabel={t('result.retryButton')}
              activeOpacity={0.8}
              style={[styles.pill, { backgroundColor: theme.surface, borderColor: theme.borderStrong }]}
            >
              <Text style={[styles.pillText, { color: theme.text }]}>{t('result.retryButton')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSaveExit}
              accessibilityRole="button"
              accessibilityLabel={t('result.saveButton')}
              activeOpacity={0.8}
              style={[styles.pill, { backgroundColor: theme.surface, borderColor: theme.borderStrong }]}
            >
              <Text style={[styles.pillText, { color: theme.text }]}>{t('result.saveButton')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  flex: { flex: 1 },
  center: { alignItems: 'center', justifyContent: 'center' },
  content: { paddingHorizontal: rs(20), gap: rs(14) },

  header: { alignItems: 'center', gap: rs(6), paddingVertical: rs(8) },
  eyebrow: {
    fontSize: rs(11),
    fontFamily: 'Inter_700Bold',
    letterSpacing: rs(1.6),
    textAlign: 'center',
  },
  bigTitle: { fontSize: rs(34), textAlign: 'center', marginTop: rs(2) },
  winnerSubtitle: {
    fontSize: rs(16),
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    marginTop: rs(2),
  },

  card: { padding: rs(16), gap: rs(10) },
  cardTitle: {
    fontSize: rs(11.5),
    fontFamily: 'Inter_700Bold',
    letterSpacing: rs(1.2),
    textTransform: 'uppercase',
  },

  // Confidence
  confHead: { fontSize: rs(15), fontFamily: 'Inter_500Medium', lineHeight: rs(21) },
  confSub: { fontSize: rs(12.5), fontFamily: 'Inter_400Regular', marginTop: rs(-2) },
  bar: { height: rs(9), borderRadius: rs(5), overflow: 'hidden', marginTop: rs(4) },
  barFill: { height: rs(9), borderRadius: rs(5) },

  // Comparison
  compRow: { flexDirection: 'row', alignItems: 'center', gap: rs(10) },
  avatar: {
    width: rs(30),
    height: rs(30),
    borderRadius: rs(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: rs(13), fontFamily: 'Inter_700Bold' },
  compName: { width: rs(64), fontSize: rs(14), fontFamily: 'Inter_500Medium' },
  compTrack: { flex: 1, height: rs(8), borderRadius: rs(4), overflow: 'hidden' },
  compFill: { height: rs(8), borderRadius: rs(4) },
  compPct: { width: rs(40), fontSize: rs(13), textAlign: 'right', fontFamily: 'Inter_500Medium' },

  // The read
  theReadText: { fontSize: rs(18), lineHeight: rs(26) },

  // What this means
  divider: { height: 1, marginVertical: rs(12) },
  bulletRow: { flexDirection: 'row', gap: rs(12), alignItems: 'flex-start' },
  bulletStar: { fontSize: rs(15), marginTop: rs(2) },
  bulletText: { flex: 1, fontSize: rs(14.5), lineHeight: rs(21), fontFamily: 'Inter_400Regular' },

  disclaimer: {
    fontSize: rs(12),
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
    lineHeight: rs(18),
    paddingHorizontal: rs(20),
    marginTop: rs(4),
  },

  // Action bar
  actionBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: rs(20),
    paddingTop: rs(22),
    gap: rs(12),
  },
  actionRow: { flexDirection: 'row', gap: rs(12) },
  pill: {
    flex: 1,
    height: rs(52),
    borderRadius: rs(14),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillText: { fontSize: rs(15), fontFamily: 'Inter_600SemiBold' },
});
