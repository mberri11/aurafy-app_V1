import { ResultData, MultiResults, SoloResults, CategoricalResults, CountResults, CountTier, LocalizedString } from '../types';
import { selectInsights, selectInsightsFlat } from './insightSelector';
import { joinNames, localizeTemplate, localizeTemplateLocalized } from './scoringEngine';
import { countTier } from './countTier';

/**
 * Takes ResultData + module results file → returns full result with
 * winner template populated and insights selected.
 */
export function generateMultiResult(
  result: ResultData,
  moduleResults: MultiResults,
  seed: number,
): ResultData {
  // Tie → the tie verdict replaces the winner statement as insights[0]; the same
  // downstream pipeline (result screen, History reopen, share card) renders it.
  const tiedNames = (result.tiedWinners ?? []).map((p) => p.name);
  const isTie = (result.tiedWinnerIds?.length ?? 0) > 1 && tiedNames.length > 1;
  const populatedTemplate = isTie
    ? localizeTemplateLocalized(moduleResults.tieTemplate, '{names}', {
        en: joinNames(tiedNames, 'en'),
        fr: joinNames(tiedNames, 'fr'),
        ar: joinNames(tiedNames, 'ar'),
        es: joinNames(tiedNames, 'es'),
      })
    : localizeTemplate(moduleResults.winnerTemplate, result.winner?.name ?? '');

  const insights = selectInsights(moduleResults.insights, result.dominantDimension, seed);

  return {
    ...result,
    // Store the localized winner statement as the first insight
    insights: [populatedTemplate, ...insights],
    // The name-free verdict subtitle, derived from the RAW template (ties carry none —
    // their insights[0] is already the full tie verdict).
    verdictLine: isTie ? undefined : stripNamePlaceholder(moduleResults.winnerTemplate),
    shareLine: moduleResults.shareLines[result.dominantDimension],
  };
}

/** The winner template with the {name} token removed, per locale ("{name} loves you
 *  the most." → "loves you the most.") — the result screen's subtitle under the big
 *  reveal name. Working from the raw template keeps it correct even when a locale
 *  places the name mid-sentence, which render-time stripping of the populated
 *  sentence could not guarantee. */
function stripNamePlaceholder(template: LocalizedString): LocalizedString {
  const strip = (s: string) => s.replace(/\{name\}\s*/g, '').trim();
  return {
    en: strip(template.en),
    fr: strip(template.fr),
    ar: strip(template.ar),
    es: strip(template.es),
  };
}

/**
 * A `multi` module read in SOLO mode → tier the honest signal share (signalCount/
 * signalTotal, already computed by scoreCount) into a DESCRIPTIVE headline about the one
 * subject — never a "winner" statement. Returns the same shape as generateMultiResult
 * (insights[0] = headline sentence, shareLine on the card), so the result screen renders
 * it with no special-casing beyond the count branch there.
 */
export function generateCountResult(
  result: ResultData,
  moduleResults: CountResults,
  seed: number,
): ResultData {
  // Insights are TIER-keyed, so a low/zero read never draws affirming copy.
  const tier: CountTier = countTier(result.signalCount ?? 0, result.signalTotal ?? 0);
  // {name} = the single solo subject (ResultData.winner holds that one person on this
  // path — only the TEMPLATE changes, from a contest statement to a descriptive one).
  const headline = localizeTemplate(moduleResults.tiers[tier], result.winner?.name ?? '');
  const insights = selectInsightsFlat(moduleResults.insights[tier], seed);

  return {
    ...result,
    isCountResult: true,
    insights: [headline, ...insights],
    shareLine: moduleResults.shareLines[tier],
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
    shareLine: moduleResults.shareLines[verdict],
  };
}

export function generateCategoricalResult(
  result: ResultData,
  moduleResults: CategoricalResults,
  seed: number,
): ResultData {
  // Fall back to the first authored category if the tally produced a key with no
  // content (only possible on a degenerate/empty answer set) so nothing downstream
  // dereferences undefined; dominantDimension is normalized to the resolved key so
  // the result screen + History reopen re-resolve the same category.
  const dominantKey = moduleResults.categories[result.dominantDimension]
    ? result.dominantDimension
    : Object.keys(moduleResults.categories)[0];
  const cat = moduleResults.categories[dominantKey];

  let verdictStatement = cat.verdict;
  const edgeKey = result.secondaryDimension;
  if (edgeKey && edgeKey !== dominantKey && moduleResults.categories[edgeKey]) {
    // The label is authored capitalized (it's also the standalone reveal name);
    // mid-sentence it reads as prose, so lowercase it — except Arabic (no case).
    const edgeLabel = moduleResults.categories[edgeKey].label;
    const edgePhrase = localizeTemplateLocalized(
      moduleResults.edgeTemplate,
      '{edge}',
      {
        en: edgeLabel.en.toLowerCase(),
        fr: edgeLabel.fr.toLowerCase(),
        ar: edgeLabel.ar,
        es: edgeLabel.es.toLowerCase(),
      },
    );
    verdictStatement = appendEdge(verdictStatement, edgePhrase);
  }

  const insights = selectInsights(moduleResults.insights, dominantKey, seed);

  return {
    ...result,
    dominantDimension: dominantKey,
    insights: [verdictStatement, ...insights],
    shareLine: cat.shareLine,
  };
}

/** "Your aura glows violet — the color of the mystic." + "with a Rose edge" →
 *  "…the color of the mystic, with a Rose edge." Comma-joined inside the verdict's
 *  final period, per locale (Arabic uses its own comma). */
function appendEdge(verdict: LocalizedString, edge: LocalizedString): LocalizedString {
  const join = (v: string, e: string, comma: string) => `${v.replace(/\.\s*$/, '')}${comma} ${e}.`;
  return {
    en: join(verdict.en, edge.en, ','),
    fr: join(verdict.fr, edge.fr, ','),
    ar: join(verdict.ar, edge.ar, '،'),
    es: join(verdict.es, edge.es, ','),
  };
}
