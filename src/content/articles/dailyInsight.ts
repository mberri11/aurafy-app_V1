// ─────────────────────────────────────────────────────────────────────────────
// INSIGHTS — deterministic daily featured article
// ─────────────────────────────────────────────────────────────────────────────
// Offline, no backend, no randomness: the "Daily Insight" is a pure function of
// the local calendar date, so every device shows the same featured article on a
// given day and the same article all day.
//
// Distinct from the existing Daily QUESTION (src/data/dailyQuestions.ts), which
// picks by day-of-year. This picks by a hash of the full YYYY-MM-DD key over the
// `featured` article pool, so the two never move in lockstep.
// ─────────────────────────────────────────────────────────────────────────────

import { ARTICLES, type Article } from './index';
// C-10 PILOT — when the weekly curriculum is active, the daily article comes from
// the walker's pairing so it's the SAME day's pair as the daily question.
import { getTodayPairing } from '../../data/weeks/walker';

/** Local-calendar date key, e.g. "2026-06-06" (NOT UTC — matches the user's day). */
export function localDateKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Deterministic, well-distributed string hash (djb2). */
function hashString(input: string): number {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 33) ^ input.charCodeAt(i);
  }
  // Force unsigned 32-bit so the modulo below is always non-negative.
  return hash >>> 0;
}

/** Articles eligible to be the daily featured pick (real content, not ads). */
export function getFeaturedPool(articles: Article[] = ARTICLES): Article[] {
  return articles.filter((a) => a.featured && !a.sponsored);
}

/**
 * The id of today's featured article. C-10: when the weekly curriculum is active this
 * is a thin wrapper over the walker's `getTodayPairing()` (so the daily article is the
 * authored partner of the daily question), paced off the user's `weekAnchorDate` (pass
 * `useUserStore.getState().weekAnchorDate` / a store selector). When the curriculum is
 * off/empty it falls back to the legacy deterministic hash over the `featured` pool.
 * Stable per local day.
 */
export function getDailyInsightId(
  anchor: number | null,
  date: Date = new Date(),
  articles: Article[] = ARTICLES,
): string {
  const pairing = getTodayPairing(anchor, date);
  if (pairing) return pairing.articleId;
  const pool = getFeaturedPool(articles);
  if (pool.length === 0) return articles[0]?.id ?? '';
  const idx = hashString(localDateKey(date)) % pool.length;
  return pool[idx].id;
}

/** The full Article record for today's featured pick (convenience). */
export function getDailyInsight(
  anchor: number | null,
  date: Date = new Date(),
  articles: Article[] = ARTICLES,
): Article | undefined {
  const id = getDailyInsightId(anchor, date, articles);
  return articles.find((a) => a.id === id);
}
