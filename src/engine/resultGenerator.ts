import {
  ResultData,
  MultiResults,
  SoloResults,
  CategoricalResults,
  CountResults,
  CountTier,
  LocalizedString,
  FlagMultiResults,
  Person,
} from '../types';
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
  // CLUSTERED (flat read across 3+ people) outranks both other branches: nobody is
  // crowned, so the verdict is the name-free clusterLine and the big title becomes
  // clusterTitle. A 3+-way tie is clustered BY DEFINITION (scoreMulti sets the flag on
  // `tiedWinners.length >= 3`) — the `tiedNames.length >= 3` term is belt-and-braces so
  // a result arriving without the flag still can't dump five names into the giant serif
  // title with a "both…" subtitle.
  // ZERO-SIGNAL outranks everything: nobody was picked once, so there is no winner, no
  // tie and no even split to describe — only an absence to report honestly.
  const isZeroSignal = result.isZeroSignal === true;
  const isClustered = !isZeroSignal && (result.isClustered === true || tiedNames.length >= 3);
  // Tie is now strictly the EXACTLY-2 case, which is what "both" was ever written for.
  const isTie =
    !isZeroSignal && !isClustered && (result.tiedWinnerIds?.length ?? 0) > 1 && tiedNames.length > 1;
  const populatedTemplate = isZeroSignal
    ? moduleResults.zeroLine
    : isClustered
      ? moduleResults.clusterLine
      : isTie
        ? localizeTemplateLocalized(moduleResults.tieTemplate, '{names}', {
            en: joinNames(tiedNames, 'en'),
            fr: joinNames(tiedNames, 'fr'),
            ar: joinNames(tiedNames, 'ar'),
            es: joinNames(tiedNames, 'es'),
          })
        : localizeTemplate(moduleResults.winnerTemplate, result.winner?.name ?? '');

  // A zero-signal read draws NO bullets: every pool line describes a signal that was
  // never recorded, so any of them would be affirming copy invented out of nothing.
  // insights[0] (the zeroLine) stands alone.
  const insights = isZeroSignal
    ? []
    : selectInsights(moduleResults.insights, result.dominantDimension, seed);

  return {
    ...result,
    // Store the localized winner statement as the first insight
    insights: [populatedTemplate, ...insights],
    // Carried on the result (not looked up at render time) so a History reopen and the
    // share card show the same title as the reveal. clusterTitle carries the zero-signal
    // title too — one field, so neither the screen nor the card needs a second branch.
    isClustered: isClustered || undefined,
    clusterTitle: isZeroSignal
      ? moduleResults.zeroTitle
      : isClustered
        ? moduleResults.clusterTitle
        : undefined,
    // The name-free verdict subtitle, derived from the RAW template (ties, clustered and
    // zero-signal reads carry none — their insights[0] is already the full name-free verdict).
    verdictLine:
      isTie || isClustered || isZeroSignal
        ? undefined
        : stripNamePlaceholder(moduleResults.winnerTemplate),
    // No pull-quote on a zero-signal card either — the share lines are all affirming.
    shareLine: isZeroSignal ? undefined : moduleResults.shareLines[result.dominantDimension],
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
/** Replace {a}/{b} in every locale of a compare-verdict line. */
function fillFlagPair(template: LocalizedString, a: string, b: string): LocalizedString {
  const fill = (s: string) => s.replace(/\{a\}/g, a).replace(/\{b\}/g, b);
  return { en: fill(template.en), fr: fill(template.fr), ar: fill(template.ar), es: fill(template.es) };
}

/** Which pole a signed net sits meaningfully on, for the compare verdict selector
 *  (a slightly stricter cut than the band chip's ±2, so "one stands out" needs a
 *  real ±3 lean rather than a marginal ±2). */
function flagSide(net: number): 'green' | 'red' | 'neutral' {
  return net >= 3 ? 'green' : net <= -3 ? 'red' : 'neutral';
}

/**
 * red_green_flag COMPARE (exactly 2 people) → a STANDOUT verdict. The module is
 * solo + compare only, so every multi read is a head-to-head. The standout is the
 * person with the larger |net|; the verdict describes how the two poles relate
 * (opposite / both-green / both-red / one-pole / too-close). {a} = standout,
 * {b} = the other.
 *
 * Big title = the selected verdict's `title` (stored on the result as
 * `verdictTitle`); subtitle = its `line` with {a}/{b} filled (result.insights[0]).
 * Insight bullets follow the standout's dominant sign, so a green standout never
 * draws red-flag copy.
 */
export function generateFlagMultiResult(
  result: ResultData,
  moduleResults: FlagMultiResults,
  persons: Person[],
  seed: number,
): ResultData {
  const nets = result.netScores ?? {};
  // Standout = larger |net|; ties break to the first person (deterministic).
  const ranked = [...persons].sort(
    (p, q) => Math.abs(nets[q.id] ?? 0) - Math.abs(nets[p.id] ?? 0),
  );
  const standout = ranked[0] ?? persons[0];
  const other = ranked[1] ?? persons[1] ?? standout;
  const sStand = flagSide(nets[standout.id] ?? 0);
  const sOther = flagSide(nets[other.id] ?? 0);

  let key: 'OPPOSITE' | 'BOTH_GREEN' | 'BOTH_RED' | 'ONE_POLE' | 'TOO_CLOSE';
  if (sStand === 'neutral' && sOther === 'neutral') key = 'TOO_CLOSE';
  else if (sStand === 'green' && sOther === 'green') key = 'BOTH_GREEN';
  else if (sStand === 'red' && sOther === 'red') key = 'BOTH_RED';
  else if (sStand !== 'neutral' && sOther === 'neutral') key = 'ONE_POLE';
  else key = 'OPPOSITE';

  const verdict = moduleResults.compareVerdicts[key];
  const line = fillFlagPair(verdict.line, standout.name, other.name);

  // Insight bullets describe the STANDOUT, drawn from the pool matching their lean.
  const stat = result.flagStats?.[standout.id];
  const dimension = stat?.dominantDimension ?? result.dominantDimension;
  const pool = moduleResults.insights[dimension];
  const pooled = stat?.dominantSign === 'green' ? pool?.green : pool?.red;
  const insights = selectInsightsFlat(pooled ?? pool?.red ?? [], seed);

  return {
    ...result,
    verdictTitle: verdict.title,
    insights: [line, ...insights],
    // Group verdicts are complete sentences about the group — there is no
    // name-stripped subtitle to derive (same as the tie path).
    verdictLine: undefined,
    shareLine: moduleResults.shareLines[dimension],
  };
}

export function generateCountResult(
  result: ResultData,
  moduleResults: CountResults,
  seed: number,
): ResultData {
  // Insights are TIER-keyed, so a low/zero read never draws affirming copy.
  // POLARITY reads (red_green_flag) tier off the SIGNED net instead of the raw
  // share — with green questions in the pool, "12 of 20 signs present" no longer
  // means "12 red flags". Thresholds mirror the multi bands (tier keys are
  // already inverted: none = Green Flag … high = Red Flag).
  // Fixed net cutoffs, aligned with flagBandFor's bands:
  //   none (Green Flag) net ≥ +4 · low (mostly green) +2..+3 ·
  //   medium (mixed / leans red) −3..+1 · high (Red Flag) ≤ −4
  const net = result.netScores && result.winner ? result.netScores[result.winner.id] : undefined;
  const tier: CountTier =
    net !== undefined
      ? net >= 4
        ? 'none'
        : net >= 2
          ? 'low'
          : net >= -3
            ? 'medium'
            : 'high'
      : countTier(result.signalCount ?? 0, result.signalTotal ?? 0);
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
