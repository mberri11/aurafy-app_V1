import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { Fraunces_400Regular } from "@expo-google-fonts/fraunces";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { Component, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ThemeProvider } from "@/src/themes/ThemeProvider";
import "@/src/i18n";

SplashScreen.preventAutoHideAsync();

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

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false, animation: "fade" }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="module/[id]"
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          headerTintColor: "#FFFFFF",
          headerBackTitle: "Back",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="reading-mode"
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          headerTintColor: "#FFFFFF",
          headerBackTitle: "Back",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="person-entry"
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          headerTintColor: "#FFFFFF",
          headerBackTitle: "Back",
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
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          headerTintColor: "#FFFFFF",
          headerBackTitle: "Home",
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="theme-gallery"
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          headerTintColor: "#FFFFFF",
          headerBackTitle: "Settings",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="daily-reading"
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          headerTintColor: "#FFFFFF",
          headerBackTitle: "Home",
          animation: "slide_from_bottom",
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Fraunces_400Regular,
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
          </GestureHandlerRootView>
        </AurafyErrorBoundary>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
