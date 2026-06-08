import React from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../themes/ThemeProvider';
import { rs } from '../utils/responsive';

interface ConfirmSheetProps {
  visible: boolean;
  title: string;
  message?: string;
  confirmLabel: string;
  /** Primary action tint — cyan for a normal confirm, rose for a hard reset. */
  tone?: 'cyan' | 'rose';
  /** Omit for a single-button info sheet (no Cancel). */
  cancelLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
}

/**
 * Bottom-sheet confirmation matching the design's data-action dialogs
 * (`14-settings_clear.png` / `14-settings_reset.png`): cosmic-glass sheet, a
 * serif title, centred body, a full-width solid primary pill (cyan or rose)
 * and a full-width glass Cancel pill. Replaces the stock `Alert.alert`.
 *
 * Backdrop is an absolute sibling `Pressable` (not a wrapping one) so the sheet
 * body never sits under a Pressable that could swallow touches.
 */
export default function ConfirmSheet({
  visible,
  title,
  message,
  confirmLabel,
  tone = 'cyan',
  cancelLabel,
  onConfirm,
  onClose,
}: ConfirmSheetProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  // Design fills: Clear = cyan #06B6D4 (cooler than the brand gradient's #22D3EE),
  // Reset = rose (matches theme.rose exactly).
  const primaryBg = tone === 'rose' ? theme.rose : '#06B6D4';

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose} statusBarTranslucent>
      <View style={styles.container}>
        <Pressable style={styles.backdrop} onPress={onClose} accessibilityRole="button" />
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
          {/* White-5% sheen over bg2 → lifted app-glass (matches GlassCard /
              ThemeUnlockDialog), so the sheet reads as glass, not pure black. */}
          <View
            pointerEvents="none"
            style={[StyleSheet.absoluteFill, { backgroundColor: theme.surface }]}
          />

          <View style={[styles.grabber, { backgroundColor: theme.surfaceBorder }]} />

          <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
          {message ? <Text style={[styles.message, { color: theme.textMuted }]}>{message}</Text> : null}

          <TouchableOpacity
            style={[styles.primary, { backgroundColor: primaryBg }]}
            activeOpacity={0.85}
            onPress={onConfirm}
            accessibilityRole="button"
            accessibilityLabel={confirmLabel}
          >
            <Text style={styles.primaryLabel}>{confirmLabel}</Text>
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
  },
  grabber: {
    alignSelf: 'center',
    width: rs(40),
    height: rs(4.5),
    borderRadius: rs(3),
    marginBottom: rs(18),
  },
  title: {
    fontSize: rs(20),
    fontFamily: 'PlayfairDisplay_600SemiBold',
    textAlign: 'center',
  },
  message: {
    fontSize: rs(14),
    lineHeight: rs(20),
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    marginTop: rs(8),
    paddingHorizontal: rs(8),
  },
  primary: {
    height: rs(48),
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(20),
  },
  primaryLabel: {
    fontSize: rs(15),
    fontFamily: 'Inter_700Bold',
    color: '#07091A',
  },
  cancel: {
    height: rs(46),
    borderRadius: 999,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(10),
  },
  cancelLabel: { fontSize: rs(15), fontFamily: 'Inter_500Medium' },
});
