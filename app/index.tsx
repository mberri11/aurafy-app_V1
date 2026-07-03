import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { useUserStore } from '@/src/store/userStore';
import { useTheme } from '@/src/themes/ThemeProvider';
import AurafyLogo from '@/src/components/AurafyLogo';
import { rs } from '@/src/utils/responsive';
import '../src/i18n'; // initialize i18n

export default function SplashScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const hasOnboarded = useUserStore((s) => s.hasOnboarded);
  const navigated = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (navigated.current) return;
      navigated.current = true;
      router.replace(hasOnboarded ? '/(tabs)' : '/onboarding');
    }, 5000);
    return () => clearTimeout(timer);
  }, [hasOnboarded]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Base navy: bg2 hint in top-left fading to background. */}
      <LinearGradient
        colors={[theme.bg2, theme.background, theme.background]}
        locations={[0, 0.55, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {/* Soft indigo radial glow centered on logo — diffuse, not a spotlight. */}
      <Svg
        width="100%"
        height="100%"
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      >
        <Defs>
          <RadialGradient id="splash_glow" cx="50%" cy="47%" r="55%">
            <Stop offset="0%"   stopColor="#4338CA" stopOpacity="0.26" />
            <Stop offset="50%"  stopColor="#3730A3" stopOpacity="0.10" />
            <Stop offset="100%" stopColor="#07091A" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#splash_glow)" />
      </Svg>
      {/* Upper purple aurora — top-left haze visible in design. */}
      <LinearGradient
        colors={[`${theme.primary}28`, `${theme.primary}08`, 'transparent']}
        locations={[0, 0.35, 0.6]}
        start={{ x: 0.3, y: 0 }}
        end={{ x: 0.6, y: 0.55 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      {/* Bottom teal aurora glow — matches design reference. */}
      <LinearGradient
        colors={['transparent', `${theme.gradient[2]}14`]}
        start={{ x: 0.5, y: 0.5 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />

      <View style={styles.center}>
        <View style={styles.logoWrap}>
          <AurafyLogo size={rs(116)} />
        </View>
        <Text style={[styles.wordmark, { color: theme.text }]}>Aurafy</Text>
        <Text style={[styles.tagline, { color: theme.textMuted }]}>
          Decode the energy around you
        </Text>
      </View>

      <Text
        style={[
          styles.footer,
          { color: theme.textDim, paddingBottom: insets.bottom + rs(32) },
        ]}
      >
        LOADING THE STARS
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'space-between' },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: rs(12),
    paddingTop: rs(40),
  },
  logoWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  wordmark: {
    fontSize: rs(44),
    fontFamily: 'PlayfairDisplay_700Bold',
    marginTop: rs(-22),
    letterSpacing: -0.4,
  },
  tagline: {
    fontSize: rs(13),
    fontFamily: 'HankenGrotesk_400Regular',
    letterSpacing: 0.1,
  },
  footer: {
    fontSize: rs(11),
    fontFamily: 'HankenGrotesk_600SemiBold',
    letterSpacing: 3,
    textAlign: 'center',
  },
});
