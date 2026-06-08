import React, { memo, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '../themes/ThemeProvider';
import { useSettingsStore } from '../store/settingsStore';
import AurafyLogo from './AurafyLogo';

/**
 * Cosmic Aurafy-atom reveal / loader. One component, two modes:
 *
 *  • `reveal`  — plays the bloom once, holds a beat, then gently scales up and
 *    dissolves (a soft "zoom into the app") and calls `onDone`. Used for the
 *    onboarding → home entry (`app/enter.tsx`).
 *  • `loading` — blooms in then loops a slow orbit + halo pulse forever, with no
 *    wordmark and no auto-exit. Used on genuine waits (`app/loading.tsx`).
 *
 * Everything runs on the Reanimated UI thread. Honors the "Background animations"
 * setting — when off, it shows a static atom (and `reveal` still fires `onDone`).
 */

const ORBIT_SIZE = 260;
const ORBIT_RADIUS = 116;
const DOT_COUNT = 8;

// Reveal-mode timeline (ms): bloom + orbit settle by ~1.2s, hold a beat, then a
// ~450ms dissolve (the whole overlay scales up + fades) reveals Home beneath.
const DISSOLVE_AT = 1250;
const DISSOLVE_DUR = 450;
const NAVIGATE_AT = DISSOLVE_AT + DISSOLVE_DUR + 40; // 1740
const REDUCED_TOTAL = 280;

type DotSpec = { x: number; y: number; color: string; size: number; delay: number };

function buildDots(colors: string[]): DotSpec[] {
  const dots: DotSpec[] = [];
  for (let i = 0; i < DOT_COUNT; i++) {
    const angle = (i * 360) / DOT_COUNT - 90;
    const rad = (angle * Math.PI) / 180;
    // alternate the radius slightly so the ring feels less mechanical
    const r = ORBIT_RADIUS - (i % 2 === 0 ? 0 : 14);
    dots.push({
      x: r * Math.cos(rad),
      y: r * Math.sin(rad),
      color: colors[i % colors.length],
      size: i % 3 === 0 ? 8 : i % 3 === 1 ? 5 : 3.5,
      delay: i * 150,
    });
  }
  return dots;
}

const StardustDot = memo(function StardustDot({
  x,
  y,
  color,
  size,
  delay,
  enabled,
}: DotSpec & { enabled: boolean }) {
  const twinkle = useSharedValue(enabled ? 0.25 : 0.8);

  useEffect(() => {
    if (!enabled) return;
    twinkle.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 700, easing: Easing.inOut(Easing.ease) }),
          withTiming(0.3, { duration: 900, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        false,
      ),
    );
  }, [twinkle, delay, enabled]);

  const style = useAnimatedStyle(() => ({ opacity: twinkle.value }));

  return (
    <Animated.View
      style={[
        styles.dot,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          shadowColor: color,
          left: ORBIT_SIZE / 2 + x - size / 2,
          top: ORBIT_SIZE / 2 + y - size / 2,
        },
        style,
      ]}
    />
  );
});

interface CosmicRevealProps {
  mode: 'reveal' | 'loading';
  /** Called when a `reveal` finishes its dissolve. Ignored in `loading` mode. */
  onDone?: () => void;
  /** Show the rising "Aurafy" wordmark (reveal entry). Default true. */
  showWordmark?: boolean;
}

