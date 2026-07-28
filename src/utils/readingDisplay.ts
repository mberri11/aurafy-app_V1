// ─────────────────────────────────────────────────────────────────────────────
// readingDisplayName — the single rule for the big "name" of a finished reading,
// matching what app/result.tsx reveals: the POLARITY verdict for red_green_flag,
// else a multi winner's person name, else the solo verdict LABEL (e.g. "Secure",
// not the raw 'positive'), else the dominant dimension for categorical reads.
// Shared by History cards (and the Result spine).
// ─────────────────────────────────────────────────────────────────────────────

import { Reading, Language, SoloResults, CategoricalResults } from '@/src/types';
import { joinNames } from '@/src/engine/scoringEngine';
import { flagOutcomeKey, isDualFlagModule } from '@/src/themes/categoryTheme';
import { attachmentStyleResults } from '@/src/data/results/attachmentStyleResults';
import { amITheProblemResults } from '@/src/data/results/amITheProblemResults';
import { shadowSelfResults } from '@/src/data/results/shadowSelfResults';
import { auraColorResults } from '@/src/data/results/auraColorResults';

const SOLO_RESULTS: Record<string, SoloResults> = {
  attachment_style: attachmentStyleResults,
  am_i_problem: amITheProblemResults,
  shadow_self: shadowSelfResults,
};

// Categorical modules resolve the dominant dimension to its localized label — the
// same lookup-by-moduleId shape as SOLO_RESULTS, so a future categorical module
// plugs in with one line here.
const CATEGORICAL_RESULTS: Record<string, CategoricalResults> = {
  aura_color: auraColorResults,
};

/**
 * @param t i18n lookup, needed for the polarity band titles (`result.flagTitles.*`).
 *   Required rather than optional: the alternative is hardcoding English band names
 *   here, which breaks FR/AR/ES.
 */
export function readingDisplayName(
  reading: Reading,
  lang: Language,
  t: (key: string) => string,
): string {
  const { result } = reading;
  // POLARITY (red_green_flag) — the reveal is a VERDICT about the reading, never a
  // person. `result.winner` on this path is just the reddest participant (an interim
  // backward-compat field), so showing it here crowned somebody arbitrarily — and on
  // a draw (everyone neutral at net 0) it invented a standout that does not exist.
  // Mirrors app/result.tsx exactly: the group verdict title for compare/circle, the
  // single subject's band title for solo.
  if (isDualFlagModule(reading.moduleId)) {
    const vt = result.verdictTitle;
    if (vt) return vt[lang] ?? vt.en;
    // Solo reads (and pre-verdictTitle persisted readings) resolve through the same
    // band picker every other flag surface uses.
    return t(`result.flagTitles.${flagOutcomeKey(result)}`);
  }
  // Tie readings reveal ALL max scorers — the History card must match, never fall
  // back to the arbitrary backward-compat `winner`.
  const tied = result.tiedWinners ?? [];
  if (tied.length > 1) return joinNames(tied.map((p) => p.name), lang);
  if (result.winner?.name) return result.winner.name;
  if (result.verdict) {
    const label = SOLO_RESULTS[reading.moduleId]?.verdictLabel[result.verdict];
    if (label) return label[lang] ?? label.en;
  }
  const category = CATEGORICAL_RESULTS[reading.moduleId]?.categories[result.dominantDimension];
  return category?.label?.[lang] ?? category?.label?.en ?? result.dominantDimension;
}
