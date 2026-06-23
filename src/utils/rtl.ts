import { useTranslation } from 'react-i18next';
import i18n from '@/src/i18n';

/**
 * RTL derived from the ACTIVE LANGUAGE — deliberately NOT `I18nManager.isRTL`.
 *
 * In Expo Go + the New Architecture, the native layout mirrors correctly after a
 * `forceRTL` + full relaunch, but the JS `I18nManager.isRTL` constant can report
 * the wrong (stale LTR) value. Any JS-side RTL branch that trusts that flag —
 * thumb travel, fill side, chevron glyph — then renders LTR *inside* an otherwise
 * mirrored screen. The user's selected language is the reliable source of truth
 * (Arabic ⇒ RTL), and after the restart it always matches the native direction.
 */
export function isRTLLang(lang?: string | null): boolean {
  return (lang ?? i18n.language ?? '').toLowerCase().startsWith('ar');
}

/** Reactive RTL flag for components (re-renders on language change). */
export function useIsRTL(): boolean {
  const { i18n: active } = useTranslation();
  return isRTLLang(active.language);
}
