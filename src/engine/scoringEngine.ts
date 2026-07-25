import {
  Question,
  Person,
  ReadingMode,
  ResultData,
  LocalizedString,
  Language,
  ResultKind,
  FlagBand,
  FlagPersonStat,
  FlagGroupVerdict,
} from '../types';
import { spectrumHex } from '../themes/categoryTheme';

/**
 * AURA secondary-hue gate (AURA_PRISM_V2). When the runner-up colour scores at least
 * this fraction of the winner, the aura is "two-tone" — the result orb paints a rim arc
 * in the runner-up's hue ("blue, with a light of violet"). Below it, the aura is pure and
 * the arc renders silver. Named constant, not a magic number.
 */
export const AURA_SECONDARY_THRESHOLD = 0.6;

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

/**
 * Classify a signed net into one of the five bands. FIXED absolute cutoffs on the
 * −10..+10 scale — the module is solo + compare (2 people) only now, and in BOTH
 * a person's net spans the full −10..+10, so no participant-count scaling is
 * needed (the old unit scaling made +8 read "LEAN_GREEN", which was clearly
 * wrong — Simo, 2026-07-23):
 *   GREEN  net ≥ +4  ·  LEAN_GREEN +2..+3  ·  NEUTRAL −1..+1  ·
 *   LEAN_RED −3..−2  ·  RED net ≤ −4
 */
export function flagBandFor(net: number): FlagBand {
  if (net >= 4) return 'GREEN';
  if (net >= 2) return 'LEAN_GREEN';
  if (net >= -1) return 'NEUTRAL';
  if (net >= -3) return 'LEAN_RED';
  return 'RED';
}

/**
 * The group verdict — derived from the DISTRIBUTION of bands across every
 * participant, NEVER from a single extreme. A read where A=−6 and B=−4 leaves
 * both on the red side (ALL_RED); it must never "clear" B by comparison with A.
 *
 * CLUSTERED is checked FIRST and overrides everything: with 3+ people inside a
 * scaled spread we describe the group rather than crown anyone. Its threshold
 * scales with expected picks, because spread shrinks ~1/N as picks divide across
 * more people — a flat threshold would make CLUSTERED fire on nearly every
 * circle read.
 */
export function classifyFlagGroup(
  bands: Record<string, FlagBand>,
  personIds: string[],
  spread: number,
  expectedPicks: number,
): FlagGroupVerdict {
  const redSide = personIds.filter((id) => bands[id] === 'RED' || bands[id] === 'LEAN_RED');
  const greenSide = personIds.filter((id) => bands[id] === 'GREEN' || bands[id] === 'LEAN_GREEN');
  const neutrals = personIds.filter((id) => bands[id] === 'NEUTRAL');
  const clusterThreshold = Math.max(2, Math.round(expectedPicks * 0.5));

  if (personIds.length >= 3 && spread <= clusterThreshold) return 'CLUSTERED';
  if (redSide.length === personIds.length) return 'ALL_RED';
  if (greenSide.length === personIds.length) return 'ALL_GREEN';
  if (redSide.length > 0 && greenSide.length > 0) return 'SPLIT';
  if (neutrals.length === personIds.length) return 'FLAT';
  return greenSide.length > 0 ? 'SINGLE_POLE_GREEN' : 'SINGLE_POLE_RED';
}

/**
 * red_green_flag ONLY — SIGNED multi scoring. Every other multi module keeps the
 * unsigned winner-race in scoreMulti below.
 *
 * Each question carries a polarity: picking someone on a GREEN question credits
 * them +1, on a RED question −1. "No one" (and any unanswered question) skips
 * entirely — nobody's net moves. Every participant is then banded INDEPENDENTLY,
 * so a read where A=−8 and B=−4 leaves B in a red band rather than "clearing" B
 * by comparison with A.
 *
 * `scores` deliberately stays the UNSIGNED pick count (how many questions pointed
 * at each person) so existing bar/percentage rendering keeps working; the signed
 * values live in `netScores`.
 */
