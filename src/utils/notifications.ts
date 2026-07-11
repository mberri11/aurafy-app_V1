// ─────────────────────────────────────────────────────────────────────────────
// Local notifications (expo-notifications) — OFFLINE, no backend, no remote push.
//
// Two reminders, both scheduled purely on-device:
//   • DAILY reminder  — fires every day at the user's chosen `reminderTime`
//     (Settings → Notifications). Nudge to come answer tonight's question.
//   • STREAK reminder — fires at 23:00 (11 PM) ONLY on days the daily question is
//     still unanswered, so a user who already answered never gets nagged. Because
//     completing the ritual re-syncs (see callers), today's 11 PM reminder is
//     dropped the moment the user answers. Only scheduled while a streak exists
//     (streak ≥ 1) — there is nothing to "break" at streak 0.
//
// expo-notifications is a NATIVE module: it only works in a dev/standalone build that was
// REBUILT after this dep was added (a plain JS reload of an older binary won't contain it).
// Everything here is therefore lazy-loaded (dynamic import) and try/catch-guarded, so the rest
// of the app can never crash when the native side is absent — the caller just gets ok:false /
// a silent no-op.
// ─────────────────────────────────────────────────────────────────────────────

import { Platform } from 'react-native';
import i18n from '@/src/i18n';
import { logger } from './logger';

const ANDROID_CHANNEL = 'default';
const STREAK_HOUR = 23; // 11 PM — last call before the local day rolls over
const STREAK_LOOKAHEAD_DAYS = 7; // pre-schedule a week of 11 PM slots (each re-synced on use)

export type TestNotifyResult =
  | { ok: true }
  | { ok: false; reason: 'permission-denied' | 'unavailable' };

/**
 * Parse the stored display time ("9:00 PM", "21:00", "9 PM") into 24h {hour, minute}.
 * Falls back to 21:00 if the string is unexpected, so a reminder still fires.
 */
export function parseReminderTime(value: string): { hour: number; minute: number } {
  const m = value.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i);
  if (!m) return { hour: 21, minute: 0 };
  let hour = parseInt(m[1], 10);
  const minute = m[2] ? parseInt(m[2], 10) : 0;
  const meridiem = m[3]?.toLowerCase();
  if (meridiem === 'pm' && hour < 12) hour += 12;
  if (meridiem === 'am' && hour === 12) hour = 0;
  hour = Math.max(0, Math.min(23, hour));
  return { hour, minute: Math.max(0, Math.min(59, minute)) };
}

/** Request permission (once) and ensure the Android channel exists. Returns the
 *  loaded Notifications module + granted flag, or null when the native module is absent. */
async function prepare(): Promise<{ Notifications: typeof import('expo-notifications'); granted: boolean } | null> {
  try {
    const Notifications = await import('expo-notifications');

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync(ANDROID_CHANNEL, {
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
    return { Notifications, granted };
  } catch {
    return null;
  }
}

/** True when today's daily ritual has already been answered (local day). */
function answeredToday(): boolean {
  try {
    // Lazy requires — util layer must not statically import the stores (cycle risk).
    const { useUserStore } = require('@/src/store/userStore');
    const { localDateKey } = require('@/src/content/articles/dailyInsight');
    const today = localDateKey();
    return useUserStore.getState().dailyAnswers.some((a: { date: string }) => a.date === today);
  } catch {
    return false;
  }
}

function currentStreak(): number {
  try {
    const { useUserStore } = require('@/src/store/userStore');
    return useUserStore.getState().streak ?? 0;
  } catch {
    return 0;
  }
}

function readReminderSettings(): {
  dailyReminder: boolean;
  streakReminder: boolean;
  reminderTime: string;
} {
  try {
    const { useSettingsStore } = require('@/src/store/settingsStore');
    const s = useSettingsStore.getState();
    return {
      dailyReminder: s.dailyReminder,
      streakReminder: s.streakReminder,
      reminderTime: s.reminderTime,
    };
  } catch {
    return { dailyReminder: false, streakReminder: false, reminderTime: '9:00 PM' };
  }
}

/**
 * Re-schedule both reminders from the current settings + streak state. Idempotent:
 * cancels every previously scheduled reminder and lays them down fresh, so it's safe
 * to call on app start, after any Settings change, and after completing the ritual.
 *
 * Offline-honest streak logic: we pre-schedule the next few 11 PM slots and simply
 * OMIT today's when the question is already answered. Since answering re-syncs, the
 * moment the user completes the ritual today's 11 PM slot disappears.
 */
export async function syncReminders(): Promise<void> {
  const { dailyReminder, streakReminder, reminderTime } = readReminderSettings();

  const prepared = await prepare();
  if (!prepared) return; // native module unavailable (Expo Go / old binary)
  const { Notifications, granted } = prepared;

  try {
    // Always start clean — the app schedules no other local notifications.
    await Notifications.cancelAllScheduledNotificationsAsync();

    // No permission, or nothing to schedule → leave it cancelled.
    if (!granted || (!dailyReminder && !streakReminder)) return;

    // ── Daily reminder: repeats every day at the chosen time ──
    if (dailyReminder) {
      const { hour, minute } = parseReminderTime(reminderTime);
      await Notifications.scheduleNotificationAsync({
        content: {
          title: i18n.t('notify.dailyTitle'),
          body: i18n.t('notify.dailyBody'),
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
          hour,
          minute,
          channelId: ANDROID_CHANNEL,
        },
      });
    }

    // ── Streak reminder: 11 PM on unanswered days, only while a streak exists ──
    if (streakReminder && currentStreak() >= 1) {
      const skipToday = answeredToday();
      const now = new Date();
      for (let d = 0; d < STREAK_LOOKAHEAD_DAYS; d++) {
        const when = new Date(now);
        when.setDate(now.getDate() + d);
        when.setHours(STREAK_HOUR, 0, 0, 0);
        // Skip today's slot if already answered, or if 11 PM has already passed today.
        if (d === 0 && (skipToday || when.getTime() <= now.getTime())) continue;
        await Notifications.scheduleNotificationAsync({
          content: {
            title: i18n.t('notify.streakTitle'),
            body: i18n.t('notify.streakBody'),
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: when,
            channelId: ANDROID_CHANNEL,
          },
        });
      }
    }
  } catch (err) {
    logger.error('syncReminders failed:', err);
  }
}

/**
 * Fire a single local notification a few seconds out (background the app to see the banner).
 * Requests permission first and ensures an Android channel exists. Never throws — a missing
 * native module (older binary) resolves to { ok:false, reason:'unavailable' } so the dev panel
 * can show a friendly message instead of red-screening.
 */
export async function sendTestNotification(): Promise<TestNotifyResult> {
  const prepared = await prepare();
  if (!prepared) return { ok: false, reason: 'unavailable' };
  const { Notifications, granted } = prepared;
  if (!granted) return { ok: false, reason: 'permission-denied' };

  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: i18n.t('notify.dailyTitle'),
        body: i18n.t('notify.dailyBody'),
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 3,
        channelId: ANDROID_CHANNEL,
      },
    });
    return { ok: true };
  } catch {
    return { ok: false, reason: 'unavailable' };
  }
}
