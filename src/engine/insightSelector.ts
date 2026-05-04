import { LocalizedString } from '../types';

/**
 * Selects 3 non-repeating insights from the pool for a given dimension.
 * Uses seeded randomness based on reading timestamp to ensure same result on replay.
 */
export function selectInsights(
  insightPool: Record<string, LocalizedString[]>,
  dimension: string,
  seed: number,
  count = 3,
): LocalizedString[] {
  // Try the exact dimension first, then fall back to any available pool
  const pool =
    insightPool[dimension] ??
    Object.values(insightPool).flat();

  if (pool.length === 0) return [];

  // Seeded shuffle using the reading timestamp
  const shuffled = seededShuffle(pool, seed);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/** Fisher-Yates shuffle with a simple linear congruential generator seed */
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const result = [...arr];
  let s = seed;
  for (let i = result.length - 1; i > 0; i--) {
    // LCG: next = (a * s + c) % m
    s = (s * 1664525 + 1013904223) % 4294967296;
    const j = s % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
