import { Question, Person, ReadingMode, ResultData, LocalizedString } from '../types';

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
): ResultData {
  if (moduleType === 'multi') {
    return scoreMulti(questions, answers, persons, mode, moduleId);
  } else {
    return scoreSolo(questions, answers, persons, mode, moduleId);
  }
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

  let totalPossibleScore = 0;

  for (const q of questions) {
    const weight = q.personWeight ?? 1;
    totalPossibleScore += weight;
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

  // confidence = clamp((winnerScore / totalPossibleScore) * 100, 60, 95)
  const raw = totalPossibleScore > 0 ? (maxScore / totalPossibleScore) * 100 : 60;
  const confidence = clamp(raw, 60, 95);

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
  const dimensionTotals: Record<string, number> = {};

  for (const q of questions) {
    const answerIndexStr = answers[q.id];
    if (answerIndexStr === undefined || !q.soloAnswers) continue;
    const idx = parseInt(answerIndexStr, 10);
    const answer = q.soloAnswers[idx];
    if (!answer) continue;
    total += answer.score;
    if (!dimensionTotals[q.dimension]) dimensionTotals[q.dimension] = 0;
    dimensionTotals[q.dimension] += Math.abs(answer.score);
  }

  // verdict
  let verdict: 'positive' | 'neutral' | 'negative';
  if (total > 10) verdict = 'positive';
  else if (total >= -10) verdict = 'neutral';
  else verdict = 'negative';

  // confidence = clamp((Math.abs(total) / 40) * 100, 60, 95)
  const confidence = clamp((Math.abs(total) / 40) * 100, 60, 95);

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
