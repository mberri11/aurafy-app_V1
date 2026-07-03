// ─────────────────────────────────────────────────────────────────────────────
// C-10 — WEEKLY CURRICULUM types (single source of truth for the week shapes).
// See CLAUDE.md → "C-10 — Weekly Curriculum & Result System" and the architecture
// brief. Content (the 54 authored weeks) is generated separately via the
// aurafy-week-generator skill — these are RAILS ONLY; `WEEKS` ships empty.
// ─────────────────────────────────────────────────────────────────────────────

// Type-only imports — erased at build, so this file stays free of runtime coupling
// to the heavy article-content layer.
import type { LocalizedString } from '@/src/types';
import type { ArticleCategory } from '@/src/content/articles';

/**
 * One of a week's 4 named result axes. Day 7 tallies the 7 answers' outcome keys;
 * the highest-count outcome wins (tiebreak = order in `WeeklyTheme.outcomes`).
 */
export interface WeekOutcome {
  key: string;
  title: LocalizedString;
  body: LocalizedString;
  /** One-line takeaway baked into the shareable result card. */
  shareLine: LocalizedString;
}

/** One day of a week = a paired (article ↔ question). Exactly 7 per week. */
export interface WeekDay {
  articleId: string;
  questionId: string;
}

/**
 * A themed week: 7 paired days that resolve into ONE weekly result built from the
 * user's 7 answers. Replaces the two independent daily pickers (article + question
 * are now the same day's pair).
 */
export interface WeeklyTheme {
  id: string;
  title: LocalizedString;
  /** Dominant feed chip for the week. */
  category: ArticleCategory;
  /** "What this week measures" — shown on the result intro. */
  resultPrompt: LocalizedString;
  /** EXACTLY 7, index 0..6 (Monday=0; see walker.getDayIndex). */
  days: WeekDay[];
  /** EXACTLY 4 named outcomes. */
  outcomes: WeekOutcome[];
  /** questionId → [outcomeKey per answer index] (each answer votes one outcome). */
  answerOutcomes: Record<string, string[]>;
}