const CosmicReveal = memo(function CosmicReveal({
  mode,
  onDone,
  showWordmark = true,
}: CosmicRevealProps) {
  const theme = useTheme();
  const animationsEnabled = useSettingsStore((s) => s.animationsEnabled);
  const isReveal = mode === 'reveal';
  const wantWordmark = isReveal && showWordmark;

  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;
  const fired = useRef(false);

  const logoScale = useSharedValue(animationsEnabled ? 0.62 : 1);
  const logoOpacity = useSharedValue(animationsEnabled ? 0 : 1);
  const haloScale = useSharedValue(animationsEnabled ? 0.7 : 1.1);
  const haloOpacity = useSharedValue(animationsEnabled ? 0 : 0.9);
  const orbitSpin = useSharedValue(0);
  const orbitOpacity = useSharedValue(animationsEnabled ? 0 : 1);
  const wordmark = useSharedValue(animationsEnabled && wantWordmark ? 0 : 1);
  // Reveal exit dissolve (no-op in loading mode).
  const contentScale = useSharedValue(1);
  const contentOpacity = useSharedValue(1);

  useEffect(() => {
    const go = () => {
      if (fired.current) return;
      fired.current = true;
      onDoneRef.current?.();
    };

    if (!animationsEnabled) {
      if (isReveal) {
        const t = setTimeout(go, REDUCED_TOTAL);
        return () => clearTimeout(t);
      }
      return;
    }

    // ── Entrance (both modes) ──────────────────────────────────────────────
    logoOpacity.value = withTiming(1, { duration: 520, easing: Easing.out(Easing.cubic) });
    logoScale.value = withSequence(
      withTiming(1.04, { duration: 640, easing: Easing.out(Easing.cubic) }),
      withTiming(1, { duration: 360, easing: Easing.inOut(Easing.ease) }),
    );
    haloOpacity.value = withTiming(0.9, { duration: 700, easing: Easing.out(Easing.ease) });
    orbitOpacity.value = withDelay(180, withTiming(1, { duration: 700 }));
    orbitSpin.value = withRepeat(
      withTiming(360, { duration: 7000, easing: Easing.linear }),
      -1,
      false,
    );

    if (wantWordmark) {
      wordmark.value = withDelay(
        420,
        withTiming(1, { duration: 560, easing: Easing.out(Easing.cubic) }),
      );
    }

    if (isReveal) {
      haloScale.value = withTiming(1.2, { duration: 1200, easing: Easing.out(Easing.cubic) });
      // Hold the bloom, then dissolve + zoom slightly as we hand off to Home.
      contentScale.value = withDelay(
        DISSOLVE_AT,
        withTiming(1.08, { duration: DISSOLVE_DUR, easing: Easing.out(Easing.cubic) }),
      );
      contentOpacity.value = withDelay(
        DISSOLVE_AT,
        withTiming(0, { duration: DISSOLVE_DUR, easing: Easing.in(Easing.ease) }),
      );
      const t = setTimeout(go, NAVIGATE_AT);
      return () => clearTimeout(t);
    }

    // Loading: keep the bloom alive with a slow halo pulse (orbit already loops).
    haloScale.value = withSequence(
      withTiming(1.12, { duration: 900, easing: Easing.out(Easing.cubic) }),
      withRepeat(
        withSequence(
          withTiming(0.98, { duration: 1300, easing: Easing.inOut(Easing.ease) }),
          withTiming(1.12, { duration: 1300, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        true,
      ),
    );
  }, [
    animationsEnabled,
    isReveal,
    wantWordmark,
    logoScale,
    logoOpacity,
    haloScale,
    haloOpacity,
    orbitSpin,
    orbitOpacity,
    wordmark,
    contentScale,
    contentOpacity,
  ]);

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{ scale: contentScale.value }],
  }));
  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));
  const haloStyle = useAnimatedStyle(() => ({
    opacity: haloOpacity.value,
    transform: [{ scale: haloScale.value }],
  }));
  const orbitStyle = useAnimatedStyle(() => ({
    opacity: orbitOpacity.value,
    transform: [{ rotate: `${orbitSpin.value}deg` }],
  }));
  const wordmarkStyle = useAnimatedStyle(() => ({
    opacity: wordmark.value,
    transform: [{ translateY: (1 - wordmark.value) * 14 }],
  }));

  const dots = buildDots([
    theme.gradient[0],
    theme.gradient[1],
    theme.gradient[2],
    theme.gold,
    theme.primary,
    theme.gradient[1],
    theme.gradient[2],
    theme.gold,
  ]);

  return (
    <Animated.View
      style={[isReveal ? styles.fill : styles.block, contentStyle]}
      // As a reveal overlay it sits on top of Home and should swallow taps while
      // it plays; as a loader it must never intercept touches.
      pointerEvents={isReveal ? 'auto' : 'none'}
    >
      {/* Reveal carries its own opaque navy field so Home (mounted beneath) is
          hidden during the bloom, then revealed as this whole overlay dissolves. */}
      {isReveal ? (
        <>
          <LinearGradient
            colors={[theme.bg2, theme.background, theme.background]}
            locations={[0, 0.55, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <LinearGradient
            colors={[`${theme.primary}22`, 'transparent', `${theme.gradient[2]}12`]}
            locations={[0, 0.5, 1]}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 0.8, y: 1 }}
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
          />
        </>
      ) : null}

      <View style={styles.center}>
        {/* Swelling radial glow behind the mark. */}
        <Animated.View style={[styles.halo, haloStyle]} pointerEvents="none">
          <Svg width={ORBIT_SIZE} height={ORBIT_SIZE}>
            <Defs>
              <RadialGradient id="cr_glow" cx="50%" cy="50%" r="50%">
                <Stop offset="0%" stopColor={theme.primary} stopOpacity={0.5} />
                <Stop offset="42%" stopColor={theme.gradient[0]} stopOpacity={0.18} />
                <Stop offset="100%" stopColor={theme.background} stopOpacity={0} />
              </RadialGradient>
            </Defs>
            <Rect x={0} y={0} width={ORBIT_SIZE} height={ORBIT_SIZE} fill="url(#cr_glow)" />
          </Svg>
        </Animated.View>

        {/* Slow orbit of twinkling stardust. */}
        <Animated.View style={[styles.orbit, orbitStyle]} pointerEvents="none">
          {dots.map((d, i) => (
            <StardustDot key={i} {...d} enabled={animationsEnabled} />
          ))}
        </Animated.View>

        {/* The atom mark. */}
        <Animated.View style={logoStyle}>
          <AurafyLogo size={120} />
        </Animated.View>
      </View>

      {wantWordmark ? (
        <Animated.Text style={[styles.wordmark, { color: theme.text }, wordmarkStyle]}>
          Aurafy
        </Animated.Text>
      ) : null}
    </Animated.View>
  );
});

export default CosmicReveal;

const styles = StyleSheet.create({
  // reveal: fills the host screen so the wordmark can sit lower like the splash.
  fill: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  // loading: a compact centered block that drops into an existing column.
  block: { width: ORBIT_SIZE, height: ORBIT_SIZE, alignItems: 'center', justifyContent: 'center' },
  center: {
    width: ORBIT_SIZE,
    height: ORBIT_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  halo: { position: 'absolute', width: ORBIT_SIZE, height: ORBIT_SIZE },
  orbit: { position: 'absolute', width: ORBIT_SIZE, height: ORBIT_SIZE },
  dot: {
    position: 'absolute',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    elevation: 5,
  },
  wordmark: {
    position: 'absolute',
    bottom: '24%',
    fontSize: 40,
    fontFamily: 'PlayfairDisplay_700Bold',
    letterSpacing: -0.4,
  },
});
