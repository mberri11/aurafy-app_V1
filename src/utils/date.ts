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
