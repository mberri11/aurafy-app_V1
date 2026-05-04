import React, { memo } from 'react';
import { Platform, StyleSheet, View, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '../themes/ThemeProvider';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  glowColor?: string;
  intensity?: 'low' | 'medium' | 'high';
}

const intensityMap = { low: 12, medium: 30, high: 60 };

/**
 * Glass surface used everywhere in the app. Matches the design's
 * `--glass / --glass-strong` tokens with a 1px border + soft shadow glow.
 *
 * Implementation by platform:
 *   • iOS  — native BlurView with dark tint + theme.surface fill on top.
 *   • Android — BlurView (best-effort in Expo Go; native build only) plus a
 *     stronger semi-opaque dark tint so the card still reads as "raised"
 *     even when the underlying blur isn't supported.
 *   • Web  — skip BlurView, use a plain dark surface fill.
 */
const GlassCard = memo(function GlassCard({
  children,
  style,
  glowColor,
  intensity = 'medium',
}: GlassCardProps) {
  const theme = useTheme();
  const glow = glowColor ?? theme.glow;
  const blurIntensity = intensityMap[intensity];

  const isIOS = Platform.OS === 'ios';
  const isWeb = Platform.OS === 'web';
  const isAndroid = Platform.OS === 'android';

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: theme.surfaceBorder,
          shadowColor: glow,
        },
        // On Android/web, a flat surface color replaces the unreliable blur.
        // On iOS, leave it transparent so BlurView shows through.
        !isIOS && { backgroundColor: theme.bg2 },
        style as ViewStyle,
      ]}
    >
      {isIOS ? (
        <>
          <BlurView intensity={blurIntensity} tint="dark" style={StyleSheet.absoluteFill} />
          <View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: theme.surface, borderRadius: 20 },
            ]}
          />
        </>
      ) : null}

      {/* Android: try the BlurView (Expo SDK 54+ supports it on native builds);
          if it no-ops in Expo Go the bg2 fill above already provides the glassy look. */}
      {isAndroid ? (
        <>
          <BlurView intensity={blurIntensity} tint="dark" style={StyleSheet.absoluteFill} />
          <View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: theme.surface, borderRadius: 20 },
            ]}
          />
        </>
      ) : null}

      {/* Web fallback — just the surface color (already applied via bg2 above) */}
      {isWeb ? null : null}

      <View style={styles.content}>{children}</View>
    </View>
  );
});

export default GlassCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 6,
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
});
