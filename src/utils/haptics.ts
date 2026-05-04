import * as Haptics from 'expo-haptics';

/**
 * Thin wrapper around expo-haptics.
 * All functions check settingsStore.hapticsEnabled before firing.
 * Lazily imports settingsStore to avoid circular deps at module load.
 */

function isHapticsEnabled(): boolean {
  try {
    // Lazy import to avoid circular dependency
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { useSettingsStore } = require('../store/settingsStore');
    return useSettingsStore.getState().hapticsEnabled;
  } catch {
    return true;
  }
}

export function lightTap(): void {
  try {
    if (!isHapticsEnabled()) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  } catch {
    // silent
  }
}

export function mediumTap(): void {
  try {
    if (!isHapticsEnabled()) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  } catch {
    // silent
  }
}

export function heavyTap(): void {
  try {
    if (!isHapticsEnabled()) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  } catch {
    // silent
  }
}

export function successNotification(): void {
  try {
    if (!isHapticsEnabled()) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  } catch {
    // silent
  }
}
