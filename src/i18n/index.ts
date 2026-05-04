import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from './en.json';
import fr from './fr.json';
import ar from './ar.json';
import es from './es.json';

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

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      ar: { translation: ar },
      es: { translation: es },
    },
    lng: detectLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: 'v4',
  });

export default i18n;
