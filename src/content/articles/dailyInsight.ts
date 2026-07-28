// ─────────────────────────────────────────────────────────────────────────────
// INSIGHTS — deterministic daily featured article
// ─────────────────────────────────────────────────────────────────────────────
// Offline, no backend, no randomness: the "Daily Insight" is a pure function of
// the local calendar date, so every device shows the same featured article on a
// given day and the same article all day.
//
// Two resolution paths, in order: the curriculum walker's pairing for today (the
// primary path — see below), falling back to a hash of the full YYYY-MM-DD key over
// the `featured` article pool when no week is active.
// ─────────────────────────────────────────────────────────────────────────────

import { ARTICLES, type Article } from './index';
// The daily article is the `articleId` half of the active week's day. The `questionId`
// half no longer resolves to anything — the daily-question content was retired with the
// weekly curriculum (2026-07-28); the ritual is the daily quote screen now.
import { getTodayPairing } from '../../data/weeks/walker';
// The local-day key moved to the utils layer (2026-07-25) — the ritual date gate must
// not depend on the article content layer. Import it from '@/src/utils/date', never
// re-implement it here.
import { localDateKey } from '../../utils/date';

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
