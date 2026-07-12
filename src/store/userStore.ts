import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Reading } from '../types';
import { ContentSlice, createContentSlice } from './contentSlice';
// C-10 anchor-day-status machine: the daily ritual is paced off the curriculum anchor
// (NOT a wall clock). The store may import the walker — the walker never imports the
// store, so there is no require cycle.
import { getActiveWeek } from '@/src/data/weeks/walker';

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
 * PURE (C-10): tally outcome keys over the last ≤7 ritual answers — highest count
 * wins, tiebroken by order in `outcomes` (earliest-defined outcome wins a tie).
 * Exported for the day-7 weekly reveal; NOT wired into the live ritual flow in this
 * pass. In the C-10 model `answers[].dimension` holds the week-local outcome key.
 */
export function tallyWeeklyOutcome(
  answers: { dimension: string }[],
  outcomes: { key: string }[],
): string {
  const counts = new Map<string, number>();
  for (const a of answers) counts.set(a.dimension, (counts.get(a.dimension) ?? 0) + 1);
  let winner = outcomes[0]?.key ?? '';
  let best = -1;
  for (const o of outcomes) {
    const c = counts.get(o.key) ?? 0;
    if (c > best) {
      best = c;
      winner = o.key;
    }
  }
  return winner;
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
  /** C-10 daily ritual (FORGIVING streak): records the answer, advances the streak by +1 (a
   *  missed day holds it, never resets — no insurance, no cost), pays the +1 daily, and on the
   *  7th ritual stages a PENDING weekly result (claimWeeklyResult pays the +5 after the reveal).
   *  `at` defaults to now; the dev panel injects a simulated date. Returns the +1 (0 if already
   *  done today). */
  completeDailyRitual: (answer: Omit<DailyRitualAnswer, 'date'>, at?: Date) => number;
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

      // ── C-10 DAILY RITUAL · FORGIVING STREAK ────────────────────────────────────────
      // Streak is a simple "rituals completed this cycle" counter (0..STREAK_LENGTH): each
      // completed ritual is +1, and a MISSED day never resets it — the streak just HOLDS until
      // the next answer, then resumes climbing. No insurance, no Stars cost, no punishment
      // (Simo, 2026-06-28). Reaching the 7th ritual STAGES a pending weekly result; per the
      // STRICT ORDER the +5 streak bonus AND the streak reset are deferred to claimWeeklyResult
      // (run AFTER the reveal is on screen), so completing the 7th day only stages — it never
      // pays here. The curriculum anchor still paces the daily article/question pairing.
      completeDailyRitual: (answer: Omit<DailyRitualAnswer, 'date'>, at: Date = new Date()): number => {
        // `at` is the completion moment — real `new Date()` in production; the C-10 dev panel
        // injects a simulated date to fast-forward days. Both the localDateKey gate AND the
        // anchor pinning read from `at`, so a simulated day is internally consistent.
        const s = get();
        const nowMs = at.getTime();
        // Anti-exploit: a backwards clock (now earlier than the last recorded ritual) earns
        // nothing and never advances the streak.
        if (s.lastDailyClaim !== null && nowMs < s.lastDailyClaim) return 0;
        const todayKey = localDateKey(at);
        // Idempotent once per local day (the "done today" signal Home/the reader read).
        if (s.dailyAnswers.some((a) => a.date === todayKey)) return 0;

        // Pin the curriculum anchor on the FIRST-EVER ritual (local midnight); never overwrite.
        const anchor = s.weekAnchorDate ?? startOfLocalDay(at);

        // Resolve the active curriculum week up front — every answer records ITS week so
        // the day-7 tally below can filter to the claimed week only.
        const week = getActiveWeek(anchor, at);

        // Record today's answer (carries the week-local outcome key for the day-7 tally).
        const record: DailyRitualAnswer = { ...answer, date: todayKey, weekId: week?.id };
        const dailyAnswers = [...s.dailyAnswers, record].slice(-MAX_DAILY_ANSWERS);

        // Forgiving streak: +1 per ritual, capped at the cycle length. Holds across misses.
        const streak = Math.min(s.streak + 1, STREAK_LENGTH);

        // +1 daily ritual reward.
        const tx: StarTransaction = { type: 'earn', amount: DAILY_RITUAL_REWARD, reason: 'daily_bonus', timestamp: nowMs };
        const stars = Math.min(MAX_STARS, s.stars + DAILY_RITUAL_REWARD);

        // Day-7 payoff (STRICT ORDER): reaching the 7th ritual with no result already pending
        // tallies this cycle's last 7 answers against the active week's outcomes and STAGES a
        // pending result (claimedAt 0). The +5 + streak reset land in claimWeeklyResult, after
        // the reveal — never here.
        let weeklyResult = s.weeklyResult;
        const noPending = !s.weeklyResult || s.weeklyResult.claimedAt !== 0;
        if (streak >= STREAK_LENGTH && noPending) {
          if (week) {
            // Tally ONLY this week's answers — a forgiving (slow) cycle can span a walker
            // week boundary, and answers from the previous week must not vote in this one.
            // Untagged answers (persisted pre-week-tagging) are excluded too.
            const cycleAnswers = dailyAnswers
              .filter((a) => a.weekId === week.id)
              .slice(-STREAK_LENGTH);
            const outcomeKey = tallyWeeklyOutcome(cycleAnswers, week.outcomes);
            weeklyResult = { weekId: week.id, outcomeKey, claimedAt: 0 }; // 0 = pending reveal
          }
        }

        set({
          stars,
          streak,
          dailyAnswers,
          weekAnchorDate: anchor,
          weeklyResult,
          lastDailyClaim: nowMs, // display/telemetry + backwards-clock guard
          lastDailyQuestion: nowMs,
          recentTransactions: [tx, ...s.recentTransactions].slice(0, MAX_TRANSACTIONS),
        });
        return DAILY_RITUAL_REWARD;
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
          return { history: newHistory };
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
      name: 'aurafy-user',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
