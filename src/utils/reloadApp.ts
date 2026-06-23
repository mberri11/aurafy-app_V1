import { DevSettings } from 'react-native';

/**
 * Reload the app so a native-only change takes effect — specifically the RTL/LTR layout
 * direction set via `I18nManager.forceRTL`, which only re-lays-out after a restart.
 *
 * - **Dev (Expo Go, `__DEV__`):** `DevSettings.reload()` reloads the JS bundle, but in
 *   Expo Go that does NOT re-apply `forceRTL` (the native Activity isn't recreated). So an
 *   Arabic ⇄ non-Arabic switch only mirrors after a **terminal reload (`r`) or a full
 *   kill+reopen**. This is an Expo Go limitation, not a production one.
 * - **Production (Phase D):** wire `expo-updates` `Updates.reloadAsync()` here — it does a
 *   full native restart that DOES apply `forceRTL`, so a language change mirrors cleanly and
 *   **automatically** (one seamless reload, no manual "please restart" prompt). Until that
 *   dep is installed this no-ops with a warning; the direction flag is already persisted, so
 *   it applies on the next app launch regardless.
 */
export function reloadApp(): void {
  if (__DEV__) {
    DevSettings.reload();
    return;
  }
  // eslint-disable-next-line no-console
  console.warn(
    '[reloadApp] Production reload needs expo-updates (Updates.reloadAsync) — not yet installed; ' +
      'the change applies on next app launch.',
  );
}
