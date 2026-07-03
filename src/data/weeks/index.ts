// ─────────────────────────────────────────────────────────────────────────────
// C-10 — WEEKLY CURRICULUM registry. RAILS ONLY: `WEEKS` ships EMPTY in this pass.
// The 54 authored weeks arrive later via the aurafy-week-generator skill; until
// then the walker no-ops and the app uses the legacy daily pickers (flag OFF).
// ─────────────────────────────────────────────────────────────────────────────

import type { WeeklyTheme } from './types';
import { w01Week } from './w01_secret_signs_of_love';

/**
 * The themed weeks. PILOT: Week 1 ("Secret Signs of Love") is live; weeks 2–54
 * arrive later via the aurafy-week-generator skill. The walker resolves the active
 * week as `isoWeekNumber % WEEKS.length`, so with a single week every ISO week maps
 * to it. An empty registry would make the walker no-op (legacy pickers).
 */
export const WEEKS: WeeklyTheme[] = [w01Week];

/** Look up a week by id (used by the forced-week override + History re-open). */
export function getWeekById(id: string): WeeklyTheme | undefined {
  return WEEKS.find((w) => w.id === id);
}

/**
 * DEV-ONLY structural check for an authored week. Returns a list of problems
 * (empty = valid). Not wired into runtime — call it when content lands (e.g. a
 * dev assertion / test) to catch malformed weeks before they ship.
 *
 * Asserts: exactly 7 days · exactly 4 outcomes · every day's questionId has an
 * `answerOutcomes` entry whose values are all valid outcome keys · every outcome
 * is reachable (appears in at least one answer mapping).
 */
export function validateWeek(w: WeeklyTheme): string[] {
  const errors: string[] = [];

  if (w.days.length !== 7) {
    errors.push(`week "${w.id}": expected 7 days, got ${w.days.length}`);
  }
  if (w.outcomes.length !== 4) {
    errors.push(`week "${w.id}": expected 4 outcomes, got ${w.outcomes.length}`);
  }

  const outcomeKeys = new Set(w.outcomes.map((o) => o.key));
  const reached = new Set<string>();

  for (const day of w.days) {
    const mapping = w.answerOutcomes[day.questionId];
    if (!mapping) {
      errors.push(`week "${w.id}": no answerOutcomes for questionId "${day.questionId}"`);
      continue;
    }
    mapping.forEach((key, i) => {
      if (!outcomeKeys.has(key)) {
        errors.push(`week "${w.id}": answer ${i} of "${day.questionId}" → unknown outcome "${key}"`);
      } else {
        reached.add(key);
      }
    });
  }

  for (const o of w.outcomes) {
    if (!reached.has(o.key)) {
      errors.push(`week "${w.id}": outcome "${o.key}" is unreachable (no answer maps to it)`);
    }
  }

  return errors;
}

// Dev-only structural guard: warn loudly if an authored week is malformed (wrong
// day/outcome count, dangling answerOutcomes, unreachable outcome) before it ships.
if (__DEV__) {
  for (const w of WEEKS) {
    const problems = validateWeek(w);
    if (problems.length) console.warn('[weeks] validateWeek:', problems.join(' · '));
  }
}
