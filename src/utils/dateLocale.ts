// ─────────────────────────────────────────────────────────────────────────────
// dateLocale — keeps dayjs's active locale in sync with the app language so every
// rendered date localizes: History card dates (`.format('ll')`) and the "x days ago"
// relative times in Stars (`.fromNow()`). Registers the non-English locale data and
// the localizedFormat plugin (required for the `ll`/`LL` tokens). English is built in.
// ─────────────────────────────────────────────────────────────────────────────

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/fr';
import 'dayjs/locale/ar';
import 'dayjs/locale/es';

dayjs.extend(localizedFormat);

const SUPPORTED = ['en', 'fr', 'ar', 'es'];

/** Set dayjs's global locale to `lang` (falls back to English if unsupported). */
export function syncDayjsLocale(lang: string): void {
  dayjs.locale(SUPPORTED.includes(lang) ? lang : 'en');
}

// ── Reminder-time display localization (Arabic) ──────────────────────────────
// The STORED reminder value is always canonical Latin "h:mm AM/PM" so the scheduler
// (parseReminderTime) and the wheel parser stay stable across languages. These helpers
// only affect what the user SEES: Arabic-Indic numerals + صباحًا/مساءً for AM/PM.
const AR_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

/** Map Western digits in a string to Arabic-Indic numerals (leaves everything else). */
export function toArabicDigits(s: string): string {
  return s.replace(/[0-9]/g, (d) => AR_DIGITS[Number(d)]);
}

/** Arabic label for the AM/PM period — morning / evening (night) terms, not "AM/PM". */
export function arMeridiem(isPM: boolean): string {
  return isPM ? 'مساءً' : 'صباحًا';
}

/**
 * Format a canonical "h:mm AM/PM" reminder string for display in the current language.
 * Arabic → Arabic-Indic digits + صباحًا/مساءً; every other language → unchanged.
 */
export function formatReminderTimeDisplay(value: string, language: string): string {
  if (language !== 'ar') return value;
  const m = /(\d{1,2}):(\d{2})\s*(AM|PM)/i.exec(value);
  if (!m) return value;
  const isPM = m[3].toUpperCase() === 'PM';
  return `${toArabicDigits(m[1])}:${toArabicDigits(m[2])} ${arMeridiem(isPM)}`;
}
