import React, { memo } from 'react';
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '../themes/ThemeProvider';
import { rs } from '../utils/responsive';

interface GlassCardProps {
  children: React.ReactNode;
  /** OUTER chrome View (border, radius, shadow, size, margins). Children render in a
   *  separate inner wrapper, so flexDirection/gap/alignItems here never reach them —
   *  pass those via `contentStyle` instead. */
  style?: StyleProp<ViewStyle>;
  /** INNER wrapper where `children` actually render — row/gap/padding for the card's
   *  content belong here. The wrapper spans the full card, so absolute children
   *  (accent bars, badges) position against the card's true edges. */
  contentStyle?: StyleProp<ViewStyle>;
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
  contentStyle,
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
        style,
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

      {/* Android: BlurView is a no-op in Expo Go (renders nothing over bg2) yet is an
          expensive native view to mount/re-composite — the main reason Home repaints
          late when a module is popped. So in **dev** (`__DEV__`, Expo Go) we SKIP it:
          the opaque bg2 + this surface tint already produce the exact glass look there.
          In a **release/native build** we mount the real BlurView for live blur. */}
      {isAndroid ? (
        <>
          {!__DEV__ ? (
            <BlurView intensity={blurIntensity} tint="dark" style={StyleSheet.absoluteFill} />
          ) : null}
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

      <View style={[styles.content, contentStyle]}>{children}</View>
    </View>
  );
});

export default GlassCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: rs(20),
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
