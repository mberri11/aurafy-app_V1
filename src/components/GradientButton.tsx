import React, { memo, useCallback } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import { AppText as Text } from '@/src/components/AppText';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../themes/ThemeProvider';
import { lightTap } from '../utils/haptics';
import { rs } from '../utils/responsive';

interface GradientButtonProps {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  variant?: 'primary' | 'outline';
  disabled?: boolean;
  loading?: boolean;
  /** Override the primary label color (design uses dark text on the bright gradient). */
  labelColor?: string;
  /** Use a heavier 700 label (some CTAs read bold on the bright gradient). */
  bold?: boolean;
  /** Soft accent halo around the pill (the "light" under the CTA in the design). */
  glow?: boolean;
  /** MaterialCommunityIcons glyph rendered after the label, in the label colour. */
  trailingIcon?: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  /** MaterialCommunityIcons glyph rendered before the label, in the label colour. */
  leadingIcon?: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  /** Override the fill gradient (defaults to the 3-color brand `theme.gradient`).
   *  Used by category-themed CTAs (e.g. the result Share pill in the category accent). */
  colors?: readonly [string, string, ...string[]];
  /** Override the glow halo colour (defaults to the brand cyan `#22D3EE`). */
  glowColor?: string;
}

const GradientButton = memo(function GradientButton({
  label,
  onPress,
  style,
  variant = 'primary',
  disabled = false,
  loading = false,
  labelColor,
  bold = false,
  glow = false,
  trailingIcon,
  leadingIcon,
  colors,
  glowColor,
}: GradientButtonProps) {
  const theme = useTheme();
  const fill = colors ?? theme.gradient;

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
          colors={fill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.outlineGradientBorder}
        >
          <View style={[styles.outlineInner, { backgroundColor: theme.background }]}>
            <Text style={[styles.label, bold && styles.labelBold, { color: theme.text }]}>{label}</Text>
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
        colors={fill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          styles.gradient,
          // Soft accent halo (default: the design's teal glow). Lives on the opaque,
          // rounded gradient — not the wrapper — so Android casts a clean coloured
          // shadow instead of a clipped black drop.
          glow && !disabled && {
            shadowColor: glowColor ?? '#22D3EE',
            shadowOpacity: 0.55,
            shadowRadius: rs(16),
            shadowOffset: { width: 0, height: 0 },
            elevation: 8,
          },
        ]}
      >
        {loading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <View style={styles.labelRow}>
            {leadingIcon ? (
              <MaterialCommunityIcons
                name={leadingIcon}
                size={rs(16)}
                color={labelColor ?? '#FFFFFF'}
                style={styles.leadingIcon}
              />
            ) : null}
            <Text style={[styles.label, bold && styles.labelBold, labelColor ? { color: labelColor } : null]}>{label}</Text>
            {trailingIcon ? (
              <MaterialCommunityIcons
                name={trailingIcon}
                size={rs(16)}
                color={labelColor ?? '#FFFFFF'}
                style={styles.trailingIcon}
              />
            ) : null}
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
});

export default GradientButton;

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 999,
    minHeight: rs(56),
  },
  gradient: {
    height: rs(56),
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rs(24),
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trailingIcon: { marginStart: rs(6) },
  leadingIcon: { marginEnd: rs(8) },
  label: {
    fontSize: rs(16),
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'HankenGrotesk_600SemiBold',
  },
  labelBold: {
    fontWeight: '700',
    fontFamily: 'HankenGrotesk_700Bold',
  },
  disabled: {
    opacity: 0.4,
  },
  outlineWrapper: {
    borderRadius: 999,
    overflow: 'hidden',
    minHeight: rs(56),
  },
  outlineGradientBorder: {
    padding: 2,
    borderRadius: 999,
  },
  outlineInner: {
    height: rs(52),
    borderRadius: 997,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rs(24),
  },
});
