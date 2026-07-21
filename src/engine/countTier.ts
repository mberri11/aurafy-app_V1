import type { CountTier } from '../types';

/**
 * THE tier thresholds for count reads (a multi module read solo). Lives in its
 * own leaf module (types-only import) so BOTH the engine (resultGenerator) and
 * the theming layer (categoryTheme's red_green_flag outcome resolver) can share
 * the same math without a cycle — scoringEngine already imports categoryTheme,
 * so categoryTheme must never import anything that reaches scoringEngine.
 *
 * 'none' (<= 0.1) catches 0/20, 1/20, 2/20 — the "rarely on basically
 * everything" read that must stay unambiguous, not softened.
 */
export function countTier(count: number, total: number): CountTier {
  const share = total > 0 ? count / total : 0;
  return share <= 0.1 ? 'none' : share < 0.4 ? 'low' : share < 0.7 ? 'medium' : 'high';
}
