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
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../themes/ThemeProvider';
import { rs } from '../utils/responsive';

export interface PickerOption {
  value: string;
  label: string;
}

interface PickerSheetProps {
  visible: boolean;
  title: string;
  options: PickerOption[];
  selected: string;
  onSelect: (value: string) => void;
  onClose: () => void;
}

/**
 * Themed bottom-sheet picker matching the cosmic glass vibe — replaces the
 * stock white `Alert.alert` option list. Dark `bg2` sheet, brand-gradient hairline
 * along the top edge, cyan check on the active row.
 */
export default function PickerSheet({
  visible,
  title,
  options,
  selected,
  onSelect,
  onClose,
}: PickerSheetProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable style={styles.backdrop} onPress={onClose} accessibilityRole="button">
        {/* Sheet — stop propagation so taps inside don't dismiss */}
        <Pressable
          style={[
            styles.sheet,
            {
              backgroundColor: theme.bg2,
              borderColor: theme.borderStrong,
              paddingBottom: insets.bottom + rs(12),
            },
          ]}
          onPress={() => {}}
        >
          {/* Brand-gradient hairline across the top edge */}
          <LinearGradient
            colors={theme.gradient}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.accentLine}
          />

          <View style={[styles.grabber, { backgroundColor: theme.surfaceBorder }]} />

          <Text style={[styles.title, { color: theme.text }]}>{title}</Text>

          <View style={styles.list}>
            {options.map((opt, i) => {
              const active = opt.value === selected;
              return (
                <React.Fragment key={opt.value}>
                  <TouchableOpacity
                    style={styles.option}
                    activeOpacity={0.7}
                    onPress={() => {
                      onSelect(opt.value);
                      onClose();
                    }}
                    accessibilityRole="button"
                    accessibilityState={{ selected: active }}
                    accessibilityLabel={opt.label}
                  >
                    <Text
                      style={[
                        styles.optionLabel,
                        {
                          color: active ? theme.gradient[0] : theme.text,
                          fontFamily: active ? 'HankenGrotesk_600SemiBold' : 'HankenGrotesk_500Medium',
                        },
                      ]}
                    >
                      {opt.label}
                    </Text>
                    {active ? (
                      <Feather name="check" size={rs(18)} color={theme.gradient[0]} />
                    ) : null}
                  </TouchableOpacity>
                  {i < options.length - 1 ? (
                    <View style={[styles.divider, { backgroundColor: theme.surfaceBorder }]} />
                  ) : null}
                </React.Fragment>
              );
            })}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(4,5,15,0.6)',
    justifyContent: 'flex-end',
  },
  sheet: {
    borderTopLeftRadius: rs(24),
    borderTopRightRadius: rs(24),
    borderWidth: 1,
    borderBottomWidth: 0,
    paddingTop: rs(10),
    overflow: 'hidden',
  },
  accentLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: rs(2),
  },
  grabber: {
    alignSelf: 'center',
    width: rs(40),
    height: rs(4.5),
    borderRadius: rs(3),
    marginBottom: rs(14),
  },
  title: {
    fontSize: rs(16),
    fontFamily: 'HankenGrotesk_600SemiBold',
    paddingHorizontal: rs(20),
    marginBottom: rs(6),
  },
  list: { paddingHorizontal: rs(8) },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rs(12),
    paddingVertical: rs(15),
    minHeight: rs(52),
  },
  optionLabel: { fontSize: rs(15.5) },
  divider: { height: 1, marginHorizontal: rs(12) },
});
