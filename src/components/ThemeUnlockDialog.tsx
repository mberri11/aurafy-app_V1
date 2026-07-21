import React, { useEffect } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppText as Text } from '@/src/components/AppText';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useTranslation } from 'react-i18next';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../themes/ThemeProvider';
import GradientButton from './GradientButton';
import { rs, screenWidth } from '../utils/responsive';

// Explicit widths — a percentage chain (card width:'100%' inside a content-sized
// Animated.View) collapses the hero (its only no-content child) to 0 width, so it
// never paints. Fixed px keep the hero visible.
const CARD_W = Math.min(rs(340), screenWidth - rs(80)); // ≈281dp, matches design
const HERO_W = CARD_W - rs(40);

interface ThemeUnlockDialogProps {
  visible: boolean;
  themeName: string;
  /** Short mood line rendered under the name (Simo, 2026-07-19). Optional. */
  description?: string;
  gradient: [string, string, string];
  cost: number;
  balance: number;
  /** Spend + unlock (only reachable when balance ≥ cost). */
  onConfirm: () => void;
  /** "Need X more →" — send the user to earn stars. */
  onNeedMore: () => void;
  onClose: () => void;
}

/**
 * Centered theme-unlock card matching `14-settings_themes_1/2.png`: a gradient
 * hero of the theme, the serif name, a COST | BALANCE split, then a contextual
 * action — a gradient "Unlock for N" pill when affordable, or a gold-outline
 * "Need N more →" pill that routes to the Stars tab when not.
 */
export default function ThemeUnlockDialog({
  visible,
  themeName,
  description,
  gradient,
  cost,
  balance,
  onConfirm,
  onNeedMore,
  onClose,
}: ThemeUnlockDialogProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const scale = useSharedValue(0.9);

  useEffect(() => {
    if (visible) {
      scale.value = 0.9;
      scale.value = withTiming(1, { duration: 160 });
    }
  }, [visible, scale]);

  const cardStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const canAfford = balance >= cost;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose} statusBarTranslucent>
      <Pressable style={styles.backdrop} onPress={onClose} accessibilityRole="button">
        <BlurView
          intensity={40}
          tint="dark"
          experimentalBlurMethod="dimezisBlurView"
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />
        <Animated.View style={cardStyle}>
          <Pressable
            style={[styles.card, { backgroundColor: theme.bg2, borderColor: theme.borderStrong }]}
            onPress={() => {}}
          >
            {/* White-5% sheen over bg2 → lifted app-glass (matches GlassCard /
                settings cards), so the card reads as glass, not pure black. */}
            <View
              pointerEvents="none"
              style={[StyleSheet.absoluteFill, { backgroundColor: theme.surface }]}
            />
            {/* Theme-preview hero with a lock badge — signals the locked theme being unlocked. */}
            <View style={styles.heroWrap}>
              <LinearGradient
                colors={gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.hero}
              />
              <View style={styles.heroLock} pointerEvents="none">
                <Feather name="lock" size={rs(18)} color="#FFFFFF" />
              </View>
            </View>

            <Text style={[styles.name, { color: theme.text }]}>{themeName}</Text>

            {description ? (
              <Text style={[styles.desc, { color: theme.textMuted }]} numberOfLines={2}>
                {description}
              </Text>
            ) : null}

            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Text style={[styles.statLabel, { color: theme.textDim }]}>
                  {t('themeGallery.cost').toUpperCase()}
                </Text>
                <View style={styles.statValueRow}>
                  <Text style={[styles.statValue, { color: theme.gold }]}>{cost}</Text>
                  <MaterialCommunityIcons name="star-four-points" size={rs(13)} color={theme.gold} />
                </View>
              </View>

              <View style={[styles.statDivider, { backgroundColor: theme.surfaceBorder }]} />

              <View style={styles.stat}>
                <Text style={[styles.statLabel, { color: theme.textDim }]}>
                  {t('themeGallery.balance').toUpperCase()}
                </Text>
                <View style={styles.statValueRow}>
                  <Text style={[styles.statValue, { color: theme.text }]}>{balance}</Text>
                  <MaterialCommunityIcons name="star-four-points" size={rs(13)} color={theme.text} />
                </View>
              </View>
            </View>

            {canAfford ? (
              <GradientButton
                label={t('themeGallery.unlockForCost', { cost })}
                onPress={onConfirm}
                labelColor={theme.background}
                bold
                glow
                trailingIcon="star-four-points"
                style={styles.cta}
              />
            ) : (
              <TouchableOpacity
                style={[styles.needMore, { backgroundColor: theme.surface, borderColor: theme.gold }]}
                activeOpacity={0.8}
                onPress={onNeedMore}
                accessibilityRole="button"
              >
                <Text style={[styles.needMoreLabel, { color: theme.gold }]}>
                  {t('themeGallery.needMore', { count: cost - balance })}
                </Text>
                <MaterialCommunityIcons name="star-four-points" size={rs(12)} color={theme.gold} />
                <Text style={[styles.needMoreArrow, { color: theme.gold }]}> →</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.cancel, { borderColor: theme.surfaceBorder }]}
              activeOpacity={0.7}
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel={t('common.cancel')}
            >
              <Text style={[styles.cancelLabel, { color: theme.text }]}>{t('common.cancel')}</Text>
            </TouchableOpacity>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(4,5,15,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rs(40),
  },
  card: {
    width: CARD_W,
    borderRadius: rs(20),
    borderWidth: 1,
    overflow: 'hidden',
    paddingHorizontal: rs(20),
    paddingTop: rs(20),
    paddingBottom: rs(20),
  },
  heroWrap: {
    width: HERO_W,
    height: rs(84),
    borderRadius: rs(14),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: { ...StyleSheet.absoluteFillObject },
  heroLock: {
    width: rs(40),
    height: rs(40),
    borderRadius: 999,
    backgroundColor: 'rgba(7,9,26,0.45)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: rs(22),
    fontFamily: 'PlayfairDisplay_600SemiBold',
    textAlign: 'center',
    marginTop: rs(16),
  },
  desc: {
    fontSize: rs(12.5),
    lineHeight: rs(18),
    fontFamily: 'HankenGrotesk_400Regular',
    textAlign: 'center',
    marginTop: rs(6),
    paddingHorizontal: rs(6),
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(14),
  },
  stat: { alignItems: 'center', minWidth: rs(80) },
  statLabel: {
    fontSize: rs(10),
    fontFamily: 'HankenGrotesk_600SemiBold',
    letterSpacing: 1,
    marginBottom: rs(4),
  },
  statValueRow: { flexDirection: 'row', alignItems: 'center', gap: rs(4) },
  statValue: { fontSize: rs(17), fontFamily: 'HankenGrotesk_700Bold' },
  statDivider: { width: 1, height: rs(30), marginHorizontal: rs(14) },
  cta: { marginTop: rs(18) },
  needMore: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: rs(54),
    borderRadius: 999,
    borderWidth: 1,
    marginTop: rs(18),
    gap: rs(3),
  },
  needMoreLabel: { fontSize: rs(15.5), fontFamily: 'HankenGrotesk_700Bold' },
  needMoreArrow: { fontSize: rs(15.5), fontFamily: 'HankenGrotesk_700Bold' },
  cancel: { alignItems: 'center', paddingVertical: rs(10), marginTop: rs(6) },
  cancelLabel: { fontSize: rs(15), fontFamily: 'HankenGrotesk_500Medium' },
});
