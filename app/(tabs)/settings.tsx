import React, { useCallback } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { I18nManager } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUserStore } from '@/src/store/userStore';
import { useSettingsStore } from '@/src/store/settingsStore';
import { useTheme } from '@/src/themes/ThemeProvider';
import { Language } from '@/src/types';
import GlassCard from '@/src/components/GlassCard';
import i18n from '@/src/i18n';
import { clear as storageClear } from '@/src/utils/storage';
import { shareAppLink } from '@/src/utils/share';

const LANGUAGES: { code: Language; name: string }[] = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'ar', name: 'العربية' },
  { code: 'es', name: 'Español' },
];

function SectionHeader({ title }: { title: string }) {
  const theme = useTheme();
  return (
    <Text style={[styles.sectionHeader, { color: theme.textMuted }]}>{title.toUpperCase()}</Text>
  );
}

function SettingsRow({
  label,
  onPress,
  right,
  destructive,
}: {
  label: string;
  onPress?: () => void;
  right?: React.ReactNode;
  destructive?: boolean;
}) {
  const theme = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress && !right}
      accessibilityLabel={label}
      style={styles.row}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <Text style={[styles.rowLabel, { color: destructive ? theme.rose : theme.text }]}>
        {label}
      </Text>
      {right ?? (onPress ? <Text style={[styles.chevron, { color: theme.textMuted }]}>›</Text> : null)}
    </TouchableOpacity>
  );
}

export default function SettingsScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const {
    language,
    hapticsEnabled,
    animationsEnabled,
    soundEnabled,
    setLanguage,
    toggleHaptics,
    toggleAnimations,
    toggleSound,
    resetAll: resetSettings,
  } = useSettingsStore();
  const { resetAll: resetUser } = useUserStore();

  const handleLanguageChange = useCallback(
    (lang: Language) => {
      setLanguage(lang);
      i18n.changeLanguage(lang);
      if (lang === 'ar') I18nManager.forceRTL(true);
      else I18nManager.forceRTL(false);
    },
    [setLanguage],
  );

  const handleReset = useCallback(() => {
    Alert.alert(t('settings.resetConfirmTitle'), t('settings.resetConfirmMessage'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.confirm'),
        style: 'destructive',
        onPress: async () => {
          resetUser();
          resetSettings();
          await storageClear();
        },
      },
    ]);
  }, [resetUser, resetSettings, t]);

  const handleShareApp = useCallback(async () => {
    await shareAppLink();
  }, []);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 100 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.title, { color: theme.text, fontFamily: 'Fraunces_400Regular' }]}>
        {t('settings.title')}
      </Text>

      {/* Appearance */}
      <SectionHeader title={t('settings.appearance')} />
      <GlassCard style={styles.card}>
        <SettingsRow
          label={t('settings.theme')}
          onPress={() => router.push('/theme-gallery')}
        />
        <View style={[styles.divider, { backgroundColor: theme.surfaceBorder }]} />
        <SettingsRow
          label={t('settings.haptics')}
          right={
            <Switch
              value={hapticsEnabled}
              onValueChange={toggleHaptics}
              trackColor={{ true: theme.primary, false: theme.surface }}
              accessibilityLabel="Toggle haptics"
            />
          }
        />
        <View style={[styles.divider, { backgroundColor: theme.surfaceBorder }]} />
        <SettingsRow
          label={t('settings.animations')}
          right={
            <Switch
              value={animationsEnabled}
              onValueChange={toggleAnimations}
              trackColor={{ true: theme.primary, false: theme.surface }}
              accessibilityLabel="Toggle animations"
            />
          }
        />
      </GlassCard>

      {/* Language */}
      <SectionHeader title={t('settings.language')} />
      <GlassCard style={styles.card}>
        {LANGUAGES.map((l, i) => (
          <React.Fragment key={l.code}>
            <SettingsRow
              label={l.name}
              onPress={() => handleLanguageChange(l.code)}
              right={
                language === l.code ? (
                  <Text style={[styles.checkmark, { color: theme.primary }]}>✓</Text>
                ) : undefined
              }
            />
            {i < LANGUAGES.length - 1 && (
              <View style={[styles.divider, { backgroundColor: theme.surfaceBorder }]} />
            )}
          </React.Fragment>
        ))}
      </GlassCard>

      {/* Sound */}
      <SectionHeader title={t('settings.sound')} />
      <GlassCard style={styles.card}>
        <SettingsRow
          label={t('settings.soundEffects')}
          right={
            <Switch
              value={soundEnabled}
              onValueChange={toggleSound}
              trackColor={{ true: theme.primary, false: theme.surface }}
              accessibilityLabel="Toggle sound effects"
            />
          }
        />
      </GlassCard>

      {/* About */}
      <SectionHeader title={t('settings.about')} />
      <GlassCard style={styles.card}>
        <SettingsRow label={t('settings.aboutPsychology')} onPress={() => Alert.alert('About', 'Aurafy is built on Attachment Theory, Sociometry, Love Languages, and Color Psychology research.')} />
        <View style={[styles.divider, { backgroundColor: theme.surfaceBorder }]} />
        <SettingsRow label={t('settings.rateApp')} onPress={() => {}} />
        <View style={[styles.divider, { backgroundColor: theme.surfaceBorder }]} />
        <SettingsRow label={t('settings.shareApp')} onPress={handleShareApp} />
      </GlassCard>

      {/* Data */}
      <SectionHeader title={t('settings.data')} />
      <GlassCard style={styles.card}>
        <SettingsRow label={t('settings.resetData')} onPress={handleReset} destructive />
      </GlassCard>

      <Text style={[styles.version, { color: theme.textMuted }]}>{t('settings.version')}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 20, gap: 8 },
  title: { fontSize: 30, marginBottom: 8 },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.2,
    fontFamily: 'Inter_600SemiBold',
    marginTop: 12,
    marginBottom: 6,
    marginLeft: 4,
  },
  card: { overflow: 'hidden' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 14,
    minHeight: 50,
  },
  rowLabel: { fontSize: 15, fontFamily: 'Inter_400Regular' },
  chevron: { fontSize: 20 },
  checkmark: { fontSize: 18, fontWeight: '700', fontFamily: 'Inter_700Bold' },
  divider: { height: 1, marginHorizontal: 18 },
  version: {
    textAlign: 'center',
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    marginTop: 20,
  },
});
