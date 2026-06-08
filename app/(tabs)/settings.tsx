import React, { useCallback, useState } from 'react';
import {
  I18nManager,
  Linking,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useUserStore } from '@/src/store/userStore';
import { useSettingsStore } from '@/src/store/settingsStore';
import { useTheme } from '@/src/themes/ThemeProvider';
import { Language, ReadingMode } from '@/src/types';
import GlassCard from '@/src/components/GlassCard';
import CosmicBloom from '@/src/components/CosmicBloom';
import Toggle from '@/src/components/Toggle';
import Slider from '@/src/components/Slider';
import TimeWheelSheet from '@/src/components/TimeWheelSheet';
import ConfirmSheet from '@/src/components/ConfirmSheet';
import i18n from '@/src/i18n';
import { clear as storageClear } from '@/src/utils/storage';
import { shareAppLink } from '@/src/utils/share';
import { rs } from '@/src/utils/responsive';

const LANGUAGES: { code: Language; name: string }[] = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'ar', name: 'العربية' },
  { code: 'es', name: 'Español' },
];

const MODE_OPTIONS: ReadingMode[] = ['solo', 'compare', 'triangle', 'circle'];

const PRIVACY_URL = 'https://aurafy.app/privacy';
const TERMS_URL = 'https://aurafy.app/terms';
const STORE_URL = 'market://details?id=com.simobr.aurafy';

type SheetConfig = {
  title: string;
  message?: string;
  confirmLabel: string;
  tone?: 'cyan' | 'rose';
  cancelLabel?: string;
  onConfirm: () => void;
};

function SectionHeader({ title }: { title: string }) {
  const theme = useTheme();
  return <Text style={[styles.sectionHeader, { color: theme.textMuted }]}>{title.toUpperCase()}</Text>;
}

function Row({
  label,
  sublabel,
  value,
  right,
  chevron,
  destructive,
  disabled,
  onPress,
}: {
  label: string;
  sublabel?: string;
  value?: string;
  right?: React.ReactNode;
  chevron?: boolean;
  destructive?: boolean;
  disabled?: boolean;
  onPress?: () => void;
}) {
  const theme = useTheme();
  const inner = (
    <View style={[styles.row, disabled && styles.rowDisabled]}>
      <View style={styles.rowText}>
        <Text style={[styles.rowLabel, { color: destructive ? theme.rose : theme.text }]}>{label}</Text>
        {sublabel ? <Text style={[styles.rowSub, { color: theme.textMuted }]}>{sublabel}</Text> : null}
      </View>
      <View style={styles.rowRight}>
        {value ? <Text style={[styles.rowValue, { color: theme.textMuted }]}>{value}</Text> : null}
        {right}
        {chevron ? <Feather name="chevron-right" size={rs(20)} color={theme.textMuted} /> : null}
      </View>
    </View>
  );

  if (onPress && !disabled) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7} accessibilityLabel={label} accessibilityRole="button">
        {inner}
      </TouchableOpacity>
    );
  }
  return inner;
}

function Divider() {
  const theme = useTheme();
  return <View style={[styles.divider, { backgroundColor: theme.surfaceBorder }]} />;
}

