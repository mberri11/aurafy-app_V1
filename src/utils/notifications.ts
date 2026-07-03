// ─────────────────────────────────────────────────────────────────────────────
// Local notifications (expo-notifications) — OFFLINE, no backend, no remote push.
//
// SCOPE TODAY: only a dev-panel TEST trigger, so the device can be checked for whether
// notifications fire at all. The real daily "answer your reading" reminder (scheduled at the
// user's chosen reminderTime, toggled from Settings, the thing that keeps the forgiving streak
// honest) is a LOGGED FOLLOW-UP — see docs/BUILD-STATUS.md → "Daily reminder notification" —
// and is intentionally NOT wired here yet.
//
// expo-notifications is a NATIVE module: it only works in a dev/standalone build that was
// REBUILT after this dep was added (a plain JS reload of an older binary won't contain it).
// Everything here is therefore lazy-loaded (dynamic import) and try/catch-guarded, so the rest
// of the app can never crash when the native side is absent — the caller just gets ok:false.
// ─────────────────────────────────────────────────────────────────────────────

import { Platform } from 'react-native';

export type TestNotifyResult =
  | { ok: true }
  | { ok: false; reason: 'permission-denied' | 'unavailable' };

/**
 * Fire a single local notification a few seconds out (background the app to see the banner).
 * Requests permission first and ensures an Android channel exists. Never throws — a missing
 * native module (older binary) resolves to { ok:false, reason:'unavailable' } so the dev panel
 * can show a friendly message instead of red-screening.
 */
export async function sendTestNotification(): Promise<TestNotifyResult> {
  try {
    const Notifications = await import('expo-notifications');

    // Present a banner even when the app is foregrounded (so the test is visible immediately).
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    // Android needs a channel for the notification to surface with sound/heads-up.
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'Daily reminders',
        importance: Notifications.AndroidImportance.DEFAULT,
      });
    }

    const current = await Notifications.getPermissionsAsync();
    let granted = current.granted || current.status === 'granted';
    if (!granted) {
      const req = await Notifications.requestPermissionsAsync();
      granted = req.granted || req.status === 'granted';
    }
    if (!granted) return { ok: false, reason: 'permission-denied' };

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Aurafy ✦',
        body: "Tonight's reading is ready — answer to keep your streak alive.",
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 3,
        channelId: 'default',
      },
    });
    return { ok: true };
  } catch {
    return { ok: false, reason: 'unavailable' };
  }
}
