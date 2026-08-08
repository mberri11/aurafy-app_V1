import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  I18nManager,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppText as Text } from '@/src/components/AppText';
import { router } from 'expo-router';
import Constants from 'expo-constants';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useUserStore } from '@/src/store/userStore';
import { useSettingsStore } from '@/src/store/settingsStore';
import { useTheme } from '@/src/themes/ThemeProvider';
import { Language, ReadingMode } from '@/src/types';
import GlassCard from '@/src/components/GlassCard';
import CosmicBloom from '@/src/components/CosmicBloom';
import Toggle from '@/src/components/Toggle';
import Slider from '@/src/components/Slider';
import TimeWheelSheet from '@/src/components/TimeWheelSheet';
import ConfirmSheet, { type ConfirmSheetIcon } from '@/src/components/ConfirmSheet';
import { PERSISTENT_BANNER_RESERVE } from '@/src/components/PersistentBanner';
import {
  isPrivacyOptionsRequired,
  openPrivacyOptionsForm,
  useDevForcePrivacyRow,
} from '@/src/ads/adsRuntime';
import i18n from '@/src/i18n';
import { clear as storageClear } from '@/src/utils/storage';
import { reloadApp } from '@/src/utils/reloadApp';
import { syncDayjsLocale, formatReminderTimeDisplay } from '@/src/utils/dateLocale';
import { syncReminders } from '@/src/utils/notifications';
import { shareAppLink } from '@/src/utils/share';
import { useIsRTL } from '@/src/utils/rtl';
import { rs } from '@/src/utils/responsive';

const LANGUAGES: { code: Language; name: string }[] = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'ar', name: 'العربية' },
  { code: 'es', name: 'Español' },
];

const MODE_OPTIONS: ReadingMode[] = ['solo', 'compare', 'triangle', 'circle'];

const PRIVACY_URL = 'https://aurafyapp.github.io/aurafy-legal/privacy.html';
const TERMS_URL = 'https://aurafyapp.github.io/aurafy-legal/terms.html';
// Socials stay plain https: Instagram/TikTok/X all publish verified Android App Links,
// so these open the installed app when present and the browser otherwise. Custom
// schemes (instagram://, tiktok://) would need <queries> in the native manifest for
// zero added benefit.
const INSTAGRAM_URL = 'https://www.instagram.com/aurafy_app';
const TIKTOK_URL = 'https://www.tiktok.com/@aurafy.app';
const X_URL = 'https://x.com/aurafy_appX';
// market:// opens the Play Store app straight to the listing (Rate). The https form is
// what we SHARE — it resolves in any app/browser and still deep-links to Play on device.
const STORE_URL = 'market://details?id=com.simobr.aurafy';
const STORE_URL_HTTPS = 'https://play.google.com/store/apps/details?id=com.simobr.aurafy';
const CONTACT_EMAIL = 'aurafy.app26@gmail.com';
const CONTACT_SUBJECT = 'Aurafy — Feedback & Suggestions';

