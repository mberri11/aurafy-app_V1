import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/src/themes/ThemeProvider';
import GlassCard from '@/src/components/GlassCard';
import { rs } from '@/src/utils/responsive';

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

export default function AboutPsychologyScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const cards: { key: string; icon: IconName; color: string }[] = [
    { key: 'attachment', icon: 'link-variant', color: theme.primary },
    { key: 'sociometry', icon: 'share-variant', color: theme.gradient[0] },
    { key: 'loveLanguages', icon: 'heart-plus', color: theme.rose },
    { key: 'color', icon: 'palette', color: theme.emerald },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <LinearGradient colors={['#181430', '#0E0B22', '#08061A']} locations={[0, 0.5, 1]} style={StyleSheet.absoluteFill} />
      <Svg style={StyleSheet.absoluteFill} width="100%" height="100%" pointerEvents="none">
        <Defs>
          <RadialGradient id="about_glow" cx="50%" cy="14%" r="60%">
            <Stop offset="0%" stopColor={theme.primary} stopOpacity={0.2} />
            <Stop offset="55%" stopColor="#A855F7" stopOpacity={0.06} />
            <Stop offset="100%" stopColor={theme.background} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#about_glow)" />
      </Svg>

      <View style={[styles.header, { paddingTop: insets.top + rs(12) }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          accessibilityLabel={t('common.back')}
          accessibilityRole="button"
          activeOpacity={0.8}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={[styles.backBtn, { backgroundColor: theme.surface, borderColor: theme.surfaceBorder }]}
        >
          <Feather name="chevron-left" size={rs(20)} color={theme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + rs(40) }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.title, { color: theme.text }]}>{t('about.title')}</Text>
        <Text style={[styles.subtitle, { color: theme.textMuted }]}>{t('about.subtitle')}</Text>

        <View style={styles.cards}>
          {cards.map(({ key, icon, color }) => (
            <GlassCard key={key} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={[styles.iconTile, { backgroundColor: `${color}1F`, borderColor: `${color}55` }]}>
                  <MaterialCommunityIcons name={icon} size={rs(18)} color={color} />
                </View>
                <Text style={[styles.cardTitle, { color: theme.text }]}>{t(`about.${key}Title`)}</Text>
              </View>
              <Text style={[styles.cardBody, { color: theme.textMuted }]}>{t(`about.${key}Body`)}</Text>
            </GlassCard>
          ))}
        </View>

        <Text style={[styles.footer, { color: theme.textDim }]}>{t('about.footer')}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(20),
    paddingBottom: rs(8),
  },
  backBtn: {
    width: rs(44),
    height: rs(44),
    borderRadius: rs(22),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { paddingHorizontal: rs(22), paddingTop: rs(8) },
  title: {
    fontSize: rs(25),
    lineHeight: rs(31),
    fontFamily: 'PlayfairDisplay_600SemiBold',
    letterSpacing: -0.3,
  },
  subtitle: { fontSize: rs(13), lineHeight: rs(18), fontFamily: 'Inter_400Regular', marginTop: rs(8) },
  cards: { gap: rs(14), marginTop: rs(20) },
  card: { padding: rs(16) },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: rs(11) },
  iconTile: {
    width: rs(34),
    height: rs(34),
    borderRadius: rs(10),
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: { fontSize: rs(16.5), fontFamily: 'PlayfairDisplay_600SemiBold', flexShrink: 1 },
  cardBody: { fontSize: rs(13), lineHeight: rs(19), fontFamily: 'Inter_400Regular', marginTop: rs(11) },
  footer: { fontSize: rs(12), lineHeight: rs(17), fontFamily: 'Inter_400Regular', textAlign: 'center', marginTop: rs(22) },
});
