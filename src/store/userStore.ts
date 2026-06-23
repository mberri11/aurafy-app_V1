import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Reading } from '../types';
import { ContentSlice, createContentSlice } from './contentSlice';

const MAX_STARS = 100;
const STARTING_STARS = 5;
const MAX_HISTORY = 20;
const MAX_TRANSACTIONS = 5;

// Stars economy (FINAL — see CLAUDE.md → Stars Economy).
const DAILY_RITUAL_REWARD = 1; // +1 per local day for the daily ritual
const STREAK_LENGTH = 7; // a full streak cycle is 7 consecutive days
const STREAK_BONUS_REWARD = 10; // +10 paid when the 7th day completes
const REWARDED_VIDEO_REWARD = 2; // +2 flat per rewarded video
const REWARDED_VIDEO_DAILY_CAP = 25; // max 25 videos/day → +50★/day ceiling

/** Local calendar-day key (YYYY-MM-DD, zero-padded). MUST stay byte-identical to
 *  `localDateKey` in src/content/articles/dailyInsight.ts — the reader and Home compare
 *  the ritual answer's stored date against THAT one, so a mismatched format silently
 *  breaks the daily-ritual lock (the answer never resolves as "done today"). */
function localDateKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

interface StarTransaction {
  type: 'earn' | 'spend';
  amount: number;
  reason: string;
  timestamp: number;
}

/** One completed daily ritual: the chosen daily-question answer + its weekly-lean axis.
 *  The weekly report (item 16) tallies the last STREAK_LENGTH of these. */
export interface DailyRitualAnswer {
  date: string; // local day the ritual was completed (localDateKey)
  questionId: string;
  answerIndex: number;
  dimension: string; // DailyDimension from src/data/dailyQuestions
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
  /** Rewarded videos already watched today + the local day they count for (daily cap). */
  rewardedToday: number;
  rewardedDate: string | null;
  /** The chosen answers from the last ≤7 completed daily rituals (feeds the weekly report). */
  dailyAnswers: DailyRitualAnswer[];
  // Actions
  spendStars: (amount: number) => boolean;
  markFreeTrialUsed: () => void;
  earnStars: (amount: number, reason: string) => void;
  /** Credits +2 for a rewarded video, enforcing the 25/day cap. Returns false when capped. */
  earnRewardedVideo: () => boolean;
  /** Claims the daily ritual (+1) plus the +10 bonus on the 7th consecutive day. Returns
   *  the total stars earned (0 if already claimed within the last 24h). */
  claimDailyBonus: () => number;
  /** Completes the merged daily ritual: records the chosen answer (when the day's claim
   *  fires) and runs claimDailyBonus. Returns the stars earned (0 if already done today). */
  completeDailyRitual: (answer: Omit<DailyRitualAnswer, 'date'>) => number;
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
      rewardedToday: 0,
      rewardedDate: null,
      dailyAnswers: [],

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

      earnRewardedVideo: (): boolean => {
        const todayKey = localDateKey();
        const { rewardedDate, rewardedToday } = get();
        const usedToday = rewardedDate === todayKey ? rewardedToday : 0;
        if (usedToday >= REWARDED_VIDEO_DAILY_CAP) return false;
        set((s) => {
          const tx: StarTransaction = {
            type: 'earn',
            amount: REWARDED_VIDEO_REWARD,
            reason: 'rewarded_ad',
            timestamp: Date.now(),
          };
          return {
            stars: Math.min(MAX_STARS, s.stars + REWARDED_VIDEO_REWARD),
            rewardedToday: usedToday + 1,
            rewardedDate: todayKey,
            recentTransactions: [tx, ...s.recentTransactions].slice(0, MAX_TRANSACTIONS),
          };
        });
        return true;
      },

      /** Claims the daily ritual (+1) plus the +10 bonus on the 7th consecutive day.
       *  Returns the total earned (0 if already claimed within the last 24h). The weekly
       *  report card + answer persistence land in Phase C (items 14/16). */
      claimDailyBonus: (): number => {
        const { lastDailyClaim, streak } = get();
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000;
        if (lastDailyClaim !== null && now - lastDailyClaim < oneDay) return 0;

        // Reset the streak if it's been more than 48h since the last claim (a missed day).
        const twoDays = 48 * 60 * 60 * 1000;
        const shouldResetStreak = lastDailyClaim !== null && now - lastDailyClaim > twoDays;

        let newStreak = shouldResetStreak ? 1 : streak + 1;
        let earned = DAILY_RITUAL_REWARD;
        const txs: StarTransaction[] = [
          { type: 'earn', amount: DAILY_RITUAL_REWARD, reason: 'daily_bonus', timestamp: now },
        ];

        // 7th consecutive day → pay the +10 streak bonus and start a fresh cycle.
        if (newStreak >= STREAK_LENGTH) {
          earned += STREAK_BONUS_REWARD;
          txs.unshift({ type: 'earn', amount: STREAK_BONUS_REWARD, reason: 'streak', timestamp: now });
          newStreak = 0;
        }

        set((s) => ({
          stars: Math.min(MAX_STARS, s.stars + earned),
          streak: newStreak,
          lastDailyClaim: now,
          recentTransactions: [...txs, ...s.recentTransactions].slice(0, MAX_TRANSACTIONS),
        }));
        return earned;
      },

      completeDailyRitual: (answer: Omit<DailyRitualAnswer, 'date'>): number => {
        // Run the once-per-day claim first; only record the answer if the claim actually
        // fired, so one completed ritual == one recorded answer per local day. The last
        // STREAK_LENGTH answers feed the weekly report (item 16); it handles their reset.
        const earned = get().claimDailyBonus();
        if (earned > 0) {
          const record: DailyRitualAnswer = { ...answer, date: localDateKey() };
          set((s) => ({
            dailyAnswers: [...s.dailyAnswers, record].slice(-STREAK_LENGTH),
            lastDailyQuestion: Date.now(),
          }));
        }
        return earned;
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
          rewardedToday: 0,
          rewardedDate: null,
          dailyAnswers: [],
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
