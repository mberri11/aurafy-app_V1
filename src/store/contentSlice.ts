// ─────────────────────────────────────────────────────────────────────────────
// INSIGHTS — content state slice
// ─────────────────────────────────────────────────────────────────────────────
// Tracks read/saved articles and the read-to-earn daily reward. Composed INTO
// the existing persisted user store (`aurafy-user`) via the zustand slices
// pattern — see src/store/userStore.ts. It is NOT a separate persisted store, so
// read state survives restarts alongside stars/history.
//
// ECONOMY V1: reading the daily featured article grants +1 ✦ once per local day,
// gated (in the UI) behind a rewarded/interstitial ad. claimDailyInsightBonus()
// enforces the once-per-day rule and credits via the host store's earnStars.
// ─────────────────────────────────────────────────────────────────────────────

import type { StateCreator } from 'zustand';
import type { UserState } from './userStore';
import { localDateKey } from '../content/articles/dailyInsight';

/** Stable transaction reason key for the wallet's recent-activity list. */
export const INSIGHT_BONUS_REASON = 'insight_read';
const DAILY_INSIGHT_REWARD = 1;

export interface ContentSlice {
  /** Article ids the user has opened/read (drives the read-to-earn gate + History). */
  readArticleIds: string[];
  /** Article ids the user has bookmarked. */
  savedArticleIds: string[];
  /** Local YYYY-MM-DD of the last claimed daily-insight reward (distinct from lastDailyClaim). */
  lastDailyBonusDate: string | null;
  /** Mark an article read (idempotent). */
  markRead: (id: string) => void;
  /** Bookmark / un-bookmark an article. */
  toggleSaved: (id: string) => void;
  /**
   * Claim the once-per-day +1 ✦ for reading the daily featured article.
   * Returns false if already claimed today or the article hasn't been read.
   */
  claimDailyInsightBonus: (articleId: string) => boolean;
}

/**
 * Slice creator. Typed against the full UserState with the persist mutator so
 * `set`/`get` line up with the host store; `get().earnStars` credits the reward.
 * (UserState is imported type-only — no runtime cycle.)
 */
export const createContentSlice: StateCreator<
  UserState,
  [['zustand/persist', unknown]],
  [],
  ContentSlice
> = (set, get) => ({
  readArticleIds: [],
  savedArticleIds: [],
  lastDailyBonusDate: null,

  markRead: (id: string): void => {
    set((s) =>
      s.readArticleIds.includes(id)
        ? {}
        : { readArticleIds: [...s.readArticleIds, id] },
    );
  },

  toggleSaved: (id: string): void => {
    set((s) => ({
      savedArticleIds: s.savedArticleIds.includes(id)
        ? s.savedArticleIds.filter((x) => x !== id)
        : [...s.savedArticleIds, id],
    }));
  },

  claimDailyInsightBonus: (articleId: string): boolean => {
    const { lastDailyBonusDate, readArticleIds, earnStars } = get();
    const today = localDateKey();
    // Already claimed today, or the gate article hasn't been opened yet.
    if (lastDailyBonusDate === today) return false;
    if (!readArticleIds.includes(articleId)) return false;

    set({ lastDailyBonusDate: today });
    earnStars(DAILY_INSIGHT_REWARD, INSIGHT_BONUS_REASON);
    return true;
  },
});
