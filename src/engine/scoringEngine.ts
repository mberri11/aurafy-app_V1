import { Question, Person, ReadingMode, ResultData, LocalizedString, ResultKind } from '../types';

/**
 * Core scoring logic for all reading types.
 * Pure function — no side effects, easily unit testable.
 */
export function scoreReading(
  questions: Question[],
  answers: Record<string, string>, // questionId -> personId (multi) or answer index (solo)
  persons: Person[],
  mode: ReadingMode,
  moduleId: string,
  moduleType: 'multi' | 'solo',
  resultKind?: ResultKind,
): ResultData {
  if (resultKind === 'categorical') {
    return scoreCategorical(questions, answers, mode, moduleId);
  }
  if (moduleType === 'multi') {
    // A relationship module read in SOLO mode is a single-subject "signs present" count
    // about one person — not a between-people contest. Score it as a count (item 7).
    if (mode === 'solo') {
      return scoreCount(questions, answers, persons, mode, moduleId);
    }
    return scoreMulti(questions, answers, persons, mode, moduleId);
  }
  return scoreSolo(questions, answers, persons, mode, moduleId);
}

function scoreMulti(
  questions: Question[],
  answers: Record<string, string>,
  persons: Person[],
  mode: ReadingMode,
  moduleId: string,
): ResultData {
  // Sum scores per person across all questions
  const scores: Record<string, number> = {};
  for (const p of persons) scores[p.id] = 0;

  // Track dimension scores per person for dominant dimension
  const dimensionScores: Record<string, Record<string, number>> = {};

  for (const q of questions) {
    const weight = q.personWeight ?? 1;
    const answeredPersonId = answers[q.id];
    if (answeredPersonId && scores[answeredPersonId] !== undefined) {
      scores[answeredPersonId] += weight;
      // Track dimension
      if (!dimensionScores[q.dimension]) dimensionScores[q.dimension] = {};
      if (!dimensionScores[q.dimension][answeredPersonId]) dimensionScores[q.dimension][answeredPersonId] = 0;
      dimensionScores[q.dimension][answeredPersonId] += weight;
    }
  }

  // Winner = highest total score; tie-break on attachment framework questions
  let winner = persons[0];
  let maxScore = scores[persons[0].id] ?? 0;

  for (const p of persons) {
    const s = scores[p.id] ?? 0;
    if (s > maxScore) {
      maxScore = s;
      winner = p;
    }
  }

  // Confidence = how *decisively* the winner leads, not their share of the whole quiz.
  // The old `winnerScore / totalPossible` punished bigger groups: votes split N ways, so a
  // clear winner among 4 people read low even when unambiguous. Now blend the margin over
  // the runner-up with the winner's share of all signal — a unanimous winner reads high
  // regardless of person count, a near-tie reads low (item 5). Floor 60: a winner exists.
  const sortedScores = persons.map((p) => scores[p.id] ?? 0).sort((a, b) => b - a);
  const totalSignal = sortedScores.reduce((sum, s) => sum + s, 0);
  const runnerUpScore = sortedScores[1] ?? 0;
  const margin = totalSignal > 0 ? (maxScore - runnerUpScore) / totalSignal : 0;
  const dominance = totalSignal > 0 ? maxScore / totalSignal : 0;
  const confidence = clamp(Math.round(55 + margin * 30 + dominance * 10), 60, 95);

  // dominantDimension = dimension with highest winner score concentration
  let dominantDimension = 'general';
  let maxDimScore = -1;
  for (const [dim, personMap] of Object.entries(dimensionScores)) {
    const winnerDimScore = personMap[winner.id] ?? 0;
    if (winnerDimScore > maxDimScore) {
      maxDimScore = winnerDimScore;
      dominantDimension = dim;
    }
  }

  return {
    moduleId,
    mode,
    winner,
    scores,
    dominantDimension,
    confidence,
    insights: [], // filled in by resultGenerator
  };
}

function scoreSolo(
  questions: Question[],
  answers: Record<string, string>,
  persons: Person[],
  mode: ReadingMode,
  moduleId: string,
): ResultData {
  // Each question has soloAnswers with scores: +2, +1, -1, -2
  let total = 0;
  let maxMagnitude = 0; // ceiling: sum of the strongest |score| of each answered question
  const dimensionTotals: Record<string, number> = {};

  for (const q of questions) {
    const answerIndexStr = answers[q.id];
    if (answerIndexStr === undefined || !q.soloAnswers) continue;
    const idx = parseInt(answerIndexStr, 10);
    const answer = q.soloAnswers[idx];
    if (!answer) continue;
    total += answer.score;
    maxMagnitude += Math.max(...q.soloAnswers.map((o) => Math.abs(o.score)));
    if (!dimensionTotals[q.dimension]) dimensionTotals[q.dimension] = 0;
    dimensionTotals[q.dimension] += Math.abs(answer.score);
  }

  // Verdict as a fraction of the ceiling, not a flat ±10. A clean verdict needs a real lean
  // (≥35% of max); a merely-mixed score reads neutral. For am_i_problem, "positive" = "mostly
  // NOT you" — it never asserts "you ARE the problem" (item 8).
  const ratio = maxMagnitude > 0 ? total / maxMagnitude : 0;
  let verdict: 'positive' | 'neutral' | 'negative';
  if (ratio >= 0.35) verdict = 'positive';
  else if (ratio <= -0.35) verdict = 'negative';
  else verdict = 'neutral';

  // Confidence scales with distance from "mixed". Floor 50, not 60 — a near-even split is
  // genuinely low-confidence and should read that way (item 23).
  const confidence = clamp(Math.round(50 + Math.abs(ratio) * 45), 50, 95);

  // dominantDimension = dimension with highest absolute score
  let dominantDimension = 'general';
  let maxDimScore = -1;
  for (const [dim, score] of Object.entries(dimensionTotals)) {
    if (score > maxDimScore) {
      maxDimScore = score;
      dominantDimension = dim;
    }
  }

  const soloScores: Record<string, number> = {};
  if (persons[0]) soloScores[persons[0].id] = total;

  return {
    moduleId,
    mode,
    verdict,
    scores: soloScores,
    dominantDimension,
    confidence,
    insights: [], // filled in by resultGenerator
  };
}

