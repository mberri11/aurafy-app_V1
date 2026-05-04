import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Language, ThemeId } from '../types';

interface SettingsState {
  language: Language;
  themeId: ThemeId;
  unlockedThemes: ThemeId[];
  hapticsEnabled: boolean;
  animationsEnabled: boolean;
  soundEnabled: boolean;
  // Actions
  setLanguage: (lang: Language) => void;
  setTheme: (id: ThemeId) => void;
  unlockTheme: (id: ThemeId) => void;
  toggleHaptics: () => void;
  toggleAnimations: () => void;
  toggleSound: () => void;
  resetAll: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: 'en',
      themeId: 'cosmic',
      unlockedThemes: ['cosmic'],
      hapticsEnabled: true,
      animationsEnabled: true,
      soundEnabled: false,

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

      resetAll: (): void => {
        set({
          language: 'en',
          themeId: 'cosmic',
          unlockedThemes: ['cosmic'],
          hapticsEnabled: true,
          animationsEnabled: true,
          soundEnabled: false,
        });
      },
    }),
    {
      name: 'aurafy-settings',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
