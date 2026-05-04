import { ResultData, MultiResults, SoloResults } from '../types';
import { selectInsights } from './insightSelector';
import { localizeTemplate } from './scoringEngine';

/**
 * Takes ResultData + module results file → returns full result with
 * winner template populated and insights selected.
 */
export function generateMultiResult(
  result: ResultData,
  moduleResults: MultiResults,
  seed: number,
): ResultData {
  const winnerName = result.winner?.name ?? '';
  const populatedTemplate = localizeTemplate(moduleResults.winnerTemplate, winnerName);

  const insights = selectInsights(moduleResults.insights, result.dominantDimension, seed);

  return {
    ...result,
    // Store the localized winner statement as the first insight
    insights: [populatedTemplate, ...insights],
  };
}

export function generateSoloResult(
  result: ResultData,
  moduleResults: SoloResults,
  seed: number,
): ResultData {
  const verdict = result.verdict ?? 'neutral';
  const verdictStatement = moduleResults.verdicts[verdict];
  const insights = selectInsights(moduleResults.insights, result.dominantDimension, seed);

  return {
    ...result,
    insights: [verdictStatement, ...insights],
  };
}
