import React, { useCallback, useMemo } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useUserStore } from '@/src/store/userStore';
import { useTheme } from '@/src/themes/ThemeProvider';
import { AdMobManager } from '@/src/ads/AdMobManager';
import GlassCard from '@/src/components/GlassCard';
import GradientButton from '@/src/components/GradientButton';
import { shareAppLink } from '@/src/utils/share';

dayjs.extend(relativeTime);

function getDailyCountdown(lastClaim: number | null): string {
  if (lastClaim === null) return '';
  const nextClaim = lastClaim + 24 * 60 * 60 * 1000;
  const diff = nextClaim - Date.now();
  if (diff <= 0) return '';
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `Ready in ${hours}h ${minutes}m`;
}

export default function StarsWalletScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { stars, streak, lastDailyClaim, recentTransactions, earnStars, claimDailyBonus } =
    useUserStore();

  const canClaimDaily = useMemo(() => {
    if (lastDailyClaim === null) return true;
    return Date.now() - lastDailyClaim >= 24 * 60 * 60 * 1000;
  }, [lastDailyClaim]);

  const dailyCountdown = useMemo(() => getDailyCountdown(lastDailyClaim), [lastDailyClaim]);

  const handleWatchVideo = useCallback(async () => {
    const watched = await AdMobManager.showRewarded();
    if (watched) {
      earnStars(1, 'rewarded_ad');
    } else {
      Alert.alert('Ad not available', t('errors.adNotAvailable'));
    }
  }, [earnStars, t]);

  const handleClaimDaily = useCallback(() => {
    const claimed = claimDailyBonus();
    if (!claimed) {
      Alert.alert('Already claimed', 'Come back in 24 hours for your next bonus.');
    }
  }, [claimDailyBonus]);

  const handleShareApp = useCallback(async () => {
    const shared = await shareAppLink();
    if (shared) {
      earnStars(1, 'share_app');
    }
  }, [earnStars]);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 100 }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Balance hero */}
      <View style={styles.hero}>
        <Text style={[styles.starIcon, { color: theme.gold }]}>✨</Text>
        <Text style={[styles.balance, { color: theme.gold, fontFamily: 'Fraunces_400Regular' }]}>
          {stars}
        </Text>
        <Text style={[styles.balanceLabel, { color: theme.textMuted }]}>
          {t('stars.walletTitle')}
        </Text>
      </View>

      {/* Earn section */}
      <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>{t('stars.earnTitle')}</Text>

      {/* Watch Video */}
      <GlassCard style={styles.earnCard}>
        <View style={styles.earnRow}>
          <View style={styles.earnInfo}>
            <Text style={[styles.earnTitle, { color: theme.text }]}>
              📺 {t('stars.watchVideo')}
            </Text>
            <Text style={[styles.earnAmount, { color: theme.gold }]}>
              {t('stars.watchVideoAmount')} ✨
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleWatchVideo}
            style={[styles.earnBtn, { backgroundColor: theme.primary }]}
            accessibilityLabel="Watch video ad"
          >
            <Text style={styles.earnBtnText}>{t('stars.watchNow')}</Text>
          </TouchableOpacity>
        </View>
      </GlassCard>

      {/* Daily Bonus */}
      <GlassCard style={styles.earnCard}>
        <View style={styles.earnRow}>
          <View style={styles.earnInfo}>
            <Text style={[styles.earnTitle, { color: theme.text }]}>
              🎁 {t('stars.dailyBonus')}
            </Text>
            {canClaimDaily ? (
              <Text style={[styles.earnAmount, { color: theme.gold }]}>
                {t('stars.dailyBonusAmount')} ✨
              </Text>
            ) : (
              <Text style={[styles.earnAmount, { color: theme.textMuted }]}>{dailyCountdown}</Text>
            )}
          </View>
          <TouchableOpacity
            onPress={handleClaimDaily}
            disabled={!canClaimDaily}
            style={[
              styles.earnBtn,
              { backgroundColor: canClaimDaily ? theme.primary : theme.surface },
            ]}
            accessibilityLabel="Claim daily bonus"
          >
            <Text style={[styles.earnBtnText, !canClaimDaily && { color: theme.textMuted }]}>
              {t('stars.claim')}
            </Text>
          </TouchableOpacity>
        </View>
      </GlassCard>

      {/* 7-Day Streak */}
      <GlassCard style={styles.earnCard}>
        <View style={styles.earnInfo}>
          <Text style={[styles.earnTitle, { color: theme.text }]}>
            🔥 {t('stars.streakBonus')}
          </Text>
          <Text style={[styles.earnAmount, { color: theme.gold }]}>
            {t('stars.streakBonusAmount')} ✨
          </Text>
          <Text style={[styles.streakProgress, { color: theme.textMuted }]}>
            {t('stars.dayProgress', { streak: Math.min(streak, 7) })}
          </Text>
          {/* Progress dots */}
          <View style={styles.streakDots}>
            {Array.from({ length: 7 }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.streakDot,
                  {
                    backgroundColor: i < streak ? theme.gold : theme.surface,
                    borderColor: theme.surfaceBorder,
                  },
                ]}
              />
            ))}
          </View>
        </View>
      </GlassCard>

      {/* Share Aurafy */}
      <GlassCard style={styles.earnCard}>
        <View style={styles.earnRow}>
          <View style={styles.earnInfo}>
            <Text style={[styles.earnTitle, { color: theme.text }]}>
              🔗 {t('stars.shareApp')}
            </Text>
            <Text style={[styles.earnAmount, { color: theme.gold }]}>
              {t('stars.shareAppAmount')} ✨
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleShareApp}
            style={[styles.earnBtn, { backgroundColor: theme.primary }]}
            accessibilityLabel="Share Aurafy"
          >
            <Text style={styles.earnBtnText}>{t('stars.share')}</Text>
          </TouchableOpacity>
        </View>
      </GlassCard>

      {/* Recent activity */}
      {recentTransactions.length > 0 && (
        <>
          <Text style={[styles.sectionTitle, { color: theme.textMuted, marginTop: 8 }]}>
            {t('stars.activityTitle')}
          </Text>
          {recentTransactions.map((tx, i) => (
            <GlassCard key={i} style={styles.txCard}>
              <View style={styles.txRow}>
                <Text style={[styles.txIcon]}>{tx.type === 'earn' ? '✨' : '💫'}</Text>
                <Text style={[styles.txReason, { color: theme.text }]}>{tx.reason}</Text>
                <Text
                  style={[
                    styles.txAmount,
                    { color: tx.type === 'earn' ? '#34D399' : theme.rose },
                  ]}
                >
                  {tx.type === 'earn' ? '+' : '-'}
                  {tx.amount}
                </Text>
                <Text style={[styles.txTime, { color: theme.textMuted }]}>
                  {dayjs(tx.timestamp).fromNow()}
                </Text>
              </View>
            </GlassCard>
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 20, gap: 12 },
  hero: { alignItems: 'center', paddingVertical: 20, gap: 4 },
  starIcon: { fontSize: 40 },
  balance: { fontSize: 64, letterSpacing: 2 },
  balanceLabel: { fontSize: 15, fontFamily: 'Inter_400Regular' },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    fontFamily: 'Inter_600SemiBold',
    marginTop: 4,
  },
  earnCard: { padding: 16 },
  earnRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  earnInfo: { flex: 1, gap: 4 },
  earnTitle: { fontSize: 15, fontWeight: '600', fontFamily: 'Inter_600SemiBold' },
  earnAmount: { fontSize: 14, fontFamily: 'Inter_400Regular' },
  earnBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    minHeight: 44,
    justifyContent: 'center',
  },
  earnBtnText: { color: '#fff', fontSize: 14, fontWeight: '600', fontFamily: 'Inter_600SemiBold' },
  streakProgress: { fontSize: 13, fontFamily: 'Inter_400Regular', marginTop: 4 },
  streakDots: { flexDirection: 'row', gap: 8, marginTop: 8 },
  streakDot: { width: 28, height: 28, borderRadius: 14, borderWidth: 1 },
  txCard: { padding: 14 },
  txRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  txIcon: { fontSize: 16 },
  txReason: { flex: 1, fontSize: 14, fontFamily: 'Inter_400Regular' },
  txAmount: { fontSize: 15, fontWeight: '700', fontFamily: 'Inter_700Bold' },
  txTime: { fontSize: 12, fontFamily: 'Inter_400Regular' },
});
