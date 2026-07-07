import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppText as Text } from '@/src/components/AppText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { useTheme } from '../themes/ThemeProvider';
import { rs } from '../utils/responsive';

/** Feather icon name — shared so call sites (settings) can type their sheet config. */
export type ConfirmSheetIcon = React.ComponentProps<typeof Feather>['name'];

interface ConfirmSheetProps {
  visible: boolean;
  title: string;
  message?: string;
  confirmLabel: string;
  /** Primary action tint — cyan for a normal/safe confirm, rose for a hard/destructive one.
   *  Drives the icon, eyebrow, top bloom and the primary pill's gradient. */
  tone?: 'cyan' | 'rose';
  /** Omit for a single-button info sheet (no Cancel). */
  cancelLabel?: string;
  /** Icon in the badge atop the sheet (Feather). Defaults per tone (rose→alert, cyan→trash). */
  icon?: ConfirmSheetIcon;
  /** Optional uppercase eyebrow above the title (e.g. "Cannot be undone"). */
  eyebrow?: string;
  /** When false, tapping the dimmed backdrop does NOT dismiss — the user must pick an
   *  explicit action (Confirm/Cancel). Use for consequential prompts (restart, reset,
   *  clear) so they can't be skipped by an accidental tap-outside. Default: true. */
  dismissOnBackdrop?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

/**
 * "System Sheet" — the cosmic-glass confirmation bottom-sheet matching
 * `Screenshots_new/Reset_all_Data.png` + `Clear_history.png`: a tone-tinted icon badge over a
 * top bloom, an optional eyebrow, a serif title, centred body, a full-width **gradient** primary
 * pill (rose→white label / cyan→dark label) and a full-width glass Cancel pill. Replaces the
 * stock `Alert.alert`.
 *
 * Backdrop is an absolute sibling `Pressable` (not a wrapping one) so the sheet body never sits
 * under a Pressable that could swallow touches.
 */
export default function ConfirmSheet({
  visible,
  title,
  message,
  confirmLabel,
  tone = 'cyan',
  cancelLabel,
  icon,
  eyebrow,
  dismissOnBackdrop = true,
  onConfirm,
  onClose,
}: ConfirmSheetProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const isRose = tone === 'rose';
  // Rose = destructive (icon/eyebrow/bloom in theme.rose, white pill label). Cyan = safe
  // (bright cyan, dark pill label — matches the Clear-history PNG).
  const accent = isRose ? theme.rose : '#22D3EE';
  const gradient: readonly [string, string] = isRose
    ? ['#FB7185', theme.rose]
    : ['#22D3EE', '#06B6D4'];
  const primaryLabelColor = isRose ? '#FFFFFF' : theme.background;
  const iconName: ConfirmSheetIcon = icon ?? (isRose ? 'alert-triangle' : 'trash-2');

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose} statusBarTranslucent>
      <View style={styles.container}>
        {/* Backdrop still absorbs the touch (so it can't fall through to the screen), but
            only dismisses when allowed — protected sheets require an explicit choice. */}
        <Pressable
          style={styles.backdrop}
          onPress={dismissOnBackdrop ? onClose : undefined}
          accessibilityRole={dismissOnBackdrop ? 'button' : 'none'}
        />
        <View
          style={[
            styles.sheet,
            {
              backgroundColor: theme.bg2,
              borderColor: theme.borderStrong,
              paddingBottom: insets.bottom + rs(24),
            },
          ]}
        >
          {/* White-5% sheen over bg2 → lifted app-glass (matches GlassCard), so the sheet reads
              as glass, not pure black. */}
          <View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: theme.surface }]} />

          {/* Tone-tinted bloom rising from behind the icon (rose / cyan). */}
          <Svg pointerEvents="none" style={styles.bloom} width="100%" height="100%">
            <Defs>
              <RadialGradient id="cs_bloom" cx="50%" cy="0%" r="62%">
                <Stop offset="0%" stopColor={accent} stopOpacity={0.3} />
                <Stop offset="55%" stopColor={accent} stopOpacity={0.07} />
                <Stop offset="100%" stopColor={accent} stopOpacity={0} />
              </RadialGradient>
            </Defs>
            <Rect x="0" y="0" width="100%" height="100%" fill="url(#cs_bloom)" />
          </Svg>

          <View style={[styles.grabber, { backgroundColor: theme.surfaceBorder }]} />

          {/* Icon badge — glass tile + tone glow halo. */}
          <View style={styles.iconWrap}>
            <View style={[styles.iconHalo, { backgroundColor: `${accent}26` }]} pointerEvents="none" />
            <View style={[styles.iconTile, { borderColor: `${accent}80`, backgroundColor: `${accent}1A` }]}>
              <Feather name={iconName} size={rs(24)} color={accent} />
            </View>
          </View>

          {eyebrow ? <Text style={[styles.eyebrow, { color: accent }]}>{eyebrow}</Text> : null}

          <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
          {message ? <Text style={[styles.message, { color: theme.textMuted }]}>{message}</Text> : null}

          {/* Primary — tone gradient pill. */}
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
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-end' },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(4,5,15,0.6)',
  },
  sheet: {
    borderTopLeftRadius: rs(24),
    borderTopRightRadius: rs(24),
    borderWidth: 1,
    borderBottomWidth: 0,
    paddingTop: rs(10),
    paddingHorizontal: rs(20),
    overflow: 'hidden',
    alignItems: 'center',
  },
  bloom: { position: 'absolute', top: 0, left: 0, right: 0, height: rs(190) },
  grabber: {
    width: rs(40),
    height: rs(4.5),
    borderRadius: rs(3),
    marginBottom: rs(20),
  },
  iconWrap: { width: rs(56), height: rs(56), alignItems: 'center', justifyContent: 'center', marginBottom: rs(14) },
  iconHalo: { position: 'absolute', width: rs(74), height: rs(74), borderRadius: rs(24) },
  iconTile: {
    width: rs(56),
    height: rs(56),
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
    fontSize: rs(25),
    lineHeight: rs(30),
    fontFamily: 'PlayfairDisplay_700Bold',
    textAlign: 'center',
  },
  message: {
    fontSize: rs(14),
    lineHeight: rs(20),
    fontFamily: 'HankenGrotesk_400Regular',
    textAlign: 'center',
    marginTop: rs(8),
    paddingHorizontal: rs(8),
  },
  primaryWrap: {
    width: '100%',
    marginTop: rs(22),
    borderRadius: 999,
    overflow: 'hidden',
  },
  primary: {
    height: rs(52),
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryLabel: { fontSize: rs(15.5), fontFamily: 'HankenGrotesk_700Bold' },
  cancel: {
    width: '100%',
    height: rs(50),
    borderRadius: 999,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(10),
  },
  cancelLabel: { fontSize: rs(15), fontFamily: 'HankenGrotesk_500Medium' },
});
