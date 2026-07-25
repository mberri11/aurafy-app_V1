import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Reading } from '../types';
import { ContentSlice, createContentSlice } from './contentSlice';
import { localDateKey } from '@/src/utils/date';

const MAX_STARS = 100;
const STARTING_STARS = 5;
const MAX_HISTORY = 20;
const MAX_TRANSACTIONS = 5;

// Stars economy (FINAL — see CLAUDE.md → Stars Economy).
const DAILY_RITUAL_REWARD = 1; // +1 per local day for the daily ritual
const STREAK_LENGTH = 7; // a full streak cycle is 7 consecutive days
const STREAK_BONUS_REWARD = 5; // +5 paid when the 7th ritual completes (after the reveal)
const SIX_DAYS_MS = 6 * 24 * 60 * 60 * 1000; // span of the 7 nights (inclusive) for a saved weekly entry
const REWARDED_VIDEO_REWARD = 2; // +2 flat per rewarded video
const REWARDED_VIDEO_DAILY_CAP = 25; // max 25 videos/day → +50★/day ceiling
// Keep enough recent answers that a full anchor week (≤7) is always intact for the day-7
// tally even with a stale tail from the previous week (week-filtered before tallying).
const MAX_DAILY_ANSWERS = 14;

/** Epoch ms at the START of the given local calendar day (local midnight). The C-10
 *  curriculum anchor (`weekAnchorDate`) is pinned here, not at the raw ritual moment,
 *  so the walker's day count rolls over at local midnight — keeping the daily
 *  article/question in step with the calendar day and the localDateKey ritual gate. */
