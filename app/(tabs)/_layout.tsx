import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import { useTheme } from '@/src/themes/ThemeProvider';
import { rs } from '@/src/utils/responsive';

/**
 * Tab bar — glass strip across the bottom. Active label is white,
 * the active icon picks up theme accent (gold for the Stars tab,
 * primary purple/copper for the rest).
 */
export default function TabLayout() {
  const theme = useTheme();
  const { t } = useTranslation();
  const isIOS = Platform.OS === 'ios';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // Transparent tab scene so the root CosmicField shows through Home's
        // transparent container (other tabs paint their own opaque background).
        sceneStyle: { backgroundColor: 'transparent' },
        tabBarActiveTintColor: theme.gradient[0],
        tabBarInactiveTintColor: theme.textDim,
        tabBarLabelStyle: {
          fontSize: rs(11),
          fontFamily: 'HankenGrotesk_600SemiBold',
          letterSpacing: 0.2,
        },
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: isIOS ? 'transparent' : theme.bg2,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: theme.surfaceBorder,
          elevation: 0,
        },
        tabBarBackground: () =>
          isIOS ? (
            <BlurView intensity={70} tint="dark" style={StyleSheet.absoluteFill} />
          ) : (
            <View
              style={[
                StyleSheet.absoluteFill,
                { backgroundColor: theme.bg2 },
              ]}
            />
          ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.home'),
          tabBarIcon: ({ focused }) => (
            <Feather
              name="home"
              size={rs(22)}
              color={focused ? theme.gradient[0] : theme.textDim}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: t('tabs.insights'),
          // Provisional glyph — lock the exact icon against 10-Insight.png during
          // the Golden Loop. Active tint inherits the cyan accent (gradient[0]).
          tabBarIcon: ({ focused }) => (
            <Feather
              name="book-open"
              size={rs(22)}
              color={focused ? theme.gradient[0] : theme.textDim}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="stars"
        options={{
          title: t('tabs.stars'),
          // Stars keeps its gold identity even when active (other tabs use the
          // cyan accent) — the label must match the gold star, per the design.
          tabBarActiveTintColor: theme.gold,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'star' : 'star-outline'}
              size={rs(22)}
              color={theme.gold}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: t('tabs.history'),
          tabBarIcon: ({ focused }) => (
            <Feather
              name="clock"
              size={rs(22)}
              color={focused ? theme.gradient[0] : theme.textDim}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('tabs.settings'),
          tabBarIcon: ({ focused }) => (
            <Feather
              name="settings"
              size={rs(22)}
              color={focused ? theme.gradient[0] : theme.textDim}
            />
          ),
        }}
      />
    </Tabs>
  );
}
