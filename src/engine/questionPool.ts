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
// New modules (e.g. red_green_flag) should be born pooled: authored directly
// at 40 following the same layout.
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
]);

/** The full static question array for a module (all 40 for pooled modules). */
export function getModuleQuestions(moduleId: string): Question[] {
  return QUESTIONS_MAP[moduleId] ?? [];
}

/** Same LCG as insightSelector's seededShuffle; kept in 32-bit space so large
 *  Date.now() seeds don't lose float precision. */
function nextSeed(s: number): number {
  return ((s % 4294967296) * 1664525 + 1013904223) % 4294967296;
}

/**
 * The questions to serve for a reading — always exactly the module's designed
 * count (20), never re-randomized within a session (pass the reading session's
 * `currentSeed`).
 */
export function selectQuestions(moduleId: string, isFirstReading: boolean, seed: number): Question[] {
  const all = getModuleQuestions(moduleId);
  if (!POOLED_MODULES.has(moduleId)) return all;

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