function scoreMultiPolarity(
  questions: Question[],
  answers: Record<string, string>,
  persons: Person[],
  mode: ReadingMode,
  moduleId: string,
): ResultData {
  const netScores: Record<string, number> = {};
  const scores: Record<string, number> = {};
  const greenCounts: Record<string, number> = {};
  const redCounts: Record<string, number> = {};
  const dimensionTotals: Record<string, Record<string, number>> = {};
  for (const p of persons) {
    netScores[p.id] = 0;
    scores[p.id] = 0;
    greenCounts[p.id] = 0;
    redCounts[p.id] = 0;
    dimensionTotals[p.id] = {};
  }

  for (const q of questions) {
    const pid = answers[q.id];
    // 'none' (the "No one" card) and unanswered both land here — no score change.
    if (!pid || netScores[pid] === undefined) continue;
    const delta = q.polarity === 'green' ? 1 : -1;
    netScores[pid] += delta;
    scores[pid] += 1;
    if (delta > 0) greenCounts[pid] += 1;
    else redCounts[pid] += 1;
    dimensionTotals[pid][q.dimension] = (dimensionTotals[pid][q.dimension] ?? 0) + delta;
  }

  const bands: Record<string, FlagBand> = {};
  const flagStats: Record<string, FlagPersonStat> = {};
  for (const p of persons) {
    bands[p.id] = flagBandFor(netScores[p.id]);
    // This person's loudest dimension, by ABSOLUTE signed value, plus its sign —
    // the sign selects the .red/.green insight pool when describing them.
    let dominantDimension = 'general';
    let best = -1;
    let signed = 0;
    for (const [dim, value] of Object.entries(dimensionTotals[p.id])) {
      if (Math.abs(value) > best) {
        best = Math.abs(value);
        dominantDimension = dim;
        signed = value;
      }
    }
    flagStats[p.id] = {
      greenCount: greenCounts[p.id],
      redCount: redCounts[p.id],
      dimensions: dimensionTotals[p.id],
      dominantDimension,
      dominantSign: signed > 0 ? 'green' : signed < 0 ? 'red' : 'neutral',
    };
  }

  // greenest / reddest / spread — the inputs the group verdict is built from.
  const sortedByNet = [...persons].sort((a, b) => netScores[b.id] - netScores[a.id]);
  const greenest = sortedByNet[0];
  const reddest = sortedByNet[sortedByNet.length - 1];
  const spread = greenest && reddest ? netScores[greenest.id] - netScores[reddest.id] : 0;

  // Confidence: margin between the top two nets, DAMPED by expected picks so a
  // circle read isn't punished for splitting its signal across more people.
  const expectedPicks = persons.length > 0 ? questions.length / persons.length : questions.length;
  const nets = sortedByNet.map((p) => netScores[p.id]);
  const margin = expectedPicks > 0 ? ((nets[0] ?? 0) - (nets[1] ?? nets[0] ?? 0)) / expectedPicks : 0;
  const confidence = clamp(Math.round(60 + clamp(margin, 0, 1) * 35), 60, 95);

  // The reading's headline dimension = the LOUDEST signal in the group (largest
  // |signed| of any person), so the insights speak to what actually stood out.
  let dominantDimension = 'general';
  let loudest = -1;
  for (const p of persons) {
    const stat = flagStats[p.id];
    const value = Math.abs(stat.dimensions[stat.dominantDimension] ?? 0);
    if (value > loudest) {
      loudest = value;
      dominantDimension = stat.dominantDimension;
    }
  }

  return {
    moduleId,
    mode,
    // INTERIM: `winner` stays the reddest person so the existing winner-template
    // render still resolves. Section 3 replaces the headline with the group
    // verdict derived from the band DISTRIBUTION, at which point this is only a
    // fallback for older persisted readings.
    winner: reddest,
    tiedWinnerIds: [],
    scores,
    netScores,
    bands,
    flagStats,
    greenest: greenest?.id,
    reddest: reddest?.id,
    spread,
    groupVerdict: classifyFlagGroup(
      bands,
      persons.map((p) => p.id),
      spread,
      expectedPicks,
    ),
    dominantDimension,
    confidence,
    insights: [],
  };
}

// (band thresholds are fixed absolute cutoffs — see flagBandFor)

