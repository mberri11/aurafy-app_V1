import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUserStore } from '@/src/store/userStore';
import { useTheme } from '@/src/themes/ThemeProvider';
import AurafyLogo from '@/src/components/AurafyLogo';
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
    }, 2000);
    return () => clearTimeout(timer);
  }, [hasOnboarded]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Vertical bg-2 wash to subtly lift the upper half of the screen */}
      <LinearGradient
        colors={[theme.background, theme.bg2, theme.background]}
        locations={[0, 0.45, 1]}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.center}>
        <AurafyLogo size={140} />
        <Text style={[styles.wordmark, { color: theme.text }]}>Aurafy</Text>
        <Text style={[styles.tagline, { color: theme.textMuted }]}>
          Decode the energy around you
        </Text>
      </View>

      <Text
        style={[
          styles.footer,
          { color: theme.textDim, paddingBottom: insets.bottom + 32 },
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
    gap: 18,
    paddingTop: 40,
  },
  wordmark: {
    fontSize: 56,
    fontFamily: 'Fraunces_400Regular',
    marginTop: -8,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    letterSpacing: 0.1,
  },
  footer: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 3,
    textAlign: 'center',
  },
});
