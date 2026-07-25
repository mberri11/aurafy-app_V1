// ─────────────────────────────────────────────────────────────────────────────
// Local notifications (expo-notifications) — OFFLINE, no backend, no remote push.
//
// FOUR kinds, all scheduled purely on-device:
//
//   RITUAL nudges (i18n `notify.*` chrome, fixed copy):
//   • DAILY reminder  — every day at the user's chosen `reminderTime`
//     (Settings → Notifications). "Tonight's quote is waiting…"
//   • STREAK reminder — 22:00 (10 PM) ONLY on days the quote is still unread, so a
//     user who already tapped Done never gets nagged. Completing the ritual re-syncs
//     (see callers), so today's 10 PM slot is dropped the moment they finish. Only
//     scheduled while a streak exists (streak ≥ 1) — nothing to "break" at streak 0.
//
//   DISCOVERY teasers (rotating copy from src/content/notifications):
//   • NOON  teaser — 12:00 daily, daytime framing, sells a reading module.
//   • NIGHT teaser — 23:00 daily, after-dark framing, sells a reading module.
//     Both pick deterministically off the local date, so the copy changes day to day
//     and never repeats inside a week. They are pre-scheduled as dated one-shots
//     (a repeating DAILY trigger cannot carry different copy each day).
//
// Every sync cancels everything and re-lays the whole schedule, so the pre-scheduled
// window stays fresh and today's slots reflect the current read state.
//
// expo-notifications is a NATIVE module: it only works in a dev/standalone build that was
// REBUILT after this dep was added (a plain JS reload of an older binary won't contain it).
// Everything here is therefore lazy-loaded (dynamic import) and try/catch-guarded, so the rest
// of the app can never crash when the native side is absent — the caller just gets ok:false /
// a silent no-op.
// ─────────────────────────────────────────────────────────────────────────────

import { Platform } from 'react-native';
import i18n from '@/src/i18n';
import type { LocalizedString } from '@/src/types';
import { getTeaserForDay, type TeaserSlot } from '@/src/content/notifications';
import { localDateKey } from './date';
import { logger } from './logger';

// Dev-only structural guard: a teaser pointing at a comingSoon/nonexistent module would
// deep-link into a locked screen, and a missing locale would fire an empty push. Both are
// invisible until a user reports it, so fail loudly here at import time.
if (__DEV__) {
  const { MODULES } = require('@/src/data/modules');
  const { validateTeasers } = require('@/src/content/notifications');
  const live = new Set<string>(
    MODULES.filter((m: { comingSoon?: boolean }) => !m.comingSoon).map((m: { id: string }) => m.id),
  );
  const problems = validateTeasers(live);
  if (problems.length) console.warn('[notifications] validateTeasers:', problems.join(' · '));
}

const ANDROID_CHANNEL = 'default';
const STREAK_HOUR = 22; // 10 PM — the "you haven't read today's quote" last call
const NOON_HOUR = 12; // 12 PM — daytime discovery teaser
const NIGHT_HOUR = 23; // 11 PM — after-dark discovery teaser
const LOOKAHEAD_DAYS = 7; // pre-schedule a week of dated slots (re-laid on every sync)

export type TestNotifyResult =
  | { ok: true }
  | { ok: false; reason: 'permission-denied' | 'unavailable' };

/** Which notification a dev-panel test button should fire. */
export type NotifyKind = 'quote' | 'streak' | 'noon' | 'night';

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