type SheetConfig = {
  title: string;
  message?: string;
  confirmLabel: string;
  tone?: 'cyan' | 'rose';
  cancelLabel?: string;
  icon?: ConfirmSheetIcon;
  eyebrow?: string;
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
  leading,
  right,
  chevron,
  destructive,
  disabled,
  onPress,
}: {
  label: string;
  sublabel?: string;
  value?: string;
  /** Optional glyph shown before the label (used by the FOLLOW rows). */
  leading?: React.ReactNode;
  right?: React.ReactNode;
  chevron?: boolean;
  destructive?: boolean;
  disabled?: boolean;
  onPress?: () => void;
}) {
  const theme = useTheme();
  const isRTL = useIsRTL();
  const inner = (
    <View style={[styles.row, disabled && styles.rowDisabled]}>
      {leading ? <View style={styles.rowIcon}>{leading}</View> : null}
      <View style={styles.rowText}>
        <Text style={[styles.rowLabel, { color: destructive ? theme.rose : theme.text }]}>{label}</Text>
        {sublabel ? <Text style={[styles.rowSub, { color: theme.textMuted }]}>{sublabel}</Text> : null}
      </View>
      <View style={styles.rowRight}>
        {value ? <Text style={[styles.rowValue, { color: theme.textMuted }]}>{value}</Text> : null}
        {right}
        {chevron ? <Feather name={isRTL ? 'chevron-left' : 'chevron-right'} size={rs(20)} color={theme.textMuted} /> : null}
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

/** How long a nav call blocks a second one. Long enough to outlast the push
 *  animation, short enough that a deliberate second tap still works. */
const NAV_GUARD_MS = 700;

export default function SettingsScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const isRTL = useIsRTL();
  const insets = useSafeAreaInsets();
  // A second tap on the Themes row pushed /theme-gallery twice, so the back gesture
  // popped one copy while the other was still animating — the ~1s flash of the gallery
  // sliding in and straight back out. One push per NAV_GUARD_MS.
  const isNavigatingRef = useRef(false);
  const openThemeGallery = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    setTimeout(() => {
      isNavigatingRef.current = false;
    }, NAV_GUARD_MS);
    router.push('/theme-gallery');
  }, []);
  const {
    language,
    hapticsEnabled,
    soundEnabled,
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
    setVolume,
    toggleDailyReminder,
    setReminderTime,
    toggleStreakReminder,
    setDefaultMode,
    toggleShowFrameworkTags,
    toggleAutoCentering,
    resetAll: resetSettings,
  } = useSettingsStore();
  const { clearHistory, resetAll: resetUser } = useUserStore();
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [sheet, setSheet] = useState<SheetConfig | null>(null);
  // Consent revocation is offered ONLY where Google says it's required (EEA/UK/CH).
  // Everywhere else the row stays absent — a row that opens nothing is worse than none.
  const [privacyOptionsAvailable, setPrivacyOptionsAvailable] = useState(false);
  // Dev-panel override — always false in production (see setDevForcePrivacyRow).
  const devForcePrivacyRow = useDevForcePrivacyRow();

  useEffect(() => {
    let cancelled = false;
    void isPrivacyOptionsRequired().then((required) => {
      if (!cancelled) setPrivacyOptionsAvailable(required);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleLanguageChange = useCallback(
    (lang: Language) => {
      if (lang === language) return;
      // Do NOT apply the language yet. Staging it and applying only when the user confirms
      // "Restart" makes Cancel/dismiss a true no-op. Previously the language (and, for
      // Arabic, the RTL flag) switched immediately, so cancelling left the app half-changed
      // — strings/RTL flipped but no restart — which was chaotic for Arabic.
      setSheet({
        title: t('settings.restartTitle'),
        message: t('settings.restartMessage'),
        confirmLabel: t('settings.restartNow'),
        tone: 'rose',
        icon: 'refresh-cw',
        cancelLabel: t('common.cancel'),
        onConfirm: () => {
          const willBeRTL = lang === 'ar';
          setLanguage(lang);
          i18n.changeLanguage(lang);
          syncDayjsLocale(lang);
          // RTL is a native flag — set unconditionally for the target language (stale
          // `I18nManager.isRTL` under Expo Go + New Arch); it applies on the relaunch.
          I18nManager.allowRTL(willBeRTL);
          I18nManager.forceRTL(willBeRTL);
          // Clean relaunch so the change applies in place. (Dev: JS reload. Prod:
          // no-op until expo-updates lands in Phase D; strings already switched
          // live via changeLanguage, only the RTL flip waits for the next launch.)
          reloadApp();
        },
      });
    },
    [language, setLanguage, t],
  );

  // Notification setting changes must re-schedule immediately so the daily time /
  // streak reminders reflect the new state (syncReminders reads fresh store values).
  const handleToggleDailyReminder = useCallback(() => {
    toggleDailyReminder();
    void syncReminders();
  }, [toggleDailyReminder]);

  const handleToggleStreakReminder = useCallback(() => {
    toggleStreakReminder();
    void syncReminders();
  }, [toggleStreakReminder]);

  const handleReminderTime = useCallback(
    (value: string) => {
      setReminderTime(value);
      void syncReminders();
    },
    [setReminderTime],
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
      icon: 'trash-2',
      cancelLabel: t('common.cancel'),
      // Clear, then relaunch so no stale History/Home UI lingers (Simo 2026-07-11).
      onConfirm: () => {
        clearHistory();
        reloadApp();
      },
    });
  }, [t, clearHistory]);

  const handleReset = useCallback(() => {
    setSheet({
      title: t('settings.resetConfirmTitle'),
      message: t('settings.resetConfirmMessage'),
      confirmLabel: t('settings.resetConfirmAction'),
      tone: 'rose',
      icon: 'alert-triangle',
      eyebrow: t('common.cannotBeUndone'),
      cancelLabel: t('common.cancel'),
      onConfirm: async () => {
        resetUser();
        resetSettings();
        await storageClear();
        // Back to factory: default language (English) + LTR, then a hard reload so ALL in-memory
        // state — i18n strings, the article/content language, RTL direction, and the re-seeded
        // +5 welcome wallet — re-initialises from defaults instead of lingering in whatever the
        // previous language/state was. (In Expo Go the RTL flag only fully re-applies on a manual
        // relaunch; production wires expo-updates for a seamless one.)
        i18n.changeLanguage('en');
        I18nManager.allowRTL(false);
        I18nManager.forceRTL(false);
        reloadApp();
      },
    });
  }, [resetUser, resetSettings, t]);

  const openUrl = useCallback((url: string) => {
    void Linking.openURL(url).catch(() => {});
  }, []);

  // Rate Aurafy — ALWAYS opens the Play Store listing. Deliberately not wired to
  // expo-store-review: Google's In-App Review API is quota-limited and silently shows
  // nothing while still resolving successfully, so an explicit "Rate" tap could do
  // literally nothing. Google's own guidance is to keep that API off user-initiated
  // rate controls (it stays a dep for a future natural-moment prompt).
  // `openUrl` swallows errors, so the market:// leg is called directly to let the
  // https fallback fire when the Play Store app is absent.
  const handleRate = useCallback(() => {
    void (async () => {
      try {
        await Linking.openURL(STORE_URL);
      } catch {
        await Linking.openURL(STORE_URL_HTTPS).catch(() => {});
      }
    })();
  }, []);

  const handleContactUs = useCallback(() => {
    const subject = encodeURIComponent(CONTACT_SUBJECT);
    const body = encodeURIComponent(t('settings.contactBody'));
    openUrl(`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`);
  }, [t, openUrl]);

  return (
    <View style={styles.root}>
      <CosmicBloom cx="50%" cy="6%" r="60%" />
      <ScrollView
        style={styles.container}
        // Bottom padding reserves room for the persistent banner above the tab bar
        // (app/(tabs)/_layout.tsx) so the last row can scroll clear of it.
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + rs(18),
            paddingBottom: insets.bottom + rs(100) + PERSISTENT_BANNER_RESERVE,
          },
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
            onPress={openThemeGallery}
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

        {/* SOUND */}
        <SectionHeader title={t('settings.sound')} />
        <GlassCard style={styles.card}>
          <Row
            label={t('settings.soundEffects')}
            sublabel={t('settings.soundEffectsDesc')}
            right={<Toggle value={soundEnabled} onValueChange={toggleSound} accessibilityLabel={t('settings.soundEffects')} />}
          />
          <Divider />
          <Row
            label={t('settings.volume')}
            disabled={!soundEnabled}
            right={
              <View style={styles.sliderWrap}>
                <Slider value={volume} onChange={setVolume} disabled={!soundEnabled} />
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
            right={<Toggle value={dailyReminder} onValueChange={handleToggleDailyReminder} accessibilityLabel={t('settings.dailyReminder')} />}
          />
          <Divider />
          <Row
            label={t('settings.reminderTime')}
            value={formatReminderTimeDisplay(reminderTime, language)}
            chevron
            disabled={!dailyReminder}
            onPress={() => setTimePickerVisible(true)}
          />
          <Divider />
          <Row
            label={t('settings.streakReminder')}
            sublabel={t('settings.streakReminderDesc')}
            right={<Toggle value={streakReminder} onValueChange={handleToggleStreakReminder} accessibilityLabel={t('settings.streakReminder')} />}
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
                <Feather name={isRTL ? 'chevron-left' : 'chevron-right'} size={rs(20)} color={theme.textMuted} />
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
            // `replay` puts onboarding in REVIEW mode: no language picker (language is
            // set right here in Settings), no Skip, and the last slide returns here
            // instead of re-entering the app. See app/onboarding.tsx.
            onPress={() => router.push({ pathname: '/onboarding', params: { replay: '1' } })}
          />
        </GlassCard>

        {/* FOLLOW — platform names are proper nouns, so they're NOT run through t().
            Brand marks come from Ionicons (Feather/MCI have no TikTok glyph) and are
            tinted with theme.text, monochrome — brand hexes would clash with the
            cosmic palette and can't be hardcoded anyway. */}
        <SectionHeader title={t('settings.follow')} />
        <GlassCard style={styles.card}>
          <Row
            label="Instagram"
            sublabel="@aurafy_app"
            leading={<Ionicons name="logo-instagram" size={rs(18)} color={theme.text} />}
            chevron
            onPress={() => openUrl(INSTAGRAM_URL)}
          />
          <Divider />
          <Row
            label="TikTok"
            sublabel="@aurafy.app"
            leading={<Ionicons name="logo-tiktok" size={rs(18)} color={theme.text} />}
            chevron
            onPress={() => openUrl(TIKTOK_URL)}
          />
          <Divider />
          <Row
            label="X"
            sublabel="@aurafy_appX"
            leading={<Ionicons name="logo-x" size={rs(18)} color={theme.text} />}
            chevron
            onPress={() => openUrl(X_URL)}
          />
        </GlassCard>

        {/* SUPPORT */}
        <SectionHeader title={t('settings.support')} />
        <GlassCard style={styles.card}>
          <Row label={t('settings.rateApp')} chevron onPress={handleRate} />
          <Divider />
          <Row
            label={t('settings.shareApp')}
            chevron
            onPress={() => void shareAppLink(`${t('settings.shareMessage')}\n${STORE_URL_HTTPS}`)}
          />
          <Divider />
          <Row label={t('settings.contactUs')} chevron onPress={handleContactUs} />
        </GlassCard>

        {/* LEGAL */}
        <SectionHeader title={t('settings.legal')} />
        <GlassCard style={styles.card}>
          <Row label={t('settings.privacyPolicy')} chevron onPress={() => openUrl(PRIVACY_URL)} />
          <Divider />
          <Row label={t('settings.termsOfUse')} chevron onPress={() => openUrl(TERMS_URL)} />
          {privacyOptionsAvailable || devForcePrivacyRow ? (
            <>
              <Divider />
              <Row
                label={t('settings.privacyOptions')}
                chevron
                onPress={() => void openPrivacyOptionsForm()}
              />
            </>
          ) : null}
        </GlassCard>

        {/* DATA */}
        <SectionHeader title={t('settings.data')} />
        <GlassCard style={styles.card}>
          <Row label={t('settings.clearHistory')} chevron onPress={handleClearHistory} />
          <Divider />
          <Row label={t('settings.resetData')} chevron destructive onPress={handleReset} />
        </GlassCard>

        {/* DEVELOPER — dev builds only. TEST-ONLY (C-10 loop simulator); remove before
            production. Hardcoded strings are fine here since this never ships. */}
        {__DEV__ ? (
          <>
            <SectionHeader title="Developer" />
            <GlassCard style={styles.card}>
              <Row
                label="C-10 Dev panel"
                sublabel="Anchor / forgiving streak / reveal simulator"
                chevron
                onPress={() => router.push('/dev-panel')}
              />
            </GlassCard>
          </>
        ) : null}

        <View style={styles.footer}>
          <Text style={[styles.version, { color: theme.textMuted }]}>
            {t('settings.version', { version: Constants.expoConfig?.version ?? '1.1.0' })} ·{' '}
            {t('settings.madeWith')}{' '}
          </Text>
          <MaterialCommunityIcons name="heart" size={rs(12)} color={theme.textMuted} />
        </View>
      </ScrollView>

      <TimeWheelSheet
        visible={timePickerVisible}
        value={reminderTime}
        onSelect={handleReminderTime}
        onClose={() => setTimePickerVisible(false)}
      />

      <ConfirmSheet
        visible={sheet !== null}
        title={sheet?.title ?? ''}
        message={sheet?.message}
        confirmLabel={sheet?.confirmLabel ?? t('common.ok')}
        tone={sheet?.tone}
        icon={sheet?.icon}
        eyebrow={sheet?.eyebrow}
        cancelLabel={sheet?.cancelLabel}
        // Restart / reset / clear / export are consequential — require an explicit choice
        // instead of letting a tap-outside silently dismiss (and, for restart, leave the
        // language change half-applied).
        dismissOnBackdrop={false}
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
    fontFamily: 'HankenGrotesk_600SemiBold',
    marginTop: rs(22),
    marginBottom: rs(8),
    marginStart: rs(4),
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
  // Fixed slot so the three FOLLOW labels align despite differing glyph widths.
  rowIcon: { width: rs(22), alignItems: 'center' },
  rowText: { flex: 1, gap: rs(3) },
  rowLabel: { fontSize: rs(14), fontFamily: 'HankenGrotesk_500Medium' },
  rowSub: { fontSize: rs(12), fontFamily: 'HankenGrotesk_400Regular' },
  rowRight: { flexDirection: 'row', alignItems: 'center', gap: rs(8) },
  rowValue: { fontSize: rs(14), fontFamily: 'HankenGrotesk_400Regular' },
  modePick: { flexDirection: 'row', alignItems: 'center', gap: rs(4), paddingVertical: rs(6), paddingStart: rs(10) },
  sliderWrap: { width: rs(140) },
  divider: { height: 1, marginHorizontal: rs(16) },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(26),
  },
  version: { fontSize: rs(13), fontFamily: 'HankenGrotesk_400Regular' },
});
