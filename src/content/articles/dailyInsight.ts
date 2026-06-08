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
 * The id of today's featured article. Deterministic per local day.
 * Falls back to the first article if no featured pool exists yet.
 */
export function getDailyInsightId(date: Date = new Date(), articles: Article[] = ARTICLES): string {
  const pool = getFeaturedPool(articles);
  if (pool.length === 0) return articles[0]?.id ?? '';
  const idx = hashString(localDateKey(date)) % pool.length;
  return pool[idx].id;
}

/** The full Article record for today's featured pick (convenience). */
export function getDailyInsight(date: Date = new Date(), articles: Article[] = ARTICLES): Article | undefined {
  const id = getDailyInsightId(date, articles);
  return articles.find((a) => a.id === id);
}
