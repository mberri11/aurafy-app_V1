import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Reading } from '../types';
import { ContentSlice, createContentSlice } from './contentSlice';

const MAX_STARS = 50;
const STARTING_STARS = 5;
const MAX_HISTORY = 20;
const MAX_TRANSACTIONS = 5;

interface StarTransaction {
  type: 'earn' | 'spend';
  amount: number;
  reason: string;
  timestamp: number;
}

// Includes the Insights content slice (readArticleIds, savedArticleIds,
// lastDailyBonusDate, markRead, toggleSaved, claimDailyInsightBonus) — composed
// in below and persisted in the same `aurafy-user` blob.
export interface UserState extends ContentSlice {
  stars: number;
  streak: number;
  lastDailyClaim: number | null;
  lastDailyQuestion: number | null;
  hasOnboarded: boolean;
  history: Reading[];
  recentTransactions: StarTransaction[];
  readingCount: number;
  /** True once the user has spent their one free-trial reading (FREE_TRIAL_MODULE_ID). */
  freeTrialUsed: boolean;
  // Actions
  spendStars: (amount: number) => boolean;
  markFreeTrialUsed: () => void;
  earnStars: (amount: number, reason: string) => void;
  claimDailyBonus: () => boolean;
  incrementStreak: () => void;
  addReading: (reading: Reading) => void;
  clearHistory: () => void;
  setOnboarded: () => void;
  incrementReadingCount: () => void;
  resetAll: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get, store) => ({
      // Insights content state + actions (readArticleIds, savedArticleIds,
      // lastDailyBonusDate, markRead, toggleSaved, claimDailyInsightBonus).
      ...createContentSlice(set, get, store),

      stars: STARTING_STARS,
      streak: 0,
      lastDailyClaim: null,
      lastDailyQuestion: null,
      hasOnboarded: false,
      history: [],
      // Seeded so the wallet's Recent activity isn't empty on a fresh install —
      // mirrors the "Welcome gift +5" row in the design. Reason is a stable key
      // (see reasonLabel in app/(tabs)/stars.tsx) so it localizes per language.
      recentTransactions: [
        { type: 'earn', amount: STARTING_STARS, reason: 'welcome', timestamp: Date.now() },
      ],
      readingCount: 0,
      freeTrialUsed: false,

      spendStars: (amount: number): boolean => {
        const { stars } = get();
        if (stars < amount) return false;
        set((s) => {
          const newStars = Math.max(0, s.stars - amount);
          const tx: StarTransaction = {
            type: 'spend',
            amount,
            reason: 'reading',
            timestamp: Date.now(),
          };
          return {
            stars: newStars,
            recentTransactions: [tx, ...s.recentTransactions].slice(0, MAX_TRANSACTIONS),
          };
        });
        return true;
      },

      earnStars: (amount: number, reason: string): void => {
        set((s) => {
          const newStars = Math.min(MAX_STARS, s.stars + amount);
          const tx: StarTransaction = {
            type: 'earn',
            amount,
            reason,
            timestamp: Date.now(),
          };
          return {
            stars: newStars,
            recentTransactions: [tx, ...s.recentTransactions].slice(0, MAX_TRANSACTIONS),
          };
        });
      },

      /** Returns false if already claimed today (within 24h). */
      claimDailyBonus: (): boolean => {
        const { lastDailyClaim } = get();
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000;

        if (lastDailyClaim !== null && now - lastDailyClaim < oneDay) {
          return false;
        }

        // Check if streak should be reset (gap > 48h since last claim)
        const twoDays = 48 * 60 * 60 * 1000;
        const shouldResetStreak = lastDailyClaim !== null && now - lastDailyClaim > twoDays;

        set((s) => {
          const newStreak = shouldResetStreak ? 1 : s.streak + 1;
          const tx: StarTransaction = {
            type: 'earn',
            amount: 2,
            reason: 'daily_bonus',
            timestamp: now,
          };
          return {
            stars: Math.min(MAX_STARS, s.stars + 2),
            streak: newStreak,
            lastDailyClaim: now,
            recentTransactions: [tx, ...s.recentTransactions].slice(0, MAX_TRANSACTIONS),
          };
        });
        return true;
      },

      incrementStreak: (): void => {
        set((s) => ({ streak: s.streak + 1 }));
      },

      addReading: (reading: Reading): void => {
        set((s) => {
          const newHistory = [reading, ...s.history].slice(0, MAX_HISTORY);
          return { history: newHistory };
        });
      },

      clearHistory: (): void => {
        set({ history: [] });
      },

      setOnboarded: (): void => {
        set({ hasOnboarded: true });
      },

      incrementReadingCount: (): void => {
        set((s) => ({ readingCount: s.readingCount + 1 }));
      },

      markFreeTrialUsed: (): void => {
        set({ freeTrialUsed: true });
      },

      resetAll: (): void => {
        set({
          stars: STARTING_STARS,
          streak: 0,
          lastDailyClaim: null,
          lastDailyQuestion: null,
          hasOnboarded: false,
          history: [],
          recentTransactions: [],
          readingCount: 0,
          freeTrialUsed: false,
          // Insights content slice
          readArticleIds: [],
          savedArticleIds: [],
          lastDailyBonusDate: null,
        });
      },
    }),
    {
      name: 'aurafy-user',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
