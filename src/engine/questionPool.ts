import { Question } from '../types';

import { whoLovesMeQuestions } from '../data/questions/whoLovesMe';
import { whoHatesMeQuestions } from '../data/questions/whoHatesMe';
import { whoJealousQuestions } from '../data/questions/whoJealous';
import { whoSoulmateQuestions } from '../data/questions/whoSoulmate';
import { whoAdmiresQuestions } from '../data/questions/whoAdmires';
import { energyReadingQuestions } from '../data/questions/energyReading';
import { attachmentStyleQuestions } from '../data/questions/attachmentStyle';
import { amITheProblemQuestions } from '../data/questions/amITheProblem';
import { whoCutOffQuestions } from '../data/questions/whoCutOff';
import { whoWillHurtMeQuestions } from '../data/questions/whoWillHurtMe';
import { shadowSelfQuestions } from '../data/questions/shadowSelf';
import { auraColorQuestions } from '../data/questions/auraColor';
import { redGreenFlagQuestions } from '../data/questions/redGreenFlag';

// ─────────────────────────────────────────────────────────────────────────────
// QUESTION POOL — repeat-reading variance. THE STANDARD (canonical since
// 2026-07-17, applies to every current and future pooled module):
//
//   * A pooled module has 40 questions in its data file: q01–q20 are the
//     curated core (`core: true`, authored order = the tuned first-reading
//     experience) and q21–q40 are pool counterparts (`core: false`).
//   * The counterpart q(N+20) PAIRS with core question qN and MUST share its
//     partner's `framework`, `dimension`, and `personWeight` — and, for
//     categorical modules (answers carry `category`), the exact same
//     answer-category set. Every sampled 20 then has exactly the curated tag
//     distribution (and every category stays reachable at the curated slot
//     counts) by construction.
//   * First-ever reading of the module = the core 20 in authored order —
//     byte-identical to the pre-pool experience.
//   * Repeat readings = one seeded coin-flip per pair + a seeded shuffle. The
//     seed is minted once per reading session (readingStore.currentSeed), so a
//     resumed quiz re-derives the same set; a new reading gets a new one.
//   * The scoring engine is NEVER touched — this file only decides WHICH
//     questions it is fed, always exactly the module's designed count (20).
//
// Opting a module in: bring its data file to the 20+20 paired layout, add its
// id to POOLED_MODULES below, then run `pnpm validate:pools`
// (scripts/validate-question-pools.mjs) — the guard that asserts the pairing
// rules above. A module whose id is NOT in the registry always gets its full
// static array in authored order, untouched.
//
// ── EXCEPTION: POLARITY-BALANCED MODULES (red_green_flag) ───────────────────
// red_green_flag does NOT use the core/counterpart axis above. Its 40 are 20
// RED + 20 GREEN questions (4 per dimension × polarity), ALL `core: true`, with
// no q(N+20) pairing. `selectPolarityBalanced` samples 2 from each of the 10
// (dimension × polarity) buckets, so EVERY read serves exactly 10 red + 10
// green, 2 per dimension per polarity — balance is guaranteed by construction,
// never by a coin flip (a coin flip could serve 20 red and make every person
// score negative). Variance comes from which 2 of each 4 are drawn plus the
// seeded order.
//
// TWO FURTHER DEPARTURES for these modules:
//   * The served order is a deterministic seeded INTERLEAVE — green, red,
//     green, red … — so no two same-polarity questions are ever adjacent and
//     the reading always OPENS on a green question (never accuse first).
//   * The first-ever reading is NOT "the core 20 in authored order" (that set
//     would be all-red here). It runs the SAME balanced sampler under a fixed
//     seed, so it is still 10 red / 10 green, still identical for every user on
//     their first read, just not in authored order.
// ─────────────────────────────────────────────────────────────────────────────

const QUESTIONS_MAP: Record<string, Question[]> = {
  who_loves_me: whoLovesMeQuestions,
  who_hates_me: whoHatesMeQuestions,
  who_jealous: whoJealousQuestions,
  who_soulmate: whoSoulmateQuestions,
  who_admires: whoAdmiresQuestions,
  energy_reading: energyReadingQuestions,
  attachment_style: attachmentStyleQuestions,
  am_i_problem: amITheProblemQuestions,
  who_cut_off: whoCutOffQuestions,
  who_will_hurt_me: whoWillHurtMeQuestions,
  shadow_self: shadowSelfQuestions,
  aura_color: auraColorQuestions,
  // Core 20 only (all `core: true`) — deliberately NOT in POOLED_MODULES until
  // its q21–q40 counterparts are authored (wave rollout; the validator would
  // fail a 20-question pooled module). Un-pooled = full static array served.
  red_green_flag: redGreenFlagQuestions,
};

/** Registry of modules that have adopted the pool standard. Add an id here ONLY
 *  once its data file carries the full 20+20 paired layout and
 *  `pnpm validate:pools` passes — the validator parses this set, so joining the
 *  registry automatically puts a module under guard. */
const POOLED_MODULES = new Set<string>([
  'who_loves_me',
  'energy_reading',
  'who_soulmate',
  'aura_color',
  'who_will_hurt_me',
  'shadow_self',
  'attachment_style',
  'am_i_problem',
  'who_hates_me',
  'who_jealous',
  'who_admires',
  'who_cut_off',
  'red_green_flag',
]);

