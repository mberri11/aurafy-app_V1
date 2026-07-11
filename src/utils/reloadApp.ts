import { DevSettings } from 'react-native';
import { logger } from './logger';

/**
 * Reload the app so a native-only change takes effect — specifically the RTL/LTR layout
 * direction set via `I18nManager.forceRTL`, which only re-lays-out after a restart. Also
 * used after Reset all data / Clear history so no stale in-memory UI lingers.
 *
 * - **Dev (Expo Go / dev client, `__DEV__`):** `DevSettings.reload()` reloads the JS bundle.
 *   In Expo Go that does NOT re-apply `forceRTL` (the native Activity isn't recreated), so an
 *   Arabic ⇄ non-Arabic switch only fully mirrors after a terminal reload (`r`) or a full
 *   kill+reopen. This is an Expo Go limitation, not a production one.
 * - **Production:** `expo-updates` `Updates.reloadAsync()` does a full native restart that DOES
 *   re-apply `forceRTL`, so a language change mirrors cleanly and automatically (one seamless
 *   reload, no manual "please restart" step). Lazy-imported + guarded: if the native module is
 *   absent or updates are disabled it logs and falls back to the persisted flag applying on the
 *   next manual launch — startup can never crash on this path.
 */
export function reloadApp(): void {
  if (__DEV__) {
    DevSettings.reload();
    return;
  }
  // Production: true native restart via expo-updates. Fire-and-forget; never throws upward.
  void (async () => {
    try {
      const Updates = await import('expo-updates');
      await Updates.reloadAsync();
    } catch (err) {
      logger.warn(
        '[reloadApp] expo-updates reload unavailable — change applies on next app launch:',
        err,
      );
    }
  })();
}
