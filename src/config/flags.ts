// ─────────────────────────────────────────────────────────────────────────────
// FEATURE FLAGS — staged-rollout toggles. Keep this module dependency-light
// (no store/UI imports) so it can be imported anywhere, including pure data code.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * C-10 — Weekly themed curriculum.
 *
 * When TRUE, the daily article + question are resolved by the curriculum walker
 * (`src/data/weeks/walker.ts`) as one paired day inside a themed week, and the 7
 * answers resolve into a day-7 weekly result.
 *
 * When FALSE (default — current shipping behavior), nothing routes through the
 * walker: the app keeps using the legacy independent daily pickers
 * (`getDailyInsightId` / `getDailyQuestionId`).
 *
 * PILOT (2026-06-25): flipped ON now that Week 1 ("Secret Signs of Love") is live
 * in `WEEKS[]`. The daily article + question route through the walker. The walker
 * still no-ops if `WEEKS` is ever emptied, so this remains safe.
 */
export const WEEKLY_CURRICULUM_ENABLED = true;