function scoreMulti(
  questions: Question[],
  answers: Record<string, string>,
  persons: Person[],
  mode: ReadingMode,
  moduleId: string,
): ResultData {
  // Polarity-carrying modules (red_green_flag) score SIGNED — see above. Gating on
  // the data, not the module id, so a second polarity module needs no change here.
  if (questions.some((q) => q.polarity)) {
    return scoreMultiPolarity(questions, answers, persons, mode, moduleId);
  }
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

  // Winner = highest total score. A tie (2+ persons at the max) is a REAL outcome:
  // it is detected below and rendered as a tie — never silently resolved in favor
  // of whoever was entered first.
  let winner = persons[0];
  let maxScore = scores[persons[0].id] ?? 0;

  for (const p of persons) {
    const s = scores[p.id] ?? 0;
    if (s > maxScore) {
      maxScore = s;
      winner = p;
    }
  }

  // Everyone sharing the max score. `winner` stays the first max scorer for
  // backward compat; rendering gates on tiedWinnerIds instead.
  const tiedWinners = persons.filter((p) => (scores[p.id] ?? 0) === maxScore);
  const isTie = tiedWinners.length > 1;

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
  // A tie is definitionally zero-margin — pin to the 60 floor exactly instead of
  // letting the dominance term nudge it around.
  const confidence = isTie ? 60 : clamp(Math.round(55 + margin * 30 + dominance * 10), 60, 95);

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
    tiedWinnerIds: isTie ? tiedWinners.map((p) => p.id) : [],
    tiedWinners: isTie ? tiedWinners : undefined,
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
  // ── red_green_flag ONLY — signed tracking alongside the unsigned count ──
  const isPolarity = questions.some((q) => q.polarity);
  let net = 0;
  let greenCount = 0;
  let redCount = 0;
  const dimensionSigned: Record<string, number> = {};

  for (const q of questions) {
    total += 1;
    const a = answers[q.id];
    const isPresent = a !== undefined && a !== 'none' && (!person || a === person.id);
    if (!isPresent) continue;
    present += 1;
    dimensionPresent[q.dimension] = (dimensionPresent[q.dimension] ?? 0) + 1;
    if (isPolarity) {
      const delta = q.polarity === 'green' ? 1 : -1;
      net += delta;
      if (delta > 0) greenCount += 1;
      else redCount += 1;
      dimensionSigned[q.dimension] = (dimensionSigned[q.dimension] ?? 0) + delta;
    }
  }

  // dominantDimension = where the most signs landed (drives the insight pool). For
  // polarity reads it's the LOUDEST signed dimension, so the sign can select the
  // matching .red/.green pool.
  let dominantDimension = 'general';
  let maxDim = -1;
  let dominantSigned = 0;
  const dimensionSource = isPolarity ? dimensionSigned : dimensionPresent;
  for (const [dim, c] of Object.entries(dimensionSource)) {
    const magnitude = Math.abs(c);
    if (magnitude > maxDim) {
      maxDim = magnitude;
      dominantDimension = dim;
      dominantSigned = c;
    }
  }

  // Confidence = the honest share of signs present. NO floor BY DESIGN: a zero read must
  // display as zero, and 0/20 vs 6/20 must be visibly different readings — this is the ONE
  // number shown (title % + bar). Only the 95 cap is kept, matching every other path
  // (nothing in this app ever claims 100%).
  // POLARITY reads instead show the STRENGTH OF THE LEAN — |net| over the maximum
  // reachable lean (half the questions, since only one polarity can pull each way).
  // A raw "signs present" share would be meaningless once green and red both count.
  const share = total > 0 ? present / total : 0;
  const maxLean = total / 2;
  const confidence = isPolarity
    ? clamp(Math.round((maxLean > 0 ? Math.abs(net) / maxLean : 0) * 100), 0, 95)
    : clamp(Math.round(share * 100), 0, 95);

  const scores: Record<string, number> = {};
  if (person) scores[person.id] = present;

  const base: ResultData = {
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
  if (!isPolarity || !person) return base;

  // One person answers every question → net spans the full −10..+10 (same as
  // each person in a 2-way compare), so the same fixed band cutoffs apply.
  return {
    ...base,
    netScores: { [person.id]: net },
    bands: { [person.id]: flagBandFor(net) },
    flagStats: {
      [person.id]: {
        greenCount,
        redCount,
        dimensions: dimensionSigned,
        dominantDimension,
        dominantSign: dominantSigned > 0 ? 'green' : dominantSigned < 0 ? 'red' : 'neutral',
      },
    },
    greenest: person.id,
    reddest: person.id,
    spread: 0,
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

  // AURA only: the secondary hue. Runner-up scoring ≥ AURA_SECONDARY_THRESHOLD of the
  // winner → persist its hex (the orb's rim arc); else null → silver arc. Persisted on
  // the result so History + the share card render identically to the reveal.
  let secondaryColor: string | null = null;
  if (moduleId === 'aura_color' && secondCat && topVal > 0) {
    if (secondVal / topVal >= AURA_SECONDARY_THRESHOLD) secondaryColor = spectrumHex(secondCat);
  }

  return {
    moduleId,
    mode,
    scores: categoryTotals,
    dominantDimension: topCat,
    secondaryDimension: secondCat,
    secondaryColor,
    confidence,
    insights: [], // filled in by resultGenerator (categorical path lands with Aura — C-4)
  };
}

/** Clamp a number between min and max */
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Locale conjunctions for joinNames — kept here (not i18n) so the engine stays pure. */
const NAME_CONJUNCTION: Record<Language, string> = { en: 'and', fr: 'et', ar: 'و', es: 'y' };

/** Natural join of tied winners' names: 2 → "X and Y"; 3+ → "X, Y, and Z" (Oxford
 *  comma). One implementation for any N — circle mode allows up to 8 people. */
export function joinNames(names: string[], lang: Language): string {
  if (names.length <= 1) return names[0] ?? '';
  const and = NAME_CONJUNCTION[lang];
  if (names.length === 2) return `${names[0]} ${and} ${names[1]}`;
  return `${names.slice(0, -1).join(', ')}, ${and} ${names[names.length - 1]}`;
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

/** localizeTemplate for a LOCALIZED replacement value: each locale's template gets
 *  that locale's value (e.g. CategoricalResults.edgeTemplate's {edge} → the runner-up
 *  category's label in the same language). */
export function localizeTemplateLocalized(
  template: LocalizedString,
  placeholder: string,
  value: LocalizedString,
): LocalizedString {
  return {
    en: template.en.replace(placeholder, value.en),
    fr: template.fr.replace(placeholder, value.fr),
    ar: template.ar.replace(placeholder, value.ar),
    es: template.es.replace(placeholder, value.es),
  };
}
