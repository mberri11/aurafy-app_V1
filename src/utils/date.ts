// ─────────────────────────────────────────────────────────────────────────────
// DATE KEYS — the single app-wide definition of "which local day is it".
// ─────────────────────────────────────────────────────────────────────────────
// Extracted from src/content/articles/dailyInsight.ts (2026-07-25) so the daily
// ritual's day-gate does not depend on the article content layer. Every consumer
// of the ritual date gate — the store, the daily pickers, the screens and the
// notification scheduler — MUST resolve "today" through this module and nowhere
// else: a second implementation that formats even slightly differently silently
// breaks the once-per-local-day lock (the answer never resolves as "done today").
//
// Dependency-light on purpose (no store, no content, no i18n imports) so it can be
// imported from any layer, including pure data modules and the utils layer.
// ─────────────────────────────────────────────────────────────────────────────

/** Local-calendar date key, e.g. "2026-06-06" (NOT UTC — matches the user's day). */
export function localDateKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

const DAY_MS = 86_400_000;

/**
 * Whole local days elapsed since the user's anchor. `0` when the anchor is unset
 * (brand-new user) or when the clock reads BEFORE the anchor (backwards-clock
 * tamper → clamp to Day 0, never negative). THE single app-wide day-count
 * definition — do not recompute elsewhere.
 *
 * The anchor is set to the START of the user's first-ritual local day (see
 * userStore.completeDailyRitual), so this advances at local midnight — keeping the
 * daily quote in step with the calendar day and the localDateKey gate.
 *
 * MOVED HERE from src/data/weeks/walker.ts (2026-07-28). It paces the LIVE daily
 * quote ritual (`getTodayQuote`, `getDailyAccentIndex`), which must not depend on
 * the weekly-curriculum module graph — walker.ts imports WEEKS and the curriculum
 * flag at module scope, so leaving this there chained the quote screen to content
 * it does not use.
 */
export function getDaysSinceAnchor(anchor: number | null, date: Date = new Date()): number {
  if (anchor === null) return 0;
  const diff = date.getTime() - anchor;
  if (diff < 0) return 0;
  return Math.floor(diff / DAY_MS);
}