/** True when today's daily ritual (the quote) has already been completed (local day). */
function answeredToday(): boolean {
  try {
    // Lazy require — util layer must not statically import the stores (cycle risk).
    // The done-today rule itself lives in userStore.isRitualDoneToday so this and every
    // screen share ONE definition; it reads lastDailyClaim, not dailyAnswers (which the
    // quote ritual no longer writes).
    const { useUserStore, isRitualDoneToday } = require('@/src/store/userStore');
    return isRitualDoneToday(useUserStore.getState().lastDailyClaim);
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

    const now = new Date();
    /** A dated slot `d` days out at `hour`, or null when it is already past. */
    const slotAt = (d: number, hour: number): Date | null => {
      const when = new Date(now);
      when.setDate(now.getDate() + d);
      when.setHours(hour, 0, 0, 0);
      return when.getTime() <= now.getTime() ? null : when;
    };
    const scheduleAt = (when: Date, title: string, body: string, data?: Record<string, string>) =>
      Notifications.scheduleNotificationAsync({
        content: { title, body, ...(data ? { data } : {}) },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: when,
          channelId: ANDROID_CHANNEL,
        },
      });

    // ── Streak reminder: 10 PM on days the quote is still unread ──
    if (streakReminder && currentStreak() >= 1) {
      const skipToday = answeredToday();
      for (let d = 0; d < LOOKAHEAD_DAYS; d++) {
        const when = slotAt(d, STREAK_HOUR);
        // Today's slot is dropped once the quote is done (answering re-syncs this).
        if (!when || (d === 0 && skipToday)) continue;
        await scheduleAt(when, i18n.t('notify.streakTitle'), i18n.t('notify.streakBody'));
      }
    }

    // ── Discovery teasers: 12 PM + 11 PM, rotating module copy ──
    // Gated on the same `dailyReminder` switch as the quote nudge — one "may Aurafy
    // notify me" control rather than a silent second channel the user can't turn off.
    if (dailyReminder) {
      const lang = (i18n.language as keyof LocalizedString) || 'en';
      const L = (s: LocalizedString) => s[lang] ?? s.en;
      for (let d = 0; d < LOOKAHEAD_DAYS; d++) {
        const day = new Date(now);
        day.setDate(now.getDate() + d);
        const key = localDateKey(day);
        for (const [slot, hour] of [
          ['noon', NOON_HOUR],
          ['night', NIGHT_HOUR],
        ] as [TeaserSlot, number][]) {
          const when = slotAt(d, hour);
          if (!when) continue;
          const teaser = getTeaserForDay(key, slot);
          // `data.moduleId` is the deep-link payload for a future tap-through handler.
          await scheduleAt(when, L(teaser.title), L(teaser.body), {
            kind: slot,
            moduleId: teaser.moduleId,
          });
        }
      }
    }
  } catch (err) {
    logger.error('syncReminders failed:', err);
  }
}

/**
 * Resolve the exact title/body a given kind would fire TODAY. Pure — the dev panel uses
 * it both to preview the copy on screen and to fire the matching test notification, so
 * what you read in the panel is byte-identical to what lands in the tray.
 */
export function previewNotification(kind: NotifyKind, date: Date = new Date()): {
  title: string;
  body: string;
} {
  if (kind === 'quote') {
    return { title: i18n.t('notify.dailyTitle'), body: i18n.t('notify.dailyBody') };
  }
  if (kind === 'streak') {
    return { title: i18n.t('notify.streakTitle'), body: i18n.t('notify.streakBody') };
  }
  const lang = (i18n.language as keyof LocalizedString) || 'en';
  const teaser = getTeaserForDay(localDateKey(date), kind);
  return {
    title: teaser.title[lang] ?? teaser.title.en,
    body: teaser.body[lang] ?? teaser.body.en,
  };
}

/**
 * Fire ONE local notification a few seconds out (background the app to see the banner).
 * `kind` selects which of the four the dev panel is testing; it defaults to the quote
 * reminder so existing callers keep their behaviour.
 *
 * Requests permission first and ensures an Android channel exists. Never throws — a missing
 * native module (older binary) resolves to { ok:false, reason:'unavailable' } so the dev panel
 * can show a friendly message instead of red-screening.
 */
export async function sendTestNotification(kind: NotifyKind = 'quote'): Promise<TestNotifyResult> {
  const prepared = await prepare();
  if (!prepared) return { ok: false, reason: 'unavailable' };
  const { Notifications, granted } = prepared;
  if (!granted) return { ok: false, reason: 'permission-denied' };

  try {
    const { title, body } = previewNotification(kind);
    await Notifications.scheduleNotificationAsync({
      content: { title, body },
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

/** Dev-panel readout: every pending local notification, soonest first. */
export async function listScheduled(): Promise<{ when: string; title: string }[]> {
  const prepared = await prepare();
  if (!prepared) return [];
  try {
    const all = await prepared.Notifications.getAllScheduledNotificationsAsync();
    return all
      .map((n) => {
        const tr = n.trigger as { date?: number; hour?: number; minute?: number } | null;
        const when = tr?.date
          ? new Date(tr.date).toLocaleString(undefined, {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })
          : tr?.hour != null
            ? `daily ${String(tr.hour).padStart(2, '0')}:${String(tr.minute ?? 0).padStart(2, '0')}`
            : '—';
        return { when, title: n.content.title ?? '(no title)', sort: tr?.date ?? 0 };
      })
      .sort((a, b) => a.sort - b.sort)
      .map(({ when, title }) => ({ when, title }));
  } catch {
    return [];
  }
}
