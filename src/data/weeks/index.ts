// ─────────────────────────────────────────────────────────────────────────────
// C-10 — WEEKLY CURRICULUM registry. Weeks 1–8 are authored and LIVE (flag ON
// since the 2026-06-25 pilot); weeks 9–54 arrive via the aurafy-week-generator
// skill. If WEEKS ever went empty again the walker would no-op and the app would
// fall back to the legacy daily pickers.
// ─────────────────────────────────────────────────────────────────────────────

import type { WeeklyTheme } from './types';
import { w01Week } from './w01_secret_signs_of_love';
import { w02Week } from './w02_when_they_pull_away';
import { w03Week } from './w03_mixed_signals';
import { w04Week } from './w04_what_feels_like_home';
import { w05Week } from './w05_situationships';
import { w06Week } from './w06_your_worth_in_love';
import { w07Week } from './w07_hidden_feelings';
import { w08Week } from './w08_the_chase';

/**
 * The themed weeks. Weeks 1 ("Secret Signs of Love"), 2 ("When They Pull Away"),
 * 3 ("Mixed Signals"), 4 ("What Feels Like Home"), 5 ("Situationships"), 6 ("Your
 * Worth in Love", the first category:'self' week), 7 ("Hidden Feelings") and 8 ("The
 * Chase") are live; weeks 9–54 arrive later via the aurafy-week-generator skill. The
 * walker resolves the active week as `floor(daysSinceAnchor / 7) % WEEKS.length`, so
 * users cycle through the registry in order from their personal anchor date. An
 * empty registry would make the walker no-op (legacy pickers).
 */
export const WEEKS: WeeklyTheme[] = [w01Week, w02Week, w03Week, w04Week, w05Week, w06Week, w07Week, w08Week];

/** Look up a week by id (used by the forced-week override + History re-open). */
export function getWeekById(id: string): WeeklyTheme | undefined {
  return WEEKS.find((w) => w.id === id);
}

// articleId → the absolute day-offset since the user's anchor at which the walker FIRST
// serves it as the daily pick (weekOrdinal*7 + dayIndex). This is DAY-granular, unlike
// the week ordinal above, so the Insights feed can reveal an article on the exact day it
// becomes the daily — not the whole week at once (which would still leak later days).
const REVEAL_DAY_BY_ARTICLE: Record<string, number> = {};
WEEKS.forEach((week, ordinal) => {
  week.days.forEach((day, dayIndex) => {
    if (!(day.articleId in REVEAL_DAY_BY_ARTICLE)) {
      REVEAL_DAY_BY_ARTICLE[day.articleId] = ordinal * 7 + dayIndex;
    }
  });
});

/**
 * The day-offset (from the user's anchor) at which a curriculum article first becomes
 * the daily pick, or undefined for editorial articles (always feed-visible). Gate an
 * article into the Insights feed with `getDaysSinceAnchor(anchor) >= getArticleRevealDay(id)`
 * so an upcoming daily pick stays hidden until the exact day it is served.
 */
export function getArticleRevealDay(articleId: string): number | undefined {
  return REVEAL_DAY_BY_ARTICLE[articleId];
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
