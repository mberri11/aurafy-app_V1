import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import { I18nManager } from 'react-native';

import en from './en.json';
import fr from './fr.json';
import ar from './ar.json';
import es from './es.json';
import { useSettingsStore } from '@/src/store/settingsStore';

const SUPPORTED_LANGUAGES = ['en', 'fr', 'ar', 'es'] as const;

/** Detect device language, fall back to 'en' if not supported. */
function detectLanguage(): string {
  try {
    const deviceLang = Localization.getLocales()[0]?.languageCode ?? 'en';
    const twoChar = deviceLang.slice(0, 2);
    return (SUPPORTED_LANGUAGES as readonly string[]).includes(twoChar) ? twoChar : 'en';
  } catch {
    return 'en';
  }
}

/** Apply RTL/LTR layout direction for a language (Arabic = RTL). Set the native flag
 *  UNCONDITIONALLY — don't gate on `I18nManager.isRTL`, which can read stale under Expo
 *  Go + the New Architecture and would then skip a needed flip. Takes effect on the next
 *  launch (RTL is a native flag). */
function applyDirection(lang: string): void {
  const shouldRTL = lang === 'ar';
  I18nManager.allowRTL(shouldRTL);
  I18nManager.forceRTL(shouldRTL);
}

/** Boot language: the persisted store value if it has already hydrated,
 *  otherwise the device language as a placeholder (re-synced in
 *  syncFromStore once hydration finishes). */
function initialLanguage(): string {
  const persisted = useSettingsStore.persist.hasHydrated()
    ? useSettingsStore.getState().language
    : null;
  return persisted ?? detectLanguage();
}

const bootLanguage = initialLanguage();

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      ar: { translation: ar },
      es: { translation: es },
    },
    lng: bootLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: 'v4',
  });

applyDirection(bootLanguage);

/** Pull the persisted language from the settings store (the single source of
 *  truth) into i18n + the native layout direction. */
function syncFromStore(): void {
  const lang = useSettingsStore.getState().language;
  if (lang && lang !== i18n.language) {
    void i18n.changeLanguage(lang);
  }
  applyDirection(lang);
}

// settingsStore persists to AsyncStorage and rehydrates asynchronously, so at
// module-eval time the persisted language usually isn't loaded yet. Re-sync once
// hydration finishes. If it already finished (warm import), sync immediately —
// this if/else is atomic relative to the async hydration callback.
if (useSettingsStore.persist.hasHydrated()) {
  syncFromStore();
} else {
  useSettingsStore.persist.onFinishHydration(syncFromStore);
}

export default i18n;
