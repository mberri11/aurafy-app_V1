import React, { memo, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../themes/ThemeProvider';
import { lightTap } from '../utils/haptics';

interface GradientButtonProps {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  variant?: 'primary' | 'outline';
  disabled?: boolean;
  loading?: boolean;
}

const GradientButton = memo(function GradientButton({
  label,
  onPress,
  style,
  variant = 'primary',
  disabled = false,
  loading = false,
}: GradientButtonProps) {
  const theme = useTheme();

  const handlePress = useCallback(() => {
    lightTap();
    onPress();
  }, [onPress]);

  if (variant === 'outline') {
    return (
      <TouchableOpacity
        onPress={handlePress}
        disabled={disabled || loading}
        accessibilityLabel={label}
        accessibilityRole="button"
        style={[styles.outlineWrapper, disabled && styles.disabled, style]}
        activeOpacity={0.75}
      >
        <LinearGradient
          colors={theme.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.outlineGradientBorder}
        >
          <View style={[styles.outlineInner, { backgroundColor: theme.background }]}>
            <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled || loading}
      accessibilityLabel={label}
      accessibilityRole="button"
      style={[styles.wrapper, disabled && styles.disabled, style]}
      activeOpacity={0.85}
    >
      <LinearGradient
        colors={theme.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        {loading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.label}>{label}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
});

export default GradientButton;

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 999,
    overflow: 'hidden',
    minHeight: 56,
  },
  gradient: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Inter_600SemiBold',
  },
  disabled: {
    opacity: 0.4,
  },
  outlineWrapper: {
    borderRadius: 999,
    overflow: 'hidden',
    minHeight: 56,
  },
  outlineGradientBorder: {
    padding: 2,
    borderRadius: 999,
  },
  outlineInner: {
    height: 52,
    borderRadius: 997,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
});
