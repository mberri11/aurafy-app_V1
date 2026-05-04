export type Language = 'en' | 'fr' | 'ar' | 'es';
export type ReadingMode = 'solo' | 'compare' | 'triangle' | 'circle';
export type Framework = 'attachment' | 'loveLanguages' | 'sociometry' | 'colorWheel' | 'intuition' | 'mixed';
export type ModuleType = 'multi' | 'solo';
export type ThemeId = 'cosmic' | 'desertOracle';

export interface LocalizedString {
  en: string;
  fr: string;
  ar: string;
  es: string;
}

export interface SoloAnswer {
  label: LocalizedString;
  score: number; // -2 | -1 | 1 | 2
}

export interface Question {
  id: string;
  text: LocalizedString;
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
  scores: Record<string, number>; // personId -> score
  dominantDimension: string;
  confidence: number; // clamped 60–95
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
  starsCost: Record<ReadingMode, number>;
  icon: string; // emoji
  color: string; // accent hex for glow
  framework: Framework;
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
  whatThisMeans: {
    positive: LocalizedString;
    neutral: LocalizedString;
    negative: LocalizedString;
  };
  insights: Record<string, LocalizedString[]>;
}
