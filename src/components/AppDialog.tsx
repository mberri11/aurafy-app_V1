import React, { useEffect } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../themes/ThemeProvider';
import { rs } from '../utils/responsive';

interface AppDialogProps {
  visible: boolean;
  title: string;
  message?: string;
  confirmLabel: string;
  /** Omit for a single-button info dialog. */
  cancelLabel?: string;
  /** Tints the confirm action rose for irreversible actions. */
  destructive?: boolean;
  onConfirm: () => void;
  /** Cancel button + backdrop dismiss. */
  onClose: () => void;
}

/**
 * Themed centered dialog — the cosmic-glass replacement for the stock white
 * `Alert.alert`. Dark `bg2` card, brand-gradient hairline along the top edge,
 * scale-in on open. Two buttons (cancel + confirm) when `cancelLabel` is given,
 * otherwise a single OK-style confirm.
 */
export default function AppDialog({
  visible,
  title,
  message,
  confirmLabel,
  cancelLabel,
  destructive,
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
  const confirmColor = destructive ? theme.rose : theme.gradient[0];

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose} statusBarTranslucent>
      <Pressable style={styles.backdrop} onPress={onClose} accessibilityRole="button">
        <Animated.View style={cardStyle}>
          {/* stop propagation so taps on the card don't dismiss */}
          <Pressable
            style={[styles.card, { backgroundColor: theme.bg2, borderColor: theme.borderStrong }]}
            onPress={() => {}}
          >
            <LinearGradient
              colors={theme.gradient}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.accentLine}
            />

            <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
            {message ? <Text style={[styles.message, { color: theme.textMuted }]}>{message}</Text> : null}

            <View style={styles.actions}>
              {cancelLabel ? (
                <TouchableOpacity
                  style={styles.btn}
                  activeOpacity={0.7}
                  onPress={onClose}
                  accessibilityRole="button"
                  accessibilityLabel={cancelLabel}
                >
                  <Text style={[styles.btnLabel, { color: theme.textMuted }]}>{cancelLabel}</Text>
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.7}
                onPress={onConfirm}
                accessibilityRole="button"
                accessibilityLabel={confirmLabel}
              >
                <Text style={[styles.btnLabel, styles.btnConfirm, { color: confirmColor }]}>
                  {confirmLabel}
                </Text>
              </TouchableOpacity>
            </View>
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
    maxWidth: rs(360),
    borderRadius: rs(20),
    borderWidth: 1,
    overflow: 'hidden',
    paddingTop: rs(22),
    paddingHorizontal: rs(22),
    paddingBottom: rs(12),
  },
  accentLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: rs(2),
  },
  title: {
    fontSize: rs(19),
    fontFamily: 'PlayfairDisplay_600SemiBold',
    marginBottom: rs(8),
  },
  message: {
    fontSize: rs(14.5),
    lineHeight: rs(21),
    fontFamily: 'Inter_400Regular',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: rs(18),
    gap: rs(8),
  },
  btn: {
    paddingVertical: rs(8),
    paddingHorizontal: rs(14),
    borderRadius: rs(10),
  },
  btnLabel: { fontSize: rs(15), fontFamily: 'Inter_500Medium' },
  btnConfirm: { fontFamily: 'Inter_700Bold', letterSpacing: 0.3 },
});