function startOfLocalDay(d: Date = new Date()): number {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

interface StarTransaction {
  type: 'earn' | 'spend';
  amount: number;
  reason: string;
  timestamp: number;
}

/** The seeded "Welcome gift +5" wallet row — present on a fresh install AND after a reset, so
 *  the Stars screen's Recent activity always shows the gift that granted the starting balance. */
const welcomeTransaction = (): StarTransaction => ({
  type: 'earn',
  amount: STARTING_STARS,
  reason: 'welcome',
  timestamp: Date.now(),
});

/** One completed daily ritual: the chosen daily-question answer + its weekly-lean axis.
 *  The weekly report (item 16) tallies the last STREAK_LENGTH of these. */
export interface DailyRitualAnswer {
  date: string; // local day the ritual was completed (localDateKey)
  questionId: string;
  answerIndex: number;
  dimension: string; // DailyDimension today; the week-local outcome key under C-10
  /** C-10: id of the curriculum week active when this ritual was completed. The day-7
   *  tally counts ONLY answers tagged with the claimed week's id, so a slow (forgiving)
   *  cycle that spans a week boundary never pollutes the next week's result. Absent on
   *  answers persisted before week-tagging shipped — those are excluded from tallies. */
  weekId?: string;
}

/** C-10 — the most recently claimed weekly result (pending-reveal → claimed tracking).
 *  This singleton is overwritten every cycle; it is NOT what powers History reopens —
 *  every completed week is saved as its own entry in `weeklyHistory` below, and ALL of
 *  those (not just the latest) reopen read-only from History indefinitely (capped at
 *  MAX_HISTORY, same as reading history). */
export interface WeeklyResult {
  weekId: string;
  outcomeKey: string;
  claimedAt: number;
}

/** A completed week saved to History as a distinct "Weekly reading" entry
 *  (DESIGN-SPEC §6/§7). Title/category resolve at render via getWeekById. */
export interface WeeklyHistoryEntry {
  id: string;
  weekId: string;
  outcomeKey: string;
  rangeStart: number; // epoch ms — first of the 7 nights
  rangeEnd: number; // epoch ms — last night (claim day)
  createdAt: number; // epoch ms — when saved (claim time)
}

/**
 * THE single "has today's ritual already been completed" signal (local day).
 *
 * Derived from `lastDailyClaim` — NOT from `dailyAnswers`, which the quote ritual no
 * longer writes to (2026-07-25). Every surface that shows a done/undone daily state
 * MUST read this, so the Home card, the Stars card, the quote screen and the streak
 * notification can never disagree about which day it is.
 */
export function isRitualDoneToday(lastDailyClaim: number | null, at: Date = new Date()): boolean {
  if (lastDailyClaim === null) return false;
  return localDateKey(new Date(lastDailyClaim)) === localDateKey(at);
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
  weeklyHistory: WeeklyHistoryEntry[];
  recentTransactions: StarTransaction[];
  readingCount: number;
  /** True once the user has spent their one free-trial reading (FREE_TRIAL_MODULE_ID). */
  freeTrialUsed: boolean;
  /** Every module id the user has EVER completed a reading of — unlike `history`
   *  (capped at MAX_HISTORY) this never forgets, so question pooling can tell a
   *  genuine first reading (curated core set) from a repeat (varied set). */
  completedModuleIds: string[];
  /** Ids of paid modules (Module.unlockCost) the user has permanently unlocked. Persisted. */
  unlockedModules: string[];
  /** Rewarded videos already watched today + the local day they count for (daily cap). */
  rewardedToday: number;
  rewardedDate: string | null;
  /** The chosen answers from recent completed daily rituals (feeds the weekly tally). */
  dailyAnswers: DailyRitualAnswer[];
  /** C-10 curriculum anchor: epoch ms at local midnight of the user's FIRST-EVER completed
   *  daily ritual. Set once, never overwritten. The walker paces dayIndex/weekIndex off this
   *  (daysSinceAnchor = floor((now - anchor)/86_400_000)) so a user starting on any weekday
   *  begins at Day 0 / Week 0. Null until the first ritual → walker defaults to Day 0/Week 0. */
  weekAnchorDate: number | null;
  /** C-10 forced-week override (promo hook): when set, the NEXT fresh weekly cycle resolves
   *  to this week id, then auto-clears. Slot built now; unused until the pilot. */
  forcedNextWeekId: string | null;
  /** C-10 last completed weekly result — drives the fresh reveal's claim-once-per-cycle
   *  guard, NOT History reopening (that's `weeklyHistory`, every past week, read-only,
   *  indefinitely). Written by the day-7 reveal (pilot); null until then. */
  weeklyResult: WeeklyResult | null;
  // Actions
  /** Deducts stars and logs the spend under the caller's reason key (see reasonLabel in
   *  app/(tabs)/stars.tsx: 'reading' | 'result_unlock' | 'theme_unlock' | …). */
  spendStars: (amount: number, reason: string) => boolean;
  markFreeTrialUsed: () => void;
  /** Un-burns the free trial after an abandoned reading (no result was delivered). */
  restoreFreeTrial: () => void;
  /** Permanently unlock a paid module: spends `cost` under 'module_unlock' and records the id.
   *  Returns false (no charge) when the balance is short; idempotent for an already-owned id. */
  unlockModule: (id: string, cost: number) => boolean;
  earnStars: (amount: number, reason: string) => void;
  /** Credits +2 for a rewarded video, enforcing the 25/day cap. Returns false when capped. */
  earnRewardedVideo: () => boolean;
  /** DAILY QUOTE ritual (FORGIVING streak): advances the streak by +1 (a missed day holds it,
   *  never resets — no insurance, no cost) and pays the +1 daily. Completing the 7th ritual of a
   *  cycle ALSO pays the +5 streak bonus and rolls the streak back to 0.
   *  Takes no answer — the ritual is read-the-quote-and-tap-Done (2026-07-25); there is no daily
   *  question, no weekly outcome, and `dailyAnswers` is no longer written.
   *  `at` defaults to now; the dev panel injects a simulated date. Returns the TOTAL stars earned
   *  (1 normally, 6 on the 7th day, 0 if already done today or the clock ran backwards). */
  completeDailyRitual: (at?: Date) => number;
  /** Claims the staged day-7 weekly result: pays the +5 streak bonus, rolls the streak back to
   *  0, and marks the result claimed (clearing any forced-week override). Must run AFTER the
   *  reveal is shown — the +5 is never paid before it. Returns the +5 (0 if none pending). */
  claimWeeklyResult: () => number;
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
      weeklyHistory: [],
      // Seeded so the wallet's Recent activity isn't empty on a fresh install —
      // mirrors the "Welcome gift +5" row in the design. Reason is a stable key
      // (see reasonLabel in app/(tabs)/stars.tsx) so it localizes per language.
      recentTransactions: [welcomeTransaction()],
      readingCount: 0,
      freeTrialUsed: false,
      completedModuleIds: [],
      unlockedModules: [],
      rewardedToday: 0,
      rewardedDate: null,
      dailyAnswers: [],
      weekAnchorDate: null,
      forcedNextWeekId: null,
      weeklyResult: null,

      spendStars: (amount: number, reason: string): boolean => {
        const { stars } = get();
        if (stars < amount) return false;
        set((s) => {
          const newStars = Math.max(0, s.stars - amount);
          const tx: StarTransaction = {
            type: 'spend',
            amount,
            reason,
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

      // ── DAILY QUOTE RITUAL · FORGIVING STREAK ───────────────────────────────────────
      // The ritual is now: open the daily quote → read → tap Done. No question, no answer,
      // no weekly outcome (2026-07-25).
      //
      // Streak is a "rituals completed this cycle" counter (0..STREAK_LENGTH): each completed
      // ritual is +1, and a MISSED day never resets it — the streak just HOLDS until the next
      // Done, then resumes climbing. No insurance, no Stars cost, no punishment (Simo,
      // 2026-06-28). Completing the 7th pays the +5 streak bonus HERE and rolls the cycle back
      // to 0 — the weekly-result reveal no longer exists to pay it, so the bonus moved onto the
      // 7th day itself at the SAME amount (STREAK_BONUS_REWARD, unchanged).
      //
      // The curriculum anchor is still pinned on the first-ever ritual: it paces the daily
      // quote (getTodayQuote) exactly as it paced the article/question pairing.
      completeDailyRitual: (at: Date = new Date()): number => {
        // `at` is the completion moment — real `new Date()` in production; the dev panel
        // injects a simulated date to fast-forward days. Both the localDateKey gate AND the
        // anchor pinning read from `at`, so a simulated day is internally consistent.
        const s = get();
        const nowMs = at.getTime();
        // Anti-exploit: a backwards clock (now earlier than the last recorded ritual) earns
        // nothing and never advances the streak.
        if (s.lastDailyClaim !== null && nowMs < s.lastDailyClaim) return 0;
        // Idempotent once per local day. Derived from lastDailyClaim via isRitualDoneToday —
        // `dailyAnswers` can no longer serve as the day marker because the ritual stopped
        // writing to it.
        if (isRitualDoneToday(s.lastDailyClaim, at)) return 0;

        // Pin the curriculum anchor on the FIRST-EVER ritual (local midnight); never overwrite.
        const anchor = s.weekAnchorDate ?? startOfLocalDay(at);

        // Forgiving streak: +1 per ritual. Completing the 7th closes the cycle (back to 0).
        const nextStreak = s.streak + 1;
        const cycleComplete = nextStreak >= STREAK_LENGTH;
        const streak = cycleComplete ? 0 : nextStreak;

        // +1 daily, plus the +5 streak bonus on the 7th (same amount the weekly reveal paid).
        const bonus = cycleComplete ? STREAK_BONUS_REWARD : 0;
        const earned = DAILY_RITUAL_REWARD + bonus;

        // Newest-first: the bonus row sits above the daily row when both land together.
        const txs: StarTransaction[] = [
          { type: 'earn', amount: DAILY_RITUAL_REWARD, reason: 'daily_bonus', timestamp: nowMs },
        ];
        if (bonus > 0) {
          txs.unshift({ type: 'earn', amount: bonus, reason: 'streak', timestamp: nowMs });
        }

        set({
          stars: Math.min(MAX_STARS, s.stars + earned),
          streak,
          weekAnchorDate: anchor,
          lastDailyClaim: nowMs, // the day marker + backwards-clock guard
          lastDailyQuestion: nowMs,
          recentTransactions: [...txs, ...s.recentTransactions].slice(0, MAX_TRANSACTIONS),
        });
        return earned;
      },

      claimWeeklyResult: (): number => {
        const s = get();
        const wr = s.weeklyResult;
        if (!wr || wr.claimedAt !== 0) return 0; // nothing pending to reveal/claim
        const now = Date.now();
        const tx: StarTransaction = {
          type: 'earn',
          amount: STREAK_BONUS_REWARD,
          reason: 'streak',
          timestamp: now,
        };
        // Save the completed week to History as a distinct entry — here (not on
        // screen close) so a back-swipe out of the reveal can't skip it. The
        // claimedAt !== 0 guard above makes this fire exactly once per week.
        const weeklyEntry: WeeklyHistoryEntry = {
          id: `${wr.weekId}-${now}`,
          weekId: wr.weekId,
          outcomeKey: wr.outcomeKey,
          rangeStart: now - SIX_DAYS_MS, // 7 nights, inclusive of today
          rangeEnd: now,
          createdAt: now,
        };
        set({
          stars: Math.min(MAX_STARS, s.stars + STREAK_BONUS_REWARD),
          // Roll the forgiving streak back to 0 to begin the next 7-ritual cycle. The walker
          // advances the WEEK by anchor date; forcedNextWeekId (promo override) clears here.
          streak: 0,
          weeklyResult: { ...wr, claimedAt: now },
          weeklyHistory: [weeklyEntry, ...s.weeklyHistory].slice(0, MAX_HISTORY),
          forcedNextWeekId: null,
          recentTransactions: [tx, ...s.recentTransactions].slice(0, MAX_TRANSACTIONS),
        });
        return STREAK_BONUS_REWARD;
      },

      addReading: (reading: Reading): void => {
        set((s) => {
          const newHistory = [reading, ...s.history].slice(0, MAX_HISTORY);
          return {
            history: newHistory,
            completedModuleIds: s.completedModuleIds.includes(reading.moduleId)
              ? s.completedModuleIds
              : [...s.completedModuleIds, reading.moduleId],
          };
        });
      },

      clearHistory: (): void => {
        set({ history: [], weeklyHistory: [] });
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

      restoreFreeTrial: (): void => {
        set({ freeTrialUsed: false });
      },

      unlockModule: (id: string, cost: number): boolean => {
        const { stars, unlockedModules, spendStars } = get();
        if (unlockedModules.includes(id)) return true; // already owned — never double-charge
        if (stars < cost) return false;
        // spendStars logs the 'module_unlock' wallet row and re-checks the balance.
        if (!spendStars(cost, 'module_unlock')) return false;
        set((s) => ({ unlockedModules: [...s.unlockedModules, id] }));
        return true;
      },

      resetAll: (): void => {
        set({
          stars: STARTING_STARS,
          streak: 0,
          lastDailyClaim: null,
          lastDailyQuestion: null,
          hasOnboarded: false,
          history: [],
          weeklyHistory: [],
          // Re-seed the welcome +5 row so a reset wallet shows the gift, matching a fresh install.
          recentTransactions: [welcomeTransaction()],
          readingCount: 0,
          freeTrialUsed: false,
          completedModuleIds: [],
          unlockedModules: [],
          rewardedToday: 0,
          rewardedDate: null,
          dailyAnswers: [],
          weekAnchorDate: null,
          forcedNextWeekId: null,
          weeklyResult: null,
          // Insights content slice
          readArticleIds: [],
          savedArticleIds: [],
          lastDailyBonusDate: null,
        });
      },
    }),
    {
      // RENAMED from 'aurafy-user' (2026-07-25, daily-quote migration). A NEW key, not a
      // version bump on the old one: adding `version` to the pre-existing key would have made
      // zustand read every existing blob as version `undefined` and — with no migrate fn —
      // discard it, silently wiping stars, streak, history and unlocks (audit Risk 7).
      // A fresh key means existing installs simply start clean, which is the approved
      // behaviour here (testers only). The old 'aurafy-user' blob is left untouched on disk.
      // NO migrate function by design — do not add one without a matching version bump.
      name: 'aurafy-user-v2',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
