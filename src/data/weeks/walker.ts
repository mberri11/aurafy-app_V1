// ─────────────────────────────────────────────────────────────────────────────
// C-10 — CURRICULUM WALKER. Deterministic, offline, PURE. Picks today's
// (article ↔ question) pair from the active themed week.
//
// ANCHOR MODEL (pilot fix, 2026-06-25): the curriculum is paced off a PER-USER
// anchor — `weekAnchorDate` (epoch ms, set on the user's first-ever daily ritual,
// persisted in userStore) — NOT the calendar weekday. This is what makes a user
// who opens the app for the first time on a Friday start at Day 0 / Week 0 instead
// of landing mid-week and getting a 2-answer weekly result.
//
//   daysSinceAnchor = floor((now - anchor) / 86_400_000)
//   dayIndex        = daysSinceAnchor % 7
//   weekIndex       = floor(daysSinceAnchor / 7) % WEEKS.length
//
// The anchor is passed IN as a parameter (never read from the store here): the
// store chain is `userStore → contentSlice → dailyInsight → walker`, so importing
// the store back into the walker would form a require cycle. Keeping the anchor a
// parameter also preserves this module's pure-function contract (unit-testable
// with an explicit anchor + date).
//
// When the curriculum is disabled or `WEEKS` is empty the date-based resolvers
// no-op (return null) and callers fall back to the legacy daily pickers. When the
// anchor is still null (brand-new user who has not completed a ritual yet) the
// walker returns Day 0 / Week 0 as a sensible default.
// ─────────────────────────────────────────────────────────────────────────────

import { WEEKLY_CURRICULUM_ENABLED } from '@/src/config/flags';
// The day-count lives in the leaf date util, NOT here (moved 2026-07-28): the daily
// QUOTE ritual needs it, and this module pulls in WEEKS + the curriculum flag at import
// time. Keeping it here chained the live quote screen to curriculum content it never uses.
import { getDaysSinceAnchor } from '@/src/utils/date';
import { WEEKS } from './index';
import type { WeekDay, WeeklyTheme } from './types';

/** Day index within the active 7-day cycle, 0..6 (anchor-relative). */
export function getDayIndex(anchor: number | null, date: Date = new Date()): number {
  return getDaysSinceAnchor(anchor, date) % 7;
}

/**
 * Index into `WEEKS` for the active week, or -1 when the registry is empty. Pure
 * (no flag gate) so it stays unit-testable; consumers gate on the flag via
 * getActiveWeek/getTodayPairing below.
 */
export function getActiveWeekIndex(anchor: number | null, date: Date = new Date()): number {
  if (WEEKS.length === 0) return -1;
  return Math.floor(getDaysSinceAnchor(anchor, date) / 7) % WEEKS.length;
}

/**
 * The active themed week, or `null` when the curriculum is disabled or empty
 * (caller falls back to the legacy daily pickers).
 */
export function getActiveWeek(anchor: number | null, date: Date = new Date()): WeeklyTheme | null {
  if (!WEEKLY_CURRICULUM_ENABLED || WEEKS.length === 0) return null;
  return WEEKS[getActiveWeekIndex(anchor, date)] ?? null;
}

/** Today's paired (article ↔ question), or `null` when no active week (no-op). */
export function getTodayPairing(anchor: number | null, date: Date = new Date()): WeekDay | null {
  const week = getActiveWeek(anchor, date);
  if (!week) return null;
  return week.days[getDayIndex(anchor, date)] ?? null;
}

/**
 * The week-local outcome key that a given answer votes for in today's active week,
 * or `null` when the curriculum is off/empty. The daily ritual records this into
 * `dailyAnswers[].dimension`; the day-7 tally (`tallyWeeklyOutcome`) reads them back.
 * Callers fall back to the legacy lean axis when this returns null.
 */
export function getTodayOutcomeKey(
  questionId: string,
  answerIndex: number,
  anchor: number | null,
  date: Date = new Date(),
): string | null {
  const week = getActiveWeek(anchor, date);
  if (!week) return null;
  return week.answerOutcomes[questionId]?.[answerIndex] ?? null;
}
