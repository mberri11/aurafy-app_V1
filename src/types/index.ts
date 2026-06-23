export type Language = 'en' | 'fr' | 'ar' | 'es';
export type ReadingMode = 'solo' | 'compare' | 'triangle' | 'circle';
export type Framework = 'attachment' | 'loveLanguages' | 'sociometry' | 'colorWheel' | 'intuition' | 'mixed';
export type ModuleType = 'multi' | 'solo';
/**
 * How a module's result is scored + rendered. Lets the engine + result screen branch on
 * intent rather than just `type`:
 * - `multi`       — pick-a-person, highest scorer wins (who_loves_me…).
 * - `valence`     — solo ±score total → positive/neutral/negative (am_i_problem).
 * - `count`       — solo "N of 20 signs present" (a relationship module read solo).
 * - `categorical` — solo, answers tagged to categories; winning category + a secondary
 *                   "edge" (attachment_style, aura_reading).
 */
export type ResultKind = 'valence' | 'count' | 'categorical' | 'multi';
export type ThemeId = 'cosmic' | 'desertOracle';

export interface LocalizedString {
  en: string;
  fr: string;
  ar: string;
  es: string;
}

export interface SoloAnswer {
  label: LocalizedString;
  score: number; // -2 | -1 | 1 | 2 (valence/count modules)
  /** For `categorical` modules: the category this answer points to (e.g. 'secure',
   *  'anxious', or an aura colour like 'red'). Ignored by valence/count scoring. */
  category?: string;
  /** Optional weight for a categorical answer's contribution (defaults to 1). */
  weight?: number;
}

export interface Question {
  id: string;
  text: LocalizedString;
  /**
   * Statement form of a multi question for solo mode ("{name} cools a tense
   * moment just by being there."), answered with the generic frequency scale.
   * `{name}` is replaced with the person's name. Falls back to `text` when absent.
   */
  soloText?: LocalizedString;
  framework: Framework;
  dimension: string;
  personWeight?: number; // for multi-person questions, default 1
  soloAnswers?: SoloAnswer[]; // for solo questions, always exactly 4 options
}

export interface Person {
  id: string;
  name: string;
  color: string; // hex
}

export interface ResultData {
  moduleId: string;
  mode: ReadingMode;
  winner?: Person;
  verdict?: 'positive' | 'neutral' | 'negative';
  scores: Record<string, number>; // personId -> score (multi/solo) or category -> tally (categorical)
  dominantDimension: string;
  /** For `categorical` results: the runner-up category ("…with an Anxious edge"). */
  secondaryDimension?: string;
  /** For `count` results (a relationship module read solo): how many of the total
   *  questions registered a "sign present", surfaced as "N of {signalTotal} signs present". */
  signalCount?: number;
  signalTotal?: number;
  confidence: number; // clamped per scoring path (see scoringEngine)
  insights: LocalizedString[];
  attachmentLabel?: LocalizedString;
  loveLanguageLabel?: LocalizedString;
}

export interface Reading {
  id: string;
  moduleId: string;
  mode: ReadingMode;
  persons: Person[];
  answers: Record<string, string>; // questionId -> personId or answer index
  result: ResultData;
  createdAt: number; // unix timestamp
}

export interface Module {
  id: string;
  type: ModuleType;
  /** How the result is scored/rendered. Defaults to `type` ('multi' | a solo kind) when
   *  unset; set explicitly to 'categorical' / 'count' for the non-valence solo modules. */
  resultKind?: ResultKind;
  starsCost: Record<ReadingMode, number>;
  icon: string; // emoji
  color: string; // accent hex for glow
  framework: Framework;
  /** Placeholder module shown on Home as a dimmed "Coming soon" card (not playable). */
  comingSoon?: boolean;
}

export interface ThemeColors {
  id: ThemeId;
  background: string;
  bg2: string;
  surface: string;
  surfaceBorder: string;
  borderStrong: string;
  primary: string;
  gradient: [string, string, string];
  text: string;
  textMuted: string;
  textDim: string;
  gold: string;
  rose: string;
  emerald: string;
  glow: string;
}

export interface MultiResults {
  winnerTemplate: LocalizedString;
  insights: Record<string, LocalizedString[]>;
}

export interface SoloResults {
  verdicts: {
    positive: LocalizedString;
    neutral: LocalizedString;
    negative: LocalizedString;
  };
  /** Short headline word shown as the big result title (e.g. "Secure"). */
  verdictLabel: {
    positive: LocalizedString;
    neutral: LocalizedString;
    negative: LocalizedString;
  };
  whatThisMeans: {
    positive: LocalizedString;
    neutral: LocalizedString;
    negative: LocalizedString;
  };
  insights: Record<string, LocalizedString[]>;
}
