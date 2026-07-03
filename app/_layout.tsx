import {
  HankenGrotesk_400Regular,
  HankenGrotesk_500Medium,
  HankenGrotesk_600SemiBold,
  HankenGrotesk_700Bold,
  HankenGrotesk_800ExtraBold,
  HankenGrotesk_900Black,
  useFonts,
} from "@expo-google-fonts/hanken-grotesk";
import {
  PlayfairDisplay_400Regular,
  PlayfairDisplay_400Regular_Italic,
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_700Bold,
} from "@expo-google-fonts/playfair-display";
import {
  NotoNaskhArabic_400Regular,
  NotoNaskhArabic_500Medium,
  NotoNaskhArabic_600SemiBold,
  NotoNaskhArabic_700Bold,
} from "@expo-google-fonts/noto-naskh-arabic";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { Component, useEffect, useState } from "react";
import { LogBox, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ThemeProvider } from "@/src/themes/ThemeProvider";
import { useTransitionStore } from "@/src/store/transitionStore";
import CosmicReveal from "@/src/components/CosmicReveal";
import CosmicField from "@/src/components/CosmicField";
import "@/src/i18n";

SplashScreen.preventAutoHideAsync();

// Expo's dev-mode keep-awake (it pins the screen on while the JS bundle is attached to the dev
// server) can fail to acquire the OS wake lock on some Android ROMs, surfacing a benign
// "Unable to activate keep awake" promise rejection as a red error overlay. It cannot happen in
// a production build (there is no dev keep-awake there), so silence only that one message in dev.
if (__DEV__) {
  LogBox.ignoreLogs(["Unable to activate keep awake"]);
}

/** Minimal error boundary — shows the raw error message in dev, nothing in prod */
class AurafyErrorBoundary extends Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  state = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error("[Aurafy] Render error:", error.message, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <View style={{ flex: 1, backgroundColor: "#07091A", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <Text style={{ color: "#FFFFFF", fontSize: 20, fontWeight: "700", marginBottom: 12 }}>Something went wrong</Text>
          {__DEV__ && (
            <Text style={{ color: "#B8BCD0", fontSize: 12, textAlign: "center", marginBottom: 24 }}>
              {(this.state.error as Error).message}
            </Text>
          )}
          <TouchableOpacity
            onPress={() => this.setState({ error: null })}
            style={{ backgroundColor: "#8B5CF6", paddingHorizontal: 24, paddingVertical: 14, borderRadius: 999 }}
          >
            <Text style={{ color: "#FFFFFF", fontWeight: "600" }}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return this.props.children;
  }
}

/**
 * Hosts the one-shot cosmic intro overlay at the very top of the app (above the
 * navigator + tab bar) so it covers everything and the whole onboarding → home
 * handoff. Triggered by the transient flag set on the onboarding "Begin" tap;
 * dissolves to reveal Home beneath — no route swap, so no black-flash gap.
 */
function IntroOverlayHost() {
  const playIntro = useTransitionStore((s) => s.playIntro);
  const consumeIntro = useTransitionStore((s) => s.consumeIntro);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (playIntro && !active) {
      setActive(true);
      consumeIntro();
    }
  }, [playIntro, active, consumeIntro]);

  if (!active) return null;
  return <CosmicReveal mode="reveal" onDone={() => setActive(false)} />;
}

function RootLayoutNav() {
  return (
    // Persistent cosmic field painted ONCE behind the whole navigator. Screens
    // that keep a transparent container (Home) reveal it during transitions, so a
    // stack pop can never expose the dark `#07091A` base while the destination's
    // own gradient/bloom/content commit a frame late.
    <View style={{ flex: 1 }}>
      <CosmicField />
      <Stack
        screenOptions={{
          headerShown: false,
          // Dark surface under every transition so a screen swap never flashes
          // white. Kept in sync with cosmicTheme.background / app.json splash bg.
          contentStyle: { backgroundColor: "#07091A" },
        }}
      >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false, animation: "fade" }} />
      {/* Fade so onboarding → home is a dark-to-dark crossfade (the cosmic intro
          then plays as an overlay on Home itself). */}
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          animation: "fade",
          // Transparent so Home (transparent container) reveals the persistent
          // CosmicField behind the navigator instead of the dark base, killing the
          // back-from-module flash. Other tabs paint their own opaque background.
          contentStyle: { backgroundColor: "transparent" },
        }}
      />
      {/* No native header — the screen draws its own glass back button. */}
      <Stack.Screen
        name="module/[id]"
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
      {/* No native header — the screen draws its own glass back button. */}
      <Stack.Screen
        name="reading-mode"
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
      {/* No native header — the screen draws its own glass back button. */}
      <Stack.Screen
        name="person-entry"
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="quiz"
        options={{
          headerShown: false,
          animation: "slide_from_right",
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="loading"
        options={{
          headerShown: false,
          animation: "fade",
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="result"
        options={{
          headerShown: false,
          animation: "slide_from_bottom",
        }}
      />
      {/* Insights article reader — own glass back button + Share, no native header. */}
      <Stack.Screen
        name="article/[id]"
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
      {/* No native header — the screen draws its own glass back button. */}
      <Stack.Screen
        name="theme-gallery"
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
      {/* No native header — the screen draws its own glass back button. */}
      <Stack.Screen
        name="about-psychology"
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
      {/* C-10 dev panel (dev builds only) — TEST-ONLY, own glass back button. */}
      <Stack.Screen
        name="dev-panel"
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
      {/* C-10 weekly result reveal — full-screen ceremony, fade in, no swipe-dismiss. */}
      <Stack.Screen
        name="weekly-result"
        options={{
          headerShown: false,
          animation: "fade",
          gestureEnabled: false,
        }}
      />
      </Stack>
    </View>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    // Body / UI face — Hanken Grotesk (adopted in the C-10 result-experience pass,
    // replacing Inter). Styles still reference the family by its `HankenGrotesk_*`
    // name; 800/900 are loaded for the share-card / big-CTA weights per the spec.
    HankenGrotesk_400Regular,
    HankenGrotesk_500Medium,
    HankenGrotesk_600SemiBold,
    HankenGrotesk_700Bold,
    HankenGrotesk_800ExtraBold,
    HankenGrotesk_900Black,
    PlayfairDisplay_400Regular,
    // Share-card quote face (design shows an italic serif pull-quote).
    PlayfairDisplay_400Regular_Italic,
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_700Bold,
    NotoNaskhArabic_400Regular,
    NotoNaskhArabic_500Medium,
    NotoNaskhArabic_600SemiBold,
    NotoNaskhArabic_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AurafyErrorBoundary>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <RootLayoutNav />
            <IntroOverlayHost />
          </GestureHandlerRootView>
        </AurafyErrorBoundary>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
