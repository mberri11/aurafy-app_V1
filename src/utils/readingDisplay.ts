// ─────────────────────────────────────────────────────────────────────────────
// readingDisplayName — the single rule for the big "name" of a finished reading,
// matching what app/result.tsx reveals: a multi winner's person name, else the
// solo verdict LABEL (e.g. "Secure", not the raw 'positive'), else the dominant
// dimension for categorical reads. Shared by History cards (and the Result spine).
// ─────────────────────────────────────────────────────────────────────────────

import { Reading, Language, SoloResults, CategoricalResults } from '@/src/types';
import { joinNames } from '@/src/engine/scoringEngine';
import { attachmentStyleResults } from '@/src/data/results/attachmentStyleResults';
import { amITheProblemResults } from '@/src/data/results/amITheProblemResults';
import { auraColorResults } from '@/src/data/results/auraColorResults';

const SOLO_RESULTS: Record<string, SoloResults> = {
  attachment_style: attachmentStyleResults,
  am_i_problem: amITheProblemResults,
};

// Categorical modules resolve the dominant dimension to its localized label — the
// same lookup-by-moduleId shape as SOLO_RESULTS, so a future categorical module
// plugs in with one line here.
const CATEGORICAL_RESULTS: Record<string, CategoricalResults> = {
  aura_color: auraColorResults,
};

export function readingDisplayName(reading: Reading, lang: Language): string {
  const { result } = reading;
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