/**
 * Count scoring: a relationship module read in SOLO mode about ONE person. Each question is
 * a behavioural "sign"; the solo frequency scale stores the person's id when the sign is
 * present, or 'none' when absent. The honest, falsifiable output is "N of {total} signs
 * present" + the share — not a winner race, and not a forced-high confidence (item 7).
 */
function scoreCount(
  questions: Question[],
  answers: Record<string, string>,
  persons: Person[],
  mode: ReadingMode,
  moduleId: string,
): ResultData {
  const person = persons[0];
  let present = 0;
  let total = 0;
  const dimensionPresent: Record<string, number> = {};

  for (const q of questions) {
    total += 1;
    const a = answers[q.id];
    const isPresent = a !== undefined && a !== 'none' && (!person || a === person.id);
    if (!isPresent) continue;
    present += 1;
    dimensionPresent[q.dimension] = (dimensionPresent[q.dimension] ?? 0) + 1;
  }

  // dominantDimension = where the most signs landed (drives the insight pool).
  let dominantDimension = 'general';
  let maxDim = -1;
  for (const [dim, c] of Object.entries(dimensionPresent)) {
    if (c > maxDim) {
      maxDim = c;
      dominantDimension = dim;
    }
  }

  // Confidence = the honest share of signs present, floored low (35) so a weak read can
  // genuinely read weak — no 60% floor on this path (item 23).
  const share = total > 0 ? present / total : 0;
  const confidence = clamp(Math.round(share * 100), 35, 95);

  const scores: Record<string, number> = {};
  if (person) scores[person.id] = present;

  return {
    moduleId,
    mode,
    winner: person, // kept so the current multi result render still resolves a subject
    scores,
    dominantDimension,
    confidence,
    signalCount: present,
    signalTotal: total,
    insights: [], // filled in by resultGenerator
  };
}

/**
 * Categorical solo scoring: each answered question's selected option carries a `category`
 * (and optional `weight`). Tally per category → winning category = dominantDimension, the
 * runner-up = secondaryDimension ("…with an X edge"), confidence = the winner's margin over
 * #2 blended with its overall share. Powers attachment_style (once converted) + aura_reading.
 */
function scoreCategorical(
  questions: Question[],
  answers: Record<string, string>,
  mode: ReadingMode,
  moduleId: string,
): ResultData {
  const categoryTotals: Record<string, number> = {};
  for (const q of questions) {
    const answerIndexStr = answers[q.id];
    if (answerIndexStr === undefined || !q.soloAnswers) continue;
    const answer = q.soloAnswers[parseInt(answerIndexStr, 10)];
    if (!answer || !answer.category) continue;
    categoryTotals[answer.category] = (categoryTotals[answer.category] ?? 0) + (answer.weight ?? 1);
  }

  // Rank categories by tally; winner + runner-up drive the result.
  const ranked = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);
  const total = ranked.reduce((sum, [, v]) => sum + v, 0);
  const [topCat, topVal] = ranked[0] ?? ['general', 0];
  const [secondCat, secondVal] = ranked[1] ?? [undefined, 0];

  // Confidence rewards both a clear margin over #2 and a high overall share.
  const margin = total > 0 ? (topVal - secondVal) / total : 0;
  const share = total > 0 ? topVal / total : 0;
  const confidence = clamp(Math.round(55 + margin * 30 + share * 15), 60, 95);

  return {
    moduleId,
    mode,
    scores: categoryTotals,
    dominantDimension: topCat,
    secondaryDimension: secondCat,
    confidence,
    insights: [], // filled in by resultGenerator (categorical path lands with Aura — C-4)
  };
}

/** Clamp a number between min and max */
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Localize a result template replacing {name} placeholder */
export function localizeTemplate(template: LocalizedString, name: string): LocalizedString {
  return {
    en: template.en.replace('{name}', name),
    fr: template.fr.replace('{name}', name),
    ar: template.ar.replace('{name}', name),
    es: template.es.replace('{name}', name),
  };
}
