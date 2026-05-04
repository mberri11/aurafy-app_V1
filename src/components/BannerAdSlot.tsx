import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../themes/ThemeProvider';

/**
 * BannerAdSlot — stub for AdMob banner.
 * TODO: Install react-native-google-mobile-ads (requires native build / EAS Build).
 * In Expo Go, renders a placeholder that matches the expected layout height.
 */
const BannerAdSlot = memo(function BannerAdSlot() {
  const theme = useTheme();

  // AdMob requires native build — render empty placeholder in Expo Go
  if (__DEV__) {
    return (
      <View style={[styles.placeholder, { borderColor: theme.surfaceBorder }]}>
        <Text style={[styles.adLabel, { color: theme.textMuted }]}>Ad</Text>
        <Text style={[styles.adPlaceholder, { color: theme.textMuted }]}>
          Banner ad (native build required)
        </Text>
      </View>
    );
  }

  // In production: return null until react-native-google-mobile-ads is installed
  return null;
});

export default BannerAdSlot;

const styles = StyleSheet.create({
  placeholder: {
    height: 68,
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  adLabel: {
    fontSize: 10,
    fontFamily: 'Inter_400Regular',
    opacity: 0.5,
  },
  adPlaceholder: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    opacity: 0.4,
  },
});
