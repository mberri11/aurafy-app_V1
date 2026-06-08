import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Language, ReadingMode, ThemeId } from '../types';

interface SettingsState {
  language: Language;
  themeId: ThemeId;
  unlockedThemes: ThemeId[];
  hapticsEnabled: boolean;
  animationsEnabled: boolean;
  soundEnabled: boolean;
  ambientAudio: boolean;
  volume: number; // 0–1
  dailyReminder: boolean;
  reminderTime: string; // display string e.g. "9:00 PM"
  streakReminder: boolean;
  defaultMode: ReadingMode;
  showFrameworkTags: boolean;
  autoCentering: boolean;
  // Actions
  setLanguage: (lang: Language) => void;
  setTheme: (id: ThemeId) => void;
  unlockTheme: (id: ThemeId) => void;
  toggleHaptics: () => void;
  toggleAnimations: () => void;
  toggleSound: () => void;
  toggleAmbientAudio: () => void;
  setVolume: (v: number) => void;
  toggleDailyReminder: () => void;
  setReminderTime: (t: string) => void;
  toggleStreakReminder: () => void;
  setDefaultMode: (m: ReadingMode) => void;
  toggleShowFrameworkTags: () => void;
  toggleAutoCentering: () => void;
  resetAll: () => void;
}

const DEFAULTS = {
  language: 'en' as Language,
  themeId: 'cosmic' as ThemeId,
  unlockedThemes: ['cosmic'] as ThemeId[],
  hapticsEnabled: true,
  animationsEnabled: true,
  soundEnabled: true,
  ambientAudio: false,
  volume: 0.8,
  dailyReminder: true,
  reminderTime: '9:00 PM',
  streakReminder: true,
  defaultMode: 'compare' as ReadingMode,
  showFrameworkTags: true,
  autoCentering: true,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...DEFAULTS,

      setLanguage: (lang: Language): void => {
        set({ language: lang });
      },

      setTheme: (id: ThemeId): void => {
        set({ themeId: id });
      },

      unlockTheme: (id: ThemeId): void => {
        set((s) => ({
          unlockedThemes: s.unlockedThemes.includes(id)
            ? s.unlockedThemes
            : [...s.unlockedThemes, id],
        }));
      },

      toggleHaptics: (): void => {
        set((s) => ({ hapticsEnabled: !s.hapticsEnabled }));
      },

      toggleAnimations: (): void => {
        set((s) => ({ animationsEnabled: !s.animationsEnabled }));
      },

      toggleSound: (): void => {
        set((s) => ({ soundEnabled: !s.soundEnabled }));
      },

      toggleAmbientAudio: (): void => {
        set((s) => ({ ambientAudio: !s.ambientAudio }));
      },

      setVolume: (v: number): void => {
        set({ volume: Math.max(0, Math.min(1, v)) });
      },

      toggleDailyReminder: (): void => {
        set((s) => ({ dailyReminder: !s.dailyReminder }));
      },

      setReminderTime: (t: string): void => {
        set({ reminderTime: t });
      },

      toggleStreakReminder: (): void => {
        set((s) => ({ streakReminder: !s.streakReminder }));
      },

      setDefaultMode: (m: ReadingMode): void => {
        set({ defaultMode: m });
      },

      toggleShowFrameworkTags: (): void => {
        set((s) => ({ showFrameworkTags: !s.showFrameworkTags }));
      },

      toggleAutoCentering: (): void => {
        set((s) => ({ autoCentering: !s.autoCentering }));
      },

      resetAll: (): void => {
        set({ ...DEFAULTS });
      },
    }),
    {
      name: 'aurafy-settings',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
