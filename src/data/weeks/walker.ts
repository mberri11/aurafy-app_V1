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
import { WEEKS } from './index';
import type { WeekDay, WeeklyTheme } from './types';

const DAY_MS = 86_400_000;

/**
 * Standard ISO-8601 week number (1..53), computed in UTC off the date's calendar
 * Y/M/D so DST never shifts the boundary. Retained as a generic date utility — it
 * NO LONGER drives curriculum indexing (that is anchor-relative now, see below).
 */
export function isoWeekNumber(date: Date = new Date()): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  // Shift to the Thursday of this week (ISO weeks are Thursday-anchored).
  const dayNum = (d.getUTCDay() + 6) % 7; // Mon=0 … Sun=6
  d.setUTCDate(d.getUTCDate() - dayNum + 3);
  const firstThursday = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));
  const firstDayNum = (firstThursday.getUTCDay() + 6) % 7;
  firstThursday.setUTCDate(firstThursday.getUTCDate() - firstDayNum + 3);
  return 1 + Math.round((d.getTime() - firstThursday.getTime()) / (7 * DAY_MS));
}

/**
 * Whole local days elapsed since the user's anchor. `0` when the anchor is unset
 * (brand-new user) or when the clock reads BEFORE the anchor (backwards-clock
 * tamper → clamp to Day 0, never negative). THE single app-wide day-count
 * definition — do not recompute elsewhere.
 *
 * The anchor is set to the START of the user's first-ritual local day (see
 * userStore.completeDailyRitual), so this advances at local midnight — keeping the
 * daily article/question in step with the calendar day and the localDateKey gate.
 */
export function getDaysSinceAnchor(anchor: number | null, date: Date = new Date()): number {
  if (anchor === null) return 0;
  const diff = date.getTime() - anchor;
  if (diff < 0) return 0;
  return Math.floor(diff / DAY_MS);
}

/** Day index within the active 7-day cycle, 0..6 (anchor-relative). */
export function getDayIndex(anchor: number | null, date: Date = new Date()): number {
  return getDaysSinceAnchor(anchor, date) % 7;
}

/**
 * How many week slots the user has ENTERED since their anchor (week 0 counts as
 * entered on day 0), UNWRAPPED — unlike getActiveWeekIndex this never applies
 * `% WEEKS.length`, so once a week is reached it stays reached even after the
 * registry cycles. Gates feed visibility: a week's articles show only when the
 * week's ordinal in `WEEKS` is <= this count (no pre-reading future weeks).
 */
export function getReachedWeekCount(anchor: number | null, date: Date = new Date()): number {
  return Math.floor(getDaysSinceAnchor(anchor, date) / 7);
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
