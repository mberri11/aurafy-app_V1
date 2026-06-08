import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useUserStore } from '@/src/store/userStore';
import { useTheme } from '@/src/themes/ThemeProvider';
import GlassCard from '@/src/components/GlassCard';
import CosmicBloom from '@/src/components/CosmicBloom';
import { shareAppLink } from '@/src/utils/share';
import { rs } from '@/src/utils/responsive';

dayjs.extend(relativeTime);

type IconLib = 'feather' | 'mci';

/** Maps a stored transaction reason key to its localized display label. */
function useReasonLabel() {
  const { t } = useTranslation();
  return useCallback(
    (reason: string): string => {
      switch (reason) {
        case 'rewarded_ad':
          return t('stars.reasonWatch');
        case 'share_app':
          return t('stars.reasonShare');
        case 'daily_bonus':
        case 'Daily bonus':
          return t('stars.reasonDaily');
        case 'welcome':
          return t('stars.reasonWelcome');
        case 'reading':
        case 'Reading':
          return t('stars.reasonReading');
        case 'streak':
          return t('stars.reasonStreak');
        default:
          return reason;
      }
    },
    [t],
  );
}

function AccentIcon({ lib, name, color, size }: { lib: IconLib; name: string; color: string; size: number }) {
  if (lib === 'feather') return <Feather name={name as any} size={size} color={color} />;
  return <MaterialCommunityIcons name={name as any} size={size} color={color} />;
}

interface EarnCardProps {
  lib: IconLib;
  iconName: string;
  accent: string;
  title: string;
  subtitle: string;
  amount: string;
  onPress?: () => void;
  claimed?: boolean;
  streak?: number; // when defined → render the 7-segment progress bar
}

function EarnCard({ lib, iconName, accent, title, subtitle, amount, onPress, claimed, streak }: EarnCardProps) {
  const theme = useTheme();
  const { t } = useTranslation();

  const body = (
    <GlassCard style={StyleSheet.flatten([styles.earnCard, claimed && styles.dimmed])}>
      <View style={styles.earnRow}>
        <View style={[styles.iconTile, { backgroundColor: `${accent}1F`, borderColor: `${accent}55` }]}>
          <AccentIcon lib={lib} name={iconName} color={accent} size={rs(20)} />
        </View>

        <View style={styles.earnText}>
          <Text style={[styles.earnTitle, { color: theme.text }]} numberOfLines={1}>
            {title}
          </Text>
          <Text style={[styles.earnSubtitle, { color: theme.textMuted }]} numberOfLines={1}>
            {subtitle}
          </Text>

          {streak !== undefined && (
            <View style={styles.streakBar}>
              {Array.from({ length: 7 }).map((_, i) => {
                const filled = i < Math.min(streak, 7);
                return (
                  <View
                    key={i}
                    style={[
                      styles.streakSeg,
                      filled
                        ? {
                            backgroundColor: theme.rose,
                            shadowColor: theme.rose,
                            shadowOpacity: 0.6,
                            shadowRadius: rs(4),
                            shadowOffset: { width: 0, height: 0 },
                            elevation: 3,
                          }
                        : { backgroundColor: theme.borderStrong },
                    ]}
                  />
                );
              })}
            </View>
          )}
        </View>

        {claimed ? (
          <View style={[styles.pill, { backgroundColor: theme.surface, borderColor: theme.surfaceBorder }]}>
            <Text style={[styles.claimedText, { color: theme.textMuted }]}>{t('stars.claimed')}</Text>
          </View>
        ) : (
          <View style={[styles.pill, { backgroundColor: `${accent}22`, borderColor: `${accent}55` }]}>
            <Text style={[styles.pillText, { color: accent }]}>{amount}</Text>
            <MaterialCommunityIcons name="star-four-points" size={rs(10)} color={accent} />
          </View>
        )}
      </View>
    </GlassCard>
  );

  if (onPress && !claimed) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.85} accessibilityRole="button" accessibilityLabel={title}>
        {body}
      </TouchableOpacity>
    );
  }
  return body;
}

