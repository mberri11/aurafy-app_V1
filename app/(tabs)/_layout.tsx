import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import { useTheme } from '@/src/themes/ThemeProvider';

/**
 * Tab bar — glass strip across the bottom. Active label is white,
 * the active icon picks up theme accent (gold for the Stars tab,
 * primary purple/copper for the rest).
 */
export default function TabLayout() {
  const theme = useTheme();
  const isIOS = Platform.OS === 'ios';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.text,
        tabBarInactiveTintColor: theme.textDim,
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: 'Inter_600SemiBold',
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
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Feather
              name="home"
              size={22}
              color={focused ? theme.primary : theme.textDim}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="stars"
        options={{
          title: 'Stars',
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'star' : 'star-outline'}
              size={22}
              color={theme.gold}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ focused }) => (
            <Feather
              name="clock"
              size={22}
              color={focused ? theme.primary : theme.textDim}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => (
            <Feather
              name="settings"
              size={22}
              color={focused ? theme.primary : theme.textDim}
            />
          ),
        }}
      />
    </Tabs>
  );
}