/** Pooled modules that use POLARITY BALANCE instead of core/counterpart pairing
 *  (see the EXCEPTION block in the header). Membership here is checked BEFORE
 *  the pairing sampler, and `validate:pools` skips the q(N+20) assertions for
 *  these ids while enforcing its own polarity rules. */
const POLARITY_BALANCED_MODULES = new Set<string>(['red_green_flag']);

/** Questions served per reading — the module's designed count, for every path. */
const SERVED_COUNT = 20;

/** Fixed seed for the FIRST-EVER reading of a polarity-balanced module. The
 *  authored order can't be used there (it would serve 20 red), so first reads
 *  run the same balanced sampler under this constant: still 10 red / 10 green,
 *  still identical for every user on their first read. Changing this value
 *  changes what every new user sees first — treat it as content. */
const FIRST_READING_SEED = 20260722;

/** The full static question array for a module (all 40 for pooled modules). */
export function getModuleQuestions(moduleId: string): Question[] {
  return QUESTIONS_MAP[moduleId] ?? [];
}

/** Same LCG as insightSelector's seededShuffle; kept in 32-bit space so large
 *  Date.now() seeds don't lose float precision. */
function nextSeed(s: number): number {
  return ((s % 4294967296) * 1664525 + 1013904223) % 4294967296;
}

/** Seeded Fisher–Yates over a COPY, continuing the caller's seed stream.
 *  Returns the next seed so successive shuffles stay deterministic. */
function seededShuffle<T>(items: T[], seed: number): { items: T[]; seed: number } {
  const out = [...items];
  let s = seed;
  for (let i = out.length - 1; i > 0; i--) {
    s = nextSeed(s);
    const j = s % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return { items: out, seed: s };
}

/**
 * POLARITY-BALANCED sampler (red_green_flag). Guarantees, by construction:
 *   * exactly 10 red + 10 green,
 *   * exactly 2 per (dimension × polarity),
 *   * no two same-polarity questions adjacent,
 *   * the reading always OPENS on a green question.
 *
 * Order is a deterministic seeded INTERLEAVE of the two shuffled halves starting
 * from green (green, red, green, red …) — not reject-sampling, so it always
 * terminates and always satisfies the adjacency rule.
 *
 * Returns null when the pool is malformed (wrong bucket count / a bucket with
 * fewer than 2), so the caller can fall back to the static array rather than
 * serving a short or unbalanced reading.
 */
function selectPolarityBalanced(all: Question[], seed: number): Question[] | null {
  const buckets = new Map<string, Question[]>();
  for (const q of all) {
    if (q.polarity !== 'red' && q.polarity !== 'green') return null;
    const key = `${q.dimension}|${q.polarity}`;
    const bucket = buckets.get(key);
    if (bucket) bucket.push(q);
    else buckets.set(key, [q]);
  }

  let s = seed;
  const red: Question[] = [];
  const green: Question[] = [];
  // Sorted keys → iteration order never depends on authored order or Map insertion.
  for (const key of [...buckets.keys()].sort()) {
    const bucket = buckets.get(key)!;
    if (bucket.length < 2) return null;
    const shuffled = seededShuffle(bucket, s);
    s = shuffled.seed;
    const taken = shuffled.items.slice(0, 2);
    (key.endsWith('|green') ? green : red).push(...taken);
  }

  // Halves must be equal for a clean alternating interleave.
  if (red.length !== green.length || red.length * 2 !== SERVED_COUNT) return null;

  const shuffledGreen = seededShuffle(green, s);
  const shuffledRed = seededShuffle(red, shuffledGreen.seed);

  const served: Question[] = [];
  for (let i = 0; i < shuffledGreen.items.length; i++) {
    served.push(shuffledGreen.items[i], shuffledRed.items[i]);
  }
  return served;
}

/**
 * The questions to serve for a reading — always exactly the module's designed
 * count (20), never re-randomized within a session (pass the reading session's
 * `currentSeed`).
 */
export function selectQuestions(moduleId: string, isFirstReading: boolean, seed: number): Question[] {
  const all = getModuleQuestions(moduleId);
  if (!POOLED_MODULES.has(moduleId)) return all;

  // Polarity-balanced modules take their own sampler for BOTH the first reading
  // (fixed seed) and repeats — never the authored-order core set, which would be
  // all-red here. A malformed pool falls back to the static array.
  if (POLARITY_BALANCED_MODULES.has(moduleId)) {
    return selectPolarityBalanced(all, isFirstReading ? FIRST_READING_SEED : seed) ?? all;
  }

  const core = all.filter((q) => q.core);
  if (isFirstReading) return core;

  const counterparts = all.filter((q) => !q.core);
  // Malformed pool (counterparts missing or unpaired) → fall back to the curated set.
  if (core.length === 0 || counterparts.length !== core.length) return core;

  let s = seed;
  const picked = core.map((coreQ, i) => {
    s = nextSeed(s);
    return s % 2 === 0 ? coreQ : counterparts[i];
  });

  // Fisher–Yates on the picked 20, continuing the same seed stream.
  for (let i = picked.length - 1; i > 0; i--) {
    s = nextSeed(s);
    const j = s % (i + 1);
    [picked[i], picked[j]] = [picked[j], picked[i]];
  }
  return picked;
}