export default function SettingsScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const {
    language,
    hapticsEnabled,
    soundEnabled,
    ambientAudio,
    volume,
    dailyReminder,
    reminderTime,
    streakReminder,
    defaultMode,
    showFrameworkTags,
    autoCentering,
    themeId,
    setLanguage,
    toggleHaptics,
    toggleSound,
    toggleAmbientAudio,
    setVolume,
    toggleDailyReminder,
    setReminderTime,
    toggleStreakReminder,
    setDefaultMode,
    toggleShowFrameworkTags,
    toggleAutoCentering,
    resetAll: resetSettings,
  } = useSettingsStore();
  const { history, clearHistory, resetAll: resetUser } = useUserStore();
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [sheet, setSheet] = useState<SheetConfig | null>(null);

  const handleLanguageChange = useCallback(
    (lang: Language) => {
      setLanguage(lang);
      i18n.changeLanguage(lang);
      I18nManager.forceRTL(lang === 'ar');
    },
    [setLanguage],
  );

  // Default mode cycles through the options on tap — no popup.
  const handleDefaultMode = useCallback(() => {
    const idx = MODE_OPTIONS.indexOf(defaultMode);
    const next = MODE_OPTIONS[(idx + 1) % MODE_OPTIONS.length];
    setDefaultMode(next);
  }, [defaultMode, setDefaultMode]);

  const handleClearHistory = useCallback(() => {
    setSheet({
      title: t('settings.clearHistoryConfirmTitle'),
      message: t('settings.clearHistoryConfirmMessage'),
      confirmLabel: t('settings.clearHistoryConfirmAction'),
      tone: 'cyan',
      cancelLabel: t('common.cancel'),
      onConfirm: () => clearHistory(),
    });
  }, [t, clearHistory]);

  const handleExport = useCallback(() => {
    if (history.length === 0) {
      setSheet({
        title: t('settings.exportReadings'),
        message: t('settings.exportEmpty'),
        confirmLabel: t('common.ok'),
        tone: 'cyan',
        onConfirm: () => {},
      });
      return;
    }
    void Share.share({ message: JSON.stringify(history, null, 2) });
  }, [history, t]);

  const handleReset = useCallback(() => {
    setSheet({
      title: t('settings.resetConfirmTitle'),
      message: t('settings.resetConfirmMessage'),
      confirmLabel: t('settings.resetConfirmAction'),
      tone: 'rose',
      cancelLabel: t('common.cancel'),
      onConfirm: async () => {
        resetUser();
        resetSettings();
        await storageClear();
      },
    });
  }, [resetUser, resetSettings, t]);

  const openUrl = useCallback((url: string) => {
    void Linking.openURL(url).catch(() => {});
  }, []);

  return (
    <View style={styles.root}>
      <CosmicBloom cx="50%" cy="6%" r="60%" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + rs(18), paddingBottom: insets.bottom + rs(100) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.title, { color: theme.text }]}>{t('settings.title')}</Text>

        {/* APPEARANCE */}
        <SectionHeader title={t('settings.appearance')} />
        <GlassCard style={styles.card}>
          <Row
            label={t('settings.theme')}
            sublabel={t(`themeGallery.${themeId}`)}
            chevron
            onPress={() => router.push('/theme-gallery')}
          />
          <Divider />
          <Row
            label={t('settings.haptics')}
            right={<Toggle value={hapticsEnabled} onValueChange={toggleHaptics} accessibilityLabel={t('settings.haptics')} />}
          />
        </GlassCard>

        {/* LANGUAGE */}
        <SectionHeader title={t('settings.language')} />
        <GlassCard style={styles.card}>
          {LANGUAGES.map((l, i) => (
            <React.Fragment key={l.code}>
              <Row
                label={l.name}
                onPress={() => handleLanguageChange(l.code)}
                right={
                  language === l.code ? (
                    <Feather name="check" size={rs(18)} color={theme.gradient[0]} />
                  ) : undefined
                }
              />
              {i < LANGUAGES.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </GlassCard>

        {/* SOUND & AUDIO */}
        <SectionHeader title={t('settings.soundAudio')} />
        <GlassCard style={styles.card}>
          <Row
            label={t('settings.soundEffects')}
            sublabel={t('settings.soundEffectsDesc')}
            right={<Toggle value={soundEnabled} onValueChange={toggleSound} accessibilityLabel={t('settings.soundEffects')} />}
          />
          <Divider />
          <Row
            label={t('settings.ambientAudio')}
            sublabel={t('settings.ambientAudioDesc')}
            right={<Toggle value={ambientAudio} onValueChange={toggleAmbientAudio} accessibilityLabel={t('settings.ambientAudio')} />}
          />
          <Divider />
          <Row
            label={t('settings.volume')}
            disabled={!soundEnabled && !ambientAudio}
            right={
              <View style={styles.sliderWrap}>
                <Slider value={volume} onChange={setVolume} disabled={!soundEnabled && !ambientAudio} />
              </View>
            }
          />
        </GlassCard>

        {/* NOTIFICATIONS */}
        <SectionHeader title={t('settings.notifications')} />
        <GlassCard style={styles.card}>
          <Row
            label={t('settings.dailyReminder')}
            sublabel={t('settings.dailyReminderDesc')}
            right={<Toggle value={dailyReminder} onValueChange={toggleDailyReminder} accessibilityLabel={t('settings.dailyReminder')} />}
          />
          <Divider />
          <Row
            label={t('settings.reminderTime')}
            value={reminderTime}
            chevron
            disabled={!dailyReminder}
            onPress={() => setTimePickerVisible(true)}
          />
          <Divider />
          <Row
            label={t('settings.streakReminder')}
            sublabel={t('settings.streakReminderDesc')}
            right={<Toggle value={streakReminder} onValueChange={toggleStreakReminder} accessibilityLabel={t('settings.streakReminder')} />}
          />
        </GlassCard>

        {/* READING PREFERENCES */}
        <SectionHeader title={t('settings.readingPreferences')} />
        <GlassCard style={styles.card}>
          <Row
            label={t('settings.defaultMode')}
            right={
              <TouchableOpacity
                onPress={handleDefaultMode}
                activeOpacity={0.7}
                style={styles.modePick}
                accessibilityRole="button"
                accessibilityLabel={t('settings.defaultMode')}
              >
                <Text style={[styles.rowValue, { color: theme.textMuted }]}>
                  {t(`readingModes.${defaultMode}.title`)}
                </Text>
                <Feather name="chevron-right" size={rs(20)} color={theme.textMuted} />
              </TouchableOpacity>
            }
          />
          <Divider />
          <Row
            label={t('settings.showFrameworkTags')}
            sublabel={t('settings.showFrameworkTagsDesc')}
            right={<Toggle value={showFrameworkTags} onValueChange={toggleShowFrameworkTags} accessibilityLabel={t('settings.showFrameworkTags')} />}
          />
          <Divider />
          <Row
            label={t('settings.autoCentering')}
            sublabel={t('settings.autoCenteringDesc')}
            right={<Toggle value={autoCentering} onValueChange={toggleAutoCentering} accessibilityLabel={t('settings.autoCentering')} />}
          />
        </GlassCard>

        {/* ABOUT */}
        <SectionHeader title={t('settings.about')} />
        <GlassCard style={styles.card}>
          <Row label={t('settings.aboutPsychology')} chevron onPress={() => router.push('/about-psychology')} />
          <Divider />
          <Row
            label={t('settings.howAurafyWorks')}
            chevron
            onPress={() => router.push('/onboarding')}
          />
          <Divider />
          <Row label={t('settings.rateApp')} chevron onPress={() => openUrl(STORE_URL)} />
          <Divider />
          <Row label={t('settings.shareApp')} chevron onPress={() => void shareAppLink()} />
          <Divider />
          <Row label={t('settings.privacyPolicy')} chevron onPress={() => openUrl(PRIVACY_URL)} />
          <Divider />
          <Row label={t('settings.termsOfUse')} chevron onPress={() => openUrl(TERMS_URL)} />
        </GlassCard>

        {/* DATA */}
        <SectionHeader title={t('settings.data')} />
        <GlassCard style={styles.card}>
          <Row label={t('settings.clearHistory')} chevron onPress={handleClearHistory} />
          <Divider />
          <Row label={t('settings.exportReadings')} chevron onPress={handleExport} />
          <Divider />
          <Row label={t('settings.resetData')} chevron destructive onPress={handleReset} />
        </GlassCard>

        <View style={styles.footer}>
          <Text style={[styles.version, { color: theme.textMuted }]}>
            {t('settings.version')} · {t('settings.madeWith')}{' '}
          </Text>
          <MaterialCommunityIcons name="heart" size={rs(12)} color={theme.textMuted} />
        </View>
      </ScrollView>

      <TimeWheelSheet
        visible={timePickerVisible}
        value={reminderTime}
        onSelect={setReminderTime}
        onClose={() => setTimePickerVisible(false)}
      />

      <ConfirmSheet
        visible={sheet !== null}
        title={sheet?.title ?? ''}
        message={sheet?.message}
        confirmLabel={sheet?.confirmLabel ?? t('common.ok')}
        tone={sheet?.tone}
        cancelLabel={sheet?.cancelLabel}
        onConfirm={() => {
          sheet?.onConfirm();
          setSheet(null);
        }}
        onClose={() => setSheet(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  container: { flex: 1 },
  content: { paddingHorizontal: rs(20) },
  title: { fontSize: rs(32), fontFamily: 'PlayfairDisplay_400Regular', marginBottom: rs(4) },
  sectionHeader: {
    fontSize: rs(10.5),
    letterSpacing: 1.4,
    fontFamily: 'Inter_600SemiBold',
    marginTop: rs(22),
    marginBottom: rs(8),
    marginLeft: rs(4),
  },
  // Translucent glass — lets the cosmic field show through so cards read as
  // lifted glass panels, not the near-black opaque fill GlassCard falls back to
  // in Expo Go. Layers over GlassCard's own white `surface` sheen + border.
  // Shadow/elevation killed: on the translucent fill the dark drop-shadow shows
  // THROUGH and muddies the interior — the design panel is flat + even.
  card: {
    paddingHorizontal: rs(2),
    paddingVertical: rs(2),
    backgroundColor: 'rgba(255,255,255,0.05)',
    elevation: 0,
    shadowOpacity: 0,
    shadowColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rs(16),
    paddingVertical: rs(11),
    minHeight: rs(48),
    gap: rs(12),
  },
  rowDisabled: { opacity: 0.4 },
  rowText: { flex: 1, gap: rs(3) },
  rowLabel: { fontSize: rs(14), fontFamily: 'Inter_500Medium' },
  rowSub: { fontSize: rs(12), fontFamily: 'Inter_400Regular' },
  rowRight: { flexDirection: 'row', alignItems: 'center', gap: rs(8) },
  rowValue: { fontSize: rs(14), fontFamily: 'Inter_400Regular' },
  modePick: { flexDirection: 'row', alignItems: 'center', gap: rs(4), paddingVertical: rs(6), paddingLeft: rs(10) },
  sliderWrap: { width: rs(140) },
  divider: { height: 1, marginHorizontal: rs(16) },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(26),
  },
  version: { fontSize: rs(13), fontFamily: 'Inter_400Regular' },
});