export default function StarsWalletScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const reasonLabel = useReasonLabel();
  const { stars, streak, lastDailyClaim, recentTransactions, earnStars, claimDailyBonus, incrementStreak } =
    useUserStore();

  const canClaimDaily = useMemo(() => {
    if (lastDailyClaim === null) return true;
    return Date.now() - lastDailyClaim >= 24 * 60 * 60 * 1000;
  }, [lastDailyClaim]);

  // ── Balance pulse on change ──────────────────────────────────────────────
  const numScale = useSharedValue(1);
  const prevStars = useRef(stars);
  useEffect(() => {
    if (stars !== prevStars.current) {
      numScale.value = withSequence(
        withSpring(1.15, { stiffness: 400, damping: 10 }),
        withSpring(1, { stiffness: 300, damping: 12 }),
      );
      prevStars.current = stars;
    }
  }, [stars, numScale]);
  const numAnim = useAnimatedStyle(() => ({ transform: [{ scale: numScale.value }] }));

  // ── "+N earned" toast ────────────────────────────────────────────────────
  const [toastAmount, setToastAmount] = useState(0);
  const toastOpacity = useSharedValue(0);
  const toastY = useSharedValue(rs(12));
  const showEarnedToast = useCallback(
    (amount: number) => {
      setToastAmount(amount);
      toastOpacity.value = withSequence(withTiming(1, { duration: 200 }), withDelay(1100, withTiming(0, { duration: 350 })));
      toastY.value = withSequence(withTiming(0, { duration: 220 }), withDelay(1100, withTiming(rs(12), { duration: 350 })));
    },
    [toastOpacity, toastY],
  );
  const toastAnim = useAnimatedStyle(() => ({
    opacity: toastOpacity.value,
    transform: [{ translateY: toastY.value }],
  }));

  // NOTE: real gating (rewarded ad, 7-day completion, share completion) is Phase 4.
  // For now every card earns directly so the flow is testable on device.
  const handleWatchVideo = useCallback(() => {
    earnStars(1, 'rewarded_ad');
    showEarnedToast(1);
  }, [earnStars, showEarnedToast]);

  const handleClaimDaily = useCallback(() => {
    const claimed = claimDailyBonus();
    if (claimed) showEarnedToast(2);
  }, [claimDailyBonus, showEarnedToast]);

  const handleStreak = useCallback(() => {
    incrementStreak();
    earnStars(10, 'streak');
    showEarnedToast(10);
  }, [incrementStreak, earnStars, showEarnedToast]);

  const handleShareApp = useCallback(() => {
    void shareAppLink();
    earnStars(1, 'share_app');
    showEarnedToast(1);
  }, [earnStars, showEarnedToast]);

  return (
    // Transparent so the root CosmicField (indigo→navy) shows through, matching the
    // design's deep-indigo base — not the flat near-black it was painting before.
    <View style={styles.root}>
      {/* Violet radial glow behind the balance, per the design's upper-center bloom. */}
      <CosmicBloom cx="50%" cy="9%" r="62%" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + rs(18), paddingBottom: insets.bottom + rs(100) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Balance hero */}
        <View style={styles.heroBlock}>
          <Animated.View style={[styles.heroRow, numAnim]}>
            <MaterialCommunityIcons name="star" size={rs(26)} color={theme.gold} style={styles.heroStar} />
            <Text style={[styles.balance, { color: theme.gold, textShadowColor: `${theme.gold}66` }]}>{stars}</Text>
          </Animated.View>
          <View style={styles.heroLabelRow}>
            <Text style={[styles.heroLabel, { color: theme.textMuted }]}>{t('stars.walletTitle')}</Text>
            <MaterialCommunityIcons name="star-four-points" size={rs(10)} color={theme.textMuted} />
          </View>
        </View>

        {/* Earn section */}
        <Text style={[styles.sectionLabel, { color: theme.textDim, marginTop: rs(14) }]}>{t('stars.earnTitle')}</Text>

        <EarnCard
          lib="feather"
          iconName="play"
          accent={theme.emerald}
          title={t('stars.watchVideo')}
          subtitle={t('stars.watchVideoDesc')}
          amount="+1"
          onPress={handleWatchVideo}
        />

        <EarnCard
          lib="feather"
          iconName="calendar"
          accent={theme.gradient[0]}
          title={t('stars.dailyBonus')}
          subtitle={canClaimDaily ? t('stars.dailyBonusDesc') : t('stars.comeBack')}
          amount="+2"
          onPress={handleClaimDaily}
          claimed={!canClaimDaily}
        />

        <EarnCard
          lib="mci"
          iconName="fire"
          accent={theme.rose}
          title={t('stars.streakBonus')}
          subtitle={t('stars.streakDesc')}
          amount="+10"
          onPress={handleStreak}
          streak={streak}
        />

        <EarnCard
          lib="feather"
          iconName="share-2"
          accent={theme.primary}
          title={t('stars.shareApp')}
          subtitle={t('stars.shareDesc')}
          amount="+1"
          onPress={handleShareApp}
        />

        {/* Recent activity */}
        {recentTransactions.length > 0 && (
          <>
            <Text style={[styles.sectionLabel, { color: theme.textDim, marginTop: rs(12) }]}>
              {t('stars.activityTitle')}
            </Text>
            <GlassCard style={styles.activityCard}>
              {recentTransactions.map((tx, i) => (
                <View key={i}>
                  {i > 0 && <View style={[styles.divider, { backgroundColor: theme.surfaceBorder }]} />}
                  <View style={styles.activityRow}>
                    <View style={styles.activityText}>
                      <Text style={[styles.activityReason, { color: theme.text }]} numberOfLines={1}>
                        {reasonLabel(tx.reason)}
                      </Text>
                      <Text style={[styles.activityTime, { color: theme.textMuted }]}>
                        {dayjs(tx.timestamp).fromNow()}
                      </Text>
                    </View>
                    <View style={styles.activityAmount}>
                      <Text
                        style={[
                          styles.activityAmountText,
                          { color: tx.type === 'earn' ? theme.emerald : theme.rose },
                        ]}
                      >
                        {tx.type === 'earn' ? '+' : '-'}
                        {tx.amount}
                      </Text>
                      <MaterialCommunityIcons
                        name="star-four-points"
                        size={rs(11)}
                        color={tx.type === 'earn' ? theme.emerald : theme.rose}
                      />
                    </View>
                  </View>
                </View>
              ))}
            </GlassCard>
          </>
        )}
      </ScrollView>

      {/* "+N earned" toast overlay — light/neutral, not gold (per design) */}
      <View style={[styles.toastWrap, { bottom: insets.bottom + rs(120) }]} pointerEvents="none">
        <Animated.View
          style={[styles.toast, { backgroundColor: theme.bg2, borderColor: theme.surfaceBorder }, toastAnim]}
        >
          <Text style={[styles.toastAmount, { color: theme.text }]}>+{toastAmount}</Text>
          <MaterialCommunityIcons name="star-four-points" size={rs(11)} color={theme.textMuted} />
          <Text style={[styles.toastSuffix, { color: theme.textMuted }]}>{t('stars.earnedSuffix')}</Text>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  container: { flex: 1 },
  content: { paddingHorizontal: rs(22), gap: rs(9) },

  // Hero
  heroBlock: { alignItems: 'center' },
  heroRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: rs(7) },
  heroStar: { marginTop: rs(16) },
  balance: {
    fontSize: rs(52),
    fontFamily: 'PlayfairDisplay_700Bold',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: rs(16),
  },
  heroLabelRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: rs(5), marginTop: rs(2) },
  heroLabel: { fontSize: rs(10), fontFamily: 'Inter_600SemiBold' },

  // Section labels
  sectionLabel: {
    fontSize: rs(9.5),
    letterSpacing: 1.3,
    textTransform: 'uppercase',
    fontFamily: 'Inter_600SemiBold',
  },

  // Earn card
  earnCard: { paddingVertical: rs(11), paddingHorizontal: rs(13) },
  dimmed: { opacity: 0.5 },
  earnRow: { flexDirection: 'row', alignItems: 'center', gap: rs(11) },
  iconTile: {
    width: rs(42),
    height: rs(42),
    borderRadius: rs(12),
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  earnText: { flex: 1, gap: rs(2) },
  earnTitle: { fontSize: rs(13), fontFamily: 'Inter_700Bold' },
  earnSubtitle: { fontSize: rs(11), fontFamily: 'Inter_400Regular' },
  streakBar: { flexDirection: 'row', gap: rs(5), marginTop: rs(7) },
  streakSeg: { flex: 1, height: rs(5), borderRadius: rs(2.5) },

  // Pills (right side)
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(4),
    borderRadius: 999,
    borderWidth: 0.5,
    paddingHorizontal: rs(12),
    paddingVertical: rs(6),
  },
  pillText: { fontSize: rs(10.5), fontFamily: 'Inter_700Bold' },
  claimedText: { fontSize: rs(11.5), fontFamily: 'Inter_600SemiBold' },

  // Recent activity
  activityCard: { paddingVertical: rs(2), paddingHorizontal: rs(2) },
  divider: { height: 1, marginHorizontal: rs(15) },
  activityRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: rs(11), paddingHorizontal: rs(15) },
  activityText: { flex: 1, gap: rs(2) },
  activityReason: { fontSize: rs(13.5), fontFamily: 'Inter_700Bold' },
  activityTime: { fontSize: rs(10.5), fontFamily: 'Inter_400Regular' },
  activityAmount: { flexDirection: 'row', alignItems: 'center', gap: rs(4) },
  activityAmountText: { fontSize: rs(12.5), fontFamily: 'Inter_700Bold' },

  // Toast
  toastWrap: { position: 'absolute', left: 0, right: 0, alignItems: 'center' },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(5),
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: rs(16),
    paddingVertical: rs(9),
  },
  toastAmount: { fontSize: rs(13.5), fontFamily: 'Inter_700Bold' },
  toastSuffix: { fontSize: rs(12.5), fontFamily: 'Inter_500Medium' },
});
