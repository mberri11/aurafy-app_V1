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
import { Feather } from '@expo/vector-icons';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { useTheme } from '../themes/ThemeProvider';
import { rs } from '../utils/responsive';

type FeatherName = React.ComponentProps<typeof Feather>['name'];

interface AppDialogProps {
  visible: boolean;
  title: string;
  message?: string;
  confirmLabel: string;
  /** Omit for a single-button info dialog. */
  cancelLabel?: string;
  /** Accent tint — drives icon, eyebrow, bloom and the primary pill's gradient.
   *  Defaults from `destructive` (rose) else cyan. */
  tone?: 'cyan' | 'rose';
  /** Back-compat: irreversible actions → rose tint (when `tone` is not set). */
  destructive?: boolean;
  /** Icon in the badge atop the card (Feather). Defaults per tone. */
  icon?: FeatherName;
  /** Optional uppercase eyebrow above the title. */
  eyebrow?: string;
  onConfirm: () => void;
  /** Cancel button + backdrop dismiss. */
  onClose: () => void;
}

/**
 * Centered cosmic-glass dialog — the System Sheet grammar (tone icon badge, top bloom, serif
 * title, gradient primary pill, glass cancel pill) in a centered card for quick info/errors,
 * matching `ConfirmSheet` (the bottom-sheet variant). Scale-in on open. Replaces `Alert.alert`.
 */
export default function AppDialog({
  visible,
  title,
  message,
  confirmLabel,
  cancelLabel,
  tone,
  destructive,
  icon,
  eyebrow,
  onConfirm,
  onClose,
}: AppDialogProps) {
  const theme = useTheme();
  const scale = useSharedValue(0.9);

  useEffect(() => {
    if (visible) {
      scale.value = 0.9;
      scale.value = withTiming(1, { duration: 160 });
    }
  }, [visible, scale]);

  const cardStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const isRose = (tone ?? (destructive ? 'rose' : 'cyan')) === 'rose';
  const accent = isRose ? theme.rose : '#22D3EE';
  const gradient: readonly [string, string] = isRose
    ? ['#FB7185', theme.rose]
    : ['#22D3EE', '#06B6D4'];
  const primaryLabelColor = isRose ? '#FFFFFF' : '#07091A';
  const iconName: FeatherName = icon ?? (isRose ? 'alert-triangle' : 'info');

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose} statusBarTranslucent>
      <Pressable style={styles.backdrop} onPress={onClose} accessibilityRole="button">
        <Animated.View style={cardStyle}>
          {/* stop propagation so taps on the card don't dismiss */}
          <Pressable
            style={[styles.card, { backgroundColor: theme.bg2, borderColor: theme.borderStrong }]}
            onPress={() => {}}
          >
            {/* glass sheen */}
            <View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: theme.surface }]} />

            {/* tone bloom behind the icon */}
            <Svg pointerEvents="none" style={styles.bloom} width="100%" height="100%">
              <Defs>
                <RadialGradient id="ad_bloom" cx="50%" cy="0%" r="65%">
                  <Stop offset="0%" stopColor={accent} stopOpacity={0.28} />
                  <Stop offset="60%" stopColor={accent} stopOpacity={0.06} />
                  <Stop offset="100%" stopColor={accent} stopOpacity={0} />
                </RadialGradient>
              </Defs>
              <Rect x="0" y="0" width="100%" height="100%" fill="url(#ad_bloom)" />
            </Svg>

            {/* icon badge */}
            <View style={styles.iconWrap}>
              <View style={[styles.iconHalo, { backgroundColor: `${accent}26` }]} pointerEvents="none" />
              <View style={[styles.iconTile, { borderColor: `${accent}80`, backgroundColor: `${accent}1A` }]}>
                <Feather name={iconName} size={rs(22)} color={accent} />
              </View>
            </View>

            {eyebrow ? <Text style={[styles.eyebrow, { color: accent }]}>{eyebrow}</Text> : null}

            <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
            {message ? <Text style={[styles.message, { color: theme.textMuted }]}>{message}</Text> : null}

            <TouchableOpacity
              style={styles.primaryWrap}
              activeOpacity={0.9}
              onPress={onConfirm}
              accessibilityRole="button"
              accessibilityLabel={confirmLabel}
            >
              <LinearGradient colors={gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.primary}>
                <Text style={[styles.primaryLabel, { color: primaryLabelColor }]}>{confirmLabel}</Text>
              </LinearGradient>
            </TouchableOpacity>

            {cancelLabel ? (
              <TouchableOpacity
                style={[styles.cancel, { borderColor: theme.surfaceBorder }]}
                activeOpacity={0.7}
                onPress={onClose}
                accessibilityRole="button"
                accessibilityLabel={cancelLabel}
              >
                <Text style={[styles.cancelLabel, { color: theme.text }]}>{cancelLabel}</Text>
              </TouchableOpacity>
            ) : null}
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(4,5,15,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rs(36),
  },
  card: {
    width: '100%',
    maxWidth: rs(340),
    borderRadius: rs(22),
    borderWidth: 1,
    overflow: 'hidden',
    paddingTop: rs(22),
    paddingHorizontal: rs(22),
    paddingBottom: rs(22),
    alignItems: 'center',
  },
  bloom: { position: 'absolute', top: 0, left: 0, right: 0, height: rs(150) },
  iconWrap: { width: rs(54), height: rs(54), alignItems: 'center', justifyContent: 'center', marginBottom: rs(14) },
  iconHalo: { position: 'absolute', width: rs(72), height: rs(72), borderRadius: rs(24) },
  iconTile: {
    width: rs(54),
    height: rs(54),
    borderRadius: rs(16),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyebrow: {
    fontSize: rs(11),
    fontFamily: 'HankenGrotesk_700Bold',
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    marginBottom: rs(8),
  },
  title: {
    fontSize: rs(21),
    lineHeight: rs(26),
    fontFamily: 'PlayfairDisplay_700Bold',
    textAlign: 'center',
  },
  message: {
    fontSize: rs(14),
    lineHeight: rs(20),
    fontFamily: 'HankenGrotesk_400Regular',
    textAlign: 'center',
    marginTop: rs(8),
  },
  primaryWrap: {
    width: '100%',
    marginTop: rs(20),
    borderRadius: 999,
    overflow: 'hidden',
  },
  primary: {
    height: rs(50),
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryLabel: { fontSize: rs(15), fontFamily: 'HankenGrotesk_700Bold' },
  cancel: {
    width: '100%',
    height: rs(48),
    borderRadius: 999,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(10),
  },
  cancelLabel: { fontSize: rs(15), fontFamily: 'HankenGrotesk_500Medium' },
});
